import { useState } from 'react'
import MainCard from './MainCard'
import ExpenseTable from './ExpenseTable'
import InsertExpense from './InsertExpense'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BarChart from './BarChart'
import { useContext } from 'react'
import LoadingContext from '../context/LoadingContext'
import UserContext from '../context/UserContext'
import { useEffect } from 'react'
import fetchData from '../../jsUtils/fetchData'

// statistiche mensili da caricare con una GET al server
const stats = {
  totalMonth: 520,
  bestCategory:{name: "cibo", value: 210},
  budgetMonth: 800,
}

function Dashboard() {
  
  const [loading, setLoading] = useState(true)
  const [expenseData, setExpenseData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [user] = useContext(UserContext)
  const budgetLeft = stats.budgetMonth - stats.totalMonth
  
  useEffect(()=>{
    console.log("Effetto usato")
    fetchData(`http://localhost:3000/expenses/${user.id}`)
    .then(e=>{console.log("Spese lette: ", e)
      setExpenseData(e)
    })
    
    fetchData("http://localhost:3000/category")
    .then(e=>{console.log("Categorie lette: ", e)
      setCategoryData(e)
    })

    setLoading(false)

  }, [loading])

  // se ancora sto caricando i dati mostro la scritta di caricamento
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <LoadingContext value={[loading, setLoading]}>
      <div className='flex flex-col bg-white border-[0.1px] border-grey p-[10px] rounded-lg m-[30px]'>
        <div>
          <button className='border-2 border-black' onClick={()=>{setLoading(true)}}>Refresh</button>
        </div>
        <div className='flex justify-between m-[10px]'>
          <MainCard title="Totale spese del mese">
            <div>
              <h1 className='font-bold text-3xl'>{`${stats.totalMonth } €`}</h1>
            </div>
          </MainCard>
          <MainCard title="Categoria più costosa">
            <div className='flex'>
              <ShoppingCartIcon className='text-blue-800 text-lg m-[5px]'/>
              <div className='flex flex-col m-[5px]'>
                <h1 className='font-bold text-xl'>{stats.bestCategory.name}</h1>
                <p>{`${stats.bestCategory.value} €`}</p>
              </div>
            </div>
          </MainCard>
          <MainCard title="Saldo obiettivo mensile">
            <BarChart data={stats} />
            <div>{`Rimasti ${budgetLeft} € su ${stats.budgetMonth} € budget`}</div>
          </MainCard>
        </div>
        <div className='flex m-[10px]'>
          <ExpenseTable data={expenseData} categoryData={categoryData} setDataState={setExpenseData}/>
        </div>
        <div className='border-[0.1px] border-grey rounded-xl flex justify-center m-[10px]'>
          <InsertExpense data={expenseData} categoryData={categoryData} setDataState={setExpenseData}/>
        </div>
      </div>
    </LoadingContext>
  )
}

export default Dashboard
