import express from 'express'
const app = express()
const port = 3000
import database from './database.js'

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.post('/transaction', async function (request, response) {
  /**
   * insert into transferencias
   * (id_usuario_origem, id_usuario_destino, valor)
   * values
   * (4, 15, 100)
   */
    const data = await database
      .insert({
        id_usuario_origem: request.body.payer,
        id_usuario_destino: request.body.payee,
        valor: request.body.value
      })
      .into('transferencias')
    response.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})