# EventHub - Full-Stack React & Node.js/Express Application

Modern Event Management Platform built with React, Vite, Node.js, Express, and MongoDB.

---

## Project Structure

```
Eventhubb/
├── backend/            # Express REST API (Node.js + Mongoose)
│   ├── src/
│   │   ├── config/     # MongoDB database connection
│   │   ├── controllers/# Auth and Event handlers
│   │   ├── middleware/ # JWT Auth protection
│   │   ├── models/     # User, Event, and Registration Mongoose schemas
│   │   ├── routes/     # Express route definitions
│   │   └── server.js   # Server entry point (port 5000)
│   └── package.json
└── frontend/           # React SPA (Vite + Modern Glassmorphism CSS)
    ├── src/
    │   ├── components/ # Navbar, Hero, EventCard, Dashboard, Modals
    │   ├── context/    # Auth and Event state management
    │   ├── styles/     # index.css design tokens & animations
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## How to Run

### 1. Start the Backend API Server
Ensure your local MongoDB service is running (or set `MONGODB_URI` in `backend/.env`).

```bash
cd backend
npm run dev
```
*The Express server will start on http://localhost:5000.*

### 2. Start the Frontend React App
Open a new terminal window:

```bash
cd frontend
npm run dev
```
*The React app will start on http://localhost:3000 and proxy `/api` requests to the backend.*
