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
    const possibleLengthsArr2x4 = [8*12, 10*12, 12*12];
    const cutPieces = [
        new CutPiece(2, 4, 19.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 39.875, possibleLengthsArr2x4, 3),
        new CutPiece(2, 4, 49.875, possibleLengthsArr2x4, 3),
    ];

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

    let cutSequence;
    while (availableCutPiecesByIndex.length) {
        cutSequence = cutList.getCutList(96, individualCutPieces, availableCutPiecesByIndex);
        console.log(cutSequence);
        if (cutSequence == undefined) {
            break;
        }
    }
})();
