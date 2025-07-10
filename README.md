# Vennie Crime Stats Demo

A tiny full-stack demo that lets you enter any UK address + month and instantly
shows a bar chart of crime categories for that area and period.

# Project Structure

- /backend — Python Flask API (Google Maps + UK Police API)
- /frontend — React app with TypeScript, Tailwind CSS, Recharts
- /venv — Virtual environment (not included in the repo)

# Backend Setup (Flask + virtualenv)

Go to the backend folder:
`cd backend`

Create a virtual environment:
`python -m venv venv`

Activate the virtual environment:

- On Windows: `venv\Scripts\activate`
- On macOS/Linux: `source venv/bin/activate`

Install the dependencies:
`pip install -r requirements.txt`

Create a `.env` file in the `/backend` folder with the following content:
GOOGLE_MAPS_API_KEY=your-google-api-key
POLICE_API_BASE_URL=https://data.police.uk/api

Run the Flask development server:
`python run.py`

Test the API:
Open http://localhost:8000 in your browser. You should see:
`{"message": "Welcome to Vennie API"}`

# Frontend Setup (React + Vite)

Go to the frontend folder:
`cd frontend`

Install dependencies:
`pnpm install`

Create a `.env` file in the `/frontend` folder with the following content:
VITE_API_BASE_URL=http://localhost:8000/api
VITE_NOMINATIM_URL=https://nominatim.openstreetmap.org

Run the development server:
`pnpm run dev`

The app will be available at:  
`http://localhost:5173`

# Technologies Used

- **Backend**: Python, Flask, Google Maps API, UK Police Data API
- **Frontend**: React, TypeScript, Tailwind CSS, Vite, Zod, React Hook Form, TanStack Query, Recharts, React Toastify

# Notes

- The backend is a lightweight Flask API that aggregates crime statistics based on geolocation and date.
- The frontend is a modern single-page React application styled with TailwindCSS.
- This project was created as part of a technical assignment.
