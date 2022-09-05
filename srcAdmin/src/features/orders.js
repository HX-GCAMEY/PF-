import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getTask = createAsyncThunk("tasks/getTasks", async () => {
  const responde = await axios.get("https://pf-seraerror.herokuapp.com/user")
  return responde.data
})

export const getFlights = createAsyncThunk("tasks/getFlights", async () => {
  const response = await axios("https://pf-seraerror.herokuapp.com/flights")

  console.log("soy response", response.data)
  return response.data
})

export const getFlightsAvailables = createAsyncThunk(
  "tasks/getFlightsAvailables",
  async () => {
    const response = await axios(
      "https://pf-seraerror.herokuapp.com/flightsAvailable"
    )
    const response2 = response.data
    const response3 = response2.sort(
      (a, b) => parseInt(a.date) - parseInt(b.date)
    )
    console.log("soy response3", response3)
    return response3
  }
)
