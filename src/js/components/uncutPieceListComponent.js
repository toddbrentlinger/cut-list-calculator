import { createElement } from "../utilities.js";

export default function UncutPieceListComponent() {
    let uncutPieceComponents = [];

    let element;
    let uncutPieceListElement;

    const addUncutPieceComponent = function(...uncutPieceComponentsToAdd) {
        uncutPieceComponents.push(...uncutPieceComponentsToAdd);
        for (const uncutPieceComponent of uncutPieceComponentsToAdd) {
            uncutPieceListElement.appendChild(uncutPieceComponent.render());
        }
    };

    const removeUncutPieceComponent = function(...uncutPieceComponentsToRemove) {
        let index;
        for (const uncutPieceComponent of uncutPieceComponentsToRemove) {
            index = uncutPieceComponents.indexOf(uncutPieceComponent);
            if (index < 0) { continue; }

            // Remove uncut piece component from DOM
            uncutPieceComponent.remove();
        
            // Remove uncut piece component from array
            uncutPieceComponents.splice(index, 1);
        }
    };

    const removeUncutPiece = function(...uncutPiecesToRemove) {
        let index;
        for (const uncutPieceToRemove of uncutPiecesToRemove) {
            index = uncutPieceComponents.findIndex((uncutPieceComponent) => uncutPieceComponent.uncutPiece === uncutPieceToRemove);

            if (index < 0) { continue; }

            // Remove uncut piece component from DOM
            uncutPieceComponents[index].remove();
        
            // Remove uncut piece component from array
            uncutPieceComponents.splice(index, 1);
        }
    };

    const clear = function() {
        // Remove uncut piece components from array
        uncutPieceComponents = [];

        // Remove elements from document
        while (uncutPieceListElement.firstChild) {
            uncutPieceListElement.removeChild(uncutPieceListElement.firstChild);
        }
    };

    const getPieces = function() {
        return uncutPieceComponents.map((uncutPieceComponent) => {
            return uncutPieceComponent.uncutPiece;
        });
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
                createElement('div', {}, 'Price'),
            )
        );

        // Add list body (table body)
        uncutPieceListElement = element.appendChild(createElement('div', {'class': 'piece-list-body'}));

        return element;
    }

    return {
        addUncutPieceComponent,
        clear,
        getPieces,
        removeUncutPiece,
        removeUncutPieceComponent,
        render,
    };
}
