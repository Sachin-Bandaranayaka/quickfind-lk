// backend/src/routes/service.routes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { validateService } = require('../middleware/validation.middleware');

router.post('/services', validateService, serviceController.createService);
router.get('/services', serviceController.getServices);
// ... other routes

module.exports = router;