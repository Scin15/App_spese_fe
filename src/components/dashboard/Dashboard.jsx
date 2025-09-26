import { 
  useState, 
  useContext,
  useEffect } from 'react'
import MainCard from './MainCard'
import ExpenseTable from './ExpenseTable'
import InsertExpense from './InsertExpense'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BarChart from './BarChart'
import LoadingContext from '../context/LoadingContext'
import UserContext from '../context/UserContext'
import fetchData from '../../jsUtils/fetchData'
import SyncIcon from '@mui/icons-material/Sync'

// statistiche mensili da caricare con una GET al server
const stats = {
  totalMonth: 520,
  bestCategory:{name: "cibo", value: 210},
  budgetMonth: 800,
}

function Dashboard() {

  console.log("Refreshato il componente Dashboard")
  
  const [loading, setLoading] = useState(true)
  const [expenseData, setExpenseData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [user] = useContext(UserContext)
  const budgetLeft = stats.budgetMonth - stats.totalMonth
  
  useEffect(()=>{
    fetchData(`http://localhost:3000/expenses/${user.id}`)
    .then(e=>{
      setExpenseData(e)
    })
    
    fetchData("http://localhost:3000/category")
    .then(e=>{
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
      <div className='flex flex-col p-[10px] rounded-lg m-[30px]'>
        <div>
          <button className='ml-2 bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg' onClick={()=>{setLoading(true)}}>
            <SyncIcon />
          </button>
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
        <div className='shadow-xl inset-shadow-sm rounded-xl flex justify-center m-[10px]'>
          <InsertExpense data={expenseData} categoryData={categoryData} setDataState={setExpenseData}/>
        </div>
      </div>
    </LoadingContext>
  )
}

export default Dashboard
