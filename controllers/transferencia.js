import transferencia from '../services/transferencia.js'

export default async function (request, response) {
    const pagador = request.body.payer
    const recebedor = request.body.payee
    const valor = Number(request.body.value)

    try {
        const resultado = await transferencia(pagador, recebedor, valor)
        response.send(resultado)
    } catch(error) {
        response.status(422).send({ error: error.message })
    }
}
