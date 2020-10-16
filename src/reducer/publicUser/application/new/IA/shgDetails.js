import { createApplication, common } from 'service/actionType';

const initialState = {
  // "formId": null,
  // "isShgMember":null,
  // "shgName":null,
  // "nrlmPortalShgCode":null,
  // "isHouseHoldMember":null,
  // "relationshipType":null,
  // "relationshipNrlmPortalShgCode":null,

  formId: 1,
  isShgMember: 1,
  shgName: 'ttttt',
  nrlmPortalShgCode: 1555,
  isHouseHoldMember: 1,
  relationshipType: 1,
  relationshipNrlmPortalShgCode: 1522,
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_2:
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
