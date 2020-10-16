import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId": null,
    "isShgMember":null,
    "shgName":null,
    "nrlmPortalShgCode":null,
    "isHouseHoldMember":null,
    "relationshipType":null,
    "relationshipNrlmPortalShgCode":null,
    "relationshipShgMember":null,
    "shgMemberType":null,
    "eMathiCode":null,
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IE_FORM_STAGE_2:
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
