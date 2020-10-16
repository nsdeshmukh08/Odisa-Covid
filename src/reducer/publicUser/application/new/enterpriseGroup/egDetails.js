import { createApplication, common } from 'service/actionType'

const initialState = {
    formId: null,
    dateFormation: null,
    dateRegistration: null,
    registrationNumber: null,
    registerationNumberRegex : null,
    promotingOrgs: null,
    promotingOrgName: null,
    registrationUnderOthers:null,
    supportingOrg: null,
    supportingOrgName: null,
    relevantSupportOrg : null,
    registrationUnder: null,
    egTypes: [],
    egCommodityTypes: [],
    egSectorTypes: [],
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_ENTERPRISE_GROUP_FORM_STAGE_2:
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
