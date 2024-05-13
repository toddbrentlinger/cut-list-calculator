/**
 * Computes best fit exponential curve using least squares of data points on grid.
 * 
 * https://mathworld.wolfram.com/LeastSquaresFittingExponential.html
 */
class LeastSquaresFittingExponential {
    constructor() {
        this.nLogY = 0;
        this.xSquared = 0;
        this.x = 0;
        this.xNLogY = 0;
        this.n = 0;
    }

    /**
     * Add data point on grid to dataset to fit the exponential curve.
     * @param {number} x 
     * @param {number} y
     */
    addDataPoint(x, y) {
        // If y is zero, nLogY will be Infinite. Skip this point.
        if (y === 0) { return; }
        
        // NOTE: If y is always <1, than nLogY will always be negative
        
        // Save reference to natural log of y to avoid calculating it twice next
        const nLogY = Math.log(y);

        // Add to each sum that is used to calculate best fit exponential curve
        this.nLogY += nLogY;
        this.xSquared += (x * x);
        this.x += x;
        this.xNLogY += (x * nLogY);
        this.n++;
    }

    /**
     * Returns x-axis value of best fit exponential curve, given y-axis value.
     * @param {number} y 
     * @returns {number}
     */
    solveForX(y) {
        const a = ((this.nLogY * this.xSquared) - (this.x * this.xNLogY)) 
            / ((this.n * this.xSquared) - (this.x ** 2));
        
        const A = Math.exp(a);
        const B = ((this.n * this.xNLogY) - (this.x * this.nLogY))
            / ((this.n * this.xSquared) - (this.x ** 2));
            
        /**
         * y = A*e^(Bx)
         * Solve for x
         * ln(y) = ln(A) + Bx
         * x = (ln(y) - ln(A)) / B
         * x = ln(y/A) / B
         */

        return (Math.log(y / A)) / B;
    }
}

/**
 * Computes best fit exponential curve using least squares of data points on grid.
 * 
 * https://mathworld.wolfram.com/LeastSquaresFittingExponential.html
 */
class LeastSquaresFittingExponentialAdv {
    constructor() {
        /**
         * | sum(y)     sum(x * y)    | * | a | = | sum(y * ln(y))      |
         * | sum(x * y) sum(x**2 * y) |   | b |   | sum (x * y * ln(y)) |
         */
        this.xSquaredY = 0;
        this.yNLogY = 0;
        this.xY = 0;
        this.xYNLogY = 0;
        this.y = 0;
    }

    /**
     * Add data point on grid to dataset to fit the exponential curve.
     * @param {number} x 
     * @param {number} y
     */
    addDataPoint(x, y) {
        // If y is zero, nLogY will be Infinite. Skip this point.
        if (y === 0) { return; }
        
        // NOTE: If y is always <1, than nLogY will always be negative
        
        // Save reference to natural log of y to avoid calculating it twice next
        const nLogY = Math.log(y);

        // Add to each sum that is used to calculate best fit exponential curve
        this.y += y;
        this.xY += (x * y);
        this.xSquaredY += (x * x * y);
        this.yNLogY += (y + nLogY);
        this.xYNLogY += (x * y * nLogY);
    }

    /**
     * Returns x-axis value of best fit exponential curve, given y-axis value.
     * @param {number} y 
     * @returns {number}
     */
    solveForX(y) {
        const a = ((this.xSquaredY * this.yNLogY) - (this.xY * this.xYNLogY)) 
            / ((this.y * this.xSquaredY) - (this.xY ** 2));
        
        const A = Math.exp(a);
        const B = ((this.y * this.xYNLogY) - (this.xY * this.yNLogY))
            / ((this.y * this.xSquaredY) - (this.xY ** 2));
            
        /**
         * y = A*e^(Bx)
         * Solve for x
         * ln(y) = ln(A) + Bx
         * x = (ln(y) - ln(A)) / B
         * x = ln(y/A) / B
         */

        return (Math.log(y / A)) / B;
    }
}

export default LeastSquaresFittingExponential;
export { LeastSquaresFittingExponentialAdv, };
