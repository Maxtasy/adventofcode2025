const fs = require('fs');

fs.readFile('day07-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.trim().split('\n');

  let beams = new Set([rows[0].indexOf('S')]);
  let splitCount = 0;

  for (let y = 1; y < rows.length; y += 1) {
    const nextBeams = new Set();

    beams.forEach((x) => {
      if (rows[y][x] === '^') {
        splitCount += 1;

        nextBeams.add(x - 1);
        nextBeams.add(x + 1);
      } else {
        nextBeams.add(x);
      }
    });

    beams = nextBeams;
  }

  console.log(splitCount);
});
