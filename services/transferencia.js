import { criarTransferencia } from '../repositories/transferencia.js'
import { atualizarSaldo, recuperarSaldo } from '../repositories/carteira.js'
import { recuperarUsuario } from '../repositories/usuario.js'

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
    // TODO: START TRANSACTION
    // criar a transferencia
    const data = await criarTransferencia(pagador, recebedor, valor)
    // recuperar o saldo do recebedor
    const carteiraRecebedor = await recuperarSaldo(recebedor)
    // atualiza saldo do pagador
    const saldoPagador = Number(carteiraPagador.saldo) - valor
    await atualizarSaldo(carteiraPagador.id, saldoPagador)
    // atualiza saldo do recebedor
    const saldoRecebedor = Number(carteiraRecebedor.saldo) + valor
    await atualizarSaldo(carteiraRecebedor.id, saldoRecebedor)

    // TODO: consultar um serviço autorizador externo
    // TODO: enviar notificação

    // TODO: COMMIT / ROLLBACK
    return {
        transferencia: data.pop(),
        pagador: saldoPagador,
        recebedor: saldoRecebedor
    }
}
