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

    return response3
  }
)

export const getReviews = createAsyncThunk("tasks/getReviews", async () => {
  const response = await axios.get(
    "http://flymatepf.herokuapp.com/api/comments/allComments"
  )

  return response.data
})

export const getPackages = createAsyncThunk("tasks/getPackages", async () => {
  const response = await axios.get(
    "http://flymatepf.herokuapp.com/api/tickets/allPackages"
  )

  return response.data
})

export const getTickets = createAsyncThunk("tasks/getTickets", async () => {
  const response = await axios(
    "http://flymatepf.herokuapp.com/api/tickets/allTickets"
  )

  return response.data
})
