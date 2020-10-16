import { createApplication, common } from 'service/actionType';

// "iaEnterprise": {
//     "formId":2,
//     "enterpriseName": "enerprise",
//     "enterpriseType":3,
//     "dateOfActivity":"2020-07-21" ,
//     "iaTypes": [
//             {
//             "value": 1
//             },
//             {
//                 "value": 2
//             }
//     ],
//     "iaCommodityTypes": [
//                 {
//                 "value": 1
//                 },
//                 {
//                     "value": 2
//                 }
//             ],
//     "iaSectorTypes": [
//         {
//         "value": 1
//         },
//         {
//         "value": 2
//         }
//     ]
//     }

const initialState = {
  formId: null,
  enterpriseName: null,
  dateOfActivity: null,
  enterpriseType: null,
  ieActivityTypes: [],
  ieCommodityTypes: [],
  ieSectorTypes: [],

  enterpriseDetails: null,

  //    iaTypes:[],
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IE_FORM_STAGE_3:
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
