const express = require('express');
const router = express.Router();
const { decodeSin } = require('./services/sinDecoder');

router.post('/', (req, res) => {
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
