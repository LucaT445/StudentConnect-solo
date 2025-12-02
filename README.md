# StudentConnect-solo

## Overview
StudentConnect-solo is a Node.js + Express REST API for managing students in a MongoDB database. It provides full CRUD functionality for student records.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose

## How to Run Locally
1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with your MongoDB connection string:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/studentconnect
```
4. Start the server:
```bash
npm run dev
```
5. The API will be available at http://localhost:5000


## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST   | /api/students | Create a new student |
| GET    | /api/students | Get all students |
| GET    | /api/students/:id | Get a student by ID |
| PUT    | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |