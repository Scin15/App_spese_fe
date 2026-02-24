
export default async function updateData(url, data, token) {
    // l'id può essere singolo oppure un array
    const { id, category_id, amount, note, date } = data
    console.log("Dati da aggiornare: ", data);
    console.log("I da aggiornare: ", id);

        try{
            const response = await fetch(url, {
                method: "PUT",
                credentials : "include",
                headers: {
                    "content-type" : "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: Array.isArray(id) ? id : Number(id),
                    category_id: Number(category_id),
                    amount: Number(amount),
                    note,
                    date
                })
            })
            if(!response.ok){
                throw new Error;
            }
            const insertedExpense = await response.json()
            console.log("Spesa modificata: ", insertedExpense)
            return insertedExpense
        } catch(error){
            console.log(`Errore nell'update nuova spesa: ${error}`)
        }
}
