const fs = require('fs');

fs.readFile('day11-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const devices = new Map();

  data
    .trim()
    .split('\n')
    .forEach((line) => {
      const [name, outputs] = line.split(': ');

      devices.set(name, outputs.split(' '));
    });

  const memo = new Map();

  const countPaths = (device) => {
    if (device === 'out') return 1;
    if (memo.has(device)) return memo.get(device);

    const count = (devices.get(device) || []).reduce((sum, next) => sum + countPaths(next), 0);

    memo.set(device, count);

    return count;
  };

  console.log(countPaths('you'));
});
