const fs = require('fs');

fs.readFile('day04-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.trim().split('\n');

  let accessibleRollsCount = 0;

  rows.forEach((row, y) => {
    const items = row.split('');

    items.forEach((item, x) => {
      if (item === '@') {
        // Check all 8 directions
        const directions = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        let adjacentRolls = 0;

        directions.forEach(([dx, dy]) => {
          // If position also has a roll, increase adjacentRolls count
          if (rows[y + dy] && rows[y + dy][x + dx] === '@') {
            adjacentRolls++;
          }
        });

        if (adjacentRolls < 4) {
          accessibleRollsCount++;
        }
      }
    });
  });

  console.log(accessibleRollsCount);
});
