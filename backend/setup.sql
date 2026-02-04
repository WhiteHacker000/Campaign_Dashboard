-- Campaign Analytics Dashboard - Database Setup
-- This SQL script creates the campaigns table and populates it with sample data

-- Create the campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    clicks INTEGER NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    impressions INTEGER NOT NULL
);

-- Insert 10 sample campaigns
INSERT INTO campaigns (id, name, status, clicks, cost, impressions) VALUES
(1, 'Summer Sale', 'Active', 1500, 120.50, 50000),
(2, 'Winter Clearance', 'Paused', 800, 45.00, 20000),
(3, 'Black Friday Special', 'Active', 3200, 450.75, 120000),
(4, 'Spring Collection Launch', 'Active', 2100, 280.30, 75000),
(5, 'Holiday Gift Guide', 'Paused', 950, 65.20, 28000),
(6, 'Back to School Promo', 'Active', 1850, 195.40, 62000),
(7, 'New Year Flash Sale', 'Active', 2950, 380.90, 95000),
(8, 'Valentine''s Day Campaign', 'Paused', 720, 52.15, 18500),
(9, 'Easter Special Offers', 'Active', 1680, 142.60, 54000),
(10, 'Cyber Monday Deals', 'Paused', 2450, 325.80, 88000);
