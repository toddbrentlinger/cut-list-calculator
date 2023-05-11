/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/confirmModalComponent.js":
/*!****************************************************!*\
  !*** ./src/js/components/confirmModalComponent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmModalComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function ConfirmModalComponent(handleAccept) {
  let questionText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Are you sure?';
  let acceptText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Yes';
  let rejectText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'No';
  let element;
  const handleAcceptClick = function (e) {
    console.log('Modal Accept Click');
    element.remove();
    handleAccept(e);
  };
  const handleRejectClick = function (e) {
    console.log('Modal Reject Click');
    element.remove();
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'modal'
      });
      element.addEventListener('click', handleRejectClick);
    } else {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
    const acceptBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, acceptText);
    const rejectBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, rejectText);

    // Add event listeners
    acceptBtn.addEventListener('click', handleAcceptClick);
    rejectBtn.addEventListener('click', handleRejectClick);

    // Modal Content
    const modalContent = element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'modal-content'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', {}, questionText), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'modal-content-btn-container'
    }, acceptBtn, rejectBtn)));

    // Prevents click listener on modal container element from activating that closes modal
    // whenever user clicks inside modal content element instead.
    modalContent.addEventListener('click', e => e.stopPropagation());
    return element;
  };
  return {
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutListCalculatorComponent.js":
/*!*********************************************************!*\
  !*** ./src/js/components/cutListCalculatorComponent.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _footerComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footerComponent.js */ "./src/js/components/footerComponent.js");
/* harmony import */ var _cutPieceSectionComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPieceSectionComponent.js */ "./src/js/components/cutPieceSectionComponent.js");
/* harmony import */ var _uncutPieceSectionComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uncutPieceSectionComponent.js */ "./src/js/components/uncutPieceSectionComponent.js");
/* harmony import */ var _cutListComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cutListComponent.js */ "./src/js/components/cutListComponent.js");
/* harmony import */ var _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cutListCalculator.js */ "./src/js/cutListCalculator.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");






const cutListCalculatorComponent = (() => {
  const cutPieceSectionComponent = (0,_cutPieceSectionComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const uncutPieceSectionComponent = (0,_uncutPieceSectionComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  let bestCutList;
  let cutListComponent;
  let cutListErrorElement;
  function init() {
    let initCutPieces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let initUncutPieces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let initBestCutList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    bestCutList = initBestCutList;
    let mainElement = document.querySelector('main');
    if (mainElement === null) {
      mainElement = document.createElement('main');
      document.body.appendChild(mainElement);
    }

    // Description
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_5__.createElement)('p', {}, 'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of lumber needed and provides the cut sequence for each uncut piece.'));

    // Add cut/uncut pieces section
    mainElement.appendChild(cutPieceSectionComponent.render());
    mainElement.appendChild(uncutPieceSectionComponent.render());

    // Add any cut/uncut pieces passed as parameters
    initCutPieces.forEach(cutPiece => cutPieceSectionComponent.addCutPiece(cutPiece));
    initUncutPieces.forEach(uncutPiece => uncutPieceSectionComponent.addUncutPiece(uncutPiece));

    // Add button that creates cut list with click event listener
    const createCutListBtn = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_5__.createElement)('div', {
      'id': 'create-cut-list-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_5__.createElement)('button', {
      'id': 'create-cut-list-btn'
    }, 'Create Cut List'));
    createCutListBtn.addEventListener('click', handleCreateCutListClick);

    // Add error message for cut list calculator button
    cutListErrorElement = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_5__.createElement)('div', {
      'id': 'create-cut-list-error-msg',
      'class': 'hide'
    }));

    // Add calculated cut list
    cutListComponent = (0,_cutListComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
    mainElement.appendChild(cutListComponent.render());

    // Add footer component, passing in the first year of the app
    document.body.appendChild((0,_footerComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2023).render());
  }
  function handleCreateCutListClick() {
    const cutPieces = cutPieceSectionComponent.getCutPieces();
    const uncutPieces = uncutPieceSectionComponent.getUncutPieces();
    if (!cutPieces.length) {
      // No cutpieces
      showCutListError('Add cut pieces to create a new cut list');
      return;
    }
    if (!uncutPieces.length) {
      // No uncut pieces
      showCutListError('Add uncut pieces to create a new cut list');
      return;
    }

    // If reach here, no errors to show. Remove any previous errors.
    clearCutListError();
    bestCutList = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_4__["default"].getCheapestCutList(cutPieces, uncutPieces);
    // bestCutList = cutListCalculator.getCheapestCutList(
    //     cutPieceListComponent.getPieces(), 
    //     uncutPieceListComponent.getPieces()
    // );

    cutListComponent.cutList = bestCutList;
  }
  function showCutListError(errorMsg) {
    cutListErrorElement.classList.remove('hide');
    cutListErrorElement.textContent = errorMsg;
  }
  function clearCutListError() {
    cutListErrorElement.classList.add('hide');
    cutListErrorElement.textContent = '';
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
    let currPrice;
    for (const [uncutLength, uncutObj] of Object.entries(materialList)) {
      currPrice = uncutObj.quantity * uncutObj.unitPrice;
      materialListTableBody.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('tr', {}, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, uncutObj.unitPrice), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, currPrice.toFixed(2))));
      totalPrice += currPrice;
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
      element.scrollIntoView();
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
/* harmony import */ var _cutPieceEditFormComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutPieceEditFormComponent.js */ "./src/js/components/cutPieceEditFormComponent.js");


function CutPieceComponent(cutPiece, editCallback, deleteCallback) {
  let element;
  const handleEditClick = function () {
    clearElement();
    element.appendChild((0,_cutPieceEditFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cutPiece, handleEditConfirm, handleEditCancel).render());
  };
  const handleEditConfirm = function (e) {
    e.preventDefault();
    editCallback(e, cutPiece);

    // Change cutPiece values to form input values
    cutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
    cutPiece.width = Number(e.target.elements.namedItem('width').value);
    cutPiece.length = Number(e.target.elements.namedItem('length').value);
    cutPiece.quantity = Number(e.target.elements.namedItem('quantity').value);
    cutPiece.kerf = Number(e.target.elements.namedItem('kerf').value);
    render();
  };
  const handleEditCancel = function () {
    render();
  };
  const handleDeleteClick = function () {
    deleteCallback(cutPiece);
  };
  const remove = function () {
    element.remove();
  };
  const clearElement = function () {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'cut-piece'
      });
    } else {
      clearElement();
    }
    const editBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Edit');
    const deleteBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Delete');

    // Add event listeners for buttons
    editBtn.addEventListener('click', handleEditClick);
    deleteBtn.addEventListener('click', handleDeleteClick);
    element.append((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.length), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.kerf), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-btn-container'
    }, editBtn, deleteBtn));
    return element;
  };
  return {
    get cutPiece() {
      return cutPiece;
    },
    remove,
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
      'class': 'piece-form'
    });
    let tempInputElement;

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-inputs'
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
      'size': '1',
      'required': 'true'
    }), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', {
      'class': 'error',
      'aria-live': 'polite'
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
      'size': '1',
      'required': 'true'
    })));

    // Form - Form Inputs - Length
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'cut-length',
      'size': '1',
      'required': 'true'
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-length'
    }, 'Length:'), tempInputElement));

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
      'min': '1',
      'required': 'true'
    })));

    // Form - Form Inputs - Kerf
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'kerf',
      'id': 'cut-kerf',
      'value': '0.125',
      'size': '1',
      'required': 'true'
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-kerf'
    }, 'Kerf:'), tempInputElement));

    // Form - Form Submit Container
    formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-btn-container'
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

/***/ "./src/js/components/cutPieceEditFormComponent.js":
/*!********************************************************!*\
  !*** ./src/js/components/cutPieceEditFormComponent.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutPieceEditFormComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function CutPieceEditFormComponent(cutPiece, handleEditConfirm, handleEditCancel) {
  let formElement;
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'cut-piece-edit',
      'id': 'cut-piece-edit-form',
      'class': 'piece-form'
    });
    let tempInputElement;

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-inputs'
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
      'size': '1',
      'required': 'true',
      'value': cutPiece.thickness
    }), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', {
      'class': 'error',
      'aria-live': 'polite'
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
      'size': '1',
      'required': 'true',
      'value': cutPiece.width
    })));

    // Form - Form Inputs - Length
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'cut-length',
      'size': '1',
      'required': 'true',
      'value': cutPiece.length
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-length'
    }, 'Length:'), tempInputElement));

    // Form - Form Inputs - Quantity
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-quantity'
    }, 'Quantity:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'number',
      'name': 'quantity',
      'id': 'cut-quantity',
      'min': '1',
      'required': 'true',
      'value': cutPiece.quantity
    })));

    // Form - Form Inputs - Kerf
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'kerf',
      'id': 'cut-kerf',
      'size': '1',
      'required': 'true',
      'value': cutPiece.kerf
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-kerf'
    }, 'Kerf:'), tempInputElement));

    // Form - Button Container
    const formBtnContainer = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-btn-container'
    }));

    // Form - Submit/Edit Confirm
    formBtnContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'submit',
      'value': 'Update'
    }));

    // Add submit event listener
    formElement.addEventListener('submit', e => {
      if (handleEditConfirm !== undefined) {
        handleEditConfirm(e);
      }
    });

    // Form - Cancel/Exit
    formBtnContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      'type': 'button'
    }, 'Cancel')).addEventListener('click', e => {
      if (handleEditCancel !== undefined) {
        handleEditCancel(e);
      }
    });
    return formElement;
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
    // Add cut piece components to array
    cutPieceComponents.push(...cutPieceComponentsToAdd);

    // Add cut piece components to DOM
    for (const cutPieceComponent of cutPieceComponentsToAdd) {
      cutPieceListElement.appendChild(cutPieceComponent.render());
    }
  };
  const removeCutPieceComponent = function () {
    let index;
    for (var _len2 = arguments.length, cutPieceComponentsToRemove = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      cutPieceComponentsToRemove[_key2] = arguments[_key2];
    }
    for (const cutPieceComponent of cutPieceComponentsToRemove) {
      index = cutPieceComponents.indexOf(cutPieceComponent);
      if (index < 0) {
        continue;
      }

      // Remove cut piece component from DOM
      cutPieceComponent.remove();

      // Remove cut piece component from array
      cutPieceComponents.splice(index, 1);
    }
  };
  const removeCutPiece = function () {
    let index;
    for (var _len3 = arguments.length, cutPiecesToRemove = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      cutPiecesToRemove[_key3] = arguments[_key3];
    }
    for (const cutPieceToRemove of cutPiecesToRemove) {
      index = cutPieceComponents.findIndex(cutPieceComponent => cutPieceComponent.cutPiece === cutPieceToRemove);
      if (index < 0) {
        continue;
      }

      // Remove cut piece component from DOM
      cutPieceComponents[index].remove();

      // Remove cut piece component from array
      cutPieceComponents.splice(index, 1);
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
  const getPieces = function () {
    return cutPieceComponents.map(cutPieceComponent => {
      return cutPieceComponent.cutPiece;
    });
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
    getPieces,
    removeCutPiece,
    removeCutPieceComponent,
    render
  };
}

/***/ }),

/***/ "./src/js/components/cutPieceSectionComponent.js":
/*!*******************************************************!*\
  !*** ./src/js/components/cutPieceSectionComponent.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CutPieceSectionComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");
/* harmony import */ var _confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmModalComponent.js */ "./src/js/components/confirmModalComponent.js");
/* harmony import */ var _cutPiece_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cutPiece.js */ "./src/js/cutPiece.js");
/* harmony import */ var _cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cutPieceComponent.js */ "./src/js/components/cutPieceComponent.js");
/* harmony import */ var _cutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cutPieceCreateFormComponent.js */ "./src/js/components/cutPieceCreateFormComponent.js");
/* harmony import */ var _cutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cutPieceListComponent.js */ "./src/js/components/cutPieceListComponent.js");






function CutPieceSectionComponent() {
  let element;
  const cutPieceListComponent = (0,_cutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const getCutPieces = function () {
    return cutPieceListComponent.getPieces();
  };
  const addCutPiece = function (cutPiece) {
    cutPieceListComponent.addCutPieceComponent((0,_cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cutPiece, handleCutPieceEditClick, handleCutPieceDeleteClick));
    return cutPiece;
  };
  const removeCutPiece = function (cutPieceToRemove) {
    cutPieceListComponent.removeCutPiece(cutPieceToRemove);
  };
  const handleCutPieceAddFormSubmit = function (e) {
    e.preventDefault();

    // Create CutPiece from form inputs
    const cutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_2__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));
    addCutPiece(cutPiece);
  };
  const handleCutPieceEditClick = function (e, oldCutPiece) {
    // Create a new CutPiece from form input values
    const newCutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_2__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));

    // Check that new CutPiece is not a duplicate thickness x width x length combo
    cutPieceListComponent.getPieces().forEach(cutPiece => {
      if (cutPiece !== oldCutPiece && cutPiece === newCutPiece) {
        return;
      }
    });

    // If reach here, new CutPiece is valid
  };

  const handleCutPieceDeleteClick = function (cutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
      handleCutPieceDeleteConfirm(cutPieceToDelete);
    }, 'Are you sure you want to delete the cut piece?').render());
  };
  const handleCutPieceDeleteConfirm = function (cutPieceToDelete) {
    removeCutPiece(cutPieceToDelete);
  };
  const handleCutPieceListClear = function () {
    // Clear cut pieces displayed
    cutPieceListComponent.clear();
  };
  const clearElement = function () {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('section', {
        'class': 'piece-section'
      });
    } else {
      clearElement();
    }

    // Piece Header
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h2', {}, 'Cut Pieces:'));

    // Piece Clear Button
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'clear-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      'class': 'clear-btn'
    }, 'Clear All Cut Pieces')).addEventListener('click', handleCutPieceListClear);

    // Pieces List
    element.appendChild(cutPieceListComponent.render());

    // Piece Create Form
    element.appendChild((0,_cutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(handleCutPieceAddFormSubmit).render());
    return element;
  };
  return {
    addCutPiece,
    getCutPieces,
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
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, `${cutSequence.uncutPiece.thickness}x${cutSequence.uncutPiece.width}x${cutSequence.uncutPiece.length}`));
      } else if (index === 1) {
        tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {
          'rowspan': arr.length - 1
        }));
      }

      // Cut Pieces
      tempRowElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('td', {}, cutPiece.length));

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

