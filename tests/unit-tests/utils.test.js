/* eslint-env jest */
import * as unitFunctions from '../../src/js/unitFunctions.js'

// Check if the function removes non-digits characters
test('check removal of non-digit characters', () => {
  const testCase = 'abc32'
  const testResult = '32'
  expect(unitFunctions.formatNumber(testCase)).toEqual(testResult) // 32.
})

// Check if the function detects digit characters
test('check detection of digit characters', () => {
  const testCase = '50acg24'
  const testResult = '5,024'
  expect(unitFunctions.formatNumber(testCase)).toEqual(testResult) // 5,024.
})

// Check if the function detects more than 3 recurring digit characters and replaces with ','
test('check detection of more than 3 recurring digit characters', () => {
  const testCase = '990066'
  const testResult = '990,066'
  expect(unitFunctions.formatNumber(testCase)).toEqual(testResult) // 990,066.
})

// Check if the function removes special characters
test('check denial of special characters', () => {
  const testCase = '4@#$83%5.06'
  const testResult = '483,506'
  expect(unitFunctions.formatNumber(testCase)).toEqual(testResult) // 483,506.
})
