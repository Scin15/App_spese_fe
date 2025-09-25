import { useContext } from "react"
import UserContext from "./context/UserContext"

const Setting = () => {

    const provaContesto = useContext(UserContext)
    console.log("Questo è il contesto utente:", provaContesto)

    return <div className="flex flex-col items-center justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
            SETTINGS
        </div>
    </div>
}

export default Setting