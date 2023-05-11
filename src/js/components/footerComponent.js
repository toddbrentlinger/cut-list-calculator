import { createElement } from "../utilities.js";

export default function FooterComponent(copyrightYear) {
    const render = function() {
        const footer = document.createElement('footer');
        const currYear = new Date().getFullYear();

        // Paragraph element as child of footer
        let tempElement = footer.appendChild(document.createElement('p'));

        // Small element as child of paragraph
        tempElement = tempElement.appendChild(createElement('small', {},
            'Source Code © ',
            createElement('time', {id: 'copyright-year'}, currYear > copyrightYear ? `${copyrightYear}-${currYear}` : copyrightYear),
            ' Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.'
        ));

        return footer;
    };

    return {render,};
}
