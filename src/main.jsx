import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Register from './components/login/Register.jsx'
import About from './components/About.jsx'
import Setting from './components/Settings.jsx'
import User from './components/User.jsx'
import Home from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} >
          <Route index element={<Home/>} />
          <Route path="register" element={<Register/>} />
          <Route path="about" element={<About/>} />
          <Route path="setting" element={<Setting />} />
          <Route path="user" element={<User />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>

)
