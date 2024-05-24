import CutList from "./cutList.js";
import CutPiece from "./cutPiece.js";
import UncutPiece from "./uncutPiece.js";
import CutSequence from "./cutSequence.js";
import cutListCalculatorProgress from "./cutListCalculatorProgress.js";
import NestedLoopCounter from "./nestedLoopCounter.js";
import CountArray from "./countArray.js";
import { createDurationString } from "./utilities.js";

/** Module to calculate cheapest cut list. */
const cutListCalculator = (() => {
    /**
     * 
     * @param {number[]} currNumAvailableUncutLengths 
     * @param {number[]} maxNumAvailableUncutLengths 
     * @param {number} index 
     * @returns {index|null} Index of available UncutPiece length that was decremented OR null if cannot decrement
     */
    function decrement(currNumAvailableUncutLengths, maxNumAvailableUncutLengths, index = 0) {
        // If reached end, cannot decrement any more. Return null.
        if (index >= currNumAvailableUncutLengths.length) { return null; }

        // Decrement current count at index
        currNumAvailableUncutLengths[index]--;
        
        /**
         * If current count at index (after decrementing) is less than zero, 
         * need to decrement next index.
         */
        if (currNumAvailableUncutLengths[index] < 0) {
            // Set count at index to zero
            currNumAvailableUncutLengths[index] = 0;

            // Recursively decrement count at next index
            return decrement(currNumAvailableUncutLengths, maxNumAvailableUncutLengths, ++index);
        }

        return index;
    }

    /**
     * Finds cheapest cut lists with CutPieces and UncutPieces of different dimensions
     * @param {CutPiece[]} cutPieces 
     * @param {UncutPiece[]} uncutPieces
     * @param {function} progressCallback
     * @returns {CutList[]}
     */
    function getCutLists(cutPieces, uncutPieces, progressCallback = console.log) {
        /** Object to sort CutPieces/UncutPieces by the same cross-section dimensions. */
        const pieces = {};

        /** Array of CutLists calculated for each cross-section. */
        const cutLists = [];

        /** Time that cut list calculation began. */
        let startTime = Date.now();

        // Sort matching dimensions of CutPieces and UncutPieces together

        /**
         * Example of pieces object:
         * {
         *   2: {
         *     4: {
         *       cut: [],   -> 2x4 cutPieces
         *       uncut: [], -> 2x4 uncutPieces
         *     },
         *   },
         *   4: {
         *     4: {
         *       cut: [],   -> 4x4 cutPieces
         *       uncut: [], -> 4x4 uncutPieces
         *     },
         *   },
         * }
         */

        // CutPieces sort
        cutPieces.forEach((cutPiece) => {
            /**
             * Getter cutWithKerf is NOT included if cutPiece passed to worker.
             * Set prototype to CutPiece if NOT included.
             */
            if (cutPiece.cutWithKerf === undefined) {
                Object.setPrototypeOf(cutPiece, CutPiece.prototype);
            }

            // If new thickness in pieces object, add key equal to thickness
            if (!(cutPiece.thickness in pieces)) {
                pieces[cutPiece.thickness] = {};
            }

            /**
             * If new width with thickness in pieces object, add key equal to 
             * width inside thickness key object.
             * Then add object to hold all matching CutPieces and Uncut Pieces 
             * as the value.
             */
            if (!(cutPiece.width in pieces[cutPiece.thickness])) {
                pieces[cutPiece.thickness][cutPiece.width] = {cut: [], uncut: []};
            }

            // Push current CutPiece to matching thickness and width in pieces object
            pieces[cutPiece.thickness][cutPiece.width].cut.push(cutPiece);
        });

        // UncutPieces sort
        uncutPieces.forEach((uncutPiece) => {
            // If new thickness in pieces object, add key equal to thickness
            if (!(uncutPiece.thickness in pieces)) {
                pieces[uncutPiece.thickness] = {};
            }

            /**
             * If new width with thickness in pieces object, add key equal to 
             * width inside thickness key object.
             * Then add object to hold all matching CutPieces and Uncut Pieces 
             * as the value.
             */
            if (!(uncutPiece.width in pieces[uncutPiece.thickness])) {
                pieces[uncutPiece.thickness][uncutPiece.width] = {cut: [], uncut: []};
            }

            // Push current UncutPiece to matching thickness and width in pieces object
            pieces[uncutPiece.thickness][uncutPiece.width].uncut.push(uncutPiece);
        });

        /**
         * TODO: Check if any thickness-width has empty CutPieces or UncutPieces array.
         * Could return object with success boolean and error message if success is false.
         * Need to return same success boolean and message keys in object if cutlists are
         * returned.
         * Could instead check inside getCheapestCutList method and return error message
         * instead of a CutList.
         */

        // Find cheapest cut list for each cross section
        let currCutList;
        Object.values(pieces).forEach((pieceThicknessObj) => {
            Object.values(pieceThicknessObj).forEach((pieceObj) => {
                // Find cut list for current cross section
                currCutList = getCheapestCutList(
                    pieceObj.cut, 
                    pieceObj.uncut, 
                    progressCallback
                );
                
                /**
                 * If cut list was found (NOT undefined), push to array of cut 
                 * lists for other cross sections.
                 */
                if (currCutList !== undefined) {
                    cutLists.push(currCutList);
                }
            });
        });

        // Pass completion message to progressCallback function
        progressCallback(`Completed in ${createDurationString(Date.now() - startTime)}`);

        // Return array of cheapest cut lists for each cross section
        return cutLists;
    }

    /**
     * Finds cheapest CutList with CutPieces and UncutPieces of the same dimension
     * @param {CutPiece[]} cutPieces - Array of cutPieces with same dimension
     * @param {UncutPiece[]} uncutPieces - Array of uncutPieces with matching dimension of cutPieces
     * @param {function} progressCallback
     * @returns {CutList|undefined}
     */
    function getCheapestCutList(cutPieces, uncutPieces, progressCallback = console.log) {
        // Return if either CutPieces or UncutPieces arrays are empty
        if ((cutPieces.length === 0) || (uncutPieces.length === 0)) {
            return;
        }

        /** Time that current cut list calculation began. */
        const startTime = Date.now();

        /**
         * Sort cutPieces by cut length in DESCENDING order so largest 
         * CutPieces are used first to fill any remaining length of an 
         * UncutPiece.
         */
        cutPieces.sort((a,b) => b.length - a.length);

        /**
         * Sort uncutPieces by length in ASCENDING order so smallest
         * UncutPieces are filled first with CutPieces. This prevents any 
         * CutPiece with exact length of UncutPiece to be used to fill a larger 
         * UncutPiece. (ex. 7' CutPiece should ideally fill a 7' UncutPiece 
         * instead of being used to fill a 8' or larger UncutPiece.)
         */
        uncutPieces.sort((a,b) => a.length - b.length);

        /** Array of CutPiece quantities the same order as CutPiece array. */
        const cutPieceQuantities = cutPieces
            .map((cutPiece) => cutPiece.quantity);
        
        /** Total cumulative length of all individual CutPieces. */
        const individualCutPiecesTotalLength = cutPieces
            .reduce((accum, cutPiece) => accum + cutPiece.length, 0);
        
        /**
         * Two indice array where first index is sub-array of CutPieces cut 
         * from an UncutPiece and second index is any remaining length leftover.
         */
        let cutSequenceArr;
        
        /** Current CutList calculated in loop that is compared to best CutList. */
        let currCutList = new CutList();

        /** Best CutList calculated. */
        let bestCutList;

        /**
         * NestedLoopCounter for the number of current/maximum available UncutPieces.
         * Maximum number of each available lengths needed if only used that 
         * available length for all cutPieces (initialized to zero).
         * Current number of each available lengths in loop to create cut list 
         * (initialized to zero).
         */
        let numAvailableUncutPiecesNLC = new NestedLoopCounter(uncutPieces.length);
        
        /** Current count of each CutPiece not yet assigned to a CutSequence. */
        let currCutPieceQuantities = new CountArray();

        /**
         * Pass progress message string about finding maximum UncutPiece 
         * quantities into progress callback function.
         */
        progressCallback('Finding maximum Uncut quantities to test.')
        
        /**
         * For each UncutPiece, find maximum quantity needed to get all 
         * individual CutPieces excluding any CutPieces that are too long.
         */
        uncutPieces.forEach((uncutPiece, index) => {
            /**
             * Reset current count array of each CutPiece to equal each 
             * CutPiece quantity for new loop.
             */
            currCutPieceQuantities.set([ ...cutPieceQuantities ]);

            // Clear current CutList from previous loop
            currCutList.clear();
            
            // Find cut sequences of CutPieces using just current UncutPieces
            while (currCutPieceQuantities.total !== 0) {
                /**
                 * Get cut sequence as array of CutPieces and remaining length. 
                 * CountArray currCutPieceQuantities will be updated whenever a 
                 * CutPiece is selected for the cut sequence.
                 */
                cutSequenceArr = CutSequence.createCutSequenceArr(
                    uncutPiece.length, 
                    cutPieces, 
                    currCutPieceQuantities
                );
                
                /**
                 * If no CutPieces array returned in cut sequence, no more 
                 * CutPieces can be used. Break while loop.
                 */
                if (cutSequenceArr[0].length === 0) {
                    break;
                }
                
                // Add new CutSequence to current CutList using cut sequence array
                currCutList.push(
                    new CutSequence(uncutPiece, ...cutSequenceArr)
                );

                // Increment count of max quantity of corresponding UncutPiece
                numAvailableUncutPiecesNLC.max[index]++;
            }

            /**
             * Check if current CutList has less price than the best CutList 
             * only if NO available CutPieces still left.
             */
            if (
                (currCutPieceQuantities.total === 0)
                && ((bestCutList === undefined) || (bestCutList.getPrice() >= currCutList.getPrice()))
            ) {
                bestCutList = currCutList.deepCopy();
            }
        });
        
        /** 
         * Trigger used to skip or increment numAvailableUncutPiecesNLC or 
         * even a condition to show when no more nested loop count.
         */
        let incrementTrigger;

        /**
         * Stores result of decrement method. Index of available UncutPiece 
         * length that was incremented OR null if cannot decrement.
         */
        let decrementTrigger;

        /** Stores temporary copy of current UncutPieces counts from numAvailableUncutPiecesNLC. */
        let tempCurrNumAvailableUncutPiecesCounter;

        /** Price of current combination of UncutPieces during loop. */
        let currNumAvailableUncutLengthsTotalPrice;

        /** Flag to skip remaining remaining column of UncutPiece combinations if true. */
        let skipFlag;
        
        // Set progress bar max count (max combinations of UncutPieces)
        cutListCalculatorProgress.setMaxCount(
            numAvailableUncutPiecesNLC.getMaxCount()
        );

        // Set progress bar progress callback
        cutListCalculatorProgress.setProgressCallback(progressCallback);
        
        // Check every iteration/combination of UncutPiece quantities for best CutList
        do {
            // Set progress bar current count (current combinations traversed so far)
            cutListCalculatorProgress.setCount(
                numAvailableUncutPiecesNLC.getDynamicNestedLoopCount(),
            );

            // Reset skipFlag for current loop in case it was triggered last loop
            skipFlag = false;

            // Find price of current combination of UncutPieces of current loop
            currNumAvailableUncutLengthsTotalPrice = numAvailableUncutPiecesNLC.curr
                .reduce((accum, curr, index) => accum + uncutPieces[index].price * curr, 0);
            
            /**
             * If current combination of UncutPieces has total price 
             * more than current best cut list, set skipFlag to true to skip 
             * checking more of current UncutPiece since it will always be 
             * more expensive.
             */
            if (
                (bestCutList !== undefined) 
                && (currNumAvailableUncutLengthsTotalPrice >= bestCutList.getPrice())
            ) {
                skipFlag = true;
            }
            
            /**
             * If zero UncutPieces to use, skip.
             * If only one UncutPiece type to use, already checked those cases 
             * previously when finding maximum UncutPiece quantity counts.
             * If length of all UncutPieces is less than length of all CutPieces, 
             * skip since not enough material.
             */
            else if (
                (numAvailableUncutPiecesNLC.curr.filter((count) => count > 0).length > 1)
                && (numAvailableUncutPiecesNLC.curr.reduce((accum, curr, index) => accum + curr * uncutPieces[index].length, 0) >= individualCutPiecesTotalLength)
            ) {
                /**
                 * Create copy of numAvailableUncutPiecesNLC current array to 
                 * change without modiying original.
                 */
                tempCurrNumAvailableUncutPiecesCounter = [ ...numAvailableUncutPiecesNLC.curr ];
                
                /**
                 * Reset current count array of each CutPiece to equal each 
                 * CutPiece quantity for new loop.
                 */
                currCutPieceQuantities.set([ ...cutPieceQuantities ]);
    
                // Clear current CutList from previous loop
                currCutList.clear();

                // Find cut sequences of CutPieces using just current UncutPieces
                /**
                 * ISSUE: UncutPiece counter array is decremented before first 
                 * combination is tested. 
                 */
                do {
                    /**
                     * Decrement available UncutPieces counters to try new 
                     * combination of UncutPieces counts. 
                     * If decrement trigger is null, array cannot be decremented 
                     * further. Break out of loop 
                     */
                    decrementTrigger = decrement(tempCurrNumAvailableUncutPiecesCounter, numAvailableUncutPiecesNLC.max);
                    if (decrementTrigger === null) { break; }

                    /**
                     * Get cut sequence as array of CutPieces and remaining length. 
                     * CountArray currCutPieceQuantities will be updated whenever a 
                     * CutPiece is selected for the cut sequence.
                     */
                    cutSequenceArr = CutSequence.createCutSequenceArr(
                        uncutPieces[decrementTrigger].length, 
                        cutPieces, 
                        currCutPieceQuantities
                    );
                    
                    // Add CutSequence to current CutList
                    currCutList.push(
                        new CutSequence(uncutPieces[decrementTrigger], ...cutSequenceArr)
                    );
                } while (currCutPieceQuantities.total !== 0);

                // Check if current CutList has less price than the best CutList
                // If there are still available CutPieces, not enough UncutPieces. 
                
                if (currCutPieceQuantities.total === 0) {
                    // If reach here, current cut list is valid

                    /**
                     * Set skipFlag to true to skip checking more of current 
                     * UncutPiece since it will always be more expensive.
                     */
                    skipFlag = true;

                    /**
                     * Current cut list is better if NO unused uncut pieces 
                     * (tempCurrNumAvailableUncutPiecesCounter has all zero 
                     * values) AND it's cheaper.
                     */
                    if (
                        (bestCutList === undefined) 
                        || (
                            (tempCurrNumAvailableUncutPiecesCounter.findIndex((val) => val > 0) === -1) 
                            && (bestCutList.getPrice() >= currCutList.getPrice())
                        )
                    ) {
                        bestCutList = currCutList.deepCopy();
                    }
                }
            }
            
            /**
             * If skipFlag is true, skip rest of current UncutPiece index loop. 
             * Else simply increment. If incrementTrigger is null, all combinations
             * have been tested. Break loop.
             */
            incrementTrigger = (skipFlag) 
                ? numAvailableUncutPiecesNLC.skip()
                : numAvailableUncutPiecesNLC.increment();
        } while (incrementTrigger !== null);

        console.log(bestCutList);
        console.log(`${bestCutList.getPrice()}`);
        console.log(`Completed in ${createDurationString(Date.now() - startTime)}`);

        return bestCutList;
    }

    return {
        getCheapestCutList,
        getCutLists,
    };
})();

export default cutListCalculator;
