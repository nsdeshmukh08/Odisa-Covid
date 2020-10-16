import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "formId": undefined,
    "amtGrant": '',
    "amtReceviedLoan": '',
    "isLoanGrant": null,
    "fundProvider": null,
    "amtRecevied": '',
    "isSpecialEPO": null,
    "specifyEPO": null,
    "nameOfPc":null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_4:
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