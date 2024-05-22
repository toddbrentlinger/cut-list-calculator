import { addCommasToNumber, createDurationString } from "./utilities.js";
import LeastSquaresFittingExponential from "./leastSquaresFittingExponential.js";

/**
 * Module to track progress of known number of iterations and display updates 
 * of current progress.
 */
const cutListCalculatorProgress = (() => {
    /** Number of digits after decimal to display as percentage. */
    const decimalDigitsToDisplay = 3;

    /** Duration, in milliseconds, between passing progress string to callback. */
    const updateInterval = 10000;

    /** Current number of iterations of progress. */
    let currCount = 0;

    /** Maximum number of iterations of progress. */
    let maxCount = 1;
    
    /** Function to pass progress string every interval. */
    let progressCallback = console.log;
    
    /** Last time, in milliseconds, the progress callback was called. */
    let lastDisplayDeltaTime = 0;
    
    /** Time, in milliseconds, the current progress was started. */
    let startTime;

    /** Used to estimate remaining time of progress. */
    let leastSquaresFittingExponential = new LeastSquaresFittingExponential();
    
    /**
     * Returns percentage of current progress (ex. return 52.3 for 52.3%).
     * @returns {number}
     */
    function getPercentage() {
        return (currCount / maxCount) * 100;
    }

    /**
     * Sets new current count of progress.
     * @param {number} newCount 
     */
    function setCount(newCount) {
        // Update current count
        currCount = newCount;

        // If progress has not already started, set start time to now
        if (startTime === undefined) {
            startTime = Date.now();
        }

        // Get time between now and start time of current progress
        const deltaTime = Date.now() - startTime;

        /**
         * If it's been longer than updateInterval since last updated time,
         * display current progress using progress callback function.
         */
        if (deltaTime - lastDisplayDeltaTime > updateInterval) {
            // Save reference to calculated percentage of current progress 
            const percentage = getPercentage();

            /**
             * Add data point to leastSquaresFittingExponential to better 
             * estimate completion time. To avoid numbers overflowing when 
             * calculating best fit curve, data points should be as small
             * value as possible. X-coord is nth data point and Y-coord is
             * percentage as decimal where 1 represents 100%.
             */
            leastSquaresFittingExponential.addDataPoint(
                Math.floor(deltaTime / updateInterval), 
                (percentage / 100)
            );
            
            /**
             * Use leastSquaresFittingExponential to estimate time left to 
             * complete calculation.
             */
            const timeLeftEstimate = (leastSquaresFittingExponential.solveForX(1) * updateInterval) - deltaTime;
            
            // Pass current progress update string to progress callback function
            progressCallback(
                `${addCommasToNumber(currCount)} of ${addCommasToNumber(maxCount)} (${percentage.toFixed(decimalDigitsToDisplay)}%)\nTime Elapsed: ${createDurationString(deltaTime)}\nTime Left (est.): ${createDurationString(timeLeftEstimate)}`
            );
            
            /**
             * Set time update was last displayed to current time for future 
             * function calls.
             */
            lastDisplayDeltaTime = deltaTime;
        }
    }

    /**
     * Sets new max count of progress.
     * @param {number} newMaxCount 
     * @returns 
     */
    function setMaxCount(newMaxCount) {
        if (typeof newMaxCount !== 'number') { return; }

        maxCount = newMaxCount;
    }

    /**
     * Sets new progress callback function.
     * @param {Function} newProgressCallback 
     * @returns 
     */
    function setProgressCallback(newProgressCallback) {
        if (typeof newProgressCallback !== 'function') { return; }

        progressCallback = newProgressCallback;
    }

    return {
        getPercentage,
        setCount,
        setMaxCount,
        setProgressCallback,
    };
})();

export default cutListCalculatorProgress;
