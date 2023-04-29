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
    // TODO: Can remove since cut/uncut piece inside components insdie piece list component
    let cutPieces = [];
    let uncutPieces = [];
    let bestCutList;

    let cutPieceListComponent;
    let uncutPieceListComponent;
    let cutListComponent;

    function init(initCutPieces = [], initUncutPieces = [], initBestCutList = undefined) {
        cutPieces = initCutPieces;
        uncutPieces = initUncutPieces;
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
            createElement('button', {'class': 'clear-btn'}, 'Clear')
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
            createElement('button', {'class': 'clear-btn'}, 'Clear')
        ).addEventListener('click', handleUncutPieceListClear);
        // Uncut Pieces - List
        uncutPieceListComponent = UncutPieceListComponent();
        mainElement.appendChild(uncutPieceListComponent.render());
        // Uncut Pieces - Create Form
        mainElement.appendChild(
            UncutPieceCreateFormComponent(handleUncutPieceAddFormSubmit).render()
        );

        // Add any cut/uncut pieces passed as parameters
        cutPieces.forEach((cutPiece) => addCutPiece(cutPiece));
        uncutPieces.forEach((uncutPiece) => addUncutPiece(uncutPiece));

        // Add button that creates cut list with click event listener
        const createCutListBtn = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-btn-container'})
        ).appendChild(
            createElement('button', {'id': 'create-cut-list-btn'}, 'Create Cut List')
        );
        createCutListBtn.addEventListener('click', handleCreateCutListClick);

        // Add calculated cut list
        cutListComponent = CutListComponent();
        mainElement.appendChild(cutListComponent.render());

        // Add footer component, passing in the first year of the app
        document.body.appendChild(Footer(2023).render());
    }

    function addCutPiece(cutPiece) {
        // Add CutPiece to array
        cutPieces.push(cutPiece);

        // Display new CutPiece in DOM
        cutPieceListComponent.addCutPieceComponent(
            CutPieceComponent(cutPiece, handleCutPieceEditClick, handleCutPieceDeleteClick)
        );

        return cutPiece;
    }

    function addUncutPiece(uncutPiece) {
        // Add UncutPiece to array
        uncutPieces.push(uncutPiece);
        
        // Display new UncutPiece in DOM
        uncutPieceListComponent.addUncutPieceComponent(
            UncutPieceComponent(uncutPiece, handleUncutPieceEditClick, handleUncutPieceDeleteClick)
        );

        return uncutPiece;
    }

    function removeCutPiece(cutPieceToRemove) {
        let index;

        // Find index of array
        index = cutPieces.indexOf(cutPieceToRemove);
        
        // Return if no cut piece is found
        if (index < 0) { return; }

        // Remove cut piece from array
        cutPieces.splice(index, 1);
    }

    function removeUncutPiece(uncutPiece) {
        // Remove uncut piece from array

        // Remove component from DOM
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

    function handleCutPieceDeleteClick(e, cutPieceToDelete) {
        document.body.prepend(
            ConfirmModalComponent(() => {
                handleCutPieceDeleteConfirm(e, cutPieceToDelete)
            }).render()
        );
    }

    function handleCutPieceDeleteConfirm(e, cutPieceToDelete) {
        console.log('Delete cut piece ' + cutPieceToDelete);
    }

    function handleUncutPieceDeleteClick(e) {

    }
    
    function handleCreateCutListClick(e) {
        bestCutList = cutListCalculator.getCheapestCutList(
            cutPieces, 
            uncutPieces
        );

        cutListComponent.cutList = bestCutList;
    }

    function handleCutPieceListClear() {
        console.log('Clear Cut List');

        // Clear list of cut pieces
        cutPieces = [];

        // Clear cut pieces displayed
        cutPieceListComponent.clear();
    }

    function handleUncutPieceListClear() {
        console.log('Clear Uncut List');

        // Clear list of uncut pieces
        uncutPieces = [];

        // Clear uncut pieces displayed
        uncutPieceListComponent.clear();
    }

    return {
        init,
    };
})();

export default cutListCalculatorComponent;
