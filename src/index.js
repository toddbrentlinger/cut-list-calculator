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
        // Check if there is a cutLength equal to remaining length (DO NOT INCLUDE KERF)
        // Find index of highest cutLength that can be cut with remainingLength (INCLUDE KERF)
        let highestCutLengthIndex;
        for (let i = 0; i < cutLengthAndKerfPairs.length; i++) {
            if (cutLengthAndKerfPairs[i].cutPiece.cutLength == remainingLength) {
                cutLengthAndKerfPairs[i].cutPiece.isSelected = true;
                return [ cutLengthAndKerfPairs[i].cutPiece, 0 ];
            }

            if (highestCutLengthIndex == undefined && (cutLengthAndKerfPairs[i].cutPiece.cutLength + cutLengthAndKerfPairs[i].cutPiece.kerf) < remainingLength) {
                highestCutLengthIndex = i;
            }
        }

        // Check if highestCutLengthIndex is still undefined - All cutLength+kerf are more than remainingLength
        // Return just remaining length
        if (highestCutLengthIndex == undefined) {
            return [ remainingLength ];
        }

        return [...cutLengthAndKerfPairs[highestCutLengthIndex].cutPiece, foo(remainingLength - cutLengthAndKerfPairs[highestCutLengthIndex].cutPiece.cutLength - cutLengthAndKerfPairs[highestCutLengthIndex].cutPiece.kerf, cutLengthAndKerfPairs)];
    }

    const possibleLengthsArr2x4 = [8*12, 10*12, 12*12];
    const cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr2x4, 3),
    ];

    let cutLengthAndKerfPairs = cutPieces.flatMap((cutPiece) => {
        return new Array(cutPiece.quantity)
            .fill({
                'cutPiece': cutPiece,
                'isSelected': false,
            });
    }).sort((a,b) => b.cutPiece.cutLength - a.cutPiece.cutLength);
    debugger;
    foo(96, cutLengthAndKerfPairs);
})();
