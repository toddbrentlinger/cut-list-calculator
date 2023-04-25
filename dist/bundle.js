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
  let cutListComponent;
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

    // Description
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('p', {}, 'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of lumber needed and provides the cut sequence for each uncut piece.'));

    // Add cut/uncut pieces list with create form after

    // Cut Pieces - Header
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('h2', {}, 'Cut Pieces:'));
    // Cut Pieces - Clear Button
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'class': 'clear-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'class': 'clear-btn'
    }, 'Clear')).addEventListener('click', handleCutPieceListClear);
    // Cut Pieces - List
    cutPieceListComponent = (0,_cutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
    mainElement.appendChild(cutPieceListComponent.render());
    // Cut Pieces - Create Form
    mainElement.appendChild((0,_cutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(handleCutPieceAddFormSubmit).render());

    // Uncut Pieces - Header
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('h2', {}, 'Uncut Pieces:'));
    // Uncut Pieces - Clear Button
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'class': 'clear-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'class': 'clear-btn'
    }, 'Clear')).addEventListener('click', handleUncutPieceListClear);
    // Uncut Pieces - List
    uncutPieceListComponent = (0,_uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
    mainElement.appendChild(uncutPieceListComponent.render());
    // Uncut Pieces - Create Form
    mainElement.appendChild((0,_uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(handleUncutPieceAddFormSubmit).render());

    // Add any cut/uncut pieces passed as parameters
    cutPieces.forEach(cutPiece => addCutPiece(cutPiece));
    uncutPieces.forEach(uncutPiece => addUncutPiece(uncutPiece));

    // Add button that creates cut list with click event listener
    const createCutListBtn = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'id': 'create-cut-list-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'id': 'create-cut-list-btn'
    }, 'Create Cut List'));
    createCutListBtn.addEventListener('click', handleCreateCutListClick);

    // Add calculated cut list
    cutListComponent = (0,_cutListComponent_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    mainElement.appendChild(cutListComponent.render());

    // Add footer component, passing in the first year of the app
    document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2023).render());
  }
  function addCutPiece(cutPiece) {
    // Add CutPiece to array
    cutPieces.push(cutPiece);

    // Display new CutPiece in list
    cutPieceListComponent.addCutPieceComponent((0,_cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cutPiece));
    return cutPiece;
  }
  function addUncutPiece(uncutPiece) {
    // Add UncutPiece to array
    uncutPieces.push(uncutPiece);

    // Display new UncutPiece
    uncutPieceListComponent.addUncutPieceComponent((0,_uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(uncutPiece));
    return uncutPiece;
  }
  function handleCutPieceAddFormSubmit(e) {
    e.preventDefault();

    // Create CutPiece from form inputs
    const cutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_9__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));
    addCutPiece(cutPiece);
  }
  function handleUncutPieceAddFormSubmit(e) {
    e.preventDefault();

    // Create UncutPiece from form inputs
    const uncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__.UncutPiece(new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__.CrossSection(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value)), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));
    addUncutPiece(uncutPiece);
  }
  function handleCreateCutListClick(e) {
    e.preventDefault();
    bestCutList = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_8__["default"].getCheapestCutList(cutPieces, uncutPieces);
    cutListComponent.cutList = bestCutList;
  }
  function handleCutPieceListClear() {
    console.log('Clear Cut List');

    // Clear list of cut pieces
    cutPieces = [];

    // Clear cut pieces displayed
    cutPieceListComponent.clear();
  }
  function handleUncutPieceListClear() {
    console.log('Clear Uncut List');

    // Clear list of uncut pieces
    uncutPieces = [];

    // Clear uncut pieces displayed
    uncutPieceListComponent.clear();
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
  let element;
  const clear = function () {
    if (element === undefined) {
      return;
    }
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'id': 'cut-list'
      });
    }
    if (cutList === undefined) {
      return element;
    }

    // Material List - Header
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', {}, 'Material List:'));

    // Material List - Table
    const materialListTable = element.appendChild(document.createElement('table'));

    // Material List - Table Head
    materialListTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('thead', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Quantity'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Uncut Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Unit Price'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Sum Price'))));

    // Material List - Table Body
    const materialList = cutList.getMaterialList();
    const materialListTableBody = materialListTable.appendChild(document.createElement('tbody'));
    let totalPrice = 0;
    for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
      materialListTableBody.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.unitPrice), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.quantity * uncutObj.unitPrice)));
      totalPrice += uncutObj.quantity * uncutObj.unitPrice;
    }

    // Material List - Table Body - Total Price
    materialListTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {
      'colspan': '2'
    }), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'row'
    }, 'Total Price'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, totalPrice.toFixed(2))));

    // Cut Sequences
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', {}, 'Cut Sequences:'));

    // Cut Sequences - Table
    const cutSequencesTable = element.appendChild(document.createElement('table'));

    // Cut Sequences - Table Head
    cutSequencesTable.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('thead', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Uncut Member'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Cut Length'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('th', {
      'scope': 'col'
    }, 'Remaining Length'))));

    // Material List - Table Body
    const cutSequencesTableBody = cutSequencesTable.appendChild(document.createElement('tbody'));
    cutList.cutSequences.forEach(cutSequence => {
      cutSequencesTableBody.append(...(0,_cutSequenceComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cutSequence).render());
    });
    return element;
  };
  return {
    render,
    get cutList() {
      return cutList;
    },
    set cutList(newCutList) {
      cutList = newCutList;
      clear();
      render();
    }
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
      'value': '1',
      'min': '1'
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
  const clear = function () {
    // Remove cut piece components from array
    cutPieceComponents = [];

    // Remove elements from document
    while (cutPieceListElement.firstChild) {
      cutPieceListElement.removeChild(cutPieceListElement.firstChild);
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
    return element;
  };
  return {
    addCutPieceComponent,
    clear,
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
    const rowElements = [];
    cutSequence.cutPieces.forEach((cutPiece, index, arr) => {
      const tempRowElement = document.createElement('tr');

      // Uncut Piece (first row only)
      // Add uncut piece if first row OR add row that spans rest of rows for this cut sequence.
      if (index === 0) {
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, `${cutSequence.uncutPiece.crossSection.thickness}x${cutSequence.uncutPiece.crossSection.width}x${cutSequence.uncutPiece.length}`));
      } else if (index === 1) {
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {
          'rowspan': arr.length - 1
        }));
      }

      // Cut Pieces
      tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.cutLength));

      // Remaining Length (last row only)
      // Add remaining length if last row OR row that spans rest of rows for this cut sequence.
      if (index === arr.length - 1) {
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, `with ${cutSequence.remainingLength} remaining`));
      } else if (index === 0) {
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {
          'rowspan': arr.length - 1
        }));
      }

      // Add row element to array of other row elements
      rowElements.push(tempRowElement);
    });
    return rowElements;
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
  const clear = function () {
    // Remove uncut piece components from array
    uncutPieceComponents = [];

    // Remove elements from document
    while (uncutPieceListElement.firstChild) {
      uncutPieceListElement.removeChild(uncutPieceListElement.firstChild);
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
    clear,
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container,\n.clear-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column;\n  border: 2px solid var(--base-black, black);\n  border-top: none; }\n  .cut-sequence:first-child {\n    border-top: 2px solid var(--base-black, black); }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    width: 100%; }\n\n.piece-create-form {\n  border: 2px solid var(--base-black, black);\n  padding: 1rem 0;\n  margin: 1rem 0; }\n  .piece-create-form .form-inputs {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    column-gap: 1rem; }\n    .piece-create-form .form-inputs .input-container {\n      display: grid; }\n  .piece-create-form .submit-container {\n    display: grid;\n    justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  column-gap: 1rem; }\n\nh1, h2, h3 {\n  text-align: center; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n  table tbody tr:nth-child(odd) {\n    background-color: #d9d9d9; }\n  table tbody tr:nth-child(even) {\n    background-color: #bfbfbf; }\n  table th, table td {\n    padding: 0.5rem 1rem;\n    border: 2px solid var(--base-black, black); }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAEA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;;EAEI,aAAa;EACb,uBAAuB,EAAA;;AAa3B;EACI,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gBAAgB,EAAA;EAJpB;IAOQ,8CAA8C,EAAA;;AAItD;EACI,qBAAqB,EAAA;EADzB;IAIQ,WAAW,EAAA;;AAInB;EACI,0CAA0C;EAC1C,eAAe;EACf,cAAc,EAAA;EAHlB;IAMQ,aAAa;IACb,qCAAqC;IACrC,gBAAgB,EAAA;IARxB;MAWY,aAAa,EAAA;EAXzB;IAgBQ,aAAa;IACb,uBAAuB,EAAA;;AAI/B;;;EAIQ,aAAa;EACb,qCAAqC;EACrC,gBAAgB,EAAA;;AAcxB;EACI,kBAAkB,EAAA;;AAGtB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA;EALtB;IASY,yBAAiC,EAAA;EAT7C;IAaY,yBAAiC,EAAA;EAb7C;IAkBQ,oBAAoB;IACpB,0CAA0C,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container,\r\n.clear-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n#cut-piece-create-form {\r\n\r\n}\r\n\r\n#uncut-piece-create-form {\r\n    \r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    border: 2px solid var(--base-black, black);\r\n    border-top: none;\r\n\r\n    &:first-child {\r\n        border-top: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.piece-create-form {\r\n    border: 2px solid var(--base-black, black);\r\n    padding: 1rem 0;\r\n    margin: 1rem 0;\r\n\r\n    .form-inputs {\r\n        display: grid;\r\n        grid-template-columns: repeat(5, 1fr);\r\n        column-gap: 1rem;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        display: grid;\r\n        grid-template-columns: repeat(5, 1fr);\r\n        column-gap: 1rem;\r\n    }\r\n\r\n    .piece-list-head {\r\n\r\n    }\r\n\r\n    .piece-list-body {\r\n\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2, h3 {\r\n    text-align: center;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n\r\n    tbody {\r\n        tr:nth-child(odd) {\r\n            background-color: hsl(0, 0%, 85%);\r\n        }\r\n\r\n        tr:nth-child(even) {\r\n            background-color: hsl(0, 0%, 75%);\r\n        }\r\n    }\r\n\r\n    th, td {\r\n        padding: 0.5rem 1rem;\r\n        border: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
  _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].init(cutPieces, uncutPieces);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUM1QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUMxQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUFpSyxNQUFNLENBQUNsSyxpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRMaXN0Q29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUxpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFNlcXVlbmNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3QuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0U2VxdWVuY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91bmN1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3M/YjMwZiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzcz8yMDNiIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9vdGVyIGZyb20gXCIuL2Zvb3Rlci5qc1wiO1xyXG5cclxuaW1wb3J0IEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzXCI7XHJcblxyXG5pbXBvcnQgQ3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUxpc3RDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dExpc3RDb21wb25lbnQgZnJvbSBcIi4vY3V0TGlzdENvbXBvbmVudC5qc1wiO1xyXG5cclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gXCIuLi9jdXRMaXN0Q2FsY3VsYXRvci5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4uL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCB7VW5jdXRQaWVjZSwgQ3Jvc3NTZWN0aW9ufSBmcm9tIFwiLi4vdW5jdXRQaWVjZS5qc1wiO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmNvbnN0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50ID0gKCgpID0+IHtcclxuICAgIGxldCBjdXRQaWVjZXMgPSBbXTtcclxuICAgIGxldCB1bmN1dFBpZWNlcyA9IFtdO1xyXG5cclxuICAgIGxldCBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICBsZXQgY3V0TGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuICAgIGxldCB1bmN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuICAgIGxldCBjdXRMaXN0Q29tcG9uZW50O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoY3V0UGllY2VzID0gW10sIHVuY3V0UGllY2VzID0gW10sIGJlc3RDdXRMaXN0ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY3V0UGllY2VzID0gY3V0UGllY2VzO1xyXG4gICAgICAgIHVuY3V0UGllY2VzID0gdW5jdXRQaWVjZXM7XHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xyXG4gICAgICAgIGlmIChtYWluRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXNjcmlwdGlvblxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgXHJcbiAgICAgICAgICAgICdEaW1lbnNpb25hbCBsdW1iZXIgY29tZXMgaW4gcHJlLWRldGVybWluZWQgbGVuZ3RocyB3aXRoIHRoZWlyIG93biBpbmRpdmlkdWFsIHByaWNlcyAoVW5jdXQgUGllY2VzKS4gR2l2ZW4gdGhlIGN1dCBsZW5ndGhzIG9mIGRpbWVuc2lvbmFsIGx1bWJlciByZXF1aXJlZCBmb3IgeW91ciBwcm9qZWN0IChDdXQgUGllY2VzKSBhbmQgdGhlIGF2YWlsYWJsZSBwcmUtZGV0ZXJtaW5lZCBsZW5ndGhzLCB0aGlzIGFwcCBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBhbW91bnQgb2YgbHVtYmVyIG5lZWRlZCBhbmQgcHJvdmlkZXMgdGhlIGN1dCBzZXF1ZW5jZSBmb3IgZWFjaCB1bmN1dCBwaWVjZS4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQvdW5jdXQgcGllY2VzIGxpc3Qgd2l0aCBjcmVhdGUgZm9ybSBhZnRlclxyXG5cclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gSGVhZGVyXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDInLCB7fSwgJ0N1dCBQaWVjZXM6JykpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3V0UGllY2VMaXN0Q2xlYXIpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBMaXN0XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBIZWFkZXJcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMicsIHt9LCAnVW5jdXQgUGllY2VzOicpKTtcclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhcik7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gTGlzdFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gVW5jdXRQaWVjZUxpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGFueSBjdXQvdW5jdXQgcGllY2VzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgY3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlKSA9PiBhZGRDdXRQaWVjZShjdXRQaWVjZSkpO1xyXG4gICAgICAgIHVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UpID0+IGFkZFVuY3V0UGllY2UodW5jdXRQaWVjZSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYnV0dG9uIHRoYXQgY3JlYXRlcyBjdXQgbGlzdCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQ3V0TGlzdEJ0biA9IG1haW5FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydpZCc6ICdjcmVhdGUtY3V0LWxpc3QtYnRuJ30sICdDcmVhdGUgQ3V0IExpc3QnKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY3JlYXRlQ3V0TGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljayk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYWxjdWxhdGVkIGN1dCBsaXN0XHJcbiAgICAgICAgY3V0TGlzdENvbXBvbmVudCA9IEN1dExpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjdXRMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGZvb3RlciBjb21wb25lbnQsIHBhc3NpbmcgaW4gdGhlIGZpcnN0IHllYXIgb2YgdGhlIGFwcFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoRm9vdGVyKDIwMjMpLnJlbmRlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXRQaWVjZShjdXRQaWVjZSkge1xyXG4gICAgICAgIC8vIEFkZCBDdXRQaWVjZSB0byBhcnJheVxyXG4gICAgICAgIGN1dFBpZWNlcy5wdXNoKGN1dFBpZWNlKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcGxheSBuZXcgQ3V0UGllY2UgaW4gbGlzdFxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRDdXRQaWVjZUNvbXBvbmVudChDdXRQaWVjZUNvbXBvbmVudChjdXRQaWVjZSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3V0UGllY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgLy8gQWRkIFVuY3V0UGllY2UgdG8gYXJyYXlcclxuICAgICAgICB1bmN1dFBpZWNlcy5wdXNoKHVuY3V0UGllY2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIERpc3BsYXkgbmV3IFVuY3V0UGllY2VcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRVbmN1dFBpZWNlQ29tcG9uZW50KFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dHNcclxuICAgICAgICBjb25zdCBjdXRQaWVjZSA9IG5ldyBDdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdxdWFudGl0eScpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgna2VyZicpLnZhbHVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYWRkQ3V0UGllY2UoY3V0UGllY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBVbmN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dHNcclxuICAgICAgICBjb25zdCB1bmN1dFBpZWNlID0gbmV3IFVuY3V0UGllY2UoXHJcbiAgICAgICAgICAgIG5ldyBDcm9zc1NlY3Rpb24oTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLCBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2soZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoXHJcbiAgICAgICAgICAgIGN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY3V0TGlzdENvbXBvbmVudC5jdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3V0UGllY2VMaXN0Q2xlYXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NsZWFyIEN1dCBMaXN0Jyk7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIGxpc3Qgb2YgY3V0IHBpZWNlc1xyXG4gICAgICAgIGN1dFBpZWNlcyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBDbGVhciBjdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VMaXN0Q2xlYXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NsZWFyIFVuY3V0IExpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgbGlzdCBvZiB1bmN1dCBwaWVjZXNcclxuICAgICAgICB1bmN1dFBpZWNlcyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBDbGVhciB1bmN1dCBwaWVjZXMgZGlzcGxheWVkXHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQsXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQ7XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZUNvbXBvbmVudCBmcm9tIFwiLi9jdXRTZXF1ZW5jZUNvbXBvbmVudC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0TGlzdENvbXBvbmVudChjdXRMaXN0KSB7XHJcbiAgICBsZXQgZWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3V0LWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3V0TGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gSGVhZGVyXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMycsIHt9LCAnTWF0ZXJpYWwgTGlzdDonKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlXHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0VGFibGUgPSBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGUgSGVhZFxyXG4gICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbmN1dCBMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1VuaXQgUHJpY2UnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1N1bSBQcmljZScpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHlcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3QgPSBjdXRMaXN0LmdldE1hdGVyaWFsTGlzdCgpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdFRhYmxlQm9keSA9IG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xyXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IFt1bmN1dExlbmd0aCwgdW5jdXRPYmpdIG9mIE9iamVjdC5lbnRyaWVzKG1hdGVyaWFsTGlzdCkpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGVCb2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRPYmoucXVhbnRpdHkpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRPYmoudW5pdFByaWNlKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0T2JqLnF1YW50aXR5ICogdW5jdXRPYmoudW5pdFByaWNlKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgdG90YWxQcmljZSArPSB1bmN1dE9iai5xdWFudGl0eSAqIHVuY3V0T2JqLnVuaXRQcmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5IC0gVG90YWwgUHJpY2VcclxuICAgICAgICBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J2NvbHNwYW4nOiAnMid9KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ3Jvdyd9LCAnVG90YWwgUHJpY2UnKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdG90YWxQcmljZS50b0ZpeGVkKDIpKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBDdXQgU2VxdWVuY2VzXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMycsIHt9LCAnQ3V0IFNlcXVlbmNlczonKSk7XHJcblxyXG4gICAgICAgIC8vIEN1dCBTZXF1ZW5jZXMgLSBUYWJsZVxyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlc1RhYmxlID0gZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlcyAtIFRhYmxlIEhlYWRcclxuICAgICAgICBjdXRTZXF1ZW5jZXNUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0aGVhZCcsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbmN1dCBNZW1iZXInKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ0N1dCBMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1JlbWFpbmluZyBMZW5ndGgnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5XHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VzVGFibGVCb2R5ID0gY3V0U2VxdWVuY2VzVGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XHJcbiAgICAgICAgY3V0TGlzdC5jdXRTZXF1ZW5jZXMuZm9yRWFjaCgoY3V0U2VxdWVuY2UpID0+IHtcclxuICAgICAgICAgICAgY3V0U2VxdWVuY2VzVGFibGVCb2R5LmFwcGVuZCguLi5DdXRTZXF1ZW5jZUNvbXBvbmVudChjdXRTZXF1ZW5jZSkucmVuZGVyKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgICAgIGdldCBjdXRMaXN0KCkgeyByZXR1cm4gY3V0TGlzdDsgfSxcclxuICAgICAgICBzZXQgY3V0TGlzdChuZXdDdXRMaXN0KSB7IFxyXG4gICAgICAgICAgICBjdXRMaXN0ID0gbmV3Q3V0TGlzdDtcclxuICAgICAgICAgICAgY2xlYXIoKTtcclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlQ29tcG9uZW50KGN1dFBpZWNlKSB7XHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgJ2RpdicsIFxyXG4gICAgICAgICAgICB7J2NsYXNzJzogJ2N1dC1waWVjZSd9LFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UudGhpY2tuZXNzKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLmN1dExlbmd0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS5xdWFudGl0eSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS5rZXJmKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIGxldCBmb3JtRWxlbWVudDtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCB7XHJcbiAgICAgICAgICAgICdhY3Rpb24nOiAnJyxcclxuICAgICAgICAgICAgJ21ldGhvZCc6ICdnZXQnLFxyXG4gICAgICAgICAgICAnbmFtZSc6ICdjdXQtcGllY2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgJ2lkJzogJ2N1dC1waWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgICAgICdjbGFzcyc6ICdwaWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAnY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ2N1dC13aWR0aCcsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIExlbmd0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWxlbmd0aCd9LCAnTGVuZ3RoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICdjdXQtbGVuZ3RoJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gUXVhbnRpdHlcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1xdWFudGl0eSd9LCAnUXVhbnRpdHk6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdudW1iZXInLCAnbmFtZSc6ICdxdWFudGl0eScsICdpZCc6ICdjdXQtcXVhbnRpdHknLCAndmFsdWUnOiAnMScsICdtaW4nOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gS2VyZlxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWtlcmYnfSwgJ0tlcmY6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAna2VyZicsICdpZCc6ICdjdXQta2VyZicsICd2YWx1ZSc6ICcwLjEyNScsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIFN1Ym1pdCBDb250YWluZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdzdWJtaXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnc3VibWl0JywgJ3ZhbHVlJzogJ0FkZCd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHN1Ym1pdCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVGb3JtU3VibWl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUZvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpbnB1dCBmaWVsZHMgZm9yIGN1dCBsZW5ndGggYW5kIHF1YW50aXR5LCBsZWF2aW5nIG90aGVyIGlucHV0cyB3aXRoIHVzZXIgZW50ZXJlZCBkYXRhLlxyXG4gICAgICAgIC8vIEZvY3VzIGN1cnNvciBvbiBsYXN0IGlucHV0IHdoaWNoIHNob3VsZCBiZSBjdXQgbGVuZ3RoIGZpZWxkXHJcbiAgICAgICAgWydxdWFudGl0eScsICdsZW5ndGgnXS5mb3JFYWNoKChpbnB1dE5hbWUsIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50ID0gZm9ybUVsZW1lbnQuZWxlbWVudHMubmFtZWRJdGVtKGlucHV0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IGlucHV0RWxlbWVudC5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IGN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IGN1dFBpZWNlTGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgYWRkQ3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cy5wdXNoKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlQ29tcG9uZW50IG9mIGN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBSZW1vdmUgY3V0IHBpZWNlIGNvbXBvbmVudHMgZnJvbSBhcnJheVxyXG4gICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZWxlbWVudHMgZnJvbSBkb2N1bWVudFxyXG4gICAgICAgIHdoaWxlIChjdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgY3V0UGllY2VMaXN0RWxlbWVudC5yZW1vdmVDaGlsZChjdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0J30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGxhYmVscyBmb3IgbGlzdCAodGFibGUgaGVhZClcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtaGVhZCd9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnVGhpY2tuZXNzJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1dpZHRoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ0xlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdRdWFudGl0eScpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdLZXJmJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaXN0IGJvZHkgKHRhYmxlIGJvZHkpXHJcbiAgICAgICAgY3V0UGllY2VMaXN0RWxlbWVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWJvZHknfSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZEN1dFBpZWNlQ29tcG9uZW50LFxyXG4gICAgICAgIGNsZWFyLFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFNlcXVlbmNlQ29tcG9uZW50KGN1dFNlcXVlbmNlKSB7XHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCByb3dFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wUm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBVbmN1dCBQaWVjZSAoZmlyc3Qgcm93IG9ubHkpXHJcbiAgICAgICAgICAgIC8vIEFkZCB1bmN1dCBwaWVjZSBpZiBmaXJzdCByb3cgT1IgYWRkIHJvdyB0aGF0IHNwYW5zIHJlc3Qgb2Ygcm93cyBmb3IgdGhpcyBjdXQgc2VxdWVuY2UuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgYCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24udGhpY2tuZXNzfXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UuY3Jvc3NTZWN0aW9uLndpZHRofXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UubGVuZ3RofWApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsncm93c3Bhbic6IGFyci5sZW5ndGggLSAxfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEN1dCBQaWVjZXNcclxuICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5jdXRMZW5ndGgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1haW5pbmcgTGVuZ3RoIChsYXN0IHJvdyBvbmx5KVxyXG4gICAgICAgICAgICAvLyBBZGQgcmVtYWluaW5nIGxlbmd0aCBpZiBsYXN0IHJvdyBPUiByb3cgdGhhdCBzcGFucyByZXN0IG9mIHJvd3MgZm9yIHRoaXMgY3V0IHNlcXVlbmNlLlxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGB3aXRoICR7Y3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RofSByZW1haW5pbmdgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J3Jvd3NwYW4nOiBhcnIubGVuZ3RoIC0gMX0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm93IGVsZW1lbnQgdG8gYXJyYXkgb2Ygb3RoZXIgcm93IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIHJvd0VsZW1lbnRzLnB1c2godGVtcFJvd0VsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKGNvcHlyaWdodFllYXIpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSkge1xyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAgICdkaXYnLCBcclxuICAgICAgICAgICAgeydjbGFzcyc6ICd1bmN1dC1waWVjZSd9LFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24udGhpY2tuZXNzKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UuY3Jvc3NTZWN0aW9uLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UucHJpY2UpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAndW5jdXQtcGllY2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgJ2lkJzogJ3VuY3V0LXBpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzXHJcbiAgICAgICAgY29uc3QgZm9ybUlucHV0c0VsZW1lbnQgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdmb3JtLWlucHV0cyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFRoaWNrbmVzc1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtdGhpY2tuZXNzJ30sICdUaGlja25lc3M6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAndGhpY2tuZXNzJywgJ2lkJzogJ3VuY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAndW5jdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LWxlbmd0aCd9LCAnTGVuZ3RoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICd1bmN1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBQcmljZVxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtcHJpY2UnfSwgJ1ByaWNlOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3ByaWNlJywgJ2lkJzogJ3VuY3V0LXByaWNlJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gU3VibWl0IENvbnRhaW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3N1Ym1pdC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdzdWJtaXQnLCAndmFsdWUnOiAnQWRkJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUZvcm1TdWJtaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGlucHV0IGZpZWxkcyBmb3IgY3V0IGxlbmd0aCBhbmQgcXVhbnRpdHksIGxlYXZpbmcgb3RoZXIgaW5wdXRzIHdpdGggdXNlciBlbnRlcmVkIGRhdGEuXHJcbiAgICAgICAgLy8gRm9jdXMgY3Vyc29yIG9uIGxhc3QgaW5wdXQgd2hpY2ggc2hvdWxkIGJlIGN1dCBsZW5ndGggZmllbGRcclxuICAgICAgICBbJ3ByaWNlJywgJ2xlbmd0aCddLmZvckVhY2goKGlucHV0TmFtZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQgPSBmb3JtRWxlbWVudC5lbGVtZW50cy5uYW1lZEl0ZW0oaW5wdXROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gaW5wdXRFbGVtZW50LmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlTGlzdENvbXBvbmVudCgpIHtcclxuICAgIGxldCB1bmN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IHVuY3V0UGllY2VMaXN0RWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBhZGRVbmN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnB1c2goLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCk7XHJcbiAgICAgICAgZm9yIChjb25zdCB1bmN1dFBpZWNlQ29tcG9uZW50IG9mIHVuY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUxpc3RFbGVtZW50LmFwcGVuZENoaWxkKHVuY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50cyBmcm9tIGFycmF5XHJcbiAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnRzIGZyb20gZG9jdW1lbnRcclxuICAgICAgICB3aGlsZSAodW5jdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUxpc3RFbGVtZW50LnJlbW92ZUNoaWxkKHVuY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdCd9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBsYWJlbHMgZm9yIGxpc3QgKHRhYmxlIGhlYWQpXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWhlYWQnfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1RoaWNrbmVzcycpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdXaWR0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnUHJpY2UnKSxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaXN0IGJvZHkgKHRhYmxlIGJvZHkpXHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RFbGVtZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtYm9keSd9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkVW5jdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICBjbGVhcixcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDdXRMaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKGN1dFNlcXVlbmNlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBjdXRTZXF1ZW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoKGN1dFNlcXVlbmNlKSB7XHJcbiAgICAgICAgLy8gVE9ETzogVHlwZSBjaGVja1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5wdXNoKGN1dFNlcXVlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcmljZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXRTZXF1ZW5jZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLnVuY3V0UGllY2UucHJpY2UsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZXBDb3B5KCkge1xyXG4gICAgICAgIGxldCBjdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcyA9IFsuLi50aGlzLmN1dFNlcXVlbmNlc107XHJcbiAgICAgICAgcmV0dXJuIGN1dExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF0ZXJpYWxMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGggaW4gbWF0ZXJpYWxMaXN0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdLnF1YW50aXR5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmljZTogY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsTGlzdE9iajtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGN1dExpc3QgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIGdldEN1dExpc3Q6IChyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXRMZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0TGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0TGVuZ3RoIHRoYXQgY2FuIGJlIGN1dCB3aXRoIHJlbWFpbmluZ0xlbmd0aCAoSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgJiYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0V2l0aEtlcmYgPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZCAtIEFsbCBjdXRMZW5ndGgra2VyZiBhcmUgbW9yZSB0aGFuIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDdXRQaWVjZSA9IGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2Uoc2VsZWN0ZWRDdXRQaWVjZUluZGV4LCAxKV07XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2UsIFxyXG4gICAgICAgICAgICAuLi5jdXRMaXN0LmdldEN1dExpc3QoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3Q7XHJcbiIsImltcG9ydCB7IEN1dExpc3QgfSBmcm9tIFwiLi9jdXRMaXN0LmpzXCI7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZSBmcm9tIFwiLi9jdXRTZXF1ZW5jZS5qc1wiO1xyXG5cclxuY29uc3QgY3V0TGlzdENhbGN1bGF0b3IgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG1heE51bUF2YWlsYWJsZUxlbmd0aHMgXHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIEhvdyB0byBnZXQgbnVtYmVyIGZyb20gY291bnRlcj9cclxuICAgICAqIG1heCA9IFs1LDQsMywyXVxyXG4gICAgICogcG9zc2liaWxpdGllcyA9IDYqNSo0KjMgPSAzNjBcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDAsMCwwXVxyXG4gICAgICogWzBdIDFcclxuICAgICAqIFszXSArM1xyXG4gICAgICogNFxyXG4gICAgICogLSBGaXJzdCBpbmRleCBpcyBsYXN0IG5vbi16ZXJvIGluZGV4LCBhZGQgZmlyc3QgaW5kZXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAqIDMgKyAxID0gNFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsMCwwLDBdXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogNSArIDEgPSA2XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMywyLDAsMF1cclxuICAgICAqIFswLDBdIDFcclxuICAgICAqIFs1LDBdICs1XHJcbiAgICAgKiBbMCwxXSArMVxyXG4gICAgICogWzUsMV0gKzVcclxuICAgICAqIFswLDJdICsxXHJcbiAgICAgKiBbMywyXSArM1xyXG4gICAgICogMTZcclxuICAgICAqIFs1LDBdICs2XHJcbiAgICAgKiBbNSwxXSArNlxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDIpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDIgKiA2ID0gMTJcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICgzKzE9NClcclxuICAgICAqIDEyICsgNCA9IDE2XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSw0LDAsMF1cclxuICAgICAqIFs1LDBdICs2XHJcbiAgICAgKiBbNSwxXSArNlxyXG4gICAgICogWzUsMl0gKzZcclxuICAgICAqIFs1LDNdICs2XHJcbiAgICAgKiBbNSw0XSArNlxyXG4gICAgICogMzBcclxuICAgICAqIC0gRmlyc3Qgbm9uLXplcm8gaW5kZXggKDEpIHZhbHVlICg0KSAqIHByZXYgaW5kZXggKDApIGNvcnJlc3BvbmRpbmcgbWF4IHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA0ICogNiA9IDI0XHJcbiAgICAgKiAtIFBsdXMgZmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiAyNCArIDYgPSAzMFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzAsMCwxLDBdXHJcbiAgICAgKiBbNSw0LDAsMF0gKzMwXHJcbiAgICAgKiBbMCwwLDEsMF0gKzFcclxuICAgICAqIDMxXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDArMT0xKVxyXG4gICAgICogMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDEpIHZhbHVlICgwKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAwICogNiA9IDFcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMSkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAxICsgMSAqICg2KjUpID0gMzFcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMywyXVxyXG4gICAgICogMzYwXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogNlxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDEpIHZhbHVlICg0KSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDYgKyA0ICogNiA9IDMwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMikgdmFsdWUgKDMpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMzAgKyAzICogKDYqNSkgPSAzMCArIDMgKiAzMCA9IDEyMFxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDMpIHZhbHVlICgyKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEyMCArIDIgKiAoNio1KjQpID0gMTIwICsgMiAqIDEyMCA9IDEyMCArIDI0MCA9IDM2MFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKSB7XHJcbiAgICAgICAgLy8gSWYgYXJyYXkgaXMgZW1wdHkgcmV0dXJuIHplcm9cclxuICAgICAgICBpZiAoIW51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmxlbmd0aCkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIDA7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGFzdE5vblplcm9JbmRleCA9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbmRMYXN0SW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgLy8gSWYgbGFzdE5vblplcm9JbmRleCBpcyAtMSwgYWxsIHZhbHVlcyBvZiBhcnJheSBhcmUgemVyby4gUmV0dXJuIG9uZSBjb3VudC5cclxuICAgICAgICBpZiAobGFzdE5vblplcm9JbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBsYXN0Tm9uWmVyb0luZGV4ID49IDAgYWZ0ZXIgZmluZExhc3RJbmRleCgpIGNhbGxcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb3VudCB0byBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGxldCBjb3VudCA9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyWzBdICsgMTtcclxuXHJcbiAgICAgICAgLy8gRm9yIGV2ZXJ5IGluZGV4IGFmdGVyIHRoZSBmaXJzdCB1cCB0byBsYXN0Tm9uWmVyb0luZGV4LCBhZGQgdGhlIFxyXG4gICAgICAgIC8vIHByb2R1Y3Qgb2YgYWxsIHByZXZpb3VzIGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYXN0Tm9uWmVyb0luZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgY291bnQgKz0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaV0gKiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLnNsaWNlKDAsIGkpLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogKGN1cnIgKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKSB7XHJcbiAgICAgICAgY29uc3QgbnVtID0gZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1heExhc3ROb25aZXJvSW5kZXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLmZpbmRMYXN0SW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgY29uc3QgbWF4ID0gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAuc2xpY2UoMCwgbWF4TGFzdE5vblplcm9JbmRleCA9PT0gLTEgPyBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLmxlbmd0aCA6IG1heExhc3ROb25aZXJvSW5kZXggKyAxKVxyXG4gICAgICAgICAgICAubWFwKCh2YWwpID0+IHZhbCArIDEpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSAqIGN1cnIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAobnVtIC8gbWF4KSAqIDEwMDtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBOdW06ICR7bnVtfSAtIE1heDogJHttYXh9IC0gJSR7cGVyY2VudGFnZS50b0ZpeGVkKDIpfWApO1xyXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNraXAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBleC4gY3Vycj1bMSwzLDAsMF0gbWF4PVszLDQsNCw1XSByZXN1bHRzIGluIGEgdmFsaWQgY3V0IGxpc3QuXHJcbiAgICAgICAgICogTmV4dCBpbmNyZW1lbnRzIG9mIFsyLDMsMCwwXSBhbmQgWzMsMywwLDBdIHdpbGwgYWx3YXlzIGJlIG1vcmUgZXhwZW5zaXZlIHRoYW4gWzEsMywwLDBdLlxyXG4gICAgICAgICAqIE1ha2UgZmlyc3Qgbm9uLXplcm8gdmFsdWUgMCBhbmQgaW5jcmVtZW50IHZhbHVlIGFmdGVyLlxyXG4gICAgICAgICAqIFswLDQsMCwwXSAtPiBjb250aW51ZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBjb25zdCBmaXJzdE5vblplcm9WYWx1ZUluZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChmaXJzdE5vblplcm9WYWx1ZUluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gQXJyYXkgaXMgZW1wdHkgT1IgYWxsIHZhbHVlcyBhcmUgemVyb1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltmaXJzdE5vblplcm9WYWx1ZUluZGV4XSA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBmaXJzdCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlclxyXG4gICAgICAgIC8vIElmIG5ldyB2YWx1ZSBleGNlZWRzIHZhbHVlIGluIHNhbWUgaW5kZXggb2YgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAvLyBTZXQgaW5kZXggb2YgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgdG8gemVyb1xyXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgdmFsdWUgaW4gbmV4dCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlclxyXG4gICAgICAgICAgICAvLyBSZXBlYXQgdXNpbmcgcmVjdXJzaW9uXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHJlYWNoZWQgZW5kXHJcbiAgICAgICAgaWYgKGluZGV4ID49IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0rKztcclxuICAgICAgICBcclxuICAgICAgICBpZiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID4gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0pIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XS0tO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPCAwKSB7XHJcbiAgICAgICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsICsraW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKSB7XHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgY3V0UGllY2VzIGJ5IGN1dExlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5jdXRMZW5ndGggLSBhLmN1dExlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgYXZhaWxhYmxlTGVuZ3Roc0FyciBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgLy9hdmFpbGFibGVMZW5ndGhzQXJyLnNvcnQoKGEsYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHVuY3V0UGllY2VzIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbGVuZ3RoXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZWFjaCBhdmFpbGFibGUgbGVuZ3RocyBuZWVkZWQgaWYgb25seSB1c2VkIHRoYXQgXHJcbiAgICAgICAgLy8gYXZhaWxhYmxlIGxlbmd0aCBmb3IgYWxsIGN1dFBpZWNlcyAoaW5pdGlhbGl6ZWQgdG8gemVybylcclxuICAgICAgICBsZXQgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlLCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvL21heE51bSA9IE1hdGguY2VpbCh0b3RhbEN1dExlbmd0aCAvIHVuY3V0UGllY2UubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2UubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAgICAgLy8gVE9ETzogRG8gbm90IG5lZWQgbWF4TnVtLiBPbmx5IG5lZWQgdG8gY2hlY2sgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBhbmQgc3RpbGwgaW5jcmVtZW50IGNvdW50IGluIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gVE9ETzogSW5maW5pdGUgbG9vcCBpZiBjdXQgcGllY2UgaXMgbG9uZ2VyIHRoYW4gdW5jdXQgcGllY2UgbGVuZ3RoLiBBcnJheSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IG5ldmVyIHJlYWNoZXMgemVyby5cclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHJlbWFpbmluZyB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgICAgICAgICAgLy8gbm8gbW9yZSBjdXQgcGllY2VzIGNhbiBiZSB1c2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggbnVtYmVyIG9mIGNvcnJlc3BvbmRpbmcgVW5jdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdCBvbmx5IGlmIE5PIGF2YWlsYWJsZSBjdXQgcGllY2VzIHN0aWxsIGxlZnRcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICYmICgoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgc2tpcEZsYWc7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGYWN0b3JDb3VudGVyID0gMTtcclxuICAgICAgICBsZXQgcGVyY2VudE11bHRpcGxlRGlzcGxheSA9IDU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyKTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlICYmIHBlcmNlbnRhZ2UgPiAocGVyY2VudE11bHRpcGxlRGlzcGxheSAqIHBlcmNlbnRGYWN0b3JDb3VudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cGVyY2VudGFnZS50b0ZpeGVkKDApfSVgKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRGYWN0b3JDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBhdmFpbGFibGUgY3V0IHBpZWNlcywgbm90IGVub3VnaCB1bmN1dCBwaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgY3VycmVudCBjdXQgbGlzdCBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHNraXBGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjdXQgbGlzdCBpcyBiZXR0ZXIgaWYgTk8gdW51c2VkIHVuY3V0IHBpZWNlcyAodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIGhhcyBhbGwgemVybyB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSAmJiAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5ldyBCZXN0IEN1dCBMaXN0IC0gQmVzdDogJHtiZXN0Q3V0TGlzdC5nZXRQcmljZSgpfSAtIEN1cnI6ICR7Y3VyckN1dExpc3QuZ2V0UHJpY2UoKX0gLSBUb3RhbDogJHtudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn0gLSBMZWZ0OiAke3RlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcbiAgICAgICAgd2luZG93LmJlc3RDdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN1dExlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGN1dExlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXRMZW5ndGggPSBjdXRMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dExlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZSBmcm9tIFwiLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5jbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDdXRTZXF1ZW5jZSBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZX0gdW5jdXRQaWVjZSBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXRTZXF1ZW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2UubGVuZ3RoLCBcclxuICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHVuY3V0UGllY2UgbGVuZ3RoIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgLy8gZXZlcnkgaW5kaXZpZHVhbEN1dFBpZWNlIGlzIGxvbmdlciB0aGFuIHRoZSB1bmN1dFBpZWNlXHJcbiAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRTZXF1ZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dExlbmd0aCBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRMZW5ndGggPT0gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShpLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLCAwIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggb2YgbGFyZ2VzdCBjdXRMZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLkN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKFxyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nTGVuZ3RoIC0gc2VsZWN0ZWRDdXRQaWVjZS5jdXRXaXRoS2VyZiwgXHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0U2VxdWVuY2U7IiwiZXhwb3J0IGNsYXNzIENyb3NzU2VjdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3MgKHNtYWxsZXN0IGRpbWVuc2lvbikgb2YgcGllY2UgKGluY2hlcylcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCBXaWR0aCBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0aGlja25lc3MsIHdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlja25lc3M7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVW5jdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtDcm9zc1NlY3Rpb259IGNyb3NzU2VjdGlvbiBDcm9zcyBzZWN0aW9uIG9mIHVuY3V0IHBpZWNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY3Jvc3NTZWN0aW9uLCBsZW5ndGgsIHByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5jcm9zc1NlY3Rpb24gPSBjcm9zc1NlY3Rpb247XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRWxlbWVudCB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIEVsZW1lbnQgYXR0cmlidXRlIG5hbWVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIFxyXG4gKiBAcGFyYW0gIHsuLi5Ob2RlfSBjaGlsZHJlbiAtIFZhcmlhYmxlIG51bWJlciBvZiBjaGlsZCBub2RlcyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgICAvLyBQcm9wc1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hpbGRyZW4gTm9kZXNcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWxlbWVudC5hcHBlbmQoY2hpbGQpKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyB9XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTsgfVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGNvbnRlbnQ6IG5vbmU7IH1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7RUFhQyxTQUFTO0VBQ1QsVUFBVTtFQUNWLFNBQVM7RUFDVCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHdCQUF3QixFQUFBOztBQUV6QixnREFBQTtBQUNBOztFQUVDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGdCQUFnQixFQUFBOztBQUVqQjtFQUNDLFlBQVksRUFBQTs7QUFFYjs7RUFFQyxXQUFXO0VBQ1gsYUFBYSxFQUFBOztBQUVkO0VBQ0MseUJBQXlCO0VBQ3pCLGlCQUFpQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcbiAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7IH1cXG5cXG5odG1sIHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6IHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTsgfVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXFwiaGVhZGVyIGhlYWRlclxcXCJcXHIgXFxcIm1haW4gbWFpblxcXCJcXHIgXFxcImZvb3RlciBmb290ZXJcXFwiOyB9XFxuXFxuaGVhZGVyLFxcbm1haW4sXFxuZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDEuOHJlbTsgfVxcblxcbmhlYWRlciB7XFxuICBncmlkLWFyZWE6IGhlYWRlcjsgfVxcblxcbm1haW4ge1xcbiAgZ3JpZC1hcmVhOiBtYWluOyB9XFxuXFxuZm9vdGVyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZ3JpZC1hcmVhOiBmb290ZXI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsgfVxcblxcbiNjcmVhdGUtY3V0LWxpc3QtYnRuLWNvbnRhaW5lcixcXG4uY2xlYXItYnRuLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4uY3V0LXNlcXVlbmNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcbiAgLmN1dC1zZXF1ZW5jZTpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7IH1cXG5cXG4uaW5wdXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmlucHV0LWNvbnRhaW5lciBsYWJlbCwgLmlucHV0LWNvbnRhaW5lciBpbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW0gMDtcXG4gIG1hcmdpbjogMXJlbSAwOyB9XFxuICAucGllY2UtY3JlYXRlLWZvcm0gLmZvcm0taW5wdXRzIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gICAgY29sdW1uLWdhcDogMXJlbTsgfVxcbiAgICAucGllY2UtY3JlYXRlLWZvcm0gLmZvcm0taW5wdXRzIC5pbnB1dC1jb250YWluZXIge1xcbiAgICAgIGRpc3BsYXk6IGdyaWQ7IH1cXG4gIC5waWVjZS1jcmVhdGUtZm9ybSAuc3VibWl0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtaGVhZCxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLnVuY3V0LXBpZWNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgY29sdW1uLWdhcDogMXJlbTsgfVxcblxcbmgxLCBoMiwgaDMge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxudGFibGUge1xcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKG9kZCkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDlkOWQ5OyB9XFxuICB0YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQoZXZlbikge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmZiZmJmOyB9XFxuICB0YWJsZSB0aCwgdGFibGUgdGQge1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNJLDZCQUFhO0VBQ2IsNkJBQWEsRUFBQTs7QUFHakI7RUFDSSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBRXRCLCtCQUErQjtFQUMvQiwwQ0FBMEMsRUFBQTs7QUFHOUM7RUFDSSxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxpQkFBaUI7RUFDakIsd0lBQXdJO0VBQ3hJLGlCQUFpQjtFQUVqQixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLGlDQUFpQztFQUNqQyxrRUFHbUIsRUFBQTs7QUFHdkI7OztFQUdJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUIsRUFBQTs7QUFLckI7RUFDSSxlQUFlLEVBQUE7O0FBS25CO0VBQ0ksaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsbUJBQW1CLEVBQUE7O0FBS3ZCOztFQUVJLGFBQWE7RUFDYix1QkFBdUIsRUFBQTs7QUFhM0I7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQyxnQkFBZ0IsRUFBQTtFQUpwQjtJQU9RLDhDQUE4QyxFQUFBOztBQUl0RDtFQUNJLHFCQUFxQixFQUFBO0VBRHpCO0lBSVEsV0FBVyxFQUFBOztBQUluQjtFQUNJLDBDQUEwQztFQUMxQyxlQUFlO0VBQ2YsY0FBYyxFQUFBO0VBSGxCO0lBTVEsYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxnQkFBZ0IsRUFBQTtJQVJ4QjtNQVdZLGFBQWEsRUFBQTtFQVh6QjtJQWdCUSxhQUFhO0lBQ2IsdUJBQXVCLEVBQUE7O0FBSS9COzs7RUFJUSxhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLGdCQUFnQixFQUFBOztBQWN4QjtFQUNJLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBDQUEwQztFQUMxQyxrQkFBa0IsRUFBQTtFQUx0QjtJQVNZLHlCQUFpQyxFQUFBO0VBVDdDO0lBYVkseUJBQWlDLEVBQUE7RUFiN0M7SUFrQlEsb0JBQW9CO0lBQ3BCLDBDQUEwQyxFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcclxcbiAgICAtLWJhc2UtYmxhY2s6IGhzbCgwLCAwJSwgMTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNjIuNSU7IC8vIDFyZW0gPSAxMHB4XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTtcXHJcXG59XFxyXFxuXFxyXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxyXFxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXHJcXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcclxcbiAgICAgICAgXFxcImhlYWRlciBoZWFkZXJcXFwiXFxyXFxuICAgICAgICBcXFwibWFpbiBtYWluXFxcIlxcclxcbiAgICAgICAgXFxcImZvb3RlciBmb290ZXJcXFwiO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIsIFxcclxcbm1haW4sIFxcclxcbmZvb3RlciB7XFxyXFxuICAgIHBhZGRpbmc6IDEuOHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gSGVhZGVyXFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiBoZWFkZXI7XFxyXFxufVxcclxcblxcclxcbi8vIE1haW4gQ29udGVudFxcclxcblxcclxcbm1haW4ge1xcclxcbiAgICBncmlkLWFyZWE6IG1haW47XFxyXFxufVxcclxcblxcclxcbi8vIEZvb3RlclxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgICBncmlkLWFyZWE6IGZvb3RlcjtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3VzdG9tIElEc1xcclxcblxcclxcbiNjcmVhdGUtY3V0LWxpc3QtYnRuLWNvbnRhaW5lcixcXHJcXG4uY2xlYXItYnRuLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jY3V0LXBpZWNlLWNyZWF0ZS1mb3JtIHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI3VuY3V0LXBpZWNlLWNyZWF0ZS1mb3JtIHtcXHJcXG4gICAgXFxyXFxufVxcclxcblxcclxcbi8vIEN1c3RvbSBDbGFzc2VzXFxyXFxuXFxyXFxuLmN1dC1zZXF1ZW5jZSB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXHJcXG5cXHJcXG4gICAgJjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuXFxyXFxuICAgIGxhYmVsLCBpbnB1dCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtY3JlYXRlLWZvcm0ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIHBhZGRpbmc6IDFyZW0gMDtcXHJcXG4gICAgbWFyZ2luOiAxcmVtIDA7XFxyXFxuXFxyXFxuICAgIC5mb3JtLWlucHV0cyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXHJcXG4gICAgICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuXFxyXFxuICAgICAgICAuaW5wdXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zdWJtaXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtbGlzdCB7XFxyXFxuICAgIC5waWVjZS1saXN0LWhlYWQsIFxcclxcbiAgICAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSA+IC51bmN1dC1waWVjZSB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXHJcXG4gICAgICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBpZWNlLWxpc3QtaGVhZCB7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSB7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gTWlzY1xcclxcblxcclxcbmgxLCBoMiwgaDMge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbnRhYmxlIHtcXHJcXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgICB0Ym9keSB7XFxyXFxuICAgICAgICB0cjpudGgtY2hpbGQob2RkKSB7XFxyXFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCA4NSUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDc1JSk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgdGgsIHRkIHtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJfcmVzZXQuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZXMuc2Nzcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tICcuL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzJztcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gJy4vanMvY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge0Nyb3NzU2VjdGlvbiwgVW5jdXRQaWVjZX0gZnJvbSAnLi9qcy91bmN1dFBpZWNlLmpzJztcclxuaW1wb3J0IHtjdXRMaXN0fSBmcm9tICcuL2pzL2N1dExpc3QuanMnO1xyXG5pbXBvcnQgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQgZnJvbSAnLi9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBnZXRDdXRMaXN0V2l0aExlYXN0TGVmdG92ZXJNYXRlcmlhbChjdXRQaWVjZXMsIHBvc3NpYmxlTGVuZ3Roc0Fycikge1xyXG4gICAgICAgIC8vIFNvcnQgY3V0UGllY2VzIGJ5IGN1dExlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5jdXRMZW5ndGggLSBhLmN1dExlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgYSBzaW5nbGUgcXVhbnRpdHkgY3V0UGllY2VcclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIG5vcm1hbCBhcnJheSBvZiBjdXRQaWVjZXMgdGhhdCBoYXMgYW55IG51bWJlciBxdWFudGl0eSBpbiB0aGVcclxuICAgICAgICAvLyAncXVhbnRpdHknIHByb3BlcnR5LlxyXG4gICAgICAgIGxldCBpbmRpdmlkdWFsQ3V0UGllY2VzID0gY3V0UGllY2VzLmZsYXRNYXAoKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoY3V0UGllY2UucXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAuZmlsbChjdXRQaWVjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggaW4gY29ycmVzcG9uZGluZyBcclxuICAgICAgICAvLyBpbmRpdmlkdWFsQ3V0UGllY2VzIGFycmF5LiBJZiBhIGluZGl2aWR1YWwgQ3V0UGllY2UgaXMgc2VsZWN0ZWQgZm9yIFxyXG4gICAgICAgIC8vIGEgY3V0IHNlcXVlbmNlLCBpdCdzIGluZGV4IGlzIHJlbW92ZWQgZnJvbSB0aGlzIGFycmF5LlxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBjdXJyQ3V0U2VxdWVuY2UsIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBiZXN0Q3V0O1xyXG4gICAgICAgIGxldCBmaW5hbEN1dExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJlc3RDdXQgPSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcG9zc2libGVMZW5ndGhzQXJyLmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbIC4uLmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0U2VxdWVuY2UgPSBjdXRMaXN0LmdldEN1dExpc3QobGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICgoYmVzdEN1dC5jdXRTZXF1ZW5jZSA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IChiZXN0Q3V0LmN1dFNlcXVlbmNlWy0xXSA+IGN1cnJDdXRTZXF1ZW5jZVstMV0pXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmN1dFNlcXVlbmNlID0gY3VyckN1dFNlcXVlbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RDdXQuYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsuLi50ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmluYWxDdXRMaXN0LnB1c2goYmVzdEN1dC5jdXRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbIC4uLmJlc3RDdXQuYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbEN1dExpc3QpO1xyXG5cclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIGZpcnN0IHBvc3NpYmxlIGxlbmd0aFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBiZXN0Q3V0TGlzdCB0byBmaXJzdCBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCBjdXQgbGlzdCBmb3IgbmV4dCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBJZiBuZXcgY3V0IGxpc3QgaGFzIGxlc3MgcmVtYWluaW5nIGxlbmd0aCB0aGFuIGJlc3RDdXRMaXN0LCBzZXQgXHJcbiAgICAgICAgLy8gYmVzdEN1dExpc3QgdG8gbmV3IGN1dCBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSByZWFjaCBlbmQgb2YgcG9zc2libGUgbGVuZ3RoIGFycmF5LCBzYXZlIGJlc3RDdXRMaXN0IHRvIGZpbmFsIGN1dCBsaXN0IHNlcXVlbmNlXHJcblxyXG4gICAgICAgIC8vIFJlcGVhdCBvbmNlIGFnYWluIHdpdGggcmVtYWluaW5nIGluZGl2aWR1YWxDdXRQaWVjZXNcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogRXhhbXBsZScpO1xyXG5cclxuICAgIGxldCBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE5Ljg3NSwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM5Ljg3NSwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDQ5Ljg3NSwgMyksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjJ4NCA9IG5ldyBDcm9zc1NlY3Rpb24oMiw0KTtcclxuICAgIGxldCB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogU2VlLVNhdycpO1xyXG4gICAgXHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzUrNS8xNiwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDMwKzIxLzMyLCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMjIuNSwgNCksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjR4NCA9IG5ldyBDcm9zc1NlY3Rpb24oNCw0KTtcclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgNzIsIDEyMjgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgOTYsIDE1NDgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgMTIwLCAyMjM4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDE0NCwgMjc0OCksXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuaW5pdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFNhdyBIb3JzZXMnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzNiwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDMyKzEvOCwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM0LCAyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogV29vZCBTaGVkJyk7XHJcblxyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTQ0LCA0NjIpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTYqMTIsIDYxNiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxNSoxMisxMSwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzQsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA3KjEyLCAzMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDguNSwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDUqMTIrMTAsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzksIDYpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzExLjUsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBJU1NVRTogVmVyeSBsb25nIHRpbWVcclxuICAgIC8vZGVidWdnZXI7XHJcbiAgICAvL2N1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3IgPSBjdXRMaXN0Q2FsY3VsYXRvcjtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbIkZvb3RlciIsIkN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCIsIlVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IiwiQ3V0UGllY2VDb21wb25lbnQiLCJDdXRQaWVjZUxpc3RDb21wb25lbnQiLCJVbmN1dFBpZWNlQ29tcG9uZW50IiwiVW5jdXRQaWVjZUxpc3RDb21wb25lbnQiLCJDdXRMaXN0Q29tcG9uZW50IiwiY3V0TGlzdENhbGN1bGF0b3IiLCJDdXRQaWVjZSIsIlVuY3V0UGllY2UiLCJDcm9zc1NlY3Rpb24iLCJjcmVhdGVFbGVtZW50IiwiY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQiLCJjdXRQaWVjZXMiLCJ1bmN1dFBpZWNlcyIsImJlc3RDdXRMaXN0IiwiY3V0TGlzdEVsZW1lbnQiLCJjdXRQaWVjZUxpc3RDb21wb25lbnQiLCJ1bmN1dFBpZWNlTGlzdENvbXBvbmVudCIsImN1dExpc3RDb21wb25lbnQiLCJpbml0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWFpbkVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ3V0UGllY2VMaXN0Q2xlYXIiLCJyZW5kZXIiLCJoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQiLCJoYW5kbGVVbmN1dFBpZWNlTGlzdENsZWFyIiwiaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQiLCJmb3JFYWNoIiwiY3V0UGllY2UiLCJhZGRDdXRQaWVjZSIsInVuY3V0UGllY2UiLCJhZGRVbmN1dFBpZWNlIiwiY3JlYXRlQ3V0TGlzdEJ0biIsImhhbmRsZUNyZWF0ZUN1dExpc3RDbGljayIsInB1c2giLCJhZGRDdXRQaWVjZUNvbXBvbmVudCIsImFkZFVuY3V0UGllY2VDb21wb25lbnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJOdW1iZXIiLCJ0YXJnZXQiLCJlbGVtZW50cyIsIm5hbWVkSXRlbSIsInZhbHVlIiwiZ2V0Q2hlYXBlc3RDdXRMaXN0IiwiY3V0TGlzdCIsImNvbnNvbGUiLCJsb2ciLCJjbGVhciIsIkN1dFNlcXVlbmNlQ29tcG9uZW50IiwiZWxlbWVudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm1hdGVyaWFsTGlzdFRhYmxlIiwibWF0ZXJpYWxMaXN0IiwiZ2V0TWF0ZXJpYWxMaXN0IiwibWF0ZXJpYWxMaXN0VGFibGVCb2R5IiwidG90YWxQcmljZSIsInVuY3V0TGVuZ3RoIiwidW5jdXRPYmoiLCJPYmplY3QiLCJlbnRyaWVzIiwicXVhbnRpdHkiLCJ1bml0UHJpY2UiLCJ0b0ZpeGVkIiwiY3V0U2VxdWVuY2VzVGFibGUiLCJjdXRTZXF1ZW5jZXNUYWJsZUJvZHkiLCJjdXRTZXF1ZW5jZXMiLCJjdXRTZXF1ZW5jZSIsImFwcGVuZCIsIm5ld0N1dExpc3QiLCJ0aGlja25lc3MiLCJ3aWR0aCIsImN1dExlbmd0aCIsImtlcmYiLCJoYW5kbGVGb3JtU3VibWl0IiwiZm9ybUVsZW1lbnQiLCJmb3JtSW5wdXRzRWxlbWVudCIsInVwZGF0ZUZvcm0iLCJpbnB1dEVsZW1lbnQiLCJpbnB1dE5hbWUiLCJpbmRleCIsImFyciIsImRlZmF1bHRWYWx1ZSIsImZvY3VzIiwiY3V0UGllY2VDb21wb25lbnRzIiwiY3V0UGllY2VMaXN0RWxlbWVudCIsIl9sZW4iLCJjdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsIkFycmF5IiwiX2tleSIsImN1dFBpZWNlQ29tcG9uZW50Iiwicm93RWxlbWVudHMiLCJ0ZW1wUm93RWxlbWVudCIsImNyb3NzU2VjdGlvbiIsInJlbWFpbmluZ0xlbmd0aCIsImNvcHlyaWdodFllYXIiLCJmb290ZXIiLCJjdXJyWWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRlbXBFbGVtZW50IiwiaWQiLCJwcmljZSIsInVuY3V0UGllY2VDb21wb25lbnRzIiwidW5jdXRQaWVjZUxpc3RFbGVtZW50IiwidW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsInVuY3V0UGllY2VDb21wb25lbnQiLCJDdXRMaXN0IiwiY29uc3RydWN0b3IiLCJnZXRQcmljZSIsInJlZHVjZSIsImFjY3VtIiwiY3VyciIsImRlZXBDb3B5IiwibWF0ZXJpYWxMaXN0T2JqIiwiZ2V0Q3V0TGlzdCIsImluZGl2aWR1YWxDdXRQaWVjZXMiLCJhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Iiwic3RhcnRJbmRleCIsInNlbGVjdGVkQ3V0UGllY2VJbmRleCIsImkiLCJzcGxpY2UiLCJjdXRXaXRoS2VyZiIsInNlbGVjdGVkQ3V0UGllY2UiLCJDdXRTZXF1ZW5jZSIsImdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQiLCJudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciIsIm1heE51bUF2YWlsYWJsZUxlbmd0aHMiLCJsYXN0Tm9uWmVyb0luZGV4IiwiZmluZExhc3RJbmRleCIsInZhbCIsImNvdW50Iiwic2xpY2UiLCJnZXRQZXJjZW50YWdlIiwibnVtIiwibWF4TGFzdE5vblplcm9JbmRleCIsIm1heCIsIm1hcCIsInBlcmNlbnRhZ2UiLCJza2lwIiwiZmlyc3ROb25aZXJvVmFsdWVJbmRleCIsImZpbmRJbmRleCIsImluY3JlbWVudCIsImRlY3JlbWVudCIsInNvcnQiLCJhIiwiYiIsImZsYXRNYXAiLCJmaWxsIiwiY3V0U2VxdWVuY2VBcnIiLCJjdXJyQ3V0TGlzdCIsImZyb20iLCJjcmVhdGVDdXRTZXF1ZW5jZUFyciIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwic2tpcEZsYWciLCJwZXJjZW50RmFjdG9yQ291bnRlciIsInBlcmNlbnRNdWx0aXBsZURpc3BsYXkiLCJmaWx0ZXIiLCJ3aW5kb3ciLCJ0b1N0cmluZyIsImNyZWF0ZUN1dFNlcXVlbmNlIiwidHlwZSIsInByb3BzIiwia2V5Iiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwicG9zc2libGVMZW5ndGhzQXJyIiwiY3VyckN1dFNlcXVlbmNlIiwidGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJiZXN0Q3V0IiwiZmluYWxDdXRMaXN0IiwiY3Jvc3NTZWN0aW9uMng0IiwiY3Jvc3NTZWN0aW9uNHg0Il0sInNvdXJjZVJvb3QiOiIifQ==