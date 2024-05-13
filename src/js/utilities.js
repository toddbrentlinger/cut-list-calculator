/**
 * 
 * @param {string} type - Element type
 * @param {Object} props - Element attribute names and their corresponding value 
 * @param  {...Node} children - Variable number of child nodes 
 */
export function createElement(type, props = {}, ...children) {
    const element = document.createElement(type);

    // Props
    for (const [key, value] of Object.entries(props)) {
        element.setAttribute(key, value);
    }

    // Children Nodes
    children.forEach(child => element.append(child));

    return element;
}

export function isInputValidLength(inputElement) {
    const tempValue = Number(inputElement.value);

    if (isNaN(tempValue)) {
        inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue <= 0) {
        inputElement.setCustomValidity('Must be greater than zero.');
    } else {
        inputElement.setCustomValidity('');
    }

    inputElement.reportValidity();
}

export function isInputValidPrice(inputElement) {
    const tempValue = Number(inputElement.value);

    if (isNaN(tempValue)) {
        inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue < 0) {
        inputElement.setCustomValidity('Must be greater than or equal to zero.');
    } else {
        inputElement.setCustomValidity('');
    }

    inputElement.reportValidity();
}

/**
 * Returns string representation of number with commas added.
 * @param {number} num
 * @returns {string}
 */
export function addCommasToNumber(num) {
    // Initialize string to num argument converted to string
    let str = num.toString();

    /**
     * Start index of number sequence to add commas.
     * Check if number is negative. Negative sign will be skipped.
     * If number is negative, skip first index and start on second.
     */
    let startIndex = (num < 0) ? 1 : 0;

    /**
     * End index of number sequence to add commas.
     * Find value in 1's column of number.
     * Examples: 
     * - 12345 has '5' in 1's column
     * - 12345.678 has '5' in 1's column
     */
    let dotCharacterIndex = str.indexOf('.');
    let endIndex = (dotCharacterIndex === -1) 
        ? str.length - 1 
        : dotCharacterIndex - 1;

    /**
     * Whole number sequence without negative sign OR decimal portion ranges 
     * from startIndex to endIndex.
     */

    // Decrement endIndex by 2 to equal first index that comma could be added
    endIndex -= 2;

    // Add commas in reverse, skipping 3 digits every loop until reach last digit
    while (endIndex > startIndex) {
        // Add comma to endIndex of string
        str = str.slice(0,endIndex) + ',' + str.slice(endIndex);
        // Decrement endIndex to point to index of next possible comma
        endIndex -= 3;
    }

    return str;
}

/**
 * Returns string of duration (milliseconds) formatted to include days, hour, 
 * minutes, seconds, and/or milliseconds.
 * @param {number} durationMilliseconds 
 * @returns {string}
 */
export function createDurationString(durationMilliseconds) {
    // If duration is less than one second, return duration as milliseconds
    if (durationMilliseconds < 1000) {
        return `${durationMilliseconds} millisecond${(durationMilliseconds !== 1) ? 's' : ''}`;
    }

    // Array to hold strings for each time scale (days, hours, etc.)
    let strArr = [];
    // Value of digit in current time scale for the duration
    let digit;

    /**
     * Duration Scales where first index is string of time scale title and 
     * second index is number of milliseconds for that same time scale.
     */
    const durationScales = [
        ['day', 86400000],
        ['hour', 3600000],
        ['minute', 60000],
        ['second', 1000],
    ];
    
    // Add string for each duration time scale possible
    durationScales.forEach(([ str, val ]) => {
        /**
         * If current duration is larger than current time scale, digit for 
         * the current time scale will be nonzero. Else can skip the current
         * time scale.
         */
        if (durationMilliseconds > val) {
            // Get whole number of current time scale
            digit = Math.floor(durationMilliseconds / val);

            /**
             * Set duration to remaining milliseconds for next loop that tests
             * for smaller time scale.
             */
            durationMilliseconds -= digit * val;

            /**
             * Create string of current time scale, adding 's' at end if digit
             * is greater than one. Then add string to array of other time 
             * scale strings to be joined into one single string later.
             */
            strArr.push(
                `${digit} ${str}${(digit !== 1) ? 's' : ''}`
            );
        }
    });

    // Return duration strings in array after joining into single string
    return strArr.join(', ');
}

