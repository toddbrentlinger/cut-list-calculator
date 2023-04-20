/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/cutListCalculatorComponent.js":
/*!*********************************************************!*\
  !*** ./src/js/components/cutListCalculatorComponent.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.js */ "./src/js/components/footer.js");
/* harmony import */ var _cutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cutPieceAddForm.js */ "./src/js/cutPieceAddForm.js");
/* harmony import */ var _uncutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uncutPieceAddForm.js */ "./src/js/uncutPieceAddForm.js");
/* harmony import */ var _cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cutPieceComponent.js */ "./src/js/components/cutPieceComponent.js");
/* harmony import */ var _uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uncutPieceComponent.js */ "./src/js/components/uncutPieceComponent.js");
/* harmony import */ var _cutListComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cutListComponent.js */ "./src/js/components/cutListComponent.js");
/* harmony import */ var _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cutListCalculator.js */ "./src/js/cutListCalculator.js");
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");










const cutListCalculatorComponent = (() => {
  let cutPieces = [];
  let uncutPieces = [];
  let bestCutList;
  let cutListElement;
  let cutPiecesTableBody;
  let uncutPiecesTableBody;
  function init() {
    document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2023).render());
    const createCutListBtn = document.getElementById('create-cut-list-btn');
    if (createCutListBtn) {
      createCutListBtn.addEventListener('click', handleCreateCutListClick);
    }
    cutListElement = document.getElementById('cut-list');
    _cutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_1__["default"].init(handleCutPieceAddFormSubmit);
    _uncutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_2__["default"].init(handleUncutPieceAddFormSubmit);
    const cutPieceTable = document.createElement('table');
    cutPieceTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('thead', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Thickness'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Width'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Quantity'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Kerf'))));
    const uncutPieceTable = document.createElement('table');
    uncutPieceTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('thead', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Thickness'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Width'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_9__.createElement)('th', {}, 'Price'))));
    cutPiecesTableBody = cutPieceTable.appendChild(document.createElement('tbody'));
    uncutPiecesTableBody = uncutPieceTable.appendChild(document.createElement('tbody'));
    _cutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_1__["default"].formElement.before(cutPieceTable);
    _uncutPieceAddForm_js__WEBPACK_IMPORTED_MODULE_2__["default"].formElement.before(uncutPieceTable);
  }
  function addCutPiece(cutPiece) {
    cutPieces.push(cutPiece);
    return cutPiece;
  }
  function addUncutPiece(uncutPiece) {
    uncutPieces.push(uncutPiece);
    return uncutPiece;
  }
  function handleCutPieceAddFormSubmit(e) {
    e.preventDefault();

    // Create CutPiece from form inputs
    const cutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_7__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));

    // Add CutPiece to list through cutPiecesRef
    addCutPiece(cutPiece);

    // Display new CutPiece
    cutPiecesTableBody.append((0,_cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cutPiece).render());
  }
  function handleUncutPieceAddFormSubmit(e) {
    e.preventDefault();

    // Create UncutPiece from form inputs
    const uncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_8__.UncutPiece(new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_8__.CrossSection(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value)), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));

    // Add UncutPiece to list through uncutPieces
    addUncutPiece(uncutPiece);

    // Display new UncutPiece
    uncutPiecesTableBody.append((0,_uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(uncutPiece).render());
  }
  function handleCreateCutListClick(e) {
    e.preventDefault();
    bestCutList = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_6__["default"].getCheapestCutList(cutPieces, uncutPieces);
    cutListElement.append((0,_cutListComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(bestCutList).render());
  }
  return {
    init
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutListCalculatorComponent);

/***/ }),

/***/ "./src/js/components/cutListComponent.js":
/*!***********************************************!*\
  !*** ./src/js/components/cutListComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutListComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutListComponent(cutList) {
  const render = function () {
    const materialList = cutList.displayMaterialList();
    const element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'cut-list'
    });
    for (const [key, value] of Object.entries(materialList)) {
      element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', {}, `${value} X ${key}" long pieces`));
    }
    return element;
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutPieceComponent.js":
/*!************************************************!*\
  !*** ./src/js/components/cutPieceComponent.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutPieceComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutPieceComponent(cutPiece) {
  const render = function () {
    return (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {
      'class': 'cut-piece'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.cutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.kerf));
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/footer.js":
/*!*************************************!*\
  !*** ./src/js/components/footer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function Footer(copyrightYear) {
  const render = function () {
    const footer = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('footer', {
      'class': 'white-text-shadow'
    });
    const currYear = new Date().getFullYear();

    // Paragraph element as child of footer
    let tempElement = footer.appendChild(document.createElement('p'));

    // Small element as child of paragraph
    tempElement = tempElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('small', {}, 'Source Code © ', (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('time', {
      id: 'copyright-year'
    }, currYear > copyrightYear ? `${copyrightYear}-${currYear}` : copyrightYear), ' Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.'));
    return footer;
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/uncutPieceComponent.js":
/*!**************************************************!*\
  !*** ./src/js/components/uncutPieceComponent.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UncutPieceComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function UncutPieceComponent(uncutPiece) {
  const render = function () {
    return (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {
      'class': 'uncut-piece'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutPiece.crossSection.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutPiece.crossSection.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutPiece.length), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutPiece.price));
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/cutList.js":
/*!***************************!*\
  !*** ./src/js/cutList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CutList": () => (/* binding */ CutList),
/* harmony export */   "cutList": () => (/* binding */ cutList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CutList {
  constructor() {
    let cutSequences = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.cutSequences = cutSequences;
  }
  clear() {
    this.cutSequences = [];
  }
  push(cutSequence) {
    // TODO: Type check

    this.cutSequences.push(cutSequence);
  }
  getPrice() {
    return this.cutSequences.reduce((accum, curr) => accum + curr.uncutPiece.price, 0);
  }
  deepCopy() {
    let cutList = new CutList();
    cutList.cutSequences = [...this.cutSequences];
    return cutList;
  }

  /** Display to console an object with keys as uncut lengths and values as corresponding quantity. */
  displayMaterialList() {
    const materialListObj = {};
    this.cutSequences.forEach(cutSequence => {
      if (cutSequence.uncutPiece.length in materialListObj) {
        materialListObj[cutSequence.uncutPiece.length]++;
      } else {
        materialListObj[cutSequence.uncutPiece.length] = 1;
      }
    });
    console.log(materialListObj);
    return materialListObj;
  }
}
const cutList = {
  /**
   * Recursive function that returns list of CutPieces and minimal remaining length.
   * @param {Number} remainingLength 
   * @param {[CutPiece]} individualCutPieces 
   * @param {[Number]} availableCutPiecesByIndex 
   * @param {Number} startIndex (default = 0) 
   * @returns {[...CutPiece, Number]} Array of CutPieces with leftover length of whole piece at the end
   */
  getCutList: function (remainingLength, individualCutPieces, availableCutPiecesByIndex) {
    let startIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    // Return if availableCutPiecesByIndex is empty
    if (!availableCutPiecesByIndex.length) {
      return [remainingLength];
    }
    let selectedCutPieceIndex;
    for (let i = startIndex; i < availableCutPiecesByIndex.length; i++) {
      // Check if cutLength equal to remaining length (DO NOT INCLUDE KERF)
      if (individualCutPieces[availableCutPiecesByIndex[i]].cutLength == remainingLength) {
        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        availableCutPiecesByIndex.splice(i, 1);
        return [individualCutPieces[availableCutPiecesByIndex[i]], 0];
      }

      // Find index of largest cutLength that can be cut with remainingLength (INCLUDE KERF)
      if (selectedCutPieceIndex == undefined && individualCutPieces[availableCutPiecesByIndex[i]].cutWithKerf < remainingLength) {
        selectedCutPieceIndex = i;
      }
    }

    // Check if selectedCutPieceIndex is still undefined - All cutLength+kerf are more than remainingLength
    // Return just remaining length
    if (selectedCutPieceIndex == undefined) {
      return [remainingLength];
    }

    // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
    // being selected for than once.
    const selectedCutPiece = individualCutPieces[availableCutPiecesByIndex.splice(selectedCutPieceIndex, 1)];
    return [selectedCutPiece, ...cutList.getCutList(remainingLength - selectedCutPiece.cutWithKerf, individualCutPieces, availableCutPiecesByIndex, selectedCutPieceIndex)];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutList);

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
/* harmony import */ var _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutSequence.js */ "./src/js/cutSequence.js");


const cutListCalculator = (() => {
  let bestCutList;

  /**
   * 
   * @param {[Number]} numAvailableLengthsCounter 
   * @param {[Number]} maxNumAvailableLengths 
   * @returns {Number}
   */
  /**
   * How to get number from counter?
   * max = [5,4,3,2]
   * possibilities = 6*5*4*3 = 360
   * 
   * counter = [3,0,0,0]
   * [0] 1
   * [3] +3
   * 4
   * - First index is last non-zero index, add first index value plus one
   * 3 + 1 = 4
   * 
   * counter = [5,0,0,0]
   * - First index is last non-zero index, add first index value plus one
   * 5 + 1 = 6
   * 
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
  function getDynamicNestedLoopCount(numAvailableLengthsCounter, maxNumAvailableLengths) {
    // If array is empty return zero
    if (!numAvailableLengthsCounter.length) {
      return 0;
    }
    const lastNonZeroIndex = numAvailableLengthsCounter.findLastIndex(val => val > 0);
    // If lastNonZeroIndex is -1, all values of array are zero. Return one count.
    if (lastNonZeroIndex === -1) {
      return 1;
    }

    // If reach here, lastNonZeroIndex >= 0 after findLastIndex() call

    // Initialize count to first index value plus one
    let count = numAvailableLengthsCounter[0] + 1;

    // For every index after the first up to lastNonZeroIndex, add the 
    // product of all previous indices corresponding max value plus one
    for (let i = 1; i <= lastNonZeroIndex; i++) {
      count += numAvailableLengthsCounter[i] * maxNumAvailableLengths.slice(0, i).reduce((accum, curr) => accum * (curr + 1));
    }
    return count;
  }
  function getPercentage(numAvailableLengthsCounter, maxNumAvailableLengths) {
    const num = getDynamicNestedLoopCount(numAvailableLengthsCounter, maxNumAvailableLengths);
    const maxLastNonZeroIndex = maxNumAvailableLengths.findLastIndex(val => val > 0);
    const max = maxNumAvailableLengths.slice(0, maxLastNonZeroIndex === -1 ? maxNumAvailableLengths.length : maxLastNonZeroIndex + 1).map(val => val + 1).reduce((accum, curr) => accum * curr);
    const percentage = num / max * 100;
    //console.log(`Num: ${num} - Max: ${max} - %${percentage.toFixed(2)}`);
    return percentage;
  }
  function skip(numAvailableLengthsCounter, maxNumAvailableLengths) {
    /**
     * ex. curr=[1,3,0,0] max=[3,4,4,5] results in a valid cut list.
     * Next increments of [2,3,0,0] and [3,3,0,0] will always be more expensive than [1,3,0,0].
     * Make first non-zero value 0 and increment value after.
     * [0,4,0,0] -> continue
     */

    const firstNonZeroValueIndex = numAvailableLengthsCounter.findIndex(val => val > 0);
    if (firstNonZeroValueIndex === undefined) {
      // Array is empty OR all values are zero
      return;
    }
    numAvailableLengthsCounter[firstNonZeroValueIndex] = 0;
    return increment(numAvailableLengthsCounter, maxNumAvailableLengths, firstNonZeroValueIndex + 1);
  }
  function increment(numAvailableLengthsCounter, maxNumAvailableLengths) {
    let index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // Increment value in first index of numAvailableLengthsCounter
    // If new value exceeds value in same index of maxNumAvailableLengths
    // Set index of numAvailableLengthsCounter to zero
    // Increment value in next index of numAvailableLengthsCounter
    // Repeat using recursion

    // Check if reached end
    if (index >= numAvailableLengthsCounter.length) {
      return null;
    }
    numAvailableLengthsCounter[index]++;
    if (numAvailableLengthsCounter[index] > maxNumAvailableLengths[index]) {
      numAvailableLengthsCounter[index] = 0;
      return increment(numAvailableLengthsCounter, maxNumAvailableLengths, ++index);
    }
  }
  function decrement(numAvailableLengthsCounter, maxNumAvailableLengths) {
    let index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // Check if reached end
    if (index >= numAvailableLengthsCounter.length) {
      return null;
    }
    numAvailableLengthsCounter[index]--;
    if (numAvailableLengthsCounter[index] < 0) {
      numAvailableLengthsCounter[index] = 0;
      return decrement(numAvailableLengthsCounter, maxNumAvailableLengths, ++index);
    }
    return index;
  }
  function getCheapestCutList(cutPieces, uncutPieces) {
    bestCutList = undefined;

    // Sort cutPieces by cutLength in decreasing order
    cutPieces.sort((a, b) => b.cutLength - a.cutLength);

    // Sort availableLengthsArr in decreasing order
    //availableLengthsArr.sort((a,b) => b - a);

    // Sort uncutPieces in descending order of length
    uncutPieces.sort((a, b) => b.length - a.length);

    // Create array where each value represents a single quantity cutPiece
    // instead of normal array of cutPieces that has any number quantity in the
    // 'quantity' property.
    let individualCutPieces = cutPieces.flatMap(cutPiece => {
      return new Array(cutPiece.quantity).fill(cutPiece);
    });

    // Maximum number of each available lengths needed if only used that 
    // available length for all cutPieces (initialized to zero)
    let maxNumAvailableLengths = new Array(uncutPieces.length).fill(0);
    let numAvailableLengthsCounter = new Array(uncutPieces.length).fill(0);
    let availableCutPiecesByIndex, cutSequence, cutSequenceArr;
    let currCutList = new _cutList_js__WEBPACK_IMPORTED_MODULE_0__.CutList();
    uncutPieces.forEach((uncutPiece, index) => {
      //maxNum = Math.ceil(totalCutLength / uncutPiece.length);

      availableCutPiecesByIndex = Array.from({
        length: individualCutPieces.length
      }, (value, index) => index);

      // Clear current CutList from previous loop
      currCutList.clear();

      // Check that maxNum of uncutPiece.length can be used with the cutPieces required.
      // If not, keep incrementing until reach a value that is successful.
      // TODO: Do not need maxNum. Only need to check availableCutPiecesByIndex and still increment count in maxNumAvailableLengths
      // TODO: Infinite loop if cut piece is longer than uncut piece length. Array availableCutPiecesByIndex never reaches zero.
      while (availableCutPiecesByIndex.length) {
        cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__["default"].createCutSequenceArr(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
        //debugger;
        // If cutSequenceArr returns just the remaining value (array length 1),
        // no more cut pieces can be used.
        if (cutSequenceArr.length == 1) {
          break;
        }

        // Create CutSequence instance from cutSequenceArr
        cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__["default"](uncutPiece);
        cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
        cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];

        // Add CutSequence to current CutList
        currCutList.push(cutSequence);

        // Increment count of max number of corresponding UncutPiece
        maxNumAvailableLengths[index]++;
      }

      // Check if current CutList has less price than the best CutList only if NO available cut pieces still left
      if (!availableCutPiecesByIndex.length && (bestCutList == undefined || bestCutList.getPrice() >= currCutList.getPrice())) {
        bestCutList = currCutList.deepCopy();
      }
    });
    let incrementTrigger, decrementTrigger, tempNumAvailableLengthsCounter, skipFlag;
    let percentFactorCounter = 1;
    let percentMultipleDisplay = 5;
    do {
      //debugger;
      //console.log(numAvailableLengthsCounter);
      let percentage = getPercentage(numAvailableLengthsCounter, maxNumAvailableLengths);
      if (percentage && percentage > percentMultipleDisplay * percentFactorCounter) {
        console.log(`${percentage.toFixed(0)}%`);
        percentFactorCounter++;
      }
      skipFlag = false;

      // If all values are zero, skip
      // If only one value is non-zero, skip since already check those cases previously
      // If length of all uncut pieces is less than length of all cut pieces, skip since not enough material
      if (numAvailableLengthsCounter.filter(count => count > 0).length > 1 && numAvailableLengthsCounter.reduce((accum, curr, index) => accum + curr * uncutPieces[index].length, 0) >= individualCutPieces.reduce((accum, curr) => accum + curr.cutWithKerf, 0)) {
        tempNumAvailableLengthsCounter = [...numAvailableLengthsCounter];
        availableCutPiecesByIndex = Array.from({
          length: individualCutPieces.length
        }, (value, index) => index);

        // Clear current CutList from previous loop
        currCutList.clear();
        do {
          //debugger;
          // Check that maxNum of uncutPieces[decrementTrigger].length can be used with the cutPieces required.
          // If not, keep incrementing until reach a value that is successful.

          decrementTrigger = decrement(tempNumAvailableLengthsCounter, maxNumAvailableLengths);
          if (decrementTrigger === null) {
            break;
          }
          cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__["default"].createCutSequenceArr(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);

          // Create CutSequence instance from cutSequenceArr
          cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__["default"](uncutPieces[decrementTrigger]);
          cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
          cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];

          // Add CutSequence to current CutList
          currCutList.push(cutSequence);
        } while (availableCutPiecesByIndex.length);

        // Check if current CutList has less price than the best CutList
        // If there are still available cut pieces, not enough uncut pieces. 

        if (!availableCutPiecesByIndex.length) {
          // If reach here, current cut list is valid
          skipFlag = true;

          // Current cut list is better if NO unused uncut pieces (tempNumAvailableLengthsCounter has all zero values) AND it's cheaper
          if (bestCutList == undefined || tempNumAvailableLengthsCounter.findIndex(val => val > 0) === -1 && bestCutList.getPrice() >= currCutList.getPrice()) {
            console.log(`New Best Cut List - Best: ${bestCutList.getPrice()} - Curr: ${currCutList.getPrice()} - Total: ${numAvailableLengthsCounter} - Left: ${tempNumAvailableLengthsCounter}`);
            bestCutList = currCutList.deepCopy();
          }
        }
      }
      if (skipFlag) {
        incrementTrigger = skip(numAvailableLengthsCounter, maxNumAvailableLengths);
      } else {
        incrementTrigger = increment(numAvailableLengthsCounter, maxNumAvailableLengths);
      }
    } while (incrementTrigger !== null);
    console.log(bestCutList);
    window.bestCutList = bestCutList;
    bestCutList.displayMaterialList();
    return bestCutList;
  }
  return {
    getCheapestCutList
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutListCalculator);

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
class CutPiece {
  /**
   * 
   * @param {Number} thickness Thickness of cut piece (inches)
   * @param {Number} width Width of cut piece (inches)
   * @param {Number} cutLength Final cut length of cut piece (inches)
   * @param {Number} quantity Number of identical pieces to cut (default = 1)
   * @param {Number} kerf Blade width of material removed when cut (inches) (default = 1/8")
   */
  constructor(thickness, width, cutLength) {
    let quantity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    let kerf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.125;
    this.thickness = thickness;
    this.width = width;
    this.cutLength = cutLength;
    this.quantity = quantity;
    this.kerf = kerf;
  }
  get cutWithKerf() {
    return this.cutLength + this.kerf;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutPiece);

/***/ }),

