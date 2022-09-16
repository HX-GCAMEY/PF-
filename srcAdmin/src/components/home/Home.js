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
import salmon from "../imgs/salmon.jpg"
import "./home.css"
import PreView from "../preView/PreView"

const Home = () => {
  const [selected, setSelected] = useState(0)
  const [visual, setVisual] = useState({})
  const [effect2, setEffect2] = useState(null)
  return (
    <>
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
          {selected === 6 && (
            <Orders
              setVisual={setVisual}
              visual={visual}
              setEffect2={setEffect2}
            />
          )}
          {selected === 6 ? (
            <PreView visual={visual} setVisual={setVisual} effect2={effect2} />
          ) : (
            <RightSide />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
