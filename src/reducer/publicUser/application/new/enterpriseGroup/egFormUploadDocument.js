import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId":null,
    "bankPassBook": [],
    "minOfEGRefund": [],
    "businessPlan": [],
    "remarks": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_ENTERPRISE_GROUP_FORM_STAGE_7:
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
