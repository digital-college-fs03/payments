import database from '../database.js'

export function criarTransferencia (connection = database) {
    return async function (pagador, recebedor, valor) {
        return connection
        .insert({
            id_usuario_origem: pagador,
            id_usuario_destino: recebedor,
            valor: valor
        })
        .into('transferencias')
    }
}
