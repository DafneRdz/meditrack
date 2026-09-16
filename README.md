# Meditrack
Live Demo: https://meditrack-nmzw3twxf-stream-proj.vercel.app/login
-Dummy UserAccount: demo@meditrack.com
-Password: Password123!

Meditrack is a full-stack web application designed for personal health logging and monitoring. Users can track daily vital metrics, record symptoms, write personal health notes, and view historical trends through a visual dashboard.

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (`pg` driver)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Hosting:** Vercel (Frontend), Render (Backend API & PostgreSQL Database)

## Features

- **Authentication System:** Secure sign-up and login with password hashing and JWT token management.
- **Health Logging:** Form interface to record symptoms, heart rate, systolic/diastolic blood pressure, body temperature, weight, and general notes.
- **Visual Dashboard:** Interactive dashboard displaying recent health logs alongside visual trends.
- **Automated Database Setup:** Programmatic schema initialization on server startup (`initDb`) ensuring required tables are created automatically without manual database scripting.

## Database Schema

The PostgreSQL database consists of two primary tables linked by a foreign key constraint:

### `users`
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `password` (VARCHAR(255) NOT NULL)
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### `health_logs`
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users(id) ON DELETE CASCADE)
- `symptoms` (TEXT)
- `heart_rate` (INTEGER)
- `blood_pressure_systolic` (INTEGER)
- `blood_pressure_diastolic` (INTEGER)
- `temperature` (NUMERIC(5, 2))
- `weight` (NUMERIC(5, 2))
- `notes` (TEXT)
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

## Environment Variables

To run this application locally or in deployment, configure the following environment variables.

### Backend (`/server/.env`)

```env
PORT=5050
DATABASE_URL=postgresql://user:password@hostname:5432/dbname?ssl=true
JWT_SECRET=your_jwt_secret_key
Dafne Rodriguez — [GitHub](https://github.com/DafneRdz)
