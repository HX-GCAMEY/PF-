import React, { useEffect } from "react"
import Chart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../features/orders"

const CustomerReview = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.tasks.reviews)
  const rate = reviews.map(e => e.rate)

  useEffect(() => {
    dispatch(getReviews())
  }, [])
  const data = {
    series: [
      {
        name: "Review",
        data: rate,
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
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z"],
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
