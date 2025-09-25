import UserContext from "../context/UserContext"
import LoadingContext from "../context/LoadingContext"
import { useContext } from "react"
import insertData from "../../jsUtils/insertData"

const InsertExpense = ({data, setDataState, categoryData})=>{

    // uso contesto per sapere quale utente è loggato
    const [user] = useContext(UserContext)
    // contesto per refreshare i dati quando inserisco una nuova spesa
    const [loading, setLoading] = useContext(LoadingContext)
    
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

        insertData("http://localhost:3000/expenses", newExpense)
        .then(e=>{console.log("Dati insertiti: ", e)})

        setLoading(true)
    }

    return <div className="flex flex-col items-stretch basis-full text-sm">
        <div className="ml-[10px] mt-[10px] mr-[10px] text-bold text-base">
            Inserisci nuova spesa per utente: {user.mail}
        </div>
            <form action="" className="flex flex-col items-stretch m-[10px]">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="data">Data</label>
                        <input type="date" required name="data" />
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
                    </div>
                </div>
                <div className="flex justify-end mr-[10px] mt-[10px]">
                    <button className="Submit" onClick={insertExpense}>Inserisci</button>
                </div>
            </form>
    </div>
}

export default InsertExpense
