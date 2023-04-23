export class CutList {
    constructor(cutSequences = []) {
        this.cutSequences = cutSequences;
    }

    clear() {
        this.cutSequences = [];
    }

    push(cutSequence) {
        // TODO: Type check

        this.cutSequences.push(cutSequence);
    }

    getPrice() {
        return this.cutSequences.reduce((accum, curr) => accum + curr.uncutPiece.price, 0);
    }

    deepCopy() {
        let cutList = new CutList();
        cutList.cutSequences = [...this.cutSequences];
        return cutList;
    }

    getMaterialList() {
        const materialListObj = {};

        this.cutSequences.forEach((cutSequence) => {
            if (cutSequence.uncutPiece.length in materialListObj) {
                materialListObj[cutSequence.uncutPiece.length].quantity++;
            } else {
                materialListObj[cutSequence.uncutPiece.length] = {
                    unitPrice: cutSequence.uncutPiece.price,
                    quantity: 1,
                };
            }
        });

        return materialListObj;
    }
}

export const cutList = {
    /**
     * Recursive function that returns list of CutPieces and minimal remaining length.
     * @param {Number} remainingLength 
     * @param {[CutPiece]} individualCutPieces 
     * @param {[Number]} availableCutPiecesByIndex 
     * @param {Number} startIndex (default = 0) 
     * @returns {[...CutPiece, Number]} Array of CutPieces with leftover length of whole piece at the end
     */
    getCutList: (remainingLength, individualCutPieces, availableCutPiecesByIndex, startIndex = 0) => {
        // Return if availableCutPiecesByIndex is empty
        if (!availableCutPiecesByIndex.length) {
            return [ remainingLength ];
        }

        let selectedCutPieceIndex;
        for (let i = startIndex; i < availableCutPiecesByIndex.length; i++) {


            // Check if cutLength equal to remaining length (DO NOT INCLUDE KERF)
            if (individualCutPieces[availableCutPiecesByIndex[i]].cutLength == remainingLength) {
                // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
                // being selected for than once.
                availableCutPiecesByIndex.splice(i, 1);

                return [ individualCutPieces[availableCutPiecesByIndex[i]], 0 ];
            }

            // Find index of largest cutLength that can be cut with remainingLength (INCLUDE KERF)
            if ((selectedCutPieceIndex == undefined) 
                && (individualCutPieces[availableCutPiecesByIndex[i]].cutWithKerf < remainingLength)
            ) {
                selectedCutPieceIndex = i;
            }
        }

        // Check if selectedCutPieceIndex is still undefined - All cutLength+kerf are more than remainingLength
        // Return just remaining length
        if (selectedCutPieceIndex == undefined) {
            return [ remainingLength ];
        }

        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        const selectedCutPiece = individualCutPieces[availableCutPiecesByIndex.splice(selectedCutPieceIndex, 1)];

        return [
            selectedCutPiece, 
            ...cutList.getCutList(
                remainingLength - selectedCutPiece.cutWithKerf, 
                individualCutPieces,
                availableCutPiecesByIndex,
                selectedCutPieceIndex
            )
        ];
    },
};

export default cutList;
