const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const healthRoute = require('./health');
const countriesRoute = require('./countries');
const generateRoute = require('./generate');
const decodeRoute = require('./decode');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// API Routes
app.use('/api/health', healthRoute);
app.use('/api/countries', countriesRoute);
app.use('/api/generate', generateRoute);
app.use('/api/decode', decodeRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});


app.get('/hello', (_req, res) => {
  res.json({ message: 'hello' });
})


// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});



module.exports = serverless(app);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}