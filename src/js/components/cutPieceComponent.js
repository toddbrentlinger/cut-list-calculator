import { createElement } from "../utilities.js";
import CutPieceEditFormComponent from "./cutPieceEditFormComponent.js";

export default function CutPieceComponent(cutPiece, editCallback, deleteCallback) {
    let element;
    
    const handleEditClick = function() {
        clearElement();

        element.appendChild(
            CutPieceEditFormComponent(cutPiece, handleEditConfirm, handleEditCancel).render()
        );
    };

    const handleEditConfirm = function(e) {
        e.preventDefault();

        editCallback(e, cutPiece);
        
        // Change cutPiece values to form input values
        cutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
        cutPiece.width = Number(e.target.elements.namedItem('width').value);
        cutPiece.length = Number(e.target.elements.namedItem('length').value);
        cutPiece.quantity = Number(e.target.elements.namedItem('quantity').value);
        cutPiece.kerf = Number(e.target.elements.namedItem('kerf').value);
        
        render();
    };

    const handleEditCancel = function() {
        render();
    };

    const handleDeleteClick = function() {
        deleteCallback(cutPiece);
    };

    const remove = function() {
        element.remove();
    };

    const clearElement = function() {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'cut-piece-inst-container'});
        } else {
            clearElement();
        }

        const cutPieceInstElement = element.appendChild(
            createElement('div', {'class': 'cut-piece'})
        );
        
        const editBtn = createElement('button', {}, 
            createElement('span', {'class': 'fa-solid fa-pen-to-square', 'aria-label': 'Edit'})
        );
        const deleteBtn = createElement('button', {}, 
            createElement('span', {'class': 'fa-solid fa-trash-can', 'aria-label': 'Delete'})
        );

        // Add event listeners for buttons
        editBtn.addEventListener('click', handleEditClick);
        deleteBtn.addEventListener('click', handleDeleteClick);

        cutPieceInstElement.append(
            createElement('div', {}, cutPiece.thickness),
            createElement('div', {}, cutPiece.width),
            createElement('div', {}, cutPiece.length),
            createElement('div', {}, cutPiece.quantity),
            createElement('div', {}, cutPiece.kerf),
            createElement('div', {'class': 'piece-btn-container'},
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
