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
    {"id": 11, "name": "Mother's Day Promotion", "status": "Active", "clicks": 2200, "cost": 310.25, "impressions": 78000},
    {"id": 12, "name": "Father's Day Sale", "status": "Active", "clicks": 1950, "cost": 265.40, "impressions": 65000},
    {"id": 13, "name": "Independence Day Special", "status": "Paused", "clicks": 1350, "cost": 180.50, "impressions": 45000},
    {"id": 14, "name": "Labor Day Weekend", "status": "Active", "clicks": 2800, "cost": 395.75, "impressions": 92000},
    {"id": 15, "name": "Halloween Costume Sale", "status": "Active", "clicks": 3100, "cost": 420.90, "impressions": 105000},
    {"id": 16, "name": "Thanksgiving Deals", "status": "Paused", "clicks": 1750, "cost": 240.60, "impressions": 58000},
    {"id": 17, "name": "Christmas Shopping", "status": "Active", "clicks": 4500, "cost": 650.30, "impressions": 150000},
    {"id": 18, "name": "New Year's Resolution", "status": "Paused", "clicks": 1200, "cost": 155.80, "impressions": 38000},
    {"id": 19, "name": "St. Patrick's Day", "status": "Active", "clicks": 1600, "cost": 210.45, "impressions": 52000},
    {"id": 20, "name": "April Fools Promo", "status": "Paused", "clicks": 900, "cost": 75.20, "impressions": 25000},
    {"id": 21, "name": "Summer Fitness Challenge", "status": "Active", "clicks": 2750, "cost": 340.60, "impressions": 89000},
]

def populate_database():

    db = SessionLocal()

    try:
        # Upsert all campaigns (insert if new, update if already exists)
        for campaign_data in campaigns_data:
            campaign = Campaign(**campaign_data)
            db.merge(campaign)  # merge = INSERT ... ON CONFLICT DO UPDATE

        db.commit()

        final_count = db.query(Campaign).count()
        print(f"Database synced successfully! Total campaigns: {final_count}")

    except Exception as e:
        print(f"Error populating database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    populate_database()
