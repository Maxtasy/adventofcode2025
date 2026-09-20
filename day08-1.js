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

  // Connect the 1000 closest pairs (a pair already in the same circuit still counts as a connection)
  pairs.slice(0, 1000).forEach(({ i, j }) => {
    parent[find(i)] = find(j);
  });

  const sizes = new Map();

  boxes.forEach((_, i) => {
    const root = find(i);

    sizes.set(root, (sizes.get(root) || 0) + 1);
  });

  const [a, b, c] = [...sizes.values()].sort((x, y) => y - x);

  console.log(a * b * c);
});
