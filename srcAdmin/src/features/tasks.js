import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getFlights, getFlightsAvailables, getTask } from "./orders"

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    users: [],
    flights: [],
    flightsAv: [],
    flightsFiltered: null,
    flightsFiltered2: null,
    adminFiltered: null,
    customerFiltered: null,
    bannedFiltered: null,
    paginado: {
      inicio: 0,
      final: 7,
    },
    isLoading: false,
  },
  reducers: {
    filtered: (state, action) => {
      state.flightsFiltered = action.payload
    },
    filtering: (state, action) => {
      state.flightsFiltered = [...state.flightsAv].filter(
        e => e === action.payload
      )
    },
    adminFiltering: (state, action) => {
      state.adminFiltered = action.payload
    },
    customerFiltering: (state, action) => {
      state.customerFiltered = action.payload
    },
    bannedFiltering: (state, action) => {
      state.bannedFiltered = action.payload
    },
    paginadoFiltering: (state, action) => {
      state.paginado = action.payload
    },

    filtered2: (state, action) => {
      state.flightsFiltered2 = action.payload
    },
    filtering2: (state, action) => {
      state.flightsFiltered2 = [...state.flights].filter(
        e => e === action.payload
      )
    },
  },
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
export const {
  filtered,
  filtering,
  filtered2,
  filtering2,
  adminFiltering,
  customerFiltering,
  bannedFiltering,
  paginadoFiltering,
} = taskSlice.actions
export default taskSlice.reducer
