import { createApplication,  common } from 'service/actionType'

const initialState = {
    "formId":null,
    "accNumber": null,
    "confirmAccNumber":null,
    "accName": null,
    "bankName": null,
    "branchName": null,
    "ifscCode": null,
    "isAccLinkAadhar": null
}
// "iaBankDetails": {
//     "formId":2,
//       "accNumber": "123458",
//       "accName": "ASdad",
//       "bnkName": "Asdasd",
//       "branchName": "asdad",
//       "ifscCode": "Asdas",
//       "isAccLinkAadhar":1
//   },

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IE_FORM_STAGE_5:
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
