import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId": null,
    "totalMembers" : null,
    "staffEngagedNonMembers" : null,
    "noOfActive": null,
    "noOfInActive": null,
    "activeInactiveTotal": null,
    "noOfMale": null,
    "noOfFemale": null,
    "noOfTransGender": null,
    "genderTotal": null,
    "noOfBC": null,
    "noOfMBC": null,
    "noOfSC": null,
    "noOfST": null,
    "noOfCommunityOthers": null,
    "communityTotal": null,
    "noOfMuslim": null,
    "noOfChristians": null,
    "noOfMinorityOthers": null,
    "minorityTotal": null,
    "noOfDiffAbled": null,
    "noOfWidow": null,
    "noOfDesitute": null,
    "noOfDeserted": null,
    "noOfVulTransGender": null,
    "noOfEiderly": null,
    "vulnerableTotal": null,
    "noOfSHGMembers": null,
    "noOfSHGTotal": null,
    "noOfNonSHGTotal": null,
    "shgTotal": null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_ENTERPRISE_GROUP_FORM_STAGE_3:
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
