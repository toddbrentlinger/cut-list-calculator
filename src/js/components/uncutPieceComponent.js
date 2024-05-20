import cutListCalculatorStorage from "../cutListCalculatorStorage.js";
import UncutPiece from "../uncutPiece.js";
import { createElement, convertNumToImperialWithFraction, clearElement } from "../utilities.js";
import UncutPieceEditFormComponent from "./uncutPieceEditFormComponent.js";

/**
 * @typedef {Object} UncutPieceComponent
 * @property {UncutPiece} uncutPiece - Returns UncutPiece of the component (getter)
 * @property {Function} remove - Removes the UncutPiece component from the DOM
 * @property {Function} render - Returns HTMLElement of UncutPiece component
 */

/**
 * Factory function to create UncutPiece HTMLElement component.
 * @param {UncutPiece} uncutPiece
 * @param {Function} deleteCallback 
 * @returns {UncutPieceComponent}
 */
export default function UncutPieceComponent(uncutPiece, deleteCallback) {
    /** Reference to HTMLElement of the UncutPiece component. */
    let element;
    
    /** Event handler function when UncutPiece edit is started by User. */
    const handleEditClick = function() {
        // Clear current UncutPiece data until it's values are updated
        clearElement(element);

        // Add UncutPiece edit form component to main element instead
        element.appendChild(
            UncutPieceEditFormComponent(uncutPiece, handleEditConfirm, handleEditCancel).render()
        );
    };

    /**
     * Event handler function when UncutPiece edit is confirmed by User.
     * @param {Event} e 
     */
    const handleEditConfirm = function(e) {
        e.preventDefault();
        
        // Change UncutPiece values to form input values
        uncutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
        uncutPiece.width = Number(e.target.elements.namedItem('width').value);
        uncutPiece.length = Number(e.target.elements.namedItem('length').value);
        uncutPiece.price = Number(e.target.elements.namedItem('price').value);
        
        // Save updated UncutPiece to database storage
        cutListCalculatorStorage.saveUncutPiece(uncutPiece);

        // Re-render component
        render();
    };

    /** Event handler function when UncutPiece edit is cancelled by User. */
    const handleEditCancel = function() {
        render();
    };

    /** Event handler function when UncutPiece is deleted by User. */
    const handleDeleteClick = function() {
        deleteCallback(uncutPiece);
    };

    /** Removes UncutPiece component HTMLElement from DOM. */
    const remove = function() {
        element.remove();
    };

    /**
     * Returns HTMLElement of UncutPiece component.
     * @returns {HTMLElement}
     */
    const render = function() {
        /**
         * If main element is NOT yet defined, create new element, else clear 
         * main element.
         */
        if (element === undefined) {
            element = createElement('div', {'class': 'uncut-piece-inst-container'});
        } else {
            clearElement(element);
        }

        // Create element to hold UncutPiece data as child of main element
        const uncutPieceInstElement = element.appendChild(
            createElement('div', {'class': 'uncut-piece'})
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

        // Add UncutPiece data and buttons to element
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
