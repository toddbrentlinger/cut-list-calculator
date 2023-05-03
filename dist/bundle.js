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
/* harmony import */ var _confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./confirmModalComponent.js */ "./src/js/components/confirmModalComponent.js");













const cutListCalculatorComponent = (() => {
  let bestCutList;
  let cutPieceListComponent;
  let uncutPieceListComponent;
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
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('p', {}, 'Dimensional lumber comes in pre-determined lengths with their own individual prices (Uncut Pieces). Given the cut lengths of dimensional lumber required for your project (Cut Pieces) and the available pre-determined lengths, this app calculates the cheapest amount of lumber needed and provides the cut sequence for each uncut piece.'));

    // Add cut/uncut pieces list with create form after

    // Cut Pieces - Header
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('h2', {}, 'Cut Pieces:'));
    // Cut Pieces - Clear Button
    mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'class': 'clear-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'class': 'clear-btn'
    }, 'Clear All Cut Pieces')).addEventListener('click', handleCutPieceListClear);
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
    }, 'Clear All Uncut Pieces')).addEventListener('click', handleUncutPieceListClear);
    // Uncut Pieces - List
    uncutPieceListComponent = (0,_uncutPieceListComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
    mainElement.appendChild(uncutPieceListComponent.render());
    // Uncut Pieces - Create Form
    mainElement.appendChild((0,_uncutPieceCreateFormComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(handleUncutPieceAddFormSubmit).render());

    // Add any cut/uncut pieces passed as parameters
    initCutPieces.forEach(cutPiece => addCutPiece(cutPiece));
    initUncutPieces.forEach(uncutPiece => addUncutPiece(uncutPiece));

    // Add button that creates cut list with click event listener
    const createCutListBtn = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'id': 'create-cut-list-btn-container'
    })).appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('button', {
      'id': 'create-cut-list-btn'
    }, 'Create Cut List'));
    createCutListBtn.addEventListener('click', handleCreateCutListClick);

    // Add error message for cut list calculator button
    cutListErrorElement = mainElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_11__.createElement)('div', {
      'id': 'create-cut-list-error-msg'
    }));

    // Add calculated cut list
    cutListComponent = (0,_cutListComponent_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    mainElement.appendChild(cutListComponent.render());

    // Add footer component, passing in the first year of the app
    document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2023).render());
  }
  function addCutPiece(cutPiece) {
    cutPieceListComponent.addCutPieceComponent((0,_cutPieceComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(cutPiece, handleCutPieceEditClick, handleCutPieceDeleteClick));
    return cutPiece;
  }
  function addUncutPiece(uncutPiece) {
    uncutPieceListComponent.addUncutPieceComponent((0,_uncutPieceComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(uncutPiece, handleUncutPieceEditClick, handleUncutPieceDeleteClick));
    return uncutPiece;
  }
  function removeCutPiece(cutPieceToRemove) {
    cutPieceListComponent.removeCutPiece(cutPieceToRemove);
  }
  function removeUncutPiece(uncutPieceToRemove) {
    uncutPieceListComponent.removeUncutPiece(uncutPieceToRemove);
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
  function handleCutPieceEditClick(e) {}
  function handleUncutPieceEditClick(e) {}
  function handleCutPieceDeleteClick(cutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"])(() => {
      handleCutPieceDeleteConfirm(cutPieceToDelete);
    }).render());
  }
  function handleCutPieceDeleteConfirm(cutPieceToDelete) {
    console.log('Delete cut piece ' + cutPieceToDelete);
    removeCutPiece(cutPieceToDelete);
  }
  function handleUncutPieceDeleteClick(uncutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"])(() => {
      handleUncutPieceDeleteConfirm(uncutPieceToDelete);
    }).render());
  }
  function handleUncutPieceDeleteConfirm(uncutPieceToDelete) {
    console.log('Delete uncut piece ' + uncutPieceToDelete);
    removeUncutPiece(uncutPieceToDelete);
  }
  function handleCreateCutListClick() {
    const cutPieces = cutPieceListComponent.getPieces();
    const uncutPieces = uncutPieceListComponent.getPieces();
    if (!cutPieces.length) {
      // No cutpieces
      showCutListError('Add cut pieces to create a cut list');
      return;
    }
    if (!uncutPieces.length) {
      // No uncut pieces
      showCutListError('Add uncut pieces to create a cut list');
      return;
    }

    // If reach here, no errors to show. Remove any previous errors.
    clearCutListError();
    bestCutList = _cutListCalculator_js__WEBPACK_IMPORTED_MODULE_8__["default"].getCheapestCutList(cutPieceListComponent.getPieces(), uncutPieceListComponent.getPieces());
    cutListComponent.cutList = bestCutList;
  }
  function handleCutPieceListClear() {
    console.log('Clear Cut List');

    // Clear cut pieces displayed
    cutPieceListComponent.clear();
  }
  function handleUncutPieceListClear() {
    console.log('Clear Uncut List');

    // Clear uncut pieces displayed
    uncutPieceListComponent.clear();
  }
  function showCutListError(errorMsg) {
    cutListErrorElement.textContent = errorMsg;
  }
  function clearCutListError() {
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

function CutPieceComponent(cutPiece, editCallback, deleteCallback) {
  let element;
  const handleEditClick = function (e) {
    editCallback(e);
  };
  const handleDeleteClick = function () {
    deleteCallback(cutPiece);
  };
  const remove = function () {
    element.remove();
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'cut-piece'
      });
    } else {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
    const editBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Edit');
    const deleteBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Delete');

    // Add event listeners for buttons
    editBtn.addEventListener('click', handleEditClick);
    deleteBtn.addEventListener('click', handleDeleteClick);
    element.append((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.cutLength), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.quantity), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, cutPiece.kerf), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, editBtn, deleteBtn));
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
  const isInputValidLength = function (inputElement) {
    const tempValue = Number(inputElement.value);
    if (isNaN(tempValue)) {
      inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue <= 0) {
      inputElement.setCustomValidity('Must be greater than zero.');
    } else {
      inputElement.setCustomValidity('');
    }
    inputElement.reportValidity();
  };
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'cut-piece-create',
      'id': 'cut-piece-create-form',
      'class': 'piece-create-form'
    });
    let tempInputElement;

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
    tempInputElement.addEventListener('input', e => isInputValidLength(e.target));
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
    tempInputElement.addEventListener('input', e => isInputValidLength(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'cut-kerf'
    }, 'Kerf:'), tempInputElement));

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

