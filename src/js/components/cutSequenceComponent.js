import { createElement } from "../utilities.js";

export default function CutSequenceComponent(cutSequence) {
    const render = function() {
        const element = createElement('div', {'class': 'cut-sequence'});

        // Uncut Piece
        element.appendChild(
            createElement('div', {}, `${cutSequence.uncutPiece.crossSection.thickness}x${cutSequence.uncutPiece.crossSection.width}x${cutSequence.uncutPiece.length}`)
        );

        // Cut Pieces
        const cutPiecesContainer = element.appendChild(createElement('div', {'class': 'cut-sequence-cut-pieces-container'}));
        cutSequence.cutPieces.forEach((cutPiece) => {
            cutPiecesContainer.appendChild(createElement('div', {}, cutPiece.cutLength));
        });

        // Remaining Length
        element.appendChild(createElement('div', {}, `with ${cutSequence.remainingLength} remaining`))

        return element;
    }

    return {
        render,
    };
}
