import express from 'express'
const app = express()
const port = 3000
import transferencia from './controllers/transferencia.js'

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.send('Hello World!'))

// clean code
app.post('/transaction', transferencia)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})