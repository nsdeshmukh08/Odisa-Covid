import { createApplication,common } from 'service/actionType'

const initialState = {
    formId: null,
    dateFormation: null,
    dateRegistration: null,
    registrationNumber: null,
    promotingOrg: null,
    promotingOrgName: null,
    noOfPG: null,
    registerationNumberRegex : null,
    registrationUnderOthers:null,
    pcTypes: [],
    pcCommodityTypes: [],
    pcSectorTypes: [],
    registrationUnder: null,
    promotingOrg: null,
    supportingOrg: null,
    supportingOrgName: null,
    relevantSupportOrg : null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_2:
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