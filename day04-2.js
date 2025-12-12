const fs = require('fs');

fs.readFile('day04-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.trim().split('\n');

  const cells = [];

  rows.forEach((row, y) => {
    row.split('').forEach((value, x) => {
      cells.push({ x, y, value });
    });
  });

  let removedRollsCount = 0;
  let rollsRemovedInInteration;

  while (rollsRemovedInInteration === undefined || rollsRemovedInInteration > 0) {
    rollsRemovedInInteration = 0;

    cells.forEach((cell) => {
      const { x, y, value } = cell;

      if (value === '@') {
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
          if (cells.find((c) => c.x === x + dx && c.y === y + dy && c.value === '@')) {
            adjacentRolls++;
          }
        });

        if (adjacentRolls < 4) {
          rollsRemovedInInteration++;

          // Replace roll with '.' to indicate removal
          cell.value = '.';
        }
      }
    });

    console.log('Removed in this iteration:', rollsRemovedInInteration);

    removedRollsCount += rollsRemovedInInteration;
  }

  console.log(removedRollsCount);
});
