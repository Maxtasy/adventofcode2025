const fs = require('fs');

function mergeRanges(ranges) {
  if (!ranges.length) return [];

  // Parse ranges into numeric intervals
  const intervals = ranges
    .map((r) => r.split('-').map(Number))
    .filter(([s, e]) => Number.isFinite(s) && Number.isFinite(e))
    .sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];

    if (start <= last[1] + 1) {
      // Overlapping or touching → merge
      last[1] = Math.max(last[1], end);
    } else {
      // Gap → keep separate
      merged.push([start, end]);
    }
  }

  // Convert back to "start-end" format
  return merged.map(([s, e]) => `${s}-${e}`);
}

fs.readFile('day05-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const [rangeStrings, _] = data
    .trim()
    .split('\n\n')
    .map((section) => section.split('\n'));

  const finalRanges = mergeRanges(rangeStrings);

  let freshIngredientsCount = 0;

  finalRanges.forEach((range) => {
    const [start, end] = range.split('-').map(Number);
    freshIngredientsCount += end - start + 1;
  });

  console.log(freshIngredientsCount);
});
