import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { Button, DatePicker, Modal, TimePicker } from "antd"
import axios from "axios"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFlights } from "../../features/orders"
import Filters from "../filters/Filters"
import { filtered2 } from "../../features/tasks"
import "./Flights.css"
import { IoSettingsSharp } from "react-icons/io5"
import FilterProduct from "../filterProduct/FilterProduct"

const Flights = () => {
  const dispatch = useDispatch()
  const flights = useSelector(state => state.tasks.flights)
  const flightsFiltered2 = useSelector(state => state.tasks.flightsFiltered2)
  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState({})
  const [order, setOrder] = useState({})
  const [sumador, setSumador] = useState(7)
  const [inputPaginado, setInputPaginado] = useState("")
  useEffect(() => {
    dispatch(getFlights())
  }, [])

  const abrirModal = e => {
    console.log("soy abrir", e)
    setModal(true)
    setPlace(e)
  }
  const cerrarModal = e => {
    setModal(false)
    console.log(e)
  }

  const putFlight = async e => {
    setModal(false)
    const response = await axios.put(
      `http://pf-seraerror.herokuapp.com/flights/${place.id}`,
      order
    )
    alert(response.data)
    dispatch(getFlights())
  }
  const Delete = async () => {
    const response = await axios.delete(
      `http://pf-seraerror.herokuapp.com/flights/${place.id}`
    )
    dispatch(getFlights())
    setModal(false)
    alert(response.data)
  }

  const accion = () => {
    alert("se preciono boton ok de modal")
    cerrarModal()
  }

  const handleChange = e => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }
  const handleChange2 = e => {
    if (!e) {
      return
    }
    const response = moment(e).format("DD-MM-YYYY")
    setOrder({ ...order, date: response })
  }
  const handleChange3 = (a, b) => {
    setOrder({ ...order, departs: b })
  }
  let isNull = flights
  flightsFiltered2 ? (isNull = flightsFiltered2) : (isNull = flights)

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

  console.log("soy flights", flights)

  return (
    <div className="Table2 ">
      <h2 className="centrar title">Flights in Progress</h2>
      <div className="paginado">
        <FilterProduct flightsComponent={flights} dispatched={filtered2} />
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
        className="centrarcaja"
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Departures Aiport</TableCell>
              <TableCell>Arrival Airport</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Seating</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isNull.slice(inicio, sumador).map((e, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{e.departure.city}</TableCell>
                <TableCell>{e.arrival.city}</TableCell>
                <TableCell>{e.departure.airport}</TableCell>
                <TableCell>{e.arrival.airport}</TableCell>
                <TableCell>{e.departure.date}</TableCell>
                <TableCell>{e.arrival.date}</TableCell>
                <TableCell>{e.departure.time}</TableCell>
                <TableCell>{e.arrival.time}</TableCell>
                <TableCell>{e.totalSeats}</TableCell>

                <TableCell>{e.duration}</TableCell>
                <TableCell>{e.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="title"
        open={modal}
        onCancel={cerrarModal}
        onOk={accion}
        footer={[
          <Button onClick={Delete}>Delete</Button>,
          <Button onClick={cerrarModal}>Cancel</Button>,
          <Button name="dsf" onClick={putFlight}>
            Send
          </Button>,
        ]}
      >
        <form className="form form2">
          <div>
            <DatePicker
              id="pickers"
              onChange={handleChange2}
              placeholder={place.date}
            />
          </div>
          <span>
            <TimePicker
              id="pickers"
              placeholder={place.departs}
              use12Hours
              format="h:mm A" // onChange?: ((value: moment.Moment | null, dateString: string) => void) | undefined
              onChange={handleChange3}
            />
          </span>

          <div class="relative">
            <input
              placeholder={place.destination}
              name="destination"
              onChange={handleChange}
              type="text"
              id="floating_outlined1"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined1"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Destination:
            </label>
          </div>
          <div class="relative">
            <input
              placeholder={place.airport}
              name="airport"
              onChange={handleChange}
              type="text"
              id="floating_outlined2"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined2"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Airport:
            </label>
          </div>

          <div class="relative">
            <input
              placeholder={place.status}
              name="status"
              onChange={handleChange}
              type="text"
              id="floating_outlined4"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined4"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Status:
            </label>
          </div>

          <div class="relative">
            <input
              placeholder={place.gate}
              name="gate"
              onChange={handleChange}
              type="text"
              id="floating_outlined5"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined5"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Gate:
            </label>
          </div>
          <div class="relative">
            <input
              placeholder={place.flightId}
              name="flightId"
              onChange={handleChange}
              type="text"
              id="floating_outlined11"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined11"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              FlightId:
            </label>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Flights
