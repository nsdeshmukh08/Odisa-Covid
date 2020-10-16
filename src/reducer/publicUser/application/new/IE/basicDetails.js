import { createApplication, common } from 'service/actionType'

const initialState = {
  formId: 2,
  name: null,
  fatherName: null,
  aadharNumber: null,
  dateOfBirth: null,
  age: null,
  gender: null,
  community: null,
  mobileNumber: null,
  address: null,
  isVulnerable: null,
  vulnerableType: null,
  isDifferentlyAbled: null,
  districtId: null,
  blockId: null,
  panchayatId: null,
  villageId: null,
  differentlyAbledCertificate:[],
  clfId: null,
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IE_FORM_STAGE_1:
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
