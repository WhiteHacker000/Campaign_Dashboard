"""
FastAPI Backend for Campaign Analytics Dashboard
This is the main application file that sets up our API endpoints
"""

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional

from database import engine, get_db, Base
from models import Campaign

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI(
    title="Campaign Analytics API",
    description="API for managing and viewing marketing campaign data",
    version="1.0.0"
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


@app.get("/")
def read_root():
    """
    Root endpoint - returns a welcome message
    """
    return {
        "message": "Welcome to Campaign Analytics API",
        "endpoints": {
            "campaigns": "/campaigns",
            "filter_by_status": "/campaigns?status=Active"
        }
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
            "impressions": campaign.impressions
        }
        for campaign in campaigns
    ]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
