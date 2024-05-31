import { debounce } from "./utilities";

/**
 * TODO:
 * Instead of table head element parameter in constructor, take array
 * of elements with .rotating-text-container class. Can then group 
 * together elements that are NOT all children of the same parent.
 */

/** Functionality for group of labels to rotate equally as their parent elements resize. */
class RotatingLabels {
    /**
     * @constructor
     * @param {HTMLElement} tableHeadElement
     */
    constructor(tableHeadElement) {
        /** 
         * Array of RotatingLabelInst with elements, as child of 
         * tableHeadElement, that are container elements for a child element 
         * that is rotated.
         */
        this.individualSingleHeaders = Array.from(
            tableHeadElement.querySelectorAll('.rotating-text-container')
        ).map((element) => new RotatingLabelInst(element));

        /**
         * Display error if NO valid elements to rotate. Return before adding 
         * event listeners.
         */
        if (this.individualSingleHeaders.length === 0) {
            console.error(
                'No children elements with class ".rotating-text-container" in element ', 
                tableHeadElement
            );
            return;
        }

        // Add event listener when window is resized to update rotation
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Call same function passed to resize event listener to initially set angle
        this.handleResize();
    }

    /**
     * Handler function for event listener when window is resized to update 
     * angles of each content element.
     */
    handleResize() {
        // Find max angle needed for one of the rotating labels
        let currAngle;
        const maxAngle = this.individualSingleHeaders.reduce((accum, curr) => {
            // Find current angle needed to fit curr rotating label
            currAngle = curr.getAngle();

            // Update accum to maximum angle so far
            return (currAngle > accum) ? currAngle : accum;
        }, 0);
        
        // Apply max angle to all rotating labels
        this.individualSingleHeaders.forEach((singleHeader) => {
            singleHeader.applyAngle(maxAngle);
        });
    }
}

/** Functionality for group of labels to rotate equally as their parent elements resize using ResizeObserver API. */
class RotatingLabelsResizeObserver {
    /**
     * @constructor
     * @param  {...HTMLElement} elements 
     */
    constructor(...elements) {
        /** 
         * Array of RotatingLabelInst with elements, as child of 
         * tableHeadElement, that are container elements for a child element 
         * that is rotated.
         */
        this.individualRotatingLabels = elements
            .map((element) => new RotatingLabelInst(element));
        
        /** ResizeObserver instance for all individual rotating labels. */
        this.resizeObserver = new ResizeObserver(
            debounce(this.resizeCallback, this, 10)
        );
        
        // Add each rotating label container to ResizeObserver instance
        for (const rotatingLabel of this.individualRotatingLabels) {
            this.resizeObserver.observe(rotatingLabel.container);
        }
    }

    /**
     * Handler function for ResizeObserver when elements are resized to update 
     * angles of each content element.
     */
    resizeCallback() {
        // Find max angle needed for one of the rotating labels
        let currAngle;
        const maxAngle = this.individualRotatingLabels.reduce((accum, curr) => {
            // Find current angle needed to fit curr rotating label
            currAngle = curr.getAngle();

            // Update accum to maximum angle so far
            return (currAngle > accum) ? currAngle : accum;
        }, 0);
        
        // Apply max angle to all rotating labels
        this.individualRotatingLabels.forEach((individualRotatingLabel) => {
            individualRotatingLabel.applyAngle(maxAngle);
        });
    }
}

/** Single instance of container element that is resized and content element that is rotated to fit in container. */
class RotatingLabelInst {
    /**
     * @constructor
     * @param {HTMLElement} element 
     */
    constructor(element) {
        /** Container element that is resized for content element to rotate. */
        this.container = element;
        
        /** Content element that is rotated depending on size of container element. */
        this.content = this.container.querySelector('.rotating-text-content');
    }

    /**
     * Returns max width of container before content element needs to be 
     * rotated to an angle other than zero degrees.
     * @returns {number}
     */
    get contentWidthMax() {
        /**
         * If content rotates about content height pixels from bottom left in 
         * x-direction, so 90 degree rotation allows the content to align with
         * the left side of the container, the width of the container that 
         * requires the content to rotate starts just below the sum of the 
         * content width and content height.
         */
        return this.content.offsetWidth + this.content.offsetHeight;
    }

    /**
     * Returns angle the content element needs to rotate to fit inside the container.
     * @returns {number}
     */
    getAngle() {
        // If container width is greater than max width, no rotation needed
        if (this.container.offsetWidth >= this.contentWidthMax) {
            return 0;
        }

        /**
         * Use inverse cosine to find angle needed for content to fit in 
         * container, clamped between 0 and pi/2 radians.
         */
        return RotatingLabelInst.clamp(
            Math.acos((this.container.offsetWidth - this.content.offsetHeight) / this.content.offsetWidth)
        );
    }

    /**
     * Rotates content element by a specific number of radians.
     * @param {number} angleRad 
     */
    applyAngle(angleRad) {
        // If angleRad is non-zero, translate/rotate content and adjust container height
        if (angleRad > 0) {
            // Find length of angled content (fraction of width + fraction of height)
            const angledContentWidth = this.content.offsetWidth * Math.cos(angleRad) 
                + this.content.offsetHeight * Math.sin(angleRad);
            
            // Find translation of bottom-left corner of content to make centered
            const translationX = ((this.container.offsetWidth - angledContentWidth) / 2) 
                + this.content.offsetHeight * Math.sin(angleRad);

            this.content.style.transform = `translateX(${translationX}px) rotateZ(-${angleRad}rad)`;
            this.container.style.height = `${this.content.offsetHeight * Math.cos(angleRad) + this.content.offsetWidth * Math.sin(angleRad)}px`;
        } 
        /**
         * Else angleRad is zero, ensure translate/rotate of content is 
         * centered horizontally.
         */
        else {
            this.content.style.transform = `translateX(${(this.container.offsetWidth - this.content.offsetWidth) / 2}px) rotateZ(0rad)`;
            this.container.style.height = `${this.content.offsetHeight}px`;
        }
    }

    /**
     * Returns value clamped between zero and PI/2 radians.
     * @param {number} val 
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    static clamp(val, min = 0, max = 0.5 * Math.PI) {
        return Math.min(Math.max(val, min), max);
    }
}

export default RotatingLabels;
export { RotatingLabelsResizeObserver, };
