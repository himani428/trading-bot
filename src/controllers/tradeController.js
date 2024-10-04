const stockService = require('../services/stockService');
const profitLossCalculator = require('../utils/profitLossCalculator');

// In-memory state for tracking balance, positions, and trades
let balance = 10000;
let position = null;
let trades = [];

// Function to handle bot trading logic
const startBot = (req, res) => {
    const stockPrices = stockService.getStockPrices();

    // Iterate over the stock prices to execute trades
    stockPrices.forEach(price => {
        if (!position && price < 98) {
            // Buy when the price drops below 98
            position = {
                buyPrice: price,
                amount: balance / price,
                timestamp: new Date().toISOString()
            };
            trades.push({
                type: 'BUY',
                buyPrice: price,
                amount: balance / price,
                timestamp: new Date().toISOString()
            });
            balance = 0; // All balance invested
        } else if (position && price > 102) {
            // Sell when the price rises above 102
            const profit = profitLossCalculator.calculateProfit(position, price);
            balance = position.amount * price; // Update balance after selling
            trades.push({
                type: 'SELL',
                sellPrice: price,
                profit: profit,
                timestamp: new Date().toISOString()
            });
            position = null; // Reset position after selling
        }
    });

    res.json({
        stockPrices,
        balance,
        position,
        trades
    });
};

// Function to generate a report of trades and profit/loss
const getReport = (req, res) => {
    const totalProfit = profitLossCalculator.calculateTotalProfit(trades);

    res.json({
        trades,
        finalBalance: balance,
        totalProfitLoss: totalProfit.toFixed(2)
    });
};

module.exports = {
    startBot,
    getReport
};
