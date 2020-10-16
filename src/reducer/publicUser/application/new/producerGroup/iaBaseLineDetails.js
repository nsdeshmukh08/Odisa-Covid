import { createApplication,  common } from 'service/actionType'

const initialState = {
    "formId":null,
    "monthlyAvgIncome":null,
    "turnover":null,
    "engagementOfHR":null,
}


export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IA_FORM_STAGE_4:
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
