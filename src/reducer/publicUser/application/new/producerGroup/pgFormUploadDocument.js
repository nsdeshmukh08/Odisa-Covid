import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "formId": null,
    "firstResolutionofPGEG": [],
    "copyofBankPassbook": [],
    "listofOfficeBearers": [],
    "existingLoanRepay": [],
    "businessPlan": [],
    "applyingLoan": [],
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_9:
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