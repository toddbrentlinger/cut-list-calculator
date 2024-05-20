import cutListCalculatorStorage from "../cutListCalculatorStorage.js";
import CutPiece from "../cutPiece.js";
import { createElement, convertNumToImperialWithFraction, clearElement } from "../utilities.js";
import CutPieceEditFormComponent from "./cutPieceEditFormComponent.js";

/**
 * @typedef {Object} CutPieceComponent
 * @property {CutPiece} cutPiece - Returns CutPiece of the component (getter)
 * @property {Function} remove - Removes the CutPiece component from the DOM
 * @property {Function} render - Returns HTMLElement of CutPiece component
 */

/**
 * Factory function to create CutPiece HTMLElement component.
 * @param {CutPiece} cutPiece
 * @param {Function} deleteCallback 
 * @returns {CutPieceComponent}
 */
function CutPieceComponent(cutPiece, deleteCallback) {
    /** Reference to HTMLElement of the CutPiece component. */
    let element;
    
    /** Event handler function when CutPiece edit is started by User. */
    const handleEditClick = function() {
        // Clear current CutPiece data until it's values are updated
        clearElement(element);

        // Add CutPiece edit form component to main element instead
        element.appendChild(
            CutPieceEditFormComponent(cutPiece, handleEditConfirm, handleEditCancel).render()
        );
    };

    /**
     * Event handler function when CutPiece edit is confirmed by User.
     * @param {Event} e 
     */
    const handleEditConfirm = function(e) {
        e.preventDefault();
        
        // Change CutPiece values to form input values
        cutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
        cutPiece.width = Number(e.target.elements.namedItem('width').value);
        cutPiece.length = Number(e.target.elements.namedItem('length').value);
        cutPiece.quantity = Number(e.target.elements.namedItem('quantity').value);
        cutPiece.kerf = Number(e.target.elements.namedItem('kerf').value);
        
        // Save updated CutPiece to database storage
        cutListCalculatorStorage.saveCutPiece(cutPiece);

        // Re-render component
        render();
    };

    /** Event handler function when CutPiece edit is cancelled by User. */
    const handleEditCancel = function() {
        render();
    };

    /** Event handler function when CutPiece is deleted by User. */
    const handleDeleteClick = function() {
        deleteCallback(cutPiece);
    };

    /** Removes CutPiece component HTMLElement from DOM. */
    const remove = function() {
        element.remove();
    };

    /**
     * Returns HTMLElement of CutPiece component.
     * @returns {HTMLElement}
     */
    const render = function() {
        /**
         * If main element is NOT yet defined, create new element, else clear 
         * main element.
         */
        if (element === undefined) {
            element = createElement('div', {'class': 'cut-piece-inst-container'});
        } else {
            clearElement(element);
        }

        // Create element to hold CutPiece data as child of main element
        const cutPieceInstElement = element.appendChild(
            createElement('div', {'class': 'cut-piece'})
        );
        
        // Create 'edit' button
        const editBtn = createElement('button', {'aria-label': 'Edit', 'title': 'Edit'}, 
            createElement('span', {'class': 'fa-solid fa-pen-to-square'})
        );

        // Create 'delete' button
        const deleteBtn = createElement('button', {'aria-label': 'Delete', 'title': 'Delete'}, 
            createElement('span', {'class': 'fa-solid fa-trash-can'})
        );

        // Add event listeners for buttons
        editBtn.addEventListener('click', handleEditClick);
        deleteBtn.addEventListener('click', handleDeleteClick);

        // Add CutPiece data and buttons to element
        cutPieceInstElement.append(
            createElement('div', {}, cutPiece.thickness),
            createElement('div', {}, cutPiece.width),
            createElement('div', {}, convertNumToImperialWithFraction(cutPiece.length)),
            createElement('div', {}, cutPiece.quantity),
            createElement('div', {}, convertNumToImperialWithFraction(cutPiece.kerf)),
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

export default CutPieceComponent;
