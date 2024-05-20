import { createElement, clearElement } from "../utilities.js";
import ConfirmModalComponent from "./confirmModalComponent.js";
import CutPiece from "../cutPiece.js";
import CutPieceComponent from "./cutPieceComponent.js";
import CutPieceCreateFormComponent from "./cutPieceCreateFormComponent.js";
import CutPieceListComponent from "./cutPieceListComponent.js";
import cutListCalculatorStorage from "../cutListCalculatorStorage.js";

/**
 * @typedef {Object} CutPieceSectionComponent
 * @property {Function} addCutPiece - Adds new CutPiece to displayed list of CutPieces
 * @property {Function} getCutPieces - Returns array of CutPieces displayed
 * @property {Function} render - Returns HTMLElement of CutPiece component section that displays all CutPieces
 */

/**
 * Factory function to create HTMLElement component section to hold CutPieceComponents.
 * @returns {CutPieceSectionComponent}
 */
function CutPieceSectionComponent() {
    /** Reference to container HTMLElement of component. */
    let element;

    /** Reference to HTMLElement that displays list of CutPieces. */
    const cutPieceListComponent = CutPieceListComponent();

    /**
     * Returns array of CutPieces displayed.
     * @returns {CutPiece[]}
     */
    const getCutPieces = function() {
        return cutPieceListComponent.getPieces();
    };

    /**
     * Adds and returns new CutPiece to displayed list of CutPieces.
     * @param {CutPiece} cutPiece 
     * @returns {CutPiece}
     */
    const addCutPiece = function(cutPiece) {
        /**
         * Add new CutPieceComponent to list of CutPieceComponents using 
         * instance of CutPiece.
         */
        cutPieceListComponent.addCutPieceComponent(
            CutPieceComponent(cutPiece, handleCutPieceDeleteClick)
        );

        // Save new CutPiece to database storage
        cutListCalculatorStorage.saveCutPiece(cutPiece);

        return cutPiece;
    };

    /** Removes CutPiece from displayed list of CutPieces.  */
    const removeCutPiece = function(cutPieceToRemove) {
        // Delete CutPiece from storage database
        cutListCalculatorStorage.deleteCutPiece(cutPieceToRemove);
        
        // Remove CutPiece from list of displayed CutPieces
        cutPieceListComponent.removeCutPiece(cutPieceToRemove);
    };

    /**
     * Event handler function when new CutPiece is submitted by User.
     * @param {Event} e 
     */
    const handleCutPieceAddFormSubmit = function(e) {
        e.preventDefault();

        // Create CutPiece from form inputs
        const cutPiece = new CutPiece(
            Number(e.target.elements.namedItem('thickness').value),
            Number(e.target.elements.namedItem('width').value),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('quantity').value),
            Number(e.target.elements.namedItem('kerf').value)
        );
        
        // Add new CutPiece to displayed list of CutPieces
        addCutPiece(cutPiece);
    };

    /**
     * Event handler function when CutPiece is selected to be deleted by User.
     * @param {CutPiece} cutPieceToDelete 
     */
    const handleCutPieceDeleteClick = function(cutPieceToDelete) {
        /**
         * Add confirm modal to the DOM, passing event handler to actually 
         * delete CutPiece after User confirms.
         */
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleCutPieceDeleteConfirm(cutPieceToDelete)
            },
            'Are you sure you want to delete the cut piece?'
            ).render()
        );
    };

    /**
     * Event handler function when CutPiece is confirmed to be deleted by User.
     * @param {CutPiece} cutPieceToDelete 
     */
    const handleCutPieceDeleteConfirm = function(cutPieceToDelete) {
        removeCutPiece(cutPieceToDelete);
    };

    /** Event handler function when all CutPieces are cleared by User. */
    const handleCutPieceListClear = function() {
        // Clear CutPieces displayed
        cutPieceListComponent.clear();

        // Delete all CutPieces from storage database
        cutListCalculatorStorage.deleteAllCutPieces();
    };

    /**
     * Returns HTMLElement of CutPiece component section that displays all CutPieces.
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
        element.appendChild(createElement('h2', {}, 'Cut Pieces:'));

        // Piece Clear Button with event listener
        element.appendChild(
            createElement('div', {'class': 'btn-large-container'})
        ).appendChild(
            createElement('button', {}, 'Clear All Cut Pieces')
        ).addEventListener('click', handleCutPieceListClear);

        // Pieces List
        element.appendChild(cutPieceListComponent.render());

        // Piece Create Form
        element.appendChild(
            CutPieceCreateFormComponent(handleCutPieceAddFormSubmit).render()
        );

        return element;
    };

    return {
        addCutPiece,
        getCutPieces,
        render,
    };
}

export default CutPieceSectionComponent;
