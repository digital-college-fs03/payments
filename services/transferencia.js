import { criarTransferencia } from '../repositories/transferencia.js'
import { atualizarSaldo, recuperarSaldo } from '../repositories/carteira.js'
import { recuperarUsuario } from '../repositories/usuario.js'
import database from '../database.js'
import { autorizarExterno } from '../repositories/autorizador.js'
import { enviarNotificao } from '../repositories/notificador.js'

export default async function (pagador, recebedor, valor) {
    // recuperar, buscar, selecionar o saldo do pagador
    const carteiraPagador = await recuperarSaldo(pagador)
    if (carteiraPagador.saldo < valor) {
        throw new Error('Saldo insuficente')
    }
    const usuario = await recuperarUsuario(pagador)
    if (usuario.tipo === 'lojista') {
        throw new Error('Lojistas só recebem transferências')
    }

    // recuperar o saldo do recebedor
    const carteiraRecebedor = await recuperarSaldo(recebedor)

    let transactionId
    const saldoPagador = Number(carteiraPagador.saldo) - valor
    const saldoRecebedor = Number(carteiraRecebedor.saldo) + valor
    await database.transaction(async function (transaction) {
        // criar a transferencia
        const data = await criarTransferencia(transaction)(pagador, recebedor, valor)
        transactionId = data.pop()
        const atualizar = atualizarSaldo(transaction)
        // atualiza saldo do pagador
        await atualizar(carteiraPagador.id, saldoPagador)
        // atualiza saldo do recebedor
        await atualizar(carteiraRecebedor.id, saldoRecebedor)
        // chama o autorizador externo para validar a transação
        if (await autorizarExterno(transactionId)) {
            return
        }
        throw new Error("Não foi possível autorizar a transação '" + transactionId + "'")
    })
    const payload = {
        transferencia: transactionId,
        pagador: saldoPagador,
        recebedor: saldoRecebedor
    }
    await enviarNotificao(payload)

    return payload
}
