class CutPiece {
    /**
     * 
     * @param {Number} thickness Thickness of cut piece (inches)
     * @param {Number} width Width of cut piece (inches)
     * @param {Number} cutLength Final cut length of cut piece (inches)
     * @param {[Number]} possibleLengthsArr Array of possible lengths (inches) that the cut piece can be cut from
     * @param {Number} quantity Number of identical pieces to cut (default = 1)
     * @param {Number} kerf Blade width of material removed when cut (inches) (default = 1/8")
     */
    constructor(thickness, width, cutLength, possibleLengthsArr, quantity = 1, kerf = 0.125) {
        this.thickness = thickness;
        this.width = width;
        this.cutLength = cutLength;
        this.possibleLengthsArr = possibleLengthsArr;
        this.quantity = quantity;
        this.kerf = kerf;
    }

    get cutWithKerf() {
        return this.cutLength + this.kerf;
    }
}

export default CutPiece;
