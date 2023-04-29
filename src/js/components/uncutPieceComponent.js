import { createElement } from "../utilities.js";

export default function UncutPieceComponent(uncutPiece, editCallback, deleteCallback) {
    let element;
    
    const handleEditClick = function(e) {
        editCallback(e);
    };

    const handleDeleteClick = function() {
        deleteCallback(uncutPiece);
    };

    const remove = function() {
        element.remove();
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'uncut-piece'});
        } else {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        const editBtn = createElement('button', {}, 'Edit');
        const deleteBtn = createElement('button', {}, 'Delete');

        // Add event listeners for buttons
        editBtn.addEventListener('click', handleEditClick);
        deleteBtn.addEventListener('click', handleDeleteClick);

        element.append(
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

        return element;
    }

    return {
        get uncutPiece() { return uncutPiece; },
        remove,
        render,
    };
}
