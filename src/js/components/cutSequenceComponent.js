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
                    createElement('td', {}, `${cutSequence.uncutPiece.crossSection.thickness}x${cutSequence.uncutPiece.crossSection.width}x${cutSequence.uncutPiece.length}`)
                );
            } else if (index === 1) {
                tempRowElement.appendChild(
                    createElement('td', {'rowspan': arr.length - 1})
                );
            }

            // Cut Pieces
            tempRowElement.appendChild(
                createElement('td', {}, cutPiece.cutLength)
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

    // const renderOld = function() {
    //     const element = createElement('div', {'class': 'cut-sequence'});

    //     // Uncut Piece
    //     element.appendChild(
    //         createElement('div', {}, `${cutSequence.uncutPiece.crossSection.thickness}x${cutSequence.uncutPiece.crossSection.width}x${cutSequence.uncutPiece.length}`)
    //     );

    //     // Cut Pieces
    //     const cutPiecesContainer = element.appendChild(createElement('div', {'class': 'cut-sequence-cut-pieces-container'}));
    //     cutSequence.cutPieces.forEach((cutPiece) => {
    //         cutPiecesContainer.appendChild(createElement('div', {}, cutPiece.cutLength));
    //     });

    //     // Remaining Length
    //     element.appendChild(createElement('div', {}, `with ${cutSequence.remainingLength} remaining`))

    //     return element;
    // }

    return {
        render,
    };
}
