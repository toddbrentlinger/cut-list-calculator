import { addCommasToNumber, convertNumToImperialWithFraction } from "./utilities.js";

describe('addCommasToNumber', () => {
    test('zero', () => {
        expect(addCommasToNumber(0)).toBe('0');
    });

    describe.each([
        [1,'1'],
        [10,'10'],
        [100,'100'],
        [1000,'1,000'],
        [10000,'10,000'],
        [100000,'100,000'],
        [1000000,'1,000,000'],
    ])('%d to %s', (input, output) => {
        /**
         * If iPositive is 0, input should be positive.
         * Else iPositive is 1, input should be negative.
         */
        let tempInput, tempOutput, name;
        for (let iPositive = 0; iPositive < 2; iPositive++) {
            /**
             * If iDecimal is 0, input should NOT have decimal.
             * Else iDecimal is 1, input should have decimal.
             */
            for (let iDecimal = 0; iDecimal < 2; iDecimal++) {
                tempInput = input;
                tempOutput = output;
                name = '';

                if (iDecimal === 1) {
                    name = ' with decimal';
                    tempInput += 0.23;
                    tempOutput = tempOutput + '.23';
                }

                if (iPositive === 0) {
                    name = 'positive' + name;
                } else {
                    name = 'negative' + name;
                    tempInput *= -1;
                    tempOutput = '-' + tempOutput;
                }

                test(name, () => {
                    expect(addCommasToNumber(tempInput)).toBe(tempOutput);
                });
            }
        }
    });
});

describe('convertNumToImperialWithFraction', () => {
    describe.each([
        [0,"0"],
        [0.015625,"1/64\""],
        [0.03125,"1/32\""],
        [0.046875,"3/64\""],
        [0.0625,"1/16\""],
        [0.078125,"5/64\""],
        [0.09375,"3/32\""],
        [0.109375,"7/64\""],
        [0.125,"1/8\""],
        [0.140625,"9/64\""],
        [0.15625,"5/32\""],
        [0.171875,"11/64\""],
        [0.1875,"3/16\""],
        [0.203125,"13/64\""],
        [0.21875,"7/32\""],
        [0.234375,"15/64\""],
        [0.25,"1/4\""],
        [0.265625,"17/64\""],
        [0.28125,"9/32\""],
        [0.296875,"19/64\""],
        [0.3125,"5/16\""],
        [0.328125,"21/64\""],
        [0.34375,"11/32\""],
        [0.359375,"23/64\""],
        [0.375,"3/8\""],
        [0.390625,"25/64\""],
        [0.40625,"13/32\""],
        [0.421875,"27/64\""],
        [0.4375,"7/16\""],
        [0.453125,"29/64\""],
        [0.46875,"15/32\""],
        [0.484375,"31/64\""],
        [0.5,"1/2\""],
        [0.515625,"33/64\""],
        [0.53125,"17/32\""],
        [0.546875,"35/64\""],
        [0.5625,"9/16\""],
        [0.578125,"37/64\""],
        [0.59375,"19/32\""],
        [0.609375,"39/64\""],
        [0.625,"5/8\""],
        [0.640625,"41/64\""],
        [0.65625,"21/32\""],
        [0.671875,"43/64\""],
        [0.6875,"11/16\""],
        [0.703125,"45/64\""],
        [0.71875,"23/32\""],
        [0.734375,"47/64\""],
        [0.75,"3/4\""],
        [0.765625,"49/64\""],
        [0.78125,"25/32\""],
        [0.796875,"51/64\""],
        [0.8125,"13/16\""],
        [0.828125,"53/64\""],
        [0.84375,"27/32\""],
        [0.859375,"55/64\""],
        [0.875,"7/8\""],
        [0.890625,"57/64\""],
        [0.90625,"29/32\""],
        [0.921875,"59/64\""],
        [0.9375,"15/16\""],
        [0.953125,"61/64\""],
        [0.96875,"31/32\""],
        [0.984375,"63/64\""]
    ])('%d to %s', (input, output) => {
        describe.each([0,1,2,3])('%d digit feet', (nFeetDigits) => {
            describe.each([0,1,2])('%d digit inches', (nInchDigits) => {
                const nFeet = (nFeetDigits > 0) ? 10**(nFeetDigits - 1) : 0;
                const nInches = (nInchDigits > 0) ? 10**(nInchDigits - 1) : 0;
                
                let tempInput = input;
                let tempOutput = '';

                if (nFeet !== 0) {
                    tempInput += 12 * nFeet;
                    tempOutput += nFeet + '\'';
                }

                if (input !== 0) {
                    if ((nInches !== 0) || (nFeet !== 0)) {
                        tempInput += nInches;
                        tempOutput += nInches + '-';
                    }

                    tempOutput += output;
                }

                if (tempOutput.length === 0) {
                    tempOutput = '0';
                }

                test(`${tempInput} to ${tempOutput}`, () => {
                    expect(convertNumToImperialWithFraction(tempInput, 6))
                        .toBe(tempOutput);
                });
            });
        });
    });
});
