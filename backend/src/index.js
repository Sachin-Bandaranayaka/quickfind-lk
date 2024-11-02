// backend/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/service.routes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('frontend/src'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes); // Changed this line - removed /services from here

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 3000;

// Sync all models
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected and models synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });