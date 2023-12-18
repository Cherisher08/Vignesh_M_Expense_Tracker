const express = require('express')
const path = require('path')
const { writeFile, readFile, readFileSync } = require('fs')
const defaultPath = './src/SaveFiles/index.json'
const app = express()
app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())

app.get('/load-initial-data', (req, res) => {
  let parsedData = {}
  const fileData = readFileSync(defaultPath, 'utf-8')
  parsedData = JSON.parse(fileData)
  console.log(fileData, parsedData)
  res.json(parsedData)
})

app.post('/create-expense-entry', (req, res) => {
  const postData = req.body
  const { number } = postData
  const entryNumber = number
  readFile(defaultPath, (error, data) => {
    if (error) {
      console.log(error)
      return
    }
    let parsedData = {}
    try {
      parsedData = JSON.parse(data)
      parsedData[entryNumber] = postData
    } catch (err) {
      parsedData[entryNumber] = postData
    } finally {
      writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error)
          return
        }
        console.log('Data written successfully to disk')
      })
    }
  })
  res.json(entryNumber)
})

const port = 5002
app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on PORT http://localhost:${port}`)
})
