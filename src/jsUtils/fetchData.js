
export default async function fetchData(url, token) {

    const response = await fetch(url, {
        credentials : "include",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw new Error(response.status);
    }
    const expense = await response.json();
    return expense;
}

