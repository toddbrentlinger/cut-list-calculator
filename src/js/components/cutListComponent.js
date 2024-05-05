import { createElement, convertNumToImperialWithFraction } from "../utilities.js";
import CutSequenceComponent from "./cutSequenceComponent.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CutListComponent(cutLists = []) {
    let element;

    const clear = function() {
        if (element === undefined) { return; }
        
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    const saveCutListAsPDF = function() {
        const doc = new jsPDF();
        const margin = 15;
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        doc.text(
            'Material List', 
            pageWidth / 2, 
            margin, 
            { align: 'center', }
        );
        
        doc.autoTable({ 
            html: '#material-list-table',
            startY: margin + 5,
            margin: { horizontal: margin, },
            theme: 'grid',
            headStyles: { fillColor: [ 123, 82, 37 ], },
        });
        
        doc.text(
            'Cut Sequences', 
            pageWidth / 2, 
            doc.autoTable.previous.finalY + 10,
            { align: 'center', }
        );
        
        doc.autoTable({ 
            html: '#cut-sequences-table',
            startY: doc.autoTable.previous.finalY + 15,
            margin: { horizontal: margin, },
            theme: 'grid',
            headStyles: { fillColor: [ 123, 82, 37 ], },
        });

        doc.save(`cut-list-${(new Date()).toISOString()}.pdf`);
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
        materialListTable.id = 'material-list-table';

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
        const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
        let totalPrice = 0;
        let currPrice;

        materialListsArr.forEach((materialList) => {
            for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
                currPrice = uncutObj.quantity * uncutObj.unitPrice;
                materialListTableBody.appendChild(createElement('tr', {}, 
                    createElement('td', {}, uncutObj.quantity),
                    createElement('td', {}, uncutObj.crossSection),
                    createElement('td', {}, convertNumToImperialWithFraction(uncutLength)),
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
        cutSequencesTable.id = 'cut-sequences-table';

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
            createElement('div', {'id': 'save-as-pdf-btn-container', 'class': 'btn-large-container'})
        ).appendChild(
            createElement('button', {}, 'Save as PDF')
        );

        btn.addEventListener('click', saveCutListAsPDF);
        
        return element;
    }

    const setCutLists = function(newCutLists) {
        cutLists = newCutLists;
        clear();
        render();
        
        element.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return {
        render,
        get cutLists() { return cutLists; },
        set cutLists(newCutLists) { 
            setCutLists(newCutLists);
        },
    };
}
