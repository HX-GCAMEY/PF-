import React from "react"
import CustomerReview from "../CustomerReview/CustomerReview"
import Updates from "../Updates/Updates"
import { motion } from "framer-motion"
import "./RightSide.css"

const RightSide = () => {
  return (
    <div className="RightSide">
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="right">Latest Reviews</h3>
        <Updates />
      </motion.div>
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="right">Customer Review of Today</h3>
        <CustomerReview />
      </motion.div>
    </div>
  )
}

export default RightSide
