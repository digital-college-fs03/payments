import database from '../database.js'

export async function criarTransferencia(pagador, recebedor, valor) {
    return database
    .insert({
        id_usuario_origem: pagador,
        id_usuario_destino: recebedor,
        valor: valor
    })
    .into('transferencias')
}
