import React, { useEffect, useState } from "react"
import "./card.css"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { motion, AnimateSharedLayout } from "framer-motion"
import { UilTimes } from "@iconscout/react-unicons"
import Chart from "react-apexcharts"
import avionMet from "../imgs/avionMet.png"
import { useDispatch, useSelector } from "react-redux"
import { getTickets } from "../../features/orders"

const Card = props => {
  const tickets = useSelector(state => state.tasks.tickets)
  const [expanded, setExpanded] = useState(false)

  let datesNow = []
  let year = new Date().getFullYear()
  let year2 = new Date().getMonth() + 1
  let y1 = year2 < 10 ? "0" + year2 : year2
  let year3 = new Date().getDate()
  let y2 = year3 < 10 ? "0" + year3 : year3
  let today = `${year}-${y1}-${y2}`

  for (let i of tickets) {
    let datenow = new Date(i.purchased).getFullYear()
    let datenow1 = new Date(i.purchased).getMonth() + 1
    let t1 = datenow1 < 10 ? "0" + datenow1 : datenow1
    let datenow2 = new Date(i.purchased).getDate()
    let t2 = datenow2 < 10 ? "0" + datenow2 : datenow2
    let datenow3 = new Date(i.purchased).getHours()
    let t3 = datenow3 < 10 ? "0" + datenow3 : datenow3
    let datenow4 = new Date(i.purchased).getMinutes()
    let t4 = datenow4 < 10 ? "0" + datenow4 : datenow4
    let datenow5 = new Date(i.purchased).getSeconds()
    let t5 = datenow5 < 10 ? "0" + datenow5 : datenow5
    let result = `${datenow}-${t1}-${t2}T${t3}:${t4}:${t5}.655Z`
    datesNow.push({ fare: i.fare, purchased: result })
  }

  const dates = datesNow.filter(e => e.purchased.slice(0, 10) === today)

  const ordered = dates.sort((a, b) => {
    var dateA = new Date(a.purchased).getTime()
    var dateB = new Date(b.purchased).getTime()
    return dateA > dateB ? 1 : -1
  })

  const percentage = (ordered.length * 100) / 200
  const money = ordered.reduce((a, b) => a + b.fare, 0)
  const datesFiltered = ordered.map(e => e.purchased)
  const moneyFiltered = ordered.map(e => e.fare)

  console.log("soy today", today)
  console.log("soy tickets", tickets)
  console.log("soy datesNow", datesNow)
  console.log("soy today", today)
  console.log("soy dates", dates)
  console.log("soy ordered", ordered)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTickets())
  }, [])
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard
          moneyFiltered={moneyFiltered}
          param={props}
          datesFiltered={datesFiltered}
          setExpanded={() => setExpanded(false)}
        />
      ) : (
        <CompactCard
          param={props}
          percentage={percentage}
          money={money}
          setExpanded={() => setExpanded(true)}
        />
      )}
    </AnimateSharedLayout>
  )
}

// Compact Card
function CompactCard({ param, setExpanded, percentage, money }) {
  const Png = param.png
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className="radialBar"
      >
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
        <span>Sales</span>
      </motion.div>
      <div className="avionMet">
        <motion.img
          initial={{ x: -1000, y: -300 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1 }}
          src={avionMet}
          alt="met"
        />
      </div>
      <motion.div
        className="detail"
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <Png />
        <span>${money}</span>
        <span>Last 24 hours</span>
      </motion.div>
    </motion.div>
  )
}

// Expanded Card
function ExpandedCard({ param, setExpanded, datesFiltered, moneyFiltered }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: datesFiltered,
      },
    },
  }

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>Sales: {datesFiltered.length}</span>
      <div className="chartContainer">
        <Chart
          options={data.options}
          series={[
            {
              name: "Sales",
              data: moneyFiltered,
            },
          ]}
          type="area"
        />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  )
}

export default Card
