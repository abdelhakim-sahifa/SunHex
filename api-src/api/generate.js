const express = require('express');
const router = express.Router();
const { generateSin } = require('./services/sinGenerator');

router.post('/', (req, res) => {
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

module.exports = router;
