import { setRef } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFlights, getFlightsAvailables } from "../../features/orders"
import argBS2 from "../imgs/argBS2.jpg"
import argLaPlata2 from "../imgs/argLaPlata2.jpg"
import mexCancun2 from "../imgs/mexCancun2.jpg"
import mexCity2 from "../imgs/mexCity2.png"
import mexLosCabos2 from "../imgs/mexLosCabos2.png"
import mexMonterrey2 from "../imgs/mexMonterrey2.jpg"
import { motion } from "framer-motion"
import mexico from "../imgs/mexico.jpg"
import arg from "../imgs/argentina.png"
import "./PreView.css"
import avioncillo from "../imgs/avioncillo.png"
import { width } from "@mui/system"

const PreView = ({ visual, setVisual, effect2, effect3 }) => {
  const flightsAv = useSelector(state => state.tasks.flightsAv)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFlightsAvailables())
  }, [])

  let flagOrigin = null
  let flagDestination = null
  let img = null
  let airOrigin = null
  let airDestination = null
  if (visual.destination === "San Jose Del Cabo, Mexico") {
    img = mexLosCabos2
    flagOrigin = arg
    flagDestination = mexico
    airDestination = "Aeropuerto Los Cabos"
  }
  if (visual.destination === "Monterrey, Mexico") {
    img = mexMonterrey2
    flagOrigin = arg
    flagDestination = mexico
    airDestination = "Aeropuerto Gen Mariano Escobedo"
  }
  if (visual.destination === "Ciudad de Mexico, Mexico") {
    img = mexCity2
    flagOrigin = arg
    flagDestination = mexico
    airDestination = "Aeropuerto Internacional Benito Juarez"
  }
  if (visual.destination === "Cancun, Mexico") {
    img = mexCancun2
    flagOrigin = arg
    flagDestination = mexico
    airDestination = "Aeropuerto Internacional de Cancun"
  }
  if (visual.destination === "Buenos Aires, Argentina") {
    img = argBS2
    flagOrigin = mexico
    flagDestination = arg
    airDestination = "Aeropuerto Buenos Aires Jorge Newbery"
  }
  if (visual.destination === "Mar del Plata, Argentina") {
    img = argLaPlata2
    flagOrigin = mexico
    flagDestination = arg
    airDestination = "Aeropuerto Internacional Astor Piazzolla"
  }

  if (visual.origin === "San Jose Del Cabo, Mexico") {
    airOrigin = "Aeropuerto Los Cabos"
  }
  if (visual.origin === "Monterrey, Mexico") {
    airOrigin = "Aeropuerto Gen Mariano Escobedo"
  }
  if (visual.origin === "Ciudad de Mexico, Mexico") {
    airOrigin = "Aeropuerto Internacional Benito Juarez"
  }
  if (visual.origin === "Cancun, Mexico") {
    airOrigin = "Aeropuerto Internacional de Cancun"
  }
  if (visual.origin === "Buenos Aires, Argentina") {
    airOrigin = "Aeropuerto Buenos Aires Jorge Newbery"
  }

  if (visual.origin === "Mar del Plata, Argentina") {
    airOrigin = "Aeropuerto Internacional Astor Piazzolla"
  }
  const sites = [
    "San Jose Del Cabo, Mexico",
    "Monterrey, Mexico",
    "Buenos Aires, Argentina",
    "Ciudad de Mexico, Mexico",
    "Mar del Plata, Argentina",
    "Cancun, Mexico",
  ]

  /* const departure = flightsAv.map(e => e.departure.city)
  const arrival = flightsAv.map(e => e.arrival.city)
  const list = [...departure, ...arrival]
  const resetList = new Set(list)
  const finalList = [...resetList] */

  return (
    <div>
      {effect2 && (
        <motion.img
          src={avioncillo}
          className="avioncillo"
          initial={{ x: 600, y: 200 }}
          animate={{ x: -2000, y: 200 }}
          transition={{
            duration: 2,
          }}
        />
      )}

      <motion.div
        className="sera1"
        initial={effect3 ? { x: 0 } : ""}
        animate={effect3 ? { x: -2000 } : ""}
        transition={{
          duration: 2,
        }}
      >
        <section className="originRight">
          {visual.destination && (
            <motion.div
              initial={{ y: 600, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
              }}
              className="originSon glass"
            >
              <span>Destination:</span>
              <img className="imgOrigin" src={flagDestination} alt="dsf" />
              <span>City:</span>
              <div>{visual.destination}</div>
              <span>Airport:</span>
              <div>{airDestination}</div>
            </motion.div>
          )}
          {visual.origin && (
            <motion.div
              initial={{ x: -700, y: -100 }}
              animate={{ x: 0, y: 0 }}
              transition={{
                duration: 0.7,
              }}
              className="originSon glass"
            >
              <span>Origin:</span>
              <motion.img className="imgOrigin" src={flagOrigin} alt="s" />
              <span>City:</span>
              <div>{visual.origin}</div>
              <span>Airport:</span>
              <div>{airOrigin}</div>
            </motion.div>
          )}
          <div className="originSon glass borderss">
            {visual.start && (
              <motion.div
                initial={{ x: -670, y: -230 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                }}
              >
                <span>Start Date: {visual.start}</span>
              </motion.div>
            )}
            {visual.end && (
              <motion.div
                initial={{ x: -670, y: -220 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                }}
              >
                <span>End Date:{visual.end}</span>
              </motion.div>
            )}
            {visual.price && (
              <motion.div
                initial={{ x: -670, y: -180 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                }}
              >
                Price:{visual.price}
              </motion.div>
            )}
            {visual.amount && (
              <motion.div
                initial={{ x: -720, y: -200 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                }}
              >
                Amount:{visual.amount}
              </motion.div>
            )}
            {visual.details && <motion.div>Details</motion.div>}
            {visual.effect && (
              <motion.div
                initial={{ x: -650, y: -100 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                }}
              >
                Details
              </motion.div>
            )}
          </div>
        </section>

        {visual.destination && (
          <div className="imgPackage">
            <motion.img
              initial={{ x: -430, width: 0, height: 0, y: 230 }}
              animate={{ x: 0, width: "100%", height: "97vh", y: 0 }}
              transition={{
                duration: 0.7,
              }}
              src={img}
              alt="arg"
              layoutId="33"
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default PreView
