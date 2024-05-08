/** Keeps track of multiple counter values at once. */
class CountArray {
    // Private fields

    // Array to hold all counter values
    #arr;

    // Sum of all current counter values
    #total;

    /**
     * @constructor
     * @param {number[]} initArr 
     */
    constructor(initArr = []) {
        this.set(initArr);
    }

    // Getters/Setters

    /** Getter that returns total sum of all current counter values. */
    get total() {
        return this.#total;
    }

    // Public Methods

    /**
     * Pushes more counter values to end of array of counter values.
     * @param  {...number} items 
     */
    push(...items) {
        this.#arr.push(items);
        this.#updateTotal();
    }

    /**
     * Sets new array of counter values.
     * @param {number[]} newArr 
     */
    set(newArr) {
        this.#arr = newArr;
        this.#updateTotal();
    }

    /**
     * Returns counter value at specific index of array of counter values.
     * @param {number} index 
     * @returns 
     */
    valueAtIndex(index) {
        return this.#arr[index];
    }

    /**
     * Decrement counter value at specific index of array of counter values.
     * @param {number} index 
     */
    decrementValueAtIndex(index) {
        this.#arr[index]--;
        this.#total--;
    }

    /**
     * Increment counter value at specific index of array of counter values.
     * @param {number} index 
     */
    incrementValueAtIndex(index) {
        this.#arr[index]++;
        this.#total++;
    }

    // Private Methods

    /** Sets private field total to equal sum of all counter values in array. */
    #updateTotal() {
        this.#total = this.#arr.reduce((accum, curr) => accum + curr, 0);
    }
}

export default CountArray;
