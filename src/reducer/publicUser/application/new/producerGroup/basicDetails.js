import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "formId": undefined,
    "districtId": null,
    "blockId": null,
    "panchayatId": null,
    "clfId": null,
    "villageId": null,
    "enterpriseAndProducerGroup": null,
    "AddressCommunication": null,
    "mobileNumber": null,
    "dateOfFormation": null,
    "ageOfEGPG": null,
    "promotingAgency": null,
    "enterpriseActivity": null,
    appSubmitDate : new Date()
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_1:
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