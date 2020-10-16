import { createPgApplication, common } from 'service/actionType'

const initialState = {
    "formId": null,
    "activeInactiveTotal": null,
    "noOfMale": null,
    "noOfFemale": null,
    "noOfTransGender": null,
    "PwdnoOfMale": null,
    "PwdnoOfFemale": null,
    "PwdnoOfTransGender": null,
    "genderTotal": null,
    "PwdGendertotal": null,
    "noOfGen": null,
    "noOfSEBC": null,
    "noOfSC": null,
    "noOfST": null,
    "noOfCommunityOthers": null,
    "communityTotal": null,
    "noOfMinorityOthers": null,
    "minorityTotal": null,
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createPgApplication.UPDATE_PRODUCER_GROUP_FORM_STAGE_3:
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