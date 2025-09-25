import Login from "./login/Login.jsx"
import { useContext } from "react"
import UserContext from "./context/UserContext.jsx"
import Dashboard from "./dashboard/Dashboard.jsx"

const Home = ()=>{
    const [user, setUser] = useContext(UserContext)
    if(user.accessToken){
        return <Dashboard />
    } else {
        return <Login />
    }
}

export default Home