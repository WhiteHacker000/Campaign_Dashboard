"""
Database models for the Campaign Analytics Dashboard
This file defines the structure of our campaigns table
"""

from sqlalchemy import Column, Integer, String, Float
from database import Base


class Campaign(Base):
    """
    Campaign model representing a marketing campaign
    
    Attributes:
        id: Unique identifier for the campaign
        name: Campaign name (e.g., "Summer Sale")
        status: Current status - either "Active" or "Paused"
        clicks: Number of clicks the campaign received
        cost: Total cost of the campaign in dollars
        impressions: Number of times the campaign was shown
    """
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)  # "Active" or "Paused"
    clicks = Column(Integer, nullable=False)
    cost = Column(Float, nullable=False)
    impressions = Column(Integer, nullable=False)
