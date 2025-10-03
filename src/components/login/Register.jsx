import React, {useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router'

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [registerError, setRegisterError] = useState({error: false, message: ""})
    
    // funzione per gestire la registrazione
    const handleRegister = async e=> {
        e.preventDefault()  //per gestire il form non in automatico
        
        const result = await (await fetch("http://localhost:3000/register", {
            method : "POST",
            credentials : 'include',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                mail : email,
                name : name,
                surname : surname,
                password : password,
            })
        }))

        const resultBody = await result.json()

        if (result.status === 200) {
            console.log("Utente registrato: ", resultBody)

            navigate("/")

        } else {
            console.log("Errore nella registrazione")
            console.log(resultBody.error)
            setRegisterError({
                error: true,
                message: resultBody.error
            })
        }
    }
    
    // funzione per gestire ogni input da tastiera
    const handleChange = e=>{
        // da cambiare con uno switch
        if(e.currentTarget.name === "email") {
            setEmail(e.currentTarget.value)
        } else if (e.currentTarget.name === "password") {
            setPassword(e.currentTarget.value)
        } else if (e.currentTarget.name === "name") {
            setName(e.currentTarget.value)
        } else if (e.currentTarget.name === "surname") {
            setSurname(e.currentTarget.value)
        }
    }

    return <div className="flex flex-col items-center justify-between font-mono">
        <div className="m-[10px] font-bold text-3xl">
            REGISTER
        </div>
        <div className="flex flex-col border-black m-[10px]">
            <form className="flex flex-col" onSubmit={handleRegister}>
                <input
                    value={email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder='email'
                    autoComplete={email}
                />
                <input
                    value={name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder='name'
                    autoComplete={name}
                />
                <input
                    value={surname}
                    onChange={handleChange}
                    type="text"
                    name="surname"
                    placeholder='surname'
                    autoComplete={surname}
                />
                <input
                    value={password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder='password'
                    autoComplete={password}
                />
                <p className='text-red-500 text-sm'>
                    {registerError.error && registerError.message}
                </p>
                 <div className="flex justify-between">
                    <button onClick={handleRegister} className="m-[10px] bg-red-100 p-[5px] hover:bg-red-200 rounded-lg">Registrati</button>
                </div>
            </form>
        </div>
    </div>
}

export default Register
