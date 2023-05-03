import { createElement } from "../utilities.js";

export default function UncutPieceCreateFormComponent(handleFormSubmit) {
    let formElement;

    const isInputValidLength = function(inputElement) {
        const tempValue = Number(inputElement.value);

        if (isNaN(tempValue)) {
            inputElement.setCustomValidity('Must be a number.');
        } else if (tempValue <= 0) {
            inputElement.setCustomValidity('Must be greater than zero.');
        } else {
            inputElement.setCustomValidity('');
        }

        inputElement.reportValidity();
    };

    const isInputValidPrice = function(inputElement) {
        const tempValue = Number(inputElement.value);

        if (isNaN(tempValue)) {
            inputElement.setCustomValidity('Must be a number.');
        } else if (tempValue < 0) {
            inputElement.setCustomValidity('Must be greater than or equal to zero.');
        } else {
            inputElement.setCustomValidity('');
        }

        inputElement.reportValidity();
    };

    const render = function() {
        formElement = createElement('form', {
            'action': '',
            'method': 'get',
            'name': 'uncut-piece-create',
            'id': 'uncut-piece-create-form',
            'class': 'piece-create-form',
        });
        let tempInputElement;

        // Form - Form Inputs
        const formInputsElement = formElement.appendChild(
            createElement('div', {'class': 'form-inputs'})
        );

        // Form - Form Inputs - Thickness
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-thickness'}, 'Thickness:'),
                createElement('input', {'type': 'text', 'name': 'thickness', 'id': 'uncut-thickness', 'size': '1', 'required': 'true'})
            )
        );

        // Form - Form Inputs - Width
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-width'}, 'Width:'),
                createElement('input', {'type': 'text', 'name': 'width', 'id': 'uncut-width', 'size': '1', 'required': 'true'})
            )
        );

        // Form - Form Inputs - Length
        tempInputElement = createElement('input', {'type': 'text', 'name': 'length', 'id': 'uncut-length', 'size': '1', 'required': 'true'});
        tempInputElement.addEventListener('input', (e) => isInputValidLength(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-length'}, 'Length:'),
                tempInputElement
            )
        );

        // Form - Form Inputs - Price
        tempInputElement = createElement('input', {'type': 'text', 'name': 'price', 'id': 'uncut-price', 'size': '1', 'required': 'true'});
        tempInputElement.addEventListener('input', (e) => isInputValidPrice(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-price'}, 'Price:'),
                tempInputElement
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
        ['price', 'length'].forEach((inputName, index, arr) => {
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
