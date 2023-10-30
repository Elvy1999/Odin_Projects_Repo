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

function repeats(numbers) {
  let singleNumbers = numbers.filter((target) => {
    return numbers.filter((number) => number == target).length == 1;
  });
  let sum = singleNumbers.reduce((acc, val) => acc + val, 0);
  console.log(sum);
  return singleNumbers;
}
let numbers = [5, 10, 19, 13, 10, 13];
repeats(numbers);
console.log(numbers[0]);
console.log(maxProfit(numbers));

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

//
var groupAnagrams = function (words) {
  const anagramTable = {};
  words.sort((a, b) => {
    const sumA = a.split("").reduce((sum, letter) => {
      return sum + letter.charCodeAt(0);
    }, 0);
    const sumB = b.split("").reduce((sum, letter) => {
      return sum + letter.charCodeAt(0);
    }, 0);
    return sumA - sumB;
  });
  for (let word of words) {
    let index = word.split("").reduce((sum, letter) => {
      return sum + letter.charCodeAt(0);
    }, 0);
    let sortedWord = word.split("").sort().join("");
    if (anagramTable.hasOwnProperty(`${index}${sortedWord}`)) {
      anagramTable[`${index}${sortedWord}`].push(word);
    } else {
      anagramTable[`${index}${sortedWord}`] = [word];
    }
  }

  return anagramTable; //Object.values(anagramTable);
};
let words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(words));
let strs = [""];
console.log(groupAnagrams(strs));
strs = ["a"];
console.log(groupAnagrams(strs));
strs = ["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"];
console.log(groupAnagrams(strs));

// another possible solution which is faster, still not the best though
var groupAnagrams2 = (words) => {
  const anagramTable = {};
  for (let word of words) {
    const sortedWord = word.split("").sort().join("");
    if (anagramTable.hasOwnProperty(sortedWord)) {
      anagramTable[sortedWord].push(word);
    } else {
      anagramTable[sortedWord] = [word];
    }
  }
  return Object.values(anagramTable);
};

console.log(groupAnagrams2(words));

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
//Given an integer array nums and an integer k, return the k most frequent elements.
//You may return the answer in any order.

var topKFrequent = function (nums, k) {
  const frequentNums = {};
  for (let num of nums) {
    if (frequentNums.hasOwnProperty(`${num}`)) frequentNums[`${num}`]++;
    else frequentNums[num] = 1;
  }
  let sortedNums = Object.keys(frequentNums).sort((a, b) => frequentNums[b] - frequentNums[a]);
  let final = []
  for(let i =0; i<k, i++) {final.push(Number(sortedNums[i]));}
  return sortedNums;
};

let nums = [1, 1, 1, 2, 2, 3];
console.log(topKFrequent(nums, 2));
