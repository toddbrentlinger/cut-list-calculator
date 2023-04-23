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
/* harmony import */ var _cutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPieceCreateFormComponent.js */ "./src/js/components/cutPieceCreateFormComponent.js");
/* harmony import */ var _uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uncutPieceCreateFormComponent.js */ "./src/js/components/uncutPieceCreateFormComponent.js");
/* harmony import */ var _cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cutPieceComponent.js */ "./src/js/components/cutPieceComponent.js");
/* harmony import */ var _cutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cutPieceListComponent.js */ "./src/js/components/cutPieceListComponent.js");
/* harmony import */ var _uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uncutPieceComponent.js */ "./src/js/components/uncutPieceComponent.js");
/* harmony import */ var _uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uncutPieceListComponent.js */ "./src/js/components/uncutPieceListComponent.js");
/* harmony import */ var _cutListComponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cutListComponent.js */ "./src/js/components/cutListComponent.js");
/* harmony import */ var _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cutListCalculator.js */ "./src/js/cutListCalculator.js");
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");












const cutListCalculatorComponent = (() => {
  let cutPieces = [];
  let uncutPieces = [];
  let bestCutList;
  let cutListElement;
  let cutPieceListComponent;
  let uncutPieceListComponent;
  function init() {
    let cutPieces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let uncutPieces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let bestCutList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    cutPieces = cutPieces;
    uncutPieces = uncutPieces;
    bestCutList = bestCutList;
    let mainElement = document.querySelector('main');
    if (mainElement === null) {
      mainElement = document.createElement('main');
      document.body.appendChild(mainElement);
    }

    // Add cut/uncut pieces list with create form after
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('h2', {}, 'Cut Pieces'));
    cutPieceListComponent = (0,_cutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
    mainElement.appendChild(cutPieceListComponent.render());
    mainElement.appendChild((0,_cutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(handleCutPieceAddFormSubmit).render());
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('h2', {}, 'Uncut Pieces'));
    uncutPieceListComponent = (0,_uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
    mainElement.appendChild(uncutPieceListComponent.render());
    mainElement.appendChild((0,_uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(handleUncutPieceAddFormSubmit).render());

    // Add button that creates cut list with click event listener
    const createCutListBtnContainer = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'id': 'create-cut-list-btn-container'
    }));
    const createCutListBtn = createCutListBtnContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'id': 'create-cut-list-btn'
    }, 'Create Cut List'));
    createCutListBtn.addEventListener('click', handleCreateCutListClick);

    // Add calculated cut list
    cutListElement = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'id': 'cut-list'
    }));

    // Add footer component, passing in the first year of the app
    document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2023).render());
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
    const cutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_9__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));

    // Add CutPiece to list through cutPiecesRef
    addCutPiece(cutPiece);

    // Display new CutPiece
    cutPieceListComponent.addCutPieceComponent((0,_cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cutPiece));
  }
  function handleUncutPieceAddFormSubmit(e) {
    e.preventDefault();

    // Create UncutPiece from form inputs
    const uncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__.UncutPiece(new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__.CrossSection(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value)), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));

    // Add UncutPiece to list through uncutPieces
    addUncutPiece(uncutPiece);

    // Display new UncutPiece
    uncutPieceListComponent.addUncutPieceComponent((0,_uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(uncutPiece));
  }
  function handleCreateCutListClick(e) {
    e.preventDefault();
    bestCutList = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_8__["default"].getCheapestCutList(cutPieces, uncutPieces);
    cutListElement.append((0,_cutListComponent_js__WEBPACK_IMPORTED_MODULE_7__["default"])(bestCutList).render());
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
/* harmony import */ var _cutSequenceComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutSequenceComponent.js */ "./src/js/components/cutSequenceComponent.js");


