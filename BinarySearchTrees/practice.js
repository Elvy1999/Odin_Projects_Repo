/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let profitArray = [];
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[i] < prices[j]) {
        profitArray.push(prices[j] - prices[i]);
      }
    }
  }
  let max = Math.max(...profitArray) > 0 ? Math.max(...profitArray) : 0;
  return max;
};

let prices = [7, 4, 2, 3, 6, 1];
console.log(maxProfit(prices));
let prices2 = [7, 6, 4, 3, 1];
console.log(maxProfit(prices2));

// I need to refractor the code above to make it faster;
