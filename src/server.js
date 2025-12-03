require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const healthRouter = require('./routes/health')
const studentsRouter = require('./routes/students');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/health', healthRouter)
app.use('/api/students', studentsRouter)

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("StudentConnect API is running. ");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
