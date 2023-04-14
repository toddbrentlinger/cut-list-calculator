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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  color: red; }\n", "",{"version":3,"sources":["webpack://./src/styles.scss"],"names":[],"mappings":"AAAA;EACI,UAAU,EAAA","sourcesContent":["body {\r\n    color: red;\r\n}\r\n"],"sourceRoot":""}]);
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

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss");

      
      
      
      
      
      
      
      
      

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
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
/* harmony import */ var _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/cutList.js */ "./src/js/cutList.js");
/* harmony import */ var _js_cutSequence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/cutSequence */ "./src/js/cutSequence.js");





function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Cut List Calculator';
  return element;
}
document.body.appendChild(component());
(() => {
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
        currCutSequence = _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__.cutList.getCutList(length, individualCutPieces, tempAvailableCutPiecesByIndex);
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

  function foo(cutPieces, possibleLengthsArr) {
    // Sort cutPieces by cutLength in decreasing order
    cutPieces.sort((a, b) => b.cutLength - a.cutLength);

    // Create array where each value represents a single quantity cutPiece
    // instead of normal array of cutPieces that has any number quantity in the
    // 'quantity' property.
    let individualCutPieces = cutPieces.flatMap(cutPiece => {
      return new Array(cutPiece.quantity).fill(cutPiece);
    });
    let availableCutPiecesByIndex, cutSequence;
    possibleLengthsArr.forEach(length => {
      availableCutPiecesByIndex = Array.from({
        length: individualCutPieces.length
      }, (value, index) => index);
      console.log(`Length: ${length}`);
      while (availableCutPiecesByIndex.length) {
        cutSequence = _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__.cutList.getCutList(length, individualCutPieces, availableCutPiecesByIndex);
        console.log(cutSequence);
        if (cutSequence == undefined) {
          break;
        }
      }
    });
  }
  function bar(cutPieces, uncutPieces) {
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
    let availableCutPiecesByIndex, cutSequence, cutSequenceArr, bestCutList;
    let currCutList = new _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__.CutList();
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
        cutSequenceArr = _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__.cutList.getCutList(uncutPiece.length, individualCutPieces, availableCutPiecesByIndex);
        if (cutSequenceArr == undefined) {
          break;
        }

        // Create CutSequence instance from cutSequenceArr
        cutSequence = new _js_cutSequence__WEBPACK_IMPORTED_MODULE_4__["default"](uncutPiece);
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
    console.log('Best Initial:');
    console.log(bestCutList);
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
          cutSequenceArr = _js_cutList_js__WEBPACK_IMPORTED_MODULE_3__.cutList.getCutList(uncutPieces[decrementTrigger].length, individualCutPieces, availableCutPiecesByIndex);
          if (cutSequenceArr == undefined) {
            break;
          }

          // Create CutSequence instance from cutSequenceArr
          cutSequence = new _js_cutSequence__WEBPACK_IMPORTED_MODULE_4__["default"](uncutPieces[decrementTrigger]);
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
    console.log('Final Best');
    console.log(bestCutList);
    window.bestCutList = bestCutList;
  }

  // ------------------------------------------------------------------------

  let possibleLengthsArr = [8 * 12, 10 * 12, 12 * 12];
  let cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 19.875, possibleLengthsArr, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 39.875, possibleLengthsArr, 3), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 49.875, possibleLengthsArr, 3)];
  /*
  console.log('Test 1:');
  foo(cutPieces, possibleLengthsArr);
  console.log('leastLeftover');
  getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);
    possibleLengthsArr = [6*12, 8*12, 10*12, 12*12];
  cutPieces = [
      new CutPiece(4, 4, 36, possibleLengthsArr, 2),
      new CutPiece(4, 4, 35+5/16, possibleLengthsArr, 2),
      new CutPiece(4, 4, 30+21/32, possibleLengthsArr, 2),
      new CutPiece(4, 4, 22.5, possibleLengthsArr, 4),
  ];
  */
  // ------------------------------------------------------------------------

  console.log('Test 2:');
  // console.log('foo');
  // foo(cutPieces, possibleLengthsArr);
  // console.log('leastLeftover');
  // getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr);

  const crossSection4x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutCrossSection(4, 4);
  let uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection4x4, 72, 1228), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection4x4, 96, 1548), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection4x4, 120, 2238), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection4x4, 144, 2748)];
  console.log('bar');
  bar(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test 3:');
  const crossSection2x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutCrossSection(2, 4);
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection2x4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection2x4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection2x4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__.UncutPiece(crossSection2x4, 144, 462)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 36, possibleLengthsArr, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 32 + 1 / 8, possibleLengthsArr, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 4, 34, possibleLengthsArr, 2)];
  console.log('bar');
  bar(cutPieces, uncutPieces);
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDLEVBQ3pDLElBQUkzQyx5REFBVSxDQUFDMkMsZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDNUM7RUFDRGhELFNBQVMsR0FBRyxDQUNSLElBQUlQLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUVHLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxFQUM3QyxJQUFJSCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUVHLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxFQUNqRCxJQUFJSCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFRyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FDaEQ7RUFFRE0sT0FBTyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0VBRWxCNEIsR0FBRyxDQUFDL0IsU0FBUyxFQUFFZ0MsV0FBVyxDQUFDO0FBQy9CLENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRTZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3VuY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMuc2Nzcz9hNjA5Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3V0TGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdXRTZXF1ZW5jZXMgPSBbXSkge1xyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzID0gY3V0U2VxdWVuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaChjdXRTZXF1ZW5jZSkge1xyXG4gICAgICAgIC8vIFRPRE86IFR5cGUgY2hlY2tcclxuXHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMucHVzaChjdXRTZXF1ZW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0U2VxdWVuY2VzLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3Vyci51bmN1dFBpZWNlLnByaWNlLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWVwQ29weSgpIHtcclxuICAgICAgICBsZXQgY3V0TGlzdCA9IG5ldyBDdXRMaXN0KCk7XHJcbiAgICAgICAgY3V0TGlzdC5jdXRTZXF1ZW5jZXMgPSBbLi4udGhpcy5jdXRTZXF1ZW5jZXNdO1xyXG4gICAgICAgIHJldHVybiBjdXRMaXN0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3V0TGlzdCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBsaXN0IG9mIEN1dFBpZWNlcyBhbmQgbWluaW1hbCByZW1haW5pbmcgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgZ2V0Q3V0TGlzdDogKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApID0+IHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dExlbmd0aCBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRMZW5ndGggPT0gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShpLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLCAwIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggb2YgbGFyZ2VzdCBjdXRMZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLmN1dExpc3QuZ2V0Q3V0TGlzdChcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdDtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN1dExlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gcG9zc2libGVMZW5ndGhzQXJyIEFycmF5IG9mIHBvc3NpYmxlIGxlbmd0aHMgKGluY2hlcykgdGhhdCB0aGUgY3V0IHBpZWNlIGNhbiBiZSBjdXQgZnJvbVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGN1dExlbmd0aCwgcG9zc2libGVMZW5ndGhzQXJyLCBxdWFudGl0eSA9IDEsIGtlcmYgPSAwLjEyNSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmN1dExlbmd0aCA9IGN1dExlbmd0aDtcclxuICAgICAgICB0aGlzLnBvc3NpYmxlTGVuZ3Roc0FyciA9IHBvc3NpYmxlTGVuZ3Roc0FycjtcclxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5rZXJmID0ga2VyZjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3V0V2l0aEtlcmYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0TGVuZ3RoICsgdGhpcy5rZXJmO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRQaWVjZTtcclxuIiwiY2xhc3MgQ3V0U2VxdWVuY2Uge1xyXG4gICAgY29uc3RydWN0b3IodW5jdXRQaWVjZSkge1xyXG4gICAgICAgIHRoaXMudW5jdXRQaWVjZSA9IHVuY3V0UGllY2U7XHJcblxyXG4gICAgICAgIHRoaXMuY3V0UGllY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5yZW1haW5pbmdMZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBQaWVjZXM6ICR7dGhpcy5jdXRQaWVjZXN9XFxuTGVmdG92ZXI6ICR7dGhpcy5yZW1haW5pbmdMZW5ndGh9YCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1dFNlcXVlbmNlOyIsImV4cG9ydCBjbGFzcyBVbmN1dENyb3NzU2VjdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3MgKHNtYWxsZXN0IGRpbWVuc2lvbikgb2YgcGllY2UgKGluY2hlcylcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCBXaWR0aCBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0aGlja25lc3MsIHdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlja25lc3M7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVW5jdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtVbmN1dENyb3NzU2VjdGlvbn0gdW5jdXRDcm9zc1NlY3Rpb24gQ3Jvc3Mgc2VjdGlvbiBvZiB1bmN1dCBwaWVjZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBMZW5ndGggb2YgdW5jdXQgcGllY2UgKGluY2hlcykgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJpY2UgUHJpY2Ugb2YgcG9zc2libGUgbGVuZ3RoIChBbWVyaWNhbiBjZW50cyBleC4gJDkuODcgPSA5ODcpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVuY3V0Q3Jvc3NTZWN0aW9uLCBsZW5ndGgsIHByaWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dENyb3NzU2VjdGlvbiA9IHVuY3V0Q3Jvc3NTZWN0aW9uO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVW5jdXRQaWVjZTtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGNvbG9yOiByZWQ7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDSSxVQUFVLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxyXFxuICAgIGNvbG9yOiByZWQ7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSAnLi9qcy9jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7VW5jdXRQaWVjZSwgVW5jdXRDcm9zc1NlY3Rpb259IGZyb20gJy4vanMvdW5jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Y3V0TGlzdCwgQ3V0TGlzdH0gZnJvbSAnLi9qcy9jdXRMaXN0LmpzJztcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gJy4vanMvY3V0U2VxdWVuY2UnO1xyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnQ3V0IExpc3QgQ2FsY3VsYXRvcic7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwoY3V0UGllY2VzLCBwb3NzaWJsZUxlbmd0aHNBcnIpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGluZGV4IGluIGNvcnJlc3BvbmRpbmcgXHJcbiAgICAgICAgLy8gaW5kaXZpZHVhbEN1dFBpZWNlcyBhcnJheS4gSWYgYSBpbmRpdmlkdWFsIEN1dFBpZWNlIGlzIHNlbGVjdGVkIGZvciBcclxuICAgICAgICAvLyBhIGN1dCBzZXF1ZW5jZSwgaXQncyBpbmRleCBpcyByZW1vdmVkIGZyb20gdGhpcyBhcnJheS5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgY3VyckN1dFNlcXVlbmNlLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgYmVzdEN1dDtcclxuICAgICAgICBsZXQgZmluYWxDdXRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBiZXN0Q3V0ID0ge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBvc3NpYmxlTGVuZ3Roc0Fyci5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyckN1dFNlcXVlbmNlID0gY3V0TGlzdC5nZXRDdXRMaXN0KGxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKGJlc3RDdXQuY3V0U2VxdWVuY2UgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dC5jdXRTZXF1ZW5jZVstMV0gPiBjdXJyQ3V0U2VxdWVuY2VbLTFdKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5jdXRTZXF1ZW5jZSA9IGN1cnJDdXRTZXF1ZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbLi4udGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpbmFsQ3V0TGlzdC5wdXNoKGJlc3RDdXQuY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5iZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxDdXRMaXN0KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBmaXJzdCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYmVzdEN1dExpc3QgdG8gZmlyc3QgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIG5leHQgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgbmV3IGN1dCBsaXN0IGhhcyBsZXNzIHJlbWFpbmluZyBsZW5ndGggdGhhbiBiZXN0Q3V0TGlzdCwgc2V0IFxyXG4gICAgICAgIC8vIGJlc3RDdXRMaXN0IHRvIG5ldyBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgcmVhY2ggZW5kIG9mIHBvc3NpYmxlIGxlbmd0aCBhcnJheSwgc2F2ZSBiZXN0Q3V0TGlzdCB0byBmaW5hbCBjdXQgbGlzdCBzZXF1ZW5jZVxyXG5cclxuICAgICAgICAvLyBSZXBlYXQgb25jZSBhZ2FpbiB3aXRoIHJlbWFpbmluZyBpbmRpdmlkdWFsQ3V0UGllY2VzXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZm9vKGN1dFBpZWNlcywgcG9zc2libGVMZW5ndGhzQXJyKSB7XHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0TGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmN1dExlbmd0aCAtIGEuY3V0TGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlO1xyXG4gICAgICAgIHBvc3NpYmxlTGVuZ3Roc0Fyci5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTGVuZ3RoOiAke2xlbmd0aH1gKTtcclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZSA9IGN1dExpc3QuZ2V0Q3V0TGlzdChsZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYmFyKGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IGF2YWlsYWJsZUxlbmd0aHNBcnIgaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIC8vYXZhaWxhYmxlTGVuZ3Roc0Fyci5zb3J0KChhLGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB1bmN1dFBpZWNlcyBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIGxlbmd0aFxyXG4gICAgICAgIHVuY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgYSBzaW5nbGUgcXVhbnRpdHkgY3V0UGllY2VcclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIG5vcm1hbCBhcnJheSBvZiBjdXRQaWVjZXMgdGhhdCBoYXMgYW55IG51bWJlciBxdWFudGl0eSBpbiB0aGVcclxuICAgICAgICAvLyAncXVhbnRpdHknIHByb3BlcnR5LlxyXG4gICAgICAgIGxldCBpbmRpdmlkdWFsQ3V0UGllY2VzID0gY3V0UGllY2VzLmZsYXRNYXAoKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoY3V0UGllY2UucXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAuZmlsbChjdXRQaWVjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1heGltdW0gbnVtYmVyIG9mIGVhY2ggYXZhaWxhYmxlIGxlbmd0aHMgbmVlZGVkIGlmIG9ubHkgdXNlZCB0aGF0IFxyXG4gICAgICAgIC8vIGF2YWlsYWJsZSBsZW5ndGggZm9yIGFsbCBjdXRQaWVjZXMgKGluaXRpYWxpemVkIHRvIHplcm8pXHJcbiAgICAgICAgbGV0IG1heE51bUF2YWlsYWJsZUxlbmd0aHMgPSBuZXcgQXJyYXkodW5jdXRQaWVjZXMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgICAgIGxldCBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgdG90YWxDdXRMZW5ndGggPSBpbmRpdmlkdWFsQ3V0UGllY2VzLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3Vyci5jdXRXaXRoS2VyZiwgMCk7XHJcbiAgICAgICAgLy9sZXQgbWF4TnVtO1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBjdXRTZXF1ZW5jZSwgY3V0U2VxdWVuY2VBcnIsIGJlc3RDdXRMaXN0O1xyXG4gICAgICAgIGxldCBjdXJyQ3V0TGlzdCA9IG5ldyBDdXRMaXN0KCk7XHJcblxyXG4gICAgICAgIHVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vbWF4TnVtID0gTWF0aC5jZWlsKHRvdGFsQ3V0TGVuZ3RoIC8gdW5jdXRQaWVjZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBtYXhOdW0gb2YgdW5jdXRQaWVjZS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAvLyBJZiBub3QsIGtlZXAgaW5jcmVtZW50aW5nIHVudGlsIHJlYWNoIGEgdmFsdWUgdGhhdCBpcyBzdWNjZXNzZnVsLlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBEbyBub3QgbmVlZCBtYXhOdW0uIE9ubHkgbmVlZCB0byBjaGVjayBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGFuZCBzdGlsbCBpbmNyZW1lbnQgY291bnQgaW4gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCBcclxuICAgICAgICAgICAgICAgIC8vfHwgbWF4TnVtID4gMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gY3V0TGlzdC5nZXRDdXRMaXN0KHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLnJlbWFpbmluZ0xlbmd0aCA9IGN1dFNlcXVlbmNlQXJyW2N1dFNlcXVlbmNlQXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5wdXNoKGN1dFNlcXVlbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWNyZW1lbnQgY291bnRlclxyXG4gICAgICAgICAgICAgICAgLy9tYXhOdW0tLTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgY291bnQgb2YgbWF4IG51bWJlciBvZiBjb3JyZXNwb25kaW5nIFVuY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIG1heE51bUF2YWlsYWJsZUxlbmd0aHNbaW5kZXhdKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKGJlc3RDdXRMaXN0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGJlc3RDdXRMaXN0ID0gY3VyckN1dExpc3QuZGVlcENvcHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnQmVzdCBJbml0aWFsOicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RDdXRMaXN0KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIElmIG5ldyB2YWx1ZSBleGNlZWRzIHZhbHVlIGluIHNhbWUgaW5kZXggb2YgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIHRvIHplcm9cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgICAgICAvLyBSZXBlYXQgdXNpbmcgcmVjdXJzaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0rKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsICsraW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGluZGV4ID0gMCkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0tLTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmNyZW1lbnRUcmlnZ2VyLCBkZWNyZW1lbnRUcmlnZ2VyLCB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXI7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFRPRE86IElmIHVzZSBhbGwgdW5jdXQgcGllY2VzIHRvIGNyZWF0ZSBjdXQgbGlzdCwgY2FuIHNraXAgYWRkaW5nIGFueSBtb3JlIHdpdGggaW5jcmVtZW50IHRyaWdnZXIuXHJcbiAgICAgICAgICAgICAgICAgKiBleC5cclxuICAgICAgICAgICAgICAgICAqIFsxLDIsMF0gPT4gMXggMTQ0XCIgKyAyeCAxMjBcIlxyXG4gICAgICAgICAgICAgICAgICogaW5jcmVtZW5UcmlnZ2VyID0gMSA9PiAyIHdpbGwgYmUgaW5jcmVhc2VkIHRvIDNcclxuICAgICAgICAgICAgICAgICAqIC0gTm8gbmVlZCB0byBpbmNyZW1lbnQgdG8gWzEsMywwXSBpZiBbMSwyLDBdIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAqIGluc3RlYWQsIHNldCBpbmNyZW1lbnRUcmlnZ2VyIGluZGV4IHRvIHplcm8gQU5EIGluY3JlbWVudCBwcmV2IGluZGV4IGluc3RlYWRcclxuICAgICAgICAgICAgICAgICAqIFsxLDIsMF0gPT4gWzIsMCwwXVxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKiBIb3dldmVyLCBbMSwyLDBdIG1heSBub3QgYmUgZW5vdWdoIHdpdGggcmVxdWlyZWQgQ3V0UGllY2VzLlxyXG4gICAgICAgICAgICAgICAgICogV291bGQgdGhlbiBuZWVkIHRvIGluY3JlbWVudCBub3JtYWxseSB0byBbMSwzLDBdIGFuZCB0cnkgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IGN1dExpc3QuZ2V0Q3V0TGlzdCh1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluY3JlbWVudFRyaWdnZXIgPSBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnRmluYWwgQmVzdCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RDdXRMaXN0KTtcclxuICAgICAgICB3aW5kb3cuYmVzdEN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBsZXQgcG9zc2libGVMZW5ndGhzQXJyID0gWzgqMTIsIDEwKjEyLCAxMioxMl07XHJcbiAgICBsZXQgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxOS44NzUsIHBvc3NpYmxlTGVuZ3Roc0FyciwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM5Ljg3NSwgcG9zc2libGVMZW5ndGhzQXJyLCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNDkuODc1LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDMpLFxyXG4gICAgXTtcclxuICAgIC8qXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdCAxOicpO1xyXG4gICAgZm9vKGN1dFBpZWNlcywgcG9zc2libGVMZW5ndGhzQXJyKTtcclxuICAgIGNvbnNvbGUubG9nKCdsZWFzdExlZnRvdmVyJyk7XHJcbiAgICBnZXRDdXRMaXN0V2l0aExlYXN0TGVmdG92ZXJNYXRlcmlhbChjdXRQaWVjZXMsIHBvc3NpYmxlTGVuZ3Roc0Fycik7XHJcblxyXG4gICAgcG9zc2libGVMZW5ndGhzQXJyID0gWzYqMTIsIDgqMTIsIDEwKjEyLCAxMioxMl07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM2LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzNSs1LzE2LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzMCsyMS8zMiwgcG9zc2libGVMZW5ndGhzQXJyLCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMjIuNSwgcG9zc2libGVMZW5ndGhzQXJyLCA0KSxcclxuICAgIF07XHJcbiAgICAqL1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3QgMjonKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdmb28nKTtcclxuICAgIC8vIGZvbyhjdXRQaWVjZXMsIHBvc3NpYmxlTGVuZ3Roc0Fycik7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnbGVhc3RMZWZ0b3ZlcicpO1xyXG4gICAgLy8gZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwoY3V0UGllY2VzLCBwb3NzaWJsZUxlbmd0aHNBcnIpO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjR4NCA9IG5ldyBVbmN1dENyb3NzU2VjdGlvbig0LDQpO1xyXG4gICAgbGV0IHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgNzIsIDEyMjgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgOTYsIDE1NDgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgMTIwLCAyMjM4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDE0NCwgMjc0OCksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdiYXInKTtcclxuICAgIGJhcihjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3QgMzonKTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb24yeDQgPSBuZXcgVW5jdXRDcm9zc1NlY3Rpb24oMiw0KTtcclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM2LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzMisxLzgsIHBvc3NpYmxlTGVuZ3Roc0FyciwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM0LCBwb3NzaWJsZUxlbmd0aHNBcnIsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnYmFyJyk7XHJcbiAgICBcclxuICAgIGJhcihjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImN1dFNlcXVlbmNlcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNsZWFyIiwicHVzaCIsImN1dFNlcXVlbmNlIiwiZ2V0UHJpY2UiLCJyZWR1Y2UiLCJhY2N1bSIsImN1cnIiLCJ1bmN1dFBpZWNlIiwicHJpY2UiLCJkZWVwQ29weSIsImN1dExpc3QiLCJnZXRDdXRMaXN0IiwicmVtYWluaW5nTGVuZ3RoIiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsImN1dExlbmd0aCIsInNwbGljZSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsIkN1dFBpZWNlIiwidGhpY2tuZXNzIiwid2lkdGgiLCJwb3NzaWJsZUxlbmd0aHNBcnIiLCJxdWFudGl0eSIsImtlcmYiLCJDdXRTZXF1ZW5jZSIsImN1dFBpZWNlcyIsInRvU3RyaW5nIiwiY29uc29sZSIsImxvZyIsIlVuY3V0Q3Jvc3NTZWN0aW9uIiwiVW5jdXRQaWVjZSIsInVuY3V0Q3Jvc3NTZWN0aW9uIiwiY29tcG9uZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwic29ydCIsImEiLCJiIiwiZmxhdE1hcCIsImN1dFBpZWNlIiwiQXJyYXkiLCJmaWxsIiwiZnJvbSIsInZhbHVlIiwiaW5kZXgiLCJjdXJyQ3V0U2VxdWVuY2UiLCJ0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsImJlc3RDdXQiLCJmaW5hbEN1dExpc3QiLCJmb3JFYWNoIiwiZm9vIiwiYmFyIiwidW5jdXRQaWVjZXMiLCJtYXhOdW1BdmFpbGFibGVMZW5ndGhzIiwibnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJjdXRTZXF1ZW5jZUFyciIsImJlc3RDdXRMaXN0IiwiY3VyckN1dExpc3QiLCJzbGljZSIsImluY3JlbWVudCIsImRlY3JlbWVudCIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwiZmlsdGVyIiwiY291bnQiLCJ3aW5kb3ciLCJjcm9zc1NlY3Rpb240eDQiLCJjcm9zc1NlY3Rpb24yeDQiXSwic291cmNlUm9vdCI6IiJ9