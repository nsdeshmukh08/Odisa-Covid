import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import egDetails from './egDetails';
import egFormMembers from './egFormMembers'
import egFormAmountRecevied from './egFormAmountRecevied';
import egFormBankDetails from './egFormBankDetails';
import egFormProposedActivity from './egFormProposedActivity'
import egFormUploadDocument from './egFormUploadDocument'

export default combineReducers({
    basicDetails,
    egDetails,
    egFormMembers,
    egFormAmountRecevied,
    egFormBankDetails,
    egFormProposedActivity,
    egFormUploadDocument
})