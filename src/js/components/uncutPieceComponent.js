import { createElement, convertNumToImperialWithFraction } from "../utilities.js";
import UncutPieceEditFormComponent from "./uncutPieceEditFormComponent.js";

export default function UncutPieceComponent(uncutPiece, editCallback, deleteCallback) {
    let element;
    
    const handleEditClick = function() {
        clearElement();

        element.appendChild(
            UncutPieceEditFormComponent(uncutPiece, handleEditConfirm, handleEditCancel).render()
        );
    };

    const handleEditConfirm = function(e) {
        e.preventDefault();

        editCallback(e, uncutPiece);
        
        // Change uncutPiece values to form input values
        uncutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
        uncutPiece.width = Number(e.target.elements.namedItem('width').value);
        uncutPiece.length = Number(e.target.elements.namedItem('length').value);
        uncutPiece.price = Number(e.target.elements.namedItem('price').value);
        
        render();
    };

    const handleEditCancel = function() {
        render();
    };

    const handleDeleteClick = function() {
        deleteCallback(uncutPiece);
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
            element = createElement('div', {'class': 'uncut-piece-inst-container'});
        } else {
            clearElement();
        }

        const uncutPieceInstElement = element.appendChild(
            createElement('div', {'class': 'uncut-piece'})
        );

        const editBtn = createElement('button', {'aria-label': 'Edit', 'title': 'Edit'}, 
            createElement('span', {'class': 'fa-solid fa-pen-to-square'})
        );
        const deleteBtn = createElement('button', {'aria-label': 'Delete', 'title': 'Delete'}, 
            createElement('span', {'class': 'fa-solid fa-trash-can'})
        );

        // Add event listeners for buttons
        editBtn.addEventListener('click', handleEditClick);
        deleteBtn.addEventListener('click', handleDeleteClick);

        uncutPieceInstElement.append(
            createElement('div', {}, uncutPiece.thickness),
            createElement('div', {}, uncutPiece.width),
            createElement('div', {}, convertNumToImperialWithFraction(uncutPiece.length)),
            createElement('div', {}, uncutPiece.price),
            createElement('div'),
            createElement('div', {'class': 'piece-btn-container'}, 
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
