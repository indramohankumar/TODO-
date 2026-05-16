# Fullstack Task Manager (MERN)

A robust full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates secure user authentication, complete CRUD operations for tasks, searching, status toggling, and an intuitive user interface.

## Features

- **User Authentication:** Secure JWT-based signup and login system.
- **Task Management:** Create, read, update, and delete your tasks.
- **Task Search:** Filter tasks by title or description seamlessly.
- **Task Editing & Status:** Inline editing for tasks and easy completion toggling.
- **Responsive UI:** Clean, intuitive interface built with React and Tailwind CSS.
- **Robust Backend:** Express REST API with MongoDB for data persistence, featuring solid error handling and validation.

## Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd fullstack-todo
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the **backend** directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
```

Create a `.env` file in the **frontend** directory with the following variables:
```env
VITE_API_URL=http://localhost:3000
```

## Running the Application

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   *The server will typically start on `http://localhost:3000`.*

2. **Start the Frontend Application:**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm run dev
   ```
   *The app will typically start on `http://localhost:5173`.*

## API Endpoint Documentation

All endpoints (except auth) require a valid JWT token in the `Authorization` header (`Bearer <token>`).

### Authentication (`/api/user`)
- `POST /login` - Authenticate an existing user and return a token.
- `POST /signup` - Register a new user and return a token.

### Tasks (`/api/todos`)
- `GET /` - Retrieve all tasks for the logged-in user. Accepts an optional `?search=<term>` query parameter to filter by title or description.
- `POST /` - Create a new task. Requires `title`, `description`, and `priority`.
- `PATCH /:id` - Update an existing task. Can update `title`, `description`, `priority`, or toggle `completed` status.
- `DELETE /:id` - Delete a specific task by its ID.

---

## Postman Testing Results

The API has been fully tested using Postman to ensure reliability and correct behavior for all 6 core endpoints.

### 1. User Signup
- **Method:** `POST /api/user/signup`
- **Payload:** `{ "email": "test@example.com", "password": "Password123!" }`
- **Result:** Successfully created user, returned `email` and JWT `token`. Status 200 OK.

### 2. User Login
- **Method:** `POST /api/user/login`
- **Payload:** `{ "email": "test@example.com", "password": "Password123!" }`
- **Result:** Successfully authenticated, returned JWT `token`. Status 200 OK.

### 3. Create Task
- **Method:** `POST /api/todos`
- **Headers:** `Authorization: Bearer <token>`
- **Payload:** `{ "title": "Buy groceries", "description": "Milk, Eggs, Bread", "priority": "high" }`
- **Result:** Task created successfully, returned the task object. Status 200 OK.

### 4. Get Tasks (with Search)
- **Method:** `GET /api/todos?search=groceries`
- **Headers:** `Authorization: Bearer <token>`
- **Result:** Returned an array of tasks matching the search criteria. Status 200 OK.

### 5. Update Task / Toggle Status
- **Method:** `PATCH /api/todos/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Payload:** `{ "completed": true }` (or updating title/description)
- **Result:** Task updated successfully, returned the updated document reflecting the new status. Status 200 OK.

### 6. Delete Task
- **Method:** `DELETE /api/todos/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Result:** Task deleted successfully, returned the deleted document. Status 200 OK.