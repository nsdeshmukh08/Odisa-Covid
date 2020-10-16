import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId":null,
    "amtGrant": '',
    "amtReceviedLoan": '',
    "isLoanGrant": null,
    "fundProvider": null,
    "amtRecevied": '',
    // "shareCapital": null,
    "isSpecialEPO": null,
    "specifyEPO": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_ENTERPRISE_GROUP_FORM_STAGE_4:
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
