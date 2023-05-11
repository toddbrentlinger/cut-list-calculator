import { createElement } from "../utilities.js";
import ConfirmModalComponent from "./confirmModalComponent.js";
import CutPiece from "../cutPiece.js";
import CutPieceComponent from "./cutPieceComponent.js";
import CutPieceCreateFormComponent from "./cutPieceCreateFormComponent.js";
import CutPieceListComponent from "./cutPieceListComponent.js";

export default function CutPieceSectionComponent() {
    let element;
    const cutPieceListComponent = CutPieceListComponent();

    const getCutPieces = function() {
        return cutPieceListComponent.getPieces();
    };

    const addCutPiece = function(cutPiece) {
        cutPieceListComponent.addCutPieceComponent(
            CutPieceComponent(cutPiece, handleCutPieceEditClick, handleCutPieceDeleteClick)
        );

        return cutPiece;
    };

    const removeCutPiece = function(cutPieceToRemove) {
        cutPieceListComponent.removeCutPiece(cutPieceToRemove);
    };

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
        
        addCutPiece(cutPiece);
    };

    const handleCutPieceEditClick = function(e, oldCutPiece) {
        // Create a new CutPiece from form input values
        const newCutPiece = new CutPiece(
            Number(e.target.elements.namedItem('thickness').value),
            Number(e.target.elements.namedItem('width').value),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('quantity').value),
            Number(e.target.elements.namedItem('kerf').value)
        );
        
        // Check that new CutPiece is not a duplicate thickness x width x length combo
        cutPieceListComponent.getPieces().forEach((cutPiece) => {
            if (cutPiece !== oldCutPiece && cutPiece === newCutPiece) {
                return;
            }
        });

        // If reach here, new CutPiece is valid
    };

    const handleCutPieceDeleteClick = function(cutPieceToDelete) {
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleCutPieceDeleteConfirm(cutPieceToDelete)
            },
            'Are you sure you want to delete the cut piece?'
            ).render()
        );
    };

    const handleCutPieceDeleteConfirm = function(cutPieceToDelete) {
        removeCutPiece(cutPieceToDelete);
    };

    const handleCutPieceListClear = function() {
        // Clear cut pieces displayed
        cutPieceListComponent.clear();
    };

    const clearElement = function() {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('section', {'class': 'piece-section'});
        } else {
            clearElement();
        }

        // Piece Header
        element.appendChild(createElement('h2', {}, 'Cut Pieces:'));

        // Piece Clear Button
        element.appendChild(
            createElement('div', {'class': 'clear-btn-container'})
        ).appendChild(
            createElement('button', {'class': 'clear-btn'}, 'Clear All Cut Pieces')
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
