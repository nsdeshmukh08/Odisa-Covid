import { createApplication, common } from 'service/actionType';

const initialState = {
  // formId: null,
  // idProof: [],
  // addressProof: [],
  // bankPassBook: [],
  // businessPlan: [],
  // existingLoanRepay: [],
  // differentlyAbledCertificate: [],
  // photoCopy: [],
  // remarks: null,
  // isDeclaration: null,

  formId: 1,
  idProof: [{ docUrl: 'docName', docName: '1' }],
  addressProof: [{ docUrl: 'docName', docName: '1' }],
  bankPassBook: [{ docUrl: 'docName', docName: '3' }],
  businessPlan: [{ docUrl: 'docName', docName: '5' }],
  existingLoanRepay: [{ docUrl: 'docName', docName: '5' }],
  differentlyAbledCertificate: [{ docUrl: 'docName', docName: '5' }],
  photoCopy: [{ docUrl: 'docName', docName: '5' }],
  remarks: 'sdsdf',
  isDeclaration: 1,
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_9:
      return {
        ...state,
        ...payload,
      };
    case common.APPLICATION_FORM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
