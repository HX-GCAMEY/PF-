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
import { getFlightsAvailables } from "../../features/orders"
import "./Products.css"

const Products = () => {
  const dispatch = useDispatch()
  const flights = useSelector(state => state.tasks.flightsAv)
  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState({})
  const [order, setOrder] = useState()

  //const flights = flight.sort((a, b) => parseInt(a.date) - parseInt(b.date))
  useEffect(() => {
    dispatch(getFlightsAvailables())
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
      `http://pf-seraerror.herokuapp.com/flightsAvailable/${place.id}`,
      order
    )
    alert(response.data)
    dispatch(getFlightsAvailables())
  }
  const Delete = async () => {
    const response = await axios.delete(
      `http://pf-seraerror.herokuapp.com/flightsAvailable/${place.id}`
    )
    dispatch(getFlightsAvailables())
    setModal(false)
    alert(response.data)
  }

  const accion = () => {
    alert("se preciono boton ok de modal")
    cerrarModal()
  }

  const layout = {
    labelCol: {
      span: 5,
    },

    wrapperCol: {
      span: 16,
    },
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

  /* const validation = e => {
    if (!/^([0-9])*$/.test(order.price)) {
      setOrder({ ...order, price: "" })
    }
    if (!/^([0-9])*$/.test(order.seating)) {
      setOrder({ ...order, seating: "" })
    }
    if (!/^([0-9])*$/.test(order.firstclase)) {
      setOrder({ ...order, firstclase: "" })
    }
    if (!/^([0-9])*$/.test(order.duration)) {
      setOrder({ ...order, duration: "" })
    }
  } */
  //console.log("soy products", flights)
  console.log("soy order", order)
  console.log("soy place", place)

  return (
    <div className="Table2 flightsTable">
      <h2 className="centrar title">Planned Trips</h2>

      <TableContainer style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Turist</TableCell>
              <TableCell>FirstClase</TableCell>
              <TableCell>Departs</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>FlightID</TableCell>
              <TableCell>Gate</TableCell>
              <TableCell>Airport</TableCell>
              <TableCell>Seating</TableCell>
              <TableCell>Duration</TableCell>
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
                        departs: e.departs,
                        origin: e.origin,
                        price: e.price,
                        firstclase: e.firstclase,
                        status: e.status,
                        flightId: e.flightId,
                        gate: e.gate,
                        airport: e.airport,
                        seating: e.seating,
                        duration: e.duration,
                        date: e.date,
                        id: e._id,
                      })
                    }
                  >
                    Modify
                  </Button>
                </TableCell>
                <TableCell>{e.destination}</TableCell>
                <TableCell>{e.origin}</TableCell>
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.firstclase}</TableCell>
                <TableCell>{e.departs}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>{e.flightId}</TableCell>
                <TableCell>{e.gate}</TableCell>
                <TableCell>{e.airport}</TableCell>
                <TableCell>{e.seating}</TableCell>
                <TableCell>{e.duration}</TableCell>
                <TableCell>{e.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title=""
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
              placeholder={place.origin}
              name="origin"
              onChange={handleChange}
              type="text"
              id="floating_outlined"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Origin:
            </label>
          </div>
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
              placeholder={place.price}
              type="text"
              name="price"
              onChange={handleChange}
              id="floating_outlined6"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined6"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Price:
            </label>
          </div>
          <div class="relative">
            <input
              placeholder={place.firstclase}
              type="text"
              name="firstclase"
              onChange={handleChange}
              id="floating_outlined7"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined7"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              FirstClase:
            </label>
          </div>
          <div class="relative">
            <input
              placeholder={place.seating}
              type="text"
              name="seating"
              onChange={handleChange}
              id="floating_outlined8"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined8"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Seating:
            </label>
          </div>
          <div class="relative">
            <input
              placeholder={place.duration}
              type="text"
              name="duration"
              onChange={handleChange}
              id="floating_outlined9"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="floating_outlined9"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Duration:
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

export default Products
