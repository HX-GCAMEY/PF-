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
  console.log("soy reviews", reviews)
  return (
    <div className="Updates">
      {reviews.map((update, i) => {
        return (
          <div className="update" key={i}>
            <img src={update.img} alt="profile" />
            <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}>
                <span>{update.email}</span>
                <span> {update.text}</span>
              </div>
              <span></span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Updates
