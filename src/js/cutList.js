import CutSequence from "./cutSequence";

/** Stores CutSequences of a list of CutPieces and UncutPieces. */
class CutList {
    /**
     * @constructor
     * @param {CutSequence[]} cutSequences 
     */
    constructor(cutSequences = []) {
        /** Array of CutSequences for the CutList. */
        this.cutSequences = cutSequences
            .filter((cutSequence) => (cutSequence instanceof CutSequence));
    }

    /** Clears all CutSequences from CutList, making the CutList empty. */
    clear() {
        this.cutSequences = [];
    }

    /** Adds new CutSequence to the CutList. */
    push(cutSequence) {
        if (!(cutSequence instanceof CutSequence)) { return; }

        this.cutSequences.push(cutSequence);
    }

    /**
     * Returns price of all UncutPieces in the CutList.
     * @returns {number}
     */
    getPrice() {
        return this.cutSequences
            .reduce((accum, curr) => accum + curr.uncutPiece.price, 0);
    }

    /**
     * Returns new CutList with deep copy of array of CutSequences.
     * @returns {CutList}
     */
    deepCopy() {
        // Create new CutList instance
        let cutList = new CutList();

        /**
         * Use spread syntax to deep copy array of CutSequences from this 
         * CutList to the new CutList.
         */
        cutList.cutSequences = [...this.cutSequences];

        // Return new CutList instance that has been duplicated
        return cutList;
    }

    /**
     * Returns material list of the CutList with UncutPieces needed.
     * @returns {Object} materialListObj
     * @returns {Object} materialListObj[number] - Keys of object are UncutPiece length and values are another object with info about UncutPiece
     * @returns {string} materialListObj[number].crossSection
     * @returns {number} materialListObj[number].unitPrice
     * @returns {number} materialListObj[number].quantity
     */
    getMaterialList() {
        const materialListObj = {};

        // Add UncutPieces from each CutSequence in the CutList
        this.cutSequences.forEach((cutSequence) => {
            // If UncutPiece length already in material list object, increment quanitity
            if (cutSequence.uncutPiece.length in materialListObj) {
                materialListObj[cutSequence.uncutPiece.length].quantity++;
            }
            // Else add UncutPiece to material list object with quantity of 1 
            else {
                materialListObj[cutSequence.uncutPiece.length] = {
                    crossSection: `${cutSequence.uncutPiece.thickness}x${cutSequence.uncutPiece.width}`,
                    unitPrice: cutSequence.uncutPiece.price,
                    quantity: 1,
                };
            }
        });

        return materialListObj;
    }

    /**
     * Returns JSON object of the CutList.
     * @returns {Object} obj - JSON object of the CutList
     * @returns {Object[]} obj.cutSequences - Array of JSON objects of each CutSequence in the CutList
     */
    toJson() {
        return {
            cutSequences: this.cutSequences
                .map((cutSequence) => cutSequence.toJson()),
        };
    }

    /**
     * Returns CutList given JSON object of a CutList.
     * @param {Object} jsonObj 
     * @returns {CutList}
     */
    static createFromJson(jsonObj) {
        const cutSequences = jsonObj.cutSequences
            .map((cutSequenceJson) => CutSequence.createFromJson(cutSequenceJson));
        
        return new CutList(cutSequences);
    }
}

export default CutList;
