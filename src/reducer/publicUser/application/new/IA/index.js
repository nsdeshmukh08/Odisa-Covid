import { combineReducers } from "redux";
import basicDetails from "./basicDetails";
import shgDetails from './shgDetails';
import iaEnterprise from './iaEnterprise'
import iaBaseLineDetails from './iaBaseLineDetails'
import iaBankDetails from './iaBankDetails';
import iaExistingLoan from './iaExistingLoan';
import iaLossIncurredDetails from './iaLossIncurredDetails';
import iaProposedActivity from './iaProposedActivity'
import uploadDocuments from './uploadDocuments'

export default combineReducers({
    basicDetails,
    shgDetails,
    iaBaseLineDetails,
    iaEnterprise,
    iaExistingLoan,
    iaBankDetails,
    iaLossIncurredDetails,
    iaProposedActivity,
    uploadDocuments
})