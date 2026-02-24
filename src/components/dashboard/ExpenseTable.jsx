import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Button } from '@mui/material'
import EditExpense from './EditExpense'
import { 
    useState, 
    useContext} from 'react'
import deleteData from '../../jsUtils/deleteData'
import LoadingContext from '../context/LoadingContext'
import UserContext from '../context/UserContext'
import { distinctArray } from '../../jsUtils/utils'

/* implementazioni: ----------

1. check per selezionare più spese o anche tutte per eliminarle o modificarle in un colpo solo. Inserisco bottoni rimuovi-selezionati e modifica-selezionati; ok
2. bottone per ordinamento per prezzo e per data; ok
2. inserimento opzione per caricamento file per ogni spesa;
3. riformulo le statistiche. Voglio aver la possibilità di filtrare su mese, anno, categoria, sia su grafico a torta che su grafico a barre. 
4. verificare perchè non viene aggiurnato il budget utente; ok
5. categorie inseribili dall'utente nel suo pannello;

Nice to have:

1. Vista generale selezionabile su anno, mese, totale; Devo però introdurre un budget mensile che poi verrà sommato per formare quello annuale? Budget totale separato o somma dei budget annuali?
2. Grafico a linea per visualizzare meglio il trend;

---------- */

const ExpenseTable = ({data, categoryData})=>{

    console.log("Refreshato il componente ExpenseTable")

    const [loading, setLoading] = useContext(LoadingContext)
    const [user] = useContext(UserContext)
    const [edit, setEdit] = useState({isEditing: false, dataID: null})
    const [categoryFilter, setCategoryFilter] = useState("")
    const [descFilter, setDescFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [selected, setSelected] = useState([]);
    const [priceOrder, setPriceOrder] = useState(null);
    const [dataOrder, setDataOrder] = useState(null);

    // questa funzione dovrà rimuovere la spesa dal DB facendo una chiamata DELETE al server e passando l'ID
    const removeExpense = (id)=>{
        //uso il metodo findIndex per recuperare l'indice dell'oggetto che ha l'id passato nella funzione
        //const index = data.findIndex(e=>e.id === id)
        //setto lo stato con un array senza il valore trovato (toSpliced() ritorna un nuovo array)
        //setDataState((data)=>data.toSpliced(index,1))
        deleteData(`${import.meta.env.VITE_END_POINT}/expenses`, {id: id}, user.accessToken)
        .then((e)=>{
            console.log("Spesa cancellata:", e)
            setLoading(true)
        })
    }

    const editExpense = (id)=> {
        //popup tipo form con campi da compilare e confermare
        console.log("Id passati nel setEdit", id);
        setEdit({isEditing: true, dataID: id});
        document.querySelector("dialog").showModal();
    }

    const addSelected = (id) => {
        const index = selected.findIndex((e)=>e===id);
        if (index === -1) {
            // se non ho già l'id nell'array lo aggiungo in fondo
            setSelected([...selected, id]);
            return;
        }
        const newArray = [...selected];
        newArray.splice(index, 1);
        setSelected(newArray);
    }

    // riordino per aver le date decrescenti
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (priceOrder) {
        // 1 = crescente, 2 = decrescente
        data.sort((a, b) => priceOrder === 1 ? b.amount -a.amount : a.amount - b.amount);
        console.log("Dati dopo riordino", data);
    }

    if (dataOrder) {
        // 1 = crescente, 2 = decrescente
        data.sort((a, b) => dataOrder === 1 ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
        console.log("Dati dopo riordino", data);
    }

    // ritorno le righe della tabella a partire dall'array DB
    const rows = data.filter((element)=> {
        console.log(new Date(element.date).getFullYear())
        return element.category.category.toLowerCase().includes(categoryFilter.toLowerCase()) && element.note.toLowerCase().includes(descFilter.toLowerCase())
        && (yearFilter ? new Date(element.date).getFullYear() === Number(yearFilter) : true)
        && (monthFilter ? new Date(element.date).getMonth() === Number(monthFilter) : true)
    }).map((element)=>{
        return (
        <tr key={element.id} className="border-b-[0.1px] border-gray-400 capitalize">
            <td className=''>
                <input className="" type="checkbox" key={element.id} value={element.id} onChange={()=>addSelected(element.id)} />
            </td>
            <td>{element.date?.substring(0, 10)}</td>
            <td>{element.category.category}</td>
            <td>{element.note}</td>
            <td>{element.amount}</td>
            <td>
                <button onClick={()=>{editExpense(element.id)}}>
                    <ModeEditIcon className='hover:text-blue-400 rounded-lg' />
                </button>
                <button onClick={()=>{removeExpense(element.id)}}>
                    <DeleteIcon className='hover:text-blue-400 rounded-lg' />
                </button>
            </td>
        </tr>
        )
    })

    return <div className="flex flex-col basis-full shadow-xl inset-shadow-sm rounded-xl p-[10px] text-sm overflow-auto max-h-200 md:max-h-100">
        <div className='flex flex-col md:flex-row md:items-center'>
            <label htmlFor="filter">Categoria</label>
            <input type="text" className='shadow-xl m-2' id='filter' onChange={(e)=> setCategoryFilter(e.target.value)} />
            <label htmlFor="filter">Descrizione</label>
            <input type="text" className='shadow-xl m-2' id='filter' onChange={(e)=> setDescFilter(e.target.value)} />
            <div className='flex items-center'>
                <label htmlFor="year">Anno</label>
                <select className='shadow-xl m-2' name='year' id='year' onChange={(e)=> setYearFilter(e.target.value)}>
                    <option value=""></option>
                    {distinctArray(data.map((e) => {const year = new Date(e.date).getFullYear();
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
        </div>
        <div>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>{if (!selected.length) return; removeExpense(selected)}}>Cancella selezionati</button>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>{if(!selected.length) return; editExpense(selected)}}>Aggiorna selezionati</button>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>setPriceOrder(priceOrder === 1 ? null : 1)}>Prezzo crescente</button>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>setPriceOrder(priceOrder ===-1 ? null : -1)}>Prezzo decrescente</button>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>setDataOrder(dataOrder === 1 ? null : 1)}>Data crescente</button>
            <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={()=>setDataOrder(dataOrder === -1 ? null : -1)}>Data decrescente</button>

        </div>
        <dialog className='m-auto'>
            <EditExpense data={data} categoryData={categoryData} edit={edit} setEdit={setEdit} setSelected={setSelected} />
        </dialog>
        <div className='flex basis-full overflow-auto max-h-100 mt-[1rem]'>
            <table className="basis-full table-auto">
                <thead>
                    <tr className="border-b-[0.1px] border-gray-400 text-left font-semibold md:text-base p-10">
                        <th scope="col">Seleziona</th>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Importo</th>
                        <th scope="col">Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    </div>
}

export default ExpenseTable
