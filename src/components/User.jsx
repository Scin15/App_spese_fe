import { useState, useEffect } from "react"
import fetchData from "../jsUtils/fetchData"
import Table from "./Table"

const url = "http://localhost:3000/expenses"
const testJson = {
    id : 1,
    userName : "Pluto"
}

const User = () => {

    const [expense, setExpense] = useState(null)

    useEffect(()=>{
        fetchData(url)
        .then((res)=>{
            setExpense(res)
        })
    }, [0])

    return <div className="flex flex-col items-center justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
            USER
        </div>
        <Table content={expense} />
    </div>
}

export default User