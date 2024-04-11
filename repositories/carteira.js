import database from '../database.js'

export async function recuperarSaldo(usuario, transaction = database) {
    return transaction.select('id', 'saldo')
    .from('carteiras')
    .where('id_usuario', usuario)
    .first()
}

export function atualizarSaldo(connection = database) {
    return async function (carteira, saldo) {
        return connection('carteiras')
        .update({
            saldo: saldo
        })
        .where('id', carteira)
    }
}
