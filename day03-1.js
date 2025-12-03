const fs = require('fs');

fs.readFile('day03-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const banks = data.trim().split('\n');

  let maximumOutputJoltage = 0;

  banks.forEach((bank) => {
    let highestNumberIndex = -1;
    let secondHighestNumberIndex = -1;
    let highestNumber = 0;
    let secondHighestNumber = 0;

    // Find index of highest number unless it's the last number
    for (let i = 0; i < bank.length - 1; i += 1) {
      const number = parseInt(bank[i], 10);

      if (highestNumberIndex === -1 || number > highestNumber) {
        highestNumberIndex = i;
        highestNumber = number;
      }
    }

    // Find index of second highest number, starting from highest number index
    for (let i = highestNumberIndex + 1; i < bank.length; i += 1) {
      const number = parseInt(bank[i], 10);

      if (secondHighestNumberIndex === -1 || number > secondHighestNumber) {
        secondHighestNumberIndex = i;
        secondHighestNumber = number;
      }
    }

    const maximumJoltageForBank = `${highestNumber}${secondHighestNumber}`;

    maximumOutputJoltage += parseInt(maximumJoltageForBank, 10);
  });

  console.log(maximumOutputJoltage);
});
