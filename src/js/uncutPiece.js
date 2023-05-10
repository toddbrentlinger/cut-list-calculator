export class CrossSection {
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
     * @param {Number} thickness Thickness of uncut piece (inches)
     * @param {Number} width Width of uncut piece (inches)
     * @param {Number} length Length of uncut piece (inches) 
     * @param {Number} price Price of possible length (American cents ex. $9.87 = 987)
     */
    constructor(thickness, width, length, price) {
        this.thickness = thickness;
        this.width = width;
        //this.crossSection = new CrossSection(this.thickness, this.width);
        this.length = length;
        this.price = price;
    }
}

export default UncutPiece;
