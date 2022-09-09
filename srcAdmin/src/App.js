import Login from "./components/login/Login"
import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"
import "./App.css"
import Prueba from "./components/prueba/Prueba"
import "antd/dist/antd.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/prueba" element={<Prueba />} />
    </Routes>
  )
}

export default App
