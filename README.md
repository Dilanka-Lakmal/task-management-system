## Task Management System

## Project Overview

This is a full-stack Task Management System developed as part of the Koncepthive Full Stack Web Developer Intern Technical Assessment.

The application allows authenticated users to manage daily tasks through a responsive dashboard. It includes secure JWT authentication, task CRUD operations, dashboard statistics, searching, filtering, sorting, and form validation


## Technology Stack

# Frontend

- React.js
- Vite
- React Router
- Axios
- Bootstrap
- React Hot Toast
- CSS

# Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- dotenv
- CORS

# Database

  MySQL


Installation Instructions

Clone the repository.

```bash
git clone <repository-url>


Install backend dependencies.

cd backend
npm install

Install frontend dependencies.

cd ../frontend
npm install
Environment Variables


Create a .env file inside the backend folder.

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task_management
JWT_SECRET=your_secret_key


## Database Setup

Start Apache and MySQL using XAMPP.
Create a database named: task_management
Import the SQL file located in: database/task_management.sql

Running the Backend
cd backend
npm run dev

Backend runs on:
http://localhost:5000

Running the Frontend
cd frontend
npm run dev

Frontend runs on:
http://localhost:5173


## API Documentation

# Authentication

Method	 Endpoint	               Description
POST	/api/auth/login	Login
POST	/api/auth/register	       Register (additional feature)\

# Tasks

Method	 Endpoint
GET 	/api/tasks
GET 	/api/tasks/:id
POST	/api/tasks
PUT 	/api/tasks/:id
DELETE	/api/tasks/:id

## Assumptions Made

MySQL is running locally using XAMPP.
JWT is used for authentication.
Registration was implemented as an additional feature, although only login was required.
The application is designed for a single authenticated user workflow.

## Known Limitations

The project is not deployed.
Refresh token authentication is not implemented.
Pagination is not implemented because it was listed as an optional feature.
Automated unit tests are not included.

## Features

- User registration
- User login
- JWT authentication
- Protected frontend routes
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Search tasks
- Filter tasks by status and priority
- Sort tasks
- Dashboard statistics
- Responsive user interface
- Form validation
- Success and error notifications


## Project Structure

```text
task-management-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md