import CountArray from "./countArray.js";
import CutPiece from "./cutPiece.js";
import UncutPiece from "./uncutPiece.js";

/** Sequence of CutPieces cut from an UncutPiece with any remaining length. */
class CutSequence {
    /**
     * @constructor
     * @param {UncutPiece} uncutPiece 
     * @param {CutPiece[]} cutPieces 
     * @param {number} remainingLength 
     */
    constructor(uncutPiece, cutPieces = [], remainingLength = 0) {
        this.uncutPiece = uncutPiece;
        this.cutPieces = cutPieces;
        this.remainingLength = remainingLength;
    }
    
    /** Returns a string representation of the CutSequence. */
    toString() {
        console.log(
            `Pieces: ${this.cutPieces}\nLeftover: ${this.remainingLength}`
        );
    }

    /**
     * Returns array of CutPieces with smallest remaining length from an initial length.
     * @param {number} remainingLength - Length of uncut piece to find CutPieces to fit
     * @param {CutPiece[]} cutPieces - Array of individual CutPieces sorted by length in descending order
     * @param {CountArray} cutPieceQuantities - CountArray of current quantites of each CutPiece
     * @returns {[...CutPiece, number]} Array of CutPieces sub array of selected CutPieces and any remaining length leftover
     */
    static createCutSequenceArr(remainingLength, cutPieces, cutPieceQuantities) {
        /** Array of CutPieces that can be cut from remainingLength */
        let selectedCutPiecesArr = [];
        
        /**
         * Index of CutPiece and it's quantity to start searching in current 
         * loop (initialized to zero). Previous CutPieces are guarenteed to be 
         * too long for remainingLength since CutPieces array is sorted by 
         * length in descending order.
         */
        let cutPiecesStartIndex = 0;
        
        /** Index of CutPiece selected to cut from remaining length */
        let selectedCutPieceIndex;

        /**
         * Flag is true when selected CutPiece will take up the entire 
         * remaining length leaving zero length leftover.
         */
        let exactLengthFlag;

        /**
         * Looping counter to be used inside while loop. Declared outside 
         * while loop to use the same memory for each loop rather than 
         * declaring and destroying a new one each loop.
         */
        let i;

        // Find series of CutPieces that can be cut from remainingLength
        while (cutPieceQuantities.total !== 0) {
            /**
             * Set selectedCutPieceIndex to undefined before finding new value
             * with updated remainingLength and cutPieceQuantities.
             */
            selectedCutPieceIndex = undefined;
            
            /**
             * Make sure exactLengthFlag is false for new loop before finding 
             * new CutPiece.
             */
            exactLengthFlag = false;
            
            /**
             * Find largest CutPiece length that can be cut from remainingLength by 
             * looping through CutPieces with non-zero quantity. Continue loop until
             * select a CutPiece OR reach end of CutPieces array.
             * Start loop at cutPieceStartIndex that is set at the end of previous 
             * while loop that found a CutPiece to add to cut sequence. This skips 
             * CutPieces that are too long for the remainingLength.
             */
            for (
                i = cutPiecesStartIndex; 
                (i < cutPieces.length) && (selectedCutPieceIndex === undefined);
                i++
            ) {
                // If ith CutPiece has zero quantity left, skip
                if (cutPieceQuantities.valueAtIndex(i) === 0) {
                    continue;
                }
    
                // If ith CutPiece is too long for remaining length, skip
                if (cutPieces[i].length > remainingLength) {
                    continue;
                }
    
                /**
                 * If CutPiece cut length is exactly equal to remaining length 
                 * (DO NOT INCLUDE KERF).
                 * Found CutPiece with exact length. No cut needed.
                 * OR
                 * If CutPiece cut length is less than remaining length
                 * AND cut length + kerf is more than or equal to remaining length.
                 * Found CutPiece that uses up remaining length with cut a single 
                 * kerf distance from the end or less. Can get CutPiece length out 
                 * of remaining length by trimming one kerf or less off end.
                 * There is NO more material left after cutting this CutPiece.
                 */
                if (
                    (cutPieces[i].length === remainingLength)
                    || (
                        (cutPieces[i].length < remainingLength)
                        && (cutPieces[i].cutWithKerf >= remainingLength)
                    )
                ) {
                    exactLengthFlag = true;
                }
    
                /**
                 * If reach here, CutPiece cut length + kerf is less than 
                 * remaining length (INCLUDING KERF). There will be some 
                 * material left for potentially more CutPieces.
                 */
                selectedCutPieceIndex = i;
            }

            /**
             * Check if selectedCutPieceIndex is still undefined. If it is, all 
             * cutLength+kerf are more than remainingLength.
             * Break out of while loop. No more CutPieces can be chosen for the 
             * cut sequence.
             */
            if (selectedCutPieceIndex == undefined) {
                break;
            }

            /**
             * Decrement CutPiece from array of quantities, so same CutPiece 
             * is NOT selected more than once.
             */
            cutPieceQuantities.decrementValueAtIndex(selectedCutPieceIndex);
            
            /**
             * Push selected CutPiece reference to array of selected CutPieces 
             * for initial remaining length.
             */
            selectedCutPiecesArr.push(cutPieces[selectedCutPieceIndex]);
            
            /**
             * If found CutPiece to use entire remaining length, set remaining 
             * length to zero and break out of loop.
             */
            if (exactLengthFlag) {
                remainingLength = 0;
                break;
            }

            // If reach here, another CutPiece could be selected for cut sequence
            
            // Update remaining length for next loop by subtracting cut+kerf
            remainingLength -= cutPieces[selectedCutPieceIndex].cutWithKerf;

            /**
             * Set cutPiecesStartIndex to selected index to skip CutPieces 
             * guaranteed to be longer than remainingLength.
             */
            cutPiecesStartIndex = selectedCutPieceIndex;
        }

        // Return array of CutPieces selected and any remainingLength leftover
        return [selectedCutPiecesArr, remainingLength];
    }

