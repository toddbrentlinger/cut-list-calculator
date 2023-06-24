import FooterComponent from "./components/footerComponent.js";

import CutPieceSectionComponent from "./components/cutPieceSectionComponent.js";
import UncutPieceSectionComponent from "./components/uncutPieceSectionComponent.js";

import CutListComponent from "./components/cutListComponent.js";

import cutListCalculator from "./cutListCalculator.js";

import { createElement } from "./utilities.js";
import { CutList } from "./cutList.js";

const cutListCalculatorComponent = (() => {
    const cutPieceSectionComponent = CutPieceSectionComponent();
    const uncutPieceSectionComponent = UncutPieceSectionComponent();

    let bestCutList;
    
    let cutListComponent;
    let cutListErrorElement;
    let cutListProgressElement;

    function init(initCutPieces = [], initUncutPieces = [], initBestCutList = undefined) {
        bestCutList = initBestCutList;

        // Header with title
        document.body.appendChild(
            createElement('header', {}, 
                createElement('h1', {}, 'Cut List Calculator')
            )
        );

        // Main element
        let mainElement = document.createElement('main');
        document.body.appendChild(mainElement);

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
            createElement('div', {'id': 'create-cut-list-btn-container', 'class': 'btn-large-container'})
        ).appendChild(
            createElement('button', {'id': 'create-cut-list-btn'}, 'Create Cut List')
        );
        createCutListBtn.addEventListener('click', handleCreateCutListClick);

        // Add error message for cut list calculator button
        cutListErrorElement = mainElement.appendChild(
            createElement('div', {'id': 'create-cut-list-error-msg', 'class': 'hide'})
        );

        // Add progress bar for cut list
        cutListProgressElement = mainElement.appendChild(
            createElement('div', {'id': 'cut-list-progress', 'class': 'hide'})
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

        // Temporary flag used before I can figure out how to implement Worker
        const useWorkerFlag = true;

        if (useWorkerFlag && window.Worker) {
            const cutListWorker = new Worker(
                './worker.bundle.js'
            );

            console.log('Message sent to worker');

            cutListWorker.postMessage([
                cutPieces,
                uncutPieces
            ]);

            cutListWorker.onmessage = function(e) {
                // Add CutList prototype to each object in array returned
                e.data.forEach((cutList) => Object.setPrototypeOf(cutList, CutList.prototype));

                cutListComponent.cutLists = e.data;
                console.log('Message received from worker');
                console.log(e.data);
            };
        } else {
            console.log('Your browser doesn\'t support web workers.');

            bestCutList = cutListCalculator.getCutLists(
                cutPieces,
                uncutPieces,
                updateCutListProgress
            );
    
            cutListComponent.cutLists = bestCutList;
        }
    }

    function updateCutListProgress(progressPercent) {
        console.log(`Console Log: ${progressPercent}%`);
        cutListProgressElement.textContent = `Progress: ${progressPercent}%`;
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
