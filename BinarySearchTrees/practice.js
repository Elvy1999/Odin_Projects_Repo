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
  let final = [];
  for (let i = 0; i < k; i++) final.push(Number(sortedNums[i]));
  return final;
};

let nums = [1, 1, 1, 2, 2, 3];
console.log(topKFrequent(nums, 2));
nums = [1];
console.log(topKFrequent(nums, 1));

/**
 * @param {number[]} arr
 * @return {number[]}
 */

//You are given an integer array arr. Sort the integers in the array in ascending order by the
//number of 1's in their binary representation and in
//case of two or more integers have the same number of 1's you have to sort them in ascending order.
var sortByBits = function (arr) {
  const bitsCount = {};
  for (let num of arr) {
    const preservedNum = num;
    let powerOf2 = num > 0 ? Math.floor(Math.log2(num)) : 0;
    let counter = 0;
    while (num != 0) {
      let minus = 2 ** powerOf2;
      if (num - minus >= 0) {
        num = num - minus;
        counter++;
      }
      powerOf2--;
    }
    if (bitsCount.hasOwnProperty(`${counter}`)) bitsCount[`${counter}`].push(Number(preservedNum));
    else bitsCount[`${counter}`] = [Number(preservedNum)];
  }
  for (key in bitsCount) {
    bitsCount[key] = bitsCount[key].sort((a, b) => a - b);
  }
  const final = [];
  for (let num of Object.values(bitsCount)) {
    final.push(...num);
  }
  return final;
};
//Output: [0,1,2,4,8,3,5,6,7]
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
console.log(Math.floor(Math.log2(127)));
console.log(Math.log2(127));
console.log(Math.log2(5));
console.log(sortByBits(arr));
let arrs = [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
console.log(sortByBits(arrs));

// Given an integer array nums, return an array answer such that answer[i] is equal to

//the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const finalArray = [];
  for (let i = 0; i < nums.length; i++) {
    let total = 1;
    for (let y = 0; y < nums.length; y++) {
      if (y != i) {
        total *= nums[y];
      }
    }
    finalArray.push(total);
  }
  return finalArray;
};

// I need to find a faster solution
var productExceptSelfs = function (nums) {
  const finalArray = [];

  return finalArray;
};

// Output: [24,12,8,6]
nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums));
nums = [-1, 1, 0, -3, 3];
console.log(productExceptSelf(nums));
nums = [0, 0];
console.log(productExceptSelf(nums));

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length == 0) return 0;
  nums = nums.sort((a, b) => a - b);

  let maxCounter = 0;
  let counter = 1;
  let a = 0;
  let b = 1;
  while (b < nums.length) {
    while (nums[a] == nums[b]) {
      a = b;
      b++;
    }
    if (Math.abs(nums[a] - nums[b]) == 1) counter++;
    else {
      maxCounter = Math.max(maxCounter, counter);
      counter = 1;
    }
    a = b;
    b++;
  }
  maxCounter = Math.max(counter, maxCounter);
  return maxCounter;
};
nums = [100, 4, 200, 1, 3, 2, 6];
console.log(longestConsecutive(nums));

nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log(longestConsecutive(nums));
nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6];
console.log(longestConsecutive(nums));
nums = [1, 2, 0, 1];
console.log(longestConsecutive(nums));

/**
 * @param {string} s
 * @return {boolean}
 */
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
// and removing all non-alphanumeric characters, it reads the same forward and backward.
// Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.
var isPalindrome = function (s) {
  let filteredWord = "";
  for (let letter of s) {
    if (/^[a-zA-Z0-9]+$/.test(letter)) filteredWord = filteredWord + letter.toLowerCase();
  }
  let possiblePalindrome = "";
  for (let i = filteredWord.length - 1; i >= 0; i--) {
    possiblePalindrome = possiblePalindrome + filteredWord[i];
  }

  return possiblePalindrome == filteredWord;
};
// trying to make the solution faster
var isPalindromes = function (s) {
  let pointerA = 0;
  let pointerB = s.length - 1;
  while (pointerA < pointerB) {
    while (!/^[a-zA-Z0-9]+$/.test(s[pointerA])) {
      pointerA = pointerA + 1;
    }
    while (!/^[a-zA-Z0-9]+$/.test(s[pointerB])) {
      pointerB = pointerB - 1;
    }
    if (pointerA > s.length - 1 || pointerB < 0) return false;
    if (s[pointerA].toLowerCase() != s[pointerB].toLowerCase()) return false;
    pointerA++;
    pointerB--;
  }
  return true;
};

let s = ".,";
console.log(s);
//Output: true
//console.log(isPalindrome(s));
console.log(isPalindromes(s));

