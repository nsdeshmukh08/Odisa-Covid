import { combineReducers } from "redux";
import producerCollective from './producerCollective'
import symr from "./SYMR"
import producerGroup from './producerGroup'
import enterpriseGroup from './enterpriseGroup'
import IA from "./IA";
import IE from "./IE";
export default combineReducers({
  producerCollective,
  producerGroup,
  enterpriseGroup,
  symr,
  IA,
  IE,
})