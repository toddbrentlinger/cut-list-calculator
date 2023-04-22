import { createElement } from "../utilities.js";

export default function CutPieceComponent(cutPiece) {
    const render = function() {
        return createElement(
            'div', 
            {'class': 'cut-piece'},
            createElement('div', {}, cutPiece.thickness),
            createElement('div', {}, cutPiece.width),
            createElement('div', {}, cutPiece.cutLength),
            createElement('div', {}, cutPiece.quantity),
            createElement('div', {}, cutPiece.kerf),
        );
    }

    return {
        render,
    };
}
