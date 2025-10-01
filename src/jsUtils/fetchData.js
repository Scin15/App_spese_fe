
export default async function fetchData(url) {

        try{
            const response = await fetch(url)
            if(!response.ok){
                throw new Error
            }
            const expense = await response.json()
            return expense
        } catch(error){
            console.log(`Errore nel caricare le spese: ${error}`)
        }
}

