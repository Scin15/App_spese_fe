import UserContext from "../context/UserContext"
import LoadingContext from "../context/LoadingContext"
import { useContext, useState } from "react"
import insertData from "../../jsUtils/insertData"

const InsertExpense = ({categoryData})=>{

    console.log("Refreshato il componente InsertExpense")

    // uso contesto per sapere quale utente è loggato
    const [user] = useContext(UserContext)
    // contesto per refreshare i dati quando inserisco una nuova spesa
    const [loading, setLoading] = useContext(LoadingContext)
    const [dateErr, setDateErr] = useState(false)
    const [importErr, setImportErr] = useState(false)
    
    // creo lista categorie per il menù a tendina
    const options = categoryData.map((element)=>{
        return <option className="capitalize" key={element.id} value={element.id}>{element.category}</option>
    })   

    // funzione per l'inserimento nuova spesa nel db
    // constollare che siano valorizzati i campi data, categoria e importo
    const insertExpense = (event)=>{
        event.preventDefault()

        const newExpense = {
            userid: user.id,
            date: event.target.form[0].value,
            category_id: event.target.form[1].value,
            note: event.target.form[2].value,
            amount: event.target.form[3].value,
        }

                // controllo che sia inserita una data valida (non nulla e lungezza che rispetta il formato ISO 8601)
        if (newExpense.date == null || newExpense.date == "" || newExpense.date.length > 10){
            console.log("La data è vuota!")
            setDateErr(true)
            return
        }
        
        // controllo che sia inserito un valore non nullo per l'importo
        if (newExpense.amount == null || newExpense.amount == ""){
            console.log("L'importo è vuoto!")
            setImportErr(true)
            return
        }

        insertData(`${import.meta.env.VITE_END_POINT}/expenses`, newExpense, user.accessToken)
        .then(e=>{
            console.log("Dati insertiti: ", e)
            setLoading(true)
        })


    }

    return <div className="flex flex-col items-stretch basis-full text-sm">
        <div className="ml-[10px] mt-[10px] mr-[10px] font-semibold text-base">
            Inserisci nuova spesa
        </div>
            <form action="" className="flex flex-col items-stretch m-[10px]">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="data">Data</label>
                        <input type="date" required name="data" />
                        <p className="text-red-500">{(dateErr) && "Inserisci una data valida"}</p>                        
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="categoria">Categoria</label>
                        <select className="" name="categoria" id="">
                            {options}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nota">Note</label>
                        <input type="text" name="nota" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="importo">Importo</label>
                        <input type="number" required name="valore" />
                        <p className="text-red-500">{(importErr) && "Inserisci un' importo valido"}</p>
                    </div>
                </div>
                <div className="flex justify-end mr-[10px] mt-[10px]">
                    <button className='font-normal m-[2px] bg-blue-100 p-[5px] hover:bg-blue-200 rounded-lg' onClick={insertExpense}>Inserisci</button>
                </div>
            </form>
    </div>
}

export default InsertExpense
