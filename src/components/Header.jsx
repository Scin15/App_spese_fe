import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // import componente per icone
import {  } from '@fortawesome/fontawesome-svg-core' 
import { faHouse as faHouseSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons' //oggetto contenente info icona solid
import { faHouse as faHouseRegular } from '@fortawesome/free-regular-svg-icons'
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import UserContext from './context/UserContext.jsx'



const Header = () => {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    // Logout Callback funtion
const logOutCallBack = async ()=> {
    await (fetch("http://localhost:3000/logout",{
        method : "POST",
        credentials : "include"
    }))

    setUser({})

    navigate("/")
} 

    return <div className="flex justify-between h-[50px] font-mono font-semibold text-2xl">
        
        <div className="flex items-center">
            <NavLink to="/" className={({isActive})=>isActive ? "m-[5px] text-red-500" : "m-[5px] hover:text-red-400"}>
                <FontAwesomeIcon icon={faHouseSolid} />
            </NavLink>

            <NavLink to="about" className={({isActive})=>isActive ? "m-[5px] text-red-500" : "m-[5px] hover:text-red-400"}>
                About
            </NavLink>
        </div>

        <div className="flex items-center">
            <button onClick={logOutCallBack} className="m-[5px] hover:text-red-400">
                Logout
            </button>
            <NavLink to="user" className={({isActive})=>{return isActive?"m-[5px] text-red-500":"m-[5px] hover:text-red-400"}}>
                <FontAwesomeIcon icon={faUserSolid}/>
            </NavLink>

        </div>
    </div>
}

export default Header