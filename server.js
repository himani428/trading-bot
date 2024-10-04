const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Import trade routes from controllers
const tradeController = require('./src/controllers/tradeController');

// Routes
app.get('/', (req, res) => {
    res.send('Trading bot server is running. Use /start-bot to run the bot or /report to see the results.');
});

app.get('/start-bot', tradeController.startBot);
app.get('/report', tradeController.getReport);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
