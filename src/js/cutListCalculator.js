import { CutList } from "./cutList.js";
import cutPieceForm from "./cutPieceForm.js";
import CutSequence from "./cutSequence.js";
import Footer from "./footer.js";

const cutListCalculator = (() => {
    const crossSections = [];
    const cutPieces = [];
    const uncutPieces = [];
    let bestCutList;

    function init() {
        document.body.appendChild(Footer(2023).render());
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

    function getCheapestCutList(cutPieces, uncutPieces) {
        // Sort cutPieces by cutLength in decreasing order
        cutPieces.sort((a,b) => b.cutLength - a.cutLength);

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

        //const totalCutLength = individualCutPieces.reduce((accum, curr) => accum + curr.cutWithKerf, 0);
        //let maxNum;
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
            while (
                availableCutPiecesByIndex.length 
                //|| maxNum > 0
            ) {
                cutSequenceArr = CutSequence.createCutSequence(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
                
                if (cutSequenceArr == undefined) {
                    break;
                }

                // Create CutSequence instance from cutSequenceArr
                cutSequence = new CutSequence(uncutPiece);
                cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
                cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
                
                // Add CutSequence to current CutList
                currCutList.push(cutSequence);

                // Decrement counter
                //maxNum--;

                // Increment count of max number of corresponding UncutPiece
                maxNumAvailableLengths[index]++;
            }

            // Check if current CutList has less price than the best CutList
            if (
                (bestCutList == undefined) 
                || (bestCutList.getPrice() >= currCutList.getPrice())
            ) {
                bestCutList = currCutList.deepCopy();
            }
        });

        let incrementTrigger, decrementTrigger, tempNumAvailableLengthsCounter;
        do {
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

                /**
                 * TODO: If use all uncut pieces to create cut list, can skip adding any more with increment trigger.
                 * ex.
                 * [1,2,0] => 1x 144" + 2x 120"
                 * incremenTrigger = 1 => 2 will be increased to 3
                 * - No need to increment to [1,3,0] if [1,2,0] is success
                 * instead, set incrementTrigger index to zero AND increment prev index instead
                 * [1,2,0] => [2,0,0]
                 * 
                 * However, [1,2,0] may not be enough with required CutPieces.
                 * Would then need to increment normally to [1,3,0] and try again.
                 */
                do {
                    // Check that maxNum of uncutPieces[decrementTrigger].length can be used with the cutPieces required.
                    // If not, keep incrementing until reach a value that is successful.

                    decrementTrigger = decrement(tempNumAvailableLengthsCounter, maxNumAvailableLengths);
                    if (decrementTrigger === null) { break; }

                    cutSequenceArr = CutSequence.createCutSequence(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);

                    if (cutSequenceArr == undefined) {
                        break;
                    }
    
                    // Create CutSequence instance from cutSequenceArr
                    cutSequence = new CutSequence(uncutPieces[decrementTrigger]);
                    cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
                    cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
                    
                    // Add CutSequence to current CutList
                    currCutList.push(cutSequence);
                } while (availableCutPiecesByIndex.length);

                // Check if current CutList has less price than the best CutList
                if (
                    (bestCutList == undefined) 
                    || (bestCutList.getPrice() >= currCutList.getPrice())
                ) {
                    bestCutList = currCutList.deepCopy();
                }
            }

            incrementTrigger = increment(numAvailableLengthsCounter, maxNumAvailableLengths);
        } while (incrementTrigger !== null);

        console.log(bestCutList);
        return bestCutList;
    }

    return {
        init,
        getCheapestCutList,
    };
})();

export default cutListCalculator;
