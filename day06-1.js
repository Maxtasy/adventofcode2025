const fs = require('fs');

function readNumbersFromLine(line) {
  return line
    .split(' ')
    .filter((item) => item.trim() !== '')
    .map((str) => parseInt(str, 10));
}

fs.readFile('day06-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const lines = data.trim().split('\n');

  const firstNumbers = readNumbersFromLine(lines[0]);
  const secondNumbers = readNumbersFromLine(lines[1]);
  const thirdNumbers = readNumbersFromLine(lines[2]);
  const fourthNumbers = readNumbersFromLine(lines[3]);
  const operators = lines[4].split(' ').filter((item) => item.trim() !== '');

  let total = 0;

  for (let i = 0; i < firstNumbers.length; i += 1) {
    const a = firstNumbers[i];
    const b = secondNumbers[i];
    const c = thirdNumbers[i];
    const d = fourthNumbers[i];
    const operator = operators[i];

    let result;

    switch (operator) {
      case '+':
        result = a + b + c + d;
        break;
      case '-':
        result = a - b - c - d;
        break;
      case '*':
        result = a * b * c * d;
        break;
      case '/':
        result = a / b / c / d;
        break;
      default:
        console.error(`Unknown operator: ${operator}`);
        continue;
    }

    total += result;
  }

  console.log(total);
});
