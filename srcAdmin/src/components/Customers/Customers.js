import React, { useEffect, useState } from "react"
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
import {
  adminFiltering,
  customerFiltered,
  customerFiltering,
} from "../../features/tasks"
import Filters from "../filters/Filters"
import { Button } from "antd"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import Swal from "sweetalert2"

const Customers = () => {
  const customers = useSelector(state => state.tasks.users)
  const customerFiltered = useSelector(state => state.tasks.customerFiltered)
  const users = customers.filter(e => e.status === "user")
  const [sumador, setSumador] = useState(7)
  const [inputPaginado, setInputPaginado] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])
  console.log("soy users", users)

  const upgrade = async (e, b) => {
    return Swal.fire({
      icon: "info",
      title: "Warning",
      text: `you want to give administrator to ${b}?`,
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "yes",
      confirmButtonColor: "#1890ff",
    }).then(async response => {
      if (response.isConfirmed) {
        await axios.put(`https://pf-seraerror.herokuapp.com/user/${e}`, {
          status: "admin",
        })
        dispatch(customerFiltering(null))
        dispatch(getTask())
        Swal.fire({
          icon: "success",
          tittle: "Success",
          text: `${b} now is admin`,
          timer: 1500,
          confirmButtonColor: "#2f9b05",
        })
      } else {
        return
      }
    })
  }

  const Delete = async (e, b) => {
    return Swal.fire({
      icon: "error",
      title: "Warning",
      text: `you want to eliminate ${b}?`,
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "yes",
      confirmButtonColor: "#1890ff",
    }).then(async response => {
      if (response.isConfirmed) {
        await axios.delete(`https://pf-seraerror.herokuapp.com/user/${e}`)
        dispatch(customerFiltering(null))
        dispatch(getTask())
        Swal.fire({
          icon: "success",
          tittle: "Success",
          text: `${b} banned was removed`,
          timer: 1500,
          confirmButtonColor: "#2f9b05",
        })
      } else {
        return
      }
    })
  }

  const ban = async (e, b) => {
    return Swal.fire({
      icon: "warning",
      title: "Warning",
      text: `you want to ban ${b}?`,
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "yes",
      confirmButtonColor: "#1890ff",
    }).then(async response => {
      if (response.isConfirmed) {
        await axios.put(`https://pf-seraerror.herokuapp.com/user/${e}`, {
          status: "banned",
        })
        dispatch(customerFiltering(null))
        dispatch(getTask())
        Swal.fire({
          icon: "success",
          tittle: "Success",
          text: `${b} was unbaned`,
          timer: 1500,
          confirmButtonColor: "#2f9b05",
        })
      } else {
        return
      }
    })
  }
  let isNull = users
  customerFiltered ? (isNull = customerFiltered) : (isNull = users)

  let inicio = sumador - 7 //19-29

  let disablePrev = false
  if (inicio > 6) {
    disablePrev = true
  }
  let disableNext = true
  if (sumador >= isNull.length) {
    disableNext = false
  }

  const paginado = e => {
    if (e.target.value === "suma") {
      setSumador(sumador + 7)
    } else if (e.target.value === "resta") {
      setSumador(sumador - 7)
    }
    setInputPaginado("")
  }

  let inputChange = e => {
    if (
      !/^([0-9])*$/.test(e.target.value) ||
      e.target.value < 1 ||
      e.target.value > Math.ceil(isNull.length / 7)
    ) {
      return setInputPaginado("")
    }
    setInputPaginado(e.target.value)
    setSumador(e.target.value * 7)
  }

  return (
    <div className="Table2">
      <h2 className="centrar title">Customers</h2>
      <div className="paginado">
        <button
          className="botoncuatro"
          onClick={paginado}
          value="resta"
          disabled={!disablePrev}
        >
          <div className="icono1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </div>
          <span>Prev</span>
        </button>
        <div className="padreinputpaginado">
          <input
            onChange={inputChange}
            value={inputPaginado}
            type="text"
            className="inputpaginado"
            placeholder={Math.round(sumador / 7)}
          />
          &nbsp; of &nbsp;{Math.ceil(isNull.length / 7)}
        </div>
        <button
          className="botoncinco"
          onClick={paginado}
          value="suma"
          disabled={!disableNext}
        >
          <div className="icono">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </div>
          <span>Next</span>
        </button>
      </div>

      <TableContainer
        className="centrando"
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="centrarfilter">
                  <Filters
                    flightsComponent={users}
                    dispatched={customerFiltering}
                  />
                </div>
              </TableCell>
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
            {isNull.slice(inicio, sumador).map((e, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <div className="icons3">
                    <Button size="small" type="primary">
                      <FaArrowDown onClick={() => ban(e._id, e.email)} />
                    </Button>
                    <Button size="small" type="primary">
                      <FaArrowUp onClick={() => upgrade(e._id, e.email)} />
                    </Button>
                    <Button size="small" type="primary">
                      <AiOutlineClose onClick={() => Delete(e._id, e.email)} />
                    </Button>
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
