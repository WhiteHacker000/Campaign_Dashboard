"""
FastAPI Backend for Campaign Analytics Dashboard
This is the main application file that sets up our API endpoints
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from database import engine, get_db, Base
from auth_utils import hash_password, verify_password
from models import Campaign, User
from populate_db import populate_database

# Create all database tables
Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs on server startup: seeds / syncs campaign data in the database.
    Using upsert logic so it is safe to run on every deploy.
    """
    populate_database()
    yield


# Initialize FastAPI application
app = FastAPI(
    title="Campaign Analytics API",
    description="API for managing and viewing marketing campaign data",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS so our frontend can communicate with the backend
# This allows requests from any origin (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class CampaignCreateRequest(BaseModel):
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int
    admin_user_id: int


def serialize_user(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin,
    }


def serialize_campaign(campaign: Campaign):
    return {
        "id": campaign.id,
        "name": campaign.name,
        "status": campaign.status,
        "clicks": campaign.clicks,
        "cost": campaign.cost,
        "impressions": campaign.impressions,
        "ctr": (campaign.clicks / campaign.impressions * 100) if campaign.impressions > 0 else 0.0
    }


@app.get("/")
def read_root():
    """
    Root endpoint - returns a welcome message
    """
    return {
        "message": "Welcome to Campaign Analytics API",
        "endpoints": {
            "campaigns": "/campaigns",
            "filter_by_status": "/campaigns?status=Active",
            "create_campaign": "POST /campaigns",
            "login": "/auth/login",
            "signup": "/auth/signup"
        }
    }


@app.post("/auth/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    """
    Create a dashboard user in the database.
    """
    name = payload.name.strip()
    email = payload.email.strip().lower()

    if len(name) < 2:
        raise HTTPException(status_code=400, detail="Name must be at least 2 characters")

    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Please enter a valid email address")

    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="An account with this email already exists")

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(payload.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "Signup successful",
        "user": serialize_user(user)
    }


@app.post("/auth/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """
    Validate credentials by querying the users table.
    """
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "message": "Login successful",
        "user": serialize_user(user)
    }


@app.get("/campaigns")
def get_campaigns(
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all campaigns or filter by status
    
    Args:
        status: Optional filter - "Active" or "Paused"
        db: Database session (automatically provided by FastAPI)
    
    Returns:
        List of campaigns matching the filter criteria
    """
    
    # Start with a query for all campaigns
    query = db.query(Campaign)
    
    # If status filter is provided, apply it
    if status:
        query = query.filter(Campaign.status == status)
    
    # Execute query and return results
    campaigns = query.all()
    
    # Convert to dictionary format for JSON response
    return [
        serialize_campaign(campaign)
        for campaign in campaigns
    ]


@app.post("/campaigns", status_code=201)
def create_campaign(payload: CampaignCreateRequest, db: Session = Depends(get_db)):
    """
    Create a campaign. Only seeded/admin users can add campaign records.
    """
    admin_user = db.query(User).filter(User.id == payload.admin_user_id).first()
    if not admin_user or not admin_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin login is required to add campaigns")

    name = payload.name.strip()
    status = payload.status.strip()

    if len(name) < 2:
        raise HTTPException(status_code=400, detail="Campaign name must be at least 2 characters")

    if status not in {"Active", "Paused"}:
        raise HTTPException(status_code=400, detail="Status must be Active or Paused")

    if payload.clicks < 0 or payload.cost < 0 or payload.impressions < 0:
        raise HTTPException(status_code=400, detail="Campaign metrics cannot be negative")

    campaign = Campaign(
        name=name,
        status=status,
        clicks=payload.clicks,
        cost=payload.cost,
        impressions=payload.impressions
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)

    return serialize_campaign(campaign)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
