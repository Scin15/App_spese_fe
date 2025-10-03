import PieChart from "./PieChart"
import VBarChart from "./VBarChart"
import fetchData from "../../jsUtils/fetchData"
import { useState, useEffect, useContext } from "react"
import UserContext from "../context/UserContext"

const Stats = () => {

    const [user, setUser] = useContext(UserContext)
    const [data, setData] = useState({
        categoryAmount: [],
        monthlyAmount: []
    })

useEffect(()=>{

    const loadData = async () => {

        const stats = await fetchData(`http://localhost:3000/expenses/stats/${user.id}`)
        console.log("Statistiche caricate:", stats)
        setData(stats) 
    }

    loadData()

}, [])

    return <div className="flex flex-col items-start justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
        </div>
        <div className='shadow-xl inset-shadow-sm rounded-xl flex justify-center m-[10px] p-[10px]'>
            <PieChart data={data} />
        </div>
        <div className='shadow-xl inset-shadow-sm rounded-xl flex justify-center m-[10px] p-[10px]'>
            <VBarChart data={data} />
        </div>
    </div>
}

export default Stats
