// backend/src/middleware/validation.middleware.js
const validateService = (req, res, next) => {
    const { title, description, category, price, location, serviceArea } = req.body;
    
    const errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }
    if (!description || description.trim().length === 0) {
        errors.push('Description is required');
    }
    if (!category) {
        errors.push('Category is required');
    }
    if (!price || isNaN(price) || price <= 0) {
        errors.push('Valid price is required');
    }
    if (!location || location.trim().length === 0) {
        errors.push('Location is required');
    }
    if (!serviceArea || isNaN(serviceArea) || serviceArea <= 0) {
        errors.push('Valid service area is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = {
    validateService
};