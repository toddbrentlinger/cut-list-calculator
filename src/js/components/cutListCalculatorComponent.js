import Footer from "./footer.js";
import cutPieceAddForm from "../cutPieceAddForm.js";
import uncutPieceAddForm from "../uncutPieceAddForm.js";

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

    let cutPiecesTableBody;
    let uncutPiecesTableBody;

    function init() {
        let mainElement = document.querySelector('main');
        if (mainElement === null) {
            mainElement = document.createElement('main');
            document.body.appendChild(mainElement);
        }

        // Add forms that add cut/uncut pieces
        cutPieceAddForm.init(handleCutPieceAddFormSubmit);
        uncutPieceAddForm.init(handleUncutPieceAddFormSubmit);

        // Add cut/uncut pieces list
        cutPieceListComponent = CutPieceListComponent();
        uncutPieceListComponent = UncutPieceListComponent();
        mainElement.appendChild(cutPieceListComponent.render());
        mainElement.appendChild(uncutPieceListComponent.render());

        const cutPieceTable = document.createElement('table');
        cutPieceTable.appendChild(
            createElement('thead', {}, 
                createElement('tr', {},
                    createElement('th', {}, 'Thickness'),
                    createElement('th', {}, 'Width'),
                    createElement('th', {}, 'Length'),
                    createElement('th', {}, 'Quantity'),
                    createElement('th', {}, 'Kerf')
                )
            )
        );

        const uncutPieceTable = document.createElement('table');
        uncutPieceTable.appendChild(
            createElement('thead', {}, 
                createElement('tr', {},
                    createElement('th', {}, 'Thickness'),
                    createElement('th', {}, 'Width'),
                    createElement('th', {}, 'Length'),
                    createElement('th', {}, 'Price'),
                )
            )
        );

        cutPiecesTableBody = cutPieceTable.appendChild(
            document.createElement('tbody')
        );
        uncutPiecesTableBody = uncutPieceTable.appendChild(
            document.createElement('tbody')
        );

        cutPieceAddForm.formElement.before(cutPieceTable);
        uncutPieceAddForm.formElement.before(uncutPieceTable);

        // Handle button that creates cut list
        const createCutListBtn = document.getElementById('create-cut-list-btn');
        if (createCutListBtn) {
            createCutListBtn.addEventListener('click', handleCreateCutListClick);
        }

        // Add calculated cut list
        cutListElement = document.getElementById('cut-list');

        // Add footer component, passing in the first year of the app
        document.body.appendChild(Footer(2023).render());
    }

    function addCutPiece(cutPiece) {
        cutPieces.push(cutPiece);
        return cutPiece;
    }

    function addUncutPiece(uncutPiece) {
        uncutPieces.push(uncutPiece);
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

        // Add CutPiece to list through cutPiecesRef
        addCutPiece(cutPiece);

        // Display new CutPiece
        cutPiecesTableBody.append(
            CutPieceComponent(cutPiece).render()
        );

        cutPieceListComponent.addCutPieceComponent(CutPieceComponent(cutPiece));
    }

    function handleUncutPieceAddFormSubmit(e) {
        e.preventDefault();

        // Create UncutPiece from form inputs
        const uncutPiece = new UncutPiece(
            new CrossSection(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value)),
            Number(e.target.elements.namedItem('length').value),
            Number(e.target.elements.namedItem('price').value),
        );

        // Add UncutPiece to list through uncutPieces
        addUncutPiece(uncutPiece);

        // Display new UncutPiece
        uncutPiecesTableBody.append(
            UncutPieceComponent(uncutPiece).render()
        );

        uncutPieceListComponent.addUncutPieceComponent(UncutPieceComponent(uncutPiece));
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
