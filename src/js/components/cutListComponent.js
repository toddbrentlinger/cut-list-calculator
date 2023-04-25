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
                createElement('th', {'scope': 'col'}, 'Quantity'),
                createElement('th', {'scope': 'col'}, 'Uncut Length'),
                createElement('th', {'scope': 'col'}, 'Unit Price'),
                createElement('th', {'scope': 'col'}, 'Sum Price')
            )
        ));

        // Material List - Table Body
        const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
        let totalPrice = 0;
        for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
            materialListTableBody.appendChild(createElement('tr', {}, 
                createElement('td', {}, uncutObj.quantity),
                createElement('td', {}, uncutLength),
                createElement('td', {}, uncutObj.unitPrice),
                createElement('td', {}, uncutObj.quantity * uncutObj.unitPrice)
            ));
            totalPrice += uncutObj.quantity * uncutObj.unitPrice;
        }

        // Material List - Table Body - Total Price
        materialListTable.appendChild(createElement('tr', {}, 
            createElement('td', {'colspan': '2'}),
            createElement('th', {'scope': 'row'}, 'Total Price'),
            createElement('td', {}, totalPrice.toFixed(2))
        ));

        // Cut Sequences
        element.appendChild(createElement('h3', {}, 'Cut Sequences:'));

        // Cut Sequences - Table
        const cutSequencesTable = element.appendChild(document.createElement('table'));

        // Cut Sequences - Table Head
        cutSequencesTable.appendChild(createElement('thead', {}, 
            createElement('tr', {}, 
                createElement('th', {'scope': 'col'}, 'Uncut Member'),
                createElement('th', {'scope': 'col'}, 'Cut Length'),
                createElement('th', {'scope': 'col'}, 'Remaining Length')
            )
        ));

        // Material List - Table Body
        const cutSequencesTableBody = cutSequencesTable.appendChild(document.createElement('tbody'));
        cutList.cutSequences.forEach((cutSequence) => {
            cutSequencesTableBody.append(...CutSequenceComponent(cutSequence).render());
        });
        
        return element;
    }

    return {
        render,
    };
}
