# Task Management System

A full-stack Task Management System developed as part of a Full Stack Web Developer internship assessment.

The application allows users to register, log in, and manage their personal tasks through a responsive dashboard.

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

## Technologies Used

### Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap
- React Hot Toast
- CSS

### Backend

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- dotenv
- CORS

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