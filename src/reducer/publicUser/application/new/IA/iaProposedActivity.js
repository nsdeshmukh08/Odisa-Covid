import { createApplication, common } from 'service/actionType';

const initialState = {
  // formId: null,
  // bussinessActivities: null,
  // machineries: null,
  // workingCapital: null,
  // purchaseServices: null,
  // marketLinkageSupport: null,
  // organizingAwarenessCamps: null,
  // infrastructure: null,
  // otherCost: null,

  formId: 1,
  businessActivities: 1000,
  machineries: 10000,
  workingCapital: 6000,
  purchaseServices: 3000,
  marketLinkageSupport: 3000,
  organizingAwarenessCamps: 6000,
  infrastucture: 25000,
  otherCost: 3000,
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_8:
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
