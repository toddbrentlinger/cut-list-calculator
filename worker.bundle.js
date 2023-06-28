/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  getMaterialList() {
    const materialListObj = {};
    this.cutSequences.forEach(cutSequence => {
      if (cutSequence.uncutPiece.length in materialListObj) {
        materialListObj[cutSequence.uncutPiece.length].quantity++;
      } else {
        materialListObj[cutSequence.uncutPiece.length] = {
          crossSection: `${cutSequence.uncutPiece.thickness}x${cutSequence.uncutPiece.width}`,
          unitPrice: cutSequence.uncutPiece.price,
          quantity: 1
        };
      }
    });
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
      // Check if cut length equal to remaining length (DO NOT INCLUDE KERF)
      if (individualCutPieces[availableCutPiecesByIndex[i]].length == remainingLength) {
        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        availableCutPiecesByIndex.splice(i, 1);
        return [individualCutPieces[availableCutPiecesByIndex[i]], 0];
      }

      // Find index of largest cut length that can be cut with remainingLength (INCLUDE KERF)
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
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cutSequence.js */ "./src/js/cutSequence.js");




/**
 * TODO: While looping through combinations of uncut pieces, if the combination 
 * price is higher than the current best cut list price, then can skip.
 */

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

  /**
   * Finds cheapest cut lists with CutPieces and UncutPieces of different dimensions
   * @param {[CutPiece]} cutPieces 
   * @param {[UncutPiece]} uncutPieces
   * @param {Function} progressCallback
   * @returns
   */
  function getCutLists(cutPieces, uncutPieces) {
    let progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
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
    const pieces = {};
    const cutLists = [];

    // Sort matching dimensions of CutPieces and UncutPieces together

    cutPieces.forEach(cutPiece => {
      // Getter cutWithKerf is NOT included if cutPiece passed to worker.
      // Set prototype to CutPiece if NOT included.
      if (cutPiece.cutWithKerf === undefined) {
        Object.setPrototypeOf(cutPiece, _cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype);
      }
      if (!(cutPiece.thickness in pieces)) {
        pieces[cutPiece.thickness] = {};
      }
      if (!(cutPiece.width in pieces[cutPiece.thickness])) {
        pieces[cutPiece.thickness][cutPiece.width] = {
          cut: [],
          uncut: []
        };
      }
      pieces[cutPiece.thickness][cutPiece.width].cut.push(cutPiece);
    });
    uncutPieces.forEach(uncutPiece => {
      if (!(uncutPiece.thickness in pieces)) {
        pieces[uncutPiece.thickness] = {};
      }
      if (!(uncutPiece.width in pieces[uncutPiece.thickness])) {
        pieces[uncutPiece.thickness][uncutPiece.width] = {
          cut: [],
          uncut: []
        };
      }
      pieces[uncutPiece.thickness][uncutPiece.width].uncut.push(uncutPiece);
    });

    // Find cheapest cut list for each dimension
    Object.values(pieces).forEach(pieceThicknessObj => {
      Object.values(pieceThicknessObj).forEach(pieceObj => {
        cutLists.push(getCheapestCutList(pieceObj.cut, pieceObj.uncut, progressCallback));
      });
    });

    // Return array of cheapest cut lists for each dimension
    return cutLists;
  }

  /**
   * Finds cheapest CutList with CutPieces and UncutPieces of the same dimension
   * @param {[CutPiece]} cutPieces Array of cutPieces with same dimension
   * @param {[UncutPiece]} uncutPieces Array of uncutPieces with matching dimension of cutPieces
   * @param {Function} progressCallback
   * @returns {CutList}
   */
  function getCheapestCutList(cutPieces, uncutPieces) {
    let progressCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
    // Check for empty pieces
    if (!cutPieces.length || !uncutPieces) {
      return;
    }
    bestCutList = undefined;

    // Sort cutPieces by cut length in decreasing order
    cutPieces.sort((a, b) => b.length - a.length);

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
        cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"].createCutSequenceArr(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
        //debugger;
        // If cutSequenceArr returns just the remaining value (array length 1),
        // no more cut pieces can be used.
        if (cutSequenceArr.length == 1) {
          break;
        }

        // Create CutSequence instance from cutSequenceArr
        cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"](uncutPiece);
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
    let percentage = 0;
    do {
      percentage = getPercentage(numAvailableLengthsCounter, maxNumAvailableLengths);
      if (percentage && percentage > percentMultipleDisplay * percentFactorCounter) {
        progressCallback(percentage.toFixed(0));
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
          cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"].createCutSequenceArr(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);

          // Create CutSequence instance from cutSequenceArr
          cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"](uncutPieces[decrementTrigger]);
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
    return bestCutList;
  }
  return {
    getCheapestCutList,
    getCutLists
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
   * @param {Number} length Final cut length of cut piece (inches)
   * @param {Number} quantity Number of identical pieces to cut (default = 1)
   * @param {Number} kerf Blade width of material removed when cut (inches) (default = 1/8")
   */
  constructor(thickness, width, length) {
    let quantity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    let kerf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.125;
    this.thickness = thickness;
    this.width = width;
    this.length = length;
    this.quantity = quantity;
    this.kerf = kerf;
  }
  get cutWithKerf() {
    return this.length + this.kerf;
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
      // Check if cut length equal to remaining length (DO NOT INCLUDE KERF)
      if (individualCutPieces[availableCutPiecesByIndex[i]].length == remainingLength) {
        // Remove cutPiece index from availableCutPiecesByIndex to avoid same cutPiece
        // being selected for than once.
        availableCutPiecesByIndex.splice(i, 1);
        return [individualCutPieces[availableCutPiecesByIndex[i]], 0];
      }

      // Find index of largest cut length that can be cut with remainingLength (INCLUDE KERF)
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
   * @param {Number} thickness Thickness of uncut piece (inches)
   * @param {Number} width Width of uncut piece (inches)
   * @param {Number} length Length of uncut piece (inches) 
   * @param {Number} price Price of possible length (American cents ex. $9.87 = 987)
   */
  constructor(thickness, width, length, price) {
    this.thickness = thickness;
    this.width = width;
    //this.crossSection = new CrossSection(this.thickness, this.width);
    this.length = length;
    this.price = price;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UncutPiece);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3QuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0U2VxdWVuY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91bmN1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3RXb3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1dExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICAvLyBUT0RPOiBUeXBlIGNoZWNrXHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIudW5jdXRQaWVjZS5wcmljZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzID0gWy4uLnRoaXMuY3V0U2VxdWVuY2VzXTtcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXRlcmlhbExpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0T2JqID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLmZvckVhY2goKGN1dFNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aCBpbiBtYXRlcmlhbExpc3RPYmopIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0ucXVhbnRpdHkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NTZWN0aW9uOiBgJHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnRoaWNrbmVzc314JHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLndpZHRofWAsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdFByaWNlOiBjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWxMaXN0T2JqO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3V0TGlzdCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBsaXN0IG9mIEN1dFBpZWNlcyBhbmQgbWluaW1hbCByZW1haW5pbmcgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgZ2V0Q3V0TGlzdDogKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApID0+IHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dCBsZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0ubGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0IGxlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uY3V0TGlzdC5nZXRDdXRMaXN0KFxyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nTGVuZ3RoIC0gc2VsZWN0ZWRDdXRQaWVjZS5jdXRXaXRoS2VyZiwgXHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0O1xyXG4iLCJpbXBvcnQgeyBDdXRMaXN0IH0gZnJvbSBcIi4vY3V0TGlzdC5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4vY3V0UGllY2UuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcblxyXG4vKipcclxuICogVE9ETzogV2hpbGUgbG9vcGluZyB0aHJvdWdoIGNvbWJpbmF0aW9ucyBvZiB1bmN1dCBwaWVjZXMsIGlmIHRoZSBjb21iaW5hdGlvbiBcclxuICogcHJpY2UgaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgYmVzdCBjdXQgbGlzdCBwcmljZSwgdGhlbiBjYW4gc2tpcC5cclxuICovXHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyBcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICogbWF4ID0gWzUsNCwzLDJdXHJcbiAgICAgKiBwb3NzaWJpbGl0aWVzID0gNio1KjQqMyA9IDM2MFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMCwwLDBdXHJcbiAgICAgKiBbMF0gMVxyXG4gICAgICogWzNdICszXHJcbiAgICAgKiA0XHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogMyArIDEgPSA0XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSwwLDAsMF1cclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiA1ICsgMSA9IDZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICogWzAsMF0gMVxyXG4gICAgICogWzUsMF0gKzVcclxuICAgICAqIFswLDFdICsxXHJcbiAgICAgKiBbNSwxXSArNVxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoMikgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMiAqIDYgPSAxMlxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICogMTIgKyA0ID0gMTZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMCwwXVxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbNSwyXSArNlxyXG4gICAgICogWzUsM10gKzZcclxuICAgICAqIFs1LDRdICs2XHJcbiAgICAgKiAzMFxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDQpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDI0ICsgNiA9IDMwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMCwwLDEsMF1cclxuICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAqIFswLDAsMSwwXSArMVxyXG4gICAgICogMzFcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgKiAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDApICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgxKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAxICogKDYqNSkgPSAzMVxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwzLDJdXHJcbiAgICAgKiAzNjBcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA2XHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogNiArIDQgKiA2ID0gMzBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMykgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMykgdmFsdWUgKDIpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMTIwICsgMiAqICg2KjUqNCkgPSAxMjAgKyAyICogMTIwID0gMTIwICsgMjQwID0gMzYwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvLyBJZiBhcnJheSBpcyBlbXB0eSByZXR1cm4gemVyb1xyXG4gICAgICAgIGlmICghbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgbGV0IGNvdW50ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbMF0gKyAxO1xyXG5cclxuICAgICAgICAvLyBGb3IgZXZlcnkgaW5kZXggYWZ0ZXIgdGhlIGZpcnN0IHVwIHRvIGxhc3ROb25aZXJvSW5kZXgsIGFkZCB0aGUgXHJcbiAgICAgICAgLy8gcHJvZHVjdCBvZiBhbGwgcHJldmlvdXMgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3ROb25aZXJvSW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudCArPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpXSAqIG1heE51bUF2YWlsYWJsZUxlbmd0aHMuc2xpY2UoMCwgaSkucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiAoY3VyciArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICBjb25zdCBudW0gPSBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF4TGFzdE5vblplcm9JbmRleCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHMuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBtYXhMYXN0Tm9uWmVyb0luZGV4ID09PSAtMSA/IG1heE51bUF2YWlsYWJsZUxlbmd0aHMubGVuZ3RoIDogbWF4TGFzdE5vblplcm9JbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbCkgPT4gdmFsICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogY3Vycik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChudW0gLyBtYXgpICogMTAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYE51bTogJHtudW19IC0gTWF4OiAke21heH0gLSAlJHtwZXJjZW50YWdlLnRvRml4ZWQoMil9YCk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4LiBjdXJyPVsxLDMsMCwwXSBtYXg9WzMsNCw0LDVdIHJlc3VsdHMgaW4gYSB2YWxpZCBjdXQgbGlzdC5cclxuICAgICAgICAgKiBOZXh0IGluY3JlbWVudHMgb2YgWzIsMywwLDBdIGFuZCBbMywzLDAsMF0gd2lsbCBhbHdheXMgYmUgbW9yZSBleHBlbnNpdmUgdGhhbiBbMSwzLDAsMF0uXHJcbiAgICAgICAgICogTWFrZSBmaXJzdCBub24temVybyB2YWx1ZSAwIGFuZCBpbmNyZW1lbnQgdmFsdWUgYWZ0ZXIuXHJcbiAgICAgICAgICogWzAsNCwwLDBdIC0+IGNvbnRpbnVlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBlbXB0eSBPUiBhbGwgdmFsdWVzIGFyZSB6ZXJvXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXhdID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgZmlyc3ROb25aZXJvVmFsdWVJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBjaGVhcGVzdCBjdXQgbGlzdHMgd2l0aCBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzIG9mIGRpZmZlcmVudCBkaW1lbnNpb25zXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W1VuY3V0UGllY2VdfSB1bmN1dFBpZWNlc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvZ3Jlc3NDYWxsYmFja1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdHMoY3V0UGllY2VzLCB1bmN1dFBpZWNlcywgcHJvZ3Jlc3NDYWxsYmFjayA9IGNvbnNvbGUubG9nKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhhbXBsZSBvZiBwaWVjZXMgb2JqZWN0OlxyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgIDI6IHtcclxuICAgICAgICAgKiAgICAgNDoge1xyXG4gICAgICAgICAqICAgICAgIGN1dDogW10sICAgLT4gMng0IGN1dFBpZWNlc1xyXG4gICAgICAgICAqICAgICAgIHVuY3V0OiBbXSwgLT4gMng0IHVuY3V0UGllY2VzXHJcbiAgICAgICAgICogICAgIH0sXHJcbiAgICAgICAgICogICB9LFxyXG4gICAgICAgICAqICAgNDoge1xyXG4gICAgICAgICAqICAgICA0OiB7XHJcbiAgICAgICAgICogICAgICAgY3V0OiBbXSwgICAtPiA0eDQgY3V0UGllY2VzXHJcbiAgICAgICAgICogICAgICAgdW5jdXQ6IFtdLCAtPiA0eDQgdW5jdXRQaWVjZXNcclxuICAgICAgICAgKiAgICAgfSxcclxuICAgICAgICAgKiAgIH0sXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IHBpZWNlcyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGN1dExpc3RzID0gW107XHJcblxyXG4gICAgICAgIC8vIFNvcnQgbWF0Y2hpbmcgZGltZW5zaW9ucyBvZiBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzIHRvZ2V0aGVyXHJcblxyXG4gICAgICAgIGN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBHZXR0ZXIgY3V0V2l0aEtlcmYgaXMgTk9UIGluY2x1ZGVkIGlmIGN1dFBpZWNlIHBhc3NlZCB0byB3b3JrZXIuXHJcbiAgICAgICAgICAgIC8vIFNldCBwcm90b3R5cGUgdG8gQ3V0UGllY2UgaWYgTk9UIGluY2x1ZGVkLlxyXG4gICAgICAgICAgICBpZiAoY3V0UGllY2UuY3V0V2l0aEtlcmYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGN1dFBpZWNlLCBDdXRQaWVjZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIShjdXRQaWVjZS50aGlja25lc3MgaW4gcGllY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGllY2VzW2N1dFBpZWNlLnRoaWNrbmVzc10gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEoY3V0UGllY2Uud2lkdGggaW4gcGllY2VzW2N1dFBpZWNlLnRoaWNrbmVzc10pKSB7XHJcbiAgICAgICAgICAgICAgICBwaWVjZXNbY3V0UGllY2UudGhpY2tuZXNzXVtjdXRQaWVjZS53aWR0aF0gPSB7Y3V0OiBbXSwgdW5jdXQ6IFtdfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGllY2VzW2N1dFBpZWNlLnRoaWNrbmVzc11bY3V0UGllY2Uud2lkdGhdLmN1dC5wdXNoKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuZm9yRWFjaCgodW5jdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISh1bmN1dFBpZWNlLnRoaWNrbmVzcyBpbiBwaWVjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwaWVjZXNbdW5jdXRQaWVjZS50aGlja25lc3NdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghKHVuY3V0UGllY2Uud2lkdGggaW4gcGllY2VzW3VuY3V0UGllY2UudGhpY2tuZXNzXSkpIHtcclxuICAgICAgICAgICAgICAgIHBpZWNlc1t1bmN1dFBpZWNlLnRoaWNrbmVzc11bdW5jdXRQaWVjZS53aWR0aF0gPSB7Y3V0OiBbXSwgdW5jdXQ6IFtdfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGllY2VzW3VuY3V0UGllY2UudGhpY2tuZXNzXVt1bmN1dFBpZWNlLndpZHRoXS51bmN1dC5wdXNoKHVuY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGNoZWFwZXN0IGN1dCBsaXN0IGZvciBlYWNoIGRpbWVuc2lvblxyXG4gICAgICAgIE9iamVjdC52YWx1ZXMocGllY2VzKS5mb3JFYWNoKChwaWVjZVRoaWNrbmVzc09iaikgPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHBpZWNlVGhpY2tuZXNzT2JqKS5mb3JFYWNoKChwaWVjZU9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3V0TGlzdHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBnZXRDaGVhcGVzdEN1dExpc3QocGllY2VPYmouY3V0LCBwaWVjZU9iai51bmN1dCwgcHJvZ3Jlc3NDYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gYXJyYXkgb2YgY2hlYXBlc3QgY3V0IGxpc3RzIGZvciBlYWNoIGRpbWVuc2lvblxyXG4gICAgICAgIHJldHVybiBjdXRMaXN0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGNoZWFwZXN0IEN1dExpc3Qgd2l0aCBDdXRQaWVjZXMgYW5kIFVuY3V0UGllY2VzIG9mIHRoZSBzYW1lIGRpbWVuc2lvblxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBjdXRQaWVjZXMgQXJyYXkgb2YgY3V0UGllY2VzIHdpdGggc2FtZSBkaW1lbnNpb25cclxuICAgICAqIEBwYXJhbSB7W1VuY3V0UGllY2VdfSB1bmN1dFBpZWNlcyBBcnJheSBvZiB1bmN1dFBpZWNlcyB3aXRoIG1hdGNoaW5nIGRpbWVuc2lvbiBvZiBjdXRQaWVjZXNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByb2dyZXNzQ2FsbGJhY2tcclxuICAgICAqIEByZXR1cm5zIHtDdXRMaXN0fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcywgcHJvZ3Jlc3NDYWxsYmFjayA9IGNvbnNvbGUubG9nKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVtcHR5IHBpZWNlc1xyXG4gICAgICAgIGlmICghY3V0UGllY2VzLmxlbmd0aCB8fCAhdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgY3V0UGllY2VzIGJ5IGN1dCBsZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHVuY3V0UGllY2VzIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbGVuZ3RoXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZWFjaCBhdmFpbGFibGUgbGVuZ3RocyBuZWVkZWQgaWYgb25seSB1c2VkIHRoYXQgXHJcbiAgICAgICAgLy8gYXZhaWxhYmxlIGxlbmd0aCBmb3IgYWxsIGN1dFBpZWNlcyAoaW5pdGlhbGl6ZWQgdG8gemVybylcclxuICAgICAgICBsZXQgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlLCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvL21heE51bSA9IE1hdGguY2VpbCh0b3RhbEN1dExlbmd0aCAvIHVuY3V0UGllY2UubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2UubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAgICAgLy8gVE9ETzogRG8gbm90IG5lZWQgbWF4TnVtLiBPbmx5IG5lZWQgdG8gY2hlY2sgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBhbmQgc3RpbGwgaW5jcmVtZW50IGNvdW50IGluIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gVE9ETzogSW5maW5pdGUgbG9vcCBpZiBjdXQgcGllY2UgaXMgbG9uZ2VyIHRoYW4gdW5jdXQgcGllY2UgbGVuZ3RoLiBBcnJheSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IG5ldmVyIHJlYWNoZXMgemVyby5cclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHJlbWFpbmluZyB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgICAgICAgICAgLy8gbm8gbW9yZSBjdXQgcGllY2VzIGNhbiBiZSB1c2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggbnVtYmVyIG9mIGNvcnJlc3BvbmRpbmcgVW5jdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdCBvbmx5IGlmIE5PIGF2YWlsYWJsZSBjdXQgcGllY2VzIHN0aWxsIGxlZnRcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICYmICgoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgc2tpcEZsYWc7XHJcblxyXG4gICAgICAgIGxldCBwZXJjZW50RmFjdG9yQ291bnRlciA9IDE7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRNdWx0aXBsZURpc3BsYXkgPSA1O1xyXG4gICAgICAgIGxldCBwZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gZ2V0UGVyY2VudGFnZShudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSAmJiBwZXJjZW50YWdlID4gKHBlcmNlbnRNdWx0aXBsZURpc3BsYXkgKiBwZXJjZW50RmFjdG9yQ291bnRlcikpIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2socGVyY2VudGFnZS50b0ZpeGVkKDApKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRGYWN0b3JDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBhdmFpbGFibGUgY3V0IHBpZWNlcywgbm90IGVub3VnaCB1bmN1dCBwaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgY3VycmVudCBjdXQgbGlzdCBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHNraXBGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjdXQgbGlzdCBpcyBiZXR0ZXIgaWYgTk8gdW51c2VkIHVuY3V0IHBpZWNlcyAodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIGhhcyBhbGwgemVybyB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSAmJiAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5ldyBCZXN0IEN1dCBMaXN0IC0gQmVzdDogJHtiZXN0Q3V0TGlzdC5nZXRQcmljZSgpfSAtIEN1cnI6ICR7Y3VyckN1dExpc3QuZ2V0UHJpY2UoKX0gLSBUb3RhbDogJHtudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn0gLSBMZWZ0OiAke3RlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgICAgICBnZXRDdXRMaXN0cyxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGxlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZSBmcm9tIFwiLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5jbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDdXRTZXF1ZW5jZSBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZX0gdW5jdXRQaWVjZSBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXRTZXF1ZW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2UubGVuZ3RoLCBcclxuICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHVuY3V0UGllY2UgbGVuZ3RoIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgLy8gZXZlcnkgaW5kaXZpZHVhbEN1dFBpZWNlIGlzIGxvbmdlciB0aGFuIHRoZSB1bmN1dFBpZWNlXHJcbiAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRTZXF1ZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dCBsZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0ubGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0IGxlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRTZXF1ZW5jZTsiLCJleHBvcnQgY2xhc3MgQ3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHVuY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgbGVuZ3RoLCBwcmljZSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAvL3RoaXMuY3Jvc3NTZWN0aW9uID0gbmV3IENyb3NzU2VjdGlvbih0aGlzLnRoaWNrbmVzcywgdGhpcy53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tIFwiLi9jdXRMaXN0Q2FsY3VsYXRvci5qc1wiO1xyXG5cclxub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgY29uc3QgYmVzdEN1dExpc3RzID0gY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q3V0TGlzdHMoXHJcbiAgICAgICAgLi4uZS5kYXRhLFxyXG4gICAgICAgIHBvc3RNZXNzYWdlXHJcbiAgICApO1xyXG5cclxuICAgIHBvc3RNZXNzYWdlKGJlc3RDdXRMaXN0cyk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJDdXRMaXN0IiwiY29uc3RydWN0b3IiLCJjdXRTZXF1ZW5jZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjbGVhciIsInB1c2giLCJjdXRTZXF1ZW5jZSIsImdldFByaWNlIiwicmVkdWNlIiwiYWNjdW0iLCJjdXJyIiwidW5jdXRQaWVjZSIsInByaWNlIiwiZGVlcENvcHkiLCJjdXRMaXN0IiwiZ2V0TWF0ZXJpYWxMaXN0IiwibWF0ZXJpYWxMaXN0T2JqIiwiZm9yRWFjaCIsInF1YW50aXR5IiwiY3Jvc3NTZWN0aW9uIiwidGhpY2tuZXNzIiwid2lkdGgiLCJ1bml0UHJpY2UiLCJnZXRDdXRMaXN0IiwicmVtYWluaW5nTGVuZ3RoIiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsInNwbGljZSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsIkN1dFBpZWNlIiwiQ3V0U2VxdWVuY2UiLCJjdXRMaXN0Q2FsY3VsYXRvciIsImJlc3RDdXRMaXN0IiwiZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudCIsIm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwibWF4TnVtQXZhaWxhYmxlTGVuZ3RocyIsImxhc3ROb25aZXJvSW5kZXgiLCJmaW5kTGFzdEluZGV4IiwidmFsIiwiY291bnQiLCJzbGljZSIsImdldFBlcmNlbnRhZ2UiLCJudW0iLCJtYXhMYXN0Tm9uWmVyb0luZGV4IiwibWF4IiwibWFwIiwicGVyY2VudGFnZSIsInNraXAiLCJmaXJzdE5vblplcm9WYWx1ZUluZGV4IiwiZmluZEluZGV4IiwiaW5jcmVtZW50IiwiaW5kZXgiLCJkZWNyZW1lbnQiLCJnZXRDdXRMaXN0cyIsImN1dFBpZWNlcyIsInVuY3V0UGllY2VzIiwicHJvZ3Jlc3NDYWxsYmFjayIsImNvbnNvbGUiLCJsb2ciLCJwaWVjZXMiLCJjdXRMaXN0cyIsImN1dFBpZWNlIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJjdXQiLCJ1bmN1dCIsInZhbHVlcyIsInBpZWNlVGhpY2tuZXNzT2JqIiwicGllY2VPYmoiLCJnZXRDaGVhcGVzdEN1dExpc3QiLCJzb3J0IiwiYSIsImIiLCJmbGF0TWFwIiwiQXJyYXkiLCJmaWxsIiwiY3V0U2VxdWVuY2VBcnIiLCJjdXJyQ3V0TGlzdCIsImZyb20iLCJ2YWx1ZSIsImNyZWF0ZUN1dFNlcXVlbmNlQXJyIiwiaW5jcmVtZW50VHJpZ2dlciIsImRlY3JlbWVudFRyaWdnZXIiLCJ0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJza2lwRmxhZyIsInBlcmNlbnRGYWN0b3JDb3VudGVyIiwicGVyY2VudE11bHRpcGxlRGlzcGxheSIsInRvRml4ZWQiLCJmaWx0ZXIiLCJrZXJmIiwiVW5jdXRQaWVjZSIsInRvU3RyaW5nIiwiY3JlYXRlQ3V0U2VxdWVuY2UiLCJDcm9zc1NlY3Rpb24iLCJvbm1lc3NhZ2UiLCJlIiwiYmVzdEN1dExpc3RzIiwiZGF0YSIsInBvc3RNZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==