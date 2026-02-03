# Smart City Service Portal

A full-stack Smart City Service Portal that enables citizens to access city services, lodge complaints, book hospital appointments, view utility bills, and stay informed with announcements. Admins can manage users, update complaints, publish announcements, and track analytics.

## Tech Stack

- **Frontend:** React.js + Tailwind CSS + Vite
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Auth:** JWT with bcrypt password hashing
- **Charts:** Chart.js (via react-chartjs-2)

## Project Structure

```
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── server.js
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
└── sql
    ├── schema.sql
    └── seed.sql
```

## Setup Instructions

### 1) Database

1. Create the database and tables:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
2. Add sample data:
   ```bash
   mysql -u root -p < sql/seed.sql
   ```

> Sample credentials (password: `password`)
> - Admin: `admin@smartcity.gov`
> - Citizen: `aarav@example.com`

### 2) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Core Features

### Authentication
- Citizen registration and login
- JWT-based auth
- Role-based access (Citizen/Admin)
- Password hashing with bcrypt
- Protected routes

### Citizen Dashboard
- Profile overview
- Lodge complaints and track status
- Book hospital appointments
- View utility bills
- Emergency contacts
- City notices & announcements

### Admin Dashboard
- User management
- Complaint status updates
- Manage appointments
- Add utility bills
- Post announcements
- Dashboard analytics with charts

## REST API Overview

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

**Complaints**
- `POST /api/complaints`
- `GET /api/complaints/mine`
- `GET /api/complaints`
- `PATCH /api/complaints/:id/status`

**Appointments**
- `POST /api/appointments`
- `GET /api/appointments/mine`
- `GET /api/appointments`
- `PATCH /api/appointments/:id/status`

**Bills**
- `GET /api/bills/mine`
- `GET /api/bills`
- `POST /api/bills`
- `PUT /api/bills/:id`

**Announcements**
- `GET /api/announcements`
- `POST /api/announcements`

## Environment Variables

Backend (`backend/.env`):
```
PORT=5000
JWT_SECRET=replace_with_secure_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=smart_city_portal
DB_PORT=3306
```

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

## Sample Test Data

The `sql/seed.sql` file includes:
- Admin + citizen users
- Sample complaints
- Sample hospital appointments
- Utility bills
- City announcements

## Notes

- Ensure MySQL is running before starting the backend.
- Adjust `.env` values to match your local DB credentials.
