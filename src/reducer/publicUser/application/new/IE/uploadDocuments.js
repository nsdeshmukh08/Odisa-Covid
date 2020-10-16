import { createApplication, common } from 'service/actionType'

const initialState = {
    "formId":null,
    "isDeclaration":null,
    "idProof" : [],
    "addressProof": [],
    "bankPassBook": [],
    "businessPlan": [],
    "existingLoanRepay": [],
    "differentlyAbledCertificate":[],
    "photoCopy":[],
    
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IE_FORM_STAGE_9:
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
