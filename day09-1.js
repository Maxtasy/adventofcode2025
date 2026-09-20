const fs = require('fs');

fs.readFile('day09-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const tiles = data
    .trim()
    .split('\n')
    .map((line) => line.split(',').map(Number));

  let largestArea = 0;

  for (let i = 0; i < tiles.length; i += 1) {
    for (let j = i + 1; j < tiles.length; j += 1) {
      const area = (Math.abs(tiles[i][0] - tiles[j][0]) + 1) * (Math.abs(tiles[i][1] - tiles[j][1]) + 1);

      largestArea = Math.max(largestArea, area);
    }
  }

  console.log(largestArea);
});
