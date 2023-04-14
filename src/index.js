import './styles.scss';
import CutPiece from './js/cutPiece.js';
import {UncutPiece, UncutCrossSection} from './js/uncutPiece.js';
import {cutList, CutList} from './js/cutList.js';
import CutSequence from './js/cutSequence';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Cut List Calculator';
    return element;
}

document.body.appendChild(component());

(() => {
    function getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr) {
        // Sort cutPieces by cutLength in decreasing order
        cutPieces.sort((a,b) => b.cutLength - a.cutLength);

        // Create array where each value represents a single quantity cutPiece
        // instead of normal array of cutPieces that has any number quantity in the
        // 'quantity' property.
        let individualCutPieces = cutPieces.flatMap((cutPiece) => {
            return new Array(cutPiece.quantity)
                .fill(cutPiece);
        });

        // Create array where each value represents index in corresponding 
        // individualCutPieces array. If a individual CutPiece is selected for 
        // a cut sequence, it's index is removed from this array.
        let availableCutPiecesByIndex = Array.from(
            {length: individualCutPieces.length},
            (value, index) => index
        );

        let currCutSequence, tempAvailableCutPiecesByIndex, bestCut;
        let finalCutList = [];

        while (availableCutPiecesByIndex.length) {
            bestCut = {
                cutSequence: undefined,
                availableCutPiecesByIndex: undefined,
            };

            possibleLengthsArr.forEach((length) => {
                tempAvailableCutPiecesByIndex = [ ...availableCutPiecesByIndex ];

                currCutSequence = cutList.getCutList(length, individualCutPieces, tempAvailableCutPiecesByIndex);
                
                if ((bestCut.cutSequence == undefined) 
                    || (bestCut.cutSequence[-1] > currCutSequence[-1])
                ) {
                    bestCut.cutSequence = currCutSequence;
                    bestCut.availableCutPiecesByIndex = [...tempAvailableCutPiecesByIndex];
                }
            });
            
            finalCutList.push(bestCut.cutSequence);
            availableCutPiecesByIndex = [ ...bestCut.availableCutPiecesByIndex ];
        }
        console.log(finalCutList);

        // Get cut list for first possible length
        
        // Set bestCutList to first cut list
        
        // Get cut list for next possible length
        
        // If new cut list has less remaining length than bestCutList, set 
        // bestCutList to new cut list
        
        // Once reach end of possible length array, save bestCutList to final cut list sequence

        // Repeat once again with remaining individualCutPieces
    }

    function foo(cutPieces, possibleLengthsArr) {
        // Sort cutPieces by cutLength in decreasing order
        cutPieces.sort((a,b) => b.cutLength - a.cutLength);

        // Create array where each value represents a single quantity cutPiece
        // instead of normal array of cutPieces that has any number quantity in the
        // 'quantity' property.
        let individualCutPieces = cutPieces.flatMap((cutPiece) => {
            return new Array(cutPiece.quantity)
                .fill(cutPiece);
        });

        let availableCutPiecesByIndex, cutSequence;
        possibleLengthsArr.forEach((length) => {
            availableCutPiecesByIndex = Array.from(
                {length: individualCutPieces.length},
                (value, index) => index
            );
        
            console.log(`Length: ${length}`);
            while (availableCutPiecesByIndex.length) {
                cutSequence = cutList.getCutList(length, individualCutPieces, availableCutPiecesByIndex);
                console.log(cutSequence);
                if (cutSequence == undefined) {
                    break;
                }
            }
        });
    }

    function bar(cutPieces, uncutPieces) {
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
        let availableCutPiecesByIndex, cutSequence, cutSequenceArr, bestCutList;
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
                cutSequenceArr = cutList.getCutList(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
                
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

        console.log('Best Initial:');
        console.log(bestCutList);

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

                    cutSequenceArr = cutList.getCutList(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);

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

        console.log('Final Best');
        console.log(bestCutList);
        window.bestCutList = bestCutList;
    }

    // ------------------------------------------------------------------------

    let possibleLengthsArr = [8*12, 10*12, 12*12];
    let cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr, 3),
    ];
    /*
    console.log('Test 1:');
    foo(cutPieces, possibleLengthsArr);
    console.log('leastLeftover');
    getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);

    possibleLengthsArr = [6*12, 8*12, 10*12, 12*12];
    */
    cutPieces = [
        new CutPiece(4, 4, 36, possibleLengthsArr, 2),
        new CutPiece(4, 4, 35+5/16, possibleLengthsArr, 2),
        new CutPiece(4, 4, 30+21/32, possibleLengthsArr, 2),
        new CutPiece(4, 4, 22.5, possibleLengthsArr, 4),
    ];
    
    // ------------------------------------------------------------------------

    console.log('Test 2:');
    // console.log('foo');
    // foo(cutPieces, possibleLengthsArr);
    // console.log('leastLeftover');
    // getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);

    const crossSection4x4 = new UncutCrossSection(4,4);
    let uncutPieces = [
        new UncutPiece(crossSection4x4, 72, 1228),
        new UncutPiece(crossSection4x4, 96, 1548),
        new UncutPiece(crossSection4x4, 120, 2238),
        new UncutPiece(crossSection4x4, 144, 2748),
    ];

    console.log('bar');
    bar(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------
    
    console.log('Test 3:');

    const crossSection2x4 = new UncutCrossSection(2,4);
    uncutPieces = [
        new UncutPiece(crossSection2x4, 48, 275),
        new UncutPiece(crossSection2x4, 96, 298),
        new UncutPiece(crossSection2x4, 120, 386),
        new UncutPiece(crossSection2x4, 144, 462),
    ];
    cutPieces = [
        new CutPiece(2, 4, 36, possibleLengthsArr, 4),
        new CutPiece(2, 4, 32+1/8, possibleLengthsArr, 8),
        new CutPiece(2, 4, 34, possibleLengthsArr, 2),
    ];

    console.log('bar');
    
    bar(cutPieces, uncutPieces);
})();
