// backend/src/models/service.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    priceType: {
        type: DataTypes.ENUM('fixed', 'hourly', 'negotiable'),
        defaultValue: 'fixed'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceArea: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'active', 'inactive'),
        defaultValue: 'pending'
    },
    images: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: true
});

module.exports = Service;