import { createElement } from "../utilities.js";

export default function UncutPieceComponent(uncutPiece, editCallback, deleteCallback) {
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
            {'class': 'uncut-piece'},
            createElement('div', {}, uncutPiece.crossSection.thickness),
            createElement('div', {}, uncutPiece.crossSection.width),
            createElement('div', {}, uncutPiece.length),
            createElement('div', {}, uncutPiece.price),
            createElement('div'),
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
