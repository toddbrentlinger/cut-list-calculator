import { createElement, isInputValidLength } from "../utilities.js";

export default function CutPieceCreateFormComponent(handleFormSubmit) {
    let formElement;

    const render = function() {
        formElement = createElement('form', {
            'action': '',
            'method': 'get',
            'name': 'cut-piece-create',
            'id': 'cut-piece-create-form',
            'class': 'piece-form',
        });
        let tempInputElement;

        // Form - Form Inputs
        const formInputsElement = formElement.appendChild(
            createElement('div', {'class': 'piece-form-inputs'})
        );

        // Form - Form Inputs - Thickness
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-thickness'}, 'Thickness:'),
                createElement('input', {'type': 'text', 'name': 'thickness', 'id': 'cut-thickness', 'size': '1', 'required': 'true'}),
                createElement('span', {'class': 'error', 'aria-live': 'polite'})
            )
        );

        // Form - Form Inputs - Width
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-width'}, 'Width:'),
                createElement('input', {'type': 'text', 'name': 'width', 'id': 'cut-width', 'size': '1', 'required': 'true'})
            )
        );

        // Form - Form Inputs - Length
        tempInputElement = createElement('input', {'type': 'text', 'name': 'length', 'id': 'cut-length', 'size': '1', 'required': 'true'});
        // Add input listener that adds custom validity if input value is NOT valid
        tempInputElement.addEventListener('input', (e) => isInputValidLength(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-length'}, 'Length:'),
                tempInputElement
            )
        );

        // Form - Form Inputs - Quantity
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-quantity'}, 'Quantity:'),
                createElement('input', {'type': 'number', 'name': 'quantity', 'id': 'cut-quantity', 'value': '1', 'min': '1', 'required': 'true'})
            )
        );

        // Form - Form Inputs - Kerf
        tempInputElement = createElement('input', {'type': 'text', 'name': 'kerf', 'id': 'cut-kerf', 'value': '0.125', 'size': '1', 'required': 'true'});
        // Add input listener that adds custom validity if input value is NOT valid
        tempInputElement.addEventListener('input', (e) => isInputValidLength(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-kerf'}, 'Kerf:'),
                tempInputElement
            )
        );

        // Form - Form Submit Container
        formElement.appendChild(
            createElement('div', {'class': 'btn-large-container'}, 
                createElement('input', {'type': 'submit', 'value': 'Add Cut Piece'})
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
