import { getRecordContainers } from './HtmlComponents.js'
import { loadRecordDetails, globalStorage, openRecordEditForm } from './index.js'

/**
 *
 * @param {object} lastExpenseEntry - Array of values that were present in entry form input fields
 * @param {object} recordViewContainer - HTML div component containing the records Table
 */
export function addLastRecordToTable (lastExpenseEntry, recordViewContainer) {
  const htmlMarkup = `<div class="record-data-column" id="${lastExpenseEntry[7]}">
                        <div class="record-container">${lastExpenseEntry[0]}</div>
                        <div class="record-container">${lastExpenseEntry[1] === 0 ? 'Expense' : 'Income'}</div>
                        <div class="record-container">${lastExpenseEntry[2]}</div>
                        <div class="record-container">${lastExpenseEntry[1] === 0 ? '' : lastExpenseEntry[3]}</div>
                        <div class="record-container">${lastExpenseEntry[1] === 0 ? lastExpenseEntry[3] : ''}</div>
                        <div class="record-container edit-options">
                          <button class="edit-icon"><img src="../../Assets/icons8-edit.svg" alt="Edit Icon"></button>
                        </div>
                        <div class="record-container small-header delete-options">
                          <button class="delete-icon"><img src="../../Assets/icons8-delete-button.svg" alt="Delete Icon"></button>
                        </div>
                      </div>`
  recordViewContainer.insertAdjacentHTML('beforeend', htmlMarkup)
}

/**
 *
 * @param {object} recordViewContainer -
 * @param {number} globalCounter -
 */
export function addEventListenerForCreatedElements (recordViewContainer, globalCounter) {
  addEventListenerForRowDataColumns(recordViewContainer, globalCounter)
  addEventListenerForDeleteIcons(recordViewContainer, globalCounter)
  addEventListenerForEditIcons(recordViewContainer, globalCounter)
}

/**
 *
 * @param recordViewContainer
 * @param globalCounter
 */
function addEventListenerForRowDataColumns (recordViewContainer, globalCounter) {
  const newRecordDataColumn = recordViewContainer.querySelectorAll('.record-data-column')[recordViewContainer.querySelectorAll('.record-data-column').length - 1]
  newRecordDataColumn.addEventListener('click', () => {
    loadRecordDetails(globalCounter)
  })
}

/**
 *
 * @param recordViewContainer
 */
function addEventListenerForEditIcons (recordViewContainer) {
  const newEditIcon = recordViewContainer.querySelectorAll('.edit-icon')[recordViewContainer.querySelectorAll('.edit-icon').length - 1]
  newEditIcon.addEventListener('click', (e) => {
    const indexNumber = getSelectedIconIndexNumber(newEditIcon, 'edit')
    const newRecordDataColumn = getRecordDataColumn()[indexNumber]
    openRecordEditForm(newRecordDataColumn.id)
    e.stopPropagation()
  })
}

/**
 *
 * @param recordViewContainer
 * @param globalCounter
 */
function addEventListenerForDeleteIcons (recordViewContainer, globalCounter) {
  const newDeleteIcon = recordViewContainer.querySelectorAll('.delete-icon')[recordViewContainer.querySelectorAll('.delete-icon').length - 1]
  newDeleteIcon.addEventListener('click', (e) => {
    const elementIndex = getSelectedIconIndexNumber(newDeleteIcon, 'delete')
    if (elementIndex !== -1) { deleteRecordFromTable(elementIndex, getRecordDataColumn()) }
    deleteRecordFromStorage(globalCounter)
    e.stopPropagation()
  })
}

/**
 *
 * @returns {object} -}
 */
export function getRecordDataColumn () {
  return [...document.querySelectorAll('.record-data-column')]
}

/**
 *
 * @param {object} noDataColumn - HTML div component to display no data available
 */
export function removeNoDataColumn (noDataColumn) {
  if (noDataColumn !== null) { noDataColumn.remove() }
}

/**
 *
 * @param {object} recordViewContainer - HTML div component containing the records Table
 */
export function addNoDataColumn (recordViewContainer) {
  const htmlMarkup = `<div class="record-data-column" id="no-data-column">
                        <p class="no-data-to-display">No Records to Display!!!</p>
                      </div>`
  recordViewContainer.insertAdjacentHTML('beforeend', htmlMarkup)
}

/**
 *
 * @param {number} entryNumber -
 * @param {object} recordDataColumns -
 */
function deleteRecordFromTable (entryNumber, recordDataColumns) {
  recordDataColumns[entryNumber].remove()
  const rowDataColumnsCount = getRecordDataColumn().length
  if (rowDataColumnsCount <= 1) {
    addNoDataColumn(recordDataColumns[0].parentElement)
  }
}

/**
 *
 * @param {number} entryNumber -
 */
function deleteRecordFromStorage (entryNumber) {
  delete globalStorage[entryNumber]
}

/**
 *
 * @returns {number} -
 * @param {object} consideredIcon -
 * @param {string} iconType
 */
export function getSelectedIconIndexNumber (consideredIcon, iconType) {
  let allIcons
  if (iconType === 'delete') {
    allIcons = document.querySelectorAll('.delete-icon')
  } else {
    allIcons = document.querySelectorAll('.edit-icon')
  }
  for (let i = 0; i < allIcons.length; i++) {
    if (allIcons[i] === consideredIcon) {
      return i + 1
    }
  }
  return -1
}

/**
 *
 * @param elementIndex
 * @param editedEntryValues
 * @param rowDataColumns
 */
export function editRecordInTable (editedEntryValues, rowDataColumns) {
  const rowDataColumnId = findRowDataColumn(editedEntryValues, rowDataColumns)
  const recordFields = getRecordContainers(rowDataColumns[rowDataColumnId])
  recordFields[0].innerHTML = editedEntryValues[0]
  recordFields[1].innerHTML = (editedEntryValues[1] === 0) ? 'Expense' : 'Income'
  recordFields[2].innerHTML = editedEntryValues[2]
  recordFields[3].innerHTML = (editedEntryValues[1] === 0) ? '' : editedEntryValues[3]
  recordFields[4].innerHTML = (editedEntryValues[1] === 0) ? editedEntryValues[3] : ''
}

/**
 *
 * @param editedEntryValues
 * @param rowDataColumns
 */
function findRowDataColumn (editedEntryValues, rowDataColumns) {
  let result = 0
  rowDataColumns.forEach((element, index) => {
    if (element.id === editedEntryValues[7].toString()) {
      result = index
    }
  })
  return result
}
