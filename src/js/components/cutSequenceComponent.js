import { createElement } from "../utilities.js";

export default function CutSequenceComponent(cutSequence) {
    const render = function() {
        const rowElements = [];
        cutSequence.cutPieces.forEach((cutPiece, index, arr) => {
            const tempRowElement = document.createElement('tr');

            // Uncut Piece (first row only)
            // Add uncut piece if first row OR add row that spans rest of rows for this cut sequence.
            if (index === 0) {
                tempRowElement.appendChild(
                    createElement('td', {}, `${cutSequence.uncutPiece.thickness}x${cutSequence.uncutPiece.width}x${cutSequence.uncutPiece.length}`)
                );
            } else if (index === 1) {
                tempRowElement.appendChild(
                    createElement('td', {'rowspan': arr.length - 1})
                );
            }

            // Cut Pieces
            tempRowElement.appendChild(
                createElement('td', {}, cutPiece.length)
            );

            // Remaining Length (last row only)
            // Add remaining length if last row OR row that spans rest of rows for this cut sequence.
            if (index === (arr.length - 1)) {
                tempRowElement.appendChild(
                    createElement('td', {}, `with ${cutSequence.remainingLength} remaining`)
                );
            } else if (index === 0) {
                tempRowElement.appendChild(
                    createElement('td', {'rowspan': arr.length - 1})
                );
            }

            // Add row element to array of other row elements
            rowElements.push(tempRowElement);
        });


        return rowElements;
    }

    return {
        render,
    };
}
