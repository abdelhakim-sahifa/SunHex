const express = require('express');
const router = express.Router();
const { COUNTRY_CODES } = require('./utils/constants');

router.get('/', (req, res) => {
    res.json({
        status: 'success',
        countries: Object.keys(COUNTRY_CODES).sort()
    });
});

module.exports = router;
