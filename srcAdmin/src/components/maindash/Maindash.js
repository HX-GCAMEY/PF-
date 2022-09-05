import React from "react"
import Cards from "../cards/Cards"
import "./maindash.css"
import Table from "../Table/Table"

const Maindash = () => {
  return (
    <div className="MainDash">
      <h1 className="maindash">Dashboard</h1>
      <Cards />
      <Table />
    </div>
  )
}

export default Maindash
