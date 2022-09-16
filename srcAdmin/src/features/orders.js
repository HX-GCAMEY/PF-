import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getTask = createAsyncThunk("tasks/getTasks", async () => {
  const responde = await axios.get(
    "http://flymatepf.herokuapp.com/api/users/all"
  )
  return responde.data
})

export const getFlights = createAsyncThunk("tasks/getFlights", async () => {
  const response = await axios("http://flymatepf.herokuapp.com/api/flights")

  console.log("soy response", response.data)
  return response.data.flights
})

export const getFlightsAvailables = createAsyncThunk(
  "tasks/getFlightsAvailables",
  async () => {
    const response = await axios(
      "http://flymatepf.herokuapp.com/api/flights/all"
    )
    const response2 = response.data
    const response3 = response2.sort(
      (a, b) => parseInt(a.date) - parseInt(b.date)
    )
    console.log("soy response3", response3)
    return response3
  }
)

export const getReviews = createAsyncThunk("tasks/getReviews", async () => {
  const response = await axios.get(
    "http://flymatepf.herokuapp.com/api/comments/allComments"
  )

  console.log("soy response de getReviews", response.data)
  return response.data
})
