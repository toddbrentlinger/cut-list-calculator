import { createElement } from "../utilities.js";

export default function CutListComponent(cutList) {
    const render = function() {
        const materialList = cutList.displayMaterialList();
        const element = createElement('div', {'class': 'cut-list'});

        for (const [key, value] of Object.entries(materialList)) {
            element.appendChild(
                createElement('p', {}, `${value} X ${key}" long pieces`)
            );
        }
        
        return element;
    }

    return {
        render,
    };
}
