import CloseIcon from '@mui/icons-material/Close'
import { options } from './BarChart'
import updateData from '../../jsUtils/updateData'
import { useContext, useState } from 'react'
import LoadingContext from '../context/LoadingContext'
import UserContext from '../context/UserContext'

const EditExpense = ({data, categoryData, edit, setEdit})=>{

    console.log("Refreshato il componente EditExpense")

    const [loading, setLoading] = useContext(LoadingContext)
    const [user] = useContext(UserContext)
    const [dateErr, setDateErr] = useState(false)
    const [importErr, setImportErr] = useState(false)

    //devo sapere che spesa sto modificando
    //console.log(categoryData)

    var editedData = {}
    var index = null
    
    if (edit.isEditing) {
        index = data.findIndex((e)=> e.id === edit.dataID)
        editedData = data[index]
    }

    const options = categoryData.map((element)=>{
        return <option className="capitalize" key={element.id} value={element.id}>{element.category}</option>
    })

    // invio una richiesta PUT al server per la modifica
    const EditExpense = (event)=>{
        event.preventDefault()

        const editedExpense = {
            id: edit.dataID,
            date: event.target.form[0].value,
            category_id: event.target.form[1].value,
            note: event.target.form[2].value,
            amount: event.target.form[3].value,
        }

        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const convertedDate = new Date(editedExpense.date);
        // controllo che sia inserita una data valida (non nulla e lungezza che rispetta il formato ISO 8601). Controllo anche che la data inserita non sia successiva al giorno in cui la sto inserendo.
        if (!editedExpense.date || editedExpense.date.length > 10 || convertedDate >= tomorrow){
            setDateErr(true);
            return;
        }
        
        // controllo che sia inserito un valore non nullo per l'importo
        if (editedExpense.amount == null || editedExpense.amount == ""){
            console.log("L'importo è vuoto!")
            setImportErr(true)
            return
        }

        console.log("Richiesta di update: ", editedExpense)

        updateData(`${import.meta.env.VITE_END_POINT}/expenses`, editedExpense, user.accessToken)
        .then(e=>{
            console.log("Dati aggiornati: ", e)
            setLoading(true)
        })

        setEdit({isEditing:false, dataID: null})
    }
    
    return <div className={edit.isEditing ? "flex flex-col absolute w-full shadow-xl rounded-xl bg-white items-stretch basis-full text-sm" : "hidden"}>
        <div className="relative ml-[10px] mt-[10px] mr-[10px] text-bold text-base">
            <h1>Modifica spesa</h1>
            <button onClick={()=>{
                setEdit({isEditing: false, dataID: null})
                setDateErr(false)
                setImportErr(false)
                }} className="absolute top-px right-px">
                <CloseIcon className='hover:text-blue-400 rounded-lg' />
            </button>
        </div>
            <form action="" className="flex flex-col items-stretch m-[10px]">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="data">Data</label>
                        <input key={edit.dataID} type="date" name="data" defaultValue={editedData.date?.substring(0,10)}></input>
                        <p className="text-red-500">{(dateErr) && "Inserisci una data valida"}</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="categoria">Categoria</label>
                        <select key={edit.dataID} className="" name="categoria" id="" defaultValue={editedData.category_id}>
                            {options}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nota">Note</label>
                        <input key={edit.dataID} type="text" name="nota" defaultValue={editedData.note} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="importo">Importo</label>
                        <input key={edit.dataID} type="number" name="valore"  defaultValue={editedData.amount} />
                        <p className="text-red-500">{(importErr) && "Inserisci un' importo valido"}</p>
                    </div>
                </div>
                <div className="flex justify-end mr-[10px] mt-[10px]">
                    <button className="font-normal m-[10px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg" onClick={EditExpense}>Modifica</button>
                </div>
            </form>
    </div>
}

export default EditExpense
