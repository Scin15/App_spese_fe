import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router'
import UserContext from './components/context/UserContext.jsx'

function App() {
  
  console.log("carico il componente app")
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function checkRefreshToken() {
      const result = await (await fetch("http://localhost:3000/refresh_token", {
        method : "POST",
        credentials : "include",
        headers : {
          "Content-Type" : "application/json"
        }
      }
      )).json()

      console.log("Refresh: ", result)

      setUser({
        accessToken : result.accessToken,
        mail: result.mail,
        id: result.id,
        name: result.name,
        surname: result.surname,
      }) // quando setto l'user come test viene refreshato il componente app?

      /*The set function only updates the state variable for the next render. If you read the state variable after calling the set function, you will still get the old value that was on the screen before your call.*/

      setLoading(false)

    }

    checkRefreshToken()

  }, []) // no dipendenza quindi viene chiamata solo quando carico la pagina

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col bg-red-50 border-1 border-black h-screen">
      <UserContext value={[user, setUser]}>
        <Header />
        <Outlet />
        <Footer />
      </UserContext>
    </div>
  )
}

export default App
