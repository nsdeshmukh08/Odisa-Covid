import { combineReducers } from "redux"
import theme from "./theme"
import profile from "./profile"
import staff from './staff'
import publicUser from './publicUser'
import loaders from './loaders'
import common from './common'
export const reducers = combineReducers({
    theme,
    profile,
    staff,
    publicUser,
    loaders,
    common
})