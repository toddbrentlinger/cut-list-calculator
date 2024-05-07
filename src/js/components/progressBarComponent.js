import { createElement } from "../utilities";

/**
 * @typedef {Object} ProgressBarComponent
 * @property {Function} hide - Hides container HTMLElement from DOM
 * @property {Function} unhide - Displays container HTMLElement in DOM
 * @property {Function} update - Updates progress message on value HTMLElement
 * @property {Function} render - Returns HTMLElement of progress bar component
 */

/**
 * Factory function to create an instance of a progress bar component.
 * @returns {ProgressBarComponent}
 */
export default function ProgressBarComponent() {
    // Reference to container element of entire progress bar component
    let containerElement;

    // Reference to value element that displays current progress message
    let valueElement;
    
    /**
     * Hides container HTMLElement from DOM. 
     */
    const hide = function() {
        containerElement.classList.add('hide');
    };

    /**
     * Displays container HTMLElement in DOM.
     */
    const unhide = function() {
        containerElement.classList.remove('hide');
        containerElement.scrollIntoView({
            behavior: 'smooth',
        });
    };

    /**
     * Updates progress message on value HTMLElement.
     * @param {string} str 
     */
    const update = function(str = '') {
        valueElement.textContent = str;
    };

    /**
     * Returns HTMLElement of progress bar component.
     * @returns {HTMLElement}
     */
    const render = function() {
        // Create container element
        containerElement = createElement(
            'section', 
            { 'class': 'progress-container hide', }
        );

        // Create value element as child of container to hold progress message
        valueElement = containerElement.appendChild(
            createElement('div', { 'class': 'progress-value', })
        );

        // Add animated spinning image to indicate progress is currently running
        containerElement.appendChild(
            createElement('div', {'class': 'progress-icon-container'}, 
                createElement('span', {'class': 'fa-solid fa-spinner'})
            )
        );

        return containerElement;
    };

    return { hide, unhide, update, render, };
}
