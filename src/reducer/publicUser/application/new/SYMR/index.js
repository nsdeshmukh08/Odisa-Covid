import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import shgDetails from './shgDetails';
import skillAndEdpDetails from './skill';
import enterpriseDetails from './enterprise';
import symrBankDetails from './bankDetails'
import symrProposedActivity from './proposedActivity'
import symrExistingLoan from './existingLoan'
import uploadDocuments from './uploadDocument'

export default combineReducers({
    basicDetails,
    shgDetails,
    skillAndEdpDetails,
    enterpriseDetails,
    symrBankDetails,
    symrProposedActivity,
    symrExistingLoan,
    uploadDocuments
})