import { criarTransferencia } from '../repositories/transferencia.js'
import { atualizarSaldo, recuperarSaldo } from '../repositories/carteira.js'
import { recuperarUsuario } from '../repositories/usuario.js'
import database from '../database.js'

export default async function (pagador, recebedor, valor) {
    // recuperar, buscar, selecionar o saldo do pagador
    const carteiraPagador = await recuperarSaldo(pagador)
    if (carteiraPagador.saldo < valor) {
        return {
            error: 'Saldo insuficente'
        }
    }
    const usuario = await recuperarUsuario(pagador)
    if (usuario.tipo === 'lojista') {
        return {
            error: 'Lojistas só recebem transferências'
        }
    }

    // recuperar o saldo do recebedor
    const carteiraRecebedor = await recuperarSaldo(recebedor)

    let data = []
    const saldoPagador = Number(carteiraPagador.saldo) - valor
    const saldoRecebedor = Number(carteiraRecebedor.saldo) + valor
    await database.transaction(async function (transaction) {
        // criar a transferencia
        data = await criarTransferencia(transaction)(pagador, recebedor, valor)
    
        const atualizar = atualizarSaldo(transaction)
        // atualiza saldo do pagador
        await atualizar(carteiraPagador.id, saldoPagador)
        // atualiza saldo do recebedor
        await atualizar(carteiraRecebedor.id, saldoRecebedor)

        const URL = 'https://webhook.site/fa067203-1bed-4b56-9284-c34c3182e4db'
        // TODO: consultar um serviço autorizador externo
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error('xxxx')
        }
    })
    // TODO: enviar notificação

    return {
        transferencia: data.pop(),
        pagador: saldoPagador,
        recebedor: saldoRecebedor
    }
}
