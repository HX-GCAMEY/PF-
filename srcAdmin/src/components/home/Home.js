import React, { useState } from "react"
import { GiEuropeanFlag } from "react-icons/gi"
import Admins from "../admins/Admins"
import Banned from "../banned/Banned"
import Customers from "../Customers/Customers"
import Flights from "../flights/Flights"
import Maindash from "../maindash/Maindash"
import Orders from "../Orders/Orders"
import Products from "../products/Products"
import RightSide from "../RigtSide/RightSide"
import Sidebar from "../Sidebar/Sidebar"
import "./home.css"

const Home = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelected={setSelected} selected={selected} />

        {selected === 0 && (
          <Maindash setSelected={setSelected} selected={selected} />
        )}
        {selected === 1 && <Admins />}
        {selected === 2 && <Customers />}
        {selected === 3 && <Banned />}
        {selected === 4 && <Flights />}
        {selected === 5 && <Products />}
        {selected === 6 && <Orders />}
        <RightSide />
      </div>
    </div>
  )
}

export default Home
