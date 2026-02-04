# Campaign Analytics Frontend

Next.js frontend for the Campaign Analytics Dashboard.

## Features

- 📊 View all marketing campaigns
- 🔍 Filter by campaign status (Active/Paused)
- 📋 Table view for detailed data
- 🃏 Card view for visual overview
- 📱 Fully responsive design
- 🎨 Clean and modern UI with plain CSS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, replace with your deployed backend URL (e.g., Railway URL).

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── components/
│       ├── CampaignCard.tsx   # Card view component
│       └── CampaignTable.tsx  # Table view component
├── package.json
└── README.md
```

## How It Works

### Main Page (`app/page.tsx`)
- Fetches campaigns from the backend API
- Manages filter state (All/Active/Paused)
- Toggles between table and card views
- Shows loading and error states

### CampaignTable Component
- Displays campaigns in a table format
- Shows all campaign details in columns
- Responsive design with horizontal scroll on mobile

### CampaignCard Component
- Displays campaigns as cards
- Better for visual overview
- Grid layout that adapts to screen size

### Styling (`globals.css`)
- Modern, clean design
- CSS variables for consistent theming
- Fully responsive
- Smooth transitions and hover effects

## Building for Production

```bash
npm run build
npm start
```

## Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
4. Deploy!

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

## Troubleshooting

**Issue: "Failed to load campaigns"**
- Make sure the backend is running
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify CORS is enabled on the backend

**Issue: Changes not reflecting**
- Clear browser cache
- Restart the dev server
- Check browser console for errors
