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

const cutListCalculatorComponent = (() => {
    let cutPieces = [];
    let uncutPieces = [];

    let bestCutList;

    let cutListElement;

    let cutPieceListComponent;
    let uncutPieceListComponent;

    function init(cutPieces = [], uncutPieces = [], bestCutList = undefined) {
        cutPieces = cutPieces;
        uncutPieces = uncutPieces;
        bestCutList = bestCutList;

        let mainElement = document.querySelector('main');
        if (mainElement === null) {
            mainElement = document.createElement('main');
            document.body.appendChild(mainElement);
        }

        // Description
        mainElement.appendChild(createElement('p', {}, 
            'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of pre-determined length dimensional lumber needed and provides the cut sequence for each uncut piece.'
        ));

        // Add cut/uncut pieces list with create form after
        mainElement.appendChild(createElement('h2', {}, 'Cut Pieces:'));
        cutPieceListComponent = CutPieceListComponent();
        mainElement.appendChild(cutPieceListComponent.render());
        mainElement.appendChild(
            CutPieceCreateFormComponent(handleCutPieceAddFormSubmit).render()
        );

        mainElement.appendChild(createElement('h2', {}, 'Uncut Pieces:'));
        uncutPieceListComponent = UncutPieceListComponent();
        mainElement.appendChild(uncutPieceListComponent.render());
        mainElement.appendChild(
            UncutPieceCreateFormComponent(handleUncutPieceAddFormSubmit).render()
        );

        // Add any cut/uncut pieces passed as parameters
        cutPieces.forEach((cutPiece) => addCutPiece(cutPiece));
        uncutPieces.forEach((uncutPiece) => addUncutPiece(uncutPiece));

        // Add button that creates cut list with click event listener
        const createCutListBtnContainer = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-btn-container'})
        );
        const createCutListBtn = createCutListBtnContainer.appendChild(
            createElement('button', {'id': 'create-cut-list-btn'}, 'Create Cut List')
        );
        createCutListBtn.addEventListener('click', handleCreateCutListClick);

        // Add calculated cut list
        cutListElement = mainElement.appendChild(
            createElement('div', {'id': 'cut-list'})
        );

        // Add footer component, passing in the first year of the app
        document.body.appendChild(Footer(2023).render());
    }

    function addCutPiece(cutPiece) {
        // Add CutPiece to array
        cutPieces.push(cutPiece);

        // Display new CutPiece in list
        cutPieceListComponent.addCutPieceComponent(CutPieceComponent(cutPiece));

        return cutPiece;
    }

    function addUncutPiece(uncutPiece) {
        // Add UncutPiece to array
        uncutPieces.push(uncutPiece);
        
        // Display new UncutPiece
        uncutPieceListComponent.addUncutPieceComponent(UncutPieceComponent(uncutPiece));

        return uncutPiece;
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
    
    function handleCreateCutListClick(e) {
        e.preventDefault();

        bestCutList = cutListCalculator.getCheapestCutList(
            cutPieces, 
            uncutPieces
        );

        cutListElement.append(CutListComponent(bestCutList).render());
    }

    return {
        init,
    };
})();

export default cutListCalculatorComponent;