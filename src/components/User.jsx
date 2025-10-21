import { useEffect, useState, useContext } from "react"
import UserContext from "./context/UserContext"
import fetchData from "../jsUtils/fetchData"

const User = () => {

    const [user] = useContext(UserContext)
    const [budget, setBudget] = useState()
    const [budgetUpdate, setBudgetUpdate] = useState(0)

    useEffect(()=>{

        const getBudget = async ()=> {
            const result = await fetchData(`${import.meta.env.VITE_END_POINT}/expenses/kpi`, user.accessToken)
            const budget = result.budget
            console.log("Budget attuale:", result.budget)
            setBudget(budget)
            setBudgetUpdate(budget)

        }

        getBudget()

    }, [budget])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log("Aggiornamento budget con questo valore:", budgetUpdate)
        try{
            const result = await fetch(`${import.meta.env.VITE_END_POINT}/budget`, {
                    method: "PUT",
                    credentials : "include",
                    headers: {
                        "content-type" : "application/json",
                        authorization: `Bearer ${user.accessToken}`
                    },
                    body: JSON.stringify({
                        budget: budgetUpdate
                    })
                })

        }catch (error) {
            console.log("Errore nell'update del budget: ", error)
        }

        setBudget(budgetUpdate)
    }

    return <div className="flex flex-col items-center justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
            Budget attuale {budget}
        </div>
        <div>
            <form action="" className="flex flex-col">
                <div className="flex">
                    <label htmlFor="budget" className="m-2">Nuovo budget</label>
                    <input type="number" id="budget" value={budgetUpdate} onChange={(e)=> setBudgetUpdate(e.currentTarget.value)} />
                </div>
                <button onClick={handleSubmit} className="font-normal my-2 mx-5 bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg">Aggiorna</button>
            </form>
        </div>
    </div>
}

export default User
