import { createApplication, common } from 'service/actionType';

const initialState = {
  // "formId":null,
  // isExistingLoan:null,
  // existingLoanList:[],
  formId: 1,
  isExistingLoan: 1,
  existingLoanList: [
    {
      loanSource: 'wrwr',
      loanReceivedDate: 33,
      loanAmount: 1000,
      interestRate: 12.12,
      amountToBeRepaid: 1212,
      amountRepaid: 1212,
      balanceAmtToBeRepaid: 1212,
      reason: 'covid ',
    },
    {
      loanSource: 'lkfelf',
      loanReceivedDate: 33,
      loanAmount: 1000,
      interestRate: 12.12,
      amountToBeRepaid: 1212,
      amountRepaid: 1212,
      balanceAmtToBeRepaid: 1212,
      reason: 'erwrwf ',
    },
  ],
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_6:
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
