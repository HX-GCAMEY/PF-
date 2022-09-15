import React from "react"
import { motion, AnimateSharedLayout } from "framer-motion"

const Prueba = () => {
  return (
    <div>
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 2 }}
      >
        HLAAAAAAAAAAAAAAAAA
      </motion.div>
    </div>
  )
}

export default Prueba
