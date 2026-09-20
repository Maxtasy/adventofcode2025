const fs = require('fs');

fs.readFile('day08-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const boxes = data
    .trim()
    .split('\n')
    .map((line) => line.split(',').map(Number));

  const pairs = [];

  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const distance =
        (boxes[i][0] - boxes[j][0]) ** 2 + (boxes[i][1] - boxes[j][1]) ** 2 + (boxes[i][2] - boxes[j][2]) ** 2;

      pairs.push({ i, j, distance });
    }
  }

  pairs.sort((a, b) => a.distance - b.distance);

  const parent = boxes.map((_, i) => i);

  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }

    return x;
  };

  let circuits = boxes.length;

  for (const { i, j } of pairs) {
    const rootI = find(i);
    const rootJ = find(j);

    if (rootI === rootJ) continue;

    parent[rootI] = rootJ;
    circuits -= 1;

    if (circuits === 1) {
      console.log(boxes[i][0] * boxes[j][0]);

      break;
    }
  }
});
