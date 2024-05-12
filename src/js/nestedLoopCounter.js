/** Functionality for dynamic level of nested loop counters. */
class NestedLoopCounter {
    /**
     * @constructor
     * @param {number} length 
     */
    constructor(length = 0) {
        // Set current count and max counts to initial value of zero
        this.curr = new Array(length).fill(0);
        this.max = new Array(length).fill(0);
    }

    /** Returns size of nested loop counter (max depth of inner-most loop). */
    get length() {
        return this.max.length;
    }
    
    /**
     * Returns count of all iterations up to the current nested loop values.
     * @returns {number}
     */
    getDynamicNestedLoopCount() {
        // If current counts array is empty, return zero
        if (!this.curr.length) { 
            return 0; 
        }

        // Find last index of a non-zero value, to skip larger nested loops entirely
        const lastNonZeroIndex = this.curr.findLastIndex((val) => val > 0);

        // If lastNonZeroIndex is -1, all values of array are zero. Return one count.
        if (lastNonZeroIndex === -1) {
            return 1;
        }

        // If reach here, lastNonZeroIndex >= 0 after findLastIndex() call

        // Initialize count to first index value plus one (add extra for zero value)
        let count = this.curr[0] + 1;

        /**
         * For every index after the first up to lastNonZeroIndex, add the 
         * product of all previous indices corresponding max value plus one.
         */
        for (let i = 1; i <= lastNonZeroIndex; i++) {
            count += 
                this.curr[i] 
                * (
                    this.max.slice(0, i)
                        .reduce((accum, curr) => accum * (curr + 1), 1)
                );
        }
        
        return count;

        /**
         * How to get number from counter?
         * 
         * max = [5,4,3,2]
         * possibilities = 6*5*4*3 = 360
         * 
         * max =     [5,4,3,2]
         * counter = [3,0,0,0]
         * [0] 1
         * [3] +3
         * 4
         * - First index is last non-zero index, add first index value plus one
         * 3 + 1 = 4
         * 
         * max =     [5,4,3,2]
         * counter = [5,0,0,0]
         * - First index is last non-zero index, add first index value plus one
         * 5 + 1 = 6
         * 
         * max =     [5,4,3,2]
         * counter = [3,2,0,0]
         * [0,0] 1
         * [5,0] +5
         * [0,1] +1
         * [5,1] +5
         * [0,2] +1
         * [3,2] +3
         * 16
         * [5,0] +6
         * [5,1] +6
         * [0,2] +1
         * [3,2] +3
         * 16
         * - First non-zero index (1) value (2) * prev index (0) corresponding max value plus 1 (5+1=6)
         * 2 * 6 = 12
         * - Plus first index (0) value plus 1 (3+1=4)
         * 12 + 4 = 16
         * 
         * max =     [5,4,3,2]
         * counter = [5,4,0,0]
         * [5,0] +6
         * [5,1] +6
         * [5,2] +6
         * [5,3] +6
         * [5,4] +6
         * 30
         * - First non-zero index (1) value (4) * prev index (0) corresponding max value plus 1 (5+1=6)
         * 4 * 6 = 24
         * - Plus first index (0) value plus 1 (5+1=6)
         * 24 + 6 = 30
         * 
         * max =     [5,4,3,2]
         * counter = [0,0,1,0]
         * [5,4,0,0] +30
         * [0,0,1,0] +1
         * 31
         * - First index (0) value plus 1 (0+1=1)
         * 1
         * - Plus next index (1) value (0) * (product of prev indices corresponding max plus one)
         * 1 + 0 * 6 = 1
         * - Plus next index (2) value (1) * (product of prev indices corresponding max plus one)
         * 1 + 1 * (6*5) = 31
         * 
         * max =     [5,4,3,2]
         * counter = [5,4,3,2]
         * 360
         * - First index (0) value plus 1 (5+1=6)
         * 6
         * - Plus next index (1) value (4) * (product of prev indices corresponding max plus one)
         * 6 + 4 * 6 = 30
         * - Plus next index (2) value (3) * (product of prev indices corresponding max plus one)
         * 30 + 3 * (6*5) = 30 + 3 * 30 = 120
         * - Plus next index (3) value (2) * (product of prev indices corresponding max plus one)
         * 120 + 2 * (6*5*4) = 120 + 2 * 120 = 120 + 240 = 360
         */
    }

    /**
     * Returns count of maximum iterations of the maximum nested loop values.
     * @returns {number}
     */
    getMaxCount() {
        // Find last index of a non-zero value, to skip larger nested loops entirely
        const lastNonZeroIndex = this.max.findLastIndex((val) => val > 0);
        
        // Return product of all counts (plus one for zero value) up to lastNonZeroIndex
        return this.max
            .slice(0, lastNonZeroIndex === -1 ? this.max.length : lastNonZeroIndex + 1)
            .reduce((accum, curr) => accum * (curr + 1), 1);
    }

    /**
     * Recursive function that increments count of 'index' of current nested 
     * loop count and returns largest index of nested loop count that changed.
     * Returns null if index reaches end of current nested loop counts array.
     * @param {number} index 
     * @returns {null|undefined} Returns null if NO nested loop counts at index or higher can be incremented
     */
    increment(index = 0) {
        // Check if index has reached end
        if (index >= this.curr.length) { return null; }

        // Increment count at index
        this.curr[index]++;
        
        /**
         * If current index value has surpassed the equivalent max value, set 
         * current index value to zero and then recursively increment value of 
         * next index.
         */
        if (this.curr[index] > this.max[index]) {
            this.curr[index] = 0;
            return this.increment(++index);
        }
    }

    /**
     * Skips remaining iterations of loop at first non-zero value index.
     * @returns {null|undefined} Returns null if NO nested loop counts can be skipped
     */
    skip() {
        // Find first index with non-zero value count
        const firstNonZeroValueIndex = this.curr.findIndex((val) => val > 0);
        
        // If array is empty OR all values are zero, return
        if (firstNonZeroValueIndex === undefined) {
            return;
        }

        // Set first index with non-zero value count to zero
        this.curr[firstNonZeroValueIndex] = 0;

        // Increment count of next index and return result
        return this.increment(firstNonZeroValueIndex + 1);

        /**
         * ex. curr=[1,3,0,0] max=[3,4,4,5] results in a valid cut list.
         * Next increments of [2,3,0,0] and [3,3,0,0] will always be more expensive than [1,3,0,0].
         * Make first non-zero value 0 and increment value after.
         * [0,4,0,0] -> continue
         */
    }
}

export default NestedLoopCounter;
