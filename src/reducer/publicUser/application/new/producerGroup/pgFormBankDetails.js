import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "formId": null,
    "accNumber": null,
    "confirmAccNumber" : null,
    "accName": null,
    "bnkName": null,
    "branchName": null,
    "ifscCode": null,
    "noOfLastTransaction": null,
    "existingLoanRepaymentStatus": null,
    "lossIncurredtoCovid": null,
    "activityFundRequirementDetails": null, 
    "remarks": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_5:
            return {
                ...state,
                ...payload
            }
        case common.APPLICATION_FORM_RESET:
            return {
                ...initialState
            }
        default:
            return state
    }

}