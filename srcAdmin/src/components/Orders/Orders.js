import React, { useState } from "react"
import "./Orders.css"
import axios from "axios"
import { DatePicker, TimePicker } from "antd"
import moment from "moment"
import TextArea from "antd/lib/input/TextArea"

const { RangePicker } = DatePicker

const Orders = () => {
  const [order, setOrder] = useState({ price: "", seating: "", firstclase: "" })
  const handleChange = e => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  const validation = e => {
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
  }

  let disableSubmit = false
  if (Object.keys(order).length !== 12) {
    disableSubmit = false
  } else {
    disableSubmit = true
  }

  const submit = async () => {
    if (Object.keys(order).length !== 12) {
      return alert("fill in all the fields")
    }
    const response = await axios.post(
      "https://pf-seraerror.herokuapp.com/flightsAvailable",
      order
    )
    alert(response.data)
    console.log("soy el post", response.data)
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

  ////////////////////////////////////////////////////////
  console.log(order)
  return (
    <div className="order">
      <h2 className="title">Create Package</h2>

      <form className="form">
        <DatePicker placeholder="select start" />
        <DatePicker placeholder="select end" />
        <div class="relative">
          <input
            name="origin"
            onChange={handleChange}
            type="text"
            id="floating_outlined"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            name="destination"
            onChange={handleChange}
            type="text"
            id="floating_outlined1"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            name="airport"
            onChange={handleChange}
            type="text"
            id="floating_outlined2"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            value={order.price}
            type="text"
            name="price"
            onChange={handleChange}
            onKeyUp={validation}
            id="floating_outlined6"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
            value={order.seating}
            type="text"
            name="seating"
            onChange={handleChange}
            onKeyUp={validation}
            id="floating_outlined8"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined8"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Amount:
          </label>
        </div>
        <div>
          <TextArea rows={7} style={{ height: 120, width: 350 }} />
        </div>
      </form>
      <div className="botonSubmit">
        <button
          onClick={submit}
          type="button"
          className="botonSubmit"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Orders
