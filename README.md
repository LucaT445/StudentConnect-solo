# StudentConnect-solo

## Overview
StudentConnect-solo is a Node.js + Express REST API for managing students in a MongoDB database. It provides full CRUD functionality for student records. Each responsibility is handled by a specific layer, keeping the architecture separate and easy to maintain. The project was built to practice handling failure cases and become more skilled at fixing system-level errors.  

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose

## What This Project Demonstrates

- End-to-end design and implementation of a RESTful API using Node.js and Express

- Full CRUD operations for student records with consistent HTTP semantics

- MongoDB data modeling with Mongoose, including schema-level validation (e.g., unique email constraints)

- Defensive API design with clear, structured error responses (400, 404, 422)

- Clean separation of concerns using models, routes, and configuration layers

- Additional lookup routes (e.g., get-by-email) to demonstrate flexible querying beyond ID-based access

## Design Notes

- **Validation Strategy**:
    Incoming request data is validated at the route layer before any database operation, and invalid or missing fields result in an immediate error response instead of reaching MongoDB.
- **Separation of Concerns**:
    This project has three layers: config, models, and routes. The config layer is responsible for connecting to the Mongoose database and loading environment variables. The models layer is responsible for defining what Student should look like and enforcing schema constraints. Finally, the routes layer is responsible for reading the request, deciding which operation to run, and sending back a response. This keeps all of the responsibilities isolated and easier to maintain. 
- **Error Handling**:
    Errors are handled at the route level by using try/catch blocks, which return different status codes
    based on the type of failure along with JSON messages explaining the nature of the error. 

## Project Structure


```text
StudentConnect-solo/
 ├─ src/
 │   ├─ models/          # Mongoose schemas
 │   ├─ routes/          # Express route handlers
 │   ├─ config/          # Database connection setup
 ├─ .env.example         # Template for environment variables
 ├─ package.json
 ├─ README.md
```

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

```markdown
You can also copy the `.env.example` file and rename it to `.env`, then fill in your own MongoDB connection string and port number if needed.
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST   | /api/students | Create a new student |
| GET    | /api/students | Get all students |
| GET    | /api/students/:id | Get a student by ID |
| PUT    | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |
| GET    | /api/students/by-email/:email | Get a student by email |



## GET /api/students/by-email/:email

**Description**: 
Gets a single student document that matches the provided email. This is very useful for
lookup operations that do not rely on MongoDB ObjectIDs. 

**Example Request**:
```text
GET http://localhost:5000/api/students/by-email/john.smith@gmail.com
```

**Successful Response (200):**
```json
{
  "student": {
    "_id": "69385b68ae4953818367a91c",
    "name": "John Smith",
    "email": "John.smith@gmail.com",
    "cohort": "Winter 2026",
    "createdAt": "2025-12-09T17:24:56.840Z",
    "updatedAt": "2025-12-09T17:24:56.840Z"
  }
}
```

**Not Found (404):**
```json
{ "error": "Student not found" }
```

## POST /api/students

**Description**:
Creates a new student.

**Example Request:**
```text
POST http://localhost:5000/api/students
```
```json
{
  "name": "John Smith",
  "email": "John.smith3@gmail.com",
  "cohort": "Winter 2028"
}
```

**Successful Response (201):**
```json
{
  "student": {
    "name": "John Smith",
    "email": "John.smith3@gmail.com",
    "cohort": "Winter 2028",
    "_id": "6938a36759ec45435703805c",
    "createdAt": "2025-12-09T22:32:07.289Z",
    "updatedAt": "2025-12-09T22:32:07.289Z",
    "__v": 0
  }
}
```

**Validation Error (400):**
```json
{ "error": "All fields are required" }
```

## GET /api/students

**Description:**
Gets all students in the database. 

**Example Request:**  
```text
GET http://localhost:5000/api/students
```

**Successful Response (200):**
```json
{
  "students": [
    {
      "_id": "6934d76176efef10f77f82bc",
      "name": "Test User",
      "email": "test.user@example.com",
      "cohort": "Winter 2027",
      "createdAt": "2025-12-07T01:24:49.643Z",
      "updatedAt": "2025-12-07T01:24:49.643Z",
      "__v": 0
    },
    {
      "_id": "69385b68ae4953818367a91c",
      "name": "John Smith",
      "email": "John.smith@gmail.com",
      "cohort": "Winter 2026",
      "createdAt": "2025-12-09T17:24:56.840Z",
      "updatedAt": "2025-12-09T17:24:56.840Z",
      "__v": 0
    },
    {
      "_id": "6938a33659ec45435703805a",
      "name": "John Smith",
      "email": "John.smith2@gmail.com",
      "cohort": "Winter 2027",
      "createdAt": "2025-12-09T22:31:18.988Z",
      "updatedAt": "2025-12-09T22:31:18.988Z",
      "__v": 0
    },
    {
      "_id": "6938a36759ec45435703805c",
      "name": "John Smith",
      "email": "John.smith3@gmail.com",
      "cohort": "Winter 2028",
      "createdAt": "2025-12-09T22:32:07.289Z",
      "updatedAt": "2025-12-09T22:32:07.289Z",
      "__v": 0
    }
  ]
}
```
**Server Error (500):**
```json
{"error":"Server error fetching students"}
```

## GET /api/students/:id

**Description:**  
Get a single student by MongoDB ObjectID.

**Example Request:**
```text
GET http://localhost:5000/api/students/6938a33659ec45435703805a
```

**Successful Response (200):**
```json
{
  "student": {
    "_id": "6938a33659ec45435703805a",
    "name": "John Smith",
    "email": "John.smith2@gmail.com",
    "cohort": "Winter 2027",
    "createdAt": "2025-12-09T22:31:18.988Z",
    "updatedAt": "2025-12-09T22:31:18.988Z",
    "__v": 0
  }
}
```
**Not Found (404):**
```json
{ "error": "Student not found" }
```

## PUT /api/students/:id

**Description:**  
Update an existing student by MongoDB ObjectID.

**Example Request:**
```text
PUT http://localhost:5000/api/students/6938a33659ec45435703805a
```
```json
{
  "name": "John Smith",
  "email": "John.smith2@gmail.com",
  "cohort": "Spring 2028"
}
```

**Successful Response (200):**
```json
{
  "student": {
    "_id": "6938a33659ec45435703805a",
    "name": "John Smith",
    "email": "John.smith2@gmail.com",
    "cohort": "Spring 2028",
    "createdAt": "2025-12-09T22:31:18.988Z",
    "updatedAt": "2025-12-09T23:41:01.566Z",
    "__v": 0
  }
}
```

**Not Found (404):**
```json
{ "error": "Student not found" }
```

## DELETE /api/students/:id

**Description:**  
Delete a student by MongoDB ObjectID.

**Example Request:**  
```text
DELETE http://localhost:5000/api/students/6938a33659ec45435703805a
```

**Successful Response (200):**
```json
{
  "message": "Student deleted",
  "student": {
    "_id": "6938a33659ec45435703805a",
    "name": "John Smith",
    "email": "John.smith2@gmail.com",
    "cohort": "Spring 2028",
    "createdAt": "2025-12-09T22:31:18.988Z",
    "updatedAt": "2025-12-09T23:41:01.566Z",
    "__v": 0
  }
}
```
**Not Found (404):**
```json
{ "error": "Student not found" }
