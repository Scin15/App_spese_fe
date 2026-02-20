import PieChart from "./PieChart"
import VBarChart from "./VBarChart"
import fetchData from "../../jsUtils/fetchData"
import { useState, useEffect, useContext } from "react"
import UserContext from "../context/UserContext"
import { distinctArray } from '../../jsUtils/utils'

const Stats = () => {

    const [user, setUser] = useContext(UserContext);
    const [data, setData] = useState({
        categoryAmount: [],
        monthlyAmount: []
    });
    const [yearFilter, setYearFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");

    useEffect(()=>{
        const loadData = async () => {
            const stats = await fetchData(`${import.meta.env.VITE_END_POINT}/expenses/stats`, user.accessToken)
            console.log("Statistiche caricate:", stats)
            setData(stats) 
        }
        loadData()
    }, [])

    const dataFiltered = {...data};
    dataFiltered.monthlyAmount = data.monthlyAmount.filter((e) => {
        const year = new Date(e.yearmonth).getFullYear();
        const month = new Date(e.yearmonth).getMonth();
        //filtro sull'anno e il mese solamente se ho settato il filtro anno o il filtro mese o entrambi. Se non ho settato anno, la condizione !yearFilter è soddisfatta, stessa cosa per monthFilter
        return (!yearFilter || year === Number(yearFilter)) && (!monthFilter || month === Number(monthFilter));
    })

    //potrei far si che passo una query string al backend che mi restituisce le statistiche filtrate.

    return (
        <div className="flex flex-col items-center">
            <div className='shadow-xl inset-shadow-sm rounded-xl flex items-start m-[10px] p-[10px] w-full'>
                <PieChart data={data} />
            </div>
            <div>
                <label htmlFor="year">Anno</label>
                <select className='shadow-xl m-2' name='year' id='year' onChange={(e)=> setYearFilter(e.target.value)}>
                    <option value=""></option>
                    {distinctArray(data.monthlyAmount.map((e) => {const year = new Date(e.yearmonth).getFullYear();
                    return (year);})).map((e) => <option key={e} value={e}>{e}</option>)
                }
                </select>
                <label htmlFor="month">Mese</label>
                <select className='shadow-xl m-2' name='month' id='month' onChange={(e)=> setMonthFilter(e.target.value)}>
                    <option value=""></option>
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map((e) => <option key={e} value={e}>{e+1}</option>)
                    }
                </select>
            </div>
            <div className='shadow-xl inset-shadow-sm rounded-xl flex items-start m-[10px] p-[10px] w-full'>
                <VBarChart data={dataFiltered} />
            </div>
        </div>
    )
}

export default Stats
