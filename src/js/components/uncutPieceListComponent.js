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
        render,
    };
}
