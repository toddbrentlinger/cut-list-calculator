import { createElement } from "../utilities.js";
import CutSequenceComponent from "./cutSequenceComponent.js";

export default function CutListComponent(cutLists = []) {
    let element;

    const clear = function() {
        if (element === undefined) { return; }
        
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'id': 'cut-list'});
        }

        if (!cutLists.length) {
            return element;
        }
        
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
        const materialListsArr = cutLists.map((cutList) => cutList.getMaterialList());
        //const materialList = cutList.getMaterialList();
        const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
        let totalPrice = 0;
        let currPrice;

        materialListsArr.forEach((materialList) => {
            for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
                currPrice = uncutObj.quantity * uncutObj.unitPrice;
                materialListTableBody.appendChild(createElement('tr', {}, 
                    createElement('td', {}, uncutObj.quantity),
                    createElement('td', {}, uncutLength),
                    createElement('td', {}, uncutObj.unitPrice),
                    createElement('td', {}, currPrice.toFixed(2))
                ));
                totalPrice += currPrice;
            }
        });

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
        cutLists.forEach((cutList) => {
            cutList.cutSequences.forEach((cutSequence) => {
                cutSequencesTableBody.append(...CutSequenceComponent(cutSequence).render());
            });
        });
        
        return element;
    }

    return {
        render,
        get cutLists() { return cutLists; },
        set cutLists(newCutLists) { 
            cutLists = newCutLists;
            clear();
            render();
            element.scrollIntoView();
        },
    };
}
