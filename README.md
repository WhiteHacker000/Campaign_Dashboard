Here’s a cleaner, more professional, and recruiter-ready version of your README:

---

# 📊 Campaign Analytics Dashboard

A full-stack **Campaign Analytics Dashboard** built using Next.js and FastAPI, designed to visualize and filter marketing campaign performance efficiently.

---

## 🚀 Overview

This project is a streamlined marketing analytics platform that enables users to monitor campaign performance through an intuitive dashboard. It provides real-time filtering, multiple data views, and a scalable backend architecture.

---

## ✨ Key Features

### 🔧 Backend (FastAPI)

* RESTful API with `/campaigns` endpoint
* Supports both PostgreSQL and SQLite databases
* Query-based filtering (e.g., status: Active/Paused)
* CORS-enabled for seamless frontend integration

### 🎨 Frontend (Next.js)

* Responsive and modern dashboard UI
* Dual view modes: **Table** and **Card layout**
* Dynamic filtering with real-time updates
* Lightweight styling using plain CSS

---

## 📁 Project Structure

```
Internship-II/
├── backend/              # FastAPI backend
│   ├── main.py          # Entry point
│   ├── database.py      # DB configuration
│   ├── models.py        # Data models
│   ├── populate_db.py   # Seed script
│   ├── setup.sql        # SQL schema
│   └── requirements.txt
│
├── frontend/            # Next.js frontend
│   ├── app/
│   │   ├── page.tsx     # Dashboard UI
│   │   ├── layout.tsx   # Layout wrapper
│   │   ├── globals.css  # Global styles
│   │   └── components/
│   │       ├── CampaignCard.tsx
│   │       └── CampaignTable.tsx
│   ├── package.json
│   └── README.md
│
└── README.md            # Root documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites

* Python 3.8+
* Node.js 18+
* PostgreSQL (optional; SQLite supported for local use)

---

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python populate_db.py
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🌐 API Reference

### `GET /campaigns`

Returns all campaigns.

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

### `GET /campaigns?status=Active`

Returns campaigns filtered by status.

---

## 📊 Dashboard Capabilities

* **Table View** → Structured, sortable campaign data
* **Card View** → Visual summary for quick insights
* **Status Filtering** → Toggle between campaign states
* **Responsive Design** → Optimized for all screen sizes

---

## 🚀 Deployment

### Backend (Render)

* Hosted on Render
* PostgreSQL service integration
* Automatic deployment from GitHub
* Environment variable: `DATABASE_URL`

🔗 Backend URL:
[https://campaign-dashboard-exal.onrender.com](https://campaign-dashboard-exal.onrender.com)

---

### Frontend (Vercel)

* Hosted on Vercel
* Root directory: `frontend`
* Environment variable:

  * `NEXT_PUBLIC_API_URL` → Backend API URL

🔗 Frontend URL:
[https://campaign-dashboard-phi.vercel.app](https://campaign-dashboard-phi.vercel.app)

---

## 🧪 Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL / SQLite
* Uvicorn

### Frontend

* Next.js 14
* React 18
* TypeScript
* CSS

---

## ✅ Project Status

✔ Fully functional full-stack application
✔ Clean and modular architecture
✔ Deployed and publicly accessible
✔ Production-ready structure for scaling

---

## 📄 License

This project was developed as part of an academic assignment.

---

If you want, I can also:

* Make it **ATS/recruiter optimized (for resume projects)**
* Add **badges (build, deploy, tech stack)**
* Or convert it into a **GitHub standout README (with visuals + gifs)**
