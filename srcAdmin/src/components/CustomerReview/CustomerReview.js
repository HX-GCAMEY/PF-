import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../features/orders"

const CustomerReview = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.tasks.reviews)
  const [sera, setSera] = useState()

  /* useEffect(() => {
    const interval = setInterval(() => {
      console.log("hola")
      dispatch(getReviews())
    }, 10000)

    return () => clearInterval(interval)
  }, [])
 */
  /////////////////////////////////////////////////////////////////////
  let dates = reviews.map(e => e.date)
  let datesNow = []
  for (let i of dates) {
    let datenow = new Date(i).getFullYear()
    let datenow1 = new Date(i).getMonth() + 1
    let t1 = datenow1 < 10 ? "0" + datenow1 : datenow1
    let datenow2 = new Date(i).getDate()
    let t2 = datenow2 < 10 ? "0" + datenow2 : datenow2
    let datenow3 = new Date(i).getHours()
    let t3 = datenow3 < 10 ? "0" + datenow3 : datenow3
    let datenow4 = new Date(i).getMinutes()
    let t4 = datenow4 < 10 ? "0" + datenow4 : datenow4
    let datenow5 = new Date(i).getSeconds()
    let t5 = datenow5 < 10 ? "0" + datenow5 : datenow5
    let result = `${datenow}-${t1}-${t2}T${t3}:${t4}:${t5}.655Z`
    datesNow.push(result)
  }

  let selector = new Date().getFullYear()
  let selector2 = new Date().getMonth() + 1
  let d1 = selector2 < 10 ? "0" + selector2 : selector2
  let selector3 = new Date().getDate()
  let d2 = selector3 < 10 ? "0" + selector3 : selector3
  let selectorFinal = `${selector}-${d1}-${d2}`
  let datesFiltered = datesNow.filter(e => e.slice(0, 10) === selectorFinal)

  /////////////////////////////////////////////////////////////////////////////////////////////
  //console.log("soy datesNow", datesNow)
  //console.log("soy selectorFinal", selectorFinal)

  let rate = reviews.map(e => e.rate)
  let response = rate.slice(-datesFiltered.length)

  //("Sep 14 2022 21:23:31 GMT-0300 (hora estándar de Argentina)")
  /* useEffect(() => {
    dispatch(getReviews())
  }, [])
   */ let data = {
    series: [
      {
        name: "Review",
        data: response,
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

        categories: datesFiltered,
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