/***/ "./src/js/components/footerComponent.js":
/*!**********************************************!*\
  !*** ./src/js/components/footerComponent.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function FooterComponent(copyrightYear) {
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
/* harmony import */ var _uncutPieceEditFormComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uncutPieceEditFormComponent.js */ "./src/js/components/uncutPieceEditFormComponent.js");


function UncutPieceComponent(uncutPiece, editCallback, deleteCallback) {
  let element;
  const handleEditClick = function () {
    clearElement();
    element.appendChild((0,_uncutPieceEditFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(uncutPiece, handleEditConfirm, handleEditCancel).render());
  };
  const handleEditConfirm = function (e) {
    e.preventDefault();
    editCallback(e, uncutPiece);

    // Change uncutPiece values to form input values
    uncutPiece.thickness = Number(e.target.elements.namedItem('thickness').value);
    uncutPiece.width = Number(e.target.elements.namedItem('width').value);
    uncutPiece.length = Number(e.target.elements.namedItem('length').value);
    uncutPiece.price = Number(e.target.elements.namedItem('price').value);
    render();
  };
  const handleEditCancel = function () {
    render();
  };
  const handleDeleteClick = function () {
    deleteCallback(uncutPiece);
  };
  const remove = function () {
    element.remove();
  };
  const clearElement = function () {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'uncut-piece'
      });
    } else {
      clearElement();
    }
    const editBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Edit');
    const deleteBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Delete');

    // Add event listeners for buttons
    editBtn.addEventListener('click', handleEditClick);
    deleteBtn.addEventListener('click', handleDeleteClick);
    element.append((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.length), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.price), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-btn-container'
    }, editBtn, deleteBtn));
    return element;
  };
  return {
    get uncutPiece() {
      return uncutPiece;
    },
    remove,
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
      'class': 'piece-form'
    });
    let tempInputElement;

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-inputs'
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
      'size': '1',
      'required': 'true'
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
      'size': '1',
      'required': 'true'
    })));

    // Form - Form Inputs - Length
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'uncut-length',
      'size': '1',
      'required': 'true'
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-length'
    }, 'Length:'), tempInputElement));

    // Form - Form Inputs - Price
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'price',
      'id': 'uncut-price',
      'size': '1',
      'required': 'true'
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidPrice)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-price'
    }, 'Price:'), tempInputElement));

    // Form - Form Submit Container
    formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-btn-container'
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

/***/ "./src/js/components/uncutPieceEditFormComponent.js":
/*!**********************************************************!*\
  !*** ./src/js/components/uncutPieceEditFormComponent.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UncutPieceEditFormComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");

function UncutPieceEditFormComponent(uncutPiece, handleEditConfirm, handleEditCancel) {
  let formElement;
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'uncut-piece-edit',
      'id': 'uncut-piece-edit-form',
      'class': 'piece-form'
    });
    let tempInputElement;

    // Form - Form Inputs
    const formInputsElement = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-inputs'
    }));

    // Form - Form Inputs - Thickness
    // Form - Form Inputs - Thickness
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-thickness'
    }, 'Thickness:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'thickness',
      'id': 'uncut-thickness',
      'size': '1',
      'required': 'true',
      'value': uncutPiece.thickness
    })));

    // Form - Form Inputs - Width
    // Form - Form Inputs - Width
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-width'
    }, 'Width:'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'width',
      'id': 'uncut-width',
      'size': '1',
      'required': 'true',
      'value': uncutPiece.width
    })));

    // Form - Form Inputs - Length
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'length',
      'id': 'uncut-length',
      'size': '1',
      'required': 'true',
      'value': uncutPiece.length
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidLength)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-length'
    }, 'Length:'), tempInputElement));

    // Form - Form Inputs - Price
    tempInputElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'text',
      'name': 'price',
      'id': 'uncut-price',
      'size': '1',
      'required': 'true',
      'value': uncutPiece.price
    });
    // Add input listener that adds custom validity if input value is NOT valid
    tempInputElement.addEventListener('input', e => (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.isInputValidPrice)(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-price'
    }, 'Price:'), tempInputElement));

    // Form - Button Container
    const formBtnContainer = formElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'piece-form-btn-container'
    }));

    // Form - Submit/Edit Confirm
    formBtnContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      'type': 'submit',
      'value': 'Update'
    }));

    // Add submit event listener
    formElement.addEventListener('submit', e => {
      if (handleEditConfirm !== undefined) {
        handleEditConfirm(e);
      }
    });

    // Form - Cancel/Exit
    formBtnContainer.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      'type': 'button'
    }, 'Cancel')).addEventListener('click', e => {
      if (handleEditCancel !== undefined) {
        handleEditCancel(e);
      }
    });
    return formElement;
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
  const removeUncutPieceComponent = function () {
    let index;
    for (var _len2 = arguments.length, uncutPieceComponentsToRemove = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      uncutPieceComponentsToRemove[_key2] = arguments[_key2];
    }
    for (const uncutPieceComponent of uncutPieceComponentsToRemove) {
      index = uncutPieceComponents.indexOf(uncutPieceComponent);
      if (index < 0) {
        continue;
      }

      // Remove uncut piece component from DOM
      uncutPieceComponent.remove();

      // Remove uncut piece component from array
      uncutPieceComponents.splice(index, 1);
    }
  };
  const removeUncutPiece = function () {
    let index;
    for (var _len3 = arguments.length, uncutPiecesToRemove = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      uncutPiecesToRemove[_key3] = arguments[_key3];
    }
    for (const uncutPieceToRemove of uncutPiecesToRemove) {
      index = uncutPieceComponents.findIndex(uncutPieceComponent => uncutPieceComponent.uncutPiece === uncutPieceToRemove);
      if (index < 0) {
        continue;
      }

      // Remove uncut piece component from DOM
      uncutPieceComponents[index].remove();

      // Remove uncut piece component from array
      uncutPieceComponents.splice(index, 1);
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
  const getPieces = function () {
    return uncutPieceComponents.map(uncutPieceComponent => {
      return uncutPieceComponent.uncutPiece;
    });
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
    getPieces,
    removeUncutPiece,
    removeUncutPieceComponent,
    render
  };
}

/***/ }),

/***/ "./src/js/components/uncutPieceSectionComponent.js":
/*!*********************************************************!*\
  !*** ./src/js/components/uncutPieceSectionComponent.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UncutPieceSectionComponent)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities.js */ "./src/js/utilities.js");
/* harmony import */ var _confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmModalComponent.js */ "./src/js/components/confirmModalComponent.js");
/* harmony import */ var _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uncutPiece.js */ "./src/js/uncutPiece.js");
/* harmony import */ var _uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uncutPieceComponent.js */ "./src/js/components/uncutPieceComponent.js");
/* harmony import */ var _uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uncutPieceCreateFormComponent.js */ "./src/js/components/uncutPieceCreateFormComponent.js");
/* harmony import */ var _uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uncutPieceListComponent.js */ "./src/js/components/uncutPieceListComponent.js");






