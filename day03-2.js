const fs = require('fs');

function getMaxJoltage(bank, count) {
  const result = [];
  let start = 0;

  while (result.length < count) {
    const remaining = count - result.length;
    const end = bank.length - remaining;

    // find max digit from start..end
    let maxDigit = '-1';
    let maxIndex = start;

    for (let i = start; i <= end; i++) {
      if (bank[i] > maxDigit) {
        maxDigit = bank[i];
        maxIndex = i;
      }
    }

    result.push(maxDigit);
    start = maxIndex + 1;
  }

  return parseInt(result.join(''), 10);
}

fs.readFile('day03-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const banks = data.trim().split('\n');

  const maximumOutputJoltage = banks.reduce((acc, bank) => {
    return acc + getMaxJoltage(bank, 12);
  }, 0);

  console.log(maximumOutputJoltage);
});
