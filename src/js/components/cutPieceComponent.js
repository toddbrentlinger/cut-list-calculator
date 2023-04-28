import { createElement } from "../utilities.js";

export default function CutPieceComponent(cutPiece, editCallback, deleteCallback) {
    const handleEditClick = function(e) {
        editCallback(e);
    };

    const handleDeleteClick = function(e) {
        deleteCallback(e);
    };

    const render = function() {
        const editBtn = createElement('button', {}, 'Edit');
        const deleteBtn = createElement('button', {}, 'Delete');

        // Add event listeners for buttons
        editBtn.addEventListener('click', handleEditClick);
        deleteBtn.addEventListener('click', handleDeleteClick);

        return createElement(
            'div', 
            {'class': 'cut-piece'},
            createElement('div', {}, cutPiece.thickness),
            createElement('div', {}, cutPiece.width),
            createElement('div', {}, cutPiece.cutLength),
            createElement('div', {}, cutPiece.quantity),
            createElement('div', {}, cutPiece.kerf),
            createElement('div', {}, 
                editBtn,
                deleteBtn
            )
        );
    }

    return {
        render,
    };
}
