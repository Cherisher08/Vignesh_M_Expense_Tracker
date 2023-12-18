import * as chartFunctions from './chartFunctions.js'
import * as htmlComponents from './HtmlComponents.js'
import * as formValidationFunctions from './FormValidationFunctions.js'
import * as recordManagementFunctions from './recordManagementFunctions.js'
import * as apiFunctions from './apiFunctions.js'
import * as dataUpdationFunctions from './dataUpdationFunctions.js'
import * as sortingFunctions from './sortingFunctions.js'

export { chartFunctions, htmlComponents }

export const globalStorage = {}
let globalCounter = 0;

(async () => {
  const initalRecords = await apiFunctions.loadInitialRecords()
  loadRecordDetailsIntoStorage(initalRecords)
  sortingFunctions.createRowContainer(globalStorage, true)
})()

htmlComponents.currencyInputField.forEach(function (input) {
  input.addEventListener('keyup', function () {
    formValidationFunctions.formatCurrency(this)
  })
  input.addEventListener('blur', function () {
    formValidationFunctions.formatCurrency(this, 'blur')
  })
})

htmlComponents.newRecordOptionButtons[0].addEventListener('click', function () {
  recordManagementFunctions.openNewExpenseForm(htmlComponents.newRecordFormContainers[0])
})

htmlComponents.newRecordOptionButtons[1].addEventListener('click', function () {
  recordManagementFunctions.openNewIncomeForm(htmlComponents.newRecordFormContainers[0])
})

htmlComponents.cancelBtns[0].addEventListener('click', function () {
  recordManagementFunctions.closeNewExpenseForm(htmlComponents.newRecordFormContainers[0])
})

htmlComponents.sortableRecordHeaders.forEach((element, index) => {
  element.addEventListener('click', function () {
    sortingFunctions.sortEventHandler(index)
  })
})

htmlComponents.newEntryCreationButton.forEach(function (element, index) {
  element.addEventListener('click', function () {
    if (formValidationFunctions.validateForm(htmlComponents.requiredInputFields) === true) {
      findUnusedKeyNumber()
      const lastExpenseEntry = apiFunctions.checkExpenseFields(htmlComponents.expenseFields, globalCounter, index)
      globalStorage[globalCounter] = lastExpenseEntry
      recordManagementFunctions.closeNewExpenseForm(htmlComponents.newRecordFormContainers[0])
      dataUpdationFunctions.removeNoDataColumn(htmlComponents.getNoDataColumn())
      dataUpdationFunctions.addLastRecordToTable(lastExpenseEntry, htmlComponents.recordViewContainer)
      dataUpdationFunctions.addEventListenerForCreatedElements(htmlComponents.recordViewContainer, globalCounter)
      globalCounter++
    }
  })
})

/**
 *
 */
function findUnusedKeyNumber () {
  for (const key in globalStorage) {
    if (globalCounter === key) {
      globalCounter += 1
    }
  }
}

/**
 *
 * @param entryNumber
 */
function addEventListenerToSaveButton (entryNumber) {
  htmlComponents.formSaveButton.addEventListener('click', function handleSaveButtonClick () {
    if (formValidationFunctions.validateForm(htmlComponents.requiredInputFields) === true) {
      const editedExpenseEntry = apiFunctions.checkExpenseFields(htmlComponents.expenseFields, entryNumber, globalStorage[entryNumber][1])
      globalStorage[entryNumber] = editedExpenseEntry
      recordManagementFunctions.closeNewExpenseForm(htmlComponents.newRecordFormContainers[0])
      dataUpdationFunctions.editRecordInTable(editedExpenseEntry, dataUpdationFunctions.getRecordDataColumn())
      htmlComponents.formSaveButton.removeEventListener('click', handleSaveButtonClick)
      loadRecordDetails(entryNumber)
    }
  })
}

/**
 *
 * @param {number} entryNumber -
 */
export function loadRecordDetails (entryNumber) {
  htmlComponents.selectedRecordDetail.forEach(function (element, index) {
    if (index === 1) {
      element.innerHTML = (globalStorage[entryNumber][index] === 0) ? 'Expense' : 'Income'
    } else {
      element.innerHTML = globalStorage[entryNumber][index]
    }
  })
}

/**
 *
 * @param {number} entryNumber -
 */
export function loadRecordDetailsIntoForm (entryNumber) {
  let i = 0
  htmlComponents.expenseFields.forEach(function (element, index) {
    if (index === 1) {
      ++i
    }
    if (index === 0) {
      element.value = revertDateFormat(globalStorage[entryNumber][i])
    } else {
      element.value = globalStorage[entryNumber][i]
    }
    ++i
  })
}

/**
 *
 * @param entryDate
 */
export function revertDateFormat (entryDate) {
  const day = new Date(entryDate).toLocaleString('en-GB', {
    day: '2-digit'
  })
  const month = new Date(entryDate).toLocaleString('en-GB', {
    month: '2-digit'
  })
  const year = new Date(entryDate).toLocaleString('en-GB', {
    year: 'numeric'
  })
  const date = year + '-' + month + '-' + day
  return date
}

/**
 *
 * @param entryNumber
 */
export function openRecordEditForm (entryNumber) {
  loadRecordDetailsIntoForm(entryNumber)
  if (globalStorage[entryNumber][1] === 0) {
    recordManagementFunctions.openExpenseEditForm(htmlComponents.newRecordFormContainers[0], 'Expense')
  } else {
    recordManagementFunctions.openExpenseEditForm(htmlComponents.newRecordFormContainers[0], 'Income')
  }
  addEventListenerToSaveButton(entryNumber)
}

/**
 *
 * @param initalRecords
 */
function loadRecordDetailsIntoStorage (initalRecords) {
  let index = 0
  for (const entry in initalRecords) {
    globalStorage[entry] = initalRecords[entry]
  }
  for (const entry in globalStorage) {
    index = 0
    for (const keyValue in globalStorage[entry]) {
      globalStorage[entry][index++] = globalStorage[entry][keyValue]
      delete globalStorage[entry][keyValue]
    }
  }
}
