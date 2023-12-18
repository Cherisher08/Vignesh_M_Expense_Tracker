/**
 *
 */
export async function loadInitialRecords () {
  const fetchData = await fetch('/load-initial-data')
    .then((response) => { return response.json() })
  return fetchData
}

/**
 *
 * @returns {number} - representing nth entry
 * @param {object} expenseFieldValues - Array of values that were present in entry form input fields
 */
async function createExpenseEntry (expenseFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    entry_Date: expenseFieldValues[0],
    entry_type: expenseFieldValues[1],
    entry_description: expenseFieldValues[2],
    entry_amount: expenseFieldValues[3],
    entry_transactor: expenseFieldValues[4],
    entry_payment_mode: expenseFieldValues[5],
    entry_comments: expenseFieldValues[6],
    number: expenseFieldValues[7]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }
  const fetchData = await fetch('/create-expense-entry', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}

/**
 *
 * @returns {object} - Array of values that were present in entry form input fields
 * @param {object} expenseFields - Html input components in expense entry form
 * @param entryType
 * @param entryNumber
 */
export function checkExpenseFields (expenseFields, entryNumber, entryType) {
  const expenseFieldValues = []
  expenseFields.forEach((element, index) => {
    if (index === 0) {
      expenseFieldValues.push(changeDateFormat(element.value))
    } else if (element.value !== undefined) {
      expenseFieldValues.push(element.value)
    } else {
      expenseFieldValues.push(' ')
    }
  })
  expenseFieldValues.push(entryNumber)
  expenseFieldValues.splice(1, 0, entryType)
  createExpenseEntry(expenseFieldValues)
  return expenseFieldValues
}

/**
 *
 * @param entryDate
 */
function changeDateFormat (entryDate) {
  const day = new Date(entryDate).toLocaleString('en-GB', {
    day: '2-digit'
  })
  const month = new Date(entryDate).toLocaleString('en-GB', {
    month: 'short'
  })
  const year = new Date(entryDate).toLocaleString('en-GB', {
    year: 'numeric'
  })
  const date = day + '-' + month + '-' + year
  return date
}
