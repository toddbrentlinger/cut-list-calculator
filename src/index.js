import './styles.scss';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Cut List Calculator';
    return element;
}

document.body.appendChild(component());
