import { v4 as uuidv4 } from "uuid";

/** Piece of size thickness x width that is sold at specific length and price. */
class UncutPiece {
    /**
     * @constructor
     * @param {number} thickness - Thickness of uncut piece (inches)
     * @param {number} width - Width of uncut piece (inches)
     * @param {number} length - Length of uncut piece (inches) 
     * @param {number} price - Price of possible length
     * @param {string|null} id - ID as string or null if new uuidv4 id created
     */
    constructor(thickness, width, length, price, id = null) {
        this.thickness = thickness;
        this.width = width;
        this.length = length;
        this.price = price;
        this.id = id || uuidv4();
    }

    /**
     * Returns JSON object of the UncutPiece.
     * @returns {Object} obj
     * @returns {number} obj.thickness
     * @returns {number} obj.width
     * @returns {number} obj.price
     * @returns {string} obj.id
     */
    toJson() {
        return {
            thickness: this.thickness,
            width: this.width,
            length: this.length,
            price: this.price,
            id: this.id,
        };
    }

    /**
     * Returns UncutPiece given JSON object of an UncutPiece.
     * @param {Object} jsonObj
     * @param {number} jsonObj.thickness
     * @param {number} jsonObj.width
     * @param {number} jsonObj.price
     * @param {string} jsonObj.id
     * @returns {UncutPiece}
     */
    static createFromJson(jsonObj) {
        return new UncutPiece(
            jsonObj.thickness,
            jsonObj.width,
            jsonObj.length,
            jsonObj.price,
            jsonObj.id
        );
    }
}

export default UncutPiece;
