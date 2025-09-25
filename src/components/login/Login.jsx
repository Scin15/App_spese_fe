import React, {useState, useContext, useEffect } from 'react'
import { Link } from 'react-router'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router'

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    // funzione per gestire il login
    const handleSubmit = async e=>{
        e.preventDefault()  //per gestire il form non in automatico
        const result = await (await fetch("http://localhost:3000/login", {
            method : "POST",
            credentials : 'include',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                mail : email,
                password : password
            })
        })).json()

        if(result.accessToken){
            setUser({
                accessToken : result.accessToken,
                mail: result.mail,
            })

            navigate("/")

        }else {
            console.log(result.error)
        }
    }

    // funzione per gestire ogni input da tastiera
    const handleChange = e=>{
        if(e.currentTarget.name ==="email") {
            setEmail(e.currentTarget.value)
        } else {
            setPassword(e.currentTarget.value)
        }
    }

    return <div className="flex flex-col items-center justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
            LOGIN
        </div>
        <div className="flex flex-col border-black m-[10px]">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder='email'
                    autoComplete='email'
                />
                <input
                    value={password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder='password'
                    autoComplete='password'
                />
                 <div className="flex justify-between">
                    <button onClick={handleSubmit} className="m-[10px] bg-red-100 p-[5px] hover:bg-red-200 rounded-lg">Login</button>
                    <NavLink to="/register" className="m-[10px] bg-red-100 p-[5px] hover:bg-red-200 rounded-lg">Registrati</NavLink>
                </div>
            </form>
        </div>
    </div>
}

export default Login