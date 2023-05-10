import { createElement, isInputValidLength, isInputValidPrice } from "../utilities.js";

export default function UncutPieceEditFormComponent(uncutPiece, handleEditConfirm, handleEditCancel) {
    let formElement;

    const render = function() {
        formElement = createElement('form', {
            'action': '',
            'method': 'get',
            'name': 'uncut-piece-edit',
            'id': 'uncut-piece-edit-form',
            'class': 'piece-form',
        });
        let tempInputElement;

        // Form - Form Inputs
        const formInputsElement = formElement.appendChild(
            createElement('div', {'class': 'piece-form-inputs'})
        );

        // Form - Form Inputs - Thickness
        // Form - Form Inputs - Thickness
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-thickness'}, 'Thickness:'),
                createElement('input', {'type': 'text', 'name': 'thickness', 'id': 'uncut-thickness', 'size': '1', 'required': 'true', 'value': uncutPiece.thickness})
            )
        );

        // Form - Form Inputs - Width
        // Form - Form Inputs - Width
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-width'}, 'Width:'),
                createElement('input', {'type': 'text', 'name': 'width', 'id': 'uncut-width', 'size': '1', 'required': 'true', 'value': uncutPiece.width})
            )
        );

        // Form - Form Inputs - Length
        tempInputElement = createElement('input', {'type': 'text', 'name': 'length', 'id': 'uncut-length', 'size': '1', 'required': 'true', 'value': uncutPiece.length});
        // Add input listener that adds custom validity if input value is NOT valid
        tempInputElement.addEventListener('input', (e) => isInputValidLength(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-length'}, 'Length:'),
                tempInputElement
            )
        );

        // Form - Form Inputs - Price
        tempInputElement = createElement('input', {'type': 'text', 'name': 'price', 'id': 'uncut-price', 'size': '1', 'required': 'true', 'value': uncutPiece.price});
        // Add input listener that adds custom validity if input value is NOT valid
        tempInputElement.addEventListener('input', (e) => isInputValidPrice(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'uncut-price'}, 'Price:'),
                tempInputElement
            )
        );

        // Form - Button Container
        const formBtnContainer = formElement.appendChild(
            createElement('div', {'class': 'piece-form-btn-container'})
        );

        // Form - Submit/Edit Confirm
        formBtnContainer.appendChild(
            createElement('input', {'type': 'submit', 'value': 'Update'})
        );

        // Add submit event listener
        formElement.addEventListener('submit', (e) => {
            if (handleEditConfirm !== undefined) {
                handleEditConfirm(e);
            }
        });

        // Form - Cancel/Exit
        formBtnContainer.appendChild(
            createElement('button', {'type': 'button'}, 'Cancel')
        ).addEventListener('click', (e) => {
            if (handleEditCancel !== undefined) {
                handleEditCancel(e);
            }
        });

        return formElement;
    };

    return {
        render,
    };
}
