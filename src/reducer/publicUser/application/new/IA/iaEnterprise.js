import { createApplication, common } from 'service/actionType';

const initialState = {
  // formId: null,
  // enterpriseName: null,
  // dateOfActivity: null,
  // enterpriseType: null,
  // ieActivityTypes: [],
  // ieCommodityTypes: [],
  // ieSectorTypes: [],

  formId: 1,
  enterpriseName: 'dfdfdfd',
  dateOfActivity: '2020-07-22',
  enterpriseType: 1,
  ieActivityTypes: [
    {
      value: 1,
    },
    {
      value: 2,
    },
  ],
  ieCommodityTypes: [
    {
      value: 1,
    },
    {
      value: 2,
    },
  ],
  ieSectorTypes: [
    {
      value: 1199,
    },
    {
      value: 2,
    },
  ],
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_3:
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
