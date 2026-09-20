const fs = require('fs');

// Solves A * x = target for non-negative integer x, minimizing sum(x).
// Gaussian elimination (exact integer arithmetic) leaves a few free variables, which are enumerated.
function minPresses(buttons, target) {
  const rowCount = target.length;
  const colCount = buttons.length;

  const matrix = Array.from({ length: rowCount }, (_, r) => [
    ...buttons.map((button) => (button.includes(r) ? 1 : 0)),
    target[r],
  ]);

  const pivotColumns = [];
  let row = 0;

  for (let col = 0; col < colCount && row < rowCount; col += 1) {
    let pivot = -1;

    for (let r = row; r < rowCount; r += 1) {
      if (matrix[r][col] !== 0) {
        pivot = r;

        break;
      }
    }

    if (pivot === -1) continue;

    [matrix[row], matrix[pivot]] = [matrix[pivot], matrix[row]];

    for (let r = 0; r < rowCount; r += 1) {
      if (r !== row && matrix[r][col] !== 0) {
        const a = matrix[row][col];
        const b = matrix[r][col];

        matrix[r] = matrix[r].map((value, c) => value * a - matrix[row][c] * b);
      }
    }

    pivotColumns.push(col);
    row += 1;
  }

  // Inconsistent system
  for (let r = row; r < rowCount; r += 1) {
    if (matrix[r][colCount] !== 0) return Infinity;
  }

  const freeColumns = [];

  for (let col = 0; col < colCount; col += 1) {
    if (!pivotColumns.includes(col)) freeColumns.push(col);
  }

  // A button cannot be pressed more often than the smallest counter it touches
  const bounds = buttons.map((button) => Math.min(...button.map((counter) => target[counter])));

  let best = Infinity;
  const free = new Array(freeColumns.length).fill(0);

  const evaluate = () => {
    let total = free.reduce((a, b) => a + b, 0);

    for (let i = 0; i < pivotColumns.length; i += 1) {
      let rest = matrix[i][colCount];

      freeColumns.forEach((col, k) => {
        rest -= matrix[i][col] * free[k];
      });

      const pivotValue = matrix[i][pivotColumns[i]];

      if (rest % pivotValue !== 0) return;

      const value = rest / pivotValue;

      if (value < 0 || value > bounds[pivotColumns[i]]) return;

      total += value;
    }

    best = Math.min(best, total);
  };

  const search = (k, sum) => {
    if (sum >= best) return;

    if (k === freeColumns.length) {
      evaluate();

      return;
    }

    for (let value = 0; value <= bounds[freeColumns[k]]; value += 1) {
      free[k] = value;

      search(k + 1, sum + value);
    }

    free[k] = 0;
  };

  search(0, 0);

  return best;
}

fs.readFile('day10-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let totalPresses = 0;

  data
    .trim()
    .split('\n')
    .forEach((line) => {
      const target = line
        .match(/\{([\d,]+)\}/)[1]
        .split(',')
        .map(Number);

      const buttons = [...line.matchAll(/\(([\d,]+)\)/g)].map(([, group]) => group.split(',').map(Number));

      totalPresses += minPresses(buttons, target);
    });

  console.log(totalPresses);
});
