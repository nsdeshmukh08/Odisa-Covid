import { SYMRFORM, common } from 'service/actionType'

const initialState = {
    "formId": undefined,
    "grantenterpriseName": null,
    "enterpriseType": null,
    "grantActivityName": null,
    "symrTypes": [],
    "symrCommodityTypes": [],
    "symrSectorTypes": [],
    "summary": null,
    "noOfPersons": null,
    "isExperiencedEnterpreneur": null,
    "enterpreneurExpYears": null,
    "isEmployedInActivity": null,
    "activityExpYears": null,
    "designation": null,
    "location": null,
    "isLoanAppliedPreviously": null,
    "schemeAmount": null,
    "schemeName": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case SYMRFORM.UPDATE_SYMR_FORM_STAGE_4:
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