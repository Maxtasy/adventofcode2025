const fs = require('fs');

fs.readFile('day03-input-test.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const banks = data.trim().split('\n');

  let maximumOutputJoltage = 0;

  banks.forEach((bank) => {
    let maximumJoltageForBankString = '';

    for (let i = 0; i < 12; i += 1) {
      let lastHighestNumber = -1;
      let lastHighestNumberIndex = -1;

      // Find highest number excluding the last 12 - i numbers, starting at the index of the
      // previous highest number.
      for (let j = lastHighestNumberIndex + 1; j < bank.length - (12 - i); j += 1) {
        const number = parseInt(bank[j], 10);

        if (number > lastHighestNumber) {
          lastHighestNumberIndex = j + 1;
          lastHighestNumber = number;
        }
      }

      maximumJoltageForBankString += `${lastHighestNumber}`;
    }

    maximumOutputJoltage += parseInt(maximumJoltageForBankString, 10);
  });

  console.log(maximumOutputJoltage);
});
