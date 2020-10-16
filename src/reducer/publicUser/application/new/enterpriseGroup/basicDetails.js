import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId":null,
    "mobileNumber": null,
    "name": null,
    "egName": null,
    "egAddress": null,
    "districtId": null,
    "blockId": null,
    "panchayatId": null,
    appSubmitDate : new Date()
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_ENTERPRISE_GROUP_FORM_STAGE_1:
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
