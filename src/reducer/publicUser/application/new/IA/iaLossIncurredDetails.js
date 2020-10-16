import { createApplication, common } from 'service/actionType';

const initialState = {
  // formId: null,
  // isLossIncurred: null,
  // lossIncurredList: [],

  formId: 1,
  isLossIncurred: 1,
  lossIncurredList: [
    {
      lossTypeId: 1,
      typeOfLoss: 'wrwr',
      amount: 1000,
    },
    {
      lossTypeId: 2,
      typeOfLoss: 'lkfelf',
      amount: 33555,
    },
  ],
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_7:
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
