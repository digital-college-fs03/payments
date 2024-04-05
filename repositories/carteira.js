import database from '../database.js'

export async function recuperarSaldo(usuario) {
    return database.select('id', 'saldo')
    .from('carteiras')
    .where('id_usuario', usuario)
    .first()
}

export async function atualizarSaldo(carteira, saldo) {
    return database('carteiras')
    .update({
        saldo: saldo
    })
    .where('id', carteira)
}
