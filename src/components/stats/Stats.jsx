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

        const stats = await fetchData(`${import.meta.env.VITE_END_POINT}/expenses/stats`, user.accessToken)
        console.log("Statistiche caricate:", stats)
        setData(stats) 
    }

    loadData()

}, [])

    return <div className="flex flex-col items-start justify-center">
        <div className='shadow-xl inset-shadow-sm rounded-xl flex items-start m-[10px] p-[10px] w-full'>
            <PieChart data={data} />
        </div>
        <div className='shadow-xl inset-shadow-sm rounded-xl flex items-start m-[10px] p-[10px] w-full'>
            <VBarChart data={data} />
        </div>
    </div>
}

export default Stats
