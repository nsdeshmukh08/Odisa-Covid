import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import pgDetails from './pgDetails';
import pgFormAmountRecevied from './pgFormAmountRecevied';
import pgFormBankDetails from './pgFormBankDetails';
import pgFormMembers from './pgFormMembers'
import pgFormProposedActivity from './pgFormProposedActivity'
import pgFormUploadDocument from './pgFormUploadDocument'

export default combineReducers({
    basicDetails,
    pgDetails,
    pgFormBankDetails,
    pgFormMembers,
    pgFormProposedActivity,
    pgFormAmountRecevied,
    pgFormUploadDocument
})