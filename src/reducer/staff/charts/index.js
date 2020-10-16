import { combineReducers } from "redux"
import funds from './funds'
import enterprise from './enterprise'
import Benificiary from "./Benificiary"
import applications from './Applications'

export default combineReducers({
    funds,
    enterprise,
    Benificiary,
    applications
})