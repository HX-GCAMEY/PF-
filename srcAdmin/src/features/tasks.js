import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getFlights, getFlightsAvailables, getTask } from "./orders"

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    users: [],
    flights: [],
    flightsAv: [],
    isLoading: false,
  },

  reducers: {},
  extraReducers: {
    [getTask.pending]: state => {
      state.isLoading = true
    },
    [getTask.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    [getTask.rejected]: state => {
      state.isLoading = false
    },
    [getFlights.pending]: state => {
      state.isLoading = true
    },
    [getFlights.fulfilled]: (state, action) => {
      state.isLoading = false
      state.flights = action.payload
    },
    [getFlights.rejected]: state => {
      state.isLoading = false
    },
    [getFlightsAvailables.pending]: state => {
      state.isLoading = true
    },
    [getFlightsAvailables.fulfilled]: (state, action) => {
      state.isLoading = false
      state.flightsAv = action.payload
    },
    [getFlightsAvailables.rejected]: state => {
      state.isLoading = false
    },
  },
})
export const { AddTask } = taskSlice.actions
export default taskSlice.reducer
