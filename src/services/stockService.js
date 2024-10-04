// Function to simulate random stock price changes
const getStockPrices = () => {
    const prices = [];
    let lastPrice = 100; // Starting price

    // Simulate price changes over time
    for (let i = 0; i < 10; i++) {
        // Generate a random price change between -5 and +5
        const change = (Math.random() * 10 - 5).toFixed(2);
        lastPrice = parseFloat(lastPrice) + parseFloat(change);
        prices.push(lastPrice.toFixed(2)); // Add new price to the array
    }

    return prices;
};

module.exports = {
    getStockPrices
};
