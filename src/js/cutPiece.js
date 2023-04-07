class CutPiece {
    /**
     * 
     * @param {*} thickness Thickness of cut piece
     * @param {*} width Width of cut piece
     * @param {*} cutLength Final cut length of cut piece
     * @param {*} possibleLengthsArr Array of possible lengths that the cut piece can be cut from
     * @param {*} quantity Number of identical pieces to cut (default = 1)
     * @param {*} kerf Blade width of material removed when cut (default = 1/8")
     */
    constructor(thickness, width, cutLength, possibleLengthsArr, quantity = 1, kerf = 0.125) {
        this.thickness = thickness;
        this.width = width;
        this.cutLength = cutLength;
        this.possibleLengthsArr = possibleLengthsArr;
        this.quantity = quantity;
        this.kerf = kerf;
    }
}

export default CutPiece;
