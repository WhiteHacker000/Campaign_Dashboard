"""
Database models for the Campaign Analytics Dashboard
This file defines the structure of our campaigns table
"""

from sqlalchemy import Column, Integer, String, Float
from database import Base


class Campaign(Base):
    """
    Campaign model representing a marketing campaign
    """
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)  
    clicks = Column(Integer, nullable=False)
    cost = Column(Float, nullable=False)
    impressions = Column(Integer, nullable=False)
