import { createElement } from "../utilities.js";

export default function ConfirmModalComponent(handleAccept, questionText = 'Are you sure?', acceptText = 'Yes', rejectText = 'No') {
    let element;
    
    const handleAcceptClick = function(e) {
        console.log('Modal Accept Click');
        element.remove();
        handleAccept(e);
    };

    const handleRejectClick = function(e) {
        console.log('Modal Reject Click');
        element.remove();
    };
    
    const render = function() {
        if (element === undefined) {
            element = createElement('div', {'class': 'modal'});
            element.addEventListener('click', handleRejectClick);
        } else {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        const acceptBtn = createElement('button', {}, acceptText);
        const rejectBtn = createElement('button', {}, rejectText);

        // Add event listeners
        acceptBtn.addEventListener('click', handleAcceptClick);
        rejectBtn.addEventListener('click', handleRejectClick);

        // Modal Content
        const modalContent = element.appendChild(createElement('div', {'class': 'modal-content'}, 
            createElement('p', {}, questionText),
            createElement('div', {'class': 'modal-content-btn-container'},
                acceptBtn,
                rejectBtn
            )
        ));

        // Prevents click listener on modal container element from activating that closes modal
        // whenever user clicks inside modal content element instead.
        modalContent.addEventListener('click', (e) => e.stopPropagation());

        return element;
    };

    return {
        render,
    };
}
