import FooterComponent from "./footerComponent.js";

import CutPieceSectionComponent from "./cutPieceSectionComponent.js";
import UncutPieceSectionComponent from "./uncutPieceSectionComponent.js";

import CutListComponent from "./cutListComponent.js";

import cutListCalculator from "../cutListCalculator.js";

import { createElement } from "../utilities.js";

const cutListCalculatorComponent = (() => {
    const cutPieceSectionComponent = CutPieceSectionComponent();
    const uncutPieceSectionComponent = UncutPieceSectionComponent();

    let bestCutList;
    
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

        // Add cut/uncut pieces section
        mainElement.appendChild(cutPieceSectionComponent.render());
        mainElement.appendChild(uncutPieceSectionComponent.render());

        // Add any cut/uncut pieces passed as parameters
        initCutPieces.forEach((cutPiece) => cutPieceSectionComponent.addCutPiece(cutPiece));
        initUncutPieces.forEach((uncutPiece) => uncutPieceSectionComponent.addUncutPiece(uncutPiece));

        // Add button that creates cut list with click event listener
        const createCutListBtn = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-btn-container'})
        ).appendChild(
            createElement('button', {'id': 'create-cut-list-btn'}, 'Create Cut List')
        );
        createCutListBtn.addEventListener('click', handleCreateCutListClick);

        // Add error message for cut list calculator button
        cutListErrorElement = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-error-msg', 'class': 'hide'})
        );

        // Add calculated cut list
        cutListComponent = CutListComponent();
        mainElement.appendChild(cutListComponent.render());

        // Add footer component, passing in the first year of the app
        document.body.appendChild(FooterComponent(2023).render());
    }
    
    function handleCreateCutListClick() {
        const cutPieces = cutPieceSectionComponent.getCutPieces();
        const uncutPieces = uncutPieceSectionComponent.getUncutPieces();

        if (!cutPieces.length) {
            // No cutpieces
            showCutListError('Add cut pieces to create a new cut list');
            return;
        }
        
        if (!uncutPieces.length) {
            // No uncut pieces
            showCutListError('Add uncut pieces to create a new cut list');
            return;
        }

        // If reach here, no errors to show. Remove any previous errors.
        clearCutListError();

        bestCutList = cutListCalculator.getCheapestCutList(
            cutPieces, 
            uncutPieces
        );
        // bestCutList = cutListCalculator.getCheapestCutList(
        //     cutPieceListComponent.getPieces(), 
        //     uncutPieceListComponent.getPieces()
        // );

        cutListComponent.cutList = bestCutList;
    }

    function showCutListError(errorMsg) {
        cutListErrorElement.classList.remove('hide');
        cutListErrorElement.textContent = errorMsg;
    }

    function clearCutListError() {
        cutListErrorElement.classList.add('hide');
        cutListErrorElement.textContent = '';
    }

    return {
        init,
    };
})();

export default cutListCalculatorComponent;
