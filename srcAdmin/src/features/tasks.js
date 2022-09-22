import { createSlice } from "@reduxjs/toolkit"
import {
  getFlights,
  getFlightsAvailables,
  getTask,
  getReviews,
  getPackages,
  getTickets,
} from "./orders"

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    avioncillo: false,
    users: [],
    tickets: [],
    reviews: [],
    flights: [],
    packages: [],
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
    isLoadingReviews: false,
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
    avioncilled: (state, action) => {
      state.avioncillo = action.payload
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
    [getReviews.pending]: state => {
      state.isLoadingReviews = true
    },
    [getReviews.fulfilled]: (state, action) => {
      state.isLoadingReviews = false
      state.reviews = action.payload
    },
    [getReviews.rejected]: state => {
      state.isLoadingReviews = false
    },
    [getPackages.pending]: state => {
      state.isLoading = true
    },
    [getPackages.fulfilled]: (state, action) => {
      state.isLoading = false
      state.packages = action.payload
    },
    [getPackages.rejected]: state => {
      state.isLoading = false
    },
    [getTickets.pending]: state => {
      state.isLoading = true
    },
    [getTickets.fulfilled]: (state, action) => {
      state.isLoading = false
      state.tickets = action.payload
    },
    [getTickets.rejected]: state => {
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
  avioncilled,
} = taskSlice.actions
export default taskSlice.reducer
