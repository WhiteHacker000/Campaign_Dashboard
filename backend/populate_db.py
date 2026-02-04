"""
Database population script
Run this script to populate the database with sample campaign data
"""

from database import SessionLocal, engine, Base
from models import Campaign

# Create all tables
Base.metadata.create_all(bind=engine)

# Sample campaigns data
campaigns_data = [
    {"id": 1, "name": "Summer Sale", "status": "Active", "clicks": 1500, "cost": 120.50, "impressions": 50000},
    {"id": 2, "name": "Winter Clearance", "status": "Paused", "clicks": 800, "cost": 45.00, "impressions": 20000},
    {"id": 3, "name": "Black Friday Special", "status": "Active", "clicks": 3200, "cost": 450.75, "impressions": 120000},
    {"id": 4, "name": "Spring Collection Launch", "status": "Active", "clicks": 2100, "cost": 280.30, "impressions": 75000},
    {"id": 5, "name": "Holiday Gift Guide", "status": "Paused", "clicks": 950, "cost": 65.20, "impressions": 28000},
    {"id": 6, "name": "Back to School Promo", "status": "Active", "clicks": 1850, "cost": 195.40, "impressions": 62000},
    {"id": 7, "name": "New Year Flash Sale", "status": "Active", "clicks": 2950, "cost": 380.90, "impressions": 95000},
    {"id": 8, "name": "Valentine's Day Campaign", "status": "Paused", "clicks": 720, "cost": 52.15, "impressions": 18500},
    {"id": 9, "name": "Easter Special Offers", "status": "Active", "clicks": 1680, "cost": 142.60, "impressions": 54000},
    {"id": 10, "name": "Cyber Monday Deals", "status": "Paused", "clicks": 2450, "cost": 325.80, "impressions": 88000},
]

def populate_database():
    """
    Populate the database with sample campaign data
    """
    db = SessionLocal()
    
    try:
        # Check if campaigns already exist
        existing_count = db.query(Campaign).count()
        
        if existing_count > 0:
            print(f"Database already has {existing_count} campaigns.")
            print("Skipping population to avoid duplicates.")
            return
        
        # Add all campaigns
        for campaign_data in campaigns_data:
            campaign = Campaign(**campaign_data)
            db.add(campaign)
        
        # Commit the changes
        db.commit()
        print(f"Successfully added {len(campaigns_data)} campaigns to the database!")
        
    except Exception as e:
        print(f"Error populating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    populate_database()
