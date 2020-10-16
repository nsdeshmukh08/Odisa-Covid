import { createApplication, common } from 'service/actionType'

const initialState = {
  formId: null,
  bussinessActivities: null,
  machineries: null,
  workingCapital: null,
  purchaseServices: null,
  marketLinkageSupport: null,
  organizingAwarenessCamps: null,
  infrastructure: null,
  otherCost: null,
}
// "iaProposedActivity": [
//     {
//       "formId":2,
//         "activityName": "21313",
//         "activityTimeLine": 1,
//         "activityTimeLineVal": 1,
//         "amtReq": 1212
//     },
//     {
//       "formId":2,
//         "activityName": "11111",
//         "activityTimeLine": 2,
//         "activityTimeLineVal": 23,
//         "amtReq": 1212
//     }
// ],

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case createApplication.UPDATE_IA_FORM_STAGE_8:
      return {
        ...state,
        ...payload,
      }
    case common.APPLICATION_FORM_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
