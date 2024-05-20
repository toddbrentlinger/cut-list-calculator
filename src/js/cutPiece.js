import { v4 as uuidv4 } from "uuid";

/** Piece of size thickness x width that is cut to specific length, quantity, and kerf from blade used to cut. */
class CutPiece {
    /**
     * @constructor
     * @param {number} thickness - Thickness of cut piece (inches)
     * @param {number} width - Width of cut piece (inches)
     * @param {number} length - Final cut length of cut piece (inches)
     * @param {number} quantity - Number of identical pieces to cut (default = 1)
     * @param {number} kerf - Blade width of material removed when cut (inches) (default = 1/8")
     * @param {string|null} id - ID as string or null if new uuidv4 id created
     */
    constructor(thickness, width, length, quantity = 1, kerf = 0.125, id = null) {
        this.thickness = thickness;
        this.width = width;
        this.length = length;
        this.quantity = quantity;
        this.kerf = kerf;
        this.id = id || uuidv4();
    }

    /**
     * Returns total sum of length and kerf of CutPiece. 
     * @returns {number}
     */
    get cutWithKerf() {
        return this.length + this.kerf;
    }

    /**
     * Returns JSON object of the CutPiece.
     * @returns {Object} obj
     * @returns {number} obj.thickness
     * @returns {number} obj.width
     * @returns {number} obj.length
     * @returns {number} obj.quantity
     * @returns {number} obj.kerf
     * @returns {string} obj.id
     */
    toJson() {
        return {
            thickness: this.thickness,
            width: this.width,
            length: this.length,
            quantity: this.quantity,
            kerf: this.kerf,
            id: this.id,
        };
    }

    /**
     * Returns CutPiece given JSON object of a CutPiece.
     * @param {Object} jsonObj
     * @param {number} jsonObj.thickness
     * @param {number} jsonObj.width
     * @param {number} jsonObj.length
     * @param {number} jsonObj.quantity
     * @param {number} jsonObj.kerf
     * @param {string} jsonObj.id
     * @returns {CutPiece}
     */
    static createFromJson(jsonObj) {
        return new CutPiece(
            jsonObj.thickness,
            jsonObj.width,
            jsonObj.length,
            jsonObj.quantity,
            jsonObj.kerf,
            jsonObj.id,
        );
    }
}

export default CutPiece;
