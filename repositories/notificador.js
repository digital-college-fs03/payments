export async function enviarNotificao (payload) {
    const p = JSON.stringify(payload)
    const URL = 'https://webhook.site/f2fc6b15-56ea-4f29-a438-a32af157a0eb?p=' + encodeURIComponent(p)
    const response = await fetch(URL)
    try {
        if (!response.ok) {
            throw new Error("Não foi possível enviar a notificação da transação")
        }
    } catch(e) {
        console.error(e)
    }
}