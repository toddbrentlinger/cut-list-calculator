import { createElement } from "../utilities.js";

export default function CutPieceComponent(cutPiece) {
    const render = function() {
        return createElement(
            'tr', 
            {'class': 'cut-piece'},
            createElement('td', {}, cutPiece.thickness),
            createElement('td', {}, cutPiece.width),
            createElement('td', {}, cutPiece.cutLength),
            createElement('td', {}, cutPiece.quantity),
            createElement('td', {}, cutPiece.kerf),
        );
    }

    return {
        render,
    };
}
