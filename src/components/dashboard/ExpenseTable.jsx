import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';
import EditExpense from './EditExpense';
import { useState } from 'react';
import deleteData from '../../jsUtils/deleteData';
import { useContext } from 'react';
import LoadingContext from '../context/LoadingContext';

const ExpenseTable = ({data, categoryData, setDataState})=>{

    const [loading, setLoading] = useContext(LoadingContext)
    const [edit, setEdit] = useState({isEditing: false, dataID: null})

    // questa funzione dovrà rimuovere la spesa dal DB facendo una chiamata DELETE al server e passando l'ID
    const removeExpense = (id)=>{
        //uso il metodo findIndex per recuperare l'indice dell'oggetto che ha l'id passato nella funzione
        //const index = data.findIndex(e=>e.id === id)
        //setto lo stato con un array senza il valore trovato (toSpliced() ritorna un nuovo array)
        //setDataState((data)=>data.toSpliced(index,1))
        deleteData("http://localhost:3000/expenses", {id: id})
        .then((e)=>{console.log("Spesa cancellata:", e)})

        setLoading(true)
    }

    const editExpense = (id)=> {
        //popup tipo form con campi da compilare e confermare
        console.log("Voglio modificare la spesa con id: ", id)
        console.log(data)

        setEdit({isEditing: true, dataID: id})
    }

    console.log("Questi i dati per la tabella: ", data)

    // ritorno le righe della tabella a partire dall'array DB
    const rows = data.map((element)=>{
        console.log("La riga che sto leggendo per la tabella è: ", element)
        return (
        <tr key={element.id} className="border-b-[0.1px] border-grey capitalize">
            <td>{element.date?.substring(0, 10)}</td>
            <td>{element.category.category}</td>
            <td>{element.note}</td>
            <td>{element.amount}</td>
            <td>
                <button onClick={()=>{editExpense(element.id)}}>
                    <ModeEditIcon />
                </button>
                <button onClick={()=>{removeExpense(element.id)}}>
                    <DeleteIcon />
                </button>
            </td>
        </tr>
        )
    })

    return <div className="flex flex-col basis-full border-[0.1px] border-grey rounded-xl p-[10px] text-sm">
        <div className='relative'>
            <EditExpense data={data} categoryData={categoryData} setDataState={setDataState} edit={edit} setEdit={setEdit} />
        </div>
        <table className="basis-full table-auto">
            <thead>
                <tr className="border-b-[0.1px] border-grey text-left font-bold text-base">
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
}

export default ExpenseTable
