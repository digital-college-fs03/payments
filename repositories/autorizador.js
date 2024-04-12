export async function autorizarExterno (transaction) {
    const URL = 'https://webhook.site/fa067203-1bed-4b56-9284-c34c3182e4db?transactionId=' + transaction
    const response = await fetch(URL)
    return response.ok
}