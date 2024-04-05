import database from '../database.js'

export async function recuperarUsuario(usuario) {
    return database.select()
    .from('usuarios')
    .where('id', usuario)
    .first()
}