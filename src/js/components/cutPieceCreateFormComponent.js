import { createElement } from "../utilities.js";

export default function CutPieceCreateFormComponent(handleFormSubmit) {
    let formElement;

    const render = function() {
        formElement = createElement('form', {
            'action': '',
            'method': 'get',
            'name': 'cut-piece-create',
            'id': 'cut-piece-create-form',
            'class': 'piece-create-form',
        });

        // Form - Form Inputs
        const formInputsElement = formElement.appendChild(
            createElement('div', {'class': 'form-inputs'})
        );

        // Form - Form Inputs - Thickness
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-thickness'}, 'Thickness:'),
                createElement('input', {'type': 'text', 'name': 'thickness', 'id': 'cut-thickness', 'size': '1'})
            )
        );

        // Form - Form Inputs - Width
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-width'}, 'Width:'),
                createElement('input', {'type': 'text', 'name': 'width', 'id': 'cut-width', 'size': '1'})
            )
        );

        // Form - Form Inputs - Length
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-length'}, 'Length:'),
                createElement('input', {'type': 'text', 'name': 'length', 'id': 'cut-length', 'size': '1'})
            )
        );

        // Form - Form Inputs - Quantity
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-quantity'}, 'Quantity:'),
                createElement('input', {'type': 'number', 'name': 'quantity', 'id': 'cut-quantity', 'value': '1'})
            )
        );

        // Form - Form Inputs - Kerf
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-kerf'}, 'Kerf:'),
                createElement('input', {'type': 'text', 'name': 'kerf', 'id': 'cut-kerf', 'value': '0.125', 'size': '1'})
            )
        );

        // Form - Form Submit Container
        formElement.appendChild(
            createElement('div', {'class': 'submit-container'}, 
                createElement('input', {'type': 'submit', 'value': 'Add'})
            )
        );

        // Add submit event listener
        formElement.addEventListener('submit', (e) => {
            if (handleFormSubmit !== undefined) {
                handleFormSubmit(e);
            }

            updateForm();
        });

        return formElement;
    }

    const updateForm = function() {
        let inputElement;

        // Reset input fields for cut length and quantity, leaving other inputs with user entered data.
        // Focus cursor on last input which should be cut length field
        ['quantity', 'length'].forEach((inputName, index, arr) => {
            inputElement = formElement.elements.namedItem(inputName);
            if (inputElement) {
                inputElement.value = inputElement.defaultValue;

                if (index == (arr.length - 1)) {
                    inputElement.focus();
                }
            }
        });
    }

    return {
        render,
    };
}
