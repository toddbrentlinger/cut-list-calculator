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

        const totalCutLength = individualCutPieces.reduce((accum, curr) => accum + curr.cutWithKerf, 0);
        let maxNum, availableCutPiecesByIndex, cutSequence, cutSequenceArr, bestCutList;
        let currCutList = new CutList();

        uncutPieces.forEach((uncutPiece, index) => {
            maxNum = Math.ceil(totalCutLength / uncutPiece.length);

            // Check that maxNum of uncutPiece.length can be used with the cutPieces required.
            // If not, keep incrementing until reach a value that is successful.

            availableCutPiecesByIndex = Array.from(
                {length: individualCutPieces.length},
                (value, index) => index
            );

            currCutList.clear();
            while (maxNum) {
                cutSequenceArr = cutList.getCutList(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);

                cutSequence = new CutSequence(uncutPiece);
                cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
                cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
                
                currCutList.push(cutSequence);
                                
                if (cutSequence == undefined) {
                    break;
                }

                maxNum--;

                maxNumAvailableLengths[index]++;
            }

            if ((bestCutList == undefined) || (bestCutList.getPrice() >= currCutList.getPrice())) {
                bestCutList = currCutList.deepCopy();
            }
        });
        
        console.log('Best');
        console.log(bestCutList);
        debugger;

        // ...

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

    let possibleLengthsArr = [8*12, 10*12, 12*12];
    let cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr, 3),
    ];

    console.log('Test 1');
    foo(cutPieces, possibleLengthsArr);
    getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);

    possibleLengthsArr = [6*12, 8*12, 10*12, 12*12];
    cutPieces = [
        new CutPiece(4, 4, 36, possibleLengthsArr, 2),
        new CutPiece(4, 4, 35+5/16, possibleLengthsArr, 2),
        new CutPiece(4, 4, 30+21/32, possibleLengthsArr, 2),
        new CutPiece(4, 4, 22.5, possibleLengthsArr, 4),
    ];

    console.log('Test 2');
    foo(cutPieces, possibleLengthsArr);
    getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);

    const crossSection4x4 = new UncutCrossSection(4,4);
    const uncutPieces = [
        new UncutPiece(crossSection4x4, 72, 1228),
        new UncutPiece(crossSection4x4, 96, 1548),
        new UncutPiece(crossSection4x4, 120, 2238),
        new UncutPiece(crossSection4x4, 144, 2748),
    ];

    bar(cutPieces, uncutPieces);
})();
