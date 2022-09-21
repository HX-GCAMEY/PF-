import React, { useEffect, useState } from "react"
import "./Orders.css"
import axios from "axios"
import { DatePicker, Select, TimePicker } from "antd"
import moment from "moment"
import TextArea from "antd/lib/input/TextArea"
import { AnimateSharedLayout, motion } from "framer-motion"
import Swal from "sweetalert2"
import { getReviews } from "../../features/orders"
import { useDispatch } from "react-redux"
import { avioncilled } from "../../features/tasks"
const { Option } = Select
const { RangePicker } = DatePicker

const Orders = ({ visual, setVisual, setEffect2, setEffect3 }) => {
  //const [order, setOrder] = useState({ amount: "" })

  const [exit, setExit] = useState(null)
  const [end, setEnd] = useState(null)
  const [amount, setAmount] = useState(null)
  const [text, setText] = useState(null)

  const dispatch = useDispatch()
  const initialSate = {
    origin: null,
    destination: null,

    end: "",
    text: "",

    amount: "",
  }
  useEffect(() => {
    setVisual(initialSate)
    dispatch(getReviews())
  }, [])
  /* const validation = e => {
    if (!/^([0-9])*$/.test(order.price)) {
      setOrder({ ...order, price: "" })
      setVisual({ ...visual, price: "" })
    }
    if (!/^([0-9])*$/.test(order.amount)) {
      setOrder({ ...order, seating: "" })
      setVisual({ ...visual, amount: "" })
    }
  } */

  const selectDestiny = e => {
    if (arg.includes(e)) {
      setExit(mex)
    } else {
      setExit(arg)
    }
    setVisual({ ...visual, destination: null })
    setTimeout(() => {
      setVisual({ ...visual, destination: e })

      if (visual.origin) {
        setVisual({ ...visual, origin: null })
      }
    }, 10)
  }

  const selectChange = e => {
    setVisual({ ...visual, origin: e })
    setEnd(true)
  }

  /*  const dateChange = e => {
    setVisual({ ...visual, start: null })
    setTimeout(() => {
      if (!e) {
        return setVisual({ ...visual, start: "" })
      } else {
        const response = moment(e).format("DD-MM-YYYY")
        setVisual({ ...visual, start: response })
        setEnd(true)
      }
    })
  } */

  const endChange = e => {
    if (!e) {
      return setVisual({ ...visual, end: "" })
    }
    setVisual({ ...visual, end: null })
    setTimeout(() => {
      const response = moment(e).format("DD-MM-YYYY")
      setVisual({ ...visual, end: response })
      setAmount(true)
    })
  }
  /* 
  const handlePrice = e => {
    setVisual({ ...visual, price: null })
    setTimeout(() => {
      setVisual({ ...visual, price: e.target.value })
      setAmount(true)
    })
  } */
  const handleAmount = e => {
    setVisual({ ...visual, amount: null })
    setTimeout(() => {
      setVisual({ ...visual, amount: e.target.value })
      setText(true)
    })
  }

  const submit = async () => {
    const results = Object.values(visual)
    if (
      results.includes("") ||
      results.includes(undefined) ||
      results.includes(null)
    ) {
      return Swal.fire({
        icon: "error",
        title: "Warning",
        text: `fill all the entries`,

        confirmButtonText: "OK",
        confirmButtonColor: "#1890ff",
      })
    }
    dispatch(avioncilled(true))
    let destiny = null

    if (
      visual.origin === "San Jose Del Cabo, Mexico" &&
      visual.destination === "Mar del Plata, Argentina"
    ) {
      destiny = "631584a308debbfa5dfb80a4"
    }

    if (
      visual.origin === "San Jose Del Cabo, Mexico" &&
      visual.destination === "Buenos Aires, Argentina"
    ) {
      destiny = "631e64482f4eceb2e217c505"
    }
    if (
      visual.origin === "Monterrey, Mexico" &&
      visual.destination === "Buenos Aires, Argentina"
    ) {
      destiny = "63126f6365bdb0e7625068a5"
    }
    if (
      visual.origin === "Monterrey, Mexico" &&
      visual.destination === "Mar del Plata, Argentina"
    ) {
      destiny = "632a854023c230b75a29cf0f"
    }
    if (
      visual.origin === "Ciudad de Mexico, Mexico" &&
      visual.destination === "Buenos Aires, Argentina"
    ) {
      destiny = "63126f6365bdb0e7625068a3"
    }
    if (
      visual.origin === "Ciudad de Mexico, Mexico" &&
      visual.destination === "Mar del Plata, Argentina"
    ) {
      destiny = "631e64482f4eceb2e217c50a"
    }
    if (
      visual.origin === "Cancun, Mexico" &&
      visual.destination === "Mar del Plata, Argentina"
    ) {
      destiny = "632a673323c230b75a21fc71"
    }
    if (
      visual.origin === "Cancun, Mexico" &&
      visual.destination === "Buenos Aires, Argentina"
    ) {
      destiny = "631e64482f4eceb2e217c507"
    }
    if (
      visual.origin === "Mar del Plata, Argentina" &&
      visual.destination === "San Jose Del Cabo, Mexico"
    ) {
      destiny = "632a84aa23c230b75a29a903"
    }
    if (
      visual.origin === "Mar del Plata, Argentina" &&
      visual.destination === "Cancun, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c502"
    }
    if (
      visual.origin === "Mar del Plata, Argentina" &&
      visual.destination === "Monterrey, Mexico"
    ) {
      destiny = "632a65cc23c230b75a219fe0"
    }
    if (
      visual.origin === "Mar del Plata, Argentina" &&
      visual.destination === "Ciudad de Mexico, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c50e"
    }

    if (
      visual.origin === "Buenos Aires, Argentina" &&
      visual.destination === "Ciudad de Mexico, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c50f"
    }
    if (
      visual.origin === "Buenos Aires, Argentina" &&
      visual.destination === "San Jose Del Cabo, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c4fe"
    }
    if (
      visual.origin === "Buenos Aires, Argentina" &&
      visual.destination === "Monterrey, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c4fd"
    }
    if (
      visual.origin === "Buenos Aires, Argentina" &&
      visual.destination === "Cancun, Mexico"
    ) {
      destiny = "631e64482f4eceb2e217c4ff"
    }
    const finalPackage = {
      flight_id: destiny,
      amount: visual.amount,
      description: visual.text,
      endDate: visual.end,
      code: destiny,
    }
    console.log("soy final package", finalPackage)
    const response = await axios.post(
      "http://flymatepf.herokuapp.com/api/tickets/createPackage",
      finalPackage
    )

    console.log("soy response de axios put", response.data)
    setEffect2(true)
    setTimeout(() => {
      setEffect3(true)
    }, 780)
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        tittle: "Success",
        text: `package has been created`,
        timer: 1000,

        confirmButtonColor: "#2f9b05",
      })
    }, 2100)
    setTimeout(() => {
      setExit(null)

      setEnd(null)

      setAmount(null)
      setText(null)
      setVisual(initialSate)
      setEffect2(false)
      setEffect3(false)
    }, 2200)
    console.log("soy destiny", destiny)
    //console.log("soy response data axioas", response.data)
  }

  const textChange = e => {
    setVisual({ ...visual, text: e.target.value })
  }
  const mex = [
    "San Jose Del Cabo, Mexico",
    "Monterrey, Mexico",
    "Ciudad de Mexico, Mexico",
    "Cancun, Mexico",
  ]

  const arg = ["Buenos Aires, Argentina", "Mar del Plata, Argentina"]

  const sites = [
    "San Jose Del Cabo, Mexico",
    "Monterrey, Mexico",
    "Buenos Aires, Argentina",
    "Ciudad de Mexico, Mexico",
    "Mar del Plata, Argentina",
    "Cancun, Mexico",
  ]

  console.log("soy visual", visual)
  ////////////////////////////////////////////////////////

  return (
    <div className="order">
      <h2 className="title">Create Package</h2>
      <AnimateSharedLayout>
        <form className="form">
          <motion.div>
            <Select
              value={visual.destination}
              defaultValue="destination"
              style={{ width: 177, left: 0 }}
              allowClear
              onChange={selectDestiny}
            >
              {sites &&
                sites.map((e, i) => (
                  <Option key={i} value={e}>
                    {e}
                  </Option>
                ))}
            </Select>
          </motion.div>

          {exit ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 20,
              }}
              layoutId="33"
            >
              <Select
                value={visual.origin}
                defaultValue="origin"
                style={{ width: 177, left: 0 }}
                onChange={selectChange}
                allowClear
              >
                {exit.map((e, i) => (
                  <Option key={i} value={e}>
                    {e}
                  </Option>
                ))}
              </Select>
            </motion.div>
          ) : (
            <div className="div"></div>
          )}

          {end ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 20,
              }}
            >
              <DatePicker
                placeholder="select end"
                onChange={endChange}
                defaultValue={visual.end}
              />
            </motion.div>
          ) : (
            <div className="div" />
          )}
          {amount ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
              }}
            >
              <div class="relative">
                <input
                  value={visual.amount}
                  type="number"
                  name="seating"
                  onChange={handleAmount}
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
            </motion.div>
          ) : (
            <div className="divPrice" />
          )}
          {text ? (
            <motion.div
              initial={{ y: -1000, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <TextArea
                  onChange={textChange}
                  value={visual.text}
                  rows={7}
                  style={{ height: 120, width: 350 }}
                />
              </div>

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
            </motion.div>
          ) : (
            <div className="divText" />
          )}
        </form>
      </AnimateSharedLayout>
    </div>
  )
}

export default Orders
