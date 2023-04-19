import { createElement } from "../utilities.js";

export default function UncutPieceComponent(uncutPiece) {
    const render = function() {
        return createElement(
            'tr', 
            {'class': 'uncut-piece'},
            createElement('td', {}, uncutPiece.crossSection.thickness),
            createElement('td', {}, uncutPiece.crossSection.width),
            createElement('td', {}, uncutPiece.length),
            createElement('td', {}, uncutPiece.price),
        );
    }

    return {
        render,
    };
}
