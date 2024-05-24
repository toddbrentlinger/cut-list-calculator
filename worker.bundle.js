/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/countArray.js":
/*!******************************!*\
  !*** ./src/js/countArray.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Keeps track of multiple counter values at once. */
class CountArray {
  // Private fields

  // Array to hold all counter values
  #arr;

  // Sum of all current counter values
  #total;

  /**
   * @constructor
   * @param {number[]} initArr 
   */
  constructor() {
    let initArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.set(initArr);
  }

  // Getters/Setters

  /** Getter that returns total sum of all current counter values. */
  get total() {
    return this.#total;
  }

  // Public Methods

  /**
   * Pushes more counter values to end of array of counter values.
   * @param  {...number} items 
   */
  push() {
    for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }
    this.#arr.push(items);
    this.#updateTotal();
  }

  /**
   * Sets new array of counter values.
   * @param {number[]} newArr 
   */
  set(newArr) {
    this.#arr = newArr;
    this.#updateTotal();
  }

  /**
   * Returns counter value at specific index of array of counter values.
   * @param {number} index 
   * @returns 
   */
  valueAtIndex(index) {
    return this.#arr[index];
  }

  /**
   * Decrement counter value at specific index of array of counter values.
   * @param {number} index 
   */
  decrementValueAtIndex(index) {
    this.#arr[index]--;
    this.#total--;
  }

  /**
   * Increment counter value at specific index of array of counter values.
   * @param {number} index 
   */
  incrementValueAtIndex(index) {
    this.#arr[index]++;
    this.#total++;
  }

  // Private Methods

  /** Sets private field total to equal sum of all counter values in array. */
  #updateTotal() {
    this.#total = this.#arr.reduce((accum, curr) => accum + curr, 0);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CountArray);

/***/ }),

/***/ "./src/js/cutList.js":
/*!***************************!*\
  !*** ./src/js/cutList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cutSequence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cutSequence */ "./src/js/cutSequence.js");


/** Stores CutSequences of a list of CutPieces and UncutPieces. */
class CutList {
  /**
   * @constructor
   * @param {CutSequence[]} cutSequences 
   */
  constructor() {
    let cutSequences = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    /** Array of CutSequences for the CutList. */
    this.cutSequences = cutSequences.filter(cutSequence => cutSequence instanceof _cutSequence__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }

  /** Clears all CutSequences from CutList, making the CutList empty. */
  clear() {
    this.cutSequences = [];
  }

  /** Adds new CutSequence to the CutList. */
  push(cutSequence) {
    if (!(cutSequence instanceof _cutSequence__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      return;
    }
    this.cutSequences.push(cutSequence);
  }

  /**
   * Returns price of all UncutPieces in the CutList.
   * @returns {number}
   */
  getPrice() {
    return this.cutSequences.reduce((accum, curr) => accum + curr.uncutPiece.price, 0);
  }

  /**
   * Returns new CutList with deep copy of array of CutSequences.
   * @returns {CutList}
   */
  deepCopy() {
    // Create new CutList instance
    let cutList = new CutList();

    /**
     * Use spread syntax to deep copy array of CutSequences from this 
     * CutList to the new CutList.
     */
    cutList.cutSequences = [...this.cutSequences];

    // Return new CutList instance that has been duplicated
    return cutList;
  }

  /**
   * Returns material list of the CutList with UncutPieces needed.
   * @returns {Object} materialListObj
   * @returns {Object} materialListObj[number] - Keys of object are UncutPiece length and values are another object with info about UncutPiece
   * @returns {string} materialListObj[number].crossSection
   * @returns {number} materialListObj[number].unitPrice
   * @returns {number} materialListObj[number].quantity
   */
  getMaterialList() {
    const materialListObj = {};

    // Add UncutPieces from each CutSequence in the CutList
    this.cutSequences.forEach(cutSequence => {
      // If UncutPiece length already in material list object, increment quanitity
      if (cutSequence.uncutPiece.length in materialListObj) {
        materialListObj[cutSequence.uncutPiece.length].quantity++;
      }
      // Else add UncutPiece to material list object with quantity of 1 
      else {
        materialListObj[cutSequence.uncutPiece.length] = {
          crossSection: `${cutSequence.uncutPiece.thickness}x${cutSequence.uncutPiece.width}`,
          unitPrice: cutSequence.uncutPiece.price,
          quantity: 1
        };
      }
    });
    return materialListObj;
  }

  /**
   * Returns JSON object of the CutList.
   * @returns {Object} obj - JSON object of the CutList
   * @returns {Object[]} obj.cutSequences - Array of JSON objects of each CutSequence in the CutList
   */
  toJson() {
    return {
      cutSequences: this.cutSequences.map(cutSequence => cutSequence.toJson())
    };
  }

  /**
   * Returns CutList given JSON object of a CutList.
   * @param {Object} jsonObj 
   * @returns {CutList}
   */
  static createFromJson(jsonObj) {
    const cutSequences = jsonObj.cutSequences.map(cutSequenceJson => _cutSequence__WEBPACK_IMPORTED_MODULE_0__["default"].createFromJson(cutSequenceJson));
    return new CutList(cutSequences);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutList);

/***/ }),

/***/ "./src/js/cutListCalculator.js":
/*!*************************************!*\
  !*** ./src/js/cutListCalculator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cutList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cutList.js */ "./src/js/cutList.js");
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _cutSequence_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cutSequence.js */ "./src/js/cutSequence.js");
/* harmony import */ var _cutListCalculatorProgress_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cutListCalculatorProgress.js */ "./src/js/cutListCalculatorProgress.js");
/* harmony import */ var _nestedLoopCounter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nestedLoopCounter.js */ "./src/js/nestedLoopCounter.js");
/* harmony import */ var _countArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./countArray.js */ "./src/js/countArray.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities.js */ "./src/js/utilities.js");









/** Module to calculate cheapest cut list. */
const cutListCalculator = (() => {
  /**
   * 
   * @param {number[]} currNumAvailableUncutLengths 
   * @param {number[]} maxNumAvailableUncutLengths 
   * @param {number} index 
   * @returns {index|null} Index of available UncutPiece length that was decremented OR null if cannot decrement
   */
  function decrement(currNumAvailableUncutLengths, maxNumAvailableUncutLengths) {
    let index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // If reached end, cannot decrement any more. Return null.
    if (index >= currNumAvailableUncutLengths.length) {
      return null;
    }

    // Decrement current count at index
    currNumAvailableUncutLengths[index]--;

    /**
     * If current count at index (after decrementing) is less than zero, 
     * need to decrement next index.
     */
    if (currNumAvailableUncutLengths[index] < 0) {
      // Set count at index to zero
      currNumAvailableUncutLengths[index] = 0;

      // Recursively decrement count at next index
      return decrement(currNumAvailableUncutLengths, maxNumAvailableUncutLengths, ++index);
    }
    return index;
  }

  /**
   * Finds cheapest cut lists with CutPieces and UncutPieces of different dimensions
   * @param {CutPiece[]} cutPieces 
   * @param {UncutPiece[]} uncutPieces
   * @param {function} progressCallback
   * @returns {CutList[]}
   */
  function getCutLists(cutPieces, uncutPieces) {
    let progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
    /** Object to sort CutPieces/UncutPieces by the same cross-section dimensions. */
    const pieces = {};

    /** Array of CutLists calculated for each cross-section. */
    const cutLists = [];

    /** Time that cut list calculation began. */
    let startTime = Date.now();

    // Sort matching dimensions of CutPieces and UncutPieces together

    /**
     * Example of pieces object:
     * {
     *   2: {
     *     4: {
     *       cut: [],   -> 2x4 cutPieces
     *       uncut: [], -> 2x4 uncutPieces
     *     },
     *   },
     *   4: {
     *     4: {
     *       cut: [],   -> 4x4 cutPieces
     *       uncut: [], -> 4x4 uncutPieces
     *     },
     *   },
     * }
     */

    // CutPieces sort
    cutPieces.forEach(cutPiece => {
      /**
       * Getter cutWithKerf is NOT included if cutPiece passed to worker.
       * Set prototype to CutPiece if NOT included.
       */
      if (cutPiece.cutWithKerf === undefined) {
        Object.setPrototypeOf(cutPiece, _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype);
      }

      // If new thickness in pieces object, add key equal to thickness
      if (!(cutPiece.thickness in pieces)) {
        pieces[cutPiece.thickness] = {};
      }

      /**
       * If new width with thickness in pieces object, add key equal to 
       * width inside thickness key object.
       * Then add object to hold all matching CutPieces and Uncut Pieces 
       * as the value.
       */
      if (!(cutPiece.width in pieces[cutPiece.thickness])) {
        pieces[cutPiece.thickness][cutPiece.width] = {
          cut: [],
          uncut: []
        };
      }

      // Push current CutPiece to matching thickness and width in pieces object
      pieces[cutPiece.thickness][cutPiece.width].cut.push(cutPiece);
    });

    // UncutPieces sort
    uncutPieces.forEach(uncutPiece => {
      // If new thickness in pieces object, add key equal to thickness
      if (!(uncutPiece.thickness in pieces)) {
        pieces[uncutPiece.thickness] = {};
      }

      /**
       * If new width with thickness in pieces object, add key equal to 
       * width inside thickness key object.
       * Then add object to hold all matching CutPieces and Uncut Pieces 
       * as the value.
       */
      if (!(uncutPiece.width in pieces[uncutPiece.thickness])) {
        pieces[uncutPiece.thickness][uncutPiece.width] = {
          cut: [],
          uncut: []
        };
      }

      // Push current UncutPiece to matching thickness and width in pieces object
      pieces[uncutPiece.thickness][uncutPiece.width].uncut.push(uncutPiece);
    });

    /**
     * TODO: Check if any thickness-width has empty CutPieces or UncutPieces array.
     * Could return object with success boolean and error message if success is false.
     * Need to return same success boolean and message keys in object if cutlists are
     * returned.
     * Could instead check inside getCheapestCutList method and return error message
     * instead of a CutList.
     */

    // Find cheapest cut list for each cross section
    let currCutList;
    Object.values(pieces).forEach(pieceThicknessObj => {
      Object.values(pieceThicknessObj).forEach(pieceObj => {
        // Find cut list for current cross section
        currCutList = getCheapestCutList(pieceObj.cut, pieceObj.uncut, progressCallback);

        /**
         * If cut list was found (NOT undefined), push to array of cut 
         * lists for other cross sections.
         */
        if (currCutList !== undefined) {
          cutLists.push(currCutList);
        }
      });
    });

    // Pass completion message to progressCallback function
    progressCallback(`Completed in ${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_7__.createDurationString)(Date.now() - startTime)}`);

    // Return array of cheapest cut lists for each cross section
    return cutLists;
  }

  /**
   * Finds cheapest CutList with CutPieces and UncutPieces of the same dimension
   * @param {CutPiece[]} cutPieces - Array of cutPieces with same dimension
   * @param {UncutPiece[]} uncutPieces - Array of uncutPieces with matching dimension of cutPieces
   * @param {function} progressCallback
   * @returns {CutList|undefined}
   */
  function getCheapestCutList(cutPieces, uncutPieces) {
    let progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
    // Return if either CutPieces or UncutPieces arrays are empty
    if (cutPieces.length === 0 || uncutPieces.length === 0) {
      return;
    }

    /** Time that current cut list calculation began. */
    const startTime = Date.now();

    /**
     * Sort cutPieces by cut length in DESCENDING order so largest 
     * CutPieces are used first to fill any remaining length of an 
     * UncutPiece.
     */
    cutPieces.sort((a, b) => b.length - a.length);

    /**
     * Sort uncutPieces by length in ASCENDING order so smallest
     * UncutPieces are filled first with CutPieces. This prevents any 
     * CutPiece with exact length of UncutPiece to be used to fill a larger 
     * UncutPiece. (ex. 7' CutPiece should ideally fill a 7' UncutPiece 
     * instead of being used to fill a 8' or larger UncutPiece.)
     */
    uncutPieces.sort((a, b) => a.length - b.length);

    /** Array of CutPiece quantities the same order as CutPiece array. */
    const cutPieceQuantities = cutPieces.map(cutPiece => cutPiece.quantity);

    /** Total cumulative length of all individual CutPieces. */
    const individualCutPiecesTotalLength = cutPieces.reduce((accum, cutPiece) => accum + cutPiece.length, 0);

    /**
     * Two indice array where first index is sub-array of CutPieces cut 
     * from an UncutPiece and second index is any remaining length leftover.
     */
    let cutSequenceArr;

    /** Current CutList calculated in loop that is compared to best CutList. */
    let currCutList = new _cutList_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    /** Best CutList calculated. */
    let bestCutList;

    /**
     * NestedLoopCounter for the number of current/maximum available UncutPieces.
     * Maximum number of each available lengths needed if only used that 
     * available length for all cutPieces (initialized to zero).
     * Current number of each available lengths in loop to create cut list 
     * (initialized to zero).
     */
    let numAvailableUncutPiecesNLC = new _nestedLoopCounter_js__WEBPACK_IMPORTED_MODULE_5__["default"](uncutPieces.length);

    /** Current count of each CutPiece not yet assigned to a CutSequence. */
    let currCutPieceQuantities = new _countArray_js__WEBPACK_IMPORTED_MODULE_6__["default"]();

    /**
     * Pass progress message string about finding maximum UncutPiece 
     * quantities into progress callback function.
     */
    progressCallback('Finding maximum Uncut quantities to test.');

    /**
     * For each UncutPiece, find maximum quantity needed to get all 
     * individual CutPieces excluding any CutPieces that are too long.
     */
    uncutPieces.forEach((uncutPiece, index) => {
      /**
       * Reset current count array of each CutPiece to equal each 
       * CutPiece quantity for new loop.
       */
      currCutPieceQuantities.set([...cutPieceQuantities]);

      // Clear current CutList from previous loop
      currCutList.clear();

      // Find cut sequences of CutPieces using just current UncutPieces
      while (currCutPieceQuantities.total !== 0) {
        /**
         * Get cut sequence as array of CutPieces and remaining length. 
         * CountArray currCutPieceQuantities will be updated whenever a 
         * CutPiece is selected for the cut sequence.
         */
        cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_3__["default"].createCutSequenceArr(uncutPiece.length, cutPieces, currCutPieceQuantities);

        /**
         * If no CutPieces array returned in cut sequence, no more 
         * CutPieces can be used. Break while loop.
         */
        if (cutSequenceArr[0].length === 0) {
          break;
        }

        // Add new CutSequence to current CutList using cut sequence array
        currCutList.push(new _cutSequence_js__WEBPACK_IMPORTED_MODULE_3__["default"](uncutPiece, ...cutSequenceArr));

        // Increment count of max quantity of corresponding UncutPiece
        numAvailableUncutPiecesNLC.max[index]++;
      }

      /**
       * Check if current CutList has less price than the best CutList 
       * only if NO available CutPieces still left.
       */
      if (currCutPieceQuantities.total === 0 && (bestCutList === undefined || bestCutList.getPrice() >= currCutList.getPrice())) {
        bestCutList = currCutList.deepCopy();
      }
    });

    /** 
     * Trigger used to skip or increment numAvailableUncutPiecesNLC or 
     * even a condition to show when no more nested loop count.
     */
    let incrementTrigger;

    /**
     * Stores result of decrement method. Index of available UncutPiece 
     * length that was incremented OR null if cannot decrement.
     */
    let decrementTrigger;

    /** Stores temporary copy of current UncutPieces counts from numAvailableUncutPiecesNLC. */
    let tempCurrNumAvailableUncutPiecesCounter;

    /** Price of current combination of UncutPieces during loop. */
    let currNumAvailableUncutLengthsTotalPrice;

    /** Flag to skip remaining remaining column of UncutPiece combinations if true. */
    let skipFlag;

    // Set progress bar max count (max combinations of UncutPieces)
    _cutListCalculatorProgress_js__WEBPACK_IMPORTED_MODULE_4__["default"].setMaxCount(numAvailableUncutPiecesNLC.getMaxCount());

    // Set progress bar progress callback
    _cutListCalculatorProgress_js__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressCallback(progressCallback);

    // Check every iteration/combination of UncutPiece quantities for best CutList
    do {
      // Set progress bar current count (current combinations traversed so far)
      _cutListCalculatorProgress_js__WEBPACK_IMPORTED_MODULE_4__["default"].setCount(numAvailableUncutPiecesNLC.getDynamicNestedLoopCount());

      // Reset skipFlag for current loop in case it was triggered last loop
      skipFlag = false;

      // Find price of current combination of UncutPieces of current loop
      currNumAvailableUncutLengthsTotalPrice = numAvailableUncutPiecesNLC.curr.reduce((accum, curr, index) => accum + uncutPieces[index].price * curr, 0);

      /**
       * If current combination of UncutPieces has total price 
       * more than current best cut list, set skipFlag to true to skip 
       * checking more of current UncutPiece since it will always be 
       * more expensive.
       */
      if (bestCutList !== undefined && currNumAvailableUncutLengthsTotalPrice >= bestCutList.getPrice()) {
        skipFlag = true;
      }

      /**
       * If zero UncutPieces to use, skip.
       * If only one UncutPiece type to use, already checked those cases 
       * previously when finding maximum UncutPiece quantity counts.
       * If length of all UncutPieces is less than length of all CutPieces, 
       * skip since not enough material.
       */else if (numAvailableUncutPiecesNLC.curr.filter(count => count > 0).length > 1 && numAvailableUncutPiecesNLC.curr.reduce((accum, curr, index) => accum + curr * uncutPieces[index].length, 0) >= individualCutPiecesTotalLength) {
        /**
         * Create copy of numAvailableUncutPiecesNLC current array to 
         * change without modiying original.
         */
        tempCurrNumAvailableUncutPiecesCounter = [...numAvailableUncutPiecesNLC.curr];

        /**
         * Reset current count array of each CutPiece to equal each 
         * CutPiece quantity for new loop.
         */
        currCutPieceQuantities.set([...cutPieceQuantities]);

        // Clear current CutList from previous loop
        currCutList.clear();

        // Find cut sequences of CutPieces using just current UncutPieces
        /**
         * ISSUE: UncutPiece counter array is decremented before first 
         * combination is tested. 
         */
        do {
          /**
           * Decrement available UncutPieces counters to try new 
           * combination of UncutPieces counts. 
           * If decrement trigger is null, array cannot be decremented 
           * further. Break out of loop 
           */
          decrementTrigger = decrement(tempCurrNumAvailableUncutPiecesCounter, numAvailableUncutPiecesNLC.max);
          if (decrementTrigger === null) {
            break;
          }

          /**
           * Get cut sequence as array of CutPieces and remaining length. 
           * CountArray currCutPieceQuantities will be updated whenever a 
           * CutPiece is selected for the cut sequence.
           */
          cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_3__["default"].createCutSequenceArr(uncutPieces[decrementTrigger].length, cutPieces, currCutPieceQuantities);

          // Add CutSequence to current CutList
          currCutList.push(new _cutSequence_js__WEBPACK_IMPORTED_MODULE_3__["default"](uncutPieces[decrementTrigger], ...cutSequenceArr));
        } while (currCutPieceQuantities.total !== 0);

        // Check if current CutList has less price than the best CutList
        // If there are still available CutPieces, not enough UncutPieces. 

        if (currCutPieceQuantities.total === 0) {
          // If reach here, current cut list is valid

          /**
           * Set skipFlag to true to skip checking more of current 
           * UncutPiece since it will always be more expensive.
           */
          skipFlag = true;

          /**
           * Current cut list is better if NO unused uncut pieces 
           * (tempCurrNumAvailableUncutPiecesCounter has all zero 
           * values) AND it's cheaper.
           */
          if (bestCutList === undefined || tempCurrNumAvailableUncutPiecesCounter.findIndex(val => val > 0) === -1 && bestCutList.getPrice() >= currCutList.getPrice()) {
            bestCutList = currCutList.deepCopy();
          }
        }
      }

      /**
       * If skipFlag is true, skip rest of current UncutPiece index loop. 
       * Else simply increment. If incrementTrigger is null, all combinations
       * have been tested. Break loop.
       */
      incrementTrigger = skipFlag ? numAvailableUncutPiecesNLC.skip() : numAvailableUncutPiecesNLC.increment();
    } while (incrementTrigger !== null);
    console.log(bestCutList);
    console.log(`${bestCutList.getPrice()}`);
    console.log(`Completed in ${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_7__.createDurationString)(Date.now() - startTime)}`);
    return bestCutList;
  }
  return {
    getCheapestCutList,
    getCutLists
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutListCalculator);

/***/ }),

/***/ "./src/js/cutListCalculatorProgress.js":
/*!*********************************************!*\
  !*** ./src/js/cutListCalculatorProgress.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./src/js/utilities.js");
/* harmony import */ var _leastSquaresFittingExponential_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leastSquaresFittingExponential.js */ "./src/js/leastSquaresFittingExponential.js");



/**
 * Module to track progress of known number of iterations and display updates 
 * of current progress.
 */
const cutListCalculatorProgress = (() => {
  /** Number of digits after decimal to display as percentage. */
  const decimalDigitsToDisplay = 3;

  /** Duration, in milliseconds, between passing progress string to callback. */
  const updateInterval = 10000;

  /** Current number of iterations of progress. */
  let currCount = 0;

  /** Maximum number of iterations of progress. */
  let maxCount = 1;

  /** Function to pass progress string every interval. */
  let progressCallback = console.log;

  /** Last time, in milliseconds, the progress callback was called. */
  let lastDisplayDeltaTime = 0;

  /** Time, in milliseconds, the current progress was started. */
  let startTime;

  /** Used to estimate remaining time of progress. */
  let leastSquaresFittingExponential = new _leastSquaresFittingExponential_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

  /**
   * Returns percentage of current progress (ex. return 52.3 for 52.3%).
   * @returns {number}
   */
  function getPercentage() {
    return currCount / maxCount * 100;
  }

  /**
   * Sets new current count of progress.
   * @param {number} newCount 
   */
  function setCount(newCount) {
    // Update current count
    currCount = newCount;

    // If progress has not already started, set start time to now
    if (startTime === undefined) {
      startTime = Date.now();
    }

    // Get time between now and start time of current progress
    const deltaTime = Date.now() - startTime;

    /**
     * If it's been longer than updateInterval since last updated time,
     * display current progress using progress callback function.
     */
    if (deltaTime - lastDisplayDeltaTime > updateInterval) {
      // Save reference to calculated percentage of current progress 
      const percentage = getPercentage();

      /**
       * Add data point to leastSquaresFittingExponential to better 
       * estimate completion time. To avoid numbers overflowing when 
       * calculating best fit curve, data points should be as small
       * value as possible. X-coord is nth data point and Y-coord is
       * percentage as decimal where 1 represents 100%.
       */
      leastSquaresFittingExponential.addDataPoint(Math.floor(deltaTime / updateInterval), percentage / 100);

      /**
       * Use leastSquaresFittingExponential to estimate time left to 
       * complete calculation.
       */
      const timeLeftEstimate = leastSquaresFittingExponential.solveForX(1) * updateInterval - deltaTime;

      // Pass current progress update string to progress callback function
      progressCallback(`${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.addCommasToNumber)(currCount)} of ${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.addCommasToNumber)(maxCount)} (${percentage.toFixed(decimalDigitsToDisplay)}%)\nTime Elapsed: ${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createDurationString)(deltaTime)}\nTime Left (est.): ${(0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createDurationString)(timeLeftEstimate)}`);

      /**
       * Set time update was last displayed to current time for future 
       * function calls.
       */
      lastDisplayDeltaTime = deltaTime;
    }
  }

  /**
   * Sets new max count of progress.
   * @param {number} newMaxCount 
   * @returns 
   */
  function setMaxCount(newMaxCount) {
    if (typeof newMaxCount !== 'number') {
      return;
    }
    maxCount = newMaxCount;
  }

  /**
   * Sets new progress callback function.
   * @param {Function} newProgressCallback 
   * @returns 
   */
  function setProgressCallback(newProgressCallback) {
    if (typeof newProgressCallback !== 'function') {
      return;
    }
    progressCallback = newProgressCallback;
  }
  return {
    getPercentage,
    setCount,
    setMaxCount,
    setProgressCallback
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutListCalculatorProgress);

/***/ }),

