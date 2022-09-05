import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import axios from "axios"
import React, { useEffect } from "react"
import { BsFillArrowUpSquareFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { getTask } from "../../features/orders"
import { GiJumpAcross } from "react-icons/gi"

const Banned = () => {
  const dispatch = useDispatch()
  const customers = useSelector(state => state.tasks.users)
  const banned = customers.filter(e => e.status === "banned")

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])

  const Delete = async e => {
    const response = await axios.delete(
      `https://pf-seraerror.herokuapp.com/user/${e}`
    )
    dispatch(getTask())
    console.log("soy respuesta de delete user", response.data)
  }

  const unban = async e => {
    const response = await axios.put(
      `https://pf-seraerror.herokuapp.com/user/${e}`,
      { status: "user" }
    )
    dispatch(getTask())
    console.log("soy respuesta de unban user", response.data)
  }

  const upgrade = async e => {
    const response = await axios.put(
      `https://pf-seraerror.herokuapp.com/user/${e}`,
      { status: "admin" }
    )
    dispatch(getTask())
    console.log("soy respuesta de upgrate user", response.data)
  }

  return (
    <div className="Table2">
      <h2 className="centrar title">Banned Users</h2>
      <TableContainer
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
            {banned.map((e, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <div className="botonIcons">
                    <BsFillArrowUpSquareFill onClick={() => unban(e._id)} />
                    <GiJumpAcross onClick={() => upgrade(e._id)} />
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

export default Banned
