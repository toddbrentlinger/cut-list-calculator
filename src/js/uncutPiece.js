export class UncutCrossSection {
    /**
     * @constructor
     * @param {Number} thickness Thickness (smallest dimension) of piece (inches)
     * @param {Number} width Width of piece (inches)
     */
    constructor(thickness, width) {
        this.thickness = thickness;
        this.width = width;
    }
}

export class UncutPiece {
    /**
     * @constructor
     * @param {UncutCrossSection} uncutCrossSection Cross section of uncut piece
     * @param {Number} length Length of uncut piece (inches) 
     * @param {Number} price Price of possible length (American cents ex. $9.87 = 987)
     */
    constructor(uncutCrossSection, length, price) {
        this.uncutCrossSection = uncutCrossSection;
        this.length = length;
        this.price = price;
    }
}

export default UncutPiece;