function UncutPieceSectionComponent() {
  let element;
  const uncutPieceListComponent = (0,_uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const getUncutPieces = function () {
    return uncutPieceListComponent.getPieces();
  };
  const addUncutPiece = function (uncutPiece) {
    uncutPieceListComponent.addUncutPieceComponent((0,_uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(uncutPiece, handleUncutPieceEditClick, handleUncutPieceDeleteClick));
    return uncutPiece;
  };
  const removeUncutPiece = function (uncutPieceToRemove) {
    uncutPieceListComponent.removeUncutPiece(uncutPieceToRemove);
  };
  const handleUncutPieceAddFormSubmit = function (e) {
    e.preventDefault();

    // Create UncutPiece from form inputs
    const uncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));
    addUncutPiece(uncutPiece);
  };
  const handleUncutPieceEditClick = function (e, oldUncutPiece) {
    // Create a new UncutPiece from form input values
    const newUncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_2__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));

    // Check that new UncutPiece is not a duplicate thickness x width x length combo
    uncutPieceListComponent.getPieces().forEach(uncutPiece => {
      if (uncutPiece !== oldUncutPiece && uncutPiece === newUncutPiece) {
        return;
      }
    });

    // If reach here, new UncutPiece is valid
  };

  const handleUncutPieceDeleteClick = function (uncutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
      handleUncutPieceDeleteConfirm(uncutPieceToDelete);
    }, 'Are you sure you want to delete the uncut piece?').render());
  };
  const handleUncutPieceDeleteConfirm = function (uncutPieceToDelete) {
    removeUncutPiece(uncutPieceToDelete);
  };
  const handleUncutPieceListClear = function () {
    // Clear uncut pieces displayed
    uncutPieceListComponent.clear();
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('section', {
        'class': 'piece-section'
      });
    } else {
      clearElement();
    }

    // Uncut Pieces - Header
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('h2', {}, 'Uncut Pieces:'));

    // Uncut Pieces - Clear Button
    element.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'clear-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      'class': 'clear-btn'
    }, 'Clear All Uncut Pieces')).addEventListener('click', handleUncutPieceListClear);

    // Uncut Pieces - List
    element.appendChild(uncutPieceListComponent.render());

    // Uncut Pieces - Create Form
    element.appendChild((0,_uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(handleUncutPieceAddFormSubmit).render());
    return element;
  };
  return {
    addUncutPiece,
    getUncutPieces,
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
/* harmony import */ var _cutSequence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cutSequence.js */ "./src/js/cutSequence.js");



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
  function getCheapestCutList(cutPieces, uncutPieces) {
    // Check for empty pieces
    if (!cutPieces.length || !uncutPieces) {
      return;
    }
    bestCutList = undefined;

    // Sort cutPieces by cut length in decreasing order
    cutPieces.sort((a, b) => b.length - a.length);

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

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "isInputValidLength": () => (/* binding */ isInputValidLength),
/* harmony export */   "isInputValidPrice": () => (/* binding */ isInputValidPrice)
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%);\n  --primary: #96642c;\n  --secondary: orange;\n  --hover: hsl(0, 0%, 50%);\n  --active: hsl(0, 0%, 25%);\n  --success: green;\n  --info: gray;\n  --warning: orange;\n  --danger: red; }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main;\n  display: grid;\n  gap: 1em; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container,\n.clear-btn-container {\n  display: grid;\n  justify-content: center; }\n\n#create-cut-list-error-msg {\n  display: grid;\n  justify-items: center;\n  align-items: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column;\n  border: 2px solid var(--base-black, black);\n  border-top: none; }\n  .cut-sequence:first-child {\n    border-top: 2px solid var(--base-black, black); }\n\n.hide {\n  display: none; }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    width: 100%; }\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n  display: grid;\n  align-items: center;\n  justify-items: center; }\n\n.modal-content {\n  background-color: #fefefe;\n  padding: 2rem;\n  border: 1px solid #888;\n  width: 80%;\n  height: 50%;\n  display: grid;\n  justify-content: center;\n  align-content: space-evenly; }\n\n.modal-content-btn-container,\n.piece-btn-container {\n  display: grid;\n  grid-auto-flow: column;\n  gap: 1em; }\n\n.piece-form,\n.piece-list {\n  border: 2px solid var(--base-black, black); }\n\n.piece-form .piece-form-inputs {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem;\n  justify-items: center;\n  align-items: center; }\n  .piece-form .piece-form-inputs .input-container {\n    display: grid; }\n\n.piece-form .piece-form-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem;\n  justify-items: center;\n  align-items: center; }\n\n.piece-list-body .cut-piece:nth-child(odd),\n.piece-list-body .uncut-piece:nth-child(odd) {\n  background-color: #d9d9d9; }\n\n.piece-list-body .cut-piece:nth-child(even),\n.piece-list-body .uncut-piece:nth-child(even) {\n  background-color: #bfbfbf; }\n\nh1, h2, h3 {\n  text-align: center; }\n\nh1 {\n  font-size: 1.7em; }\n\nh2 {\n  font-size: 1.5em; }\n\nh3 {\n  font-size: 1.2em; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n  table tbody tr:nth-child(odd) {\n    background-color: #d9d9d9; }\n  table tbody tr:nth-child(even) {\n    background-color: #bfbfbf; }\n  table th, table td {\n    padding: 0.5rem 1rem;\n    border: 2px solid var(--base-black, black); }\n\nbutton, input[type=submit] {\n  appearance: none;\n  border: 1px solid var(--base-black, black);\n  text-decoration: none;\n  cursor: pointer; }\n  button:hover, input[type=submit]:hover {\n    background-color: var(--hover, gray);\n    color: var(--base-white, white); }\n  button:active, input[type=submit]:active {\n    background-color: var(--active, #404040); }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAUA;EACI,6BAAa;EACb,6BAAa;EAEb,kBAAU;EACV,mBAAY;EAEZ,wBAAQ;EACR,yBAAS;EAET,gBAAU;EACV,YAAO;EACP,iBAAU;EACV,aAAS,EAAA;;AAGb;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe;EACf,aAAa;EACb,QAAQ,EAAA;;AAKZ;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;;EAEI,aAAa;EACb,uBAAuB,EAAA;;AAG3B;EACI,aAAa;EACb,qBAAqB;EACrB,mBAAmB,EAAA;;AAKvB;EACI,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gBAAgB,EAAA;EAJpB;IAOQ,8CAA8C,EAAA;;AAItD;EACI,aAAa,EAAA;;AAGjB;EACI,qBAAqB,EAAA;EADzB;IAIQ,WAAW,EAAA;;AAInB;EAEI,eAAe;EACf,UAAU;EACV,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,cAAc;EACd,uBAA8B;EAC9B,oCAAoC;EAEpC,aAAa;EACb,mBAAmB;EACnB,qBAAqB,EAAA;;AAGzB;EACI,yBAAyB;EAEzB,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,WAAW;EAEX,aAAa;EACb,uBAAuB;EACvB,2BAA2B,EAAA;;AAG/B;;EAEI,aAAa;EACb,sBAAsB;EACtB,QAAQ,EAAA;;AAGZ;;EAEI,0CAA0C,EAAA;;AAI9C;EAhKI,aAAa;EACb,qCAA6C;EAC7C,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB,EAAA;EA4JvB;IAQY,aAAa,EAAA;;AARzB;EAaQ,aAAa;EACb,uBAAuB,EAAA;;AAI/B;;;EAlLI,aAAa;EACb,qCAA6C;EAC7C,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB,EAAA;;AAwLvB;;EAGQ,yBAAiC,EAAA;;AAHzC;;EAQQ,yBAAiC,EAAA;;AAMzC;EACI,kBAAkB,EAAA;;AAGtB;EACI,gBAAgB,EAAA;;AAGpB;EACI,gBAAgB,EAAA;;AAIpB;EACI,gBAAgB,EAAA;;AAIpB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA;EALtB;IASY,yBAAiC,EAAA;EAT7C;IAaY,yBAAiC,EAAA;EAb7C;IAkBQ,oBAAoB;IACpB,0CAA0C,EAAA;;AAIlD;EACI,gBAAgB;EAChB,0CAA0C;EAC1C,qBAAqB;EACrB,eAAe,EAAA;EAJnB;IAOQ,oCAA+C;IAC/C,+BAA+B,EAAA;EARvC;IAYQ,wCAAgD,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n@mixin baseGrid($nColumns: 6) {\r\n    display: grid;\r\n    grid-template-columns: repeat($nColumns, 1fr);\r\n    column-gap: 1rem;\r\n    justify-items: center;\r\n    align-items: center;\r\n}\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n\r\n    --primary: #96642c;\r\n    --secondary: orange;\r\n\r\n    --hover: hsl(0, 0%, 50%);\r\n    --active: hsl(0, 0%, 25%);\r\n\r\n    --success: green;\r\n    --info: gray;\r\n    --warning: orange;\r\n    --danger: red;\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n    display: grid;\r\n    gap: 1em;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container,\r\n.clear-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n#create-cut-list-error-msg {\r\n    display: grid;\r\n    justify-items: center;\r\n    align-items: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    border: 2px solid var(--base-black, black);\r\n    border-top: none;\r\n\r\n    &:first-child {\r\n        border-top: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.modal {\r\n    //display: none; // Hidden by default\r\n    position: fixed; // Stay in place\r\n    z-index: 1; // Sit on top\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%; // Full width\r\n    height: 100%; // Full height\r\n    overflow: auto; // Enable scroll if needed\r\n    background-color: rgb(0, 0, 0); // Fallback color\r\n    background-color: rgba(0, 0, 0, 0.4); // Black w/ opacity\r\n    // Grid\r\n    display: grid;\r\n    align-items: center;\r\n    justify-items: center;\r\n}\r\n\r\n.modal-content {\r\n    background-color: #fefefe;\r\n    //margin: 15% auto; // 15% from the top and centered\r\n    padding: 2rem;\r\n    border: 1px solid #888;\r\n    width: 80%; // Could be more or less, depending on screen size\r\n    height: 50%;\r\n    // Grid\r\n    display: grid;\r\n    justify-content: center;\r\n    align-content: space-evenly;\r\n}\r\n\r\n.modal-content-btn-container,\r\n.piece-btn-container {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    gap: 1em;\r\n}\r\n\r\n.piece-form, \r\n.piece-list {\r\n    border: 2px solid var(--base-black, black);\r\n    //margin: 1rem 0;\r\n}\r\n\r\n.piece-form {\r\n    // border: 2px solid var(--base-black, black);\r\n    // margin: 1rem 0;\r\n\r\n    .piece-form-inputs {\r\n        @include baseGrid;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .piece-form-btn-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    // border: 2px solid var(--base-black, black);\r\n\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        @include baseGrid;\r\n    }\r\n}\r\n\r\n.piece-list-body {\r\n    .cut-piece:nth-child(odd),\r\n    .uncut-piece:nth-child(odd) {\r\n        background-color: hsl(0, 0%, 85%);\r\n    }\r\n\r\n    .cut-piece:nth-child(even),\r\n    .uncut-piece:nth-child(even) {\r\n        background-color: hsl(0, 0%, 75%);\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2, h3 {\r\n    text-align: center;\r\n}\r\n\r\nh1 {\r\n    font-size: 1.7em;\r\n}\r\n\r\nh2 {\r\n    font-size: 1.5em;\r\n    //margin: 0.83em 0;\r\n}\r\n\r\nh3 {\r\n    font-size: 1.2em;\r\n    //margin: 1em 0;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n\r\n    tbody {\r\n        tr:nth-child(odd) {\r\n            background-color: hsl(0, 0%, 85%);\r\n        }\r\n\r\n        tr:nth-child(even) {\r\n            background-color: hsl(0, 0%, 75%);\r\n        }\r\n    }\r\n\r\n    th, td {\r\n        padding: 0.5rem 1rem;\r\n        border: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\nbutton, input[type=submit] {\r\n    appearance: none;\r\n    border: 1px solid var(--base-black, black);\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n\r\n    &:hover {\r\n        background-color: var(--hover, hsl(0, 0%, 50%));\r\n        color: var(--base-white, white);\r\n    }\r\n\r\n    &:active {\r\n        background-color: var(--active, hsl(0, 0%, 25%));\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
    // Sort cutPieces by length in decreasing order
    cutPieces.sort((a, b) => b.length - a.length);

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
  let uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 144, 462)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: See-Saw');
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 36, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 35 + 5 / 16, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 30 + 21 / 32, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](4, 4, 22.5, 4)];
  const crossSection4x4 = new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.CrossSection(4, 4);
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(4, 4, 72, 12.28), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(4, 4, 96, 15.48), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(4, 4, 120, 22.38), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(4, 4, 144, 27.48)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);
  _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].init(cutPieces, uncutPieces);
  window.cutListCalculatorComponent = _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"];

  // ------------------------------------------------------------------------

  console.log('Test: Saw Horses');
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 144, 462)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 36, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 32 + 1 / 8, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 34, 2)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);

  // ------------------------------------------------------------------------

  console.log('Test: Wood Shed');
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 48, 275), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 96, 298), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 120, 386), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 144, 462), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(2, 4, 16 * 12, 616)];
  cutPieces = [new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 15 * 12 + 11, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 15 * 12 + 4, 2), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 7 * 12, 32), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 8.5, 8), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 5 * 12 + 10, 4), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 2 * 12 + 9, 6), new _js_cutPiece_js__WEBPACK_IMPORTED_MODULE_3__["default"](2, 4, 2 * 12 + 11.5, 2)];

  // ISSUE: Very long time
  //debugger;
  //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

  window.cutListCalculator = _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"];
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUFpRyxNQUFNLENBQUNuTixpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2NvbmZpcm1Nb2RhbENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRTZXF1ZW5jZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvZm9vdGVyQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUVkaXRGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZVNlY3Rpb25Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdENhbGN1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFNlcXVlbmNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdW5jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzP2IzMGYiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3M/MjAzYiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbmZpcm1Nb2RhbENvbXBvbmVudChoYW5kbGVBY2NlcHQsIHF1ZXN0aW9uVGV4dCA9ICdBcmUgeW91IHN1cmU/JywgYWNjZXB0VGV4dCA9ICdZZXMnLCByZWplY3RUZXh0ID0gJ05vJykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUFjY2VwdENsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNb2RhbCBBY2NlcHQgQ2xpY2snKTtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIGhhbmRsZUFjY2VwdChlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVqZWN0Q2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIFJlamVjdCBDbGljaycpO1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ21vZGFsJ30pO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVqZWN0Q2xpY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhY2NlcHRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgYWNjZXB0VGV4dCk7XHJcbiAgICAgICAgY29uc3QgcmVqZWN0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sIHJlamVjdFRleHQpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgYWNjZXB0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQWNjZXB0Q2xpY2spO1xyXG4gICAgICAgIHJlamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVJlamVjdENsaWNrKTtcclxuXHJcbiAgICAgICAgLy8gTW9kYWwgQ29udGVudFxyXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdtb2RhbC1jb250ZW50J30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdwJywge30sIHF1ZXN0aW9uVGV4dCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnbW9kYWwtY29udGVudC1idG4tY29udGFpbmVyJ30sXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRCdG4sXHJcbiAgICAgICAgICAgICAgICByZWplY3RCdG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBQcmV2ZW50cyBjbGljayBsaXN0ZW5lciBvbiBtb2RhbCBjb250YWluZXIgZWxlbWVudCBmcm9tIGFjdGl2YXRpbmcgdGhhdCBjbG9zZXMgbW9kYWxcclxuICAgICAgICAvLyB3aGVuZXZlciB1c2VyIGNsaWNrcyBpbnNpZGUgbW9kYWwgY29udGVudCBlbGVtZW50IGluc3RlYWQuXHJcbiAgICAgICAgbW9kYWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCBGb290ZXJDb21wb25lbnQgZnJvbSBcIi4vZm9vdGVyQ29tcG9uZW50LmpzXCI7XHJcblxyXG5pbXBvcnQgQ3V0UGllY2VTZWN0aW9uQ29tcG9uZW50IGZyb20gXCIuL2N1dFBpZWNlU2VjdGlvbkNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZVNlY3Rpb25Db21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZVNlY3Rpb25Db21wb25lbnQuanNcIjtcclxuXHJcbmltcG9ydCBDdXRMaXN0Q29tcG9uZW50IGZyb20gXCIuL2N1dExpc3RDb21wb25lbnQuanNcIjtcclxuXHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tIFwiLi4vY3V0TGlzdENhbGN1bGF0b3IuanNcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXRQaWVjZVNlY3Rpb25Db21wb25lbnQgPSBDdXRQaWVjZVNlY3Rpb25Db21wb25lbnQoKTtcclxuICAgIGNvbnN0IHVuY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50ID0gVW5jdXRQaWVjZVNlY3Rpb25Db21wb25lbnQoKTtcclxuXHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcbiAgICBcclxuICAgIGxldCBjdXRMaXN0Q29tcG9uZW50O1xyXG4gICAgbGV0IGN1dExpc3RFcnJvckVsZW1lbnQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChpbml0Q3V0UGllY2VzID0gW10sIGluaXRVbmN1dFBpZWNlcyA9IFtdLCBpbml0QmVzdEN1dExpc3QgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IGluaXRCZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xyXG4gICAgICAgIGlmIChtYWluRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXNjcmlwdGlvblxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgXHJcbiAgICAgICAgICAgICdEaW1lbnNpb25hbCBsdW1iZXIgY29tZXMgaW4gcHJlLWRldGVybWluZWQgbGVuZ3RocyB3aXRoIHRoZWlyIG93biBpbmRpdmlkdWFsIHByaWNlcyAoVW5jdXQgUGllY2VzKS4gR2l2ZW4gdGhlIGN1dCBsZW5ndGhzIG9mIGRpbWVuc2lvbmFsIGx1bWJlciByZXF1aXJlZCBmb3IgeW91ciBwcm9qZWN0IChDdXQgUGllY2VzKSBhbmQgdGhlIGF2YWlsYWJsZSBwcmUtZGV0ZXJtaW5lZCBsZW5ndGhzLCB0aGlzIGFwcCBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBhbW91bnQgb2YgbHVtYmVyIG5lZWRlZCBhbmQgcHJvdmlkZXMgdGhlIGN1dCBzZXF1ZW5jZSBmb3IgZWFjaCB1bmN1dCBwaWVjZS4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQvdW5jdXQgcGllY2VzIHNlY3Rpb25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjdXRQaWVjZVNlY3Rpb25Db21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKHVuY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50LnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGFueSBjdXQvdW5jdXQgcGllY2VzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgaW5pdEN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSkgPT4gY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50LmFkZEN1dFBpZWNlKGN1dFBpZWNlKSk7XHJcbiAgICAgICAgaW5pdFVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UpID0+IHVuY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50LmFkZFVuY3V0UGllY2UodW5jdXRQaWVjZSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYnV0dG9uIHRoYXQgY3JlYXRlcyBjdXQgbGlzdCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQ3V0TGlzdEJ0biA9IG1haW5FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydpZCc6ICdjcmVhdGUtY3V0LWxpc3QtYnRuJ30sICdDcmVhdGUgQ3V0IExpc3QnKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY3JlYXRlQ3V0TGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljayk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBlcnJvciBtZXNzYWdlIGZvciBjdXQgbGlzdCBjYWxjdWxhdG9yIGJ1dHRvblxyXG4gICAgICAgIGN1dExpc3RFcnJvckVsZW1lbnQgPSBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydpZCc6ICdjcmVhdGUtY3V0LWxpc3QtZXJyb3ItbXNnJywgJ2NsYXNzJzogJ2hpZGUnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgY2FsY3VsYXRlZCBjdXQgbGlzdFxyXG4gICAgICAgIGN1dExpc3RDb21wb25lbnQgPSBDdXRMaXN0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0TGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBmb290ZXIgY29tcG9uZW50LCBwYXNzaW5nIGluIHRoZSBmaXJzdCB5ZWFyIG9mIHRoZSBhcHBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEZvb3RlckNvbXBvbmVudCgyMDIzKS5yZW5kZXIoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljaygpIHtcclxuICAgICAgICBjb25zdCBjdXRQaWVjZXMgPSBjdXRQaWVjZVNlY3Rpb25Db21wb25lbnQuZ2V0Q3V0UGllY2VzKCk7XHJcbiAgICAgICAgY29uc3QgdW5jdXRQaWVjZXMgPSB1bmN1dFBpZWNlU2VjdGlvbkNvbXBvbmVudC5nZXRVbmN1dFBpZWNlcygpO1xyXG5cclxuICAgICAgICBpZiAoIWN1dFBpZWNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8gTm8gY3V0cGllY2VzXHJcbiAgICAgICAgICAgIHNob3dDdXRMaXN0RXJyb3IoJ0FkZCBjdXQgcGllY2VzIHRvIGNyZWF0ZSBhIG5ldyBjdXQgbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdW5jdXRQaWVjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHVuY3V0IHBpZWNlc1xyXG4gICAgICAgICAgICBzaG93Q3V0TGlzdEVycm9yKCdBZGQgdW5jdXQgcGllY2VzIHRvIGNyZWF0ZSBhIG5ldyBjdXQgbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBubyBlcnJvcnMgdG8gc2hvdy4gUmVtb3ZlIGFueSBwcmV2aW91cyBlcnJvcnMuXHJcbiAgICAgICAgY2xlYXJDdXRMaXN0RXJyb3IoKTtcclxuXHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoXHJcbiAgICAgICAgICAgIGN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VzXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBiZXN0Q3V0TGlzdCA9IGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChcclxuICAgICAgICAvLyAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LmdldFBpZWNlcygpLCBcclxuICAgICAgICAvLyAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKClcclxuICAgICAgICAvLyApO1xyXG5cclxuICAgICAgICBjdXRMaXN0Q29tcG9uZW50LmN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93Q3V0TGlzdEVycm9yKGVycm9yTXNnKSB7XHJcbiAgICAgICAgY3V0TGlzdEVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgY3V0TGlzdEVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTXNnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyQ3V0TGlzdEVycm9yKCkge1xyXG4gICAgICAgIGN1dExpc3RFcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgIGN1dExpc3RFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQsXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQ7XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZUNvbXBvbmVudCBmcm9tIFwiLi9jdXRTZXF1ZW5jZUNvbXBvbmVudC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0TGlzdENvbXBvbmVudChjdXRMaXN0KSB7XHJcbiAgICBsZXQgZWxlbWVudDtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3V0LWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3V0TGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gSGVhZGVyXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMycsIHt9LCAnTWF0ZXJpYWwgTGlzdDonKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlXHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0VGFibGUgPSBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGUgSGVhZFxyXG4gICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbmN1dCBMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1VuaXQgUHJpY2UnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1N1bSBQcmljZScpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHlcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3QgPSBjdXRMaXN0LmdldE1hdGVyaWFsTGlzdCgpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdFRhYmxlQm9keSA9IG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xyXG4gICAgICAgIGxldCB0b3RhbFByaWNlID0gMDtcclxuICAgICAgICBsZXQgY3VyclByaWNlO1xyXG4gICAgICAgIGZvciAoY29uc3QgW3VuY3V0TGVuZ3RoLCB1bmN1dE9ial0gb2YgT2JqZWN0LmVudHJpZXMobWF0ZXJpYWxMaXN0KSkge1xyXG4gICAgICAgICAgICBjdXJyUHJpY2UgPSB1bmN1dE9iai5xdWFudGl0eSAqIHVuY3V0T2JqLnVuaXRQcmljZTtcclxuICAgICAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGVCb2R5LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRPYmoucXVhbnRpdHkpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdW5jdXRPYmoudW5pdFByaWNlKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGN1cnJQcmljZS50b0ZpeGVkKDIpKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgdG90YWxQcmljZSArPSBjdXJyUHJpY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGUgQm9keSAtIFRvdGFsIFByaWNlXHJcbiAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywgeydjb2xzcGFuJzogJzInfSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdyb3cnfSwgJ1RvdGFsIFByaWNlJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHRvdGFsUHJpY2UudG9GaXhlZCgyKSlcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlc1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDMnLCB7fSwgJ0N1dCBTZXF1ZW5jZXM6JykpO1xyXG5cclxuICAgICAgICAvLyBDdXQgU2VxdWVuY2VzIC0gVGFibGVcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZXNUYWJsZSA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XHJcblxyXG4gICAgICAgIC8vIEN1dCBTZXF1ZW5jZXMgLSBUYWJsZSBIZWFkXHJcbiAgICAgICAgY3V0U2VxdWVuY2VzVGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndGhlYWQnLCB7fSwgXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnVW5jdXQgTWVtYmVyJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdDdXQgTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdSZW1haW5pbmcgTGVuZ3RoJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGUgQm9keVxyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlc1RhYmxlQm9keSA9IGN1dFNlcXVlbmNlc1RhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzLmZvckVhY2goKGN1dFNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGN1dFNlcXVlbmNlc1RhYmxlQm9keS5hcHBlbmQoLi4uQ3V0U2VxdWVuY2VDb21wb25lbnQoY3V0U2VxdWVuY2UpLnJlbmRlcigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgICAgICBnZXQgY3V0TGlzdCgpIHsgcmV0dXJuIGN1dExpc3Q7IH0sXHJcbiAgICAgICAgc2V0IGN1dExpc3QobmV3Q3V0TGlzdCkgeyBcclxuICAgICAgICAgICAgY3V0TGlzdCA9IG5ld0N1dExpc3Q7XHJcbiAgICAgICAgICAgIGNsZWFyKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UsIGVkaXRDYWxsYmFjaywgZGVsZXRlQ2FsbGJhY2spIHtcclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgXHJcbiAgICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjbGVhckVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudChjdXRQaWVjZSwgaGFuZGxlRWRpdENvbmZpcm0sIGhhbmRsZUVkaXRDYW5jZWwpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENvbmZpcm0gPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBlZGl0Q2FsbGJhY2soZSwgY3V0UGllY2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoYW5nZSBjdXRQaWVjZSB2YWx1ZXMgdG8gZm9ybSBpbnB1dCB2YWx1ZXNcclxuICAgICAgICBjdXRQaWVjZS50aGlja25lc3MgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSk7XHJcbiAgICAgICAgY3V0UGllY2Uud2lkdGggPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKTtcclxuICAgICAgICBjdXRQaWVjZS5sZW5ndGggPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSk7XHJcbiAgICAgICAgY3V0UGllY2UucXVhbnRpdHkgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdxdWFudGl0eScpLnZhbHVlKTtcclxuICAgICAgICBjdXRQaWVjZS5rZXJmID0gTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgna2VyZicpLnZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVEZWxldGVDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlbGV0ZUNhbGxiYWNrKGN1dFBpZWNlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xlYXJFbGVtZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2N1dC1waWVjZSd9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhckVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZWRpdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHt9LCAnRWRpdCcpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHt9LCAnRGVsZXRlJyk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGJ1dHRvbnNcclxuICAgICAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRWRpdENsaWNrKTtcclxuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEZWxldGVDbGljayk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UudGhpY2tuZXNzKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLmxlbmd0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS5xdWFudGl0eSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS5rZXJmKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1idG4tY29udGFpbmVyJ30sXHJcbiAgICAgICAgICAgICAgICBlZGl0QnRuLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlQnRuIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgY3V0UGllY2UoKSB7IHJldHVybiBjdXRQaWVjZTsgfSxcclxuICAgICAgICByZW1vdmUsXHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBpc0lucHV0VmFsaWRMZW5ndGggfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlRm9ybVN1Ym1pdCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ2N1dC1waWVjZS1jcmVhdGUnLFxyXG4gICAgICAgICAgICAnaWQnOiAnY3V0LXBpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWZvcm0nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCB0ZW1wSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHNcclxuICAgICAgICBjb25zdCBmb3JtSW5wdXRzRWxlbWVudCA9IGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0taW5wdXRzJ30pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtdGhpY2tuZXNzJ30sICdUaGlja25lc3M6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAndGhpY2tuZXNzJywgJ2lkJzogJ2N1dC10aGlja25lc3MnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdzcGFuJywgeydjbGFzcyc6ICdlcnJvcicsICdhcmlhLWxpdmUnOiAncG9saXRlJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXdpZHRoJ30sICdXaWR0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd3aWR0aCcsICdpZCc6ICdjdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIExlbmd0aFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnbGVuZ3RoJywgJ2lkJzogJ2N1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSk7XHJcbiAgICAgICAgLy8gQWRkIGlucHV0IGxpc3RlbmVyIHRoYXQgYWRkcyBjdXN0b20gdmFsaWRpdHkgaWYgaW5wdXQgdmFsdWUgaXMgTk9UIHZhbGlkXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiBpc0lucHV0VmFsaWRMZW5ndGgoZS50YXJnZXQpKTtcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFF1YW50aXR5XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtcXVhbnRpdHknfSwgJ1F1YW50aXR5OicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnbnVtYmVyJywgJ25hbWUnOiAncXVhbnRpdHknLCAnaWQnOiAnY3V0LXF1YW50aXR5JywgJ3ZhbHVlJzogJzEnLCAnbWluJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gS2VyZlxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAna2VyZicsICdpZCc6ICdjdXQta2VyZicsICd2YWx1ZSc6ICcwLjEyNScsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWtlcmYnfSwgJ0tlcmY6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBTdWJtaXQgQ29udGFpbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtZm9ybS1idG4tY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnc3VibWl0JywgJ3ZhbHVlJzogJ0FkZCd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHN1Ym1pdCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVGb3JtU3VibWl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUZvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpbnB1dCBmaWVsZHMgZm9yIGN1dCBsZW5ndGggYW5kIHF1YW50aXR5LCBsZWF2aW5nIG90aGVyIGlucHV0cyB3aXRoIHVzZXIgZW50ZXJlZCBkYXRhLlxyXG4gICAgICAgIC8vIEZvY3VzIGN1cnNvciBvbiBsYXN0IGlucHV0IHdoaWNoIHNob3VsZCBiZSBjdXQgbGVuZ3RoIGZpZWxkXHJcbiAgICAgICAgWydxdWFudGl0eScsICdsZW5ndGgnXS5mb3JFYWNoKChpbnB1dE5hbWUsIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50ID0gZm9ybUVsZW1lbnQuZWxlbWVudHMubmFtZWRJdGVtKGlucHV0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IGlucHV0RWxlbWVudC5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBpc0lucHV0VmFsaWRMZW5ndGggfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUVkaXRGb3JtQ29tcG9uZW50KGN1dFBpZWNlLCBoYW5kbGVFZGl0Q29uZmlybSwgaGFuZGxlRWRpdENhbmNlbCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ2N1dC1waWVjZS1lZGl0JyxcclxuICAgICAgICAgICAgJ2lkJzogJ2N1dC1waWVjZS1lZGl0LWZvcm0nLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiAncGllY2UtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXBJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAnY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZScsICd2YWx1ZSc6IGN1dFBpZWNlLnRoaWNrbmVzc30pLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnc3BhbicsIHsnY2xhc3MnOiAnZXJyb3InLCAnYXJpYS1saXZlJzogJ3BvbGl0ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gV2lkdGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAnY3V0LXdpZHRoJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogY3V0UGllY2Uud2lkdGh9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAnY3V0LWxlbmd0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZScsICd2YWx1ZSc6IGN1dFBpZWNlLmxlbmd0aH0pO1xyXG4gICAgICAgIC8vIEFkZCBpbnB1dCBsaXN0ZW5lciB0aGF0IGFkZHMgY3VzdG9tIHZhbGlkaXR5IGlmIGlucHV0IHZhbHVlIGlzIE5PVCB2YWxpZFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtbGVuZ3RoJ30sICdMZW5ndGg6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBRdWFudGl0eVxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXF1YW50aXR5J30sICdRdWFudGl0eTonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ251bWJlcicsICduYW1lJzogJ3F1YW50aXR5JywgJ2lkJzogJ2N1dC1xdWFudGl0eScsICdtaW4nOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogY3V0UGllY2UucXVhbnRpdHl9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gS2VyZlxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAna2VyZicsICdpZCc6ICdjdXQta2VyZicsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZScsICd2YWx1ZSc6IGN1dFBpZWNlLmtlcmZ9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWtlcmYnfSwgJ0tlcmY6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gQnV0dG9uIENvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGZvcm1CdG5Db250YWluZXIgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1mb3JtLWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gU3VibWl0L0VkaXQgQ29uZmlybVxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdVcGRhdGUnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUVkaXRDb25maXJtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDb25maXJtKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBDYW5jZWwvRXhpdFxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsndHlwZSc6ICdidXR0b24nfSwgJ0NhbmNlbCcpXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVFZGl0Q2FuY2VsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDYW5jZWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlTGlzdENvbXBvbmVudCgpIHtcclxuICAgIGxldCBjdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIGxldCBjdXRQaWVjZUxpc3RFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGFkZEN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4uY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAvLyBBZGQgY3V0IHBpZWNlIGNvbXBvbmVudHMgdG8gYXJyYXlcclxuICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMucHVzaCguLi5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQgcGllY2UgY29tcG9uZW50cyB0byBET01cclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlQ29tcG9uZW50IG9mIGN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlQ3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlQ29tcG9uZW50IG9mIGN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gY3V0UGllY2VDb21wb25lbnRzLmluZGV4T2YoY3V0UGllY2VDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIERPTVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudC5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZUN1dFBpZWNlID0gZnVuY3Rpb24oLi4uY3V0UGllY2VzVG9SZW1vdmUpIHtcclxuICAgICAgICBsZXQgaW5kZXg7XHJcbiAgICAgICAgZm9yIChjb25zdCBjdXRQaWVjZVRvUmVtb3ZlIG9mIGN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gY3V0UGllY2VDb21wb25lbnRzLmZpbmRJbmRleCgoY3V0UGllY2VDb21wb25lbnQpID0+IGN1dFBpZWNlQ29tcG9uZW50LmN1dFBpZWNlID09PSBjdXRQaWVjZVRvUmVtb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50c1tpbmRleF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gYXJyYXlcclxuICAgICAgICAgICAgY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50cyBmcm9tIGFycmF5XHJcbiAgICAgICAgY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBlbGVtZW50cyBmcm9tIGRvY3VtZW50XHJcbiAgICAgICAgd2hpbGUgKGN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBjdXRQaWVjZUxpc3RFbGVtZW50LnJlbW92ZUNoaWxkKGN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRQaWVjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY3V0UGllY2VDb21wb25lbnRzLm1hcCgoY3V0UGllY2VDb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1dFBpZWNlQ29tcG9uZW50LmN1dFBpZWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ0tlcmYnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGxpc3QgYm9keSAodGFibGUgYm9keSlcclxuICAgICAgICBjdXRQaWVjZUxpc3RFbGVtZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtYm9keSd9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkQ3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgY2xlYXIsXHJcbiAgICAgICAgZ2V0UGllY2VzLFxyXG4gICAgICAgIHJlbW92ZUN1dFBpZWNlLFxyXG4gICAgICAgIHJlbW92ZUN1dFBpZWNlQ29tcG9uZW50LFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbENvbXBvbmVudCBmcm9tIFwiLi9jb25maXJtTW9kYWxDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlU2VjdGlvbkNvbXBvbmVudCgpIHtcclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgY29uc3QgY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcblxyXG4gICAgY29uc3QgZ2V0Q3V0UGllY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1dFBpZWNlTGlzdENvbXBvbmVudC5nZXRQaWVjZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWRkQ3V0UGllY2UgPSBmdW5jdGlvbihjdXRQaWVjZSkge1xyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRDdXRQaWVjZUNvbXBvbmVudChcclxuICAgICAgICAgICAgQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UsIGhhbmRsZUN1dFBpZWNlRWRpdENsaWNrLCBoYW5kbGVDdXRQaWVjZURlbGV0ZUNsaWNrKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRQaWVjZTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlQ3V0UGllY2UgPSBmdW5jdGlvbihjdXRQaWVjZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbW92ZUN1dFBpZWNlKGN1dFBpZWNlVG9SZW1vdmUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgQ3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IGN1dFBpZWNlID0gbmV3IEN1dFBpZWNlKFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3F1YW50aXR5JykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdrZXJmJykudmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRDdXRQaWVjZShjdXRQaWVjZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUN1dFBpZWNlRWRpdENsaWNrID0gZnVuY3Rpb24oZSwgb2xkQ3V0UGllY2UpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgQ3V0UGllY2UgZnJvbSBmb3JtIGlucHV0IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IG5ld0N1dFBpZWNlID0gbmV3IEN1dFBpZWNlKFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3F1YW50aXR5JykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdrZXJmJykudmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayB0aGF0IG5ldyBDdXRQaWVjZSBpcyBub3QgYSBkdXBsaWNhdGUgdGhpY2tuZXNzIHggd2lkdGggeCBsZW5ndGggY29tYm9cclxuICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCkuZm9yRWFjaCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1dFBpZWNlICE9PSBvbGRDdXRQaWVjZSAmJiBjdXRQaWVjZSA9PT0gbmV3Q3V0UGllY2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBuZXcgQ3V0UGllY2UgaXMgdmFsaWRcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ3V0UGllY2VEZWxldGVDbGljayA9IGZ1bmN0aW9uKGN1dFBpZWNlVG9EZWxldGUpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoXHJcbiAgICAgICAgICAgIENvbmZpcm1Nb2RhbENvbXBvbmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVDdXRQaWVjZURlbGV0ZUNvbmZpcm0oY3V0UGllY2VUb0RlbGV0ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIGN1dCBwaWVjZT8nXHJcbiAgICAgICAgICAgICkucmVuZGVyKClcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDdXRQaWVjZURlbGV0ZUNvbmZpcm0gPSBmdW5jdGlvbihjdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2UoY3V0UGllY2VUb0RlbGV0ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUN1dFBpZWNlTGlzdENsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgY3V0IHBpZWNlcyBkaXNwbGF5ZWRcclxuICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQuY2xlYXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xlYXJFbGVtZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdzZWN0aW9uJywgeydjbGFzcyc6ICdwaWVjZS1zZWN0aW9uJ30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyRWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGllY2UgSGVhZGVyXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMicsIHt9LCAnQ3V0IFBpZWNlczonKSk7XHJcblxyXG4gICAgICAgIC8vIFBpZWNlIENsZWFyIEJ1dHRvblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY2xlYXItYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsnY2xhc3MnOiAnY2xlYXItYnRuJ30sICdDbGVhciBBbGwgQ3V0IFBpZWNlcycpXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUN1dFBpZWNlTGlzdENsZWFyKTtcclxuXHJcbiAgICAgICAgLy8gUGllY2VzIExpc3RcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIC8vIFBpZWNlIENyZWF0ZSBGb3JtXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRDdXRQaWVjZSxcclxuICAgICAgICBnZXRDdXRQaWVjZXMsXHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0U2VxdWVuY2VDb21wb25lbnQoY3V0U2VxdWVuY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHJvd0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBSb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVuY3V0IFBpZWNlIChmaXJzdCByb3cgb25seSlcclxuICAgICAgICAgICAgLy8gQWRkIHVuY3V0IHBpZWNlIGlmIGZpcnN0IHJvdyBPUiBhZGQgcm93IHRoYXQgc3BhbnMgcmVzdCBvZiByb3dzIGZvciB0aGlzIGN1dCBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBgJHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnRoaWNrbmVzc314JHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLndpZHRofXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UubGVuZ3RofWApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsncm93c3Bhbic6IGFyci5sZW5ndGggLSAxfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEN1dCBQaWVjZXNcclxuICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1haW5pbmcgTGVuZ3RoIChsYXN0IHJvdyBvbmx5KVxyXG4gICAgICAgICAgICAvLyBBZGQgcmVtYWluaW5nIGxlbmd0aCBpZiBsYXN0IHJvdyBPUiByb3cgdGhhdCBzcGFucyByZXN0IG9mIHJvd3MgZm9yIHRoaXMgY3V0IHNlcXVlbmNlLlxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGB3aXRoICR7Y3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RofSByZW1haW5pbmdgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J3Jvd3NwYW4nOiBhcnIubGVuZ3RoIC0gMX0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm93IGVsZW1lbnQgdG8gYXJyYXkgb2Ygb3RoZXIgcm93IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIHJvd0VsZW1lbnRzLnB1c2godGVtcFJvd0VsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyQ29tcG9uZW50KGNvcHlyaWdodFllYXIpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSwgZWRpdENhbGxiYWNrLCBkZWxldGVDYWxsYmFjaykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUVkaXRDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNsZWFyRWxlbWVudCgpO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQodW5jdXRQaWVjZSwgaGFuZGxlRWRpdENvbmZpcm0sIGhhbmRsZUVkaXRDYW5jZWwpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENvbmZpcm0gPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBlZGl0Q2FsbGJhY2soZSwgdW5jdXRQaWVjZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hhbmdlIHVuY3V0UGllY2UgdmFsdWVzIHRvIGZvcm0gaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgdW5jdXRQaWVjZS50aGlja25lc3MgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSk7XHJcbiAgICAgICAgdW5jdXRQaWVjZS53aWR0aCA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpO1xyXG4gICAgICAgIHVuY3V0UGllY2UubGVuZ3RoID0gTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpO1xyXG4gICAgICAgIHVuY3V0UGllY2UucHJpY2UgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdwcmljZScpLnZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVEZWxldGVDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlbGV0ZUNhbGxiYWNrKHVuY3V0UGllY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhckVsZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAndW5jdXQtcGllY2UnfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdEZWxldGUnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYnV0dG9uc1xyXG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0Q2xpY2spO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLnRoaWNrbmVzcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UucHJpY2UpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1idG4tY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgZWRpdEJ0bixcclxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ0blxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgdW5jdXRQaWVjZSgpIHsgcmV0dXJuIHVuY3V0UGllY2U7IH0sXHJcbiAgICAgICAgcmVtb3ZlLFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgaXNJbnB1dFZhbGlkTGVuZ3RoLCBpc0lucHV0VmFsaWRQcmljZSB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIGxldCBmb3JtRWxlbWVudDtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCB7XHJcbiAgICAgICAgICAgICdhY3Rpb24nOiAnJyxcclxuICAgICAgICAgICAgJ21ldGhvZCc6ICdnZXQnLFxyXG4gICAgICAgICAgICAnbmFtZSc6ICd1bmN1dC1waWVjZS1jcmVhdGUnLFxyXG4gICAgICAgICAgICAnaWQnOiAndW5jdXQtcGllY2UtY3JlYXRlLWZvcm0nLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiAncGllY2UtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXBJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LXRoaWNrbmVzcyd9LCAnVGhpY2tuZXNzOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3RoaWNrbmVzcycsICdpZCc6ICd1bmN1dC10aGlja25lc3MnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAndW5jdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIExlbmd0aFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnbGVuZ3RoJywgJ2lkJzogJ3VuY3V0LWxlbmd0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtbGVuZ3RoJ30sICdMZW5ndGg6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBQcmljZVxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAncHJpY2UnLCAnaWQnOiAndW5jdXQtcHJpY2UnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSk7XHJcbiAgICAgICAgLy8gQWRkIGlucHV0IGxpc3RlbmVyIHRoYXQgYWRkcyBjdXN0b20gdmFsaWRpdHkgaWYgaW5wdXQgdmFsdWUgaXMgTk9UIHZhbGlkXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiBpc0lucHV0VmFsaWRQcmljZShlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtcHJpY2UnfSwgJ1ByaWNlOicpLFxyXG4gICAgICAgICAgICAgICAgdGVtcElucHV0RWxlbWVudFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gU3VibWl0IENvbnRhaW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0tYnRuLWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdBZGQnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlRm9ybVN1Ym1pdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZmllbGRzIGZvciBjdXQgbGVuZ3RoIGFuZCBxdWFudGl0eSwgbGVhdmluZyBvdGhlciBpbnB1dHMgd2l0aCB1c2VyIGVudGVyZWQgZGF0YS5cclxuICAgICAgICAvLyBGb2N1cyBjdXJzb3Igb24gbGFzdCBpbnB1dCB3aGljaCBzaG91bGQgYmUgY3V0IGxlbmd0aCBmaWVsZFxyXG4gICAgICAgIFsncHJpY2UnLCAnbGVuZ3RoJ10uZm9yRWFjaCgoaW5wdXROYW1lLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudCA9IGZvcm1FbGVtZW50LmVsZW1lbnRzLm5hbWVkSXRlbShpbnB1dE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBpbnB1dEVsZW1lbnQuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAoYXJyLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgaXNJbnB1dFZhbGlkTGVuZ3RoLCBpc0lucHV0VmFsaWRQcmljZSB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCh1bmN1dFBpZWNlLCBoYW5kbGVFZGl0Q29uZmlybSwgaGFuZGxlRWRpdENhbmNlbCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ3VuY3V0LXBpZWNlLWVkaXQnLFxyXG4gICAgICAgICAgICAnaWQnOiAndW5jdXQtcGllY2UtZWRpdC1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWZvcm0nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCB0ZW1wSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHNcclxuICAgICAgICBjb25zdCBmb3JtSW5wdXRzRWxlbWVudCA9IGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0taW5wdXRzJ30pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAndW5jdXQtdGhpY2tuZXNzJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogdW5jdXRQaWVjZS50aGlja25lc3N9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gV2lkdGhcclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ3VuY3V0LXdpZHRoJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogdW5jdXRQaWVjZS53aWR0aH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICd1bmN1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnLCAndmFsdWUnOiB1bmN1dFBpZWNlLmxlbmd0aH0pO1xyXG4gICAgICAgIC8vIEFkZCBpbnB1dCBsaXN0ZW5lciB0aGF0IGFkZHMgY3VzdG9tIHZhbGlkaXR5IGlmIGlucHV0IHZhbHVlIGlzIE5PVCB2YWxpZFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFByaWNlXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdwcmljZScsICdpZCc6ICd1bmN1dC1wcmljZScsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZScsICd2YWx1ZSc6IHVuY3V0UGllY2UucHJpY2V9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZFByaWNlKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1wcmljZSd9LCAnUHJpY2U6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gQnV0dG9uIENvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGZvcm1CdG5Db250YWluZXIgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1mb3JtLWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gU3VibWl0L0VkaXQgQ29uZmlybVxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdVcGRhdGUnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUVkaXRDb25maXJtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDb25maXJtKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBDYW5jZWwvRXhpdFxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsndHlwZSc6ICdidXR0b24nfSwgJ0NhbmNlbCcpXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVFZGl0Q2FuY2VsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDYW5jZWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IHVuY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBsZXQgdW5jdXRQaWVjZUxpc3RFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGFkZFVuY3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMucHVzaCguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodW5jdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHVuY3V0UGllY2VDb21wb25lbnRzLmluZGV4T2YodW5jdXRQaWVjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudC5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZXNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VUb1JlbW92ZSBvZiB1bmN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdW5jdXRQaWVjZUNvbXBvbmVudHMuZmluZEluZGV4KCh1bmN1dFBpZWNlQ29tcG9uZW50KSA9PiB1bmN1dFBpZWNlQ29tcG9uZW50LnVuY3V0UGllY2UgPT09IHVuY3V0UGllY2VUb1JlbW92ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzW2luZGV4XS5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnRzIGZyb20gYXJyYXlcclxuICAgICAgICB1bmN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZWxlbWVudHMgZnJvbSBkb2N1bWVudFxyXG4gICAgICAgIHdoaWxlICh1bmN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQodW5jdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0UGllY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuY3V0UGllY2VDb21wb25lbnRzLm1hcCgodW5jdXRQaWVjZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5jdXRQaWVjZUNvbXBvbmVudC51bmN1dFBpZWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1ByaWNlJyksXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGlzdCBib2R5ICh0YWJsZSBib2R5KVxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0RWxlbWVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWJvZHknfSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZFVuY3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgY2xlYXIsXHJcbiAgICAgICAgZ2V0UGllY2VzLFxyXG4gICAgICAgIHJlbW92ZVVuY3V0UGllY2UsXHJcbiAgICAgICAgcmVtb3ZlVW5jdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWxDb21wb25lbnQgZnJvbSBcIi4vY29uZmlybU1vZGFsQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlIGZyb20gXCIuLi91bmN1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50KCkge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBjb25zdCB1bmN1dFBpZWNlTGlzdENvbXBvbmVudCA9IFVuY3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcblxyXG4gICAgY29uc3QgZ2V0VW5jdXRQaWVjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFkZFVuY3V0UGllY2UgPSBmdW5jdGlvbih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuYWRkVW5jdXRQaWVjZUNvbXBvbmVudChcclxuICAgICAgICAgICAgVW5jdXRQaWVjZUNvbXBvbmVudCh1bmN1dFBpZWNlLCBoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrLCBoYW5kbGVVbmN1dFBpZWNlRGVsZXRlQ2xpY2spXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuY3V0UGllY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZVVuY3V0UGllY2UgPSBmdW5jdGlvbih1bmN1dFBpZWNlVG9SZW1vdmUpIHtcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW1vdmVVbmN1dFBpZWNlKHVuY3V0UGllY2VUb1JlbW92ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIFVuY3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IHVuY3V0UGllY2UgPSBuZXcgVW5jdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLCBcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrID0gZnVuY3Rpb24oZSwgb2xkVW5jdXRQaWVjZSkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBVbmN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dCB2YWx1ZXNcclxuICAgICAgICBjb25zdCBuZXdVbmN1dFBpZWNlID0gbmV3IFVuY3V0UGllY2UoXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3RoaWNrbmVzcycpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayB0aGF0IG5ldyBVbmN1dFBpZWNlIGlzIG5vdCBhIGR1cGxpY2F0ZSB0aGlja25lc3MgeCB3aWR0aCB4IGxlbmd0aCBjb21ib1xyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmdldFBpZWNlcygpLmZvckVhY2goKHVuY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHVuY3V0UGllY2UgIT09IG9sZFVuY3V0UGllY2UgJiYgdW5jdXRQaWVjZSA9PT0gbmV3VW5jdXRQaWVjZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIG5ldyBVbmN1dFBpZWNlIGlzIHZhbGlkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVVuY3V0UGllY2VEZWxldGVDbGljayA9IGZ1bmN0aW9uKHVuY3V0UGllY2VUb0RlbGV0ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChcclxuICAgICAgICAgICAgQ29uZmlybU1vZGFsQ29tcG9uZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVVuY3V0UGllY2VEZWxldGVDb25maXJtKHVuY3V0UGllY2VUb0RlbGV0ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVuY3V0IHBpZWNlPydcclxuICAgICAgICAgICAgKS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVVuY3V0UGllY2VEZWxldGVDb25maXJtID0gZnVuY3Rpb24odW5jdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgcmVtb3ZlVW5jdXRQaWVjZSh1bmN1dFBpZWNlVG9EZWxldGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVVbmN1dFBpZWNlTGlzdENsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgdW5jdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nLCB7J2NsYXNzJzogJ3BpZWNlLXNlY3Rpb24nfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBIZWFkZXJcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gyJywge30sICdVbmN1dCBQaWVjZXM6JykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVuY3V0IFBpZWNlcyAtIENsZWFyIEJ1dHRvblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY2xlYXItYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsnY2xhc3MnOiAnY2xlYXItYnRuJ30sICdDbGVhciBBbGwgVW5jdXQgUGllY2VzJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gTGlzdFxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodW5jdXRQaWVjZUxpc3RDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVuY3V0IFBpZWNlcyAtIENyZWF0ZSBGb3JtXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkVW5jdXRQaWVjZSxcclxuICAgICAgICBnZXRVbmN1dFBpZWNlcyxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDdXRMaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKGN1dFNlcXVlbmNlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBjdXRTZXF1ZW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoKGN1dFNlcXVlbmNlKSB7XHJcbiAgICAgICAgLy8gVE9ETzogVHlwZSBjaGVja1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5wdXNoKGN1dFNlcXVlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcmljZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXRTZXF1ZW5jZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLnVuY3V0UGllY2UucHJpY2UsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZXBDb3B5KCkge1xyXG4gICAgICAgIGxldCBjdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcyA9IFsuLi50aGlzLmN1dFNlcXVlbmNlc107XHJcbiAgICAgICAgcmV0dXJuIGN1dExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF0ZXJpYWxMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGggaW4gbWF0ZXJpYWxMaXN0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdLnF1YW50aXR5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmljZTogY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsTGlzdE9iajtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGN1dExpc3QgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIGdldEN1dExpc3Q6IChyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXQgbGVuZ3RoIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggKERPIE5PVCBJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmxlbmd0aCA9PSByZW1haW5pbmdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKGksIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0sIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBpbmRleCBvZiBsYXJnZXN0IGN1dCBsZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLmN1dExpc3QuZ2V0Q3V0TGlzdChcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdDtcclxuIiwiaW1wb3J0IHsgQ3V0TGlzdCB9IGZyb20gXCIuL2N1dExpc3QuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcblxyXG4vKipcclxuICogVE9ETzogV2hpbGUgbG9vcGluZyB0aHJvdWdoIGNvbWJpbmF0aW9ucyBvZiB1bmN1dCBwaWVjZXMsIGlmIHRoZSBjb21iaW5hdGlvbiBcclxuICogcHJpY2UgaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgYmVzdCBjdXQgbGlzdCBwcmljZSwgdGhlbiBjYW4gc2tpcC5cclxuICovXHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyBcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICogbWF4ID0gWzUsNCwzLDJdXHJcbiAgICAgKiBwb3NzaWJpbGl0aWVzID0gNio1KjQqMyA9IDM2MFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMCwwLDBdXHJcbiAgICAgKiBbMF0gMVxyXG4gICAgICogWzNdICszXHJcbiAgICAgKiA0XHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogMyArIDEgPSA0XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSwwLDAsMF1cclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiA1ICsgMSA9IDZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICogWzAsMF0gMVxyXG4gICAgICogWzUsMF0gKzVcclxuICAgICAqIFswLDFdICsxXHJcbiAgICAgKiBbNSwxXSArNVxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoMikgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMiAqIDYgPSAxMlxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICogMTIgKyA0ID0gMTZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMCwwXVxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbNSwyXSArNlxyXG4gICAgICogWzUsM10gKzZcclxuICAgICAqIFs1LDRdICs2XHJcbiAgICAgKiAzMFxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDQpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDI0ICsgNiA9IDMwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMCwwLDEsMF1cclxuICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAqIFswLDAsMSwwXSArMVxyXG4gICAgICogMzFcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgKiAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDApICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgxKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAxICogKDYqNSkgPSAzMVxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwzLDJdXHJcbiAgICAgKiAzNjBcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA2XHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogNiArIDQgKiA2ID0gMzBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMykgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMykgdmFsdWUgKDIpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMTIwICsgMiAqICg2KjUqNCkgPSAxMjAgKyAyICogMTIwID0gMTIwICsgMjQwID0gMzYwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvLyBJZiBhcnJheSBpcyBlbXB0eSByZXR1cm4gemVyb1xyXG4gICAgICAgIGlmICghbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgbGV0IGNvdW50ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbMF0gKyAxO1xyXG5cclxuICAgICAgICAvLyBGb3IgZXZlcnkgaW5kZXggYWZ0ZXIgdGhlIGZpcnN0IHVwIHRvIGxhc3ROb25aZXJvSW5kZXgsIGFkZCB0aGUgXHJcbiAgICAgICAgLy8gcHJvZHVjdCBvZiBhbGwgcHJldmlvdXMgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3ROb25aZXJvSW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudCArPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpXSAqIG1heE51bUF2YWlsYWJsZUxlbmd0aHMuc2xpY2UoMCwgaSkucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiAoY3VyciArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICBjb25zdCBudW0gPSBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF4TGFzdE5vblplcm9JbmRleCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHMuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBtYXhMYXN0Tm9uWmVyb0luZGV4ID09PSAtMSA/IG1heE51bUF2YWlsYWJsZUxlbmd0aHMubGVuZ3RoIDogbWF4TGFzdE5vblplcm9JbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbCkgPT4gdmFsICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogY3Vycik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChudW0gLyBtYXgpICogMTAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYE51bTogJHtudW19IC0gTWF4OiAke21heH0gLSAlJHtwZXJjZW50YWdlLnRvRml4ZWQoMil9YCk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4LiBjdXJyPVsxLDMsMCwwXSBtYXg9WzMsNCw0LDVdIHJlc3VsdHMgaW4gYSB2YWxpZCBjdXQgbGlzdC5cclxuICAgICAgICAgKiBOZXh0IGluY3JlbWVudHMgb2YgWzIsMywwLDBdIGFuZCBbMywzLDAsMF0gd2lsbCBhbHdheXMgYmUgbW9yZSBleHBlbnNpdmUgdGhhbiBbMSwzLDAsMF0uXHJcbiAgICAgICAgICogTWFrZSBmaXJzdCBub24temVybyB2YWx1ZSAwIGFuZCBpbmNyZW1lbnQgdmFsdWUgYWZ0ZXIuXHJcbiAgICAgICAgICogWzAsNCwwLDBdIC0+IGNvbnRpbnVlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBlbXB0eSBPUiBhbGwgdmFsdWVzIGFyZSB6ZXJvXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXhdID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgZmlyc3ROb25aZXJvVmFsdWVJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgZW1wdHkgcGllY2VzXHJcbiAgICAgICAgaWYgKCFjdXRQaWVjZXMubGVuZ3RoIHx8ICF1bmN1dFBpZWNlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0IGxlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgYXZhaWxhYmxlTGVuZ3Roc0FyciBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgLy9hdmFpbGFibGVMZW5ndGhzQXJyLnNvcnQoKGEsYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHVuY3V0UGllY2VzIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbGVuZ3RoXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZWFjaCBhdmFpbGFibGUgbGVuZ3RocyBuZWVkZWQgaWYgb25seSB1c2VkIHRoYXQgXHJcbiAgICAgICAgLy8gYXZhaWxhYmxlIGxlbmd0aCBmb3IgYWxsIGN1dFBpZWNlcyAoaW5pdGlhbGl6ZWQgdG8gemVybylcclxuICAgICAgICBsZXQgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlLCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvL21heE51bSA9IE1hdGguY2VpbCh0b3RhbEN1dExlbmd0aCAvIHVuY3V0UGllY2UubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2UubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAgICAgLy8gVE9ETzogRG8gbm90IG5lZWQgbWF4TnVtLiBPbmx5IG5lZWQgdG8gY2hlY2sgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBhbmQgc3RpbGwgaW5jcmVtZW50IGNvdW50IGluIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gVE9ETzogSW5maW5pdGUgbG9vcCBpZiBjdXQgcGllY2UgaXMgbG9uZ2VyIHRoYW4gdW5jdXQgcGllY2UgbGVuZ3RoLiBBcnJheSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IG5ldmVyIHJlYWNoZXMgemVyby5cclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHJlbWFpbmluZyB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgICAgICAgICAgLy8gbm8gbW9yZSBjdXQgcGllY2VzIGNhbiBiZSB1c2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggbnVtYmVyIG9mIGNvcnJlc3BvbmRpbmcgVW5jdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdCBvbmx5IGlmIE5PIGF2YWlsYWJsZSBjdXQgcGllY2VzIHN0aWxsIGxlZnRcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICYmICgoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgc2tpcEZsYWc7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGYWN0b3JDb3VudGVyID0gMTtcclxuICAgICAgICBsZXQgcGVyY2VudE11bHRpcGxlRGlzcGxheSA9IDU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyKTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlICYmIHBlcmNlbnRhZ2UgPiAocGVyY2VudE11bHRpcGxlRGlzcGxheSAqIHBlcmNlbnRGYWN0b3JDb3VudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cGVyY2VudGFnZS50b0ZpeGVkKDApfSVgKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRGYWN0b3JDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBhdmFpbGFibGUgY3V0IHBpZWNlcywgbm90IGVub3VnaCB1bmN1dCBwaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgY3VycmVudCBjdXQgbGlzdCBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHNraXBGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjdXQgbGlzdCBpcyBiZXR0ZXIgaWYgTk8gdW51c2VkIHVuY3V0IHBpZWNlcyAodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIGhhcyBhbGwgemVybyB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSAmJiAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5ldyBCZXN0IEN1dCBMaXN0IC0gQmVzdDogJHtiZXN0Q3V0TGlzdC5nZXRQcmljZSgpfSAtIEN1cnI6ICR7Y3VyckN1dExpc3QuZ2V0UHJpY2UoKX0gLSBUb3RhbDogJHtudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn0gLSBMZWZ0OiAke3RlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcbiAgICAgICAgd2luZG93LmJlc3RDdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGxlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZSBmcm9tIFwiLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5jbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDdXRTZXF1ZW5jZSBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZX0gdW5jdXRQaWVjZSBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXRTZXF1ZW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2UubGVuZ3RoLCBcclxuICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHVuY3V0UGllY2UgbGVuZ3RoIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgLy8gZXZlcnkgaW5kaXZpZHVhbEN1dFBpZWNlIGlzIGxvbmdlciB0aGFuIHRoZSB1bmN1dFBpZWNlXHJcbiAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRTZXF1ZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dCBsZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0ubGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0IGxlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRTZXF1ZW5jZTsiLCJleHBvcnQgY2xhc3MgQ3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHVuY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgbGVuZ3RoLCBwcmljZSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAvL3RoaXMuY3Jvc3NTZWN0aW9uID0gbmV3IENyb3NzU2VjdGlvbih0aGlzLnRoaWNrbmVzcywgdGhpcy53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRWxlbWVudCB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIEVsZW1lbnQgYXR0cmlidXRlIG5hbWVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIFxyXG4gKiBAcGFyYW0gIHsuLi5Ob2RlfSBjaGlsZHJlbiAtIFZhcmlhYmxlIG51bWJlciBvZiBjaGlsZCBub2RlcyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgICAvLyBQcm9wc1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hpbGRyZW4gTm9kZXNcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWxlbWVudC5hcHBlbmQoY2hpbGQpKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZExlbmd0aChpbnB1dEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHRlbXBWYWx1ZSA9IE51bWJlcihpbnB1dEVsZW1lbnQudmFsdWUpO1xyXG5cclxuICAgIGlmIChpc05hTih0ZW1wVmFsdWUpKSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCdNdXN0IGJlIGEgbnVtYmVyLicpO1xyXG4gICAgfSBlbHNlIGlmICh0ZW1wVmFsdWUgPD0gMCkge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEVsZW1lbnQucmVwb3J0VmFsaWRpdHkoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZFByaWNlKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGVtcFZhbHVlID0gTnVtYmVyKGlucHV0RWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgaWYgKGlzTmFOKHRlbXBWYWx1ZSkpIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgYSBudW1iZXIuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRlbXBWYWx1ZSA8IDApIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRFbGVtZW50LnJlcG9ydFZhbGlkaXR5KCk7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQztBQUVEOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBUztFQUNULFVBQVU7RUFDVixTQUFTO0VBQ1QsZUFBZTtFQUNmLGFBQWE7RUFDYix3QkFBd0IsRUFBQTs7QUFFekIsZ0RBQUE7QUFDQTs7RUFFQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxnQkFBZ0IsRUFBQTs7QUFFakI7RUFDQyxZQUFZLEVBQUE7O0FBRWI7O0VBRUMsV0FBVztFQUNYLGFBQWEsRUFBQTs7QUFFZDtFQUNDLHlCQUF5QjtFQUN6QixpQkFBaUIsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXG4gIC0tYmFzZS1ibGFjazogaHNsKDAsIDAlLCAxMCUpO1xcbiAgLS1wcmltYXJ5OiAjOTY2NDJjO1xcbiAgLS1zZWNvbmRhcnk6IG9yYW5nZTtcXG4gIC0taG92ZXI6IGhzbCgwLCAwJSwgNTAlKTtcXG4gIC0tYWN0aXZlOiBoc2woMCwgMCUsIDI1JSk7XFxuICAtLXN1Y2Nlc3M6IGdyZWVuO1xcbiAgLS1pbmZvOiBncmF5O1xcbiAgLS13YXJuaW5nOiBvcmFuZ2U7XFxuICAtLWRhbmdlcjogcmVkOyB9XFxuXFxuaHRtbCB7XFxuICBmb250LXNpemU6IDYyLjUlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGNvbG9yOiB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLXdoaXRlLCB3aGl0ZSk7IH1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7IH1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxcImhlYWRlciBoZWFkZXJcXFwiXFxyIFxcXCJtYWluIG1haW5cXFwiXFxyIFxcXCJmb290ZXIgZm9vdGVyXFxcIjsgfVxcblxcbmhlYWRlcixcXG5tYWluLFxcbmZvb3RlciB7XFxuICBwYWRkaW5nOiAxLjhyZW07IH1cXG5cXG5oZWFkZXIge1xcbiAgZ3JpZC1hcmVhOiBoZWFkZXI7IH1cXG5cXG5tYWluIHtcXG4gIGdyaWQtYXJlYTogbWFpbjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDFlbTsgfVxcblxcbmZvb3RlciB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGdyaWQtYXJlYTogZm9vdGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4jY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXIsXFxuLmNsZWFyLWJ0bi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuI2NyZWF0ZS1jdXQtbGlzdC1lcnJvci1tc2cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4uY3V0LXNlcXVlbmNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcbiAgLmN1dC1zZXF1ZW5jZTpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7IH1cXG5cXG4uaGlkZSB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmlucHV0LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIC5pbnB1dC1jb250YWluZXIgbGFiZWwsIC5pbnB1dC1jb250YWluZXIgaW5wdXQge1xcbiAgICB3aWR0aDogMTAwJTsgfVxcblxcbi5tb2RhbCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyOyB9XFxuXFxuLm1vZGFsLWNvbnRlbnQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcbiAgd2lkdGg6IDgwJTtcXG4gIGhlaWdodDogNTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24tY29udGVudDogc3BhY2UtZXZlbmx5OyB9XFxuXFxuLm1vZGFsLWNvbnRlbnQtYnRuLWNvbnRhaW5lcixcXG4ucGllY2UtYnRuLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXG4gIGdhcDogMWVtOyB9XFxuXFxuLnBpZWNlLWZvcm0sXFxuLnBpZWNlLWxpc3Qge1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spOyB9XFxuXFxuLnBpZWNlLWZvcm0gLnBpZWNlLWZvcm0taW5wdXRzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgY29sdW1uLWdhcDogMXJlbTtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5waWVjZS1mb3JtIC5waWVjZS1mb3JtLWlucHV0cyAuaW5wdXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDsgfVxcblxcbi5waWVjZS1mb3JtIC5waWVjZS1mb3JtLWJ0bi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtaGVhZCxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1ib2R5ID4gLnVuY3V0LXBpZWNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgY29sdW1uLWdhcDogMXJlbTtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG5cXG4ucGllY2UtbGlzdC1ib2R5IC5jdXQtcGllY2U6bnRoLWNoaWxkKG9kZCksXFxuLnBpZWNlLWxpc3QtYm9keSAudW5jdXQtcGllY2U6bnRoLWNoaWxkKG9kZCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcblxcbi5waWVjZS1saXN0LWJvZHkgLmN1dC1waWVjZTpudGgtY2hpbGQoZXZlbiksXFxuLnBpZWNlLWxpc3QtYm9keSAudW5jdXQtcGllY2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiZmJmYmY7IH1cXG5cXG5oMSwgaDIsIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMS43ZW07IH1cXG5cXG5oMiB7XFxuICBmb250LXNpemU6IDEuNWVtOyB9XFxuXFxuaDMge1xcbiAgZm9udC1zaXplOiAxLjJlbTsgfVxcblxcbnRhYmxlIHtcXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIHRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcbiAgdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2JmYmZiZjsgfVxcbiAgdGFibGUgdGgsIHRhYmxlIHRkIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTsgfVxcblxcbmJ1dHRvbiwgaW5wdXRbdHlwZT1zdWJtaXRdIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIGJ1dHRvbjpob3ZlciwgaW5wdXRbdHlwZT1zdWJtaXRdOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXIsIGdyYXkpO1xcbiAgICBjb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpOyB9XFxuICBidXR0b246YWN0aXZlLCBpbnB1dFt0eXBlPXN1Ym1pdF06YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWN0aXZlLCAjNDA0MDQwKTsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBVUE7RUFDSSw2QkFBYTtFQUNiLDZCQUFhO0VBRWIsa0JBQVU7RUFDVixtQkFBWTtFQUVaLHdCQUFRO0VBQ1IseUJBQVM7RUFFVCxnQkFBVTtFQUNWLFlBQU87RUFDUCxpQkFBVTtFQUNWLGFBQVMsRUFBQTs7QUFHYjtFQUNJLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFFdEIsK0JBQStCO0VBQy9CLDBDQUEwQyxFQUFBOztBQUc5QztFQUNJLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLGlCQUFpQjtFQUNqQix3SUFBd0k7RUFDeEksaUJBQWlCO0VBRWpCLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsaUNBQWlDO0VBQ2pDLGtFQUdtQixFQUFBOztBQUd2Qjs7O0VBR0ksZUFBZSxFQUFBOztBQUtuQjtFQUNJLGlCQUFpQixFQUFBOztBQUtyQjtFQUNJLGVBQWU7RUFDZixhQUFhO0VBQ2IsUUFBUSxFQUFBOztBQUtaO0VBQ0ksaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsbUJBQW1CLEVBQUE7O0FBS3ZCOztFQUVJLGFBQWE7RUFDYix1QkFBdUIsRUFBQTs7QUFHM0I7RUFDSSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQixFQUFBOztBQUt2QjtFQUNJLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsMENBQTBDO0VBQzFDLGdCQUFnQixFQUFBO0VBSnBCO0lBT1EsOENBQThDLEVBQUE7O0FBSXREO0VBQ0ksYUFBYSxFQUFBOztBQUdqQjtFQUNJLHFCQUFxQixFQUFBO0VBRHpCO0lBSVEsV0FBVyxFQUFBOztBQUluQjtFQUVJLGVBQWU7RUFDZixVQUFVO0VBQ1YsT0FBTztFQUNQLE1BQU07RUFDTixXQUFXO0VBQ1gsWUFBWTtFQUNaLGNBQWM7RUFDZCx1QkFBOEI7RUFDOUIsb0NBQW9DO0VBRXBDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIscUJBQXFCLEVBQUE7O0FBR3pCO0VBQ0kseUJBQXlCO0VBRXpCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFdBQVc7RUFFWCxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLDJCQUEyQixFQUFBOztBQUcvQjs7RUFFSSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVEsRUFBQTs7QUFHWjs7RUFFSSwwQ0FBMEMsRUFBQTs7QUFJOUM7RUFoS0ksYUFBYTtFQUNiLHFDQUE2QztFQUM3QyxnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLG1CQUFtQixFQUFBO0VBNEp2QjtJQVFZLGFBQWEsRUFBQTs7QUFSekI7RUFhUSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBSS9COzs7RUFsTEksYUFBYTtFQUNiLHFDQUE2QztFQUM3QyxnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLG1CQUFtQixFQUFBOztBQXdMdkI7O0VBR1EseUJBQWlDLEVBQUE7O0FBSHpDOztFQVFRLHlCQUFpQyxFQUFBOztBQU16QztFQUNJLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGdCQUFnQixFQUFBOztBQUlwQjtFQUNJLGdCQUFnQixFQUFBOztBQUlwQjtFQUNJLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBDQUEwQztFQUMxQyxrQkFBa0IsRUFBQTtFQUx0QjtJQVNZLHlCQUFpQyxFQUFBO0VBVDdDO0lBYVkseUJBQWlDLEVBQUE7RUFiN0M7SUFrQlEsb0JBQW9CO0lBQ3BCLDBDQUEwQyxFQUFBOztBQUlsRDtFQUNJLGdCQUFnQjtFQUNoQiwwQ0FBMEM7RUFDMUMscUJBQXFCO0VBQ3JCLGVBQWUsRUFBQTtFQUpuQjtJQU9RLG9DQUErQztJQUMvQywrQkFBK0IsRUFBQTtFQVJ2QztJQVlRLHdDQUFnRCxFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG5AbWl4aW4gYmFzZUdyaWQoJG5Db2x1bW5zOiA2KSB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCRuQ29sdW1ucywgMWZyKTtcXHJcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAgIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcclxcbiAgICAtLWJhc2UtYmxhY2s6IGhzbCgwLCAwJSwgMTAlKTtcXHJcXG5cXHJcXG4gICAgLS1wcmltYXJ5OiAjOTY2NDJjO1xcclxcbiAgICAtLXNlY29uZGFyeTogb3JhbmdlO1xcclxcblxcclxcbiAgICAtLWhvdmVyOiBoc2woMCwgMCUsIDUwJSk7XFxyXFxuICAgIC0tYWN0aXZlOiBoc2woMCwgMCUsIDI1JSk7XFxyXFxuXFxyXFxuICAgIC0tc3VjY2VzczogZ3JlZW47XFxyXFxuICAgIC0taW5mbzogZ3JheTtcXHJcXG4gICAgLS13YXJuaW5nOiBvcmFuZ2U7XFxyXFxuICAgIC0tZGFuZ2VyOiByZWQ7XFxyXFxufVxcclxcblxcclxcbmh0bWwge1xcclxcbiAgICBmb250LXNpemU6IDYyLjUlOyAvLyAxcmVtID0gMTBweFxcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLXdoaXRlLCB3aGl0ZSk7XFxyXFxufVxcclxcblxcclxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcclxcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXHJcXG4gICAgICAgIFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcclxcbiAgICAgICAgXFxcIm1haW4gbWFpblxcXCJcXHJcXG4gICAgICAgIFxcXCJmb290ZXIgZm9vdGVyXFxcIjtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLCBcXHJcXG5tYWluLCBcXHJcXG5mb290ZXIge1xcclxcbiAgICBwYWRkaW5nOiAxLjhyZW07XFxyXFxufVxcclxcblxcclxcbi8vIEhlYWRlclxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICAgIGdyaWQtYXJlYTogaGVhZGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBNYWluIENvbnRlbnRcXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiBtYWluO1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBnYXA6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRm9vdGVyXFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgIGdyaWQtYXJlYTogZm9vdGVyO1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDdXN0b20gSURzXFxyXFxuXFxyXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyLFxcclxcbi5jbGVhci1idG4tY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNjcmVhdGUtY3V0LWxpc3QtZXJyb3ItbXNnIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDdXN0b20gQ2xhc3Nlc1xcclxcblxcclxcbi5jdXQtc2VxdWVuY2Uge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxyXFxuXFxyXFxuICAgICY6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuXFxyXFxuICAgIGxhYmVsLCBpbnB1dCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgICAvL2Rpc3BsYXk6IG5vbmU7IC8vIEhpZGRlbiBieSBkZWZhdWx0XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLy8gU3RheSBpbiBwbGFjZVxcclxcbiAgICB6LWluZGV4OiAxOyAvLyBTaXQgb24gdG9wXFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7IC8vIEZ1bGwgd2lkdGhcXHJcXG4gICAgaGVpZ2h0OiAxMDAlOyAvLyBGdWxsIGhlaWdodFxcclxcbiAgICBvdmVyZmxvdzogYXV0bzsgLy8gRW5hYmxlIHNjcm9sbCBpZiBuZWVkZWRcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDApOyAvLyBGYWxsYmFjayBjb2xvclxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7IC8vIEJsYWNrIHcvIG9wYWNpdHlcXHJcXG4gICAgLy8gR3JpZFxcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250ZW50IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcXHJcXG4gICAgLy9tYXJnaW46IDE1JSBhdXRvOyAvLyAxNSUgZnJvbSB0aGUgdG9wIGFuZCBjZW50ZXJlZFxcclxcbiAgICBwYWRkaW5nOiAycmVtO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcclxcbiAgICB3aWR0aDogODAlOyAvLyBDb3VsZCBiZSBtb3JlIG9yIGxlc3MsIGRlcGVuZGluZyBvbiBzY3JlZW4gc2l6ZVxcclxcbiAgICBoZWlnaHQ6IDUwJTtcXHJcXG4gICAgLy8gR3JpZFxcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24tY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGVudC1idG4tY29udGFpbmVyLFxcclxcbi5waWVjZS1idG4tY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5waWVjZS1mb3JtLCBcXHJcXG4ucGllY2UtbGlzdCB7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgLy9tYXJnaW46IDFyZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWZvcm0ge1xcclxcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIC8vIG1hcmdpbjogMXJlbSAwO1xcclxcblxcclxcbiAgICAucGllY2UtZm9ybS1pbnB1dHMge1xcclxcbiAgICAgICAgQGluY2x1ZGUgYmFzZUdyaWQ7XFxyXFxuXFxyXFxuICAgICAgICAuaW5wdXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waWVjZS1mb3JtLWJ0bi1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5waWVjZS1saXN0IHtcXHJcXG4gICAgLy8gYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcblxcclxcbiAgICAucGllY2UtbGlzdC1oZWFkLCBcXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSA+IC5jdXQtcGllY2UsXFxyXFxuICAgIC5waWVjZS1saXN0LWJvZHkgPiAudW5jdXQtcGllY2Uge1xcclxcbiAgICAgICAgQGluY2x1ZGUgYmFzZUdyaWQ7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWxpc3QtYm9keSB7XFxyXFxuICAgIC5jdXQtcGllY2U6bnRoLWNoaWxkKG9kZCksXFxyXFxuICAgIC51bmN1dC1waWVjZTpudGgtY2hpbGQob2RkKSB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDg1JSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmN1dC1waWVjZTpudGgtY2hpbGQoZXZlbiksXFxyXFxuICAgIC51bmN1dC1waWVjZTpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCA3NSUpO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi8vIE1pc2NcXHJcXG5cXHJcXG5oMSwgaDIsIGgzIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS43ZW07XFxyXFxufVxcclxcblxcclxcbmgyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXHJcXG4gICAgLy9tYXJnaW46IDAuODNlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG5oMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIC8vbWFyZ2luOiAxZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxudGFibGUge1xcclxcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHRib2R5IHtcXHJcXG4gICAgICAgIHRyOm50aC1jaGlsZChvZGQpIHtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDg1JSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICB0cjpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAwJSwgNzUlKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICB0aCwgdGQge1xcclxcbiAgICAgICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uLCBpbnB1dFt0eXBlPXN1Ym1pdF0ge1xcclxcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLCBoc2woMCwgMCUsIDUwJSkpO1xcclxcbiAgICAgICAgY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY3RpdmUsIGhzbCgwLCAwJSwgMjUlKSk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVyX3Jlc2V0LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MnO1xyXG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5zY3NzJztcclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gJy4vanMvY3V0TGlzdENhbGN1bGF0b3IuanMnO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSAnLi9qcy9jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Q3Jvc3NTZWN0aW9uLCBVbmN1dFBpZWNlfSBmcm9tICcuL2pzL3VuY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge2N1dExpc3R9IGZyb20gJy4vanMvY3V0TGlzdC5qcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCBmcm9tICcuL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsKGN1dFBpZWNlcywgcG9zc2libGVMZW5ndGhzQXJyKSB7XHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgbGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBpbmRleCBpbiBjb3JyZXNwb25kaW5nIFxyXG4gICAgICAgIC8vIGluZGl2aWR1YWxDdXRQaWVjZXMgYXJyYXkuIElmIGEgaW5kaXZpZHVhbCBDdXRQaWVjZSBpcyBzZWxlY3RlZCBmb3IgXHJcbiAgICAgICAgLy8gYSBjdXQgc2VxdWVuY2UsIGl0J3MgaW5kZXggaXMgcmVtb3ZlZCBmcm9tIHRoaXMgYXJyYXkuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJDdXRTZXF1ZW5jZSwgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGJlc3RDdXQ7XHJcbiAgICAgICAgbGV0IGZpbmFsQ3V0TGlzdCA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmVzdEN1dCA9IHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwb3NzaWJsZUxlbmd0aHNBcnIuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJDdXRTZXF1ZW5jZSA9IGN1dExpc3QuZ2V0Q3V0TGlzdChsZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKChiZXN0Q3V0LmN1dFNlcXVlbmNlID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKGJlc3RDdXQuY3V0U2VxdWVuY2VbLTFdID4gY3VyckN1dFNlcXVlbmNlWy0xXSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RDdXQuY3V0U2VxdWVuY2UgPSBjdXJyQ3V0U2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWy4uLnRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaW5hbEN1dExpc3QucHVzaChiZXN0Q3V0LmN1dFNlcXVlbmNlKTtcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmFsQ3V0TGlzdCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjdXQgbGlzdCBmb3IgZmlyc3QgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGJlc3RDdXRMaXN0IHRvIGZpcnN0IGN1dCBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBuZXh0IHBvc3NpYmxlIGxlbmd0aFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIG5ldyBjdXQgbGlzdCBoYXMgbGVzcyByZW1haW5pbmcgbGVuZ3RoIHRoYW4gYmVzdEN1dExpc3QsIHNldCBcclxuICAgICAgICAvLyBiZXN0Q3V0TGlzdCB0byBuZXcgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIHJlYWNoIGVuZCBvZiBwb3NzaWJsZSBsZW5ndGggYXJyYXksIHNhdmUgYmVzdEN1dExpc3QgdG8gZmluYWwgY3V0IGxpc3Qgc2VxdWVuY2VcclxuXHJcbiAgICAgICAgLy8gUmVwZWF0IG9uY2UgYWdhaW4gd2l0aCByZW1haW5pbmcgaW5kaXZpZHVhbEN1dFBpZWNlc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBFeGFtcGxlJyk7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNDkuODc1LCAzKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uMng0ID0gbmV3IENyb3NzU2VjdGlvbigyLDQpO1xyXG4gICAgbGV0IHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogU2VlLVNhdycpO1xyXG4gICAgXHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzUrNS8xNiwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDMwKzIxLzMyLCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMjIuNSwgNCksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjR4NCA9IG5ldyBDcm9zc1NlY3Rpb24oNCw0KTtcclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDQsIDQsIDcyLCAxMi4yOCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoNCwgNCwgOTYsIDE1LjQ4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSg0LCA0LCAxMjAsIDIyLjM4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSg0LCA0LCAxNDQsIDI3LjQ4KSxcclxuICAgIF07XHJcbiAgICBcclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudC5pbml0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG4gICAgd2luZG93LmN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50ID0gY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQ7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTYXcgSG9yc2VzJyk7XHJcblxyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM2LCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzIrMS84LCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzQsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBXb29kIFNoZWQnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgMTQ0LCA0NjIpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDE2KjEyLCA2MTYpLFxyXG4gICAgXTtcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTUqMTIrMTEsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxNSoxMis0LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNyoxMiwgMzIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA4LjUsIDgpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA1KjEyKzEwLCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMioxMis5LCA2KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMioxMisxMS41LCAyKSxcclxuICAgIF07XHJcblxyXG4gICAgLy8gSVNTVUU6IFZlcnkgbG9uZyB0aW1lXHJcbiAgICAvL2RlYnVnZ2VyO1xyXG4gICAgLy9jdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgd2luZG93LmN1dExpc3RDYWxjdWxhdG9yID0gY3V0TGlzdENhbGN1bGF0b3I7XHJcbn0pKCk7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwiQ29uZmlybU1vZGFsQ29tcG9uZW50IiwiaGFuZGxlQWNjZXB0IiwicXVlc3Rpb25UZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiYWNjZXB0VGV4dCIsInJlamVjdFRleHQiLCJlbGVtZW50IiwiaGFuZGxlQWNjZXB0Q2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZSIsImhhbmRsZVJlamVjdENsaWNrIiwicmVuZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFjY2VwdEJ0biIsInJlamVjdEJ0biIsIm1vZGFsQ29udGVudCIsImFwcGVuZENoaWxkIiwic3RvcFByb3BhZ2F0aW9uIiwiRm9vdGVyQ29tcG9uZW50IiwiQ3V0UGllY2VTZWN0aW9uQ29tcG9uZW50IiwiVW5jdXRQaWVjZVNlY3Rpb25Db21wb25lbnQiLCJDdXRMaXN0Q29tcG9uZW50IiwiY3V0TGlzdENhbGN1bGF0b3IiLCJjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCIsImN1dFBpZWNlU2VjdGlvbkNvbXBvbmVudCIsInVuY3V0UGllY2VTZWN0aW9uQ29tcG9uZW50IiwiYmVzdEN1dExpc3QiLCJjdXRMaXN0Q29tcG9uZW50IiwiY3V0TGlzdEVycm9yRWxlbWVudCIsImluaXQiLCJpbml0Q3V0UGllY2VzIiwiaW5pdFVuY3V0UGllY2VzIiwiaW5pdEJlc3RDdXRMaXN0IiwibWFpbkVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5IiwiZm9yRWFjaCIsImN1dFBpZWNlIiwiYWRkQ3V0UGllY2UiLCJ1bmN1dFBpZWNlIiwiYWRkVW5jdXRQaWVjZSIsImNyZWF0ZUN1dExpc3RCdG4iLCJoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2siLCJjdXRQaWVjZXMiLCJnZXRDdXRQaWVjZXMiLCJ1bmN1dFBpZWNlcyIsImdldFVuY3V0UGllY2VzIiwic2hvd0N1dExpc3RFcnJvciIsImNsZWFyQ3V0TGlzdEVycm9yIiwiZ2V0Q2hlYXBlc3RDdXRMaXN0IiwiY3V0TGlzdCIsImVycm9yTXNnIiwiY2xhc3NMaXN0IiwidGV4dENvbnRlbnQiLCJhZGQiLCJDdXRTZXF1ZW5jZUNvbXBvbmVudCIsImNsZWFyIiwibWF0ZXJpYWxMaXN0VGFibGUiLCJtYXRlcmlhbExpc3QiLCJnZXRNYXRlcmlhbExpc3QiLCJtYXRlcmlhbExpc3RUYWJsZUJvZHkiLCJ0b3RhbFByaWNlIiwiY3VyclByaWNlIiwidW5jdXRMZW5ndGgiLCJ1bmN1dE9iaiIsIk9iamVjdCIsImVudHJpZXMiLCJxdWFudGl0eSIsInVuaXRQcmljZSIsInRvRml4ZWQiLCJjdXRTZXF1ZW5jZXNUYWJsZSIsImN1dFNlcXVlbmNlc1RhYmxlQm9keSIsImN1dFNlcXVlbmNlcyIsImN1dFNlcXVlbmNlIiwiYXBwZW5kIiwibmV3Q3V0TGlzdCIsInNjcm9sbEludG9WaWV3IiwiQ3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCIsIkN1dFBpZWNlQ29tcG9uZW50IiwiZWRpdENhbGxiYWNrIiwiZGVsZXRlQ2FsbGJhY2siLCJoYW5kbGVFZGl0Q2xpY2siLCJjbGVhckVsZW1lbnQiLCJoYW5kbGVFZGl0Q29uZmlybSIsImhhbmRsZUVkaXRDYW5jZWwiLCJwcmV2ZW50RGVmYXVsdCIsInRoaWNrbmVzcyIsIk51bWJlciIsInRhcmdldCIsImVsZW1lbnRzIiwibmFtZWRJdGVtIiwidmFsdWUiLCJ3aWR0aCIsImtlcmYiLCJoYW5kbGVEZWxldGVDbGljayIsImVkaXRCdG4iLCJkZWxldGVCdG4iLCJpc0lucHV0VmFsaWRMZW5ndGgiLCJDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQiLCJoYW5kbGVGb3JtU3VibWl0IiwiZm9ybUVsZW1lbnQiLCJ0ZW1wSW5wdXRFbGVtZW50IiwiZm9ybUlucHV0c0VsZW1lbnQiLCJ1cGRhdGVGb3JtIiwiaW5wdXRFbGVtZW50IiwiaW5wdXROYW1lIiwiaW5kZXgiLCJhcnIiLCJkZWZhdWx0VmFsdWUiLCJmb2N1cyIsImZvcm1CdG5Db250YWluZXIiLCJDdXRQaWVjZUxpc3RDb21wb25lbnQiLCJjdXRQaWVjZUNvbXBvbmVudHMiLCJjdXRQaWVjZUxpc3RFbGVtZW50IiwiYWRkQ3V0UGllY2VDb21wb25lbnQiLCJfbGVuIiwiY3V0UGllY2VDb21wb25lbnRzVG9BZGQiLCJBcnJheSIsIl9rZXkiLCJwdXNoIiwiY3V0UGllY2VDb21wb25lbnQiLCJyZW1vdmVDdXRQaWVjZUNvbXBvbmVudCIsIl9sZW4yIiwiY3V0UGllY2VDb21wb25lbnRzVG9SZW1vdmUiLCJfa2V5MiIsImluZGV4T2YiLCJzcGxpY2UiLCJyZW1vdmVDdXRQaWVjZSIsIl9sZW4zIiwiY3V0UGllY2VzVG9SZW1vdmUiLCJfa2V5MyIsImN1dFBpZWNlVG9SZW1vdmUiLCJmaW5kSW5kZXgiLCJnZXRQaWVjZXMiLCJtYXAiLCJDdXRQaWVjZSIsImN1dFBpZWNlTGlzdENvbXBvbmVudCIsImhhbmRsZUN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlQ3V0UGllY2VEZWxldGVDbGljayIsImhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCIsIm9sZEN1dFBpZWNlIiwibmV3Q3V0UGllY2UiLCJjdXRQaWVjZVRvRGVsZXRlIiwicHJlcGVuZCIsImhhbmRsZUN1dFBpZWNlRGVsZXRlQ29uZmlybSIsImhhbmRsZUN1dFBpZWNlTGlzdENsZWFyIiwicm93RWxlbWVudHMiLCJ0ZW1wUm93RWxlbWVudCIsInJlbWFpbmluZ0xlbmd0aCIsImNvcHlyaWdodFllYXIiLCJmb290ZXIiLCJjdXJyWWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRlbXBFbGVtZW50IiwiaWQiLCJVbmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQiLCJVbmN1dFBpZWNlQ29tcG9uZW50IiwicHJpY2UiLCJpc0lucHV0VmFsaWRQcmljZSIsIlVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IiwiVW5jdXRQaWVjZUxpc3RDb21wb25lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50cyIsInVuY3V0UGllY2VMaXN0RWxlbWVudCIsImFkZFVuY3V0UGllY2VDb21wb25lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkIiwidW5jdXRQaWVjZUNvbXBvbmVudCIsInJlbW92ZVVuY3V0UGllY2VDb21wb25lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlIiwicmVtb3ZlVW5jdXRQaWVjZSIsInVuY3V0UGllY2VzVG9SZW1vdmUiLCJ1bmN1dFBpZWNlVG9SZW1vdmUiLCJVbmN1dFBpZWNlIiwidW5jdXRQaWVjZUxpc3RDb21wb25lbnQiLCJoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNsaWNrIiwiaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQiLCJvbGRVbmN1dFBpZWNlIiwibmV3VW5jdXRQaWVjZSIsInVuY3V0UGllY2VUb0RlbGV0ZSIsImhhbmRsZVVuY3V0UGllY2VEZWxldGVDb25maXJtIiwiaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhciIsIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImdldFByaWNlIiwicmVkdWNlIiwiYWNjdW0iLCJjdXJyIiwiZGVlcENvcHkiLCJtYXRlcmlhbExpc3RPYmoiLCJnZXRDdXRMaXN0IiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsIkN1dFNlcXVlbmNlIiwiZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudCIsIm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwibWF4TnVtQXZhaWxhYmxlTGVuZ3RocyIsImxhc3ROb25aZXJvSW5kZXgiLCJmaW5kTGFzdEluZGV4IiwidmFsIiwiY291bnQiLCJzbGljZSIsImdldFBlcmNlbnRhZ2UiLCJudW0iLCJtYXhMYXN0Tm9uWmVyb0luZGV4IiwibWF4IiwicGVyY2VudGFnZSIsInNraXAiLCJmaXJzdE5vblplcm9WYWx1ZUluZGV4IiwiaW5jcmVtZW50IiwiZGVjcmVtZW50Iiwic29ydCIsImEiLCJiIiwiZmxhdE1hcCIsImZpbGwiLCJjdXRTZXF1ZW5jZUFyciIsImN1cnJDdXRMaXN0IiwiZnJvbSIsImNyZWF0ZUN1dFNlcXVlbmNlQXJyIiwiaW5jcmVtZW50VHJpZ2dlciIsImRlY3JlbWVudFRyaWdnZXIiLCJ0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJza2lwRmxhZyIsInBlcmNlbnRGYWN0b3JDb3VudGVyIiwicGVyY2VudE11bHRpcGxlRGlzcGxheSIsImZpbHRlciIsIndpbmRvdyIsInRvU3RyaW5nIiwiY3JlYXRlQ3V0U2VxdWVuY2UiLCJDcm9zc1NlY3Rpb24iLCJ0eXBlIiwicHJvcHMiLCJrZXkiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImNoaWxkIiwidGVtcFZhbHVlIiwiaXNOYU4iLCJzZXRDdXN0b21WYWxpZGl0eSIsInJlcG9ydFZhbGlkaXR5IiwiZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwiLCJwb3NzaWJsZUxlbmd0aHNBcnIiLCJjdXJyQ3V0U2VxdWVuY2UiLCJ0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsImJlc3RDdXQiLCJmaW5hbEN1dExpc3QiLCJjcm9zc1NlY3Rpb24yeDQiLCJjcm9zc1NlY3Rpb240eDQiXSwic291cmNlUm9vdCI6IiJ9