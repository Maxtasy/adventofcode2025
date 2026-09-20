const fs = require('fs');

fs.readFile('day06-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  // Do not trim: leading/trailing spaces are significant for column alignment
  const lines = data.split('\n').filter((line) => line.trim() !== '');
  const width = Math.max(...lines.map((line) => line.length));
  const grid = lines.map((line) => line.padEnd(width, ' '));
  const operatorRow = grid[grid.length - 1];
  const numberRows = grid.slice(0, -1);

  let total = 0;
  let numbers = [];
  let operator = null;

  const finishProblem = () => {
    if (numbers.length === 0) return;

    total += operator === '+' ? numbers.reduce((a, b) => a + b, 0) : numbers.reduce((a, b) => a * b, 1);

    numbers = [];
    operator = null;
  };

  // Read columns right to left; a fully blank column separates problems
  for (let x = width - 1; x >= 0; x -= 1) {
    const digits = numberRows
      .map((row) => row[x])
      .join('')
      .trim();

    if (digits === '') {
      finishProblem();

      continue;
    }

    numbers.push(parseInt(digits, 10));

    if (operatorRow[x] !== ' ') {
      operator = operatorRow[x];
    }
  }

  finishProblem();

  console.log(total);
});