    /**
     * Recursive function that returns array of CutPieces with smallest remaining length from an initial length.
     * @param {number} remainingLength 
     * @param {CutPiece[]} cutPieces Array of individual CutPieces sorted by length in descending order
     * @param {CountArray} cutPieceQuantities 
     * @param {number} cutPiecesStartIndex (default = 0) 
     * @returns {[...CutPiece, number]} Array of CutPieces with any remaining length of the piece at the end
     */
    static createCutSequenceArrRec(remainingLength, cutPieces, cutPieceQuantities, cutPiecesStartIndex = 0) {
        // If availableCutPiecesByIndex is empty, return single index array with just remaining length
        if (cutPieceQuantities.total === 0) { 
            return [ remainingLength ];
        }

        let selectedCutPieceIndex;
        for (
            let i = cutPiecesStartIndex; 
            (i < cutPieces.length) && (selectedCutPieceIndex === undefined);
            i++
        ) {
            // If ith CutPiece has zero quantity, skip
            if (cutPieceQuantities.valueAtIndex(i) === 0) {
                continue;
            }

            // If ith CutPiece is too long for remaining length, skip
            if (cutPieces[i].length > remainingLength) {
                continue;
            }

            /**
             * If CutPiece cut length is exactly equal to remaining length (DO NOT INCLUDE KERF).
             * Found CutPiece with exact length. No cut needed.
             * OR
             * If CutPiece cut length is less than remaining length
             * AND cut length + kerf is more than or equal to remaining length.
             * Found CutPiece that uses up remaining length with cut a single 
             * kerf distance from the end or less. Can get CutPiece length out 
             * of remaining length by trimming one kerf or less off end.
             * There is NO more material left after cutting this CutPiece.
             */
            if (
                (cutPieces[i].length === remainingLength)
                || (
                    (cutPieces[i].length < remainingLength)
                    && (cutPieces[i].cutWithKerf >= remainingLength)
                )
            ) {
                // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
                // being selected more than once.
                //availableCutPiecesByIndex.splice(i, 1);
                cutPieceQuantities.decrementValueAtIndex(i);

                // Return array of piece with exact remaining length and ending 
                // with zero for no more remaining length after cut.
                return [ cutPieces[i], 0 ];
            }

            // If reach here, CutPiece cut length + kerf is less than remaining length (INCLUDING KERF).
            // There will be some material left for potentially more CutPieces.
            selectedCutPieceIndex = i;
        }

        // Check if selectedCutPieceIndex is still undefined - All cutLength+kerf are more than remainingLength.
        // Return single index array with just remaining length
        if (selectedCutPieceIndex == undefined) {
            return [ remainingLength ];
        }

        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected more than once.
        cutPieceQuantities.decrementValueAtIndex(selectedCutPieceIndex);
        const selectedCutPiece = cutPieces[selectedCutPieceIndex];

        // Return array of any CutPieces with remaining length as last element of array
        return [
            selectedCutPiece,
            ...CutSequence.createCutSequenceArr(
                remainingLength - selectedCutPiece.cutWithKerf,
                cutPieces,
                cutPieceQuantities,
                selectedCutPieceIndex
            )
        ];
    }
}

export default CutSequence;
