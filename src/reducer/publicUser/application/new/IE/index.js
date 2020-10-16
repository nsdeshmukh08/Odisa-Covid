import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import shgDetails from './shgDetails';
import ieEnterprise from './ieEnterprise'
import ieBaseLineDetails from './ieBaseLineDetails'
import ieBankDetails from './ieBankDetails';
import ieExistingLoan from './ieExistingLoan';
import ieLossIncurredDetails from './ieLossIncurredDetails';
import ieProposedActivity from './ieProposedActivity'
import uploadDocuments from './uploadDocuments'

export default combineReducers({
    basicDetails,
    shgDetails,
    ieBaseLineDetails,
    ieEnterprise,
    ieExistingLoan,
    ieBankDetails,
    ieLossIncurredDetails,
    ieProposedActivity,
    uploadDocuments
})