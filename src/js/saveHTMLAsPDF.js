import { html2canvas } from "html2canvas";
import { jsPDF } from "jspdf";
import { createElement } from "./utilities";

export function init1() {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}

export function init3() {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'letter',
    });

    const btn = document.body.querySelector('main')
        .appendChild(createElement('button', {}, 'Save as PDF'));

    const margin = 0;
    const pageWidth = 280;

    btn.addEventListener('click', () => {
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
                //scale: .8,
                // width: 100, // width of canvas
                // height: 100, // height of canvas
                // x: 50, // crop canvas-x coord
                // y: 50, // crop canvas-y coord
                // windowWidth: 300,
                // windowHeight: 300, 
            },
        });
    });
}

export function initDemotFromHTML() {
    const btn = document.body.querySelector('main')
        .appendChild(createElement('button', {}, 'Save as PDF'));

    btn.addEventListener('click', demoFromHTML);
}

export function demoFromHTML() {
    html2canvas(document.getElementById('cut-list'), {
        onrendered: function (canvasObj) {
            var pdf = new jsPDF('P', 'pt', 'a4'),
                pdfConf = {
                    pagesplit: false,
                    backgroundColor: '#FFF'
                };
            document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
            pdf.addHTML(canvasObj, 0, 0, pdfConf, function () {
                document.body.removeChild(canvasObj);
                //pdf.addPage();
                pdf.save('Test.pdf');
            });
        }
    });
}
