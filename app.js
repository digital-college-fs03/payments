import express from 'express'
const app = express()
const port = 3000
import transferencia from './controllers/transferencia.js'

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// clean code
app.post('/transaction', transferencia)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})