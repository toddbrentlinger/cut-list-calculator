import { createElement } from "../utilities.js";

export default function CutPieceComponent(cutPiece, editCallback, deleteCallback) {
    let element;
    
    const handleEditClick = function(e) {
        editCallback(e);
    };

    const handleDeleteClick = function() {
        deleteCallback(cutPiece);
    };

    const remove = function() {
        element.remove();
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'cut-piece'});
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

        return element;
    }

    return {
        get cutPiece() { return cutPiece; },
        remove,
        render,
    };
}
