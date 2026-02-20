let steps = [4500, 6200, 5800, 7100, 4900, 8300, 6700];

// Update steps
function addSteps(dayIndex, stepCount) {
  if (dayIndex >= 0 && dayIndex < steps.length) {
    steps[dayIndex] = stepCount;
  }
}

// Highest
function getHighestSteps() {
  return Math.max(...steps);
}

// Lowest
function getLowestSteps() {
  return Math.min(...steps);
}

// Average
function getAverageSteps() {
  let sum = steps.reduce((acc, val) => acc + val, 0);
  return sum / steps.length;
}

// Above average
function getAboveAverageDays() {
  let avg = getAverageSteps();
  return steps.filter(step => step > avg);
}