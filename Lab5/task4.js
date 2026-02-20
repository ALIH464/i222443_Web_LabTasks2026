const getAverage = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);   // FIXED
  return sum / arr.length;
};

console.log(getAverage([10, 20, 30])); // 20
/////////////////////////////
const checkPass = (marks) => {
  return marks.some(m => m >= 50) ? "Pass" : "Fail";   // FIXED
};

console.log(checkPass([20, 30, 40])); // Fail
////////////////////////////////
function findLongestWord(str) {
  let words = str.split(" ");
  return words.reduce((a, b) => {
    return a.length > b.length ? a : b;   // FIXED
  });
}

console.log(findLongestWord("JavaScript is very powerful language"));
