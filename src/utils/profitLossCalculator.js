// Calculate profit from a buy and sell operation
const calculateProfit = (position, sellPrice) => {
    return (sellPrice - position.buyPrice) * position.amount;
};

// Calculate total profit from trades
const calculateTotalProfit = (trades) => {
    let totalProfit = 0;
    trades.forEach(trade => {
        if (trade.type === 'SELL') {
            totalProfit += trade.profit;
        }
    });
    return totalProfit;
};

module.exports = {
    calculateProfit,
    calculateTotalProfit
};
