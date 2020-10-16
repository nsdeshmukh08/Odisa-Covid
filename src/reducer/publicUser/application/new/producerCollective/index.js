import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import pcDetails from './pcDetails';
import pcFormAmountReceived from './pcFormAmountRecevied';
import pcFormBankDetails from './pcFormBankDetails';
import pcFormMembers from './pcFormMembers'
import pcFormProposedActivity from './pcFormProposedActivity'
import pcFormAmountRecevied from './pcFormAmountRecevied'
import pcFormUploadDocument from './pcFormUploadDocument'

export default combineReducers({
    basicDetails,
    pcDetails,
    pcFormAmountReceived,
    pcFormBankDetails,
    pcFormMembers,
    pcFormProposedActivity,
    pcFormAmountRecevied,
    pcFormUploadDocument
})