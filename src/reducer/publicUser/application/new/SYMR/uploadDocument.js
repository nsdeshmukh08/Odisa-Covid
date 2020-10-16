import { SYMRFORM, common } from 'service/actionType'

const initialState = {
      "formId": null,
           "proofOfMigration": [],
          "applicationLetter": [],
          "bankPassBook": [],
          "idProofPhoto": [],
          "businessPlan": [],
          "trainingCertificate": [],
          "remarks": ""
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case SYMRFORM.UPDATE_SYMR_FORM_STAGE_8:
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