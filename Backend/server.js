require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
// const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// app.use(express.static(path.join(__dirname, '../Frontend')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../Frontend', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
