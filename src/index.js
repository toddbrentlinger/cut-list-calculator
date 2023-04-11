import './styles.scss';
import CutPiece from './js/cutPiece.js';
import cutList from './js/cutList.js';

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

    let possibleLengthsArr = [8*12, 10*12, 12*12];
    let cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr, 3),
    ];

    console.log('Test 1');
    foo(cutPieces, possibleLengthsArr);

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
})();
