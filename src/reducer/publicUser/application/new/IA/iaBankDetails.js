import { createApplication, common } from 'service/actionType';

const initialState = {
  // "formId":null,
  // "accNumber": null,
  // "confirmAccNumber":null,
  // "accName": null,
  // "bnkName": null,
  // "branchName": null,
  // "ifscCode": null,

  formId: 1,
  accNumber: '123456789',
  confirmAccNumber: '123456789',

  accName: 'dfdfdfd',
  bankName: 'dfdfdfdffdfdfd',
  branchName: 'fffdfdf',
  ifscCode: 'lllllll',
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_5:
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
