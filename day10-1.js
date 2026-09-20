const fs = require('fs');

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
        .match(/\[([.#]+)\]/)[1]
        .split('')
        .reduce((mask, char, i) => (char === '#' ? mask | (1 << i) : mask), 0);

      const buttons = [...line.matchAll(/\(([\d,]+)\)/g)].map(([, group]) =>
        group.split(',').reduce((mask, n) => mask | (1 << Number(n)), 0),
      );

      // Pressing a button twice cancels out, so try every subset of buttons
      let fewest = Infinity;

      for (let subset = 0; subset < 1 << buttons.length; subset += 1) {
        let state = 0;
        let presses = 0;

        for (let b = 0; b < buttons.length; b += 1) {
          if (subset & (1 << b)) {
            state ^= buttons[b];
            presses += 1;
          }
        }

        if (state === target && presses < fewest) {
          fewest = presses;
        }
      }

      totalPresses += fewest;
    });

  console.log(totalPresses);
});