function CutListComponent(cutList) {
  const render = function () {
    const materialList = cutList.getMaterialList();
    const element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'cut-list'
    });

    // Material List - Header
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', {}, 'Material List:'));

    // Material List - Table
    const materialListTable = element.appendChild(document.createElement('table'));

    // Material List - Table Head
    materialListTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('thead', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {}, 'Quantity'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {}, 'Uncut Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {}, 'Unit Price'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {}, 'Sum Price'))));

    // Material List - Table Body
    const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
    for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
      materialListTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.unitPrice), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.quantity * uncutObj.unitPrice)));
    }

    // Cut Sequences
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', {}, 'Cut Sequences:'));
    cutList.cutSequences.forEach((cutSequence, index) => {
      element.appendChild((0,_cutSequenceComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cutSequence).render());
    });
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
    return (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'cut-piece'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.cutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.kerf));
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutPieceCreateFormComponent.js":
/*!**********************************************************!*\
  !*** ./src/js/components/cutPieceCreateFormComponent.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutPieceCreateFormComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutPieceCreateFormComponent(handleFormSubmit) {
  let formElement;
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'cut-piece-create',
      'id': 'cut-piece-create-form',
      'class': 'piece-create-form'
    });

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'form-inputs'
    }));

    // Form - Form Inputs - Thickness
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-thickness'
    }, 'Thickness:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'thickness',
      'id': 'cut-thickness',
      'size': '1'
    })));

    // Form - Form Inputs - Width
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-width'
    }, 'Width:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'width',
      'id': 'cut-width',
      'size': '1'
    })));

    // Form - Form Inputs - Length
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-length'
    }, 'Length:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'cut-length',
      'size': '1'
    })));

    // Form - Form Inputs - Quantity
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-quantity'
    }, 'Quantity:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'number',
      'name': 'quantity',
      'id': 'cut-quantity',
      'value': '1'
    })));

    // Form - Form Inputs - Kerf
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-kerf'
    }, 'Kerf:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'kerf',
      'id': 'cut-kerf',
      'value': '0.125',
      'size': '1'
    })));

    // Form - Form Submit Container
    formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'submit-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'submit',
      'value': 'Add'
    })));

    // Add submit event listener
    formElement.addEventListener('submit', e => {
      if (handleFormSubmit !== undefined) {
        handleFormSubmit(e);
      }
      updateForm();
    });
    return formElement;
  };
  const updateForm = function () {
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
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutPieceListComponent.js":
/*!****************************************************!*\
  !*** ./src/js/components/cutPieceListComponent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutPieceListComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutPieceListComponent() {
  let cutPieceComponents = [];
  let element;
  let cutPieceListElement;
  const addCutPieceComponent = function () {
    for (var _len = arguments.length, cutPieceComponentsToAdd = new Array(_len), _key = 0; _key < _len; _key++) {
      cutPieceComponentsToAdd[_key] = arguments[_key];
    }
    cutPieceComponents.push(...cutPieceComponentsToAdd);
    for (const cutPieceComponent of cutPieceComponentsToAdd) {
      cutPieceListElement.appendChild(cutPieceComponent.render());
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'piece-list'
      });
    }

    // Add labels for list (table head)
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-list-head'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Thickness'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Width'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Quantity'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Kerf')));

    // Add list body (table body)
    cutPieceListElement = element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-list-body'
    }));

    // Add cut piece components for list
    // for (const cutPieceComponent of cutPieceComponents) {
    //     cutPieceListElement.appendChild(cutPieceComponent.render());
    // }

    return element;
  };
  return {
    addCutPieceComponent,
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutSequenceComponent.js":
/*!***************************************************!*\
  !*** ./src/js/components/cutSequenceComponent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutSequenceComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutSequenceComponent(cutSequence) {
  const render = function () {
    const element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'cut-sequence'
    });

    // Uncut Piece
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, `${cutSequence.uncutPiece.crossSection.thickness}x${cutSequence.uncutPiece.crossSection.width}x${cutSequence.uncutPiece.length}`));

    // Cut Pieces
    const cutPiecesContainer = element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'cut-sequence-cut-pieces-container'
    }));
    cutSequence.cutPieces.forEach(cutPiece => {
      cutPiecesContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.cutLength));
    });

    // Remaining Length
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, `with ${cutSequence.remainingLength} remaining`));
    return element;
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
    const footer = document.createElement('footer');
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
    return (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'uncut-piece'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.crossSection.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.crossSection.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.length), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.price));
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/uncutPieceCreateFormComponent.js":
/*!************************************************************!*\
  !*** ./src/js/components/uncutPieceCreateFormComponent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UncutPieceCreateFormComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function UncutPieceCreateFormComponent(handleFormSubmit) {
  let formElement;
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'uncut-piece-create',
      'id': 'uncut-piece-create-form',
      'class': 'piece-create-form'
    });

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'form-inputs'
    }));

    // Form - Form Inputs - Thickness
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-thickness'
    }, 'Thickness:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'thickness',
      'id': 'uncut-thickness',
      'size': '1'
    })));

    // Form - Form Inputs - Width
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-width'
    }, 'Width:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'width',
      'id': 'uncut-width',
      'size': '1'
    })));

    // Form - Form Inputs - Length
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-length'
    }, 'Length:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'uncut-length',
      'size': '1'
    })));

    // Form - Form Inputs - Price
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-price'
    }, 'Price:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'price',
      'id': 'uncut-price',
      'size': '1'
    })));

    // Form - Form Submit Container
    formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'submit-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'submit',
      'value': 'Add'
    })));

    // Add submit event listener
    formElement.addEventListener('submit', e => {
      if (handleFormSubmit !== undefined) {
        handleFormSubmit(e);
      }
      updateForm();
    });
    return formElement;
  };
  const updateForm = function () {
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
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/uncutPieceListComponent.js":
/*!******************************************************!*\
  !*** ./src/js/components/uncutPieceListComponent.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UncutPieceListComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function UncutPieceListComponent() {
  let uncutPieceComponents = [];
  let element;
  let uncutPieceListElement;
  const addUncutPieceComponent = function () {
    for (var _len = arguments.length, uncutPieceComponentsToAdd = new Array(_len), _key = 0; _key < _len; _key++) {
      uncutPieceComponentsToAdd[_key] = arguments[_key];
    }
    uncutPieceComponents.push(...uncutPieceComponentsToAdd);
    for (const uncutPieceComponent of uncutPieceComponentsToAdd) {
      uncutPieceListElement.appendChild(uncutPieceComponent.render());
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'piece-list'
      });
    }

    // Add labels for list (table head)
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-list-head'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Thickness'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Width'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, 'Price')));

    // Add list body (table body)
    uncutPieceListElement = element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-list-body'
    }));
    return element;
  };
  return {
    addUncutPieceComponent,
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
  getMaterialList() {
    const materialListObj = {};
    this.cutSequences.forEach(cutSequence => {
      if (cutSequence.uncutPiece.length in materialListObj) {
        materialListObj[cutSequence.uncutPiece.length].quantity++;
      } else {
        materialListObj[cutSequence.uncutPiece.length] = {
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column; }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    display: block; }\n\n.piece-create-form {\n  border: 2px solid var(--base-black, black);\n  padding: 1rem 0;\n  margin: 1rem 0; }\n  .piece-create-form .form-inputs {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    column-gap: 1rem; }\n    .piece-create-form .form-inputs .input-container {\n      display: grid; }\n  .piece-create-form .submit-container {\n    display: grid;\n    justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: space-between; }\n\nh1, h2 {\n  text-align: center; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAEA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;EACI,aAAa;EACb,uBAAuB,EAAA;;AAK3B;EACI,aAAa;EACb,sBAAsB,EAAA;;AAG1B;EACI,qBAAqB,EAAA;EADzB;IAIQ,cAAc,EAAA;;AAItB;EACI,0CAA0C;EAC1C,eAAe;EACf,cAAc,EAAA;EAHlB;IAMQ,aAAa;IACb,qCAAqC;IACrC,gBAAgB,EAAA;IARxB;MAWY,aAAa,EAAA;EAXzB;IAgBQ,aAAa;IACb,uBAAuB,EAAA;;AAI/B;;;EAIQ,aAAa;EACb,sBAAsB;EACtB,8BAA8B,EAAA;;AActC;EACI,kBAAkB,EAAA;;AAGtB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        display: block;\r\n    }\r\n}\r\n\r\n.piece-create-form {\r\n    border: 2px solid var(--base-black, black);\r\n    padding: 1rem 0;\r\n    margin: 1rem 0;\r\n\r\n    .form-inputs {\r\n        display: grid;\r\n        grid-template-columns: repeat(5, 1fr);\r\n        column-gap: 1rem;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        display: grid;\r\n        grid-auto-flow: column;\r\n        justify-content: space-between;\r\n    }\r\n\r\n    .piece-list-head {\r\n\r\n    }\r\n\r\n    .piece-list-body {\r\n\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2 {\r\n    text-align: center;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eURBQVUsQ0FBQ3NLLGVBQWUsRUFBRSxFQUFFLEdBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUM5QztFQUNEbEssU0FBUyxHQUFHLENBQ1IsSUFBSUwsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUMvQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUM1QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUMxQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUF3SixNQUFNLENBQUN6SixpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRMaXN0Q29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUxpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFNlcXVlbmNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3QuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0U2VxdWVuY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91bmN1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3M/YjMwZiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzcz8yMDNiIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9vdGVyIGZyb20gXCIuL2Zvb3Rlci5qc1wiO1xyXG5cclxuaW1wb3J0IEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzXCI7XHJcblxyXG5pbXBvcnQgQ3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUxpc3RDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dExpc3RDb21wb25lbnQgZnJvbSBcIi4vY3V0TGlzdENvbXBvbmVudC5qc1wiO1xyXG5cclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gXCIuLi9jdXRMaXN0Q2FsY3VsYXRvci5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4uL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCB7VW5jdXRQaWVjZSwgQ3Jvc3NTZWN0aW9ufSBmcm9tIFwiLi4vdW5jdXRQaWVjZS5qc1wiO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmNvbnN0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50ID0gKCgpID0+IHtcclxuICAgIGxldCBjdXRQaWVjZXMgPSBbXTtcclxuICAgIGxldCB1bmN1dFBpZWNlcyA9IFtdO1xyXG5cclxuICAgIGxldCBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICBsZXQgY3V0TGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuICAgIGxldCB1bmN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KGN1dFBpZWNlcyA9IFtdLCB1bmN1dFBpZWNlcyA9IFtdLCBiZXN0Q3V0TGlzdCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGN1dFBpZWNlcyA9IGN1dFBpZWNlcztcclxuICAgICAgICB1bmN1dFBpZWNlcyA9IHVuY3V0UGllY2VzO1xyXG4gICAgICAgIGJlc3RDdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcclxuICAgICAgICBpZiAobWFpbkVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGN1dC91bmN1dCBwaWVjZXMgbGlzdCB3aXRoIGNyZWF0ZSBmb3JtIGFmdGVyXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDInLCB7fSwgJ0N1dCBQaWVjZXMnKSk7XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMicsIHt9LCAnVW5jdXQgUGllY2VzJykpO1xyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gVW5jdXRQaWVjZUxpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0KS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBidXR0b24gdGhhdCBjcmVhdGVzIGN1dCBsaXN0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBjb25zdCBjcmVhdGVDdXRMaXN0QnRuQ29udGFpbmVyID0gbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUN1dExpc3RCdG4gPSBjcmVhdGVDdXRMaXN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1idG4nfSwgJ0NyZWF0ZSBDdXQgTGlzdCcpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjcmVhdGVDdXRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGNhbGN1bGF0ZWQgY3V0IGxpc3RcclxuICAgICAgICBjdXRMaXN0RWxlbWVudCA9IG1haW5FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2N1dC1saXN0J30pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGZvb3RlciBjb21wb25lbnQsIHBhc3NpbmcgaW4gdGhlIGZpcnN0IHllYXIgb2YgdGhlIGFwcFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoRm9vdGVyKDIwMjMpLnJlbmRlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXRQaWVjZShjdXRQaWVjZSkge1xyXG4gICAgICAgIGN1dFBpZWNlcy5wdXNoKGN1dFBpZWNlKTtcclxuICAgICAgICByZXR1cm4gY3V0UGllY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZXMucHVzaCh1bmN1dFBpZWNlKTtcclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dHNcclxuICAgICAgICBjb25zdCBjdXRQaWVjZSA9IG5ldyBDdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdxdWFudGl0eScpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgna2VyZicpLnZhbHVlKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBDdXRQaWVjZSB0byBsaXN0IHRocm91Z2ggY3V0UGllY2VzUmVmXHJcbiAgICAgICAgYWRkQ3V0UGllY2UoY3V0UGllY2UpO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IG5ldyBDdXRQaWVjZVxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRDdXRQaWVjZUNvbXBvbmVudChDdXRQaWVjZUNvbXBvbmVudChjdXRQaWVjZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBVbmN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dHNcclxuICAgICAgICBjb25zdCB1bmN1dFBpZWNlID0gbmV3IFVuY3V0UGllY2UoXHJcbiAgICAgICAgICAgIG5ldyBDcm9zc1NlY3Rpb24oTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLCBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIFVuY3V0UGllY2UgdG8gbGlzdCB0aHJvdWdoIHVuY3V0UGllY2VzXHJcbiAgICAgICAgYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGxheSBuZXcgVW5jdXRQaWVjZVxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmFkZFVuY3V0UGllY2VDb21wb25lbnQoVW5jdXRQaWVjZUNvbXBvbmVudCh1bmN1dFBpZWNlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljayhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChcclxuICAgICAgICAgICAgY3V0UGllY2VzLCBcclxuICAgICAgICAgICAgdW5jdXRQaWVjZXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjdXRMaXN0RWxlbWVudC5hcHBlbmQoQ3V0TGlzdENvbXBvbmVudChiZXN0Q3V0TGlzdCkucmVuZGVyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudDtcclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlQ29tcG9uZW50IGZyb20gXCIuL2N1dFNlcXVlbmNlQ29tcG9uZW50LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRMaXN0Q29tcG9uZW50KGN1dExpc3QpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdCA9IGN1dExpc3QuZ2V0TWF0ZXJpYWxMaXN0KCk7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY3V0LWxpc3QnfSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBIZWFkZXJcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gzJywge30sICdNYXRlcmlhbCBMaXN0OicpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGVcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3RUYWJsZSA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBIZWFkXHJcbiAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndGhlYWQnLCB7fSwgXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7fSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHt9LCAnVW5jdXQgTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHt9LCAnVW5pdCBQcmljZScpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7fSwgJ1N1bSBQcmljZScpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHlcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3RUYWJsZUJvZHkgPSBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcclxuICAgICAgICBmb3IgKGNvbnN0IFt1bmN1dExlbmd0aCwgdW5jdXRPYmpdIG9mIE9iamVjdC5lbnRyaWVzKG1hdGVyaWFsTGlzdCkpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dE9iai5xdWFudGl0eSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dExlbmd0aCksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dE9iai51bml0UHJpY2UpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRPYmoucXVhbnRpdHkgKiB1bmN1dE9iai51bml0UHJpY2UpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlc1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDMnLCB7fSwgJ0N1dCBTZXF1ZW5jZXM6JykpO1xyXG5cclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChDdXRTZXF1ZW5jZUNvbXBvbmVudChjdXRTZXF1ZW5jZSkucmVuZGVyKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnZGl2JywgXHJcbiAgICAgICAgICAgIHsnY2xhc3MnOiAnY3V0LXBpZWNlJ30sXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS50aGlja25lc3MpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2Uud2lkdGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UuY3V0TGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLnF1YW50aXR5KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLmtlcmYpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlRm9ybVN1Ym1pdCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ2N1dC1waWVjZS1jcmVhdGUnLFxyXG4gICAgICAgICAgICAnaWQnOiAnY3V0LXBpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzXHJcbiAgICAgICAgY29uc3QgZm9ybUlucHV0c0VsZW1lbnQgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdmb3JtLWlucHV0cyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFRoaWNrbmVzc1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXRoaWNrbmVzcyd9LCAnVGhpY2tuZXNzOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3RoaWNrbmVzcycsICdpZCc6ICdjdXQtdGhpY2tuZXNzJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gV2lkdGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAnY3V0LXdpZHRoJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtbGVuZ3RoJ30sICdMZW5ndGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnbGVuZ3RoJywgJ2lkJzogJ2N1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBRdWFudGl0eVxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXF1YW50aXR5J30sICdRdWFudGl0eTonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ251bWJlcicsICduYW1lJzogJ3F1YW50aXR5JywgJ2lkJzogJ2N1dC1xdWFudGl0eScsICd2YWx1ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBLZXJmXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQta2VyZid9LCAnS2VyZjonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdrZXJmJywgJ2lkJzogJ2N1dC1rZXJmJywgJ3ZhbHVlJzogJzAuMTI1JywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gU3VibWl0IENvbnRhaW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3N1Ym1pdC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdzdWJtaXQnLCAndmFsdWUnOiAnQWRkJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUZvcm1TdWJtaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGlucHV0IGZpZWxkcyBmb3IgY3V0IGxlbmd0aCBhbmQgcXVhbnRpdHksIGxlYXZpbmcgb3RoZXIgaW5wdXRzIHdpdGggdXNlciBlbnRlcmVkIGRhdGEuXHJcbiAgICAgICAgLy8gRm9jdXMgY3Vyc29yIG9uIGxhc3QgaW5wdXQgd2hpY2ggc2hvdWxkIGJlIGN1dCBsZW5ndGggZmllbGRcclxuICAgICAgICBbJ3F1YW50aXR5JywgJ2xlbmd0aCddLmZvckVhY2goKGlucHV0TmFtZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQgPSBmb3JtRWxlbWVudC5lbGVtZW50cy5uYW1lZEl0ZW0oaW5wdXROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gaW5wdXRFbGVtZW50LmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUxpc3RDb21wb25lbnQoKSB7XHJcbiAgICBsZXQgY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBsZXQgY3V0UGllY2VMaXN0RWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBhZGRDdXRQaWVjZUNvbXBvbmVudCA9IGZ1bmN0aW9uKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgY3V0UGllY2VDb21wb25lbnRzLnB1c2goLi4uY3V0UGllY2VDb21wb25lbnRzVG9BZGQpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAgICAgY3V0UGllY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChjdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ0tlcmYnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGxpc3QgYm9keSAodGFibGUgYm9keSlcclxuICAgICAgICBjdXRQaWVjZUxpc3RFbGVtZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtYm9keSd9KSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQgcGllY2UgY29tcG9uZW50cyBmb3IgbGlzdFxyXG4gICAgICAgIC8vIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzKSB7XHJcbiAgICAgICAgLy8gICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRDdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRTZXF1ZW5jZUNvbXBvbmVudChjdXRTZXF1ZW5jZSkge1xyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY3V0LXNlcXVlbmNlJ30pO1xyXG5cclxuICAgICAgICAvLyBVbmN1dCBQaWVjZVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBgJHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi50aGlja25lc3N9eCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24ud2lkdGh9eCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGh9YClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBDdXQgUGllY2VzXHJcbiAgICAgICAgY29uc3QgY3V0UGllY2VzQ29udGFpbmVyID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2N1dC1zZXF1ZW5jZS1jdXQtcGllY2VzLWNvbnRhaW5lcid9KSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UuY3V0TGVuZ3RoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlbWFpbmluZyBMZW5ndGhcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBgd2l0aCAke2N1dFNlcXVlbmNlLnJlbWFpbmluZ0xlbmd0aH0gcmVtYWluaW5nYCkpXHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKGNvcHlyaWdodFllYXIpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSkge1xyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAgICdkaXYnLCBcclxuICAgICAgICAgICAgeydjbGFzcyc6ICd1bmN1dC1waWVjZSd9LFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24udGhpY2tuZXNzKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UuY3Jvc3NTZWN0aW9uLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UucHJpY2UpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAndW5jdXQtcGllY2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgJ2lkJzogJ3VuY3V0LXBpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzXHJcbiAgICAgICAgY29uc3QgZm9ybUlucHV0c0VsZW1lbnQgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdmb3JtLWlucHV0cyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFRoaWNrbmVzc1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtdGhpY2tuZXNzJ30sICdUaGlja25lc3M6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAndGhpY2tuZXNzJywgJ2lkJzogJ3VuY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAndW5jdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LWxlbmd0aCd9LCAnTGVuZ3RoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICd1bmN1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBQcmljZVxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtcHJpY2UnfSwgJ1ByaWNlOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3ByaWNlJywgJ2lkJzogJ3VuY3V0LXByaWNlJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gU3VibWl0IENvbnRhaW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3N1Ym1pdC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdzdWJtaXQnLCAndmFsdWUnOiAnQWRkJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUZvcm1TdWJtaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGlucHV0IGZpZWxkcyBmb3IgY3V0IGxlbmd0aCBhbmQgcXVhbnRpdHksIGxlYXZpbmcgb3RoZXIgaW5wdXRzIHdpdGggdXNlciBlbnRlcmVkIGRhdGEuXHJcbiAgICAgICAgLy8gRm9jdXMgY3Vyc29yIG9uIGxhc3QgaW5wdXQgd2hpY2ggc2hvdWxkIGJlIGN1dCBsZW5ndGggZmllbGRcclxuICAgICAgICBbJ3ByaWNlJywgJ2xlbmd0aCddLmZvckVhY2goKGlucHV0TmFtZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQgPSBmb3JtRWxlbWVudC5lbGVtZW50cy5uYW1lZEl0ZW0oaW5wdXROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gaW5wdXRFbGVtZW50LmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlTGlzdENvbXBvbmVudCgpIHtcclxuICAgIGxldCB1bmN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IHVuY3V0UGllY2VMaXN0RWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBhZGRVbmN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnB1c2goLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCk7XHJcbiAgICAgICAgZm9yIChjb25zdCB1bmN1dFBpZWNlQ29tcG9uZW50IG9mIHVuY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUxpc3RFbGVtZW50LmFwcGVuZENoaWxkKHVuY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0J30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGxhYmVscyBmb3IgbGlzdCAodGFibGUgaGVhZClcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtaGVhZCd9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnVGhpY2tuZXNzJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1dpZHRoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ0xlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdQcmljZScpLFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGxpc3QgYm9keSAodGFibGUgYm9keSlcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQgPSBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1ib2R5J30pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRVbmN1dFBpZWNlQ29tcG9uZW50LFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEN1dExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICAvLyBUT0RPOiBUeXBlIGNoZWNrXHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIudW5jdXRQaWVjZS5wcmljZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzID0gWy4uLnRoaXMuY3V0U2VxdWVuY2VzXTtcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXRlcmlhbExpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0T2JqID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLmZvckVhY2goKGN1dFNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aCBpbiBtYXRlcmlhbExpc3RPYmopIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0ucXVhbnRpdHkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdFByaWNlOiBjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWxMaXN0T2JqO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3V0TGlzdCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBsaXN0IG9mIEN1dFBpZWNlcyBhbmQgbWluaW1hbCByZW1haW5pbmcgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgZ2V0Q3V0TGlzdDogKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApID0+IHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dExlbmd0aCBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRMZW5ndGggPT0gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShpLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLCAwIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggb2YgbGFyZ2VzdCBjdXRMZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLmN1dExpc3QuZ2V0Q3V0TGlzdChcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdDtcclxuIiwiaW1wb3J0IHsgQ3V0TGlzdCB9IGZyb20gXCIuL2N1dExpc3QuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyBcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICogbWF4ID0gWzUsNCwzLDJdXHJcbiAgICAgKiBwb3NzaWJpbGl0aWVzID0gNio1KjQqMyA9IDM2MFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMCwwLDBdXHJcbiAgICAgKiBbMF0gMVxyXG4gICAgICogWzNdICszXHJcbiAgICAgKiA0XHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogMyArIDEgPSA0XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSwwLDAsMF1cclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiA1ICsgMSA9IDZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICogWzAsMF0gMVxyXG4gICAgICogWzUsMF0gKzVcclxuICAgICAqIFswLDFdICsxXHJcbiAgICAgKiBbNSwxXSArNVxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoMikgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMiAqIDYgPSAxMlxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICogMTIgKyA0ID0gMTZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMCwwXVxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbNSwyXSArNlxyXG4gICAgICogWzUsM10gKzZcclxuICAgICAqIFs1LDRdICs2XHJcbiAgICAgKiAzMFxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDQpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDI0ICsgNiA9IDMwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMCwwLDEsMF1cclxuICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAqIFswLDAsMSwwXSArMVxyXG4gICAgICogMzFcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgKiAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDApICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgxKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAxICogKDYqNSkgPSAzMVxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwzLDJdXHJcbiAgICAgKiAzNjBcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA2XHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogNiArIDQgKiA2ID0gMzBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMykgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMykgdmFsdWUgKDIpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMTIwICsgMiAqICg2KjUqNCkgPSAxMjAgKyAyICogMTIwID0gMTIwICsgMjQwID0gMzYwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvLyBJZiBhcnJheSBpcyBlbXB0eSByZXR1cm4gemVyb1xyXG4gICAgICAgIGlmICghbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgbGV0IGNvdW50ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbMF0gKyAxO1xyXG5cclxuICAgICAgICAvLyBGb3IgZXZlcnkgaW5kZXggYWZ0ZXIgdGhlIGZpcnN0IHVwIHRvIGxhc3ROb25aZXJvSW5kZXgsIGFkZCB0aGUgXHJcbiAgICAgICAgLy8gcHJvZHVjdCBvZiBhbGwgcHJldmlvdXMgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3ROb25aZXJvSW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudCArPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpXSAqIG1heE51bUF2YWlsYWJsZUxlbmd0aHMuc2xpY2UoMCwgaSkucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiAoY3VyciArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICBjb25zdCBudW0gPSBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF4TGFzdE5vblplcm9JbmRleCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHMuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBtYXhMYXN0Tm9uWmVyb0luZGV4ID09PSAtMSA/IG1heE51bUF2YWlsYWJsZUxlbmd0aHMubGVuZ3RoIDogbWF4TGFzdE5vblplcm9JbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbCkgPT4gdmFsICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogY3Vycik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChudW0gLyBtYXgpICogMTAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYE51bTogJHtudW19IC0gTWF4OiAke21heH0gLSAlJHtwZXJjZW50YWdlLnRvRml4ZWQoMil9YCk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4LiBjdXJyPVsxLDMsMCwwXSBtYXg9WzMsNCw0LDVdIHJlc3VsdHMgaW4gYSB2YWxpZCBjdXQgbGlzdC5cclxuICAgICAgICAgKiBOZXh0IGluY3JlbWVudHMgb2YgWzIsMywwLDBdIGFuZCBbMywzLDAsMF0gd2lsbCBhbHdheXMgYmUgbW9yZSBleHBlbnNpdmUgdGhhbiBbMSwzLDAsMF0uXHJcbiAgICAgICAgICogTWFrZSBmaXJzdCBub24temVybyB2YWx1ZSAwIGFuZCBpbmNyZW1lbnQgdmFsdWUgYWZ0ZXIuXHJcbiAgICAgICAgICogWzAsNCwwLDBdIC0+IGNvbnRpbnVlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBlbXB0eSBPUiBhbGwgdmFsdWVzIGFyZSB6ZXJvXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXhdID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgZmlyc3ROb25aZXJvVmFsdWVJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0TGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmN1dExlbmd0aCAtIGEuY3V0TGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCBhdmFpbGFibGVMZW5ndGhzQXJyIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICAvL2F2YWlsYWJsZUxlbmd0aHNBcnIuc29ydCgoYSxiKSA9PiBiIC0gYSk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgdW5jdXRQaWVjZXMgaW4gZGVzY2VuZGluZyBvcmRlciBvZiBsZW5ndGhcclxuICAgICAgICB1bmN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXhpbXVtIG51bWJlciBvZiBlYWNoIGF2YWlsYWJsZSBsZW5ndGhzIG5lZWRlZCBpZiBvbmx5IHVzZWQgdGhhdCBcclxuICAgICAgICAvLyBhdmFpbGFibGUgbGVuZ3RoIGZvciBhbGwgY3V0UGllY2VzIChpbml0aWFsaXplZCB0byB6ZXJvKVxyXG4gICAgICAgIGxldCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICBsZXQgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBuZXcgQXJyYXkodW5jdXRQaWVjZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgY3V0U2VxdWVuY2UsIGN1dFNlcXVlbmNlQXJyO1xyXG4gICAgICAgIGxldCBjdXJyQ3V0TGlzdCA9IG5ldyBDdXRMaXN0KCk7XHJcblxyXG4gICAgICAgIHVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vbWF4TnVtID0gTWF0aC5jZWlsKHRvdGFsQ3V0TGVuZ3RoIC8gdW5jdXRQaWVjZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBtYXhOdW0gb2YgdW5jdXRQaWVjZS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAvLyBJZiBub3QsIGtlZXAgaW5jcmVtZW50aW5nIHVudGlsIHJlYWNoIGEgdmFsdWUgdGhhdCBpcyBzdWNjZXNzZnVsLlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBEbyBub3QgbmVlZCBtYXhOdW0uIE9ubHkgbmVlZCB0byBjaGVjayBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGFuZCBzdGlsbCBpbmNyZW1lbnQgY291bnQgaW4gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBJbmZpbml0ZSBsb29wIGlmIGN1dCBwaWVjZSBpcyBsb25nZXIgdGhhbiB1bmN1dCBwaWVjZSBsZW5ndGguIEFycmF5IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggbmV2ZXIgcmVhY2hlcyB6ZXJvLlxyXG4gICAgICAgICAgICB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIodW5jdXRQaWVjZS5sZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIC8vIElmIGN1dFNlcXVlbmNlQXJyIHJldHVybnMganVzdCB0aGUgcmVtYWluaW5nIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgICAgICAgICAvLyBubyBtb3JlIGN1dCBwaWVjZXMgY2FuIGJlIHVzZWQuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnIubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5jcmVtZW50IGNvdW50IG9mIG1heCBudW1iZXIgb2YgY29ycmVzcG9uZGluZyBVbmN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXJyZW50IEN1dExpc3QgaGFzIGxlc3MgcHJpY2UgdGhhbiB0aGUgYmVzdCBDdXRMaXN0IG9ubHkgaWYgTk8gYXZhaWxhYmxlIGN1dCBwaWVjZXMgc3RpbGwgbGVmdFxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgJiYgKChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIHx8IChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGJlc3RDdXRMaXN0ID0gY3VyckN1dExpc3QuZGVlcENvcHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaW5jcmVtZW50VHJpZ2dlciwgZGVjcmVtZW50VHJpZ2dlciwgdGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBza2lwRmxhZztcclxuICAgICAgICBsZXQgcGVyY2VudEZhY3RvckNvdW50ZXIgPSAxO1xyXG4gICAgICAgIGxldCBwZXJjZW50TXVsdGlwbGVEaXNwbGF5ID0gNTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIpO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRhZ2UgJiYgcGVyY2VudGFnZSA+IChwZXJjZW50TXVsdGlwbGVEaXNwbGF5ICogcGVyY2VudEZhY3RvckNvdW50ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtwZXJjZW50YWdlLnRvRml4ZWQoMCl9JWApO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudEZhY3RvckNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2tpcEZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGFsbCB2YWx1ZXMgYXJlIHplcm8sIHNraXBcclxuICAgICAgICAgICAgLy8gSWYgb25seSBvbmUgdmFsdWUgaXMgbm9uLXplcm8sIHNraXAgc2luY2UgYWxyZWFkeSBjaGVjayB0aG9zZSBjYXNlcyBwcmV2aW91c2x5XHJcbiAgICAgICAgICAgIC8vIElmIGxlbmd0aCBvZiBhbGwgdW5jdXQgcGllY2VzIGlzIGxlc3MgdGhhbiBsZW5ndGggb2YgYWxsIGN1dCBwaWVjZXMsIHNraXAgc2luY2Ugbm90IGVub3VnaCBtYXRlcmlhbFxyXG4gICAgICAgICAgICBpZiAoKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbHRlcigoY291bnQpID0+IGNvdW50ID4gMCkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgICYmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5yZWR1Y2UoKGFjY3VtLCBjdXJyLCBpbmRleCkgPT4gYWNjdW0gKyBjdXJyICogdW5jdXRQaWVjZXNbaW5kZXhdLmxlbmd0aCwgMCkgPj0gaW5kaXZpZHVhbEN1dFBpZWNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIuY3V0V2l0aEtlcmYsIDApKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IFsuLi5udW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcl07XHJcblxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBjdXJyZW50IEN1dExpc3QgZnJvbSBwcmV2aW91cyBsb29wXHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjdXRQaWVjZXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50VHJpZ2dlciA9IGRlY3JlbWVudCh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNyZW1lbnRUcmlnZ2VyID09PSBudWxsKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0ubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIGF2YWlsYWJsZSBjdXQgcGllY2VzLCBub3QgZW5vdWdoIHVuY3V0IHBpZWNlcy4gXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBjdXJyZW50IGN1dCBsaXN0IGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcEZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IGN1dCBsaXN0IGlzIGJldHRlciBpZiBOTyB1bnVzZWQgdW5jdXQgcGllY2VzICh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgaGFzIGFsbCB6ZXJvIHZhbHVlcykgQU5EIGl0J3MgY2hlYXBlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGJlc3RDdXRMaXN0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICgodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbmRJbmRleCgodmFsKSA9PiB2YWwgPiAwKSA9PT0gLTEpICYmIChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTmV3IEJlc3QgQ3V0IExpc3QgLSBCZXN0OiAke2Jlc3RDdXRMaXN0LmdldFByaWNlKCl9IC0gQ3VycjogJHtjdXJyQ3V0TGlzdC5nZXRQcmljZSgpfSAtIFRvdGFsOiAke251bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyfSAtIExlZnQ6ICR7dGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2tpcEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGluY3JlbWVudFRyaWdnZXIgPSBza2lwKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluY3JlbWVudFRyaWdnZXIgPSBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoaW5jcmVtZW50VHJpZ2dlciAhPT0gbnVsbCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RDdXRMaXN0KTtcclxuICAgICAgICB3aW5kb3cuYmVzdEN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJlc3RDdXRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Q2hlYXBlc3RDdXRMaXN0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yO1xyXG4iLCJjbGFzcyBDdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3Mgb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggV2lkdGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3V0TGVuZ3RoIEZpbmFsIGN1dCBsZW5ndGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcXVhbnRpdHkgTnVtYmVyIG9mIGlkZW50aWNhbCBwaWVjZXMgdG8gY3V0IChkZWZhdWx0ID0gMSlcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrZXJmIEJsYWRlIHdpZHRoIG9mIG1hdGVyaWFsIHJlbW92ZWQgd2hlbiBjdXQgKGluY2hlcykgKGRlZmF1bHQgPSAxLzhcIilcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgY3V0TGVuZ3RoLCBxdWFudGl0eSA9IDEsIGtlcmYgPSAwLjEyNSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmN1dExlbmd0aCA9IGN1dExlbmd0aDtcclxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5rZXJmID0ga2VyZjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3V0V2l0aEtlcmYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0TGVuZ3RoICsgdGhpcy5rZXJmO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRQaWVjZTtcclxuIiwiaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlIGZyb20gXCIuL3VuY3V0UGllY2UuanNcIjtcclxuXHJcbmNsYXNzIEN1dFNlcXVlbmNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHVuY3V0UGllY2UpIHtcclxuICAgICAgICB0aGlzLnVuY3V0UGllY2UgPSB1bmN1dFBpZWNlO1xyXG5cclxuICAgICAgICB0aGlzLmN1dFBpZWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVtYWluaW5nTGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUGllY2VzOiAke3RoaXMuY3V0UGllY2VzfVxcbkxlZnRvdmVyOiAke3RoaXMucmVtYWluaW5nTGVuZ3RofWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEN1dFNlcXVlbmNlIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIHtVbmN1dFBpZWNlfSB1bmN1dFBpZWNlIFxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBpbmRpdmlkdWFsQ3V0UGllY2VzIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFxyXG4gICAgICogQHJldHVybnMge0N1dFNlcXVlbmNlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VBcnIgPSBDdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycihcclxuICAgICAgICAgICAgdW5jdXRQaWVjZS5sZW5ndGgsIFxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLCBcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIElmIGN1dFNlcXVlbmNlQXJyIHJldHVybnMganVzdCB0aGUgdW5jdXRQaWVjZSBsZW5ndGggdmFsdWUgKGFycmF5IGxlbmd0aCAxKSxcclxuICAgICAgICAvLyBldmVyeSBpbmRpdmlkdWFsQ3V0UGllY2UgaXMgbG9uZ2VyIHRoYW4gdGhlIHVuY3V0UGllY2VcclxuICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnIubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1dFNlcXVlbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcnJheSBvZiBDdXRQaWVjZXMgd2l0aCBzbWFsbGVzdCByZW1haW5pbmcgbGVuZ3RoIGZyb20gYW4gaW5pdGlhbCBsZW5ndGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVtYWluaW5nTGVuZ3RoIFxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBpbmRpdmlkdWFsQ3V0UGllY2VzIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydEluZGV4IChkZWZhdWx0ID0gMCkgXHJcbiAgICAgKiBAcmV0dXJucyB7Wy4uLkN1dFBpZWNlLCBOdW1iZXJdfSBBcnJheSBvZiBDdXRQaWVjZXMgd2l0aCBsZWZ0b3ZlciBsZW5ndGggb2Ygd2hvbGUgcGllY2UgYXQgdGhlIGVuZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2VBcnIocmVtYWluaW5nTGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBzdGFydEluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIFJldHVybiBpZiBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3V0TGVuZ3RoIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggKERPIE5PVCBJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dExlbmd0aCA9PSByZW1haW5pbmdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKGksIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0sIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBpbmRleCBvZiBsYXJnZXN0IGN1dExlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRTZXF1ZW5jZTsiLCJleHBvcnQgY2xhc3MgQ3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0Nyb3NzU2VjdGlvbn0gY3Jvc3NTZWN0aW9uIENyb3NzIHNlY3Rpb24gb2YgdW5jdXQgcGllY2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggTGVuZ3RoIG9mIHVuY3V0IHBpZWNlIChpbmNoZXMpIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByaWNlIFByaWNlIG9mIHBvc3NpYmxlIGxlbmd0aCAoQW1lcmljYW4gY2VudHMgZXguICQ5Ljg3ID0gOTg3KVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjcm9zc1NlY3Rpb24sIGxlbmd0aCwgcHJpY2UpIHtcclxuICAgICAgICB0aGlzLmNyb3NzU2VjdGlvbiA9IGNyb3NzU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVuY3V0UGllY2U7XHJcbiIsIi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBFbGVtZW50IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gRWxlbWVudCBhdHRyaWJ1dGUgbmFtZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWUgXHJcbiAqIEBwYXJhbSAgey4uLk5vZGV9IGNoaWxkcmVuIC0gVmFyaWFibGUgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICAgIC8vIFByb3BzXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGlsZHJlbiBOb2Rlc1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBlbGVtZW50LmFwcGVuZChjaGlsZCkpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbWV5ZXJfcmVzZXQuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7QUFFRDs7Ozs7Ozs7Ozs7OztFQWFDLFNBQVM7RUFDVCxVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7RUFDZixhQUFhO0VBQ2Isd0JBQXdCLEVBQUE7O0FBRXpCLGdEQUFBO0FBQ0E7O0VBRUMsY0FBYyxFQUFBOztBQUVmO0VBQ0MsY0FBYyxFQUFBOztBQUVmO0VBQ0MsZ0JBQWdCLEVBQUE7O0FBRWpCO0VBQ0MsWUFBWSxFQUFBOztBQUViOztFQUVDLFdBQVc7RUFDWCxhQUFhLEVBQUE7O0FBRWQ7RUFDQyx5QkFBeUI7RUFDekIsaUJBQWlCLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1iYXNlLXdoaXRlOiBoc2woMCwgMCUsIDk1JSk7XFxuICAtLWJhc2UtYmxhY2s6IGhzbCgwLCAwJSwgMTAlKTsgfVxcblxcbmh0bWwge1xcbiAgZm9udC1zaXplOiA2Mi41JTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpOyB9XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0OyB9XFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcciBcXFwibWFpbiBtYWluXFxcIlxcciBcXFwiZm9vdGVyIGZvb3RlclxcXCI7IH1cXG5cXG5oZWFkZXIsXFxubWFpbixcXG5mb290ZXIge1xcbiAgcGFkZGluZzogMS44cmVtOyB9XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyOyB9XFxuXFxubWFpbiB7XFxuICBncmlkLWFyZWE6IG1haW47IH1cXG5cXG5mb290ZXIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBncmlkLWFyZWE6IGZvb3RlcjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyOyB9XFxuXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5jdXQtc2VxdWVuY2Uge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47IH1cXG5cXG4uaW5wdXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmlucHV0LWNvbnRhaW5lciBsYWJlbCwgLmlucHV0LWNvbnRhaW5lciBpbnB1dCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW0gMDtcXG4gIG1hcmdpbjogMXJlbSAwOyB9XFxuICAucGllY2UtY3JlYXRlLWZvcm0gLmZvcm0taW5wdXRzIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogMXJlbTsgfVxcbiAgICAucGllY2UtY3JlYXRlLWZvcm0gLmZvcm0taW5wdXRzIC5pbnB1dC1jb250YWluZXIge1xcbiAgICAgIGRpc3BsYXk6IGdyaWQ7IH1cXG4gIC5waWVjZS1jcmVhdGUtZm9ybSAuc3VibWl0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtaGVhZCxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLnVuY3V0LXBpZWNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XFxuXFxuaDEsIGgyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbnRhYmxlIHtcXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0ksNkJBQWE7RUFDYiw2QkFBYSxFQUFBOztBQUdqQjtFQUNJLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFFdEIsK0JBQStCO0VBQy9CLDBDQUEwQyxFQUFBOztBQUc5QztFQUNJLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLGlCQUFpQjtFQUNqQix3SUFBd0k7RUFDeEksaUJBQWlCO0VBRWpCLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsaUNBQWlDO0VBQ2pDLGtFQUdtQixFQUFBOztBQUd2Qjs7O0VBR0ksZUFBZSxFQUFBOztBQUtuQjtFQUNJLGlCQUFpQixFQUFBOztBQUtyQjtFQUNJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUIsRUFBQTs7QUFLdkI7RUFDSSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBSzNCO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQixFQUFBOztBQUcxQjtFQUNJLHFCQUFxQixFQUFBO0VBRHpCO0lBSVEsY0FBYyxFQUFBOztBQUl0QjtFQUNJLDBDQUEwQztFQUMxQyxlQUFlO0VBQ2YsY0FBYyxFQUFBO0VBSGxCO0lBTVEsYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxnQkFBZ0IsRUFBQTtJQVJ4QjtNQVdZLGFBQWEsRUFBQTtFQVh6QjtJQWdCUSxhQUFhO0lBQ2IsdUJBQXVCLEVBQUE7O0FBSS9COzs7RUFJUSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDhCQUE4QixFQUFBOztBQWN0QztFQUNJLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBDQUEwQztFQUMxQyxrQkFBa0IsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXHJcXG4gICAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7XFxyXFxufVxcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBmb250LXNpemU6IDYyLjUlOyAvLyAxcmVtID0gMTBweFxcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLXdoaXRlLCB3aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcclxcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXHJcXG4gICAgICAgIFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcclxcbiAgICAgICAgXFxcIm1haW4gbWFpblxcXCJcXHJcXG4gICAgICAgIFxcXCJmb290ZXIgZm9vdGVyXFxcIjtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLCBcXHJcXG5tYWluLCBcXHJcXG5mb290ZXIge1xcclxcbiAgICBwYWRkaW5nOiAxLjhyZW07XFxyXFxufVxcclxcblxcclxcbi8vIEhlYWRlclxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICAgIGdyaWQtYXJlYTogaGVhZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBNYWluIENvbnRlbnRcXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiBtYWluO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGb290ZXJcXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gICAgZ3JpZC1hcmVhOiBmb290ZXI7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8vIEN1c3RvbSBJRHNcXHJcXG5cXHJcXG4jY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3VzdG9tIENsYXNzZXNcXHJcXG5cXHJcXG4uY3V0LXNlcXVlbmNlIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG5cXHJcXG4gICAgbGFiZWwsIGlucHV0IHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5waWVjZS1jcmVhdGUtZm9ybSB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgcGFkZGluZzogMXJlbSAwO1xcclxcbiAgICBtYXJnaW46IDFyZW0gMDtcXHJcXG5cXHJcXG4gICAgLmZvcm0taW5wdXRzIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcclxcbiAgICAgICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG5cXHJcXG4gICAgICAgIC5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnN1Ym1pdC1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5waWVjZS1saXN0IHtcXHJcXG4gICAgLnBpZWNlLWxpc3QtaGVhZCwgXFxyXFxuICAgIC5waWVjZS1saXN0LWJvZHkgPiAuY3V0LXBpZWNlLFxcclxcbiAgICAucGllY2UtbGlzdC1ib2R5ID4gLnVuY3V0LXBpZWNlIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waWVjZS1saXN0LWhlYWQge1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waWVjZS1saXN0LWJvZHkge1xcclxcblxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi8vIE1pc2NcXHJcXG5cXHJcXG5oMSwgaDIge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbnRhYmxlIHtcXHJcXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJfcmVzZXQuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVyX3Jlc2V0LnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZXMvbWV5ZXJfcmVzZXQuc2Nzcyc7XHJcbmltcG9ydCAnLi9zdHlsZXMvc3R5bGVzLnNjc3MnO1xyXG5pbXBvcnQgY3V0TGlzdENhbGN1bGF0b3IgZnJvbSAnLi9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyc7XHJcbmltcG9ydCBDdXRQaWVjZSBmcm9tICcuL2pzL2N1dFBpZWNlLmpzJztcclxuaW1wb3J0IHtDcm9zc1NlY3Rpb24sIFVuY3V0UGllY2V9IGZyb20gJy4vanMvdW5jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Y3V0TGlzdH0gZnJvbSAnLi9qcy9jdXRMaXN0LmpzJztcclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50IGZyb20gJy4vanMvY29tcG9uZW50cy9jdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudC5qcyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgLy9jdXRMaXN0Q2FsY3VsYXRvci5pbml0KCk7XHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudC5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwoY3V0UGllY2VzLCBwb3NzaWJsZUxlbmd0aHNBcnIpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBjdXRMZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIuY3V0TGVuZ3RoIC0gYS5jdXRMZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGluZGV4IGluIGNvcnJlc3BvbmRpbmcgXHJcbiAgICAgICAgLy8gaW5kaXZpZHVhbEN1dFBpZWNlcyBhcnJheS4gSWYgYSBpbmRpdmlkdWFsIEN1dFBpZWNlIGlzIHNlbGVjdGVkIGZvciBcclxuICAgICAgICAvLyBhIGN1dCBzZXF1ZW5jZSwgaXQncyBpbmRleCBpcyByZW1vdmVkIGZyb20gdGhpcyBhcnJheS5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgY3VyckN1dFNlcXVlbmNlLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgYmVzdEN1dDtcclxuICAgICAgICBsZXQgZmluYWxDdXRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBiZXN0Q3V0ID0ge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBvc3NpYmxlTGVuZ3Roc0Fyci5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyckN1dFNlcXVlbmNlID0gY3V0TGlzdC5nZXRDdXRMaXN0KGxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKGJlc3RDdXQuY3V0U2VxdWVuY2UgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dC5jdXRTZXF1ZW5jZVstMV0gPiBjdXJyQ3V0U2VxdWVuY2VbLTFdKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5jdXRTZXF1ZW5jZSA9IGN1cnJDdXRTZXF1ZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbLi4udGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpbmFsQ3V0TGlzdC5wdXNoKGJlc3RDdXQuY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5iZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxDdXRMaXN0KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBmaXJzdCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYmVzdEN1dExpc3QgdG8gZmlyc3QgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIG5leHQgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgbmV3IGN1dCBsaXN0IGhhcyBsZXNzIHJlbWFpbmluZyBsZW5ndGggdGhhbiBiZXN0Q3V0TGlzdCwgc2V0IFxyXG4gICAgICAgIC8vIGJlc3RDdXRMaXN0IHRvIG5ldyBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgcmVhY2ggZW5kIG9mIHBvc3NpYmxlIGxlbmd0aCBhcnJheSwgc2F2ZSBiZXN0Q3V0TGlzdCB0byBmaW5hbCBjdXQgbGlzdCBzZXF1ZW5jZVxyXG5cclxuICAgICAgICAvLyBSZXBlYXQgb25jZSBhZ2FpbiB3aXRoIHJlbWFpbmluZyBpbmRpdmlkdWFsQ3V0UGllY2VzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IEV4YW1wbGUnKTtcclxuXHJcbiAgICBsZXQgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxOS44NzUsIDMpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzOS44NzUsIDMpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA0OS44NzUsIDMpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb24yeDQgPSBuZXcgQ3Jvc3NTZWN0aW9uKDIsNCk7XHJcbiAgICBsZXQgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTQ0LCA0NjIpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFNlZS1TYXcnKTtcclxuICAgIFxyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzNiwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM1KzUvMTYsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzMCsyMS8zMiwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDIyLjUsIDQpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb240eDQgPSBuZXcgQ3Jvc3NTZWN0aW9uKDQsNCk7XHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDcyLCAxMjI4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDk2LCAxNTQ4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDEyMCwgMjIzOCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCAxNDQsIDI3NDgpLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogU2F3IEhvcnNlcycpO1xyXG5cclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM2LCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzIrMS84LCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzQsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBXb29kIFNoZWQnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNioxMiwgNjE2KSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzExLCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTUqMTIrNCwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDcqMTIsIDMyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgOC41LCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNSoxMisxMCwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDIqMTIrOSwgNiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDIqMTIrMTEuNSwgMiksXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIElTU1VFOiBWZXJ5IGxvbmcgdGltZVxyXG4gICAgLy9kZWJ1Z2dlcjtcclxuICAgIC8vY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIHdpbmRvdy5jdXRMaXN0Q2FsY3VsYXRvciA9IGN1dExpc3RDYWxjdWxhdG9yO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOlsiRm9vdGVyIiwiQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IiwiVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQiLCJDdXRQaWVjZUNvbXBvbmVudCIsIkN1dFBpZWNlTGlzdENvbXBvbmVudCIsIlVuY3V0UGllY2VDb21wb25lbnQiLCJVbmN1dFBpZWNlTGlzdENvbXBvbmVudCIsIkN1dExpc3RDb21wb25lbnQiLCJjdXRMaXN0Q2FsY3VsYXRvciIsIkN1dFBpZWNlIiwiVW5jdXRQaWVjZSIsIkNyb3NzU2VjdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCIsImN1dFBpZWNlcyIsInVuY3V0UGllY2VzIiwiYmVzdEN1dExpc3QiLCJjdXRMaXN0RWxlbWVudCIsImN1dFBpZWNlTGlzdENvbXBvbmVudCIsInVuY3V0UGllY2VMaXN0Q29tcG9uZW50IiwiaW5pdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1haW5FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVuZGVyIiwiaGFuZGxlQ3V0UGllY2VBZGRGb3JtU3VibWl0IiwiaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQiLCJjcmVhdGVDdXRMaXN0QnRuQ29udGFpbmVyIiwiY3JlYXRlQ3V0TGlzdEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2siLCJhZGRDdXRQaWVjZSIsImN1dFBpZWNlIiwicHVzaCIsImFkZFVuY3V0UGllY2UiLCJ1bmN1dFBpZWNlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiTnVtYmVyIiwidGFyZ2V0IiwiZWxlbWVudHMiLCJuYW1lZEl0ZW0iLCJ2YWx1ZSIsImFkZEN1dFBpZWNlQ29tcG9uZW50IiwiYWRkVW5jdXRQaWVjZUNvbXBvbmVudCIsImdldENoZWFwZXN0Q3V0TGlzdCIsImFwcGVuZCIsIkN1dFNlcXVlbmNlQ29tcG9uZW50IiwiY3V0TGlzdCIsIm1hdGVyaWFsTGlzdCIsImdldE1hdGVyaWFsTGlzdCIsImVsZW1lbnQiLCJtYXRlcmlhbExpc3RUYWJsZSIsIm1hdGVyaWFsTGlzdFRhYmxlQm9keSIsInVuY3V0TGVuZ3RoIiwidW5jdXRPYmoiLCJPYmplY3QiLCJlbnRyaWVzIiwicXVhbnRpdHkiLCJ1bml0UHJpY2UiLCJjdXRTZXF1ZW5jZXMiLCJmb3JFYWNoIiwiY3V0U2VxdWVuY2UiLCJpbmRleCIsInRoaWNrbmVzcyIsIndpZHRoIiwiY3V0TGVuZ3RoIiwia2VyZiIsImhhbmRsZUZvcm1TdWJtaXQiLCJmb3JtRWxlbWVudCIsImZvcm1JbnB1dHNFbGVtZW50IiwidXBkYXRlRm9ybSIsImlucHV0RWxlbWVudCIsImlucHV0TmFtZSIsImFyciIsImRlZmF1bHRWYWx1ZSIsImZvY3VzIiwiY3V0UGllY2VDb21wb25lbnRzIiwiY3V0UGllY2VMaXN0RWxlbWVudCIsIl9sZW4iLCJjdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsIkFycmF5IiwiX2tleSIsImN1dFBpZWNlQ29tcG9uZW50IiwiY3Jvc3NTZWN0aW9uIiwiY3V0UGllY2VzQ29udGFpbmVyIiwicmVtYWluaW5nTGVuZ3RoIiwiY29weXJpZ2h0WWVhciIsImZvb3RlciIsImN1cnJZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwidGVtcEVsZW1lbnQiLCJpZCIsInByaWNlIiwidW5jdXRQaWVjZUNvbXBvbmVudHMiLCJ1bmN1dFBpZWNlTGlzdEVsZW1lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkIiwidW5jdXRQaWVjZUNvbXBvbmVudCIsIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImNsZWFyIiwiZ2V0UHJpY2UiLCJyZWR1Y2UiLCJhY2N1bSIsImN1cnIiLCJkZWVwQ29weSIsIm1hdGVyaWFsTGlzdE9iaiIsImdldEN1dExpc3QiLCJpbmRpdmlkdWFsQ3V0UGllY2VzIiwiYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsInN0YXJ0SW5kZXgiLCJzZWxlY3RlZEN1dFBpZWNlSW5kZXgiLCJpIiwic3BsaWNlIiwiY3V0V2l0aEtlcmYiLCJzZWxlY3RlZEN1dFBpZWNlIiwiQ3V0U2VxdWVuY2UiLCJnZXREeW5hbWljTmVzdGVkTG9vcENvdW50IiwibnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJtYXhOdW1BdmFpbGFibGVMZW5ndGhzIiwibGFzdE5vblplcm9JbmRleCIsImZpbmRMYXN0SW5kZXgiLCJ2YWwiLCJjb3VudCIsInNsaWNlIiwiZ2V0UGVyY2VudGFnZSIsIm51bSIsIm1heExhc3ROb25aZXJvSW5kZXgiLCJtYXgiLCJtYXAiLCJwZXJjZW50YWdlIiwic2tpcCIsImZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXgiLCJmaW5kSW5kZXgiLCJpbmNyZW1lbnQiLCJkZWNyZW1lbnQiLCJzb3J0IiwiYSIsImIiLCJmbGF0TWFwIiwiZmlsbCIsImN1dFNlcXVlbmNlQXJyIiwiY3VyckN1dExpc3QiLCJmcm9tIiwiY3JlYXRlQ3V0U2VxdWVuY2VBcnIiLCJpbmNyZW1lbnRUcmlnZ2VyIiwiZGVjcmVtZW50VHJpZ2dlciIsInRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciIsInNraXBGbGFnIiwicGVyY2VudEZhY3RvckNvdW50ZXIiLCJwZXJjZW50TXVsdGlwbGVEaXNwbGF5IiwiY29uc29sZSIsImxvZyIsInRvRml4ZWQiLCJmaWx0ZXIiLCJ3aW5kb3ciLCJ0b1N0cmluZyIsImNyZWF0ZUN1dFNlcXVlbmNlIiwidHlwZSIsInByb3BzIiwia2V5Iiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwicG9zc2libGVMZW5ndGhzQXJyIiwiY3VyckN1dFNlcXVlbmNlIiwidGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJiZXN0Q3V0IiwiZmluYWxDdXRMaXN0IiwiY3Jvc3NTZWN0aW9uMng0IiwiY3Jvc3NTZWN0aW9uNHg0Il0sInNvdXJjZVJvb3QiOiIifQ==