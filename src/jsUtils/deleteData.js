
export default async function deleteData(url, data, token) {

    const { id} = data
    console.log("Id da cancellare: ", data)

        try{
            const response = await fetch(url, {
                method: "DELETE",
                credentials : "include",
                headers: {
                    "content-type" : "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: Number(id)
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
