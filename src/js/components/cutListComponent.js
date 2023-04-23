import { createElement } from "../utilities.js";
import CutSequenceComponent from "./cutSequenceComponent.js";

export default function CutListComponent(cutList) {
    const render = function() {
        const materialList = cutList.getMaterialList();
        const element = createElement('div', {'class': 'cut-list'});

        // Material List - Header
        element.appendChild(createElement('h3', {}, 'Material List:'));
        
        // Material List - Table
        const materialListTable = element.appendChild(document.createElement('table'));

        // Material List - Table Head
        materialListTable.appendChild(createElement('thead', {}, 
            createElement('tr', {}, 
                createElement('th', {}, 'Quantity'),
                createElement('th', {}, 'Uncut Length'),
                createElement('th', {}, 'Unit Price'),
                createElement('th', {}, 'Sum Price')
            )
        ));

        // Material List - Table Body
        const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
        for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
            materialListTable.appendChild(createElement('tr', {}, 
                createElement('td', {}, uncutObj.quantity),
                createElement('td', {}, uncutLength),
                createElement('td', {}, uncutObj.unitPrice),
                createElement('td', {}, uncutObj.quantity * uncutObj.unitPrice)
            ));
        }

        // Cut Sequences
        element.appendChild(createElement('h3', {}, 'Cut Sequences:'));

        cutList.cutSequences.forEach((cutSequence, index) => {
            element.appendChild(CutSequenceComponent(cutSequence).render());
        });
        
        return element;
    }

    return {
        render,
    };
}
