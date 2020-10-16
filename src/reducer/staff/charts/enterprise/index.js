import { combineReducers } from "redux"
import enterprise from './enterprise'
import activity from './activity'
import sector from './sector'
import commodity from './commodity'
import components from './components'

export default combineReducers({
    enterprise,
    activity,
    sector,
    commodity,
    components
})