/***/ "./src/js/cutPiece.js":
/*!****************************!*\
  !*** ./src/js/cutPiece.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


/** Piece of size thickness x width that is cut to specific length, quantity, and kerf from blade used to cut. */
class CutPiece {
  /**
   * @constructor
   * @param {number} thickness - Thickness of cut piece (inches)
   * @param {number} width - Width of cut piece (inches)
   * @param {number} length - Final cut length of cut piece (inches)
   * @param {number} quantity - Number of identical pieces to cut (default = 1)
   * @param {number} kerf - Blade width of material removed when cut (inches) (default = 1/8")
   * @param {string|null} id - ID as string or null if new uuidv4 id created
   */
  constructor(thickness, width, length) {
    let quantity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    let kerf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.125;
    let id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    this.thickness = thickness;
    this.width = width;
    this.length = length;
    this.quantity = quantity;
    this.kerf = kerf;
    this.id = id || (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }

  /**
   * Returns total sum of length and kerf of CutPiece. 
   * @returns {number}
   */
  get cutWithKerf() {
    return this.length + this.kerf;
  }

  /**
   * Returns JSON object of the CutPiece.
   * @returns {Object} obj
   * @returns {number} obj.thickness
   * @returns {number} obj.width
   * @returns {number} obj.length
   * @returns {number} obj.quantity
   * @returns {number} obj.kerf
   * @returns {string} obj.id
   */
  toJson() {
    return {
      thickness: this.thickness,
      width: this.width,
      length: this.length,
      quantity: this.quantity,
      kerf: this.kerf,
      id: this.id
    };
  }

  /**
   * Returns CutPiece given JSON object of a CutPiece.
   * @param {Object} jsonObj
   * @param {number} jsonObj.thickness
   * @param {number} jsonObj.width
   * @param {number} jsonObj.length
   * @param {number} jsonObj.quantity
   * @param {number} jsonObj.kerf
   * @param {string} jsonObj.id
   * @returns {CutPiece}
   */
  static createFromJson(jsonObj) {
    return new CutPiece(jsonObj.thickness, jsonObj.width, jsonObj.length, jsonObj.quantity, jsonObj.kerf, jsonObj.id);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutPiece);

/***/ }),

/***/ "./src/js/cutSequence.js":
/*!*******************************!*\
  !*** ./src/js/cutSequence.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _countArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./countArray.js */ "./src/js/countArray.js");
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uncutPiece.js */ "./src/js/uncutPiece.js");




/** Sequence of CutPieces cut from an UncutPiece with any remaining length. */
class CutSequence {
  /**
   * @constructor
   * @param {UncutPiece} uncutPiece 
   * @param {CutPiece[]} cutPieces 
   * @param {number} remainingLength 
   */
  constructor(uncutPiece) {
    let cutPieces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let remainingLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.uncutPiece = uncutPiece;
    this.cutPieces = cutPieces;
    this.remainingLength = remainingLength;
  }

  /** Returns a string representation of the CutSequence. */
  toString() {
    console.log(`Pieces: ${this.cutPieces}\nLeftover: ${this.remainingLength}`);
  }

  /**
   * Returns JSON object of the CutSequence.
   * @returns {Object} obj
   * @returns {Object} obj.uncutPiece
   * @returns {Object[]} obj.cutPieces
   * @returns {number} obj.remainingLength
   */
  toJson() {
    return {
      uncutPiece: this.uncutPiece.toJson(),
      cutPieces: this.cutPieces.map(cutPiece => cutPiece.toJson()),
      remainingLength: this.remainingLength
    };
  }

  /**
   * Returns CutSequence given JSON object of a CutSequence.
   * @param {Object} jsonObj 
   * @param {Object} jsonObj.uncutPiece
   * @param {Object[]} jsonObj.cutPieces
   * @param {number} jsonObj.remainingLength
   * @returns {CutSequence}
   */
  static createFromJson(jsonObj) {
    // Create UncutPiece from JSON data
    const uncutPiece = _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__["default"].createFromJson(jsonObj.uncutPiece);

    // Create array of CutPieces from JSON data
    const cutPieces = jsonObj.cutPieces.map(cutPieceJson => _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"].createFromJson(cutPieceJson));

    // Get remaining length from JSON data
    const remainingLength = jsonObj.remainingLength;

    // Create and return CutSequence
    return new CutSequence(uncutPiece, cutPieces, remainingLength);
  }

  /**
   * Returns array of CutPieces with smallest remaining length from an initial length.
   * @param {number} remainingLength - Length of uncut piece to find CutPieces to fit
   * @param {CutPiece[]} cutPieces - Array of individual CutPieces sorted by length in descending order
   * @param {CountArray} cutPieceQuantities - CountArray of current quantites of each CutPiece
   * @returns {[CutPiece[], number]} Array of CutPieces sub array of selected CutPieces and any remaining length leftover
   */
  static createCutSequenceArr(remainingLength, cutPieces, cutPieceQuantities) {
    /** Array of CutPieces that can be cut from remainingLength */
    let selectedCutPiecesArr = [];

    /**
     * Index of CutPiece and it's quantity to start searching in current 
     * loop (initialized to zero). Previous CutPieces are guarenteed to be 
     * too long for remainingLength since CutPieces array is sorted by 
     * length in descending order.
     */
    let cutPiecesStartIndex = 0;

    /** Index of CutPiece selected to cut from remaining length */
    let selectedCutPieceIndex;

    /**
     * Flag is true when selected CutPiece will take up the entire 
     * remaining length leaving zero length leftover.
     */
    let exactLengthFlag;

    /**
     * Looping counter to be used inside while loop. Declared outside 
     * while loop to use the same memory for each loop rather than 
     * declaring and destroying a new one each loop.
     */
    let i;

    // Find series of CutPieces that can be cut from remainingLength
    while (cutPieceQuantities.total !== 0) {
      /**
       * Set selectedCutPieceIndex to undefined before finding new value
       * with updated remainingLength and cutPieceQuantities.
       */
      selectedCutPieceIndex = undefined;

      /**
       * Make sure exactLengthFlag is false for new loop before finding 
       * new CutPiece.
       */
      exactLengthFlag = false;

      /**
       * Find largest CutPiece length that can be cut from remainingLength by 
       * looping through CutPieces with non-zero quantity. Continue loop until
       * select a CutPiece OR reach end of CutPieces array.
       * Start loop at cutPieceStartIndex that is set at the end of previous 
       * while loop that found a CutPiece to add to cut sequence. This skips 
       * CutPieces that are too long for the remainingLength.
       */
      for (i = cutPiecesStartIndex; i < cutPieces.length && selectedCutPieceIndex === undefined; i++) {
        // If ith CutPiece has zero quantity left, skip
        if (cutPieceQuantities.valueAtIndex(i) === 0) {
          continue;
        }

        // If ith CutPiece is too long for remaining length, skip
        if (cutPieces[i].length > remainingLength) {
          continue;
        }

        /**
         * If CutPiece cut length is exactly equal to remaining length 
         * (DO NOT INCLUDE KERF).
         * Found CutPiece with exact length. No cut needed.
         * OR
         * If CutPiece cut length is less than remaining length
         * AND cut length + kerf is more than or equal to remaining length.
         * Found CutPiece that uses up remaining length with cut a single 
         * kerf distance from the end or less. Can get CutPiece length out 
         * of remaining length by trimming one kerf or less off end.
         * There is NO more material left after cutting this CutPiece.
         */
        if (cutPieces[i].length === remainingLength || cutPieces[i].length < remainingLength && cutPieces[i].cutWithKerf >= remainingLength) {
          exactLengthFlag = true;
        }

        /**
         * If reach here, CutPiece cut length + kerf is less than 
         * remaining length (INCLUDING KERF). There will be some 
         * material left for potentially more CutPieces.
         */
        selectedCutPieceIndex = i;
      }

      /**
       * Check if selectedCutPieceIndex is still undefined. If it is, all 
       * cutLength+kerf are more than remainingLength.
       * Break out of while loop. No more CutPieces can be chosen for the 
       * cut sequence.
       */
      if (selectedCutPieceIndex == undefined) {
        break;
      }

      /**
       * Decrement CutPiece from array of quantities, so same CutPiece 
       * is NOT selected more than once.
       */
      cutPieceQuantities.decrementValueAtIndex(selectedCutPieceIndex);

      /**
       * Push selected CutPiece reference to array of selected CutPieces 
       * for initial remaining length.
       */
      selectedCutPiecesArr.push(cutPieces[selectedCutPieceIndex]);

      /**
       * If found CutPiece to use entire remaining length, set remaining 
       * length to zero and break out of loop.
       */
      if (exactLengthFlag) {
        remainingLength = 0;
        break;
      }

      // If reach here, another CutPiece could be selected for cut sequence

      // Update remaining length for next loop by subtracting cut+kerf
      remainingLength -= cutPieces[selectedCutPieceIndex].cutWithKerf;

      /**
       * Set cutPiecesStartIndex to selected index to skip CutPieces 
       * guaranteed to be longer than remainingLength.
       */
      cutPiecesStartIndex = selectedCutPieceIndex;
    }

    // Return array of CutPieces selected and any remainingLength leftover
    return [selectedCutPiecesArr, remainingLength];
  }

  /**
   * Recursive function that returns array of CutPieces with smallest remaining length from an initial length.
   * @param {number} remainingLength 
   * @param {CutPiece[]} cutPieces Array of individual CutPieces sorted by length in descending order
   * @param {CountArray} cutPieceQuantities 
   * @param {number} cutPiecesStartIndex (default = 0) 
   * @returns {[...CutPiece, number]} Array of CutPieces with any remaining length of the piece at the end
   */
  static createCutSequenceArrRec(remainingLength, cutPieces, cutPieceQuantities) {
    let cutPiecesStartIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    // If availableCutPiecesByIndex is empty, return single index array with just remaining length
    if (cutPieceQuantities.total === 0) {
      return [remainingLength];
    }
    let selectedCutPieceIndex;
    for (let i = cutPiecesStartIndex; i < cutPieces.length && selectedCutPieceIndex === undefined; i++) {
      // If ith CutPiece has zero quantity, skip
      if (cutPieceQuantities.valueAtIndex(i) === 0) {
        continue;
      }

      // If ith CutPiece is too long for remaining length, skip
      if (cutPieces[i].length > remainingLength) {
        continue;
      }

      /**
       * If CutPiece cut length is exactly equal to remaining length (DO NOT INCLUDE KERF).
       * Found CutPiece with exact length. No cut needed.
       * OR
       * If CutPiece cut length is less than remaining length
       * AND cut length + kerf is more than or equal to remaining length.
       * Found CutPiece that uses up remaining length with cut a single 
       * kerf distance from the end or less. Can get CutPiece length out 
       * of remaining length by trimming one kerf or less off end.
       * There is NO more material left after cutting this CutPiece.
       */
      if (cutPieces[i].length === remainingLength || cutPieces[i].length < remainingLength && cutPieces[i].cutWithKerf >= remainingLength) {
        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected more than once.
        //availableCutPiecesByIndex.splice(i, 1);
        cutPieceQuantities.decrementValueAtIndex(i);

        // Return array of piece with exact remaining length and ending 
        // with zero for no more remaining length after cut.
        return [cutPieces[i], 0];
      }

      // If reach here, CutPiece cut length + kerf is less than remaining length (INCLUDING KERF).
      // There will be some material left for potentially more CutPieces.
      selectedCutPieceIndex = i;
    }

    // Check if selectedCutPieceIndex is still undefined - All cutLength+kerf are more than remainingLength.
    // Return single index array with just remaining length
    if (selectedCutPieceIndex == undefined) {
      return [remainingLength];
    }

    // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
    // being selected more than once.
    cutPieceQuantities.decrementValueAtIndex(selectedCutPieceIndex);
    const selectedCutPiece = cutPieces[selectedCutPieceIndex];

    // Return array of any CutPieces with remaining length as last element of array
    return [selectedCutPiece, ...CutSequence.createCutSequenceArr(remainingLength - selectedCutPiece.cutWithKerf, cutPieces, cutPieceQuantities, selectedCutPieceIndex)];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutSequence);

/***/ }),

/***/ "./src/js/leastSquaresFittingExponential.js":
/*!**************************************************!*\
  !*** ./src/js/leastSquaresFittingExponential.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeastSquaresFittingExponentialAdv": () => (/* binding */ LeastSquaresFittingExponentialAdv),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Computes best fit exponential curve using least squares of data points on grid.
 * 
 * https://mathworld.wolfram.com/LeastSquaresFittingExponential.html
 */
class LeastSquaresFittingExponential {
  constructor() {
    this.nLogY = 0;
    this.xSquared = 0;
    this.x = 0;
    this.xNLogY = 0;
    this.n = 0;
  }

  /**
   * Add data point on grid to dataset to fit the exponential curve.
   * @param {number} x 
   * @param {number} y
   */
  addDataPoint(x, y) {
    // If y is zero, nLogY will be Infinite. Skip this point.
    if (y === 0) {
      return;
    }

    // NOTE: If y is always <1, than nLogY will always be negative

    // Save reference to natural log of y to avoid calculating it twice next
    const nLogY = Math.log(y);

    // Add to each sum that is used to calculate best fit exponential curve
    this.nLogY += nLogY;
    this.xSquared += x * x;
    this.x += x;
    this.xNLogY += x * nLogY;
    this.n++;
  }

  /**
   * Returns x-axis value of best fit exponential curve, given y-axis value.
   * @param {number} y 
   * @returns {number}
   */
  solveForX(y) {
    const a = (this.nLogY * this.xSquared - this.x * this.xNLogY) / (this.n * this.xSquared - this.x ** 2);
    const A = Math.exp(a);
    const B = (this.n * this.xNLogY - this.x * this.nLogY) / (this.n * this.xSquared - this.x ** 2);

    /**
     * y = A*e^(Bx)
     * Solve for x
     * ln(y) = ln(A) + Bx
     * x = (ln(y) - ln(A)) / B
     * x = ln(y/A) / B
     */

    return Math.log(y / A) / B;
  }
}

/**
 * Computes best fit exponential curve using least squares of data points on grid.
 * 
 * https://mathworld.wolfram.com/LeastSquaresFittingExponential.html
 */
class LeastSquaresFittingExponentialAdv {
  constructor() {
    /**
     * | sum(y)     sum(x * y)    | * | a | = | sum(y * ln(y))      |
     * | sum(x * y) sum(x**2 * y) |   | b |   | sum (x * y * ln(y)) |
     */
    this.xSquaredY = 0;
    this.yNLogY = 0;
    this.xY = 0;
    this.xYNLogY = 0;
    this.y = 0;
  }

  /**
   * Add data point on grid to dataset to fit the exponential curve.
   * @param {number} x 
   * @param {number} y
   */
  addDataPoint(x, y) {
    // If y is zero, nLogY will be Infinite. Skip this point.
    if (y === 0) {
      return;
    }

    // NOTE: If y is always <1, than nLogY will always be negative

    // Save reference to natural log of y to avoid calculating it twice next
    const nLogY = Math.log(y);

    // Add to each sum that is used to calculate best fit exponential curve
    this.y += y;
    this.xY += x * y;
    this.xSquaredY += x * x * y;
    this.yNLogY += y + nLogY;
    this.xYNLogY += x * y * nLogY;
  }

  /**
   * Returns x-axis value of best fit exponential curve, given y-axis value.
   * @param {number} y 
   * @returns {number}
   */
  solveForX(y) {
    const a = (this.xSquaredY * this.yNLogY - this.xY * this.xYNLogY) / (this.y * this.xSquaredY - this.xY ** 2);
    const A = Math.exp(a);
    const B = (this.y * this.xYNLogY - this.xY * this.yNLogY) / (this.y * this.xSquaredY - this.xY ** 2);

    /**
     * y = A*e^(Bx)
     * Solve for x
     * ln(y) = ln(A) + Bx
     * x = (ln(y) - ln(A)) / B
     * x = ln(y/A) / B
     */

    return Math.log(y / A) / B;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeastSquaresFittingExponential);


/***/ }),

/***/ "./src/js/nestedLoopCounter.js":
/*!*************************************!*\
  !*** ./src/js/nestedLoopCounter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Functionality for dynamic level of nested loop counters. */
class NestedLoopCounter {
  /**
   * @constructor
   * @param {number} length 
   */
  constructor() {
    let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    // Set current count and max counts to initial value of zero
    this.curr = new Array(length).fill(0);
    this.max = new Array(length).fill(0);
  }

  /** Returns size of nested loop counter (max depth of inner-most loop). */
  get length() {
    return this.max.length;
  }

  /**
   * Returns count of all iterations up to the current nested loop values.
   * @returns {number}
   */
  getDynamicNestedLoopCount() {
    // If current counts array is empty, return zero
    if (!this.curr.length) {
      return 0;
    }

    // Find last index of a non-zero value, to skip larger nested loops entirely
    const lastNonZeroIndex = this.curr.findLastIndex(val => val > 0);

    // If lastNonZeroIndex is -1, all values of array are zero. Return one count.
    if (lastNonZeroIndex === -1) {
      return 1;
    }

    // If reach here, lastNonZeroIndex >= 0 after findLastIndex() call

    // Initialize count to first index value plus one (add extra for zero value)
    let count = this.curr[0] + 1;

    /**
     * For every index after the first up to lastNonZeroIndex, add the 
     * product of all previous indices corresponding max value plus one.
     */
    for (let i = 1; i <= lastNonZeroIndex; i++) {
      count += this.curr[i] * this.max.slice(0, i).reduce((accum, curr) => accum * (curr + 1), 1);
    }
    return count;

    /**
     * How to get number from counter?
     * 
     * max = [5,4,3,2]
     * possibilities = 6*5*4*3 = 360
     * 
     * max =     [5,4,3,2]
     * counter = [3,0,0,0]
     * [0] 1
     * [3] +3
     * 4
     * - First index is last non-zero index, add first index value plus one
     * 3 + 1 = 4
     * 
     * max =     [5,4,3,2]
     * counter = [5,0,0,0]
     * - First index is last non-zero index, add first index value plus one
     * 5 + 1 = 6
     * 
     * max =     [5,4,3,2]
     * counter = [3,2,0,0]
     * [0,0] 1
     * [5,0] +5
     * [0,1] +1
     * [5,1] +5
     * [0,2] +1
     * [3,2] +3
     * 16
     * [5,0] +6
     * [5,1] +6
     * [0,2] +1
     * [3,2] +3
     * 16
     * - First non-zero index (1) value (2) * prev index (0) corresponding max value plus 1 (5+1=6)
     * 2 * 6 = 12
     * - Plus first index (0) value plus 1 (3+1=4)
     * 12 + 4 = 16
     * 
     * max =     [5,4,3,2]
     * counter = [5,4,0,0]
     * [5,0] +6
     * [5,1] +6
     * [5,2] +6
     * [5,3] +6
     * [5,4] +6
     * 30
     * - First non-zero index (1) value (4) * prev index (0) corresponding max value plus 1 (5+1=6)
     * 4 * 6 = 24
     * - Plus first index (0) value plus 1 (5+1=6)
     * 24 + 6 = 30
     * 
     * max =     [5,4,3,2]
     * counter = [0,0,1,0]
     * [5,4,0,0] +30
     * [0,0,1,0] +1
     * 31
     * - First index (0) value plus 1 (0+1=1)
     * 1
     * - Plus next index (1) value (0) * (product of prev indices corresponding max plus one)
     * 1 + 0 * 6 = 1
     * - Plus next index (2) value (1) * (product of prev indices corresponding max plus one)
     * 1 + 1 * (6*5) = 31
     * 
     * max =     [5,4,3,2]
     * counter = [5,4,3,2]
     * 360
     * - First index (0) value plus 1 (5+1=6)
     * 6
     * - Plus next index (1) value (4) * (product of prev indices corresponding max plus one)
     * 6 + 4 * 6 = 30
     * - Plus next index (2) value (3) * (product of prev indices corresponding max plus one)
     * 30 + 3 * (6*5) = 30 + 3 * 30 = 120
     * - Plus next index (3) value (2) * (product of prev indices corresponding max plus one)
     * 120 + 2 * (6*5*4) = 120 + 2 * 120 = 120 + 240 = 360
     */
  }

  /**
   * Returns count of maximum iterations of the maximum nested loop values.
   * @returns {number}
   */
  getMaxCount() {
    // Find last index of a non-zero value, to skip larger nested loops entirely
    const lastNonZeroIndex = this.max.findLastIndex(val => val > 0);

    // Return product of all counts (plus one for zero value) up to lastNonZeroIndex
    return this.max.slice(0, lastNonZeroIndex === -1 ? this.max.length : lastNonZeroIndex + 1).reduce((accum, curr) => accum * (curr + 1), 1);
  }

  /**
   * Recursive function that increments count of 'index' of current nested 
   * loop count and returns largest index of nested loop count that changed.
   * Returns null if index reaches end of current nested loop counts array.
   * @param {number} index 
   * @returns {null|undefined} Returns null if NO nested loop counts at index or higher can be incremented
   */
  increment() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    // Check if index has reached end
    if (index >= this.curr.length) {
      return null;
    }

    // Increment count at index
    this.curr[index]++;

    /**
     * If current index value has surpassed the equivalent max value, set 
     * current index value to zero and then recursively increment value of 
     * next index.
     */
    if (this.curr[index] > this.max[index]) {
      this.curr[index] = 0;
      return this.increment(++index);
    }
  }

  /**
   * Skips remaining iterations of loop at first non-zero value index.
   * @returns {null|undefined} Returns null if NO nested loop counts can be skipped
   */
  skip() {
    // Find first index with non-zero value count
    const firstNonZeroValueIndex = this.curr.findIndex(val => val > 0);

    // If array is empty OR all values are zero, return
    if (firstNonZeroValueIndex === undefined) {
      return;
    }

    // Set first index with non-zero value count to zero
    this.curr[firstNonZeroValueIndex] = 0;

    // Increment count of next index and return result
    return this.increment(firstNonZeroValueIndex + 1);

    /**
     * ex. curr=[1,3,0,0] max=[3,4,4,5] results in a valid cut list.
     * Next increments of [2,3,0,0] and [3,3,0,0] will always be more expensive than [1,3,0,0].
     * Make first non-zero value 0 and increment value after.
     * [0,4,0,0] -> continue
     */
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NestedLoopCounter);

/***/ }),

/***/ "./src/js/uncutPiece.js":
/*!******************************!*\
  !*** ./src/js/uncutPiece.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


/** Piece of size thickness x width that is sold at specific length and price. */
class UncutPiece {
  /**
   * @constructor
   * @param {number} thickness - Thickness of uncut piece (inches)
   * @param {number} width - Width of uncut piece (inches)
   * @param {number} length - Length of uncut piece (inches) 
   * @param {number} price - Price of possible length
   * @param {string|null} id - ID as string or null if new uuidv4 id created
   */
  constructor(thickness, width, length, price) {
    let id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    this.thickness = thickness;
    this.width = width;
    this.length = length;
    this.price = price;
    this.id = id || (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }

  /**
   * Returns JSON object of the UncutPiece.
   * @returns {Object} obj
   * @returns {number} obj.thickness
   * @returns {number} obj.width
   * @returns {number} obj.price
   * @returns {string} obj.id
   */
  toJson() {
    return {
      thickness: this.thickness,
      width: this.width,
      length: this.length,
      price: this.price,
      id: this.id
    };
  }

  /**
   * Returns UncutPiece given JSON object of an UncutPiece.
   * @param {Object} jsonObj
   * @param {number} jsonObj.thickness
   * @param {number} jsonObj.width
   * @param {number} jsonObj.price
   * @param {string} jsonObj.id
   * @returns {UncutPiece}
   */
  static createFromJson(jsonObj) {
    return new UncutPiece(jsonObj.thickness, jsonObj.width, jsonObj.length, jsonObj.price, jsonObj.id);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UncutPiece);

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCommasToNumber": () => (/* binding */ addCommasToNumber),
/* harmony export */   "clearElement": () => (/* binding */ clearElement),
/* harmony export */   "convertImperialWithFractionToNum": () => (/* binding */ convertImperialWithFractionToNum),
/* harmony export */   "convertNumToImperialWithFraction": () => (/* binding */ convertNumToImperialWithFraction),
/* harmony export */   "createDurationString": () => (/* binding */ createDurationString),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createImperialNumWithFraction": () => (/* binding */ createImperialNumWithFraction),
/* harmony export */   "isInputValidLength": () => (/* binding */ isInputValidLength),
/* harmony export */   "isInputValidPrice": () => (/* binding */ isInputValidPrice)
/* harmony export */ });
/**
 * 
 * @param {string} type - Element type
 * @param {Object} props - Element attribute names and their corresponding value 
 * @param  {...Node} children - Variable number of child nodes 
 */
