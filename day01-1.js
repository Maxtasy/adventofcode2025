const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rotations = data.trim().split('\n');

  const positions = Array.from({ length: 100 }, (_, i) => ({ position: i, visited: 0 }));

  let currentIndex = 50;

  positions[currentIndex].visited += 1;

  rotations.forEach((rotation) => {
    const direction = rotation[0];
    const distance = parseInt(rotation.slice(1), 10);

    if (direction === 'R') {
      currentIndex = (currentIndex + distance) % positions.length;
    } else if (direction === 'L') {
      currentIndex = (currentIndex - distance) % positions.length;
    }

    if (currentIndex < 0) {
      currentIndex += positions.length;
    }

    if (currentIndex >= positions.length) {
      currentIndex -= positions.length;
    }

    positions[currentIndex].visited += 1;
  });

  console.log(positions[0].visited);
});
