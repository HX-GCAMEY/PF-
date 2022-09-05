import React, { useState } from "react"
import "./sidebar.css"
import { GiAirplaneDeparture } from "react-icons/gi"
import { TbUsers } from "react-icons/tb"
import { BsCardChecklist } from "react-icons/bs"
import { IoAirplaneOutline } from "react-icons/io5"
import { RiAdminLine } from "react-icons/ri"
import { MdOutlineSell } from "react-icons/md"
import { ImUserTie } from "react-icons/im"
import { motion } from "framer-motion"

import { UilBars } from "@iconscout/react-unicons"

const Sidebar = ({ selected, setSelected }) => {
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  }

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <article className="logo" onClick={() => setSelected(0)}>
          <GiAirplaneDeparture className="logo2" />
          <span className="logo3">Fly Mex</span>
        </article>
        <article className="menu">
          <div
            className={selected === 1 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(1)}
          >
            <ImUserTie />
            <span>Admins</span>
          </div>

          <div
            className={selected === 2 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(2)}
          >
            <TbUsers />
            <span>Customers</span>
          </div>

          <div
            className={selected === 3 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(3)}
          >
            <RiAdminLine />
            <span>Banned</span>
          </div>

          <div
            className={selected === 4 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(4)}
          >
            <IoAirplaneOutline />
            <span>Flights</span>
          </div>

          <div
            className={selected === 5 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(5)}
          >
            <MdOutlineSell />
            <span>Products</span>
          </div>

          <div
            className={selected === 6 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(6)}
          >
            <BsCardChecklist />
            <span>Orders</span>
          </div>
        </article>
      </motion.div>
    </>
  )
}

export default Sidebar