// Given an integer array nums, return all the triplets [nums[i],
// nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let solution = [];
  for (let a = 0; a < nums.length - 2; a++) {
    for (let b = a + 1; b < nums.length - 1; b++) {
      for (let c = b + 1; c < nums.length; c++) {
        if (nums[a] + nums[b] + nums[c] == 0) {
          let comparison = [nums[a], nums[b], nums[c]].sort((a, b) => a - b);
          if (solution.some((arr) => arr.includes(...comparison)) == false) {
            solution.push(comparison);
          }
        }
      }
    }
  }
  return solution;
};

// trying to make a faster  solution

var threeSums = function (nums) {
  nums.sort((a, b) => a - b);
  // create array to store solutions
  const solutions = [];
  let target = 0;

  for (let a = 0; a < nums.length - 2; a++) {
    // nums[a] is starting from the beginning of the array and the array is sorted from least to greatest
    // so if the leftmost number is positive then that mean that nums[b] and nums[c]
    // will also be positive, since they are to the right of nums[a]. Therefore,
    // the sum of these three numbers cannot equal 0, so we break out of the for loop.
    if (nums[a] > 0) break;
    // We do not want to perform operations on a number that we already saw.
    if (a > 0 && nums[a] == nums[a - 1]) continue;

    let b = a + 1;
    let c = nums.length - 1;

    while (b < c) {
      let total = nums[a] + nums[b] + nums[c];
      if (total == target) {
        solutions.push([nums[a], nums[b], nums[c]]);
        while (nums[b] == nums[b + 1]) b++;
        while (nums[c] == nums[c - 1]) c--;
        b++;
        c--;
      } else if (total < target) {
        b++;
      } else {
        c--;
      }
    }
  }

  return solutions;
};

nums = [-1, 0, 1, 2, -1, -4];
// Output: [[-1,-1,2],[-1,0,1]]
console.log(threeSum(nums));
nums = [-1, 0, 1];
console.log(threeSum(nums));
let array = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(array));
nums = [0, 0, 0];
console.log(threeSum(nums));
nums = [3, 0, -2, -1, 1, 2];
//[[-2,-1,3],[-2,0,2],[-1,0,1]]
console.log(threeSum(nums));

console.log(threeSums(nums));

// You are given an integer array height of length n. There are n vertical lines
// drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container,
// such that the container contains the most water.
// Return the maximum amount of water a container can store.

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let highestArea = 0;
  let a = 0;
  let b = height.length - 1;
  while (b > a) {
    highestArea = Math.max((b - a) * Math.min(height[a], height[b]), highestArea);
    if (height[a] >= height[b]) b--;
    else if (height[b] >= height[a]) a++;
  }
  return highestArea;
};
// works but very slow

let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));
height = [1, 1];
console.log(maxArea(height));
height = [1, 2];
console.log(maxArea(height));
height = [1, 2, 4, 3];
console.log(maxArea(height));
height = [2, 3, 4, 5, 18, 17, 6];
console.log(maxArea(height));

/**
 * @param {string} s
 * @return {number}
 */
// var lengthOfLongestSubstring = function (s) {
//   let charArray = [];
//   let longest = 0;
//   let i = 0;
//   let j = 0;
//   while (i < s.length) {
//     if (!charArray.includes(s[i])) {
//       charArray.push(s[i]);
//       i++;
//     } else {
//       longest = Math.max(charArray.length, longest);
//       j++;
//       charArray = [s[j]];
//       i = j + 1;
//     }
//   }
//   longest = Math.max(charArray.length, longest);

//   return longest;
// };
// trying to make the solution faster by removing the need for an array to check the character values
var lengthOfLongestSubstring = function (s) {
  let current = 0;
  let longest = 0;
  let i = 0;
  let j = 0;
  while (i < s.length) {
    if (i == 0) {
      current++;
      i++;
    } else if (s[i] != s[j] && s[i] != s[i - 1]) {
      current++;
      i++;
    } else {
      longest = Math.max(current, longest);
      current = 1;
      j++;
      i = j + 1;
    }
  }
  longest = Math.max(current, longest);

  return longest;
};

s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));
s = "bbbbb";
console.log(lengthOfLongestSubstring(s));
s = "pwwkew";
console.log(lengthOfLongestSubstring(s));
s = "pww kewkd dlejfg";
console.log(lengthOfLongestSubstring(s));
s = "dvdf"; // should be 3
console.log(lengthOfLongestSubstring(s));
s = "dvfdabc"; // should be
console.log(lengthOfLongestSubstring(s));
s = "pwwkew";
console.log(lengthOfLongestSubstring(s));
s = " ";
console.log(lengthOfLongestSubstring(s));
