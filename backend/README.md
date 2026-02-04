# Campaign Analytics Backend

FastAPI backend for the Campaign Analytics Dashboard.

## Features

- **GET /campaigns** - Retrieve all campaigns
- **GET /campaigns?status=Active** - Filter campaigns by status
- PostgreSQL/SQLite database support
- CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Database Setup

**Option A: SQLite (Easy - for local development)**
- No setup needed! The app will automatically create `campaigns.db`

**Option B: PostgreSQL (Recommended for production)**

1. Create a PostgreSQL database
2. Set the DATABASE_URL environment variable:
   ```bash
   export DATABASE_URL="postgresql://user:password@host:port/database"
   ```

### 3. Populate Database

If using PostgreSQL, run the SQL setup script:
```bash
psql -U your_username -d your_database -f setup.sql
```

For SQLite, you can use Python to populate:
```python
# Run this after starting the server for the first time
import sqlite3
conn = sqlite3.connect('campaigns.db')
cursor = conn.cursor()
# Copy and paste the INSERT statements from setup.sql
conn.commit()
conn.close()
```

### 4. Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Get All Campaigns
```
GET /campaigns
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Summer Sale",
    "status": "Active",
    "clicks": 1500,
    "cost": 120.50,
    "impressions": 50000
  }
]
```

### Filter by Status
```
GET /campaigns?status=Active
```

Returns only campaigns with the specified status.

## Deployment (Railway)

1. Create a new project on Railway
2. Add PostgreSQL service
3. Add web service and connect to your GitHub repo
4. Set environment variable:
   - `DATABASE_URL`: (automatically provided by Railway PostgreSQL)
5. Railway will automatically detect and run your FastAPI app

## Environment Variables

- `DATABASE_URL`: Database connection string (optional, defaults to SQLite)
