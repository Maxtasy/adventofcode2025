const fs = require('fs');

fs.readFile('day12-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const sections = data.trim().split('\n\n');
  const regionLines = sections.pop().split('\n');

  // Number of tiles each present shape occupies
  const shapeAreas = sections.map((section) => section.split('\n').slice(1).join('').split('#').length - 1);

  let fitting = 0;
  let ambiguous = 0;

  regionLines.forEach((line) => {
    const [size, counts] = line.split(': ');
    const [width, height] = size.split('x').map(Number);
    const quantities = counts.split(' ').map(Number);

    const totalPresents = quantities.reduce((a, b) => a + b, 0);
    const requiredArea = quantities.reduce((sum, quantity, i) => sum + quantity * shapeAreas[i], 0);

    // Every present fits in its own 3x3 block
    const trivialFit = Math.floor(width / 3) * Math.floor(height / 3) >= totalPresents;
    // Presents cannot overlap, so they need at least their combined area
    const possible = requiredArea <= width * height;

    if (trivialFit) {
      fitting += 1;
    } else if (possible) {
      ambiguous += 1;
    }
  });

  if (ambiguous > 0) {
    console.warn(`${ambiguous} regions need a real packing search`);
  }

  console.log(fitting);
});
