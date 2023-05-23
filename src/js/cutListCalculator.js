import { CutList } from "./cutList.js";
import CutSequence from "./cutSequence.js";

/**
 * TODO: While looping through combinations of uncut pieces, if the combination 
 * price is higher than the current best cut list price, then can skip.
 */

const cutListCalculator = (() => {
    let bestCutList;

    /**
     * 
     * @param {[Number]} numAvailableLengthsCounter 
     * @param {[Number]} maxNumAvailableLengths 
     * @returns {Number}
     */
    /**
     * How to get number from counter?
     * max = [5,4,3,2]
     * possibilities = 6*5*4*3 = 360
     * 
     * counter = [3,0,0,0]
     * [0] 1
     * [3] +3
     * 4
     * - First index is last non-zero index, add first index value plus one
     * 3 + 1 = 4
     * 
     * counter = [5,0,0,0]
     * - First index is last non-zero index, add first index value plus one
     * 5 + 1 = 6
     * 
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
    function getDynamicNestedLoopCount(numAvailableLengthsCounter, maxNumAvailableLengths) {
        // If array is empty return zero
        if (!numAvailableLengthsCounter.length) { 
            return 0; 
        }

        const lastNonZeroIndex = numAvailableLengthsCounter.findLastIndex((val) => val > 0);
        // If lastNonZeroIndex is -1, all values of array are zero. Return one count.
        if (lastNonZeroIndex === -1) {
            return 1;
        }

        // If reach here, lastNonZeroIndex >= 0 after findLastIndex() call

        // Initialize count to first index value plus one
        let count = numAvailableLengthsCounter[0] + 1;

        // For every index after the first up to lastNonZeroIndex, add the 
        // product of all previous indices corresponding max value plus one
        for (let i = 1; i <= lastNonZeroIndex; i++) {
            count += numAvailableLengthsCounter[i] * maxNumAvailableLengths.slice(0, i).reduce((accum, curr) => accum * (curr + 1));
        }
        
        return count;
    }

    function getPercentage(numAvailableLengthsCounter, maxNumAvailableLengths) {
        const num = getDynamicNestedLoopCount(numAvailableLengthsCounter, maxNumAvailableLengths);

        const maxLastNonZeroIndex = maxNumAvailableLengths.findLastIndex((val) => val > 0);
        const max = maxNumAvailableLengths
            .slice(0, maxLastNonZeroIndex === -1 ? maxNumAvailableLengths.length : maxLastNonZeroIndex + 1)
            .map((val) => val + 1)
            .reduce((accum, curr) => accum * curr);
        
        const percentage = (num / max) * 100;
        //console.log(`Num: ${num} - Max: ${max} - %${percentage.toFixed(2)}`);
        return percentage;
    }

    function skip(numAvailableLengthsCounter, maxNumAvailableLengths) {
        /**
         * ex. curr=[1,3,0,0] max=[3,4,4,5] results in a valid cut list.
         * Next increments of [2,3,0,0] and [3,3,0,0] will always be more expensive than [1,3,0,0].
         * Make first non-zero value 0 and increment value after.
         * [0,4,0,0] -> continue
         */

        const firstNonZeroValueIndex = numAvailableLengthsCounter.findIndex((val) => val > 0);
        
        if (firstNonZeroValueIndex === undefined) {
            // Array is empty OR all values are zero
            return;
        }

        numAvailableLengthsCounter[firstNonZeroValueIndex] = 0;

        return increment(numAvailableLengthsCounter, maxNumAvailableLengths, firstNonZeroValueIndex + 1);
    }

    function increment(numAvailableLengthsCounter, maxNumAvailableLengths, index = 0) {
        // Increment value in first index of numAvailableLengthsCounter
        // If new value exceeds value in same index of maxNumAvailableLengths
            // Set index of numAvailableLengthsCounter to zero
            // Increment value in next index of numAvailableLengthsCounter
            // Repeat using recursion

        // Check if reached end
        if (index >= numAvailableLengthsCounter.length) { return null; }

        numAvailableLengthsCounter[index]++;
        
        if (numAvailableLengthsCounter[index] > maxNumAvailableLengths[index]) {
            numAvailableLengthsCounter[index] = 0;
            return increment(numAvailableLengthsCounter, maxNumAvailableLengths, ++index);
        }
    }

    function decrement(numAvailableLengthsCounter, maxNumAvailableLengths, index = 0) {
        // Check if reached end
        if (index >= numAvailableLengthsCounter.length) { return null; }

        numAvailableLengthsCounter[index]--;
        
        if (numAvailableLengthsCounter[index] < 0) {
            numAvailableLengthsCounter[index] = 0;
            return decrement(numAvailableLengthsCounter, maxNumAvailableLengths, ++index);
        }

        return index;
    }

    /**
     * Finds cheapest cut lists with CutPieces and UncutPieces of different dimensions
     * @param {[CutPiece]} cutPieces 
     * @param {[UncutPiece]} uncutPieces
     * @returns
     */
    function getCutList(cutPieces, uncutPieces) {
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
        const pieces = {};
        const cutLists = [];

        // Sort matching dimensions of CutPieces and UncutPieces together

        cutPieces.forEach((cutPiece) => {
            if (!(cutPiece.thickness in pieces)) {
                pieces[cutPiece.thickness] = {};
            }

            if (!(cutPiece.width in pieces[cutPiece.thickness])) {
                pieces[cutPiece.thickness][cutPiece.width] = {cut: [], uncut: []};
            }

            pieces[cutPiece.thickness][cutPiece.width].cut.push(cutPiece);
        });

        uncutPieces.forEach((uncutPiece) => {
            if (!(uncutPiece.thickness in pieces)) {
                pieces[uncutPiece.thickness] = {};
            }

            if (!(uncutPiece.width in pieces[uncutPiece.thickness])) {
                pieces[uncutPiece.thickness][uncutPiece.width] = {cut: [], uncut: []};
            }

            pieces[uncutPiece.thickness][uncutPiece.width].uncut.push(uncutPiece);
        });

        // Find cheapest cut list for each dimension
        Object.values(pieces).forEach((pieceThicknessObj) => {
            Object.values(pieceThicknessObj).forEach((pieceObj) => {
                cutLists.push(
                    getCheapestCutList(pieceObj.cut, pieceObj.uncut)
                );
            });
        });

        // Return array of cheapest cut lists for each dimension
        return cutLists;
    }

    /**
     * Finds cheapest CutList with CutPieces and UncutPieces of the same dimension
     * @param {[CutPiece]} cutPieces Array of cutPieces with same dimension
     * @param {[UncutPiece]} uncutPieces Array of uncutPieces with matching dimension of cutPieces
     * @returns {CutList}
     */
    function getCheapestCutList(cutPieces, uncutPieces) {
        // Check for empty pieces
        if (!cutPieces.length || !uncutPieces) {
            return;
        }

        bestCutList = undefined;

        // Sort cutPieces by cut length in decreasing order
        cutPieces.sort((a,b) => b.length - a.length);

        // Sort availableLengthsArr in decreasing order
        //availableLengthsArr.sort((a,b) => b - a);

        // Sort uncutPieces in descending order of length
        uncutPieces.sort((a,b) => b.length - a.length);

        // Create array where each value represents a single quantity cutPiece
        // instead of normal array of cutPieces that has any number quantity in the
        // 'quantity' property.
        let individualCutPieces = cutPieces.flatMap((cutPiece) => {
            return new Array(cutPiece.quantity)
                .fill(cutPiece);
        });

        // Maximum number of each available lengths needed if only used that 
        // available length for all cutPieces (initialized to zero)
        let maxNumAvailableLengths = new Array(uncutPieces.length).fill(0);
        let numAvailableLengthsCounter = new Array(uncutPieces.length).fill(0);

        let availableCutPiecesByIndex, cutSequence, cutSequenceArr;
        let currCutList = new CutList();

        uncutPieces.forEach((uncutPiece, index) => {
            //maxNum = Math.ceil(totalCutLength / uncutPiece.length);

            availableCutPiecesByIndex = Array.from(
                {length: individualCutPieces.length},
                (value, index) => index
            );

            // Clear current CutList from previous loop
            currCutList.clear();

            // Check that maxNum of uncutPiece.length can be used with the cutPieces required.
            // If not, keep incrementing until reach a value that is successful.
            // TODO: Do not need maxNum. Only need to check availableCutPiecesByIndex and still increment count in maxNumAvailableLengths
            // TODO: Infinite loop if cut piece is longer than uncut piece length. Array availableCutPiecesByIndex never reaches zero.
            while (availableCutPiecesByIndex.length) {
                cutSequenceArr = CutSequence.createCutSequenceArr(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
                //debugger;
                // If cutSequenceArr returns just the remaining value (array length 1),
                // no more cut pieces can be used.
                if (cutSequenceArr.length == 1) {
                    break;
                }

                // Create CutSequence instance from cutSequenceArr
                cutSequence = new CutSequence(uncutPiece);
                cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
                cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
                
                // Add CutSequence to current CutList
                currCutList.push(cutSequence);

                // Increment count of max number of corresponding UncutPiece
                maxNumAvailableLengths[index]++;
            }

            // Check if current CutList has less price than the best CutList only if NO available cut pieces still left
            if (
                (!availableCutPiecesByIndex.length)
                && ((bestCutList == undefined) || (bestCutList.getPrice() >= currCutList.getPrice()))
            ) {
                bestCutList = currCutList.deepCopy();
            }
        });

        let incrementTrigger, decrementTrigger, tempNumAvailableLengthsCounter, skipFlag;
        let percentFactorCounter = 1;
        let percentMultipleDisplay = 5;
        do {
            //debugger;
            //console.log(numAvailableLengthsCounter);
            let percentage = getPercentage(numAvailableLengthsCounter, maxNumAvailableLengths);
            
            if (percentage && percentage > (percentMultipleDisplay * percentFactorCounter)) {
                console.log(`${percentage.toFixed(0)}%`);
                percentFactorCounter++;
            }

            skipFlag = false;

            // If all values are zero, skip
            // If only one value is non-zero, skip since already check those cases previously
            // If length of all uncut pieces is less than length of all cut pieces, skip since not enough material
            if ((numAvailableLengthsCounter.filter((count) => count > 0).length > 1)
                && (numAvailableLengthsCounter.reduce((accum, curr, index) => accum + curr * uncutPieces[index].length, 0) >= individualCutPieces.reduce((accum, curr) => accum + curr.cutWithKerf, 0))
            ) {
                tempNumAvailableLengthsCounter = [...numAvailableLengthsCounter];

                availableCutPiecesByIndex = Array.from(
                    {length: individualCutPieces.length},
                    (value, index) => index
                );
    
                // Clear current CutList from previous loop
                currCutList.clear();

                do {
                    //debugger;
                    // Check that maxNum of uncutPieces[decrementTrigger].length can be used with the cutPieces required.
                    // If not, keep incrementing until reach a value that is successful.

                    decrementTrigger = decrement(tempNumAvailableLengthsCounter, maxNumAvailableLengths);
                    if (decrementTrigger === null) { break; }

                    cutSequenceArr = CutSequence.createCutSequenceArr(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);
    
                    // Create CutSequence instance from cutSequenceArr
                    cutSequence = new CutSequence(uncutPieces[decrementTrigger]);
                    cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
                    cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
                    
                    // Add CutSequence to current CutList
                    currCutList.push(cutSequence);
                } while (availableCutPiecesByIndex.length);

                // Check if current CutList has less price than the best CutList
                // If there are still available cut pieces, not enough uncut pieces. 
                
                if (!availableCutPiecesByIndex.length) {
                    // If reach here, current cut list is valid
                    skipFlag = true;

                    // Current cut list is better if NO unused uncut pieces (tempNumAvailableLengthsCounter has all zero values) AND it's cheaper
                    if (
                        (bestCutList == undefined) 
                        || ((tempNumAvailableLengthsCounter.findIndex((val) => val > 0) === -1) && (bestCutList.getPrice() >= currCutList.getPrice()))
                    ) {
                        console.log(`New Best Cut List - Best: ${bestCutList.getPrice()} - Curr: ${currCutList.getPrice()} - Total: ${numAvailableLengthsCounter} - Left: ${tempNumAvailableLengthsCounter}`);
                        bestCutList = currCutList.deepCopy();
                    }
                }
            }

            if (skipFlag) {
                incrementTrigger = skip(numAvailableLengthsCounter, maxNumAvailableLengths);
            } else {
                incrementTrigger = increment(numAvailableLengthsCounter, maxNumAvailableLengths);
            }
        } while (incrementTrigger !== null);

        console.log(bestCutList);
        window.bestCutList = bestCutList;

        return bestCutList;
    }

    return {
        getCheapestCutList,
    };
})();

export default cutListCalculator;
