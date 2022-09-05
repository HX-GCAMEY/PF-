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
import "./Flights.css"

const Flights = () => {
  const dispatch = useDispatch()
  const flights = useSelector(state => state.tasks.flights)
  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState({})
  const [order, setOrder] = useState({})
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

  console.log("soy flights", flights)

  return (
    <div className="Table2 flightsTable">
      <h2 className="centrar title">Flights in Progress</h2>

      <TableContainer
        className="centrarcaja"
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Airport</TableCell>
              <TableCell>Gate</TableCell>
              <TableCell>Arrives</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>FlightID</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((e, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Button
                    type="primary"
                    onClick={() =>
                      abrirModal({
                        destination: e.destination,
                        status: e.status,
                        flightId: e.flightId,
                        gate: e.gate,
                        airport: e.airport,
                        date: e.date,
                        id: e._id,
                      })
                    }
                  >
                    Modify
                  </Button>
                </TableCell>
                <TableCell>{e.destination}</TableCell>
                <TableCell>{e.airport}</TableCell>
                <TableCell>{e.gate}</TableCell>
                <TableCell>{e.departs}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>{e.flightId}</TableCell>
                <TableCell>{e.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="title"
        visible={modal}
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
