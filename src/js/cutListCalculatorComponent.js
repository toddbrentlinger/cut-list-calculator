import FooterComponent from "./components/footerComponent.js";
import CutPieceSectionComponent from "./components/cutPieceSectionComponent.js";
import UncutPieceSectionComponent from "./components/uncutPieceSectionComponent.js";
import CutListComponent from "./components/cutListComponent.js";
import ProgressBarComponent from "./components/progressBarComponent.js";
import cutListCalculator from "./cutListCalculator.js";
import CutList from "./cutList.js";
import cutListCalculatorStorage from "./cutListCalculatorStorage.js";
import { createElement } from "./utilities.js";
import UncutPiece from "./uncutPiece.js";
import CutPiece from "./cutPiece.js";

/** Module to display main app component for the cut list calculator. */
const cutListCalculatorComponent = (() => {
    /** Reference to CutPieceSectionComponent to display all CutPieces. */
    const cutPieceSectionComponent = CutPieceSectionComponent();

    /** Reference to UncutPieceSectionComponent to display all UncutPieces. */
    const uncutPieceSectionComponent = UncutPieceSectionComponent();

    /** Reference to ProgressBarComponent to display progress of cut list calculation. */
    const cutListProgressElement = ProgressBarComponent();

    /** Reference to CutListComponent to display calculated cut list. */
    const cutListComponent = CutListComponent();

    /** Reference to web worker used to calculate cut list on background thread. */
    let cutListWorker;
    
    /** Reference to HTMLElement to display error messages. */
    let cutListErrorElement;

    /**
     * Initializes cut list calculator component to render elements and add 
     * event listeners.
     */
    function init() {
        // Add header with title
        document.body.appendChild(
            createElement('header', {}, 
                createElement('h1', {}, 'Cut List Calculator')
            )
        );

        // Add main element
        let mainElement = document.createElement('main');
        document.body.appendChild(mainElement);

        // Add description
        mainElement.appendChild(createElement('p', {}, 
            'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of lumber needed and provides the cut sequence for each uncut piece.'
        ));

        // Add cut/uncut pieces section
        mainElement.appendChild(cutPieceSectionComponent.render());
        mainElement.appendChild(uncutPieceSectionComponent.render());

        // Add button that calculates cut list with click event listener
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
        mainElement.appendChild(cutListProgressElement.render());

        // Add calculated cut list
        mainElement.appendChild(cutListComponent.render());

        // Add footer component, passing in the first year of the app
        document.body.appendChild(FooterComponent(2023).render());

        /**
         * Add any CutPieces/UncutPieces from database storage. Passes callback 
         * function that accepts CutPieces and UncutPieces after retrieval from
         * the database storage.
         */
        cutListCalculatorStorage.getAllPieces(initPieces);
    }

    /**
     * Initializes CutPiece/UncutPiece section components with list of CutPieces/UncutPieces.
     * @param {CutPiece[]} cutPieces 
     * @param {UncutPiece[]} uncutPieces 
     */
    function initPieces(cutPieces, uncutPieces) {
        // Add any cut/uncut pieces passed as parameters
        cutPieces.forEach((cutPiece) => cutPieceSectionComponent.addCutPiece(cutPiece));
        uncutPieces.forEach((uncutPiece) => uncutPieceSectionComponent.addUncutPiece(uncutPiece));
    }
    
    /** Event handler function when button to calculate cut list is clicked by the User. */
    function handleCreateCutListClick() {
        /**
         * Get array of CutPieces and UncutPieces using their corresponding 
         * section components.
         */
        const cutPieces = cutPieceSectionComponent.getCutPieces();
        const uncutPieces = uncutPieceSectionComponent.getUncutPieces();

        /**
         * If NO CutPieces or UncutPieces, cannot calculate cut list. 
         * Display error message and return.
         */
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

        // Set progress element to default value and unhide to display
        updateCutListProgress();
        cutListProgressElement.unhide();

        /**
         * Use web worker to calculate cut list on background thread to allow 
         * User interaction during calculation. If web workers are NOT supported 
         * the browser, calculate the cut list directly in the main thread, 
         * preventing the User from interacting with the app until the 
         * calculation is complete.
         */
        if (window.Worker) {
            /**
             * If web worker is already calculating cut list, terminate before 
             * starting a new one.
             */
            if (cutListWorker !== undefined) {
                cutListWorker.terminate();
            }

            // Create web worker to calculate cut list
            cutListWorker = new Worker(
                './worker.bundle.js'
            );
            
            // Trasmit CutPieces and UncutPieces to cut list web worker
            cutListWorker.postMessage([
                cutPieces,
                uncutPieces,
            ]);

            // Event handler function when cut list web worker sends message with data
            cutListWorker.onmessage = function(e) {
                // If data is an array, it should hold the final calculated cut lists
                if (Array.isArray(e.data)) {
                    // Add CutList prototype to each object in array returned
                    e.data.forEach((cutList) => Object.setPrototypeOf(cutList, CutList.prototype));

                    // Assign cut lists to cut list component
                    cutListComponent.cutLists = e.data;

                    // Hide spinning logo to signal end of calculation
                    cutListProgressElement.hideSpinningLogo();
                }
                /**
                 * Else if data is a number OR string, it should hold a message 
                 * to be displayed about the progress of the cut list calculation.
                 */
                else if ((typeof e.data === 'number') || (typeof e.data === 'string')) {
                    updateCutListProgress(e.data);
                }
            };
        } else {
            console.log('Your browser doesn\'t support web workers.');

            // Calculate cut lists in main thread
            const bestCutList = cutListCalculator.getCutLists(
                cutPieces,
                uncutPieces,
                updateCutListProgress
            );
    
            // Assign cut lists to cut list component
            cutListComponent.cutLists = bestCutList;
        }
    }

    /**
     * Updates message displaying progress of current calculation of the cut list.
     * @param {string} message 
     */
    function updateCutListProgress(message) {
        cutListProgressElement.update(message);
    }

    /**
     * Displays error message.
     * @param {string} errorMsg 
     */
    function showCutListError(errorMsg) {
        cutListErrorElement.classList.remove('hide');
        cutListErrorElement.textContent = errorMsg;
    }

    /** Clears any error message currently displayed. */
    function clearCutListError() {
        cutListErrorElement.classList.add('hide');
        cutListErrorElement.textContent = '';
    }

    return {
        init,
    };
})();

export default cutListCalculatorComponent;
