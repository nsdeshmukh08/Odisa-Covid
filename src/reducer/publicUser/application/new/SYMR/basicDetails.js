import { SYMRFORM, common } from 'service/actionType'

const initialState = {
     "formId": undefined,
            "mobileNumber": null,
            sourceInfo:null,
            "name": null,
            "fatherName": null,
            "address": null,
            "gender": null,
            "religion": null,
            "community": null,
            educationQualification:null,
            proofType:null,
            natureOfMigration:null,
            dateOfBirth:null,
            age:null,
            govtIdNumber:"",
            placeReturnFrom:null,
            previousOccupation:null,
            isWomeHeaded:null,
            isVulnerableCategory:null,
            districtId:null,
            blockId:null,
            panchayatId:null,
            appSubmitDate : new Date()
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case SYMRFORM.UPDATE_SYMR_FORM_STAGE_1:
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