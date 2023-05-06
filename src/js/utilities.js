/**
 * 
 * @param {String} type - Element type
 * @param {Object} props - Element attribute names and their corresponding value 
 * @param  {...Node} children - Variable number of child nodes 
 */
export function createElement(type, props = {}, ...children) {
    const element = document.createElement(type);

    // Props
    for (const [key, value] of Object.entries(props)) {
        element.setAttribute(key, value);
    }

    // Children Nodes
    children.forEach(child => element.append(child));

    return element;
}

export function isInputValidLength(inputElement) {
    const tempValue = Number(inputElement.value);

    if (isNaN(tempValue)) {
        inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue <= 0) {
        inputElement.setCustomValidity('Must be greater than zero.');
    } else {
        inputElement.setCustomValidity('');
    }

    inputElement.reportValidity();
}

export function isInputValidPrice(inputElement) {
    const tempValue = Number(inputElement.value);

    if (isNaN(tempValue)) {
        inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue < 0) {
        inputElement.setCustomValidity('Must be greater than or equal to zero.');
    } else {
        inputElement.setCustomValidity('');
    }

    inputElement.reportValidity();
}
