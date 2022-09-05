import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import { CgArrowDownR } from "react-icons/cg"
import { MdDelete } from "react-icons/md"

import "./Customers.css"
import { getTask } from "../../features/orders"
import axios from "axios"
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs"

const Customers = () => {
  const customers = useSelector(state => state.tasks.users)
  const users = customers.filter(e => e.status === "user")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])
  console.log("soy users", users)

  const upgrade = async e => {
    const response = await axios.put(
      `https://pf-seraerror.herokuapp.com/user/${e}`,
      { status: "admin" }
    )
    dispatch(getTask())
    console.log("soy respuesta de upgrate user", response.data)
  }

  const Delete = async e => {
    const response = await axios.delete(
      `https://pf-seraerror.herokuapp.com/user/${e}`
    )
    dispatch(getTask())
    console.log("soy respuesta de delete user", response.data)
  }

  const ban = async e => {
    const response = await axios.put(
      `https://pf-seraerror.herokuapp.com/user/${e}`,
      { status: "banned" }
    )
    dispatch(getTask())
    console.log("soy respuesta de ban user", e)
  }
  return (
    <div className="Table2">
      <h2 className="centrar title">Customers</h2>
      <TableContainer
        className="centrando"
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Surname</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Sex</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {users.map((e, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <div className="botonIcons">
                    <BsFillArrowDownSquareFill onClick={() => ban(e._id)} />
                    <BsFillArrowUpSquareFill onClick={() => upgrade(e._id)} />
                    <MdDelete onClick={() => Delete(e._id)} />
                  </div>
                </TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.surname}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>{e.DNI}</TableCell>
                <TableCell>{e.nationality}</TableCell>
                <TableCell>{e.sex}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Customers
