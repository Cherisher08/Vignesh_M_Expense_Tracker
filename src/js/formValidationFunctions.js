import { formatNumber } from './unitFunctions.js'

/**
 *
 * @param {object} input - HTML input field Component containing the amount value
 * @param {string} blur - HTML input field blur state in string form
 */
export function formatCurrency (input, blur) {
  let inputValue = input.value
  if (inputValue === '') { return }
  const originalLength = inputValue.length
  let caretPosition = input.selectionStart
  if (inputValue.indexOf('.') >= 0) {
    const decimalPosition = inputValue.indexOf('.')
    let leftSide = inputValue.substring(0, decimalPosition)
    let rightSide = inputValue.substring(decimalPosition)
    leftSide = formatNumber(leftSide)
    rightSide = formatNumber(rightSide)
    if (blur === 'blur') {
      rightSide += '00'
    }
    rightSide = rightSide.substring(0, 2)
    inputValue = leftSide + '.' + rightSide
  } else {
    inputValue = formatNumber(inputValue)
    if (blur === 'blur') {
      inputValue += '.00'
    }
  }
  input.value = inputValue
  const updatedLength = inputValue.length
  caretPosition = updatedLength - originalLength + caretPosition
  input.selectionStart = caretPosition
  input.selectionEnd = caretPosition
}

/**
 *
 * @returns {boolean} - Notify if all required input fields are filled out or not
 * @param {object} requiredInputFields - HTML input components containing required attribute
 */
export function validateForm (requiredInputFields) {
  let booleanOutput = true
  for (const i of requiredInputFields) {
    if (i.value === '') {
      booleanOutput = false
      const alertMessage = i.getAttribute('name').substring(5)
      window.alert(alertMessage + ' must be filled out')
      break
    }
  }
  return booleanOutput
}
