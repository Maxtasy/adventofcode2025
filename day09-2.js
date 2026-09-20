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

  // Coordinate compression: value -> 2 * rank + 1, so the gaps between values get their own cells
  const xs = [...new Set(tiles.map(([x]) => x))].sort((a, b) => a - b);
  const ys = [...new Set(tiles.map(([, y]) => y))].sort((a, b) => a - b);
  const cx = new Map(xs.map((x, i) => [x, 2 * i + 1]));
  const cy = new Map(ys.map((y, i) => [y, 2 * i + 1]));

  const width = 2 * xs.length + 1;
  const height = 2 * ys.length + 1;
  const boundary = Array.from({ length: height }, () => new Uint8Array(width));

  // Draw the loop of red/green tiles onto the compressed grid
  for (let i = 0; i < tiles.length; i += 1) {
    const [x1, y1] = tiles[i];
    const [x2, y2] = tiles[(i + 1) % tiles.length];

    const xa = Math.min(cx.get(x1), cx.get(x2));
    const xb = Math.max(cx.get(x1), cx.get(x2));
    const ya = Math.min(cy.get(y1), cy.get(y2));
    const yb = Math.max(cy.get(y1), cy.get(y2));

    for (let y = ya; y <= yb; y += 1) {
      for (let x = xa; x <= xb; x += 1) {
        boundary[y][x] = 1;
      }
    }
  }

  // Flood fill the outside from the grid corner
  const outside = Array.from({ length: height }, () => new Uint8Array(width));
  const stack = [[0, 0]];

  outside[0][0] = 1;

  while (stack.length) {
    const [x, y] = stack.pop();

    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= width || ny >= height) return;
      if (outside[ny][nx] || boundary[ny][nx]) return;

      outside[ny][nx] = 1;
      stack.push([nx, ny]);
    });
  }

  // Prefix sums of outside cells
  const prefix = Array.from({ length: height + 1 }, () => new Int32Array(width + 1));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      prefix[y + 1][x + 1] = prefix[y][x + 1] + prefix[y + 1][x] - prefix[y][x] + outside[y][x];
    }
  }

  const outsideCount = (xa, ya, xb, yb) =>
    prefix[yb + 1][xb + 1] - prefix[ya][xb + 1] - prefix[yb + 1][xa] + prefix[ya][xa];

  let largestArea = 0;

  for (let i = 0; i < tiles.length; i += 1) {
    for (let j = i + 1; j < tiles.length; j += 1) {
      const [x1, y1] = tiles[i];
      const [x2, y2] = tiles[j];

      const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);

      if (area <= largestArea) continue;

      const xa = Math.min(cx.get(x1), cx.get(x2));
      const xb = Math.max(cx.get(x1), cx.get(x2));
      const ya = Math.min(cy.get(y1), cy.get(y2));
      const yb = Math.max(cy.get(y1), cy.get(y2));

      // The rectangle is valid if it contains no cell outside the loop
      if (outsideCount(xa, ya, xb, yb) === 0) {
        largestArea = area;
      }
    }
  }

  console.log(largestArea);
});
