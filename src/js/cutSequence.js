class CutSequence {
    constructor(uncutPiece) {
        this.uncutPiece = uncutPiece;

        this.cutPieces = [];
        this.remainingLength = 0;
    }

    toString() {
        console.log(`Pieces: ${this.cutPieces}\nLeftover: ${this.remainingLength}`);
    }
}

export default CutSequence;