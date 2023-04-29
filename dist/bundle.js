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
    initCutPieces.forEach(cutPiece => addCutPiece(cutPiece));
    initUncutPieces.forEach(uncutPiece => addUncutPiece(uncutPiece));

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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-white: hsl(0, 0%, 95%);\n  --base-black: hsl(0, 0%, 10%); }\n\nhtml {\n  font-size: 62.5%;\n  box-sizing: border-box;\n  color: var(--base-black, black);\n  background-color: var(--base-white, white); }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  font-size: 1.6rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas: \"header header\"\r \"main main\"\r \"footer footer\"; }\n\nheader,\nmain,\nfooter {\n  padding: 1.8rem; }\n\nheader {\n  grid-area: header; }\n\nmain {\n  grid-area: main; }\n\nfooter {\n  font-size: 1.2rem;\n  grid-area: footer;\n  display: grid;\n  place-items: center; }\n\n#create-cut-list-btn-container,\n.clear-btn-container {\n  display: grid;\n  justify-content: center; }\n\n.cut-sequence {\n  display: grid;\n  grid-auto-flow: column;\n  border: 2px solid var(--base-black, black);\n  border-top: none; }\n  .cut-sequence:first-child {\n    border-top: 2px solid var(--base-black, black); }\n\n.input-container {\n  display: inline-block; }\n  .input-container label, .input-container input {\n    width: 100%; }\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4); }\n\n.modal-content {\n  background-color: #fefefe;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 80%; }\n\n.piece-create-form, .piece-list {\n  padding: 1rem; }\n\n.piece-create-form {\n  border: 2px solid var(--base-black, black);\n  margin: 1rem 0; }\n  .piece-create-form .form-inputs {\n    display: grid;\n    grid-template-columns: repeat(6, 1fr);\n    column-gap: 1rem; }\n    .piece-create-form .form-inputs .input-container {\n      display: grid; }\n  .piece-create-form .submit-container {\n    display: grid;\n    justify-content: center; }\n\n.piece-list .piece-list-head,\n.piece-list .piece-list-body > .cut-piece,\n.piece-list .piece-list-body > .uncut-piece {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  column-gap: 1rem; }\n\nh1, h2, h3 {\n  text-align: center; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  border: 2px solid var(--base-black, black);\n  text-align: center; }\n  table tbody tr:nth-child(odd) {\n    background-color: #d9d9d9; }\n  table tbody tr:nth-child(even) {\n    background-color: #bfbfbf; }\n  table th, table td {\n    padding: 0.5rem 1rem;\n    border: 2px solid var(--base-black, black); }\n", "",{"version":3,"sources":["webpack://./src/styles/styles.scss"],"names":[],"mappings":"AAQA;EACI,6BAAa;EACb,6BAAa,EAAA;;AAGjB;EACI,gBAAgB;EAChB,sBAAsB;EAEtB,+BAA+B;EAC/B,0CAA0C,EAAA;;AAG9C;EACI,mBAAmB,EAAA;;AAGvB;EACI,iBAAiB;EACjB,wIAAwI;EACxI,iBAAiB;EAEjB,aAAa;EACb,sCAAsC;EACtC,iCAAiC;EACjC,kEAGmB,EAAA;;AAGvB;;;EAGI,eAAe,EAAA;;AAKnB;EACI,iBAAiB,EAAA;;AAKrB;EACI,eAAe,EAAA;;AAKnB;EACI,iBAAiB;EACjB,iBAAiB;EACjB,aAAa;EACb,mBAAmB,EAAA;;AAKvB;;EAEI,aAAa;EACb,uBAAuB,EAAA;;AAa3B;EACI,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gBAAgB,EAAA;EAJpB;IAOQ,8CAA8C,EAAA;;AAItD;EACI,qBAAqB,EAAA;EADzB;IAIQ,WAAW,EAAA;;AAInB;EAEI,eAAe;EACf,UAAU;EACV,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,cAAc;EACd,uBAA8B;EAC9B,oCAAoC,EAAA;;AAGxC;EACI,yBAAyB;EACzB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,UAAU,EAAA;;AAGd;EACI,aAAa,EAAA;;AAGjB;EACI,0CAA0C;EAC1C,cAAc,EAAA;EAFlB;IA7HI,aAAa;IACb,qCAA6C;IAC7C,gBAAgB,EAAA;IA2HpB;MAQY,aAAa,EAAA;EARzB;IAaQ,aAAa;IACb,uBAAuB,EAAA;;AAI/B;;;EA/II,aAAa;EACb,qCAA6C;EAC7C,gBAAgB,EAAA;;AA+JpB;EACI,kBAAkB,EAAA;;AAGtB;EACI,mBAAmB;EACnB,WAAW;EACX,yBAAyB;EACzB,0CAA0C;EAC1C,kBAAkB,EAAA;EALtB;IASY,yBAAiC,EAAA;EAT7C;IAaY,yBAAiC,EAAA;EAb7C;IAkBQ,oBAAoB;IACpB,0CAA0C,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\n@mixin baseGrid($nColumns: 6) {\r\n    display: grid;\r\n    grid-template-columns: repeat($nColumns, 1fr);\r\n    column-gap: 1rem;\r\n}\r\n\r\n:root {\r\n    --base-white: hsl(0, 0%, 95%);\r\n    --base-black: hsl(0, 0%, 10%);\r\n}\r\n\r\nhtml {\r\n    font-size: 62.5%; // 1rem = 10px\r\n    box-sizing: border-box;\r\n\r\n    color: var(--base-black, black);\r\n    background-color: var(--base-white, white);\r\n}\r\n\r\n*, *::before, *::after {\r\n    box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n    font-size: 1.6rem;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    min-height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-columns: max-content 1fr;\r\n    grid-template-rows: auto 1fr auto;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"main main\"\r\n        \"footer footer\";\r\n}\r\n\r\nheader, \r\nmain, \r\nfooter {\r\n    padding: 1.8rem;\r\n}\r\n\r\n// Header\r\n\r\nheader {\r\n    grid-area: header;\r\n}\r\n\r\n// Main Content\r\n\r\nmain {\r\n    grid-area: main;\r\n}\r\n\r\n// Footer\r\n\r\nfooter {\r\n    font-size: 1.2rem;\r\n    grid-area: footer;\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n// Custom IDs\r\n\r\n#create-cut-list-btn-container,\r\n.clear-btn-container {\r\n    display: grid;\r\n    justify-content: center;\r\n}\r\n\r\n#cut-piece-create-form {\r\n\r\n}\r\n\r\n#uncut-piece-create-form {\r\n    \r\n}\r\n\r\n// Custom Classes\r\n\r\n.cut-sequence {\r\n    display: grid;\r\n    grid-auto-flow: column;\r\n    border: 2px solid var(--base-black, black);\r\n    border-top: none;\r\n\r\n    &:first-child {\r\n        border-top: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n\r\n.input-container {\r\n    display: inline-block;\r\n\r\n    label, input {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n.modal {\r\n    //display: none; // Hidden by default\r\n    position: fixed; // Stay in place\r\n    z-index: 1; // Sit on top\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%; // Full width\r\n    height: 100%; // Full height\r\n    overflow: auto; // Enable scroll if needed\r\n    background-color: rgb(0, 0, 0); // Fallback color\r\n    background-color: rgba(0, 0, 0, 0.4); // Black w/ opacity\r\n}\r\n\r\n.modal-content {\r\n    background-color: #fefefe;\r\n    margin: 15% auto; // 15% from the top and centered\r\n    padding: 20px;\r\n    border: 1px solid #888;\r\n    width: 80%; // Could be more or less, depending on screen size\r\n}\r\n\r\n.piece-create-form, .piece-list {\r\n    padding: 1rem;\r\n}\r\n\r\n.piece-create-form {\r\n    border: 2px solid var(--base-black, black);\r\n    margin: 1rem 0;\r\n\r\n    .form-inputs {\r\n        @include baseGrid;\r\n\r\n        .input-container {\r\n            display: grid;\r\n        }\r\n    }\r\n\r\n    .submit-container {\r\n        display: grid;\r\n        justify-content: center;\r\n    }\r\n}\r\n\r\n.piece-list {\r\n    .piece-list-head, \r\n    .piece-list-body > .cut-piece,\r\n    .piece-list-body > .uncut-piece {\r\n        @include baseGrid;\r\n    }\r\n\r\n    .piece-list-head {\r\n\r\n    }\r\n\r\n    .piece-list-body {\r\n\r\n    }\r\n}\r\n\r\n// Misc\r\n\r\nh1, h2, h3 {\r\n    text-align: center;\r\n}\r\n\r\ntable {\r\n    table-layout: fixed;\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    border: 2px solid var(--base-black, black);\r\n    text-align: center;\r\n\r\n    tbody {\r\n        tr:nth-child(odd) {\r\n            background-color: hsl(0, 0%, 85%);\r\n        }\r\n\r\n        tr:nth-child(even) {\r\n            background-color: hsl(0, 0%, 75%);\r\n        }\r\n    }\r\n\r\n    th, td {\r\n        padding: 0.5rem 1rem;\r\n        border: 2px solid var(--base-black, black);\r\n    }\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQzlCLElBQUlBLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDN0IsSUFBSUEsdURBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNuQzs7RUFFRDtFQUNBO0VBQ0E7O0VBRUFzTCxNQUFNLENBQUN2TCxpQkFBaUIsR0FBR0EsZ0VBQWlCO0FBQ2hELENBQUMsR0FBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2NvbmZpcm1Nb2RhbENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dExpc3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY29tcG9uZW50cy9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2N1dFBpZWNlTGlzdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvY3V0U2VxdWVuY2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2NvbXBvbmVudHMvdW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jb21wb25lbnRzL3VuY3V0UGllY2VMaXN0Q29tcG9uZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0TGlzdC5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL2N1dExpc3RDYWxjdWxhdG9yLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvanMvY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy9jdXRTZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2pzL3VuY3V0UGllY2UuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9qcy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvbWV5ZXJfcmVzZXQuc2NzcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL3NyYy9zdHlsZXMvbWV5ZXJfcmVzZXQuc2Nzcz9iMzBmIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9zcmMvc3R5bGVzL3N0eWxlcy5zY3NzPzIwM2IiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3IvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY3V0LWxpc3QtY2FsY3VsYXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2N1dC1saXN0LWNhbGN1bGF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jdXQtbGlzdC1jYWxjdWxhdG9yLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25maXJtTW9kYWxDb21wb25lbnQoaGFuZGxlQWNjZXB0LCBxdWVzdGlvblRleHQgPSAnQXJlIHlvdSBzdXJlPycsIGFjY2VwdFRleHQgPSAnWWVzJywgcmVqZWN0VGV4dCA9ICdObycpIHtcclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgXHJcbiAgICBjb25zdCBoYW5kbGVBY2NlcHRDbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgQWNjZXB0IENsaWNrJyk7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICBoYW5kbGVBY2NlcHQoZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVJlamVjdENsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNb2RhbCBSZWplY3QgQ2xpY2snKTtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdtb2RhbCd9KTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVJlamVjdENsaWNrKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWNjZXB0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sIGFjY2VwdFRleHQpO1xyXG4gICAgICAgIGNvbnN0IHJlamVjdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHt9LCByZWplY3RUZXh0KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIGFjY2VwdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFjY2VwdENsaWNrKTtcclxuICAgICAgICByZWplY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVSZWplY3RDbGljayk7XHJcblxyXG4gICAgICAgIC8vIE1vZGFsIENvbnRlbnRcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnbW9kYWwtY29udGVudCd9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgncCcsIHt9LCBxdWVzdGlvblRleHQpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ21vZGFsLWNvbnRlbnQtYnRuLWNvbnRhaW5lcid9LFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0QnRuLFxyXG4gICAgICAgICAgICAgICAgcmVqZWN0QnRuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudHMgY2xpY2sgbGlzdGVuZXIgb24gbW9kYWwgY29udGFpbmVyIGVsZW1lbnQgZnJvbSBhY3RpdmF0aW5nIHRoYXQgY2xvc2VzIG1vZGFsXHJcbiAgICAgICAgLy8gd2hlbmV2ZXIgdXNlciBjbGlja3MgaW5zaWRlIG1vZGFsIGNvbnRlbnQgZWxlbWVudCBpbnN0ZWFkLlxyXG4gICAgICAgIG1vZGFsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgRm9vdGVyIGZyb20gXCIuL2Zvb3Rlci5qc1wiO1xyXG5cclxuaW1wb3J0IEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IGZyb20gXCIuL3VuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50LmpzXCI7XHJcblxyXG5pbXBvcnQgQ3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0UGllY2VDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dFBpZWNlTGlzdENvbXBvbmVudCBmcm9tIFwiLi9jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IFVuY3V0UGllY2VDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUNvbXBvbmVudC5qc1wiO1xyXG5pbXBvcnQgVW5jdXRQaWVjZUxpc3RDb21wb25lbnQgZnJvbSBcIi4vdW5jdXRQaWVjZUxpc3RDb21wb25lbnQuanNcIjtcclxuaW1wb3J0IEN1dExpc3RDb21wb25lbnQgZnJvbSBcIi4vY3V0TGlzdENvbXBvbmVudC5qc1wiO1xyXG5cclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gXCIuLi9jdXRMaXN0Q2FsY3VsYXRvci5qc1wiO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSBcIi4uL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCB7VW5jdXRQaWVjZSwgQ3Jvc3NTZWN0aW9ufSBmcm9tIFwiLi4vdW5jdXRQaWVjZS5qc1wiO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbENvbXBvbmVudCBmcm9tIFwiLi9jb25maXJtTW9kYWxDb21wb25lbnQuanNcIjtcclxuXHJcbmNvbnN0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50ID0gKCgpID0+IHtcclxuICAgIGxldCBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICBsZXQgY3V0UGllY2VMaXN0Q29tcG9uZW50O1xyXG4gICAgbGV0IHVuY3V0UGllY2VMaXN0Q29tcG9uZW50O1xyXG4gICAgbGV0IGN1dExpc3RDb21wb25lbnQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdChpbml0Q3V0UGllY2VzID0gW10sIGluaXRVbmN1dFBpZWNlcyA9IFtdLCBpbml0QmVzdEN1dExpc3QgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IGluaXRCZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xyXG4gICAgICAgIGlmIChtYWluRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXNjcmlwdGlvblxyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgXHJcbiAgICAgICAgICAgICdEaW1lbnNpb25hbCBsdW1iZXIgY29tZXMgaW4gcHJlLWRldGVybWluZWQgbGVuZ3RocyB3aXRoIHRoZWlyIG93biBpbmRpdmlkdWFsIHByaWNlcyAoVW5jdXQgUGllY2VzKS4gR2l2ZW4gdGhlIGN1dCBsZW5ndGhzIG9mIGRpbWVuc2lvbmFsIGx1bWJlciByZXF1aXJlZCBmb3IgeW91ciBwcm9qZWN0IChDdXQgUGllY2VzKSBhbmQgdGhlIGF2YWlsYWJsZSBwcmUtZGV0ZXJtaW5lZCBsZW5ndGhzLCB0aGlzIGFwcCBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBhbW91bnQgb2YgbHVtYmVyIG5lZWRlZCBhbmQgcHJvdmlkZXMgdGhlIGN1dCBzZXF1ZW5jZSBmb3IgZWFjaCB1bmN1dCBwaWVjZS4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQvdW5jdXQgcGllY2VzIGxpc3Qgd2l0aCBjcmVhdGUgZm9ybSBhZnRlclxyXG5cclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gSGVhZGVyXHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDInLCB7fSwgJ0N1dCBQaWVjZXM6JykpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3V0UGllY2VMaXN0Q2xlYXIpO1xyXG4gICAgICAgIC8vIEN1dCBQaWVjZXMgLSBMaXN0XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gQ3V0UGllY2VMaXN0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VMaXN0Q29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICAvLyBDdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgQ3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50KGhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCkucmVuZGVyKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBIZWFkZXJcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdoMicsIHt9LCAnVW5jdXQgUGllY2VzOicpKTtcclxuICAgICAgICAvLyBVbmN1dCBQaWVjZXMgLSBDbGVhciBCdXR0b25cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjbGVhci1idG4tY29udGFpbmVyJ30pXHJcbiAgICAgICAgKS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgeydjbGFzcyc6ICdjbGVhci1idG4nfSwgJ0NsZWFyJylcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5jdXRQaWVjZUxpc3RDbGVhcik7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gTGlzdFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50ID0gVW5jdXRQaWVjZUxpc3RDb21wb25lbnQoKTtcclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW5kZXIoKSk7XHJcbiAgICAgICAgLy8gVW5jdXQgUGllY2VzIC0gQ3JlYXRlIEZvcm1cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlVW5jdXRQaWVjZUFkZEZvcm1TdWJtaXQpLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGFueSBjdXQvdW5jdXQgcGllY2VzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgaW5pdEN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSkgPT4gYWRkQ3V0UGllY2UoY3V0UGllY2UpKTtcclxuICAgICAgICBpbml0VW5jdXRQaWVjZXMuZm9yRWFjaCgodW5jdXRQaWVjZSkgPT4gYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBidXR0b24gdGhhdCBjcmVhdGVzIGN1dCBsaXN0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBjb25zdCBjcmVhdGVDdXRMaXN0QnRuID0gbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnaWQnOiAnY3JlYXRlLWN1dC1saXN0LWJ0bi1jb250YWluZXInfSlcclxuICAgICAgICApLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7J2lkJzogJ2NyZWF0ZS1jdXQtbGlzdC1idG4nfSwgJ0NyZWF0ZSBDdXQgTGlzdCcpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjcmVhdGVDdXRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGNhbGN1bGF0ZWQgY3V0IGxpc3RcclxuICAgICAgICBjdXRMaXN0Q29tcG9uZW50ID0gQ3V0TGlzdENvbXBvbmVudCgpO1xyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGN1dExpc3RDb21wb25lbnQucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZm9vdGVyIGNvbXBvbmVudCwgcGFzc2luZyBpbiB0aGUgZmlyc3QgeWVhciBvZiB0aGUgYXBwXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChGb290ZXIoMjAyMykucmVuZGVyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEN1dFBpZWNlKGN1dFBpZWNlKSB7XHJcbiAgICAgICAgY3V0UGllY2VMaXN0Q29tcG9uZW50LmFkZEN1dFBpZWNlQ29tcG9uZW50KFxyXG4gICAgICAgICAgICBDdXRQaWVjZUNvbXBvbmVudChjdXRQaWVjZSwgaGFuZGxlQ3V0UGllY2VFZGl0Q2xpY2ssIGhhbmRsZUN1dFBpZWNlRGVsZXRlQ2xpY2spXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1dFBpZWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFVuY3V0UGllY2UodW5jdXRQaWVjZSkge1xyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmFkZFVuY3V0UGllY2VDb21wb25lbnQoXHJcbiAgICAgICAgICAgIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSwgaGFuZGxlVW5jdXRQaWVjZUVkaXRDbGljaywgaGFuZGxlVW5jdXRQaWVjZURlbGV0ZUNsaWNrKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmN1dFBpZWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUN1dFBpZWNlKGN1dFBpZWNlVG9SZW1vdmUpIHtcclxuICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQucmVtb3ZlQ3V0UGllY2UoY3V0UGllY2VUb1JlbW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlVW5jdXRQaWVjZSh1bmN1dFBpZWNlVG9SZW1vdmUpIHtcclxuICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5yZW1vdmVVbmN1dFBpZWNlKHVuY3V0UGllY2VUb1JlbW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3V0UGllY2VBZGRGb3JtU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBDdXRQaWVjZSBmcm9tIGZvcm0gaW5wdXRzXHJcbiAgICAgICAgY29uc3QgY3V0UGllY2UgPSBuZXcgQ3V0UGllY2UoXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3RoaWNrbmVzcycpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2xlbmd0aCcpLnZhbHVlKSxcclxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgncXVhbnRpdHknKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ2tlcmYnKS52YWx1ZSlcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZEN1dFBpZWNlKGN1dFBpZWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVVbmN1dFBpZWNlQWRkRm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgVW5jdXRQaWVjZSBmcm9tIGZvcm0gaW5wdXRzXHJcbiAgICAgICAgY29uc3QgdW5jdXRQaWVjZSA9IG5ldyBVbmN1dFBpZWNlKFxyXG4gICAgICAgICAgICBuZXcgQ3Jvc3NTZWN0aW9uKE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3RoaWNrbmVzcycpLnZhbHVlKSwgTnVtYmVyKGUudGFyZ2V0LmVsZW1lbnRzLm5hbWVkSXRlbSgnd2lkdGgnKS52YWx1ZSkpLFxyXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZWxlbWVudHMubmFtZWRJdGVtKCdsZW5ndGgnKS52YWx1ZSksXHJcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5lbGVtZW50cy5uYW1lZEl0ZW0oJ3ByaWNlJykudmFsdWUpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYWRkVW5jdXRQaWVjZSh1bmN1dFBpZWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZUVkaXRDbGljayhlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VFZGl0Q2xpY2soZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVDdXRQaWVjZURlbGV0ZUNsaWNrKGN1dFBpZWNlVG9EZWxldGUpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoXHJcbiAgICAgICAgICAgIENvbmZpcm1Nb2RhbENvbXBvbmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVDdXRQaWVjZURlbGV0ZUNvbmZpcm0oY3V0UGllY2VUb0RlbGV0ZSlcclxuICAgICAgICAgICAgfSkucmVuZGVyKClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlRGVsZXRlQ29uZmlybShjdXRQaWVjZVRvRGVsZXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSBjdXQgcGllY2UgJyArIGN1dFBpZWNlVG9EZWxldGUpO1xyXG4gICAgICAgIHJlbW92ZUN1dFBpZWNlKGN1dFBpZWNlVG9EZWxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VEZWxldGVDbGljayh1bmN1dFBpZWNlVG9EZWxldGUpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoXHJcbiAgICAgICAgICAgIENvbmZpcm1Nb2RhbENvbXBvbmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmN1dFBpZWNlRGVsZXRlQ29uZmlybSh1bmN1dFBpZWNlVG9EZWxldGUpXHJcbiAgICAgICAgICAgIH0pLnJlbmRlcigpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVVbmN1dFBpZWNlRGVsZXRlQ29uZmlybSh1bmN1dFBpZWNlVG9EZWxldGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlIHVuY3V0IHBpZWNlICcgKyB1bmN1dFBpZWNlVG9EZWxldGUpO1xyXG4gICAgICAgIHJlbW92ZVVuY3V0UGllY2UodW5jdXRQaWVjZVRvRGVsZXRlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrKCkge1xyXG4gICAgICAgIGJlc3RDdXRMaXN0ID0gY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KFxyXG4gICAgICAgICAgICBjdXRQaWVjZUxpc3RDb21wb25lbnQuZ2V0UGllY2VzKCksIFxyXG4gICAgICAgICAgICB1bmN1dFBpZWNlTGlzdENvbXBvbmVudC5nZXRQaWVjZXMoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGN1dExpc3RDb21wb25lbnQuY3V0TGlzdCA9IGJlc3RDdXRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUN1dFBpZWNlTGlzdENsZWFyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGVhciBDdXQgTGlzdCcpO1xyXG5cclxuICAgICAgICAvLyBDbGVhciBjdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIGN1dFBpZWNlTGlzdENvbXBvbmVudC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuY3V0UGllY2VMaXN0Q2xlYXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NsZWFyIFVuY3V0IExpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdW5jdXQgcGllY2VzIGRpc3BsYXllZFxyXG4gICAgICAgIHVuY3V0UGllY2VMaXN0Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5pbXBvcnQgQ3V0U2VxdWVuY2VDb21wb25lbnQgZnJvbSBcIi4vY3V0U2VxdWVuY2VDb21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dExpc3RDb21wb25lbnQoY3V0TGlzdCkge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2lkJzogJ2N1dC1saXN0J30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1dExpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIEhlYWRlclxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDMnLCB7fSwgJ01hdGVyaWFsIExpc3Q6JykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZVxyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdFRhYmxlID0gZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEhlYWRcclxuICAgICAgICBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0aGVhZCcsIHt9LCBcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndHInLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdRdWFudGl0eScpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnVW5jdXQgTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdVbml0IFByaWNlJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAnY29sJ30sICdTdW0gUHJpY2UnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsIExpc3QgLSBUYWJsZSBCb2R5XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0ID0gY3V0TGlzdC5nZXRNYXRlcmlhbExpc3QoKTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbExpc3RUYWJsZUJvZHkgPSBtYXRlcmlhbExpc3RUYWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcclxuICAgICAgICBsZXQgdG90YWxQcmljZSA9IDA7XHJcbiAgICAgICAgbGV0IGN1cnJQcmljZTtcclxuICAgICAgICBmb3IgKGNvbnN0IFt1bmN1dExlbmd0aCwgdW5jdXRPYmpdIG9mIE9iamVjdC5lbnRyaWVzKG1hdGVyaWFsTGlzdCkpIHtcclxuICAgICAgICAgICAgY3VyclByaWNlID0gdW5jdXRPYmoucXVhbnRpdHkgKiB1bmN1dE9iai51bml0UHJpY2U7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlQm9keS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0T2JqLnF1YW50aXR5KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0TGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIHVuY3V0T2JqLnVuaXRQcmljZSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXJyUHJpY2UudG9GaXhlZCgyKSlcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gY3VyclByaWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHkgLSBUb3RhbCBQcmljZVxyXG4gICAgICAgIG1hdGVyaWFsTGlzdFRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RyJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsnY29sc3Bhbic6ICcyJ30pLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aCcsIHsnc2NvcGUnOiAncm93J30sICdUb3RhbCBQcmljZScpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCB0b3RhbFByaWNlLnRvRml4ZWQoMikpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIC8vIEN1dCBTZXF1ZW5jZXNcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ2gzJywge30sICdDdXQgU2VxdWVuY2VzOicpKTtcclxuXHJcbiAgICAgICAgLy8gQ3V0IFNlcXVlbmNlcyAtIFRhYmxlXHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VzVGFibGUgPSBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xyXG5cclxuICAgICAgICAvLyBDdXQgU2VxdWVuY2VzIC0gVGFibGUgSGVhZFxyXG4gICAgICAgIGN1dFNlcXVlbmNlc1RhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywge30sIFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0cicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RoJywgeydzY29wZSc6ICdjb2wnfSwgJ1VuY3V0IE1lbWJlcicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnQ3V0IExlbmd0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGgnLCB7J3Njb3BlJzogJ2NvbCd9LCAnUmVtYWluaW5nIExlbmd0aCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgLy8gTWF0ZXJpYWwgTGlzdCAtIFRhYmxlIEJvZHlcclxuICAgICAgICBjb25zdCBjdXRTZXF1ZW5jZXNUYWJsZUJvZHkgPSBjdXRTZXF1ZW5jZXNUYWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcclxuICAgICAgICBjdXRMaXN0LmN1dFNlcXVlbmNlcy5mb3JFYWNoKChjdXRTZXF1ZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICBjdXRTZXF1ZW5jZXNUYWJsZUJvZHkuYXBwZW5kKC4uLkN1dFNlcXVlbmNlQ29tcG9uZW50KGN1dFNlcXVlbmNlKS5yZW5kZXIoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXIsXHJcbiAgICAgICAgZ2V0IGN1dExpc3QoKSB7IHJldHVybiBjdXRMaXN0OyB9LFxyXG4gICAgICAgIHNldCBjdXRMaXN0KG5ld0N1dExpc3QpIHsgXHJcbiAgICAgICAgICAgIGN1dExpc3QgPSBuZXdDdXRMaXN0O1xyXG4gICAgICAgICAgICBjbGVhcigpO1xyXG4gICAgICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3V0UGllY2VDb21wb25lbnQoY3V0UGllY2UsIGVkaXRDYWxsYmFjaywgZGVsZXRlQ2FsbGJhY2spIHtcclxuICAgIGxldCBlbGVtZW50O1xyXG4gICAgXHJcbiAgICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZWRpdENhbGxiYWNrKGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVEZWxldGVDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlbGV0ZUNhbGxiYWNrKGN1dFBpZWNlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdjdXQtcGllY2UnfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgJ0VkaXQnKTtcclxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7fSwgJ0RlbGV0ZScpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBidXR0b25zXHJcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUVkaXRDbGljayk7XHJcbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGVsZXRlQ2xpY2spO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGN1dFBpZWNlLnRoaWNrbmVzcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS53aWR0aCksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjdXRQaWVjZS5jdXRMZW5ndGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2UucXVhbnRpdHkpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3V0UGllY2Uua2VyZiksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBcclxuICAgICAgICAgICAgICAgIGVkaXRCdG4sXHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0IGN1dFBpZWNlKCkgeyByZXR1cm4gY3V0UGllY2U7IH0sXHJcbiAgICAgICAgcmVtb3ZlLFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudChoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBsZXQgZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9ybUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogJycsXHJcbiAgICAgICAgICAgICdtZXRob2QnOiAnZ2V0JyxcclxuICAgICAgICAgICAgJ25hbWUnOiAnY3V0LXBpZWNlLWNyZWF0ZScsXHJcbiAgICAgICAgICAgICdpZCc6ICdjdXQtcGllY2UtY3JlYXRlLWZvcm0nLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiAncGllY2UtY3JlYXRlLWZvcm0nLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHNcclxuICAgICAgICBjb25zdCBmb3JtSW5wdXRzRWxlbWVudCA9IGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2Zvcm0taW5wdXRzJ30pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gVGhpY2tuZXNzXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtdGhpY2tuZXNzJ30sICdUaGlja25lc3M6JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsndHlwZSc6ICd0ZXh0JywgJ25hbWUnOiAndGhpY2tuZXNzJywgJ2lkJzogJ2N1dC10aGlja25lc3MnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAnY3V0LXdpZHRoJ30sICdXaWR0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICd3aWR0aCcsICdpZCc6ICdjdXQtd2lkdGgnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBMZW5ndGhcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAnY3V0LWxlbmd0aCcsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIFF1YW50aXR5XHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICdjdXQtcXVhbnRpdHknfSwgJ1F1YW50aXR5OicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnbnVtYmVyJywgJ25hbWUnOiAncXVhbnRpdHknLCAnaWQnOiAnY3V0LXF1YW50aXR5JywgJ3ZhbHVlJzogJzEnLCAnbWluJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0cyAtIEtlcmZcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ2N1dC1rZXJmJ30sICdLZXJmOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ2tlcmYnLCAnaWQnOiAnY3V0LWtlcmYnLCAndmFsdWUnOiAnMC4xMjUnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBTdWJtaXQgQ29udGFpbmVyXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnc3VibWl0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3N1Ym1pdCcsICd2YWx1ZSc6ICdBZGQnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdWJtaXQgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlRm9ybVN1Ym1pdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZmllbGRzIGZvciBjdXQgbGVuZ3RoIGFuZCBxdWFudGl0eSwgbGVhdmluZyBvdGhlciBpbnB1dHMgd2l0aCB1c2VyIGVudGVyZWQgZGF0YS5cclxuICAgICAgICAvLyBGb2N1cyBjdXJzb3Igb24gbGFzdCBpbnB1dCB3aGljaCBzaG91bGQgYmUgY3V0IGxlbmd0aCBmaWVsZFxyXG4gICAgICAgIFsncXVhbnRpdHknLCAnbGVuZ3RoJ10uZm9yRWFjaCgoaW5wdXROYW1lLCBpbmRleCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudCA9IGZvcm1FbGVtZW50LmVsZW1lbnRzLm5hbWVkSXRlbShpbnB1dE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBpbnB1dEVsZW1lbnQuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAoYXJyLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFBpZWNlTGlzdENvbXBvbmVudCgpIHtcclxuICAgIGxldCBjdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIGxldCBjdXRQaWVjZUxpc3RFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGFkZEN1dFBpZWNlQ29tcG9uZW50ID0gZnVuY3Rpb24oLi4uY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICAvLyBBZGQgY3V0IHBpZWNlIGNvbXBvbmVudHMgdG8gYXJyYXlcclxuICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMucHVzaCguLi5jdXRQaWVjZUNvbXBvbmVudHNUb0FkZCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjdXQgcGllY2UgY29tcG9uZW50cyB0byBET01cclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlQ29tcG9uZW50IG9mIGN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgICAgIGN1dFBpZWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3V0UGllY2VDb21wb25lbnQucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlQ3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi5jdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSkge1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1dFBpZWNlQ29tcG9uZW50IG9mIGN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gY3V0UGllY2VDb21wb25lbnRzLmluZGV4T2YoY3V0UGllY2VDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIERPTVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudC5yZW1vdmUoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICBjdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZUN1dFBpZWNlID0gZnVuY3Rpb24oLi4uY3V0UGllY2VzVG9SZW1vdmUpIHtcclxuICAgICAgICBsZXQgaW5kZXg7XHJcbiAgICAgICAgZm9yIChjb25zdCBjdXRQaWVjZVRvUmVtb3ZlIG9mIGN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gY3V0UGllY2VDb21wb25lbnRzLmZpbmRJbmRleCgoY3V0UGllY2VDb21wb25lbnQpID0+IGN1dFBpZWNlQ29tcG9uZW50LmN1dFBpZWNlID09PSBjdXRQaWVjZVRvUmVtb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gRE9NXHJcbiAgICAgICAgICAgIGN1dFBpZWNlQ29tcG9uZW50c1tpbmRleF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50IGZyb20gYXJyYXlcclxuICAgICAgICAgICAgY3V0UGllY2VDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjdXQgcGllY2UgY29tcG9uZW50cyBmcm9tIGFycmF5XHJcbiAgICAgICAgY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBlbGVtZW50cyBmcm9tIGRvY3VtZW50XHJcbiAgICAgICAgd2hpbGUgKGN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBjdXRQaWVjZUxpc3RFbGVtZW50LnJlbW92ZUNoaWxkKGN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRQaWVjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY3V0UGllY2VDb21wb25lbnRzLm1hcCgoY3V0UGllY2VDb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1dFBpZWNlQ29tcG9uZW50LmN1dFBpZWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgbGFiZWxzIGZvciBsaXN0ICh0YWJsZSBoZWFkKVxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdC1oZWFkJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdUaGlja25lc3MnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnV2lkdGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnTGVuZ3RoJyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1F1YW50aXR5JyksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ0tlcmYnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGxpc3QgYm9keSAodGFibGUgYm9keSlcclxuICAgICAgICBjdXRQaWVjZUxpc3RFbGVtZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtYm9keSd9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkQ3V0UGllY2VDb21wb25lbnQsXHJcbiAgICAgICAgY2xlYXIsXHJcbiAgICAgICAgZ2V0UGllY2VzLFxyXG4gICAgICAgIHJlbW92ZUN1dFBpZWNlLFxyXG4gICAgICAgIHJlbW92ZUN1dFBpZWNlQ29tcG9uZW50LFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1dFNlcXVlbmNlQ29tcG9uZW50KGN1dFNlcXVlbmNlKSB7XHJcbiAgICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCByb3dFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcy5mb3JFYWNoKChjdXRQaWVjZSwgaW5kZXgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wUm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBVbmN1dCBQaWVjZSAoZmlyc3Qgcm93IG9ubHkpXHJcbiAgICAgICAgICAgIC8vIEFkZCB1bmN1dCBwaWVjZSBpZiBmaXJzdCByb3cgT1IgYWRkIHJvdyB0aGF0IHNwYW5zIHJlc3Qgb2Ygcm93cyBmb3IgdGhpcyBjdXQgc2VxdWVuY2UuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7fSwgYCR7Y3V0U2VxdWVuY2UudW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24udGhpY2tuZXNzfXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UuY3Jvc3NTZWN0aW9uLndpZHRofXgke2N1dFNlcXVlbmNlLnVuY3V0UGllY2UubGVuZ3RofWApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93RWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHsncm93c3Bhbic6IGFyci5sZW5ndGggLSAxfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEN1dCBQaWVjZXNcclxuICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0ZCcsIHt9LCBjdXRQaWVjZS5jdXRMZW5ndGgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1haW5pbmcgTGVuZ3RoIChsYXN0IHJvdyBvbmx5KVxyXG4gICAgICAgICAgICAvLyBBZGQgcmVtYWluaW5nIGxlbmd0aCBpZiBsYXN0IHJvdyBPUiByb3cgdGhhdCBzcGFucyByZXN0IG9mIHJvd3MgZm9yIHRoaXMgY3V0IHNlcXVlbmNlLlxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ3RkJywge30sIGB3aXRoICR7Y3V0U2VxdWVuY2UucmVtYWluaW5nTGVuZ3RofSByZW1haW5pbmdgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgndGQnLCB7J3Jvd3NwYW4nOiBhcnIubGVuZ3RoIC0gMX0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm93IGVsZW1lbnQgdG8gYXJyYXkgb2Ygb3RoZXIgcm93IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIHJvd0VsZW1lbnRzLnB1c2godGVtcFJvd0VsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd0VsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKGNvcHlyaWdodFllYXIpIHtcclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAvLyBQYXJhZ3JhcGggZWxlbWVudCBhcyBjaGlsZCBvZiBmb290ZXJcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSBmb290ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcclxuXHJcbiAgICAgICAgLy8gU21hbGwgZWxlbWVudCBhcyBjaGlsZCBvZiBwYXJhZ3JhcGhcclxuICAgICAgICB0ZW1wRWxlbWVudCA9IHRlbXBFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NtYWxsJywge30sXHJcbiAgICAgICAgICAgICdTb3VyY2UgQ29kZSDCqSAnLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCd0aW1lJywge2lkOiAnY29weXJpZ2h0LXllYXInfSwgY3VyclllYXIgPiBjb3B5cmlnaHRZZWFyID8gYCR7Y29weXJpZ2h0WWVhcn0tJHtjdXJyWWVhcn1gIDogY29weXJpZ2h0WWVhciksXHJcbiAgICAgICAgICAgICcgVG9kZCBCcmVudGxpbmdlciwgU2FudGEgQ3J1eiwgQ0EsIFVTQS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4nXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb290ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7cmVuZGVyLH07XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuY3V0UGllY2VDb21wb25lbnQodW5jdXRQaWVjZSwgZWRpdENhbGxiYWNrLCBkZWxldGVDYWxsYmFjaykge1xyXG4gICAgbGV0IGVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0IGhhbmRsZUVkaXRDbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlZGl0Q2FsbGJhY2soZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZUNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGVsZXRlQ2FsbGJhY2sodW5jdXRQaWVjZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAndW5jdXQtcGllY2UnfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge30sICdEZWxldGUnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYnV0dG9uc1xyXG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0Q2xpY2spO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB1bmN1dFBpZWNlLmNyb3NzU2VjdGlvbi50aGlja25lc3MpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdW5jdXRQaWVjZS5jcm9zc1NlY3Rpb24ud2lkdGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdW5jdXRQaWVjZS5sZW5ndGgpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdW5jdXRQaWVjZS5wcmljZSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgXHJcbiAgICAgICAgICAgICAgICBlZGl0QnRuLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlQnRuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldCB1bmN1dFBpZWNlKCkgeyByZXR1cm4gdW5jdXRQaWVjZTsgfSxcclxuICAgICAgICByZW1vdmUsXHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVW5jdXRQaWVjZUNyZWF0ZUZvcm1Db21wb25lbnQoaGFuZGxlRm9ybVN1Ym1pdCkge1xyXG4gICAgbGV0IGZvcm1FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcm1FbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZm9ybScsIHtcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICcnLFxyXG4gICAgICAgICAgICAnbWV0aG9kJzogJ2dldCcsXHJcbiAgICAgICAgICAgICduYW1lJzogJ3VuY3V0LXBpZWNlLWNyZWF0ZScsXHJcbiAgICAgICAgICAgICdpZCc6ICd1bmN1dC1waWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgICAgICdjbGFzcyc6ICdwaWVjZS1jcmVhdGUtZm9ybScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIElucHV0c1xyXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHNFbGVtZW50ID0gZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnZm9ybS1pbnB1dHMnfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBUaGlja25lc3NcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LXRoaWNrbmVzcyd9LCAnVGhpY2tuZXNzOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3RoaWNrbmVzcycsICdpZCc6ICd1bmN1dC10aGlja25lc3MnLCAnc2l6ZSc6ICcxJ30pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBGb3JtIC0gRm9ybSBJbnB1dHMgLSBXaWR0aFxyXG4gICAgICAgIGZvcm1JbnB1dHNFbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2lucHV0LWNvbnRhaW5lcid9LCBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeydmb3InOiAndW5jdXQtd2lkdGgnfSwgJ1dpZHRoOicpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAndGV4dCcsICduYW1lJzogJ3dpZHRoJywgJ2lkJzogJ3VuY3V0LXdpZHRoJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gTGVuZ3RoXHJcbiAgICAgICAgZm9ybUlucHV0c0VsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAnaW5wdXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7J2Zvcic6ICd1bmN1dC1sZW5ndGgnfSwgJ0xlbmd0aDonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdsZW5ndGgnLCAnaWQnOiAndW5jdXQtbGVuZ3RoJywgJ3NpemUnOiAnMSd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gRm9ybSAtIEZvcm0gSW5wdXRzIC0gUHJpY2VcclxuICAgICAgICBmb3JtSW5wdXRzRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdpbnB1dC1jb250YWluZXInfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsnZm9yJzogJ3VuY3V0LXByaWNlJ30sICdQcmljZTonKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywgeyd0eXBlJzogJ3RleHQnLCAnbmFtZSc6ICdwcmljZScsICdpZCc6ICd1bmN1dC1wcmljZScsICdzaXplJzogJzEnfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEZvcm0gLSBGb3JtIFN1Ym1pdCBDb250YWluZXJcclxuICAgICAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdzdWJtaXQtY29udGFpbmVyJ30sIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7J3R5cGUnOiAnc3VibWl0JywgJ3ZhbHVlJzogJ0FkZCd9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHN1Ym1pdCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIGZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVGb3JtU3VibWl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1TdWJtaXQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUZvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBSZXNldCBpbnB1dCBmaWVsZHMgZm9yIGN1dCBsZW5ndGggYW5kIHF1YW50aXR5LCBsZWF2aW5nIG90aGVyIGlucHV0cyB3aXRoIHVzZXIgZW50ZXJlZCBkYXRhLlxyXG4gICAgICAgIC8vIEZvY3VzIGN1cnNvciBvbiBsYXN0IGlucHV0IHdoaWNoIHNob3VsZCBiZSBjdXQgbGVuZ3RoIGZpZWxkXHJcbiAgICAgICAgWydwcmljZScsICdsZW5ndGgnXS5mb3JFYWNoKChpbnB1dE5hbWUsIGluZGV4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50ID0gZm9ybUVsZW1lbnQuZWxlbWVudHMubmFtZWRJdGVtKGlucHV0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IGlucHV0RWxlbWVudC5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IChhcnIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyLFxyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVW5jdXRQaWVjZUxpc3RDb21wb25lbnQoKSB7XHJcbiAgICBsZXQgdW5jdXRQaWVjZUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICBsZXQgZWxlbWVudDtcclxuICAgIGxldCB1bmN1dFBpZWNlTGlzdEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgYWRkVW5jdXRQaWVjZUNvbXBvbmVudCA9IGZ1bmN0aW9uKC4uLnVuY3V0UGllY2VDb21wb25lbnRzVG9BZGQpIHtcclxuICAgICAgICB1bmN1dFBpZWNlQ29tcG9uZW50cy5wdXNoKC4uLnVuY3V0UGllY2VDb21wb25lbnRzVG9BZGQpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdW5jdXRQaWVjZUNvbXBvbmVudCBvZiB1bmN1dFBpZWNlQ29tcG9uZW50c1RvQWRkKSB7XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh1bmN1dFBpZWNlQ29tcG9uZW50LnJlbmRlcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZVVuY3V0UGllY2VDb21wb25lbnQgPSBmdW5jdGlvbiguLi51bmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIGZvciAoY29uc3QgdW5jdXRQaWVjZUNvbXBvbmVudCBvZiB1bmN1dFBpZWNlQ29tcG9uZW50c1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdW5jdXRQaWVjZUNvbXBvbmVudHMuaW5kZXhPZih1bmN1dFBpZWNlQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudCBmcm9tIERPTVxyXG4gICAgICAgICAgICB1bmN1dFBpZWNlQ29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50IGZyb20gYXJyYXlcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbW92ZVVuY3V0UGllY2UgPSBmdW5jdGlvbiguLi51bmN1dFBpZWNlc1RvUmVtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgIGZvciAoY29uc3QgdW5jdXRQaWVjZVRvUmVtb3ZlIG9mIHVuY3V0UGllY2VzVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB1bmN1dFBpZWNlQ29tcG9uZW50cy5maW5kSW5kZXgoKHVuY3V0UGllY2VDb21wb25lbnQpID0+IHVuY3V0UGllY2VDb21wb25lbnQudW5jdXRQaWVjZSA9PT0gdW5jdXRQaWVjZVRvUmVtb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB1bmN1dCBwaWVjZSBjb21wb25lbnQgZnJvbSBET01cclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHNbaW5kZXhdLnJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdW5jdXQgcGllY2UgY29tcG9uZW50IGZyb20gYXJyYXlcclxuICAgICAgICAgICAgdW5jdXRQaWVjZUNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHVuY3V0IHBpZWNlIGNvbXBvbmVudHMgZnJvbSBhcnJheVxyXG4gICAgICAgIHVuY3V0UGllY2VDb21wb25lbnRzID0gW107XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBlbGVtZW50cyBmcm9tIGRvY3VtZW50XHJcbiAgICAgICAgd2hpbGUgKHVuY3V0UGllY2VMaXN0RWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHVuY3V0UGllY2VMaXN0RWxlbWVudC5yZW1vdmVDaGlsZCh1bmN1dFBpZWNlTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRQaWVjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdW5jdXRQaWVjZUNvbXBvbmVudHMubWFwKCh1bmN1dFBpZWNlQ29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmN1dFBpZWNlQ29tcG9uZW50LnVuY3V0UGllY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsnY2xhc3MnOiAncGllY2UtbGlzdCd9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBsYWJlbHMgZm9yIGxpc3QgKHRhYmxlIGhlYWQpXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JywgeydjbGFzcyc6ICdwaWVjZS1saXN0LWhlYWQnfSwgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgJ1RoaWNrbmVzcycpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdXaWR0aCcpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge30sICdMZW5ndGgnKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCAnUHJpY2UnKSxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaXN0IGJvZHkgKHRhYmxlIGJvZHkpXHJcbiAgICAgICAgdW5jdXRQaWVjZUxpc3RFbGVtZW50ID0gZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ3BpZWNlLWxpc3QtYm9keSd9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkVW5jdXRQaWVjZUNvbXBvbmVudCxcclxuICAgICAgICBjbGVhcixcclxuICAgICAgICBnZXRQaWVjZXMsXHJcbiAgICAgICAgcmVtb3ZlVW5jdXRQaWVjZSxcclxuICAgICAgICByZW1vdmVVbmN1dFBpZWNlQ29tcG9uZW50LFxyXG4gICAgICAgIHJlbmRlcixcclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEN1dExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoY3V0U2VxdWVuY2VzID0gW10pIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IGN1dFNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmN1dFNlcXVlbmNlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goY3V0U2VxdWVuY2UpIHtcclxuICAgICAgICAvLyBUT0RPOiBUeXBlIGNoZWNrXHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLnB1c2goY3V0U2VxdWVuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaWNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1dFNlcXVlbmNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIudW5jdXRQaWVjZS5wcmljZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVlcENvcHkoKSB7XHJcbiAgICAgICAgbGV0IGN1dExpc3QgPSBuZXcgQ3V0TGlzdCgpO1xyXG4gICAgICAgIGN1dExpc3QuY3V0U2VxdWVuY2VzID0gWy4uLnRoaXMuY3V0U2VxdWVuY2VzXTtcclxuICAgICAgICByZXR1cm4gY3V0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXRlcmlhbExpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMaXN0T2JqID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuY3V0U2VxdWVuY2VzLmZvckVhY2goKGN1dFNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aCBpbiBtYXRlcmlhbExpc3RPYmopIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0ucXVhbnRpdHkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdE9ialtjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdFByaWNlOiBjdXRTZXF1ZW5jZS51bmN1dFBpZWNlLnByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWxMaXN0T2JqO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3V0TGlzdCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBsaXN0IG9mIEN1dFBpZWNlcyBhbmQgbWluaW1hbCByZW1haW5pbmcgbGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpbmluZ0xlbmd0aCBcclxuICAgICAqIEBwYXJhbSB7W0N1dFBpZWNlXX0gaW5kaXZpZHVhbEN1dFBpZWNlcyBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRJbmRleCAoZGVmYXVsdCA9IDApIFxyXG4gICAgICogQHJldHVybnMge1suLi5DdXRQaWVjZSwgTnVtYmVyXX0gQXJyYXkgb2YgQ3V0UGllY2VzIHdpdGggbGVmdG92ZXIgbGVuZ3RoIG9mIHdob2xlIHBpZWNlIGF0IHRoZSBlbmRcclxuICAgICAqL1xyXG4gICAgZ2V0Q3V0TGlzdDogKHJlbWFpbmluZ0xlbmd0aCwgaW5kaXZpZHVhbEN1dFBpZWNlcywgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgc3RhcnRJbmRleCA9IDApID0+IHtcclxuICAgICAgICAvLyBSZXR1cm4gaWYgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRDdXRQaWVjZUluZGV4O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1dExlbmd0aCBlcXVhbCB0byByZW1haW5pbmcgbGVuZ3RoIChETyBOT1QgSU5DTFVERSBLRVJGKVxyXG4gICAgICAgICAgICBpZiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRMZW5ndGggPT0gcmVtYWluaW5nTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIHNlbGVjdGVkIGZvciB0aGFuIG9uY2UuXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShpLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWyBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLCAwIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggb2YgbGFyZ2VzdCBjdXRMZW5ndGggdGhhdCBjYW4gYmUgY3V0IHdpdGggcmVtYWluaW5nTGVuZ3RoIChJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmICgoc2VsZWN0ZWRDdXRQaWVjZUluZGV4ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAmJiAoaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4W2ldXS5jdXRXaXRoS2VyZiA8IHJlbWFpbmluZ0xlbmd0aClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzZWxlY3RlZEN1dFBpZWNlSW5kZXggaXMgc3RpbGwgdW5kZWZpbmVkIC0gQWxsIGN1dExlbmd0aCtrZXJmIGFyZSBtb3JlIHRoYW4gcmVtYWluaW5nTGVuZ3RoXHJcbiAgICAgICAgLy8gUmV0dXJuIGp1c3QgcmVtYWluaW5nIGxlbmd0aFxyXG4gICAgICAgIGlmIChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIHJlbWFpbmluZ0xlbmd0aCBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1dFBpZWNlIGluZGV4IGZyb20gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCB0byBhdm9pZCBzYW1lIGN1dFBpZWNlXHJcbiAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEN1dFBpZWNlID0gaW5kaXZpZHVhbEN1dFBpZWNlc1thdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LnNwbGljZShzZWxlY3RlZEN1dFBpZWNlSW5kZXgsIDEpXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZSwgXHJcbiAgICAgICAgICAgIC4uLmN1dExpc3QuZ2V0Q3V0TGlzdChcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ0xlbmd0aCAtIHNlbGVjdGVkQ3V0UGllY2UuY3V0V2l0aEtlcmYsIFxyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEN1dFBpZWNlcyxcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlSW5kZXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3V0TGlzdDtcclxuIiwiaW1wb3J0IHsgQ3V0TGlzdCB9IGZyb20gXCIuL2N1dExpc3QuanNcIjtcclxuaW1wb3J0IEN1dFNlcXVlbmNlIGZyb20gXCIuL2N1dFNlcXVlbmNlLmpzXCI7XHJcblxyXG4vKipcclxuICogVE9ETzogV2hpbGUgbG9vcGluZyB0aHJvdWdoIGNvbWJpbmF0aW9ucyBvZiB1bmN1dCBwaWVjZXMsIGlmIHRoZSBjb21iaW5hdGlvbiBcclxuICogcHJpY2UgaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgYmVzdCBjdXQgbGlzdCBwcmljZSwgdGhlbiBjYW4gc2tpcC5cclxuICovXHJcblxyXG5jb25zdCBjdXRMaXN0Q2FsY3VsYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgYmVzdEN1dExpc3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7W051bWJlcl19IG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gbWF4TnVtQXZhaWxhYmxlTGVuZ3RocyBcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIC8qKlxyXG4gICAgICogSG93IHRvIGdldCBudW1iZXIgZnJvbSBjb3VudGVyP1xyXG4gICAgICogbWF4ID0gWzUsNCwzLDJdXHJcbiAgICAgKiBwb3NzaWJpbGl0aWVzID0gNio1KjQqMyA9IDM2MFxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzMsMCwwLDBdXHJcbiAgICAgKiBbMF0gMVxyXG4gICAgICogWzNdICszXHJcbiAgICAgKiA0XHJcbiAgICAgKiAtIEZpcnN0IGluZGV4IGlzIGxhc3Qgbm9uLXplcm8gaW5kZXgsIGFkZCBmaXJzdCBpbmRleCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICogMyArIDEgPSA0XHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbNSwwLDAsMF1cclxuICAgICAqIC0gRmlyc3QgaW5kZXggaXMgbGFzdCBub24temVybyBpbmRleCwgYWRkIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgKiA1ICsgMSA9IDZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFszLDIsMCwwXVxyXG4gICAgICogWzAsMF0gMVxyXG4gICAgICogWzUsMF0gKzVcclxuICAgICAqIFswLDFdICsxXHJcbiAgICAgKiBbNSwxXSArNVxyXG4gICAgICogWzAsMl0gKzFcclxuICAgICAqIFszLDJdICszXHJcbiAgICAgKiAxNlxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbMCwyXSArMVxyXG4gICAgICogWzMsMl0gKzNcclxuICAgICAqIDE2XHJcbiAgICAgKiAtIEZpcnN0IG5vbi16ZXJvIGluZGV4ICgxKSB2YWx1ZSAoMikgKiBwcmV2IGluZGV4ICgwKSBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIDEgKDUrMT02KVxyXG4gICAgICogMiAqIDYgPSAxMlxyXG4gICAgICogLSBQbHVzIGZpcnN0IGluZGV4ICgwKSB2YWx1ZSBwbHVzIDEgKDMrMT00KVxyXG4gICAgICogMTIgKyA0ID0gMTZcclxuICAgICAqIFxyXG4gICAgICogY291bnRlciA9IFs1LDQsMCwwXVxyXG4gICAgICogWzUsMF0gKzZcclxuICAgICAqIFs1LDFdICs2XHJcbiAgICAgKiBbNSwyXSArNlxyXG4gICAgICogWzUsM10gKzZcclxuICAgICAqIFs1LDRdICs2XHJcbiAgICAgKiAzMFxyXG4gICAgICogLSBGaXJzdCBub24temVybyBpbmRleCAoMSkgdmFsdWUgKDQpICogcHJldiBpbmRleCAoMCkgY29ycmVzcG9uZGluZyBtYXggdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDQgKiA2ID0gMjRcclxuICAgICAqIC0gUGx1cyBmaXJzdCBpbmRleCAoMCkgdmFsdWUgcGx1cyAxICg1KzE9NilcclxuICAgICAqIDI0ICsgNiA9IDMwXHJcbiAgICAgKiBcclxuICAgICAqIGNvdW50ZXIgPSBbMCwwLDEsMF1cclxuICAgICAqIFs1LDQsMCwwXSArMzBcclxuICAgICAqIFswLDAsMSwwXSArMVxyXG4gICAgICogMzFcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoMCsxPTEpXHJcbiAgICAgKiAxXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDApICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMSArIDAgKiA2ID0gMVxyXG4gICAgICogLSBQbHVzIG5leHQgaW5kZXggKDIpIHZhbHVlICgxKSAqIChwcm9kdWN0IG9mIHByZXYgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCBwbHVzIG9uZSlcclxuICAgICAqIDEgKyAxICogKDYqNSkgPSAzMVxyXG4gICAgICogXHJcbiAgICAgKiBjb3VudGVyID0gWzUsNCwzLDJdXHJcbiAgICAgKiAzNjBcclxuICAgICAqIC0gRmlyc3QgaW5kZXggKDApIHZhbHVlIHBsdXMgMSAoNSsxPTYpXHJcbiAgICAgKiA2XHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMSkgdmFsdWUgKDQpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogNiArIDQgKiA2ID0gMzBcclxuICAgICAqIC0gUGx1cyBuZXh0IGluZGV4ICgyKSB2YWx1ZSAoMykgKiAocHJvZHVjdCBvZiBwcmV2IGluZGljZXMgY29ycmVzcG9uZGluZyBtYXggcGx1cyBvbmUpXHJcbiAgICAgKiAzMCArIDMgKiAoNio1KSA9IDMwICsgMyAqIDMwID0gMTIwXHJcbiAgICAgKiAtIFBsdXMgbmV4dCBpbmRleCAoMykgdmFsdWUgKDIpICogKHByb2R1Y3Qgb2YgcHJldiBpbmRpY2VzIGNvcnJlc3BvbmRpbmcgbWF4IHBsdXMgb25lKVxyXG4gICAgICogMTIwICsgMiAqICg2KjUqNCkgPSAxMjAgKyAyICogMTIwID0gMTIwICsgMjQwID0gMzYwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldER5bmFtaWNOZXN0ZWRMb29wQ291bnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICAvLyBJZiBhcnJheSBpcyBlbXB0eSByZXR1cm4gemVyb1xyXG4gICAgICAgIGlmICghbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsYXN0Tm9uWmVyb0luZGV4ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICAvLyBJZiBsYXN0Tm9uWmVyb0luZGV4IGlzIC0xLCBhbGwgdmFsdWVzIG9mIGFycmF5IGFyZSB6ZXJvLiBSZXR1cm4gb25lIGNvdW50LlxyXG4gICAgICAgIGlmIChsYXN0Tm9uWmVyb0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHJlYWNoIGhlcmUsIGxhc3ROb25aZXJvSW5kZXggPj0gMCBhZnRlciBmaW5kTGFzdEluZGV4KCkgY2FsbFxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIGNvdW50IHRvIGZpcnN0IGluZGV4IHZhbHVlIHBsdXMgb25lXHJcbiAgICAgICAgbGV0IGNvdW50ID0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbMF0gKyAxO1xyXG5cclxuICAgICAgICAvLyBGb3IgZXZlcnkgaW5kZXggYWZ0ZXIgdGhlIGZpcnN0IHVwIHRvIGxhc3ROb25aZXJvSW5kZXgsIGFkZCB0aGUgXHJcbiAgICAgICAgLy8gcHJvZHVjdCBvZiBhbGwgcHJldmlvdXMgaW5kaWNlcyBjb3JyZXNwb25kaW5nIG1heCB2YWx1ZSBwbHVzIG9uZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxhc3ROb25aZXJvSW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBjb3VudCArPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpXSAqIG1heE51bUF2YWlsYWJsZUxlbmd0aHMuc2xpY2UoMCwgaSkucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKiAoY3VyciArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpIHtcclxuICAgICAgICBjb25zdCBudW0gPSBnZXREeW5hbWljTmVzdGVkTG9vcENvdW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF4TGFzdE5vblplcm9JbmRleCA9IG1heE51bUF2YWlsYWJsZUxlbmd0aHMuZmluZExhc3RJbmRleCgodmFsKSA9PiB2YWwgPiAwKTtcclxuICAgICAgICBjb25zdCBtYXggPSBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBtYXhMYXN0Tm9uWmVyb0luZGV4ID09PSAtMSA/IG1heE51bUF2YWlsYWJsZUxlbmd0aHMubGVuZ3RoIDogbWF4TGFzdE5vblplcm9JbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbCkgPT4gdmFsICsgMSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICogY3Vycik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChudW0gLyBtYXgpICogMTAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYE51bTogJHtudW19IC0gTWF4OiAke21heH0gLSAlJHtwZXJjZW50YWdlLnRvRml4ZWQoMil9YCk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2tpcChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3Rocykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV4LiBjdXJyPVsxLDMsMCwwXSBtYXg9WzMsNCw0LDVdIHJlc3VsdHMgaW4gYSB2YWxpZCBjdXQgbGlzdC5cclxuICAgICAgICAgKiBOZXh0IGluY3JlbWVudHMgb2YgWzIsMywwLDBdIGFuZCBbMywzLDAsMF0gd2lsbCBhbHdheXMgYmUgbW9yZSBleHBlbnNpdmUgdGhhbiBbMSwzLDAsMF0uXHJcbiAgICAgICAgICogTWFrZSBmaXJzdCBub24temVybyB2YWx1ZSAwIGFuZCBpbmNyZW1lbnQgdmFsdWUgYWZ0ZXIuXHJcbiAgICAgICAgICogWzAsNCwwLDBdIC0+IGNvbnRpbnVlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID4gMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBlbXB0eSBPUiBhbGwgdmFsdWVzIGFyZSB6ZXJvXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2ZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXhdID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgZmlyc3ROb25aZXJvVmFsdWVJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgaW5kZXggPSAwKSB7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50IHZhbHVlIGluIGZpcnN0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgLy8gSWYgbmV3IHZhbHVlIGV4Y2VlZHMgdmFsdWUgaW4gc2FtZSBpbmRleCBvZiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzXHJcbiAgICAgICAgICAgIC8vIFNldCBpbmRleCBvZiBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciB0byB6ZXJvXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCB2YWx1ZSBpbiBuZXh0IGluZGV4IG9mIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdCB1c2luZyByZWN1cnNpb25cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBlbmRcclxuICAgICAgICBpZiAoaW5kZXggPj0gbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgICAgIG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPiBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSkge1xyXG4gICAgICAgICAgICBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcltpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5jcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCArK2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVtZW50KG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzLCBpbmRleCA9IDApIHtcclxuICAgICAgICAvLyBDaGVjayBpZiByZWFjaGVkIGVuZFxyXG4gICAgICAgIGlmIChpbmRleCA+PSBudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdLS07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyW2luZGV4XSA8IDApIHtcclxuICAgICAgICAgICAgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXJbaW5kZXhdID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3JlbWVudChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciwgbWF4TnVtQXZhaWxhYmxlTGVuZ3RocywgKytpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpIHtcclxuICAgICAgICBiZXN0Q3V0TGlzdCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0TGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmN1dExlbmd0aCAtIGEuY3V0TGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCBhdmFpbGFibGVMZW5ndGhzQXJyIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICAvL2F2YWlsYWJsZUxlbmd0aHNBcnIuc29ydCgoYSxiKSA9PiBiIC0gYSk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgdW5jdXRQaWVjZXMgaW4gZGVzY2VuZGluZyBvcmRlciBvZiBsZW5ndGhcclxuICAgICAgICB1bmN1dFBpZWNlcy5zb3J0KChhLGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgZWFjaCB2YWx1ZSByZXByZXNlbnRzIGEgc2luZ2xlIHF1YW50aXR5IGN1dFBpZWNlXHJcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBub3JtYWwgYXJyYXkgb2YgY3V0UGllY2VzIHRoYXQgaGFzIGFueSBudW1iZXIgcXVhbnRpdHkgaW4gdGhlXHJcbiAgICAgICAgLy8gJ3F1YW50aXR5JyBwcm9wZXJ0eS5cclxuICAgICAgICBsZXQgaW5kaXZpZHVhbEN1dFBpZWNlcyA9IGN1dFBpZWNlcy5mbGF0TWFwKChjdXRQaWVjZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGN1dFBpZWNlLnF1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbGwoY3V0UGllY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXhpbXVtIG51bWJlciBvZiBlYWNoIGF2YWlsYWJsZSBsZW5ndGhzIG5lZWRlZCBpZiBvbmx5IHVzZWQgdGhhdCBcclxuICAgICAgICAvLyBhdmFpbGFibGUgbGVuZ3RoIGZvciBhbGwgY3V0UGllY2VzIChpbml0aWFsaXplZCB0byB6ZXJvKVxyXG4gICAgICAgIGxldCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzID0gbmV3IEFycmF5KHVuY3V0UGllY2VzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgICAgICBsZXQgbnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgPSBuZXcgQXJyYXkodW5jdXRQaWVjZXMubGVuZ3RoKS5maWxsKDApO1xyXG5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCwgY3V0U2VxdWVuY2UsIGN1dFNlcXVlbmNlQXJyO1xyXG4gICAgICAgIGxldCBjdXJyQ3V0TGlzdCA9IG5ldyBDdXRMaXN0KCk7XHJcblxyXG4gICAgICAgIHVuY3V0UGllY2VzLmZvckVhY2goKHVuY3V0UGllY2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vbWF4TnVtID0gTWF0aC5jZWlsKHRvdGFsQ3V0TGVuZ3RoIC8gdW5jdXRQaWVjZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiBpbmRleFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBDdXRMaXN0IGZyb20gcHJldmlvdXMgbG9vcFxyXG4gICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBtYXhOdW0gb2YgdW5jdXRQaWVjZS5sZW5ndGggY2FuIGJlIHVzZWQgd2l0aCB0aGUgY3V0UGllY2VzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAvLyBJZiBub3QsIGtlZXAgaW5jcmVtZW50aW5nIHVudGlsIHJlYWNoIGEgdmFsdWUgdGhhdCBpcyBzdWNjZXNzZnVsLlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBEbyBub3QgbmVlZCBtYXhOdW0uIE9ubHkgbmVlZCB0byBjaGVjayBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGFuZCBzdGlsbCBpbmNyZW1lbnQgY291bnQgaW4gbWF4TnVtQXZhaWxhYmxlTGVuZ3Roc1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBJbmZpbml0ZSBsb29wIGlmIGN1dCBwaWVjZSBpcyBsb25nZXIgdGhhbiB1bmN1dCBwaWVjZSBsZW5ndGguIEFycmF5IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggbmV2ZXIgcmVhY2hlcyB6ZXJvLlxyXG4gICAgICAgICAgICB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIodW5jdXRQaWVjZS5sZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIC8vIElmIGN1dFNlcXVlbmNlQXJyIHJldHVybnMganVzdCB0aGUgcmVtYWluaW5nIHZhbHVlIChhcnJheSBsZW5ndGggMSksXHJcbiAgICAgICAgICAgICAgICAvLyBubyBtb3JlIGN1dCBwaWVjZXMgY2FuIGJlIHVzZWQuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnIubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5jdXRQaWVjZXMgPSBjdXRTZXF1ZW5jZUFyci5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIEN1dFNlcXVlbmNlIHRvIGN1cnJlbnQgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5jcmVtZW50IGNvdW50IG9mIG1heCBudW1iZXIgb2YgY29ycmVzcG9uZGluZyBVbmN1dFBpZWNlXHJcbiAgICAgICAgICAgICAgICBtYXhOdW1BdmFpbGFibGVMZW5ndGhzW2luZGV4XSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXJyZW50IEN1dExpc3QgaGFzIGxlc3MgcHJpY2UgdGhhbiB0aGUgYmVzdCBDdXRMaXN0IG9ubHkgaWYgTk8gYXZhaWxhYmxlIGN1dCBwaWVjZXMgc3RpbGwgbGVmdFxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAoIWF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgJiYgKChiZXN0Q3V0TGlzdCA9PSB1bmRlZmluZWQpIHx8IChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGJlc3RDdXRMaXN0ID0gY3VyckN1dExpc3QuZGVlcENvcHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaW5jcmVtZW50VHJpZ2dlciwgZGVjcmVtZW50VHJpZ2dlciwgdGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBza2lwRmxhZztcclxuICAgICAgICBsZXQgcGVyY2VudEZhY3RvckNvdW50ZXIgPSAxO1xyXG4gICAgICAgIGxldCBwZXJjZW50TXVsdGlwbGVEaXNwbGF5ID0gNTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIpO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IGdldFBlcmNlbnRhZ2UobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRhZ2UgJiYgcGVyY2VudGFnZSA+IChwZXJjZW50TXVsdGlwbGVEaXNwbGF5ICogcGVyY2VudEZhY3RvckNvdW50ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtwZXJjZW50YWdlLnRvRml4ZWQoMCl9JWApO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudEZhY3RvckNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2tpcEZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGFsbCB2YWx1ZXMgYXJlIHplcm8sIHNraXBcclxuICAgICAgICAgICAgLy8gSWYgb25seSBvbmUgdmFsdWUgaXMgbm9uLXplcm8sIHNraXAgc2luY2UgYWxyZWFkeSBjaGVjayB0aG9zZSBjYXNlcyBwcmV2aW91c2x5XHJcbiAgICAgICAgICAgIC8vIElmIGxlbmd0aCBvZiBhbGwgdW5jdXQgcGllY2VzIGlzIGxlc3MgdGhhbiBsZW5ndGggb2YgYWxsIGN1dCBwaWVjZXMsIHNraXAgc2luY2Ugbm90IGVub3VnaCBtYXRlcmlhbFxyXG4gICAgICAgICAgICBpZiAoKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbHRlcigoY291bnQpID0+IGNvdW50ID4gMCkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgICYmIChudW1BdmFpbGFibGVMZW5ndGhzQ291bnRlci5yZWR1Y2UoKGFjY3VtLCBjdXJyLCBpbmRleCkgPT4gYWNjdW0gKyBjdXJyICogdW5jdXRQaWVjZXNbaW5kZXhdLmxlbmd0aCwgMCkgPj0gaW5kaXZpZHVhbEN1dFBpZWNlcy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIuY3V0V2l0aEtlcmYsIDApKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBOdW1BdmFpbGFibGVMZW5ndGhzQ291bnRlciA9IFsuLi5udW1BdmFpbGFibGVMZW5ndGhzQ291bnRlcl07XHJcblxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICAgICAge2xlbmd0aDogaW5kaXZpZHVhbEN1dFBpZWNlcy5sZW5ndGh9LFxyXG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBjdXJyZW50IEN1dExpc3QgZnJvbSBwcmV2aW91cyBsb29wXHJcbiAgICAgICAgICAgICAgICBjdXJyQ3V0TGlzdC5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgbWF4TnVtIG9mIHVuY3V0UGllY2VzW2RlY3JlbWVudFRyaWdnZXJdLmxlbmd0aCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjdXRQaWVjZXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90LCBrZWVwIGluY3JlbWVudGluZyB1bnRpbCByZWFjaCBhIHZhbHVlIHRoYXQgaXMgc3VjY2Vzc2Z1bC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50VHJpZ2dlciA9IGRlY3JlbWVudCh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNyZW1lbnRUcmlnZ2VyID09PSBudWxsKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlQXJyID0gQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0ubGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBDdXRTZXF1ZW5jZSBpbnN0YW5jZSBmcm9tIGN1dFNlcXVlbmNlQXJyXHJcbiAgICAgICAgICAgICAgICAgICAgY3V0U2VxdWVuY2UgPSBuZXcgQ3V0U2VxdWVuY2UodW5jdXRQaWVjZXNbZGVjcmVtZW50VHJpZ2dlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgQ3V0U2VxdWVuY2UgdG8gY3VycmVudCBDdXRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyckN1dExpc3QucHVzaChjdXRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBDdXRMaXN0IGhhcyBsZXNzIHByaWNlIHRoYW4gdGhlIGJlc3QgQ3V0TGlzdFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIGF2YWlsYWJsZSBjdXQgcGllY2VzLCBub3QgZW5vdWdoIHVuY3V0IHBpZWNlcy4gXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiByZWFjaCBoZXJlLCBjdXJyZW50IGN1dCBsaXN0IGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcEZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IGN1dCBsaXN0IGlzIGJldHRlciBpZiBOTyB1bnVzZWQgdW5jdXQgcGllY2VzICh0ZW1wTnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIgaGFzIGFsbCB6ZXJvIHZhbHVlcykgQU5EIGl0J3MgY2hlYXBlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGJlc3RDdXRMaXN0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICgodGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLmZpbmRJbmRleCgodmFsKSA9PiB2YWwgPiAwKSA9PT0gLTEpICYmIChiZXN0Q3V0TGlzdC5nZXRQcmljZSgpID49IGN1cnJDdXRMaXN0LmdldFByaWNlKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTmV3IEJlc3QgQ3V0IExpc3QgLSBCZXN0OiAke2Jlc3RDdXRMaXN0LmdldFByaWNlKCl9IC0gQ3VycjogJHtjdXJyQ3V0TGlzdC5nZXRQcmljZSgpfSAtIFRvdGFsOiAke251bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyfSAtIExlZnQ6ICR7dGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0Q3V0TGlzdCA9IGN1cnJDdXRMaXN0LmRlZXBDb3B5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2tpcEZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGluY3JlbWVudFRyaWdnZXIgPSBza2lwKG51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyLCBtYXhOdW1BdmFpbGFibGVMZW5ndGhzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluY3JlbWVudFRyaWdnZXIgPSBpbmNyZW1lbnQobnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIsIG1heE51bUF2YWlsYWJsZUxlbmd0aHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoaW5jcmVtZW50VHJpZ2dlciAhPT0gbnVsbCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RDdXRMaXN0KTtcclxuICAgICAgICB3aW5kb3cuYmVzdEN1dExpc3QgPSBiZXN0Q3V0TGlzdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJlc3RDdXRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Q2hlYXBlc3RDdXRMaXN0LFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN1dExpc3RDYWxjdWxhdG9yO1xyXG4iLCJjbGFzcyBDdXRQaWVjZSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRoaWNrbmVzcyBUaGlja25lc3Mgb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggV2lkdGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3V0TGVuZ3RoIEZpbmFsIGN1dCBsZW5ndGggb2YgY3V0IHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcXVhbnRpdHkgTnVtYmVyIG9mIGlkZW50aWNhbCBwaWVjZXMgdG8gY3V0IChkZWZhdWx0ID0gMSlcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrZXJmIEJsYWRlIHdpZHRoIG9mIG1hdGVyaWFsIHJlbW92ZWQgd2hlbiBjdXQgKGluY2hlcykgKGRlZmF1bHQgPSAxLzhcIilcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGhpY2tuZXNzLCB3aWR0aCwgY3V0TGVuZ3RoLCBxdWFudGl0eSA9IDEsIGtlcmYgPSAwLjEyNSkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmN1dExlbmd0aCA9IGN1dExlbmd0aDtcclxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5rZXJmID0ga2VyZjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3V0V2l0aEtlcmYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0TGVuZ3RoICsgdGhpcy5rZXJmO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRQaWVjZTtcclxuIiwiaW1wb3J0IEN1dFBpZWNlIGZyb20gXCIuL2N1dFBpZWNlLmpzXCI7XHJcbmltcG9ydCBVbmN1dFBpZWNlIGZyb20gXCIuL3VuY3V0UGllY2UuanNcIjtcclxuXHJcbmNsYXNzIEN1dFNlcXVlbmNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHVuY3V0UGllY2UpIHtcclxuICAgICAgICB0aGlzLnVuY3V0UGllY2UgPSB1bmN1dFBpZWNlO1xyXG5cclxuICAgICAgICB0aGlzLmN1dFBpZWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVtYWluaW5nTGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUGllY2VzOiAke3RoaXMuY3V0UGllY2VzfVxcbkxlZnRvdmVyOiAke3RoaXMucmVtYWluaW5nTGVuZ3RofWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEN1dFNlcXVlbmNlIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIHtVbmN1dFBpZWNlfSB1bmN1dFBpZWNlIFxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBpbmRpdmlkdWFsQ3V0UGllY2VzIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFxyXG4gICAgICogQHJldHVybnMge0N1dFNlcXVlbmNlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVDdXRTZXF1ZW5jZSh1bmN1dFBpZWNlLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgY3V0U2VxdWVuY2VBcnIgPSBDdXRTZXF1ZW5jZS5jcmVhdGVDdXRTZXF1ZW5jZUFycihcclxuICAgICAgICAgICAgdW5jdXRQaWVjZS5sZW5ndGgsIFxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQ3V0UGllY2VzLCBcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIElmIGN1dFNlcXVlbmNlQXJyIHJldHVybnMganVzdCB0aGUgdW5jdXRQaWVjZSBsZW5ndGggdmFsdWUgKGFycmF5IGxlbmd0aCAxKSxcclxuICAgICAgICAvLyBldmVyeSBpbmRpdmlkdWFsQ3V0UGllY2UgaXMgbG9uZ2VyIHRoYW4gdGhlIHVuY3V0UGllY2VcclxuICAgICAgICBpZiAoY3V0U2VxdWVuY2VBcnIubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgQ3V0U2VxdWVuY2UgaW5zdGFuY2UgZnJvbSBjdXRTZXF1ZW5jZUFyclxyXG4gICAgICAgIGNvbnN0IGN1dFNlcXVlbmNlID0gbmV3IEN1dFNlcXVlbmNlKHVuY3V0UGllY2UpO1xyXG4gICAgICAgIGN1dFNlcXVlbmNlLmN1dFBpZWNlcyA9IGN1dFNlcXVlbmNlQXJyLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBjdXRTZXF1ZW5jZS5yZW1haW5pbmdMZW5ndGggPSBjdXRTZXF1ZW5jZUFycltjdXRTZXF1ZW5jZUFyci5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1dFNlcXVlbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcnJheSBvZiBDdXRQaWVjZXMgd2l0aCBzbWFsbGVzdCByZW1haW5pbmcgbGVuZ3RoIGZyb20gYW4gaW5pdGlhbCBsZW5ndGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVtYWluaW5nTGVuZ3RoIFxyXG4gICAgICogQHBhcmFtIHtbQ3V0UGllY2VdfSBpbmRpdmlkdWFsQ3V0UGllY2VzIFxyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXX0gYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydEluZGV4IChkZWZhdWx0ID0gMCkgXHJcbiAgICAgKiBAcmV0dXJucyB7Wy4uLkN1dFBpZWNlLCBOdW1iZXJdfSBBcnJheSBvZiBDdXRQaWVjZXMgd2l0aCBsZWZ0b3ZlciBsZW5ndGggb2Ygd2hvbGUgcGllY2UgYXQgdGhlIGVuZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlQ3V0U2VxdWVuY2VBcnIocmVtYWluaW5nTGVuZ3RoLCBpbmRpdmlkdWFsQ3V0UGllY2VzLCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LCBzdGFydEluZGV4ID0gMCkge1xyXG4gICAgICAgIC8vIFJldHVybiBpZiBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKCFhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWyByZW1haW5pbmdMZW5ndGggXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1dFBpZWNlSW5kZXg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3V0TGVuZ3RoIGVxdWFsIHRvIHJlbWFpbmluZyBsZW5ndGggKERPIE5PVCBJTkNMVURFIEtFUkYpXHJcbiAgICAgICAgICAgIGlmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dExlbmd0aCA9PSByZW1haW5pbmdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXRQaWVjZSBpbmRleCBmcm9tIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggdG8gYXZvaWQgc2FtZSBjdXRQaWVjZVxyXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgZm9yIHRoYW4gb25jZS5cclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKGksIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBbIGluZGl2aWR1YWxDdXRQaWVjZXNbYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleFtpXV0sIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBpbmRleCBvZiBsYXJnZXN0IGN1dExlbmd0aCB0aGF0IGNhbiBiZSBjdXQgd2l0aCByZW1haW5pbmdMZW5ndGggKElOQ0xVREUgS0VSRilcclxuICAgICAgICAgICAgaWYgKChzZWxlY3RlZEN1dFBpZWNlSW5kZXggPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICYmIChpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXhbaV1dLmN1dFdpdGhLZXJmIDwgcmVtYWluaW5nTGVuZ3RoKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNlbGVjdGVkQ3V0UGllY2VJbmRleCBpcyBzdGlsbCB1bmRlZmluZWQgLSBBbGwgY3V0TGVuZ3RoK2tlcmYgYXJlIG1vcmUgdGhhbiByZW1haW5pbmdMZW5ndGhcclxuICAgICAgICAvLyBSZXR1cm4ganVzdCByZW1haW5pbmcgbGVuZ3RoXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ3V0UGllY2VJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsgcmVtYWluaW5nTGVuZ3RoIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY3V0UGllY2UgaW5kZXggZnJvbSBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IHRvIGF2b2lkIHNhbWUgY3V0UGllY2VcclxuICAgICAgICAvLyBiZWluZyBzZWxlY3RlZCBmb3IgdGhhbiBvbmNlLlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ3V0UGllY2UgPSBpbmRpdmlkdWFsQ3V0UGllY2VzW2F2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXguc3BsaWNlKHNlbGVjdGVkQ3V0UGllY2VJbmRleCwgMSldO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBzZWxlY3RlZEN1dFBpZWNlLCBcclxuICAgICAgICAgICAgLi4uQ3V0U2VxdWVuY2UuY3JlYXRlQ3V0U2VxdWVuY2VBcnIoXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdMZW5ndGggLSBzZWxlY3RlZEN1dFBpZWNlLmN1dFdpdGhLZXJmLCBcclxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxDdXRQaWVjZXMsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXRQaWVjZUluZGV4XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXRTZXF1ZW5jZTsiLCJleHBvcnQgY2xhc3MgQ3Jvc3NTZWN0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGhpY2tuZXNzIFRoaWNrbmVzcyAoc21hbGxlc3QgZGltZW5zaW9uKSBvZiBwaWVjZSAoaW5jaGVzKVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHBpZWNlIChpbmNoZXMpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRoaWNrbmVzcywgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbmN1dFBpZWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0Nyb3NzU2VjdGlvbn0gY3Jvc3NTZWN0aW9uIENyb3NzIHNlY3Rpb24gb2YgdW5jdXQgcGllY2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggTGVuZ3RoIG9mIHVuY3V0IHBpZWNlIChpbmNoZXMpIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByaWNlIFByaWNlIG9mIHBvc3NpYmxlIGxlbmd0aCAoQW1lcmljYW4gY2VudHMgZXguICQ5Ljg3ID0gOTg3KVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjcm9zc1NlY3Rpb24sIGxlbmd0aCwgcHJpY2UpIHtcclxuICAgICAgICB0aGlzLmNyb3NzU2VjdGlvbiA9IGNyb3NzU2VjdGlvbjtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVuY3V0UGllY2U7XHJcbiIsIi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBFbGVtZW50IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gRWxlbWVudCBhdHRyaWJ1dGUgbmFtZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWUgXHJcbiAqIEBwYXJhbSAgey4uLk5vZGV9IGNoaWxkcmVuIC0gVmFyaWFibGUgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cclxuICAgIC8vIFByb3BzXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGlsZHJlbiBOb2Rlc1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBlbGVtZW50LmFwcGVuZChjaGlsZCkpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbWV5ZXJfcmVzZXQuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7QUFFRDs7Ozs7Ozs7Ozs7OztFQWFDLFNBQVM7RUFDVCxVQUFVO0VBQ1YsU0FBUztFQUNULGVBQWU7RUFDZixhQUFhO0VBQ2Isd0JBQXdCLEVBQUE7O0FBRXpCLGdEQUFBO0FBQ0E7O0VBRUMsY0FBYyxFQUFBOztBQUVmO0VBQ0MsY0FBYyxFQUFBOztBQUVmO0VBQ0MsZ0JBQWdCLEVBQUE7O0FBRWpCO0VBQ0MsWUFBWSxFQUFBOztBQUViOztFQUVDLFdBQVc7RUFDWCxhQUFhLEVBQUE7O0FBRWQ7RUFDQyx5QkFBeUI7RUFDekIsaUJBQWlCLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1iYXNlLXdoaXRlOiBoc2woMCwgMCUsIDk1JSk7XFxuICAtLWJhc2UtYmxhY2s6IGhzbCgwLCAwJSwgMTAlKTsgfVxcblxcbmh0bWwge1xcbiAgZm9udC1zaXplOiA2Mi41JTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBjb2xvcjogdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpOyB9XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0OyB9XFxuXFxuYm9keSB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFxcXCJoZWFkZXIgaGVhZGVyXFxcIlxcciBcXFwibWFpbiBtYWluXFxcIlxcciBcXFwiZm9vdGVyIGZvb3RlclxcXCI7IH1cXG5cXG5oZWFkZXIsXFxubWFpbixcXG5mb290ZXIge1xcbiAgcGFkZGluZzogMS44cmVtOyB9XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyOyB9XFxuXFxubWFpbiB7XFxuICBncmlkLWFyZWE6IG1haW47IH1cXG5cXG5mb290ZXIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBncmlkLWFyZWE6IGZvb3RlcjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyOyB9XFxuXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyLFxcbi5jbGVhci1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5jdXQtc2VxdWVuY2Uge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICBib3JkZXItdG9wOiBub25lOyB9XFxuICAuY3V0LXNlcXVlbmNlOmZpcnN0LWNoaWxkIHtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTsgfVxcblxcbi5pbnB1dC1jb250YWluZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAuaW5wdXQtY29udGFpbmVyIGxhYmVsLCAuaW5wdXQtY29udGFpbmVyIGlucHV0IHtcXG4gICAgd2lkdGg6IDEwMCU7IH1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7IH1cXG5cXG4ubW9kYWwtY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcbiAgbWFyZ2luOiAxNSUgYXV0bztcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcbiAgd2lkdGg6IDgwJTsgfVxcblxcbi5waWVjZS1jcmVhdGUtZm9ybSwgLnBpZWNlLWxpc3Qge1xcbiAgcGFkZGluZzogMXJlbTsgfVxcblxcbi5waWVjZS1jcmVhdGUtZm9ybSB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICBtYXJnaW46IDFyZW0gMDsgfVxcbiAgLnBpZWNlLWNyZWF0ZS1mb3JtIC5mb3JtLWlucHV0cyB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICAgIGNvbHVtbi1nYXA6IDFyZW07IH1cXG4gICAgLnBpZWNlLWNyZWF0ZS1mb3JtIC5mb3JtLWlucHV0cyAuaW5wdXQtY29udGFpbmVyIHtcXG4gICAgICBkaXNwbGF5OiBncmlkOyB9XFxuICAucGllY2UtY3JlYXRlLWZvcm0gLnN1Ym1pdC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5waWVjZS1saXN0IC5waWVjZS1saXN0LWhlYWQsXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtYm9keSA+IC5jdXQtcGllY2UsXFxuLnBpZWNlLWxpc3QgLnBpZWNlLWxpc3QtYm9keSA+IC51bmN1dC1waWVjZSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGNvbHVtbi1nYXA6IDFyZW07IH1cXG5cXG5oMSwgaDIsIGgzIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbnRhYmxlIHtcXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIHRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcbiAgdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2JmYmZiZjsgfVxcbiAgdGFibGUgdGgsIHRhYmxlIHRkIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBUUE7RUFDSSw2QkFBYTtFQUNiLDZCQUFhLEVBQUE7O0FBR2pCO0VBQ0ksZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUV0QiwrQkFBK0I7RUFDL0IsMENBQTBDLEVBQUE7O0FBRzlDO0VBQ0ksbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0ksaUJBQWlCO0VBQ2pCLHdJQUF3STtFQUN4SSxpQkFBaUI7RUFFakIsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxpQ0FBaUM7RUFDakMsa0VBR21CLEVBQUE7O0FBR3ZCOzs7RUFHSSxlQUFlLEVBQUE7O0FBS25CO0VBQ0ksaUJBQWlCLEVBQUE7O0FBS3JCO0VBQ0ksZUFBZSxFQUFBOztBQUtuQjtFQUNJLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLG1CQUFtQixFQUFBOztBQUt2Qjs7RUFFSSxhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBYTNCO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtFQUN0QiwwQ0FBMEM7RUFDMUMsZ0JBQWdCLEVBQUE7RUFKcEI7SUFPUSw4Q0FBOEMsRUFBQTs7QUFJdEQ7RUFDSSxxQkFBcUIsRUFBQTtFQUR6QjtJQUlRLFdBQVcsRUFBQTs7QUFJbkI7RUFFSSxlQUFlO0VBQ2YsVUFBVTtFQUNWLE9BQU87RUFDUCxNQUFNO0VBQ04sV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2QsdUJBQThCO0VBQzlCLG9DQUFvQyxFQUFBOztBQUd4QztFQUNJLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVLEVBQUE7O0FBR2Q7RUFDSSxhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksMENBQTBDO0VBQzFDLGNBQWMsRUFBQTtFQUZsQjtJQTdISSxhQUFhO0lBQ2IscUNBQTZDO0lBQzdDLGdCQUFnQixFQUFBO0lBMkhwQjtNQVFZLGFBQWEsRUFBQTtFQVJ6QjtJQWFRLGFBQWE7SUFDYix1QkFBdUIsRUFBQTs7QUFJL0I7OztFQS9JSSxhQUFhO0VBQ2IscUNBQTZDO0VBQzdDLGdCQUFnQixFQUFBOztBQStKcEI7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsa0JBQWtCLEVBQUE7RUFMdEI7SUFTWSx5QkFBaUMsRUFBQTtFQVQ3QztJQWFZLHlCQUFpQyxFQUFBO0VBYjdDO0lBa0JRLG9CQUFvQjtJQUNwQiwwQ0FBMEMsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuQG1peGluIGJhc2VHcmlkKCRuQ29sdW1uczogNikge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgkbkNvbHVtbnMsIDFmcik7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gICAgLS1iYXNlLXdoaXRlOiBoc2woMCwgMCUsIDk1JSk7XFxyXFxuICAgIC0tYmFzZS1ibGFjazogaHNsKDAsIDAlLCAxMCUpO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gICAgZm9udC1zaXplOiA2Mi41JTsgLy8gMXJlbSA9IDEwcHhcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG4gICAgY29sb3I6IHZhcigtLWJhc2UtYmxhY2ssIGJsYWNrKTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS13aGl0ZSwgd2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXHJcXG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcclxcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAxZnI7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXFxyXFxuICAgICAgICBcXFwiaGVhZGVyIGhlYWRlclxcXCJcXHJcXG4gICAgICAgIFxcXCJtYWluIG1haW5cXFwiXFxyXFxuICAgICAgICBcXFwiZm9vdGVyIGZvb3RlclxcXCI7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciwgXFxyXFxubWFpbiwgXFxyXFxuZm9vdGVyIHtcXHJcXG4gICAgcGFkZGluZzogMS44cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBIZWFkZXJcXHJcXG5cXHJcXG5oZWFkZXIge1xcclxcbiAgICBncmlkLWFyZWE6IGhlYWRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gTWFpbiBDb250ZW50XFxyXFxuXFxyXFxubWFpbiB7XFxyXFxuICAgIGdyaWQtYXJlYTogbWFpbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRm9vdGVyXFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgIGdyaWQtYXJlYTogZm9vdGVyO1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDdXN0b20gSURzXFxyXFxuXFxyXFxuI2NyZWF0ZS1jdXQtbGlzdC1idG4tY29udGFpbmVyLFxcclxcbi5jbGVhci1idG4tY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNjdXQtcGllY2UtY3JlYXRlLWZvcm0ge1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jdW5jdXQtcGllY2UtY3JlYXRlLWZvcm0ge1xcclxcbiAgICBcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3VzdG9tIENsYXNzZXNcXHJcXG5cXHJcXG4uY3V0LXNlcXVlbmNlIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICBib3JkZXItdG9wOiBub25lO1xcclxcblxcclxcbiAgICAmOmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG5cXHJcXG4gICAgbGFiZWwsIGlucHV0IHtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICAgIC8vZGlzcGxheTogbm9uZTsgLy8gSGlkZGVuIGJ5IGRlZmF1bHRcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkOyAvLyBTdGF5IGluIHBsYWNlXFxyXFxuICAgIHotaW5kZXg6IDE7IC8vIFNpdCBvbiB0b3BcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy8gRnVsbCB3aWR0aFxcclxcbiAgICBoZWlnaHQ6IDEwMCU7IC8vIEZ1bGwgaGVpZ2h0XFxyXFxuICAgIG92ZXJmbG93OiBhdXRvOyAvLyBFbmFibGUgc2Nyb2xsIGlmIG5lZWRlZFxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7IC8vIEZhbGxiYWNrIGNvbG9yXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTsgLy8gQmxhY2sgdy8gb3BhY2l0eVxcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGVudCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxyXFxuICAgIG1hcmdpbjogMTUlIGF1dG87IC8vIDE1JSBmcm9tIHRoZSB0b3AgYW5kIGNlbnRlcmVkXFxyXFxuICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxyXFxuICAgIHdpZHRoOiA4MCU7IC8vIENvdWxkIGJlIG1vcmUgb3IgbGVzcywgZGVwZW5kaW5nIG9uIHNjcmVlbiBzaXplXFxyXFxufVxcclxcblxcclxcbi5waWVjZS1jcmVhdGUtZm9ybSwgLnBpZWNlLWxpc3Qge1xcclxcbiAgICBwYWRkaW5nOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtY3JlYXRlLWZvcm0ge1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIG1hcmdpbjogMXJlbSAwO1xcclxcblxcclxcbiAgICAuZm9ybS1pbnB1dHMge1xcclxcbiAgICAgICAgQGluY2x1ZGUgYmFzZUdyaWQ7XFxyXFxuXFxyXFxuICAgICAgICAuaW5wdXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zdWJtaXQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucGllY2UtbGlzdCB7XFxyXFxuICAgIC5waWVjZS1saXN0LWhlYWQsIFxcclxcbiAgICAucGllY2UtbGlzdC1ib2R5ID4gLmN1dC1waWVjZSxcXHJcXG4gICAgLnBpZWNlLWxpc3QtYm9keSA+IC51bmN1dC1waWVjZSB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBiYXNlR3JpZDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGllY2UtbGlzdC1oZWFkIHtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGllY2UtbGlzdC1ib2R5IHtcXHJcXG5cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4vLyBNaXNjXFxyXFxuXFxyXFxuaDEsIGgyLCBoMyB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxudGFibGUge1xcclxcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmFzZS1ibGFjaywgYmxhY2spO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHRib2R5IHtcXHJcXG4gICAgICAgIHRyOm50aC1jaGlsZChvZGQpIHtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgMCUsIDg1JSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICB0cjpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAwJSwgNzUlKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICB0aCwgdGQge1xcclxcbiAgICAgICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1iYXNlLWJsYWNrLCBibGFjayk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVyX3Jlc2V0LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcl9yZXNldC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzL21leWVyX3Jlc2V0LnNjc3MnO1xyXG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5zY3NzJztcclxuaW1wb3J0IGN1dExpc3RDYWxjdWxhdG9yIGZyb20gJy4vanMvY3V0TGlzdENhbGN1bGF0b3IuanMnO1xyXG5pbXBvcnQgQ3V0UGllY2UgZnJvbSAnLi9qcy9jdXRQaWVjZS5qcyc7XHJcbmltcG9ydCB7Q3Jvc3NTZWN0aW9uLCBVbmN1dFBpZWNlfSBmcm9tICcuL2pzL3VuY3V0UGllY2UuanMnO1xyXG5pbXBvcnQge2N1dExpc3R9IGZyb20gJy4vanMvY3V0TGlzdC5qcyc7XHJcbmltcG9ydCBjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCBmcm9tICcuL2pzL2NvbXBvbmVudHMvY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsKGN1dFBpZWNlcywgcG9zc2libGVMZW5ndGhzQXJyKSB7XHJcbiAgICAgICAgLy8gU29ydCBjdXRQaWVjZXMgYnkgY3V0TGVuZ3RoIGluIGRlY3JlYXNpbmcgb3JkZXJcclxuICAgICAgICBjdXRQaWVjZXMuc29ydCgoYSxiKSA9PiBiLmN1dExlbmd0aCAtIGEuY3V0TGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBhIHNpbmdsZSBxdWFudGl0eSBjdXRQaWVjZVxyXG4gICAgICAgIC8vIGluc3RlYWQgb2Ygbm9ybWFsIGFycmF5IG9mIGN1dFBpZWNlcyB0aGF0IGhhcyBhbnkgbnVtYmVyIHF1YW50aXR5IGluIHRoZVxyXG4gICAgICAgIC8vICdxdWFudGl0eScgcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGluZGl2aWR1YWxDdXRQaWVjZXMgPSBjdXRQaWVjZXMuZmxhdE1hcCgoY3V0UGllY2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShjdXRQaWVjZS5xdWFudGl0eSlcclxuICAgICAgICAgICAgICAgIC5maWxsKGN1dFBpZWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIGVhY2ggdmFsdWUgcmVwcmVzZW50cyBpbmRleCBpbiBjb3JyZXNwb25kaW5nIFxyXG4gICAgICAgIC8vIGluZGl2aWR1YWxDdXRQaWVjZXMgYXJyYXkuIElmIGEgaW5kaXZpZHVhbCBDdXRQaWVjZSBpcyBzZWxlY3RlZCBmb3IgXHJcbiAgICAgICAgLy8gYSBjdXQgc2VxdWVuY2UsIGl0J3MgaW5kZXggaXMgcmVtb3ZlZCBmcm9tIHRoaXMgYXJyYXkuXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXggPSBBcnJheS5mcm9tKFxyXG4gICAgICAgICAgICB7bGVuZ3RoOiBpbmRpdmlkdWFsQ3V0UGllY2VzLmxlbmd0aH0sXHJcbiAgICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IGluZGV4XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJDdXRTZXF1ZW5jZSwgdGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgsIGJlc3RDdXQ7XHJcbiAgICAgICAgbGV0IGZpbmFsQ3V0TGlzdCA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmVzdEN1dCA9IHtcclxuICAgICAgICAgICAgICAgIGN1dFNlcXVlbmNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwb3NzaWJsZUxlbmd0aHNBcnIuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJDdXRTZXF1ZW5jZSA9IGN1dExpc3QuZ2V0Q3V0TGlzdChsZW5ndGgsIGluZGl2aWR1YWxDdXRQaWVjZXMsIHRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKChiZXN0Q3V0LmN1dFNlcXVlbmNlID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKGJlc3RDdXQuY3V0U2VxdWVuY2VbLTFdID4gY3VyckN1dFNlcXVlbmNlWy0xXSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RDdXQuY3V0U2VxdWVuY2UgPSBjdXJyQ3V0U2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4ID0gWy4uLnRlbXBBdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaW5hbEN1dExpc3QucHVzaChiZXN0Q3V0LmN1dFNlcXVlbmNlKTtcclxuICAgICAgICAgICAgYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCA9IFsgLi4uYmVzdEN1dC5hdmFpbGFibGVDdXRQaWVjZXNCeUluZGV4IF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmFsQ3V0TGlzdCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjdXQgbGlzdCBmb3IgZmlyc3QgcG9zc2libGUgbGVuZ3RoXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGJlc3RDdXRMaXN0IHRvIGZpcnN0IGN1dCBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IGN1dCBsaXN0IGZvciBuZXh0IHBvc3NpYmxlIGxlbmd0aFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIG5ldyBjdXQgbGlzdCBoYXMgbGVzcyByZW1haW5pbmcgbGVuZ3RoIHRoYW4gYmVzdEN1dExpc3QsIHNldCBcclxuICAgICAgICAvLyBiZXN0Q3V0TGlzdCB0byBuZXcgY3V0IGxpc3RcclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIHJlYWNoIGVuZCBvZiBwb3NzaWJsZSBsZW5ndGggYXJyYXksIHNhdmUgYmVzdEN1dExpc3QgdG8gZmluYWwgY3V0IGxpc3Qgc2VxdWVuY2VcclxuXHJcbiAgICAgICAgLy8gUmVwZWF0IG9uY2UgYWdhaW4gd2l0aCByZW1haW5pbmcgaW5kaXZpZHVhbEN1dFBpZWNlc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBFeGFtcGxlJyk7XHJcblxyXG4gICAgbGV0IGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzkuODc1LCAzKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNDkuODc1LCAzKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uMng0ID0gbmV3IENyb3NzU2VjdGlvbigyLDQpO1xyXG4gICAgbGV0IHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBTZWUtU2F3Jyk7XHJcbiAgICBcclxuICAgIGN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzYsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAzNSs1LzE2LCAyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoNCwgNCwgMzArMjEvMzIsIDIpLFxyXG4gICAgICAgIG5ldyBDdXRQaWVjZSg0LCA0LCAyMi41LCA0KSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY3Jvc3NTZWN0aW9uNHg0ID0gbmV3IENyb3NzU2VjdGlvbig0LDQpO1xyXG4gICAgdW5jdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uNHg0LCA3MiwgMTIuMjgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgOTYsIDE1LjQ4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb240eDQsIDEyMCwgMjIuMzgpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjR4NCwgMTQ0LCAyNy40OCksXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgY3V0TGlzdENhbGN1bGF0b3JDb21wb25lbnQuaW5pdChjdXRQaWVjZXMsIHVuY3V0UGllY2VzKTtcclxuICAgIHdpbmRvdy5jdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCA9IGN1dExpc3RDYWxjdWxhdG9yQ29tcG9uZW50O1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZygnVGVzdDogU2F3IEhvcnNlcycpO1xyXG5cclxuICAgIHVuY3V0UGllY2VzID0gW1xyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgNDgsIDI3NSksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCA5NiwgMjk4KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDEyMCwgMzg2KSxcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDE0NCwgNDYyKSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDM2LCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzIrMS84LCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMzQsIDIpLFxyXG4gICAgXTtcclxuXHJcbiAgICBjdXRMaXN0Q2FsY3VsYXRvci5nZXRDaGVhcGVzdEN1dExpc3QoY3V0UGllY2VzLCB1bmN1dFBpZWNlcyk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdUZXN0OiBXb29kIFNoZWQnKTtcclxuXHJcbiAgICB1bmN1dFBpZWNlcyA9IFtcclxuICAgICAgICBuZXcgVW5jdXRQaWVjZShjcm9zc1NlY3Rpb24yeDQsIDQ4LCAyNzUpLFxyXG4gICAgICAgIG5ldyBVbmN1dFBpZWNlKGNyb3NzU2VjdGlvbjJ4NCwgOTYsIDI5OCksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxMjAsIDM4NiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNDQsIDQ2MiksXHJcbiAgICAgICAgbmV3IFVuY3V0UGllY2UoY3Jvc3NTZWN0aW9uMng0LCAxNioxMiwgNjE2KSxcclxuICAgIF07XHJcbiAgICBjdXRQaWVjZXMgPSBbXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDE1KjEyKzExLCA0KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgMTUqMTIrNCwgMiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDcqMTIsIDMyKSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgOC41LCA4KSxcclxuICAgICAgICBuZXcgQ3V0UGllY2UoMiwgNCwgNSoxMisxMCwgNCksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDIqMTIrOSwgNiksXHJcbiAgICAgICAgbmV3IEN1dFBpZWNlKDIsIDQsIDIqMTIrMTEuNSwgMiksXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIElTU1VFOiBWZXJ5IGxvbmcgdGltZVxyXG4gICAgLy9kZWJ1Z2dlcjtcclxuICAgIC8vY3V0TGlzdENhbGN1bGF0b3IuZ2V0Q2hlYXBlc3RDdXRMaXN0KGN1dFBpZWNlcywgdW5jdXRQaWVjZXMpO1xyXG5cclxuICAgIHdpbmRvdy5jdXRMaXN0Q2FsY3VsYXRvciA9IGN1dExpc3RDYWxjdWxhdG9yO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsIkNvbmZpcm1Nb2RhbENvbXBvbmVudCIsImhhbmRsZUFjY2VwdCIsInF1ZXN0aW9uVGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImFjY2VwdFRleHQiLCJyZWplY3RUZXh0IiwiZWxlbWVudCIsImhhbmRsZUFjY2VwdENsaWNrIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmUiLCJoYW5kbGVSZWplY3RDbGljayIsInJlbmRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJhY2NlcHRCdG4iLCJyZWplY3RCdG4iLCJtb2RhbENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInN0b3BQcm9wYWdhdGlvbiIsIkZvb3RlciIsIkN1dFBpZWNlQ3JlYXRlRm9ybUNvbXBvbmVudCIsIlVuY3V0UGllY2VDcmVhdGVGb3JtQ29tcG9uZW50IiwiQ3V0UGllY2VDb21wb25lbnQiLCJDdXRQaWVjZUxpc3RDb21wb25lbnQiLCJVbmN1dFBpZWNlQ29tcG9uZW50IiwiVW5jdXRQaWVjZUxpc3RDb21wb25lbnQiLCJDdXRMaXN0Q29tcG9uZW50IiwiY3V0TGlzdENhbGN1bGF0b3IiLCJDdXRQaWVjZSIsIlVuY3V0UGllY2UiLCJDcm9zc1NlY3Rpb24iLCJjdXRMaXN0Q2FsY3VsYXRvckNvbXBvbmVudCIsImJlc3RDdXRMaXN0IiwiY3V0UGllY2VMaXN0Q29tcG9uZW50IiwidW5jdXRQaWVjZUxpc3RDb21wb25lbnQiLCJjdXRMaXN0Q29tcG9uZW50IiwiaW5pdCIsImluaXRDdXRQaWVjZXMiLCJpbml0VW5jdXRQaWVjZXMiLCJpbml0QmVzdEN1dExpc3QiLCJtYWluRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJvZHkiLCJoYW5kbGVDdXRQaWVjZUxpc3RDbGVhciIsImhhbmRsZUN1dFBpZWNlQWRkRm9ybVN1Ym1pdCIsImhhbmRsZVVuY3V0UGllY2VMaXN0Q2xlYXIiLCJoYW5kbGVVbmN1dFBpZWNlQWRkRm9ybVN1Ym1pdCIsImZvckVhY2giLCJjdXRQaWVjZSIsImFkZEN1dFBpZWNlIiwidW5jdXRQaWVjZSIsImFkZFVuY3V0UGllY2UiLCJjcmVhdGVDdXRMaXN0QnRuIiwiaGFuZGxlQ3JlYXRlQ3V0TGlzdENsaWNrIiwiYWRkQ3V0UGllY2VDb21wb25lbnQiLCJoYW5kbGVDdXRQaWVjZUVkaXRDbGljayIsImhhbmRsZUN1dFBpZWNlRGVsZXRlQ2xpY2siLCJhZGRVbmN1dFBpZWNlQ29tcG9uZW50IiwiaGFuZGxlVW5jdXRQaWVjZUVkaXRDbGljayIsImhhbmRsZVVuY3V0UGllY2VEZWxldGVDbGljayIsInJlbW92ZUN1dFBpZWNlIiwiY3V0UGllY2VUb1JlbW92ZSIsInJlbW92ZVVuY3V0UGllY2UiLCJ1bmN1dFBpZWNlVG9SZW1vdmUiLCJwcmV2ZW50RGVmYXVsdCIsIk51bWJlciIsInRhcmdldCIsImVsZW1lbnRzIiwibmFtZWRJdGVtIiwidmFsdWUiLCJjdXRQaWVjZVRvRGVsZXRlIiwicHJlcGVuZCIsImhhbmRsZUN1dFBpZWNlRGVsZXRlQ29uZmlybSIsInVuY3V0UGllY2VUb0RlbGV0ZSIsImhhbmRsZVVuY3V0UGllY2VEZWxldGVDb25maXJtIiwiZ2V0Q2hlYXBlc3RDdXRMaXN0IiwiZ2V0UGllY2VzIiwiY3V0TGlzdCIsImNsZWFyIiwiQ3V0U2VxdWVuY2VDb21wb25lbnQiLCJtYXRlcmlhbExpc3RUYWJsZSIsIm1hdGVyaWFsTGlzdCIsImdldE1hdGVyaWFsTGlzdCIsIm1hdGVyaWFsTGlzdFRhYmxlQm9keSIsInRvdGFsUHJpY2UiLCJjdXJyUHJpY2UiLCJ1bmN1dExlbmd0aCIsInVuY3V0T2JqIiwiT2JqZWN0IiwiZW50cmllcyIsInF1YW50aXR5IiwidW5pdFByaWNlIiwidG9GaXhlZCIsImN1dFNlcXVlbmNlc1RhYmxlIiwiY3V0U2VxdWVuY2VzVGFibGVCb2R5IiwiY3V0U2VxdWVuY2VzIiwiY3V0U2VxdWVuY2UiLCJhcHBlbmQiLCJuZXdDdXRMaXN0IiwiZWRpdENhbGxiYWNrIiwiZGVsZXRlQ2FsbGJhY2siLCJoYW5kbGVFZGl0Q2xpY2siLCJoYW5kbGVEZWxldGVDbGljayIsImVkaXRCdG4iLCJkZWxldGVCdG4iLCJ0aGlja25lc3MiLCJ3aWR0aCIsImN1dExlbmd0aCIsImtlcmYiLCJoYW5kbGVGb3JtU3VibWl0IiwiZm9ybUVsZW1lbnQiLCJmb3JtSW5wdXRzRWxlbWVudCIsInVwZGF0ZUZvcm0iLCJpbnB1dEVsZW1lbnQiLCJpbnB1dE5hbWUiLCJpbmRleCIsImFyciIsImRlZmF1bHRWYWx1ZSIsImZvY3VzIiwiY3V0UGllY2VDb21wb25lbnRzIiwiY3V0UGllY2VMaXN0RWxlbWVudCIsIl9sZW4iLCJjdXRQaWVjZUNvbXBvbmVudHNUb0FkZCIsIkFycmF5IiwiX2tleSIsInB1c2giLCJjdXRQaWVjZUNvbXBvbmVudCIsInJlbW92ZUN1dFBpZWNlQ29tcG9uZW50IiwiX2xlbjIiLCJjdXRQaWVjZUNvbXBvbmVudHNUb1JlbW92ZSIsIl9rZXkyIiwiaW5kZXhPZiIsInNwbGljZSIsIl9sZW4zIiwiY3V0UGllY2VzVG9SZW1vdmUiLCJfa2V5MyIsImZpbmRJbmRleCIsIm1hcCIsInJvd0VsZW1lbnRzIiwiY3V0UGllY2VzIiwidGVtcFJvd0VsZW1lbnQiLCJjcm9zc1NlY3Rpb24iLCJyZW1haW5pbmdMZW5ndGgiLCJjb3B5cmlnaHRZZWFyIiwiZm9vdGVyIiwiY3VyclllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0ZW1wRWxlbWVudCIsImlkIiwicHJpY2UiLCJ1bmN1dFBpZWNlQ29tcG9uZW50cyIsInVuY3V0UGllY2VMaXN0RWxlbWVudCIsInVuY3V0UGllY2VDb21wb25lbnRzVG9BZGQiLCJ1bmN1dFBpZWNlQ29tcG9uZW50IiwicmVtb3ZlVW5jdXRQaWVjZUNvbXBvbmVudCIsInVuY3V0UGllY2VDb21wb25lbnRzVG9SZW1vdmUiLCJ1bmN1dFBpZWNlc1RvUmVtb3ZlIiwiQ3V0TGlzdCIsImNvbnN0cnVjdG9yIiwiZ2V0UHJpY2UiLCJyZWR1Y2UiLCJhY2N1bSIsImN1cnIiLCJkZWVwQ29weSIsIm1hdGVyaWFsTGlzdE9iaiIsImdldEN1dExpc3QiLCJpbmRpdmlkdWFsQ3V0UGllY2VzIiwiYXZhaWxhYmxlQ3V0UGllY2VzQnlJbmRleCIsInN0YXJ0SW5kZXgiLCJzZWxlY3RlZEN1dFBpZWNlSW5kZXgiLCJpIiwiY3V0V2l0aEtlcmYiLCJzZWxlY3RlZEN1dFBpZWNlIiwiQ3V0U2VxdWVuY2UiLCJnZXREeW5hbWljTmVzdGVkTG9vcENvdW50IiwibnVtQXZhaWxhYmxlTGVuZ3Roc0NvdW50ZXIiLCJtYXhOdW1BdmFpbGFibGVMZW5ndGhzIiwibGFzdE5vblplcm9JbmRleCIsImZpbmRMYXN0SW5kZXgiLCJ2YWwiLCJjb3VudCIsInNsaWNlIiwiZ2V0UGVyY2VudGFnZSIsIm51bSIsIm1heExhc3ROb25aZXJvSW5kZXgiLCJtYXgiLCJwZXJjZW50YWdlIiwic2tpcCIsImZpcnN0Tm9uWmVyb1ZhbHVlSW5kZXgiLCJpbmNyZW1lbnQiLCJkZWNyZW1lbnQiLCJ1bmN1dFBpZWNlcyIsInNvcnQiLCJhIiwiYiIsImZsYXRNYXAiLCJmaWxsIiwiY3V0U2VxdWVuY2VBcnIiLCJjdXJyQ3V0TGlzdCIsImZyb20iLCJjcmVhdGVDdXRTZXF1ZW5jZUFyciIsImluY3JlbWVudFRyaWdnZXIiLCJkZWNyZW1lbnRUcmlnZ2VyIiwidGVtcE51bUF2YWlsYWJsZUxlbmd0aHNDb3VudGVyIiwic2tpcEZsYWciLCJwZXJjZW50RmFjdG9yQ291bnRlciIsInBlcmNlbnRNdWx0aXBsZURpc3BsYXkiLCJmaWx0ZXIiLCJ3aW5kb3ciLCJ0b1N0cmluZyIsImNyZWF0ZUN1dFNlcXVlbmNlIiwidHlwZSIsInByb3BzIiwia2V5Iiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJjaGlsZCIsImdldEN1dExpc3RXaXRoTGVhc3RMZWZ0b3Zlck1hdGVyaWFsIiwicG9zc2libGVMZW5ndGhzQXJyIiwiY3VyckN1dFNlcXVlbmNlIiwidGVtcEF2YWlsYWJsZUN1dFBpZWNlc0J5SW5kZXgiLCJiZXN0Q3V0IiwiZmluYWxDdXRMaXN0IiwiY3Jvc3NTZWN0aW9uMng0IiwiY3Jvc3NTZWN0aW9uNHg0Il0sInNvdXJjZVJvb3QiOiIifQ==