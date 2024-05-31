import { RotatingLabelsResizeObserver } from "../rotatingLabels.js";
import { createElement } from "../utilities.js";

export default function CutPieceListComponent() {
    let cutPieceComponents = [];

    let element;
    let cutPieceListElement;

    const addCutPieceComponent = function(...cutPieceComponentsToAdd) {
        // Add cut piece components to array
        cutPieceComponents.push(...cutPieceComponentsToAdd);

        // Add cut piece components to DOM
        for (const cutPieceComponent of cutPieceComponentsToAdd) {
            cutPieceListElement.appendChild(cutPieceComponent.render());
        }
    };

    const removeCutPieceComponent = function(...cutPieceComponentsToRemove) {
        let index;
        for (const cutPieceComponent of cutPieceComponentsToRemove) {
            index = cutPieceComponents.indexOf(cutPieceComponent);
            if (index < 0) { continue; }

            // Remove cut piece component from DOM
            cutPieceComponent.remove();
        
            // Remove cut piece component from array
            cutPieceComponents.splice(index, 1);
        }
    };

    const removeCutPiece = function(...cutPiecesToRemove) {
        let index;
        for (const cutPieceToRemove of cutPiecesToRemove) {
            index = cutPieceComponents.findIndex((cutPieceComponent) => cutPieceComponent.cutPiece === cutPieceToRemove);

            if (index < 0) { continue; }

            // Remove cut piece component from DOM
            cutPieceComponents[index].remove();
        
            // Remove cut piece component from array
            cutPieceComponents.splice(index, 1);
        }
    };

    const clear = function() {
        // Remove cut piece components from array
        cutPieceComponents = [];

        // Remove elements from document
        while (cutPieceListElement.firstChild) {
            cutPieceListElement.removeChild(cutPieceListElement.firstChild);
        }
    };

    const getPieces = function() {
        return cutPieceComponents.map((cutPieceComponent) => {
            return cutPieceComponent.cutPiece;
        });
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'piece-list'});
        }

        // Add labels for list (table head)
        const tableHeaders = [
            createElement('div', {'class': 'rotating-text-container'}, createElement('span', {'class': 'rotating-text-content'}, 'Thickness')),
            createElement('div', {'class': 'rotating-text-container'}, createElement('span', {'class': 'rotating-text-content'}, 'Width')),
            createElement('div', {'class': 'rotating-text-container'}, createElement('span', {'class': 'rotating-text-content'}, 'Length')),
            createElement('div', {'class': 'rotating-text-container'}, createElement('span', {'class': 'rotating-text-content'}, 'Quantity')),
            createElement('div', {'class': 'rotating-text-container'}, createElement('span', {'class': 'rotating-text-content'}, 'Kerf'))
        ];

        new RotatingLabelsResizeObserver(...tableHeaders);

        element.appendChild(
            createElement('div', {'class': 'piece-list-head rotating-text-head'}, 
                ...tableHeaders
            )
        );

        // Add list body (table body)
        cutPieceListElement = element.appendChild(createElement('div', {'class': 'piece-list-body'}));

        return element;
    }

    return {
        addCutPieceComponent,
        clear,
        getPieces,
        removeCutPiece,
        removeCutPieceComponent,
        render,
    };
}
