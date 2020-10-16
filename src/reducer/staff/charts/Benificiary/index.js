import { combineReducers } from "redux"
import vulnerable from './vulnerable'
import SHG from './SHG'
import TargetAndAchieved from './TargetAndAchieved'
import gender from './gender'
import community from "./community"
import components from './components'

export default combineReducers({
    vulnerable,
    SHG,
    TargetAndAchieved,
    gender,
    components,
    community
})