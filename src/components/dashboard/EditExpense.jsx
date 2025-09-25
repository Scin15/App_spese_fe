import CloseIcon from '@mui/icons-material/Close'
import { options } from './BarChart'
import updateData from '../../jsUtils/updateData'
import { useContext } from 'react'
import LoadingContext from '../context/LoadingContext'

const EditExpense = ({data, categoryData, setDataState, edit, setEdit})=>{

    const [loading, setLoading] = useContext(LoadingContext)

    //devo sapere che spesa sto modificando
    console.log(categoryData)

    var editedData = {}
    var index = null
    
    if (edit.isEditing) {
        index = data.findIndex((e)=> e.id === edit.dataID)
        editedData = data[index]
        console.log("Riga che sto modificando: ", editedData)
        console.log(editedData.amount)
        console.log(editedData.date)
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

        console.log("Richiesta di update: ", editedExpense)

        updateData("http://localhost:3000/expenses", editedExpense)
        .then(e=>{console.log("Dati aggiornati: ", e)})

        setEdit({isEditing:false, dataID: null})
        setLoading(true)
    }
    
    return <div className={edit.isEditing ? "flex flex-col absolute w-full border-[0.1px] border-grey rounded-xl bg-white items-stretch basis-full text-sm" : "hidden"}>
        <div className="relative ml-[10px] mt-[10px] mr-[10px] text-bold text-base">
            <h1>Modifica spesa</h1>
            <button onClick={()=>{setEdit({isEditing: false, dataID: null})}} className="absolute top-px right-px">
                <CloseIcon />
            </button>
        </div>
            <form action="" className="flex flex-col items-stretch m-[10px]">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="data">Data</label>
                        <input key={edit.dataID} type="date" name="data" defaultValue={editedData.date?.substring(0,10)}></input>
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
                    </div>
                </div>
                <div className="flex justify-end mr-[10px] mt-[10px]">
                    <button className="Submit border-[0.1px] border-grey rounded-sm" onClick={EditExpense}>Modifica</button>
                </div>
            </form>
    </div>
}

export default EditExpense
