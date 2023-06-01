import { createElement } from "../utilities.js";
import ConfirmModalComponent from "./confirmModalComponent.js";
import UncutPiece from "../uncutPiece.js";
import UncutPieceComponent from "./uncutPieceComponent.js";
import UncutPieceCreateFormComponent from "./uncutPieceCreateFormComponent.js";
import UncutPieceListComponent from "./uncutPieceListComponent.js";


export default function UncutPieceSectionComponent() {
    let element;
    const uncutPieceListComponent = UncutPieceListComponent();

    const getUncutPieces = function() {
        return uncutPieceListComponent.getPieces();
    };

    const addUncutPiece = function(uncutPiece) {
        uncutPieceListComponent.addUncutPieceComponent(
            UncutPieceComponent(uncutPiece, handleUncutPieceEditClick, handleUncutPieceDeleteClick)
        );

        return uncutPiece;
    };

    const removeUncutPiece = function(uncutPieceToRemove) {
        uncutPieceListComponent.removeUncutPiece(uncutPieceToRemove);
    };

    const handleUncutPieceAddFormSubmit = function(e) {
        e.preventDefault();

        // Create UncutPiece from form inputs
        const uncutPiece = new UncutPiece(
            Number(e.target.elements.namedItem('thickness').value), 
            Number(e.target.elements.namedItem('width').value),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('price').value),
        );
        
        addUncutPiece(uncutPiece);
    };

    const handleUncutPieceEditClick = function(e, oldUncutPiece) {
        // Create a new UncutPiece from form input values
        const newUncutPiece = new UncutPiece(
            Number(e.target.elements.namedItem('thickness').value),
            Number(e.target.elements.namedItem('width').value),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('price').value),
        );
        
        // Check that new UncutPiece is not a duplicate thickness x width x length combo
        uncutPieceListComponent.getPieces().forEach((uncutPiece) => {
            if (uncutPiece !== oldUncutPiece && uncutPiece === newUncutPiece) {
                return;
            }
        });

        // If reach here, new UncutPiece is valid
    };

    const handleUncutPieceDeleteClick = function(uncutPieceToDelete) {
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleUncutPieceDeleteConfirm(uncutPieceToDelete)
            },
            'Are you sure you want to delete the uncut piece?'
            ).render()
        );
    };

    const handleUncutPieceDeleteConfirm = function(uncutPieceToDelete) {
        removeUncutPiece(uncutPieceToDelete);
    };

    const handleUncutPieceListClear = function() {
        // Clear uncut pieces displayed
        uncutPieceListComponent.clear();
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('section', {'class': 'piece-section'});
        } else {
            clearElement();
        }

        // Uncut Pieces - Header
        element.appendChild(createElement('h2', {}, 'Uncut Pieces:'));
        
        // Uncut Pieces - Clear Button
        element.appendChild(
            createElement('div', {'class': 'btn-large-container'})
        ).appendChild(
            createElement('button', {}, 'Clear All Uncut Pieces')
        ).addEventListener('click', handleUncutPieceListClear);
        
        // Uncut Pieces - List
        element.appendChild(uncutPieceListComponent.render());
        
        // Uncut Pieces - Create Form
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
