import { createElement } from "../utilities.js";
import CutSequenceComponent from "./cutSequenceComponent.js";
import jsPDF from "jspdf";

export default function CutListComponent(cutLists = []) {
    let element;

    const clear = function() {
        if (element === undefined) { return; }
        
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    const saveCutListAsPDF = function() {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'letter',
        });

        const margin = 0;
        const pageWidth = 280;

        doc.html(document.getElementById('cut-list'), {
            callback: function(doc) {
                //debugger;
                doc.save('cut-list.pdf');
            },
            margin: margin,
            //autoPaging: 'text',
            width: pageWidth - 2 *margin, // target width
            windowWidth: pageWidth - 2 * margin, // window width
            html2canvas: {
                onclone: (doc) => {
                    //debugger;
                },
                //allowTaint: true,
                logging: false,
                scale: .5,
                // width: 100, // width of canvas
                // height: 100, // height of canvas
                // x: 50, // crop canvas-x coord
                // y: 50, // crop canvas-y coord
                // windowWidth: 300,
                // windowHeight: 300, 
            },
        });
    };

    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'id': 'cut-list'});
        }

        if (!cutLists.length) {
            element.classList.add('hide');
            return element;
        }

        element.classList.remove('hide');
        
        // Material List - Header
        element.appendChild(createElement('h3', {}, 'Material List:'));
        
        // Material List - Table
        const materialListTable = element.appendChild(document.createElement('table'));

        // Material List - Table Head
        materialListTable.appendChild(createElement('thead', {}, 
            createElement('tr', {}, 
                createElement('th', {'scope': 'col'}, 'Quantity'),
                createElement('th', {'scope': 'col'}, 'Dimension'),
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
                    createElement('td', {}, uncutObj.crossSection),
                    createElement('td', {}, uncutLength),
                    createElement('td', {}, uncutObj.unitPrice),
                    createElement('td', {}, currPrice.toFixed(2))
                ));
                totalPrice += currPrice;
            }
        });

        // Material List - Table Body - Total Price
        materialListTable.appendChild(createElement('tr', {}, 
            createElement('td', {'colspan': '3'}),
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

        // Save as PDF button
        const btn = element.appendChild(
            createElement('div', {'id': 'save-as-pdf-btn-container'})
        ).appendChild(
            createElement('button', {}, 'Save as PDF')
        );

        btn.addEventListener('click', saveCutListAsPDF);
        
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
