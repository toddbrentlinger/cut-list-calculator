import { createElement } from "../utilities.js";

export default function UncutPieceComponent(uncutPiece) {
    const render = function() {
        return createElement(
            'div', 
            {'class': 'uncut-piece'},
            createElement('div', {}, uncutPiece.crossSection.thickness),
            createElement('div', {}, uncutPiece.crossSection.width),
            createElement('div', {}, uncutPiece.length),
            createElement('div', {}, uncutPiece.price),
        );
    }

    return {
        render,
    };
}
