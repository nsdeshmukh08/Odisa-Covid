import { SYMRFORM, common } from 'service/actionType'

const initialState = {
    "formId": undefined,
           "shgMemberType": null,
            "relationshipType":null,
            "shgName": null,
            "eMathiCode": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case SYMRFORM.UPDATE_SYMR_FORM_STAGE_2:
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