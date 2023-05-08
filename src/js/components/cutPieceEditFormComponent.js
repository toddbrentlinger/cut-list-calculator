import { createElement, isInputValidLength } from "../utilities.js";

export default function CutPieceEditFormComponent(cutPiece, handleEditConfirm, handleEditCancel) {
    let formElement;

    const render = function() {
        formElement = createElement('form', {
            'action': '',
            'method': 'get',
            'name': 'cut-piece-edit',
            'id': 'cut-piece-edit-form',
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
                createElement('input', {'type': 'text', 'name': 'thickness', 'id': 'cut-thickness', 'size': '1', 'required': 'true', 'value': cutPiece.thickness}),
                createElement('span', {'class': 'error', 'aria-live': 'polite'})
            )
        );

        // Form - Form Inputs - Width
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-width'}, 'Width:'),
                createElement('input', {'type': 'text', 'name': 'width', 'id': 'cut-width', 'size': '1', 'required': 'true', 'value': cutPiece.width})
            )
        );

        // Form - Form Inputs - Length
        tempInputElement = createElement('input', {'type': 'text', 'name': 'length', 'id': 'cut-length', 'size': '1', 'required': 'true', 'value': cutPiece.length});
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
                createElement('input', {'type': 'number', 'name': 'quantity', 'id': 'cut-quantity', 'min': '1', 'required': 'true', 'value': cutPiece.quantity})
            )
        );

        // Form - Form Inputs - Kerf
        tempInputElement = createElement('input', {'type': 'text', 'name': 'kerf', 'id': 'cut-kerf', 'size': '1', 'required': 'true', 'value': cutPiece.kerf});
        // Add input listener that adds custom validity if input value is NOT valid
        tempInputElement.addEventListener('input', (e) => isInputValidLength(e.target));
        formInputsElement.appendChild(
            createElement('div', {'class': 'input-container'}, 
                createElement('label', {'for': 'cut-kerf'}, 'Kerf:'),
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