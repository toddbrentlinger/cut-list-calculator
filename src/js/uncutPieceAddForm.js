const uncutPieceAddForm = (() => {
    let formElement;

    function init(handleUncutPieceAddFormSubmit) {
        formElement = document.getElementById('uncut-piece-create-form');

        if (!formElement) {
            // TODO: Deal with formElement not being found. Create it dynamically.
        }

        formElement.addEventListener('submit', (e) => {
            handleUncutPieceAddFormSubmit(e);

            updateForm();
        });
    }

    function updateForm() {
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

    function convertLengthUnitToBaseUnit(lengthUnitText) {
        // Check feet

        // Check inches
    }

    function render() {
        const form = document.createElement('form');

        return form;
    }

    return {
        init,
        get formElement() { return formElement },
    };
})();

export default uncutPieceAddForm;
