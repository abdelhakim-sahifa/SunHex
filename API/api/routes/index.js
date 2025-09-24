const express = require('express');
const router = express.Router();
const { COUNTRY_CODES } = require('../utils/constants');
const { generateSin } = require('../services/sinGenerator');
const { decodeSin } = require('../services/sinDecoder');

// Serve documentation page
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get supported countries
router.get('/api/countries', (req, res) => {
    res.json({
        status: 'success',
        countries: Object.keys(COUNTRY_CODES).sort()
    });
});

// Generate SIN endpoint
router.post('/api/generate', (req, res) => {
    const { firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, pin } = req.body;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'countryCode', 'birthYear', 'birthMonth', 'birthDay', 'gender', 'pin'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }
    
    // Validate PIN is numeric
    if (isNaN(pin)) {
        return res.status(400).json({
            status: 'error',
            message: 'PIN must be a number'
        });
    }
    
    const result = generateSin(firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, parseInt(pin));
    
    if (result.status === 'error') {
        res.status(400).json(result);
    } else {
        res.json(result);
    }
});

// Decode SIN endpoint
router.post('/api/decode', (req, res) => {
    const { hexCode, pin } = req.body;
    
    // Validate required fields
    if (!hexCode || !pin) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: hexCode and pin'
        });
    }
    
    // Validate PIN is numeric
    if (isNaN(pin)) {
        return res.status(400).json({
            status: 'error',
            message: 'PIN must be a number'
        });
    }
    
    const result = decodeSin(hexCode, parseInt(pin));
    
    if (result.status === 'error') {
        res.status(400).json(result);
    } else {
        res.json(result);
    }
});

module.exports = router;