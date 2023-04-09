import './styles.scss';
import CutPiece from './js/cutPiece.js';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Cut List Calculator';
    return element;
}

document.body.appendChild(component());

(() => {
    function foo(remainingLength, cutLengthAndKerfPairs) {
        let largestCutLengthIndex;
        for (let i = 0; i < cutLengthAndKerfPairs.length; i++) {
            // Skip if CutPiece has already been selected
            if (cutLengthAndKerfPairs[i].isSelected) {
                continue;
            }

            // Check if cutLength equal to remaining length (DO NOT INCLUDE KERF)
            if (cutLengthAndKerfPairs[i].cutPiece.cutLength == remainingLength) {
                cutLengthAndKerfPairs[i].cutPiece.isSelected = true;
                return [ cutLengthAndKerfPairs[i].cutPiece, 0 ];
            }

            // Find index of largest cutLength that can be cut with remainingLength (INCLUDE KERF)
            if (largestCutLengthIndex == undefined 
                && (cutLengthAndKerfPairs[i].cutPiece.cutWithKerf) < remainingLength
            ) {
                largestCutLengthIndex = i;
            }
        }

        // Check if largestCutLengthIndex is still undefined - All cutLength+kerf are more than remainingLength
        // Return just remaining length
        if (largestCutLengthIndex == undefined) {
            return [ remainingLength ];
        }

        return [...cutLengthAndKerfPairs[largestCutLengthIndex].cutPiece, foo(remainingLength - cutLengthAndKerfPairs[largestCutLengthIndex].cutPiece.cutWithKerf, cutLengthAndKerfPairs)];
    }

    function bar(remainingLength, individualCutPieces, availableCutPiecesByIndex) {
        // Return if availableCutPiecesByIndex is empty
        if (!availableCutPiecesByIndex.length) {
            return;
        }

        let largestCutLengthIndex;
        let i;
        for (let i = 0; i < availableCutPiecesByIndex.length; i++) {
            // Check if cutLength equal to remaining length (DO NOT INCLUDE KERF)
            if (individualCutPieces[availableCutPiecesByIndex[i]].cutLength == remainingLength) {
                // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
                // being selected for than once.
                availableCutPiecesByIndex.splice(i, 1);

                return [ individualCutPieces[availableCutPiecesByIndex[i]], 0 ];
            }

            // Find index of largest cutLength that can be cut with remainingLength (INCLUDE KERF)
            if (largestCutLengthIndex == undefined 
                && (individualCutPieces[availableCutPiecesByIndex[i]].cutWithKerf) < remainingLength
            ) {
                largestCutLengthIndex = i;
            }
        }

        // Check if largestCutLengthIndex is still undefined - All cutLength+kerf are more than remainingLength
        // Return just remaining length
        if (largestCutLengthIndex == undefined) {
            return [ remainingLength ];
        }

        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        availableCutPiecesByIndex.splice(i, 1);

        return [
            ...individualCutPieces[availableCutPiecesByIndex[largestCutLengthIndex]], 
            bar(remainingLength - individualCutPieces[availableCutPiecesByIndex[largestCutLengthIndex]].cutWithKerf, availableCutPiecesByIndex)
        ];
    }

    const possibleLengthsArr2x4 = [8*12, 10*12, 12*12];
    const cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr2x4, 3),
    ];

    // let cutLengthAndKerfPairs = cutPieces.flatMap((cutPiece) => {
    //     return new Array(cutPiece.quantity)
    //         .fill({
    //             'cutPiece': cutPiece,
    //             'isSelected': false,
    //         });
    // }).sort((a,b) => b.cutPiece.cutLength - a.cutPiece.cutLength);

    // Sort cutPieces by cutLength in decreasing order
    cutPieces.sort((a,b) => b.cutLength - a.cutLength);

    // Create array where each value represents a single quantity cutPiece
    // instead of normal array of cutPieces that has any number quantity in the
    // 'quantity' property.
    let individualCutPieces = cutPieces.flatMap((cutPiece) => {
        return new Array(cutPiece.quantity)
            .fill(cutPiece);
    });

    let availableCutPiecesByIndex = Array.from(
        {length: individualCutPieces.length},
        (value, index) => index
    );

    debugger;
    bar(96, individualCutPieces, availableCutPiecesByIndex);
})();
