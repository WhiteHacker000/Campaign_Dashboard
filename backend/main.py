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


def serialize_user(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
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
        {
            "id": campaign.id,
            "name": campaign.name,
            "status": campaign.status,
            "clicks": campaign.clicks,
            "cost": campaign.cost,
            "impressions": campaign.impressions,
            "ctr": (campaign.clicks / campaign.impressions * 100) if campaign.impressions > 0 else 0.0
        }
        for campaign in campaigns
    ]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
