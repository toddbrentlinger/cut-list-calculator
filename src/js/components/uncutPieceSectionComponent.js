import { createElement, clearElement } from "../utilities.js";
import ConfirmModalComponent from "./confirmModalComponent.js";
import UncutPiece from "../uncutPiece.js";
import UncutPieceComponent from "./uncutPieceComponent.js";
import UncutPieceCreateFormComponent from "./uncutPieceCreateFormComponent.js";
import UncutPieceListComponent from "./uncutPieceListComponent.js";
import cutListCalculatorStorage from "../cutListCalculatorStorage.js";

/**
 * @typedef {Object} UncutPieceSectionComponent
 * @property {Function} addUncutPiece - Adds new UncutPiece to displayed list of UncutPieces
 * @property {Function} getUncutPieces - Returns array of UncutPieces displayed
 * @property {Function} render - Returns HTMLElement of UncutPiece component section that displays all UncutPieces
 */

/**
 * Factory function to create HTMLElement component section to hold UncutPieceComponents.
 * @returns {UncutPieceSectionComponent}
 */
function UncutPieceSectionComponent() {
    /** Reference to container HTMLElement of component. */
    let element;

    /** Reference to HTMLElement that displays list of UncutPieces. */
    const uncutPieceListComponent = UncutPieceListComponent();

    /**
     * Returns array of UncutPieces displayed.
     * @returns {UncutPiece[]}
     */
    const getUncutPieces = function() {
        return uncutPieceListComponent.getPieces();
    };

    /**
     * Adds and returns new UncutPiece to displayed list of UncutPieces.
     * @param {UncutPiece} uncutPiece 
     * @returns {UncutPiece}
     */
    const addUncutPiece = function(uncutPiece) {
        /**
         * Add new UncutPieceComponent to list of UncutPieceComponents using 
         * instance of UncutPiece.
         */
        uncutPieceListComponent.addUncutPieceComponent(
            UncutPieceComponent(uncutPiece, handleUncutPieceDeleteClick)
        );

        // Save new UncutPiece to database storage
        cutListCalculatorStorage.saveUncutPiece(uncutPiece);

        return uncutPiece;
    };

    /** Removes UncutPiece from displayed list of UncutPieces.  */
    const removeUncutPiece = function(uncutPieceToRemove) {
        // Delete UncutPiece from storage database
        cutListCalculatorStorage.deleteUncutPiece(uncutPieceToRemove);
        
        // Remove UncutPiece from list of displayed UncutPieces
        uncutPieceListComponent.removeUncutPiece(uncutPieceToRemove);
    };

    /**
     * Event handler function when new UncutPiece is submitted by User.
     * @param {Event} e 
     */
    const handleUncutPieceAddFormSubmit = function(e) {
        e.preventDefault();

        // Create UncutPiece from form inputs
        const uncutPiece = new UncutPiece(
            Number(e.target.elements.namedItem('thickness').value), 
            Number(e.target.elements.namedItem('width').value),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('price').value),
        );
        
        // Add new UncutPiece to displayed list of UncutPieces
        addUncutPiece(uncutPiece);
    };

    /**
     * Event handler function when UncutPiece is selected to be deleted by User.
     * @param {UncutPiece} uncutPieceToDelete 
     */
    const handleUncutPieceDeleteClick = function(uncutPieceToDelete) {
        /**
         * Add confirm modal to the DOM, passing event handler to actually 
         * delete UncutPiece after User confirms.
         */
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleUncutPieceDeleteConfirm(uncutPieceToDelete)
            },
            'Are you sure you want to delete the uncut piece?'
            ).render()
        );
    };

    /**
     * Event handler function when UncutPiece is confirmed to be deleted by User.
     * @param {UncutPiece} uncutPieceToDelete 
     */
    const handleUncutPieceDeleteConfirm = function(uncutPieceToDelete) {
        removeUncutPiece(uncutPieceToDelete);
    };

    /** Event handler function when all UncutPieces are cleared by User. */
    const handleUncutPieceListClear = function() {
        // Clear UncutPieces displayed
        uncutPieceListComponent.clear();

        // Delete all UncutPieces from storage database
        cutListCalculatorStorage.deleteAllUncutPieces();
    };

    /**
     * Returns HTMLElement of UncutPiece component section that displays all UncutPieces.
     * @returns {HTMLElement}
     */
    const render = function() {
        /**
         * If main element is NOT yet defined, create new element, else clear 
         * main element.
         */
        if (element === undefined) {
            element = createElement('section', {'class': 'piece-section'});
        } else {
            clearElement(element);
        }

        // Piece Header
        element.appendChild(createElement('h2', {}, 'Uncut Pieces:'));
        
        // Piece Clear Button with event listener
        element.appendChild(
            createElement('div', {'class': 'btn-large-container'})
        ).appendChild(
            createElement('button', {}, 'Clear All Uncut Pieces')
        ).addEventListener('click', handleUncutPieceListClear);
        
        // Pieces List
        element.appendChild(uncutPieceListComponent.render());
        
        // Piece Create Form
        element.appendChild(
            UncutPieceCreateFormComponent(handleUncutPieceAddFormSubmit).render()
        );

        return element;
    };

    return {
        addUncutPiece,
        getUncutPieces,
        render,
    };
}

export default UncutPieceSectionComponent;
