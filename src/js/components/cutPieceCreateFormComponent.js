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
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-length'}, 'Length:'),
                createElement('input', {'type': 'text', 'name': 'length', 'id': 'cut-length', 'size': '1', 'required': 'true'})
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
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-kerf'}, 'Kerf:'),
                createElement('input', {'type': 'text', 'name': 'kerf', 'id': 'cut-kerf', 'value': '0.125', 'size': '1', 'required': 'true'})
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
            debugger;
            if (!isValid()) {
                e.preventDefault();
                return; 
            }

            if (handleFormSubmit !== undefined) {
                handleFormSubmit(e);
            }

            updateForm();
        });

        return formElement;
    }

    const isValid = function() {
        const inputElements = {
            thickness: document.getElementById('cut-thickness'),
            width: document.getElementById('cut-width'),
            length: document.getElementById('cut-length'),
            quantity: document.getElementById('cut-quantity'),
            kerf: document.getElementById('cut-kerf'),
        };

        // Initialize each custom validity to blank string
        for (const inputElement of Object.values(inputElements)) {
            inputElement.setCustomValidity('');
        }
        
        /**
         * Thickness x Width is only used to identify pieces and not used in 
         * math operations so it does not need to be a number.
         * Perhaps check that thickness is smaller than width?
         */

        // Thickness
        // Width

        // Length
        // TODO: Convert architectural units (ex. 75-1/8 => 75.125). Could event use feet (ex. 3'8-3/8" => 44.375)
        // Must be a number
        let tempValue = Number(inputElements.length.value);
        if (isNaN(tempValue)) {
            inputElements.length.setCustomValidity('Must be a number.');
            return false;
        }
        // Must be greater than zero
        if (tempValue <= 0) {
            inputElements.length.setCustomValidity('Must be greater than zero.');
            return false;
        }

        // Quantity
        // Built-in validation good enough

        // Kerf
        // Must be a number
        tempValue = Number(inputElements.kerf.value);
        if (isNaN(tempValue)) {
            inputElements.kerf.setCustomValidity('Must be a number.');
            return false;
        }
        // Must be greater than zero
        if (tempValue <= 0) {
            inputElements.kerf.setCustomValidity('Must be greater than zero.');
            return false;
        }
        
        // If reach here, all form inputs are valid
        return true;
    };

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
