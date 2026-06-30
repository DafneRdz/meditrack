# MediTrack — Patient Health Dashboard

A full-stack web application that enables patients to log symptoms, track vital signs, and visualize health trends over time.

## Features
- Secure user authentication (signup/login) with encrypted passwords
- Log daily health entries including symptoms, heart rate, blood pressure, temperature, and weight
- Interactive charts to visualize health trends over time
- Role-based access control for patients and providers
- Protected routes on both frontend and backend
- Responsive design across desktop and mobile

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React, React Router, Recharts |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | bcrypt, JSON Web Tokens (JWT) |
| Other | Axios, CORS, dotenv |

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Setup

1. Clone the repository
git clone https://github.com/DafneRdz/meditrack.git
cd meditrack

2. Set up the database
psql postgres
CREATE DATABASE meditrack;
\c meditrack
 
 Then paste the contents of `server/db/schema.sql` to create the tables.

3. Set up the backend
cd server
npm install
  
  Create a `.env` file in the `server` folder:
PORT=5050
DATABASE_URL=postgresql://localhost:5432/meditrack
JWT_SECRET=your_secret_key
 
 Start the server:
 node index.js
 
 4. Set up the frontend
cd ../client
npm install
npm start
5. Open `http://localhost:3000` in your browser

## Author
Dafne Rodriguez — [GitHub](https://github.com/DafneRdz)