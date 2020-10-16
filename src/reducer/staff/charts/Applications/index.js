import { combineReducers } from "redux"
import applicationStatus from './applicationStatus'
import components from './components'

export default combineReducers({
    applicationStatus,
    components
})