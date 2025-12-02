const fs = require('fs');

fs.readFile('day02-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const ranges = data.trim().split(',');

  let invalidProductIds = [];

  // Matches any digit repeated exactly twice
  const regex = /^(\d+)\1$/;

  ranges.forEach((range) => {
    const [min, max] = range.split('-').map((num) => parseInt(num, 10));

    for (let i = min; i <= max; i += 1) {
      const productId = i.toString();

      if (regex.test(productId)) {
        invalidProductIds.push(productId);
      }
    }
  });

  // Remove duplicates
  const unique = [...new Set(invalidProductIds)];

  console.log(unique.reduce((sum, id) => sum + parseInt(id, 10), 0));
});
