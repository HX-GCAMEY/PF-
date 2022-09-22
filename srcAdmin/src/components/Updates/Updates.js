import React, { useEffect } from "react"
import "./Updates.css"
import { UpdatesData } from "../data/Data"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../features/orders"

const Updates = () => {
  const reviews = useSelector(state => state.tasks.reviews)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReviews())
  }, [])
  const results = reviews.slice(-3)

  
  return (
    <div className="Updates">
      {results.map((update, i) => {
        let datenow3 = new Date(update.date).getHours()
        let t3 = datenow3 < 10 ? "0" + datenow3 : datenow3
        let datenow4 = new Date(update.date).getMinutes()
        let t4 = datenow4 < 10 ? "0" + datenow4 : datenow4
        let datenow5 = new Date(update.date).getSeconds()
        let t5 = datenow5 < 10 ? "0" + datenow5 : datenow5
        let hour = `${t3}:${t4}:${t5}`

        return (
          <div className="update" key={i}>
            {/* <img src={update.img} alt="profile" /> */}
            <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}>
                <span>{update.email}</span>
                <span> {update.text}</span>
              </div>
              <span className="hour">{hour}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Updates
