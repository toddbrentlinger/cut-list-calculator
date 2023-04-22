import { createElement } from "../utilities.js";

export default function CutPieceListComponent() {
    let cutPieceComponents = [];

    let element;
    let cutPieceListElement;

    const addCutPieceComponent = function(...cutPieceComponentsToAdd) {
        cutPieceComponents.push(...cutPieceComponentsToAdd);
        for (const cutPieceComponent of cutPieceComponentsToAdd) {
            cutPieceListElement.appendChild(cutPieceComponent.render());
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

        // Add cut piece components for list
        // for (const cutPieceComponent of cutPieceComponents) {
        //     cutPieceListElement.appendChild(cutPieceComponent.render());
        // }

        return element;
    }

    return {
        addCutPieceComponent,
        render,
    };
}
