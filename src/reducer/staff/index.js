import { combineReducers } from "redux"
import staffList from "./staffList"
import applications from './application'
import statistics from './statistics'
import charts from './charts'

export default combineReducers({
    staffList,
    applications,
    statistics,
    charts
})