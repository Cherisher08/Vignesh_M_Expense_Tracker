export const newRecordOptionButtons = document.querySelectorAll('.new-record-option-buttons')
export const currencyInputField = document.querySelectorAll("input[data-type='currency']")
export const cancelBtns = document.getElementsByClassName('cancel-btn')
export const newRecordFormContainers = document.getElementsByClassName('new-record-form-container')
export const createBtn = document.querySelectorAll('.create-btn')
export const newEntryCreationButton = document.querySelectorAll('.btn-primary')
export const requiredInputFields = document.querySelectorAll('.required-input-fields')
export const expenseFields = document.querySelectorAll('.expense-entries')
export const recordViewContainer = document.getElementById('record-view-container')
export const selectedRecordDetail = document.querySelectorAll('.selected-record-detail')
export const editIcon = document.querySelectorAll('.edit-icon')
export const formSaveButton = document.getElementById('form-save-button')
export const sortableRecordHeaders = document.querySelectorAll('.sortable-record-header')

/**
 *
 * @returns {object} -
 */
export function getEditIcons () {
  return [...document.querySelectorAll('.edit-icon')]
}

/**
 *
 */
export function getRecordFormTitle () {
  return [document.getElementById('record-form-title')]
}

/**
 *
 */
export function getRecordFormButtons () {
  return [...document.querySelectorAll('.create-btn')]
}

/**
 *
 * @param rowDataColumn
 */
export function getRecordContainers (rowDataColumn) {
  return [...rowDataColumn.querySelectorAll('.record-container')]
}

/**
 *
 */
export function getNoDataColumn () {
  return document.getElementById('no-data-column')
}
