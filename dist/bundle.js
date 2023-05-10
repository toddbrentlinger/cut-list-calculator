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
      'id': 'create-cut-list-error-msg',
      'class': 'hide'
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
    const uncutPiece = new _uncutPiece_js__WEBPACK_IMPORTED_MODULE_10__.UncutPiece(Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));
    addUncutPiece(uncutPiece);
  }
  function handleCutPieceEditClick(e, oldCutPiece) {
    // Create a new CutPiece from form input values
    const newCutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_9__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('quantity').value), Number(e.target.elements.namedItem('kerf').value));

    // Check that new CutPiece is not a duplicate thickness x width x length combo
    cutPieceListComponent.getPieces().forEach(cutPiece => {
      if (cutPiece !== oldCutPiece && cutPiece === newCutPiece) {
        return;
      }
    });

    // If reach here, new CutPiece is valid
  }

  function handleUncutPieceEditClick(e, oldUncutPiece) {
    // Create a new UncutPiece from form input values
    const newUncutPiece = new _cutPiece_js__WEBPACK_IMPORTED_MODULE_9__["default"](Number(e.target.elements.namedItem('thickness').value), Number(e.target.elements.namedItem('width').value), Number(e.target.elements.namedItem('length').value), Number(e.target.elements.namedItem('price').value));

    // Check that new UncutPiece is not a duplicate thickness x width x length combo
    uncutPieceListComponent.getPieces().forEach(uncutPiece => {
      if (uncutPiece !== oldUncutPiece && uncutPiece === newUncutPiece) {
        return;
      }
    });

    // If reach here, new CutPiece is valid
  }

  function handleCutPieceDeleteClick(cutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"])(() => {
      handleCutPieceDeleteConfirm(cutPieceToDelete);
    }, 'Are you sure you want to delete the cut piece?').render());
  }
  function handleCutPieceDeleteConfirm(cutPieceToDelete) {
    console.log('Delete cut piece ' + cutPieceToDelete);
    removeCutPiece(cutPieceToDelete);
  }
  function handleUncutPieceDeleteClick(uncutPieceToDelete) {
    document.body.prepend((0,_confirmModalComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"])(() => {
      handleUncutPieceDeleteConfirm(uncutPieceToDelete);
    }, 'Are you sure you want to delete the uncut piece?').render());
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%);\n  --primary: brown;\n  --secondary: orange;\n  --hover: hsl(0, 0%, 50%);\n  --active: hsl(0, 0%, 25%);\n  --success: green;\n  --info: gray;\n  --warning: orange;\n  --danger: red; }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main;\n  display: grid;\n  gap: 1em; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container,\n.clear-btn-container {\n  display: grid;\n  justify-content: center; }\n\n#create-cut-list-error-msg {\n  display: grid;\n  justify-items: center;\n  align-items: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column;\n  border: 2px solid var(--base-black, black);\n  border-top: none; }\n  .cut-sequence:first-child {\n    border-top: 2px solid var(--base-black, black); }\n\n.hide {\n  display: none; }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    width: 100%; }\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n  display: grid;\n  align-items: center;\n  justify-items: center; }\n\n.modal-content {\n  background-color: #fefefe;\n  padding: 2rem;\n  border: 1px solid #888;\n  width: 80%;\n  height: 50%;\n  display: grid;\n  justify-content: center;\n  align-content: space-evenly; }\n\n.modal-content-btn-container,\n.piece-btn-container {\n  display: grid;\n  grid-auto-flow: column;\n  gap: 1em; }\n\n.piece-form,\n.piece-list {\n  border: 2px solid var(--base-black, black); }\n\n.piece-form .piece-form-inputs {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem;\n  justify-items: center;\n  align-items: center; }\n  .piece-form .piece-form-inputs .input-container {\n    display: grid; }\n\n.piece-form .piece-form-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem;\n  justify-items: center;\n  align-items: center; }\n\n.piece-list-body .cut-piece:nth-child(odd),\n.piece-list-body .uncut-piece:nth-child(odd) {\n  background-color: #d9d9d9; }\n\n.piece-list-body .cut-piece:nth-child(even),\n.piece-list-body .uncut-piece:nth-child(even) {\n  background-color: #bfbfbf; }\n\nh1, h2, h3 {\n  text-align: center; }\n\nh1 {\n  font-size: 1.7em; }\n\nh2 {\n  font-size: 1.5em; }\n\nh3 {\n  font-size: 1.2em; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n  table tbody tr:nth-child(odd) {\n    background-color: #d9d9d9; }\n  table tbody tr:nth-child(even) {\n    background-color: #bfbfbf; }\n  table th, table td {\n    padding: 0.5rem 1rem;\n    border: 2px solid var(--base-black, black); }\n\nbutton, input[type=submit] {\n  appearance: none;\n  border: 1px solid var(--base-black, black);\n  text-decoration: none;\n  cursor: pointer; }\n  button:hover, input[type=submit]:hover {\n    background-color: var(--hover, gray);\n    color: var(--base-white, white); }\n  button:active, input[type=submit]:active {\n    background-color: var(--active, #404040); }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAUA;EACI,6BAAa;EACb,6BAAa;EAEb,gBAAU;EACV,mBAAY;EAEZ,wBAAQ;EACR,yBAAS;EAET,gBAAU;EACV,YAAO;EACP,iBAAU;EACV,aAAS,EAAA;;AAGb;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe;EACf,aAAa;EACb,QAAQ,EAAA;;AAKZ;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;;EAEI,aAAa;EACb,uBAAuB,EAAA;;AAG3B;EACI,aAAa;EACb,qBAAqB;EACrB,mBAAmB,EAAA;;AAKvB;EACI,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gBAAgB,EAAA;EAJpB;IAOQ,8CAA8C,EAAA;;AAItD;EACI,aAAa,EAAA;;AAGjB;EACI,qBAAqB,EAAA;EADzB;IAIQ,WAAW,EAAA;;AAInB;EAEI,eAAe;EACf,UAAU;EACV,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,cAAc;EACd,uBAA8B;EAC9B,oCAAoC;EAEpC,aAAa;EACb,mBAAmB;EACnB,qBAAqB,EAAA;;AAGzB;EACI,yBAAyB;EAEzB,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,WAAW;EAEX,aAAa;EACb,uBAAuB;EACvB,2BAA2B,EAAA;;AAG/B;;EAEI,aAAa;EACb,sBAAsB;EACtB,QAAQ,EAAA;;AAGZ;;EAEI,0CAA0C,EAAA;;AAI9C;EAhKI,aAAa;EACb,qCAA6C;EAC7C,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB,EAAA;EA4JvB;IAQY,aAAa,EAAA;;AARzB;EAaQ,aAAa;EACb,uBAAuB,EAAA;;AAI/B;;;EAlLI,aAAa;EACb,qCAA6C;EAC7C,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB,EAAA;;AAwLvB;;EAGQ,yBAAiC,EAAA;;AAHzC;;EAQQ,yBAAiC,EAAA;;AAMzC;EACI,kBAAkB,EAAA;;AAGtB;EACI,gBAAgB,EAAA;;AAGpB;EACI,gBAAgB,EAAA;;AAIpB;EACI,gBAAgB,EAAA;;AAIpB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA;EALtB;IASY,yBAAiC,EAAA;EAT7C;IAaY,yBAAiC,EAAA;EAb7C;IAkBQ,oBAAoB;IACpB,0CAA0C,EAAA;;AAIlD;EACI,gBAAgB;EAChB,0CAA0C;EAC1C,qBAAqB;EACrB,eAAe,EAAA;EAJnB;IAOQ,oCAA+C;IAC/C,+BAA+B,EAAA;EARvC;IAYQ,wCAAgD,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n@mixin baseGrid($nColumns: 6) {\r\n    display: grid;\r\n    grid-template-columns: repeat($nColumns, 1fr);\r\n    column-gap: 1rem;\r\n    justify-items: center;\r\n    align-items: center;\r\n}\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n\r\n    --primary: brown;\r\n    --secondary: orange;\r\n\r\n    --hover: hsl(0, 0%, 50%);\r\n    --active: hsl(0, 0%, 25%);\r\n\r\n    --success: green;\r\n    --info: gray;\r\n    --warning: orange;\r\n    --danger: red;\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n    display: grid;\r\n    gap: 1em;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container,\r\n.clear-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n#create-cut-list-error-msg {\r\n    display: grid;\r\n    justify-items: center;\r\n    align-items: center;\r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    border: 2px solid var(--base-black, black);\r\n    border-top: none;\r\n\r\n    &:first-child {\r\n        border-top: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.modal {\r\n    //display: none; // Hidden by default\r\n    position: fixed; // Stay in place\r\n    z-index: 1; // Sit on top\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%; // Full width\r\n    height: 100%; // Full height\r\n    overflow: auto; // Enable scroll if needed\r\n    background-color: rgb(0, 0, 0); // Fallback color\r\n    background-color: rgba(0, 0, 0, 0.4); // Black w/ opacity\r\n    // Grid\r\n    display: grid;\r\n    align-items: center;\r\n    justify-items: center;\r\n}\r\n\r\n.modal-content {\r\n    background-color: #fefefe;\r\n    //margin: 15% auto; // 15% from the top and centered\r\n    padding: 2rem;\r\n    border: 1px solid #888;\r\n    width: 80%; // Could be more or less, depending on screen size\r\n    height: 50%;\r\n    // Grid\r\n    display: grid;\r\n    justify-content: center;\r\n    align-content: space-evenly;\r\n}\r\n\r\n.modal-content-btn-container,\r\n.piece-btn-container {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    gap: 1em;\r\n}\r\n\r\n.piece-form, \r\n.piece-list {\r\n    border: 2px solid var(--base-black, black);\r\n    //margin: 1rem 0;\r\n}\r\n\r\n.piece-form {\r\n    // border: 2px solid var(--base-black, black);\r\n    // margin: 1rem 0;\r\n\r\n    .piece-form-inputs {\r\n        @include baseGrid;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .piece-form-btn-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    // border: 2px solid var(--base-black, black);\r\n\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        @include baseGrid;\r\n    }\r\n}\r\n\r\n.piece-list-body {\r\n    .cut-piece:nth-child(odd),\r\n    .uncut-piece:nth-child(odd) {\r\n        background-color: hsl(0, 0%, 85%);\r\n    }\r\n\r\n    .cut-piece:nth-child(even),\r\n    .uncut-piece:nth-child(even) {\r\n        background-color: hsl(0, 0%, 75%);\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2, h3 {\r\n    text-align: center;\r\n}\r\n\r\nh1 {\r\n    font-size: 1.7em;\r\n}\r\n\r\nh2 {\r\n    font-size: 1.5em;\r\n    //margin: 0.83em 0;\r\n}\r\n\r\nh3 {\r\n    font-size: 1.2em;\r\n    //margin: 1em 0;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n\r\n    tbody {\r\n        tr:nth-child(odd) {\r\n            background-color: hsl(0, 0%, 85%);\r\n        }\r\n\r\n        tr:nth-child(even) {\r\n            background-color: hsl(0, 0%, 75%);\r\n        }\r\n    }\r\n\r\n    th, td {\r\n        padding: 0.5rem 1rem;\r\n        border: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\nbutton, input[type=submit] {\r\n    appearance: none;\r\n    border: 1px solid var(--base-black, black);\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n\r\n    &:hover {\r\n        background-color: var(--hover, hsl(0, 0%, 50%));\r\n        color: var(--base-white, white);\r\n    }\r\n\r\n    &:active {\r\n        background-color: var(--active, hsl(0, 0%, 25%));\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUVqQyxTQUFTQyxxQkFBcUJBLENBQUNDLFlBQVksRUFBeUU7RUFBQSxJQUF2RUMsWUFBWSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxlQUFlO0VBQUEsSUFBRUcsVUFBVSxHQUFBSCxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxLQUFLO0VBQUEsSUFBRUksVUFBVSxHQUFBSixTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxJQUFJO0VBQzdILElBQUlLLE9BQU87RUFFWCxNQUFNQyxpQkFBaUIsR0FBRyxTQUFBQSxDQUFTQyxDQUFDLEVBQUU7SUFDbENDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0lBQ2pDSixPQUFPLENBQUNLLE1BQU0sRUFBRTtJQUNoQlosWUFBWSxDQUFDUyxDQUFDLENBQUM7RUFDbkIsQ0FBQztFQUVELE1BQU1JLGlCQUFpQixHQUFHLFNBQUFBLENBQVNKLENBQUMsRUFBRTtJQUNsQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7SUFDakNKLE9BQU8sQ0FBQ0ssTUFBTSxFQUFFO0VBQ3BCLENBQUM7RUFFRCxNQUFNRSxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLElBQUlQLE9BQU8sS0FBS0gsU0FBUyxFQUFFO01BQ3ZCRyxPQUFPLEdBQUdULDREQUFhLENBQUMsS0FBSyxFQUFFO1FBQUMsT0FBTyxFQUFFO01BQU8sQ0FBQyxDQUFDO01BQ2xEUyxPQUFPLENBQUNRLGdCQUFnQixDQUFDLE9BQU8sRUFBRUYsaUJBQWlCLENBQUM7SUFDeEQsQ0FBQyxNQUFNO01BQ0gsT0FBT04sT0FBTyxDQUFDUyxVQUFVLEVBQUU7UUFDdkJULE9BQU8sQ0FBQ1UsV0FBVyxDQUFDVixPQUFPLENBQUNTLFVBQVUsQ0FBQztNQUMzQztJQUNKO0lBQ0EsTUFBTUUsU0FBUyxHQUFHcEIsNERBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUVPLFVBQVUsQ0FBQztJQUN6RCxNQUFNYyxTQUFTLEdBQUdyQiw0REFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRVEsVUFBVSxDQUFDOztJQUV6RDtJQUNBWSxTQUFTLENBQUNILGdCQUFnQixDQUFDLE9BQU8sRUFBRVAsaUJBQWlCLENBQUM7SUFDdERXLFNBQVMsQ0FBQ0osZ0JBQWdCLENBQUMsT0FBTyxFQUFFRixpQkFBaUIsQ0FBQzs7SUFFdEQ7SUFDQSxNQUFNTyxZQUFZLEdBQUdiLE9BQU8sQ0FBQ2MsV0FBVyxDQUFDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBZSxDQUFDLEVBQ3BGQSw0REFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRUcsWUFBWSxDQUFDLEVBQ3BDSCw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUE2QixDQUFDLEVBQ3pEb0IsU0FBUyxFQUNUQyxTQUFTLENBQ1osQ0FDSixDQUFDOztJQUVGO0lBQ0E7SUFDQUMsWUFBWSxDQUFDTCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBS0EsQ0FBQyxDQUFDYSxlQUFlLEVBQUUsQ0FBQztJQUVsRSxPQUFPZixPQUFPO0VBQ2xCLENBQUM7RUFFRCxPQUFPO0lBQ0hPO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRGlDO0FBRTBDO0FBQ0k7QUFFeEI7QUFDUTtBQUNKO0FBQ1E7QUFDZDtBQUVHO0FBQ2xCO0FBQ29CO0FBRVY7QUFDZTtBQUUvRCxNQUFNcUIsMEJBQTBCLEdBQUcsQ0FBQyxNQUFNO0VBQ3RDLElBQUlDLFdBQVc7RUFFZixJQUFJQyxxQkFBcUI7RUFDekIsSUFBSUMsdUJBQXVCO0VBQzNCLElBQUlDLGdCQUFnQjtFQUNwQixJQUFJQyxtQkFBbUI7RUFFdkIsU0FBU0MsSUFBSUEsQ0FBQSxFQUF3RTtJQUFBLElBQXZFQyxhQUFhLEdBQUF4QyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxFQUFFO0lBQUEsSUFBRXlDLGVBQWUsR0FBQXpDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLEVBQUU7SUFBQSxJQUFFMEMsZUFBZSxHQUFBMUMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUdFLFNBQVM7SUFDL0VnQyxXQUFXLEdBQUdRLGVBQWU7SUFFN0IsSUFBSUMsV0FBVyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDaEQsSUFBSUYsV0FBVyxLQUFLLElBQUksRUFBRTtNQUN0QkEsV0FBVyxHQUFHQyxRQUFRLENBQUNoRCxhQUFhLENBQUMsTUFBTSxDQUFDO01BQzVDZ0QsUUFBUSxDQUFDRSxJQUFJLENBQUMzQixXQUFXLENBQUN3QixXQUFXLENBQUM7SUFDMUM7O0lBRUE7SUFDQUEsV0FBVyxDQUFDeEIsV0FBVyxDQUFDdkIsNkRBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ3pDLCtVQUErVSxDQUNsVixDQUFDOztJQUVGOztJQUVBO0lBQ0ErQyxXQUFXLENBQUN4QixXQUFXLENBQUN2Qiw2REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRDtJQUNBK0MsV0FBVyxDQUFDeEIsV0FBVyxDQUNuQnZCLDZEQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQXFCLENBQUMsQ0FBQyxDQUN6RCxDQUFDdUIsV0FBVyxDQUNUdkIsNkRBQWEsQ0FBQyxRQUFRLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBVyxDQUFDLEVBQUUsc0JBQXNCLENBQUMsQ0FDMUUsQ0FBQ2lCLGdCQUFnQixDQUFDLE9BQU8sRUFBRWtDLHVCQUF1QixDQUFDO0lBQ3BEO0lBQ0FaLHFCQUFxQixHQUFHVixxRUFBcUIsRUFBRTtJQUMvQ2tCLFdBQVcsQ0FBQ3hCLFdBQVcsQ0FBQ2dCLHFCQUFxQixDQUFDdkIsTUFBTSxFQUFFLENBQUM7SUFDdkQ7SUFDQStCLFdBQVcsQ0FBQ3hCLFdBQVcsQ0FDbkJHLDJFQUEyQixDQUFDMEIsMkJBQTJCLENBQUMsQ0FBQ3BDLE1BQU0sRUFBRSxDQUNwRTs7SUFFRDtJQUNBK0IsV0FBVyxDQUFDeEIsV0FBVyxDQUFDdkIsNkRBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDakU7SUFDQStDLFdBQVcsQ0FBQ3hCLFdBQVcsQ0FDbkJ2Qiw2REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFxQixDQUFDLENBQUMsQ0FDekQsQ0FBQ3VCLFdBQVcsQ0FDVHZCLDZEQUFhLENBQUMsUUFBUSxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQVcsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLENBQzVFLENBQUNpQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVvQyx5QkFBeUIsQ0FBQztJQUN0RDtJQUNBYix1QkFBdUIsR0FBR1QsdUVBQXVCLEVBQUU7SUFDbkRnQixXQUFXLENBQUN4QixXQUFXLENBQUNpQix1QkFBdUIsQ0FBQ3hCLE1BQU0sRUFBRSxDQUFDO0lBQ3pEO0lBQ0ErQixXQUFXLENBQUN4QixXQUFXLENBQ25CSSw2RUFBNkIsQ0FBQzJCLDZCQUE2QixDQUFDLENBQUN0QyxNQUFNLEVBQUUsQ0FDeEU7O0lBRUQ7SUFDQTRCLGFBQWEsQ0FBQ1csT0FBTyxDQUFFQyxRQUFRLElBQUtDLFdBQVcsQ0FBQ0QsUUFBUSxDQUFDLENBQUM7SUFDMURYLGVBQWUsQ0FBQ1UsT0FBTyxDQUFFRyxVQUFVLElBQUtDLGFBQWEsQ0FBQ0QsVUFBVSxDQUFDLENBQUM7O0lBRWxFO0lBQ0EsTUFBTUUsZ0JBQWdCLEdBQUdiLFdBQVcsQ0FBQ3hCLFdBQVcsQ0FDNUN2Qiw2REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLElBQUksRUFBRTtJQUErQixDQUFDLENBQUMsQ0FDaEUsQ0FBQ3VCLFdBQVcsQ0FDVHZCLDZEQUFhLENBQUMsUUFBUSxFQUFFO01BQUMsSUFBSSxFQUFFO0lBQXFCLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUM1RTtJQUNENEQsZ0JBQWdCLENBQUMzQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU0Qyx3QkFBd0IsQ0FBQzs7SUFFcEU7SUFDQW5CLG1CQUFtQixHQUFHSyxXQUFXLENBQUN4QixXQUFXLENBQ3pDdkIsNkRBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxJQUFJLEVBQUUsMkJBQTJCO01BQUUsT0FBTyxFQUFFO0lBQU0sQ0FBQyxDQUFDLENBQzdFOztJQUVEO0lBQ0F5QyxnQkFBZ0IsR0FBR1QsZ0VBQWdCLEVBQUU7SUFDckNlLFdBQVcsQ0FBQ3hCLFdBQVcsQ0FBQ2tCLGdCQUFnQixDQUFDekIsTUFBTSxFQUFFLENBQUM7O0lBRWxEO0lBQ0FnQyxRQUFRLENBQUNFLElBQUksQ0FBQzNCLFdBQVcsQ0FBQ0Usc0RBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQ1QsTUFBTSxFQUFFLENBQUM7RUFDcEQ7RUFFQSxTQUFTeUMsV0FBV0EsQ0FBQ0QsUUFBUSxFQUFFO0lBQzNCakIscUJBQXFCLENBQUN1QixvQkFBb0IsQ0FDdENsQyxpRUFBaUIsQ0FBQzRCLFFBQVEsRUFBRU8sdUJBQXVCLEVBQUVDLHlCQUF5QixDQUFDLENBQ2xGO0lBRUQsT0FBT1IsUUFBUTtFQUNuQjtFQUVBLFNBQVNHLGFBQWFBLENBQUNELFVBQVUsRUFBRTtJQUMvQmxCLHVCQUF1QixDQUFDeUIsc0JBQXNCLENBQzFDbkMsbUVBQW1CLENBQUM0QixVQUFVLEVBQUVRLHlCQUF5QixFQUFFQywyQkFBMkIsQ0FBQyxDQUMxRjtJQUVELE9BQU9ULFVBQVU7RUFDckI7RUFFQSxTQUFTVSxjQUFjQSxDQUFDQyxnQkFBZ0IsRUFBRTtJQUN0QzlCLHFCQUFxQixDQUFDNkIsY0FBYyxDQUFDQyxnQkFBZ0IsQ0FBQztFQUMxRDtFQUVBLFNBQVNDLGdCQUFnQkEsQ0FBQ0Msa0JBQWtCLEVBQUU7SUFDMUMvQix1QkFBdUIsQ0FBQzhCLGdCQUFnQixDQUFDQyxrQkFBa0IsQ0FBQztFQUNoRTtFQUVBLFNBQVNuQiwyQkFBMkJBLENBQUN6QyxDQUFDLEVBQUU7SUFDcENBLENBQUMsQ0FBQzZELGNBQWMsRUFBRTs7SUFFbEI7SUFDQSxNQUFNaEIsUUFBUSxHQUFHLElBQUl0QixvREFBUSxDQUN6QnVDLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUN0REosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ2xESixNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsRUFDbkRKLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUNyREosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQ3BEO0lBRURwQixXQUFXLENBQUNELFFBQVEsQ0FBQztFQUN6QjtFQUVBLFNBQVNGLDZCQUE2QkEsQ0FBQzNDLENBQUMsRUFBRTtJQUN0Q0EsQ0FBQyxDQUFDNkQsY0FBYyxFQUFFOztJQUVsQjtJQUNBLE1BQU1kLFVBQVUsR0FBRyxJQUFJdkIsdURBQVUsQ0FDN0JzQyxNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxLQUFLLENBQUMsRUFDdERKLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUNsREosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ25ESixNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FDckQ7SUFFRGxCLGFBQWEsQ0FBQ0QsVUFBVSxDQUFDO0VBQzdCO0VBRUEsU0FBU0ssdUJBQXVCQSxDQUFDcEQsQ0FBQyxFQUFFbUUsV0FBVyxFQUFFO0lBQzdDO0lBQ0EsTUFBTUMsV0FBVyxHQUFHLElBQUk3QyxvREFBUSxDQUM1QnVDLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUN0REosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ2xESixNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsRUFDbkRKLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUNyREosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQ3BEOztJQUVEO0lBQ0F0QyxxQkFBcUIsQ0FBQ3lDLFNBQVMsRUFBRSxDQUFDekIsT0FBTyxDQUFFQyxRQUFRLElBQUs7TUFDcEQsSUFBSUEsUUFBUSxLQUFLc0IsV0FBVyxJQUFJdEIsUUFBUSxLQUFLdUIsV0FBVyxFQUFFO1FBQ3REO01BQ0o7SUFDSixDQUFDLENBQUM7O0lBRUY7RUFDSjs7RUFFQSxTQUFTYix5QkFBeUJBLENBQUN2RCxDQUFDLEVBQUVzRSxhQUFhLEVBQUU7SUFDakQ7SUFDQSxNQUFNQyxhQUFhLEdBQUcsSUFBSWhELG9EQUFRLENBQzlCdUMsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQ3RESixNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUMsRUFDbERKLE1BQU0sQ0FBQzlELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxFQUNuREosTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQ3JEOztJQUVEO0lBQ0FyQyx1QkFBdUIsQ0FBQ3dDLFNBQVMsRUFBRSxDQUFDekIsT0FBTyxDQUFFRyxVQUFVLElBQUs7TUFDeEQsSUFBSUEsVUFBVSxLQUFLdUIsYUFBYSxJQUFJdkIsVUFBVSxLQUFLd0IsYUFBYSxFQUFFO1FBQzlEO01BQ0o7SUFDSixDQUFDLENBQUM7O0lBRUY7RUFDSjs7RUFFQSxTQUFTbEIseUJBQXlCQSxDQUFDbUIsZ0JBQWdCLEVBQUU7SUFDakRuQyxRQUFRLENBQUNFLElBQUksQ0FBQ2tDLE9BQU8sQ0FDakJuRixzRUFBcUIsQ0FBQyxNQUFNO01BQ3hCb0YsMkJBQTJCLENBQUNGLGdCQUFnQixDQUFDO0lBQ2pELENBQUMsRUFDRCxnREFBZ0QsQ0FDL0MsQ0FBQ25FLE1BQU0sRUFBRSxDQUNiO0VBQ0w7RUFFQSxTQUFTcUUsMkJBQTJCQSxDQUFDRixnQkFBZ0IsRUFBRTtJQUNuRHZFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixHQUFHc0UsZ0JBQWdCLENBQUM7SUFDbkRmLGNBQWMsQ0FBQ2UsZ0JBQWdCLENBQUM7RUFDcEM7RUFFQSxTQUFTaEIsMkJBQTJCQSxDQUFDbUIsa0JBQWtCLEVBQUU7SUFDckR0QyxRQUFRLENBQUNFLElBQUksQ0FBQ2tDLE9BQU8sQ0FDakJuRixzRUFBcUIsQ0FBQyxNQUFNO01BQ3hCc0YsNkJBQTZCLENBQUNELGtCQUFrQixDQUFDO0lBQ3JELENBQUMsRUFDRCxrREFBa0QsQ0FDakQsQ0FBQ3RFLE1BQU0sRUFBRSxDQUNiO0VBQ0w7RUFFQSxTQUFTdUUsNkJBQTZCQSxDQUFDRCxrQkFBa0IsRUFBRTtJQUN2RDFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixHQUFHeUUsa0JBQWtCLENBQUM7SUFDdkRoQixnQkFBZ0IsQ0FBQ2dCLGtCQUFrQixDQUFDO0VBQ3hDO0VBRUEsU0FBU3pCLHdCQUF3QkEsQ0FBQSxFQUFHO0lBQ2hDLE1BQU0yQixTQUFTLEdBQUdqRCxxQkFBcUIsQ0FBQ3lDLFNBQVMsRUFBRTtJQUNuRCxNQUFNUyxXQUFXLEdBQUdqRCx1QkFBdUIsQ0FBQ3dDLFNBQVMsRUFBRTtJQUV2RCxJQUFJLENBQUNRLFNBQVMsQ0FBQ25GLE1BQU0sRUFBRTtNQUNuQjtNQUNBcUYsZ0JBQWdCLENBQUMseUNBQXlDLENBQUM7TUFDM0Q7SUFDSjtJQUVBLElBQUksQ0FBQ0QsV0FBVyxDQUFDcEYsTUFBTSxFQUFFO01BQ3JCO01BQ0FxRixnQkFBZ0IsQ0FBQywyQ0FBMkMsQ0FBQztNQUM3RDtJQUNKOztJQUVBO0lBQ0FDLGlCQUFpQixFQUFFO0lBRW5CckQsV0FBVyxHQUFHTCxnRkFBb0MsQ0FDOUNNLHFCQUFxQixDQUFDeUMsU0FBUyxFQUFFLEVBQ2pDeEMsdUJBQXVCLENBQUN3QyxTQUFTLEVBQUUsQ0FDdEM7SUFFRHZDLGdCQUFnQixDQUFDb0QsT0FBTyxHQUFHdkQsV0FBVztFQUMxQztFQUVBLFNBQVNhLHVCQUF1QkEsQ0FBQSxFQUFHO0lBQy9CdkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O0lBRTdCO0lBQ0EwQixxQkFBcUIsQ0FBQ3VELEtBQUssRUFBRTtFQUNqQztFQUVBLFNBQVN6Qyx5QkFBeUJBLENBQUEsRUFBRztJQUNqQ3pDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDOztJQUUvQjtJQUNBMkIsdUJBQXVCLENBQUNzRCxLQUFLLEVBQUU7RUFDbkM7RUFFQSxTQUFTSixnQkFBZ0JBLENBQUNLLFFBQVEsRUFBRTtJQUNoQ3JELG1CQUFtQixDQUFDc0QsU0FBUyxDQUFDbEYsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QzRCLG1CQUFtQixDQUFDdUQsV0FBVyxHQUFHRixRQUFRO0VBQzlDO0VBRUEsU0FBU0osaUJBQWlCQSxDQUFBLEVBQUc7SUFDekJqRCxtQkFBbUIsQ0FBQ3NELFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN6Q3hELG1CQUFtQixDQUFDdUQsV0FBVyxHQUFHLEVBQUU7RUFDeEM7RUFFQSxPQUFPO0lBQ0h0RDtFQUNKLENBQUM7QUFDTCxDQUFDLEdBQUc7QUFFSixpRUFBZU4sMEJBQTBCOzs7Ozs7Ozs7Ozs7Ozs7O0FDclJPO0FBQ2E7QUFFOUMsU0FBU0wsZ0JBQWdCQSxDQUFDNkQsT0FBTyxFQUFFO0VBQzlDLElBQUlwRixPQUFPO0VBRVgsTUFBTXFGLEtBQUssR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDckIsSUFBSXJGLE9BQU8sS0FBS0gsU0FBUyxFQUFFO01BQUU7SUFBUTtJQUVyQyxPQUFPRyxPQUFPLENBQUNTLFVBQVUsRUFBRTtNQUN2QlQsT0FBTyxDQUFDVSxXQUFXLENBQUNWLE9BQU8sQ0FBQ1MsVUFBVSxDQUFDO0lBQzNDO0VBQ0osQ0FBQztFQUVELE1BQU1GLE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDdEIsSUFBSVAsT0FBTyxLQUFLSCxTQUFTLEVBQUU7TUFDdkJHLE9BQU8sR0FBR1QsNERBQWEsQ0FBQyxLQUFLLEVBQUU7UUFBQyxJQUFJLEVBQUU7TUFBVSxDQUFDLENBQUM7SUFDdEQ7SUFFQSxJQUFJNkYsT0FBTyxLQUFLdkYsU0FBUyxFQUFFO01BQ3ZCLE9BQU9HLE9BQU87SUFDbEI7O0lBRUE7SUFDQUEsT0FBTyxDQUFDYyxXQUFXLENBQUN2Qiw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztJQUU5RDtJQUNBLE1BQU1vRyxpQkFBaUIsR0FBRzNGLE9BQU8sQ0FBQ2MsV0FBVyxDQUFDeUIsUUFBUSxDQUFDaEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUU5RTtJQUNBb0csaUJBQWlCLENBQUM3RSxXQUFXLENBQUN2Qiw0REFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFDbkRBLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNsQkEsNERBQWEsQ0FBQyxJQUFJLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBSyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQ2pEQSw0REFBYSxDQUFDLElBQUksRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFLLENBQUMsRUFBRSxjQUFjLENBQUMsRUFDckRBLDREQUFhLENBQUMsSUFBSSxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUNuREEsNERBQWEsQ0FBQyxJQUFJLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBSyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQ3JELENBQ0osQ0FBQzs7SUFFRjtJQUNBLE1BQU1xRyxZQUFZLEdBQUdSLE9BQU8sQ0FBQ1MsZUFBZSxFQUFFO0lBQzlDLE1BQU1DLHFCQUFxQixHQUFHSCxpQkFBaUIsQ0FBQzdFLFdBQVcsQ0FBQ3lCLFFBQVEsQ0FBQ2hELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RixJQUFJd0csVUFBVSxHQUFHLENBQUM7SUFDbEIsSUFBSUMsU0FBUztJQUNiLEtBQUssTUFBTSxDQUFDQyxXQUFXLEVBQUVDLFFBQVEsQ0FBQyxJQUFJQyxNQUFNLENBQUNDLE9BQU8sQ0FBQ1IsWUFBWSxDQUFDLEVBQUU7TUFDaEVJLFNBQVMsR0FBR0UsUUFBUSxDQUFDRyxRQUFRLEdBQUdILFFBQVEsQ0FBQ0ksU0FBUztNQUNsRFIscUJBQXFCLENBQUNoRixXQUFXLENBQUN2Qiw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFDcERBLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFMkcsUUFBUSxDQUFDRyxRQUFRLENBQUMsRUFDMUM5Ryw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTBHLFdBQVcsQ0FBQyxFQUNwQzFHLDREQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFMkcsUUFBUSxDQUFDSSxTQUFTLENBQUMsRUFDM0MvRyw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRXlHLFNBQVMsQ0FBQ08sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2hELENBQUM7TUFDRlIsVUFBVSxJQUFJQyxTQUFTO0lBQzNCOztJQUVBO0lBQ0FMLGlCQUFpQixDQUFDN0UsV0FBVyxDQUFDdkIsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2hEQSw0REFBYSxDQUFDLElBQUksRUFBRTtNQUFDLFNBQVMsRUFBRTtJQUFHLENBQUMsQ0FBQyxFQUNyQ0EsNERBQWEsQ0FBQyxJQUFJLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBSyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQ3BEQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRXdHLFVBQVUsQ0FBQ1EsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2pELENBQUM7O0lBRUY7SUFDQXZHLE9BQU8sQ0FBQ2MsV0FBVyxDQUFDdkIsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFOUQ7SUFDQSxNQUFNaUgsaUJBQWlCLEdBQUd4RyxPQUFPLENBQUNjLFdBQVcsQ0FBQ3lCLFFBQVEsQ0FBQ2hELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFFOUU7SUFDQWlILGlCQUFpQixDQUFDMUYsV0FBVyxDQUFDdkIsNERBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQ25EQSw0REFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFDbEJBLDREQUFhLENBQUMsSUFBSSxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQUssQ0FBQyxFQUFFLGNBQWMsQ0FBQyxFQUNyREEsNERBQWEsQ0FBQyxJQUFJLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQ25EQSw0REFBYSxDQUFDLElBQUksRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFLLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUM1RCxDQUNKLENBQUM7O0lBRUY7SUFDQSxNQUFNa0gscUJBQXFCLEdBQUdELGlCQUFpQixDQUFDMUYsV0FBVyxDQUFDeUIsUUFBUSxDQUFDaEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVGNkYsT0FBTyxDQUFDc0IsWUFBWSxDQUFDNUQsT0FBTyxDQUFFNkQsV0FBVyxJQUFLO01BQzFDRixxQkFBcUIsQ0FBQ0csTUFBTSxDQUFDLEdBQUdsQixvRUFBb0IsQ0FBQ2lCLFdBQVcsQ0FBQyxDQUFDcEcsTUFBTSxFQUFFLENBQUM7SUFDL0UsQ0FBQyxDQUFDO0lBRUYsT0FBT1AsT0FBTztFQUNsQixDQUFDO0VBRUQsT0FBTztJQUNITyxNQUFNO0lBQ04sSUFBSTZFLE9BQU9BLENBQUEsRUFBRztNQUFFLE9BQU9BLE9BQU87SUFBRSxDQUFDO0lBQ2pDLElBQUlBLE9BQU9BLENBQUN5QixVQUFVLEVBQUU7TUFDcEJ6QixPQUFPLEdBQUd5QixVQUFVO01BQ3BCeEIsS0FBSyxFQUFFO01BQ1A5RSxNQUFNLEVBQUU7SUFDWjtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQy9GZ0Q7QUFDdUI7QUFFeEQsU0FBU1ksaUJBQWlCQSxDQUFDNEIsUUFBUSxFQUFFZ0UsWUFBWSxFQUFFQyxjQUFjLEVBQUU7RUFDOUUsSUFBSWhILE9BQU87RUFFWCxNQUFNaUgsZUFBZSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUMvQkMsWUFBWSxFQUFFO0lBRWRsSCxPQUFPLENBQUNjLFdBQVcsQ0FDZmdHLHlFQUF5QixDQUFDL0QsUUFBUSxFQUFFb0UsaUJBQWlCLEVBQUVDLGdCQUFnQixDQUFDLENBQUM3RyxNQUFNLEVBQUUsQ0FDcEY7RUFDTCxDQUFDO0VBRUQsTUFBTTRHLGlCQUFpQixHQUFHLFNBQUFBLENBQVNqSCxDQUFDLEVBQUU7SUFDbENBLENBQUMsQ0FBQzZELGNBQWMsRUFBRTtJQUVsQmdELFlBQVksQ0FBQzdHLENBQUMsRUFBRTZDLFFBQVEsQ0FBQzs7SUFFekI7SUFDQUEsUUFBUSxDQUFDc0UsU0FBUyxHQUFHckQsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0lBQzNFckIsUUFBUSxDQUFDdUUsS0FBSyxHQUFHdEQsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0lBQ25FckIsUUFBUSxDQUFDbkQsTUFBTSxHQUFHb0UsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3JFckIsUUFBUSxDQUFDc0QsUUFBUSxHQUFHckMsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3pFckIsUUFBUSxDQUFDd0UsSUFBSSxHQUFHdkQsTUFBTSxDQUFDOUQsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0lBRWpFN0QsTUFBTSxFQUFFO0VBQ1osQ0FBQztFQUVELE1BQU02RyxnQkFBZ0IsR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDaEM3RyxNQUFNLEVBQUU7RUFDWixDQUFDO0VBRUQsTUFBTWlILGlCQUFpQixHQUFHLFNBQUFBLENBQUEsRUFBVztJQUNqQ1IsY0FBYyxDQUFDakUsUUFBUSxDQUFDO0VBQzVCLENBQUM7RUFFRCxNQUFNMUMsTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QkwsT0FBTyxDQUFDSyxNQUFNLEVBQUU7RUFDcEIsQ0FBQztFQUVELE1BQU02RyxZQUFZLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQzVCLE9BQU9sSCxPQUFPLENBQUNTLFVBQVUsRUFBRTtNQUN2QlQsT0FBTyxDQUFDVSxXQUFXLENBQUNWLE9BQU8sQ0FBQ1MsVUFBVSxDQUFDO0lBQzNDO0VBQ0osQ0FBQztFQUVELE1BQU1GLE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDdEIsSUFBSVAsT0FBTyxLQUFLSCxTQUFTLEVBQUU7TUFDdkJHLE9BQU8sR0FBR1QsNERBQWEsQ0FBQyxLQUFLLEVBQUU7UUFBQyxPQUFPLEVBQUU7TUFBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxNQUFNO01BQ0gySCxZQUFZLEVBQUU7SUFDbEI7SUFFQSxNQUFNTyxPQUFPLEdBQUdsSSw0REFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7SUFDbkQsTUFBTW1JLFNBQVMsR0FBR25JLDREQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQzs7SUFFdkQ7SUFDQWtJLE9BQU8sQ0FBQ2pILGdCQUFnQixDQUFDLE9BQU8sRUFBRXlHLGVBQWUsQ0FBQztJQUNsRFMsU0FBUyxDQUFDbEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFZ0gsaUJBQWlCLENBQUM7SUFFdER4SCxPQUFPLENBQUM0RyxNQUFNLENBQ1ZySCw0REFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRXdELFFBQVEsQ0FBQ3NFLFNBQVMsQ0FBQyxFQUM1QzlILDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFd0QsUUFBUSxDQUFDdUUsS0FBSyxDQUFDLEVBQ3hDL0gsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUV3RCxRQUFRLENBQUNuRCxNQUFNLENBQUMsRUFDekNMLDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFd0QsUUFBUSxDQUFDc0QsUUFBUSxDQUFDLEVBQzNDOUcsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUV3RCxRQUFRLENBQUN3RSxJQUFJLENBQUMsRUFDdkNoSSw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFxQixDQUFDLEVBQ2pEa0ksT0FBTyxFQUNQQyxTQUFTLENBQ1osQ0FDSjtJQUVELE9BQU8xSCxPQUFPO0VBQ2xCLENBQUM7RUFFRCxPQUFPO0lBQ0gsSUFBSStDLFFBQVFBLENBQUEsRUFBRztNQUFFLE9BQU9BLFFBQVE7SUFBRSxDQUFDO0lBQ25DMUMsTUFBTTtJQUNORTtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDakZvRTtBQUVyRCxTQUFTVSwyQkFBMkJBLENBQUMyRyxnQkFBZ0IsRUFBRTtFQUNsRSxJQUFJQyxXQUFXO0VBRWYsTUFBTXRILE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDdEJzSCxXQUFXLEdBQUd0SSw0REFBYSxDQUFDLE1BQU0sRUFBRTtNQUNoQyxRQUFRLEVBQUUsRUFBRTtNQUNaLFFBQVEsRUFBRSxLQUFLO01BQ2YsTUFBTSxFQUFFLGtCQUFrQjtNQUMxQixJQUFJLEVBQUUsdUJBQXVCO01BQzdCLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUNGLElBQUl1SSxnQkFBZ0I7O0lBRXBCO0lBQ0EsTUFBTUMsaUJBQWlCLEdBQUdGLFdBQVcsQ0FBQy9HLFdBQVcsQ0FDN0N2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFtQixDQUFDLENBQUMsQ0FDdkQ7O0lBRUQ7SUFDQXdJLGlCQUFpQixDQUFDakgsV0FBVyxDQUN6QnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsRUFDN0NBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsS0FBSyxFQUFFO0lBQWUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUM5REEsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxXQUFXO01BQUUsSUFBSSxFQUFFLGVBQWU7TUFBRSxNQUFNLEVBQUUsR0FBRztNQUFFLFVBQVUsRUFBRTtJQUFNLENBQUMsQ0FBQyxFQUNySEEsNERBQWEsQ0FBQyxNQUFNLEVBQUU7TUFBQyxPQUFPLEVBQUUsT0FBTztNQUFFLFdBQVcsRUFBRTtJQUFRLENBQUMsQ0FBQyxDQUNuRSxDQUNKOztJQUVEO0lBQ0F3SSxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFXLENBQUMsRUFBRSxRQUFRLENBQUMsRUFDdERBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLE1BQU07TUFBRSxNQUFNLEVBQUUsT0FBTztNQUFFLElBQUksRUFBRSxXQUFXO01BQUUsTUFBTSxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUU7SUFBTSxDQUFDLENBQUMsQ0FDaEgsQ0FDSjs7SUFFRDtJQUNBdUksZ0JBQWdCLEdBQUd2SSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxJQUFJLEVBQUUsWUFBWTtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFO0lBQU0sQ0FBQyxDQUFDO0lBQ2xJO0lBQ0F1SSxnQkFBZ0IsQ0FBQ3RILGdCQUFnQixDQUFDLE9BQU8sRUFBR04sQ0FBQyxJQUFLeUgsaUVBQWtCLENBQUN6SCxDQUFDLENBQUMrRCxNQUFNLENBQUMsQ0FBQztJQUMvRThELGlCQUFpQixDQUFDakgsV0FBVyxDQUN6QnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsRUFDN0NBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsS0FBSyxFQUFFO0lBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUN4RHVJLGdCQUFnQixDQUNuQixDQUNKOztJQUVEO0lBQ0FDLGlCQUFpQixDQUFDakgsV0FBVyxDQUN6QnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsRUFDN0NBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsS0FBSyxFQUFFO0lBQWMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUM1REEsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsUUFBUTtNQUFFLE1BQU0sRUFBRSxVQUFVO01BQUUsSUFBSSxFQUFFLGNBQWM7TUFBRSxPQUFPLEVBQUUsR0FBRztNQUFFLEtBQUssRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFO0lBQU0sQ0FBQyxDQUFDLENBQ3JJLENBQ0o7O0lBRUQ7SUFDQXVJLGdCQUFnQixHQUFHdkksNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxNQUFNO01BQUUsSUFBSSxFQUFFLFVBQVU7TUFBRSxPQUFPLEVBQUUsT0FBTztNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFO0lBQU0sQ0FBQyxDQUFDO0lBQ2hKO0lBQ0F1SSxnQkFBZ0IsQ0FBQ3RILGdCQUFnQixDQUFDLE9BQU8sRUFBR04sQ0FBQyxJQUFLeUgsaUVBQWtCLENBQUN6SCxDQUFDLENBQUMrRCxNQUFNLENBQUMsQ0FBQztJQUMvRThELGlCQUFpQixDQUFDakgsV0FBVyxDQUN6QnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsRUFDN0NBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsS0FBSyxFQUFFO0lBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUNwRHVJLGdCQUFnQixDQUNuQixDQUNKOztJQUVEO0lBQ0FELFdBQVcsQ0FBQy9HLFdBQVcsQ0FDbkJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUEwQixDQUFDLEVBQ3REQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxRQUFRO01BQUUsT0FBTyxFQUFFO0lBQUssQ0FBQyxDQUFDLENBQzdELENBQ0o7O0lBRUQ7SUFDQXNJLFdBQVcsQ0FBQ3JILGdCQUFnQixDQUFDLFFBQVEsRUFBR04sQ0FBQyxJQUFLO01BQzFDLElBQUkwSCxnQkFBZ0IsS0FBSy9ILFNBQVMsRUFBRTtRQUNoQytILGdCQUFnQixDQUFDMUgsQ0FBQyxDQUFDO01BQ3ZCO01BRUE4SCxVQUFVLEVBQUU7SUFDaEIsQ0FBQyxDQUFDO0lBRUYsT0FBT0gsV0FBVztFQUN0QixDQUFDO0VBRUQsTUFBTUcsVUFBVSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUMxQixJQUFJQyxZQUFZOztJQUVoQjtJQUNBO0lBQ0EsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUNuRixPQUFPLENBQUMsQ0FBQ29GLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxHQUFHLEtBQUs7TUFDdERILFlBQVksR0FBR0osV0FBVyxDQUFDM0QsUUFBUSxDQUFDQyxTQUFTLENBQUMrRCxTQUFTLENBQUM7TUFDeEQsSUFBSUQsWUFBWSxFQUFFO1FBQ2RBLFlBQVksQ0FBQzdELEtBQUssR0FBRzZELFlBQVksQ0FBQ0ksWUFBWTtRQUU5QyxJQUFJRixLQUFLLElBQUtDLEdBQUcsQ0FBQ3hJLE1BQU0sR0FBRyxDQUFFLEVBQUU7VUFDM0JxSSxZQUFZLENBQUNLLEtBQUssRUFBRTtRQUN4QjtNQUNKO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUVELE9BQU87SUFDSC9IO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7QUMxR29FO0FBRXJELFNBQVN1Ryx5QkFBeUJBLENBQUMvRCxRQUFRLEVBQUVvRSxpQkFBaUIsRUFBRUMsZ0JBQWdCLEVBQUU7RUFDN0YsSUFBSVMsV0FBVztFQUVmLE1BQU10SCxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCc0gsV0FBVyxHQUFHdEksNERBQWEsQ0FBQyxNQUFNLEVBQUU7TUFDaEMsUUFBUSxFQUFFLEVBQUU7TUFDWixRQUFRLEVBQUUsS0FBSztNQUNmLE1BQU0sRUFBRSxnQkFBZ0I7TUFDeEIsSUFBSSxFQUFFLHFCQUFxQjtNQUMzQixPQUFPLEVBQUU7SUFDYixDQUFDLENBQUM7SUFDRixJQUFJdUksZ0JBQWdCOztJQUVwQjtJQUNBLE1BQU1DLGlCQUFpQixHQUFHRixXQUFXLENBQUMvRyxXQUFXLENBQzdDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBbUIsQ0FBQyxDQUFDLENBQ3ZEOztJQUVEO0lBQ0F3SSxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFlLENBQUMsRUFBRSxZQUFZLENBQUMsRUFDOURBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLE1BQU07TUFBRSxNQUFNLEVBQUUsV0FBVztNQUFFLElBQUksRUFBRSxlQUFlO01BQUUsTUFBTSxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUUsTUFBTTtNQUFFLE9BQU8sRUFBRXdELFFBQVEsQ0FBQ3NFO0lBQVMsQ0FBQyxDQUFDLEVBQ2xKOUgsNERBQWEsQ0FBQyxNQUFNLEVBQUU7TUFBQyxPQUFPLEVBQUUsT0FBTztNQUFFLFdBQVcsRUFBRTtJQUFRLENBQUMsQ0FBQyxDQUNuRSxDQUNKOztJQUVEO0lBQ0F3SSxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFXLENBQUMsRUFBRSxRQUFRLENBQUMsRUFDdERBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLE1BQU07TUFBRSxNQUFNLEVBQUUsT0FBTztNQUFFLElBQUksRUFBRSxXQUFXO01BQUUsTUFBTSxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUUsTUFBTTtNQUFFLE9BQU8sRUFBRXdELFFBQVEsQ0FBQ3VFO0lBQUssQ0FBQyxDQUFDLENBQ3pJLENBQ0o7O0lBRUQ7SUFDQVEsZ0JBQWdCLEdBQUd2SSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxJQUFJLEVBQUUsWUFBWTtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFLE1BQU07TUFBRSxPQUFPLEVBQUV3RCxRQUFRLENBQUNuRDtJQUFNLENBQUMsQ0FBQztJQUM1SjtJQUNBa0ksZ0JBQWdCLENBQUN0SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBS3lILGlFQUFrQixDQUFDekgsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDLENBQUM7SUFDL0U4RCxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFZLENBQUMsRUFBRSxTQUFTLENBQUMsRUFDeER1SSxnQkFBZ0IsQ0FDbkIsQ0FDSjs7SUFFRDtJQUNBQyxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFjLENBQUMsRUFBRSxXQUFXLENBQUMsRUFDNURBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLFFBQVE7TUFBRSxNQUFNLEVBQUUsVUFBVTtNQUFFLElBQUksRUFBRSxjQUFjO01BQUUsS0FBSyxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUUsTUFBTTtNQUFFLE9BQU8sRUFBRXdELFFBQVEsQ0FBQ3NEO0lBQVEsQ0FBQyxDQUFDLENBQ25KLENBQ0o7O0lBRUQ7SUFDQXlCLGdCQUFnQixHQUFHdkksNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxNQUFNO01BQUUsSUFBSSxFQUFFLFVBQVU7TUFBRSxNQUFNLEVBQUUsR0FBRztNQUFFLFVBQVUsRUFBRSxNQUFNO01BQUUsT0FBTyxFQUFFd0QsUUFBUSxDQUFDd0U7SUFBSSxDQUFDLENBQUM7SUFDdEo7SUFDQU8sZ0JBQWdCLENBQUN0SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBS3lILGlFQUFrQixDQUFDekgsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDLENBQUM7SUFDL0U4RCxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsRUFDcER1SSxnQkFBZ0IsQ0FDbkIsQ0FDSjs7SUFFRDtJQUNBLE1BQU1TLGdCQUFnQixHQUFHVixXQUFXLENBQUMvRyxXQUFXLENBQzVDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBMEIsQ0FBQyxDQUFDLENBQzlEOztJQUVEO0lBQ0FnSixnQkFBZ0IsQ0FBQ3pILFdBQVcsQ0FDeEJ2Qiw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxRQUFRO01BQUUsT0FBTyxFQUFFO0lBQVEsQ0FBQyxDQUFDLENBQ2hFOztJQUVEO0lBQ0FzSSxXQUFXLENBQUNySCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdOLENBQUMsSUFBSztNQUMxQyxJQUFJaUgsaUJBQWlCLEtBQUt0SCxTQUFTLEVBQUU7UUFDakNzSCxpQkFBaUIsQ0FBQ2pILENBQUMsQ0FBQztNQUN4QjtJQUNKLENBQUMsQ0FBQzs7SUFFRjtJQUNBcUksZ0JBQWdCLENBQUN6SCxXQUFXLENBQ3hCdkIsNERBQWEsQ0FBQyxRQUFRLEVBQUU7TUFBQyxNQUFNLEVBQUU7SUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQ3hELENBQUNpQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBSztNQUMvQixJQUFJa0gsZ0JBQWdCLEtBQUt2SCxTQUFTLEVBQUU7UUFDaEN1SCxnQkFBZ0IsQ0FBQ2xILENBQUMsQ0FBQztNQUN2QjtJQUNKLENBQUMsQ0FBQztJQUVGLE9BQU8ySCxXQUFXO0VBQ3RCLENBQUM7RUFFRCxPQUFPO0lBQ0h0SDtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDbkdnRDtBQUVqQyxTQUFTYSxxQkFBcUJBLENBQUEsRUFBRztFQUM1QyxJQUFJb0gsa0JBQWtCLEdBQUcsRUFBRTtFQUUzQixJQUFJeEksT0FBTztFQUNYLElBQUl5SSxtQkFBbUI7RUFFdkIsTUFBTXBGLG9CQUFvQixHQUFHLFNBQUFBLENBQUEsRUFBcUM7SUFBQSxTQUFBcUYsSUFBQSxHQUFBL0ksU0FBQSxDQUFBQyxNQUFBLEVBQXpCK0ksdUJBQXVCLE9BQUFDLEtBQUEsQ0FBQUYsSUFBQSxHQUFBRyxJQUFBLE1BQUFBLElBQUEsR0FBQUgsSUFBQSxFQUFBRyxJQUFBO01BQXZCRix1QkFBdUIsQ0FBQUUsSUFBQSxJQUFBbEosU0FBQSxDQUFBa0osSUFBQTtJQUFBO0lBQzVEO0lBQ0FMLGtCQUFrQixDQUFDTSxJQUFJLENBQUMsR0FBR0gsdUJBQXVCLENBQUM7O0lBRW5EO0lBQ0EsS0FBSyxNQUFNSSxpQkFBaUIsSUFBSUosdUJBQXVCLEVBQUU7TUFDckRGLG1CQUFtQixDQUFDM0gsV0FBVyxDQUFDaUksaUJBQWlCLENBQUN4SSxNQUFNLEVBQUUsQ0FBQztJQUMvRDtFQUNKLENBQUM7RUFFRCxNQUFNeUksdUJBQXVCLEdBQUcsU0FBQUEsQ0FBQSxFQUF3QztJQUNwRSxJQUFJYixLQUFLO0lBQUMsU0FBQWMsS0FBQSxHQUFBdEosU0FBQSxDQUFBQyxNQUFBLEVBRDhCc0osMEJBQTBCLE9BQUFOLEtBQUEsQ0FBQUssS0FBQSxHQUFBRSxLQUFBLE1BQUFBLEtBQUEsR0FBQUYsS0FBQSxFQUFBRSxLQUFBO01BQTFCRCwwQkFBMEIsQ0FBQUMsS0FBQSxJQUFBeEosU0FBQSxDQUFBd0osS0FBQTtJQUFBO0lBRWxFLEtBQUssTUFBTUosaUJBQWlCLElBQUlHLDBCQUEwQixFQUFFO01BQ3hEZixLQUFLLEdBQUdLLGtCQUFrQixDQUFDWSxPQUFPLENBQUNMLGlCQUFpQixDQUFDO01BQ3JELElBQUlaLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFBRTtNQUFVOztNQUUzQjtNQUNBWSxpQkFBaUIsQ0FBQzFJLE1BQU0sRUFBRTs7TUFFMUI7TUFDQW1JLGtCQUFrQixDQUFDYSxNQUFNLENBQUNsQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDO0VBQ0osQ0FBQztFQUVELE1BQU14RSxjQUFjLEdBQUcsU0FBQUEsQ0FBQSxFQUErQjtJQUNsRCxJQUFJd0UsS0FBSztJQUFDLFNBQUFtQixLQUFBLEdBQUEzSixTQUFBLENBQUFDLE1BQUEsRUFEcUIySixpQkFBaUIsT0FBQVgsS0FBQSxDQUFBVSxLQUFBLEdBQUFFLEtBQUEsTUFBQUEsS0FBQSxHQUFBRixLQUFBLEVBQUFFLEtBQUE7TUFBakJELGlCQUFpQixDQUFBQyxLQUFBLElBQUE3SixTQUFBLENBQUE2SixLQUFBO0lBQUE7SUFFaEQsS0FBSyxNQUFNNUYsZ0JBQWdCLElBQUkyRixpQkFBaUIsRUFBRTtNQUM5Q3BCLEtBQUssR0FBR0ssa0JBQWtCLENBQUNpQixTQUFTLENBQUVWLGlCQUFpQixJQUFLQSxpQkFBaUIsQ0FBQ2hHLFFBQVEsS0FBS2EsZ0JBQWdCLENBQUM7TUFFNUcsSUFBSXVFLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFBRTtNQUFVOztNQUUzQjtNQUNBSyxrQkFBa0IsQ0FBQ0wsS0FBSyxDQUFDLENBQUM5SCxNQUFNLEVBQUU7O01BRWxDO01BQ0FtSSxrQkFBa0IsQ0FBQ2EsTUFBTSxDQUFDbEIsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN2QztFQUNKLENBQUM7RUFFRCxNQUFNOUMsS0FBSyxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUNyQjtJQUNBbUQsa0JBQWtCLEdBQUcsRUFBRTs7SUFFdkI7SUFDQSxPQUFPQyxtQkFBbUIsQ0FBQ2hJLFVBQVUsRUFBRTtNQUNuQ2dJLG1CQUFtQixDQUFDL0gsV0FBVyxDQUFDK0gsbUJBQW1CLENBQUNoSSxVQUFVLENBQUM7SUFDbkU7RUFDSixDQUFDO0VBRUQsTUFBTThELFNBQVMsR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDekIsT0FBT2lFLGtCQUFrQixDQUFDa0IsR0FBRyxDQUFFWCxpQkFBaUIsSUFBSztNQUNqRCxPQUFPQSxpQkFBaUIsQ0FBQ2hHLFFBQVE7SUFDckMsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUVELE1BQU14QyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLElBQUlQLE9BQU8sS0FBS0gsU0FBUyxFQUFFO01BQ3ZCRyxPQUFPLEdBQUdULDREQUFhLENBQUMsS0FBSyxFQUFFO1FBQUMsT0FBTyxFQUFFO01BQVksQ0FBQyxDQUFDO0lBQzNEOztJQUVBO0lBQ0FTLE9BQU8sQ0FBQ2MsV0FBVyxDQUNmdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQ3JDQSw0REFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFDakNBLDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUNsQ0EsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQ3BDQSw0REFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FDbkMsQ0FDSjs7SUFFRDtJQUNBa0osbUJBQW1CLEdBQUd6SSxPQUFPLENBQUNjLFdBQVcsQ0FBQ3ZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRTdGLE9BQU9TLE9BQU87RUFDbEIsQ0FBQztFQUVELE9BQU87SUFDSHFELG9CQUFvQjtJQUNwQmdDLEtBQUs7SUFDTGQsU0FBUztJQUNUWixjQUFjO0lBQ2RxRix1QkFBdUI7SUFDdkJ6STtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDN0ZnRDtBQUVqQyxTQUFTbUYsb0JBQW9CQSxDQUFDaUIsV0FBVyxFQUFFO0VBQ3RELE1BQU1wRyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLE1BQU1vSixXQUFXLEdBQUcsRUFBRTtJQUN0QmhELFdBQVcsQ0FBQzVCLFNBQVMsQ0FBQ2pDLE9BQU8sQ0FBQyxDQUFDQyxRQUFRLEVBQUVvRixLQUFLLEVBQUVDLEdBQUcsS0FBSztNQUNwRCxNQUFNd0IsY0FBYyxHQUFHckgsUUFBUSxDQUFDaEQsYUFBYSxDQUFDLElBQUksQ0FBQzs7TUFFbkQ7TUFDQTtNQUNBLElBQUk0SSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ2J5QixjQUFjLENBQUM5SSxXQUFXLENBQ3RCdkIsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUcsR0FBRW9ILFdBQVcsQ0FBQzFELFVBQVUsQ0FBQ29FLFNBQVUsSUFBR1YsV0FBVyxDQUFDMUQsVUFBVSxDQUFDcUUsS0FBTSxJQUFHWCxXQUFXLENBQUMxRCxVQUFVLENBQUNyRCxNQUFPLEVBQUMsQ0FBQyxDQUNsSTtNQUNMLENBQUMsTUFBTSxJQUFJdUksS0FBSyxLQUFLLENBQUMsRUFBRTtRQUNwQnlCLGNBQWMsQ0FBQzlJLFdBQVcsQ0FDdEJ2Qiw0REFBYSxDQUFDLElBQUksRUFBRTtVQUFDLFNBQVMsRUFBRTZJLEdBQUcsQ0FBQ3hJLE1BQU0sR0FBRztRQUFDLENBQUMsQ0FBQyxDQUNuRDtNQUNMOztNQUVBO01BQ0FnSyxjQUFjLENBQUM5SSxXQUFXLENBQ3RCdkIsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUV3RCxRQUFRLENBQUNuRCxNQUFNLENBQUMsQ0FDM0M7O01BRUQ7TUFDQTtNQUNBLElBQUl1SSxLQUFLLEtBQU1DLEdBQUcsQ0FBQ3hJLE1BQU0sR0FBRyxDQUFFLEVBQUU7UUFDNUJnSyxjQUFjLENBQUM5SSxXQUFXLENBQ3RCdkIsNERBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUcsUUFBT29ILFdBQVcsQ0FBQ2tELGVBQWdCLFlBQVcsQ0FBQyxDQUMzRTtNQUNMLENBQUMsTUFBTSxJQUFJMUIsS0FBSyxLQUFLLENBQUMsRUFBRTtRQUNwQnlCLGNBQWMsQ0FBQzlJLFdBQVcsQ0FDdEJ2Qiw0REFBYSxDQUFDLElBQUksRUFBRTtVQUFDLFNBQVMsRUFBRTZJLEdBQUcsQ0FBQ3hJLE1BQU0sR0FBRztRQUFDLENBQUMsQ0FBQyxDQUNuRDtNQUNMOztNQUVBO01BQ0ErSixXQUFXLENBQUNiLElBQUksQ0FBQ2MsY0FBYyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUdGLE9BQU9ELFdBQVc7RUFDdEIsQ0FBQztFQUVELE9BQU87SUFDSHBKO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7QUNoRGdEO0FBRWpDLFNBQVNTLE1BQU1BLENBQUM4SSxhQUFhLEVBQUU7RUFDMUMsTUFBTXZKLE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDdEIsTUFBTXdKLE1BQU0sR0FBR3hILFFBQVEsQ0FBQ2hELGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDL0MsTUFBTXlLLFFBQVEsR0FBRyxJQUFJQyxJQUFJLEVBQUUsQ0FBQ0MsV0FBVyxFQUFFOztJQUV6QztJQUNBLElBQUlDLFdBQVcsR0FBR0osTUFBTSxDQUFDakosV0FBVyxDQUFDeUIsUUFBUSxDQUFDaEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUVqRTtJQUNBNEssV0FBVyxHQUFHQSxXQUFXLENBQUNySixXQUFXLENBQUN2Qiw0REFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFDM0QsZ0JBQWdCLEVBQ2hCQSw0REFBYSxDQUFDLE1BQU0sRUFBRTtNQUFDNkssRUFBRSxFQUFFO0lBQWdCLENBQUMsRUFBRUosUUFBUSxHQUFHRixhQUFhLEdBQUksR0FBRUEsYUFBYyxJQUFHRSxRQUFTLEVBQUMsR0FBR0YsYUFBYSxDQUFDLEVBQ3hILDhEQUE4RCxDQUNqRSxDQUFDO0lBRUYsT0FBT0MsTUFBTTtFQUNqQixDQUFDO0VBRUQsT0FBTztJQUFDeEo7RUFBTyxDQUFDO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7O0FDckJnRDtBQUMyQjtBQUU1RCxTQUFTYyxtQkFBbUJBLENBQUM0QixVQUFVLEVBQUU4RCxZQUFZLEVBQUVDLGNBQWMsRUFBRTtFQUNsRixJQUFJaEgsT0FBTztFQUVYLE1BQU1pSCxlQUFlLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQy9CQyxZQUFZLEVBQUU7SUFFZGxILE9BQU8sQ0FBQ2MsV0FBVyxDQUNmdUosMkVBQTJCLENBQUNwSCxVQUFVLEVBQUVrRSxpQkFBaUIsRUFBRUMsZ0JBQWdCLENBQUMsQ0FBQzdHLE1BQU0sRUFBRSxDQUN4RjtFQUNMLENBQUM7RUFFRCxNQUFNNEcsaUJBQWlCLEdBQUcsU0FBQUEsQ0FBU2pILENBQUMsRUFBRTtJQUNsQ0EsQ0FBQyxDQUFDNkQsY0FBYyxFQUFFO0lBRWxCZ0QsWUFBWSxDQUFDN0csQ0FBQyxFQUFFK0MsVUFBVSxDQUFDOztJQUUzQjtJQUNBQSxVQUFVLENBQUNvRSxTQUFTLEdBQUdyRCxNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxLQUFLLENBQUM7SUFDN0VuQixVQUFVLENBQUNxRSxLQUFLLEdBQUd0RCxNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUM7SUFDckVuQixVQUFVLENBQUNyRCxNQUFNLEdBQUdvRSxNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUM7SUFDdkVuQixVQUFVLENBQUNxSCxLQUFLLEdBQUd0RyxNQUFNLENBQUM5RCxDQUFDLENBQUMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUM7SUFFckU3RCxNQUFNLEVBQUU7RUFDWixDQUFDO0VBRUQsTUFBTTZHLGdCQUFnQixHQUFHLFNBQUFBLENBQUEsRUFBVztJQUNoQzdHLE1BQU0sRUFBRTtFQUNaLENBQUM7RUFFRCxNQUFNaUgsaUJBQWlCLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ2pDUixjQUFjLENBQUMvRCxVQUFVLENBQUM7RUFDOUIsQ0FBQztFQUVELE1BQU01QyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCTCxPQUFPLENBQUNLLE1BQU0sRUFBRTtFQUNwQixDQUFDO0VBRUQsTUFBTTZHLFlBQVksR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDNUIsT0FBT2xILE9BQU8sQ0FBQ1MsVUFBVSxFQUFFO01BQ3ZCVCxPQUFPLENBQUNVLFdBQVcsQ0FBQ1YsT0FBTyxDQUFDUyxVQUFVLENBQUM7SUFDM0M7RUFDSixDQUFDO0VBRUQsTUFBTUYsTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QixJQUFJUCxPQUFPLEtBQUtILFNBQVMsRUFBRTtNQUN2QkcsT0FBTyxHQUFHVCw0REFBYSxDQUFDLEtBQUssRUFBRTtRQUFDLE9BQU8sRUFBRTtNQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDLE1BQU07TUFDSDJILFlBQVksRUFBRTtJQUNsQjtJQUVBLE1BQU1PLE9BQU8sR0FBR2xJLDREQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztJQUNuRCxNQUFNbUksU0FBUyxHQUFHbkksNERBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDOztJQUV2RDtJQUNBa0ksT0FBTyxDQUFDakgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFeUcsZUFBZSxDQUFDO0lBQ2xEUyxTQUFTLENBQUNsSCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVnSCxpQkFBaUIsQ0FBQztJQUV0RHhILE9BQU8sQ0FBQzRHLE1BQU0sQ0FDVnJILDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFMEQsVUFBVSxDQUFDb0UsU0FBUyxDQUFDLEVBQzlDOUgsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUwRCxVQUFVLENBQUNxRSxLQUFLLENBQUMsRUFDMUMvSCw0REFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTBELFVBQVUsQ0FBQ3JELE1BQU0sQ0FBQyxFQUMzQ0wsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUwRCxVQUFVLENBQUNxSCxLQUFLLENBQUMsRUFDMUMvSyw0REFBYSxDQUFDLEtBQUssQ0FBQyxFQUNwQkEsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBcUIsQ0FBQyxFQUNqRGtJLE9BQU8sRUFDUEMsU0FBUyxDQUNaLENBQ0o7SUFFRCxPQUFPMUgsT0FBTztFQUNsQixDQUFDO0VBRUQsT0FBTztJQUNILElBQUlpRCxVQUFVQSxDQUFBLEVBQUc7TUFBRSxPQUFPQSxVQUFVO0lBQUUsQ0FBQztJQUN2QzVDLE1BQU07SUFDTkU7RUFDSixDQUFDO0FBQ0w7Ozs7Ozs7Ozs7Ozs7OztBQ2hGdUY7QUFFeEUsU0FBU1csNkJBQTZCQSxDQUFDMEcsZ0JBQWdCLEVBQUU7RUFDcEUsSUFBSUMsV0FBVztFQUVmLE1BQU10SCxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCc0gsV0FBVyxHQUFHdEksNERBQWEsQ0FBQyxNQUFNLEVBQUU7TUFDaEMsUUFBUSxFQUFFLEVBQUU7TUFDWixRQUFRLEVBQUUsS0FBSztNQUNmLE1BQU0sRUFBRSxvQkFBb0I7TUFDNUIsSUFBSSxFQUFFLHlCQUF5QjtNQUMvQixPQUFPLEVBQUU7SUFDYixDQUFDLENBQUM7SUFDRixJQUFJdUksZ0JBQWdCOztJQUVwQjtJQUNBLE1BQU1DLGlCQUFpQixHQUFHRixXQUFXLENBQUMvRyxXQUFXLENBQzdDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBbUIsQ0FBQyxDQUFDLENBQ3ZEOztJQUVEO0lBQ0F3SSxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFpQixDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQ2hFQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLFdBQVc7TUFBRSxJQUFJLEVBQUUsaUJBQWlCO01BQUUsTUFBTSxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUU7SUFBTSxDQUFDLENBQUMsQ0FDMUgsQ0FDSjs7SUFFRDtJQUNBd0ksaUJBQWlCLENBQUNqSCxXQUFXLENBQ3pCdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxLQUFLLEVBQUU7SUFBYSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ3hEQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLE9BQU87TUFBRSxJQUFJLEVBQUUsYUFBYTtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFO0lBQU0sQ0FBQyxDQUFDLENBQ2xILENBQ0o7O0lBRUQ7SUFDQXVJLGdCQUFnQixHQUFHdkksNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsSUFBSSxFQUFFLGNBQWM7TUFBRSxNQUFNLEVBQUUsR0FBRztNQUFFLFVBQVUsRUFBRTtJQUFNLENBQUMsQ0FBQztJQUNwSTtJQUNBdUksZ0JBQWdCLENBQUN0SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBS3lILGlFQUFrQixDQUFDekgsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDLENBQUM7SUFDL0U4RCxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFjLENBQUMsRUFBRSxTQUFTLENBQUMsRUFDMUR1SSxnQkFBZ0IsQ0FDbkIsQ0FDSjs7SUFFRDtJQUNBQSxnQkFBZ0IsR0FBR3ZJLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLE1BQU07TUFBRSxNQUFNLEVBQUUsT0FBTztNQUFFLElBQUksRUFBRSxhQUFhO01BQUUsTUFBTSxFQUFFLEdBQUc7TUFBRSxVQUFVLEVBQUU7SUFBTSxDQUFDLENBQUM7SUFDbEk7SUFDQXVJLGdCQUFnQixDQUFDdEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFHTixDQUFDLElBQUtxSyxnRUFBaUIsQ0FBQ3JLLENBQUMsQ0FBQytELE1BQU0sQ0FBQyxDQUFDO0lBQzlFOEQsaUJBQWlCLENBQUNqSCxXQUFXLENBQ3pCdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxLQUFLLEVBQUU7SUFBYSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ3hEdUksZ0JBQWdCLENBQ25CLENBQ0o7O0lBRUQ7SUFDQUQsV0FBVyxDQUFDL0csV0FBVyxDQUNuQnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQTBCLENBQUMsRUFDdERBLDREQUFhLENBQUMsT0FBTyxFQUFFO01BQUMsTUFBTSxFQUFFLFFBQVE7TUFBRSxPQUFPLEVBQUU7SUFBSyxDQUFDLENBQUMsQ0FDN0QsQ0FDSjs7SUFFRDtJQUNBc0ksV0FBVyxDQUFDckgsZ0JBQWdCLENBQUMsUUFBUSxFQUFHTixDQUFDLElBQUs7TUFDMUMsSUFBSTBILGdCQUFnQixLQUFLL0gsU0FBUyxFQUFFO1FBQ2hDK0gsZ0JBQWdCLENBQUMxSCxDQUFDLENBQUM7TUFDdkI7TUFFQThILFVBQVUsRUFBRTtJQUNoQixDQUFDLENBQUM7SUFFRixPQUFPSCxXQUFXO0VBQ3RCLENBQUM7RUFFRCxNQUFNRyxVQUFVLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQzFCLElBQUlDLFlBQVk7O0lBRWhCO0lBQ0E7SUFDQSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQ25GLE9BQU8sQ0FBQyxDQUFDb0YsU0FBUyxFQUFFQyxLQUFLLEVBQUVDLEdBQUcsS0FBSztNQUNuREgsWUFBWSxHQUFHSixXQUFXLENBQUMzRCxRQUFRLENBQUNDLFNBQVMsQ0FBQytELFNBQVMsQ0FBQztNQUN4RCxJQUFJRCxZQUFZLEVBQUU7UUFDZEEsWUFBWSxDQUFDN0QsS0FBSyxHQUFHNkQsWUFBWSxDQUFDSSxZQUFZO1FBRTlDLElBQUlGLEtBQUssSUFBS0MsR0FBRyxDQUFDeEksTUFBTSxHQUFHLENBQUUsRUFBRTtVQUMzQnFJLFlBQVksQ0FBQ0ssS0FBSyxFQUFFO1FBQ3hCO01BQ0o7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsT0FBTztJQUNIL0g7RUFDSixDQUFDO0FBQ0w7Ozs7Ozs7Ozs7Ozs7OztBQ2pHdUY7QUFFeEUsU0FBUzhKLDJCQUEyQkEsQ0FBQ3BILFVBQVUsRUFBRWtFLGlCQUFpQixFQUFFQyxnQkFBZ0IsRUFBRTtFQUNqRyxJQUFJUyxXQUFXO0VBRWYsTUFBTXRILE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDdEJzSCxXQUFXLEdBQUd0SSw0REFBYSxDQUFDLE1BQU0sRUFBRTtNQUNoQyxRQUFRLEVBQUUsRUFBRTtNQUNaLFFBQVEsRUFBRSxLQUFLO01BQ2YsTUFBTSxFQUFFLGtCQUFrQjtNQUMxQixJQUFJLEVBQUUsdUJBQXVCO01BQzdCLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUNGLElBQUl1SSxnQkFBZ0I7O0lBRXBCO0lBQ0EsTUFBTUMsaUJBQWlCLEdBQUdGLFdBQVcsQ0FBQy9HLFdBQVcsQ0FDN0N2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFtQixDQUFDLENBQUMsQ0FDdkQ7O0lBRUQ7SUFDQTtJQUNBd0ksaUJBQWlCLENBQUNqSCxXQUFXLENBQ3pCdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxLQUFLLEVBQUU7SUFBaUIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUNoRUEsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxXQUFXO01BQUUsSUFBSSxFQUFFLGlCQUFpQjtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFLE1BQU07TUFBRSxPQUFPLEVBQUUwRCxVQUFVLENBQUNvRTtJQUFTLENBQUMsQ0FBQyxDQUN6SixDQUNKOztJQUVEO0lBQ0E7SUFDQVUsaUJBQWlCLENBQUNqSCxXQUFXLENBQ3pCdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxLQUFLLEVBQUU7SUFBYSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ3hEQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLE9BQU87TUFBRSxJQUFJLEVBQUUsYUFBYTtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFLE1BQU07TUFBRSxPQUFPLEVBQUUwRCxVQUFVLENBQUNxRTtJQUFLLENBQUMsQ0FBQyxDQUM3SSxDQUNKOztJQUVEO0lBQ0FRLGdCQUFnQixHQUFHdkksNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxNQUFNLEVBQUUsTUFBTTtNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsSUFBSSxFQUFFLGNBQWM7TUFBRSxNQUFNLEVBQUUsR0FBRztNQUFFLFVBQVUsRUFBRSxNQUFNO01BQUUsT0FBTyxFQUFFMEQsVUFBVSxDQUFDckQ7SUFBTSxDQUFDLENBQUM7SUFDaEs7SUFDQWtJLGdCQUFnQixDQUFDdEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFHTixDQUFDLElBQUt5SCxpRUFBa0IsQ0FBQ3pILENBQUMsQ0FBQytELE1BQU0sQ0FBQyxDQUFDO0lBQy9FOEQsaUJBQWlCLENBQUNqSCxXQUFXLENBQ3pCdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxFQUM3Q0EsNERBQWEsQ0FBQyxPQUFPLEVBQUU7TUFBQyxLQUFLLEVBQUU7SUFBYyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQzFEdUksZ0JBQWdCLENBQ25CLENBQ0o7O0lBRUQ7SUFDQUEsZ0JBQWdCLEdBQUd2SSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxNQUFNO01BQUUsTUFBTSxFQUFFLE9BQU87TUFBRSxJQUFJLEVBQUUsYUFBYTtNQUFFLE1BQU0sRUFBRSxHQUFHO01BQUUsVUFBVSxFQUFFLE1BQU07TUFBRSxPQUFPLEVBQUUwRCxVQUFVLENBQUNxSDtJQUFLLENBQUMsQ0FBQztJQUM3SjtJQUNBeEMsZ0JBQWdCLENBQUN0SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBS3FLLGdFQUFpQixDQUFDckssQ0FBQyxDQUFDK0QsTUFBTSxDQUFDLENBQUM7SUFDOUU4RCxpQkFBaUIsQ0FBQ2pILFdBQVcsQ0FDekJ2Qiw0REFBYSxDQUFDLEtBQUssRUFBRTtNQUFDLE9BQU8sRUFBRTtJQUFpQixDQUFDLEVBQzdDQSw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLEtBQUssRUFBRTtJQUFhLENBQUMsRUFBRSxRQUFRLENBQUMsRUFDeER1SSxnQkFBZ0IsQ0FDbkIsQ0FDSjs7SUFFRDtJQUNBLE1BQU1TLGdCQUFnQixHQUFHVixXQUFXLENBQUMvRyxXQUFXLENBQzVDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBMEIsQ0FBQyxDQUFDLENBQzlEOztJQUVEO0lBQ0FnSixnQkFBZ0IsQ0FBQ3pILFdBQVcsQ0FDeEJ2Qiw0REFBYSxDQUFDLE9BQU8sRUFBRTtNQUFDLE1BQU0sRUFBRSxRQUFRO01BQUUsT0FBTyxFQUFFO0lBQVEsQ0FBQyxDQUFDLENBQ2hFOztJQUVEO0lBQ0FzSSxXQUFXLENBQUNySCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdOLENBQUMsSUFBSztNQUMxQyxJQUFJaUgsaUJBQWlCLEtBQUt0SCxTQUFTLEVBQUU7UUFDakNzSCxpQkFBaUIsQ0FBQ2pILENBQUMsQ0FBQztNQUN4QjtJQUNKLENBQUMsQ0FBQzs7SUFFRjtJQUNBcUksZ0JBQWdCLENBQUN6SCxXQUFXLENBQ3hCdkIsNERBQWEsQ0FBQyxRQUFRLEVBQUU7TUFBQyxNQUFNLEVBQUU7SUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQ3hELENBQUNpQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdOLENBQUMsSUFBSztNQUMvQixJQUFJa0gsZ0JBQWdCLEtBQUt2SCxTQUFTLEVBQUU7UUFDaEN1SCxnQkFBZ0IsQ0FBQ2xILENBQUMsQ0FBQztNQUN2QjtJQUNKLENBQUMsQ0FBQztJQUVGLE9BQU8ySCxXQUFXO0VBQ3RCLENBQUM7RUFFRCxPQUFPO0lBQ0h0SDtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDNUZnRDtBQUVqQyxTQUFTZSx1QkFBdUJBLENBQUEsRUFBRztFQUM5QyxJQUFJa0osb0JBQW9CLEdBQUcsRUFBRTtFQUU3QixJQUFJeEssT0FBTztFQUNYLElBQUl5SyxxQkFBcUI7RUFFekIsTUFBTWpILHNCQUFzQixHQUFHLFNBQUFBLENBQUEsRUFBdUM7SUFBQSxTQUFBa0YsSUFBQSxHQUFBL0ksU0FBQSxDQUFBQyxNQUFBLEVBQTNCOEsseUJBQXlCLE9BQUE5QixLQUFBLENBQUFGLElBQUEsR0FBQUcsSUFBQSxNQUFBQSxJQUFBLEdBQUFILElBQUEsRUFBQUcsSUFBQTtNQUF6QjZCLHlCQUF5QixDQUFBN0IsSUFBQSxJQUFBbEosU0FBQSxDQUFBa0osSUFBQTtJQUFBO0lBQ2hFMkIsb0JBQW9CLENBQUMxQixJQUFJLENBQUMsR0FBRzRCLHlCQUF5QixDQUFDO0lBQ3ZELEtBQUssTUFBTUMsbUJBQW1CLElBQUlELHlCQUF5QixFQUFFO01BQ3pERCxxQkFBcUIsQ0FBQzNKLFdBQVcsQ0FBQzZKLG1CQUFtQixDQUFDcEssTUFBTSxFQUFFLENBQUM7SUFDbkU7RUFDSixDQUFDO0VBRUQsTUFBTXFLLHlCQUF5QixHQUFHLFNBQUFBLENBQUEsRUFBMEM7SUFDeEUsSUFBSXpDLEtBQUs7SUFBQyxTQUFBYyxLQUFBLEdBQUF0SixTQUFBLENBQUFDLE1BQUEsRUFEZ0NpTCw0QkFBNEIsT0FBQWpDLEtBQUEsQ0FBQUssS0FBQSxHQUFBRSxLQUFBLE1BQUFBLEtBQUEsR0FBQUYsS0FBQSxFQUFBRSxLQUFBO01BQTVCMEIsNEJBQTRCLENBQUExQixLQUFBLElBQUF4SixTQUFBLENBQUF3SixLQUFBO0lBQUE7SUFFdEUsS0FBSyxNQUFNd0IsbUJBQW1CLElBQUlFLDRCQUE0QixFQUFFO01BQzVEMUMsS0FBSyxHQUFHcUMsb0JBQW9CLENBQUNwQixPQUFPLENBQUN1QixtQkFBbUIsQ0FBQztNQUN6RCxJQUFJeEMsS0FBSyxHQUFHLENBQUMsRUFBRTtRQUFFO01BQVU7O01BRTNCO01BQ0F3QyxtQkFBbUIsQ0FBQ3RLLE1BQU0sRUFBRTs7TUFFNUI7TUFDQW1LLG9CQUFvQixDQUFDbkIsTUFBTSxDQUFDbEIsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN6QztFQUNKLENBQUM7RUFFRCxNQUFNdEUsZ0JBQWdCLEdBQUcsU0FBQUEsQ0FBQSxFQUFpQztJQUN0RCxJQUFJc0UsS0FBSztJQUFDLFNBQUFtQixLQUFBLEdBQUEzSixTQUFBLENBQUFDLE1BQUEsRUFEdUJrTCxtQkFBbUIsT0FBQWxDLEtBQUEsQ0FBQVUsS0FBQSxHQUFBRSxLQUFBLE1BQUFBLEtBQUEsR0FBQUYsS0FBQSxFQUFBRSxLQUFBO01BQW5Cc0IsbUJBQW1CLENBQUF0QixLQUFBLElBQUE3SixTQUFBLENBQUE2SixLQUFBO0lBQUE7SUFFcEQsS0FBSyxNQUFNMUYsa0JBQWtCLElBQUlnSCxtQkFBbUIsRUFBRTtNQUNsRDNDLEtBQUssR0FBR3FDLG9CQUFvQixDQUFDZixTQUFTLENBQUVrQixtQkFBbUIsSUFBS0EsbUJBQW1CLENBQUMxSCxVQUFVLEtBQUthLGtCQUFrQixDQUFDO01BRXRILElBQUlxRSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQUU7TUFBVTs7TUFFM0I7TUFDQXFDLG9CQUFvQixDQUFDckMsS0FBSyxDQUFDLENBQUM5SCxNQUFNLEVBQUU7O01BRXBDO01BQ0FtSyxvQkFBb0IsQ0FBQ25CLE1BQU0sQ0FBQ2xCLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDekM7RUFDSixDQUFDO0VBRUQsTUFBTTlDLEtBQUssR0FBRyxTQUFBQSxDQUFBLEVBQVc7SUFDckI7SUFDQW1GLG9CQUFvQixHQUFHLEVBQUU7O0lBRXpCO0lBQ0EsT0FBT0MscUJBQXFCLENBQUNoSyxVQUFVLEVBQUU7TUFDckNnSyxxQkFBcUIsQ0FBQy9KLFdBQVcsQ0FBQytKLHFCQUFxQixDQUFDaEssVUFBVSxDQUFDO0lBQ3ZFO0VBQ0osQ0FBQztFQUVELE1BQU04RCxTQUFTLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3pCLE9BQU9pRyxvQkFBb0IsQ0FBQ2QsR0FBRyxDQUFFaUIsbUJBQW1CLElBQUs7TUFDckQsT0FBT0EsbUJBQW1CLENBQUMxSCxVQUFVO0lBQ3pDLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRCxNQUFNMUMsTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QixJQUFJUCxPQUFPLEtBQUtILFNBQVMsRUFBRTtNQUN2QkcsT0FBTyxHQUFHVCw0REFBYSxDQUFDLEtBQUssRUFBRTtRQUFDLE9BQU8sRUFBRTtNQUFZLENBQUMsQ0FBQztJQUMzRDs7SUFFQTtJQUNBUyxPQUFPLENBQUNjLFdBQVcsQ0FDZnZCLDREQUFhLENBQUMsS0FBSyxFQUFFO01BQUMsT0FBTyxFQUFFO0lBQWlCLENBQUMsRUFDN0NBLDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUNyQ0EsNERBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQ2pDQSw0REFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFDbENBLDREQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUNwQyxDQUNKOztJQUVEO0lBQ0FrTCxxQkFBcUIsR0FBR3pLLE9BQU8sQ0FBQ2MsV0FBVyxDQUFDdkIsNERBQWEsQ0FBQyxLQUFLLEVBQUU7TUFBQyxPQUFPLEVBQUU7SUFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFL0YsT0FBT1MsT0FBTztFQUNsQixDQUFDO0VBRUQsT0FBTztJQUNId0Qsc0JBQXNCO0lBQ3RCNkIsS0FBSztJQUNMZCxTQUFTO0lBQ1RWLGdCQUFnQjtJQUNoQitHLHlCQUF5QjtJQUN6QnJLO0VBQ0osQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDekZPLE1BQU13SyxPQUFPLENBQUM7RUFDakJDLFdBQVdBLENBQUEsRUFBb0I7SUFBQSxJQUFuQnRFLFlBQVksR0FBQS9HLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLEVBQUU7SUFDekIsSUFBSSxDQUFDK0csWUFBWSxHQUFHQSxZQUFZO0VBQ3BDO0VBRUFyQixLQUFLQSxDQUFBLEVBQUc7SUFDSixJQUFJLENBQUNxQixZQUFZLEdBQUcsRUFBRTtFQUMxQjtFQUVBb0MsSUFBSUEsQ0FBQ25DLFdBQVcsRUFBRTtJQUNkOztJQUVBLElBQUksQ0FBQ0QsWUFBWSxDQUFDb0MsSUFBSSxDQUFDbkMsV0FBVyxDQUFDO0VBQ3ZDO0VBRUFzRSxRQUFRQSxDQUFBLEVBQUc7SUFDUCxPQUFPLElBQUksQ0FBQ3ZFLFlBQVksQ0FBQ3dFLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUVDLElBQUksS0FBS0QsS0FBSyxHQUFHQyxJQUFJLENBQUNuSSxVQUFVLENBQUNxSCxLQUFLLEVBQUUsQ0FBQyxDQUFDO0VBQ3RGO0VBRUFlLFFBQVFBLENBQUEsRUFBRztJQUNQLElBQUlqRyxPQUFPLEdBQUcsSUFBSTJGLE9BQU8sRUFBRTtJQUMzQjNGLE9BQU8sQ0FBQ3NCLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDQSxZQUFZLENBQUM7SUFDN0MsT0FBT3RCLE9BQU87RUFDbEI7RUFFQVMsZUFBZUEsQ0FBQSxFQUFHO0lBQ2QsTUFBTXlGLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDNUUsWUFBWSxDQUFDNUQsT0FBTyxDQUFFNkQsV0FBVyxJQUFLO01BQ3ZDLElBQUlBLFdBQVcsQ0FBQzFELFVBQVUsQ0FBQ3JELE1BQU0sSUFBSTBMLGVBQWUsRUFBRTtRQUNsREEsZUFBZSxDQUFDM0UsV0FBVyxDQUFDMUQsVUFBVSxDQUFDckQsTUFBTSxDQUFDLENBQUN5RyxRQUFRLEVBQUU7TUFDN0QsQ0FBQyxNQUFNO1FBQ0hpRixlQUFlLENBQUMzRSxXQUFXLENBQUMxRCxVQUFVLENBQUNyRCxNQUFNLENBQUMsR0FBRztVQUM3QzBHLFNBQVMsRUFBRUssV0FBVyxDQUFDMUQsVUFBVSxDQUFDcUgsS0FBSztVQUN2Q2pFLFFBQVEsRUFBRTtRQUNkLENBQUM7TUFDTDtJQUNKLENBQUMsQ0FBQztJQUVGLE9BQU9pRixlQUFlO0VBQzFCO0FBQ0o7QUFFTyxNQUFNbEcsT0FBTyxHQUFHO0VBQ25CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSW1HLFVBQVUsRUFBRSxTQUFBQSxDQUFDMUIsZUFBZSxFQUFFMkIsbUJBQW1CLEVBQUVDLHlCQUF5QixFQUFxQjtJQUFBLElBQW5CQyxVQUFVLEdBQUEvTCxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDO0lBQ3hGO0lBQ0EsSUFBSSxDQUFDOEwseUJBQXlCLENBQUM3TCxNQUFNLEVBQUU7TUFDbkMsT0FBTyxDQUFFaUssZUFBZSxDQUFFO0lBQzlCO0lBRUEsSUFBSThCLHFCQUFxQjtJQUN6QixLQUFLLElBQUlDLENBQUMsR0FBR0YsVUFBVSxFQUFFRSxDQUFDLEdBQUdILHlCQUF5QixDQUFDN0wsTUFBTSxFQUFFZ00sQ0FBQyxFQUFFLEVBQUU7TUFHaEU7TUFDQSxJQUFJSixtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNHLENBQUMsQ0FBQyxDQUFDLENBQUNoTSxNQUFNLElBQUlpSyxlQUFlLEVBQUU7UUFDN0U7UUFDQTtRQUNBNEIseUJBQXlCLENBQUNwQyxNQUFNLENBQUN1QyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sQ0FBRUosbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRTtNQUNuRTs7TUFFQTtNQUNBLElBQUtELHFCQUFxQixJQUFJOUwsU0FBUyxJQUMvQjJMLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxHQUFHaEMsZUFBZ0IsRUFDdEY7UUFDRThCLHFCQUFxQixHQUFHQyxDQUFDO01BQzdCO0lBQ0o7O0lBRUE7SUFDQTtJQUNBLElBQUlELHFCQUFxQixJQUFJOUwsU0FBUyxFQUFFO01BQ3BDLE9BQU8sQ0FBRWdLLGVBQWUsQ0FBRTtJQUM5Qjs7SUFFQTtJQUNBO0lBQ0EsTUFBTWlDLGdCQUFnQixHQUFHTixtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNwQyxNQUFNLENBQUNzQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RyxPQUFPLENBQ0hHLGdCQUFnQixFQUNoQixHQUFHMUcsT0FBTyxDQUFDbUcsVUFBVSxDQUNqQjFCLGVBQWUsR0FBR2lDLGdCQUFnQixDQUFDRCxXQUFXLEVBQzlDTCxtQkFBbUIsRUFDbkJDLHlCQUF5QixFQUN6QkUscUJBQXFCLENBQ3hCLENBQ0o7RUFDTDtBQUNKLENBQUM7QUFFRCxpRUFBZXZHLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7QUNyR2lCO0FBQ0k7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU01RCxpQkFBaUIsR0FBRyxDQUFDLE1BQU07RUFDN0IsSUFBSUssV0FBVzs7RUFFZjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksU0FBU21LLHlCQUF5QkEsQ0FBQ0MsMEJBQTBCLEVBQUVDLHNCQUFzQixFQUFFO0lBQ25GO0lBQ0EsSUFBSSxDQUFDRCwwQkFBMEIsQ0FBQ3JNLE1BQU0sRUFBRTtNQUNwQyxPQUFPLENBQUM7SUFDWjtJQUVBLE1BQU11TSxnQkFBZ0IsR0FBR0YsMEJBQTBCLENBQUNHLGFBQWEsQ0FBRUMsR0FBRyxJQUFLQSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ25GO0lBQ0EsSUFBSUYsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDekIsT0FBTyxDQUFDO0lBQ1o7O0lBRUE7O0lBRUE7SUFDQSxJQUFJRyxLQUFLLEdBQUdMLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7O0lBRTdDO0lBQ0E7SUFDQSxLQUFLLElBQUlMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSU8sZ0JBQWdCLEVBQUVQLENBQUMsRUFBRSxFQUFFO01BQ3hDVSxLQUFLLElBQUlMLDBCQUEwQixDQUFDTCxDQUFDLENBQUMsR0FBR00sc0JBQXNCLENBQUNLLEtBQUssQ0FBQyxDQUFDLEVBQUVYLENBQUMsQ0FBQyxDQUFDVixNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtELEtBQUssSUFBSUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNIO0lBRUEsT0FBT2tCLEtBQUs7RUFDaEI7RUFFQSxTQUFTRSxhQUFhQSxDQUFDUCwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUU7SUFDdkUsTUFBTU8sR0FBRyxHQUFHVCx5QkFBeUIsQ0FBQ0MsMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO0lBRXpGLE1BQU1RLG1CQUFtQixHQUFHUixzQkFBc0IsQ0FBQ0UsYUFBYSxDQUFFQyxHQUFHLElBQUtBLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbEYsTUFBTU0sR0FBRyxHQUFHVCxzQkFBc0IsQ0FDN0JLLEtBQUssQ0FBQyxDQUFDLEVBQUVHLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxHQUFHUixzQkFBc0IsQ0FBQ3RNLE1BQU0sR0FBRzhNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUM5RmhELEdBQUcsQ0FBRTJDLEdBQUcsSUFBS0EsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUNyQm5CLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUVDLElBQUksS0FBS0QsS0FBSyxHQUFHQyxJQUFJLENBQUM7SUFFMUMsTUFBTXdCLFVBQVUsR0FBSUgsR0FBRyxHQUFHRSxHQUFHLEdBQUksR0FBRztJQUNwQztJQUNBLE9BQU9DLFVBQVU7RUFDckI7RUFFQSxTQUFTQyxJQUFJQSxDQUFDWiwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUU7SUFDOUQ7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVRLE1BQU1ZLHNCQUFzQixHQUFHYiwwQkFBMEIsQ0FBQ3hDLFNBQVMsQ0FBRTRDLEdBQUcsSUFBS0EsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUVyRixJQUFJUyxzQkFBc0IsS0FBS2pOLFNBQVMsRUFBRTtNQUN0QztNQUNBO0lBQ0o7SUFFQW9NLDBCQUEwQixDQUFDYSxzQkFBc0IsQ0FBQyxHQUFHLENBQUM7SUFFdEQsT0FBT0MsU0FBUyxDQUFDZCwwQkFBMEIsRUFBRUMsc0JBQXNCLEVBQUVZLHNCQUFzQixHQUFHLENBQUMsQ0FBQztFQUNwRztFQUVBLFNBQVNDLFNBQVNBLENBQUNkLDBCQUEwQixFQUFFQyxzQkFBc0IsRUFBYTtJQUFBLElBQVgvRCxLQUFLLEdBQUF4SSxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDO0lBQzVFO0lBQ0E7SUFDSTtJQUNBO0lBQ0E7O0lBRUo7SUFDQSxJQUFJd0ksS0FBSyxJQUFJOEQsMEJBQTBCLENBQUNyTSxNQUFNLEVBQUU7TUFBRSxPQUFPLElBQUk7SUFBRTtJQUUvRHFNLDBCQUEwQixDQUFDOUQsS0FBSyxDQUFDLEVBQUU7SUFFbkMsSUFBSThELDBCQUEwQixDQUFDOUQsS0FBSyxDQUFDLEdBQUcrRCxzQkFBc0IsQ0FBQy9ELEtBQUssQ0FBQyxFQUFFO01BQ25FOEQsMEJBQTBCLENBQUM5RCxLQUFLLENBQUMsR0FBRyxDQUFDO01BQ3JDLE9BQU80RSxTQUFTLENBQUNkLDBCQUEwQixFQUFFQyxzQkFBc0IsRUFBRSxFQUFFL0QsS0FBSyxDQUFDO0lBQ2pGO0VBQ0o7RUFFQSxTQUFTNkUsU0FBU0EsQ0FBQ2YsMEJBQTBCLEVBQUVDLHNCQUFzQixFQUFhO0lBQUEsSUFBWC9ELEtBQUssR0FBQXhJLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7SUFDNUU7SUFDQSxJQUFJd0ksS0FBSyxJQUFJOEQsMEJBQTBCLENBQUNyTSxNQUFNLEVBQUU7TUFBRSxPQUFPLElBQUk7SUFBRTtJQUUvRHFNLDBCQUEwQixDQUFDOUQsS0FBSyxDQUFDLEVBQUU7SUFFbkMsSUFBSThELDBCQUEwQixDQUFDOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ3ZDOEQsMEJBQTBCLENBQUM5RCxLQUFLLENBQUMsR0FBRyxDQUFDO01BQ3JDLE9BQU82RSxTQUFTLENBQUNmLDBCQUEwQixFQUFFQyxzQkFBc0IsRUFBRSxFQUFFL0QsS0FBSyxDQUFDO0lBQ2pGO0lBRUEsT0FBT0EsS0FBSztFQUNoQjtFQUVBLFNBQVNoRCxrQkFBa0JBLENBQUNKLFNBQVMsRUFBRUMsV0FBVyxFQUFFO0lBQ2hEO0lBQ0EsSUFBSSxDQUFDRCxTQUFTLENBQUNuRixNQUFNLElBQUksQ0FBQ29GLFdBQVcsRUFBRTtNQUNuQztJQUNKO0lBRUFuRCxXQUFXLEdBQUdoQyxTQUFTOztJQUV2QjtJQUNBa0YsU0FBUyxDQUFDa0ksSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxLQUFLQSxDQUFDLENBQUN2TixNQUFNLEdBQUdzTixDQUFDLENBQUN0TixNQUFNLENBQUM7O0lBRTVDO0lBQ0E7O0lBRUE7SUFDQW9GLFdBQVcsQ0FBQ2lJLElBQUksQ0FBQyxDQUFDQyxDQUFDLEVBQUNDLENBQUMsS0FBS0EsQ0FBQyxDQUFDdk4sTUFBTSxHQUFHc04sQ0FBQyxDQUFDdE4sTUFBTSxDQUFDOztJQUU5QztJQUNBO0lBQ0E7SUFDQSxJQUFJNEwsbUJBQW1CLEdBQUd6RyxTQUFTLENBQUNxSSxPQUFPLENBQUVySyxRQUFRLElBQUs7TUFDdEQsT0FBTyxJQUFJNkYsS0FBSyxDQUFDN0YsUUFBUSxDQUFDc0QsUUFBUSxDQUFDLENBQzlCZ0gsSUFBSSxDQUFDdEssUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQzs7SUFFRjtJQUNBO0lBQ0EsSUFBSW1KLHNCQUFzQixHQUFHLElBQUl0RCxLQUFLLENBQUM1RCxXQUFXLENBQUNwRixNQUFNLENBQUMsQ0FBQ3lOLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEUsSUFBSXBCLDBCQUEwQixHQUFHLElBQUlyRCxLQUFLLENBQUM1RCxXQUFXLENBQUNwRixNQUFNLENBQUMsQ0FBQ3lOLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFdEUsSUFBSTVCLHlCQUF5QixFQUFFOUUsV0FBVyxFQUFFMkcsY0FBYztJQUMxRCxJQUFJQyxXQUFXLEdBQUcsSUFBSXhDLGdEQUFPLEVBQUU7SUFFL0IvRixXQUFXLENBQUNsQyxPQUFPLENBQUMsQ0FBQ0csVUFBVSxFQUFFa0YsS0FBSyxLQUFLO01BQ3ZDOztNQUVBc0QseUJBQXlCLEdBQUc3QyxLQUFLLENBQUM0RSxJQUFJLENBQ2xDO1FBQUM1TixNQUFNLEVBQUU0TCxtQkFBbUIsQ0FBQzVMO01BQU0sQ0FBQyxFQUNwQyxDQUFDd0UsS0FBSyxFQUFFK0QsS0FBSyxLQUFLQSxLQUFLLENBQzFCOztNQUVEO01BQ0FvRixXQUFXLENBQUNsSSxLQUFLLEVBQUU7O01BRW5CO01BQ0E7TUFDQTtNQUNBO01BQ0EsT0FBT29HLHlCQUF5QixDQUFDN0wsTUFBTSxFQUFFO1FBQ3JDME4sY0FBYyxHQUFHdkIsNEVBQWdDLENBQUM5SSxVQUFVLENBQUNyRCxNQUFNLEVBQUU0TCxtQkFBbUIsRUFBRUMseUJBQXlCLENBQUM7UUFDcEg7UUFDQTtRQUNBO1FBQ0EsSUFBSTZCLGNBQWMsQ0FBQzFOLE1BQU0sSUFBSSxDQUFDLEVBQUU7VUFDNUI7UUFDSjs7UUFFQTtRQUNBK0csV0FBVyxHQUFHLElBQUlvRix1REFBVyxDQUFDOUksVUFBVSxDQUFDO1FBQ3pDMEQsV0FBVyxDQUFDNUIsU0FBUyxHQUFHdUksY0FBYyxDQUFDZixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ENUYsV0FBVyxDQUFDa0QsZUFBZSxHQUFHeUQsY0FBYyxDQUFDQSxjQUFjLENBQUMxTixNQUFNLEdBQUcsQ0FBQyxDQUFDOztRQUV2RTtRQUNBMk4sV0FBVyxDQUFDekUsSUFBSSxDQUFDbkMsV0FBVyxDQUFDOztRQUU3QjtRQUNBdUYsc0JBQXNCLENBQUMvRCxLQUFLLENBQUMsRUFBRTtNQUNuQzs7TUFFQTtNQUNBLElBQ0ssQ0FBQ3NELHlCQUF5QixDQUFDN0wsTUFBTSxLQUM3QmlDLFdBQVcsSUFBSWhDLFNBQVMsSUFBTWdDLFdBQVcsQ0FBQ29KLFFBQVEsRUFBRSxJQUFJc0MsV0FBVyxDQUFDdEMsUUFBUSxFQUFHLENBQUMsRUFDdkY7UUFDRXBKLFdBQVcsR0FBRzBMLFdBQVcsQ0FBQ2xDLFFBQVEsRUFBRTtNQUN4QztJQUNKLENBQUMsQ0FBQztJQUVGLElBQUlxQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCLEVBQUVDLDhCQUE4QixFQUFFQyxRQUFRO0lBQ2hGLElBQUlDLG9CQUFvQixHQUFHLENBQUM7SUFDNUIsSUFBSUMsc0JBQXNCLEdBQUcsQ0FBQztJQUM5QixHQUFHO01BQ0M7TUFDQTtNQUNBLElBQUluQixVQUFVLEdBQUdKLGFBQWEsQ0FBQ1AsMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO01BRWxGLElBQUlVLFVBQVUsSUFBSUEsVUFBVSxHQUFJbUIsc0JBQXNCLEdBQUdELG9CQUFxQixFQUFFO1FBQzVFM04sT0FBTyxDQUFDQyxHQUFHLENBQUUsR0FBRXdNLFVBQVUsQ0FBQ3JHLE9BQU8sQ0FBQyxDQUFDLENBQUUsR0FBRSxDQUFDO1FBQ3hDdUgsb0JBQW9CLEVBQUU7TUFDMUI7TUFFQUQsUUFBUSxHQUFHLEtBQUs7O01BRWhCO01BQ0E7TUFDQTtNQUNBLElBQUs1QiwwQkFBMEIsQ0FBQytCLE1BQU0sQ0FBRTFCLEtBQUssSUFBS0EsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDMU0sTUFBTSxHQUFHLENBQUMsSUFDL0RxTSwwQkFBMEIsQ0FBQ2YsTUFBTSxDQUFDLENBQUNDLEtBQUssRUFBRUMsSUFBSSxFQUFFakQsS0FBSyxLQUFLZ0QsS0FBSyxHQUFHQyxJQUFJLEdBQUdwRyxXQUFXLENBQUNtRCxLQUFLLENBQUMsQ0FBQ3ZJLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSTRMLG1CQUFtQixDQUFDTixNQUFNLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtELEtBQUssR0FBR0MsSUFBSSxDQUFDUyxXQUFXLEVBQUUsQ0FBQyxDQUFFLEVBQ3pMO1FBQ0UrQiw4QkFBOEIsR0FBRyxDQUFDLEdBQUczQiwwQkFBMEIsQ0FBQztRQUVoRVIseUJBQXlCLEdBQUc3QyxLQUFLLENBQUM0RSxJQUFJLENBQ2xDO1VBQUM1TixNQUFNLEVBQUU0TCxtQkFBbUIsQ0FBQzVMO1FBQU0sQ0FBQyxFQUNwQyxDQUFDd0UsS0FBSyxFQUFFK0QsS0FBSyxLQUFLQSxLQUFLLENBQzFCOztRQUVEO1FBQ0FvRixXQUFXLENBQUNsSSxLQUFLLEVBQUU7UUFFbkIsR0FBRztVQUNDO1VBQ0E7VUFDQTs7VUFFQXNJLGdCQUFnQixHQUFHWCxTQUFTLENBQUNZLDhCQUE4QixFQUFFMUIsc0JBQXNCLENBQUM7VUFDcEYsSUFBSXlCLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUFFO1VBQU87VUFFeENMLGNBQWMsR0FBR3ZCLDRFQUFnQyxDQUFDL0csV0FBVyxDQUFDMkksZ0JBQWdCLENBQUMsQ0FBQy9OLE1BQU0sRUFBRTRMLG1CQUFtQixFQUFFQyx5QkFBeUIsQ0FBQzs7VUFFdkk7VUFDQTlFLFdBQVcsR0FBRyxJQUFJb0YsdURBQVcsQ0FBQy9HLFdBQVcsQ0FBQzJJLGdCQUFnQixDQUFDLENBQUM7VUFDNURoSCxXQUFXLENBQUM1QixTQUFTLEdBQUd1SSxjQUFjLENBQUNmLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDbkQ1RixXQUFXLENBQUNrRCxlQUFlLEdBQUd5RCxjQUFjLENBQUNBLGNBQWMsQ0FBQzFOLE1BQU0sR0FBRyxDQUFDLENBQUM7O1VBRXZFO1VBQ0EyTixXQUFXLENBQUN6RSxJQUFJLENBQUNuQyxXQUFXLENBQUM7UUFDakMsQ0FBQyxRQUFROEUseUJBQXlCLENBQUM3TCxNQUFNOztRQUV6QztRQUNBOztRQUVBLElBQUksQ0FBQzZMLHlCQUF5QixDQUFDN0wsTUFBTSxFQUFFO1VBQ25DO1VBQ0FpTyxRQUFRLEdBQUcsSUFBSTs7VUFFZjtVQUNBLElBQ0toTSxXQUFXLElBQUloQyxTQUFTLElBQ3BCK04sOEJBQThCLENBQUNuRSxTQUFTLENBQUU0QyxHQUFHLElBQUtBLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBTXhLLFdBQVcsQ0FBQ29KLFFBQVEsRUFBRSxJQUFJc0MsV0FBVyxDQUFDdEMsUUFBUSxFQUFJLEVBQ2hJO1lBQ0U5SyxPQUFPLENBQUNDLEdBQUcsQ0FBRSw2QkFBNEJ5QixXQUFXLENBQUNvSixRQUFRLEVBQUcsWUFBV3NDLFdBQVcsQ0FBQ3RDLFFBQVEsRUFBRyxhQUFZZ0IsMEJBQTJCLFlBQVcyQiw4QkFBK0IsRUFBQyxDQUFDO1lBQ3JML0wsV0FBVyxHQUFHMEwsV0FBVyxDQUFDbEMsUUFBUSxFQUFFO1VBQ3hDO1FBQ0o7TUFDSjtNQUVBLElBQUl3QyxRQUFRLEVBQUU7UUFDVkgsZ0JBQWdCLEdBQUdiLElBQUksQ0FBQ1osMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO01BQy9FLENBQUMsTUFBTTtRQUNId0IsZ0JBQWdCLEdBQUdYLFNBQVMsQ0FBQ2QsMEJBQTBCLEVBQUVDLHNCQUFzQixDQUFDO01BQ3BGO0lBQ0osQ0FBQyxRQUFRd0IsZ0JBQWdCLEtBQUssSUFBSTtJQUVsQ3ZOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDeUIsV0FBVyxDQUFDO0lBQ3hCb00sTUFBTSxDQUFDcE0sV0FBVyxHQUFHQSxXQUFXO0lBRWhDLE9BQU9BLFdBQVc7RUFDdEI7RUFFQSxPQUFPO0lBQ0hzRDtFQUNKLENBQUM7QUFDTCxDQUFDLEdBQUc7QUFFSixpRUFBZTNELGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUNyVmhDLE1BQU1DLFFBQVEsQ0FBQztFQUNYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSXVKLFdBQVdBLENBQUMzRCxTQUFTLEVBQUVDLEtBQUssRUFBRTFILE1BQU0sRUFBOEI7SUFBQSxJQUE1QnlHLFFBQVEsR0FBQTFHLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7SUFBQSxJQUFFNEgsSUFBSSxHQUFBNUgsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsS0FBSztJQUM1RCxJQUFJLENBQUMwSCxTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDMUgsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ3lHLFFBQVEsR0FBR0EsUUFBUTtJQUN4QixJQUFJLENBQUNrQixJQUFJLEdBQUdBLElBQUk7RUFDcEI7RUFFQSxJQUFJc0UsV0FBV0EsQ0FBQSxFQUFHO0lBQ2QsT0FBTyxJQUFJLENBQUNqTSxNQUFNLEdBQUcsSUFBSSxDQUFDMkgsSUFBSTtFQUNsQztBQUNKO0FBRUEsaUVBQWU5RixRQUFROzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJjO0FBQ0k7QUFFekMsTUFBTXNLLFdBQVcsQ0FBQztFQUNkZixXQUFXQSxDQUFDL0gsVUFBVSxFQUFFO0lBQ3BCLElBQUksQ0FBQ0EsVUFBVSxHQUFHQSxVQUFVO0lBRTVCLElBQUksQ0FBQzhCLFNBQVMsR0FBRyxFQUFFO0lBQ25CLElBQUksQ0FBQzhFLGVBQWUsR0FBRyxDQUFDO0VBQzVCO0VBRUFxRSxRQUFRQSxDQUFBLEVBQUc7SUFDUC9OLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLFdBQVUsSUFBSSxDQUFDMkUsU0FBVSxlQUFjLElBQUksQ0FBQzhFLGVBQWdCLEVBQUMsQ0FBQztFQUMvRTs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJLE9BQU9zRSxpQkFBaUJBLENBQUNsTCxVQUFVLEVBQUV1SSxtQkFBbUIsRUFBRUMseUJBQXlCLEVBQUU7SUFDakYsTUFBTTZCLGNBQWMsR0FBR3ZCLFdBQVcsQ0FBQzBCLG9CQUFvQixDQUNuRHhLLFVBQVUsQ0FBQ3JELE1BQU0sRUFDakI0TCxtQkFBbUIsRUFDbkJDLHlCQUF5QixDQUM1Qjs7SUFFRDtJQUNBO0lBQ0EsSUFBSTZCLGNBQWMsQ0FBQzFOLE1BQU0sSUFBSSxDQUFDLEVBQUU7TUFDNUIsT0FBTyxJQUFJO0lBQ2Y7O0lBRUE7SUFDQSxNQUFNK0csV0FBVyxHQUFHLElBQUlvRixXQUFXLENBQUM5SSxVQUFVLENBQUM7SUFDL0MwRCxXQUFXLENBQUM1QixTQUFTLEdBQUd1SSxjQUFjLENBQUNmLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQ1RixXQUFXLENBQUNrRCxlQUFlLEdBQUd5RCxjQUFjLENBQUNBLGNBQWMsQ0FBQzFOLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFdkUsT0FBTytHLFdBQVc7RUFDdEI7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJLE9BQU84RyxvQkFBb0JBLENBQUM1RCxlQUFlLEVBQUUyQixtQkFBbUIsRUFBRUMseUJBQXlCLEVBQWtCO0lBQUEsSUFBaEJDLFVBQVUsR0FBQS9MLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7SUFDdkc7SUFDQSxJQUFJLENBQUM4TCx5QkFBeUIsQ0FBQzdMLE1BQU0sRUFBRTtNQUNuQyxPQUFPLENBQUVpSyxlQUFlLENBQUU7SUFDOUI7SUFFQSxJQUFJOEIscUJBQXFCO0lBQ3pCLEtBQUssSUFBSUMsQ0FBQyxHQUFHRixVQUFVLEVBQUVFLENBQUMsR0FBR0gseUJBQXlCLENBQUM3TCxNQUFNLEVBQUVnTSxDQUFDLEVBQUUsRUFBRTtNQUdoRTtNQUNBLElBQUlKLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsQ0FBQ2hNLE1BQU0sSUFBSWlLLGVBQWUsRUFBRTtRQUM3RTtRQUNBO1FBQ0E0Qix5QkFBeUIsQ0FBQ3BDLE1BQU0sQ0FBQ3VDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEMsT0FBTyxDQUFFSixtQkFBbUIsQ0FBQ0MseUJBQXlCLENBQUNHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFO01BQ25FOztNQUVBO01BQ0EsSUFBS0QscUJBQXFCLElBQUk5TCxTQUFTLElBQy9CMkwsbUJBQW1CLENBQUNDLHlCQUF5QixDQUFDRyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEdBQUdoQyxlQUFnQixFQUN0RjtRQUNFOEIscUJBQXFCLEdBQUdDLENBQUM7TUFDN0I7SUFDSjs7SUFFQTtJQUNBO0lBQ0EsSUFBSUQscUJBQXFCLElBQUk5TCxTQUFTLEVBQUU7TUFDcEMsT0FBTyxDQUFFZ0ssZUFBZSxDQUFFO0lBQzlCOztJQUVBO0lBQ0E7SUFDQSxNQUFNaUMsZ0JBQWdCLEdBQUdOLG1CQUFtQixDQUFDQyx5QkFBeUIsQ0FBQ3BDLE1BQU0sQ0FBQ3NDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhHLE9BQU8sQ0FDSEcsZ0JBQWdCLEVBQ2hCLEdBQUdDLFdBQVcsQ0FBQzBCLG9CQUFvQixDQUMvQjVELGVBQWUsR0FBR2lDLGdCQUFnQixDQUFDRCxXQUFXLEVBQzlDTCxtQkFBbUIsRUFDbkJDLHlCQUF5QixFQUN6QkUscUJBQXFCLENBQ3hCLENBQ0o7RUFDTDtBQUNKO0FBRUEsaUVBQWVJLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwR25CLE1BQU1wSyxZQUFZLENBQUM7RUFDdEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJcUosV0FBV0EsQ0FBQzNELFNBQVMsRUFBRUMsS0FBSyxFQUFFO0lBQzFCLElBQUksQ0FBQ0QsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0VBQ3RCO0FBQ0o7QUFFTyxNQUFNNUYsVUFBVSxDQUFDO0VBQ3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lzSixXQUFXQSxDQUFDM0QsU0FBUyxFQUFFQyxLQUFLLEVBQUUxSCxNQUFNLEVBQUUwSyxLQUFLLEVBQUU7SUFDekMsSUFBSSxDQUFDakQsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCO0lBQ0EsSUFBSSxDQUFDMUgsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQzBLLEtBQUssR0FBR0EsS0FBSztFQUN0QjtBQUNKO0FBRUEsaUVBQWU1SSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0J6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTbkMsYUFBYUEsQ0FBQzZPLElBQUksRUFBMkI7RUFBQSxJQUF6QkMsS0FBSyxHQUFBMU8sU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsQ0FBQyxDQUFDO0VBQzFDLE1BQU1LLE9BQU8sR0FBR3VDLFFBQVEsQ0FBQ2hELGFBQWEsQ0FBQzZPLElBQUksQ0FBQzs7RUFFNUM7RUFDQSxLQUFLLE1BQU0sQ0FBQ0UsR0FBRyxFQUFFbEssS0FBSyxDQUFDLElBQUkrQixNQUFNLENBQUNDLE9BQU8sQ0FBQ2lJLEtBQUssQ0FBQyxFQUFFO0lBQzlDck8sT0FBTyxDQUFDdU8sWUFBWSxDQUFDRCxHQUFHLEVBQUVsSyxLQUFLLENBQUM7RUFDcEM7O0VBRUE7RUFBQSxTQUFBc0UsSUFBQSxHQUFBL0ksU0FBQSxDQUFBQyxNQUFBLEVBUitDNE8sUUFBUSxPQUFBNUYsS0FBQSxDQUFBRixJQUFBLE9BQUFBLElBQUEsV0FBQUcsSUFBQSxNQUFBQSxJQUFBLEdBQUFILElBQUEsRUFBQUcsSUFBQTtJQUFSMkYsUUFBUSxDQUFBM0YsSUFBQSxRQUFBbEosU0FBQSxDQUFBa0osSUFBQTtFQUFBO0VBU3ZEMkYsUUFBUSxDQUFDMUwsT0FBTyxDQUFDMkwsS0FBSyxJQUFJek8sT0FBTyxDQUFDNEcsTUFBTSxDQUFDNkgsS0FBSyxDQUFDLENBQUM7RUFFaEQsT0FBT3pPLE9BQU87QUFDbEI7QUFFTyxTQUFTMkgsa0JBQWtCQSxDQUFDTSxZQUFZLEVBQUU7RUFDN0MsTUFBTXlHLFNBQVMsR0FBRzFLLE1BQU0sQ0FBQ2lFLFlBQVksQ0FBQzdELEtBQUssQ0FBQztFQUU1QyxJQUFJdUssS0FBSyxDQUFDRCxTQUFTLENBQUMsRUFBRTtJQUNsQnpHLFlBQVksQ0FBQzJHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO0VBQ3ZELENBQUMsTUFBTSxJQUFJRixTQUFTLElBQUksQ0FBQyxFQUFFO0lBQ3ZCekcsWUFBWSxDQUFDMkcsaUJBQWlCLENBQUMsNEJBQTRCLENBQUM7RUFDaEUsQ0FBQyxNQUFNO0lBQ0gzRyxZQUFZLENBQUMyRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7RUFDdEM7RUFFQTNHLFlBQVksQ0FBQzRHLGNBQWMsRUFBRTtBQUNqQztBQUVPLFNBQVN0RSxpQkFBaUJBLENBQUN0QyxZQUFZLEVBQUU7RUFDNUMsTUFBTXlHLFNBQVMsR0FBRzFLLE1BQU0sQ0FBQ2lFLFlBQVksQ0FBQzdELEtBQUssQ0FBQztFQUU1QyxJQUFJdUssS0FBSyxDQUFDRCxTQUFTLENBQUMsRUFBRTtJQUNsQnpHLFlBQVksQ0FBQzJHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO0VBQ3ZELENBQUMsTUFBTSxJQUFJRixTQUFTLEdBQUcsQ0FBQyxFQUFFO0lBQ3RCekcsWUFBWSxDQUFDMkcsaUJBQWlCLENBQUMsd0NBQXdDLENBQUM7RUFDNUUsQ0FBQyxNQUFNO0lBQ0gzRyxZQUFZLENBQUMyRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7RUFDdEM7RUFFQTNHLFlBQVksQ0FBQzRHLGNBQWMsRUFBRTtBQUNqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpcEJBQWlwQixjQUFjLGVBQWUsY0FBYyxvQkFBb0Isa0JBQWtCLCtCQUErQixpSkFBaUoscUJBQXFCLFVBQVUscUJBQXFCLFlBQVksdUJBQXVCLG1CQUFtQixtQkFBbUIsNkRBQTZELGdCQUFnQixvQkFBb0IsV0FBVyw4QkFBOEIsd0JBQXdCLFNBQVMsZ0dBQWdHLEtBQUssaUJBQWlCLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxrQkFBa0IsWUFBWSxNQUFNLGdCQUFnQixLQUFLLGdCQUFnQixLQUFLLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsZ0JBQWdCLEtBQUssWUFBWSw2cUJBQTZxQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixzQkFBc0Isb0JBQW9CLCtCQUErQixLQUFLLHNKQUFzSixxQkFBcUIsS0FBSyxVQUFVLHFCQUFxQixLQUFLLFlBQVksdUJBQXVCLEtBQUssbUJBQW1CLG1CQUFtQixLQUFLLCtEQUErRCxrQkFBa0Isb0JBQW9CLEtBQUssV0FBVyxnQ0FBZ0Msd0JBQXdCLEtBQUssdUJBQXVCO0FBQ3J5RjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Ysb0hBQW9IO0FBQ3BIO0FBQ0EsaURBQWlELGtDQUFrQyxrQ0FBa0MscUJBQXFCLHdCQUF3Qiw2QkFBNkIsOEJBQThCLHFCQUFxQixpQkFBaUIsc0JBQXNCLG9CQUFvQixVQUFVLHFCQUFxQiwyQkFBMkIsb0NBQW9DLGlEQUFpRCw0QkFBNEIsMEJBQTBCLFVBQVUsc0JBQXNCLDZJQUE2SSxzQkFBc0Isa0JBQWtCLDJDQUEyQyxzQ0FBc0MsaUZBQWlGLDRCQUE0QixzQkFBc0IsWUFBWSx3QkFBd0IsVUFBVSxvQkFBb0Isa0JBQWtCLGVBQWUsWUFBWSxzQkFBc0Isc0JBQXNCLGtCQUFrQiwwQkFBMEIsMkRBQTJELGtCQUFrQiw4QkFBOEIsZ0NBQWdDLGtCQUFrQiwwQkFBMEIsMEJBQTBCLG1CQUFtQixrQkFBa0IsMkJBQTJCLCtDQUErQyx1QkFBdUIsK0JBQStCLHVEQUF1RCxXQUFXLG9CQUFvQixzQkFBc0IsNEJBQTRCLG9EQUFvRCxvQkFBb0IsWUFBWSxvQkFBb0IsZUFBZSxZQUFZLFdBQVcsZ0JBQWdCLGlCQUFpQixtQkFBbUIsNEJBQTRCLHlDQUF5QyxrQkFBa0Isd0JBQXdCLDRCQUE0QixvQkFBb0IsOEJBQThCLGtCQUFrQiwyQkFBMkIsZUFBZSxnQkFBZ0Isa0JBQWtCLDRCQUE0QixrQ0FBa0MseURBQXlELGtCQUFrQiwyQkFBMkIsZUFBZSwrQkFBK0IsaURBQWlELG9DQUFvQyxrQkFBa0IsMENBQTBDLHFCQUFxQiwwQkFBMEIsMEJBQTBCLHFEQUFxRCxzQkFBc0IsMkNBQTJDLGtCQUFrQiw4QkFBOEIsNEhBQTRILGtCQUFrQiwwQ0FBMEMscUJBQXFCLDBCQUEwQiwwQkFBMEIsK0ZBQStGLGdDQUFnQyxpR0FBaUcsZ0NBQWdDLGdCQUFnQix5QkFBeUIsUUFBUSx1QkFBdUIsUUFBUSx1QkFBdUIsUUFBUSx1QkFBdUIsV0FBVyx3QkFBd0IsZ0JBQWdCLDhCQUE4QiwrQ0FBK0MseUJBQXlCLG1DQUFtQyxrQ0FBa0Msb0NBQW9DLGtDQUFrQyx3QkFBd0IsMkJBQTJCLG1EQUFtRCxnQ0FBZ0MscUJBQXFCLCtDQUErQywwQkFBMEIsc0JBQXNCLDRDQUE0QywyQ0FBMkMsd0NBQXdDLDhDQUE4QyxpREFBaUQsU0FBUyx5RkFBeUYsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsZ0JBQWdCLEtBQUssWUFBWSxhQUFhLGFBQWEsbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsbUJBQW1CLFFBQVEsZ0JBQWdCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxVQUFVLGdCQUFnQixLQUFLLFlBQVksYUFBYSxXQUFXLGtCQUFrQixPQUFPLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLFVBQVUsWUFBWSxhQUFhLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxtQkFBbUIsTUFBTSxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLG1CQUFtQixPQUFPLFVBQVUsWUFBWSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxXQUFXLFlBQVksYUFBYSxhQUFhLGtCQUFrQixPQUFPLGdCQUFnQixNQUFNLFVBQVUsa0JBQWtCLFFBQVEsV0FBVyxZQUFZLGFBQWEsYUFBYSxtQkFBbUIsUUFBUSxrQkFBa0IsT0FBTyxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxZQUFZLFdBQVcsWUFBWSxhQUFhLGtCQUFrQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGFBQWEsbUJBQW1CLE1BQU0sWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLE1BQU0sWUFBWSxrQkFBa0IsTUFBTSxpSEFBaUgsdUNBQXVDLHNCQUFzQixzREFBc0QseUJBQXlCLDhCQUE4Qiw0QkFBNEIsS0FBSyxlQUFlLHNDQUFzQyxzQ0FBc0MsNkJBQTZCLDRCQUE0QixxQ0FBcUMsa0NBQWtDLDZCQUE2QixxQkFBcUIsMEJBQTBCLHNCQUFzQixLQUFLLGNBQWMsMEJBQTBCLDZDQUE2Qyw0Q0FBNEMsbURBQW1ELEtBQUssZ0NBQWdDLDRCQUE0QixLQUFLLGNBQWMsMEJBQTBCLGlKQUFpSiwwQkFBMEIsMEJBQTBCLCtDQUErQywwQ0FBMEMsaUhBQWlILEtBQUssc0NBQXNDLHdCQUF3QixLQUFLLGlDQUFpQywwQkFBMEIsS0FBSyxxQ0FBcUMsd0JBQXdCLHNCQUFzQixpQkFBaUIsS0FBSyxpQ0FBaUMsMEJBQTBCLDBCQUEwQixzQkFBc0IsNEJBQTRCLEtBQUssc0ZBQXNGLHNCQUFzQixnQ0FBZ0MsS0FBSyxvQ0FBb0Msc0JBQXNCLDhCQUE4Qiw0QkFBNEIsS0FBSyxnREFBZ0Qsc0JBQXNCLCtCQUErQixtREFBbUQseUJBQXlCLDJCQUEyQiwyREFBMkQsU0FBUyxLQUFLLGVBQWUsc0JBQXNCLEtBQUssMEJBQTBCLDhCQUE4QiwwQkFBMEIsd0JBQXdCLFNBQVMsS0FBSyxnQkFBZ0IseUJBQXlCLDZDQUE2QyxvQ0FBb0MsNkJBQTZCLGVBQWUscUJBQXFCLG1DQUFtQyxzQ0FBc0Msa0VBQWtFLCtEQUErRCx3REFBd0QsNEJBQTRCLDhCQUE4QixLQUFLLHdCQUF3QixrQ0FBa0MsNEJBQTRCLHNEQUFzRCwrQkFBK0Isb0JBQW9CLHNFQUFzRSxxQ0FBcUMsZ0NBQWdDLG9DQUFvQyxLQUFLLCtEQUErRCxzQkFBc0IsK0JBQStCLGlCQUFpQixLQUFLLHNDQUFzQyxtREFBbUQseUJBQXlCLEtBQUsscUJBQXFCLHNEQUFzRCwwQkFBMEIsZ0NBQWdDLDhCQUE4QixrQ0FBa0MsOEJBQThCLGFBQWEsU0FBUyx1Q0FBdUMsMEJBQTBCLG9DQUFvQyxTQUFTLEtBQUsscUJBQXFCLHNEQUFzRCw2R0FBNkcsOEJBQThCLFNBQVMsS0FBSywwQkFBMEIsdUVBQXVFLDhDQUE4QyxTQUFTLDZFQUE2RSw4Q0FBOEMsU0FBUyxLQUFLLG1DQUFtQywyQkFBMkIsS0FBSyxZQUFZLHlCQUF5QixLQUFLLFlBQVkseUJBQXlCLDJCQUEyQixLQUFLLFlBQVkseUJBQXlCLHdCQUF3QixLQUFLLGVBQWUsNEJBQTRCLG9CQUFvQixrQ0FBa0MsbURBQW1ELDJCQUEyQixtQkFBbUIsK0JBQStCLGtEQUFrRCxhQUFhLG9DQUFvQyxrREFBa0QsYUFBYSxTQUFTLG9CQUFvQixpQ0FBaUMsdURBQXVELFNBQVMsS0FBSyxvQ0FBb0MseUJBQXlCLG1EQUFtRCw4QkFBOEIsd0JBQXdCLHFCQUFxQiw0REFBNEQsNENBQTRDLFNBQVMsc0JBQXNCLDZEQUE2RCxTQUFTLEtBQUssdUJBQXVCO0FBQ3ZxVztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1IxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBd0o7QUFDeEo7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxrSUFBTzs7OztBQUlrRztBQUMxSCxPQUFPLGlFQUFlLGtJQUFPLElBQUkseUlBQWMsR0FBRyx5SUFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFtSjtBQUNuSjtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDZIQUFPOzs7O0FBSTZGO0FBQ3JILE9BQU8saUVBQWUsNkhBQU8sSUFBSSxvSUFBYyxHQUFHLG9JQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQztBQUNMO0FBQzRCO0FBQ2xCO0FBQ29CO0FBQ3BCO0FBQytDO0FBRXZGLENBQUMsTUFBTTtFQUNILFNBQVNDLG1DQUFtQ0EsQ0FBQy9KLFNBQVMsRUFBRWdLLGtCQUFrQixFQUFFO0lBQ3hFO0lBQ0FoSyxTQUFTLENBQUNrSSxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLEtBQUtBLENBQUMsQ0FBQ3ZOLE1BQU0sR0FBR3NOLENBQUMsQ0FBQ3ROLE1BQU0sQ0FBQzs7SUFFNUM7SUFDQTtJQUNBO0lBQ0EsSUFBSTRMLG1CQUFtQixHQUFHekcsU0FBUyxDQUFDcUksT0FBTyxDQUFFckssUUFBUSxJQUFLO01BQ3RELE9BQU8sSUFBSTZGLEtBQUssQ0FBQzdGLFFBQVEsQ0FBQ3NELFFBQVEsQ0FBQyxDQUM5QmdILElBQUksQ0FBQ3RLLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUM7O0lBRUY7SUFDQTtJQUNBO0lBQ0EsSUFBSTBJLHlCQUF5QixHQUFHN0MsS0FBSyxDQUFDNEUsSUFBSSxDQUN0QztNQUFDNU4sTUFBTSxFQUFFNEwsbUJBQW1CLENBQUM1TDtJQUFNLENBQUMsRUFDcEMsQ0FBQ3dFLEtBQUssRUFBRStELEtBQUssS0FBS0EsS0FBSyxDQUMxQjtJQUVELElBQUk2RyxlQUFlLEVBQUVDLDZCQUE2QixFQUFFQyxPQUFPO0lBQzNELElBQUlDLFlBQVksR0FBRyxFQUFFO0lBRXJCLE9BQU8xRCx5QkFBeUIsQ0FBQzdMLE1BQU0sRUFBRTtNQUNyQ3NQLE9BQU8sR0FBRztRQUNOdkksV0FBVyxFQUFFOUcsU0FBUztRQUN0QjRMLHlCQUF5QixFQUFFNUw7TUFDL0IsQ0FBQztNQUVEa1Asa0JBQWtCLENBQUNqTSxPQUFPLENBQUVsRCxNQUFNLElBQUs7UUFDbkNxUCw2QkFBNkIsR0FBRyxDQUFFLEdBQUd4RCx5QkFBeUIsQ0FBRTtRQUVoRXVELGVBQWUsR0FBRzVKLDhEQUFrQixDQUFDeEYsTUFBTSxFQUFFNEwsbUJBQW1CLEVBQUV5RCw2QkFBNkIsQ0FBQztRQUVoRyxJQUFLQyxPQUFPLENBQUN2SSxXQUFXLElBQUk5RyxTQUFTLElBQzdCcVAsT0FBTyxDQUFDdkksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdxSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFDcEQ7VUFDRUUsT0FBTyxDQUFDdkksV0FBVyxHQUFHcUksZUFBZTtVQUNyQ0UsT0FBTyxDQUFDekQseUJBQXlCLEdBQUcsQ0FBQyxHQUFHd0QsNkJBQTZCLENBQUM7UUFDMUU7TUFDSixDQUFDLENBQUM7TUFFRkUsWUFBWSxDQUFDckcsSUFBSSxDQUFDb0csT0FBTyxDQUFDdkksV0FBVyxDQUFDO01BQ3RDOEUseUJBQXlCLEdBQUcsQ0FBRSxHQUFHeUQsT0FBTyxDQUFDekQseUJBQXlCLENBQUU7SUFDeEU7SUFDQXRMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDK08sWUFBWSxDQUFDOztJQUV6Qjs7SUFFQTs7SUFFQTs7SUFFQTtJQUNBOztJQUVBOztJQUVBO0VBQ0o7O0VBRUE7O0VBRUFoUCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFFNUIsSUFBSTJFLFNBQVMsR0FBRyxDQUNaLElBQUl0RCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUM3QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUM3QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUNoQztFQUVELE1BQU0yTixlQUFlLEdBQUcsSUFBSXpOLDJEQUFZLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztFQUM3QyxJQUFJcUQsV0FBVyxHQUFHLENBQ2QsSUFBSXRELHlEQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQzdCLElBQUlBLHlEQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQzdCLElBQUlBLHlEQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQzlCLElBQUlBLHlEQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQ2pDO0VBRURGLG1GQUFvQyxDQUFDdUQsU0FBUyxFQUFFQyxXQUFXLENBQUM7O0VBRTVEOztFQUVBN0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDO0VBRTVCMkUsU0FBUyxHQUFHLENBQ1IsSUFBSXRELHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDOUIsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUMvQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUM5QjtFQUVELE1BQU00TixlQUFlLEdBQUcsSUFBSTFOLDJEQUFZLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztFQUM3Q3FELFdBQVcsR0FBRyxDQUNWLElBQUl0RCx5REFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUMvQixJQUFJQSx5REFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUMvQixJQUFJQSx5REFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUNoQyxJQUFJQSx5REFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUNuQztFQUVERixtRkFBb0MsQ0FBQ3VELFNBQVMsRUFBRUMsV0FBVyxDQUFDO0VBRTVEcEQseUZBQStCLENBQUNtRCxTQUFTLEVBQUVDLFdBQVcsQ0FBQztFQUN2RGlKLE1BQU0sQ0FBQ3JNLDBCQUEwQixHQUFHQSxvRkFBMEI7O0VBRTlEOztFQUVBekIsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7RUFFL0I0RSxXQUFXLEdBQUcsQ0FDVixJQUFJdEQseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDN0IsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDN0IsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDOUIsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDakM7RUFDRHFELFNBQVMsR0FBRyxDQUNSLElBQUl0RCx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzdCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQzVCO0VBRURELG1GQUFvQyxDQUFDdUQsU0FBUyxFQUFFQyxXQUFXLENBQUM7O0VBRTVEOztFQUVBN0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7RUFFOUI0RSxXQUFXLEdBQUcsQ0FDVixJQUFJdEQseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDN0IsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFDN0IsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDOUIsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDOUIsSUFBSUEseURBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQ25DO0VBQ0RxRCxTQUFTLEdBQUcsQ0FDUixJQUFJdEQsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUMvQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUM1QixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUMxQixJQUFJQSx1REFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUF3TSxNQUFNLENBQUN6TSxpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2NvbmZpcm1Nb2RhbENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0U2VxdWVuY2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRMaXN0LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdENhbGN1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dFNlcXVlbmNlLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvdW5jdXRQaWVjZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzP2IzMGYiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3M/MjAzYiIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbmZpcm1Nb2RhbENvbXBvbmVudChoYW5kbGVBY2NlcHQsIHF1ZXN0aW9uVGV4dCA9ICdBcmUgeW91IHN1cmU/JywgYWNjZXB0VGV4dCA9ICdZZXMnLCByZWplY3RUZXh0ID0gJ05vJykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUFjY2VwdENsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNb2RhbCBBY2NlcHQgQ2xpY2snKTtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIGhhbmRsZUFjY2VwdChlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVqZWN0Q2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIFJlamVjdCBDbGljaycpO1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ21vZGFsJ30pO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVqZWN0Q2xpY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhY2NlcHRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgYWNjZXB0VGV4dCk7XHJcbiAgICAgICAgY29uc3QgcmVqZWN0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sIHJlamVjdFRleHQpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgYWNjZXB0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQWNjZXB0Q2xpY2spO1xyXG4gICAgICAgIHJlamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVJlamVjdENsaWNrKTtcclxuXHJcbiAgICAgICAgLy8gTW9kYWwgQ29udGVudFxyXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdtb2RhbC1jb250ZW50J30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdwJywge30sIHF1ZXN0aW9uVGV4dCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnbW9kYWwtY29udGVudC1idG4tY29udGFpbmVyJ30sXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRCdG4sXHJcbiAgICAgICAgICAgICAgICByZWplY3RCdG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBQcmV2ZW50cyBjbGljayBsaXN0ZW5lciBvbiBtb2RhbCBjb250YWluZXIgZWxlbWVudCBmcm9tIGFjdGl2YXRpbmcgdGhhdCBjbG9zZXMgbW9kYWxcclxuICAgICAgICAvLyB3aGVuZXZlciB1c2VyIGNsaWNrcyBpbnNpZGUgbW9kYWwgY29udGVudCBlbGVtZW50IGluc3RlYWQuXHJcbiAgICAgICAgbW9kYWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCBGb290ZXIgZnJvbSBcIi4vZm9vdGVyLmpzXCI7XHJcblxyXG5pbXBvcnQgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IGZyb20gXCIuL2N1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanNcIjtcclxuXHJcbmltcG9ydCBDdXRQaWVjZUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2VMaXN0Q29tcG9uZW50IGZyb20gXCIuL2N1dFBpZWNlTGlzdENvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUNvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlQ29tcG9uZW50LmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlTGlzdENvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgQ3V0TGlzdENvbXBvbmVudCBmcm9tIFwiLi9jdXRMaXN0Q29tcG9uZW50LmpzXCI7XHJcblxyXG5pbXBvcnQgY3V0TGlzdENhbGN1bGF0b3IgZnJvbSBcIi4uL2N1dExpc3RDYWxjdWxhdG9yLmpzXCI7XHJcbmltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi4vY3V0UGllY2UuanNcIjtcclxuaW1wb3J0IHtVbmN1dFBpZWNlLCBDcm9zc1NlY3Rpb259IGZyb20gXCIuLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsQ29tcG9uZW50IGZyb20gXCIuL2NvbmZpcm1Nb2RhbENvbXBvbmVudC5qc1wiO1xyXG5cclxuY29uc3QgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGJlc3RDdXRMaXN0O1xyXG5cclxuICAgIGxldCBjdXRQaWVjZUxpc3RDb21wb25lbnQ7XHJcbiAgICBsZXQgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQ7XHJcbiAgICBsZXQgY3V0TGlzdENvbXBvbmVudDtcclxuICAgIGxldCBjdXRMaXN0RXJyb3JFbGVtZW50O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoaW5pdEN1dFBpZWNlcyA9IFtdLCBpbml0VW5jdXRQaWVjZXMgPSBbXSwgaW5pdEJlc3RDdXRMaXN0ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYmVzdEN1dExpc3QgPSBpbml0QmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcclxuICAgICAgICBpZiAobWFpbkVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVzY3JpcHRpb25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdwJywge30sIFxyXG4gICAgICAgICAgICAnRGltZW5zaW9uYWwgbHVtYmVyIGNvbWVzIGluIHByZS1kZXRlcm1pbmVkIGxlbmd0aHMgd2l0aCB0aGVpciBvd24gaW5kaXZpZHVhbCBwcmljZXMgKFVuY3V0IFBpZWNlcykuIEdpdmVuIHRoZSBjdXQgbGVuZ3RocyBvZiBkaW1lbnNpb25hbCBsdW1iZXIgcmVxdWlyZWQgZm9yIHlvdXIgcHJvamVjdCAoQ3V0IFBpZWNlcykgYW5kIHRoZSBhdmFpbGFibGUgcHJlLWRldGVybWluZWQgbGVuZ3RocywgdGhpcyBhcHAgY2FsY3VsYXRlcyB0aGUgY2hlYXBlc3QgYW1vdW50IG9mIGx1bWJlciBuZWVkZWQgYW5kIHByb3ZpZGVzIHRoZSBjdXQgc2VxdWVuY2UgZm9yIGVhY2ggdW5jdXQgcGllY2UuJ1xyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgY3V0L3VuY3V0IHBpZWNlcyBsaXN0IHdpdGggY3JlYXRlIGZvcm0gYWZ0ZXJcclxuXHJcbiAgICAgICAgLy8gQ3V0IFBpZWNlcyAtIEhlYWRlclxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gyJywge30sICdDdXQgUGllY2VzOicpKTtcclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gQ2xlYXIgQnV0dG9uXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY2xlYXItYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsnY2xhc3MnOiAnY2xlYXItYnRuJ30sICdDbGVhciBBbGwgQ3V0IFBpZWNlcycpXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUN1dFBpZWNlTGlzdENsZWFyKTtcclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gTGlzdFxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudCA9IEN1dFBpZWNlTGlzdENvbXBvbmVudCgpO1xyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgLy8gQ3V0IFBpZWNlcyAtIENyZWF0ZSBGb3JtXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVDdXRQaWVjZUFkZEZvcm1TdWJtaXQpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gSGVhZGVyXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDInLCB7fSwgJ1VuY3V0IFBpZWNlczonKSk7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gQ2xlYXIgQnV0dG9uXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY2xlYXItYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsnY2xhc3MnOiAnY2xlYXItYnRuJ30sICdDbGVhciBBbGwgVW5jdXQgUGllY2VzJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhcik7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gTGlzdFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gVW5jdXRQaWVjZUxpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGFueSBjdXQvdW5jdXQgcGllY2VzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgaW5pdEN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSkgPT4gYWRkQ3V0UGllY2UoY3V0UGllY2UpKTtcclxuICAgICAgICBpbml0VW5jdXRQaWVjZXMuZm9yRWFjaCgodW5jdXRQaWVjZSkgPT4gYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBidXR0b24gdGhhdCBjcmVhdGVzIGN1dCBsaXN0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBjb25zdCBjcmVhdGVDdXRMaXN0QnRuID0gbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1idG4nfSwgJ0NyZWF0ZSBDdXQgTGlzdCcpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjcmVhdGVDdXRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGVycm9yIG1lc3NhZ2UgZm9yIGN1dCBsaXN0IGNhbGN1bGF0b3IgYnV0dG9uXHJcbiAgICAgICAgY3V0TGlzdEVycm9yRWxlbWVudCA9IG1haW5FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1lcnJvci1tc2cnLCAnY2xhc3MnOiAnaGlkZSd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYWxjdWxhdGVkIGN1dCBsaXN0XHJcbiAgICAgICAgY3V0TGlzdENvbXBvbmVudCA9IEN1dExpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjdXRMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGZvb3RlciBjb21wb25lbnQsIHBhc3NpbmcgaW4gdGhlIGZpcnN0IHllYXIgb2YgdGhlIGFwcFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoRm9vdGVyKDIwMjMpLnJlbmRlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXRQaWVjZShjdXRQaWVjZSkge1xyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRDdXRQaWVjZUNvbXBvbmVudChcclxuICAgICAgICAgICAgQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UsIGhhbmRsZUN1dFBpZWNlRWRpdENsaWNrLCBoYW5kbGVDdXRQaWVjZURlbGV0ZUNsaWNrKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpIHtcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5hZGRVbmN1dFBpZWNlQ29tcG9uZW50KFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlQ29tcG9uZW50KHVuY3V0UGllY2UsIGhhbmRsZVVuY3V0UGllY2VFZGl0Q2xpY2ssIGhhbmRsZVVuY3V0UGllY2VEZWxldGVDbGljaylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDdXRQaWVjZShjdXRQaWVjZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbW92ZUN1dFBpZWNlKGN1dFBpZWNlVG9SZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVVuY3V0UGllY2UodW5jdXRQaWVjZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RDb21wb25lbnQucmVtb3ZlVW5jdXRQaWVjZSh1bmN1dFBpZWNlVG9SZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgQ3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IGN1dFBpZWNlID0gbmV3IEN1dFBpZWNlKFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3F1YW50aXR5JykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdrZXJmJykudmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRDdXRQaWVjZShjdXRQaWVjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIFVuY3V0UGllY2UgZnJvbSBmb3JtIGlucHV0c1xyXG4gICAgICAgIGNvbnN0IHVuY3V0UGllY2UgPSBuZXcgVW5jdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLCBcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRVbmN1dFBpZWNlKHVuY3V0UGllY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlRWRpdENsaWNrKGUsIG9sZEN1dFBpZWNlKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IEN1dFBpZWNlIGZyb20gZm9ybSBpbnB1dCB2YWx1ZXNcclxuICAgICAgICBjb25zdCBuZXdDdXRQaWVjZSA9IG5ldyBDdXRQaWVjZShcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgndGhpY2tuZXNzJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd3aWR0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdxdWFudGl0eScpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgna2VyZicpLnZhbHVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCBuZXcgQ3V0UGllY2UgaXMgbm90IGEgZHVwbGljYXRlIHRoaWNrbmVzcyB4IHdpZHRoIHggbGVuZ3RoIGNvbWJvXHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LmdldFBpZWNlcygpLmZvckVhY2goKGN1dFBpZWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXRQaWVjZSAhPT0gb2xkQ3V0UGllY2UgJiYgY3V0UGllY2UgPT09IG5ld0N1dFBpZWNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgbmV3IEN1dFBpZWNlIGlzIHZhbGlkXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZUVkaXRDbGljayhlLCBvbGRVbmN1dFBpZWNlKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFVuY3V0UGllY2UgZnJvbSBmb3JtIGlucHV0IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IG5ld1VuY3V0UGllY2UgPSBuZXcgQ3V0UGllY2UoXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3RoaWNrbmVzcycpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncHJpY2UnKS52YWx1ZSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayB0aGF0IG5ldyBVbmN1dFBpZWNlIGlzIG5vdCBhIGR1cGxpY2F0ZSB0aGlja25lc3MgeCB3aWR0aCB4IGxlbmd0aCBjb21ib1xyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmdldFBpZWNlcygpLmZvckVhY2goKHVuY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHVuY3V0UGllY2UgIT09IG9sZFVuY3V0UGllY2UgJiYgdW5jdXRQaWVjZSA9PT0gbmV3VW5jdXRQaWVjZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIG5ldyBDdXRQaWVjZSBpcyB2YWxpZFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlRGVsZXRlQ2xpY2soY3V0UGllY2VUb0RlbGV0ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChcclxuICAgICAgICAgICAgQ29uZmlybU1vZGFsQ29tcG9uZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUN1dFBpZWNlRGVsZXRlQ29uZmlybShjdXRQaWVjZVRvRGVsZXRlKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgY3V0IHBpZWNlPydcclxuICAgICAgICAgICAgKS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3V0UGllY2VEZWxldGVDb25maXJtKGN1dFBpZWNlVG9EZWxldGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlIGN1dCBwaWVjZSAnICsgY3V0UGllY2VUb0RlbGV0ZSk7XHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2UoY3V0UGllY2VUb0RlbGV0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNsaWNrKHVuY3V0UGllY2VUb0RlbGV0ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChcclxuICAgICAgICAgICAgQ29uZmlybU1vZGFsQ29tcG9uZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVVuY3V0UGllY2VEZWxldGVDb25maXJtKHVuY3V0UGllY2VUb0RlbGV0ZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVuY3V0IHBpZWNlPydcclxuICAgICAgICAgICAgKS5yZW5kZXIoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNvbmZpcm0odW5jdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSB1bmN1dCBwaWVjZSAnICsgdW5jdXRQaWVjZVRvRGVsZXRlKTtcclxuICAgICAgICByZW1vdmVVbmN1dFBpZWNlKHVuY3V0UGllY2VUb0RlbGV0ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUN1dExpc3RDbGljaygpIHtcclxuICAgICAgICBjb25zdCBjdXRQaWVjZXMgPSBjdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCk7XHJcbiAgICAgICAgY29uc3QgdW5jdXRQaWVjZXMgPSB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5nZXRQaWVjZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKCFjdXRQaWVjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGN1dHBpZWNlc1xyXG4gICAgICAgICAgICBzaG93Q3V0TGlzdEVycm9yKCdBZGQgY3V0IHBpZWNlcyB0byBjcmVhdGUgYSBuZXcgY3V0IGxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXVuY3V0UGllY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBObyB1bmN1dCBwaWVjZXNcclxuICAgICAgICAgICAgc2hvd0N1dExpc3RFcnJvcignQWRkIHVuY3V0IHBpZWNlcyB0byBjcmVhdGUgYSBuZXcgY3V0IGxpc3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgbm8gZXJyb3JzIHRvIHNob3cuIFJlbW92ZSBhbnkgcHJldmlvdXMgZXJyb3JzLlxyXG4gICAgICAgIGNsZWFyQ3V0TGlzdEVycm9yKCk7XHJcblxyXG4gICAgICAgIGJlc3RDdXRMaXN0ID0gY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KFxyXG4gICAgICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCksIFxyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5nZXRQaWVjZXMoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN1dExpc3RDb21wb25lbnQuY3V0TGlzdCA9IGJlc3RDdXRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlTGlzdENsZWFyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGVhciBDdXQgTGlzdCcpO1xyXG5cclxuICAgICAgICAvLyBDbGVhciBjdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VMaXN0Q2xlYXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NsZWFyIFVuY3V0IExpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdW5jdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0N1dExpc3RFcnJvcihlcnJvck1zZykge1xyXG4gICAgICAgIGN1dExpc3RFcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgICAgIGN1dExpc3RFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1zZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhckN1dExpc3RFcnJvcigpIHtcclxuICAgICAgICBjdXRMaXN0RXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICBjdXRMaXN0RXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5pbXBvcnQgQ3V0U2VxdWVuY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0U2VxdWVuY2VDb21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dExpc3RDb21wb25lbnQoY3V0TGlzdCkge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2N1dC1saXN0J30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1dExpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIEhlYWRlclxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDMnLCB7fSwgJ01hdGVyaWFsIExpc3Q6JykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZVxyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdFRhYmxlID0gZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEhlYWRcclxuICAgICAgICBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0aGVhZCcsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdRdWFudGl0eScpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnVW5jdXQgTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbml0IFByaWNlJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdTdW0gUHJpY2UnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0ID0gY3V0TGlzdC5nZXRNYXRlcmlhbExpc3QoKTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3RUYWJsZUJvZHkgPSBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcclxuICAgICAgICBsZXQgdG90YWxQcmljZSA9IDA7XHJcbiAgICAgICAgbGV0IGN1cnJQcmljZTtcclxuICAgICAgICBmb3IgKGNvbnN0IFt1bmN1dExlbmd0aCwgdW5jdXRPYmpdIG9mIE9iamVjdC5lbnRyaWVzKG1hdGVyaWFsTGlzdCkpIHtcclxuICAgICAgICAgICAgY3VyclByaWNlID0gdW5jdXRPYmoucXVhbnRpdHkgKiB1bmN1dE9iai51bml0UHJpY2U7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlQm9keS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0T2JqLnF1YW50aXR5KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0TGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0T2JqLnVuaXRQcmljZSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXJyUHJpY2UudG9GaXhlZCgyKSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gY3VyclByaWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHkgLSBUb3RhbCBQcmljZVxyXG4gICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsnY29sc3Bhbic6ICcyJ30pLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAncm93J30sICdUb3RhbCBQcmljZScpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB0b3RhbFByaWNlLnRvRml4ZWQoMikpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEN1dCBTZXF1ZW5jZXNcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gzJywge30sICdDdXQgU2VxdWVuY2VzOicpKTtcclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlcyAtIFRhYmxlXHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VzVGFibGUgPSBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xyXG5cclxuICAgICAgICAvLyBDdXQgU2VxdWVuY2VzIC0gVGFibGUgSGVhZFxyXG4gICAgICAgIGN1dFNlcXVlbmNlc1RhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1VuY3V0IE1lbWJlcicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnQ3V0IExlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnUmVtYWluaW5nIExlbmd0aCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHlcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZXNUYWJsZUJvZHkgPSBjdXRTZXF1ZW5jZXNUYWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBjdXRTZXF1ZW5jZXNUYWJsZUJvZHkuYXBwZW5kKC4uLkN1dFNlcXVlbmNlQ29tcG9uZW50KGN1dFNlcXVlbmNlKS5yZW5kZXIoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICAgICAgZ2V0IGN1dExpc3QoKSB7IHJldHVybiBjdXRMaXN0OyB9LFxyXG4gICAgICAgIHNldCBjdXRMaXN0KG5ld0N1dExpc3QpIHsgXHJcbiAgICAgICAgICAgIGN1dExpc3QgPSBuZXdDdXRMaXN0O1xyXG4gICAgICAgICAgICBjbGVhcigpO1xyXG4gICAgICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUVkaXRGb3JtQ29tcG9uZW50LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXRQaWVjZUNvbXBvbmVudChjdXRQaWVjZSwgZWRpdENhbGxiYWNrLCBkZWxldGVDYWxsYmFjaykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUVkaXRDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNsZWFyRWxlbWVudCgpO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBDdXRQaWVjZUVkaXRGb3JtQ29tcG9uZW50KGN1dFBpZWNlLCBoYW5kbGVFZGl0Q29uZmlybSwgaGFuZGxlRWRpdENhbmNlbCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVFZGl0Q29uZmlybSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGVkaXRDYWxsYmFjayhlLCBjdXRQaWVjZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hhbmdlIGN1dFBpZWNlIHZhbHVlcyB0byBmb3JtIGlucHV0IHZhbHVlc1xyXG4gICAgICAgIGN1dFBpZWNlLnRoaWNrbmVzcyA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3RoaWNrbmVzcycpLnZhbHVlKTtcclxuICAgICAgICBjdXRQaWVjZS53aWR0aCA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpO1xyXG4gICAgICAgIGN1dFBpZWNlLmxlbmd0aCA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKTtcclxuICAgICAgICBjdXRQaWVjZS5xdWFudGl0eSA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3F1YW50aXR5JykudmFsdWUpO1xyXG4gICAgICAgIGN1dFBpZWNlLmtlcmYgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdrZXJmJykudmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVFZGl0Q2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZUNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGVsZXRlQ2FsbGJhY2soY3V0UGllY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhckVsZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnY3V0LXBpZWNlJ30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyRWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdEZWxldGUnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYnV0dG9uc1xyXG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0Q2xpY2spO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS50aGlja25lc3MpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2Uud2lkdGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLnF1YW50aXR5KSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLmtlcmYpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWJ0bi1jb250YWluZXInfSxcclxuICAgICAgICAgICAgICAgIGVkaXRCdG4sXHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdG4gXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldCBjdXRQaWVjZSgpIHsgcmV0dXJuIGN1dFBpZWNlOyB9LFxyXG4gICAgICAgIHJlbW92ZSxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGlzSW5wdXRWYWxpZExlbmd0aCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAnY3V0LXBpZWNlLWNyZWF0ZScsXHJcbiAgICAgICAgICAgICdpZCc6ICdjdXQtcGllY2UtY3JlYXRlLWZvcm0nLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiAncGllY2UtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXBJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAnY3V0LXRoaWNrbmVzcycsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7J2NsYXNzJzogJ2Vycm9yJywgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ2N1dC13aWR0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAnY3V0LWxlbmd0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LWxlbmd0aCd9LCAnTGVuZ3RoOicpLFxyXG4gICAgICAgICAgICAgICAgdGVtcElucHV0RWxlbWVudFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gUXVhbnRpdHlcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1xdWFudGl0eSd9LCAnUXVhbnRpdHk6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdudW1iZXInLCAnbmFtZSc6ICdxdWFudGl0eScsICdpZCc6ICdjdXQtcXVhbnRpdHknLCAndmFsdWUnOiAnMScsICdtaW4nOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBLZXJmXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdrZXJmJywgJ2lkJzogJ2N1dC1rZXJmJywgJ3ZhbHVlJzogJzAuMTI1JywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJ30pO1xyXG4gICAgICAgIC8vIEFkZCBpbnB1dCBsaXN0ZW5lciB0aGF0IGFkZHMgY3VzdG9tIHZhbGlkaXR5IGlmIGlucHV0IHZhbHVlIGlzIE5PVCB2YWxpZFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQta2VyZid9LCAnS2VyZjonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIFN1Ym1pdCBDb250YWluZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1mb3JtLWJ0bi1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICdzdWJtaXQnLCAndmFsdWUnOiAnQWRkJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUZvcm1TdWJtaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGlucHV0IGZpZWxkcyBmb3IgY3V0IGxlbmd0aCBhbmQgcXVhbnRpdHksIGxlYXZpbmcgb3RoZXIgaW5wdXRzIHdpdGggdXNlciBlbnRlcmVkIGRhdGEuXHJcbiAgICAgICAgLy8gRm9jdXMgY3Vyc29yIG9uIGxhc3QgaW5wdXQgd2hpY2ggc2hvdWxkIGJlIGN1dCBsZW5ndGggZmllbGRcclxuICAgICAgICBbJ3F1YW50aXR5JywgJ2xlbmd0aCddLmZvckVhY2goKGlucHV0TmFtZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQgPSBmb3JtRWxlbWVudC5lbGVtZW50cy5uYW1lZEl0ZW0oaW5wdXROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gaW5wdXRFbGVtZW50LmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gKGFyci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGlzSW5wdXRWYWxpZExlbmd0aCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQoY3V0UGllY2UsIGhhbmRsZUVkaXRDb25maXJtLCBoYW5kbGVFZGl0Q2FuY2VsKSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAnY3V0LXBpZWNlLWVkaXQnLFxyXG4gICAgICAgICAgICAnaWQnOiAnY3V0LXBpZWNlLWVkaXQtZm9ybScsXHJcbiAgICAgICAgICAgICdjbGFzcyc6ICdwaWVjZS1mb3JtJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgdGVtcElucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzXHJcbiAgICAgICAgY29uc3QgZm9ybUlucHV0c0VsZW1lbnQgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1mb3JtLWlucHV0cyd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFRoaWNrbmVzc1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXRoaWNrbmVzcyd9LCAnVGhpY2tuZXNzOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3RoaWNrbmVzcycsICdpZCc6ICdjdXQtdGhpY2tuZXNzJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogY3V0UGllY2UudGhpY2tuZXNzfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdzcGFuJywgeydjbGFzcyc6ICdlcnJvcicsICdhcmlhLWxpdmUnOiAncG9saXRlJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXdpZHRoJ30sICdXaWR0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd3aWR0aCcsICdpZCc6ICdjdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnLCAndmFsdWUnOiBjdXRQaWVjZS53aWR0aH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICdjdXQtbGVuZ3RoJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogY3V0UGllY2UubGVuZ3RofSk7XHJcbiAgICAgICAgLy8gQWRkIGlucHV0IGxpc3RlbmVyIHRoYXQgYWRkcyBjdXN0b20gdmFsaWRpdHkgaWYgaW5wdXQgdmFsdWUgaXMgTk9UIHZhbGlkXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiBpc0lucHV0VmFsaWRMZW5ndGgoZS50YXJnZXQpKTtcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFF1YW50aXR5XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtcXVhbnRpdHknfSwgJ1F1YW50aXR5OicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnbnVtYmVyJywgJ25hbWUnOiAncXVhbnRpdHknLCAnaWQnOiAnY3V0LXF1YW50aXR5JywgJ21pbic6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnLCAndmFsdWUnOiBjdXRQaWVjZS5xdWFudGl0eX0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBLZXJmXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdrZXJmJywgJ2lkJzogJ2N1dC1rZXJmJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogY3V0UGllY2Uua2VyZn0pO1xyXG4gICAgICAgIC8vIEFkZCBpbnB1dCBsaXN0ZW5lciB0aGF0IGFkZHMgY3VzdG9tIHZhbGlkaXR5IGlmIGlucHV0IHZhbHVlIGlzIE5PVCB2YWxpZFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQta2VyZid9LCAnS2VyZjonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBCdXR0b24gQ29udGFpbmVyXHJcbiAgICAgICAgY29uc3QgZm9ybUJ0bkNvbnRhaW5lciA9IGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0tYnRuLWNvbnRhaW5lcid9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBTdWJtaXQvRWRpdCBDb25maXJtXHJcbiAgICAgICAgZm9ybUJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnc3VibWl0JywgJ3ZhbHVlJzogJ1VwZGF0ZSd9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlRWRpdENvbmZpcm0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRWRpdENvbmZpcm0oZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIENhbmNlbC9FeGl0XHJcbiAgICAgICAgZm9ybUJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeyd0eXBlJzogJ2J1dHRvbid9LCAnQ2FuY2VsJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUVkaXRDYW5jZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRWRpdENhbmNlbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IGN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgbGV0IGN1dFBpZWNlTGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgYWRkQ3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgIC8vIEFkZCBjdXQgcGllY2UgY29tcG9uZW50cyB0byBhcnJheVxyXG4gICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cy5wdXNoKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGN1dCBwaWVjZSBjb21wb25lbnRzIHRvIERPTVxyXG4gICAgICAgIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAgICAgY3V0UGllY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChjdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVDdXRQaWVjZUNvbXBvbmVudCA9IGZ1bmN0aW9uKC4uLmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIGZvciAoY29uc3QgY3V0UGllY2VDb21wb25lbnQgb2YgY3V0UGllY2VDb21wb25lbnRzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBjdXRQaWVjZUNvbXBvbmVudHMuaW5kZXhPZihjdXRQaWVjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlQ3V0UGllY2UgPSBmdW5jdGlvbiguLi5jdXRQaWVjZXNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlVG9SZW1vdmUgb2YgY3V0UGllY2VzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBjdXRQaWVjZUNvbXBvbmVudHMuZmluZEluZGV4KChjdXRQaWVjZUNvbXBvbmVudCkgPT4gY3V0UGllY2VDb21wb25lbnQuY3V0UGllY2UgPT09IGN1dFBpZWNlVG9SZW1vdmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgY3V0UGllY2VDb21wb25lbnRzW2luZGV4XS5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnRzIGZyb20gYXJyYXlcclxuICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnRzIGZyb20gZG9jdW1lbnRcclxuICAgICAgICB3aGlsZSAoY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQoY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldFBpZWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjdXRQaWVjZUNvbXBvbmVudHMubWFwKChjdXRQaWVjZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY3V0UGllY2VDb21wb25lbnQuY3V0UGllY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdCd9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBsYWJlbHMgZm9yIGxpc3QgKHRhYmxlIGhlYWQpXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWhlYWQnfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1RoaWNrbmVzcycpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdXaWR0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnUXVhbnRpdHknKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnS2VyZicpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGlzdCBib2R5ICh0YWJsZSBib2R5KVxyXG4gICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQgPSBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1ib2R5J30pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRDdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICBjbGVhcixcclxuICAgICAgICBnZXRQaWVjZXMsXHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2UsXHJcbiAgICAgICAgcmVtb3ZlQ3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0U2VxdWVuY2VDb21wb25lbnQoY3V0U2VxdWVuY2UpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHJvd0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzLmZvckVhY2goKGN1dFBpZWNlLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBSb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVuY3V0IFBpZWNlIChmaXJzdCByb3cgb25seSlcclxuICAgICAgICAgICAgLy8gQWRkIHVuY3V0IHBpZWNlIGlmIGZpcnN0IHJvdyBPUiBhZGQgcm93IHRoYXQgc3BhbnMgcmVzdCBvZiByb3dzIGZvciB0aGlzIGN1dCBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBgJHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnRoaWNrbmVzc314JHtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLndpZHRofXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UubGVuZ3RofWApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsncm93c3Bhbic6IGFyci5sZW5ndGggLSAxfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEN1dCBQaWVjZXNcclxuICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1haW5pbmcgTGVuZ3RoIChsYXN0IHJvdyBvbmx5KVxyXG4gICAgICAgICAgICAvLyBBZGQgcmVtYWluaW5nIGxlbmd0aCBpZiBsYXN0IHJvdyBPUiByb3cgdGhhdCBzcGFucyByZXN0IG9mIHJvd3MgZm9yIHRoaXMgY3V0IHNlcXVlbmNlLlxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGB3aXRoICR7Y3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RofSByZW1haW5pbmdgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J3Jvd3NwYW4nOiBhcnIubGVuZ3RoIC0gMX0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm93IGVsZW1lbnQgdG8gYXJyYXkgb2Ygb3RoZXIgcm93IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIHJvd0VsZW1lbnRzLnB1c2godGVtcFJvd0VsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKGNvcHlyaWdodFllYXIpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCBmcm9tIFwiLi91bmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSwgZWRpdENhbGxiYWNrLCBkZWxldGVDYWxsYmFjaykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUVkaXRDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNsZWFyRWxlbWVudCgpO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBVbmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQodW5jdXRQaWVjZSwgaGFuZGxlRWRpdENvbmZpcm0sIGhhbmRsZUVkaXRDYW5jZWwpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENvbmZpcm0gPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBlZGl0Q2FsbGJhY2soZSwgdW5jdXRQaWVjZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hhbmdlIHVuY3V0UGllY2UgdmFsdWVzIHRvIGZvcm0gaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgdW5jdXRQaWVjZS50aGlja25lc3MgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCd0aGlja25lc3MnKS52YWx1ZSk7XHJcbiAgICAgICAgdW5jdXRQaWVjZS53aWR0aCA9IE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3dpZHRoJykudmFsdWUpO1xyXG4gICAgICAgIHVuY3V0UGllY2UubGVuZ3RoID0gTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnbGVuZ3RoJykudmFsdWUpO1xyXG4gICAgICAgIHVuY3V0UGllY2UucHJpY2UgPSBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdwcmljZScpLnZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRWRpdENhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVEZWxldGVDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlbGV0ZUNhbGxiYWNrKHVuY3V0UGllY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhckVsZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAndW5jdXQtcGllY2UnfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdEZWxldGUnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYnV0dG9uc1xyXG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0Q2xpY2spO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLnRoaWNrbmVzcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLndpZHRoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UubGVuZ3RoKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHVuY3V0UGllY2UucHJpY2UpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1idG4tY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgZWRpdEJ0bixcclxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ0blxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgdW5jdXRQaWVjZSgpIHsgcmV0dXJuIHVuY3V0UGllY2U7IH0sXHJcbiAgICAgICAgcmVtb3ZlLFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgaXNJbnB1dFZhbGlkTGVuZ3RoLCBpc0lucHV0VmFsaWRQcmljZSB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIGxldCBmb3JtRWxlbWVudDtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3JtRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCB7XHJcbiAgICAgICAgICAgICdhY3Rpb24nOiAnJyxcclxuICAgICAgICAgICAgJ21ldGhvZCc6ICdnZXQnLFxyXG4gICAgICAgICAgICAnbmFtZSc6ICd1bmN1dC1waWVjZS1jcmVhdGUnLFxyXG4gICAgICAgICAgICAnaWQnOiAndW5jdXQtcGllY2UtY3JlYXRlLWZvcm0nLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiAncGllY2UtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHRlbXBJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LXRoaWNrbmVzcyd9LCAnVGhpY2tuZXNzOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3RoaWNrbmVzcycsICdpZCc6ICd1bmN1dC10aGlja25lc3MnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFdpZHRoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC13aWR0aCd9LCAnV2lkdGg6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnd2lkdGgnLCAnaWQnOiAndW5jdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIExlbmd0aFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAnbGVuZ3RoJywgJ2lkJzogJ3VuY3V0LWxlbmd0aCcsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZSd9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZExlbmd0aChlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtbGVuZ3RoJ30sICdMZW5ndGg6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBQcmljZVxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAncHJpY2UnLCAnaWQnOiAndW5jdXQtcHJpY2UnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnfSk7XHJcbiAgICAgICAgLy8gQWRkIGlucHV0IGxpc3RlbmVyIHRoYXQgYWRkcyBjdXN0b20gdmFsaWRpdHkgaWYgaW5wdXQgdmFsdWUgaXMgTk9UIHZhbGlkXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiBpc0lucHV0VmFsaWRQcmljZShlLnRhcmdldCkpO1xyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtcHJpY2UnfSwgJ1ByaWNlOicpLFxyXG4gICAgICAgICAgICAgICAgdGVtcElucHV0RWxlbWVudFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gU3VibWl0IENvbnRhaW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0tYnRuLWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdBZGQnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlRm9ybVN1Ym1pdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZmllbGRzIGZvciBjdXQgbGVuZ3RoIGFuZCBxdWFudGl0eSwgbGVhdmluZyBvdGhlciBpbnB1dHMgd2l0aCB1c2VyIGVudGVyZWQgZGF0YS5cclxuICAgICAgICAvLyBGb2N1cyBjdXJzb3Igb24gbGFzdCBpbnB1dCB3aGljaCBzaG91bGQgYmUgY3V0IGxlbmd0aCBmaWVsZFxyXG4gICAgICAgIFsncHJpY2UnLCAnbGVuZ3RoJ10uZm9yRWFjaCgoaW5wdXROYW1lLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudCA9IGZvcm1FbGVtZW50LmVsZW1lbnRzLm5hbWVkSXRlbShpbnB1dE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBpbnB1dEVsZW1lbnQuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAoYXJyLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgaXNJbnB1dFZhbGlkTGVuZ3RoLCBpc0lucHV0VmFsaWRQcmljZSB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VFZGl0Rm9ybUNvbXBvbmVudCh1bmN1dFBpZWNlLCBoYW5kbGVFZGl0Q29uZmlybSwgaGFuZGxlRWRpdENhbmNlbCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ3VuY3V0LXBpZWNlLWVkaXQnLFxyXG4gICAgICAgICAgICAnaWQnOiAndW5jdXQtcGllY2UtZWRpdC1mb3JtJyxcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3BpZWNlLWZvcm0nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCB0ZW1wSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHNcclxuICAgICAgICBjb25zdCBmb3JtSW5wdXRzRWxlbWVudCA9IGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWZvcm0taW5wdXRzJ30pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC10aGlja25lc3MnfSwgJ1RoaWNrbmVzczonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd0aGlja25lc3MnLCAnaWQnOiAndW5jdXQtdGhpY2tuZXNzJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogdW5jdXRQaWVjZS50aGlja25lc3N9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gV2lkdGhcclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ3VuY3V0LXdpZHRoJywgJ3NpemUnOiAnMScsICdyZXF1aXJlZCc6ICd0cnVlJywgJ3ZhbHVlJzogdW5jdXRQaWVjZS53aWR0aH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2xlbmd0aCcsICdpZCc6ICd1bmN1dC1sZW5ndGgnLCAnc2l6ZSc6ICcxJywgJ3JlcXVpcmVkJzogJ3RydWUnLCAndmFsdWUnOiB1bmN1dFBpZWNlLmxlbmd0aH0pO1xyXG4gICAgICAgIC8vIEFkZCBpbnB1dCBsaXN0ZW5lciB0aGF0IGFkZHMgY3VzdG9tIHZhbGlkaXR5IGlmIGlucHV0IHZhbHVlIGlzIE5PVCB2YWxpZFxyXG4gICAgICAgIHRlbXBJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gaXNJbnB1dFZhbGlkTGVuZ3RoKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIHRlbXBJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFByaWNlXHJcbiAgICAgICAgdGVtcElucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdwcmljZScsICdpZCc6ICd1bmN1dC1wcmljZScsICdzaXplJzogJzEnLCAncmVxdWlyZWQnOiAndHJ1ZScsICd2YWx1ZSc6IHVuY3V0UGllY2UucHJpY2V9KTtcclxuICAgICAgICAvLyBBZGQgaW5wdXQgbGlzdGVuZXIgdGhhdCBhZGRzIGN1c3RvbSB2YWxpZGl0eSBpZiBpbnB1dCB2YWx1ZSBpcyBOT1QgdmFsaWRcclxuICAgICAgICB0ZW1wSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IGlzSW5wdXRWYWxpZFByaWNlKGUudGFyZ2V0KSk7XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1wcmljZSd9LCAnUHJpY2U6JyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gQnV0dG9uIENvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGZvcm1CdG5Db250YWluZXIgPSBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1mb3JtLWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gU3VibWl0L0VkaXQgQ29uZmlybVxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdVcGRhdGUnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgc3VibWl0IGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZUVkaXRDb25maXJtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDb25maXJtKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBDYW5jZWwvRXhpdFxyXG4gICAgICAgIGZvcm1CdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsndHlwZSc6ICdidXR0b24nfSwgJ0NhbmNlbCcpXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVFZGl0Q2FuY2VsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRDYW5jZWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VMaXN0Q29tcG9uZW50KCkge1xyXG4gICAgbGV0IHVuY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBsZXQgdW5jdXRQaWVjZUxpc3RFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGFkZFVuY3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMucHVzaCguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodW5jdXRQaWVjZUNvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VDb21wb25lbnQgb2YgdW5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHVuY3V0UGllY2VDb21wb25lbnRzLmluZGV4T2YodW5jdXRQaWVjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudC5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW1vdmVVbmN1dFBpZWNlID0gZnVuY3Rpb24oLi4udW5jdXRQaWVjZXNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IHVuY3V0UGllY2VUb1JlbW92ZSBvZiB1bmN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdW5jdXRQaWVjZUNvbXBvbmVudHMuZmluZEluZGV4KCh1bmN1dFBpZWNlQ29tcG9uZW50KSA9PiB1bmN1dFBpZWNlQ29tcG9uZW50LnVuY3V0UGllY2UgPT09IHVuY3V0UGllY2VUb1JlbW92ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzW2luZGV4XS5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnRzIGZyb20gYXJyYXlcclxuICAgICAgICB1bmN1dFBpZWNlQ29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZWxlbWVudHMgZnJvbSBkb2N1bWVudFxyXG4gICAgICAgIHdoaWxlICh1bmN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQodW5jdXRQaWVjZUxpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0UGllY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuY3V0UGllY2VDb21wb25lbnRzLm1hcCgodW5jdXRQaWVjZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5jdXRQaWVjZUNvbXBvbmVudC51bmN1dFBpZWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1ByaWNlJyksXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGlzdCBib2R5ICh0YWJsZSBib2R5KVxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0RWxlbWVudCA9IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWJvZHknfSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZFVuY3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgY2xlYXIsXHJcbiAgICAgICAgZ2V0UGllY2VzLFxyXG4gICAgICAgIHJlbW92ZVVuY3V0UGllY2UsXHJcbiAgICAgICAgcmVtb3ZlVW5jdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICByZW5kZXIsXHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDdXRMaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKGN1dFNlcXVlbmNlcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBjdXRTZXF1ZW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdXRTZXF1ZW5jZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoKGN1dFNlcXVlbmNlKSB7XHJcbiAgICAgICAgLy8gVE9ETzogVHlwZSBjaGVja1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5wdXNoKGN1dFNlcXVlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcmljZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXRTZXF1ZW5jZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLnVuY3V0UGllY2UucHJpY2UsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZXBDb3B5KCkge1xyXG4gICAgICAgIGxldCBjdXRMaXN0ID0gbmV3IEN1dExpc3QoKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcyA9IFsuLi50aGlzLmN1dFNlcXVlbmNlc107XHJcbiAgICAgICAgcmV0dXJuIGN1dExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF0ZXJpYWxMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGggaW4gbWF0ZXJpYWxMaXN0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdLnF1YW50aXR5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3RPYmpbY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmljZTogY3V0U2VxdWVuY2UudW5jdXRQaWVjZS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsTGlzdE9iajtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGN1dExpc3QgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgbGlzdCBvZiBDdXRQaWVjZXMgYW5kIG1pbmltYWwgcmVtYWluaW5nIGxlbmd0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZW1haW5pbmdMZW5ndGggXHJcbiAgICAgKiBAcGFyYW0ge1tDdXRQaWVjZV19IGluZGl2aWR1YWxDdXRQaWVjZXMgXHJcbiAgICAgKiBAcGFyYW0ge1tOdW1iZXJdfSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0SW5kZXggKGRlZmF1bHQgPSAwKSBcclxuICAgICAqIEByZXR1cm5zIHtbLi4uQ3V0UGllY2UsIE51bWJlcl19IEFycmF5IG9mIEN1dFBpZWNlcyB3aXRoIGxlZnRvdmVyIGxlbmd0aCBvZiB3aG9sZSBwaWVjZSBhdCB0aGUgZW5kXHJcbiAgICAgKi9cclxuICAgIGdldEN1dExpc3Q6IChyZW1haW5pbmdMZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIHN0YXJ0SW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggaXMgZW1wdHlcclxuICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3V0UGllY2VJbmRleDtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXQgbGVuZ3RoIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggKERPIE5PVCBJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmxlbmd0aCA9PSByZW1haW5pbmdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKGksIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0sIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBpbmRleCBvZiBsYXJnZXN0IGN1dCBsZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLmN1dExpc3QuZ2V0Q3V0TGlzdChcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdDtcclxuIiwiaW1wb3J0IHsgQ3V0TGlzdCB9IGZyb20gXCIuL2N1dExpc3QuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcblxyXG4vKipcclxuICogVE9ETzogV2hpbGUgbG9vcGluZyB0aHJvdWdoIGNvbWJpbmF0aW9ucyBvZiB1bmN1dCBwaWVjZXMsIGlmIHRoZSBjb21iaW5hdGlvbiBcclxuICogcHJpY2UgaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgYmVzdCBjdXQgbGlzdCBwcmljZSwgdGhlbiBjYW4gc2tpcC5cclxuICovXHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyBcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICogbWF4ID0gWzUsNCwzLDJdXHJcbiAgICAgKiBwb3NzaWJpbGl0aWVzID0gNio1KjQqMyA9IDM2MFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMCwwLDBdXHJcbiAgICAgKiBbMF0gMVxyXG4gICAgICogWzNdICszXHJcbiAgICAgKiA0XHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogMyArIDEgPSA0XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSwwLDAsMF1cclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiA1ICsgMSA9IDZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICogWzAsMF0gMVxyXG4gICAgICogWzUsMF0gKzVcclxuICAgICAqIFswLDFdICsxXHJcbiAgICAgKiBbNSwxXSArNVxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoMikgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMiAqIDYgPSAxMlxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICogMTIgKyA0ID0gMTZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMCwwXVxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbNSwyXSArNlxyXG4gICAgICogWzUsM10gKzZcclxuICAgICAqIFs1LDRdICs2XHJcbiAgICAgKiAzMFxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDQpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDI0ICsgNiA9IDMwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMCwwLDEsMF1cclxuICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAqIFswLDAsMSwwXSArMVxyXG4gICAgICogMzFcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgKiAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDApICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgxKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAxICogKDYqNSkgPSAzMVxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwzLDJdXHJcbiAgICAgKiAzNjBcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA2XHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogNiArIDQgKiA2ID0gMzBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMykgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMykgdmFsdWUgKDIpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMTIwICsgMiAqICg2KjUqNCkgPSAxMjAgKyAyICogMTIwID0gMTIwICsgMjQwID0gMzYwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvLyBJZiBhcnJheSBpcyBlbXB0eSByZXR1cm4gemVyb1xyXG4gICAgICAgIGlmICghbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgbGV0IGNvdW50ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbMF0gKyAxO1xyXG5cclxuICAgICAgICAvLyBGb3IgZXZlcnkgaW5kZXggYWZ0ZXIgdGhlIGZpcnN0IHVwIHRvIGxhc3ROb25aZXJvSW5kZXgsIGFkZCB0aGUgXHJcbiAgICAgICAgLy8gcHJvZHVjdCBvZiBhbGwgcHJldmlvdXMgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3ROb25aZXJvSW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudCArPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpXSAqIG1heE51bUF2YWlsYWJsZUxlbmd0aHMuc2xpY2UoMCwgaSkucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiAoY3VyciArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICBjb25zdCBudW0gPSBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF4TGFzdE5vblplcm9JbmRleCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHMuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBtYXhMYXN0Tm9uWmVyb0luZGV4ID09PSAtMSA/IG1heE51bUF2YWlsYWJsZUxlbmd0aHMubGVuZ3RoIDogbWF4TGFzdE5vblplcm9JbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbCkgPT4gdmFsICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogY3Vycik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChudW0gLyBtYXgpICogMTAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYE51bTogJHtudW19IC0gTWF4OiAke21heH0gLSAlJHtwZXJjZW50YWdlLnRvRml4ZWQoMil9YCk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4LiBjdXJyPVsxLDMsMCwwXSBtYXg9WzMsNCw0LDVdIHJlc3VsdHMgaW4gYSB2YWxpZCBjdXQgbGlzdC5cclxuICAgICAgICAgKiBOZXh0IGluY3JlbWVudHMgb2YgWzIsMywwLDBdIGFuZCBbMywzLDAsMF0gd2lsbCBhbHdheXMgYmUgbW9yZSBleHBlbnNpdmUgdGhhbiBbMSwzLDAsMF0uXHJcbiAgICAgICAgICogTWFrZSBmaXJzdCBub24temVybyB2YWx1ZSAwIGFuZCBpbmNyZW1lbnQgdmFsdWUgYWZ0ZXIuXHJcbiAgICAgICAgICogWzAsNCwwLDBdIC0+IGNvbnRpbnVlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBlbXB0eSBPUiBhbGwgdmFsdWVzIGFyZSB6ZXJvXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXhdID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgZmlyc3ROb25aZXJvVmFsdWVJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgZW1wdHkgcGllY2VzXHJcbiAgICAgICAgaWYgKCFjdXRQaWVjZXMubGVuZ3RoIHx8ICF1bmN1dFBpZWNlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0IGxlbmd0aCBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgY3V0UGllY2VzLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgYXZhaWxhYmxlTGVuZ3Roc0FyciBpbiBkZWNyZWFzaW5nIG9yZGVyXHJcbiAgICAgICAgLy9hdmFpbGFibGVMZW5ndGhzQXJyLnNvcnQoKGEsYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHVuY3V0UGllY2VzIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbGVuZ3RoXHJcbiAgICAgICAgdW5jdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZWFjaCBhdmFpbGFibGUgbGVuZ3RocyBuZWVkZWQgaWYgb25seSB1c2VkIHRoYXQgXHJcbiAgICAgICAgLy8gYXZhaWxhYmxlIGxlbmd0aCBmb3IgYWxsIGN1dFBpZWNlcyAoaW5pdGlhbGl6ZWQgdG8gemVybylcclxuICAgICAgICBsZXQgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyA9IG5ldyBBcnJheSh1bmN1dFBpZWNlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGN1dFNlcXVlbmNlLCBjdXRTZXF1ZW5jZUFycjtcclxuICAgICAgICBsZXQgY3VyckN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG5cclxuICAgICAgICB1bmN1dFBpZWNlcy5mb3JFYWNoKCh1bmN1dFBpZWNlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvL21heE51bSA9IE1hdGguY2VpbCh0b3RhbEN1dExlbmd0aCAvIHVuY3V0UGllY2UubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIGN1cnJlbnQgQ3V0TGlzdCBmcm9tIHByZXZpb3VzIGxvb3BcclxuICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2UubGVuZ3RoIGNhbiBiZSB1c2VkIHdpdGggdGhlIGN1dFBpZWNlcyByZXF1aXJlZC5cclxuICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAgICAgLy8gVE9ETzogRG8gbm90IG5lZWQgbWF4TnVtLiBPbmx5IG5lZWQgdG8gY2hlY2sgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBhbmQgc3RpbGwgaW5jcmVtZW50IGNvdW50IGluIG1heE51bUF2YWlsYWJsZUxlbmd0aHNcclxuICAgICAgICAgICAgLy8gVE9ETzogSW5maW5pdGUgbG9vcCBpZiBjdXQgcGllY2UgaXMgbG9uZ2VyIHRoYW4gdW5jdXQgcGllY2UgbGVuZ3RoLiBBcnJheSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IG5ldmVyIHJlYWNoZXMgemVyby5cclxuICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2UubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHJlbWFpbmluZyB2YWx1ZSAoYXJyYXkgbGVuZ3RoIDEpLFxyXG4gICAgICAgICAgICAgICAgLy8gbm8gbW9yZSBjdXQgcGllY2VzIGNhbiBiZSB1c2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UuY3V0UGllY2VzID0gY3V0U2VxdWVuY2VBcnIuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBDdXRTZXF1ZW5jZSB0byBjdXJyZW50IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudCBvZiBtYXggbnVtYmVyIG9mIGNvcnJlc3BvbmRpbmcgVW5jdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1tpbmRleF0rKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdCBvbmx5IGlmIE5PIGF2YWlsYWJsZSBjdXQgcGllY2VzIHN0aWxsIGxlZnRcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICYmICgoYmVzdEN1dExpc3QgPT0gdW5kZWZpbmVkKSB8fCAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGluY3JlbWVudFRyaWdnZXIsIGRlY3JlbWVudFRyaWdnZXIsIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgc2tpcEZsYWc7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGYWN0b3JDb3VudGVyID0gMTtcclxuICAgICAgICBsZXQgcGVyY2VudE11bHRpcGxlRGlzcGxheSA9IDU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyKTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBnZXRQZXJjZW50YWdlKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlICYmIHBlcmNlbnRhZ2UgPiAocGVyY2VudE11bHRpcGxlRGlzcGxheSAqIHBlcmNlbnRGYWN0b3JDb3VudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cGVyY2VudGFnZS50b0ZpeGVkKDApfSVgKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRGYWN0b3JDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdmFsdWVzIGFyZSB6ZXJvLCBza2lwXHJcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIHZhbHVlIGlzIG5vbi16ZXJvLCBza2lwIHNpbmNlIGFscmVhZHkgY2hlY2sgdGhvc2UgY2FzZXMgcHJldmlvdXNseVxyXG4gICAgICAgICAgICAvLyBJZiBsZW5ndGggb2YgYWxsIHVuY3V0IHBpZWNlcyBpcyBsZXNzIHRoYW4gbGVuZ3RoIG9mIGFsbCBjdXQgcGllY2VzLCBza2lwIHNpbmNlIG5vdCBlbm91Z2ggbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maWx0ZXIoKGNvdW50KSA9PiBjb3VudCA+IDApLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAmJiAobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIucmVkdWNlKChhY2N1bSwgY3VyciwgaW5kZXgpID0+IGFjY3VtICsgY3VyciAqIHVuY3V0UGllY2VzW2luZGV4XS5sZW5ndGgsIDApID49IGluZGl2aWR1YWxDdXRQaWVjZXMucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyLmN1dFdpdGhLZXJmLCAwKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBbLi4ubnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IG1heE51bSBvZiB1bmN1dFBpZWNlc1tkZWNyZW1lbnRUcmlnZ2VyXS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwga2VlcCBpbmNyZW1lbnRpbmcgdW50aWwgcmVhY2ggYSB2YWx1ZSB0aGF0IGlzIHN1Y2Nlc3NmdWwuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlY3JlbWVudFRyaWdnZXIgPSBkZWNyZW1lbnQodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVjcmVtZW50VHJpZ2dlciA9PT0gbnVsbCkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZUFyciA9IEN1dFNlcXVlbmNlLmNyZWF0ZUN1dFNlcXVlbmNlQXJyKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJDdXRMaXN0LnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgQ3V0TGlzdCBoYXMgbGVzcyBwcmljZSB0aGFuIHRoZSBiZXN0IEN1dExpc3RcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBhdmFpbGFibGUgY3V0IHBpZWNlcywgbm90IGVub3VnaCB1bmN1dCBwaWVjZXMuIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmVhY2ggaGVyZSwgY3VycmVudCBjdXQgbGlzdCBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHNraXBGbGFnID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjdXQgbGlzdCBpcyBiZXR0ZXIgaWYgTk8gdW51c2VkIHVuY3V0IHBpZWNlcyAodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIGhhcyBhbGwgemVybyB2YWx1ZXMpIEFORCBpdCdzIGNoZWFwZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoKHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCkgPT09IC0xKSAmJiAoYmVzdEN1dExpc3QuZ2V0UHJpY2UoKSA+PSBjdXJyQ3V0TGlzdC5nZXRQcmljZSgpKSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5ldyBCZXN0IEN1dCBMaXN0IC0gQmVzdDogJHtiZXN0Q3V0TGlzdC5nZXRQcmljZSgpfSAtIEN1cnI6ICR7Y3VyckN1dExpc3QuZ2V0UHJpY2UoKX0gLSBUb3RhbDogJHtudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn0gLSBMZWZ0OiAke3RlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdEN1dExpc3QgPSBjdXJyQ3V0TGlzdC5kZWVwQ29weSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRUcmlnZ2VyID0gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKGluY3JlbWVudFRyaWdnZXIgIT09IG51bGwpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhiZXN0Q3V0TGlzdCk7XHJcbiAgICAgICAgd2luZG93LmJlc3RDdXRMaXN0ID0gYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBiZXN0Q3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldENoZWFwZXN0Q3V0TGlzdCxcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjdXRMaXN0Q2FsY3VsYXRvcjtcclxuIiwiY2xhc3MgQ3V0UGllY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aGlja25lc3MgVGhpY2tuZXNzIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBGaW5hbCBjdXQgbGVuZ3RoIG9mIGN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHF1YW50aXR5IE51bWJlciBvZiBpZGVudGljYWwgcGllY2VzIHRvIGN1dCAoZGVmYXVsdCA9IDEpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga2VyZiBCbGFkZSB3aWR0aCBvZiBtYXRlcmlhbCByZW1vdmVkIHdoZW4gY3V0IChpbmNoZXMpIChkZWZhdWx0ID0gMS84XCIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgsIGxlbmd0aCwgcXVhbnRpdHkgPSAxLCBrZXJmID0gMC4xMjUpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMua2VyZiA9IGtlcmY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1dFdpdGhLZXJmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aCArIHRoaXMua2VyZjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3V0UGllY2U7XHJcbiIsImltcG9ydCBDdXRQaWVjZSBmcm9tIFwiLi9jdXRQaWVjZS5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZSBmcm9tIFwiLi91bmN1dFBpZWNlLmpzXCI7XHJcblxyXG5jbGFzcyBDdXRTZXF1ZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1bmN1dFBpZWNlKSB7XHJcbiAgICAgICAgdGhpcy51bmN1dFBpZWNlID0gdW5jdXRQaWVjZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXRQaWVjZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFBpZWNlczogJHt0aGlzLmN1dFBpZWNlc31cXG5MZWZ0b3ZlcjogJHt0aGlzLnJlbWFpbmluZ0xlbmd0aH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDdXRTZXF1ZW5jZSBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7VW5jdXRQaWVjZX0gdW5jdXRQaWVjZSBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtDdXRTZXF1ZW5jZXxudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgIHVuY3V0UGllY2UubGVuZ3RoLCBcclxuICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcywgXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBJZiBjdXRTZXF1ZW5jZUFyciByZXR1cm5zIGp1c3QgdGhlIHVuY3V0UGllY2UgbGVuZ3RoIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgLy8gZXZlcnkgaW5kaXZpZHVhbEN1dFBpZWNlIGlzIGxvbmdlciB0aGFuIHRoZSB1bmN1dFBpZWNlXHJcbiAgICAgICAgaWYgKGN1dFNlcXVlbmNlQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIEN1dFNlcXVlbmNlIGluc3RhbmNlIGZyb20gY3V0U2VxdWVuY2VBcnJcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZSA9IG5ldyBDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgY3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RoID0gY3V0U2VxdWVuY2VBcnJbY3V0U2VxdWVuY2VBcnIubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXRTZXF1ZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggc21hbGxlc3QgcmVtYWluaW5nIGxlbmd0aCBmcm9tIGFuIGluaXRpYWwgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZUN1dFNlcXVlbmNlQXJyKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApIHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dCBsZW5ndGggZXF1YWwgdG8gcmVtYWluaW5nIGxlbmd0aCAoRE8gTk9UIElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0ubGVuZ3RoID09IHJlbWFpbmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5zcGxpY2UoaSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsgaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXSwgMCBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGluZGV4IG9mIGxhcmdlc3QgY3V0IGxlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRTZXF1ZW5jZTsiLCJleHBvcnQgY2xhc3MgQ3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHVuY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCBvZiB1bmN1dCBwaWVjZSAoaW5jaGVzKSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmljZSBQcmljZSBvZiBwb3NzaWJsZSBsZW5ndGggKEFtZXJpY2FuIGNlbnRzIGV4LiAkOS44NyA9IDk4NylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgbGVuZ3RoLCBwcmljZSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAvL3RoaXMuY3Jvc3NTZWN0aW9uID0gbmV3IENyb3NzU2VjdGlvbih0aGlzLnRoaWNrbmVzcywgdGhpcy53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmN1dFBpZWNlO1xyXG4iLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRWxlbWVudCB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIEVsZW1lbnQgYXR0cmlidXRlIG5hbWVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIFxyXG4gKiBAcGFyYW0gIHsuLi5Ob2RlfSBjaGlsZHJlbiAtIFZhcmlhYmxlIG51bWJlciBvZiBjaGlsZCBub2RlcyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgICAvLyBQcm9wc1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hpbGRyZW4gTm9kZXNcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gZWxlbWVudC5hcHBlbmQoY2hpbGQpKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZExlbmd0aChpbnB1dEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHRlbXBWYWx1ZSA9IE51bWJlcihpbnB1dEVsZW1lbnQudmFsdWUpO1xyXG5cclxuICAgIGlmIChpc05hTih0ZW1wVmFsdWUpKSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCdNdXN0IGJlIGEgbnVtYmVyLicpO1xyXG4gICAgfSBlbHNlIGlmICh0ZW1wVmFsdWUgPD0gMCkge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEVsZW1lbnQucmVwb3J0VmFsaWRpdHkoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZFByaWNlKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgdGVtcFZhbHVlID0gTnVtYmVyKGlucHV0RWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgaWYgKGlzTmFOKHRlbXBWYWx1ZSkpIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgYSBudW1iZXIuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRlbXBWYWx1ZSA8IDApIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoJ011c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRFbGVtZW50LnJlcG9ydFZhbGlkaXR5KCk7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tZXllcl9yZXNldC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQztBQUVEOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBUztFQUNULFVBQVU7RUFDVixTQUFTO0VBQ1QsZUFBZTtFQUNmLGFBQWE7RUFDYix3QkFBd0IsRUFBQTs7QUFFekIsZ0RBQUE7QUFDQTs7RUFFQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxjQUFjLEVBQUE7O0FBRWY7RUFDQyxnQkFBZ0IsRUFBQTs7QUFFakI7RUFDQyxZQUFZLEVBQUE7O0FBRWI7O0VBRUMsV0FBVztFQUNYLGFBQWEsRUFBQTs7QUFFZDtFQUNDLHlCQUF5QjtFQUN6QixpQkFBaUIsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXG4gIC0tYmFzZS1ibGFjazogaHNsKDAsIDAlLCAxMCUpO1xcbiAgLS1wcmltYXJ5OiBicm93bjtcXG4gIC0tc2Vjb25kYXJ5OiBvcmFuZ2U7XFxuICAtLWhvdmVyOiBoc2woMCwgMCUsIDUwJSk7XFxuICAtLWFjdGl2ZTogaHNsKDAsIDAlLCAyNSUpO1xcbiAgLS1zdWNjZXNzOiBncmVlbjtcXG4gIC0taW5mbzogZ3JheTtcXG4gIC0td2FybmluZzogb3JhbmdlO1xcbiAgLS1kYW5nZXI6IHJlZDsgfVxcblxcbmh0bWwge1xcbiAgZm9udC1zaXplOiA2Mi41JTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpOyB9XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0OyB9XFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcciBcXFwibWFpbiBtYWluXFxcIlxcciBcXFwiZm9vdGVyIGZvb3RlclxcXCI7IH1cXG5cXG5oZWFkZXIsXFxubWFpbixcXG5mb290ZXIge1xcbiAgcGFkZGluZzogMS44cmVtOyB9XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyOyB9XFxuXFxubWFpbiB7XFxuICBncmlkLWFyZWE6IG1haW47XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAxZW07IH1cXG5cXG5mb290ZXIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBncmlkLWFyZWE6IGZvb3RlcjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyOyB9XFxuXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyLFxcbi5jbGVhci1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbiNjcmVhdGUtY3V0LWxpc3QtZXJyb3ItbXNnIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuXFxuLmN1dC1zZXF1ZW5jZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXG4gIGJvcmRlci10b3A6IG5vbmU7IH1cXG4gIC5jdXQtc2VxdWVuY2U6Zmlyc3QtY2hpbGQge1xcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spOyB9XFxuXFxuLmhpZGUge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5pbnB1dC1jb250YWluZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAuaW5wdXQtY29udGFpbmVyIGxhYmVsLCAuaW5wdXQtY29udGFpbmVyIGlucHV0IHtcXG4gICAgd2lkdGg6IDEwMCU7IH1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjsgfVxcblxcbi5tb2RhbC1jb250ZW50IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzg4ODtcXG4gIHdpZHRoOiA4MCU7XFxuICBoZWlnaHQ6IDUwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTsgfVxcblxcbi5tb2RhbC1jb250ZW50LWJ0bi1jb250YWluZXIsXFxuLnBpZWNlLWJ0bi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxuICBnYXA6IDFlbTsgfVxcblxcbi5waWVjZS1mb3JtLFxcbi5waWVjZS1saXN0IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTsgfVxcblxcbi5waWVjZS1mb3JtIC5waWVjZS1mb3JtLWlucHV0cyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGNvbHVtbi1nYXA6IDFyZW07XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAucGllY2UtZm9ybSAucGllY2UtZm9ybS1pbnB1dHMgLmlucHV0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7IH1cXG5cXG4ucGllY2UtZm9ybSAucGllY2UtZm9ybS1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5waWVjZS1saXN0IC5waWVjZS1saXN0LWhlYWQsXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtYm9keSA+IC5jdXQtcGllY2UsXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtYm9keSA+IC51bmN1dC1waWVjZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGNvbHVtbi1nYXA6IDFyZW07XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuXFxuLnBpZWNlLWxpc3QtYm9keSAuY3V0LXBpZWNlOm50aC1jaGlsZChvZGQpLFxcbi5waWVjZS1saXN0LWJvZHkgLnVuY3V0LXBpZWNlOm50aC1jaGlsZChvZGQpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWQ5ZDk7IH1cXG5cXG4ucGllY2UtbGlzdC1ib2R5IC5jdXQtcGllY2U6bnRoLWNoaWxkKGV2ZW4pLFxcbi5waWVjZS1saXN0LWJvZHkgLnVuY3V0LXBpZWNlOm50aC1jaGlsZChldmVuKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmZiZmJmOyB9XFxuXFxuaDEsIGgyLCBoMyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDEuN2VtOyB9XFxuXFxuaDIge1xcbiAgZm9udC1zaXplOiAxLjVlbTsgfVxcblxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogMS4yZW07IH1cXG5cXG50YWJsZSB7XFxuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICB0YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQob2RkKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWQ5ZDk7IH1cXG4gIHRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChldmVuKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiZmJmYmY7IH1cXG4gIHRhYmxlIHRoLCB0YWJsZSB0ZCB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7IH1cXG5cXG5idXR0b24sIGlucHV0W3R5cGU9c3VibWl0XSB7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICBidXR0b246aG92ZXIsIGlucHV0W3R5cGU9c3VibWl0XTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLCBncmF5KTtcXG4gICAgY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTsgfVxcbiAgYnV0dG9uOmFjdGl2ZSwgaW5wdXRbdHlwZT1zdWJtaXRdOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjdGl2ZSwgIzQwNDA0MCk7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQVVBO0VBQ0ksNkJBQWE7RUFDYiw2QkFBYTtFQUViLGdCQUFVO0VBQ1YsbUJBQVk7RUFFWix3QkFBUTtFQUNSLHlCQUFTO0VBRVQsZ0JBQVU7RUFDVixZQUFPO0VBQ1AsaUJBQVU7RUFDVixhQUFTLEVBQUE7O0FBR2I7RUFDSSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBRXRCLCtCQUErQjtFQUMvQiwwQ0FBMEMsRUFBQTs7QUFHOUM7RUFDSSxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxpQkFBaUI7RUFDakIsd0lBQXdJO0VBQ3hJLGlCQUFpQjtFQUVqQixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLGlDQUFpQztFQUNqQyxrRUFHbUIsRUFBQTs7QUFHdkI7OztFQUdJLGVBQWUsRUFBQTs7QUFLbkI7RUFDSSxpQkFBaUIsRUFBQTs7QUFLckI7RUFDSSxlQUFlO0VBQ2YsYUFBYTtFQUNiLFFBQVEsRUFBQTs7QUFLWjtFQUNJLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLG1CQUFtQixFQUFBOztBQUt2Qjs7RUFFSSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBRzNCO0VBQ0ksYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUIsRUFBQTs7QUFLdkI7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQyxnQkFBZ0IsRUFBQTtFQUpwQjtJQU9RLDhDQUE4QyxFQUFBOztBQUl0RDtFQUNJLGFBQWEsRUFBQTs7QUFHakI7RUFDSSxxQkFBcUIsRUFBQTtFQUR6QjtJQUlRLFdBQVcsRUFBQTs7QUFJbkI7RUFFSSxlQUFlO0VBQ2YsVUFBVTtFQUNWLE9BQU87RUFDUCxNQUFNO0VBQ04sV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2QsdUJBQThCO0VBQzlCLG9DQUFvQztFQUVwQyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHFCQUFxQixFQUFBOztBQUd6QjtFQUNJLHlCQUF5QjtFQUV6QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFVBQVU7RUFDVixXQUFXO0VBRVgsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QiwyQkFBMkIsRUFBQTs7QUFHL0I7O0VBRUksYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRLEVBQUE7O0FBR1o7O0VBRUksMENBQTBDLEVBQUE7O0FBSTlDO0VBaEtJLGFBQWE7RUFDYixxQ0FBNkM7RUFDN0MsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixtQkFBbUIsRUFBQTtFQTRKdkI7SUFRWSxhQUFhLEVBQUE7O0FBUnpCO0VBYVEsYUFBYTtFQUNiLHVCQUF1QixFQUFBOztBQUkvQjs7O0VBbExJLGFBQWE7RUFDYixxQ0FBNkM7RUFDN0MsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixtQkFBbUIsRUFBQTs7QUF3THZCOztFQUdRLHlCQUFpQyxFQUFBOztBQUh6Qzs7RUFRUSx5QkFBaUMsRUFBQTs7QUFNekM7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFJcEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFJcEI7RUFDSSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsa0JBQWtCLEVBQUE7RUFMdEI7SUFTWSx5QkFBaUMsRUFBQTtFQVQ3QztJQWFZLHlCQUFpQyxFQUFBO0VBYjdDO0lBa0JRLG9CQUFvQjtJQUNwQiwwQ0FBMEMsRUFBQTs7QUFJbEQ7RUFDSSxnQkFBZ0I7RUFDaEIsMENBQTBDO0VBQzFDLHFCQUFxQjtFQUNyQixlQUFlLEVBQUE7RUFKbkI7SUFPUSxvQ0FBK0M7SUFDL0MsK0JBQStCLEVBQUE7RUFSdkM7SUFZUSx3Q0FBZ0QsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuQG1peGluIGJhc2VHcmlkKCRuQ29sdW1uczogNikge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgkbkNvbHVtbnMsIDFmcik7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgICAtLWJhc2Utd2hpdGU6IGhzbCgwLCAwJSwgOTUlKTtcXHJcXG4gICAgLS1iYXNlLWJsYWNrOiBoc2woMCwgMCUsIDEwJSk7XFxyXFxuXFxyXFxuICAgIC0tcHJpbWFyeTogYnJvd247XFxyXFxuICAgIC0tc2Vjb25kYXJ5OiBvcmFuZ2U7XFxyXFxuXFxyXFxuICAgIC0taG92ZXI6IGhzbCgwLCAwJSwgNTAlKTtcXHJcXG4gICAgLS1hY3RpdmU6IGhzbCgwLCAwJSwgMjUlKTtcXHJcXG5cXHJcXG4gICAgLS1zdWNjZXNzOiBncmVlbjtcXHJcXG4gICAgLS1pbmZvOiBncmF5O1xcclxcbiAgICAtLXdhcm5pbmc6IG9yYW5nZTtcXHJcXG4gICAgLS1kYW5nZXI6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNjIuNSU7IC8vIDFyZW0gPSAxMHB4XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2Utd2hpdGUsIHdoaXRlKTtcXHJcXG59XFxyXFxuXFxyXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxyXFxuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXHJcXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMWZyO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcclxcbiAgICAgICAgXFxcImhlYWRlciBoZWFkZXJcXFwiXFxyXFxuICAgICAgICBcXFwibWFpbiBtYWluXFxcIlxcclxcbiAgICAgICAgXFxcImZvb3RlciBmb290ZXJcXFwiO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIsIFxcclxcbm1haW4sIFxcclxcbmZvb3RlciB7XFxyXFxuICAgIHBhZGRpbmc6IDEuOHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gSGVhZGVyXFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiBoZWFkZXI7XFxyXFxufVxcclxcblxcclxcbi8vIE1haW4gQ29udGVudFxcclxcblxcclxcbm1haW4ge1xcclxcbiAgICBncmlkLWFyZWE6IG1haW47XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdhcDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGb290ZXJcXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gICAgZ3JpZC1hcmVhOiBmb290ZXI7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8vIEN1c3RvbSBJRHNcXHJcXG5cXHJcXG4jY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXIsXFxyXFxuLmNsZWFyLWJ0bi1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2NyZWF0ZS1jdXQtbGlzdC1lcnJvci1tc2cge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8vIEN1c3RvbSBDbGFzc2VzXFxyXFxuXFxyXFxuLmN1dC1zZXF1ZW5jZSB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXHJcXG5cXHJcXG4gICAgJjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5oaWRlIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG5cXHJcXG4gICAgbGFiZWwsIGlucHV0IHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICAgIC8vZGlzcGxheTogbm9uZTsgLy8gSGlkZGVuIGJ5IGRlZmF1bHRcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkOyAvLyBTdGF5IGluIHBsYWNlXFxyXFxuICAgIHotaW5kZXg6IDE7IC8vIFNpdCBvbiB0b3BcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy8gRnVsbCB3aWR0aFxcclxcbiAgICBoZWlnaHQ6IDEwMCU7IC8vIEZ1bGwgaGVpZ2h0XFxyXFxuICAgIG92ZXJmbG93OiBhdXRvOyAvLyBFbmFibGUgc2Nyb2xsIGlmIG5lZWRlZFxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7IC8vIEZhbGxiYWNrIGNvbG9yXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTsgLy8gQmxhY2sgdy8gb3BhY2l0eVxcclxcbiAgICAvLyBHcmlkXFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRlbnQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcclxcbiAgICAvL21hcmdpbjogMTUlIGF1dG87IC8vIDE1JSBmcm9tIHRoZSB0b3AgYW5kIGNlbnRlcmVkXFxyXFxuICAgIHBhZGRpbmc6IDJyZW07XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxyXFxuICAgIHdpZHRoOiA4MCU7IC8vIENvdWxkIGJlIG1vcmUgb3IgbGVzcywgZGVwZW5kaW5nIG9uIHNjcmVlbiBzaXplXFxyXFxuICAgIGhlaWdodDogNTAlO1xcclxcbiAgICAvLyBHcmlkXFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250ZW50LWJ0bi1jb250YWluZXIsXFxyXFxuLnBpZWNlLWJ0bi1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcclxcbiAgICBnYXA6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWZvcm0sIFxcclxcbi5waWVjZS1saXN0IHtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICAvL21hcmdpbjogMXJlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtZm9ybSB7XFxyXFxuICAgIC8vIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgLy8gbWFyZ2luOiAxcmVtIDA7XFxyXFxuXFxyXFxuICAgIC5waWVjZS1mb3JtLWlucHV0cyB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBiYXNlR3JpZDtcXHJcXG5cXHJcXG4gICAgICAgIC5pbnB1dC1jb250YWluZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBpZWNlLWZvcm0tYnRuLWNvbnRhaW5lciB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBpZWNlLWxpc3Qge1xcclxcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuXFxyXFxuICAgIC5waWVjZS1saXN0LWhlYWQsIFxcclxcbiAgICAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSA+IC51bmN1dC1waWVjZSB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBiYXNlR3JpZDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtbGlzdC1ib2R5IHtcXHJcXG4gICAgLmN1dC1waWVjZTpudGgtY2hpbGQob2RkKSxcXHJcXG4gICAgLnVuY3V0LXBpZWNlOm50aC1jaGlsZChvZGQpIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAwJSwgODUlKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuY3V0LXBpZWNlOm50aC1jaGlsZChldmVuKSxcXHJcXG4gICAgLnVuY3V0LXBpZWNlOm50aC1jaGlsZChldmVuKSB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDc1JSk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gTWlzY1xcclxcblxcclxcbmgxLCBoMiwgaDMge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjdlbTtcXHJcXG59XFxyXFxuXFxyXFxuaDIge1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbiAgICAvL21hcmdpbjogMC44M2VtIDA7XFxyXFxufVxcclxcblxcclxcbmgzIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgLy9tYXJnaW46IDFlbSAwO1xcclxcbn1cXHJcXG5cXHJcXG50YWJsZSB7XFxyXFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgdGJvZHkge1xcclxcbiAgICAgICAgdHI6bnRoLWNoaWxkKG9kZCkge1xcclxcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAwJSwgODUlKTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIHRyOm50aC1jaGlsZChldmVuKSB7XFxyXFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCA3NSUpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIHRoLCB0ZCB7XFxyXFxuICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXHJcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5idXR0b24sIGlucHV0W3R5cGU9c3VibWl0XSB7XFxyXFxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXIsIGhzbCgwLCAwJSwgNTAlKSk7XFxyXFxuICAgICAgICBjb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjdGl2ZSwgaHNsKDAsIDAlLCAyNSUpKTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJfcmVzZXQuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVyX3Jlc2V0LnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZXMvbWV5ZXJfcmVzZXQuc2Nzcyc7XHJcbmltcG9ydCAnLi9zdHlsZXMvc3R5bGVzLnNjc3MnO1xyXG5pbXBvcnQgY3V0TGlzdENhbGN1bGF0b3IgZnJvbSAnLi9qcy9jdXRMaXN0Q2FsY3VsYXRvci5qcyc7XHJcbmltcG9ydCBDdXRQaWVjZSBmcm9tICcuL2pzL2N1dFBpZWNlLmpzJztcclxuaW1wb3J0IHtDcm9zc1NlY3Rpb24sIFVuY3V0UGllY2V9IGZyb20gJy4vanMvdW5jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Y3V0TGlzdH0gZnJvbSAnLi9qcy9jdXRMaXN0LmpzJztcclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50IGZyb20gJy4vanMvY29tcG9uZW50cy9jdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudC5qcyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwoY3V0UGllY2VzLCBwb3NzaWJsZUxlbmd0aHNBcnIpIHtcclxuICAgICAgICAvLyBTb3J0IGN1dFBpZWNlcyBieSBsZW5ndGggaW4gZGVjcmVhc2luZyBvcmRlclxyXG4gICAgICAgIGN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGluZGV4IGluIGNvcnJlc3BvbmRpbmcgXHJcbiAgICAgICAgLy8gaW5kaXZpZHVhbEN1dFBpZWNlcyBhcnJheS4gSWYgYSBpbmRpdmlkdWFsIEN1dFBpZWNlIGlzIHNlbGVjdGVkIGZvciBcclxuICAgICAgICAvLyBhIGN1dCBzZXF1ZW5jZSwgaXQncyBpbmRleCBpcyByZW1vdmVkIGZyb20gdGhpcyBhcnJheS5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgIHtsZW5ndGg6IGluZGl2aWR1YWxDdXRQaWVjZXMubGVuZ3RofSxcclxuICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gaW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgY3VyckN1dFNlcXVlbmNlLCB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgYmVzdEN1dDtcclxuICAgICAgICBsZXQgZmluYWxDdXRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBiZXN0Q3V0ID0ge1xyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBvc3NpYmxlTGVuZ3Roc0Fyci5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyckN1dFNlcXVlbmNlID0gY3V0TGlzdC5nZXRDdXRMaXN0KGxlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKGJlc3RDdXQuY3V0U2VxdWVuY2UgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICAgICB8fCAoYmVzdEN1dC5jdXRTZXF1ZW5jZVstMV0gPiBjdXJyQ3V0U2VxdWVuY2VbLTFdKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5jdXRTZXF1ZW5jZSA9IGN1cnJDdXRTZXF1ZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBbLi4udGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpbmFsQ3V0TGlzdC5wdXNoKGJlc3RDdXQuY3V0U2VxdWVuY2UpO1xyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWyAuLi5iZXN0Q3V0LmF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxDdXRMaXN0KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBmaXJzdCBwb3NzaWJsZSBsZW5ndGhcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYmVzdEN1dExpc3QgdG8gZmlyc3QgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZXQgY3V0IGxpc3QgZm9yIG5leHQgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgbmV3IGN1dCBsaXN0IGhhcyBsZXNzIHJlbWFpbmluZyBsZW5ndGggdGhhbiBiZXN0Q3V0TGlzdCwgc2V0IFxyXG4gICAgICAgIC8vIGJlc3RDdXRMaXN0IHRvIG5ldyBjdXQgbGlzdFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgcmVhY2ggZW5kIG9mIHBvc3NpYmxlIGxlbmd0aCBhcnJheSwgc2F2ZSBiZXN0Q3V0TGlzdCB0byBmaW5hbCBjdXQgbGlzdCBzZXF1ZW5jZVxyXG5cclxuICAgICAgICAvLyBSZXBlYXQgb25jZSBhZ2FpbiB3aXRoIHJlbWFpbmluZyBpbmRpdmlkdWFsQ3V0UGllY2VzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IEV4YW1wbGUnKTtcclxuXHJcbiAgICBsZXQgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxOS44NzUsIDMpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzOS44NzUsIDMpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA0OS44NzUsIDMpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjcm9zc1NlY3Rpb24yeDQgPSBuZXcgQ3Jvc3NTZWN0aW9uKDIsNCk7XHJcbiAgICBsZXQgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgMTIwLCAzODYpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTZWUtU2F3Jyk7XHJcbiAgICBcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzYsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzNSs1LzE2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzArMjEvMzIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAyMi41LCA0KSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uNHg0ID0gbmV3IENyb3NzU2VjdGlvbig0LDQpO1xyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoNCwgNCwgNzIsIDEyLjI4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSg0LCA0LCA5NiwgMTUuNDgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDQsIDQsIDEyMCwgMjIuMzgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDQsIDQsIDE0NCwgMjcuNDgpLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50LmluaXQoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQgPSBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudDtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFNhdyBIb3JzZXMnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCA0OCwgMjc1KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgMTQ0LCA0NjIpLFxyXG4gICAgXTtcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzYsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzMisxLzgsIDgpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAzNCwgMiksXHJcbiAgICBdO1xyXG5cclxuICAgIGN1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ1Rlc3Q6IFdvb2QgU2hlZCcpO1xyXG5cclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDk2LCAyOTgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKDIsIDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZSgyLCA0LCAxNDQsIDQ2MiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoMiwgNCwgMTYqMTIsIDYxNiksXHJcbiAgICBdO1xyXG4gICAgY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAxNSoxMisxMSwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzQsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCA3KjEyLCAzMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDguNSwgOCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDUqMTIrMTAsIDQpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzksIDYpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSgyLCA0LCAyKjEyKzExLjUsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBJU1NVRTogVmVyeSBsb25nIHRpbWVcclxuICAgIC8vZGVidWdnZXI7XHJcbiAgICAvL2N1dExpc3RDYWxjdWxhdG9yLmdldENoZWFwZXN0Q3V0TGlzdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuXHJcbiAgICB3aW5kb3cuY3V0TGlzdENhbGN1bGF0b3IgPSBjdXRMaXN0Q2FsY3VsYXRvcjtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJDb25maXJtTW9kYWxDb21wb25lbnQiLCJoYW5kbGVBY2NlcHQiLCJxdWVzdGlvblRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJhY2NlcHRUZXh0IiwicmVqZWN0VGV4dCIsImVsZW1lbnQiLCJoYW5kbGVBY2NlcHRDbGljayIsImUiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlIiwiaGFuZGxlUmVqZWN0Q2xpY2siLCJyZW5kZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiYWNjZXB0QnRuIiwicmVqZWN0QnRuIiwibW9kYWxDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJzdG9wUHJvcGFnYXRpb24iLCJGb290ZXIiLCJDdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQiLCJVbmN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCIsIkN1dFBpZWNlQ29tcG9uZW50IiwiQ3V0UGllY2VMaXN0Q29tcG9uZW50IiwiVW5jdXRQaWVjZUNvbXBvbmVudCIsIlVuY3V0UGllY2VMaXN0Q29tcG9uZW50IiwiQ3V0TGlzdENvbXBvbmVudCIsImN1dExpc3RDYWxjdWxhdG9yIiwiQ3V0UGllY2UiLCJVbmN1dFBpZWNlIiwiQ3Jvc3NTZWN0aW9uIiwiY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQiLCJiZXN0Q3V0TGlzdCIsImN1dFBpZWNlTGlzdENvbXBvbmVudCIsInVuY3V0UGllY2VMaXN0Q29tcG9uZW50IiwiY3V0TGlzdENvbXBvbmVudCIsImN1dExpc3RFcnJvckVsZW1lbnQiLCJpbml0IiwiaW5pdEN1dFBpZWNlcyIsImluaXRVbmN1dFBpZWNlcyIsImluaXRCZXN0Q3V0TGlzdCIsIm1haW5FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm9keSIsImhhbmRsZUN1dFBpZWNlTGlzdENsZWFyIiwiaGFuZGxlQ3V0UGllY2VBZGRGb3JtU3VibWl0IiwiaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhciIsImhhbmRsZVVuY3V0UGllY2VBZGRGb3JtU3VibWl0IiwiZm9yRWFjaCIsImN1dFBpZWNlIiwiYWRkQ3V0UGllY2UiLCJ1bmN1dFBpZWNlIiwiYWRkVW5jdXRQaWVjZSIsImNyZWF0ZUN1dExpc3RCdG4iLCJoYW5kbGVDcmVhdGVDdXRMaXN0Q2xpY2siLCJhZGRDdXRQaWVjZUNvbXBvbmVudCIsImhhbmRsZUN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlQ3V0UGllY2VEZWxldGVDbGljayIsImFkZFVuY3V0UGllY2VDb21wb25lbnQiLCJoYW5kbGVVbmN1dFBpZWNlRWRpdENsaWNrIiwiaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNsaWNrIiwicmVtb3ZlQ3V0UGllY2UiLCJjdXRQaWVjZVRvUmVtb3ZlIiwicmVtb3ZlVW5jdXRQaWVjZSIsInVuY3V0UGllY2VUb1JlbW92ZSIsInByZXZlbnREZWZhdWx0IiwiTnVtYmVyIiwidGFyZ2V0IiwiZWxlbWVudHMiLCJuYW1lZEl0ZW0iLCJ2YWx1ZSIsIm9sZEN1dFBpZWNlIiwibmV3Q3V0UGllY2UiLCJnZXRQaWVjZXMiLCJvbGRVbmN1dFBpZWNlIiwibmV3VW5jdXRQaWVjZSIsImN1dFBpZWNlVG9EZWxldGUiLCJwcmVwZW5kIiwiaGFuZGxlQ3V0UGllY2VEZWxldGVDb25maXJtIiwidW5jdXRQaWVjZVRvRGVsZXRlIiwiaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNvbmZpcm0iLCJjdXRQaWVjZXMiLCJ1bmN1dFBpZWNlcyIsInNob3dDdXRMaXN0RXJyb3IiLCJjbGVhckN1dExpc3RFcnJvciIsImdldENoZWFwZXN0Q3V0TGlzdCIsImN1dExpc3QiLCJjbGVhciIsImVycm9yTXNnIiwiY2xhc3NMaXN0IiwidGV4dENvbnRlbnQiLCJhZGQiLCJDdXRTZXF1ZW5jZUNvbXBvbmVudCIsIm1hdGVyaWFsTGlzdFRhYmxlIiwibWF0ZXJpYWxMaXN0IiwiZ2V0TWF0ZXJpYWxMaXN0IiwibWF0ZXJpYWxMaXN0VGFibGVCb2R5IiwidG90YWxQcmljZSIsImN1cnJQcmljZSIsInVuY3V0TGVuZ3RoIiwidW5jdXRPYmoiLCJPYmplY3QiLCJlbnRyaWVzIiwicXVhbnRpdHkiLCJ1bml0UHJpY2UiLCJ0b0ZpeGVkIiwiY3V0U2VxdWVuY2VzVGFibGUiLCJjdXRTZXF1ZW5jZXNUYWJsZUJvZHkiLCJjdXRTZXF1ZW5jZXMiLCJjdXRTZXF1ZW5jZSIsImFwcGVuZCIsIm5ld0N1dExpc3QiLCJDdXRQaWVjZUVkaXRGb3JtQ29tcG9uZW50IiwiZWRpdENhbGxiYWNrIiwiZGVsZXRlQ2FsbGJhY2siLCJoYW5kbGVFZGl0Q2xpY2siLCJjbGVhckVsZW1lbnQiLCJoYW5kbGVFZGl0Q29uZmlybSIsImhhbmRsZUVkaXRDYW5jZWwiLCJ0aGlja25lc3MiLCJ3aWR0aCIsImtlcmYiLCJoYW5kbGVEZWxldGVDbGljayIsImVkaXRCdG4iLCJkZWxldGVCdG4iLCJpc0lucHV0VmFsaWRMZW5ndGgiLCJoYW5kbGVGb3JtU3VibWl0IiwiZm9ybUVsZW1lbnQiLCJ0ZW1wSW5wdXRFbGVtZW50IiwiZm9ybUlucHV0c0VsZW1lbnQiLCJ1cGRhdGVGb3JtIiwiaW5wdXRFbGVtZW50IiwiaW5wdXROYW1lIiwiaW5kZXgiLCJhcnIiLCJkZWZhdWx0VmFsdWUiLCJmb2N1cyIsImZvcm1CdG5Db250YWluZXIiLCJjdXRQaWVjZUNvbXBvbmVudHMiLCJjdXRQaWVjZUxpc3RFbGVtZW50IiwiX2xlbiIsImN1dFBpZWNlQ29tcG9uZW50c1RvQWRkIiwiQXJyYXkiLCJfa2V5IiwicHVzaCIsImN1dFBpZWNlQ29tcG9uZW50IiwicmVtb3ZlQ3V0UGllY2VDb21wb25lbnQiLCJfbGVuMiIsImN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlIiwiX2tleTIiLCJpbmRleE9mIiwic3BsaWNlIiwiX2xlbjMiLCJjdXRQaWVjZXNUb1JlbW92ZSIsIl9rZXkzIiwiZmluZEluZGV4IiwibWFwIiwicm93RWxlbWVudHMiLCJ0ZW1wUm93RWxlbWVudCIsInJlbWFpbmluZ0xlbmd0aCIsImNvcHlyaWdodFllYXIiLCJmb290ZXIiLCJjdXJyWWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRlbXBFbGVtZW50IiwiaWQiLCJVbmN1dFBpZWNlRWRpdEZvcm1Db21wb25lbnQiLCJwcmljZSIsImlzSW5wdXRWYWxpZFByaWNlIiwidW5jdXRQaWVjZUNvbXBvbmVudHMiLCJ1bmN1dFBpZWNlTGlzdEVsZW1lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkIiwidW5jdXRQaWVjZUNvbXBvbmVudCIsInJlbW92ZVVuY3V0UGllY2VDb21wb25lbnQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlIiwidW5jdXRQaWVjZXNUb1JlbW92ZSIsIkN1dExpc3QiLCJjb25zdHJ1Y3RvciIsImdldFByaWNlIiwicmVkdWNlIiwiYWNjdW0iLCJjdXJyIiwiZGVlcENvcHkiLCJtYXRlcmlhbExpc3RPYmoiLCJnZXRDdXRMaXN0IiwiaW5kaXZpZHVhbEN1dFBpZWNlcyIsImF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJzdGFydEluZGV4Iiwic2VsZWN0ZWRDdXRQaWVjZUluZGV4IiwiaSIsImN1dFdpdGhLZXJmIiwic2VsZWN0ZWRDdXRQaWVjZSIsIkN1dFNlcXVlbmNlIiwiZ2V0RHluYW1pY05lc3RlZExvb3BDb3VudCIsIm51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwibWF4TnVtQXZhaWxhYmxlTGVuZ3RocyIsImxhc3ROb25aZXJvSW5kZXgiLCJmaW5kTGFzdEluZGV4IiwidmFsIiwiY291bnQiLCJzbGljZSIsImdldFBlcmNlbnRhZ2UiLCJudW0iLCJtYXhMYXN0Tm9uWmVyb0luZGV4IiwibWF4IiwicGVyY2VudGFnZSIsInNraXAiLCJmaXJzdE5vblplcm9WYWx1ZUluZGV4IiwiaW5jcmVtZW50IiwiZGVjcmVtZW50Iiwic29ydCIsImEiLCJiIiwiZmxhdE1hcCIsImZpbGwiLCJjdXRTZXF1ZW5jZUFyciIsImN1cnJDdXRMaXN0IiwiZnJvbSIsImNyZWF0ZUN1dFNlcXVlbmNlQXJyIiwiaW5jcmVtZW50VHJpZ2dlciIsImRlY3JlbWVudFRyaWdnZXIiLCJ0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJza2lwRmxhZyIsInBlcmNlbnRGYWN0b3JDb3VudGVyIiwicGVyY2VudE11bHRpcGxlRGlzcGxheSIsImZpbHRlciIsIndpbmRvdyIsInRvU3RyaW5nIiwiY3JlYXRlQ3V0U2VxdWVuY2UiLCJ0eXBlIiwicHJvcHMiLCJrZXkiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImNoaWxkIiwidGVtcFZhbHVlIiwiaXNOYU4iLCJzZXRDdXN0b21WYWxpZGl0eSIsInJlcG9ydFZhbGlkaXR5IiwiZ2V0Q3V0TGlzdFdpdGhMZWFzdExlZnRvdmVyTWF0ZXJpYWwiLCJwb3NzaWJsZUxlbmd0aHNBcnIiLCJjdXJyQ3V0U2VxdWVuY2UiLCJ0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsImJlc3RDdXQiLCJmaW5hbEN1dExpc3QiLCJjcm9zc1NlY3Rpb24yeDQiLCJjcm9zc1NlY3Rpb240eDQiXSwic291cmNlUm9vdCI6IiJ9