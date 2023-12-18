import { getRecordFormButtons, getRecordFormTitle, expenseFields } from './HtmlComponents.js'

/**
 *
 * @param {object} newFormContainer - HTML Component containing new Expense Entry Form
 */
export function openNewExpenseForm (newFormContainer) {
  const formTitleContainer = getRecordFormTitle()[0]
  formTitleContainer.innerHTML = 'New Expense Entry'
  const formCreateButtons = getRecordFormButtons()
  formCreateButtons.forEach((element, index) => {
    if (index !== 0) {
      element.classList.add('hide-other-buttons')
    } else {
      element.classList.remove('hide-other-buttons')
    }
  })
  expenseFields.forEach((element) => {
    element.value = ''
  })
  newFormContainer.setAttribute('style', 'display:flex')
}

/**
 *
 * @param {object} newFormContainer - HTML Component containing new Expense Entry Form
 */
export function closeNewExpenseForm (newFormContainer) {
  newFormContainer.setAttribute('style', 'display:none')
}

/**
 *
 * @param recordFormContainer
 * @param recordType
 */
export function openExpenseEditForm (recordFormContainer, recordType) {
  const formTitleContainer = getRecordFormTitle()[0]
  const formCreateButtons = getRecordFormButtons()
  formTitleContainer.innerHTML = `Edit ${recordType} Form`
  formCreateButtons.forEach((element, index) => {
    if (index !== 2) {
      element.classList.add('hide-other-buttons')
    } else {
      element.classList.remove('hide-other-buttons')
    }
  })
  recordFormContainer.setAttribute('style', 'display: flex')
}

/**
 *
 * @param {object} newFormContainer - HTML Component containing new Expense Entry Form
 */
export function openNewIncomeForm (newFormContainer) {
  const formTitleContainer = getRecordFormTitle()[0]
  formTitleContainer.innerHTML = 'New Income Entry'
  const formCreateButtons = getRecordFormButtons()
  formCreateButtons.forEach((element, index) => {
    if (index !== 1) {
      element.classList.add('hide-other-buttons')
    } else {
      element.classList.remove('hide-other-buttons')
    }
  })
  expenseFields.forEach((element) => {
    element.value = ''
  })
  newFormContainer.setAttribute('style', 'display:flex')
}
