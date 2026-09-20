const fs = require('fs');

fs.readFile('day07-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.trim().split('\n');

  // Number of timelines currently at each column
  let timelines = new Map([[rows[0].indexOf('S'), 1]]);

  for (let y = 1; y < rows.length; y += 1) {
    const next = new Map();

    const add = (x, count) => next.set(x, (next.get(x) || 0) + count);

    timelines.forEach((count, x) => {
      if (rows[y][x] === '^') {
        add(x - 1, count);
        add(x + 1, count);
      } else {
        add(x, count);
      }
    });

    timelines = next;
  }

  console.log([...timelines.values()].reduce((a, b) => a + b, 0));
});
