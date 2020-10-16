import { createApplication,common } from 'service/actionType'

const initialState = {
    "formId":null,
    "mobileNumber": null,
    "name": null,
    "pcName": null,
    "pcAddress": null,
    "districtId": null,
    "blockId": null,
    "panchayatId": null,
    appSubmitDate : new Date()
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_1:
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