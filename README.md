# MedVision AI

An educational web application that uses Google Gemini 1.5 Flash to analyze chest X-ray images and classify them as normal or requiring further review. Built for the BTS Hackathon 2026.

**Team: Byte Builders**  
Nedhir Limam — Beher Hewech — Adam Zmerli — Mohamed Amine Ben Hasan — Ranim Selmi

> **Disclaimer:** This application is an educational prototype created for a hackathon. It is not a certified medical device and must not be used for real clinical diagnosis under any circumstances.

> **Internet required:** This application requires an active internet connection at all times. The AI analysis is performed by the Google Gemini API, and the database is hosted on MongoDB Atlas — both are cloud services that cannot function offline.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Reference](#api-reference)
- [Team](#team)
- [License](#license)

---

## Overview

MedVision AI lets a user upload a chest X-ray image through a web interface. The image is sent to the backend, pre-processed with Sharp, then forwarded to the Google Gemini 1.5 Flash API. Gemini returns a structured JSON response containing a classification result, a confidence score, and a plain-language explanation of what it detected. The backend overlays a simulated heatmap on the original image and saves the full result to MongoDB. The frontend displays the result, the heatmap, and the explanation in an animated card interface.

The application does not train or load any machine learning model locally. All inference is handled by the Gemini API on Google's infrastructure, which means no GPU, no Python environment, and no large model file is required to run the project.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool and dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11 | Animations and transitions |
| Zustand | 4.5 | Global state management |
| React Router | 6 | Client-side routing |
| Axios | 1.x | HTTP client with JWT interceptor |
| Lucide React | latest | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.18 | HTTP server and routing |
| MongoDB | 7+ | Database |
| Mongoose | 8.2 | MongoDB ODM |
| Google Gemini 1.5 Flash | via `@google/generative-ai` | AI inference engine |
| Sharp | 0.33 | Image pre-processing (resize to 512x512) |
| Multer | 1.4 | File upload handling |
| JSON Web Token | 9 | Authentication |
| bcryptjs | 2.4 | Password hashing |
| Morgan | 1.10 | HTTP request logging |

### Infrastructure
- **MongoDB** running locally (or MongoDB Atlas for cloud)
- **Google AI Studio** for the Gemini API key (free tier: 15 requests/min, 1500/day)

---

## Project Structure

```
MedVision-AI/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand state stores
│   │   └── lib/             # Axios instance and utilities
│   └── .env                 # Frontend environment variables
│
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # Database connection and app config
│   │   ├── controllers/     # Route handler logic
│   │   ├── middleware/       # Auth, upload, error middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Gemini AI, image processing, heatmap
│   │   └── utils/           # Seed data script
│   ├── uploads/             # Uploaded images (git-ignored)
│   ├── heatmaps/            # Generated heatmap overlays (git-ignored)
│   └── .env                 # Backend environment variables
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Prerequisites

Before running this project, make sure the following are installed on your machine. Each item includes a link to its official installer.

### 1. Node.js (version 18 or higher)

Download from: https://nodejs.org/en/download

To verify installation, open a terminal and run:
```
node --version
npm --version
```
You should see version numbers printed for both.

### 2. A MongoDB Atlas account (free, no install required)

This project uses MongoDB Atlas — a cloud-hosted database. No local MongoDB installation is needed.

1. Go to: https://cloud.mongodb.com and create a free account
2. Create a free **M0** cluster (select any region close to you)
3. Under **Database Access**, create a database user with a username and password
4. Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (0.0.0.0/0)
5. On your cluster page, click **Connect** → **Drivers**, then copy the connection string. It looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medvision
   ```
   Replace `username` and `password` with the credentials you created.

You will paste this connection string into the `.env` file in Step 5.

### 3. Git

Download from: https://git-scm.com/downloads

### 4. A Google Gemini API Key (free)

1. Go to: https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click "Create API Key"
4. Copy the key — you will paste it into the `.env` file in a later step

No credit card is required. The free tier allows 15 requests per minute and 1,500 requests per day, which is more than sufficient for a demonstration.

---

## Setup and Installation

### Step 1 — Clone the repository

Open a terminal (PowerShell or Command Prompt on Windows), navigate to the folder where you want to place the project, and run:

```bash
git clone https://github.com/your-org/MedVision-AI.git
cd MedVision-AI
```

Replace `your-org` with the actual GitHub username or organization name.

### Step 2 — Install frontend dependencies

```bash
cd client
npm install
```

### Step 3 — Configure the frontend environment

Create a file named `.env` inside the `client/` folder with the following content:

```
VITE_API_URL=http://localhost:5000
```

### Step 4 — Install backend dependencies

From the project root:

```bash
cd server
npm install
```

### Step 5 — Configure the backend environment

Create a file named `.env` inside the `server/` folder with the following content:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medvision
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=medvision-hackathon-2026-secret-key
JWT_EXPIRES_IN=8h
CLIENT_URL=http://localhost:5173
```

Replace `MONGO_URI` with the full Atlas connection string from Step 2.  
Replace `GEMINI_API_KEY` with the API key from Step 2 in the prerequisites.  

Do not share this file or commit it to a public repository — it contains your credentials.

### Step 6 — Seed the database with demo data

This step creates a demo user account and 20 sample predictions so the dashboard and history pages are not empty on first run.

Make sure your Atlas connection string is correctly set in `server/.env`, then from inside the `server/` folder run:

```bash
node src/utils/seedData.js
```

You should see confirmation messages in the terminal ending with "Done."

---

## Running the Application

You need two terminal windows open at the same time: one for the backend, one for the frontend.

### Terminal 1 — Start the backend server

```bash
cd server
npm run dev
```

The server will start at `http://localhost:5000`. You should see:

```
MedVision AI server running at http://localhost:5000
AI Engine: Google Gemini 1.5 Flash
```

### Terminal 2 — Start the frontend dev server

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`. Open that address in your browser.

---

## Demo Credentials

After running the seed script, you can log in using the demo account:

| Field | Value |
|---|---|
| Email | demo@medvision.ai |
| Password | demo1234 |

Alternatively, the login page has a "Demo Login" button that signs in automatically without entering credentials.

---

## API Reference

All API endpoints are prefixed with `/api`.

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | /api/auth/login | No | Log in with email and password |
| POST | /api/auth/demo-login | No | Log in as the demo user |
| GET | /api/auth/me | Yes | Get current user info |
| POST | /api/predict | Yes | Upload an image and run analysis |
| GET | /api/history | Yes | Retrieve prediction history |
| GET | /api/history/:id | Yes | Get a single prediction by ID |
| DELETE | /api/history/:id | Yes | Delete a prediction |
| GET | /api/analytics/metrics | Yes | Summary statistics |
| GET | /api/analytics/charts | Yes | Chart data from database |
| GET | /api/dataset/stats | No | Dataset and model configuration info |

Static files (uploaded images and heatmaps) are served at `/uploads/:filename` and `/heatmaps/:filename`.

---

## Team

**Byte Builders** — BTS Hackathon 2026

- Nedhir Limam
- Beher Hewech
- Adam Zmerli
- Mohamed Amine Ben Hasan
- Ranim Selmi

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
