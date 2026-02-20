
export default async function insertData(url, data, token) {

    const { userid, category_id, amount, note, date } = data

    const response = await fetch(url, {
        method: "POST",
        credentials : "include",
        headers: {
            "content-type" : "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userid: Number(userid),
            category_id: Number(category_id),
            amount: Number(amount),
            note,
            date
        })
    })
    if(!response.ok){
        throw new Error("Inserimento non riuscito");
    }
    const insertedExpense = await response.json();
    return insertedExpense;
}
