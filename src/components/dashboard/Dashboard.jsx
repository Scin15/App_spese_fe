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

function Dashboard() {
  
  const [loading, setLoading] = useState(false)
  const [expenseData, setExpenseData] = useState({expenseList: [], categoryList: [], stats: {
    total: 0,
    maxCategory: {},
    budget: 0,}})
  const [user] = useContext(UserContext)
  const budgetLeft = expenseData.stats.budget - expenseData.stats.total
  
  useEffect(()=>{
    
    const loadData = async () => {
      const loadedExpense = await fetchData(`${import.meta.env.VITE_END_POINT}/expenses`, user.accessToken)
      const loadedCategory = await fetchData(`${import.meta.env.VITE_END_POINT}/category`, user.accessToken)
      const loadStats = await fetchData(`${import.meta.env.VITE_END_POINT}/expenses/kpi/`, user.accessToken)

      setExpenseData({
        expenseList: loadedExpense,
        categoryList: loadedCategory,
        stats: loadStats
      })
      setLoading(false)
    }

    loadData()

  }, [loading])

  // se ancora sto caricando i dati mostro la scritta di caricamento
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <LoadingContext value={[loading, setLoading]}>
      <div className='flex flex-col md:p-[10px] rounded-lg md:m-[30px]'>
        <div>
          <button className='mt-5 ml-4 bg-blue-100 md:p-[5px] hover:bg-blue-200 rounded-lg' onClick={()=>{setLoading(true)}}>
            <SyncIcon />
          </button>
        </div>
        <div className='flex flex-wrap md:flex-nowrap m-[10px]'>
          <MainCard title="Totale spese">
            <div>
              <h1 className='font-bold text-xs md:text-3xl'>{`${expenseData.stats.total} €`}</h1>
            </div>
          </MainCard>
          <MainCard title="Categoria più costosa">
            <div className='flex'>
              <ShoppingCartIcon className='text-blue-800 text-lg m-[5px]'/>
              <div className='flex flex-col m-[5px]'>
                <h1 className='font-bold text-xs md:text-xl'>{expenseData.stats.maxCategory.desc}</h1>
                <p>{`${expenseData.stats.maxCategory.amount} €`}</p>
              </div>
            </div>
          </MainCard>
          <MainCard title="Saldo obiettivo">
            <BarChart data={expenseData.stats} />
            <div>{`Rimasti ${budgetLeft} € su ${expenseData.stats.budget} € budget`}</div>
          </MainCard>
        </div>
        <div className='flex m-[10px]'>
          <ExpenseTable data={expenseData.expenseList} categoryData={expenseData.categoryList} />
        </div>
        <div className='shadow-xl inset-shadow-sm rounded-xl flex justify-center m-[10px]'>
          <InsertExpense categoryData={expenseData.categoryList} />
        </div>
      </div>
    </LoadingContext>
  )
}

export default Dashboard
