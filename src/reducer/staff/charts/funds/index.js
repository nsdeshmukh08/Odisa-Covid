import { combineReducers } from "redux"
import targetAndAchieved from './targetAndAchieved'
import applications from './applications'

export default combineReducers({
    targetAndAchieved,
    applications
})