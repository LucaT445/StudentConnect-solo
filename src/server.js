require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const healthRouter = require('./routes/health')
const studentsRouter = require('./routes/students');
const app = express();

connectDB();
app.use(express.json());
app.use('/health', healthRouter)
app.use('/api/students', studentsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
