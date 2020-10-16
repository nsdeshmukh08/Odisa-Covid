import { createApplication, common } from 'service/actionType'

const initialState = {
  // formId: null,
  // name: null,
  // fatherName: null,
  // aadharNumber: null,
  // dateOfBirth: null,
  // age: null,
  // gender: null,
  // community: null,
  // mobileNumber: null,
  // address: null,
  // isVulnerable: null,
  // vulnerableType: null,
  // isDifferentlyAbled: null,
  // districtId: null,
  // blockId: null,
  // panchayatId: null,
  // villageId: null,
  // clfId: null,

  formId: 1,
  name: 'Khathiravan',
  fatherName: 'Raja',
  aadharNumber: '454544',
  dateOfBirth: '2020-07-22',
  age: 28,
  gender: 1,
  community: 2,
  mobileNumber: '9677232631',
  address: 'some address',
  isVulnerable: 1,
  vulnerableType: 2,
  isDifferentlyAbled: 1,
  districtId: 1,
  blockId: 13,
  panchayatId: 372,
  villageId: 3725,
  clfId: 372,
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_IA_FORM_STAGE_1:
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
