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
/* harmony import */ var _cutPieceForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPieceForm.js */ "./src/js/cutPieceForm.js");
/* harmony import */ var _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cutSequence.js */ "./src/js/cutSequence.js");
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer.js */ "./src/js/footer.js");




const cutListCalculator = (() => {
  const crossSections = [];
  const cutPieces = [];
  const uncutPieces = [];
  let bestCutList;
  function init() {
    document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(2023).render());
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

    //const totalCutLength = individualCutPieces.reduce((accum, curr) => accum + curr.cutWithKerf, 0);
    //let maxNum;
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
      while (availableCutPiecesByIndex.length
      //|| maxNum > 0
      ) {
        cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"].createCutSequence(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
        if (cutSequenceArr == undefined) {
          break;
        }

        // Create CutSequence instance from cutSequenceArr
        cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"](uncutPiece);
        cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
        cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];

        // Add CutSequence to current CutList
        currCutList.push(cutSequence);

        // Decrement counter
        //maxNum--;

        // Increment count of max number of corresponding UncutPiece
        maxNumAvailableLengths[index]++;
      }

      // Check if current CutList has less price than the best CutList
      if (bestCutList == undefined || bestCutList.getPrice() >= currCutList.getPrice()) {
        bestCutList = currCutList.deepCopy();
      }
    });
    let incrementTrigger, decrementTrigger, tempNumAvailableLengthsCounter;
    do {
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

        /**
         * TODO: If use all uncut pieces to create cut list, can skip adding any more with increment trigger.
         * ex.
         * [1,2,0] => 1x 144" + 2x 120"
         * incremenTrigger = 1 => 2 will be increased to 3
         * - No need to increment to [1,3,0] if [1,2,0] is success
         * instead, set incrementTrigger index to zero AND increment prev index instead
         * [1,2,0] => [2,0,0]
         * 
         * However, [1,2,0] may not be enough with required CutPieces.
         * Would then need to increment normally to [1,3,0] and try again.
         */
        do {
          // Check that maxNum of uncutPieces[decrementTrigger].length can be used with the cutPieces required.
          // If not, keep incrementing until reach a value that is successful.

          decrementTrigger = decrement(tempNumAvailableLengthsCounter, maxNumAvailableLengths);
          if (decrementTrigger === null) {
            break;
          }
          cutSequenceArr = _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"].createCutSequence(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);
          if (cutSequenceArr == undefined) {
            break;
          }

          // Create CutSequence instance from cutSequenceArr
          cutSequence = new _cutSequence_js__WEBPACK_IMPORTED_MODULE_2__["default"](uncutPieces[decrementTrigger]);
          cutSequence.cutPieces = cutSequenceArr.slice(0, -1);
          cutSequence.remainingLength = cutSequenceArr[cutSequenceArr.length - 1];

          // Add CutSequence to current CutList
          currCutList.push(cutSequence);
        } while (availableCutPiecesByIndex.length);

        // Check if current CutList has less price than the best CutList
        if (bestCutList == undefined || bestCutList.getPrice() >= currCutList.getPrice()) {
          bestCutList = currCutList.deepCopy();
        }
      }
      incrementTrigger = increment(numAvailableLengthsCounter, maxNumAvailableLengths);
    } while (incrementTrigger !== null);
    console.log(bestCutList);
    return bestCutList;
  }
  return {
    init,
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
   * @param {[Number]} possibleLengthsArr Array of possible lengths (inches) that the cut piece can be cut from
   * @param {Number} quantity Number of identical pieces to cut (default = 1)
   * @param {Number} kerf Blade width of material removed when cut (inches) (default = 1/8")
   */
  constructor(thickness, width, cutLength, possibleLengthsArr) {
    let quantity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    let kerf = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.125;
    this.thickness = thickness;
    this.width = width;
    this.cutLength = cutLength;
    this.possibleLengthsArr = possibleLengthsArr;
    this.quantity = quantity;
    this.kerf = kerf;
  }
  get cutWithKerf() {
    return this.cutLength + this.kerf;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutPiece);

/***/ }),

/***/ "./src/js/cutPieceForm.js":
/*!********************************!*\
  !*** ./src/js/cutPieceForm.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cutPieceForm = (() => {
  function handleSubmit(e) {}
  return {};
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cutPieceForm);

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
   * Recursive function that returns list of CutPieces and minimal remaining length.
   * @param {Number} remainingLength 
   * @param {[CutPiece]} individualCutPieces 
   * @param {[Number]} availableCutPiecesByIndex 
   * @param {Number} startIndex (default = 0) 
   * @returns {[...CutPiece, Number]} Array of CutPieces with leftover length of whole piece at the end
   */
  static createCutSequence(remainingLength, individualCutPieces, availableCutPiecesByIndex) {
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
    return [selectedCutPiece, ...CutSequence.createCutSequence(remainingLength - selectedCutPiece.cutWithKerf, individualCutPieces, availableCutPiecesByIndex, selectedCutPieceIndex)];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CutSequence);

/***/ }),

/***/ "./src/js/footer.js":
/*!**************************!*\
  !*** ./src/js/footer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./src/js/utilities.js");

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

/***/ "./src/js/uncutPiece.js":
/*!******************************!*\
  !*** ./src/js/uncutPiece.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UncutCrossSection": () => (/* binding */ UncutCrossSection),
