# Campaign Analytics Dashboard

A full-stack Campaign Analytics Dashboard built with Next.js and FastAPI.

## 🚀 Project Overview

This is a simplified version of a marketing campaign analytics dashboard that displays campaign data with filtering capabilities. Built as part of the Grippi Junior Full-Stack Developer Intern assignment.

### Features

✅ **Backend (FastAPI)**
- RESTful API with `/campaigns` endpoint
- PostgreSQL & SQLite support
- Status-based filtering
- CORS enabled for frontend integration

✅ **Frontend (Next.js)**
- Modern, responsive dashboard
- Table and card view modes
- Real-time campaign filtering
- Clean UI with plain CSS

## 📁 Project Structure

```
Internship-II/
├── backend/              # FastAPI backend
│   ├── main.py          # Main API application
│   ├── database.py      # Database configuration
│   ├── models.py        # Campaign model
│   ├── populate_db.py   # Database population script
│   ├── setup.sql        # SQL setup script
│   ├── requirements.txt # Python dependencies
│   └── README.md        # Backend documentation
│
├── frontend/            # Next.js frontend
│   ├── app/
│   │   ├── page.tsx     # Main dashboard
│   │   ├── layout.tsx   # Root layout
│   │   ├── globals.css  # Styles
│   │   └── components/
│   │       ├── CampaignCard.tsx
│   │       └── CampaignTable.tsx
│   ├── package.json
│   └── README.md        # Frontend documentation
│
└── README.md           # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL (optional, SQLite works for local development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Populate the database:
```bash
python populate_db.py
```

4. Run the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 🌐 API Endpoints

### GET /campaigns
Returns all campaigns.

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

### GET /campaigns?status=Active
Returns only campaigns with the specified status.

## 🎨 Screenshots

The dashboard features:
- **Table View**: Detailed campaign information in a sortable table
- **Card View**: Visual card-based layout for easier scanning
- **Status Filter**: Filter campaigns by Active/Paused status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚢 Deployment

### Backend Deployment (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL service
3. Add a web service from your GitHub repo
4. Railway will auto-detect and deploy your FastAPI app
5. The `DATABASE_URL` environment variable is automatically configured

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
5. Deploy!

## 📧 Submission Checklist

- [x] Backend with FastAPI
- [x] Frontend with Next.js
- [x] PostgreSQL/SQLite database
- [x] Campaign filtering functionality
- [x] Responsive design
- [x] Clean, documented code
- [x] README files
- [ ] Deployed backend URL
- [ ] Deployed frontend URL
- [ ] Video walkthrough

## 🔧 Technologies Used

**Backend:**
- FastAPI
- SQLAlchemy
- PostgreSQL/SQLite
- Uvicorn

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Plain CSS

## 📝 Notes

- The code is kept simple and well-commented for easy understanding
- Both table and card views are implemented for better user experience
- SQLite is used by default for easy local development
- Environment variables make it easy to switch between dev and production

## 👨‍💻 Author

Built for the Grippi Junior Full-Stack Developer Intern Assignment

## 📄 License

This project is for assignment purposes.