function UncutPieceComponent(uncutPiece, editCallback, deleteCallback) {
  let element;
  const handleEditClick = function (e) {
    editCallback(e);
  };
  const handleDeleteClick = function () {
    deleteCallback(uncutPiece);
  };
  const remove = function () {
    element.remove();
  };
  const render = function () {
    if (element === undefined) {
      element = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
        'class': 'uncut-piece'
      });
    } else {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
    const editBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Edit');
    const deleteBtn = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {}, 'Delete');

    // Add event listeners for buttons
    editBtn.addEventListener('click', handleEditClick);
    deleteBtn.addEventListener('click', handleDeleteClick);
    element.append((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.crossSection.thickness), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.crossSection.width), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.length), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, uncutPiece.price), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div'), (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {}, editBtn, deleteBtn));
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
  const isInputValidLength = function (inputElement) {
    const tempValue = Number(inputElement.value);
    if (isNaN(tempValue)) {
      inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue <= 0) {
      inputElement.setCustomValidity('Must be greater than zero.');
    } else {
      inputElement.setCustomValidity('');
    }
    inputElement.reportValidity();
  };
  const isInputValidPrice = function (inputElement) {
    const tempValue = Number(inputElement.value);
    if (isNaN(tempValue)) {
      inputElement.setCustomValidity('Must be a number.');
    } else if (tempValue < 0) {
      inputElement.setCustomValidity('Must be greater than or equal to zero.');
    } else {
      inputElement.setCustomValidity('');
    }
    inputElement.reportValidity();
  };
  const render = function () {
    formElement = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', {
      'action': '',
      'method': 'get',
      'name': 'uncut-piece-create',
      'id': 'uncut-piece-create-form',
      'class': 'piece-create-form'
    });
    let tempInputElement;

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
    tempInputElement.addEventListener('input', e => isInputValidLength(e.target));
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
    tempInputElement.addEventListener('input', e => isInputValidPrice(e.target));
    formInputsElement.appendChild((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {
      'class': 'input-container'
    }, (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      'for': 'uncut-price'
    }, 'Price:'), tempInputElement));

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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container,\n.clear-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column;\n  border: 2px solid var(--base-black, black);\n  border-top: none; }\n  .cut-sequence:first-child {\n    border-top: 2px solid var(--base-black, black); }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    width: 100%; }\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4); }\n\n.modal-content {\n  background-color: #fefefe;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 80%; }\n\n.piece-create-form, .piece-list {\n  padding: 1rem; }\n\n.piece-create-form {\n  border: 2px solid var(--base-black, black);\n  margin: 1rem 0; }\n  .piece-create-form .form-inputs {\n    display: grid;\n    grid-template-columns: repeat(6, 1fr);\n    column-gap: 1rem; }\n    .piece-create-form .form-inputs .input-container {\n      display: grid; }\n  .piece-create-form .submit-container {\n    display: grid;\n    justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem; }\n\nh1, h2, h3 {\n  text-align: center; }\n\nh1 {\n  font-size: 1.7em; }\n\nh2 {\n  font-size: 1.5em;\n  margin: 0.83em 0; }\n\nh3 {\n  font-size: 1.2em;\n  margin: 1em 0; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n  table tbody tr:nth-child(odd) {\n    background-color: #d9d9d9; }\n  table tbody tr:nth-child(even) {\n    background-color: #bfbfbf; }\n  table th, table td {\n    padding: 0.5rem 1rem;\n    border: 2px solid var(--base-black, black); }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAQA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;;EAEI,aAAa;EACb,uBAAuB,EAAA;;AAK3B;EACI,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gBAAgB,EAAA;EAJpB;IAOQ,8CAA8C,EAAA;;AAItD;EACI,qBAAqB,EAAA;EADzB;IAIQ,WAAW,EAAA;;AAInB;EAEI,eAAe;EACf,UAAU;EACV,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,cAAc;EACd,uBAA8B;EAC9B,oCAAoC,EAAA;;AAGxC;EACI,yBAAyB;EACzB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,UAAU,EAAA;;AAGd;EACI,aAAa,EAAA;;AAGjB;EACI,0CAA0C;EAC1C,cAAc,EAAA;EAFlB;IArHI,aAAa;IACb,qCAA6C;IAC7C,gBAAgB,EAAA;IAmHpB;MAQY,aAAa,EAAA;EARzB;IAaQ,aAAa;IACb,uBAAuB,EAAA;;AAI/B;;;EAvII,aAAa;EACb,qCAA6C;EAC7C,gBAAgB,EAAA;;AA+IpB;EACI,kBAAkB,EAAA;;AAGtB;EACI,gBAAgB,EAAA;;AAGpB;EACI,gBAAgB;EAChB,gBAAgB,EAAA;;AAGpB;EACI,gBAAgB;EAChB,aAAa,EAAA;;AAGjB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA;EALtB;IASY,yBAAiC,EAAA;EAT7C;IAaY,yBAAiC,EAAA;EAb7C;IAkBQ,oBAAoB;IACpB,0CAA0C,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n@mixin baseGrid($nColumns: 6) {\r\n    display: grid;\r\n    grid-template-columns: repeat($nColumns, 1fr);\r\n    column-gap: 1rem;\r\n}\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container,\r\n.clear-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    border: 2px solid var(--base-black, black);\r\n    border-top: none;\r\n\r\n    &:first-child {\r\n        border-top: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.modal {\r\n    //display: none; // Hidden by default\r\n    position: fixed; // Stay in place\r\n    z-index: 1; // Sit on top\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%; // Full width\r\n    height: 100%; // Full height\r\n    overflow: auto; // Enable scroll if needed\r\n    background-color: rgb(0, 0, 0); // Fallback color\r\n    background-color: rgba(0, 0, 0, 0.4); // Black w/ opacity\r\n}\r\n\r\n.modal-content {\r\n    background-color: #fefefe;\r\n    margin: 15% auto; // 15% from the top and centered\r\n    padding: 20px;\r\n    border: 1px solid #888;\r\n    width: 80%; // Could be more or less, depending on screen size\r\n}\r\n\r\n.piece-create-form, .piece-list {\r\n    padding: 1rem;\r\n}\r\n\r\n.piece-create-form {\r\n    border: 2px solid var(--base-black, black);\r\n    margin: 1rem 0;\r\n\r\n    .form-inputs {\r\n        @include baseGrid;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        @include baseGrid;\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2, h3 {\r\n    text-align: center;\r\n}\r\n\r\nh1 {\r\n    font-size: 1.7em;\r\n}\r\n\r\nh2 {\r\n    font-size: 1.5em;\r\n    margin: 0.83em 0;\r\n}\r\n\r\nh3 {\r\n    font-size: 1.2em;\r\n    margin: 1em 0;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n\r\n    tbody {\r\n        tr:nth-child(odd) {\r\n            background-color: hsl(0, 0%, 85%);\r\n        }\r\n\r\n        tr:nth-child(even) {\r\n            background-color: hsl(0, 0%, 75%);\r\n        }\r\n    }\r\n\r\n    th, td {\r\n        padding: 0.5rem 1rem;\r\n        border: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
  uncutPieces = [new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 72, 12.28), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 96, 15.48), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 120, 22.38), new _js_uncutPiece_js__WEBPACK_IMPORTED_MODULE_4__.UncutPiece(crossSection4x4, 144, 27.48)];
  _js_cutListCalculator_js__WEBPACK_IMPORTED_MODULE_2__["default"].getCheapestCutList(cutPieces, uncutPieces);
  _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].init(cutPieces, uncutPieces);
  window.cutListCalculatorComponent = _js_components_cutListCalculatorComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzdCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDbkM7O0VBRUQ7RUFDQTtFQUNBOztFQUVBa00sTUFBTSxDQUFDbk0saUJBQWlCLEdBQUdBLGdFQUFpQjtBQUNoRCxDQUFDLEdBQUcsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jb25maXJtTW9kYWxDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRMaXN0Q29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUxpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFNlcXVlbmNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3QuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0U2VxdWVuY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91bmN1dFBpZWNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3M/YjMwZiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzcz8yMDNiIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29uZmlybU1vZGFsQ29tcG9uZW50KGhhbmRsZUFjY2VwdCwgcXVlc3Rpb25UZXh0ID0gJ0FyZSB5b3Ugc3VyZT8nLCBhY2NlcHRUZXh0ID0gJ1llcycsIHJlamVjdFRleHQgPSAnTm8nKSB7XHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIFxyXG4gICAgY29uc3QgaGFuZGxlQWNjZXB0Q2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIEFjY2VwdCBDbGljaycpO1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgaGFuZGxlQWNjZXB0KGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZWplY3RDbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgUmVqZWN0IENsaWNrJyk7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnbW9kYWwnfSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVSZWplY3RDbGljayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjY2VwdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHt9LCBhY2NlcHRUZXh0KTtcclxuICAgICAgICBjb25zdCByZWplY3RCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgcmVqZWN0VGV4dCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICBhY2NlcHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVBY2NlcHRDbGljayk7XHJcbiAgICAgICAgcmVqZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVqZWN0Q2xpY2spO1xyXG5cclxuICAgICAgICAvLyBNb2RhbCBDb250ZW50XHJcbiAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ21vZGFsLWNvbnRlbnQnfSwgXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgcXVlc3Rpb25UZXh0KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdtb2RhbC1jb250ZW50LWJ0bi1jb250YWluZXInfSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdEJ0bixcclxuICAgICAgICAgICAgICAgIHJlamVjdEJ0blxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXZlbnRzIGNsaWNrIGxpc3RlbmVyIG9uIG1vZGFsIGNvbnRhaW5lciBlbGVtZW50IGZyb20gYWN0aXZhdGluZyB0aGF0IGNsb3NlcyBtb2RhbFxyXG4gICAgICAgIC8vIHdoZW5ldmVyIHVzZXIgY2xpY2tzIGluc2lkZSBtb2RhbCBjb250ZW50IGVsZW1lbnQgaW5zdGVhZC5cclxuICAgICAgICBtb2RhbENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9mb290ZXIuanNcIjtcclxuXHJcbmltcG9ydCBDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudC5qc1wiO1xyXG5cclxuaW1wb3J0IEN1dFBpZWNlQ29tcG9uZW50IGZyb20gXCIuL2N1dFBpZWNlQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBDdXRQaWVjZUxpc3RDb21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VMaXN0Q29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VMaXN0Q29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VMaXN0Q29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBDdXRMaXN0Q29tcG9uZW50IGZyb20gXCIuL2N1dExpc3RDb21wb25lbnQuanNcIjtcclxuXHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tIFwiLi4vY3V0TGlzdENhbGN1bGF0b3IuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQge1VuY3V0UGllY2UsIENyb3NzU2VjdGlvbn0gZnJvbSBcIi4uL3VuY3V0UGllY2UuanNcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWxDb21wb25lbnQgZnJvbSBcIi4vY29uZmlybU1vZGFsQ29tcG9uZW50LmpzXCI7XHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuICAgIGxldCB1bmN1dFBpZWNlTGlzdENvbXBvbmVudDtcclxuICAgIGxldCBjdXRMaXN0Q29tcG9uZW50O1xyXG4gICAgbGV0IGN1dExpc3RFcnJvckVsZW1lbnQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChpbml0Q3V0UGllY2VzID0gW10sIGluaXRVbmN1dFBpZWNlcyA9IFtdLCBpbml0QmVzdEN1dExpc3QgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IGluaXRCZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xyXG4gICAgICAgIGlmIChtYWluRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXNjcmlwdGlvblxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgXHJcbiAgICAgICAgICAgICdEaW1lbnNpb25hbCBsdW1iZXIgY29tZXMgaW4gcHJlLWRldGVybWluZWQgbGVuZ3RocyB3aXRoIHRoZWlyIG93biBpbmRpdmlkdWFsIHByaWNlcyAoVW5jdXQgUGllY2VzKS4gR2l2ZW4gdGhlIGN1dCBsZW5ndGhzIG9mIGRpbWVuc2lvbmFsIGx1bWJlciByZXF1aXJlZCBmb3IgeW91ciBwcm9qZWN0IChDdXQgUGllY2VzKSBhbmQgdGhlIGF2YWlsYWJsZSBwcmUtZGV0ZXJtaW5lZCBsZW5ndGhzLCB0aGlzIGFwcCBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBhbW91bnQgb2YgbHVtYmVyIG5lZWRlZCBhbmQgcHJvdmlkZXMgdGhlIGN1dCBzZXF1ZW5jZSBmb3IgZWFjaCB1bmN1dCBwaWVjZS4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQvdW5jdXQgcGllY2VzIGxpc3Qgd2l0aCBjcmVhdGUgZm9ybSBhZnRlclxyXG5cclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gSGVhZGVyXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDInLCB7fSwgJ0N1dCBQaWVjZXM6JykpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyIEFsbCBDdXQgUGllY2VzJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3V0UGllY2VMaXN0Q2xlYXIpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBMaXN0XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBIZWFkZXJcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMicsIHt9LCAnVW5jdXQgUGllY2VzOicpKTtcclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyIEFsbCBVbmN1dCBQaWVjZXMnKVxyXG4gICAgICAgICkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVVbmN1dFBpZWNlTGlzdENsZWFyKTtcclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBMaXN0XHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQgPSBVbmN1dFBpZWNlTGlzdENvbXBvbmVudCgpO1xyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBDcmVhdGUgRm9ybVxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVVbmN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgYW55IGN1dC91bmN1dCBwaWVjZXMgcGFzc2VkIGFzIHBhcmFtZXRlcnNcclxuICAgICAgICBpbml0Q3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlKSA9PiBhZGRDdXRQaWVjZShjdXRQaWVjZSkpO1xyXG4gICAgICAgIGluaXRVbmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlKSA9PiBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJ1dHRvbiB0aGF0IGNyZWF0ZXMgY3V0IGxpc3Qgd2l0aCBjbGljayBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUN1dExpc3RCdG4gPSBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydpZCc6ICdjcmVhdGUtY3V0LWxpc3QtYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsnaWQnOiAnY3JlYXRlLWN1dC1saXN0LWJ0bid9LCAnQ3JlYXRlIEN1dCBMaXN0JylcclxuICAgICAgICApO1xyXG4gICAgICAgIGNyZWF0ZUN1dExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2spO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXJyb3IgbWVzc2FnZSBmb3IgY3V0IGxpc3QgY2FsY3VsYXRvciBidXR0b25cclxuICAgICAgICBjdXRMaXN0RXJyb3JFbGVtZW50ID0gbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3JlYXRlLWN1dC1saXN0LWVycm9yLW1zZyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYWxjdWxhdGVkIGN1dCBsaXN0XHJcbiAgICAgICAgY3V0TGlzdENvbXBvbmVudCA9IEN1dExpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjdXRMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGZvb3RlciBjb21wb25lbnQsIHBhc3NpbmcgaW4gdGhlIGZpcnN0IHllYXIgb2YgdGhlIGFwcFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoRm9vdGVyKDIwMjMpLnJlbmRlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXRQaWVjZShjdXRQaWVjZSkge1xyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRDdXRQaWVjZUNvbXBvbmVudChcclxuICAgICAgICAgICAgQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UsIGhhbmRsZUN1dFBpZWNlRWRpdENsaWNrLCBoYW5kbGVDdXRQaWVjZURlbGV0ZUNsaWNrKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpIHtcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRVbmN1dFBpZWNlQ29tcG9uZW50KFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlQ29tcG9uZW50KHVuY3V0UGllY2UsIGhhbmRsZVVuY3V0UGllY2VFZGl0Q2xpY2ssIGhhbmRsZVVuY3V0UGllY2VEZWxldGVDbGljaylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDdXRQaWVjZShjdXRQaWVjZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbW92ZUN1dFBpZWNlKGN1dFBpZWNlVG9SZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVVuY3V0UGllY2UodW5jdXRQaWVjZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQucmVtb3ZlVW5jdXRQaWVjZSh1bmN1dFBpZWNlVG9SZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgQ3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IGN1dFBpZWNlID0gbmV3IEN1dFBpZWNlKFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3F1YW50aXR5JykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdrZXJmJykudmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRDdXRQaWVjZShjdXRQaWVjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIFVuY3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IHVuY3V0UGllY2UgPSBuZXcgVW5jdXRQaWVjZShcclxuICAgICAgICAgICAgbmV3IENyb3NzU2VjdGlvbihOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdwcmljZScpLnZhbHVlKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZFVuY3V0UGllY2UodW5jdXRQaWVjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3V0UGllY2VFZGl0Q2xpY2soZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrKGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3V0UGllY2VEZWxldGVDbGljayhjdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKFxyXG4gICAgICAgICAgICBDb25maXJtTW9kYWxDb21wb25lbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ3V0UGllY2VEZWxldGVDb25maXJtKGN1dFBpZWNlVG9EZWxldGUpXHJcbiAgICAgICAgICAgIH0pLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZURlbGV0ZUNvbmZpcm0oY3V0UGllY2VUb0RlbGV0ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGUgY3V0IHBpZWNlICcgKyBjdXRQaWVjZVRvRGVsZXRlKTtcclxuICAgICAgICByZW1vdmVDdXRQaWVjZShjdXRQaWVjZVRvRGVsZXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVVbmN1dFBpZWNlRGVsZXRlQ2xpY2sodW5jdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKFxyXG4gICAgICAgICAgICBDb25maXJtTW9kYWxDb21wb25lbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNvbmZpcm0odW5jdXRQaWVjZVRvRGVsZXRlKVxyXG4gICAgICAgICAgICB9KS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNvbmZpcm0odW5jdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSB1bmN1dCBwaWVjZSAnICsgdW5jdXRQaWVjZVRvRGVsZXRlKTtcclxuICAgICAgICByZW1vdmVVbmN1dFBpZWNlKHVuY3V0UGllY2VUb0RlbGV0ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljaygpIHtcclxuICAgICAgICBjb25zdCBjdXRQaWVjZXMgPSBjdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCk7XHJcbiAgICAgICAgY29uc3QgdW5jdXRQaWVjZXMgPSB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5nZXRQaWVjZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKCFjdXRQaWVjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGN1dHBpZWNlc1xyXG4gICAgICAgICAgICBzaG93Q3V0TGlzdEVycm9yKCdBZGQgY3V0IHBpZWNlcyB0byBjcmVhdGUgYSBjdXQgbGlzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdW5jdXRQaWVjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHVuY3V0IHBpZWNlc1xyXG4gICAgICAgICAgICBzaG93Q3V0TGlzdEVycm9yKCdBZGQgdW5jdXQgcGllY2VzIHRvIGNyZWF0ZSBhIGN1dCBsaXN0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIG5vIGVycm9ycyB0byBzaG93LiBSZW1vdmUgYW55IHByZXZpb3VzIGVycm9ycy5cclxuICAgICAgICBjbGVhckN1dExpc3RFcnJvcigpO1xyXG5cclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChcclxuICAgICAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LmdldFBpZWNlcygpLCBcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjdXRMaXN0Q29tcG9uZW50LmN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZUxpc3RDbGVhcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2xlYXIgQ3V0IExpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgY3V0IHBpZWNlcyBkaXNwbGF5ZWRcclxuICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVVbmN1dFBpZWNlTGlzdENsZWFyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGVhciBVbmN1dCBMaXN0Jyk7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHVuY3V0IHBpZWNlcyBkaXNwbGF5ZWRcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dDdXRMaXN0RXJyb3IoZXJyb3JNc2cpIHtcclxuICAgICAgICBjdXRMaXN0RXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNc2c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJDdXRMaXN0RXJyb3IoKSB7XHJcbiAgICAgICAgY3V0TGlzdEVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudDtcclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlQ29tcG9uZW50IGZyb20gXCIuL2N1dFNlcXVlbmNlQ29tcG9uZW50LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRMaXN0Q29tcG9uZW50KGN1dExpc3QpIHtcclxuICAgIGxldCBlbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydpZCc6ICdjdXQtbGlzdCd9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXRMaXN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBIZWFkZXJcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gzJywge30sICdNYXRlcmlhbCBMaXN0OicpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGVcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3RUYWJsZSA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBIZWFkXHJcbiAgICAgICAgbWF0ZXJpYWxMaXN0VGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndGhlYWQnLCB7fSwgXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnUXVhbnRpdHknKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1VuY3V0IExlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnVW5pdCBQcmljZScpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnU3VtIFByaWNlJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbCBMaXN0IC0gVGFibGUgQm9keVxyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdCA9IGN1dExpc3QuZ2V0TWF0ZXJpYWxMaXN0KCk7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0VGFibGVCb2R5ID0gbWF0ZXJpYWxMaXN0VGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XHJcbiAgICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCBjdXJyUHJpY2U7XHJcbiAgICAgICAgZm9yIChjb25zdCBbdW5jdXRMZW5ndGgsIHVuY3V0T2JqXSBvZiBPYmplY3QuZW50cmllcyhtYXRlcmlhbExpc3QpKSB7XHJcbiAgICAgICAgICAgIGN1cnJQcmljZSA9IHVuY3V0T2JqLnF1YW50aXR5ICogdW5jdXRPYmoudW5pdFByaWNlO1xyXG4gICAgICAgICAgICBtYXRlcmlhbExpc3RUYWJsZUJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dE9iai5xdWFudGl0eSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dExlbmd0aCksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB1bmN1dE9iai51bml0UHJpY2UpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgY3VyclByaWNlLnRvRml4ZWQoMikpXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlICs9IGN1cnJQcmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5IC0gVG90YWwgUHJpY2VcclxuICAgICAgICBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J2NvbHNwYW4nOiAnMid9KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ3Jvdyd9LCAnVG90YWwgUHJpY2UnKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgdG90YWxQcmljZS50b0ZpeGVkKDIpKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBDdXQgU2VxdWVuY2VzXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMycsIHt9LCAnQ3V0IFNlcXVlbmNlczonKSk7XHJcblxyXG4gICAgICAgIC8vIEN1dCBTZXF1ZW5jZXMgLSBUYWJsZVxyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlc1RhYmxlID0gZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlcyAtIFRhYmxlIEhlYWRcclxuICAgICAgICBjdXRTZXF1ZW5jZXNUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0aGVhZCcsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbmN1dCBNZW1iZXInKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ0N1dCBMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1JlbWFpbmluZyBMZW5ndGgnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5XHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VzVGFibGVCb2R5ID0gY3V0U2VxdWVuY2VzVGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XHJcbiAgICAgICAgY3V0TGlzdC5jdXRTZXF1ZW5jZXMuZm9yRWFjaCgoY3V0U2VxdWVuY2UpID0+IHtcclxuICAgICAgICAgICAgY3V0U2VxdWVuY2VzVGFibGVCb2R5LmFwcGVuZCguLi5DdXRTZXF1ZW5jZUNvbXBvbmVudChjdXRTZXF1ZW5jZSkucmVuZGVyKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgICAgIGdldCBjdXRMaXN0KCkgeyByZXR1cm4gY3V0TGlzdDsgfSxcclxuICAgICAgICBzZXQgY3V0TGlzdChuZXdDdXRMaXN0KSB7IFxyXG4gICAgICAgICAgICBjdXRMaXN0ID0gbmV3Q3V0TGlzdDtcclxuICAgICAgICAgICAgY2xlYXIoKTtcclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlQ29tcG9uZW50KGN1dFBpZWNlLCBlZGl0Q2FsbGJhY2ssIGRlbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIFxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGVkaXRDYWxsYmFjayhlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQ2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWxldGVDYWxsYmFjayhjdXRQaWVjZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY3V0LXBpZWNlJ30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdEZWxldGUnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYnV0dG9uc1xyXG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0Q2xpY2spO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS50aGlja25lc3MpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2Uud2lkdGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UuY3V0TGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLnF1YW50aXR5KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLmtlcmYpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBlZGl0QnRuLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlQnRuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldCBjdXRQaWVjZSgpIHsgcmV0dXJuIGN1dFBpZWNlOyB9LFxyXG4gICAgICAgIHJlbW92ZSxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlRm9ybVN1Ym1pdCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGlzSW5wdXRWYWxpZExlbmd0aCA9IGZ1bmN0aW9uKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBWYWx1ZSA9IE51bWJlcihpbnB1dEVsZW1lbnQudmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoaXNOYU4odGVtcFZhbHVlKSkge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgYSBudW1iZXIuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wVmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0RWxlbWVudC5yZXBvcnRWYWxpZGl0eSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCB7XHJcbiAgICAgICAgICAgICdhY3Rpb24nOiAnJyxcclxuICAgICAgICAgICAgJ21ldGhvZCc6ICdnZXQnLFxyXG4gICAgICAgICAgICAnbmFtZSc6ICdjdXQtcGllY2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgJ2lkJzogJ2N1dC1waWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgICAgICdjbGFzcyc6ICdwaWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXBJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAnY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7J2NsYXNzJzogJ2Vycm9yJywgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ2N1dC13aWR0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAnY3V0LWxlbmd0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWxlbmd0aCd9LCAnTGVuZ3RoOicpLFxyXG4gICAgICAgICAgICAgICAgdGVtcElucHV0RWxlbWVudFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gUXVhbnRpdHlcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1xdWFudGl0eSd9LCAnUXVhbnRpdHk6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdudW1iZXInLCAnbmFtZSc6ICdxdWFudGl0eScsICdpZCc6ICdjdXQtcXVhbnRpdHknLCAndmFsdWUnOiAnMScsICdtaW4nOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBLZXJmXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdrZXJmJywgJ2lkJzogJ2N1dC1rZXJmJywgJ3ZhbHVlJzogJzAuMTI1JywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJ30pO1xyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQta2VyZid9LCAnS2VyZjonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIFN1Ym1pdCBDb250YWluZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdzdWJtaXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnc3VibWl0JywgJ3ZhbHVlJzogJ0FkZCd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHN1Ym1pdCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVGb3JtU3VibWl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUZvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpbnB1dCBmaWVsZHMgZm9yIGN1dCBsZW5ndGggYW5kIHF1YW50aXR5LCBsZWF2aW5nIG90aGVyIGlucHV0cyB3aXRoIHVzZXIgZW50ZXJlZCBkYXRhLlxyXG4gICAgICAgIC8vIEZvY3VzIGN1cnNvciBvbiBsYXN0IGlucHV0IHdoaWNoIHNob3VsZCBiZSBjdXQgbGVuZ3RoIGZpZWxkXHJcbiAgICAgICAgWydxdWFudGl0eScsICdsZW5ndGgnXS5mb3JFYWNoKChpbnB1dE5hbWUsIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50ID0gZm9ybUVsZW1lbnQuZWxlbWVudHMubmFtZWRJdGVtKGlucHV0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IGlucHV0RWxlbWVudC5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IGN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IGN1dFBpZWNlTGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgYWRkQ3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgIC8vIEFkZCBjdXQgcGllY2UgY29tcG9uZW50cyB0byBhcnJheVxyXG4gICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cy5wdXNoKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGN1dCBwaWVjZSBjb21wb25lbnRzIHRvIERPTVxyXG4gICAgICAgIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAgICAgY3V0UGllY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChjdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVDdXRQaWVjZUNvbXBvbmVudCA9IGZ1bmN0aW9uKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBjdXRQaWVjZUNvbXBvbmVudHMuaW5kZXhPZihjdXRQaWVjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlQ3V0UGllY2UgPSBmdW5jdGlvbiguLi5jdXRQaWVjZXNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlVG9SZW1vdmUgb2YgY3V0UGllY2VzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBjdXRQaWVjZUNvbXBvbmVudHMuZmluZEluZGV4KChjdXRQaWVjZUNvbXBvbmVudCkgPT4gY3V0UGllY2VDb21wb25lbnQuY3V0UGllY2UgPT09IGN1dFBpZWNlVG9SZW1vdmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgY3V0UGllY2VDb21wb25lbnRzW2luZGV4XS5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnRzIGZyb20gYXJyYXlcclxuICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnRzIGZyb20gZG9jdW1lbnRcclxuICAgICAgICB3aGlsZSAoY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQoY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldFBpZWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjdXRQaWVjZUNvbXBvbmVudHMubWFwKChjdXRQaWVjZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY3V0UGllY2VDb21wb25lbnQuY3V0UGllY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdCd9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBsYWJlbHMgZm9yIGxpc3QgKHRhYmxlIGhlYWQpXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWhlYWQnfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1RoaWNrbmVzcycpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdXaWR0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnUXVhbnRpdHknKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnS2VyZicpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGlzdCBib2R5ICh0YWJsZSBib2R5KVxyXG4gICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQgPSBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1ib2R5J30pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRDdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICBjbGVhcixcclxuICAgICAgICBnZXRQaWVjZXMsXHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2UsXHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0U2VxdWVuY2VDb21wb25lbnQoY3V0U2VxdWVuY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHJvd0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBSb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVuY3V0IFBpZWNlIChmaXJzdCByb3cgb25seSlcclxuICAgICAgICAgICAgLy8gQWRkIHVuY3V0IHBpZWNlIGlmIGZpcnN0IHJvdyBPUiBhZGQgcm93IHRoYXQgc3BhbnMgcmVzdCBvZiByb3dzIGZvciB0aGlzIGN1dCBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBgJHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi50aGlja25lc3N9eCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24ud2lkdGh9eCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGh9YClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywgeydyb3dzcGFuJzogYXJyLmxlbmd0aCAtIDF9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3V0IFBpZWNlc1xyXG4gICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGN1dFBpZWNlLmN1dExlbmd0aClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbWFpbmluZyBMZW5ndGggKGxhc3Qgcm93IG9ubHkpXHJcbiAgICAgICAgICAgIC8vIEFkZCByZW1haW5pbmcgbGVuZ3RoIGlmIGxhc3Qgcm93IE9SIHJvdyB0aGF0IHNwYW5zIHJlc3Qgb2Ygcm93cyBmb3IgdGhpcyBjdXQgc2VxdWVuY2UuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgYHdpdGggJHtjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGh9IHJlbWFpbmluZ2ApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsncm93c3Bhbic6IGFyci5sZW5ndGggLSAxfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb3cgZWxlbWVudCB0byBhcnJheSBvZiBvdGhlciByb3cgZWxlbWVudHNcclxuICAgICAgICAgICAgcm93RWxlbWVudHMucHVzaCh0ZW1wUm93RWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gcm93RWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIoY29weXJpZ2h0WWVhcikge1xyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XHJcbiAgICAgICAgY29uc3QgY3VyclllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIC8vIFBhcmFncmFwaCBlbGVtZW50IGFzIGNoaWxkIG9mIGZvb3RlclxyXG4gICAgICAgIGxldCB0ZW1wRWxlbWVudCA9IGZvb3Rlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xyXG5cclxuICAgICAgICAvLyBTbWFsbCBlbGVtZW50IGFzIGNoaWxkIG9mIHBhcmFncmFwaFxyXG4gICAgICAgIHRlbXBFbGVtZW50ID0gdGVtcEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnc21hbGwnLCB7fSxcclxuICAgICAgICAgICAgJ1NvdXJjZSBDb2RlIMKpICcsXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RpbWUnLCB7aWQ6ICdjb3B5cmlnaHQteWVhcid9LCBjdXJyWWVhciA+IGNvcHlyaWdodFllYXIgPyBgJHtjb3B5cmlnaHRZZWFyfS0ke2N1cnJZZWFyfWAgOiBjb3B5cmlnaHRZZWFyKSxcclxuICAgICAgICAgICAgJyBUb2RkIEJyZW50bGluZ2VyLCBTYW50YSBDcnV6LCBDQSwgVVNBLiBBbGwgUmlnaHRzIFJlc2VydmVkLidcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvb3RlcjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXIsfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVW5jdXRQaWVjZUNvbXBvbmVudCh1bmN1dFBpZWNlLCBlZGl0Q2FsbGJhY2ssIGRlbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIFxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGVkaXRDYWxsYmFjayhlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQ2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWxldGVDYWxsYmFjayh1bmN1dFBpZWNlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICd1bmN1dC1waWVjZSd9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgJ0VkaXQnKTtcclxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgJ0RlbGV0ZScpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBidXR0b25zXHJcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUVkaXRDbGljayk7XHJcbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGVsZXRlQ2xpY2spO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UuY3Jvc3NTZWN0aW9uLnRoaWNrbmVzcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi53aWR0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLmxlbmd0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLnByaWNlKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGVkaXRCdG4sXHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0IHVuY3V0UGllY2UoKSB7IHJldHVybiB1bmN1dFBpZWNlOyB9LFxyXG4gICAgICAgIHJlbW92ZSxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgaXNJbnB1dFZhbGlkTGVuZ3RoID0gZnVuY3Rpb24oaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGVtcFZhbHVlID0gTnVtYmVyKGlucHV0RWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChpc05hTih0ZW1wVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBhIG51bWJlci4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRlbXBWYWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnJlcG9ydFZhbGlkaXR5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGlzSW5wdXRWYWxpZFByaWNlID0gZnVuY3Rpb24oaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGVtcFZhbHVlID0gTnVtYmVyKGlucHV0RWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChpc05hTih0ZW1wVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBhIG51bWJlci4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRlbXBWYWx1ZSA8IDApIHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCdNdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dEVsZW1lbnQucmVwb3J0VmFsaWRpdHkoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAndW5jdXQtcGllY2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgJ2lkJzogJ3VuY3V0LXBpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWNyZWF0ZS1mb3JtJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgdGVtcElucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzXHJcbiAgICAgICAgY29uc3QgZm9ybUlucHV0c0VsZW1lbnQgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdmb3JtLWlucHV0cyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFRoaWNrbmVzc1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtdGhpY2tuZXNzJ30sICdUaGlja25lc3M6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAndGhpY2tuZXNzJywgJ2lkJzogJ3VuY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gV2lkdGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LXdpZHRoJ30sICdXaWR0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd3aWR0aCcsICdpZCc6ICd1bmN1dC13aWR0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAndW5jdXQtbGVuZ3RoJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJ30pO1xyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFByaWNlXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdwcmljZScsICdpZCc6ICd1bmN1dC1wcmljZScsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZFByaWNlKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1wcmljZSd9LCAnUHJpY2U6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBTdWJtaXQgQ29udGFpbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnc3VibWl0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdBZGQnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlRm9ybVN1Ym1pdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZmllbGRzIGZvciBjdXQgbGVuZ3RoIGFuZCBxdWFudGl0eSwgbGVhdmluZyBvdGhlciBpbnB1dHMgd2l0aCB1c2VyIGVudGVyZWQgZGF0YS5cclxuICAgICAgICAvLyBGb2N1cyBjdXJzb3Igb24gbGFzdCBpbnB1dCB3aGljaCBzaG91bGQgYmUgY3V0IGxlbmd0aCBmaWVsZFxyXG4gICAgICAgIFsncHJpY2UnLCAnbGVuZ3RoJ10uZm9yRWFjaCgoaW5wdXROYW1lLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudCA9IGZvcm1FbGVtZW50LmVsZW1lbnRzLm5hbWVkSXRlbShpbnB1dE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBpbnB1dEVsZW1lbnQuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAoYXJyLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IHVuY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBsZXQgdW5jdXRQaWVjZUxpc3RFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGFkZFVuY3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMucHVzaCguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodW5jdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHVuY3V0UGllY2VDb21wb25lbnRzLmluZGV4T2YodW5jdXRQaWVjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudC5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZXNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VUb1JlbW92ZSBvZiB1bmN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdW5jdXRQaWVjZUNvbXBvbmVudHMuZmluZEluZGV4KCh1bmN1dFBpZWNlQ29tcG9uZW50KSA9PiB1bmN1dFBpZWNlQ29tcG9uZW50LnVuY3V0UGllY2UgPT09IHVuY3V0UGllY2VUb1JlbW92ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzW2luZGV4XS5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnRzIGZyb20gYXJyYXlcclxuICAgICAgICB1bmN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZWxlbWVudHMgZnJvbSBkb2N1bWVudFxyXG4gICAgICAgIHdoaWxlICh1bmN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQodW5jdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0UGllY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuY3V0UGllY2VDb21wb25lbnRzLm1hcCgodW5jdXRQaWVjZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5jdXRQaWVjZUNvbXBvbmVudC51bmN1dFBpZWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1ByaWNlJyksXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGlzdCBib2R5ICh0YWJsZSBib2R5KVxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0RWxlbWVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWJvZHknfSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZFVuY3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgY2xlYXIsXHJcbiAgICAgICAgZ2V0UGllY2VzLFxyXG4gICAgICAgIHJlbW92ZVVuY3V0UGllY2UsXHJcbiAgICAgICAgcmVtb3ZlVW5jdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDdXRMaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKGN1dFNlcXVlbmNlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBjdXRTZXF1ZW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoKGN1dFNlcXVlbmNlKSB7XHJcbiAgICAgICAgLy8gVE9ETzogVHlwZSBjaGVja1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5wdXNoKGN1dFNlcXVlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcmljZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXRTZXF1ZW5jZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLnVuY3V0UGllY2UucHJpY2UsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZXBDb3B5KCkge1xyXG4gICAgICAgIGxldCBjdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcyA9IFsuLi50aGlzLmN1dFNlcXVlbmNlc107XHJcbiAgICAgICAgcmV0dXJuIGN1dExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF0ZXJpYWxMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGggaW4gbWF0ZXJpYWxMaXN0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdLnF1YW50aXR5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmljZTogY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsTGlzdE9iajtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGN1dExpc3QgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIGdldEN1dExpc3Q6IChyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXRMZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0TGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0TGVuZ3RoIHRoYXQgY2FuIGJlIGN1dCB3aXRoIHJlbWFpbmluZ0xlbmd0aCAoSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgJiYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0uY3V0V2l0aEtlcmYgPCByZW1haW5pbmdMZW5ndGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0ZWRDdXRQaWVjZUluZGV4IGlzIHN0aWxsIHVuZGVmaW5lZCAtIEFsbCBjdXRMZW5ndGgra2VyZiBhcmUgbW9yZSB0aGFuIHJlbWFpbmluZ0xlbmd0aFxyXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHJlbWFpbmluZyBsZW5ndGhcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDdXRQaWVjZSA9IGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2Uoc2VsZWN0ZWRDdXRQaWVjZUluZGV4LCAxKV07XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2UsIFxyXG4gICAgICAgICAgICAuLi5jdXRMaXN0LmdldEN1dExpc3QoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3Q7XHJcbiIsImltcG9ydCB7IEN1dExpc3QgfSBmcm9tIFwiLi9jdXRMaXN0LmpzXCI7XHJcbmltcG9ydCBDdXRTZXF1ZW5jZSBmcm9tIFwiLi9jdXRTZXF1ZW5jZS5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRPRE86IFdoaWxlIGxvb3BpbmcgdGhyb3VnaCBjb21iaW5hdGlvbnMgb2YgdW5jdXQgcGllY2VzLCBpZiB0aGUgY29tYmluYXRpb24gXHJcbiAqIHByaWNlIGlzIGhpZ2hlciB0aGFuIHRoZSBjdXJyZW50IGJlc3QgY3V0IGxpc3QgcHJpY2UsIHRoZW4gY2FuIHNraXAuXHJcbiAqL1xyXG5cclxuY29uc3QgY3V0TGlzdENhbGN1bGF0b3IgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG1heE51bUF2YWlsYWJsZUxlbmd0aHMgXHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIEhvdyB0byBnZXQgbnVtYmVyIGZyb20gY291bnRlcj9cclxuICAgICAqIG1heCA9IFs1LDQsMywyXVxyXG4gICAgICogcG9zc2liaWxpdGllcyA9IDYqNSo0KjMgPSAzNjBcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDAsMCwwXVxyXG4gICAgICogWzBdIDFcclxuICAgICAqIFszXSArM1xyXG4gICAgICogNFxyXG4gICAgICogLSBGaXJzdCBpbmRleCBpcyBsYXN0IG5vbi16ZXJvIGluZGV4LCBhZGQgZmlyc3QgaW5kZXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAqIDMgKyAxID0gNFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsMCwwLDBdXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogNSArIDEgPSA2XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMywyLDAsMF1cclxuICAgICAqIFswLDBdIDFcclxuICAgICAqIFs1LDBdICs1XHJcbiAgICAgKiBbMCwxXSArMVxyXG4gICAgICogWzUsMV0gKzVcclxuICAgICAqIFswLDJdICsxXHJcbiAgICAgKiBbMywyXSArM1xyXG4gICAgICogMTZcclxuICAgICAqIFs1LDBdICs2XHJcbiAgICAgKiBbNSwxXSArNlxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDIpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDIgKiA2ID0gMTJcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICgzKzE9NClcclxuICAgICAqIDEyICsgNCA9IDE2XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSw0LDAsMF1cclxuICAgICAqIFs1LDBdICs2XHJcbiAgICAgKiBbNSwxXSArNlxyXG4gICAgICogWzUsMl0gKzZcclxuICAgICAqIFs1LDNdICs2XHJcbiAgICAgKiBbNSw0XSArNlxyXG4gICAgICogMzBcclxuICAgICAqIC0gRmlyc3Qgbm9uLXplcm8gaW5kZXggKDEpIHZhbHVlICg0KSAqIHByZXYgaW5kZXggKDApIGNvcnJlc3BvbmRpbmcgbWF4IHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA0ICogNiA9IDI0XHJcbiAgICAgKiAtIFBsdXMgZmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiAyNCArIDYgPSAzMFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzAsMCwxLDBdXHJcbiAgICAgKiBbNSw0LDAsMF0gKzMwXHJcbiAgICAgKiBbMCwwLDEsMF0gKzFcclxuICAgICAqIDMxXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDArMT0xKVxyXG4gICAgICogMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDEpIHZhbHVlICgwKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAwICogNiA9IDFcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMSkgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAxICsgMSAqICg2KjUpID0gMzFcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMywyXVxyXG4gICAgICogMzYwXHJcbiAgICAgKiAtIEZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogNlxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDEpIHZhbHVlICg0KSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDYgKyA0ICogNiA9IDMwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMikgdmFsdWUgKDMpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMzAgKyAzICogKDYqNSkgPSAzMCArIDMgKiAzMCA9IDEyMFxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDMpIHZhbHVlICgyKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEyMCArIDIgKiAoNio1KjQpID0gMTIwICsgMiAqIDEyMCA9IDEyMCArIDI0MCA9IDM2MFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKSB7XHJcbiAgICAgICAgLy8gSWYgYXJyYXkgaXMgZW1wdHkgcmV0dXJuIHplcm9cclxuICAgICAgICBpZiAoIW51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmxlbmd0aCkgeyBcclxuICAgICAgICAgICAgcmV0dXJuIDA7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGFzdE5vblplcm9JbmRleCA9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbmRMYXN0SW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgLy8gSWYgbGFzdE5vblplcm9JbmRleCBpcyAtMSwgYWxsIHZhbHVlcyBvZiBhcnJheSBhcmUgemVyby4gUmV0dXJuIG9uZSBjb3VudC5cclxuICAgICAgICBpZiAobGFzdE5vblplcm9JbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBsYXN0Tm9uWmVyb0luZGV4ID49IDAgYWZ0ZXIgZmluZExhc3RJbmRleCgpIGNhbGxcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb3VudCB0byBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGxldCBjb3VudCA9IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyWzBdICsgMTtcclxuXHJcbiAgICAgICAgLy8gRm9yIGV2ZXJ5IGluZGV4IGFmdGVyIHRoZSBmaXJzdCB1cCB0byBsYXN0Tm9uWmVyb0luZGV4LCBhZGQgdGhlIFxyXG4gICAgICAgIC8vIHByb2R1Y3Qgb2YgYWxsIHByZXZpb3VzIGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyBvbmVcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYXN0Tm9uWmVyb0luZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgY291bnQgKz0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaV0gKiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLnNsaWNlKDAsIGkpLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogKGN1cnIgKyAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKSB7XHJcbiAgICAgICAgY29uc3QgbnVtID0gZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1heExhc3ROb25aZXJvSW5kZXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLmZpbmRMYXN0SW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgY29uc3QgbWF4ID0gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAuc2xpY2UoMCwgbWF4TGFzdE5vblplcm9JbmRleCA9PT0gLTEgPyBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLmxlbmd0aCA6IG1heExhc3ROb25aZXJvSW5kZXggKyAxKVxyXG4gICAgICAgICAgICAubWFwKCh2YWwpID0+IHZhbCArIDEpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSAqIGN1cnIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAobnVtIC8gbWF4KSAqIDEwMDtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGBOdW06ICR7bnVtfSAtIE1heDogJHttYXh9IC0gJSR7cGVyY2VudGFnZS50b0ZpeGVkKDIpfWApO1xyXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNraXAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBleC4gY3Vycj1bMSwzLDAsMF0gbWF4PVszLDQsNCw1XSByZXN1bHRzIGluIGEgdmFsaWQgY3V0IGxpc3QuXHJcbiAgICAgICAgICogTmV4dCBpbmNyZW1lbnRzIG9mIFsyLDMsMCwwXSBhbmQgWzMsMywwLDBdIHdpbGwgYWx3YXlzIGJlIG1vcmUgZXhwZW5zaXZlIHRoYW4gWzEsMywwLDBdLlxyXG4gICAgICAgICAqIE1ha2UgZmlyc3Qgbm9uLXplcm8gdmFsdWUgMCBhbmQgaW5jcmVtZW50IHZhbHVlIGFmdGVyLlxyXG4gICAgICAgICAqIFswLDQsMCwwXSAtPiBjb250aW51ZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBjb25zdCBmaXJzdE5vblplcm9WYWx1ZUluZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZEluZGV4KCh2YWwpID0+IHZhbCA+IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChmaXJzdE5vblplcm9WYWx1ZUluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gQXJyYXkgaXMgZW1wdHkgT1IgYWxsIHZhbHVlcyBhcmUgemVyb1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltmaXJzdE5vblplcm9WYWx1ZUluZGV4XSA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsIGluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBmaXJzdCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlclxyXG4gICAgICAgIC8vIElmIG5ldyB2YWx1ZSBleGNlZWRzIHZhbHVlIGluIHNhbWUgaW5kZXggb2YgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAvLyBTZXQgaW5kZXggb2YgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgdG8gemVyb1xyXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgdmFsdWUgaW4gbmV4dCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlclxyXG4gICAgICAgICAgICAvLyBSZXBlYXQgdXNpbmcgcmVjdXJzaW9uXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHJlYWNoZWQgZW5kXHJcbiAgICAgICAgaWYgKGluZGV4ID49IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0rKztcclxuICAgICAgICBcclxuICAgICAgICBpZiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID4gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0pIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XS0tO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPCAwKSB7XHJcbiAgICAgICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMsICsraW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVtcHR5IHBpZWNlc1xyXG4gICAgICAgIGlmICghY3V0UGllY2VzLmxlbmd0aCB8fCAhdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgY3V0UGllY2VzIGJ5IGN1dExlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5jdXRMZW5ndGggLSBhLmN1dExlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgYXZhaWxhYmxlTGVuZ3Roc0FyciBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgLy9hdmFpbGFibGVMZW5ndGhzQXJyLnNvcnQoKGEsYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHVuY3V0UGllY2VzIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbGVuZ3RoXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZWFjaCBhdmFpbGFibGUgbGVuZ3RocyBuZWVkZWQgaWYgb25seSB1c2VkIHRoYXQgXHJcbiAgICAgICAgLy8gYXZhaWxhYmxlIGxlbmd0aCBmb3IgYWxsIGN1dFBpZWNlcyAoaW5pdGlhbGl6ZWQgdG8gemVybylcclxuICAgICAgICBsZXQgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlLCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvL21heE51bSA9IE1hdGguY2VpbCh0b3RhbEN1dExlbmd0aCAvIHVuY3V0UGllY2UubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2UubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAgICAgLy8gVE9ETzogRG8gbm90IG5lZWQgbWF4TnVtLiBPbmx5IG5lZWQgdG8gY2hlY2sgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBhbmQgc3RpbGwgaW5jcmVtZW50IGNvdW50IGluIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gVE9ETzogSW5maW5pdGUgbG9vcCBpZiBjdXQgcGllY2UgaXMgbG9uZ2VyIHRoYW4gdW5jdXQgcGllY2UgbGVuZ3RoLiBBcnJheSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IG5ldmVyIHJlYWNoZXMgemVyby5cclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHJlbWFpbmluZyB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgICAgICAgICAgLy8gbm8gbW9yZSBjdXQgcGllY2VzIGNhbiBiZSB1c2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggbnVtYmVyIG9mIGNvcnJlc3BvbmRpbmcgVW5jdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdCBvbmx5IGlmIE5PIGF2YWlsYWJsZSBjdXQgcGllY2VzIHN0aWxsIGxlZnRcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICYmICgoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgc2tpcEZsYWc7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGYWN0b3JDb3VudGVyID0gMTtcclxuICAgICAgICBsZXQgcGVyY2VudE11bHRpcGxlRGlzcGxheSA9IDU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyKTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlICYmIHBlcmNlbnRhZ2UgPiAocGVyY2VudE11bHRpcGxlRGlzcGxheSAqIHBlcmNlbnRGYWN0b3JDb3VudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cGVyY2VudGFnZS50b0ZpeGVkKDApfSVgKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRGYWN0b3JDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBhdmFpbGFibGUgY3V0IHBpZWNlcywgbm90IGVub3VnaCB1bmN1dCBwaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgY3VycmVudCBjdXQgbGlzdCBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHNraXBGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjdXQgbGlzdCBpcyBiZXR0ZXIgaWYgTk8gdW51c2VkIHVuY3V0IHBpZWNlcyAodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIGhhcyBhbGwgemVybyB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSAmJiAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5ldyBCZXN0IEN1dCBMaXN0IC0gQmVzdDogJHtiZXN0Q3V0TGlzdC5nZXRQcmljZSgpfSAtIEN1cnI6ICR7Y3VyckN1dExpc3QuZ2V0UHJpY2UoKX0gLSBUb3RhbDogJHtudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn0gLSBMZWZ0OiAke3RlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcbiAgICAgICAgd2luZG93LmJlc3RDdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN1dExlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGN1dExlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5jdXRMZW5ndGggPSBjdXRMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dExlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZSBmcm9tIFwiLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5jbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDdXRTZXF1ZW5jZSBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZX0gdW5jdXRQaWVjZSBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXRTZXF1ZW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2UubGVuZ3RoLCBcclxuICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHVuY3V0UGllY2UgbGVuZ3RoIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgLy8gZXZlcnkgaW5kaXZpZHVhbEN1dFBpZWNlIGlzIGxvbmdlciB0aGFuIHRoZSB1bmN1dFBpZWNlXHJcbiAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRTZXF1ZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dExlbmd0aCBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRMZW5ndGggPT0gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShpLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLCAwIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggb2YgbGFyZ2VzdCBjdXRMZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLkN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKFxyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nTGVuZ3RoIC0gc2VsZWN0ZWRDdXRQaWVjZS5jdXRXaXRoS2VyZiwgXHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0U2VxdWVuY2U7IiwiZXhwb3J0IGNsYXNzIENyb3NzU2VjdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3MgKHNtYWxsZXN0IGRpbWVuc2lvbikgb2YgcGllY2UgKGluY2hlcylcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCBXaWR0aCBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0aGlja25lc3MsIHdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlja25lc3M7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVW5jdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtDcm9zc1NlY3Rpb259IGNyb3NzU2VjdGlvbiBDcm9zcyBzZWN0aW9uIG9mIHVuY3V0IHBpZWNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY3Jvc3NTZWN0aW9uLCBsZW5ndGgsIHByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5jcm9zc1NlY3Rpb24gPSBjcm9zc1NlY3Rpb247XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRWxlbWVudCB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIEVsZW1lbnQgYXR0cmlidXRlIG5hbWVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIFxyXG4gKiBAcGFyYW0gIHsuLi5Ob2RlfSBjaGlsZHJlbiAtIFZhcmlhYmxlIG51bWJlciBvZiBjaGlsZCBub2RlcyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgICAvLyBQcm9wc1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hpbGRyZW4gTm9kZXNcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWxlbWVudC5hcHBlbmQoY2hpbGQpKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyB9XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTsgfVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGNvbnRlbnQ6IG5vbmU7IH1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21leWVyX3Jlc2V0LnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7RUFhQyxTQUFTO0VBQ1QsVUFBVTtFQUNWLFNBQVM7RUFDVCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHdCQUF3QixFQUFBOztBQUV6QixnREFBQTtBQUNBOztFQUVDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGNBQWMsRUFBQTs7QUFFZjtFQUNDLGdCQUFnQixFQUFBOztBQUVqQjtFQUNDLFlBQVksRUFBQTs7QUFFYjs7RUFFQyxXQUFXO0VBQ1gsYUFBYSxFQUFBOztBQUVkO0VBQ0MseUJBQXlCO0VBQ3pCLGlCQUFpQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tYmFzZS13aGl0ZTogaHNsKDAsIDAlLCA5NSUpO1xcbiAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7IH1cXG5cXG5odG1sIHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgY29sb3I6IHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTsgfVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcXFwiaGVhZGVyIGhlYWRlclxcXCJcXHIgXFxcIm1haW4gbWFpblxcXCJcXHIgXFxcImZvb3RlciBmb290ZXJcXFwiOyB9XFxuXFxuaGVhZGVyLFxcbm1haW4sXFxuZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDEuOHJlbTsgfVxcblxcbmhlYWRlciB7XFxuICBncmlkLWFyZWE6IGhlYWRlcjsgfVxcblxcbm1haW4ge1xcbiAgZ3JpZC1hcmVhOiBtYWluOyB9XFxuXFxuZm9vdGVyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZ3JpZC1hcmVhOiBmb290ZXI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsgfVxcblxcbiNjcmVhdGUtY3V0LWxpc3QtYnRuLWNvbnRhaW5lcixcXG4uY2xlYXItYnRuLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4uY3V0LXNlcXVlbmNlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcbiAgLmN1dC1zZXF1ZW5jZTpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7IH1cXG5cXG4uaW5wdXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmlucHV0LWNvbnRhaW5lciBsYWJlbCwgLmlucHV0LWNvbnRhaW5lciBpbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuXFxuLm1vZGFsIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDE7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpOyB9XFxuXFxuLm1vZGFsLWNvbnRlbnQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcXG4gIG1hcmdpbjogMTUlIGF1dG87XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzg4ODtcXG4gIHdpZHRoOiA4MCU7IH1cXG5cXG4ucGllY2UtY3JlYXRlLWZvcm0sIC5waWVjZS1saXN0IHtcXG4gIHBhZGRpbmc6IDFyZW07IH1cXG5cXG4ucGllY2UtY3JlYXRlLWZvcm0ge1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgbWFyZ2luOiAxcmVtIDA7IH1cXG4gIC5waWVjZS1jcmVhdGUtZm9ybSAuZm9ybS1pbnB1dHMge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgICBjb2x1bW4tZ2FwOiAxcmVtOyB9XFxuICAgIC5waWVjZS1jcmVhdGUtZm9ybSAuZm9ybS1pbnB1dHMgLmlucHV0LWNvbnRhaW5lciB7XFxuICAgICAgZGlzcGxheTogZ3JpZDsgfVxcbiAgLnBpZWNlLWNyZWF0ZS1mb3JtIC5zdWJtaXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4ucGllY2UtbGlzdCAucGllY2UtbGlzdC1oZWFkLFxcbi5waWVjZS1saXN0IC5waWVjZS1saXN0LWJvZHkgPiAuY3V0LXBpZWNlLFxcbi5waWVjZS1saXN0IC5waWVjZS1saXN0LWJvZHkgPiAudW5jdXQtcGllY2Uge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBjb2x1bW4tZ2FwOiAxcmVtOyB9XFxuXFxuaDEsIGgyLCBoMyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDEuN2VtOyB9XFxuXFxuaDIge1xcbiAgZm9udC1zaXplOiAxLjVlbTtcXG4gIG1hcmdpbjogMC44M2VtIDA7IH1cXG5cXG5oMyB7XFxuICBmb250LXNpemU6IDEuMmVtO1xcbiAgbWFyZ2luOiAxZW0gMDsgfVxcblxcbnRhYmxlIHtcXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIHRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcbiAgdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2JmYmZiZjsgfVxcbiAgdGFibGUgdGgsIHRhYmxlIHRkIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBUUE7RUFDSSw2QkFBYTtFQUNiLDZCQUFhLEVBQUE7O0FBR2pCO0VBQ0ksZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUV0QiwrQkFBK0I7RUFDL0IsMENBQTBDLEVBQUE7O0FBRzlDO0VBQ0ksbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0ksaUJBQWlCO0VBQ2pCLHdJQUF3STtFQUN4SSxpQkFBaUI7RUFFakIsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxpQ0FBaUM7RUFDakMsa0VBR21CLEVBQUE7O0FBR3ZCOzs7RUFHSSxlQUFlLEVBQUE7O0FBS25CO0VBQ0ksaUJBQWlCLEVBQUE7O0FBS3JCO0VBQ0ksZUFBZSxFQUFBOztBQUtuQjtFQUNJLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLG1CQUFtQixFQUFBOztBQUt2Qjs7RUFFSSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBSzNCO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtFQUN0QiwwQ0FBMEM7RUFDMUMsZ0JBQWdCLEVBQUE7RUFKcEI7SUFPUSw4Q0FBOEMsRUFBQTs7QUFJdEQ7RUFDSSxxQkFBcUIsRUFBQTtFQUR6QjtJQUlRLFdBQVcsRUFBQTs7QUFJbkI7RUFFSSxlQUFlO0VBQ2YsVUFBVTtFQUNWLE9BQU87RUFDUCxNQUFNO0VBQ04sV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2QsdUJBQThCO0VBQzlCLG9DQUFvQyxFQUFBOztBQUd4QztFQUNJLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVLEVBQUE7O0FBR2Q7RUFDSSxhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksMENBQTBDO0VBQzFDLGNBQWMsRUFBQTtFQUZsQjtJQXJISSxhQUFhO0lBQ2IscUNBQTZDO0lBQzdDLGdCQUFnQixFQUFBO0lBbUhwQjtNQVFZLGFBQWEsRUFBQTtFQVJ6QjtJQWFRLGFBQWE7SUFDYix1QkFBdUIsRUFBQTs7QUFJL0I7OztFQXZJSSxhQUFhO0VBQ2IscUNBQTZDO0VBQzdDLGdCQUFnQixFQUFBOztBQStJcEI7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxnQkFBZ0I7RUFDaEIsZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksZ0JBQWdCO0VBQ2hCLGFBQWEsRUFBQTs7QUFHakI7RUFDSSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsa0JBQWtCLEVBQUE7RUFMdEI7SUFTWSx5QkFBaUMsRUFBQTtFQVQ3QztJQWFZLHlCQUFpQyxFQUFBO0VBYjdDO0lBa0JRLG9CQUFvQjtJQUNwQiwwQ0FBMEMsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuQG1peGluIGJhc2VHcmlkKCRuQ29sdW1uczogNikge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgkbkNvbHVtbnMsIDFmcik7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gICAgLS1iYXNlLXdoaXRlOiBoc2woMCwgMCUsIDk1JSk7XFxyXFxuICAgIC0tYmFzZS1ibGFjazogaHNsKDAsIDAlLCAxMCUpO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gICAgZm9udC1zaXplOiA2Mi41JTsgLy8gMXJlbSA9IDEwcHhcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG4gICAgY29sb3I6IHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcclxcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxyXFxuICAgICAgICBcXFwiaGVhZGVyIGhlYWRlclxcXCJcXHJcXG4gICAgICAgIFxcXCJtYWluIG1haW5cXFwiXFxyXFxuICAgICAgICBcXFwiZm9vdGVyIGZvb3RlclxcXCI7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciwgXFxyXFxubWFpbiwgXFxyXFxuZm9vdGVyIHtcXHJcXG4gICAgcGFkZGluZzogMS44cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBIZWFkZXJcXHJcXG5cXHJcXG5oZWFkZXIge1xcclxcbiAgICBncmlkLWFyZWE6IGhlYWRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gTWFpbiBDb250ZW50XFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICAgIGdyaWQtYXJlYTogbWFpbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRm9vdGVyXFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgIGdyaWQtYXJlYTogZm9vdGVyO1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDdXN0b20gSURzXFxyXFxuXFxyXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyLFxcclxcbi5jbGVhci1idG4tY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8vIEN1c3RvbSBDbGFzc2VzXFxyXFxuXFxyXFxuLmN1dC1zZXF1ZW5jZSB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXHJcXG5cXHJcXG4gICAgJjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuXFxyXFxuICAgIGxhYmVsLCBpbnB1dCB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwge1xcclxcbiAgICAvL2Rpc3BsYXk6IG5vbmU7IC8vIEhpZGRlbiBieSBkZWZhdWx0XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDsgLy8gU3RheSBpbiBwbGFjZVxcclxcbiAgICB6LWluZGV4OiAxOyAvLyBTaXQgb24gdG9wXFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7IC8vIEZ1bGwgd2lkdGhcXHJcXG4gICAgaGVpZ2h0OiAxMDAlOyAvLyBGdWxsIGhlaWdodFxcclxcbiAgICBvdmVyZmxvdzogYXV0bzsgLy8gRW5hYmxlIHNjcm9sbCBpZiBuZWVkZWRcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDApOyAvLyBGYWxsYmFjayBjb2xvclxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7IC8vIEJsYWNrIHcvIG9wYWNpdHlcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRlbnQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcclxcbiAgICBtYXJnaW46IDE1JSBhdXRvOyAvLyAxNSUgZnJvbSB0aGUgdG9wIGFuZCBjZW50ZXJlZFxcclxcbiAgICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcclxcbiAgICB3aWR0aDogODAlOyAvLyBDb3VsZCBiZSBtb3JlIG9yIGxlc3MsIGRlcGVuZGluZyBvbiBzY3JlZW4gc2l6ZVxcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtY3JlYXRlLWZvcm0sIC5waWVjZS1saXN0IHtcXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWNyZWF0ZS1mb3JtIHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBtYXJnaW46IDFyZW0gMDtcXHJcXG5cXHJcXG4gICAgLmZvcm0taW5wdXRzIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGJhc2VHcmlkO1xcclxcblxcclxcbiAgICAgICAgLmlucHV0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc3VibWl0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWxpc3Qge1xcclxcbiAgICAucGllY2UtbGlzdC1oZWFkLCBcXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSA+IC5jdXQtcGllY2UsXFxyXFxuICAgIC5waWVjZS1saXN0LWJvZHkgPiAudW5jdXQtcGllY2Uge1xcclxcbiAgICAgICAgQGluY2x1ZGUgYmFzZUdyaWQ7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gTWlzY1xcclxcblxcclxcbmgxLCBoMiwgaDMge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjdlbTtcXHJcXG59XFxyXFxuXFxyXFxuaDIge1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbiAgICBtYXJnaW46IDAuODNlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG5oMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIG1hcmdpbjogMWVtIDA7XFxyXFxufVxcclxcblxcclxcbnRhYmxlIHtcXHJcXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgICB0Ym9keSB7XFxyXFxuICAgICAgICB0cjpudGgtY2hpbGQob2RkKSB7XFxyXFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCA4NSUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDc1JSk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgdGgsIHRkIHtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJfcmVzZXQuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZXMuc2Nzcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvciBmcm9tICcuL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzJztcclxuaW1wb3J0IEN1dFBpZWNlIGZyb20gJy4vanMvY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge0Nyb3NzU2VjdGlvbiwgVW5jdXRQaWVjZX0gZnJvbSAnLi9qcy91bmN1dFBpZWNlLmpzJztcclxuaW1wb3J0IHtjdXRMaXN0fSBmcm9tICcuL2pzL2N1dExpc3QuanMnO1xyXG5pbXBvcnQgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQgZnJvbSAnLi9qcy9jb21wb25lbnRzL2N1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmpzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBnZXRDdXRMaXN0V2l0aExlYXN0TGVmdG92ZXJNYXRlcmlhbChjdXRQaWVjZXMsIHBvc3NpYmxlTGVuZ3Roc0Fycikge1xyXG4gICAgICAgIC8vIFNvcnQgY3V0UGllY2VzIGJ5IGN1dExlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5jdXRMZW5ndGggLSBhLmN1dExlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgYSBzaW5nbGUgcXVhbnRpdHkgY3V0UGllY2VcclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIG5vcm1hbCBhcnJheSBvZiBjdXRQaWVjZXMgdGhhdCBoYXMgYW55IG51bWJlciBxdWFudGl0eSBpbiB0aGVcclxuICAgICAgICAvLyAncXVhbnRpdHknIHByb3BlcnR5LlxyXG4gICAgICAgIGxldCBpbmRpdmlkdWFsQ3V0UGllY2VzID0gY3V0UGllY2VzLmZsYXRNYXAoKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoY3V0UGllY2UucXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAuZmlsbChjdXRQaWVjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBlYWNoIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggaW4gY29ycmVzcG9uZGluZyBcclxuICAgICAgICAvLyBpbmRpdmlkdWFsQ3V0UGllY2VzIGFycmF5LiBJZiBhIGluZGl2aWR1YWwgQ3V0UGllY2UgaXMgc2VsZWN0ZWQgZm9yIFxyXG4gICAgICAgIC8vIGEgY3V0IHNlcXVlbmNlLCBpdCdzIGluZGV4IGlzIHJlbW92ZWQgZnJvbSB0aGlzIGFycmF5LlxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBjdXJyQ3V0U2VxdWVuY2UsIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBiZXN0Q3V0O1xyXG4gICAgICAgIGxldCBmaW5hbEN1dExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJlc3RDdXQgPSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcG9zc2libGVMZW5ndGhzQXJyLmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbIC4uLmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0U2VxdWVuY2UgPSBjdXRMaXN0LmdldEN1dExpc3QobGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICgoYmVzdEN1dC5jdXRTZXF1ZW5jZSA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IChiZXN0Q3V0LmN1dFNlcXVlbmNlWy0xXSA+IGN1cnJDdXRTZXF1ZW5jZVstMV0pXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmN1dFNlcXVlbmNlID0gY3VyckN1dFNlcXVlbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RDdXQuYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsuLi50ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmluYWxDdXRMaXN0LnB1c2goYmVzdEN1dC5jdXRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbIC4uLmJlc3RDdXQuYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbEN1dExpc3QpO1xyXG5cclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIGZpcnN0IHBvc3NpYmxlIGxlbmd0aFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBiZXN0Q3V0TGlzdCB0byBmaXJzdCBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCBjdXQgbGlzdCBmb3IgbmV4dCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBJZiBuZXcgY3V0IGxpc3QgaGFzIGxlc3MgcmVtYWluaW5nIGxlbmd0aCB0aGFuIGJlc3RDdXRMaXN0LCBzZXQgXHJcbiAgICAgICAgLy8gYmVzdEN1dExpc3QgdG8gbmV3IGN1dCBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSByZWFjaCBlbmQgb2YgcG9zc2libGUgbGVuZ3RoIGFycmF5LCBzYXZlIGJlc3RDdXRMaXN0IHRvIGZpbmFsIGN1dCBsaXN0IHNlcXVlbmNlXHJcblxyXG4gICAgICAgIC8vIFJlcGVhdCBvbmNlIGFnYWluIHdpdGggcmVtYWluaW5nIGluZGl2aWR1YWxDdXRQaWVjZXNcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogRXhhbXBsZScpO1xyXG5cclxuICAgIGxldCBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE5Ljg3NSwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM5Ljg3NSwgMyksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDQ5Ljg3NSwgMyksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjJ4NCA9IG5ldyBDcm9zc1NlY3Rpb24oMiw0KTtcclxuICAgIGxldCB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogU2VlLVNhdycpO1xyXG4gICAgXHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDM2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzUrNS8xNiwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDQsIDQsIDMwKzIxLzMyLCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMjIuNSwgNCksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGNyb3NzU2VjdGlvbjR4NCA9IG5ldyBDcm9zc1NlY3Rpb24oNCw0KTtcclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgNzIsIDEyLjI4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDk2LCAxNS40OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCAxMjAsIDIyLjM4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDE0NCwgMjcuNDgpLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmluaXQoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQgPSBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudDtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFNhdyBIb3JzZXMnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzNiwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDMyKzEvOCwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM0LCAyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogV29vZCBTaGVkJyk7XHJcblxyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTQ0LCA0NjIpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgMTYqMTIsIDYxNiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxNSoxMisxMSwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzQsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA3KjEyLCAzMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDguNSwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDUqMTIrMTAsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzksIDYpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzExLjUsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBJU1NVRTogVmVyeSBsb25nIHRpbWVcclxuICAgIC8vZGVidWdnZXI7XHJcbiAgICAvL2N1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3IgPSBjdXRMaXN0Q2FsY3VsYXRvcjtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJDb25maXJtTW9kYWxDb21wb25lbnQiLCJoYW5kbGVBY2NlcHQiLCJxdWVzdGlvblRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJhY2NlcHRUZXh0IiwicmVqZWN0VGV4dCIsImVsZW1lbnQiLCJoYW5kbGVBY2NlcHRDbGljayIsImUiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlIiwiaGFuZGxlUmVqZWN0Q2xpY2siLCJyZW5kZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiYWNjZXB0QnRuIiwicmVqZWN0QnRuIiwibW9kYWxDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJzdG9wUHJvcGFnYXRpb24iLCJGb290ZXIiLCJDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQiLCJVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCIsIkN1dFBpZWNlQ29tcG9uZW50IiwiQ3V0UGllY2VMaXN0Q29tcG9uZW50IiwiVW5jdXRQaWVjZUNvbXBvbmVudCIsIlVuY3V0UGllY2VMaXN0Q29tcG9uZW50IiwiQ3V0TGlzdENvbXBvbmVudCIsImN1dExpc3RDYWxjdWxhdG9yIiwiQ3V0UGllY2UiLCJVbmN1dFBpZWNlIiwiQ3Jvc3NTZWN0aW9uIiwiY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQiLCJiZXN0Q3V0TGlzdCIsImN1dFBpZWNlTGlzdENvbXBvbmVudCIsInVuY3V0UGllY2VMaXN0Q29tcG9uZW50IiwiY3V0TGlzdENvbXBvbmVudCIsImN1dExpc3RFcnJvckVsZW1lbnQiLCJpbml0IiwiaW5pdEN1dFBpZWNlcyIsImluaXRVbmN1dFBpZWNlcyIsImluaXRCZXN0Q3V0TGlzdCIsIm1haW5FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm9keSIsImhhbmRsZUN1dFBpZWNlTGlzdENsZWFyIiwiaGFuZGxlQ3V0UGllY2VBZGRGb3JtU3VibWl0IiwiaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhciIsImhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0IiwiZm9yRWFjaCIsImN1dFBpZWNlIiwiYWRkQ3V0UGllY2UiLCJ1bmN1dFBpZWNlIiwiYWRkVW5jdXRQaWVjZSIsImNyZWF0ZUN1dExpc3RCdG4iLCJoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2siLCJhZGRDdXRQaWVjZUNvbXBvbmVudCIsImhhbmRsZUN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlQ3V0UGllY2VEZWxldGVDbGljayIsImFkZFVuY3V0UGllY2VDb21wb25lbnQiLCJoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNsaWNrIiwicmVtb3ZlQ3V0UGllY2UiLCJjdXRQaWVjZVRvUmVtb3ZlIiwicmVtb3ZlVW5jdXRQaWVjZSIsInVuY3V0UGllY2VUb1JlbW92ZSIsInByZXZlbnREZWZhdWx0IiwiTnVtYmVyIiwidGFyZ2V0IiwiZWxlbWVudHMiLCJuYW1lZEl0ZW0iLCJ2YWx1ZSIsImN1dFBpZWNlVG9EZWxldGUiLCJwcmVwZW5kIiwiaGFuZGxlQ3V0UGllY2VEZWxldGVDb25maXJtIiwidW5jdXRQaWVjZVRvRGVsZXRlIiwiaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNvbmZpcm0iLCJjdXRQaWVjZXMiLCJnZXRQaWVjZXMiLCJ1bmN1dFBpZWNlcyIsInNob3dDdXRMaXN0RXJyb3IiLCJjbGVhckN1dExpc3RFcnJvciIsImdldENoZWFwZXN0Q3V0TGlzdCIsImN1dExpc3QiLCJjbGVhciIsImVycm9yTXNnIiwidGV4dENvbnRlbnQiLCJDdXRTZXF1ZW5jZUNvbXBvbmVudCIsIm1hdGVyaWFsTGlzdFRhYmxlIiwibWF0ZXJpYWxMaXN0IiwiZ2V0TWF0ZXJpYWxMaXN0IiwibWF0ZXJpYWxMaXN0VGFibGVCb2R5IiwidG90YWxQcmljZSIsImN1cnJQcmljZSIsInVuY3V0TGVuZ3RoIiwidW5jdXRPYmoiLCJPYmplY3QiLCJlbnRyaWVzIiwicXVhbnRpdHkiLCJ1bml0UHJpY2UiLCJ0b0ZpeGVkIiwiY3V0U2VxdWVuY2VzVGFibGUiLCJjdXRTZXF1ZW5jZXNUYWJsZUJvZHkiLCJjdXRTZXF1ZW5jZXMiLCJjdXRTZXF1ZW5jZSIsImFwcGVuZCIsIm5ld0N1dExpc3QiLCJlZGl0Q2FsbGJhY2siLCJkZWxldGVDYWxsYmFjayIsImhhbmRsZUVkaXRDbGljayIsImhhbmRsZURlbGV0ZUNsaWNrIiwiZWRpdEJ0biIsImRlbGV0ZUJ0biIsInRoaWNrbmVzcyIsIndpZHRoIiwiY3V0TGVuZ3RoIiwia2VyZiIsImhhbmRsZUZvcm1TdWJtaXQiLCJmb3JtRWxlbWVudCIsImlzSW5wdXRWYWxpZExlbmd0aCIsImlucHV0RWxlbWVudCIsInRlbXBWYWx1ZSIsImlzTmFOIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJyZXBvcnRWYWxpZGl0eSIsInRlbXBJbnB1dEVsZW1lbnQiLCJmb3JtSW5wdXRzRWxlbWVudCIsInVwZGF0ZUZvcm0iLCJpbnB1dE5hbWUiLCJpbmRleCIsImFyciIsImRlZmF1bHRWYWx1ZSIsImZvY3VzIiwiY3V0UGllY2VDb21wb25lbnRzIiwiY3V0UGllY2VMaXN0RWxlbWVudCIsIl9sZW4iLCJjdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsIkFycmF5IiwiX2tleSIsInB1c2giLCJjdXRQaWVjZUNvbXBvbmVudCIsInJlbW92ZUN1dFBpZWNlQ29tcG9uZW50IiwiX2xlbjIiLCJjdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSIsIl9rZXkyIiwiaW5kZXhPZiIsInNwbGljZSIsIl9sZW4zIiwiY3V0UGllY2VzVG9SZW1vdmUiLCJfa2V5MyIsImZpbmRJbmRleCIsIm1hcCIsInJvd0VsZW1lbnRzIiwidGVtcFJvd0VsZW1lbnQiLCJjcm9zc1NlY3Rpb24iLCJyZW1haW5pbmdMZW5ndGgiLCJjb3B5cmlnaHRZZWFyIiwiZm9vdGVyIiwiY3VyclllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0ZW1wRWxlbWVudCIsImlkIiwicHJpY2UiLCJpc0lucHV0VmFsaWRQcmljZSIsInVuY3V0UGllY2VDb21wb25lbnRzIiwidW5jdXRQaWVjZUxpc3RFbGVtZW50IiwidW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsInVuY3V0UGllY2VDb21wb25lbnQiLCJyZW1vdmVVbmN1dFBpZWNlQ29tcG9uZW50IiwidW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSIsInVuY3V0UGllY2VzVG9SZW1vdmUiLCJDdXRMaXN0IiwiY29uc3RydWN0b3IiLCJnZXRQcmljZSIsInJlZHVjZSIsImFjY3VtIiwiY3VyciIsImRlZXBDb3B5IiwibWF0ZXJpYWxMaXN0T2JqIiwiZ2V0Q3V0TGlzdCIsImluZGl2aWR1YWxDdXRQaWVjZXMiLCJhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Iiwic3RhcnRJbmRleCIsInNlbGVjdGVkQ3V0UGllY2VJbmRleCIsImkiLCJjdXRXaXRoS2VyZiIsInNlbGVjdGVkQ3V0UGllY2UiLCJDdXRTZXF1ZW5jZSIsImdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQiLCJudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciIsIm1heE51bUF2YWlsYWJsZUxlbmd0aHMiLCJsYXN0Tm9uWmVyb0luZGV4IiwiZmluZExhc3RJbmRleCIsInZhbCIsImNvdW50Iiwic2xpY2UiLCJnZXRQZXJjZW50YWdlIiwibnVtIiwibWF4TGFzdE5vblplcm9JbmRleCIsIm1heCIsInBlcmNlbnRhZ2UiLCJza2lwIiwiZmlyc3ROb25aZXJvVmFsdWVJbmRleCIsImluY3JlbWVudCIsImRlY3JlbWVudCIsInNvcnQiLCJhIiwiYiIsImZsYXRNYXAiLCJmaWxsIiwiY3V0U2VxdWVuY2VBcnIiLCJjdXJyQ3V0TGlzdCIsImZyb20iLCJjcmVhdGVDdXRTZXF1ZW5jZUFyciIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwic2tpcEZsYWciLCJwZXJjZW50RmFjdG9yQ291bnRlciIsInBlcmNlbnRNdWx0aXBsZURpc3BsYXkiLCJmaWx0ZXIiLCJ3aW5kb3ciLCJ0b1N0cmluZyIsImNyZWF0ZUN1dFNlcXVlbmNlIiwidHlwZSIsInByb3BzIiwia2V5Iiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwicG9zc2libGVMZW5ndGhzQXJyIiwiY3VyckN1dFNlcXVlbmNlIiwidGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJiZXN0Q3V0IiwiZmluYWxDdXRMaXN0IiwiY3Jvc3NTZWN0aW9uMng0IiwiY3Jvc3NTZWN0aW9uNHg0Il0sInNvdXJjZVJvb3QiOiIifQ==