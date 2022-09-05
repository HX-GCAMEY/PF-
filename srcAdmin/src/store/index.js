import { configureStore } from "@reduxjs/toolkit"
/* import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import countriesReducer from "../reducer/index"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  countriesReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store */

import taskReducer from "../features/tasks"

const store = configureStore({
  reducer: { tasks: taskReducer },
})

export default store
