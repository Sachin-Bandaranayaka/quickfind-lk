// backend/src/config/config.js
require('dotenv').config();

const config = {
    jwt: {
        // Using a strong default secret in case environment variable is not set
        secret: process.env.JWT_SECRET || 'quickfind_lk_secret_key_2024'
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || 'test',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD
    },
    server: {
        port: process.env.PORT || 3000
    }
};

module.exports = config;