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

  // Counts paths from device to out that visit both dac and fft
  const countPaths = (device, seenDac, seenFft) => {
    seenDac = seenDac || device === 'dac';
    seenFft = seenFft || device === 'fft';

    if (device === 'out') return seenDac && seenFft ? 1 : 0;

    const key = `${device}|${seenDac}|${seenFft}`;

    if (memo.has(key)) return memo.get(key);

    const count = (devices.get(device) || []).reduce((sum, next) => sum + countPaths(next, seenDac, seenFft), 0);

    memo.set(key, count);

    return count;
  };

  console.log(countPaths('svr', false, false));
});
