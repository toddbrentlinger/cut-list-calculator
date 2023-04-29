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

    const clear = function() {
        // Remove cut piece components from array
        cutPieceComponents = [];

        // Remove elements from document
        while (cutPieceListElement.firstChild) {
            cutPieceListElement.removeChild(cutPieceListElement.firstChild);
        }
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'piece-list'});
        }

        // Add labels for list (table head)
        element.appendChild(
            createElement('div', {'class': 'piece-list-head'}, 
                createElement('div', {}, 'Thickness'),
                createElement('div', {}, 'Width'),
                createElement('div', {}, 'Length'),
                createElement('div', {}, 'Quantity'),
                createElement('div', {}, 'Kerf')
            )
        );

        // Add list body (table body)
        cutPieceListElement = element.appendChild(createElement('div', {'class': 'piece-list-body'}));

        return element;
    }

    return {
        addCutPieceComponent,
        clear,
        removeCutPieceComponent,
        render,
    };
}
