"""
Database connection setup
This file handles the connection to our database (PostgreSQL or SQLite)
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# For production: postgresql://user:password@host:port/database
# For local development: sqlite:///./campaigns.db
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./campaigns.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Create a session factory for database operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our database models
Base = declarative_base()


def get_db():
    """
    Create a database session for each request
    This ensures proper connection handling
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
