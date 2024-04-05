import database from '../database.js'

export default async function (request, response) {
    const pagador = request.body.payer
    const recebedor = request.body.payee
    const valor = Number(request.body.value)
    // criar a transferencia
    const data = await database
        .insert({
            id_usuario_origem: pagador,
            id_usuario_destino: recebedor,
            valor: valor
        })
        .into('transferencias')

    // recuperar, buscar, selecionar o saldo do pagador
    // select
    const carteiraPagador = await database.select('id', 'saldo')
        .from('carteiras')
        .where('id_usuario', pagador)
        .first()

    // recuperar o saldo do recebedor
    // select
    const carteiraRecebedor = await database.select('id', 'saldo')
        .from('carteiras')
        .where('id_usuario', recebedor)
        .first()

    const saldoPagador = Number(carteiraPagador.saldo) - valor
    // update carteiras set saldo = 350 where id = 1
    // debita o saldo da carteira do pagador
    await database('carteiras')
        .update({
            saldo: saldoPagador
        })
        .where('id', carteiraPagador.id)

    const saldoRecebedor = Number(carteiraRecebedor.saldo) + valor
    // adiciona o saldo da carteira do recebedor
    await database('carteiras')
        .update({
            saldo: saldoRecebedor
        })
        .where('id', carteiraRecebedor.id)

    response.send({
        transferencia: data.pop(),
        pagador: saldoPagador,
        recebedor: saldoRecebedor
    })
}
