import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "isShgMember": null,
    "relationshipType": null,
    "shgName": null,
    "shgMemberType": null,
    "nrlmPortalShgCode": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_2:
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