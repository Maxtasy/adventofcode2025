const fs = require('fs');

fs.readFile('day05-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const [rangeStrings, ingredientStrings] = data
    .trim()
    .split('\n\n')
    .map((section) => section.split('\n'));

  const ranges = rangeStrings.map((line) => {
    const [start, end] = line.split('-').map(Number);

    return { start, end };
  });

  const ingredients = ingredientStrings.map(Number);

  let freshIngredientCount = 0;

  ingredients.forEach((ingredient) => {
    const isFresh = ranges.some(({ start, end }) => ingredient >= start && ingredient <= end);

    if (isFresh) {
      freshIngredientCount++;
    }
  });

  console.log(freshIngredientCount);
});