/***/ "./src/js/cutPieceAddForm.js":
/*!***********************************!*\
  !*** ./src/js/cutPieceAddForm.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cutPieceAddForm = (() => {
  let formElement;
  function init(handleCutPieceAddFormSubmit) {
    formElement = document.getElementById('cut-piece-create-form');
    if (!formElement) {
      // TODO: Deal with formElement not being found. Create it dynamically.
    }
    formElement.addEventListener('submit', e => {
      handleCutPieceAddFormSubmit(e);
      updateForm();
    });

    //cutPiecesListElement = document.createElement('ul');
    //formElement.before(cutPiecesListElement);
  }

  function updateForm() {
    let inputElement;

    // Reset input fields for cut length and quantity, leaving other inputs with user entered data.
    // Focus cursor on last input which should be cut length field
    ['quantity', 'length'].forEach((inputName, index, arr) => {
      inputElement = formElement.elements.namedItem(inputName);
      if (inputElement) {
        inputElement.value = inputElement.defaultValue;
        if (index == arr.length - 1) {
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
    get formElement() {
      return formElement;
    }
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutPieceAddForm);

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
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uncutPiece.js */ "./src/js/uncutPiece.js");


class CutSequence {
  constructor(uncutPiece) {
    this.uncutPiece = uncutPiece;
    this.cutPieces = [];
    this.remainingLength = 0;
  }
  toString() {
    console.log(`Pieces: ${this.cutPieces}\nLeftover: ${this.remainingLength}`);
  }

  /**
   * Creates a CutSequence instance.
   * @param {UncutPiece} uncutPiece 
   * @param {[CutPiece]} individualCutPieces 
   * @param {[Number]} availableCutPiecesByIndex
   * @returns {CutSequence|null}
   */
  static createCutSequence(uncutPiece, individualCutPieces, availableCutPiecesByIndex) {
    const cutSequenceArr = CutSequence.createCutSequenceArr(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);

    // If cutSequenceArr returns just the uncutPiece length value (array length 1),
    // every individualCutPiece is longer than the uncutPiece
    if (cutSequenceArr.length == 1) {
      return null;
    }

    // Create CutSequence instance from cutSequenceArr
    const cutSequence = new CutSequence(uncutPiece);
    cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
    cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];
    return cutSequence;
  }

  /**
   * Recursive function that returns array of CutPieces with smallest remaining length from an initial length.
   * @param {Number} remainingLength 
   * @param {[CutPiece]} individualCutPieces 
   * @param {[Number]} availableCutPiecesByIndex 
   * @param {Number} startIndex (default = 0) 
   * @returns {[...CutPiece, Number]} Array of CutPieces with leftover length of whole piece at the end
   */
  static createCutSequenceArr(remainingLength, individualCutPieces, availableCutPiecesByIndex) {
    let startIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    // Return if availableCutPiecesByIndex is empty
    if (!availableCutPiecesByIndex.length) {
      return [remainingLength];
    }
    let selectedCutPieceIndex;
    for (let i = startIndex; i < availableCutPiecesByIndex.length; i++) {
      // Check if cutLength equal to remaining length (DO NOT INCLUDE KERF)
      if (individualCutPieces[availableCutPiecesByIndex[i]].cutLength == remainingLength) {
        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        availableCutPiecesByIndex.splice(i, 1);
        return [individualCutPieces[availableCutPiecesByIndex[i]], 0];
      }

      // Find index of largest cutLength that can be cut with remainingLength (INCLUDE KERF)
      if (selectedCutPieceIndex == undefined && individualCutPieces[availableCutPiecesByIndex[i]].cutWithKerf < remainingLength) {
        selectedCutPieceIndex = i;
      }
    }

    // Check if selectedCutPieceIndex is still undefined - All cutLength+kerf are more than remainingLength
    // Return just remaining length
    if (selectedCutPieceIndex == undefined) {
      return [remainingLength];
    }

    // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
    // being selected for than once.
    const selectedCutPiece = individualCutPieces[availableCutPiecesByIndex.splice(selectedCutPieceIndex, 1)];
    return [selectedCutPiece, ...CutSequence.createCutSequenceArr(remainingLength - selectedCutPiece.cutWithKerf, individualCutPieces, availableCutPiecesByIndex, selectedCutPieceIndex)];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutSequence);

/***/ }),

/***/ "./src/js/uncutPiece.js":
/*!******************************!*\
  !*** ./src/js/uncutPiece.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrossSection": () => (/* binding */ CrossSection),
/* harmony export */   "UncutPiece": () => (/* binding */ UncutPiece),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CrossSection {
  /**
   * @constructor
   * @param {Number} thickness Thickness (smallest dimension) of piece (inches)
   * @param {Number} width Width of piece (inches)
   */
  constructor(thickness, width) {
    this.thickness = thickness;
    this.width = width;
  }
}
class UncutPiece {
  /**
   * @constructor
   * @param {CrossSection} crossSection Cross section of uncut piece
   * @param {Number} length Length of uncut piece (inches) 
   * @param {Number} price Price of possible length (American cents ex. $9.87 = 987)
   */
  constructor(crossSection, length, price) {
    this.crossSection = crossSection;
    this.length = length;
    this.price = price;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UncutPiece);

/***/ }),

/***/ "./src/js/uncutPieceAddForm.js":
/*!*************************************!*\
  !*** ./src/js/uncutPieceAddForm.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const uncutPieceAddForm = (() => {
  let formElement;
  function init(handleUncutPieceAddFormSubmit) {
    formElement = document.getElementById('uncut-piece-create-form');
    if (!formElement) {
      // TODO: Deal with formElement not being found. Create it dynamically.
    }
    formElement.addEventListener('submit', e => {
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
        if (index == arr.length - 1) {
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
    get formElement() {
      return formElement;
    }
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uncutPieceAddForm);

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
/**
 * 
 * @param {String} type - Element type
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

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/meyer_reset.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/meyer_reset.scss ***!
  \******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n", "",{"version":3,"sources":["webpack://./src/styles/meyer_reset.scss"],"names":[],"mappings":"AAAA;;;CAGC;AAED;;;;;;;;;;;;;EAaC,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB,EAAA;;AAEzB,gDAAA;AACA;;EAEC,cAAc,EAAA;;AAEf;EACC,cAAc,EAAA;;AAEf;EACC,gBAAgB,EAAA;;AAEjB;EACC,YAAY,EAAA;;AAEb;;EAEC,WAAW;EACX,aAAa,EAAA;;AAEd;EACC,yBAAyB;EACzB,iBAAiB,EAAA","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    display: block; }\n\n.piece-create-form {\n  border: 2px solid var(--base-black, black);\n  padding: 1rem;\n  margin: 1rem 0; }\n  .piece-create-form .form-inputs .input-container {\n    display: grid; }\n  .piece-create-form .submit-container {\n    display: grid;\n    justify-content: center; }\n\nh1, h2 {\n  text-align: center; }\n\ntable {\n  width: 100%;\n  text-align: center; }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAEA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;EACI,qBAAqB,EAAA;EADzB;IAIQ,cAAc,EAAA;;AAItB;EACI,0CAA0C;EAC1C,aAAa;EACb,cAAc,EAAA;EAHlB;IAWY,aAAa,EAAA;EAXzB;IAgBQ,aAAa;IACb,uBAAuB,EAAA;;AAM/B;EACI,kBAAkB,EAAA;;AAGtB;EACI,WAAW;EACX,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        display: block;\r\n    }\r\n}\r\n\r\n.piece-create-form {\r\n    border: 2px solid var(--base-black, black);\r\n    padding: 1rem;\r\n    margin: 1rem 0;\r\n\r\n    .form-inputs {\r\n        // display: grid;\r\n        // grid-template-columns: repeat(5, 1fr);\r\n        // column-gap: 1rem;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2 {\r\n    text-align: center;\r\n}\r\n\r\ntable {\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/meyer_reset.scss":
/*!*************************************!*\
  !*** ./src/styles/meyer_reset.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./meyer_reset.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/meyer_reset.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_meyer_reset_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/meyer_reset.scss */ "./src/styles/meyer_reset.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/styles.scss */ "./src/styles/styles.scss");
/* harmony import */ var _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/cutListCalculator.js */ "./src/js/cutListCalculator.js");
/* harmony import */ var _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _js_cutList_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/cutList.js */ "./src/js/cutList.js");
/* harmony import */ var _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/components/cutListCalculatorComponent.js */ "./src/js/components/cutListCalculatorComponent.js");







