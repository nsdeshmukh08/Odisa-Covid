import { SYMRFORM, common } from 'service/actionType'

const initialState = {
    "isSkillTrained": null,
    "trainingInstitute": null,
    "skillTrainingScheme": null,
    "courseName": null,
    "courseCompletionYear": null,
    "isCompletedEdpProgramme": null,
    "edpCompletedInstituteName": null,
    "edpCompletedCourseName": null,
    "edpScheme": null,
    "isRegisteredEdpProgramme": null,
    "edpRegisteredInstituteName": null,
    "edpRegisteredCourseName": null,
    "registeredEdpScheme": null,
    'otherEdpScheme': null,
    'otherRegisteredEdpScheme': null,
    'otherSkillTrainingScheme': null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case SYMRFORM.UPDATE_SYMR_FORM_STAGE_3:
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