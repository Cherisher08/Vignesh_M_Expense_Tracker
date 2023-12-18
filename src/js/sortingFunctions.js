import { addEventListenerForCreatedElements, addLastRecordToTable, getRecordDataColumn } from './dataUpdationFunctions.js'
import { recordViewContainer, sortableRecordHeaders } from './HtmlComponents.js'
import { globalStorage, revertDateFormat } from './index.js'
let orderByDate = false
// const orderByCredit = false
// const orderByDebit = false

/**
 *
 * @param elementIndex
 */
export function sortEventHandler (elementIndex) {
  const recordDataColumns = getRecordDataColumn()
  recordDataColumns.forEach(element => {
    if (element.id === 'no-data-column') {
      elementIndex = 3
    }
  })
  switch (elementIndex) {
    case 0:
      sortByDate()
      break
    case 1:
      // sortByCredit()
      break
    case 2:
      // sortByDebit()
      break
    default:
      console.log('Insufficient Records')
  }
}

/**
 *
 */
function sortByDate () {
  const unsortedMap = new Map()
  let sortedMap
  const sortedArray = []
  for (const index in globalStorage) {
    unsortedMap.set(index, globalStorage[index])
    unsortedMap.get(index)[0] = revertDateFormat(unsortedMap.get(index)[0])
  }
  if (orderByDate) {
    sortedMap = new Map([...unsortedMap.entries()].sort((a, b) => {
      return (a[1][0] >= b[1][0]) ? 1 : -1
    }))
  } else {
    sortedMap = new Map([...unsortedMap.entries()].sort((a, b) => (a[1][0] >= b[1][0]) ? -1 : 1))
  }
  orderByDate = !orderByDate
  for (const [key] of sortedMap) {
    sortedArray.push(sortedMap.get(key))
  }
  createRowContainer(sortedArray)
  updateSortedSymbolInHeader(0, orderByDate)
}

/**
 *
 * @param sortedArray
 * @param initialLoadUp
 */
export function createRowContainer (sortedArray, initialLoadUp) {
  const rowHeader = getRecordDataColumn()[0]
  const recordDataColumns = getRecordDataColumn()
  recordViewContainer.innerHTML = ''
  recordViewContainer.appendChild(rowHeader)
  if (initialLoadUp) {
    for (const key in sortedArray) {
      addLastRecordToTable(sortedArray[key], recordViewContainer)
      addEventListenerForCreatedElements(recordViewContainer, sortedArray[key][7])
    }
  } else {
    for (let i = 0; i < recordDataColumns.length - 1; i++) {
      addLastRecordToTable(sortedArray[i], recordViewContainer)
      addEventListenerForCreatedElements(recordViewContainer, sortedArray[i][7])
    }
  }
}

/**
 *
 * @param sortedByHeader
 * @param orderByType
 */
function updateSortedSymbolInHeader (sortedByHeader, orderByType) {
  sortableRecordHeaders.forEach((element, index) => {
    if (sortedByHeader === index) {
      if (orderByType) {
        element.classList.add('sorted-in-descending')
        element.classList.remove('sorted-in-ascending')
      } else {
        element.classList.add('sorted-in-ascending')
        element.classList.remove('sorted-in-descending')
      }
    } else {
      element.classList.remove('sorted-in-descending', 'sorted-in-ascending')
    }
  })
}