/* harmony export */   "UncutPiece": () => (/* binding */ UncutPiece),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class UncutCrossSection {
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
   * @param {UncutCrossSection} uncutCrossSection Cross section of uncut piece
   * @param {Number} length Length of uncut piece (inches) 
   * @param {Number} price Price of possible length (American cents ex. $9.87 = 987)
   */
  constructor(uncutCrossSection, length, price) {
    this.uncutCrossSection = uncutCrossSection;
    this.length = length;
    this.price = price;
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header;\n  display: flex;\n  justify-content: space-between; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    display: block; }\n\n.piece-create-form .form-inputs {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  column-gap: 1rem; }\n  .piece-create-form .form-inputs .input-container {\n    display: grid; }\n\n.piece-create-form .submit-container {\n  display: grid;\n  justify-content: center; }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAEA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,aAAa;EACb,8BAA8B,EAAA;;AAKlC;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;EACI,qBAAqB,EAAA;EADzB;IAIQ,cAAc,EAAA;;AAItB;EAEQ,aAAa;EACb,qCAAqC;EACrC,gBAAgB,EAAA;EAJxB;IAOY,aAAa,EAAA;;AAPzB;EAYQ,aAAa;EACb,uBAAuB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        display: block;\r\n    }\r\n}\r\n\r\n.piece-create-form {\r\n    .form-inputs {\r\n        display: grid;\r\n        grid-template-columns: repeat(4, 1fr);\r\n        column-gap: 1rem;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
/* harmony import */ var _js_cutSequence__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/cutSequence */ "./src/js/cutSequence.js");







(() => {
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].init();
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
  let possibleLengthsArr = [8 * 12, 10 * 12, 12 * 12];
  let cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 19.875, possibleLengthsArr, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 39.875, possibleLengthsArr, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 49.875, possibleLengthsArr, 3)];
  const crossSection2x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutCrossSection(2, 4);
  let uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 144, 462)];

  // TODO: ISSUE - Causes infinite loop
  //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: See-Saw');
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 36, possibleLengthsArr, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 35 + 5 / 16, possibleLengthsArr, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 30 + 21 / 32, possibleLengthsArr, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 22.5, possibleLengthsArr, 4)];
  const crossSection4x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutCrossSection(4, 4);
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 72, 1228), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 96, 1548), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 120, 2238), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 144, 2748)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: Saw Horses');
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection2x4, 144, 462)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 36, possibleLengthsArr, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 32 + 1 / 8, possibleLengthsArr, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 34, possibleLengthsArr, 2)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNQSxPQUFPLENBQUM7RUFDakJDLFdBQVdBLENBQUEsRUFBb0I7SUFBQSxJQUFuQkMsWUFBWSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxFQUFFO0lBQ3pCLElBQUksQ0FBQ0QsWUFBWSxHQUFHQSxZQUFZO0VBQ3BDO0VBRUFJLEtBQUtBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQ0osWUFBWSxHQUFHLEVBQUU7RUFDMUI7RUFFQUssSUFBSUEsQ0FBQ0MsV0FBVyxFQUFFO0lBQ2Q7O0lBRUEsSUFBSSxDQUFDTixZQUFZLENBQUNLLElBQUksQ0FBQ0MsV0FBVyxDQUFDO0VBQ3ZDO0VBRUFDLFFBQVFBLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDUCxZQUFZLENBQUNRLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUVDLElBQUksS0FBS0QsS0FBSyxHQUFHQyxJQUFJLENBQUNDLFVBQVUsQ0FBQ0MsS0FBSyxFQUFFLENBQUMsQ0FBQztFQUN0RjtFQUVBQyxRQUFRQSxDQUFBLEVBQUc7SUFDUCxJQUFJQyxPQUFPLEdBQUcsSUFBSWhCLE9BQU8sRUFBRTtJQUMzQmdCLE9BQU8sQ0FBQ2QsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNBLFlBQVksQ0FBQztJQUM3QyxPQUFPYyxPQUFPO0VBQ2xCO0FBQ0o7QUFFTyxNQUFNQSxPQUFPLEdBQUc7RUFDbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJQyxVQUFVLEVBQUUsU0FBQUEsQ0FBQ0MsZUFBZSxFQUFFQyxtQkFBbUIsRUFBRUMseUJBQXlCLEVBQXFCO0lBQUEsSUFBbkJDLFVBQVUsR0FBQWxCLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7SUFDeEY7SUFDQSxJQUFJLENBQUNpQix5QkFBeUIsQ0FBQ2hCLE1BQU0sRUFBRTtNQUNuQyxPQUFPLENBQUVjLGVBQWUsQ0FBRTtJQUM5QjtJQUVBLElBQUlJLHFCQUFxQjtJQUN6QixLQUFLLElBQUlDLENBQUMsR0FBR0YsVUFBVSxFQUFFRSxDQUFDLEdBQUdILHlCQUF5QixDQUFDaEIsTUFBTSxFQUFFbUIsQ0FBQyxFQUFFLEVBQUU7TUFHaEU7TUFDQSxJQUFJSixtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNHLENBQUMsQ0FBQyxDQUFDLENBQUNDLFNBQVMsSUFBSU4sZUFBZSxFQUFFO1FBQ2hGO1FBQ0E7UUFDQUUseUJBQXlCLENBQUNLLE1BQU0sQ0FBQ0YsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV0QyxPQUFPLENBQUVKLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUU7TUFDbkU7O01BRUE7TUFDQSxJQUFLRCxxQkFBcUIsSUFBSWpCLFNBQVMsSUFDL0JjLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ0csV0FBVyxHQUFHUixlQUFnQixFQUN0RjtRQUNFSSxxQkFBcUIsR0FBR0MsQ0FBQztNQUM3QjtJQUNKOztJQUVBO0lBQ0E7SUFDQSxJQUFJRCxxQkFBcUIsSUFBSWpCLFNBQVMsRUFBRTtNQUNwQyxPQUFPLENBQUVhLGVBQWUsQ0FBRTtJQUM5Qjs7SUFFQTtJQUNBO0lBQ0EsTUFBTVMsZ0JBQWdCLEdBQUdSLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0ssTUFBTSxDQUFDSCxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RyxPQUFPLENBQ0hLLGdCQUFnQixFQUNoQixHQUFHWCxPQUFPLENBQUNDLFVBQVUsQ0FDakJDLGVBQWUsR0FBR1MsZ0JBQWdCLENBQUNELFdBQVcsRUFDOUNQLG1CQUFtQixFQUNuQkMseUJBQXlCLEVBQ3pCRSxxQkFBcUIsQ0FDeEIsQ0FDSjtFQUNMO0FBQ0osQ0FBQztBQUVELGlFQUFlTixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRmlCO0FBQ007QUFDRjtBQUNWO0FBRWpDLE1BQU1lLGlCQUFpQixHQUFHLENBQUMsTUFBTTtFQUM3QixNQUFNQyxhQUFhLEdBQUcsRUFBRTtFQUN4QixNQUFNQyxTQUFTLEdBQUcsRUFBRTtFQUNwQixNQUFNQyxXQUFXLEdBQUcsRUFBRTtFQUN0QixJQUFJQyxXQUFXO0VBRWYsU0FBU0MsSUFBSUEsQ0FBQSxFQUFHO0lBQ1pDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxXQUFXLENBQUNULHNEQUFNLENBQUMsSUFBSSxDQUFDLENBQUNVLE1BQU0sRUFBRSxDQUFDO0VBQ3BEO0VBRUEsU0FBU0MsU0FBU0EsQ0FBQ0MsMEJBQTBCLEVBQUVDLHNCQUFzQixFQUFhO0lBQUEsSUFBWEMsS0FBSyxHQUFBekMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsQ0FBQztJQUM1RTtJQUNBO0lBQ0k7SUFDQTtJQUNBOztJQUVKO0lBQ0EsSUFBSXlDLEtBQUssSUFBSUYsMEJBQTBCLENBQUN0QyxNQUFNLEVBQUU7TUFBRSxPQUFPLElBQUk7SUFBRTtJQUUvRHNDLDBCQUEwQixDQUFDRSxLQUFLLENBQUMsRUFBRTtJQUVuQyxJQUFJRiwwQkFBMEIsQ0FBQ0UsS0FBSyxDQUFDLEdBQUdELHNCQUFzQixDQUFDQyxLQUFLLENBQUMsRUFBRTtNQUNuRUYsMEJBQTBCLENBQUNFLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFDckMsT0FBT0gsU0FBUyxDQUFDQywwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUUsRUFBRUMsS0FBSyxDQUFDO0lBQ2pGO0VBQ0o7RUFFQSxTQUFTQyxTQUFTQSxDQUFDSCwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQWE7SUFBQSxJQUFYQyxLQUFLLEdBQUF6QyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDO0lBQzVFO0lBQ0EsSUFBSXlDLEtBQUssSUFBSUYsMEJBQTBCLENBQUN0QyxNQUFNLEVBQUU7TUFBRSxPQUFPLElBQUk7SUFBRTtJQUUvRHNDLDBCQUEwQixDQUFDRSxLQUFLLENBQUMsRUFBRTtJQUVuQyxJQUFJRiwwQkFBMEIsQ0FBQ0UsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ3ZDRiwwQkFBMEIsQ0FBQ0UsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUNyQyxPQUFPQyxTQUFTLENBQUNILDBCQUEwQixFQUFFQyxzQkFBc0IsRUFBRSxFQUFFQyxLQUFLLENBQUM7SUFDakY7SUFFQSxPQUFPQSxLQUFLO0VBQ2hCO0VBRUEsU0FBU0Usa0JBQWtCQSxDQUFDYixTQUFTLEVBQUVDLFdBQVcsRUFBRTtJQUNoRDtJQUNBRCxTQUFTLENBQUNjLElBQUksQ0FBQyxDQUFDQyxDQUFDLEVBQUNDLENBQUMsS0FBS0EsQ0FBQyxDQUFDekIsU0FBUyxHQUFHd0IsQ0FBQyxDQUFDeEIsU0FBUyxDQUFDOztJQUVsRDtJQUNBOztJQUVBO0lBQ0FVLFdBQVcsQ0FBQ2EsSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxLQUFLQSxDQUFDLENBQUM3QyxNQUFNLEdBQUc0QyxDQUFDLENBQUM1QyxNQUFNLENBQUM7O0lBRTlDO0lBQ0E7SUFDQTtJQUNBLElBQUllLG1CQUFtQixHQUFHYyxTQUFTLENBQUNpQixPQUFPLENBQUVDLFFBQVEsSUFBSztNQUN0RCxPQUFPLElBQUlDLEtBQUssQ0FBQ0QsUUFBUSxDQUFDRSxRQUFRLENBQUMsQ0FDOUJDLElBQUksQ0FBQ0gsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQzs7SUFFRjtJQUNBO0lBQ0EsSUFBSVIsc0JBQXNCLEdBQUcsSUFBSVMsS0FBSyxDQUFDbEIsV0FBVyxDQUFDOUIsTUFBTSxDQUFDLENBQUNrRCxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLElBQUlaLDBCQUEwQixHQUFHLElBQUlVLEtBQUssQ0FBQ2xCLFdBQVcsQ0FBQzlCLE1BQU0sQ0FBQyxDQUFDa0QsSUFBSSxDQUFDLENBQUMsQ0FBQzs7SUFFdEU7SUFDQTtJQUNBLElBQUlsQyx5QkFBeUIsRUFBRVosV0FBVyxFQUFFK0MsY0FBYztJQUMxRCxJQUFJQyxXQUFXLEdBQUcsSUFBSXhELGdEQUFPLEVBQUU7SUFFL0JrQyxXQUFXLENBQUN1QixPQUFPLENBQUMsQ0FBQzVDLFVBQVUsRUFBRStCLEtBQUssS0FBSztNQUN2Qzs7TUFFQXhCLHlCQUF5QixHQUFHZ0MsS0FBSyxDQUFDTSxJQUFJLENBQ2xDO1FBQUN0RCxNQUFNLEVBQUVlLG1CQUFtQixDQUFDZjtNQUFNLENBQUMsRUFDcEMsQ0FBQ3VELEtBQUssRUFBRWYsS0FBSyxLQUFLQSxLQUFLLENBQzFCOztNQUVEO01BQ0FZLFdBQVcsQ0FBQ2xELEtBQUssRUFBRTs7TUFFbkI7TUFDQTtNQUNBO01BQ0EsT0FDSWMseUJBQXlCLENBQUNoQjtNQUMxQjtNQUFBLEVBQ0Y7UUFDRW1ELGNBQWMsR0FBRzFCLHlFQUE2QixDQUFDaEIsVUFBVSxDQUFDVCxNQUFNLEVBQUVlLG1CQUFtQixFQUFFQyx5QkFBeUIsQ0FBQztRQUVqSCxJQUFJbUMsY0FBYyxJQUFJbEQsU0FBUyxFQUFFO1VBQzdCO1FBQ0o7O1FBRUE7UUFDQUcsV0FBVyxHQUFHLElBQUlxQix1REFBVyxDQUFDaEIsVUFBVSxDQUFDO1FBQ3pDTCxXQUFXLENBQUN5QixTQUFTLEdBQUdzQixjQUFjLENBQUNNLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkRyRCxXQUFXLENBQUNVLGVBQWUsR0FBR3FDLGNBQWMsQ0FBQ0EsY0FBYyxDQUFDbkQsTUFBTSxHQUFHLENBQUMsQ0FBQzs7UUFFdkU7UUFDQW9ELFdBQVcsQ0FBQ2pELElBQUksQ0FBQ0MsV0FBVyxDQUFDOztRQUU3QjtRQUNBOztRQUVBO1FBQ0FtQyxzQkFBc0IsQ0FBQ0MsS0FBSyxDQUFDLEVBQUU7TUFDbkM7O01BRUE7TUFDQSxJQUNLVCxXQUFXLElBQUk5QixTQUFTLElBQ3JCOEIsV0FBVyxDQUFDMUIsUUFBUSxFQUFFLElBQUkrQyxXQUFXLENBQUMvQyxRQUFRLEVBQUcsRUFDdkQ7UUFDRTBCLFdBQVcsR0FBR3FCLFdBQVcsQ0FBQ3pDLFFBQVEsRUFBRTtNQUN4QztJQUNKLENBQUMsQ0FBQztJQUVGLElBQUkrQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCLEVBQUVDLDhCQUE4QjtJQUN0RSxHQUFHO01BQ0M7TUFDQTtNQUNBO01BQ0EsSUFBS3RCLDBCQUEwQixDQUFDdUIsTUFBTSxDQUFFQyxLQUFLLElBQUtBLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzlELE1BQU0sR0FBRyxDQUFDLElBQy9Ec0MsMEJBQTBCLENBQUNoQyxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEVBQUVnQyxLQUFLLEtBQUtqQyxLQUFLLEdBQUdDLElBQUksR0FBR3NCLFdBQVcsQ0FBQ1UsS0FBSyxDQUFDLENBQUN4QyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUllLG1CQUFtQixDQUFDVCxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtELEtBQUssR0FBR0MsSUFBSSxDQUFDYyxXQUFXLEVBQUUsQ0FBQyxDQUFFLEVBQ3pMO1FBQ0VzQyw4QkFBOEIsR0FBRyxDQUFDLEdBQUd0QiwwQkFBMEIsQ0FBQztRQUVoRXRCLHlCQUF5QixHQUFHZ0MsS0FBSyxDQUFDTSxJQUFJLENBQ2xDO1VBQUN0RCxNQUFNLEVBQUVlLG1CQUFtQixDQUFDZjtRQUFNLENBQUMsRUFDcEMsQ0FBQ3VELEtBQUssRUFBRWYsS0FBSyxLQUFLQSxLQUFLLENBQzFCOztRQUVEO1FBQ0FZLFdBQVcsQ0FBQ2xELEtBQUssRUFBRTs7UUFFbkI7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRQUNnQixHQUFHO1VBQ0M7VUFDQTs7VUFFQXlELGdCQUFnQixHQUFHbEIsU0FBUyxDQUFDbUIsOEJBQThCLEVBQUVyQixzQkFBc0IsQ0FBQztVQUNwRixJQUFJb0IsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1lBQUU7VUFBTztVQUV4Q1IsY0FBYyxHQUFHMUIseUVBQTZCLENBQUNLLFdBQVcsQ0FBQzZCLGdCQUFnQixDQUFDLENBQUMzRCxNQUFNLEVBQUVlLG1CQUFtQixFQUFFQyx5QkFBeUIsQ0FBQztVQUVwSSxJQUFJbUMsY0FBYyxJQUFJbEQsU0FBUyxFQUFFO1lBQzdCO1VBQ0o7O1VBRUE7VUFDQUcsV0FBVyxHQUFHLElBQUlxQix1REFBVyxDQUFDSyxXQUFXLENBQUM2QixnQkFBZ0IsQ0FBQyxDQUFDO1VBQzVEdkQsV0FBVyxDQUFDeUIsU0FBUyxHQUFHc0IsY0FBYyxDQUFDTSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ25EckQsV0FBVyxDQUFDVSxlQUFlLEdBQUdxQyxjQUFjLENBQUNBLGNBQWMsQ0FBQ25ELE1BQU0sR0FBRyxDQUFDLENBQUM7O1VBRXZFO1VBQ0FvRCxXQUFXLENBQUNqRCxJQUFJLENBQUNDLFdBQVcsQ0FBQztRQUNqQyxDQUFDLFFBQVFZLHlCQUF5QixDQUFDaEIsTUFBTTs7UUFFekM7UUFDQSxJQUNLK0IsV0FBVyxJQUFJOUIsU0FBUyxJQUNyQjhCLFdBQVcsQ0FBQzFCLFFBQVEsRUFBRSxJQUFJK0MsV0FBVyxDQUFDL0MsUUFBUSxFQUFHLEVBQ3ZEO1VBQ0UwQixXQUFXLEdBQUdxQixXQUFXLENBQUN6QyxRQUFRLEVBQUU7UUFDeEM7TUFDSjtNQUVBK0MsZ0JBQWdCLEdBQUdyQixTQUFTLENBQUNDLDBCQUEwQixFQUFFQyxzQkFBc0IsQ0FBQztJQUNwRixDQUFDLFFBQVFtQixnQkFBZ0IsS0FBSyxJQUFJO0lBRWxDSyxPQUFPLENBQUNDLEdBQUcsQ0FBQ2pDLFdBQVcsQ0FBQztJQUN4QixPQUFPQSxXQUFXO0VBQ3RCO0VBRUEsT0FBTztJQUNIQyxJQUFJO0lBQ0pVO0VBQ0osQ0FBQztBQUNMLENBQUMsR0FBRztBQUVKLGlFQUFlZixpQkFBaUI7Ozs7Ozs7Ozs7Ozs7O0FDck1oQyxNQUFNc0MsUUFBUSxDQUFDO0VBQ1g7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lwRSxXQUFXQSxDQUFDcUUsU0FBUyxFQUFFQyxLQUFLLEVBQUUvQyxTQUFTLEVBQUVnRCxrQkFBa0IsRUFBOEI7SUFBQSxJQUE1Qm5CLFFBQVEsR0FBQWxELFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7SUFBQSxJQUFFc0UsSUFBSSxHQUFBdEUsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsS0FBSztJQUNuRixJQUFJLENBQUNtRSxTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDL0MsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ2dELGtCQUFrQixHQUFHQSxrQkFBa0I7SUFDNUMsSUFBSSxDQUFDbkIsUUFBUSxHQUFHQSxRQUFRO0lBQ3hCLElBQUksQ0FBQ29CLElBQUksR0FBR0EsSUFBSTtFQUNwQjtFQUVBLElBQUkvQyxXQUFXQSxDQUFBLEVBQUc7SUFDZCxPQUFPLElBQUksQ0FBQ0YsU0FBUyxHQUFHLElBQUksQ0FBQ2lELElBQUk7RUFDckM7QUFDSjtBQUVBLGlFQUFlSixRQUFROzs7Ozs7Ozs7Ozs7OztBQ3hCdkIsTUFBTXpDLFlBQVksR0FBRyxDQUFDLE1BQU07RUFDeEIsU0FBUzhDLFlBQVlBLENBQUNDLENBQUMsRUFBRSxDQUV6QjtFQUVBLE9BQU8sQ0FFUCxDQUFDO0FBQ0wsQ0FBQyxHQUFHO0FBRUosaUVBQWUvQyxZQUFZOzs7Ozs7Ozs7Ozs7OztBQ1YzQixNQUFNQyxXQUFXLENBQUM7RUFDZDVCLFdBQVdBLENBQUNZLFVBQVUsRUFBRTtJQUNwQixJQUFJLENBQUNBLFVBQVUsR0FBR0EsVUFBVTtJQUU1QixJQUFJLENBQUNvQixTQUFTLEdBQUcsRUFBRTtJQUNuQixJQUFJLENBQUNmLGVBQWUsR0FBRyxDQUFDO0VBQzVCO0VBRUEwRCxRQUFRQSxDQUFBLEVBQUc7SUFDUFQsT0FBTyxDQUFDQyxHQUFHLENBQUUsV0FBVSxJQUFJLENBQUNuQyxTQUFVLGVBQWMsSUFBSSxDQUFDZixlQUFnQixFQUFDLENBQUM7RUFDL0U7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJLE9BQU8wQyxpQkFBaUJBLENBQUMxQyxlQUFlLEVBQUVDLG1CQUFtQixFQUFFQyx5QkFBeUIsRUFBa0I7SUFBQSxJQUFoQkMsVUFBVSxHQUFBbEIsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsQ0FBQztJQUNwRztJQUNBLElBQUksQ0FBQ2lCLHlCQUF5QixDQUFDaEIsTUFBTSxFQUFFO01BQ25DLE9BQU8sQ0FBRWMsZUFBZSxDQUFFO0lBQzlCO0lBRUEsSUFBSUkscUJBQXFCO0lBQ3pCLEtBQUssSUFBSUMsQ0FBQyxHQUFHRixVQUFVLEVBQUVFLENBQUMsR0FBR0gseUJBQXlCLENBQUNoQixNQUFNLEVBQUVtQixDQUFDLEVBQUUsRUFBRTtNQUdoRTtNQUNBLElBQUlKLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsU0FBUyxJQUFJTixlQUFlLEVBQUU7UUFDaEY7UUFDQTtRQUNBRSx5QkFBeUIsQ0FBQ0ssTUFBTSxDQUFDRixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sQ0FBRUosbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRTtNQUNuRTs7TUFFQTtNQUNBLElBQUtELHFCQUFxQixJQUFJakIsU0FBUyxJQUMvQmMsbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDRyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxXQUFXLEdBQUdSLGVBQWdCLEVBQ3RGO1FBQ0VJLHFCQUFxQixHQUFHQyxDQUFDO01BQzdCO0lBQ0o7O0lBRUE7SUFDQTtJQUNBLElBQUlELHFCQUFxQixJQUFJakIsU0FBUyxFQUFFO01BQ3BDLE9BQU8sQ0FBRWEsZUFBZSxDQUFFO0lBQzlCOztJQUVBO0lBQ0E7SUFDQSxNQUFNUyxnQkFBZ0IsR0FBR1IsbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDSyxNQUFNLENBQUNILHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhHLE9BQU8sQ0FDSEssZ0JBQWdCLEVBQ2hCLEdBQUdFLFdBQVcsQ0FBQytCLGlCQUFpQixDQUM1QjFDLGVBQWUsR0FBR1MsZ0JBQWdCLENBQUNELFdBQVcsRUFDOUNQLG1CQUFtQixFQUNuQkMseUJBQXlCLEVBQ3pCRSxxQkFBcUIsQ0FDeEIsQ0FDSjtFQUNMO0FBQ0o7QUFFQSxpRUFBZU8sV0FBVzs7Ozs7Ozs7Ozs7Ozs7O0FDckVxQjtBQUVoQyxTQUFTQyxNQUFNQSxDQUFDZ0QsYUFBYSxFQUFFO0VBQzFDLE1BQU10QyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLE1BQU11QyxNQUFNLEdBQUdGLDREQUFhLENBQUMsUUFBUSxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQW1CLENBQUMsQ0FBQztJQUN0RSxNQUFNRyxRQUFRLEdBQUcsSUFBSUMsSUFBSSxFQUFFLENBQUNDLFdBQVcsRUFBRTs7SUFFekM7SUFDQSxJQUFJQyxXQUFXLEdBQUdKLE1BQU0sQ0FBQ3hDLFdBQVcsQ0FBQ0YsUUFBUSxDQUFDd0MsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUVqRTtJQUNBTSxXQUFXLEdBQUdBLFdBQVcsQ0FBQzVDLFdBQVcsQ0FBQ3NDLDREQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUMzRCxnQkFBZ0IsRUFDaEJBLDREQUFhLENBQUMsTUFBTSxFQUFFO01BQUNPLEVBQUUsRUFBRTtJQUFnQixDQUFDLEVBQUVKLFFBQVEsR0FBR0YsYUFBYSxHQUFJLEdBQUVBLGFBQWMsSUFBR0UsUUFBUyxFQUFDLEdBQUdGLGFBQWEsQ0FBQyxFQUN4SCw4REFBOEQsQ0FDakUsQ0FBQztJQUVGLE9BQU9DLE1BQU07RUFDakIsQ0FBQztFQUVELE9BQU87SUFBQ3ZDO0VBQU8sQ0FBQztBQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTyxNQUFNNkMsaUJBQWlCLENBQUM7RUFDM0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJcEYsV0FBV0EsQ0FBQ3FFLFNBQVMsRUFBRUMsS0FBSyxFQUFFO0lBQzFCLElBQUksQ0FBQ0QsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0VBQ3RCO0FBQ0o7QUFFTyxNQUFNZSxVQUFVLENBQUM7RUFDcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lyRixXQUFXQSxDQUFDc0YsaUJBQWlCLEVBQUVuRixNQUFNLEVBQUVVLEtBQUssRUFBRTtJQUMxQyxJQUFJLENBQUN5RSxpQkFBaUIsR0FBR0EsaUJBQWlCO0lBQzFDLElBQUksQ0FBQ25GLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNVLEtBQUssR0FBR0EsS0FBSztFQUN0QjtBQUNKO0FBRUEsaUVBQWV3RSxVQUFVOzs7Ozs7Ozs7Ozs7OztBQzFCekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU1QsYUFBYUEsQ0FBQ1csSUFBSSxFQUEyQjtFQUFBLElBQXpCQyxLQUFLLEdBQUF0RixTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDLENBQUM7RUFDMUMsTUFBTXVGLE9BQU8sR0FBR3JELFFBQVEsQ0FBQ3dDLGFBQWEsQ0FBQ1csSUFBSSxDQUFDOztFQUU1QztFQUNBLEtBQUssTUFBTSxDQUFDRyxHQUFHLEVBQUVoQyxLQUFLLENBQUMsSUFBSWlDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDSixLQUFLLENBQUMsRUFBRTtJQUM5Q0MsT0FBTyxDQUFDSSxZQUFZLENBQUNILEdBQUcsRUFBRWhDLEtBQUssQ0FBQztFQUNwQzs7RUFFQTtFQUFBLFNBQUFvQyxJQUFBLEdBQUE1RixTQUFBLENBQUFDLE1BQUEsRUFSK0M0RixRQUFRLE9BQUE1QyxLQUFBLENBQUEyQyxJQUFBLE9BQUFBLElBQUEsV0FBQUUsSUFBQSxNQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQTtJQUFSRCxRQUFRLENBQUFDLElBQUEsUUFBQTlGLFNBQUEsQ0FBQThGLElBQUE7RUFBQTtFQVN2REQsUUFBUSxDQUFDdkMsT0FBTyxDQUFDeUMsS0FBSyxJQUFJUixPQUFPLENBQUNTLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDLENBQUM7RUFFaEQsT0FBT1IsT0FBTztBQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpcEJBQWlwQixjQUFjLGVBQWUsY0FBYyxvQkFBb0Isa0JBQWtCLCtCQUErQixpSkFBaUoscUJBQXFCLFVBQVUscUJBQXFCLFlBQVksdUJBQXVCLG1CQUFtQixtQkFBbUIsNkRBQTZELGdCQUFnQixvQkFBb0IsV0FBVyw4QkFBOEIsd0JBQXdCLFNBQVMsZ0dBQWdHLEtBQUssaUJBQWlCLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxrQkFBa0IsWUFBWSxNQUFNLGdCQUFnQixLQUFLLGdCQUFnQixLQUFLLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsZ0JBQWdCLEtBQUssWUFBWSw2cUJBQTZxQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixzQkFBc0Isb0JBQW9CLCtCQUErQixLQUFLLHNKQUFzSixxQkFBcUIsS0FBSyxVQUFVLHFCQUFxQixLQUFLLFlBQVksdUJBQXVCLEtBQUssbUJBQW1CLG1CQUFtQixLQUFLLCtEQUErRCxrQkFBa0Isb0JBQW9CLEtBQUssV0FBVyxnQ0FBZ0Msd0JBQXdCLEtBQUssdUJBQXVCO0FBQ3J5RjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Ysb0hBQW9IO0FBQ3BIO0FBQ0EsaURBQWlELGtDQUFrQyxvQ0FBb0MsVUFBVSxxQkFBcUIsMkJBQTJCLG9DQUFvQyxpREFBaUQsNEJBQTRCLDBCQUEwQixVQUFVLHNCQUFzQiw2SUFBNkksc0JBQXNCLGtCQUFrQiwyQ0FBMkMsc0NBQXNDLGlGQUFpRiw0QkFBNEIsc0JBQXNCLFlBQVksc0JBQXNCLGtCQUFrQixxQ0FBcUMsVUFBVSxzQkFBc0IsWUFBWSxzQkFBc0Isc0JBQXNCLGtCQUFrQiwwQkFBMEIsc0JBQXNCLDRCQUE0QixvREFBb0QsdUJBQXVCLHFDQUFxQyxrQkFBa0IsMENBQTBDLHVCQUF1QixzREFBc0Qsc0JBQXNCLDBDQUEwQyxrQkFBa0IsOEJBQThCLFNBQVMseUZBQXlGLFdBQVcsaUJBQWlCLE1BQU0sWUFBWSxhQUFhLGFBQWEsbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsbUJBQW1CLFFBQVEsZ0JBQWdCLE1BQU0sWUFBWSxXQUFXLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLFlBQVksYUFBYSxXQUFXLGtCQUFrQixNQUFNLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsWUFBWSxrQkFBa0IsTUFBTSxnQkFBZ0IsTUFBTSxVQUFVLGlIQUFpSCxlQUFlLHNDQUFzQyxzQ0FBc0MsS0FBSyxjQUFjLDBCQUEwQiw2Q0FBNkMsNENBQTRDLG1EQUFtRCxLQUFLLGdDQUFnQyw0QkFBNEIsS0FBSyxjQUFjLDBCQUEwQixpSkFBaUosMEJBQTBCLDBCQUEwQiwrQ0FBK0MsMENBQTBDLGlIQUFpSCxLQUFLLHNDQUFzQyx3QkFBd0IsS0FBSyxpQ0FBaUMsMEJBQTBCLHNCQUFzQix1Q0FBdUMsS0FBSyxxQ0FBcUMsd0JBQXdCLEtBQUssaUNBQWlDLDBCQUEwQiwwQkFBMEIsc0JBQXNCLDRCQUE0QixLQUFLLG1EQUFtRCw4QkFBOEIsMEJBQTBCLDJCQUEyQixTQUFTLEtBQUssNEJBQTRCLHNCQUFzQiwwQkFBMEIsa0RBQWtELDZCQUE2QixrQ0FBa0MsOEJBQThCLGFBQWEsU0FBUywrQkFBK0IsMEJBQTBCLG9DQUFvQyxTQUFTLEtBQUssdUJBQXVCO0FBQzNzSDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1IxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBd0o7QUFDeEo7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxrSUFBTzs7OztBQUlrRztBQUMxSCxPQUFPLGlFQUFlLGtJQUFPLElBQUkseUlBQWMsR0FBRyx5SUFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFtSjtBQUNuSjtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDZIQUFPOzs7O0FBSTZGO0FBQ3JILE9BQU8saUVBQWUsNkhBQU8sSUFBSSxvSUFBYyxHQUFHLG9JQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQztBQUNMO0FBQzRCO0FBQ2xCO0FBQ3lCO0FBQ2hCO0FBQ047QUFFM0MsQ0FBQyxNQUFNO0VBQ0gzRCxxRUFBc0IsRUFBRTtFQUV4QixTQUFTcUUsbUNBQW1DQSxDQUFDbkUsU0FBUyxFQUFFdUMsa0JBQWtCLEVBQUU7SUFDeEU7SUFDQXZDLFNBQVMsQ0FBQ2MsSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxLQUFLQSxDQUFDLENBQUN6QixTQUFTLEdBQUd3QixDQUFDLENBQUN4QixTQUFTLENBQUM7O0lBRWxEO0lBQ0E7SUFDQTtJQUNBLElBQUlMLG1CQUFtQixHQUFHYyxTQUFTLENBQUNpQixPQUFPLENBQUVDLFFBQVEsSUFBSztNQUN0RCxPQUFPLElBQUlDLEtBQUssQ0FBQ0QsUUFBUSxDQUFDRSxRQUFRLENBQUMsQ0FDOUJDLElBQUksQ0FBQ0gsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQzs7SUFFRjtJQUNBO0lBQ0E7SUFDQSxJQUFJL0IseUJBQXlCLEdBQUdnQyxLQUFLLENBQUNNLElBQUksQ0FDdEM7TUFBQ3RELE1BQU0sRUFBRWUsbUJBQW1CLENBQUNmO0lBQU0sQ0FBQyxFQUNwQyxDQUFDdUQsS0FBSyxFQUFFZixLQUFLLEtBQUtBLEtBQUssQ0FDMUI7SUFFRCxJQUFJeUQsZUFBZSxFQUFFQyw2QkFBNkIsRUFBRUMsT0FBTztJQUMzRCxJQUFJQyxZQUFZLEdBQUcsRUFBRTtJQUVyQixPQUFPcEYseUJBQXlCLENBQUNoQixNQUFNLEVBQUU7TUFDckNtRyxPQUFPLEdBQUc7UUFDTi9GLFdBQVcsRUFBRUgsU0FBUztRQUN0QmUseUJBQXlCLEVBQUVmO01BQy9CLENBQUM7TUFFRG1FLGtCQUFrQixDQUFDZixPQUFPLENBQUVyRCxNQUFNLElBQUs7UUFDbkNrRyw2QkFBNkIsR0FBRyxDQUFFLEdBQUdsRix5QkFBeUIsQ0FBRTtRQUVoRWlGLGVBQWUsR0FBR3JGLDhEQUFrQixDQUFDWixNQUFNLEVBQUVlLG1CQUFtQixFQUFFbUYsNkJBQTZCLENBQUM7UUFFaEcsSUFBS0MsT0FBTyxDQUFDL0YsV0FBVyxJQUFJSCxTQUFTLElBQzdCa0csT0FBTyxDQUFDL0YsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc2RixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFDcEQ7VUFDRUUsT0FBTyxDQUFDL0YsV0FBVyxHQUFHNkYsZUFBZTtVQUNyQ0UsT0FBTyxDQUFDbkYseUJBQXlCLEdBQUcsQ0FBQyxHQUFHa0YsNkJBQTZCLENBQUM7UUFDMUU7TUFDSixDQUFDLENBQUM7TUFFRkUsWUFBWSxDQUFDakcsSUFBSSxDQUFDZ0csT0FBTyxDQUFDL0YsV0FBVyxDQUFDO01BQ3RDWSx5QkFBeUIsR0FBRyxDQUFFLEdBQUdtRixPQUFPLENBQUNuRix5QkFBeUIsQ0FBRTtJQUN4RTtJQUNBK0MsT0FBTyxDQUFDQyxHQUFHLENBQUNvQyxZQUFZLENBQUM7O0lBRXpCOztJQUVBOztJQUVBOztJQUVBO0lBQ0E7O0lBRUE7O0lBRUE7RUFDSjs7RUFFQTs7RUFFQXJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUU1QixJQUFJSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUMsRUFBRSxDQUFDO0VBQzdDLElBQUl2QyxTQUFTLEdBQUcsQ0FDWixJQUFJb0MsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQ2pELElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUVHLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxFQUNqRCxJQUFJSCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFRyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FDcEQ7RUFFRCxNQUFNaUMsZUFBZSxHQUFHLElBQUlwQixnRUFBaUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0VBQ2xELElBQUluRCxXQUFXLEdBQUcsQ0FDZCxJQUFJb0QseURBQVUsQ0FBQ21CLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3hDLElBQUluQix5REFBVSxDQUFDbUIsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEMsSUFBSW5CLHlEQUFVLENBQUNtQixlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUN6QyxJQUFJbkIseURBQVUsQ0FBQ21CLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQzVDOztFQUVEO0VBQ0E7O0VBRUE7O0VBRUF0QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFFNUJuQyxTQUFTLEdBQUcsQ0FDUixJQUFJb0MsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQzdDLElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQ2xELElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQ25ELElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUVHLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUNsRDtFQUVELE1BQU1rQyxlQUFlLEdBQUcsSUFBSXJCLGdFQUFpQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7RUFDbERuRCxXQUFXLEdBQUcsQ0FDVixJQUFJb0QseURBQVUsQ0FBQ29CLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQ3pDLElBQUlwQix5REFBVSxDQUFDb0IsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFDekMsSUFBSXBCLHlEQUFVLENBQUNvQixlQUFlLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUMxQyxJQUFJcEIseURBQVUsQ0FBQ29CLGVBQWUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQzdDO0VBRUQzRSxtRkFBb0MsQ0FBQ0UsU0FBUyxFQUFFQyxXQUFXLENBQUM7O0VBRTVEOztFQUVBaUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7RUFFL0JsQyxXQUFXLEdBQUcsQ0FDVixJQUFJb0QseURBQVUsQ0FBQ21CLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3hDLElBQUluQix5REFBVSxDQUFDbUIsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDeEMsSUFBSW5CLHlEQUFVLENBQUNtQixlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUN6QyxJQUFJbkIseURBQVUsQ0FBQ21CLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQzVDO0VBQ0R4RSxTQUFTLEdBQUcsQ0FDUixJQUFJb0MsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQzdDLElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRUcsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEVBQ2pELElBQUlILHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUVHLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUNoRDtFQUVEekMsbUZBQW9DLENBQUNFLFNBQVMsRUFBRUMsV0FBVyxDQUFDO0FBQ2hFLENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdENhbGN1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlRm9ybS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFNlcXVlbmNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvZm9vdGVyLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdW5jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzP2IzMGYiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3M/MjAzYiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1dExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICAvLyBUT0RPOiBUeXBlIGNoZWNrXHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIudW5jdXRQaWVjZS5wcmljZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzID0gWy4uLnRoaXMuY3V0U2VxdWVuY2VzXTtcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGN1dExpc3QgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIGdldEN1dExpc3Q6IChyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXRMZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0TGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0TGVuZ3RoIHRoYXQgY2FuIGJlIGN1dCB3aXRoIHJlbWFpbmluZ0xlbmd0aCAoSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgJiYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0V2l0aEtlcmYgPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZCAtIEFsbCBjdXRMZW5ndGgra2VyZiBhcmUgbW9yZSB0aGFuIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDdXRQaWVjZSA9IGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2Uoc2VsZWN0ZWRDdXRQaWVjZUluZGV4LCAxKV07XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2UsIFxyXG4gICAgICAgICAgICAuLi5jdXRMaXN0LmdldEN1dExpc3QoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3Q7XHJcbiIsImltcG9ydCB7IEN1dExpc3QgfSBmcm9tIFwiLi9jdXRMaXN0LmpzXCI7XHJcbmltcG9ydCBjdXRQaWVjZUZvcm0gZnJvbSBcIi4vY3V0UGllY2VGb3JtLmpzXCI7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZSBmcm9tIFwiLi9jdXRTZXF1ZW5jZS5qc1wiO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuL2Zvb3Rlci5qc1wiO1xyXG5cclxuY29uc3QgY3V0TGlzdENhbGN1bGF0b3IgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3QgY3V0UGllY2VzID0gW107XHJcbiAgICBjb25zdCB1bmN1dFBpZWNlcyA9IFtdO1xyXG4gICAgbGV0IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChGb290ZXIoMjAyMykucmVuZGVyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IGF2YWlsYWJsZUxlbmd0aHNBcnIgaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIC8vYXZhaWxhYmxlTGVuZ3Roc0Fyci5zb3J0KChhLGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB1bmN1dFBpZWNlcyBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIGxlbmd0aFxyXG4gICAgICAgIHVuY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgYSBzaW5nbGUgcXVhbnRpdHkgY3V0UGllY2VcclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIG5vcm1hbCBhcnJheSBvZiBjdXRQaWVjZXMgdGhhdCBoYXMgYW55IG51bWJlciBxdWFudGl0eSBpbiB0aGVcclxuICAgICAgICAvLyAncXVhbnRpdHknIHByb3BlcnR5LlxyXG4gICAgICAgIGxldCBpbmRpdmlkdWFsQ3V0UGllY2VzID0gY3V0UGllY2VzLmZsYXRNYXAoKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoY3V0UGllY2UucXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAuZmlsbChjdXRQaWVjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1heGltdW0gbnVtYmVyIG9mIGVhY2ggYXZhaWxhYmxlIGxlbmd0aHMgbmVlZGVkIGlmIG9ubHkgdXNlZCB0aGF0IFxyXG4gICAgICAgIC8vIGF2YWlsYWJsZSBsZW5ndGggZm9yIGFsbCBjdXRQaWVjZXMgKGluaXRpYWxpemVkIHRvIHplcm8pXHJcbiAgICAgICAgbGV0IG1heE51bUF2YWlsYWJsZUxlbmd0aHMgPSBuZXcgQXJyYXkodW5jdXRQaWVjZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgIGxldCBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgdG90YWxDdXRMZW5ndGggPSBpbmRpdmlkdWFsQ3V0UGllY2VzLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3Vyci5jdXRXaXRoS2VyZiwgMCk7XHJcbiAgICAgICAgLy9sZXQgbWF4TnVtO1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBjdXRTZXF1ZW5jZSwgY3V0U2VxdWVuY2VBcnI7XHJcbiAgICAgICAgbGV0IGN1cnJDdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuZm9yRWFjaCgodW5jdXRQaWVjZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy9tYXhOdW0gPSBNYXRoLmNlaWwodG90YWxDdXRMZW5ndGggLyB1bmN1dFBpZWNlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciBjdXJyZW50IEN1dExpc3QgZnJvbSBwcmV2aW91cyBsb29wXHJcbiAgICAgICAgICAgIGN1cnJDdXRMaXN0LmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlLmxlbmd0aCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjdXRQaWVjZXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IERvIG5vdCBuZWVkIG1heE51bS4gT25seSBuZWVkIHRvIGNoZWNrIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggYW5kIHN0aWxsIGluY3JlbWVudCBjb3VudCBpbiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIHdoaWxlIChcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoIFxyXG4gICAgICAgICAgICAgICAgLy98fCBtYXhOdW0gPiAwXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2VBcnIgPSBDdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZUFyciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVjcmVtZW50IGNvdW50ZXJcclxuICAgICAgICAgICAgICAgIC8vbWF4TnVtLS07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5jcmVtZW50IGNvdW50IG9mIG1heCBudW1iZXIgb2YgY29ycmVzcG9uZGluZyBVbmN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXJyZW50IEN1dExpc3QgaGFzIGxlc3MgcHJpY2UgdGhhbiB0aGUgYmVzdCBDdXRMaXN0XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgfHwgKGJlc3RDdXRMaXN0LmdldFByaWNlKCkgPj0gY3VyckN1dExpc3QuZ2V0UHJpY2UoKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcjtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIC8vIElmIGFsbCB2YWx1ZXMgYXJlIHplcm8sIHNraXBcclxuICAgICAgICAgICAgLy8gSWYgb25seSBvbmUgdmFsdWUgaXMgbm9uLXplcm8sIHNraXAgc2luY2UgYWxyZWFkeSBjaGVjayB0aG9zZSBjYXNlcyBwcmV2aW91c2x5XHJcbiAgICAgICAgICAgIC8vIElmIGxlbmd0aCBvZiBhbGwgdW5jdXQgcGllY2VzIGlzIGxlc3MgdGhhbiBsZW5ndGggb2YgYWxsIGN1dCBwaWVjZXMsIHNraXAgc2luY2Ugbm90IGVub3VnaCBtYXRlcmlhbFxyXG4gICAgICAgICAgICBpZiAoKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbHRlcigoY291bnQpID0+IGNvdW50ID4gMCkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgICYmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5yZWR1Y2UoKGFjY3VtLCBjdXJyLCBpbmRleCkgPT4gYWNjdW0gKyBjdXJyICogdW5jdXRQaWVjZXNbaW5kZXhdLmxlbmd0aCwgMCkgPj0gaW5kaXZpZHVhbEN1dFBpZWNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIuY3V0V2l0aEtlcmYsIDApKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IFsuLi5udW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcl07XHJcblxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBjdXJyZW50IEN1dExpc3QgZnJvbSBwcmV2aW91cyBsb29wXHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogVE9ETzogSWYgdXNlIGFsbCB1bmN1dCBwaWVjZXMgdG8gY3JlYXRlIGN1dCBsaXN0LCBjYW4gc2tpcCBhZGRpbmcgYW55IG1vcmUgd2l0aCBpbmNyZW1lbnQgdHJpZ2dlci5cclxuICAgICAgICAgICAgICAgICAqIGV4LlxyXG4gICAgICAgICAgICAgICAgICogWzEsMiwwXSA9PiAxeCAxNDRcIiArIDJ4IDEyMFwiXHJcbiAgICAgICAgICAgICAgICAgKiBpbmNyZW1lblRyaWdnZXIgPSAxID0+IDIgd2lsbCBiZSBpbmNyZWFzZWQgdG8gM1xyXG4gICAgICAgICAgICAgICAgICogLSBObyBuZWVkIHRvIGluY3JlbWVudCB0byBbMSwzLDBdIGlmIFsxLDIsMF0gaXMgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICogaW5zdGVhZCwgc2V0IGluY3JlbWVudFRyaWdnZXIgaW5kZXggdG8gemVybyBBTkQgaW5jcmVtZW50IHByZXYgaW5kZXggaW5zdGVhZFxyXG4gICAgICAgICAgICAgICAgICogWzEsMiwwXSA9PiBbMiwwLDBdXHJcbiAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAqIEhvd2V2ZXIsIFsxLDIsMF0gbWF5IG5vdCBiZSBlbm91Z2ggd2l0aCByZXF1aXJlZCBDdXRQaWVjZXMuXHJcbiAgICAgICAgICAgICAgICAgKiBXb3VsZCB0aGVuIG5lZWQgdG8gaW5jcmVtZW50IG5vcm1hbGx5IHRvIFsxLDMsMF0gYW5kIHRyeSBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjdXRQaWVjZXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50VHJpZ2dlciA9IGRlY3JlbWVudCh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNyZW1lbnRUcmlnZ2VyID09PSBudWxsKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0ubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICB9IHdoaWxlIChpbmNyZW1lbnRUcmlnZ2VyICE9PSBudWxsKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYmVzdEN1dExpc3QpO1xyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQsXHJcbiAgICAgICAgZ2V0Q2hlYXBlc3RDdXRMaXN0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yO1xyXG4iLCJjbGFzcyBDdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3Mgb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggV2lkdGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3V0TGVuZ3RoIEZpbmFsIGN1dCBsZW5ndGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBwb3NzaWJsZUxlbmd0aHNBcnIgQXJyYXkgb2YgcG9zc2libGUgbGVuZ3RocyAoaW5jaGVzKSB0aGF0IHRoZSBjdXQgcGllY2UgY2FuIGJlIGN1dCBmcm9tXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcXVhbnRpdHkgTnVtYmVyIG9mIGlkZW50aWNhbCBwaWVjZXMgdG8gY3V0IChkZWZhdWx0ID0gMSlcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrZXJmIEJsYWRlIHdpZHRoIG9mIG1hdGVyaWFsIHJlbW92ZWQgd2hlbiBjdXQgKGluY2hlcykgKGRlZmF1bHQgPSAxLzhcIilcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgY3V0TGVuZ3RoLCBwb3NzaWJsZUxlbmd0aHNBcnIsIHF1YW50aXR5ID0gMSwga2VyZiA9IDAuMTI1KSB7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlja25lc3M7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuY3V0TGVuZ3RoID0gY3V0TGVuZ3RoO1xyXG4gICAgICAgIHRoaXMucG9zc2libGVMZW5ndGhzQXJyID0gcG9zc2libGVMZW5ndGhzQXJyO1xyXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcclxuICAgICAgICB0aGlzLmtlcmYgPSBrZXJmO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjdXRXaXRoS2VyZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXRMZW5ndGggKyB0aGlzLmtlcmY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dFBpZWNlO1xyXG4iLCJjb25zdCBjdXRQaWVjZUZvcm0gPSAoKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0UGllY2VGb3JtO1xyXG4iLCJjbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVDdXRTZXF1ZW5jZShyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXRMZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0TGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0TGVuZ3RoIHRoYXQgY2FuIGJlIGN1dCB3aXRoIHJlbWFpbmluZ0xlbmd0aCAoSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgJiYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0V2l0aEtlcmYgPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZCAtIEFsbCBjdXRMZW5ndGgra2VyZiBhcmUgbW9yZSB0aGFuIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDdXRQaWVjZSA9IGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2Uoc2VsZWN0ZWRDdXRQaWVjZUluZGV4LCAxKV07XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2UsIFxyXG4gICAgICAgICAgICAuLi5DdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dFNlcXVlbmNlOyIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvb3Rlcihjb3B5cmlnaHRZZWFyKSB7XHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBmb290ZXIgPSBjcmVhdGVFbGVtZW50KCdmb290ZXInLCB7J2NsYXNzJzogJ3doaXRlLXRleHQtc2hhZG93J30pO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFVuY3V0Q3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1VuY3V0Q3Jvc3NTZWN0aW9ufSB1bmN1dENyb3NzU2VjdGlvbiBDcm9zcyBzZWN0aW9uIG9mIHVuY3V0IHBpZWNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodW5jdXRDcm9zc1NlY3Rpb24sIGxlbmd0aCwgcHJpY2UpIHtcclxuICAgICAgICB0aGlzLnVuY3V0Q3Jvc3NTZWN0aW9uID0gdW5jdXRDcm9zc1NlY3Rpb247XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRWxlbWVudCB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIEVsZW1lbnQgYXR0cmlidXRlIG5hbWVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIFxyXG4gKiBAcGFyYW0gIHsuLi5Ob2RlfSBjaGlsZHJlbiAtIFZhcmlhYmxlIG51bWJlciBvZiBjaGlsZCBub2RlcyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgICAvLyBQcm9wc1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hpbGRyZW4gTm9kZXNcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWxlbWVudC5hcHBlbmQoY2hpbGQpKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyB9XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTsgfVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGNvbnRlbnQ6IG5vbmU7IH1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7RUFhQyxTQUFTO0VBQ1QsVUFBVTtFQUNWLFNBQVM7RUFDVCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHdCQUF3QixFQUFBOztBQUV6QixnREFBQTtBQUNBOztFQUVDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGdCQUFnQixFQUFBOztBQUVqQjtFQUNDLFlBQVksRUFBQTs7QUFFYjs7RUFFQyxXQUFXO0VBQ1gsYUFBYSxFQUFBOztBQUVkO0VBQ0MseUJBQXlCO0VBQ3pCLGlCQUFpQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcbiAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7IH1cXG5cXG5odG1sIHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6IHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTsgfVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXFwiaGVhZGVyIGhlYWRlclxcXCJcXHIgXFxcIm1haW4gbWFpblxcXCJcXHIgXFxcImZvb3RlciBmb290ZXJcXFwiOyB9XFxuXFxuaGVhZGVyLFxcbm1haW4sXFxuZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDEuOHJlbTsgfVxcblxcbmhlYWRlciB7XFxuICBncmlkLWFyZWE6IGhlYWRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG5cXG5tYWluIHtcXG4gIGdyaWQtYXJlYTogbWFpbjsgfVxcblxcbmZvb3RlciB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGdyaWQtYXJlYTogZm9vdGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4uaW5wdXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmlucHV0LWNvbnRhaW5lciBsYWJlbCwgLmlucHV0LWNvbnRhaW5lciBpbnB1dCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIC5mb3JtLWlucHV0cyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGNvbHVtbi1nYXA6IDFyZW07IH1cXG4gIC5waWVjZS1jcmVhdGUtZm9ybSAuZm9ybS1pbnB1dHMgLmlucHV0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7IH1cXG5cXG4ucGllY2UtY3JlYXRlLWZvcm0gLnN1Ym1pdC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNJLDZCQUFhO0VBQ2IsNkJBQWEsRUFBQTs7QUFHakI7RUFDSSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBRXRCLCtCQUErQjtFQUMvQiwwQ0FBMEMsRUFBQTs7QUFHOUM7RUFDSSxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxpQkFBaUI7RUFDakIsd0lBQXdJO0VBQ3hJLGlCQUFpQjtFQUVqQixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLGlDQUFpQztFQUNqQyxrRUFHbUIsRUFBQTs7QUFHdkI7OztFQUdJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLDhCQUE4QixFQUFBOztBQUtsQztFQUNJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUIsRUFBQTs7QUFLdkI7RUFDSSxxQkFBcUIsRUFBQTtFQUR6QjtJQUlRLGNBQWMsRUFBQTs7QUFJdEI7RUFFUSxhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLGdCQUFnQixFQUFBO0VBSnhCO0lBT1ksYUFBYSxFQUFBOztBQVB6QjtFQVlRLGFBQWE7RUFDYix1QkFBdUIsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXHJcXG4gICAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7XFxyXFxufVxcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBmb250LXNpemU6IDYyLjUlOyAvLyAxcmVtID0gMTBweFxcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLXdoaXRlLCB3aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcclxcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXHJcXG4gICAgICAgIFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcclxcbiAgICAgICAgXFxcIm1haW4gbWFpblxcXCJcXHJcXG4gICAgICAgIFxcXCJmb290ZXIgZm9vdGVyXFxcIjtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLCBcXHJcXG5tYWluLCBcXHJcXG5mb290ZXIge1xcclxcbiAgICBwYWRkaW5nOiAxLjhyZW07XFxyXFxufVxcclxcblxcclxcbi8vIEhlYWRlclxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICAgIGdyaWQtYXJlYTogaGVhZGVyO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi8vIE1haW4gQ29udGVudFxcclxcblxcclxcbm1haW4ge1xcclxcbiAgICBncmlkLWFyZWE6IG1haW47XFxyXFxufVxcclxcblxcclxcbi8vIEZvb3RlclxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgICBncmlkLWFyZWE6IGZvb3RlcjtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3VzdG9tIENsYXNzZXNcXHJcXG5cXHJcXG4uaW5wdXQtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcblxcclxcbiAgICBsYWJlbCwgaW5wdXQge1xcclxcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXHJcXG4gICAgLmZvcm0taW5wdXRzIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcclxcbiAgICAgICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG5cXHJcXG4gICAgICAgIC5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN1Ym1pdC1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJfcmVzZXQuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZXMuc2Nzcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tICcuL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzJztcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gJy4vanMvY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge1VuY3V0UGllY2UsIFVuY3V0Q3Jvc3NTZWN0aW9ufSBmcm9tICcuL2pzL3VuY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge2N1dExpc3QsIEN1dExpc3R9IGZyb20gJy4vanMvY3V0TGlzdC5qcyc7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZSBmcm9tICcuL2pzL2N1dFNlcXVlbmNlJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwoY3V0UGllY2VzLCBwb3NzaWJsZUxlbmd0aHNBcnIpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGluZGV4IGluIGNvcnJlc3BvbmRpbmcgXHJcbiAgICAgICAgLy8gaW5kaXZpZHVhbEN1dFBpZWNlcyBhcnJheS4gSWYgYSBpbmRpdmlkdWFsIEN1dFBpZWNlIGlzIHNlbGVjdGVkIGZvciBcclxuICAgICAgICAvLyBhIGN1dCBzZXF1ZW5jZSwgaXQncyBpbmRleCBpcyByZW1vdmVkIGZyb20gdGhpcyBhcnJheS5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgY3VyckN1dFNlcXVlbmNlLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgYmVzdEN1dDtcclxuICAgICAgICBsZXQgZmluYWxDdXRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBiZXN0Q3V0ID0ge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBvc3NpYmxlTGVuZ3Roc0Fyci5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyckN1dFNlcXVlbmNlID0gY3V0TGlzdC5nZXRDdXRMaXN0KGxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKGJlc3RDdXQuY3V0U2VxdWVuY2UgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dC5jdXRTZXF1ZW5jZVstMV0gPiBjdXJyQ3V0U2VxdWVuY2VbLTFdKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5jdXRTZXF1ZW5jZSA9IGN1cnJDdXRTZXF1ZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbLi4udGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpbmFsQ3V0TGlzdC5wdXNoKGJlc3RDdXQuY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5iZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxDdXRMaXN0KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBmaXJzdCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYmVzdEN1dExpc3QgdG8gZmlyc3QgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIG5leHQgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgbmV3IGN1dCBsaXN0IGhhcyBsZXNzIHJlbWFpbmluZyBsZW5ndGggdGhhbiBiZXN0Q3V0TGlzdCwgc2V0IFxyXG4gICAgICAgIC8vIGJlc3RDdXRMaXN0IHRvIG5ldyBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgcmVhY2ggZW5kIG9mIHBvc3NpYmxlIGxlbmd0aCBhcnJheSwgc2F2ZSBiZXN0Q3V0TGlzdCB0byBmaW5hbCBjdXQgbGlzdCBzZXF1ZW5jZVxyXG5cclxuICAgICAgICAvLyBSZXBlYXQgb25jZSBhZ2FpbiB3aXRoIHJlbWFpbmluZyBpbmRpdmlkdWFsQ3V0UGllY2VzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IEV4YW1wbGUnKTtcclxuXHJcbiAgICBsZXQgcG9zc2libGVMZW5ndGhzQXJyID0gWzgqMTIsIDEwKjEyLCAxMioxMl07XHJcbiAgICBsZXQgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxOS44NzUsIHBvc3NpYmxlTGVuZ3Roc0FyciwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM5Ljg3NSwgcG9zc2libGVMZW5ndGhzQXJyLCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNDkuODc1LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDMpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb24yeDQgPSBuZXcgVW5jdXRDcm9zc1NlY3Rpb24oMiw0KTtcclxuICAgIGxldCB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIFRPRE86IElTU1VFIC0gQ2F1c2VzIGluZmluaXRlIGxvb3BcclxuICAgIC8vY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTZWUtU2F3Jyk7XHJcbiAgICBcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzYsIHBvc3NpYmxlTGVuZ3Roc0FyciwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM1KzUvMTYsIHBvc3NpYmxlTGVuZ3Roc0FyciwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDMwKzIxLzMyLCBwb3NzaWJsZUxlbmd0aHNBcnIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAyMi41LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDQpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb240eDQgPSBuZXcgVW5jdXRDcm9zc1NlY3Rpb24oNCw0KTtcclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgNzIsIDEyMjgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgOTYsIDE1NDgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgMTIwLCAyMjM4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDE0NCwgMjc0OCksXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTYXcgSG9yc2VzJyk7XHJcblxyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTQ0LCA0NjIpLFxyXG4gICAgXTtcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzYsIHBvc3NpYmxlTGVuZ3Roc0FyciwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDMyKzEvOCwgcG9zc2libGVMZW5ndGhzQXJyLCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzQsIHBvc3NpYmxlTGVuZ3Roc0FyciwgMiksXHJcbiAgICBdO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImN1dFNlcXVlbmNlcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNsZWFyIiwicHVzaCIsImN1dFNlcXVlbmNlIiwiZ2V0UHJpY2UiLCJyZWR1Y2UiLCJhY2N1bSIsImN1cnIiLCJ1bmN1dFBpZWNlIiwicHJpY2UiLCJkZWVwQ29weSIsImN1dExpc3QiLCJnZXRDdXRMaXN0IiwicmVtYWluaW5nTGVuZ3RoIiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsImN1dExlbmd0aCIsInNwbGljZSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsImN1dFBpZWNlRm9ybSIsIkN1dFNlcXVlbmNlIiwiRm9vdGVyIiwiY3V0TGlzdENhbGN1bGF0b3IiLCJjcm9zc1NlY3Rpb25zIiwiY3V0UGllY2VzIiwidW5jdXRQaWVjZXMiLCJiZXN0Q3V0TGlzdCIsImluaXQiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlbmRlciIsImluY3JlbWVudCIsIm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwibWF4TnVtQXZhaWxhYmxlTGVuZ3RocyIsImluZGV4IiwiZGVjcmVtZW50IiwiZ2V0Q2hlYXBlc3RDdXRMaXN0Iiwic29ydCIsImEiLCJiIiwiZmxhdE1hcCIsImN1dFBpZWNlIiwiQXJyYXkiLCJxdWFudGl0eSIsImZpbGwiLCJjdXRTZXF1ZW5jZUFyciIsImN1cnJDdXRMaXN0IiwiZm9yRWFjaCIsImZyb20iLCJ2YWx1ZSIsImNyZWF0ZUN1dFNlcXVlbmNlIiwic2xpY2UiLCJpbmNyZW1lbnRUcmlnZ2VyIiwiZGVjcmVtZW50VHJpZ2dlciIsInRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciIsImZpbHRlciIsImNvdW50IiwiY29uc29sZSIsImxvZyIsIkN1dFBpZWNlIiwidGhpY2tuZXNzIiwid2lkdGgiLCJwb3NzaWJsZUxlbmd0aHNBcnIiLCJrZXJmIiwiaGFuZGxlU3VibWl0IiwiZSIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsImNvcHlyaWdodFllYXIiLCJmb290ZXIiLCJjdXJyWWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRlbXBFbGVtZW50IiwiaWQiLCJVbmN1dENyb3NzU2VjdGlvbiIsIlVuY3V0UGllY2UiLCJ1bmN1dENyb3NzU2VjdGlvbiIsInR5cGUiLCJwcm9wcyIsImVsZW1lbnQiLCJrZXkiLCJPYmplY3QiLCJlbnRyaWVzIiwic2V0QXR0cmlidXRlIiwiX2xlbiIsImNoaWxkcmVuIiwiX2tleSIsImNoaWxkIiwiYXBwZW5kIiwiZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwiLCJjdXJyQ3V0U2VxdWVuY2UiLCJ0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsImJlc3RDdXQiLCJmaW5hbEN1dExpc3QiLCJjcm9zc1NlY3Rpb24yeDQiLCJjcm9zc1NlY3Rpb240eDQiXSwic291cmNlUm9vdCI6IiJ9