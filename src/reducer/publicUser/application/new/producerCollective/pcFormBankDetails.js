import { createApplication,common } from 'service/actionType'

const initialState = {
    "formId":null,
    "accNumber": null,
    "accName": null,
    "bnkName": null,
    "branchName": null,
    "ifscCode": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_5:
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