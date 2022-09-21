import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { motion } from "framer-motion"
import "./Table.css"
import { useDispatch, useSelector } from "react-redux"
import { getPackages } from "../../features/orders"
import React, { useEffect, useState } from "react"
import { Button, Modal } from "antd"
import avioncillo2 from "../imgs/avioncillo2.png"
import paquete from "../imgs/paquete.png"
import moment from "moment"
import Swal from "sweetalert2"
import { avioncilled } from "../../features/tasks"

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status }
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
]

const makeStyle = status => {
  if (status === 0) {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    }
  } else {
    return {
      background: "#ffadad8f",
      color: "red",
    }
  }
}

const BasicTable = () => {
  const packages = useSelector(state => state.tasks.packages)
  const avioncilloState = useSelector(state => state.tasks.avioncillo)
  const splitPackages = packages.slice(-4).reverse()
  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState({})
  const [effectPackage, setEffectPackage] = useState(false)
  const [effect, setEffect] = useState(false)
  const [effect2, setEffect2] = useState(false)
  const [exist, setExist] = useState(false)
  const [exist2, setExist2] = useState(false)

  const dispatch = useDispatch()
  const timePackage = packages.length && packages[packages.length - 1].created

  function calcularDiferenciaMinutos(fecha1, fecha2) {
    let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000 / 60

    return Math.abs(Math.round(diferencia))
  }

  //console.log("soy funcion", calcularDiferenciaMinutos(x, y))
  const x = new Date()
  const y = new Date(timePackage).getFullYear()
  console.log("soy la x", x)
  console.log("soy la y", y)

  /*  var b = moment(x, "hh:mm A")
  var c = moment(y, "hh:mm A")
  var duration = b.diff(c)
  var sera = moment.duration(duration, "milliseconds")
  const diffInMinutes = b.diff(c, "m") */
  console.log("soy avioncillo state", avioncilloState)
  useEffect(() => {
    dispatch(getPackages())

    if (avioncilloState) {
      setEffect2(true)

      setExist(true)

      setTimeout(() => {
        setEffect2(false)
      }, 2400)
      setTimeout(() => {
        setEffectPackage(true)
      }, 1200)
      setTimeout(() => {
        setEffectPackage(false)
      }, 2950)
      setTimeout(() => {
        setEffect(true)
      }, 2800)
      setTimeout(() => {
        dispatch(avioncilled(false))
      }, 30000)
    } else {
      setExist2(true)
    }
  }, [])

  /* let datenow = new Date(timePackage).getFullYear()
  let datenow1 = new Date(timePackage).getMonth() + 1
  let t1 = datenow1 < 10 ? "0" + datenow1 : datenow1
  let datenow2 = new Date(timePackage).getDate()
  let t2 = datenow2 < 10 ? "0" + datenow2 : datenow2
  let datenow3 = new Date(timePackage).getHours()
  let t3 = datenow3 < 10 ? "0" + datenow3 : datenow3
  let datenow4 = new Date(timePackage).getMinutes()
  let t4 = datenow4 < 10 ? "0" + datenow4 : datenow4
  let datenow5 = new Date(timePackage).getSeconds()
  let t5 = datenow5 < 10 ? "0" + datenow5 : datenow5
  let result = `${datenow}-${t1}-${t2}T${t3}:${t4}:${t5}.655Z` */

  //const horario3 = new Date(timePackage).toLocaleTimeString()

  /* const diffInDays = Math.floor((x - y) / (1000 * 60 * 60 * 24))
  console.log("soy diif2", diffInDays) */
  const lastPackage = packages.length && packages[packages.length - 1]

  const abrirModal = e => {
    console.log("soy abrir", e)
    return Swal.fire({
      text: e,

      confirmButtonColor: "#2f9b05",
    })
  }
  const cerrarModal = e => {
    setModal(false)
    console.log(e)
  }
  const accion = () => {
    cerrarModal()
  }

  const description = splitPackages.map(e => e.description)
  console.log("soy packages", packages)
  console.log("soy splitpackages", splitPackages)

  if (exist) {
    return (
      <>
        {effect2 && (
          <motion.div
            className="avioncillo2"
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 1300, opacity: 0 }}
            transition={{ duration: 2.5 }}
          >
            <img src={avioncillo2} alt="ac" />
          </motion.div>
        )}
        {effectPackage && (
          <motion.div
            className="paquete"
            initial={{ y: 0 }}
            animate={{ y: 380, rotate: 360 }}
            transition={{
              duration: 2,
            }}
          >
            <img src={paquete} alt="pat" />
          </motion.div>
        )}
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="Table"
        >
          <h3>Recent Orders</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Origin</TableCell>
                  <TableCell align="left">Destination</TableCell>
                  <TableCell align="left">Discount</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {effect ? (
                  <TableRow>
                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="Table"
                      >
                        {lastPackage.departure.city}
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="Table"
                      >
                        {lastPackage.arrival.city}
                      </motion.div>
                    </TableCell>

                    <TableCell>{lastPackage.amount}</TableCell>

                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="Table"
                      >
                        <span className="status" style={makeStyle(0)}>
                          "Approved"
                        </span>
                      </motion.div>
                    </TableCell>

                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="Table"
                      >
                        <div>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => abrirModal(lastPackage.description)}
                          >
                            Details
                          </Button>
                        </div>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>
                      <div className="divfantasma"></div>
                    </TableCell>
                    <TableCell>
                      <div className="divfantasma"></div>
                    </TableCell>
                    <TableCell>
                      <div className="divfantasma"></div>
                    </TableCell>
                    <TableCell>
                      <div className="divfantasma"></div>
                    </TableCell>
                    <TableCell>
                      <div className="divfantasma"></div>
                    </TableCell>
                  </TableRow>
                )}
                {splitPackages.slice(1, splitPackages.length).map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.departure.city}
                    </TableCell>
                    <TableCell align="left">{row.arrival.city}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(1)}>
                        {i === 0 ? "Approved" : "finalized"}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <div>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => abrirModal(row.description)}
                        >
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </>
    )
  }
  if (exist2) {
    return (
      <>
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="Table"
        >
          <h3>Recent Orders</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Origin</TableCell>
                  <TableCell align="left">Destination</TableCell>
                  <TableCell align="left">Discount</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {splitPackages.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.departure.city}
                    </TableCell>
                    <TableCell align="left">{row.arrival.city}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(i)}>
                        {i === 0 ? "Approved" : "finalized"}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <div>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => abrirModal(row.description)}
                        >
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </>
    )
  }
}

export default BasicTable
