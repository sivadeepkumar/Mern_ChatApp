import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./components/pages/Register"
import { Graph } from "./components/pages/Graph"
import { Login } from "./components/pages/Login"
import SetAvator from "./components/pages/SetAvator"
import { FireBase } from "./components/pages/FireBase"
import PhotoList from "./components/pages/Render"
import { Chat } from "./components/pages/Chat"
import Contacts from "./components/pages/Contacts"
import Logout from "./components/pages/Logout"
import { useEffect, useState } from "react"
import { colors } from "@mui/material"

function Acors() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://6b45-125-18-168-34.ngrok-free.app')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(message)
  }, []);

  return (
    <div>
      <h1 style={{ color: 'black' }}>{message}</h1>
    </div>
  );
}


export const App = () => {
  return(
    <BrowserRouter>
    <Routes>
    <Route path ="/acors" element={<Acors/>} />
      <Route path ="/register" element={<Register/>} />
      <Route path ="/login" element={<Login/>} />
      <Route path="/setAvator" element={<SetAvator/>}/>
      <Route path ="/graph" element={<Graph/>} />
      <Route path="/" element={<Chat/>} />
      <Route path="/contact" element={<Contacts/>} />
      <Route path="/firebase" element={<FireBase/>} />
      <Route path="/render" element={<PhotoList/>} />
      {/* <Route path="/logout" element={<Logout/>} /> */}
    </Routes>
    </BrowserRouter>
  )
}

