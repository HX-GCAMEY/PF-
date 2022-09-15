import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../features/orders"

const CustomerReview = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.tasks.reviews)
  const [sera, setSera] = useState()

  useEffect(() => {
    setSera(datesFiltered)
  }, [])

  const rate = reviews.map(e => e.rate)
  const response = rate.slice(1, rate.length)
  const date = reviews.map(e => e.date)
  const dateSlice = date.slice(1, date.length)
  console.log("soy fechas ", dateSlice)

  /////////////////////////////////////////////////////////////////////
  const datesNow = []
  for (let i of dateSlice) {
    const datenow = new Date(i).getFullYear()
    const datenow1 = new Date(i).getMonth() + 1
    const t1 = datenow1 < 10 ? "0" + datenow1 : datenow1
    const datenow2 = new Date(i).getDate()
    const t2 = datenow2 < 10 ? "0" + datenow2 : datenow2
    const datenow3 = new Date(i).getHours()
    const t3 = datenow3 < 10 ? "0" + datenow3 : datenow3
    const datenow4 = new Date(i).getMinutes()
    const t4 = datenow4 < 10 ? "0" + datenow4 : datenow4
    const datenow5 = new Date(i).getSeconds()
    const t5 = datenow5 < 10 ? "0" + datenow5 : datenow5
    const result = `${datenow}-${t1}-${t2}T${t3}:${t4}:${t5}.655Z`
    datesNow.push(result)
  }

  const selector = new Date().getFullYear()
  const selector2 = new Date().getMonth() + 1
  const d1 = selector2 < 10 ? "0" + selector2 : selector2
  const selector3 = new Date().getDate()
  const d2 = selector3 < 10 ? "0" + selector3 : selector3
  const selectorFinal = `${selector}-${d1}-${d2}`
  const datesFiltered = datesNow.filter(e => e.slice(0, 10) === selectorFinal)
  /////////////////////////////////////////////////////////////////////////////////////////////
  console.log("soy datesNow", datesNow)
  console.log("soy selectorFinal", selectorFinal)
  console.log("soy datesFiltered", datesFiltered)

  //("Sep 14 2022 21:23:31 GMT-0300 (hora estándar de Argentina)")
  useEffect(() => {
    dispatch(getReviews())
  }, [])
  const data = {
    series: [
      {
        name: "Review",
        data: [1, 5, 3, 4, 4, 1, 1, 4, 5, 2],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
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
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "d/M/yy HH:mm:ss",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",

        categories: sera,
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  }
  return (
    <div className="CustomerReview">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  )
}

export default CustomerReview
