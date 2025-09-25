
export default async function updateData(url, data) {

    const { id, category_id, amount, note, date } = data
    console.log("Dati da aggiornare: ", data)

        try{
            const response = await fetch(url, {
                method: "PUT",
                credentials : "include",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify({
                    id: Number(id),
                    category_id: Number(category_id),
                    amount: Number(amount),
                    note,
                    date
                })
            })
            if(!response.ok){
                throw new Error
            }
            const insertedExpense = await response.json()
            console.log("Spesa modificata: ", insertedExpense)
            return insertedExpense
        } catch(error){
            console.log(`Errore nell'update nuova spesa: ${error}`)
        }
}
