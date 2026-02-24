
export default async function deleteData(url, data, token) {
    // può essere un id singolo oppure un array
    const { id } = data
    console.log("Id da cancellare: ", id)

        try{
            const response = await fetch(url, {
                method: "DELETE",
                credentials : "include",
                headers: {
                    "content-type" : "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: Array.isArray(id) ? id : Number(id)
                })
            })
            if(!response.ok){
                throw new Error
            }
            const deletedExpense = await response.json()
            console.log("Spesa cancellata: ", deletedExpense)
            return deletedExpense
        } catch(error){
            console.log(`Errore nella delete spesa: ${error}`)
        }
}