(() => {
  //cutListCalculator.init();
  _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].init();
  function getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr) {
    // Sort cutPieces by cutLength in decreasing order
    cutPieces.sort((a, b) => b.cutLength - a.cutLength);

    // Create array where each value represents a single quantity cutPiece
    // instead of normal array of cutPieces that has any number quantity in the
    // 'quantity' property.
    let individualCutPieces = cutPieces.flatMap(cutPiece => {
      return new Array(cutPiece.quantity).fill(cutPiece);
    });

    // Create array where each value represents index in corresponding 
    // individualCutPieces array. If a individual CutPiece is selected for 
    // a cut sequence, it's index is removed from this array.
    let availableCutPiecesByIndex = Array.from({
      length: individualCutPieces.length
    }, (value, index) => index);
    let currCutSequence, tempAvailableCutPiecesByIndex, bestCut;
    let finalCutList = [];
    while (availableCutPiecesByIndex.length) {
      bestCut = {
        cutSequence: undefined,
        availableCutPiecesByIndex: undefined
      };
      possibleLengthsArr.forEach(length => {
        tempAvailableCutPiecesByIndex = [...availableCutPiecesByIndex];
        currCutSequence = _js_cutList_js__WEBPACK_IMPORTED_MODULE_5__.cutList.getCutList(length, individualCutPieces, tempAvailableCutPiecesByIndex);
        if (bestCut.cutSequence == undefined || bestCut.cutSequence[-1] > currCutSequence[-1]) {
          bestCut.cutSequence = currCutSequence;
          bestCut.availableCutPiecesByIndex = [...tempAvailableCutPiecesByIndex];
        }
      });
      finalCutList.push(bestCut.cutSequence);
      availableCutPiecesByIndex = [...bestCut.availableCutPiecesByIndex];
    }
    console.log(finalCutList);

    // Get cut list for first possible length

    // Set bestCutList to first cut list

    // Get cut list for next possible length

    // If new cut list has less remaining length than bestCutList, set 
    // bestCutList to new cut list

    // Once reach end of possible length array, save bestCutList to final cut list sequence

    // Repeat once again with remaining individualCutPieces
  }

  // ------------------------------------------------------------------------

  console.log('Test: Example');
  let cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 19.875, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 39.875, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 49.875, 3)];
  const crossSection2x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.CrossSection(2, 4);
  let uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 144, 462)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: See-Saw');
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 36, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 35 + 5 / 16, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 30 + 21 / 32, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 22.5, 4)];
  const crossSection4x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.CrossSection(4, 4);
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 72, 1228), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 96, 1548), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 120, 2238), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 144, 2748)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: Saw Horses');
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 144, 462)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 36, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 32 + 1 / 8, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 34, 2)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: Wood Shed');
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 144, 462), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 16 * 12, 616)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 15 * 12 + 11, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 15 * 12 + 4, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 7 * 12, 32), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 8.5, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 5 * 12 + 10, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 2 * 12 + 9, 6), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 2 * 12 + 11.5, 2)];

  // ISSUE: Very long time
  //debugger;
  //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

  window.cutListCalculator = _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"];
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpQztBQUNtQjtBQUNJO0FBRUQ7QUFDSTtBQUNOO0FBRUc7QUFDbEI7QUFDb0I7QUFFVjtBQUVoRCxNQUFNVywwQkFBMEIsR0FBRyxDQUFDLE1BQU07RUFDdEMsSUFBSUMsU0FBUyxHQUFHLEVBQUU7RUFDbEIsSUFBSUMsV0FBVyxHQUFHLEVBQUU7RUFDcEIsSUFBSUMsV0FBVztFQUVmLElBQUlDLGNBQWM7RUFDbEIsSUFBSUMsa0JBQWtCO0VBQ3RCLElBQUlDLG9CQUFvQjtFQUV4QixTQUFTQyxJQUFJQSxDQUFBLEVBQUc7SUFDWkMsUUFBUSxDQUFDQyxJQUFJLENBQUNDLFdBQVcsQ0FBQ3JCLHNEQUFNLENBQUMsSUFBSSxDQUFDLENBQUNzQixNQUFNLEVBQUUsQ0FBQztJQUVoRCxNQUFNQyxnQkFBZ0IsR0FBR0osUUFBUSxDQUFDSyxjQUFjLENBQUMscUJBQXFCLENBQUM7SUFDdkUsSUFBSUQsZ0JBQWdCLEVBQUU7TUFDbEJBLGdCQUFnQixDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVDLHdCQUF3QixDQUFDO0lBQ3hFO0lBRUFYLGNBQWMsR0FBR0ksUUFBUSxDQUFDSyxjQUFjLENBQUMsVUFBVSxDQUFDO0lBRXBEdkIsZ0VBQW9CLENBQUMwQiwyQkFBMkIsQ0FBQztJQUNqRHpCLGtFQUFzQixDQUFDMEIsNkJBQTZCLENBQUM7SUFFckQsTUFBTUMsYUFBYSxHQUFHVixRQUFRLENBQUNULGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDckRtQixhQUFhLENBQUNSLFdBQVcsQ0FDckJYLDREQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUNyQkEsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFDcENBLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUNoQ0EsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ2pDQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsRUFDbkNBLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUNsQyxDQUNKLENBQ0o7SUFFRCxNQUFNb0IsZUFBZSxHQUFHWCxRQUFRLENBQUNULGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDdkRvQixlQUFlLENBQUNULFdBQVcsQ0FDdkJYLDREQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUNyQkEsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFDcENBLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUNoQ0EsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ2pDQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FDbkMsQ0FDSixDQUNKO0lBRURNLGtCQUFrQixHQUFHYSxhQUFhLENBQUNSLFdBQVcsQ0FDMUNGLFFBQVEsQ0FBQ1QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUNsQztJQUNETyxvQkFBb0IsR0FBR2EsZUFBZSxDQUFDVCxXQUFXLENBQzlDRixRQUFRLENBQUNULGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDbEM7SUFFRFQsOEVBQWtDLENBQUM0QixhQUFhLENBQUM7SUFDakQzQixnRkFBb0MsQ0FBQzRCLGVBQWUsQ0FBQztFQUN6RDtFQUVBLFNBQVNHLFdBQVdBLENBQUNDLFFBQVEsRUFBRTtJQUMzQnRCLFNBQVMsQ0FBQ3VCLElBQUksQ0FBQ0QsUUFBUSxDQUFDO0lBQ3hCLE9BQU9BLFFBQVE7RUFDbkI7RUFFQSxTQUFTRSxhQUFhQSxDQUFDQyxVQUFVLEVBQUU7SUFDL0J4QixXQUFXLENBQUNzQixJQUFJLENBQUNFLFVBQVUsQ0FBQztJQUM1QixPQUFPQSxVQUFVO0VBQ3JCO0VBRUEsU0FBU1YsMkJBQTJCQSxDQUFDVyxDQUFDLEVBQUU7SUFDcENBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFOztJQUVsQjtJQUNBLE1BQU1MLFFBQVEsR0FBRyxJQUFJM0Isb0RBQVEsQ0FDekJpQyxNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ3RESixNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ2xESixNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ25ESixNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ3JESixNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQ3BEOztJQUVEO0lBQ0FYLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDOztJQUVyQjtJQUNBbEIsa0JBQWtCLENBQUM2QixNQUFNLENBQ3JCMUMsaUVBQWlCLENBQUMrQixRQUFRLENBQUMsQ0FBQ1osTUFBTSxFQUFFLENBQ3ZDO0VBQ0w7RUFFQSxTQUFTTSw2QkFBNkJBLENBQUNVLENBQUMsRUFBRTtJQUN0Q0EsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7O0lBRWxCO0lBQ0EsTUFBTUYsVUFBVSxHQUFHLElBQUk3QixzREFBVSxDQUM3QixJQUFJQyx3REFBWSxDQUFDK0IsTUFBTSxDQUFDRixDQUFDLENBQUNHLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUFFSixNQUFNLENBQUNGLENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQUMsRUFDNUhKLE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDRyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsRUFDbkRKLE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDRyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FDckQ7O0lBRUQ7SUFDQVIsYUFBYSxDQUFDQyxVQUFVLENBQUM7O0lBRXpCO0lBQ0FwQixvQkFBb0IsQ0FBQzRCLE1BQU0sQ0FDdkJ6QyxtRUFBbUIsQ0FBQ2lDLFVBQVUsQ0FBQyxDQUFDZixNQUFNLEVBQUUsQ0FDM0M7RUFDTDtFQUVBLFNBQVNJLHdCQUF3QkEsQ0FBQ1ksQ0FBQyxFQUFFO0lBQ2pDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtJQUVsQnpCLFdBQVcsR0FBR1IsZ0ZBQW9DLENBQzlDTSxTQUFTLEVBQ1RDLFdBQVcsQ0FDZDtJQUVERSxjQUFjLENBQUM4QixNQUFNLENBQUN4QyxnRUFBZ0IsQ0FBQ1MsV0FBVyxDQUFDLENBQUNRLE1BQU0sRUFBRSxDQUFDO0VBQ2pFO0VBRUEsT0FBTztJQUNISjtFQUNKLENBQUM7QUFDTCxDQUFDLEdBQUc7QUFFSixpRUFBZVAsMEJBQTBCOzs7Ozs7Ozs7Ozs7Ozs7QUMxSU87QUFFakMsU0FBU04sZ0JBQWdCQSxDQUFDMEMsT0FBTyxFQUFFO0VBQzlDLE1BQU16QixNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLE1BQU0wQixZQUFZLEdBQUdELE9BQU8sQ0FBQ0UsbUJBQW1CLEVBQUU7SUFDbEQsTUFBTUMsT0FBTyxHQUFHeEMsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBVSxDQUFDLENBQUM7SUFFM0QsS0FBSyxNQUFNLENBQUN5QyxHQUFHLEVBQUVQLEtBQUssQ0FBQyxJQUFJUSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0wsWUFBWSxDQUFDLEVBQUU7TUFDckRFLE9BQU8sQ0FBQzdCLFdBQVcsQ0FDZlgsNERBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUcsR0FBRWtDLEtBQU0sTUFBS08sR0FBSSxlQUFjLENBQUMsQ0FDM0Q7SUFDTDtJQUVBLE9BQU9ELE9BQU87RUFDbEIsQ0FBQztFQUVELE9BQU87SUFDSDVCO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7QUNuQmdEO0FBRWpDLFNBQVNuQixpQkFBaUJBLENBQUMrQixRQUFRLEVBQUU7RUFDaEQsTUFBTVosTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QixPQUFPWiw0REFBYSxDQUNoQixJQUFJLEVBQ0o7TUFBQyxPQUFPLEVBQUU7SUFBVyxDQUFDLEVBQ3RCQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRXdCLFFBQVEsQ0FBQ29CLFNBQVMsQ0FBQyxFQUMzQzVDLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFd0IsUUFBUSxDQUFDcUIsS0FBSyxDQUFDLEVBQ3ZDN0MsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUV3QixRQUFRLENBQUNzQixTQUFTLENBQUMsRUFDM0M5Qyw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRXdCLFFBQVEsQ0FBQ3VCLFFBQVEsQ0FBQyxFQUMxQy9DLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFd0IsUUFBUSxDQUFDd0IsSUFBSSxDQUFDLENBQ3pDO0VBQ0wsQ0FBQztFQUVELE9BQU87SUFDSHBDO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7QUNsQmdEO0FBRWpDLFNBQVN0QixNQUFNQSxDQUFDMkQsYUFBYSxFQUFFO0VBQzFDLE1BQU1yQyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLE1BQU1zQyxNQUFNLEdBQUdsRCw0REFBYSxDQUFDLFFBQVEsRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFtQixDQUFDLENBQUM7SUFDdEUsTUFBTW1ELFFBQVEsR0FBRyxJQUFJQyxJQUFJLEVBQUUsQ0FBQ0MsV0FBVyxFQUFFOztJQUV6QztJQUNBLElBQUlDLFdBQVcsR0FBR0osTUFBTSxDQUFDdkMsV0FBVyxDQUFDRixRQUFRLENBQUNULGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFFakU7SUFDQXNELFdBQVcsR0FBR0EsV0FBVyxDQUFDM0MsV0FBVyxDQUFDWCw0REFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFDM0QsZ0JBQWdCLEVBQ2hCQSw0REFBYSxDQUFDLE1BQU0sRUFBRTtNQUFDdUQsRUFBRSxFQUFFO0lBQWdCLENBQUMsRUFBRUosUUFBUSxHQUFHRixhQUFhLEdBQUksR0FBRUEsYUFBYyxJQUFHRSxRQUFTLEVBQUMsR0FBR0YsYUFBYSxDQUFDLEVBQ3hILDhEQUE4RCxDQUNqRSxDQUFDO0lBRUYsT0FBT0MsTUFBTTtFQUNqQixDQUFDO0VBRUQsT0FBTztJQUFDdEM7RUFBTyxDQUFDO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7QUNyQmdEO0FBRWpDLFNBQVNsQixtQkFBbUJBLENBQUNpQyxVQUFVLEVBQUU7RUFDcEQsTUFBTWYsTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QixPQUFPWiw0REFBYSxDQUNoQixJQUFJLEVBQ0o7TUFBQyxPQUFPLEVBQUU7SUFBYSxDQUFDLEVBQ3hCQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTJCLFVBQVUsQ0FBQzZCLFlBQVksQ0FBQ1osU0FBUyxDQUFDLEVBQzFENUMsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUyQixVQUFVLENBQUM2QixZQUFZLENBQUNYLEtBQUssQ0FBQyxFQUN0RDdDLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFMkIsVUFBVSxDQUFDOEIsTUFBTSxDQUFDLEVBQzFDekQsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUyQixVQUFVLENBQUMrQixLQUFLLENBQUMsQ0FDNUM7RUFDTCxDQUFDO0VBRUQsT0FBTztJQUNIOUM7RUFDSixDQUFDO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQk8sTUFBTStDLE9BQU8sQ0FBQztFQUNqQkMsV0FBV0EsQ0FBQSxFQUFvQjtJQUFBLElBQW5CQyxZQUFZLEdBQUFDLFNBQUEsQ0FBQUwsTUFBQSxRQUFBSyxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLEVBQUU7SUFDekIsSUFBSSxDQUFDRCxZQUFZLEdBQUdBLFlBQVk7RUFDcEM7RUFFQUcsS0FBS0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxDQUFDSCxZQUFZLEdBQUcsRUFBRTtFQUMxQjtFQUVBcEMsSUFBSUEsQ0FBQ3dDLFdBQVcsRUFBRTtJQUNkOztJQUVBLElBQUksQ0FBQ0osWUFBWSxDQUFDcEMsSUFBSSxDQUFDd0MsV0FBVyxDQUFDO0VBQ3ZDO0VBRUFDLFFBQVFBLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDTCxZQUFZLENBQUNNLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUVDLElBQUksS0FBS0QsS0FBSyxHQUFHQyxJQUFJLENBQUMxQyxVQUFVLENBQUMrQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0VBQ3RGO0VBRUFZLFFBQVFBLENBQUEsRUFBRztJQUNQLElBQUlqQyxPQUFPLEdBQUcsSUFBSXNCLE9BQU8sRUFBRTtJQUMzQnRCLE9BQU8sQ0FBQ3dCLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDQSxZQUFZLENBQUM7SUFDN0MsT0FBT3hCLE9BQU87RUFDbEI7O0VBRUE7RUFDQUUsbUJBQW1CQSxDQUFBLEVBQUc7SUFDbEIsTUFBTWdDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDVixZQUFZLENBQUNXLE9BQU8sQ0FBRVAsV0FBVyxJQUFLO01BQ3ZDLElBQUlBLFdBQVcsQ0FBQ3RDLFVBQVUsQ0FBQzhCLE1BQU0sSUFBSWMsZUFBZSxFQUFFO1FBQ2xEQSxlQUFlLENBQUNOLFdBQVcsQ0FBQ3RDLFVBQVUsQ0FBQzhCLE1BQU0sQ0FBQyxFQUFFO01BQ3BELENBQUMsTUFBTTtRQUNIYyxlQUFlLENBQUNOLFdBQVcsQ0FBQ3RDLFVBQVUsQ0FBQzhCLE1BQU0sQ0FBQyxHQUFHLENBQUM7TUFDdEQ7SUFDSixDQUFDLENBQUM7SUFFRmdCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxlQUFlLENBQUM7SUFDNUIsT0FBT0EsZUFBZTtFQUMxQjtBQUNKO0FBRU8sTUFBTWxDLE9BQU8sR0FBRztFQUNuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lzQyxVQUFVLEVBQUUsU0FBQUEsQ0FBQ0MsZUFBZSxFQUFFQyxtQkFBbUIsRUFBRUMseUJBQXlCLEVBQXFCO0lBQUEsSUFBbkJDLFVBQVUsR0FBQWpCLFNBQUEsQ0FBQUwsTUFBQSxRQUFBSyxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLENBQUM7SUFDeEY7SUFDQSxJQUFJLENBQUNnQix5QkFBeUIsQ0FBQ3JCLE1BQU0sRUFBRTtNQUNuQyxPQUFPLENBQUVtQixlQUFlLENBQUU7SUFDOUI7SUFFQSxJQUFJSSxxQkFBcUI7SUFDekIsS0FBSyxJQUFJQyxDQUFDLEdBQUdGLFVBQVUsRUFBRUUsQ0FBQyxHQUFHSCx5QkFBeUIsQ0FBQ3JCLE1BQU0sRUFBRXdCLENBQUMsRUFBRSxFQUFFO01BR2hFO01BQ0EsSUFBSUosbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDRyxDQUFDLENBQUMsQ0FBQyxDQUFDbkMsU0FBUyxJQUFJOEIsZUFBZSxFQUFFO1FBQ2hGO1FBQ0E7UUFDQUUseUJBQXlCLENBQUNJLE1BQU0sQ0FBQ0QsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV0QyxPQUFPLENBQUVKLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUU7TUFDbkU7O01BRUE7TUFDQSxJQUFLRCxxQkFBcUIsSUFBSWpCLFNBQVMsSUFDL0JjLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsV0FBVyxHQUFHUCxlQUFnQixFQUN0RjtRQUNFSSxxQkFBcUIsR0FBR0MsQ0FBQztNQUM3QjtJQUNKOztJQUVBO0lBQ0E7SUFDQSxJQUFJRCxxQkFBcUIsSUFBSWpCLFNBQVMsRUFBRTtNQUNwQyxPQUFPLENBQUVhLGVBQWUsQ0FBRTtJQUM5Qjs7SUFFQTtJQUNBO0lBQ0EsTUFBTVEsZ0JBQWdCLEdBQUdQLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0ksTUFBTSxDQUFDRixxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RyxPQUFPLENBQ0hJLGdCQUFnQixFQUNoQixHQUFHL0MsT0FBTyxDQUFDc0MsVUFBVSxDQUNqQkMsZUFBZSxHQUFHUSxnQkFBZ0IsQ0FBQ0QsV0FBVyxFQUM5Q04sbUJBQW1CLEVBQ25CQyx5QkFBeUIsRUFDekJFLHFCQUFxQixDQUN4QixDQUNKO0VBQ0w7QUFDSixDQUFDO0FBRUQsaUVBQWUzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEdpQjtBQUNJO0FBRTNDLE1BQU16QyxpQkFBaUIsR0FBRyxDQUFDLE1BQU07RUFDN0IsSUFBSVEsV0FBVzs7RUFFZjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksU0FBU2tGLHlCQUF5QkEsQ0FBQ0MsMEJBQTBCLEVBQUVDLHNCQUFzQixFQUFFO0lBQ25GO0lBQ0EsSUFBSSxDQUFDRCwwQkFBMEIsQ0FBQzlCLE1BQU0sRUFBRTtNQUNwQyxPQUFPLENBQUM7SUFDWjtJQUVBLE1BQU1nQyxnQkFBZ0IsR0FBR0YsMEJBQTBCLENBQUNHLGFBQWEsQ0FBRUMsR0FBRyxJQUFLQSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ25GO0lBQ0EsSUFBSUYsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDekIsT0FBTyxDQUFDO0lBQ1o7O0lBRUE7O0lBRUE7SUFDQSxJQUFJRyxLQUFLLEdBQUdMLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7O0lBRTdDO0lBQ0E7SUFDQSxLQUFLLElBQUlOLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSVEsZ0JBQWdCLEVBQUVSLENBQUMsRUFBRSxFQUFFO01BQ3hDVyxLQUFLLElBQUlMLDBCQUEwQixDQUFDTixDQUFDLENBQUMsR0FBR08sc0JBQXNCLENBQUNLLEtBQUssQ0FBQyxDQUFDLEVBQUVaLENBQUMsQ0FBQyxDQUFDZCxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtELEtBQUssSUFBSUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNIO0lBRUEsT0FBT3VCLEtBQUs7RUFDaEI7RUFFQSxTQUFTRSxhQUFhQSxDQUFDUCwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUU7SUFDdkUsTUFBTU8sR0FBRyxHQUFHVCx5QkFBeUIsQ0FBQ0MsMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO0lBRXpGLE1BQU1RLG1CQUFtQixHQUFHUixzQkFBc0IsQ0FBQ0UsYUFBYSxDQUFFQyxHQUFHLElBQUtBLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbEYsTUFBTU0sR0FBRyxHQUFHVCxzQkFBc0IsQ0FDN0JLLEtBQUssQ0FBQyxDQUFDLEVBQUVHLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxHQUFHUixzQkFBc0IsQ0FBQy9CLE1BQU0sR0FBR3VDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUM5RkUsR0FBRyxDQUFFUCxHQUFHLElBQUtBLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FDckJ4QixNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtELEtBQUssR0FBR0MsSUFBSSxDQUFDO0lBRTFDLE1BQU04QixVQUFVLEdBQUlKLEdBQUcsR0FBR0UsR0FBRyxHQUFJLEdBQUc7SUFDcEM7SUFDQSxPQUFPRSxVQUFVO0VBQ3JCO0VBRUEsU0FBU0MsSUFBSUEsQ0FBQ2IsMEJBQTBCLEVBQUVDLHNCQUFzQixFQUFFO0lBQzlEO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFUSxNQUFNYSxzQkFBc0IsR0FBR2QsMEJBQTBCLENBQUNlLFNBQVMsQ0FBRVgsR0FBRyxJQUFLQSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRXJGLElBQUlVLHNCQUFzQixLQUFLdEMsU0FBUyxFQUFFO01BQ3RDO01BQ0E7SUFDSjtJQUVBd0IsMEJBQTBCLENBQUNjLHNCQUFzQixDQUFDLEdBQUcsQ0FBQztJQUV0RCxPQUFPRSxTQUFTLENBQUNoQiwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUVhLHNCQUFzQixHQUFHLENBQUMsQ0FBQztFQUNwRztFQUVBLFNBQVNFLFNBQVNBLENBQUNoQiwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQWE7SUFBQSxJQUFYZ0IsS0FBSyxHQUFBMUMsU0FBQSxDQUFBTCxNQUFBLFFBQUFLLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsQ0FBQztJQUM1RTtJQUNBO0lBQ0k7SUFDQTtJQUNBOztJQUVKO0lBQ0EsSUFBSTBDLEtBQUssSUFBSWpCLDBCQUEwQixDQUFDOUIsTUFBTSxFQUFFO01BQUUsT0FBTyxJQUFJO0lBQUU7SUFFL0Q4QiwwQkFBMEIsQ0FBQ2lCLEtBQUssQ0FBQyxFQUFFO0lBRW5DLElBQUlqQiwwQkFBMEIsQ0FBQ2lCLEtBQUssQ0FBQyxHQUFHaEIsc0JBQXNCLENBQUNnQixLQUFLLENBQUMsRUFBRTtNQUNuRWpCLDBCQUEwQixDQUFDaUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUNyQyxPQUFPRCxTQUFTLENBQUNoQiwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUUsRUFBRWdCLEtBQUssQ0FBQztJQUNqRjtFQUNKO0VBRUEsU0FBU0MsU0FBU0EsQ0FBQ2xCLDBCQUEwQixFQUFFQyxzQkFBc0IsRUFBYTtJQUFBLElBQVhnQixLQUFLLEdBQUExQyxTQUFBLENBQUFMLE1BQUEsUUFBQUssU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxDQUFDO0lBQzVFO0lBQ0EsSUFBSTBDLEtBQUssSUFBSWpCLDBCQUEwQixDQUFDOUIsTUFBTSxFQUFFO01BQUUsT0FBTyxJQUFJO0lBQUU7SUFFL0Q4QiwwQkFBMEIsQ0FBQ2lCLEtBQUssQ0FBQyxFQUFFO0lBRW5DLElBQUlqQiwwQkFBMEIsQ0FBQ2lCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUN2Q2pCLDBCQUEwQixDQUFDaUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUNyQyxPQUFPQyxTQUFTLENBQUNsQiwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUUsRUFBRWdCLEtBQUssQ0FBQztJQUNqRjtJQUVBLE9BQU9BLEtBQUs7RUFDaEI7RUFFQSxTQUFTcEUsa0JBQWtCQSxDQUFDbEMsU0FBUyxFQUFFQyxXQUFXLEVBQUU7SUFDaERDLFdBQVcsR0FBRzJELFNBQVM7O0lBRXZCO0lBQ0E3RCxTQUFTLENBQUN3RyxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLEtBQUtBLENBQUMsQ0FBQzlELFNBQVMsR0FBRzZELENBQUMsQ0FBQzdELFNBQVMsQ0FBQzs7SUFFbEQ7SUFDQTs7SUFFQTtJQUNBM0MsV0FBVyxDQUFDdUcsSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxLQUFLQSxDQUFDLENBQUNuRCxNQUFNLEdBQUdrRCxDQUFDLENBQUNsRCxNQUFNLENBQUM7O0lBRTlDO0lBQ0E7SUFDQTtJQUNBLElBQUlvQixtQkFBbUIsR0FBRzNFLFNBQVMsQ0FBQzJHLE9BQU8sQ0FBRXJGLFFBQVEsSUFBSztNQUN0RCxPQUFPLElBQUlzRixLQUFLLENBQUN0RixRQUFRLENBQUN1QixRQUFRLENBQUMsQ0FDOUJnRSxJQUFJLENBQUN2RixRQUFRLENBQUM7SUFDdkIsQ0FBQyxDQUFDOztJQUVGO0lBQ0E7SUFDQSxJQUFJZ0Usc0JBQXNCLEdBQUcsSUFBSXNCLEtBQUssQ0FBQzNHLFdBQVcsQ0FBQ3NELE1BQU0sQ0FBQyxDQUFDc0QsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxJQUFJeEIsMEJBQTBCLEdBQUcsSUFBSXVCLEtBQUssQ0FBQzNHLFdBQVcsQ0FBQ3NELE1BQU0sQ0FBQyxDQUFDc0QsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV0RSxJQUFJakMseUJBQXlCLEVBQUViLFdBQVcsRUFBRStDLGNBQWM7SUFDMUQsSUFBSUMsV0FBVyxHQUFHLElBQUl0RCxnREFBTyxFQUFFO0lBRS9CeEQsV0FBVyxDQUFDcUUsT0FBTyxDQUFDLENBQUM3QyxVQUFVLEVBQUU2RSxLQUFLLEtBQUs7TUFDdkM7O01BRUExQix5QkFBeUIsR0FBR2dDLEtBQUssQ0FBQ0ksSUFBSSxDQUNsQztRQUFDekQsTUFBTSxFQUFFb0IsbUJBQW1CLENBQUNwQjtNQUFNLENBQUMsRUFDcEMsQ0FBQ3ZCLEtBQUssRUFBRXNFLEtBQUssS0FBS0EsS0FBSyxDQUMxQjs7TUFFRDtNQUNBUyxXQUFXLENBQUNqRCxLQUFLLEVBQUU7O01BRW5CO01BQ0E7TUFDQTtNQUNBO01BQ0EsT0FBT2MseUJBQXlCLENBQUNyQixNQUFNLEVBQUU7UUFDckN1RCxjQUFjLEdBQUczQiw0RUFBZ0MsQ0FBQzFELFVBQVUsQ0FBQzhCLE1BQU0sRUFBRW9CLG1CQUFtQixFQUFFQyx5QkFBeUIsQ0FBQztRQUNwSDtRQUNBO1FBQ0E7UUFDQSxJQUFJa0MsY0FBYyxDQUFDdkQsTUFBTSxJQUFJLENBQUMsRUFBRTtVQUM1QjtRQUNKOztRQUVBO1FBQ0FRLFdBQVcsR0FBRyxJQUFJb0IsdURBQVcsQ0FBQzFELFVBQVUsQ0FBQztRQUN6Q3NDLFdBQVcsQ0FBQy9ELFNBQVMsR0FBRzhHLGNBQWMsQ0FBQ25CLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQ1QixXQUFXLENBQUNXLGVBQWUsR0FBR29DLGNBQWMsQ0FBQ0EsY0FBYyxDQUFDdkQsTUFBTSxHQUFHLENBQUMsQ0FBQzs7UUFFdkU7UUFDQXdELFdBQVcsQ0FBQ3hGLElBQUksQ0FBQ3dDLFdBQVcsQ0FBQzs7UUFFN0I7UUFDQXVCLHNCQUFzQixDQUFDZ0IsS0FBSyxDQUFDLEVBQUU7TUFDbkM7O01BRUE7TUFDQSxJQUNLLENBQUMxQix5QkFBeUIsQ0FBQ3JCLE1BQU0sS0FDN0JyRCxXQUFXLElBQUkyRCxTQUFTLElBQU0zRCxXQUFXLENBQUM4RCxRQUFRLEVBQUUsSUFBSStDLFdBQVcsQ0FBQy9DLFFBQVEsRUFBRyxDQUFDLEVBQ3ZGO1FBQ0U5RCxXQUFXLEdBQUc2RyxXQUFXLENBQUMzQyxRQUFRLEVBQUU7TUFDeEM7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJOEMsZ0JBQWdCLEVBQUVDLGdCQUFnQixFQUFFQyw4QkFBOEIsRUFBRUMsUUFBUTtJQUNoRixJQUFJQyxvQkFBb0IsR0FBRyxDQUFDO0lBQzVCLElBQUlDLHNCQUFzQixHQUFHLENBQUM7SUFDOUIsR0FBRztNQUNDO01BQ0E7TUFDQSxJQUFJdEIsVUFBVSxHQUFHTCxhQUFhLENBQUNQLDBCQUEwQixFQUFFQyxzQkFBc0IsQ0FBQztNQUVsRixJQUFJVyxVQUFVLElBQUlBLFVBQVUsR0FBSXNCLHNCQUFzQixHQUFHRCxvQkFBcUIsRUFBRTtRQUM1RS9DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLEdBQUV5QixVQUFVLENBQUN1QixPQUFPLENBQUMsQ0FBQyxDQUFFLEdBQUUsQ0FBQztRQUN4Q0Ysb0JBQW9CLEVBQUU7TUFDMUI7TUFFQUQsUUFBUSxHQUFHLEtBQUs7O01BRWhCO01BQ0E7TUFDQTtNQUNBLElBQUtoQywwQkFBMEIsQ0FBQ29DLE1BQU0sQ0FBRS9CLEtBQUssSUFBS0EsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDbkMsTUFBTSxHQUFHLENBQUMsSUFDL0Q4QiwwQkFBMEIsQ0FBQ3BCLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUVDLElBQUksRUFBRW1DLEtBQUssS0FBS3BDLEtBQUssR0FBR0MsSUFBSSxHQUFHbEUsV0FBVyxDQUFDcUcsS0FBSyxDQUFDLENBQUMvQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUlvQixtQkFBbUIsQ0FBQ1YsTUFBTSxDQUFDLENBQUNDLEtBQUssRUFBRUMsSUFBSSxLQUFLRCxLQUFLLEdBQUdDLElBQUksQ0FBQ2MsV0FBVyxFQUFFLENBQUMsQ0FBRSxFQUN6TDtRQUNFbUMsOEJBQThCLEdBQUcsQ0FBQyxHQUFHL0IsMEJBQTBCLENBQUM7UUFFaEVULHlCQUF5QixHQUFHZ0MsS0FBSyxDQUFDSSxJQUFJLENBQ2xDO1VBQUN6RCxNQUFNLEVBQUVvQixtQkFBbUIsQ0FBQ3BCO1FBQU0sQ0FBQyxFQUNwQyxDQUFDdkIsS0FBSyxFQUFFc0UsS0FBSyxLQUFLQSxLQUFLLENBQzFCOztRQUVEO1FBQ0FTLFdBQVcsQ0FBQ2pELEtBQUssRUFBRTtRQUVuQixHQUFHO1VBQ0M7VUFDQTtVQUNBOztVQUVBcUQsZ0JBQWdCLEdBQUdaLFNBQVMsQ0FBQ2EsOEJBQThCLEVBQUU5QixzQkFBc0IsQ0FBQztVQUNwRixJQUFJNkIsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1lBQUU7VUFBTztVQUV4Q0wsY0FBYyxHQUFHM0IsNEVBQWdDLENBQUNsRixXQUFXLENBQUNrSCxnQkFBZ0IsQ0FBQyxDQUFDNUQsTUFBTSxFQUFFb0IsbUJBQW1CLEVBQUVDLHlCQUF5QixDQUFDOztVQUV2STtVQUNBYixXQUFXLEdBQUcsSUFBSW9CLHVEQUFXLENBQUNsRixXQUFXLENBQUNrSCxnQkFBZ0IsQ0FBQyxDQUFDO1VBQzVEcEQsV0FBVyxDQUFDL0QsU0FBUyxHQUFHOEcsY0FBYyxDQUFDbkIsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUNuRDVCLFdBQVcsQ0FBQ1csZUFBZSxHQUFHb0MsY0FBYyxDQUFDQSxjQUFjLENBQUN2RCxNQUFNLEdBQUcsQ0FBQyxDQUFDOztVQUV2RTtVQUNBd0QsV0FBVyxDQUFDeEYsSUFBSSxDQUFDd0MsV0FBVyxDQUFDO1FBQ2pDLENBQUMsUUFBUWEseUJBQXlCLENBQUNyQixNQUFNOztRQUV6QztRQUNBOztRQUVBLElBQUksQ0FBQ3FCLHlCQUF5QixDQUFDckIsTUFBTSxFQUFFO1VBQ25DO1VBQ0E4RCxRQUFRLEdBQUcsSUFBSTs7VUFFZjtVQUNBLElBQ0tuSCxXQUFXLElBQUkyRCxTQUFTLElBQ3BCdUQsOEJBQThCLENBQUNoQixTQUFTLENBQUVYLEdBQUcsSUFBS0EsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFNdkYsV0FBVyxDQUFDOEQsUUFBUSxFQUFFLElBQUkrQyxXQUFXLENBQUMvQyxRQUFRLEVBQUksRUFDaEk7WUFDRU8sT0FBTyxDQUFDQyxHQUFHLENBQUUsNkJBQTRCdEUsV0FBVyxDQUFDOEQsUUFBUSxFQUFHLFlBQVcrQyxXQUFXLENBQUMvQyxRQUFRLEVBQUcsYUFBWXFCLDBCQUEyQixZQUFXK0IsOEJBQStCLEVBQUMsQ0FBQztZQUNyTGxILFdBQVcsR0FBRzZHLFdBQVcsQ0FBQzNDLFFBQVEsRUFBRTtVQUN4QztRQUNKO01BQ0o7TUFFQSxJQUFJaUQsUUFBUSxFQUFFO1FBQ1ZILGdCQUFnQixHQUFHaEIsSUFBSSxDQUFDYiwwQkFBMEIsRUFBRUMsc0JBQXNCLENBQUM7TUFDL0UsQ0FBQyxNQUFNO1FBQ0g0QixnQkFBZ0IsR0FBR2IsU0FBUyxDQUFDaEIsMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO01BQ3BGO0lBQ0osQ0FBQyxRQUFRNEIsZ0JBQWdCLEtBQUssSUFBSTtJQUVsQzNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDdEUsV0FBVyxDQUFDO0lBQ3hCd0gsTUFBTSxDQUFDeEgsV0FBVyxHQUFHQSxXQUFXO0lBRWhDQSxXQUFXLENBQUNtQyxtQkFBbUIsRUFBRTtJQUVqQyxPQUFPbkMsV0FBVztFQUN0QjtFQUVBLE9BQU87SUFDSGdDO0VBQ0osQ0FBQztBQUNMLENBQUMsR0FBRztBQUVKLGlFQUFleEMsaUJBQWlCOzs7Ozs7Ozs7Ozs7OztBQzdVaEMsTUFBTUMsUUFBUSxDQUFDO0VBQ1g7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJK0QsV0FBV0EsQ0FBQ2hCLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxTQUFTLEVBQThCO0lBQUEsSUFBNUJDLFFBQVEsR0FBQWUsU0FBQSxDQUFBTCxNQUFBLFFBQUFLLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsQ0FBQztJQUFBLElBQUVkLElBQUksR0FBQWMsU0FBQSxDQUFBTCxNQUFBLFFBQUFLLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsS0FBSztJQUMvRCxJQUFJLENBQUNsQixTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDQyxTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDQyxRQUFRLEdBQUdBLFFBQVE7SUFDeEIsSUFBSSxDQUFDQyxJQUFJLEdBQUdBLElBQUk7RUFDcEI7RUFFQSxJQUFJbUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ2QsT0FBTyxJQUFJLENBQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDRSxJQUFJO0VBQ3JDO0FBQ0o7QUFFQSxpRUFBZW5ELFFBQVE7Ozs7Ozs7Ozs7Ozs7O0FDdEJ2QixNQUFNTixlQUFlLEdBQUcsQ0FBQyxNQUFNO0VBQzNCLElBQUk4QixXQUFXO0VBRWYsU0FBU2IsSUFBSUEsQ0FBQ1MsMkJBQTJCLEVBQUU7SUFDdkNJLFdBQVcsR0FBR1osUUFBUSxDQUFDSyxjQUFjLENBQUMsdUJBQXVCLENBQUM7SUFFOUQsSUFBSSxDQUFDTyxXQUFXLEVBQUU7TUFDZDtJQUFBO0lBR0pBLFdBQVcsQ0FBQ04sZ0JBQWdCLENBQUMsUUFBUSxFQUFHYSxDQUFDLElBQUs7TUFDMUNYLDJCQUEyQixDQUFDVyxDQUFDLENBQUM7TUFFOUJpRyxVQUFVLEVBQUU7SUFDaEIsQ0FBQyxDQUFDOztJQUVGO0lBQ0E7RUFDSjs7RUFFQSxTQUFTQSxVQUFVQSxDQUFBLEVBQUc7SUFDbEIsSUFBSUMsWUFBWTs7SUFFaEI7SUFDQTtJQUNBLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDdEQsT0FBTyxDQUFDLENBQUN1RCxTQUFTLEVBQUV2QixLQUFLLEVBQUV3QixHQUFHLEtBQUs7TUFDdERGLFlBQVksR0FBR3pHLFdBQVcsQ0FBQ1csUUFBUSxDQUFDQyxTQUFTLENBQUM4RixTQUFTLENBQUM7TUFDeEQsSUFBSUQsWUFBWSxFQUFFO1FBQ2RBLFlBQVksQ0FBQzVGLEtBQUssR0FBRzRGLFlBQVksQ0FBQ0csWUFBWTtRQUU5QyxJQUFJekIsS0FBSyxJQUFLd0IsR0FBRyxDQUFDdkUsTUFBTSxHQUFHLENBQUUsRUFBRTtVQUMzQnFFLFlBQVksQ0FBQ0ksS0FBSyxFQUFFO1FBQ3hCO01BQ0o7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNDLDJCQUEyQkEsQ0FBQ0MsY0FBYyxFQUFFO0lBQ2pEOztJQUVBO0VBQUE7RUFHSixTQUFTeEgsTUFBTUEsQ0FBQSxFQUFHO0lBQ2QsTUFBTXlILElBQUksR0FBRzVILFFBQVEsQ0FBQ1QsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUUzQyxPQUFPcUksSUFBSTtFQUNmO0VBRUEsT0FBTztJQUNIN0gsSUFBSTtJQUNKLElBQUlhLFdBQVdBLENBQUEsRUFBRztNQUFFLE9BQU9BLFdBQVc7SUFBQztFQUMzQyxDQUFDO0FBQ0wsQ0FBQyxHQUFHO0FBRUosaUVBQWU5QixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkRPO0FBQ0k7QUFFekMsTUFBTThGLFdBQVcsQ0FBQztFQUNkekIsV0FBV0EsQ0FBQ2pDLFVBQVUsRUFBRTtJQUNwQixJQUFJLENBQUNBLFVBQVUsR0FBR0EsVUFBVTtJQUU1QixJQUFJLENBQUN6QixTQUFTLEdBQUcsRUFBRTtJQUNuQixJQUFJLENBQUMwRSxlQUFlLEdBQUcsQ0FBQztFQUM1QjtFQUVBMEQsUUFBUUEsQ0FBQSxFQUFHO0lBQ1A3RCxPQUFPLENBQUNDLEdBQUcsQ0FBRSxXQUFVLElBQUksQ0FBQ3hFLFNBQVUsZUFBYyxJQUFJLENBQUMwRSxlQUFnQixFQUFDLENBQUM7RUFDL0U7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSSxPQUFPMkQsaUJBQWlCQSxDQUFDNUcsVUFBVSxFQUFFa0QsbUJBQW1CLEVBQUVDLHlCQUF5QixFQUFFO0lBQ2pGLE1BQU1rQyxjQUFjLEdBQUczQixXQUFXLENBQUM4QixvQkFBb0IsQ0FDbkR4RixVQUFVLENBQUM4QixNQUFNLEVBQ2pCb0IsbUJBQW1CLEVBQ25CQyx5QkFBeUIsQ0FDNUI7O0lBRUQ7SUFDQTtJQUNBLElBQUlrQyxjQUFjLENBQUN2RCxNQUFNLElBQUksQ0FBQyxFQUFFO01BQzVCLE9BQU8sSUFBSTtJQUNmOztJQUVBO0lBQ0EsTUFBTVEsV0FBVyxHQUFHLElBQUlvQixXQUFXLENBQUMxRCxVQUFVLENBQUM7SUFDL0NzQyxXQUFXLENBQUMvRCxTQUFTLEdBQUc4RyxjQUFjLENBQUNuQixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25ENUIsV0FBVyxDQUFDVyxlQUFlLEdBQUdvQyxjQUFjLENBQUNBLGNBQWMsQ0FBQ3ZELE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFdkUsT0FBT1EsV0FBVztFQUN0Qjs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksT0FBT2tELG9CQUFvQkEsQ0FBQ3ZDLGVBQWUsRUFBRUMsbUJBQW1CLEVBQUVDLHlCQUF5QixFQUFrQjtJQUFBLElBQWhCQyxVQUFVLEdBQUFqQixTQUFBLENBQUFMLE1BQUEsUUFBQUssU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxDQUFDO0lBQ3ZHO0lBQ0EsSUFBSSxDQUFDZ0IseUJBQXlCLENBQUNyQixNQUFNLEVBQUU7TUFDbkMsT0FBTyxDQUFFbUIsZUFBZSxDQUFFO0lBQzlCO0lBRUEsSUFBSUkscUJBQXFCO0lBQ3pCLEtBQUssSUFBSUMsQ0FBQyxHQUFHRixVQUFVLEVBQUVFLENBQUMsR0FBR0gseUJBQXlCLENBQUNyQixNQUFNLEVBQUV3QixDQUFDLEVBQUUsRUFBRTtNQUdoRTtNQUNBLElBQUlKLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ25DLFNBQVMsSUFBSThCLGVBQWUsRUFBRTtRQUNoRjtRQUNBO1FBQ0FFLHlCQUF5QixDQUFDSSxNQUFNLENBQUNELENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEMsT0FBTyxDQUFFSixtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFO01BQ25FOztNQUVBO01BQ0EsSUFBS0QscUJBQXFCLElBQUlqQixTQUFTLElBQy9CYyxtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNHLENBQUMsQ0FBQyxDQUFDLENBQUNFLFdBQVcsR0FBR1AsZUFBZ0IsRUFDdEY7UUFDRUkscUJBQXFCLEdBQUdDLENBQUM7TUFDN0I7SUFDSjs7SUFFQTtJQUNBO0lBQ0EsSUFBSUQscUJBQXFCLElBQUlqQixTQUFTLEVBQUU7TUFDcEMsT0FBTyxDQUFFYSxlQUFlLENBQUU7SUFDOUI7O0lBRUE7SUFDQTtJQUNBLE1BQU1RLGdCQUFnQixHQUFHUCxtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNJLE1BQU0sQ0FBQ0YscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFeEcsT0FBTyxDQUNISSxnQkFBZ0IsRUFDaEIsR0FBR0MsV0FBVyxDQUFDOEIsb0JBQW9CLENBQy9CdkMsZUFBZSxHQUFHUSxnQkFBZ0IsQ0FBQ0QsV0FBVyxFQUM5Q04sbUJBQW1CLEVBQ25CQyx5QkFBeUIsRUFDekJFLHFCQUFxQixDQUN4QixDQUNKO0VBQ0w7QUFDSjtBQUVBLGlFQUFlSyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEduQixNQUFNdEYsWUFBWSxDQUFDO0VBQ3RCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFDSTZELFdBQVdBLENBQUNoQixTQUFTLEVBQUVDLEtBQUssRUFBRTtJQUMxQixJQUFJLENBQUNELFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztFQUN0QjtBQUNKO0FBRU8sTUFBTS9DLFVBQVUsQ0FBQztFQUNwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSThELFdBQVdBLENBQUNKLFlBQVksRUFBRUMsTUFBTSxFQUFFQyxLQUFLLEVBQUU7SUFDckMsSUFBSSxDQUFDRixZQUFZLEdBQUdBLFlBQVk7SUFDaEMsSUFBSSxDQUFDQyxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7RUFDdEI7QUFDSjtBQUVBLGlFQUFlNUQsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUMxQnpCLE1BQU1OLGlCQUFpQixHQUFHLENBQUMsTUFBTTtFQUM3QixJQUFJNkIsV0FBVztFQUVmLFNBQVNiLElBQUlBLENBQUNVLDZCQUE2QixFQUFFO0lBQ3pDRyxXQUFXLEdBQUdaLFFBQVEsQ0FBQ0ssY0FBYyxDQUFDLHlCQUF5QixDQUFDO0lBRWhFLElBQUksQ0FBQ08sV0FBVyxFQUFFO01BQ2Q7SUFBQTtJQUdKQSxXQUFXLENBQUNOLGdCQUFnQixDQUFDLFFBQVEsRUFBR2EsQ0FBQyxJQUFLO01BQzFDViw2QkFBNkIsQ0FBQ1UsQ0FBQyxDQUFDO01BRWhDaUcsVUFBVSxFQUFFO0lBQ2hCLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU0EsVUFBVUEsQ0FBQSxFQUFHO0lBQ2xCLElBQUlDLFlBQVk7O0lBRWhCO0lBQ0E7SUFDQSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQ3RELE9BQU8sQ0FBQyxDQUFDdUQsU0FBUyxFQUFFdkIsS0FBSyxFQUFFd0IsR0FBRyxLQUFLO01BQ25ERixZQUFZLEdBQUd6RyxXQUFXLENBQUNXLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDOEYsU0FBUyxDQUFDO01BQ3hELElBQUlELFlBQVksRUFBRTtRQUNkQSxZQUFZLENBQUM1RixLQUFLLEdBQUc0RixZQUFZLENBQUNHLFlBQVk7UUFFOUMsSUFBSXpCLEtBQUssSUFBS3dCLEdBQUcsQ0FBQ3ZFLE1BQU0sR0FBRyxDQUFFLEVBQUU7VUFDM0JxRSxZQUFZLENBQUNJLEtBQUssRUFBRTtRQUN4QjtNQUNKO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTQywyQkFBMkJBLENBQUNDLGNBQWMsRUFBRTtJQUNqRDs7SUFFQTtFQUFBO0VBR0osU0FBU3hILE1BQU1BLENBQUEsRUFBRztJQUNkLE1BQU15SCxJQUFJLEdBQUc1SCxRQUFRLENBQUNULGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFFM0MsT0FBT3FJLElBQUk7RUFDZjtFQUVBLE9BQU87SUFDSDdILElBQUk7SUFDSixJQUFJYSxXQUFXQSxDQUFBLEVBQUc7TUFBRSxPQUFPQSxXQUFXO0lBQUM7RUFDM0MsQ0FBQztBQUNMLENBQUMsR0FBRztBQUVKLGlFQUFlN0IsaUJBQWlCOzs7Ozs7Ozs7Ozs7OztBQ3BEaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU1EsYUFBYUEsQ0FBQ3dJLElBQUksRUFBMkI7RUFBQSxJQUF6QkMsS0FBSyxHQUFBM0UsU0FBQSxDQUFBTCxNQUFBLFFBQUFLLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsQ0FBQyxDQUFDO0VBQzFDLE1BQU10QixPQUFPLEdBQUcvQixRQUFRLENBQUNULGFBQWEsQ0FBQ3dJLElBQUksQ0FBQzs7RUFFNUM7RUFDQSxLQUFLLE1BQU0sQ0FBQy9GLEdBQUcsRUFBRVAsS0FBSyxDQUFDLElBQUlRLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDOEYsS0FBSyxDQUFDLEVBQUU7SUFDOUNqRyxPQUFPLENBQUNrRyxZQUFZLENBQUNqRyxHQUFHLEVBQUVQLEtBQUssQ0FBQztFQUNwQzs7RUFFQTtFQUFBLFNBQUF5RyxJQUFBLEdBQUE3RSxTQUFBLENBQUFMLE1BQUEsRUFSK0NtRixRQUFRLE9BQUE5QixLQUFBLENBQUE2QixJQUFBLE9BQUFBLElBQUEsV0FBQUUsSUFBQSxNQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQTtJQUFSRCxRQUFRLENBQUFDLElBQUEsUUFBQS9FLFNBQUEsQ0FBQStFLElBQUE7RUFBQTtFQVN2REQsUUFBUSxDQUFDcEUsT0FBTyxDQUFDc0UsS0FBSyxJQUFJdEcsT0FBTyxDQUFDTCxNQUFNLENBQUMyRyxLQUFLLENBQUMsQ0FBQztFQUVoRCxPQUFPdEcsT0FBTztBQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpcEJBQWlwQixjQUFjLGVBQWUsY0FBYyxvQkFBb0Isa0JBQWtCLCtCQUErQixpSkFBaUoscUJBQXFCLFVBQVUscUJBQXFCLFlBQVksdUJBQXVCLG1CQUFtQixtQkFBbUIsNkRBQTZELGdCQUFnQixvQkFBb0IsV0FBVyw4QkFBOEIsd0JBQXdCLFNBQVMsZ0dBQWdHLEtBQUssaUJBQWlCLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxrQkFBa0IsWUFBWSxNQUFNLGdCQUFnQixLQUFLLGdCQUFnQixLQUFLLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsZ0JBQWdCLEtBQUssWUFBWSw2cUJBQTZxQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixzQkFBc0Isb0JBQW9CLCtCQUErQixLQUFLLHNKQUFzSixxQkFBcUIsS0FBSyxVQUFVLHFCQUFxQixLQUFLLFlBQVksdUJBQXVCLEtBQUssbUJBQW1CLG1CQUFtQixLQUFLLCtEQUErRCxrQkFBa0Isb0JBQW9CLEtBQUssV0FBVyxnQ0FBZ0Msd0JBQXdCLEtBQUssdUJBQXVCO0FBQ3J5RjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Ysb0hBQW9IO0FBQ3BIO0FBQ0EsaURBQWlELGtDQUFrQyxvQ0FBb0MsVUFBVSxxQkFBcUIsMkJBQTJCLG9DQUFvQyxpREFBaUQsNEJBQTRCLDBCQUEwQixVQUFVLHNCQUFzQiw2SUFBNkksc0JBQXNCLGtCQUFrQiwyQ0FBMkMsc0NBQXNDLGlGQUFpRiw0QkFBNEIsc0JBQXNCLFlBQVksd0JBQXdCLFVBQVUsc0JBQXNCLFlBQVksc0JBQXNCLHNCQUFzQixrQkFBa0IsMEJBQTBCLHNCQUFzQiw0QkFBNEIsb0RBQW9ELHVCQUF1Qix3QkFBd0IsK0NBQStDLGtCQUFrQixxQkFBcUIsc0RBQXNELHNCQUFzQiwwQ0FBMEMsb0JBQW9CLGdDQUFnQyxZQUFZLHlCQUF5QixXQUFXLGdCQUFnQix5QkFBeUIsU0FBUyx5RkFBeUYsV0FBVyxpQkFBaUIsTUFBTSxZQUFZLGFBQWEsYUFBYSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxtQkFBbUIsUUFBUSxnQkFBZ0IsTUFBTSxrQkFBa0IsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGFBQWEsV0FBVyxrQkFBa0IsTUFBTSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLFdBQVcsZUFBZSxNQUFNLGVBQWUsTUFBTSxXQUFXLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsaUhBQWlILGVBQWUsc0NBQXNDLHNDQUFzQyxLQUFLLGNBQWMsMEJBQTBCLDZDQUE2Qyw0Q0FBNEMsbURBQW1ELEtBQUssZ0NBQWdDLDRCQUE0QixLQUFLLGNBQWMsMEJBQTBCLGlKQUFpSiwwQkFBMEIsMEJBQTBCLCtDQUErQywwQ0FBMEMsaUhBQWlILEtBQUssc0NBQXNDLHdCQUF3QixLQUFLLGlDQUFpQywwQkFBMEIsS0FBSyxxQ0FBcUMsd0JBQXdCLEtBQUssaUNBQWlDLDBCQUEwQiwwQkFBMEIsc0JBQXNCLDRCQUE0QixLQUFLLG1EQUFtRCw4QkFBOEIsMEJBQTBCLDJCQUEyQixTQUFTLEtBQUssNEJBQTRCLG1EQUFtRCxzQkFBc0IsdUJBQXVCLDBCQUEwQiw2QkFBNkIscURBQXFELGdDQUFnQyxrQ0FBa0MsOEJBQThCLGFBQWEsU0FBUywrQkFBK0IsMEJBQTBCLG9DQUFvQyxTQUFTLEtBQUssK0JBQStCLDJCQUEyQixLQUFLLGVBQWUsb0JBQW9CLDJCQUEyQixLQUFLLHVCQUF1QjtBQUM1N0g7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNSMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXdKO0FBQ3hKO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsa0lBQU87Ozs7QUFJa0c7QUFDMUgsT0FBTyxpRUFBZSxrSUFBTyxJQUFJLHlJQUFjLEdBQUcseUlBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBbUo7QUFDbko7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyw2SEFBTzs7OztBQUk2RjtBQUNySCxPQUFPLGlFQUFlLDZIQUFPLElBQUksb0lBQWMsR0FBRyxvSUFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbUM7QUFDTDtBQUM0QjtBQUNsQjtBQUNvQjtBQUNwQjtBQUMrQztBQUV2RixDQUFDLE1BQU07RUFDSDtFQUNBdkMseUZBQStCLEVBQUU7RUFFakMsU0FBUzhJLG1DQUFtQ0EsQ0FBQzdJLFNBQVMsRUFBRThJLGtCQUFrQixFQUFFO0lBQ3hFO0lBQ0E5SSxTQUFTLENBQUN3RyxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLEtBQUtBLENBQUMsQ0FBQzlELFNBQVMsR0FBRzZELENBQUMsQ0FBQzdELFNBQVMsQ0FBQzs7SUFFbEQ7SUFDQTtJQUNBO0lBQ0EsSUFBSStCLG1CQUFtQixHQUFHM0UsU0FBUyxDQUFDMkcsT0FBTyxDQUFFckYsUUFBUSxJQUFLO01BQ3RELE9BQU8sSUFBSXNGLEtBQUssQ0FBQ3RGLFFBQVEsQ0FBQ3VCLFFBQVEsQ0FBQyxDQUM5QmdFLElBQUksQ0FBQ3ZGLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUM7O0lBRUY7SUFDQTtJQUNBO0lBQ0EsSUFBSXNELHlCQUF5QixHQUFHZ0MsS0FBSyxDQUFDSSxJQUFJLENBQ3RDO01BQUN6RCxNQUFNLEVBQUVvQixtQkFBbUIsQ0FBQ3BCO0lBQU0sQ0FBQyxFQUNwQyxDQUFDdkIsS0FBSyxFQUFFc0UsS0FBSyxLQUFLQSxLQUFLLENBQzFCO0lBRUQsSUFBSXlDLGVBQWUsRUFBRUMsNkJBQTZCLEVBQUVDLE9BQU87SUFDM0QsSUFBSUMsWUFBWSxHQUFHLEVBQUU7SUFFckIsT0FBT3RFLHlCQUF5QixDQUFDckIsTUFBTSxFQUFFO01BQ3JDMEYsT0FBTyxHQUFHO1FBQ05sRixXQUFXLEVBQUVGLFNBQVM7UUFDdEJlLHlCQUF5QixFQUFFZjtNQUMvQixDQUFDO01BRURpRixrQkFBa0IsQ0FBQ3hFLE9BQU8sQ0FBRWYsTUFBTSxJQUFLO1FBQ25DeUYsNkJBQTZCLEdBQUcsQ0FBRSxHQUFHcEUseUJBQXlCLENBQUU7UUFFaEVtRSxlQUFlLEdBQUc1Ryw4REFBa0IsQ0FBQ29CLE1BQU0sRUFBRW9CLG1CQUFtQixFQUFFcUUsNkJBQTZCLENBQUM7UUFFaEcsSUFBS0MsT0FBTyxDQUFDbEYsV0FBVyxJQUFJRixTQUFTLElBQzdCb0YsT0FBTyxDQUFDbEYsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdnRixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFDcEQ7VUFDRUUsT0FBTyxDQUFDbEYsV0FBVyxHQUFHZ0YsZUFBZTtVQUNyQ0UsT0FBTyxDQUFDckUseUJBQXlCLEdBQUcsQ0FBQyxHQUFHb0UsNkJBQTZCLENBQUM7UUFDMUU7TUFDSixDQUFDLENBQUM7TUFFRkUsWUFBWSxDQUFDM0gsSUFBSSxDQUFDMEgsT0FBTyxDQUFDbEYsV0FBVyxDQUFDO01BQ3RDYSx5QkFBeUIsR0FBRyxDQUFFLEdBQUdxRSxPQUFPLENBQUNyRSx5QkFBeUIsQ0FBRTtJQUN4RTtJQUNBTCxPQUFPLENBQUNDLEdBQUcsQ0FBQzBFLFlBQVksQ0FBQzs7SUFFekI7O0lBRUE7O0lBRUE7O0lBRUE7SUFDQTs7SUFFQTs7SUFFQTtFQUNKOztFQUVBOztFQUVBM0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDO0VBRTVCLElBQUl4RSxTQUFTLEdBQUcsQ0FDWixJQUFJTCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUM3QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUM3QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUNoQztFQUVELE1BQU13SixlQUFlLEdBQUcsSUFBSXRKLDJEQUFZLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztFQUM3QyxJQUFJSSxXQUFXLEdBQUcsQ0FDZCxJQUFJTCx5REFBVSxDQUFDdUosZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEMsSUFBSXZKLHlEQUFVLENBQUN1SixlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUN4QyxJQUFJdkoseURBQVUsQ0FBQ3VKLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ3pDLElBQUl2Six5REFBVSxDQUFDdUosZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDNUM7RUFFRHpKLG1GQUFvQyxDQUFDTSxTQUFTLEVBQUVDLFdBQVcsQ0FBQzs7RUFFNUQ7O0VBRUFzRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFFNUJ4RSxTQUFTLEdBQUcsQ0FDUixJQUFJTCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLENBQUMsR0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDL0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDOUI7RUFFRCxNQUFNeUosZUFBZSxHQUFHLElBQUl2SiwyREFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7RUFDN0NJLFdBQVcsR0FBRyxDQUNWLElBQUlMLHlEQUFVLENBQUN3SixlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUN6QyxJQUFJeEoseURBQVUsQ0FBQ3dKLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQ3pDLElBQUl4Six5REFBVSxDQUFDd0osZUFBZSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFDMUMsSUFBSXhKLHlEQUFVLENBQUN3SixlQUFlLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUM3QztFQUVEMUosbUZBQW9DLENBQUNNLFNBQVMsRUFBRUMsV0FBVyxDQUFDOztFQUU1RDs7RUFFQXNFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDO0VBRS9CdkUsV0FBVyxHQUFHLENBQ1YsSUFBSUwseURBQVUsQ0FBQ3VKLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3hDLElBQUl2Six5REFBVSxDQUFDdUosZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEMsSUFBSXZKLHlEQUFVLENBQUN1SixlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUN6QyxJQUFJdkoseURBQVUsQ0FBQ3VKLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQzVDO0VBQ0RuSixTQUFTLEdBQUcsQ0FDUixJQUFJTCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzdCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQzVCO0VBRURELG1GQUFvQyxDQUFDTSxTQUFTLEVBQUVDLFdBQVcsQ0FBQzs7RUFFNUQ7O0VBRUFzRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUU5QnZFLFdBQVcsR0FBRyxDQUNWLElBQUlMLHlEQUFVLENBQUN1SixlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUN4QyxJQUFJdkoseURBQVUsQ0FBQ3VKLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3hDLElBQUl2Six5REFBVSxDQUFDdUosZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDekMsSUFBSXZKLHlEQUFVLENBQUN1SixlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUN6QyxJQUFJdkoseURBQVUsQ0FBQ3VKLGVBQWUsRUFBRSxFQUFFLEdBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUM5QztFQUNEbkosU0FBUyxHQUFHLENBQ1IsSUFBSUwsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUMvQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUM1QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUMxQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUErSCxNQUFNLENBQUNoSSxpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRMaXN0Q29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvZm9vdGVyLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRQaWVjZUFkZEZvcm0uanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRTZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3VuY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91bmN1dFBpZWNlQWRkRm9ybS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzP2IzMGYiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3M/MjAzYiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9mb290ZXIuanNcIjtcclxuaW1wb3J0IGN1dFBpZWNlQWRkRm9ybSBmcm9tIFwiLi4vY3V0UGllY2VBZGRGb3JtLmpzXCI7XHJcbmltcG9ydCB1bmN1dFBpZWNlQWRkRm9ybSBmcm9tIFwiLi4vdW5jdXRQaWVjZUFkZEZvcm0uanNcIjtcclxuXHJcbmltcG9ydCBDdXRQaWVjZUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUNvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBDdXRMaXN0Q29tcG9uZW50IGZyb20gXCIuL2N1dExpc3RDb21wb25lbnQuanNcIjtcclxuXHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tIFwiLi4vY3V0TGlzdENhbGN1bGF0b3IuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQge1VuY3V0UGllY2UsIENyb3NzU2VjdGlvbn0gZnJvbSBcIi4uL3VuY3V0UGllY2UuanNcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgY3V0UGllY2VzID0gW107XHJcbiAgICBsZXQgdW5jdXRQaWVjZXMgPSBbXTtcclxuICAgIGxldCBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICBsZXQgY3V0TGlzdEVsZW1lbnQ7XHJcbiAgICBsZXQgY3V0UGllY2VzVGFibGVCb2R5O1xyXG4gICAgbGV0IHVuY3V0UGllY2VzVGFibGVCb2R5O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChGb290ZXIoMjAyMykucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICBjb25zdCBjcmVhdGVDdXRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1jdXQtbGlzdC1idG4nKTtcclxuICAgICAgICBpZiAoY3JlYXRlQ3V0TGlzdEJ0bikge1xyXG4gICAgICAgICAgICBjcmVhdGVDdXRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1dExpc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1dC1saXN0Jyk7XHJcblxyXG4gICAgICAgIGN1dFBpZWNlQWRkRm9ybS5pbml0KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCk7XHJcbiAgICAgICAgdW5jdXRQaWVjZUFkZEZvcm0uaW5pdChoYW5kbGVVbmN1dFBpZWNlQWRkRm9ybVN1Ym1pdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1dFBpZWNlVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gICAgICAgIGN1dFBpZWNlVGFibGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndHInLCB7fSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHt9LCAnVGhpY2tuZXNzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7fSwgJ1dpZHRoJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7fSwgJ0xlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywge30sICdRdWFudGl0eScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywge30sICdLZXJmJylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVuY3V0UGllY2VUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICAgICAgdW5jdXRQaWVjZVRhYmxlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aGVhZCcsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7fSwgJ1RoaWNrbmVzcycpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywge30sICdXaWR0aCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywge30sICdMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHt9LCAnUHJpY2UnKSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN1dFBpZWNlc1RhYmxlQm9keSA9IGN1dFBpZWNlVGFibGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JylcclxuICAgICAgICApO1xyXG4gICAgICAgIHVuY3V0UGllY2VzVGFibGVCb2R5ID0gdW5jdXRQaWVjZVRhYmxlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY3V0UGllY2VBZGRGb3JtLmZvcm1FbGVtZW50LmJlZm9yZShjdXRQaWVjZVRhYmxlKTtcclxuICAgICAgICB1bmN1dFBpZWNlQWRkRm9ybS5mb3JtRWxlbWVudC5iZWZvcmUodW5jdXRQaWVjZVRhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXRQaWVjZShjdXRQaWVjZSkge1xyXG4gICAgICAgIGN1dFBpZWNlcy5wdXNoKGN1dFBpZWNlKTtcclxuICAgICAgICByZXR1cm4gY3V0UGllY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZXMucHVzaCh1bmN1dFBpZWNlKTtcclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dHNcclxuICAgICAgICBjb25zdCBjdXRQaWVjZSA9IG5ldyBDdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdxdWFudGl0eScpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgna2VyZicpLnZhbHVlKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBDdXRQaWVjZSB0byBsaXN0IHRocm91Z2ggY3V0UGllY2VzUmVmXHJcbiAgICAgICAgYWRkQ3V0UGllY2UoY3V0UGllY2UpO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IG5ldyBDdXRQaWVjZVxyXG4gICAgICAgIGN1dFBpZWNlc1RhYmxlQm9keS5hcHBlbmQoXHJcbiAgICAgICAgICAgIEN1dFBpZWNlQ29tcG9uZW50KGN1dFBpZWNlKS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIFVuY3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IHVuY3V0UGllY2UgPSBuZXcgVW5jdXRQaWVjZShcclxuICAgICAgICAgICAgbmV3IENyb3NzU2VjdGlvbihOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdwcmljZScpLnZhbHVlKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgVW5jdXRQaWVjZSB0byBsaXN0IHRocm91Z2ggdW5jdXRQaWVjZXNcclxuICAgICAgICBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IG5ldyBVbmN1dFBpZWNlXHJcbiAgICAgICAgdW5jdXRQaWVjZXNUYWJsZUJvZHkuYXBwZW5kKFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlQ29tcG9uZW50KHVuY3V0UGllY2UpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGJlc3RDdXRMaXN0ID0gY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KFxyXG4gICAgICAgICAgICBjdXRQaWVjZXMsIFxyXG4gICAgICAgICAgICB1bmN1dFBpZWNlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN1dExpc3RFbGVtZW50LmFwcGVuZChDdXRMaXN0Q29tcG9uZW50KGJlc3RDdXRMaXN0KS5yZW5kZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0TGlzdENvbXBvbmVudChjdXRMaXN0KSB7XHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3QgPSBjdXRMaXN0LmRpc3BsYXlNYXRlcmlhbExpc3QoKTtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjdXQtbGlzdCd9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWF0ZXJpYWxMaXN0KSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgncCcsIHt9LCBgJHt2YWx1ZX0gWCAke2tleX1cIiBsb25nIHBpZWNlc2ApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAndHInLCBcclxuICAgICAgICAgICAgeydjbGFzcyc6ICdjdXQtcGllY2UnfSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgY3V0UGllY2UudGhpY2tuZXNzKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgY3V0UGllY2Uud2lkdGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5jdXRMZW5ndGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5xdWFudGl0eSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGN1dFBpZWNlLmtlcmYpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIoY29weXJpZ2h0WWVhcikge1xyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gY3JlYXRlRWxlbWVudCgnZm9vdGVyJywgeydjbGFzcyc6ICd3aGl0ZS10ZXh0LXNoYWRvdyd9KTtcclxuICAgICAgICBjb25zdCBjdXJyWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgLy8gUGFyYWdyYXBoIGVsZW1lbnQgYXMgY2hpbGQgb2YgZm9vdGVyXHJcbiAgICAgICAgbGV0IHRlbXBFbGVtZW50ID0gZm9vdGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XHJcblxyXG4gICAgICAgIC8vIFNtYWxsIGVsZW1lbnQgYXMgY2hpbGQgb2YgcGFyYWdyYXBoXHJcbiAgICAgICAgdGVtcEVsZW1lbnQgPSB0ZW1wRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzbWFsbCcsIHt9LFxyXG4gICAgICAgICAgICAnU291cmNlIENvZGUgwqkgJyxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGltZScsIHtpZDogJ2NvcHlyaWdodC15ZWFyJ30sIGN1cnJZZWFyID4gY29weXJpZ2h0WWVhciA/IGAke2NvcHlyaWdodFllYXJ9LSR7Y3VyclllYXJ9YCA6IGNvcHlyaWdodFllYXIpLFxyXG4gICAgICAgICAgICAnIFRvZGQgQnJlbnRsaW5nZXIsIFNhbnRhIENydXosIENBLCBVU0EuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuJ1xyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9vdGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge3JlbmRlcix9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlQ29tcG9uZW50KHVuY3V0UGllY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAndHInLCBcclxuICAgICAgICAgICAgeydjbGFzcyc6ICd1bmN1dC1waWVjZSd9LFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi50aGlja25lc3MpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi53aWR0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRQaWVjZS5wcmljZSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEN1dExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICAvLyBUT0RPOiBUeXBlIGNoZWNrXHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIudW5jdXRQaWVjZS5wcmljZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzID0gWy4uLnRoaXMuY3V0U2VxdWVuY2VzXTtcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGlzcGxheSB0byBjb25zb2xlIGFuIG9iamVjdCB3aXRoIGtleXMgYXMgdW5jdXQgbGVuZ3RocyBhbmQgdmFsdWVzIGFzIGNvcnJlc3BvbmRpbmcgcXVhbnRpdHkuICovXHJcbiAgICBkaXNwbGF5TWF0ZXJpYWxMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGggaW4gbWF0ZXJpYWxMaXN0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhtYXRlcmlhbExpc3RPYmopO1xyXG4gICAgICAgIHJldHVybiBtYXRlcmlhbExpc3RPYmo7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjdXRMaXN0ID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGxpc3Qgb2YgQ3V0UGllY2VzIGFuZCBtaW5pbWFsIHJlbWFpbmluZyBsZW5ndGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVtYWluaW5nTGVuZ3RoIFxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBpbmRpdmlkdWFsQ3V0UGllY2VzIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydEluZGV4IChkZWZhdWx0ID0gMCkgXHJcbiAgICAgKiBAcmV0dXJucyB7Wy4uLkN1dFBpZWNlLCBOdW1iZXJdfSBBcnJheSBvZiBDdXRQaWVjZXMgd2l0aCBsZWZ0b3ZlciBsZW5ndGggb2Ygd2hvbGUgcGllY2UgYXQgdGhlIGVuZFxyXG4gICAgICovXHJcbiAgICBnZXRDdXRMaXN0OiAocmVtYWluaW5nTGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBzdGFydEluZGV4ID0gMCkgPT4ge1xyXG4gICAgICAgIC8vIFJldHVybiBpZiBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3V0TGVuZ3RoIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggKERPIE5PVCBJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dExlbmd0aCA9PSByZW1haW5pbmdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKGksIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0sIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBpbmRleCBvZiBsYXJnZXN0IGN1dExlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uY3V0TGlzdC5nZXRDdXRMaXN0KFxyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nTGVuZ3RoIC0gc2VsZWN0ZWRDdXRQaWVjZS5jdXRXaXRoS2VyZiwgXHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0O1xyXG4iLCJpbXBvcnQgeyBDdXRMaXN0IH0gZnJvbSBcIi4vY3V0TGlzdC5qc1wiO1xyXG5pbXBvcnQgQ3V0U2VxdWVuY2UgZnJvbSBcIi4vY3V0U2VxdWVuY2UuanNcIjtcclxuXHJcbmNvbnN0IGN1dExpc3RDYWxjdWxhdG9yID0gKCgpID0+IHtcclxuICAgIGxldCBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzIFxyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb3cgdG8gZ2V0IG51bWJlciBmcm9tIGNvdW50ZXI/XHJcbiAgICAgKiBtYXggPSBbNSw0LDMsMl1cclxuICAgICAqIHBvc3NpYmlsaXRpZXMgPSA2KjUqNCozID0gMzYwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMywwLDAsMF1cclxuICAgICAqIFswXSAxXHJcbiAgICAgKiBbM10gKzNcclxuICAgICAqIDRcclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiAzICsgMSA9IDRcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDAsMCwwXVxyXG4gICAgICogLSBGaXJzdCBpbmRleCBpcyBsYXN0IG5vbi16ZXJvIGluZGV4LCBhZGQgZmlyc3QgaW5kZXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAqIDUgKyAxID0gNlxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMiwwLDBdXHJcbiAgICAgKiBbMCwwXSAxXHJcbiAgICAgKiBbNSwwXSArNVxyXG4gICAgICogWzAsMV0gKzFcclxuICAgICAqIFs1LDFdICs1XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiBbNSwwXSArNlxyXG4gICAgICogWzUsMV0gKzZcclxuICAgICAqIFswLDJdICsxXHJcbiAgICAgKiBbMywyXSArM1xyXG4gICAgICogMTZcclxuICAgICAqIC0gRmlyc3Qgbm9uLXplcm8gaW5kZXggKDEpIHZhbHVlICgyKSAqIHByZXYgaW5kZXggKDApIGNvcnJlc3BvbmRpbmcgbWF4IHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiAyICogNiA9IDEyXHJcbiAgICAgKiAtIFBsdXMgZmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMysxPTQpXHJcbiAgICAgKiAxMiArIDQgPSAxNlxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwwLDBdXHJcbiAgICAgKiBbNSwwXSArNlxyXG4gICAgICogWzUsMV0gKzZcclxuICAgICAqIFs1LDJdICs2XHJcbiAgICAgKiBbNSwzXSArNlxyXG4gICAgICogWzUsNF0gKzZcclxuICAgICAqIDMwXHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoNCkgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogNCAqIDYgPSAyNFxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMjQgKyA2ID0gMzBcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFswLDAsMSwwXVxyXG4gICAgICogWzUsNCwwLDBdICszMFxyXG4gICAgICogWzAsMCwxLDBdICsxXHJcbiAgICAgKiAzMVxyXG4gICAgICogLSBGaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICgwKzE9MSlcclxuICAgICAqIDFcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgxKSB2YWx1ZSAoMCkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAxICsgMCAqIDYgPSAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMikgdmFsdWUgKDEpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDEgKiAoNio1KSA9IDMxXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSw0LDMsMl1cclxuICAgICAqIDM2MFxyXG4gICAgICogLSBGaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDZcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgxKSB2YWx1ZSAoNCkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiA2ICsgNCAqIDYgPSAzMFxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgzKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDMwICsgMyAqICg2KjUpID0gMzAgKyAzICogMzAgPSAxMjBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgzKSB2YWx1ZSAoMikgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAxMjAgKyAyICogKDYqNSo0KSA9IDEyMCArIDIgKiAxMjAgPSAxMjAgKyAyNDAgPSAzNjBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8vIElmIGFycmF5IGlzIGVtcHR5IHJldHVybiB6ZXJvXHJcbiAgICAgICAgaWYgKCFudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgXHJcbiAgICAgICAgICAgIHJldHVybiAwOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3ROb25aZXJvSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kTGFzdEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG4gICAgICAgIC8vIElmIGxhc3ROb25aZXJvSW5kZXggaXMgLTEsIGFsbCB2YWx1ZXMgb2YgYXJyYXkgYXJlIHplcm8uIFJldHVybiBvbmUgY291bnQuXHJcbiAgICAgICAgaWYgKGxhc3ROb25aZXJvSW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgbGFzdE5vblplcm9JbmRleCA+PSAwIGFmdGVyIGZpbmRMYXN0SW5kZXgoKSBjYWxsXHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgY291bnQgdG8gZmlyc3QgaW5kZXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAgICBsZXQgY291bnQgPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlclswXSArIDE7XHJcblxyXG4gICAgICAgIC8vIEZvciBldmVyeSBpbmRleCBhZnRlciB0aGUgZmlyc3QgdXAgdG8gbGFzdE5vblplcm9JbmRleCwgYWRkIHRoZSBcclxuICAgICAgICAvLyBwcm9kdWN0IG9mIGFsbCBwcmV2aW91cyBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGFzdE5vblplcm9JbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvdW50ICs9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ldICogbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocy5zbGljZSgwLCBpKS5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSAqIChjdXJyICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGVyY2VudGFnZShudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIGNvbnN0IG51bSA9IGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG5cclxuICAgICAgICBjb25zdCBtYXhMYXN0Tm9uWmVyb0luZGV4ID0gbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocy5maW5kTGFzdEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLnNsaWNlKDAsIG1heExhc3ROb25aZXJvSW5kZXggPT09IC0xID8gbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocy5sZW5ndGggOiBtYXhMYXN0Tm9uWmVyb0luZGV4ICsgMSlcclxuICAgICAgICAgICAgLm1hcCgodmFsKSA9PiB2YWwgKyAxKVxyXG4gICAgICAgICAgICAucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiBjdXJyKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKG51bSAvIG1heCkgKiAxMDA7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgTnVtOiAke251bX0gLSBNYXg6ICR7bWF4fSAtICUke3BlcmNlbnRhZ2UudG9GaXhlZCgyKX1gKTtcclxuICAgICAgICByZXR1cm4gcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBza2lwKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZXguIGN1cnI9WzEsMywwLDBdIG1heD1bMyw0LDQsNV0gcmVzdWx0cyBpbiBhIHZhbGlkIGN1dCBsaXN0LlxyXG4gICAgICAgICAqIE5leHQgaW5jcmVtZW50cyBvZiBbMiwzLDAsMF0gYW5kIFszLDMsMCwwXSB3aWxsIGFsd2F5cyBiZSBtb3JlIGV4cGVuc2l2ZSB0aGFuIFsxLDMsMCwwXS5cclxuICAgICAgICAgKiBNYWtlIGZpcnN0IG5vbi16ZXJvIHZhbHVlIDAgYW5kIGluY3JlbWVudCB2YWx1ZSBhZnRlci5cclxuICAgICAgICAgKiBbMCw0LDAsMF0gLT4gY29udGludWVcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgY29uc3QgZmlyc3ROb25aZXJvVmFsdWVJbmRleCA9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbmRJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZmlyc3ROb25aZXJvVmFsdWVJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIEFycmF5IGlzIGVtcHR5IE9SIGFsbCB2YWx1ZXMgYXJlIHplcm9cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbZmlyc3ROb25aZXJvVmFsdWVJbmRleF0gPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBmaXJzdE5vblplcm9WYWx1ZUluZGV4ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBJbmNyZW1lbnQgdmFsdWUgaW4gZmlyc3QgaW5kZXggb2YgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJcclxuICAgICAgICAvLyBJZiBuZXcgdmFsdWUgZXhjZWVkcyB2YWx1ZSBpbiBzYW1lIGluZGV4IG9mIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gU2V0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIHRvIHplcm9cclxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIG5leHQgaW5kZXggb2YgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJcclxuICAgICAgICAgICAgLy8gUmVwZWF0IHVzaW5nIHJlY3Vyc2lvblxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdKys7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA+IG1heE51bUF2YWlsYWJsZUxlbmd0aHNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsICsraW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHJlYWNoZWQgZW5kXHJcbiAgICAgICAgaWYgKGluZGV4ID49IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0tLTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdIDwgMCkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcykge1xyXG4gICAgICAgIGJlc3RDdXRMaXN0ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IGF2YWlsYWJsZUxlbmd0aHNBcnIgaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIC8vYXZhaWxhYmxlTGVuZ3Roc0Fyci5zb3J0KChhLGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB1bmN1dFBpZWNlcyBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIGxlbmd0aFxyXG4gICAgICAgIHVuY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgYSBzaW5nbGUgcXVhbnRpdHkgY3V0UGllY2VcclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIG5vcm1hbCBhcnJheSBvZiBjdXRQaWVjZXMgdGhhdCBoYXMgYW55IG51bWJlciBxdWFudGl0eSBpbiB0aGVcclxuICAgICAgICAvLyAncXVhbnRpdHknIHByb3BlcnR5LlxyXG4gICAgICAgIGxldCBpbmRpdmlkdWFsQ3V0UGllY2VzID0gY3V0UGllY2VzLmZsYXRNYXAoKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoY3V0UGllY2UucXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAuZmlsbChjdXRQaWVjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1heGltdW0gbnVtYmVyIG9mIGVhY2ggYXZhaWxhYmxlIGxlbmd0aHMgbmVlZGVkIGlmIG9ubHkgdXNlZCB0aGF0IFxyXG4gICAgICAgIC8vIGF2YWlsYWJsZSBsZW5ndGggZm9yIGFsbCBjdXRQaWVjZXMgKGluaXRpYWxpemVkIHRvIHplcm8pXHJcbiAgICAgICAgbGV0IG1heE51bUF2YWlsYWJsZUxlbmd0aHMgPSBuZXcgQXJyYXkodW5jdXRQaWVjZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgIGxldCBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBjdXRTZXF1ZW5jZSwgY3V0U2VxdWVuY2VBcnI7XHJcbiAgICAgICAgbGV0IGN1cnJDdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuZm9yRWFjaCgodW5jdXRQaWVjZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy9tYXhOdW0gPSBNYXRoLmNlaWwodG90YWxDdXRMZW5ndGggLyB1bmN1dFBpZWNlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciBjdXJyZW50IEN1dExpc3QgZnJvbSBwcmV2aW91cyBsb29wXHJcbiAgICAgICAgICAgIGN1cnJDdXRMaXN0LmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlLmxlbmd0aCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjdXRQaWVjZXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IERvIG5vdCBuZWVkIG1heE51bS4gT25seSBuZWVkIHRvIGNoZWNrIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggYW5kIHN0aWxsIGluY3JlbWVudCBjb3VudCBpbiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEluZmluaXRlIGxvb3AgaWYgY3V0IHBpZWNlIGlzIGxvbmdlciB0aGFuIHVuY3V0IHBpZWNlIGxlbmd0aC4gQXJyYXkgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBuZXZlciByZWFjaGVzIHplcm8uXHJcbiAgICAgICAgICAgIHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2VBcnIgPSBDdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycih1bmN1dFBpZWNlLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgY3V0U2VxdWVuY2VBcnIgcmV0dXJucyBqdXN0IHRoZSByZW1haW5pbmcgdmFsdWUgKGFycmF5IGxlbmd0aCAxKSxcclxuICAgICAgICAgICAgICAgIC8vIG5vIG1vcmUgY3V0IHBpZWNlcyBjYW4gYmUgdXNlZC5cclxuICAgICAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZUFyci5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLnJlbWFpbmluZ0xlbmd0aCA9IGN1dFNlcXVlbmNlQXJyW2N1dFNlcXVlbmNlQXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5wdXNoKGN1dFNlcXVlbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgY291bnQgb2YgbWF4IG51bWJlciBvZiBjb3JyZXNwb25kaW5nIFVuY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIG1heE51bUF2YWlsYWJsZUxlbmd0aHNbaW5kZXhdKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3Qgb25seSBpZiBOTyBhdmFpbGFibGUgY3V0IHBpZWNlcyBzdGlsbCBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAmJiAoKGJlc3RDdXRMaXN0ID09IHVuZGVmaW5lZCkgfHwgKGJlc3RDdXRMaXN0LmdldFByaWNlKCkgPj0gY3VyckN1dExpc3QuZ2V0UHJpY2UoKSkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBpbmNyZW1lbnRUcmlnZ2VyLCBkZWNyZW1lbnRUcmlnZ2VyLCB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIHNraXBGbGFnO1xyXG4gICAgICAgIGxldCBwZXJjZW50RmFjdG9yQ291bnRlciA9IDE7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRNdWx0aXBsZURpc3BsYXkgPSA1O1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcik7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gZ2V0UGVyY2VudGFnZShudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSAmJiBwZXJjZW50YWdlID4gKHBlcmNlbnRNdWx0aXBsZURpc3BsYXkgKiBwZXJjZW50RmFjdG9yQ291bnRlcikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3BlcmNlbnRhZ2UudG9GaXhlZCgwKX0lYCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50RmFjdG9yQ291bnRlcisrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBza2lwRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgYWxsIHZhbHVlcyBhcmUgemVybywgc2tpcFxyXG4gICAgICAgICAgICAvLyBJZiBvbmx5IG9uZSB2YWx1ZSBpcyBub24temVybywgc2tpcCBzaW5jZSBhbHJlYWR5IGNoZWNrIHRob3NlIGNhc2VzIHByZXZpb3VzbHlcclxuICAgICAgICAgICAgLy8gSWYgbGVuZ3RoIG9mIGFsbCB1bmN1dCBwaWVjZXMgaXMgbGVzcyB0aGFuIGxlbmd0aCBvZiBhbGwgY3V0IHBpZWNlcywgc2tpcCBzaW5jZSBub3QgZW5vdWdoIG1hdGVyaWFsXHJcbiAgICAgICAgICAgIGlmICgobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmlsdGVyKChjb3VudCkgPT4gY291bnQgPiAwKS5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgJiYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLnJlZHVjZSgoYWNjdW0sIGN1cnIsIGluZGV4KSA9PiBhY2N1bSArIGN1cnIgKiB1bmN1dFBpZWNlc1tpbmRleF0ubGVuZ3RoLCAwKSA+PSBpbmRpdmlkdWFsQ3V0UGllY2VzLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3Vyci5jdXRXaXRoS2VyZiwgMCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gWy4uLm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBtYXhOdW0gb2YgdW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0ubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBub3QsIGtlZXAgaW5jcmVtZW50aW5nIHVudGlsIHJlYWNoIGEgdmFsdWUgdGhhdCBpcyBzdWNjZXNzZnVsLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWNyZW1lbnRUcmlnZ2VyID0gZGVjcmVtZW50KHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlY3JlbWVudFRyaWdnZXIgPT09IG51bGwpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2VBcnIgPSBDdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycih1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLnJlbWFpbmluZ0xlbmd0aCA9IGN1dFNlcXVlbmNlQXJyW2N1dFNlcXVlbmNlQXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5wdXNoKGN1dFNlcXVlbmNlKTtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBjdXJyZW50IEN1dExpc3QgaGFzIGxlc3MgcHJpY2UgdGhhbiB0aGUgYmVzdCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgc3RpbGwgYXZhaWxhYmxlIGN1dCBwaWVjZXMsIG5vdCBlbm91Z2ggdW5jdXQgcGllY2VzLiBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGN1cnJlbnQgY3V0IGxpc3QgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICBza2lwRmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgY3V0IGxpc3QgaXMgYmV0dGVyIGlmIE5PIHVudXNlZCB1bmN1dCBwaWVjZXMgKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciBoYXMgYWxsIHplcm8gdmFsdWVzKSBBTkQgaXQncyBjaGVhcGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKCh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZEluZGV4KCh2YWwpID0+IHZhbCA+IDApID09PSAtMSkgJiYgKGJlc3RDdXRMaXN0LmdldFByaWNlKCkgPj0gY3VyckN1dExpc3QuZ2V0UHJpY2UoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBOZXcgQmVzdCBDdXQgTGlzdCAtIEJlc3Q6ICR7YmVzdEN1dExpc3QuZ2V0UHJpY2UoKX0gLSBDdXJyOiAke2N1cnJDdXRMaXN0LmdldFByaWNlKCl9IC0gVG90YWw6ICR7bnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJ9IC0gTGVmdDogJHt0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJ9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RDdXRMaXN0ID0gY3VyckN1dExpc3QuZGVlcENvcHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChza2lwRmxhZykge1xyXG4gICAgICAgICAgICAgICAgaW5jcmVtZW50VHJpZ2dlciA9IHNraXAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5jcmVtZW50VHJpZ2dlciA9IGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlIChpbmNyZW1lbnRUcmlnZ2VyICE9PSBudWxsKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYmVzdEN1dExpc3QpO1xyXG4gICAgICAgIHdpbmRvdy5iZXN0Q3V0TGlzdCA9IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgICAgICBiZXN0Q3V0TGlzdC5kaXNwbGF5TWF0ZXJpYWxMaXN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN1dExlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGN1dExlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXRMZW5ndGggPSBjdXRMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dExlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImNvbnN0IGN1dFBpZWNlQWRkRm9ybSA9ICgoKSA9PiB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXQtcGllY2UtY3JlYXRlLWZvcm0nKTtcclxuXHJcbiAgICAgICAgaWYgKCFmb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBEZWFsIHdpdGggZm9ybUVsZW1lbnQgbm90IGJlaW5nIGZvdW5kLiBDcmVhdGUgaXQgZHluYW1pY2FsbHkuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vY3V0UGllY2VzTGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgICAgIC8vZm9ybUVsZW1lbnQuYmVmb3JlKGN1dFBpZWNlc0xpc3RFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVGb3JtKCkge1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGlucHV0IGZpZWxkcyBmb3IgY3V0IGxlbmd0aCBhbmQgcXVhbnRpdHksIGxlYXZpbmcgb3RoZXIgaW5wdXRzIHdpdGggdXNlciBlbnRlcmVkIGRhdGEuXHJcbiAgICAgICAgLy8gRm9jdXMgY3Vyc29yIG9uIGxhc3QgaW5wdXQgd2hpY2ggc2hvdWxkIGJlIGN1dCBsZW5ndGggZmllbGRcclxuICAgICAgICBbJ3F1YW50aXR5JywgJ2xlbmd0aCddLmZvckVhY2goKGlucHV0TmFtZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQgPSBmb3JtRWxlbWVudC5lbGVtZW50cy5uYW1lZEl0ZW0oaW5wdXROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gaW5wdXRFbGVtZW50LmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29udmVydExlbmd0aFVuaXRUb0Jhc2VVbml0KGxlbmd0aFVuaXRUZXh0KSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZmVldFxyXG5cclxuICAgICAgICAvLyBDaGVjayBpbmNoZXNcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0LFxyXG4gICAgICAgIGdldCBmb3JtRWxlbWVudCgpIHsgcmV0dXJuIGZvcm1FbGVtZW50IH0sXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0UGllY2VBZGRGb3JtO1xyXG4iLCJpbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4vY3V0UGllY2UuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2UgZnJvbSBcIi4vdW5jdXRQaWVjZS5qc1wiO1xyXG5cclxuY2xhc3MgQ3V0U2VxdWVuY2Uge1xyXG4gICAgY29uc3RydWN0b3IodW5jdXRQaWVjZSkge1xyXG4gICAgICAgIHRoaXMudW5jdXRQaWVjZSA9IHVuY3V0UGllY2U7XHJcblxyXG4gICAgICAgIHRoaXMuY3V0UGllY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5yZW1haW5pbmdMZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBQaWVjZXM6ICR7dGhpcy5jdXRQaWVjZXN9XFxuTGVmdG92ZXI6ICR7dGhpcy5yZW1haW5pbmdMZW5ndGh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQ3V0U2VxdWVuY2UgaW5zdGFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge1VuY3V0UGllY2V9IHVuY3V0UGllY2UgXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Q3V0U2VxdWVuY2V8bnVsbH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlKHVuY3V0UGllY2UsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKFxyXG4gICAgICAgICAgICB1bmN1dFBpZWNlLmxlbmd0aCwgXHJcbiAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsIFxyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gSWYgY3V0U2VxdWVuY2VBcnIgcmV0dXJucyBqdXN0IHRoZSB1bmN1dFBpZWNlIGxlbmd0aCB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgIC8vIGV2ZXJ5IGluZGl2aWR1YWxDdXRQaWVjZSBpcyBsb25nZXIgdGhhbiB0aGUgdW5jdXRQaWVjZVxyXG4gICAgICAgIGlmIChjdXRTZXF1ZW5jZUFyci5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGN1dFNlcXVlbmNlLnJlbWFpbmluZ0xlbmd0aCA9IGN1dFNlcXVlbmNlQXJyW2N1dFNlcXVlbmNlQXJyLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICByZXR1cm4gY3V0U2VxdWVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIHNtYWxsZXN0IHJlbWFpbmluZyBsZW5ndGggZnJvbSBhbiBpbml0aWFsIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVDdXRTZXF1ZW5jZUFycihyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXRMZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0TGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0TGVuZ3RoIHRoYXQgY2FuIGJlIGN1dCB3aXRoIHJlbWFpbmluZ0xlbmd0aCAoSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgJiYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0V2l0aEtlcmYgPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZCAtIEFsbCBjdXRMZW5ndGgra2VyZiBhcmUgbW9yZSB0aGFuIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDdXRQaWVjZSA9IGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2Uoc2VsZWN0ZWRDdXRQaWVjZUluZGV4LCAxKV07XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2UsIFxyXG4gICAgICAgICAgICAuLi5DdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycihcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dFNlcXVlbmNlOyIsImV4cG9ydCBjbGFzcyBDcm9zc1NlY3Rpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIChzbWFsbGVzdCBkaW1lbnNpb24pIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggV2lkdGggb2YgcGllY2UgKGluY2hlcylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVuY3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Q3Jvc3NTZWN0aW9ufSBjcm9zc1NlY3Rpb24gQ3Jvc3Mgc2VjdGlvbiBvZiB1bmN1dCBwaWVjZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBMZW5ndGggb2YgdW5jdXQgcGllY2UgKGluY2hlcykgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJpY2UgUHJpY2Ugb2YgcG9zc2libGUgbGVuZ3RoIChBbWVyaWNhbiBjZW50cyBleC4gJDkuODcgPSA5ODcpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNyb3NzU2VjdGlvbiwgbGVuZ3RoLCBwcmljZSkge1xyXG4gICAgICAgIHRoaXMuY3Jvc3NTZWN0aW9uID0gY3Jvc3NTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVW5jdXRQaWVjZTtcclxuIiwiY29uc3QgdW5jdXRQaWVjZUFkZEZvcm0gPSAoKCkgPT4ge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmN1dC1waWVjZS1jcmVhdGUtZm9ybScpO1xyXG5cclxuICAgICAgICBpZiAoIWZvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IERlYWwgd2l0aCBmb3JtRWxlbWVudCBub3QgYmVpbmcgZm91bmQuIENyZWF0ZSBpdCBkeW5hbWljYWxseS5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0KGUpO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZvcm0oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZmllbGRzIGZvciBjdXQgbGVuZ3RoIGFuZCBxdWFudGl0eSwgbGVhdmluZyBvdGhlciBpbnB1dHMgd2l0aCB1c2VyIGVudGVyZWQgZGF0YS5cclxuICAgICAgICAvLyBGb2N1cyBjdXJzb3Igb24gbGFzdCBpbnB1dCB3aGljaCBzaG91bGQgYmUgY3V0IGxlbmd0aCBmaWVsZFxyXG4gICAgICAgIFsncHJpY2UnLCAnbGVuZ3RoJ10uZm9yRWFjaCgoaW5wdXROYW1lLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudCA9IGZvcm1FbGVtZW50LmVsZW1lbnRzLm5hbWVkSXRlbShpbnB1dE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBpbnB1dEVsZW1lbnQuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAoYXJyLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb252ZXJ0TGVuZ3RoVW5pdFRvQmFzZVVuaXQobGVuZ3RoVW5pdFRleHQpIHtcclxuICAgICAgICAvLyBDaGVjayBmZWV0XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGluY2hlc1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQsXHJcbiAgICAgICAgZ2V0IGZvcm1FbGVtZW50KCkgeyByZXR1cm4gZm9ybUVsZW1lbnQgfSxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1bmN1dFBpZWNlQWRkRm9ybTtcclxuIiwiLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEVsZW1lbnQgdHlwZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBFbGVtZW50IGF0dHJpYnV0ZSBuYW1lcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyB2YWx1ZSBcclxuICogQHBhcmFtICB7Li4uTm9kZX0gY2hpbGRyZW4gLSBWYXJpYWJsZSBudW1iZXIgb2YgY2hpbGQgbm9kZXMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcyA9IHt9LCAuLi5jaGlsZHJlbikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gICAgLy8gUHJvcHNcclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHByb3BzKSkge1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoaWxkcmVuIE5vZGVzXHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGVsZW1lbnQuYXBwZW5kKGNoaWxkKSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQztBQUVEOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBUztFQUNULFVBQVU7RUFDVixTQUFTO0VBQ1QsZUFBZTtFQUNmLGFBQWE7RUFDYix3QkFBd0IsRUFBQTs7QUFFekIsZ0RBQUE7QUFDQTs7RUFFQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxnQkFBZ0IsRUFBQTs7QUFFakI7RUFDQyxZQUFZLEVBQUE7O0FBRWI7O0VBRUMsV0FBVztFQUNYLGFBQWEsRUFBQTs7QUFFZDtFQUNDLHlCQUF5QjtFQUN6QixpQkFBaUIsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXG4gIC0tYmFzZS1ibGFjazogaHNsKDAsIDAlLCAxMCUpOyB9XFxuXFxuaHRtbCB7XFxuICBmb250LXNpemU6IDYyLjUlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLXdoaXRlLCB3aGl0ZSk7IH1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7IH1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxcImhlYWRlciBoZWFkZXJcXFwiXFxyIFxcXCJtYWluIG1haW5cXFwiXFxyIFxcXCJmb290ZXIgZm9vdGVyXFxcIjsgfVxcblxcbmhlYWRlcixcXG5tYWluLFxcbmZvb3RlciB7XFxuICBwYWRkaW5nOiAxLjhyZW07IH1cXG5cXG5oZWFkZXIge1xcbiAgZ3JpZC1hcmVhOiBoZWFkZXI7IH1cXG5cXG5tYWluIHtcXG4gIGdyaWQtYXJlYTogbWFpbjsgfVxcblxcbmZvb3RlciB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGdyaWQtYXJlYTogZm9vdGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4uaW5wdXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmlucHV0LWNvbnRhaW5lciBsYWJlbCwgLmlucHV0LWNvbnRhaW5lciBpbnB1dCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBtYXJnaW46IDFyZW0gMDsgfVxcbiAgLnBpZWNlLWNyZWF0ZS1mb3JtIC5mb3JtLWlucHV0cyAuaW5wdXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDsgfVxcbiAgLnBpZWNlLWNyZWF0ZS1mb3JtIC5zdWJtaXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG5oMSwgaDIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxudGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0ksNkJBQWE7RUFDYiw2QkFBYSxFQUFBOztBQUdqQjtFQUNJLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFFdEIsK0JBQStCO0VBQy9CLDBDQUEwQyxFQUFBOztBQUc5QztFQUNJLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLGlCQUFpQjtFQUNqQix3SUFBd0k7RUFDeEksaUJBQWlCO0VBRWpCLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsaUNBQWlDO0VBQ2pDLGtFQUdtQixFQUFBOztBQUd2Qjs7O0VBR0ksZUFBZSxFQUFBOztBQUtuQjtFQUNJLGlCQUFpQixFQUFBOztBQUtyQjtFQUNJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUIsRUFBQTs7QUFLdkI7RUFDSSxxQkFBcUIsRUFBQTtFQUR6QjtJQUlRLGNBQWMsRUFBQTs7QUFJdEI7RUFDSSwwQ0FBMEM7RUFDMUMsYUFBYTtFQUNiLGNBQWMsRUFBQTtFQUhsQjtJQVdZLGFBQWEsRUFBQTtFQVh6QjtJQWdCUSxhQUFhO0lBQ2IsdUJBQXVCLEVBQUE7O0FBTS9CO0VBQ0ksa0JBQWtCLEVBQUE7O0FBR3RCO0VBQ0ksV0FBVztFQUNYLGtCQUFrQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcclxcbiAgICAtLWJhc2UtYmxhY2s6IGhzbCgwLCAwJSwgMTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNjIuNSU7IC8vIDFyZW0gPSAxMHB4XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTtcXHJcXG59XFxyXFxuXFxyXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxyXFxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXHJcXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcclxcbiAgICAgICAgXFxcImhlYWRlciBoZWFkZXJcXFwiXFxyXFxuICAgICAgICBcXFwibWFpbiBtYWluXFxcIlxcclxcbiAgICAgICAgXFxcImZvb3RlciBmb290ZXJcXFwiO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIsIFxcclxcbm1haW4sIFxcclxcbmZvb3RlciB7XFxyXFxuICAgIHBhZGRpbmc6IDEuOHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gSGVhZGVyXFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiBoZWFkZXI7XFxyXFxufVxcclxcblxcclxcbi8vIE1haW4gQ29udGVudFxcclxcblxcclxcbm1haW4ge1xcclxcbiAgICBncmlkLWFyZWE6IG1haW47XFxyXFxufVxcclxcblxcclxcbi8vIEZvb3RlclxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgICBncmlkLWFyZWE6IGZvb3RlcjtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3VzdG9tIENsYXNzZXNcXHJcXG5cXHJcXG4uaW5wdXQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcblxcclxcbiAgICBsYWJlbCwgaW5wdXQge1xcclxcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgICBtYXJnaW46IDFyZW0gMDtcXHJcXG5cXHJcXG4gICAgLmZvcm0taW5wdXRzIHtcXHJcXG4gICAgICAgIC8vIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICAvLyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcclxcbiAgICAgICAgLy8gY29sdW1uLWdhcDogMXJlbTtcXHJcXG5cXHJcXG4gICAgICAgIC5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN1Ym1pdC1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi8vIE1pc2NcXHJcXG5cXHJcXG5oMSwgaDIge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbnRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVyX3Jlc2V0LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MnO1xyXG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5zY3NzJztcclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gJy4vanMvY3V0TGlzdENhbGN1bGF0b3IuanMnO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSAnLi9qcy9jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Q3Jvc3NTZWN0aW9uLCBVbmN1dFBpZWNlfSBmcm9tICcuL2pzL3VuY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge2N1dExpc3R9IGZyb20gJy4vanMvY3V0TGlzdC5qcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCBmcm9tICcuL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIC8vY3V0TGlzdENhbGN1bGF0b3IuaW5pdCgpO1xyXG4gICAgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsKGN1dFBpZWNlcywgcG9zc2libGVMZW5ndGhzQXJyKSB7XHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0TGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmN1dExlbmd0aCAtIGEuY3V0TGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBpbmRleCBpbiBjb3JyZXNwb25kaW5nIFxyXG4gICAgICAgIC8vIGluZGl2aWR1YWxDdXRQaWVjZXMgYXJyYXkuIElmIGEgaW5kaXZpZHVhbCBDdXRQaWVjZSBpcyBzZWxlY3RlZCBmb3IgXHJcbiAgICAgICAgLy8gYSBjdXQgc2VxdWVuY2UsIGl0J3MgaW5kZXggaXMgcmVtb3ZlZCBmcm9tIHRoaXMgYXJyYXkuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJDdXRTZXF1ZW5jZSwgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGJlc3RDdXQ7XHJcbiAgICAgICAgbGV0IGZpbmFsQ3V0TGlzdCA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmVzdEN1dCA9IHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwb3NzaWJsZUxlbmd0aHNBcnIuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJDdXRTZXF1ZW5jZSA9IGN1dExpc3QuZ2V0Q3V0TGlzdChsZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKChiZXN0Q3V0LmN1dFNlcXVlbmNlID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKGJlc3RDdXQuY3V0U2VxdWVuY2VbLTFdID4gY3VyckN1dFNlcXVlbmNlWy0xXSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RDdXQuY3V0U2VxdWVuY2UgPSBjdXJyQ3V0U2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWy4uLnRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaW5hbEN1dExpc3QucHVzaChiZXN0Q3V0LmN1dFNlcXVlbmNlKTtcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmFsQ3V0TGlzdCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjdXQgbGlzdCBmb3IgZmlyc3QgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGJlc3RDdXRMaXN0IHRvIGZpcnN0IGN1dCBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBuZXh0IHBvc3NpYmxlIGxlbmd0aFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIG5ldyBjdXQgbGlzdCBoYXMgbGVzcyByZW1haW5pbmcgbGVuZ3RoIHRoYW4gYmVzdEN1dExpc3QsIHNldCBcclxuICAgICAgICAvLyBiZXN0Q3V0TGlzdCB0byBuZXcgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIHJlYWNoIGVuZCBvZiBwb3NzaWJsZSBsZW5ndGggYXJyYXksIHNhdmUgYmVzdEN1dExpc3QgdG8gZmluYWwgY3V0IGxpc3Qgc2VxdWVuY2VcclxuXHJcbiAgICAgICAgLy8gUmVwZWF0IG9uY2UgYWdhaW4gd2l0aCByZW1haW5pbmcgaW5kaXZpZHVhbEN1dFBpZWNlc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBFeGFtcGxlJyk7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNDkuODc1LCAzKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uMng0ID0gbmV3IENyb3NzU2VjdGlvbigyLDQpO1xyXG4gICAgbGV0IHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTZWUtU2F3Jyk7XHJcbiAgICBcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzYsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzNSs1LzE2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzArMjEvMzIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAyMi41LCA0KSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uNHg0ID0gbmV3IENyb3NzU2VjdGlvbig0LDQpO1xyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCA3MiwgMTIyOCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCA5NiwgMTU0OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCAxMjAsIDIyMzgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgMTQ0LCAyNzQ4KSxcclxuICAgIF07XHJcbiAgICBcclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFNhdyBIb3JzZXMnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzNiwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDMyKzEvOCwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM0LCAyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogV29vZCBTaGVkJyk7XHJcblxyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTQ0LCA0NjIpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTYqMTIsIDYxNiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxNSoxMisxMSwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzQsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA3KjEyLCAzMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDguNSwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDUqMTIrMTAsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzksIDYpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzExLjUsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBJU1NVRTogVmVyeSBsb25nIHRpbWVcclxuICAgIC8vZGVidWdnZXI7XHJcbiAgICAvL2N1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3IgPSBjdXRMaXN0Q2FsY3VsYXRvcjtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbIkZvb3RlciIsImN1dFBpZWNlQWRkRm9ybSIsInVuY3V0UGllY2VBZGRGb3JtIiwiQ3V0UGllY2VDb21wb25lbnQiLCJVbmN1dFBpZWNlQ29tcG9uZW50IiwiQ3V0TGlzdENvbXBvbmVudCIsImN1dExpc3RDYWxjdWxhdG9yIiwiQ3V0UGllY2UiLCJVbmN1dFBpZWNlIiwiQ3Jvc3NTZWN0aW9uIiwiY3JlYXRlRWxlbWVudCIsImN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50IiwiY3V0UGllY2VzIiwidW5jdXRQaWVjZXMiLCJiZXN0Q3V0TGlzdCIsImN1dExpc3RFbGVtZW50IiwiY3V0UGllY2VzVGFibGVCb2R5IiwidW5jdXRQaWVjZXNUYWJsZUJvZHkiLCJpbml0IiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJjcmVhdGVDdXRMaXN0QnRuIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrIiwiaGFuZGxlQ3V0UGllY2VBZGRGb3JtU3VibWl0IiwiaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQiLCJjdXRQaWVjZVRhYmxlIiwidW5jdXRQaWVjZVRhYmxlIiwiZm9ybUVsZW1lbnQiLCJiZWZvcmUiLCJhZGRDdXRQaWVjZSIsImN1dFBpZWNlIiwicHVzaCIsImFkZFVuY3V0UGllY2UiLCJ1bmN1dFBpZWNlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiTnVtYmVyIiwidGFyZ2V0IiwiZWxlbWVudHMiLCJuYW1lZEl0ZW0iLCJ2YWx1ZSIsImFwcGVuZCIsImdldENoZWFwZXN0Q3V0TGlzdCIsImN1dExpc3QiLCJtYXRlcmlhbExpc3QiLCJkaXNwbGF5TWF0ZXJpYWxMaXN0IiwiZWxlbWVudCIsImtleSIsIk9iamVjdCIsImVudHJpZXMiLCJ0aGlja25lc3MiLCJ3aWR0aCIsImN1dExlbmd0aCIsInF1YW50aXR5Iiwia2VyZiIsImNvcHlyaWdodFllYXIiLCJmb290ZXIiLCJjdXJyWWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRlbXBFbGVtZW50IiwiaWQiLCJjcm9zc1NlY3Rpb24iLCJsZW5ndGgiLCJwcmljZSIsIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImN1dFNlcXVlbmNlcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNsZWFyIiwiY3V0U2VxdWVuY2UiLCJnZXRQcmljZSIsInJlZHVjZSIsImFjY3VtIiwiY3VyciIsImRlZXBDb3B5IiwibWF0ZXJpYWxMaXN0T2JqIiwiZm9yRWFjaCIsImNvbnNvbGUiLCJsb2ciLCJnZXRDdXRMaXN0IiwicmVtYWluaW5nTGVuZ3RoIiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsInNwbGljZSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsIkN1dFNlcXVlbmNlIiwiZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudCIsIm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwibWF4TnVtQXZhaWxhYmxlTGVuZ3RocyIsImxhc3ROb25aZXJvSW5kZXgiLCJmaW5kTGFzdEluZGV4IiwidmFsIiwiY291bnQiLCJzbGljZSIsImdldFBlcmNlbnRhZ2UiLCJudW0iLCJtYXhMYXN0Tm9uWmVyb0luZGV4IiwibWF4IiwibWFwIiwicGVyY2VudGFnZSIsInNraXAiLCJmaXJzdE5vblplcm9WYWx1ZUluZGV4IiwiZmluZEluZGV4IiwiaW5jcmVtZW50IiwiaW5kZXgiLCJkZWNyZW1lbnQiLCJzb3J0IiwiYSIsImIiLCJmbGF0TWFwIiwiQXJyYXkiLCJmaWxsIiwiY3V0U2VxdWVuY2VBcnIiLCJjdXJyQ3V0TGlzdCIsImZyb20iLCJjcmVhdGVDdXRTZXF1ZW5jZUFyciIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwic2tpcEZsYWciLCJwZXJjZW50RmFjdG9yQ291bnRlciIsInBlcmNlbnRNdWx0aXBsZURpc3BsYXkiLCJ0b0ZpeGVkIiwiZmlsdGVyIiwid2luZG93IiwidXBkYXRlRm9ybSIsImlucHV0RWxlbWVudCIsImlucHV0TmFtZSIsImFyciIsImRlZmF1bHRWYWx1ZSIsImZvY3VzIiwiY29udmVydExlbmd0aFVuaXRUb0Jhc2VVbml0IiwibGVuZ3RoVW5pdFRleHQiLCJmb3JtIiwidG9TdHJpbmciLCJjcmVhdGVDdXRTZXF1ZW5jZSIsInR5cGUiLCJwcm9wcyIsInNldEF0dHJpYnV0ZSIsIl9sZW4iLCJjaGlsZHJlbiIsIl9rZXkiLCJjaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwicG9zc2libGVMZW5ndGhzQXJyIiwiY3VyckN1dFNlcXVlbmNlIiwidGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJiZXN0Q3V0IiwiZmluYWxDdXRMaXN0IiwiY3Jvc3NTZWN0aW9uMng0IiwiY3Jvc3NTZWN0aW9uNHg0Il0sInNvdXJjZVJvb3QiOiIifQ==