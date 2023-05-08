class CutPiece {
    /**
     * 
     * @param {Number} thickness Thickness of cut piece (inches)
     * @param {Number} width Width of cut piece (inches)
     * @param {Number} length Final cut length of cut piece (inches)
     * @param {Number} quantity Number of identical pieces to cut (default = 1)
     * @param {Number} kerf Blade width of material removed when cut (inches) (default = 1/8")
     */
    constructor(thickness, width, length, quantity = 1, kerf = 0.125) {
        this.thickness = thickness;
        this.width = width;
        this.length = length;
        this.quantity = quantity;
        this.kerf = kerf;
    }

    get cutWithKerf() {
        return this.length + this.kerf;
    }
}

export default CutPiece;
