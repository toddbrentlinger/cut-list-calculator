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
        unit: 'pt',
        format: 'letter',
    });

    const btn = document.body.querySelector('main')
        .appendChild(createElement('button', {}, 'Save as PDF'));

    btn.addEventListener('click', () => {
        doc.html(document.getElementById('cut-list'), {
            callback: function(doc) {
                doc.save();
            },
            filename: 'cut-list.pdf',
            margin: [72, 72, 72, 72], // [72, 72, 72, 72]
            autoPaging: 'text',
            html2canvas: {
                allowTaint: true,
                dpi: 300,
                letterRendering: true,
                logging: false,
                scale: .8
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
