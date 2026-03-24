# Task Manager Application

A full-stack Task Management application built with Node.js, Express, MongoDB, and React.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Key Decisions](#key-decisions)

---

## Features

### Core Features
- Create tasks with a title and description
- View a list of all tasks
- Mark tasks as completed
- Edit task details
- Delete tasks
- Data persistence using MongoDB

### Bonus Features
- Due dates for tasks with overdue detection
- Categorize tasks (General, Work, Personal, Shopping, Health)

### Validation & Error Handling
- Task title cannot be empty (validated on both frontend and backend)
- Cannot mark an already completed task as complete
- Meaningful error messages displayed to the user

---

## Tech Stack

### Backend
- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **dotenv** — Environment variable management
- **cors** — Cross-origin resource sharing

### Frontend
- **React** — UI library
- **Vite** — Build tool
- **Axios** — HTTP client for API calls
- **Plain CSS** — Styling

---

## Project Structure
```
task-manager/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── taskController.js     # Route handler functions
├── model/
│   └── Task.js               # Mongoose task schema
├── routes/
│   └── TaskRoute.js          # API route definitions
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx  # Create and edit task form
│   │   │   ├── TaskList.jsx  # List of all tasks
│   │   │   └── TaskItem.jsx  # Single task card
│   │   ├── services/
│   │   │   └── taskService.js # Axios API call functions
│   │   ├── App.jsx           # Main app component
│   │   └── App.css           # Global styles
├── .env                      # Environment variables
├── app.js                    # Express app setup
└── server.js                 # Server entry point
```

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of `task-manager`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Install frontend dependencies
```bash
cd client
npm install
```

### 5. Run the backend
```bash
cd task-manager
node server.js
```

### 6. Run the frontend
```bash
cd task-manager/client
npm run dev
```

### 7. Open the app
```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| PATCH | `/tasks/:id/complete` | Mark task as completed |
| DELETE | `/tasks/:id` | Delete a task |

---

## Key Decisions

### Why MongoDB?
MongoDB was chosen for its flexibility with document-based storage. Tasks can have optional fields like `description`, `dueDate`, and `category` without strict schema constraints.

### Why React + Vite?
Vite is the modern standard for React projects — faster than Create React App, lighter, and better developer experience.

### Why Axios?
All API calls are centralized in `taskService.js` using Axios. This keeps components clean and makes it easy to update API logic in one place.

### Why plain CSS?
No CSS framework was used to keep the project lightweight and demonstrate core CSS skills with a clean, minimal design.

### Validation Strategy
Validation is done on both frontend and backend:
- **Frontend** — immediate feedback to user without waiting for API
- **Backend** — ensures data integrity regardless of how the API is called