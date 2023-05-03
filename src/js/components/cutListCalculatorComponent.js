import Footer from "./footer.js";

import CutPieceCreateFormComponent from "./cutPieceCreateFormComponent.js";
import UncutPieceCreateFormComponent from "./uncutPieceCreateFormComponent.js";

import CutPieceComponent from "./cutPieceComponent.js";
import CutPieceListComponent from "./cutPieceListComponent.js";
import UncutPieceComponent from "./uncutPieceComponent.js";
import UncutPieceListComponent from "./uncutPieceListComponent.js";
import CutListComponent from "./cutListComponent.js";

import cutListCalculator from "../cutListCalculator.js";
import CutPiece from "../cutPiece.js";
import {UncutPiece, CrossSection} from "../uncutPiece.js";

import { createElement } from "../utilities.js";
import ConfirmModalComponent from "./confirmModalComponent.js";

const cutListCalculatorComponent = (() => {
    let bestCutList;

    let cutPieceListComponent;
    let uncutPieceListComponent;
    let cutListComponent;
    let cutListErrorElement;

    function init(initCutPieces = [], initUncutPieces = [], initBestCutList = undefined) {
        bestCutList = initBestCutList;

        let mainElement = document.querySelector('main');
        if (mainElement === null) {
            mainElement = document.createElement('main');
            document.body.appendChild(mainElement);
        }

        // Description
        mainElement.appendChild(createElement('p', {}, 
            'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of lumber needed and provides the cut sequence for each uncut piece.'
        ));

        // Add cut/uncut pieces list with create form after

        // Cut Pieces - Header
        mainElement.appendChild(createElement('h2', {}, 'Cut Pieces:'));
        // Cut Pieces - Clear Button
        mainElement.appendChild(
            createElement('div', {'class': 'clear-btn-container'})
        ).appendChild(
            createElement('button', {'class': 'clear-btn'}, 'Clear All Cut Pieces')
        ).addEventListener('click', handleCutPieceListClear);
        // Cut Pieces - List
        cutPieceListComponent = CutPieceListComponent();
        mainElement.appendChild(cutPieceListComponent.render());
        // Cut Pieces - Create Form
        mainElement.appendChild(
            CutPieceCreateFormComponent(handleCutPieceAddFormSubmit).render()
        );

        // Uncut Pieces - Header
        mainElement.appendChild(createElement('h2', {}, 'Uncut Pieces:'));
        // Uncut Pieces - Clear Button
        mainElement.appendChild(
            createElement('div', {'class': 'clear-btn-container'})
        ).appendChild(
            createElement('button', {'class': 'clear-btn'}, 'Clear All Uncut Pieces')
        ).addEventListener('click', handleUncutPieceListClear);
        // Uncut Pieces - List
        uncutPieceListComponent = UncutPieceListComponent();
        mainElement.appendChild(uncutPieceListComponent.render());
        // Uncut Pieces - Create Form
        mainElement.appendChild(
            UncutPieceCreateFormComponent(handleUncutPieceAddFormSubmit).render()
        );

        // Add any cut/uncut pieces passed as parameters
        initCutPieces.forEach((cutPiece) => addCutPiece(cutPiece));
        initUncutPieces.forEach((uncutPiece) => addUncutPiece(uncutPiece));

        // Add button that creates cut list with click event listener
        const createCutListBtn = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-btn-container'})
        ).appendChild(
            createElement('button', {'id': 'create-cut-list-btn'}, 'Create Cut List')
        );
        createCutListBtn.addEventListener('click', handleCreateCutListClick);

        // Add error message for cut list calculator button
        cutListErrorElement = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-error-msg'})
        );

        // Add calculated cut list
        cutListComponent = CutListComponent();
        mainElement.appendChild(cutListComponent.render());

        // Add footer component, passing in the first year of the app
        document.body.appendChild(Footer(2023).render());
    }

    function addCutPiece(cutPiece) {
        cutPieceListComponent.addCutPieceComponent(
            CutPieceComponent(cutPiece, handleCutPieceEditClick, handleCutPieceDeleteClick)
        );

        return cutPiece;
    }

    function addUncutPiece(uncutPiece) {
        uncutPieceListComponent.addUncutPieceComponent(
            UncutPieceComponent(uncutPiece, handleUncutPieceEditClick, handleUncutPieceDeleteClick)
        );

        return uncutPiece;
    }

    function removeCutPiece(cutPieceToRemove) {
        cutPieceListComponent.removeCutPiece(cutPieceToRemove);
    }

    function removeUncutPiece(uncutPieceToRemove) {
        uncutPieceListComponent.removeUncutPiece(uncutPieceToRemove);
    }

    function handleCutPieceAddFormSubmit(e) {
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
    }

    function handleUncutPieceAddFormSubmit(e) {
        e.preventDefault();

        // Create UncutPiece from form inputs
        const uncutPiece = new UncutPiece(
            new CrossSection(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value)),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('price').value),
        );
        
        addUncutPiece(uncutPiece);
    }

    function handleCutPieceEditClick(e) {

    }

    function handleUncutPieceEditClick(e) {

    }

    function handleCutPieceDeleteClick(cutPieceToDelete) {
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleCutPieceDeleteConfirm(cutPieceToDelete)
            }).render()
        );
    }

    function handleCutPieceDeleteConfirm(cutPieceToDelete) {
        console.log('Delete cut piece ' + cutPieceToDelete);
        removeCutPiece(cutPieceToDelete);
    }

    function handleUncutPieceDeleteClick(uncutPieceToDelete) {
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleUncutPieceDeleteConfirm(uncutPieceToDelete)
            }).render()
        );
    }

    function handleUncutPieceDeleteConfirm(uncutPieceToDelete) {
        console.log('Delete uncut piece ' + uncutPieceToDelete);
        removeUncutPiece(uncutPieceToDelete);
    }
    
    function handleCreateCutListClick() {
        const cutPieces = cutPieceListComponent.getPieces();
        const uncutPieces = uncutPieceListComponent.getPieces();

        if (!cutPieces.length) {
            // No cutpieces
            showCutListError('Add cut pieces to create a cut list');
            return;
        }
        
        if (!uncutPieces.length) {
            // No uncut pieces
            showCutListError('Add uncut pieces to create a cut list');
            return;
        }

        // If reach here, no errors to show. Remove any previous errors.
        clearCutListError();

        bestCutList = cutListCalculator.getCheapestCutList(
            cutPieceListComponent.getPieces(), 
            uncutPieceListComponent.getPieces()
        );

        cutListComponent.cutList = bestCutList;
    }

    function handleCutPieceListClear() {
        console.log('Clear Cut List');

        // Clear cut pieces displayed
        cutPieceListComponent.clear();
    }

    function handleUncutPieceListClear() {
        console.log('Clear Uncut List');

        // Clear uncut pieces displayed
        uncutPieceListComponent.clear();
    }

    function showCutListError(errorMsg) {
        cutListErrorElement.textContent = errorMsg;
    }

    function clearCutListError() {
        cutListErrorElement.textContent = '';
    }

    return {
        init,
    };
})();

export default cutListCalculatorComponent;
