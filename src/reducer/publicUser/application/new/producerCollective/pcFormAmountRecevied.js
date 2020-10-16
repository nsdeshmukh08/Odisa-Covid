import { createApplication,common } from 'service/actionType'

const initialState = {
    "formId": undefined,
    "amtGrant": null,
    "amtReceviedLoan": null,
    "isLoanGrant": null,
    "fundProvider": null,
    "amtRecevied": null,
    "isSpecialEPO": false,
    "specifyEPO": null,
    "nameOfPc":null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_4:
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