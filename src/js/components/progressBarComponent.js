import { createElement } from "../utilities";

export default function ProgressBarComponent() {
    let containerElement;
    let valueElement;

    const hide = function() {
        containerElement.classList.add('hide');
    };

    const unhide = function() {
        containerElement.classList.remove('hide');
        containerElement.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const update = function(num) {
        valueElement.textContent = `Progress: ${num}%`;
    };

    const render = function() {
        containerElement = createElement('section', {'class': 'progress-container hide'});

        valueElement = containerElement.appendChild(
            createElement('div', {'class': 'progress-value'})
        );
        update(0);

        containerElement.appendChild(
            createElement('div', {'class': 'progress-icon-container'}, 
                createElement('span', {'class': 'fa-solid fa-spinner'})
            )
        );

        return containerElement;
    };

    return {hide, unhide, update, render,}
}
