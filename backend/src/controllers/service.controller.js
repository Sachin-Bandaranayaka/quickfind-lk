// backend/src/controllers/service.controller.js
const Service = require('../models/service.model');


exports.createService = async (req, res) => {
    try {
        console.log('Creating service with data:', req.body);
        const service = await Service.create(req.body);
        console.log('Service created:', service);
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating service'
        });
    }
};

exports.getServices = async (req, res) => {
    try {
        console.log('Fetching services...');
        const services = await Service.findAll();
        console.log('Services found:', services.length);
        res.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching services'
        });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching service'
        });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        await service.update(req.body);
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating service'
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        await service.destroy();
        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting service'
        });
    }
};