/**
 * Returns number given feet, inches, and fractional part of imperial formatted
 * number.
 * @param {number} nFeet 
 * @param {number} nInches 
 * @param {number} fractionNumerator 
 * @param {number} fractionDenominator 
 * @returns {number}
 */
export function convertImperialWithFractionToNum(
    nFeet, 
    nInches = 0, 
    fractionNumerator = 0, 
    fractionDenominator = 32
) {
    return (nFeet * 12) + nInches + (fractionNumerator / fractionDenominator);
}

/**
 * Returns string of a number in imperial format given feet, inches, and 
 * fractional part of the number. 
 * @param {number} nFeet 
 * @param {number} nInches 
 * @param {number} fractionNumerator 
 * @param {number} fractionDenominator 
 * @returns {string}
 */
export function createImperialNumWithFraction(
    nFeet, 
    nInches = 0, 
    fractionNumerator = 0, 
    fractionDenominator = 32
) {
    // If whole number is zero, just return zero as string
    if ((nFeet === 0) && (nInches === 0) && (fractionNumerator === 0)) {
        return '0';
    }

    let str = '';

    // Feet

    // If feet is nonzero, add feet to string with a single quotation mark
    if (nFeet !== 0) {
        str += nFeet + '\'';
    }

    // Inches

    /**
     * If inches AND fraction is nonzero, add both to string with double 
     * quotation marks.
     */
    if (nInches !== 0 && fractionNumerator !== 0) {
        str += `${nInches}-${fractionNumerator}/${fractionDenominator}"`;
    }
    /**
     * Else if inches is nonzero AND fraction is zero, add just inches to
     * string with double quotation marks.
     */
    else if (nInches !== 0) {
        str += nInches + '"';
    } 
    /**
     * Else if inches is zero AND fraction is nonzero, add fraction to string
     * with double quotation marks.
     */
    else if (fractionNumerator !== 0) {
        // If feet is also nonzero, add zero to string before fraction
        if (nFeet !== 0) {
            str += '0-';
        }

        str += `${fractionNumerator}/${fractionDenominator}"`;
    }

    return str;

    /**
     * NOTES:
     * 1'
     * 1'-2"
     * 1'-2 3/8"
     * 1'-0 3/8"
     * 2"
     * 2 3/8"
     * 3/8"
     * OR
     * 1'
     * 1'2"
     * 1'2-3/8"
     * 1'0-3/8"
     * 2"
     * 2-3/8"
     * 3/8"
     */
}

/**
 * Converts number to string representation of number in imperial units with 
 * fraction, given max base power of two for precision (ex. maxBase=3 for 
 * 1/(2**3)=1/8" precision).
 * @param {number} num 
 * @param {number} maxBase 
 * @returns {string}
 */
export function convertNumToImperialWithFraction(num, maxBase = 5) {
    // Number of feet
    const nFeet = (num >= 12) ? Math.floor(num / 12) : 0;

    // Number of inches
    const nInches = Math.floor(num - nFeet * 12);

    /**
     * Fraction
     * To avoid floating point precision errors, convert num to string and 
     * split on '.' if present at all. Initial value will initially be 
     * decimal of num as string OR undefined if NO decimal.
     */
    let decimal = num.toString().split('.')[1];

    /**
     * Convert only decimal from string back to number. If no decimal was 
     * found, set decimal to zero.
     */
    decimal = (decimal !== undefined) ? Number('.' + decimal) : 0;

    /**
     * Find fraction numerator and denominator (using log base 2 power).
     * Examples: 
     * 2^1 = n/2"
     * 2^2 = n/4"
     * 2^3 = n/8"
     * 2^4 = n/16"
     */
    
    // Top part of fraction, initialized to zero in case there is no decimal
    let fractionNumerator = 0;
    
    if (decimal !== 0) {
        /**
         * By multiplying the decimal by 2**n and rounding the product, the
         * final number is top part of fraction and 2**n is bottom part of
         * fraction. If top part of fraction is even (divisible by 2), then
         * the fraction can be further simplified by using smaller log base
         * 2 power, 2**(n-1). Keep finding top part of fraction while 
         * decrementing log base power of 2 until it becomes odd.
         */
        do {
            fractionNumerator = Math.round(decimal * (2**maxBase));
            maxBase--;
        } while (fractionNumerator % 2 === 0);
    }

    // Return imperial number as string using feet, inches, and fraction
    return createImperialNumWithFraction(
        nFeet, 
        nInches, 
        fractionNumerator, 
        2**(maxBase + 1)
    );
}
