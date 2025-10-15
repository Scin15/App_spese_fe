
export default async function fetchData(url, token) {

        try{
            const response = await fetch(url, {
                credentials : "include",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })
            if(!response.ok){
                throw new Error
            }
            const expense = await response.json()
            return expense
        } catch(error){
            console.log(`Errore nel caricare le spese: ${error}`)
        }
}

