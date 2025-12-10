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