function createElement(type) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const element = document.createElement(type);

  // Props
  for (const [key, value] of Object.entries(props)) {
    element.setAttribute(key, value);
  }

  // Children Nodes
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  children.forEach(child => element.append(child));
  return element;
}
function isInputValidLength(inputElement) {
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
function isInputValidPrice(inputElement) {
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

/**
 * Returns string representation of number with commas added.
 * @param {number} num
 * @returns {string}
 */
function addCommasToNumber(num) {
  // Initialize string to num argument converted to string
  let str = num.toString();

  /**
   * Start index of number sequence to add commas.
   * Check if number is negative. Negative sign will be skipped.
   * If number is negative, skip first index and start on second.
   */
  let startIndex = num < 0 ? 1 : 0;

  /**
   * End index of number sequence to add commas.
   * Find value in 1's column of number.
   * Examples: 
   * - 12345 has '5' in 1's column
   * - 12345.678 has '5' in 1's column
   */
  let dotCharacterIndex = str.indexOf('.');
  let endIndex = dotCharacterIndex === -1 ? str.length - 1 : dotCharacterIndex - 1;

  /**
   * Whole number sequence without negative sign OR decimal portion ranges 
   * from startIndex to endIndex.
   */

  // Decrement endIndex by 2 to equal first index that comma could be added
  endIndex -= 2;

  // Add commas in reverse, skipping 3 digits every loop until reach last digit
  while (endIndex > startIndex) {
    // Add comma to endIndex of string
    str = str.slice(0, endIndex) + ',' + str.slice(endIndex);
    // Decrement endIndex to point to index of next possible comma
    endIndex -= 3;
  }
  return str;
}

/**
 * Returns string of duration (milliseconds) formatted to include days, hour, 
 * minutes, seconds, and/or milliseconds.
 * @param {number} durationMilliseconds 
 * @returns {string}
 */
function createDurationString(durationMilliseconds) {
  // If duration is less than one second, return duration as milliseconds
  if (durationMilliseconds < 1000) {
    return `${durationMilliseconds} millisecond${durationMilliseconds !== 1 ? 's' : ''}`;
  }

  // Array to hold strings for each time scale (days, hours, etc.)
  let strArr = [];
  // Value of digit in current time scale for the duration
  let digit;

  /**
   * Duration Scales where first index is string of time scale title and 
   * second index is number of milliseconds for that same time scale.
   */
  const durationScales = [['day', 86400000], ['hour', 3600000], ['minute', 60000], ['second', 1000]];

  // Add string for each duration time scale possible
  durationScales.forEach(_ref => {
    let [str, val] = _ref;
    /**
     * If current duration is larger than current time scale, digit for 
     * the current time scale will be nonzero. Else can skip the current
     * time scale.
     */
    if (durationMilliseconds > val) {
      // Get whole number of current time scale
      digit = Math.floor(durationMilliseconds / val);

      /**
       * Set duration to remaining milliseconds for next loop that tests
       * for smaller time scale.
       */
      durationMilliseconds -= digit * val;

      /**
       * Create string of current time scale, adding 's' at end if digit
       * is greater than one. Then add string to array of other time 
       * scale strings to be joined into one single string later.
       */
      strArr.push(`${digit} ${str}${digit !== 1 ? 's' : ''}`);
    }
  });

  // Return duration strings in array after joining into single string
  return strArr.join(', ');
}

/**
 * Returns number given feet, inches, and fractional part of imperial formatted
 * number.
 * @param {number} nFeet 
 * @param {number} nInches 
 * @param {number} fractionNumerator 
 * @param {number} fractionDenominator 
 * @returns {number}
 */
function convertImperialWithFractionToNum(nFeet) {
  let nInches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let fractionNumerator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let fractionDenominator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;
  return nFeet * 12 + nInches + fractionNumerator / fractionDenominator;
}

/**
 * Returns string of a number in imperial format given feet, inches, and 
 * fractional part of the number. 
 * @param {number} nFeet 
 * @param {number} nInches 
 * @param {number} fractionNumerator 
 * @param {number} fractionDenominator 
 * @returns {string}
 */
function createImperialNumWithFraction(nFeet) {
  let nInches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let fractionNumerator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let fractionDenominator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;
  // If whole number is zero, just return zero as string
  if (nFeet === 0 && nInches === 0 && fractionNumerator === 0) {
    return '0';
  }
  let str = '';

  // Feet

  // If feet is nonzero, add feet to string with a single quotation mark
  if (nFeet !== 0) {
    str += nFeet + '\'';
  }

  // Inches

  /**
   * If inches AND fraction is nonzero, add both to string with double 
   * quotation marks.
   */
  if (nInches !== 0 && fractionNumerator !== 0) {
    str += `${nInches}-${fractionNumerator}/${fractionDenominator}"`;
  }
  /**
   * Else if inches is nonzero AND fraction is zero, add just inches to
   * string with double quotation marks.
   */else if (nInches !== 0) {
    str += nInches + '"';
  }
  /**
   * Else if inches is zero AND fraction is nonzero, add fraction to string
   * with double quotation marks.
   */else if (fractionNumerator !== 0) {
    // If feet is also nonzero, add zero to string before fraction
    if (nFeet !== 0) {
      str += '0-';
    }
    str += `${fractionNumerator}/${fractionDenominator}"`;
  }
  return str;

  /**
   * NOTES:
   * 1'
   * 1'-2"
   * 1'-2 3/8"
   * 1'-0 3/8"
   * 2"
   * 2 3/8"
   * 3/8"
   * OR
   * 1'
   * 1'2"
   * 1'2-3/8"
   * 1'0-3/8"
   * 2"
   * 2-3/8"
   * 3/8"
   */
}

/**
 * Converts number to string representation of number in imperial units with 
 * fraction, given max base power of two for precision (ex. maxBase=3 for 
 * 1/(2**3)=1/8" precision).
 * @param {number} num 
 * @param {number} maxBase 
 * @returns {string}
 */
function convertNumToImperialWithFraction(num) {
  let maxBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  // Number of feet
  const nFeet = num >= 12 ? Math.floor(num / 12) : 0;

  // Number of inches
  const nInches = Math.floor(num - nFeet * 12);

  /**
   * Fraction
   * To avoid floating point precision errors, convert num to string and 
   * split on '.' if present at all. Initial value will initially be 
   * decimal of num as string OR undefined if NO decimal.
   */
  let decimal = num.toString().split('.')[1];

  /**
   * Convert only decimal from string back to number. If no decimal was 
   * found, set decimal to zero.
   */
  decimal = decimal !== undefined ? Number('.' + decimal) : 0;

  /**
   * Find fraction numerator and denominator (using log base 2 power).
   * Examples: 
   * 2^1 = n/2"
   * 2^2 = n/4"
   * 2^3 = n/8"
   * 2^4 = n/16"
   */

  // Top part of fraction, initialized to zero in case there is no decimal
  let fractionNumerator = 0;
  if (decimal !== 0) {
    /**
     * By multiplying the decimal by 2**n and rounding the product, the
     * final number is top part of fraction and 2**n is bottom part of
     * fraction. If top part of fraction is even (divisible by 2), then
     * the fraction can be further simplified by using smaller log base
     * 2 power, 2**(n-1). Keep finding top part of fraction while 
     * decrementing log base power of 2 until it becomes odd.
     */
    do {
      fractionNumerator = Math.round(decimal * 2 ** maxBase);
      maxBase--;
    } while (fractionNumerator % 2 === 0);
  }

  // Return imperial number as string using feet, inches, and fraction
  return createImperialNumWithFraction(nFeet, nInches, fractionNumerator, 2 ** (maxBase + 1));
}

/**
 * Clears HTMLElement of any children elements.
 * @param {HTMLElement} element 
 */
function clearElement(element) {
  if (!(element instanceof HTMLElement)) {
    return;
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/js/cutListWorker.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cutListCalculator.js */ "./src/js/cutListCalculator.js");

onmessage = function (e) {
  const bestCutLists = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCutLists(...e.data, postMessage);
  postMessage(bestCutLists);
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQSxPQUFPLHdEQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENTO0FBQ047QUFDc0I7O0FBRWpEO0FBQ0EsTUFBTSw2REFBaUI7QUFDdkIsV0FBVyw2REFBaUI7QUFDNUI7O0FBRUE7QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJjOztBQUUvQjtBQUNBLHFDQUFxQyxzREFBVTtBQUMvQzs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7VUNOdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ051RDtBQUV2REUsU0FBUyxHQUFHLFNBQUFBLENBQVNDLENBQUMsRUFBRTtFQUNwQixNQUFNQyxZQUFZLEdBQUczSix5RUFBNkIsQ0FDOUMsR0FBRzBKLENBQUMsQ0FBQ0UsSUFBSSxFQUNUQyxXQUNKLENBQUM7RUFFREEsV0FBVyxDQUFDRixZQUFZLENBQUM7QUFDN0IsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb3VudEFycmF5LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdENhbGN1bGF0b3JQcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0U2VxdWVuY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9sZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9uZXN0ZWRMb29wQ291bnRlci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3VuY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdFdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogS2VlcHMgdHJhY2sgb2YgbXVsdGlwbGUgY291bnRlciB2YWx1ZXMgYXQgb25jZS4gKi9cclxuY2xhc3MgQ291bnRBcnJheSB7XHJcbiAgICAvLyBQcml2YXRlIGZpZWxkc1xyXG5cclxuICAgIC8vIEFycmF5IHRvIGhvbGQgYWxsIGNvdW50ZXIgdmFsdWVzXHJcbiAgICAjYXJyO1xyXG5cclxuICAgIC8vIFN1bSBvZiBhbGwgY3VycmVudCBjb3VudGVyIHZhbHVlc1xyXG4gICAgI3RvdGFsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBpbml0QXJyIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0QXJyID0gW10pIHtcclxuICAgICAgICB0aGlzLnNldChpbml0QXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXR0ZXJzL1NldHRlcnNcclxuXHJcbiAgICAvKiogR2V0dGVyIHRoYXQgcmV0dXJucyB0b3RhbCBzdW0gb2YgYWxsIGN1cnJlbnQgY291bnRlciB2YWx1ZXMuICovXHJcbiAgICBnZXQgdG90YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3RvdGFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoZXMgbW9yZSBjb3VudGVyIHZhbHVlcyB0byBlbmQgb2YgYXJyYXkgb2YgY291bnRlciB2YWx1ZXMuXHJcbiAgICAgKiBAcGFyYW0gIHsuLi5udW1iZXJ9IGl0ZW1zIFxyXG4gICAgICovXHJcbiAgICBwdXNoKC4uLml0ZW1zKSB7XHJcbiAgICAgICAgdGhpcy4jYXJyLnB1c2goaXRlbXMpO1xyXG4gICAgICAgIHRoaXMuI3VwZGF0ZVRvdGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG5ldyBhcnJheSBvZiBjb3VudGVyIHZhbHVlcy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IG5ld0FyciBcclxuICAgICAqL1xyXG4gICAgc2V0KG5ld0Fycikge1xyXG4gICAgICAgIHRoaXMuI2FyciA9IG5ld0FycjtcclxuICAgICAgICB0aGlzLiN1cGRhdGVUb3RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBjb3VudGVyIHZhbHVlIGF0IHNwZWNpZmljIGluZGV4IG9mIGFycmF5IG9mIGNvdW50ZXIgdmFsdWVzLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHZhbHVlQXRJbmRleChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNhcnJbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVjcmVtZW50IGNvdW50ZXIgdmFsdWUgYXQgc3BlY2lmaWMgaW5kZXggb2YgYXJyYXkgb2YgY291bnRlciB2YWx1ZXMuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIGRlY3JlbWVudFZhbHVlQXRJbmRleChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuI2FycltpbmRleF0tLTtcclxuICAgICAgICB0aGlzLiN0b3RhbC0tO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jcmVtZW50IGNvdW50ZXIgdmFsdWUgYXQgc3BlY2lmaWMgaW5kZXggb2YgYXJyYXkgb2YgY291bnRlciB2YWx1ZXMuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIGluY3JlbWVudFZhbHVlQXRJbmRleChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuI2FycltpbmRleF0rKztcclxuICAgICAgICB0aGlzLiN0b3RhbCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByaXZhdGUgTWV0aG9kc1xyXG5cclxuICAgIC8qKiBTZXRzIHByaXZhdGUgZmllbGQgdG90YWwgdG8gZXF1YWwgc3VtIG9mIGFsbCBjb3VudGVyIHZhbHVlcyBpbiBhcnJheS4gKi9cclxuICAgICN1cGRhdGVUb3RhbCgpIHtcclxuICAgICAgICB0aGlzLiN0b3RhbCA9IHRoaXMuI2Fyci5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb3VudEFycmF5O1xyXG4iLCJpbXBvcnQgQ3V0U2VxdWVuY2UgZnJvbSBcIi4vY3V0U2VxdWVuY2VcIjtcclxuXHJcbi8qKiBTdG9yZXMgQ3V0U2VxdWVuY2VzIG9mIGEgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzLiAqL1xyXG5jbGFzcyBDdXRMaXN0IHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0N1dFNlcXVlbmNlW119IGN1dFNlcXVlbmNlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICAvKiogQXJyYXkgb2YgQ3V0U2VxdWVuY2VzIGZvciB0aGUgQ3V0TGlzdC4gKi9cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChjdXRTZXF1ZW5jZSkgPT4gKGN1dFNlcXVlbmNlIGluc3RhbmNlb2YgQ3V0U2VxdWVuY2UpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2xlYXJzIGFsbCBDdXRTZXF1ZW5jZXMgZnJvbSBDdXRMaXN0LCBtYWtpbmcgdGhlIEN1dExpc3QgZW1wdHkuICovXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGRzIG5ldyBDdXRTZXF1ZW5jZSB0byB0aGUgQ3V0TGlzdC4gKi9cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICBpZiAoIShjdXRTZXF1ZW5jZSBpbnN0YW5jZW9mIEN1dFNlcXVlbmNlKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMucHVzaChjdXRTZXF1ZW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHByaWNlIG9mIGFsbCBVbmN1dFBpZWNlcyBpbiB0aGUgQ3V0TGlzdC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlc1xyXG4gICAgICAgICAgICAucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLnVuY3V0UGllY2UucHJpY2UsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBuZXcgQ3V0TGlzdCB3aXRoIGRlZXAgY29weSBvZiBhcnJheSBvZiBDdXRTZXF1ZW5jZXMuXHJcbiAgICAgKiBAcmV0dXJucyB7Q3V0TGlzdH1cclxuICAgICAqL1xyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBDdXRMaXN0IGluc3RhbmNlXHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVc2Ugc3ByZWFkIHN5bnRheCB0byBkZWVwIGNvcHkgYXJyYXkgb2YgQ3V0U2VxdWVuY2VzIGZyb20gdGhpcyBcclxuICAgICAgICAgKiBDdXRMaXN0IHRvIHRoZSBuZXcgQ3V0TGlzdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcyA9IFsuLi50aGlzLmN1dFNlcXVlbmNlc107XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBuZXcgQ3V0TGlzdCBpbnN0YW5jZSB0aGF0IGhhcyBiZWVuIGR1cGxpY2F0ZWRcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgbWF0ZXJpYWwgbGlzdCBvZiB0aGUgQ3V0TGlzdCB3aXRoIFVuY3V0UGllY2VzIG5lZWRlZC5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG1hdGVyaWFsTGlzdE9ialxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gbWF0ZXJpYWxMaXN0T2JqW251bWJlcl0gLSBLZXlzIG9mIG9iamVjdCBhcmUgVW5jdXRQaWVjZSBsZW5ndGggYW5kIHZhbHVlcyBhcmUgYW5vdGhlciBvYmplY3Qgd2l0aCBpbmZvIGFib3V0IFVuY3V0UGllY2VcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IG1hdGVyaWFsTGlzdE9ialtudW1iZXJdLmNyb3NzU2VjdGlvblxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gbWF0ZXJpYWxMaXN0T2JqW251bWJlcl0udW5pdFByaWNlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBtYXRlcmlhbExpc3RPYmpbbnVtYmVyXS5xdWFudGl0eVxyXG4gICAgICovXHJcbiAgICBnZXRNYXRlcmlhbExpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0T2JqID0ge307XHJcblxyXG4gICAgICAgIC8vIEFkZCBVbmN1dFBpZWNlcyBmcm9tIGVhY2ggQ3V0U2VxdWVuY2UgaW4gdGhlIEN1dExpc3RcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBJZiBVbmN1dFBpZWNlIGxlbmd0aCBhbHJlYWR5IGluIG1hdGVyaWFsIGxpc3Qgb2JqZWN0LCBpbmNyZW1lbnQgcXVhbml0aXR5XHJcbiAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aCBpbiBtYXRlcmlhbExpc3RPYmopIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0ucXVhbnRpdHkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFbHNlIGFkZCBVbmN1dFBpZWNlIHRvIG1hdGVyaWFsIGxpc3Qgb2JqZWN0IHdpdGggcXVhbnRpdHkgb2YgMSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzU2VjdGlvbjogYCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS50aGlja25lc3N9eCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS53aWR0aH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmljZTogY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsTGlzdE9iajtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgSlNPTiBvYmplY3Qgb2YgdGhlIEN1dExpc3QuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmogLSBKU09OIG9iamVjdCBvZiB0aGUgQ3V0TGlzdFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSBvYmouY3V0U2VxdWVuY2VzIC0gQXJyYXkgb2YgSlNPTiBvYmplY3RzIG9mIGVhY2ggQ3V0U2VxdWVuY2UgaW4gdGhlIEN1dExpc3RcclxuICAgICAqL1xyXG4gICAgdG9Kc29uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGN1dFNlcXVlbmNlczogdGhpcy5jdXRTZXF1ZW5jZXNcclxuICAgICAgICAgICAgICAgIC5tYXAoKGN1dFNlcXVlbmNlKSA9PiBjdXRTZXF1ZW5jZS50b0pzb24oKSksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgQ3V0TGlzdCBnaXZlbiBKU09OIG9iamVjdCBvZiBhIEN1dExpc3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbk9iaiBcclxuICAgICAqIEByZXR1cm5zIHtDdXRMaXN0fVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlRnJvbUpzb24oanNvbk9iaikge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlcyA9IGpzb25PYmouY3V0U2VxdWVuY2VzXHJcbiAgICAgICAgICAgIC5tYXAoKGN1dFNlcXVlbmNlSnNvbikgPT4gQ3V0U2VxdWVuY2UuY3JlYXRlRnJvbUpzb24oY3V0U2VxdWVuY2VKc29uKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDdXRMaXN0KGN1dFNlcXVlbmNlcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dExpc3Q7XHJcbiIsImltcG9ydCBDdXRMaXN0IGZyb20gXCIuL2N1dExpc3QuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlIGZyb20gXCIuL3VuY3V0UGllY2UuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvclByb2dyZXNzIGZyb20gXCIuL2N1dExpc3RDYWxjdWxhdG9yUHJvZ3Jlc3MuanNcIjtcclxuaW1wb3J0IE5lc3RlZExvb3BDb3VudGVyIGZyb20gXCIuL25lc3RlZExvb3BDb3VudGVyLmpzXCI7XHJcbmltcG9ydCBDb3VudEFycmF5IGZyb20gXCIuL2NvdW50QXJyYXkuanNcIjtcclxuaW1wb3J0IHsgY3JlYXRlRHVyYXRpb25TdHJpbmcgfSBmcm9tIFwiLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbi8qKiBNb2R1bGUgdG8gY2FsY3VsYXRlIGNoZWFwZXN0IGN1dCBsaXN0LiAqL1xyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gY3Vyck51bUF2YWlsYWJsZVVuY3V0TGVuZ3RocyBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IG1heE51bUF2YWlsYWJsZVVuY3V0TGVuZ3RocyBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcclxuICAgICAqIEByZXR1cm5zIHtpbmRleHxudWxsfSBJbmRleCBvZiBhdmFpbGFibGUgVW5jdXRQaWVjZSBsZW5ndGggdGhhdCB3YXMgZGVjcmVtZW50ZWQgT1IgbnVsbCBpZiBjYW5ub3QgZGVjcmVtZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudChjdXJyTnVtQXZhaWxhYmxlVW5jdXRMZW5ndGhzLCBtYXhOdW1BdmFpbGFibGVVbmN1dExlbmd0aHMsIGluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIElmIHJlYWNoZWQgZW5kLCBjYW5ub3QgZGVjcmVtZW50IGFueSBtb3JlLiBSZXR1cm4gbnVsbC5cclxuICAgICAgICBpZiAoaW5kZXggPj0gY3Vyck51bUF2YWlsYWJsZVVuY3V0TGVuZ3Rocy5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgLy8gRGVjcmVtZW50IGN1cnJlbnQgY291bnQgYXQgaW5kZXhcclxuICAgICAgICBjdXJyTnVtQXZhaWxhYmxlVW5jdXRMZW5ndGhzW2luZGV4XS0tO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElmIGN1cnJlbnQgY291bnQgYXQgaW5kZXggKGFmdGVyIGRlY3JlbWVudGluZykgaXMgbGVzcyB0aGFuIHplcm8sIFxyXG4gICAgICAgICAqIG5lZWQgdG8gZGVjcmVtZW50IG5leHQgaW5kZXguXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGN1cnJOdW1BdmFpbGFibGVVbmN1dExlbmd0aHNbaW5kZXhdIDwgMCkge1xyXG4gICAgICAgICAgICAvLyBTZXQgY291bnQgYXQgaW5kZXggdG8gemVyb1xyXG4gICAgICAgICAgICBjdXJyTnVtQXZhaWxhYmxlVW5jdXRMZW5ndGhzW2luZGV4XSA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBkZWNyZW1lbnQgY291bnQgYXQgbmV4dCBpbmRleFxyXG4gICAgICAgICAgICByZXR1cm4gZGVjcmVtZW50KGN1cnJOdW1BdmFpbGFibGVVbmN1dExlbmd0aHMsIG1heE51bUF2YWlsYWJsZVVuY3V0TGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBjaGVhcGVzdCBjdXQgbGlzdHMgd2l0aCBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzIG9mIGRpZmZlcmVudCBkaW1lbnNpb25zXHJcbiAgICAgKiBAcGFyYW0ge0N1dFBpZWNlW119IGN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZVtdfSB1bmN1dFBpZWNlc1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvZ3Jlc3NDYWxsYmFja1xyXG4gICAgICogQHJldHVybnMge0N1dExpc3RbXX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdHMoY3V0UGllY2VzLCB1bmN1dFBpZWNlcywgcHJvZ3Jlc3NDYWxsYmFjayA9IGNvbnNvbGUubG9nKSB7XHJcbiAgICAgICAgLyoqIE9iamVjdCB0byBzb3J0IEN1dFBpZWNlcy9VbmN1dFBpZWNlcyBieSB0aGUgc2FtZSBjcm9zcy1zZWN0aW9uIGRpbWVuc2lvbnMuICovXHJcbiAgICAgICAgY29uc3QgcGllY2VzID0ge307XHJcblxyXG4gICAgICAgIC8qKiBBcnJheSBvZiBDdXRMaXN0cyBjYWxjdWxhdGVkIGZvciBlYWNoIGNyb3NzLXNlY3Rpb24uICovXHJcbiAgICAgICAgY29uc3QgY3V0TGlzdHMgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqIFRpbWUgdGhhdCBjdXQgbGlzdCBjYWxjdWxhdGlvbiBiZWdhbi4gKi9cclxuICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCBtYXRjaGluZyBkaW1lbnNpb25zIG9mIEN1dFBpZWNlcyBhbmQgVW5jdXRQaWVjZXMgdG9nZXRoZXJcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhhbXBsZSBvZiBwaWVjZXMgb2JqZWN0OlxyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgIDI6IHtcclxuICAgICAgICAgKiAgICAgNDoge1xyXG4gICAgICAgICAqICAgICAgIGN1dDogW10sICAgLT4gMng0IGN1dFBpZWNlc1xyXG4gICAgICAgICAqICAgICAgIHVuY3V0OiBbXSwgLT4gMng0IHVuY3V0UGllY2VzXHJcbiAgICAgICAgICogICAgIH0sXHJcbiAgICAgICAgICogICB9LFxyXG4gICAgICAgICAqICAgNDoge1xyXG4gICAgICAgICAqICAgICA0OiB7XHJcbiAgICAgICAgICogICAgICAgY3V0OiBbXSwgICAtPiA0eDQgY3V0UGllY2VzXHJcbiAgICAgICAgICogICAgICAgdW5jdXQ6IFtdLCAtPiA0eDQgdW5jdXRQaWVjZXNcclxuICAgICAgICAgKiAgICAgfSxcclxuICAgICAgICAgKiAgIH0sXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvLyBDdXRQaWVjZXMgc29ydFxyXG4gICAgICAgIGN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0dGVyIGN1dFdpdGhLZXJmIGlzIE5PVCBpbmNsdWRlZCBpZiBjdXRQaWVjZSBwYXNzZWQgdG8gd29ya2VyLlxyXG4gICAgICAgICAgICAgKiBTZXQgcHJvdG90eXBlIHRvIEN1dFBpZWNlIGlmIE5PVCBpbmNsdWRlZC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChjdXRQaWVjZS5jdXRXaXRoS2VyZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY3V0UGllY2UsIEN1dFBpZWNlLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIG5ldyB0aGlja25lc3MgaW4gcGllY2VzIG9iamVjdCwgYWRkIGtleSBlcXVhbCB0byB0aGlja25lc3NcclxuICAgICAgICAgICAgaWYgKCEoY3V0UGllY2UudGhpY2tuZXNzIGluIHBpZWNlcykpIHtcclxuICAgICAgICAgICAgICAgIHBpZWNlc1tjdXRQaWVjZS50aGlja25lc3NdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJZiBuZXcgd2lkdGggd2l0aCB0aGlja25lc3MgaW4gcGllY2VzIG9iamVjdCwgYWRkIGtleSBlcXVhbCB0byBcclxuICAgICAgICAgICAgICogd2lkdGggaW5zaWRlIHRoaWNrbmVzcyBrZXkgb2JqZWN0LlxyXG4gICAgICAgICAgICAgKiBUaGVuIGFkZCBvYmplY3QgdG8gaG9sZCBhbGwgbWF0Y2hpbmcgQ3V0UGllY2VzIGFuZCBVbmN1dCBQaWVjZXMgXHJcbiAgICAgICAgICAgICAqIGFzIHRoZSB2YWx1ZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmICghKGN1dFBpZWNlLndpZHRoIGluIHBpZWNlc1tjdXRQaWVjZS50aGlja25lc3NdKSkge1xyXG4gICAgICAgICAgICAgICAgcGllY2VzW2N1dFBpZWNlLnRoaWNrbmVzc11bY3V0UGllY2Uud2lkdGhdID0ge2N1dDogW10sIHVuY3V0OiBbXX07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFB1c2ggY3VycmVudCBDdXRQaWVjZSB0byBtYXRjaGluZyB0aGlja25lc3MgYW5kIHdpZHRoIGluIHBpZWNlcyBvYmplY3RcclxuICAgICAgICAgICAgcGllY2VzW2N1dFBpZWNlLnRoaWNrbmVzc11bY3V0UGllY2Uud2lkdGhdLmN1dC5wdXNoKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVW5jdXRQaWVjZXMgc29ydFxyXG4gICAgICAgIHVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgLy8gSWYgbmV3IHRoaWNrbmVzcyBpbiBwaWVjZXMgb2JqZWN0LCBhZGQga2V5IGVxdWFsIHRvIHRoaWNrbmVzc1xyXG4gICAgICAgICAgICBpZiAoISh1bmN1dFBpZWNlLnRoaWNrbmVzcyBpbiBwaWVjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwaWVjZXNbdW5jdXRQaWVjZS50aGlja25lc3NdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJZiBuZXcgd2lkdGggd2l0aCB0aGlja25lc3MgaW4gcGllY2VzIG9iamVjdCwgYWRkIGtleSBlcXVhbCB0byBcclxuICAgICAgICAgICAgICogd2lkdGggaW5zaWRlIHRoaWNrbmVzcyBrZXkgb2JqZWN0LlxyXG4gICAgICAgICAgICAgKiBUaGVuIGFkZCBvYmplY3QgdG8gaG9sZCBhbGwgbWF0Y2hpbmcgQ3V0UGllY2VzIGFuZCBVbmN1dCBQaWVjZXMgXHJcbiAgICAgICAgICAgICAqIGFzIHRoZSB2YWx1ZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmICghKHVuY3V0UGllY2Uud2lkdGggaW4gcGllY2VzW3VuY3V0UGllY2UudGhpY2tuZXNzXSkpIHtcclxuICAgICAgICAgICAgICAgIHBpZWNlc1t1bmN1dFBpZWNlLnRoaWNrbmVzc11bdW5jdXRQaWVjZS53aWR0aF0gPSB7Y3V0OiBbXSwgdW5jdXQ6IFtdfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUHVzaCBjdXJyZW50IFVuY3V0UGllY2UgdG8gbWF0Y2hpbmcgdGhpY2tuZXNzIGFuZCB3aWR0aCBpbiBwaWVjZXMgb2JqZWN0XHJcbiAgICAgICAgICAgIHBpZWNlc1t1bmN1dFBpZWNlLnRoaWNrbmVzc11bdW5jdXRQaWVjZS53aWR0aF0udW5jdXQucHVzaCh1bmN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVE9ETzogQ2hlY2sgaWYgYW55IHRoaWNrbmVzcy13aWR0aCBoYXMgZW1wdHkgQ3V0UGllY2VzIG9yIFVuY3V0UGllY2VzIGFycmF5LlxyXG4gICAgICAgICAqIENvdWxkIHJldHVybiBvYmplY3Qgd2l0aCBzdWNjZXNzIGJvb2xlYW4gYW5kIGVycm9yIG1lc3NhZ2UgaWYgc3VjY2VzcyBpcyBmYWxzZS5cclxuICAgICAgICAgKiBOZWVkIHRvIHJldHVybiBzYW1lIHN1Y2Nlc3MgYm9vbGVhbiBhbmQgbWVzc2FnZSBrZXlzIGluIG9iamVjdCBpZiBjdXRsaXN0cyBhcmVcclxuICAgICAgICAgKiByZXR1cm5lZC5cclxuICAgICAgICAgKiBDb3VsZCBpbnN0ZWFkIGNoZWNrIGluc2lkZSBnZXRDaGVhcGVzdEN1dExpc3QgbWV0aG9kIGFuZCByZXR1cm4gZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAqIGluc3RlYWQgb2YgYSBDdXRMaXN0LlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvLyBGaW5kIGNoZWFwZXN0IGN1dCBsaXN0IGZvciBlYWNoIGNyb3NzIHNlY3Rpb25cclxuICAgICAgICBsZXQgY3VyckN1dExpc3Q7XHJcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhwaWVjZXMpLmZvckVhY2goKHBpZWNlVGhpY2tuZXNzT2JqKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC52YWx1ZXMocGllY2VUaGlja25lc3NPYmopLmZvckVhY2goKHBpZWNlT2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBGaW5kIGN1dCBsaXN0IGZvciBjdXJyZW50IGNyb3NzIHNlY3Rpb25cclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0ID0gZ2V0Q2hlYXBlc3RDdXRMaXN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlT2JqLmN1dCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcGllY2VPYmoudW5jdXQsIFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogSWYgY3V0IGxpc3Qgd2FzIGZvdW5kIChOT1QgdW5kZWZpbmVkKSwgcHVzaCB0byBhcnJheSBvZiBjdXQgXHJcbiAgICAgICAgICAgICAgICAgKiBsaXN0cyBmb3Igb3RoZXIgY3Jvc3Mgc2VjdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyQ3V0TGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0TGlzdHMucHVzaChjdXJyQ3V0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBQYXNzIGNvbXBsZXRpb24gbWVzc2FnZSB0byBwcm9ncmVzc0NhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayhgQ29tcGxldGVkIGluICR7Y3JlYXRlRHVyYXRpb25TdHJpbmcoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSl9YCk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBhcnJheSBvZiBjaGVhcGVzdCBjdXQgbGlzdHMgZm9yIGVhY2ggY3Jvc3Mgc2VjdGlvblxyXG4gICAgICAgIHJldHVybiBjdXRMaXN0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGNoZWFwZXN0IEN1dExpc3Qgd2l0aCBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzIG9mIHRoZSBzYW1lIGRpbWVuc2lvblxyXG4gICAgICogQHBhcmFtIHtDdXRQaWVjZVtdfSBjdXRQaWVjZXMgLSBBcnJheSBvZiBjdXRQaWVjZXMgd2l0aCBzYW1lIGRpbWVuc2lvblxyXG4gICAgICogQHBhcmFtIHtVbmN1dFBpZWNlW119IHVuY3V0UGllY2VzIC0gQXJyYXkgb2YgdW5jdXRQaWVjZXMgd2l0aCBtYXRjaGluZyBkaW1lbnNpb24gb2YgY3V0UGllY2VzXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9ncmVzc0NhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Q3V0TGlzdHx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzLCBwcm9ncmVzc0NhbGxiYWNrID0gY29uc29sZS5sb2cpIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgZWl0aGVyIEN1dFBpZWNlcyBvciBVbmN1dFBpZWNlcyBhcnJheXMgYXJlIGVtcHR5XHJcbiAgICAgICAgaWYgKChjdXRQaWVjZXMubGVuZ3RoID09PSAwKSB8fCAodW5jdXRQaWVjZXMubGVuZ3RoID09PSAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGltZSB0aGF0IGN1cnJlbnQgY3V0IGxpc3QgY2FsY3VsYXRpb24gYmVnYW4uICovXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU29ydCBjdXRQaWVjZXMgYnkgY3V0IGxlbmd0aCBpbiBERVNDRU5ESU5HIG9yZGVyIHNvIGxhcmdlc3QgXHJcbiAgICAgICAgICogQ3V0UGllY2VzIGFyZSB1c2VkIGZpcnN0IHRvIGZpbGwgYW55IHJlbWFpbmluZyBsZW5ndGggb2YgYW4gXHJcbiAgICAgICAgICogVW5jdXRQaWVjZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU29ydCB1bmN1dFBpZWNlcyBieSBsZW5ndGggaW4gQVNDRU5ESU5HIG9yZGVyIHNvIHNtYWxsZXN0XHJcbiAgICAgICAgICogVW5jdXRQaWVjZXMgYXJlIGZpbGxlZCBmaXJzdCB3aXRoIEN1dFBpZWNlcy4gVGhpcyBwcmV2ZW50cyBhbnkgXHJcbiAgICAgICAgICogQ3V0UGllY2Ugd2l0aCBleGFjdCBsZW5ndGggb2YgVW5jdXRQaWVjZSB0byBiZSB1c2VkIHRvIGZpbGwgYSBsYXJnZXIgXHJcbiAgICAgICAgICogVW5jdXRQaWVjZS4gKGV4LiA3JyBDdXRQaWVjZSBzaG91bGQgaWRlYWxseSBmaWxsIGEgNycgVW5jdXRQaWVjZSBcclxuICAgICAgICAgKiBpbnN0ZWFkIG9mIGJlaW5nIHVzZWQgdG8gZmlsbCBhIDgnIG9yIGxhcmdlciBVbmN1dFBpZWNlLilcclxuICAgICAgICAgKi9cclxuICAgICAgICB1bmN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGEubGVuZ3RoIC0gYi5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvKiogQXJyYXkgb2YgQ3V0UGllY2UgcXVhbnRpdGllcyB0aGUgc2FtZSBvcmRlciBhcyBDdXRQaWVjZSBhcnJheS4gKi9cclxuICAgICAgICBjb25zdCBjdXRQaWVjZVF1YW50aXRpZXMgPSBjdXRQaWVjZXNcclxuICAgICAgICAgICAgLm1hcCgoY3V0UGllY2UpID0+IGN1dFBpZWNlLnF1YW50aXR5KTtcclxuICAgICAgICBcclxuICAgICAgICAvKiogVG90YWwgY3VtdWxhdGl2ZSBsZW5ndGggb2YgYWxsIGluZGl2aWR1YWwgQ3V0UGllY2VzLiAqL1xyXG4gICAgICAgIGNvbnN0IGluZGl2aWR1YWxDdXRQaWVjZXNUb3RhbExlbmd0aCA9IGN1dFBpZWNlc1xyXG4gICAgICAgICAgICAucmVkdWNlKChhY2N1bSwgY3V0UGllY2UpID0+IGFjY3VtICsgY3V0UGllY2UubGVuZ3RoLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUd28gaW5kaWNlIGFycmF5IHdoZXJlIGZpcnN0IGluZGV4IGlzIHN1Yi1hcnJheSBvZiBDdXRQaWVjZXMgY3V0IFxyXG4gICAgICAgICAqIGZyb20gYW4gVW5jdXRQaWVjZSBhbmQgc2Vjb25kIGluZGV4IGlzIGFueSByZW1haW5pbmcgbGVuZ3RoIGxlZnRvdmVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQ3VycmVudCBDdXRMaXN0IGNhbGN1bGF0ZWQgaW4gbG9vcCB0aGF0IGlzIGNvbXBhcmVkIHRvIGJlc3QgQ3V0TGlzdC4gKi9cclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICAvKiogQmVzdCBDdXRMaXN0IGNhbGN1bGF0ZWQuICovXHJcbiAgICAgICAgbGV0IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOZXN0ZWRMb29wQ291bnRlciBmb3IgdGhlIG51bWJlciBvZiBjdXJyZW50L21heGltdW0gYXZhaWxhYmxlIFVuY3V0UGllY2VzLlxyXG4gICAgICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGVhY2ggYXZhaWxhYmxlIGxlbmd0aHMgbmVlZGVkIGlmIG9ubHkgdXNlZCB0aGF0IFxyXG4gICAgICAgICAqIGF2YWlsYWJsZSBsZW5ndGggZm9yIGFsbCBjdXRQaWVjZXMgKGluaXRpYWxpemVkIHRvIHplcm8pLlxyXG4gICAgICAgICAqIEN1cnJlbnQgbnVtYmVyIG9mIGVhY2ggYXZhaWxhYmxlIGxlbmd0aHMgaW4gbG9vcCB0byBjcmVhdGUgY3V0IGxpc3QgXHJcbiAgICAgICAgICogKGluaXRpYWxpemVkIHRvIHplcm8pLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCBudW1BdmFpbGFibGVVbmN1dFBpZWNlc05MQyA9IG5ldyBOZXN0ZWRMb29wQ291bnRlcih1bmN1dFBpZWNlcy5sZW5ndGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBDdXJyZW50IGNvdW50IG9mIGVhY2ggQ3V0UGllY2Ugbm90IHlldCBhc3NpZ25lZCB0byBhIEN1dFNlcXVlbmNlLiAqL1xyXG4gICAgICAgIGxldCBjdXJyQ3V0UGllY2VRdWFudGl0aWVzID0gbmV3IENvdW50QXJyYXkoKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFzcyBwcm9ncmVzcyBtZXNzYWdlIHN0cmluZyBhYm91dCBmaW5kaW5nIG1heGltdW0gVW5jdXRQaWVjZSBcclxuICAgICAgICAgKiBxdWFudGl0aWVzIGludG8gcHJvZ3Jlc3MgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjaygnRmluZGluZyBtYXhpbXVtIFVuY3V0IHF1YW50aXRpZXMgdG8gdGVzdC4nKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZvciBlYWNoIFVuY3V0UGllY2UsIGZpbmQgbWF4aW11bSBxdWFudGl0eSBuZWVkZWQgdG8gZ2V0IGFsbCBcclxuICAgICAgICAgKiBpbmRpdmlkdWFsIEN1dFBpZWNlcyBleGNsdWRpbmcgYW55IEN1dFBpZWNlcyB0aGF0IGFyZSB0b28gbG9uZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmVzZXQgY3VycmVudCBjb3VudCBhcnJheSBvZiBlYWNoIEN1dFBpZWNlIHRvIGVxdWFsIGVhY2ggXHJcbiAgICAgICAgICAgICAqIEN1dFBpZWNlIHF1YW50aXR5IGZvciBuZXcgbG9vcC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGN1cnJDdXRQaWVjZVF1YW50aXRpZXMuc2V0KFsgLi4uY3V0UGllY2VRdWFudGl0aWVzIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRmluZCBjdXQgc2VxdWVuY2VzIG9mIEN1dFBpZWNlcyB1c2luZyBqdXN0IGN1cnJlbnQgVW5jdXRQaWVjZXNcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnJDdXRQaWVjZVF1YW50aXRpZXMudG90YWwgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogR2V0IGN1dCBzZXF1ZW5jZSBhcyBhcnJheSBvZiBDdXRQaWVjZXMgYW5kIHJlbWFpbmluZyBsZW5ndGguIFxyXG4gICAgICAgICAgICAgICAgICogQ291bnRBcnJheSBjdXJyQ3V0UGllY2VRdWFudGl0aWVzIHdpbGwgYmUgdXBkYXRlZCB3aGVuZXZlciBhIFxyXG4gICAgICAgICAgICAgICAgICogQ3V0UGllY2UgaXMgc2VsZWN0ZWQgZm9yIHRoZSBjdXQgc2VxdWVuY2UuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICAgICAgdW5jdXRQaWVjZS5sZW5ndGgsIFxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckN1dFBpZWNlUXVhbnRpdGllc1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBJZiBubyBDdXRQaWVjZXMgYXJyYXkgcmV0dXJuZWQgaW4gY3V0IHNlcXVlbmNlLCBubyBtb3JlIFxyXG4gICAgICAgICAgICAgICAgICogQ3V0UGllY2VzIGNhbiBiZSB1c2VkLiBCcmVhayB3aGlsZSBsb29wLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnJbMF0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBuZXcgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0IHVzaW5nIGN1dCBzZXF1ZW5jZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgLi4uY3V0U2VxdWVuY2VBcnIpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggcXVhbnRpdHkgb2YgY29ycmVzcG9uZGluZyBVbmN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICBudW1BdmFpbGFibGVVbmN1dFBpZWNlc05MQy5tYXhbaW5kZXhdKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVjayBpZiBjdXJyZW50IEN1dExpc3QgaGFzIGxlc3MgcHJpY2UgdGhhbiB0aGUgYmVzdCBDdXRMaXN0IFxyXG4gICAgICAgICAgICAgKiBvbmx5IGlmIE5PIGF2YWlsYWJsZSBDdXRQaWVjZXMgc3RpbGwgbGVmdC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIChjdXJyQ3V0UGllY2VRdWFudGl0aWVzLnRvdGFsID09PSAwKVxyXG4gICAgICAgICAgICAgICAgJiYgKChiZXN0Q3V0TGlzdCA9PT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogVHJpZ2dlciB1c2VkIHRvIHNraXAgb3IgaW5jcmVtZW50IG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDIG9yIFxyXG4gICAgICAgICAqIGV2ZW4gYSBjb25kaXRpb24gdG8gc2hvdyB3aGVuIG5vIG1vcmUgbmVzdGVkIGxvb3AgY291bnQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN0b3JlcyByZXN1bHQgb2YgZGVjcmVtZW50IG1ldGhvZC4gSW5kZXggb2YgYXZhaWxhYmxlIFVuY3V0UGllY2UgXHJcbiAgICAgICAgICogbGVuZ3RoIHRoYXQgd2FzIGluY3JlbWVudGVkIE9SIG51bGwgaWYgY2Fubm90IGRlY3JlbWVudC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgZGVjcmVtZW50VHJpZ2dlcjtcclxuXHJcbiAgICAgICAgLyoqIFN0b3JlcyB0ZW1wb3JhcnkgY29weSBvZiBjdXJyZW50IFVuY3V0UGllY2VzIGNvdW50cyBmcm9tIG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLiAqL1xyXG4gICAgICAgIGxldCB0ZW1wQ3Vyck51bUF2YWlsYWJsZVVuY3V0UGllY2VzQ291bnRlcjtcclxuXHJcbiAgICAgICAgLyoqIFByaWNlIG9mIGN1cnJlbnQgY29tYmluYXRpb24gb2YgVW5jdXRQaWVjZXMgZHVyaW5nIGxvb3AuICovXHJcbiAgICAgICAgbGV0IGN1cnJOdW1BdmFpbGFibGVVbmN1dExlbmd0aHNUb3RhbFByaWNlO1xyXG5cclxuICAgICAgICAvKiogRmxhZyB0byBza2lwIHJlbWFpbmluZyByZW1haW5pbmcgY29sdW1uIG9mIFVuY3V0UGllY2UgY29tYmluYXRpb25zIGlmIHRydWUuICovXHJcbiAgICAgICAgbGV0IHNraXBGbGFnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBwcm9ncmVzcyBiYXIgbWF4IGNvdW50IChtYXggY29tYmluYXRpb25zIG9mIFVuY3V0UGllY2VzKVxyXG4gICAgICAgIGN1dExpc3RDYWxjdWxhdG9yUHJvZ3Jlc3Muc2V0TWF4Q291bnQoXHJcbiAgICAgICAgICAgIG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLmdldE1heENvdW50KClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBTZXQgcHJvZ3Jlc3MgYmFyIHByb2dyZXNzIGNhbGxiYWNrXHJcbiAgICAgICAgY3V0TGlzdENhbGN1bGF0b3JQcm9ncmVzcy5zZXRQcm9ncmVzc0NhbGxiYWNrKHByb2dyZXNzQ2FsbGJhY2spO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGV2ZXJ5IGl0ZXJhdGlvbi9jb21iaW5hdGlvbiBvZiBVbmN1dFBpZWNlIHF1YW50aXRpZXMgZm9yIGJlc3QgQ3V0TGlzdFxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgLy8gU2V0IHByb2dyZXNzIGJhciBjdXJyZW50IGNvdW50IChjdXJyZW50IGNvbWJpbmF0aW9ucyB0cmF2ZXJzZWQgc28gZmFyKVxyXG4gICAgICAgICAgICBjdXRMaXN0Q2FsY3VsYXRvclByb2dyZXNzLnNldENvdW50KFxyXG4gICAgICAgICAgICAgICAgbnVtQXZhaWxhYmxlVW5jdXRQaWVjZXNOTEMuZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudCgpLFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgc2tpcEZsYWcgZm9yIGN1cnJlbnQgbG9vcCBpbiBjYXNlIGl0IHdhcyB0cmlnZ2VyZWQgbGFzdCBsb29wXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIHByaWNlIG9mIGN1cnJlbnQgY29tYmluYXRpb24gb2YgVW5jdXRQaWVjZXMgb2YgY3VycmVudCBsb29wXHJcbiAgICAgICAgICAgIGN1cnJOdW1BdmFpbGFibGVVbmN1dExlbmd0aHNUb3RhbFByaWNlID0gbnVtQXZhaWxhYmxlVW5jdXRQaWVjZXNOTEMuY3VyclxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIsIGluZGV4KSA9PiBhY2N1bSArIHVuY3V0UGllY2VzW2luZGV4XS5wcmljZSAqIGN1cnIsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIElmIGN1cnJlbnQgY29tYmluYXRpb24gb2YgVW5jdXRQaWVjZXMgaGFzIHRvdGFsIHByaWNlIFxyXG4gICAgICAgICAgICAgKiBtb3JlIHRoYW4gY3VycmVudCBiZXN0IGN1dCBsaXN0LCBzZXQgc2tpcEZsYWcgdG8gdHJ1ZSB0byBza2lwIFxyXG4gICAgICAgICAgICAgKiBjaGVja2luZyBtb3JlIG9mIGN1cnJlbnQgVW5jdXRQaWVjZSBzaW5jZSBpdCB3aWxsIGFsd2F5cyBiZSBcclxuICAgICAgICAgICAgICogbW9yZSBleHBlbnNpdmUuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAoYmVzdEN1dExpc3QgIT09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoY3Vyck51bUF2YWlsYWJsZVVuY3V0TGVuZ3Roc1RvdGFsUHJpY2UgPj0gYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBza2lwRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJZiB6ZXJvIFVuY3V0UGllY2VzIHRvIHVzZSwgc2tpcC5cclxuICAgICAgICAgICAgICogSWYgb25seSBvbmUgVW5jdXRQaWVjZSB0eXBlIHRvIHVzZSwgYWxyZWFkeSBjaGVja2VkIHRob3NlIGNhc2VzIFxyXG4gICAgICAgICAgICAgKiBwcmV2aW91c2x5IHdoZW4gZmluZGluZyBtYXhpbXVtIFVuY3V0UGllY2UgcXVhbnRpdHkgY291bnRzLlxyXG4gICAgICAgICAgICAgKiBJZiBsZW5ndGggb2YgYWxsIFVuY3V0UGllY2VzIGlzIGxlc3MgdGhhbiBsZW5ndGggb2YgYWxsIEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgICAqIHNraXAgc2luY2Ugbm90IGVub3VnaCBtYXRlcmlhbC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgKG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLmN1cnIuZmlsdGVyKChjb3VudCkgPT4gY291bnQgPiAwKS5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgJiYgKG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLmN1cnIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXNUb3RhbExlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIENyZWF0ZSBjb3B5IG9mIG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDIGN1cnJlbnQgYXJyYXkgdG8gXHJcbiAgICAgICAgICAgICAgICAgKiBjaGFuZ2Ugd2l0aG91dCBtb2RpeWluZyBvcmlnaW5hbC5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJOdW1BdmFpbGFibGVVbmN1dFBpZWNlc0NvdW50ZXIgPSBbIC4uLm51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLmN1cnIgXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBSZXNldCBjdXJyZW50IGNvdW50IGFycmF5IG9mIGVhY2ggQ3V0UGllY2UgdG8gZXF1YWwgZWFjaCBcclxuICAgICAgICAgICAgICAgICAqIEN1dFBpZWNlIHF1YW50aXR5IGZvciBuZXcgbG9vcC5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY3VyckN1dFBpZWNlUXVhbnRpdGllcy5zZXQoWyAuLi5jdXRQaWVjZVF1YW50aXRpZXMgXSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmluZCBjdXQgc2VxdWVuY2VzIG9mIEN1dFBpZWNlcyB1c2luZyBqdXN0IGN1cnJlbnQgVW5jdXRQaWVjZXNcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogSVNTVUU6IFVuY3V0UGllY2UgY291bnRlciBhcnJheSBpcyBkZWNyZW1lbnRlZCBiZWZvcmUgZmlyc3QgXHJcbiAgICAgICAgICAgICAgICAgKiBjb21iaW5hdGlvbiBpcyB0ZXN0ZWQuIFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogRGVjcmVtZW50IGF2YWlsYWJsZSBVbmN1dFBpZWNlcyBjb3VudGVycyB0byB0cnkgbmV3IFxyXG4gICAgICAgICAgICAgICAgICAgICAqIGNvbWJpbmF0aW9uIG9mIFVuY3V0UGllY2VzIGNvdW50cy4gXHJcbiAgICAgICAgICAgICAgICAgICAgICogSWYgZGVjcmVtZW50IHRyaWdnZXIgaXMgbnVsbCwgYXJyYXkgY2Fubm90IGJlIGRlY3JlbWVudGVkIFxyXG4gICAgICAgICAgICAgICAgICAgICAqIGZ1cnRoZXIuIEJyZWFrIG91dCBvZiBsb29wIFxyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcEN1cnJOdW1BdmFpbGFibGVVbmN1dFBpZWNlc0NvdW50ZXIsIG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLm1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlY3JlbWVudFRyaWdnZXIgPT09IG51bGwpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogR2V0IGN1dCBzZXF1ZW5jZSBhcyBhcnJheSBvZiBDdXRQaWVjZXMgYW5kIHJlbWFpbmluZyBsZW5ndGguIFxyXG4gICAgICAgICAgICAgICAgICAgICAqIENvdW50QXJyYXkgY3VyckN1dFBpZWNlUXVhbnRpdGllcyB3aWxsIGJlIHVwZGF0ZWQgd2hlbmV2ZXIgYSBcclxuICAgICAgICAgICAgICAgICAgICAgKiBDdXRQaWVjZSBpcyBzZWxlY3RlZCBmb3IgdGhlIGN1dCBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXRQaWVjZXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyQ3V0UGllY2VRdWFudGl0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLCAuLi5jdXRTZXF1ZW5jZUFycilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoY3VyckN1dFBpZWNlUXVhbnRpdGllcy50b3RhbCAhPT0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIGF2YWlsYWJsZSBDdXRQaWVjZXMsIG5vdCBlbm91Z2ggVW5jdXRQaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyckN1dFBpZWNlUXVhbnRpdGllcy50b3RhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGN1cnJlbnQgY3V0IGxpc3QgaXMgdmFsaWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogU2V0IHNraXBGbGFnIHRvIHRydWUgdG8gc2tpcCBjaGVja2luZyBtb3JlIG9mIGN1cnJlbnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICogVW5jdXRQaWVjZSBzaW5jZSBpdCB3aWxsIGFsd2F5cyBiZSBtb3JlIGV4cGVuc2l2ZS5cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBza2lwRmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIEN1cnJlbnQgY3V0IGxpc3QgaXMgYmV0dGVyIGlmIE5PIHVudXNlZCB1bmN1dCBwaWVjZXMgXHJcbiAgICAgICAgICAgICAgICAgICAgICogKHRlbXBDdXJyTnVtQXZhaWxhYmxlVW5jdXRQaWVjZXNDb3VudGVyIGhhcyBhbGwgemVybyBcclxuICAgICAgICAgICAgICAgICAgICAgKiB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYmVzdEN1dExpc3QgPT09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0ZW1wQ3Vyck51bUF2YWlsYWJsZVVuY3V0UGllY2VzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIElmIHNraXBGbGFnIGlzIHRydWUsIHNraXAgcmVzdCBvZiBjdXJyZW50IFVuY3V0UGllY2UgaW5kZXggbG9vcC4gXHJcbiAgICAgICAgICAgICAqIEVsc2Ugc2ltcGx5IGluY3JlbWVudC4gSWYgaW5jcmVtZW50VHJpZ2dlciBpcyBudWxsLCBhbGwgY29tYmluYXRpb25zXHJcbiAgICAgICAgICAgICAqIGhhdmUgYmVlbiB0ZXN0ZWQuIEJyZWFrIGxvb3AuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gKHNraXBGbGFnKSBcclxuICAgICAgICAgICAgICAgID8gbnVtQXZhaWxhYmxlVW5jdXRQaWVjZXNOTEMuc2tpcCgpXHJcbiAgICAgICAgICAgICAgICA6IG51bUF2YWlsYWJsZVVuY3V0UGllY2VzTkxDLmluY3JlbWVudCgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7YmVzdEN1dExpc3QuZ2V0UHJpY2UoKX1gKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29tcGxldGVkIGluICR7Y3JlYXRlRHVyYXRpb25TdHJpbmcoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSl9YCk7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgICAgICBnZXRDdXRMaXN0cyxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiaW1wb3J0IHsgYWRkQ29tbWFzVG9OdW1iZXIsIGNyZWF0ZUR1cmF0aW9uU3RyaW5nIH0gZnJvbSBcIi4vdXRpbGl0aWVzLmpzXCI7XHJcbmltcG9ydCBMZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwgZnJvbSBcIi4vbGVhc3RTcXVhcmVzRml0dGluZ0V4cG9uZW50aWFsLmpzXCI7XHJcblxyXG4vKipcclxuICogTW9kdWxlIHRvIHRyYWNrIHByb2dyZXNzIG9mIGtub3duIG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCBkaXNwbGF5IHVwZGF0ZXMgXHJcbiAqIG9mIGN1cnJlbnQgcHJvZ3Jlc3MuXHJcbiAqL1xyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvclByb2dyZXNzID0gKCgpID0+IHtcclxuICAgIC8qKiBOdW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgdG8gZGlzcGxheSBhcyBwZXJjZW50YWdlLiAqL1xyXG4gICAgY29uc3QgZGVjaW1hbERpZ2l0c1RvRGlzcGxheSA9IDM7XHJcblxyXG4gICAgLyoqIER1cmF0aW9uLCBpbiBtaWxsaXNlY29uZHMsIGJldHdlZW4gcGFzc2luZyBwcm9ncmVzcyBzdHJpbmcgdG8gY2FsbGJhY2suICovXHJcbiAgICBjb25zdCB1cGRhdGVJbnRlcnZhbCA9IDEwMDAwO1xyXG5cclxuICAgIC8qKiBDdXJyZW50IG51bWJlciBvZiBpdGVyYXRpb25zIG9mIHByb2dyZXNzLiAqL1xyXG4gICAgbGV0IGN1cnJDb3VudCA9IDA7XHJcblxyXG4gICAgLyoqIE1heGltdW0gbnVtYmVyIG9mIGl0ZXJhdGlvbnMgb2YgcHJvZ3Jlc3MuICovXHJcbiAgICBsZXQgbWF4Q291bnQgPSAxO1xyXG4gICAgXHJcbiAgICAvKiogRnVuY3Rpb24gdG8gcGFzcyBwcm9ncmVzcyBzdHJpbmcgZXZlcnkgaW50ZXJ2YWwuICovXHJcbiAgICBsZXQgcHJvZ3Jlc3NDYWxsYmFjayA9IGNvbnNvbGUubG9nO1xyXG4gICAgXHJcbiAgICAvKiogTGFzdCB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHRoZSBwcm9ncmVzcyBjYWxsYmFjayB3YXMgY2FsbGVkLiAqL1xyXG4gICAgbGV0IGxhc3REaXNwbGF5RGVsdGFUaW1lID0gMDtcclxuICAgIFxyXG4gICAgLyoqIFRpbWUsIGluIG1pbGxpc2Vjb25kcywgdGhlIGN1cnJlbnQgcHJvZ3Jlc3Mgd2FzIHN0YXJ0ZWQuICovXHJcbiAgICBsZXQgc3RhcnRUaW1lO1xyXG5cclxuICAgIC8qKiBVc2VkIHRvIGVzdGltYXRlIHJlbWFpbmluZyB0aW1lIG9mIHByb2dyZXNzLiAqL1xyXG4gICAgbGV0IGxlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbCA9IG5ldyBMZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwoKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHBlcmNlbnRhZ2Ugb2YgY3VycmVudCBwcm9ncmVzcyAoZXguIHJldHVybiA1Mi4zIGZvciA1Mi4zJSkuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRQZXJjZW50YWdlKCkge1xyXG4gICAgICAgIHJldHVybiAoY3VyckNvdW50IC8gbWF4Q291bnQpICogMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBuZXcgY3VycmVudCBjb3VudCBvZiBwcm9ncmVzcy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdDb3VudCBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0Q291bnQobmV3Q291bnQpIHtcclxuICAgICAgICAvLyBVcGRhdGUgY3VycmVudCBjb3VudFxyXG4gICAgICAgIGN1cnJDb3VudCA9IG5ld0NvdW50O1xyXG5cclxuICAgICAgICAvLyBJZiBwcm9ncmVzcyBoYXMgbm90IGFscmVhZHkgc3RhcnRlZCwgc2V0IHN0YXJ0IHRpbWUgdG8gbm93XHJcbiAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGltZSBiZXR3ZWVuIG5vdyBhbmQgc3RhcnQgdGltZSBvZiBjdXJyZW50IHByb2dyZXNzXHJcbiAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgaXQncyBiZWVuIGxvbmdlciB0aGFuIHVwZGF0ZUludGVydmFsIHNpbmNlIGxhc3QgdXBkYXRlZCB0aW1lLFxyXG4gICAgICAgICAqIGRpc3BsYXkgY3VycmVudCBwcm9ncmVzcyB1c2luZyBwcm9ncmVzcyBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoZGVsdGFUaW1lIC0gbGFzdERpc3BsYXlEZWx0YVRpbWUgPiB1cGRhdGVJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZSB0byBjYWxjdWxhdGVkIHBlcmNlbnRhZ2Ugb2YgY3VycmVudCBwcm9ncmVzcyBcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGdldFBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgZGF0YSBwb2ludCB0byBsZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwgdG8gYmV0dGVyIFxyXG4gICAgICAgICAgICAgKiBlc3RpbWF0ZSBjb21wbGV0aW9uIHRpbWUuIFRvIGF2b2lkIG51bWJlcnMgb3ZlcmZsb3dpbmcgd2hlbiBcclxuICAgICAgICAgICAgICogY2FsY3VsYXRpbmcgYmVzdCBmaXQgY3VydmUsIGRhdGEgcG9pbnRzIHNob3VsZCBiZSBhcyBzbWFsbFxyXG4gICAgICAgICAgICAgKiB2YWx1ZSBhcyBwb3NzaWJsZS4gWC1jb29yZCBpcyBudGggZGF0YSBwb2ludCBhbmQgWS1jb29yZCBpc1xyXG4gICAgICAgICAgICAgKiBwZXJjZW50YWdlIGFzIGRlY2ltYWwgd2hlcmUgMSByZXByZXNlbnRzIDEwMCUuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwuYWRkRGF0YVBvaW50KFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihkZWx0YVRpbWUgLyB1cGRhdGVJbnRlcnZhbCksIFxyXG4gICAgICAgICAgICAgICAgKHBlcmNlbnRhZ2UgLyAxMDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVXNlIGxlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbCB0byBlc3RpbWF0ZSB0aW1lIGxlZnQgdG8gXHJcbiAgICAgICAgICAgICAqIGNvbXBsZXRlIGNhbGN1bGF0aW9uLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc3QgdGltZUxlZnRFc3RpbWF0ZSA9IChsZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwuc29sdmVGb3JYKDEpICogdXBkYXRlSW50ZXJ2YWwpIC0gZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUGFzcyBjdXJyZW50IHByb2dyZXNzIHVwZGF0ZSBzdHJpbmcgdG8gcHJvZ3Jlc3MgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayhcclxuICAgICAgICAgICAgICAgIGAke2FkZENvbW1hc1RvTnVtYmVyKGN1cnJDb3VudCl9IG9mICR7YWRkQ29tbWFzVG9OdW1iZXIobWF4Q291bnQpfSAoJHtwZXJjZW50YWdlLnRvRml4ZWQoZGVjaW1hbERpZ2l0c1RvRGlzcGxheSl9JSlcXG5UaW1lIEVsYXBzZWQ6ICR7Y3JlYXRlRHVyYXRpb25TdHJpbmcoZGVsdGFUaW1lKX1cXG5UaW1lIExlZnQgKGVzdC4pOiAke2NyZWF0ZUR1cmF0aW9uU3RyaW5nKHRpbWVMZWZ0RXN0aW1hdGUpfWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgdGltZSB1cGRhdGUgd2FzIGxhc3QgZGlzcGxheWVkIHRvIGN1cnJlbnQgdGltZSBmb3IgZnV0dXJlIFxyXG4gICAgICAgICAgICAgKiBmdW5jdGlvbiBjYWxscy5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxhc3REaXNwbGF5RGVsdGFUaW1lID0gZGVsdGFUaW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgbmV3IG1heCBjb3VudCBvZiBwcm9ncmVzcy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdNYXhDb3VudCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzZXRNYXhDb3VudChuZXdNYXhDb3VudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmV3TWF4Q291bnQgIT09ICdudW1iZXInKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBtYXhDb3VudCA9IG5ld01heENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBuZXcgcHJvZ3Jlc3MgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdQcm9ncmVzc0NhbGxiYWNrIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldFByb2dyZXNzQ2FsbGJhY2sobmV3UHJvZ3Jlc3NDYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmV3UHJvZ3Jlc3NDYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayA9IG5ld1Byb2dyZXNzQ2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRQZXJjZW50YWdlLFxyXG4gICAgICAgIHNldENvdW50LFxyXG4gICAgICAgIHNldE1heENvdW50LFxyXG4gICAgICAgIHNldFByb2dyZXNzQ2FsbGJhY2ssXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdENhbGN1bGF0b3JQcm9ncmVzcztcclxuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbi8qKiBQaWVjZSBvZiBzaXplIHRoaWNrbmVzcyB4IHdpZHRoIHRoYXQgaXMgY3V0IHRvIHNwZWNpZmljIGxlbmd0aCwgcXVhbnRpdHksIGFuZCBrZXJmIGZyb20gYmxhZGUgdXNlZCB0byBjdXQuICovXHJcbmNsYXNzIEN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gV2lkdGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gRmluYWwgY3V0IGxlbmd0aCBvZiBjdXQgcGllY2UgKGluY2hlcylcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBxdWFudGl0eSAtIE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ga2VyZiAtIEJsYWRlIHdpZHRoIG9mIG1hdGVyaWFsIHJlbW92ZWQgd2hlbiBjdXQgKGluY2hlcykgKGRlZmF1bHQgPSAxLzhcIilcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IGlkIC0gSUQgYXMgc3RyaW5nIG9yIG51bGwgaWYgbmV3IHV1aWR2NCBpZCBjcmVhdGVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGxlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUsIGlkID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5rZXJmID0ga2VyZjtcclxuICAgICAgICB0aGlzLmlkID0gaWQgfHwgdXVpZHY0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRvdGFsIHN1bSBvZiBsZW5ndGggYW5kIGtlcmYgb2YgQ3V0UGllY2UuIFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgSlNPTiBvYmplY3Qgb2YgdGhlIEN1dFBpZWNlLlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gb2JqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBvYmoudGhpY2tuZXNzXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBvYmoud2lkdGhcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IG9iai5sZW5ndGhcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IG9iai5xdWFudGl0eVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gb2JqLmtlcmZcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IG9iai5pZFxyXG4gICAgICovXHJcbiAgICB0b0pzb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhpY2tuZXNzOiB0aGlzLnRoaWNrbmVzcyxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxyXG4gICAgICAgICAgICBrZXJmOiB0aGlzLmtlcmYsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIEN1dFBpZWNlIGdpdmVuIEpTT04gb2JqZWN0IG9mIGEgQ3V0UGllY2UuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbk9ialxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoudGhpY2tuZXNzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ganNvbk9iai53aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoubGVuZ3RoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ganNvbk9iai5xdWFudGl0eVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoua2VyZlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGpzb25PYmouaWRcclxuICAgICAqIEByZXR1cm5zIHtDdXRQaWVjZX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUZyb21Kc29uKGpzb25PYmopIHtcclxuICAgICAgICByZXR1cm4gbmV3IEN1dFBpZWNlKFxyXG4gICAgICAgICAgICBqc29uT2JqLnRoaWNrbmVzcyxcclxuICAgICAgICAgICAganNvbk9iai53aWR0aCxcclxuICAgICAgICAgICAganNvbk9iai5sZW5ndGgsXHJcbiAgICAgICAgICAgIGpzb25PYmoucXVhbnRpdHksXHJcbiAgICAgICAgICAgIGpzb25PYmoua2VyZixcclxuICAgICAgICAgICAganNvbk9iai5pZCxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRQaWVjZTtcclxuIiwiaW1wb3J0IENvdW50QXJyYXkgZnJvbSBcIi4vY291bnRBcnJheS5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4vY3V0UGllY2UuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2UgZnJvbSBcIi4vdW5jdXRQaWVjZS5qc1wiO1xyXG5cclxuLyoqIFNlcXVlbmNlIG9mIEN1dFBpZWNlcyBjdXQgZnJvbSBhbiBVbmN1dFBpZWNlIHdpdGggYW55IHJlbWFpbmluZyBsZW5ndGguICovXHJcbmNsYXNzIEN1dFNlcXVlbmNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1VuY3V0UGllY2V9IHVuY3V0UGllY2UgXHJcbiAgICAgKiBAcGFyYW0ge0N1dFBpZWNlW119IGN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVuY3V0UGllY2UsIGN1dFBpZWNlcyA9IFtdLCByZW1haW5pbmdMZW5ndGggPSAwKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuICAgICAgICB0aGlzLmN1dFBpZWNlcyA9IGN1dFBpZWNlcztcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IHJlbWFpbmluZ0xlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIEN1dFNlcXVlbmNlLiAqL1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIGBQaWVjZXM6ICR7dGhpcy5jdXRQaWVjZXN9XFxuTGVmdG92ZXI6ICR7dGhpcy5yZW1haW5pbmdMZW5ndGh9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIEpTT04gb2JqZWN0IG9mIHRoZSBDdXRTZXF1ZW5jZS5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9ialxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gb2JqLnVuY3V0UGllY2VcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0gb2JqLmN1dFBpZWNlc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn0gb2JqLnJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICovXHJcbiAgICB0b0pzb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdW5jdXRQaWVjZTogdGhpcy51bmN1dFBpZWNlLnRvSnNvbigpLFxyXG4gICAgICAgICAgICBjdXRQaWVjZXM6IHRoaXMuY3V0UGllY2VzLm1hcCgoY3V0UGllY2UpID0+IGN1dFBpZWNlLnRvSnNvbigpKSxcclxuICAgICAgICAgICAgcmVtYWluaW5nTGVuZ3RoOiB0aGlzLnJlbWFpbmluZ0xlbmd0aCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBDdXRTZXF1ZW5jZSBnaXZlbiBKU09OIG9iamVjdCBvZiBhIEN1dFNlcXVlbmNlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGpzb25PYmogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbk9iai51bmN1dFBpZWNlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBqc29uT2JqLmN1dFBpZWNlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoucmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgKiBAcmV0dXJucyB7Q3V0U2VxdWVuY2V9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVGcm9tSnNvbihqc29uT2JqKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIFVuY3V0UGllY2UgZnJvbSBKU09OIGRhdGFcclxuICAgICAgICBjb25zdCB1bmN1dFBpZWNlID0gVW5jdXRQaWVjZS5jcmVhdGVGcm9tSnNvbihqc29uT2JqLnVuY3V0UGllY2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSBvZiBDdXRQaWVjZXMgZnJvbSBKU09OIGRhdGFcclxuICAgICAgICBjb25zdCBjdXRQaWVjZXMgPSBqc29uT2JqLmN1dFBpZWNlc1xyXG4gICAgICAgICAgICAubWFwKChjdXRQaWVjZUpzb24pID0+IEN1dFBpZWNlLmNyZWF0ZUZyb21Kc29uKGN1dFBpZWNlSnNvbikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCByZW1haW5pbmcgbGVuZ3RoIGZyb20gSlNPTiBkYXRhXHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nTGVuZ3RoID0ganNvbk9iai5yZW1haW5pbmdMZW5ndGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gQ3V0U2VxdWVuY2VcclxuICAgICAgICByZXR1cm4gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UsIGN1dFBpZWNlcywgcmVtYWluaW5nTGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCAtIExlbmd0aCBvZiB1bmN1dCBwaWVjZSB0byBmaW5kIEN1dFBpZWNlcyB0byBmaXRcclxuICAgICAqIEBwYXJhbSB7Q3V0UGllY2VbXX0gY3V0UGllY2VzIC0gQXJyYXkgb2YgaW5kaXZpZHVhbCBDdXRQaWVjZXMgc29ydGVkIGJ5IGxlbmd0aCBpbiBkZXNjZW5kaW5nIG9yZGVyXHJcbiAgICAgKiBAcGFyYW0ge0NvdW50QXJyYXl9IGN1dFBpZWNlUXVhbnRpdGllcyAtIENvdW50QXJyYXkgb2YgY3VycmVudCBxdWFudGl0ZXMgb2YgZWFjaCBDdXRQaWVjZVxyXG4gICAgICogQHJldHVybnMge1tDdXRQaWVjZVtdLCBudW1iZXJdfSBBcnJheSBvZiBDdXRQaWVjZXMgc3ViIGFycmF5IG9mIHNlbGVjdGVkIEN1dFBpZWNlcyBhbmQgYW55IHJlbWFpbmluZyBsZW5ndGggbGVmdG92ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgY3V0UGllY2VzLCBjdXRQaWVjZVF1YW50aXRpZXMpIHtcclxuICAgICAgICAvKiogQXJyYXkgb2YgQ3V0UGllY2VzIHRoYXQgY2FuIGJlIGN1dCBmcm9tIHJlbWFpbmluZ0xlbmd0aCAqL1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlc0FyciA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGV4IG9mIEN1dFBpZWNlIGFuZCBpdCdzIHF1YW50aXR5IHRvIHN0YXJ0IHNlYXJjaGluZyBpbiBjdXJyZW50IFxyXG4gICAgICAgICAqIGxvb3AgKGluaXRpYWxpemVkIHRvIHplcm8pLiBQcmV2aW91cyBDdXRQaWVjZXMgYXJlIGd1YXJlbnRlZWQgdG8gYmUgXHJcbiAgICAgICAgICogdG9vIGxvbmcgZm9yIHJlbWFpbmluZ0xlbmd0aCBzaW5jZSBDdXRQaWVjZXMgYXJyYXkgaXMgc29ydGVkIGJ5IFxyXG4gICAgICAgICAqIGxlbmd0aCBpbiBkZXNjZW5kaW5nIG9yZGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCBjdXRQaWVjZXNTdGFydEluZGV4ID0gMDtcclxuICAgICAgICBcclxuICAgICAgICAvKiogSW5kZXggb2YgQ3V0UGllY2Ugc2VsZWN0ZWQgdG8gY3V0IGZyb20gcmVtYWluaW5nIGxlbmd0aCAqL1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXg7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZsYWcgaXMgdHJ1ZSB3aGVuIHNlbGVjdGVkIEN1dFBpZWNlIHdpbGwgdGFrZSB1cCB0aGUgZW50aXJlIFxyXG4gICAgICAgICAqIHJlbWFpbmluZyBsZW5ndGggbGVhdmluZyB6ZXJvIGxlbmd0aCBsZWZ0b3Zlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgZXhhY3RMZW5ndGhGbGFnO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMb29waW5nIGNvdW50ZXIgdG8gYmUgdXNlZCBpbnNpZGUgd2hpbGUgbG9vcC4gRGVjbGFyZWQgb3V0c2lkZSBcclxuICAgICAgICAgKiB3aGlsZSBsb29wIHRvIHVzZSB0aGUgc2FtZSBtZW1vcnkgZm9yIGVhY2ggbG9vcCByYXRoZXIgdGhhbiBcclxuICAgICAgICAgKiBkZWNsYXJpbmcgYW5kIGRlc3Ryb3lpbmcgYSBuZXcgb25lIGVhY2ggbG9vcC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgaTtcclxuXHJcbiAgICAgICAgLy8gRmluZCBzZXJpZXMgb2YgQ3V0UGllY2VzIHRoYXQgY2FuIGJlIGN1dCBmcm9tIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIHdoaWxlIChjdXRQaWVjZVF1YW50aXRpZXMudG90YWwgIT09IDApIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXggdG8gdW5kZWZpbmVkIGJlZm9yZSBmaW5kaW5nIG5ldyB2YWx1ZVxyXG4gICAgICAgICAgICAgKiB3aXRoIHVwZGF0ZWQgcmVtYWluaW5nTGVuZ3RoIGFuZCBjdXRQaWVjZVF1YW50aXRpZXMuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogTWFrZSBzdXJlIGV4YWN0TGVuZ3RoRmxhZyBpcyBmYWxzZSBmb3IgbmV3IGxvb3AgYmVmb3JlIGZpbmRpbmcgXHJcbiAgICAgICAgICAgICAqIG5ldyBDdXRQaWVjZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGV4YWN0TGVuZ3RoRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEZpbmQgbGFyZ2VzdCBDdXRQaWVjZSBsZW5ndGggdGhhdCBjYW4gYmUgY3V0IGZyb20gcmVtYWluaW5nTGVuZ3RoIGJ5IFxyXG4gICAgICAgICAgICAgKiBsb29waW5nIHRocm91Z2ggQ3V0UGllY2VzIHdpdGggbm9uLXplcm8gcXVhbnRpdHkuIENvbnRpbnVlIGxvb3AgdW50aWxcclxuICAgICAgICAgICAgICogc2VsZWN0IGEgQ3V0UGllY2UgT1IgcmVhY2ggZW5kIG9mIEN1dFBpZWNlcyBhcnJheS5cclxuICAgICAgICAgICAgICogU3RhcnQgbG9vcCBhdCBjdXRQaWVjZVN0YXJ0SW5kZXggdGhhdCBpcyBzZXQgYXQgdGhlIGVuZCBvZiBwcmV2aW91cyBcclxuICAgICAgICAgICAgICogd2hpbGUgbG9vcCB0aGF0IGZvdW5kIGEgQ3V0UGllY2UgdG8gYWRkIHRvIGN1dCBzZXF1ZW5jZS4gVGhpcyBza2lwcyBcclxuICAgICAgICAgICAgICogQ3V0UGllY2VzIHRoYXQgYXJlIHRvbyBsb25nIGZvciB0aGUgcmVtYWluaW5nTGVuZ3RoLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGkgPSBjdXRQaWVjZXNTdGFydEluZGV4OyBcclxuICAgICAgICAgICAgICAgIChpIDwgY3V0UGllY2VzLmxlbmd0aCkgJiYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PT0gdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGl0aCBDdXRQaWVjZSBoYXMgemVybyBxdWFudGl0eSBsZWZ0LCBza2lwXHJcbiAgICAgICAgICAgICAgICBpZiAoY3V0UGllY2VRdWFudGl0aWVzLnZhbHVlQXRJbmRleChpKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdGggQ3V0UGllY2UgaXMgdG9vIGxvbmcgZm9yIHJlbWFpbmluZyBsZW5ndGgsIHNraXBcclxuICAgICAgICAgICAgICAgIGlmIChjdXRQaWVjZXNbaV0ubGVuZ3RoID4gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogSWYgQ3V0UGllY2UgY3V0IGxlbmd0aCBpcyBleGFjdGx5IGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggXHJcbiAgICAgICAgICAgICAgICAgKiAoRE8gTk9UIElOQ0xVREUgS0VSRikuXHJcbiAgICAgICAgICAgICAgICAgKiBGb3VuZCBDdXRQaWVjZSB3aXRoIGV4YWN0IGxlbmd0aC4gTm8gY3V0IG5lZWRlZC5cclxuICAgICAgICAgICAgICAgICAqIE9SXHJcbiAgICAgICAgICAgICAgICAgKiBJZiBDdXRQaWVjZSBjdXQgbGVuZ3RoIGlzIGxlc3MgdGhhbiByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgKiBBTkQgY3V0IGxlbmd0aCArIGtlcmYgaXMgbW9yZSB0aGFuIG9yIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGguXHJcbiAgICAgICAgICAgICAgICAgKiBGb3VuZCBDdXRQaWVjZSB0aGF0IHVzZXMgdXAgcmVtYWluaW5nIGxlbmd0aCB3aXRoIGN1dCBhIHNpbmdsZSBcclxuICAgICAgICAgICAgICAgICAqIGtlcmYgZGlzdGFuY2UgZnJvbSB0aGUgZW5kIG9yIGxlc3MuIENhbiBnZXQgQ3V0UGllY2UgbGVuZ3RoIG91dCBcclxuICAgICAgICAgICAgICAgICAqIG9mIHJlbWFpbmluZyBsZW5ndGggYnkgdHJpbW1pbmcgb25lIGtlcmYgb3IgbGVzcyBvZmYgZW5kLlxyXG4gICAgICAgICAgICAgICAgICogVGhlcmUgaXMgTk8gbW9yZSBtYXRlcmlhbCBsZWZ0IGFmdGVyIGN1dHRpbmcgdGhpcyBDdXRQaWVjZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIChjdXRQaWVjZXNbaV0ubGVuZ3RoID09PSByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY3V0UGllY2VzW2ldLmxlbmd0aCA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGN1dFBpZWNlc1tpXS5jdXRXaXRoS2VyZiA+PSByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhhY3RMZW5ndGhGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBJZiByZWFjaCBoZXJlLCBDdXRQaWVjZSBjdXQgbGVuZ3RoICsga2VyZiBpcyBsZXNzIHRoYW4gXHJcbiAgICAgICAgICAgICAgICAgKiByZW1haW5pbmcgbGVuZ3RoIChJTkNMVURJTkcgS0VSRikuIFRoZXJlIHdpbGwgYmUgc29tZSBcclxuICAgICAgICAgICAgICAgICAqIG1hdGVyaWFsIGxlZnQgZm9yIHBvdGVudGlhbGx5IG1vcmUgQ3V0UGllY2VzLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZC4gSWYgaXQgaXMsIGFsbCBcclxuICAgICAgICAgICAgICogY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGguXHJcbiAgICAgICAgICAgICAqIEJyZWFrIG91dCBvZiB3aGlsZSBsb29wLiBObyBtb3JlIEN1dFBpZWNlcyBjYW4gYmUgY2hvc2VuIGZvciB0aGUgXHJcbiAgICAgICAgICAgICAqIGN1dCBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIERlY3JlbWVudCBDdXRQaWVjZSBmcm9tIGFycmF5IG9mIHF1YW50aXRpZXMsIHNvIHNhbWUgQ3V0UGllY2UgXHJcbiAgICAgICAgICAgICAqIGlzIE5PVCBzZWxlY3RlZCBtb3JlIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGN1dFBpZWNlUXVhbnRpdGllcy5kZWNyZW1lbnRWYWx1ZUF0SW5kZXgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBQdXNoIHNlbGVjdGVkIEN1dFBpZWNlIHJlZmVyZW5jZSB0byBhcnJheSBvZiBzZWxlY3RlZCBDdXRQaWVjZXMgXHJcbiAgICAgICAgICAgICAqIGZvciBpbml0aWFsIHJlbWFpbmluZyBsZW5ndGguXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlc0Fyci5wdXNoKGN1dFBpZWNlc1tzZWxlY3RlZEN1dFBpZWNlSW5kZXhdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJZiBmb3VuZCBDdXRQaWVjZSB0byB1c2UgZW50aXJlIHJlbWFpbmluZyBsZW5ndGgsIHNldCByZW1haW5pbmcgXHJcbiAgICAgICAgICAgICAqIGxlbmd0aCB0byB6ZXJvIGFuZCBicmVhayBvdXQgb2YgbG9vcC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChleGFjdExlbmd0aEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgYW5vdGhlciBDdXRQaWVjZSBjb3VsZCBiZSBzZWxlY3RlZCBmb3IgY3V0IHNlcXVlbmNlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgcmVtYWluaW5nIGxlbmd0aCBmb3IgbmV4dCBsb29wIGJ5IHN1YnRyYWN0aW5nIGN1dCtrZXJmXHJcbiAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtPSBjdXRQaWVjZXNbc2VsZWN0ZWRDdXRQaWVjZUluZGV4XS5jdXRXaXRoS2VyZjtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgY3V0UGllY2VzU3RhcnRJbmRleCB0byBzZWxlY3RlZCBpbmRleCB0byBza2lwIEN1dFBpZWNlcyBcclxuICAgICAgICAgICAgICogZ3VhcmFudGVlZCB0byBiZSBsb25nZXIgdGhhbiByZW1haW5pbmdMZW5ndGguXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjdXRQaWVjZXNTdGFydEluZGV4ID0gc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIGFycmF5IG9mIEN1dFBpZWNlcyBzZWxlY3RlZCBhbmQgYW55IHJlbWFpbmluZ0xlbmd0aCBsZWZ0b3ZlclxyXG4gICAgICAgIHJldHVybiBbc2VsZWN0ZWRDdXRQaWVjZXNBcnIsIHJlbWFpbmluZ0xlbmd0aF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIHNtYWxsZXN0IHJlbWFpbmluZyBsZW5ndGggZnJvbSBhbiBpbml0aWFsIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge0N1dFBpZWNlW119IGN1dFBpZWNlcyBBcnJheSBvZiBpbmRpdmlkdWFsIEN1dFBpZWNlcyBzb3J0ZWQgYnkgbGVuZ3RoIGluIGRlc2NlbmRpbmcgb3JkZXJcclxuICAgICAqIEBwYXJhbSB7Q291bnRBcnJheX0gY3V0UGllY2VRdWFudGl0aWVzIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1dFBpZWNlc1N0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIG51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGFueSByZW1haW5pbmcgbGVuZ3RoIG9mIHRoZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVDdXRTZXF1ZW5jZUFyclJlYyhyZW1haW5pbmdMZW5ndGgsIGN1dFBpZWNlcywgY3V0UGllY2VRdWFudGl0aWVzLCBjdXRQaWVjZXNTdGFydEluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIElmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHksIHJldHVybiBzaW5nbGUgaW5kZXggYXJyYXkgd2l0aCBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoY3V0UGllY2VRdWFudGl0aWVzLnRvdGFsID09PSAwKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXg7XHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IGkgPSBjdXRQaWVjZXNTdGFydEluZGV4OyBcclxuICAgICAgICAgICAgKGkgPCBjdXRQaWVjZXMubGVuZ3RoKSAmJiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09PSB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gSWYgaXRoIEN1dFBpZWNlIGhhcyB6ZXJvIHF1YW50aXR5LCBza2lwXHJcbiAgICAgICAgICAgIGlmIChjdXRQaWVjZVF1YW50aXRpZXMudmFsdWVBdEluZGV4KGkpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgaXRoIEN1dFBpZWNlIGlzIHRvbyBsb25nIGZvciByZW1haW5pbmcgbGVuZ3RoLCBza2lwXHJcbiAgICAgICAgICAgIGlmIChjdXRQaWVjZXNbaV0ubGVuZ3RoID4gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIElmIEN1dFBpZWNlIGN1dCBsZW5ndGggaXMgZXhhY3RseSBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKS5cclxuICAgICAgICAgICAgICogRm91bmQgQ3V0UGllY2Ugd2l0aCBleGFjdCBsZW5ndGguIE5vIGN1dCBuZWVkZWQuXHJcbiAgICAgICAgICAgICAqIE9SXHJcbiAgICAgICAgICAgICAqIElmIEN1dFBpZWNlIGN1dCBsZW5ndGggaXMgbGVzcyB0aGFuIHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICAgICAgICogQU5EIGN1dCBsZW5ndGggKyBrZXJmIGlzIG1vcmUgdGhhbiBvciBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoLlxyXG4gICAgICAgICAgICAgKiBGb3VuZCBDdXRQaWVjZSB0aGF0IHVzZXMgdXAgcmVtYWluaW5nIGxlbmd0aCB3aXRoIGN1dCBhIHNpbmdsZSBcclxuICAgICAgICAgICAgICoga2VyZiBkaXN0YW5jZSBmcm9tIHRoZSBlbmQgb3IgbGVzcy4gQ2FuIGdldCBDdXRQaWVjZSBsZW5ndGggb3V0IFxyXG4gICAgICAgICAgICAgKiBvZiByZW1haW5pbmcgbGVuZ3RoIGJ5IHRyaW1taW5nIG9uZSBrZXJmIG9yIGxlc3Mgb2ZmIGVuZC5cclxuICAgICAgICAgICAgICogVGhlcmUgaXMgTk8gbW9yZSBtYXRlcmlhbCBsZWZ0IGFmdGVyIGN1dHRpbmcgdGhpcyBDdXRQaWVjZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIChjdXRQaWVjZXNbaV0ubGVuZ3RoID09PSByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB8fCAoXHJcbiAgICAgICAgICAgICAgICAgICAgKGN1dFBpZWNlc1tpXS5sZW5ndGggPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgKGN1dFBpZWNlc1tpXS5jdXRXaXRoS2VyZiA+PSByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBtb3JlIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIC8vYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjdXRQaWVjZVF1YW50aXRpZXMuZGVjcmVtZW50VmFsdWVBdEluZGV4KGkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBhcnJheSBvZiBwaWVjZSB3aXRoIGV4YWN0IHJlbWFpbmluZyBsZW5ndGggYW5kIGVuZGluZyBcclxuICAgICAgICAgICAgICAgIC8vIHdpdGggemVybyBmb3Igbm8gbW9yZSByZW1haW5pbmcgbGVuZ3RoIGFmdGVyIGN1dC5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGN1dFBpZWNlc1tpXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBDdXRQaWVjZSBjdXQgbGVuZ3RoICsga2VyZiBpcyBsZXNzIHRoYW4gcmVtYWluaW5nIGxlbmd0aCAoSU5DTFVESU5HIEtFUkYpLlxyXG4gICAgICAgICAgICAvLyBUaGVyZSB3aWxsIGJlIHNvbWUgbWF0ZXJpYWwgbGVmdCBmb3IgcG90ZW50aWFsbHkgbW9yZSBDdXRQaWVjZXMuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoLlxyXG4gICAgICAgIC8vIFJldHVybiBzaW5nbGUgaW5kZXggYXJyYXkgd2l0aCBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIG1vcmUgdGhhbiBvbmNlLlxyXG4gICAgICAgIGN1dFBpZWNlUXVhbnRpdGllcy5kZWNyZW1lbnRWYWx1ZUF0SW5kZXgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4KTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gY3V0UGllY2VzW3NlbGVjdGVkQ3V0UGllY2VJbmRleF07XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBhcnJheSBvZiBhbnkgQ3V0UGllY2VzIHdpdGggcmVtYWluaW5nIGxlbmd0aCBhcyBsYXN0IGVsZW1lbnQgb2YgYXJyYXlcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLFxyXG4gICAgICAgICAgICAuLi5DdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycihcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsXHJcbiAgICAgICAgICAgICAgICBjdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBjdXRQaWVjZVF1YW50aXRpZXMsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dFNlcXVlbmNlO1xyXG4iLCIvKipcclxuICogQ29tcHV0ZXMgYmVzdCBmaXQgZXhwb25lbnRpYWwgY3VydmUgdXNpbmcgbGVhc3Qgc3F1YXJlcyBvZiBkYXRhIHBvaW50cyBvbiBncmlkLlxyXG4gKiBcclxuICogaHR0cHM6Ly9tYXRod29ybGQud29sZnJhbS5jb20vTGVhc3RTcXVhcmVzRml0dGluZ0V4cG9uZW50aWFsLmh0bWxcclxuICovXHJcbmNsYXNzIExlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm5Mb2dZID0gMDtcclxuICAgICAgICB0aGlzLnhTcXVhcmVkID0gMDtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueE5Mb2dZID0gMDtcclxuICAgICAgICB0aGlzLm4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRhdGEgcG9pbnQgb24gZ3JpZCB0byBkYXRhc2V0IHRvIGZpdCB0aGUgZXhwb25lbnRpYWwgY3VydmUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKi9cclxuICAgIGFkZERhdGFQb2ludCh4LCB5KSB7XHJcbiAgICAgICAgLy8gSWYgeSBpcyB6ZXJvLCBuTG9nWSB3aWxsIGJlIEluZmluaXRlLiBTa2lwIHRoaXMgcG9pbnQuXHJcbiAgICAgICAgaWYgKHkgPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTk9URTogSWYgeSBpcyBhbHdheXMgPDEsIHRoYW4gbkxvZ1kgd2lsbCBhbHdheXMgYmUgbmVnYXRpdmVcclxuICAgICAgICBcclxuICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZSB0byBuYXR1cmFsIGxvZyBvZiB5IHRvIGF2b2lkIGNhbGN1bGF0aW5nIGl0IHR3aWNlIG5leHRcclxuICAgICAgICBjb25zdCBuTG9nWSA9IE1hdGgubG9nKHkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgdG8gZWFjaCBzdW0gdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSBiZXN0IGZpdCBleHBvbmVudGlhbCBjdXJ2ZVxyXG4gICAgICAgIHRoaXMubkxvZ1kgKz0gbkxvZ1k7XHJcbiAgICAgICAgdGhpcy54U3F1YXJlZCArPSAoeCAqIHgpO1xyXG4gICAgICAgIHRoaXMueCArPSB4O1xyXG4gICAgICAgIHRoaXMueE5Mb2dZICs9ICh4ICogbkxvZ1kpO1xyXG4gICAgICAgIHRoaXMubisrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB4LWF4aXMgdmFsdWUgb2YgYmVzdCBmaXQgZXhwb25lbnRpYWwgY3VydmUsIGdpdmVuIHktYXhpcyB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgc29sdmVGb3JYKHkpIHtcclxuICAgICAgICBjb25zdCBhID0gKCh0aGlzLm5Mb2dZICogdGhpcy54U3F1YXJlZCkgLSAodGhpcy54ICogdGhpcy54TkxvZ1kpKSBcclxuICAgICAgICAgICAgLyAoKHRoaXMubiAqIHRoaXMueFNxdWFyZWQpIC0gKHRoaXMueCAqKiAyKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgQSA9IE1hdGguZXhwKGEpO1xyXG4gICAgICAgIGNvbnN0IEIgPSAoKHRoaXMubiAqIHRoaXMueE5Mb2dZKSAtICh0aGlzLnggKiB0aGlzLm5Mb2dZKSlcclxuICAgICAgICAgICAgLyAoKHRoaXMubiAqIHRoaXMueFNxdWFyZWQpIC0gKHRoaXMueCAqKiAyKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHkgPSBBKmVeKEJ4KVxyXG4gICAgICAgICAqIFNvbHZlIGZvciB4XHJcbiAgICAgICAgICogbG4oeSkgPSBsbihBKSArIEJ4XHJcbiAgICAgICAgICogeCA9IChsbih5KSAtIGxuKEEpKSAvIEJcclxuICAgICAgICAgKiB4ID0gbG4oeS9BKSAvIEJcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmxvZyh5IC8gQSkpIC8gQjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGVzIGJlc3QgZml0IGV4cG9uZW50aWFsIGN1cnZlIHVzaW5nIGxlYXN0IHNxdWFyZXMgb2YgZGF0YSBwb2ludHMgb24gZ3JpZC5cclxuICogXHJcbiAqIGh0dHBzOi8vbWF0aHdvcmxkLndvbGZyYW0uY29tL0xlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbC5odG1sXHJcbiAqL1xyXG5jbGFzcyBMZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWxBZHYge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogfCBzdW0oeSkgICAgIHN1bSh4ICogeSkgICAgfCAqIHwgYSB8ID0gfCBzdW0oeSAqIGxuKHkpKSAgICAgIHxcclxuICAgICAgICAgKiB8IHN1bSh4ICogeSkgc3VtKHgqKjIgKiB5KSB8ICAgfCBiIHwgICB8IHN1bSAoeCAqIHkgKiBsbih5KSkgfFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMueFNxdWFyZWRZID0gMDtcclxuICAgICAgICB0aGlzLnlOTG9nWSA9IDA7XHJcbiAgICAgICAgdGhpcy54WSA9IDA7XHJcbiAgICAgICAgdGhpcy54WU5Mb2dZID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRhdGEgcG9pbnQgb24gZ3JpZCB0byBkYXRhc2V0IHRvIGZpdCB0aGUgZXhwb25lbnRpYWwgY3VydmUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKi9cclxuICAgIGFkZERhdGFQb2ludCh4LCB5KSB7XHJcbiAgICAgICAgLy8gSWYgeSBpcyB6ZXJvLCBuTG9nWSB3aWxsIGJlIEluZmluaXRlLiBTa2lwIHRoaXMgcG9pbnQuXHJcbiAgICAgICAgaWYgKHkgPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTk9URTogSWYgeSBpcyBhbHdheXMgPDEsIHRoYW4gbkxvZ1kgd2lsbCBhbHdheXMgYmUgbmVnYXRpdmVcclxuICAgICAgICBcclxuICAgICAgICAvLyBTYXZlIHJlZmVyZW5jZSB0byBuYXR1cmFsIGxvZyBvZiB5IHRvIGF2b2lkIGNhbGN1bGF0aW5nIGl0IHR3aWNlIG5leHRcclxuICAgICAgICBjb25zdCBuTG9nWSA9IE1hdGgubG9nKHkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgdG8gZWFjaCBzdW0gdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSBiZXN0IGZpdCBleHBvbmVudGlhbCBjdXJ2ZVxyXG4gICAgICAgIHRoaXMueSArPSB5O1xyXG4gICAgICAgIHRoaXMueFkgKz0gKHggKiB5KTtcclxuICAgICAgICB0aGlzLnhTcXVhcmVkWSArPSAoeCAqIHggKiB5KTtcclxuICAgICAgICB0aGlzLnlOTG9nWSArPSAoeSArIG5Mb2dZKTtcclxuICAgICAgICB0aGlzLnhZTkxvZ1kgKz0gKHggKiB5ICogbkxvZ1kpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB4LWF4aXMgdmFsdWUgb2YgYmVzdCBmaXQgZXhwb25lbnRpYWwgY3VydmUsIGdpdmVuIHktYXhpcyB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgc29sdmVGb3JYKHkpIHtcclxuICAgICAgICBjb25zdCBhID0gKCh0aGlzLnhTcXVhcmVkWSAqIHRoaXMueU5Mb2dZKSAtICh0aGlzLnhZICogdGhpcy54WU5Mb2dZKSkgXHJcbiAgICAgICAgICAgIC8gKCh0aGlzLnkgKiB0aGlzLnhTcXVhcmVkWSkgLSAodGhpcy54WSAqKiAyKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgQSA9IE1hdGguZXhwKGEpO1xyXG4gICAgICAgIGNvbnN0IEIgPSAoKHRoaXMueSAqIHRoaXMueFlOTG9nWSkgLSAodGhpcy54WSAqIHRoaXMueU5Mb2dZKSlcclxuICAgICAgICAgICAgLyAoKHRoaXMueSAqIHRoaXMueFNxdWFyZWRZKSAtICh0aGlzLnhZICoqIDIpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogeSA9IEEqZV4oQngpXHJcbiAgICAgICAgICogU29sdmUgZm9yIHhcclxuICAgICAgICAgKiBsbih5KSA9IGxuKEEpICsgQnhcclxuICAgICAgICAgKiB4ID0gKGxuKHkpIC0gbG4oQSkpIC8gQlxyXG4gICAgICAgICAqIHggPSBsbih5L0EpIC8gQlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICByZXR1cm4gKE1hdGgubG9nKHkgLyBBKSkgLyBCO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWw7XHJcbmV4cG9ydCB7IExlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbEFkdiwgfTtcclxuIiwiLyoqIEZ1bmN0aW9uYWxpdHkgZm9yIGR5bmFtaWMgbGV2ZWwgb2YgbmVzdGVkIGxvb3AgY291bnRlcnMuICovXHJcbmNsYXNzIE5lc3RlZExvb3BDb3VudGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGggPSAwKSB7XHJcbiAgICAgICAgLy8gU2V0IGN1cnJlbnQgY291bnQgYW5kIG1heCBjb3VudHMgdG8gaW5pdGlhbCB2YWx1ZSBvZiB6ZXJvXHJcbiAgICAgICAgdGhpcy5jdXJyID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICB0aGlzLm1heCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJldHVybnMgc2l6ZSBvZiBuZXN0ZWQgbG9vcCBjb3VudGVyIChtYXggZGVwdGggb2YgaW5uZXItbW9zdCBsb29wKS4gKi9cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4Lmxlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGNvdW50IG9mIGFsbCBpdGVyYXRpb25zIHVwIHRvIHRoZSBjdXJyZW50IG5lc3RlZCBsb29wIHZhbHVlcy5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQoKSB7XHJcbiAgICAgICAgLy8gSWYgY3VycmVudCBjb3VudHMgYXJyYXkgaXMgZW1wdHksIHJldHVybiB6ZXJvXHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5kIGxhc3QgaW5kZXggb2YgYSBub24temVybyB2YWx1ZSwgdG8gc2tpcCBsYXJnZXIgbmVzdGVkIGxvb3BzIGVudGlyZWx5XHJcbiAgICAgICAgY29uc3QgbGFzdE5vblplcm9JbmRleCA9IHRoaXMuY3Vyci5maW5kTGFzdEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG5cclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lIChhZGQgZXh0cmEgZm9yIHplcm8gdmFsdWUpXHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5jdXJyWzBdICsgMTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9yIGV2ZXJ5IGluZGV4IGFmdGVyIHRoZSBmaXJzdCB1cCB0byBsYXN0Tm9uWmVyb0luZGV4LCBhZGQgdGhlIFxyXG4gICAgICAgICAqIHByb2R1Y3Qgb2YgYWxsIHByZXZpb3VzIGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyBvbmUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGFzdE5vblplcm9JbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ICs9IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyW2ldIFxyXG4gICAgICAgICAgICAgICAgKiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXguc2xpY2UoMCwgaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogKGN1cnIgKyAxKSwgMSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIG1heCA9IFs1LDQsMywyXVxyXG4gICAgICAgICAqIHBvc3NpYmlsaXRpZXMgPSA2KjUqNCozID0gMzYwXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogbWF4ID0gICAgIFs1LDQsMywyXVxyXG4gICAgICAgICAqIGNvdW50ZXIgPSBbMywwLDAsMF1cclxuICAgICAgICAgKiBbMF0gMVxyXG4gICAgICAgICAqIFszXSArM1xyXG4gICAgICAgICAqIDRcclxuICAgICAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgICAqIDMgKyAxID0gNFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIG1heCA9ICAgICBbNSw0LDMsMl1cclxuICAgICAgICAgKiBjb3VudGVyID0gWzUsMCwwLDBdXHJcbiAgICAgICAgICogLSBGaXJzdCBpbmRleCBpcyBsYXN0IG5vbi16ZXJvIGluZGV4LCBhZGQgZmlyc3QgaW5kZXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAgICAgKiA1ICsgMSA9IDZcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBtYXggPSAgICAgWzUsNCwzLDJdXHJcbiAgICAgICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICAgICAqIFswLDBdIDFcclxuICAgICAgICAgKiBbNSwwXSArNVxyXG4gICAgICAgICAqIFswLDFdICsxXHJcbiAgICAgICAgICogWzUsMV0gKzVcclxuICAgICAgICAgKiBbMCwyXSArMVxyXG4gICAgICAgICAqIFszLDJdICszXHJcbiAgICAgICAgICogMTZcclxuICAgICAgICAgKiBbNSwwXSArNlxyXG4gICAgICAgICAqIFs1LDFdICs2XHJcbiAgICAgICAgICogWzAsMl0gKzFcclxuICAgICAgICAgKiBbMywyXSArM1xyXG4gICAgICAgICAqIDE2XHJcbiAgICAgICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDIpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAgICAgKiAyICogNiA9IDEyXHJcbiAgICAgICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICAgICAqIDEyICsgNCA9IDE2XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogbWF4ID0gICAgIFs1LDQsMywyXVxyXG4gICAgICAgICAqIGNvdW50ZXIgPSBbNSw0LDAsMF1cclxuICAgICAgICAgKiBbNSwwXSArNlxyXG4gICAgICAgICAqIFs1LDFdICs2XHJcbiAgICAgICAgICogWzUsMl0gKzZcclxuICAgICAgICAgKiBbNSwzXSArNlxyXG4gICAgICAgICAqIFs1LDRdICs2XHJcbiAgICAgICAgICogMzBcclxuICAgICAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoNCkgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAgICAgKiAtIFBsdXMgZmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgICAgICogMjQgKyA2ID0gMzBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBtYXggPSAgICAgWzUsNCwzLDJdXHJcbiAgICAgICAgICogY291bnRlciA9IFswLDAsMSwwXVxyXG4gICAgICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAgICAgKiBbMCwwLDEsMF0gKzFcclxuICAgICAgICAgKiAzMVxyXG4gICAgICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgICAgICogMVxyXG4gICAgICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgxKSB2YWx1ZSAoMCkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMSkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgICAgICogMSArIDEgKiAoNio1KSA9IDMxXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogbWF4ID0gICAgIFs1LDQsMywyXVxyXG4gICAgICAgICAqIGNvdW50ZXIgPSBbNSw0LDMsMl1cclxuICAgICAgICAgKiAzNjBcclxuICAgICAgICAgKiAtIEZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICAgICAqIDZcclxuICAgICAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICAgICAqIDYgKyA0ICogNiA9IDMwXHJcbiAgICAgICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgzKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgICAgICogLSBQbHVzIG5leHQgaW5kZXggKDMpIHZhbHVlICgyKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAgICAgKiAxMjAgKyAyICogKDYqNSo0KSA9IDEyMCArIDIgKiAxMjAgPSAxMjAgKyAyNDAgPSAzNjBcclxuICAgICAgICAgKi9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgY291bnQgb2YgbWF4aW11bSBpdGVyYXRpb25zIG9mIHRoZSBtYXhpbXVtIG5lc3RlZCBsb29wIHZhbHVlcy5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldE1heENvdW50KCkge1xyXG4gICAgICAgIC8vIEZpbmQgbGFzdCBpbmRleCBvZiBhIG5vbi16ZXJvIHZhbHVlLCB0byBza2lwIGxhcmdlciBuZXN0ZWQgbG9vcHMgZW50aXJlbHlcclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gdGhpcy5tYXguZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZXR1cm4gcHJvZHVjdCBvZiBhbGwgY291bnRzIChwbHVzIG9uZSBmb3IgemVybyB2YWx1ZSkgdXAgdG8gbGFzdE5vblplcm9JbmRleFxyXG4gICAgICAgIHJldHVybiB0aGlzLm1heFxyXG4gICAgICAgICAgICAuc2xpY2UoMCwgbGFzdE5vblplcm9JbmRleCA9PT0gLTEgPyB0aGlzLm1heC5sZW5ndGggOiBsYXN0Tm9uWmVyb0luZGV4ICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogKGN1cnIgKyAxKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBpbmNyZW1lbnRzIGNvdW50IG9mICdpbmRleCcgb2YgY3VycmVudCBuZXN0ZWQgXHJcbiAgICAgKiBsb29wIGNvdW50IGFuZCByZXR1cm5zIGxhcmdlc3QgaW5kZXggb2YgbmVzdGVkIGxvb3AgY291bnQgdGhhdCBjaGFuZ2VkLlxyXG4gICAgICogUmV0dXJucyBudWxsIGlmIGluZGV4IHJlYWNoZXMgZW5kIG9mIGN1cnJlbnQgbmVzdGVkIGxvb3AgY291bnRzIGFycmF5LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxyXG4gICAgICogQHJldHVybnMge251bGx8dW5kZWZpbmVkfSBSZXR1cm5zIG51bGwgaWYgTk8gbmVzdGVkIGxvb3AgY291bnRzIGF0IGluZGV4IG9yIGhpZ2hlciBjYW4gYmUgaW5jcmVtZW50ZWRcclxuICAgICAqL1xyXG4gICAgaW5jcmVtZW50KGluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIGluZGV4IGhhcyByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLmN1cnIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBhdCBpbmRleFxyXG4gICAgICAgIHRoaXMuY3VycltpbmRleF0rKztcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiBjdXJyZW50IGluZGV4IHZhbHVlIGhhcyBzdXJwYXNzZWQgdGhlIGVxdWl2YWxlbnQgbWF4IHZhbHVlLCBzZXQgXHJcbiAgICAgICAgICogY3VycmVudCBpbmRleCB2YWx1ZSB0byB6ZXJvIGFuZCB0aGVuIHJlY3Vyc2l2ZWx5IGluY3JlbWVudCB2YWx1ZSBvZiBcclxuICAgICAgICAgKiBuZXh0IGluZGV4LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJbaW5kZXhdID4gdGhpcy5tYXhbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmNyZW1lbnQoKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2tpcHMgcmVtYWluaW5nIGl0ZXJhdGlvbnMgb2YgbG9vcCBhdCBmaXJzdCBub24temVybyB2YWx1ZSBpbmRleC5cclxuICAgICAqIEByZXR1cm5zIHtudWxsfHVuZGVmaW5lZH0gUmV0dXJucyBudWxsIGlmIE5PIG5lc3RlZCBsb29wIGNvdW50cyBjYW4gYmUgc2tpcHBlZFxyXG4gICAgICovXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIC8vIEZpbmQgZmlyc3QgaW5kZXggd2l0aCBub24temVybyB2YWx1ZSBjb3VudFxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSB0aGlzLmN1cnIuZmluZEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIGFycmF5IGlzIGVtcHR5IE9SIGFsbCB2YWx1ZXMgYXJlIHplcm8sIHJldHVyblxyXG4gICAgICAgIGlmIChmaXJzdE5vblplcm9WYWx1ZUluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGZpcnN0IGluZGV4IHdpdGggbm9uLXplcm8gdmFsdWUgY291bnQgdG8gemVyb1xyXG4gICAgICAgIHRoaXMuY3VycltmaXJzdE5vblplcm9WYWx1ZUluZGV4XSA9IDA7XHJcblxyXG4gICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBuZXh0IGluZGV4IGFuZCByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5jcmVtZW50KGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZXguIGN1cnI9WzEsMywwLDBdIG1heD1bMyw0LDQsNV0gcmVzdWx0cyBpbiBhIHZhbGlkIGN1dCBsaXN0LlxyXG4gICAgICAgICAqIE5leHQgaW5jcmVtZW50cyBvZiBbMiwzLDAsMF0gYW5kIFszLDMsMCwwXSB3aWxsIGFsd2F5cyBiZSBtb3JlIGV4cGVuc2l2ZSB0aGFuIFsxLDMsMCwwXS5cclxuICAgICAgICAgKiBNYWtlIGZpcnN0IG5vbi16ZXJvIHZhbHVlIDAgYW5kIGluY3JlbWVudCB2YWx1ZSBhZnRlci5cclxuICAgICAgICAgKiBbMCw0LDAsMF0gLT4gY29udGludWVcclxuICAgICAgICAgKi9cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmVzdGVkTG9vcENvdW50ZXI7XHJcbiIsImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG4vKiogUGllY2Ugb2Ygc2l6ZSB0aGlja25lc3MgeCB3aWR0aCB0aGF0IGlzIHNvbGQgYXQgc3BlY2lmaWMgbGVuZ3RoIGFuZCBwcmljZS4gKi9cclxuY2xhc3MgVW5jdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gV2lkdGggb2YgdW5jdXQgcGllY2UgKGluY2hlcylcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBMZW5ndGggb2YgdW5jdXQgcGllY2UgKGluY2hlcykgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJpY2UgLSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IGlkIC0gSUQgYXMgc3RyaW5nIG9yIG51bGwgaWYgbmV3IHV1aWR2NCBpZCBjcmVhdGVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGxlbmd0aCwgcHJpY2UsIGlkID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkIHx8IHV1aWR2NCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBKU09OIG9iamVjdCBvZiB0aGUgVW5jdXRQaWVjZS5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9ialxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gb2JqLnRoaWNrbmVzc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn0gb2JqLndpZHRoXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBvYmoucHJpY2VcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IG9iai5pZFxyXG4gICAgICovXHJcbiAgICB0b0pzb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGhpY2tuZXNzOiB0aGlzLnRoaWNrbmVzcyxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHByaWNlOiB0aGlzLnByaWNlLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBVbmN1dFBpZWNlIGdpdmVuIEpTT04gb2JqZWN0IG9mIGFuIFVuY3V0UGllY2UuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbk9ialxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoudGhpY2tuZXNzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ganNvbk9iai53aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGpzb25PYmoucHJpY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBqc29uT2JqLmlkXHJcbiAgICAgKiBAcmV0dXJucyB7VW5jdXRQaWVjZX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUZyb21Kc29uKGpzb25PYmopIHtcclxuICAgICAgICByZXR1cm4gbmV3IFVuY3V0UGllY2UoXHJcbiAgICAgICAgICAgIGpzb25PYmoudGhpY2tuZXNzLFxyXG4gICAgICAgICAgICBqc29uT2JqLndpZHRoLFxyXG4gICAgICAgICAgICBqc29uT2JqLmxlbmd0aCxcclxuICAgICAgICAgICAganNvbk9iai5wcmljZSxcclxuICAgICAgICAgICAganNvbk9iai5pZFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVuY3V0UGllY2U7XHJcbiIsIi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBFbGVtZW50IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gRWxlbWVudCBhdHRyaWJ1dGUgbmFtZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWUgXHJcbiAqIEBwYXJhbSAgey4uLk5vZGV9IGNoaWxkcmVuIC0gVmFyaWFibGUgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICAgIC8vIFByb3BzXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGlsZHJlbiBOb2Rlc1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBlbGVtZW50LmFwcGVuZChjaGlsZCkpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnB1dFZhbGlkTGVuZ3RoKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGVtcFZhbHVlID0gTnVtYmVyKGlucHV0RWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgaWYgKGlzTmFOKHRlbXBWYWx1ZSkpIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgYSBudW1iZXIuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRlbXBWYWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCdNdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0RWxlbWVudC5yZXBvcnRWYWxpZGl0eSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnB1dFZhbGlkUHJpY2UoaW5wdXRFbGVtZW50KSB7XHJcbiAgICBjb25zdCB0ZW1wVmFsdWUgPSBOdW1iZXIoaW5wdXRFbGVtZW50LnZhbHVlKTtcclxuXHJcbiAgICBpZiAoaXNOYU4odGVtcFZhbHVlKSkge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBhIG51bWJlci4nKTtcclxuICAgIH0gZWxzZSBpZiAodGVtcFZhbHVlIDwgMCkge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gemVyby4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEVsZW1lbnQucmVwb3J0VmFsaWRpdHkoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIG51bWJlciB3aXRoIGNvbW1hcyBhZGRlZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1hc1RvTnVtYmVyKG51bSkge1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBzdHJpbmcgdG8gbnVtIGFyZ3VtZW50IGNvbnZlcnRlZCB0byBzdHJpbmdcclxuICAgIGxldCBzdHIgPSBudW0udG9TdHJpbmcoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IGluZGV4IG9mIG51bWJlciBzZXF1ZW5jZSB0byBhZGQgY29tbWFzLlxyXG4gICAgICogQ2hlY2sgaWYgbnVtYmVyIGlzIG5lZ2F0aXZlLiBOZWdhdGl2ZSBzaWduIHdpbGwgYmUgc2tpcHBlZC5cclxuICAgICAqIElmIG51bWJlciBpcyBuZWdhdGl2ZSwgc2tpcCBmaXJzdCBpbmRleCBhbmQgc3RhcnQgb24gc2Vjb25kLlxyXG4gICAgICovXHJcbiAgICBsZXQgc3RhcnRJbmRleCA9IChudW0gPCAwKSA/IDEgOiAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIGluZGV4IG9mIG51bWJlciBzZXF1ZW5jZSB0byBhZGQgY29tbWFzLlxyXG4gICAgICogRmluZCB2YWx1ZSBpbiAxJ3MgY29sdW1uIG9mIG51bWJlci5cclxuICAgICAqIEV4YW1wbGVzOiBcclxuICAgICAqIC0gMTIzNDUgaGFzICc1JyBpbiAxJ3MgY29sdW1uXHJcbiAgICAgKiAtIDEyMzQ1LjY3OCBoYXMgJzUnIGluIDEncyBjb2x1bW5cclxuICAgICAqL1xyXG4gICAgbGV0IGRvdENoYXJhY3RlckluZGV4ID0gc3RyLmluZGV4T2YoJy4nKTtcclxuICAgIGxldCBlbmRJbmRleCA9IChkb3RDaGFyYWN0ZXJJbmRleCA9PT0gLTEpIFxyXG4gICAgICAgID8gc3RyLmxlbmd0aCAtIDEgXHJcbiAgICAgICAgOiBkb3RDaGFyYWN0ZXJJbmRleCAtIDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaG9sZSBudW1iZXIgc2VxdWVuY2Ugd2l0aG91dCBuZWdhdGl2ZSBzaWduIE9SIGRlY2ltYWwgcG9ydGlvbiByYW5nZXMgXHJcbiAgICAgKiBmcm9tIHN0YXJ0SW5kZXggdG8gZW5kSW5kZXguXHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBEZWNyZW1lbnQgZW5kSW5kZXggYnkgMiB0byBlcXVhbCBmaXJzdCBpbmRleCB0aGF0IGNvbW1hIGNvdWxkIGJlIGFkZGVkXHJcbiAgICBlbmRJbmRleCAtPSAyO1xyXG5cclxuICAgIC8vIEFkZCBjb21tYXMgaW4gcmV2ZXJzZSwgc2tpcHBpbmcgMyBkaWdpdHMgZXZlcnkgbG9vcCB1bnRpbCByZWFjaCBsYXN0IGRpZ2l0XHJcbiAgICB3aGlsZSAoZW5kSW5kZXggPiBzdGFydEluZGV4KSB7XHJcbiAgICAgICAgLy8gQWRkIGNvbW1hIHRvIGVuZEluZGV4IG9mIHN0cmluZ1xyXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLGVuZEluZGV4KSArICcsJyArIHN0ci5zbGljZShlbmRJbmRleCk7XHJcbiAgICAgICAgLy8gRGVjcmVtZW50IGVuZEluZGV4IHRvIHBvaW50IHRvIGluZGV4IG9mIG5leHQgcG9zc2libGUgY29tbWFcclxuICAgICAgICBlbmRJbmRleCAtPSAzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHN0cmluZyBvZiBkdXJhdGlvbiAobWlsbGlzZWNvbmRzKSBmb3JtYXR0ZWQgdG8gaW5jbHVkZSBkYXlzLCBob3VyLCBcclxuICogbWludXRlcywgc2Vjb25kcywgYW5kL29yIG1pbGxpc2Vjb25kcy5cclxuICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uTWlsbGlzZWNvbmRzIFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uU3RyaW5nKGR1cmF0aW9uTWlsbGlzZWNvbmRzKSB7XHJcbiAgICAvLyBJZiBkdXJhdGlvbiBpcyBsZXNzIHRoYW4gb25lIHNlY29uZCwgcmV0dXJuIGR1cmF0aW9uIGFzIG1pbGxpc2Vjb25kc1xyXG4gICAgaWYgKGR1cmF0aW9uTWlsbGlzZWNvbmRzIDwgMTAwMCkge1xyXG4gICAgICAgIHJldHVybiBgJHtkdXJhdGlvbk1pbGxpc2Vjb25kc30gbWlsbGlzZWNvbmQkeyhkdXJhdGlvbk1pbGxpc2Vjb25kcyAhPT0gMSkgPyAncycgOiAnJ31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFycmF5IHRvIGhvbGQgc3RyaW5ncyBmb3IgZWFjaCB0aW1lIHNjYWxlIChkYXlzLCBob3VycywgZXRjLilcclxuICAgIGxldCBzdHJBcnIgPSBbXTtcclxuICAgIC8vIFZhbHVlIG9mIGRpZ2l0IGluIGN1cnJlbnQgdGltZSBzY2FsZSBmb3IgdGhlIGR1cmF0aW9uXHJcbiAgICBsZXQgZGlnaXQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEdXJhdGlvbiBTY2FsZXMgd2hlcmUgZmlyc3QgaW5kZXggaXMgc3RyaW5nIG9mIHRpbWUgc2NhbGUgdGl0bGUgYW5kIFxyXG4gICAgICogc2Vjb25kIGluZGV4IGlzIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZm9yIHRoYXQgc2FtZSB0aW1lIHNjYWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBkdXJhdGlvblNjYWxlcyA9IFtcclxuICAgICAgICBbJ2RheScsIDg2NDAwMDAwXSxcclxuICAgICAgICBbJ2hvdXInLCAzNjAwMDAwXSxcclxuICAgICAgICBbJ21pbnV0ZScsIDYwMDAwXSxcclxuICAgICAgICBbJ3NlY29uZCcsIDEwMDBdLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgLy8gQWRkIHN0cmluZyBmb3IgZWFjaCBkdXJhdGlvbiB0aW1lIHNjYWxlIHBvc3NpYmxlXHJcbiAgICBkdXJhdGlvblNjYWxlcy5mb3JFYWNoKChbIHN0ciwgdmFsIF0pID0+IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiBjdXJyZW50IGR1cmF0aW9uIGlzIGxhcmdlciB0aGFuIGN1cnJlbnQgdGltZSBzY2FsZSwgZGlnaXQgZm9yIFxyXG4gICAgICAgICAqIHRoZSBjdXJyZW50IHRpbWUgc2NhbGUgd2lsbCBiZSBub256ZXJvLiBFbHNlIGNhbiBza2lwIHRoZSBjdXJyZW50XHJcbiAgICAgICAgICogdGltZSBzY2FsZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoZHVyYXRpb25NaWxsaXNlY29uZHMgPiB2YWwpIHtcclxuICAgICAgICAgICAgLy8gR2V0IHdob2xlIG51bWJlciBvZiBjdXJyZW50IHRpbWUgc2NhbGVcclxuICAgICAgICAgICAgZGlnaXQgPSBNYXRoLmZsb29yKGR1cmF0aW9uTWlsbGlzZWNvbmRzIC8gdmFsKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgZHVyYXRpb24gdG8gcmVtYWluaW5nIG1pbGxpc2Vjb25kcyBmb3IgbmV4dCBsb29wIHRoYXQgdGVzdHNcclxuICAgICAgICAgICAgICogZm9yIHNtYWxsZXIgdGltZSBzY2FsZS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGR1cmF0aW9uTWlsbGlzZWNvbmRzIC09IGRpZ2l0ICogdmFsO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENyZWF0ZSBzdHJpbmcgb2YgY3VycmVudCB0aW1lIHNjYWxlLCBhZGRpbmcgJ3MnIGF0IGVuZCBpZiBkaWdpdFxyXG4gICAgICAgICAgICAgKiBpcyBncmVhdGVyIHRoYW4gb25lLiBUaGVuIGFkZCBzdHJpbmcgdG8gYXJyYXkgb2Ygb3RoZXIgdGltZSBcclxuICAgICAgICAgICAgICogc2NhbGUgc3RyaW5ncyB0byBiZSBqb2luZWQgaW50byBvbmUgc2luZ2xlIHN0cmluZyBsYXRlci5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN0ckFyci5wdXNoKFxyXG4gICAgICAgICAgICAgICAgYCR7ZGlnaXR9ICR7c3RyfSR7KGRpZ2l0ICE9PSAxKSA/ICdzJyA6ICcnfWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSZXR1cm4gZHVyYXRpb24gc3RyaW5ncyBpbiBhcnJheSBhZnRlciBqb2luaW5nIGludG8gc2luZ2xlIHN0cmluZ1xyXG4gICAgcmV0dXJuIHN0ckFyci5qb2luKCcsICcpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBudW1iZXIgZ2l2ZW4gZmVldCwgaW5jaGVzLCBhbmQgZnJhY3Rpb25hbCBwYXJ0IG9mIGltcGVyaWFsIGZvcm1hdHRlZFxyXG4gKiBudW1iZXIuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuRmVldCBcclxuICogQHBhcmFtIHtudW1iZXJ9IG5JbmNoZXMgXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFjdGlvbk51bWVyYXRvciBcclxuICogQHBhcmFtIHtudW1iZXJ9IGZyYWN0aW9uRGVub21pbmF0b3IgXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEltcGVyaWFsV2l0aEZyYWN0aW9uVG9OdW0oXHJcbiAgICBuRmVldCwgXHJcbiAgICBuSW5jaGVzID0gMCwgXHJcbiAgICBmcmFjdGlvbk51bWVyYXRvciA9IDAsIFxyXG4gICAgZnJhY3Rpb25EZW5vbWluYXRvciA9IDMyXHJcbikge1xyXG4gICAgcmV0dXJuIChuRmVldCAqIDEyKSArIG5JbmNoZXMgKyAoZnJhY3Rpb25OdW1lcmF0b3IgLyBmcmFjdGlvbkRlbm9taW5hdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgc3RyaW5nIG9mIGEgbnVtYmVyIGluIGltcGVyaWFsIGZvcm1hdCBnaXZlbiBmZWV0LCBpbmNoZXMsIGFuZCBcclxuICogZnJhY3Rpb25hbCBwYXJ0IG9mIHRoZSBudW1iZXIuIFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbkZlZXQgXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuSW5jaGVzIFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZnJhY3Rpb25OdW1lcmF0b3IgXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcmFjdGlvbkRlbm9taW5hdG9yIFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltcGVyaWFsTnVtV2l0aEZyYWN0aW9uKFxyXG4gICAgbkZlZXQsIFxyXG4gICAgbkluY2hlcyA9IDAsIFxyXG4gICAgZnJhY3Rpb25OdW1lcmF0b3IgPSAwLCBcclxuICAgIGZyYWN0aW9uRGVub21pbmF0b3IgPSAzMlxyXG4pIHtcclxuICAgIC8vIElmIHdob2xlIG51bWJlciBpcyB6ZXJvLCBqdXN0IHJldHVybiB6ZXJvIGFzIHN0cmluZ1xyXG4gICAgaWYgKChuRmVldCA9PT0gMCkgJiYgKG5JbmNoZXMgPT09IDApICYmIChmcmFjdGlvbk51bWVyYXRvciA9PT0gMCkpIHtcclxuICAgICAgICByZXR1cm4gJzAnO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdHIgPSAnJztcclxuXHJcbiAgICAvLyBGZWV0XHJcblxyXG4gICAgLy8gSWYgZmVldCBpcyBub256ZXJvLCBhZGQgZmVldCB0byBzdHJpbmcgd2l0aCBhIHNpbmdsZSBxdW90YXRpb24gbWFya1xyXG4gICAgaWYgKG5GZWV0ICE9PSAwKSB7XHJcbiAgICAgICAgc3RyICs9IG5GZWV0ICsgJ1xcJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jaGVzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBpbmNoZXMgQU5EIGZyYWN0aW9uIGlzIG5vbnplcm8sIGFkZCBib3RoIHRvIHN0cmluZyB3aXRoIGRvdWJsZSBcclxuICAgICAqIHF1b3RhdGlvbiBtYXJrcy5cclxuICAgICAqL1xyXG4gICAgaWYgKG5JbmNoZXMgIT09IDAgJiYgZnJhY3Rpb25OdW1lcmF0b3IgIT09IDApIHtcclxuICAgICAgICBzdHIgKz0gYCR7bkluY2hlc30tJHtmcmFjdGlvbk51bWVyYXRvcn0vJHtmcmFjdGlvbkRlbm9taW5hdG9yfVwiYDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRWxzZSBpZiBpbmNoZXMgaXMgbm9uemVybyBBTkQgZnJhY3Rpb24gaXMgemVybywgYWRkIGp1c3QgaW5jaGVzIHRvXHJcbiAgICAgKiBzdHJpbmcgd2l0aCBkb3VibGUgcXVvdGF0aW9uIG1hcmtzLlxyXG4gICAgICovXHJcbiAgICBlbHNlIGlmIChuSW5jaGVzICE9PSAwKSB7XHJcbiAgICAgICAgc3RyICs9IG5JbmNoZXMgKyAnXCInO1xyXG4gICAgfSBcclxuICAgIC8qKlxyXG4gICAgICogRWxzZSBpZiBpbmNoZXMgaXMgemVybyBBTkQgZnJhY3Rpb24gaXMgbm9uemVybywgYWRkIGZyYWN0aW9uIHRvIHN0cmluZ1xyXG4gICAgICogd2l0aCBkb3VibGUgcXVvdGF0aW9uIG1hcmtzLlxyXG4gICAgICovXHJcbiAgICBlbHNlIGlmIChmcmFjdGlvbk51bWVyYXRvciAhPT0gMCkge1xyXG4gICAgICAgIC8vIElmIGZlZXQgaXMgYWxzbyBub256ZXJvLCBhZGQgemVybyB0byBzdHJpbmcgYmVmb3JlIGZyYWN0aW9uXHJcbiAgICAgICAgaWYgKG5GZWV0ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHN0ciArPSAnMC0nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RyICs9IGAke2ZyYWN0aW9uTnVtZXJhdG9yfS8ke2ZyYWN0aW9uRGVub21pbmF0b3J9XCJgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOT1RFUzpcclxuICAgICAqIDEnXHJcbiAgICAgKiAxJy0yXCJcclxuICAgICAqIDEnLTIgMy84XCJcclxuICAgICAqIDEnLTAgMy84XCJcclxuICAgICAqIDJcIlxyXG4gICAgICogMiAzLzhcIlxyXG4gICAgICogMy84XCJcclxuICAgICAqIE9SXHJcbiAgICAgKiAxJ1xyXG4gICAgICogMScyXCJcclxuICAgICAqIDEnMi0zLzhcIlxyXG4gICAgICogMScwLTMvOFwiXHJcbiAgICAgKiAyXCJcclxuICAgICAqIDItMy84XCJcclxuICAgICAqIDMvOFwiXHJcbiAgICAgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIG51bWJlciB0byBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgbnVtYmVyIGluIGltcGVyaWFsIHVuaXRzIHdpdGggXHJcbiAqIGZyYWN0aW9uLCBnaXZlbiBtYXggYmFzZSBwb3dlciBvZiB0d28gZm9yIHByZWNpc2lvbiAoZXguIG1heEJhc2U9MyBmb3IgXHJcbiAqIDEvKDIqKjMpPTEvOFwiIHByZWNpc2lvbikuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhCYXNlIFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnROdW1Ub0ltcGVyaWFsV2l0aEZyYWN0aW9uKG51bSwgbWF4QmFzZSA9IDUpIHtcclxuICAgIC8vIE51bWJlciBvZiBmZWV0XHJcbiAgICBjb25zdCBuRmVldCA9IChudW0gPj0gMTIpID8gTWF0aC5mbG9vcihudW0gLyAxMikgOiAwO1xyXG5cclxuICAgIC8vIE51bWJlciBvZiBpbmNoZXNcclxuICAgIGNvbnN0IG5JbmNoZXMgPSBNYXRoLmZsb29yKG51bSAtIG5GZWV0ICogMTIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJhY3Rpb25cclxuICAgICAqIFRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHByZWNpc2lvbiBlcnJvcnMsIGNvbnZlcnQgbnVtIHRvIHN0cmluZyBhbmQgXHJcbiAgICAgKiBzcGxpdCBvbiAnLicgaWYgcHJlc2VudCBhdCBhbGwuIEluaXRpYWwgdmFsdWUgd2lsbCBpbml0aWFsbHkgYmUgXHJcbiAgICAgKiBkZWNpbWFsIG9mIG51bSBhcyBzdHJpbmcgT1IgdW5kZWZpbmVkIGlmIE5PIGRlY2ltYWwuXHJcbiAgICAgKi9cclxuICAgIGxldCBkZWNpbWFsID0gbnVtLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgb25seSBkZWNpbWFsIGZyb20gc3RyaW5nIGJhY2sgdG8gbnVtYmVyLiBJZiBubyBkZWNpbWFsIHdhcyBcclxuICAgICAqIGZvdW5kLCBzZXQgZGVjaW1hbCB0byB6ZXJvLlxyXG4gICAgICovXHJcbiAgICBkZWNpbWFsID0gKGRlY2ltYWwgIT09IHVuZGVmaW5lZCkgPyBOdW1iZXIoJy4nICsgZGVjaW1hbCkgOiAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBmcmFjdGlvbiBudW1lcmF0b3IgYW5kIGRlbm9taW5hdG9yICh1c2luZyBsb2cgYmFzZSAyIHBvd2VyKS5cclxuICAgICAqIEV4YW1wbGVzOiBcclxuICAgICAqIDJeMSA9IG4vMlwiXHJcbiAgICAgKiAyXjIgPSBuLzRcIlxyXG4gICAgICogMl4zID0gbi84XCJcclxuICAgICAqIDJeNCA9IG4vMTZcIlxyXG4gICAgICovXHJcbiAgICBcclxuICAgIC8vIFRvcCBwYXJ0IG9mIGZyYWN0aW9uLCBpbml0aWFsaXplZCB0byB6ZXJvIGluIGNhc2UgdGhlcmUgaXMgbm8gZGVjaW1hbFxyXG4gICAgbGV0IGZyYWN0aW9uTnVtZXJhdG9yID0gMDtcclxuICAgIFxyXG4gICAgaWYgKGRlY2ltYWwgIT09IDApIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCeSBtdWx0aXBseWluZyB0aGUgZGVjaW1hbCBieSAyKipuIGFuZCByb3VuZGluZyB0aGUgcHJvZHVjdCwgdGhlXHJcbiAgICAgICAgICogZmluYWwgbnVtYmVyIGlzIHRvcCBwYXJ0IG9mIGZyYWN0aW9uIGFuZCAyKipuIGlzIGJvdHRvbSBwYXJ0IG9mXHJcbiAgICAgICAgICogZnJhY3Rpb24uIElmIHRvcCBwYXJ0IG9mIGZyYWN0aW9uIGlzIGV2ZW4gKGRpdmlzaWJsZSBieSAyKSwgdGhlblxyXG4gICAgICAgICAqIHRoZSBmcmFjdGlvbiBjYW4gYmUgZnVydGhlciBzaW1wbGlmaWVkIGJ5IHVzaW5nIHNtYWxsZXIgbG9nIGJhc2VcclxuICAgICAgICAgKiAyIHBvd2VyLCAyKioobi0xKS4gS2VlcCBmaW5kaW5nIHRvcCBwYXJ0IG9mIGZyYWN0aW9uIHdoaWxlIFxyXG4gICAgICAgICAqIGRlY3JlbWVudGluZyBsb2cgYmFzZSBwb3dlciBvZiAyIHVudGlsIGl0IGJlY29tZXMgb2RkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgZnJhY3Rpb25OdW1lcmF0b3IgPSBNYXRoLnJvdW5kKGRlY2ltYWwgKiAoMioqbWF4QmFzZSkpO1xyXG4gICAgICAgICAgICBtYXhCYXNlLS07XHJcbiAgICAgICAgfSB3aGlsZSAoZnJhY3Rpb25OdW1lcmF0b3IgJSAyID09PSAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gaW1wZXJpYWwgbnVtYmVyIGFzIHN0cmluZyB1c2luZyBmZWV0LCBpbmNoZXMsIGFuZCBmcmFjdGlvblxyXG4gICAgcmV0dXJuIGNyZWF0ZUltcGVyaWFsTnVtV2l0aEZyYWN0aW9uKFxyXG4gICAgICAgIG5GZWV0LCBcclxuICAgICAgICBuSW5jaGVzLCBcclxuICAgICAgICBmcmFjdGlvbk51bWVyYXRvciwgXHJcbiAgICAgICAgMioqKG1heEJhc2UgKyAxKVxyXG4gICAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsZWFycyBIVE1MRWxlbWVudCBvZiBhbnkgY2hpbGRyZW4gZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gXCIuL2N1dExpc3RDYWxjdWxhdG9yLmpzXCI7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICBjb25zdCBiZXN0Q3V0TGlzdHMgPSBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDdXRMaXN0cyhcclxuICAgICAgICAuLi5lLmRhdGEsXHJcbiAgICAgICAgcG9zdE1lc3NhZ2VcclxuICAgICk7XHJcbiAgICBcclxuICAgIHBvc3RNZXNzYWdlKGJlc3RDdXRMaXN0cyk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJDb3VudEFycmF5IiwiYXJyIiwidG90YWwiLCJjb25zdHJ1Y3RvciIsImluaXRBcnIiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJzZXQiLCJwdXNoIiwiX2xlbiIsIml0ZW1zIiwiQXJyYXkiLCJfa2V5IiwidXBkYXRlVG90YWwiLCJuZXdBcnIiLCJ2YWx1ZUF0SW5kZXgiLCJpbmRleCIsImRlY3JlbWVudFZhbHVlQXRJbmRleCIsImluY3JlbWVudFZhbHVlQXRJbmRleCIsIiN1cGRhdGVUb3RhbCIsInJlZHVjZSIsImFjY3VtIiwiY3VyciIsIkN1dFNlcXVlbmNlIiwiQ3V0TGlzdCIsImN1dFNlcXVlbmNlcyIsImZpbHRlciIsImN1dFNlcXVlbmNlIiwiY2xlYXIiLCJnZXRQcmljZSIsInVuY3V0UGllY2UiLCJwcmljZSIsImRlZXBDb3B5IiwiY3V0TGlzdCIsImdldE1hdGVyaWFsTGlzdCIsIm1hdGVyaWFsTGlzdE9iaiIsImZvckVhY2giLCJxdWFudGl0eSIsImNyb3NzU2VjdGlvbiIsInRoaWNrbmVzcyIsIndpZHRoIiwidW5pdFByaWNlIiwidG9Kc29uIiwibWFwIiwiY3JlYXRlRnJvbUpzb24iLCJqc29uT2JqIiwiY3V0U2VxdWVuY2VKc29uIiwiQ3V0UGllY2UiLCJVbmN1dFBpZWNlIiwiY3V0TGlzdENhbGN1bGF0b3JQcm9ncmVzcyIsIk5lc3RlZExvb3BDb3VudGVyIiwiY3JlYXRlRHVyYXRpb25TdHJpbmciLCJjdXRMaXN0Q2FsY3VsYXRvciIsImRlY3JlbWVudCIsImN1cnJOdW1BdmFpbGFibGVVbmN1dExlbmd0aHMiLCJtYXhOdW1BdmFpbGFibGVVbmN1dExlbmd0aHMiLCJnZXRDdXRMaXN0cyIsImN1dFBpZWNlcyIsInVuY3V0UGllY2VzIiwicHJvZ3Jlc3NDYWxsYmFjayIsImNvbnNvbGUiLCJsb2ciLCJwaWVjZXMiLCJjdXRMaXN0cyIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjdXRQaWVjZSIsImN1dFdpdGhLZXJmIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJjdXQiLCJ1bmN1dCIsImN1cnJDdXRMaXN0IiwidmFsdWVzIiwicGllY2VUaGlja25lc3NPYmoiLCJwaWVjZU9iaiIsImdldENoZWFwZXN0Q3V0TGlzdCIsInNvcnQiLCJhIiwiYiIsImN1dFBpZWNlUXVhbnRpdGllcyIsImluZGl2aWR1YWxDdXRQaWVjZXNUb3RhbExlbmd0aCIsImN1dFNlcXVlbmNlQXJyIiwiYmVzdEN1dExpc3QiLCJudW1BdmFpbGFibGVVbmN1dFBpZWNlc05MQyIsImN1cnJDdXRQaWVjZVF1YW50aXRpZXMiLCJjcmVhdGVDdXRTZXF1ZW5jZUFyciIsIm1heCIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcEN1cnJOdW1BdmFpbGFibGVVbmN1dFBpZWNlc0NvdW50ZXIiLCJjdXJyTnVtQXZhaWxhYmxlVW5jdXRMZW5ndGhzVG90YWxQcmljZSIsInNraXBGbGFnIiwic2V0TWF4Q291bnQiLCJnZXRNYXhDb3VudCIsInNldFByb2dyZXNzQ2FsbGJhY2siLCJzZXRDb3VudCIsImdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQiLCJjb3VudCIsImZpbmRJbmRleCIsInZhbCIsInNraXAiLCJpbmNyZW1lbnQiLCJhZGRDb21tYXNUb051bWJlciIsIkxlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbCIsImRlY2ltYWxEaWdpdHNUb0Rpc3BsYXkiLCJ1cGRhdGVJbnRlcnZhbCIsImN1cnJDb3VudCIsIm1heENvdW50IiwibGFzdERpc3BsYXlEZWx0YVRpbWUiLCJsZWFzdFNxdWFyZXNGaXR0aW5nRXhwb25lbnRpYWwiLCJnZXRQZXJjZW50YWdlIiwibmV3Q291bnQiLCJkZWx0YVRpbWUiLCJwZXJjZW50YWdlIiwiYWRkRGF0YVBvaW50IiwiTWF0aCIsImZsb29yIiwidGltZUxlZnRFc3RpbWF0ZSIsInNvbHZlRm9yWCIsInRvRml4ZWQiLCJuZXdNYXhDb3VudCIsIm5ld1Byb2dyZXNzQ2FsbGJhY2siLCJ2NCIsInV1aWR2NCIsImtlcmYiLCJpZCIsInJlbWFpbmluZ0xlbmd0aCIsInRvU3RyaW5nIiwiY3V0UGllY2VKc29uIiwic2VsZWN0ZWRDdXRQaWVjZXNBcnIiLCJjdXRQaWVjZXNTdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiZXhhY3RMZW5ndGhGbGFnIiwiaSIsImNyZWF0ZUN1dFNlcXVlbmNlQXJyUmVjIiwic2VsZWN0ZWRDdXRQaWVjZSIsIm5Mb2dZIiwieFNxdWFyZWQiLCJ4IiwieE5Mb2dZIiwibiIsInkiLCJBIiwiZXhwIiwiQiIsIkxlYXN0U3F1YXJlc0ZpdHRpbmdFeHBvbmVudGlhbEFkdiIsInhTcXVhcmVkWSIsInlOTG9nWSIsInhZIiwieFlOTG9nWSIsImZpbGwiLCJsYXN0Tm9uWmVyb0luZGV4IiwiZmluZExhc3RJbmRleCIsInNsaWNlIiwiZmlyc3ROb25aZXJvVmFsdWVJbmRleCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwicHJvcHMiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJrZXkiLCJ2YWx1ZSIsImVudHJpZXMiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImNoaWxkIiwiYXBwZW5kIiwiaXNJbnB1dFZhbGlkTGVuZ3RoIiwiaW5wdXRFbGVtZW50IiwidGVtcFZhbHVlIiwiTnVtYmVyIiwiaXNOYU4iLCJzZXRDdXN0b21WYWxpZGl0eSIsInJlcG9ydFZhbGlkaXR5IiwiaXNJbnB1dFZhbGlkUHJpY2UiLCJudW0iLCJzdHIiLCJzdGFydEluZGV4IiwiZG90Q2hhcmFjdGVySW5kZXgiLCJpbmRleE9mIiwiZW5kSW5kZXgiLCJkdXJhdGlvbk1pbGxpc2Vjb25kcyIsInN0ckFyciIsImRpZ2l0IiwiZHVyYXRpb25TY2FsZXMiLCJfcmVmIiwiam9pbiIsImNvbnZlcnRJbXBlcmlhbFdpdGhGcmFjdGlvblRvTnVtIiwibkZlZXQiLCJuSW5jaGVzIiwiZnJhY3Rpb25OdW1lcmF0b3IiLCJmcmFjdGlvbkRlbm9taW5hdG9yIiwiY3JlYXRlSW1wZXJpYWxOdW1XaXRoRnJhY3Rpb24iLCJjb252ZXJ0TnVtVG9JbXBlcmlhbFdpdGhGcmFjdGlvbiIsIm1heEJhc2UiLCJkZWNpbWFsIiwic3BsaXQiLCJyb3VuZCIsImNsZWFyRWxlbWVudCIsIkhUTUxFbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib25tZXNzYWdlIiwiZSIsImJlc3RDdXRMaXN0cyIsImRhdGEiLCJwb3N0TWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=