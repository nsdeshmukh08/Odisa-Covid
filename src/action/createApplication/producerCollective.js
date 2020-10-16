import { loaders, createApplication, common } from 'service/actionType';
import { history } from 'helpers';
import { STAFF_ROLE_ID } from 'helpers/variables';
//Loaders

let pcForms = [
  {
    label: 'basicDetails',
    form: 1,
  },
  {
    label: 'pcDetails',
    form: 2,
  },
  {
    label: 'pcFormMembers',
    form: 3,
  },
  {
    label: 'pcFormAmountRecevied',
    form: 4,
  },
  {
    label: 'pcFormBankDetails',
    form: 5,
  },
  {
    label: 'pcFormProposedActivity',
    form: 6,
  },
  {
    label: 'pcFormUploadDocument',
    form: 7,
  },
];

export const updateForm = (payload, cancelToken) => async (
  dispatch,
  getState,
  { API, API_BOOK, toast }
) => {
  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true });
  let { PC_FORM_FILL_API } = API_BOOK.APPLICATION;
  let { data, stage } = { ...payload };
  if (stage === 3) {
    data['noOfVulTransGender'] = data.noOfTransGender;
  }
  let requestPayload = {
    ...PC_FORM_FILL_API,
    data:
      stage !== 2
        ? data
        : {
            ...data,
            pcSectorTypes: data['pcSectorTypes'].map((data) => ({
              value: data.value,
            })),
            pcCommodityTypes: data['pcCommodityTypes'].map((data) => ({
              value: data.value,
            })),
            pcTypes: data['pcTypes'].map((data) => ({ value: data.value })),
          },
    params: {
      stage,
    },
    cancelToken: cancelToken,
  };
  let response = await API(requestPayload);
  //   if (response.status === 200) {
  let stages = getState().common.applicatonStagesCompletedList;
  if (stage < 7) history.push((stage + 1).toString());
  else history.push('/application/productiveCollective/review');
  dispatch({
    type: createApplication[`UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_${stage}`],
    payload: payload.data,
  });
  stages.push(stage);
  dispatch({ type: common.UPDATE_APPLICATION_STAGES, payload: stages });
  //   } else toast(response.data.message, 'error');
  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false });
};

export const getDraftForm = (cancelToken) => async (
  dispatch,
  getState,
  { API, API_BOOK, toast }
) => {
  dispatch({
    type: common.APPLICATION_FORM_RESET,
  });

  dispatch({
    type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING,
    payload: true,
  });

  // master Data

  let { GET_PC_DETALS_OPTIONS_API } = API_BOOK.APPLICATION;

  let masterPayload = {
    ...GET_PC_DETALS_OPTIONS_API,
  };
  let masterRresponse = await API(masterPayload);

  if (masterRresponse.status === 200) {
    dispatch({
      type: common.UPDATE_PC_MASTER_DATA,
      payload: masterRresponse.data.data,
    });
  } else toast(masterRresponse.data.message, 'error');

  //master end

  let { GET_PC_FORM_API } = API_BOOK.APPLICATION;
  let { profile } = getState();
  let requestPayload = {
    ...GET_PC_FORM_API,
    params: {
      formId: localStorage.getItem('createAppformId'),
    },
    cancelToken: cancelToken,
  };
  let response = await API(requestPayload);
  if (response.status === 200) {
    let { data } = response.data;
    let formsTillSubmitted = pcForms.filter(
      (form) =>
        (data[form.label] && !Array.isArray(data[form.label])) ||
        (Array.isArray(data[form.label]) && data[form.label].length)
    );
    if (
      !formsTillSubmitted.find((data) => data.form === 1) &&
      parseInt(localStorage.getItem('role')) === STAFF_ROLE_ID.PUBLIC
    ) {
      let basicDetails = {
        mobileNumber: profile.mobileNumber,
      };
      dispatch({
        type: createApplication[`UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_1`],
        payload: basicDetails,
      });
    }
    formsTillSubmitted.map((forms) => {
      let payload = data[forms.label];
      if (forms.form === 1)
        payload = {
          ...payload,
          districtId: payload?.district?.value,
          panchayatId: payload?.panchayat?.value,
          blockId: payload?.block?.value,
        };
      if (forms.form === 2)
        payload = {
          ...payload,
          pcCommodityTypes: payload.pcCommodityTypes.map(
            (data) => data.pcCommodityTypesData
          ),
          pcSectorTypes: payload.pcSectorTypes.map(
            (data) => data.pcSectorTypesData
          ),
          pcTypes: payload.pcTypes.map((data) => data.pcTypesData),
          supportingOrgName: payload.supportingOrgName,
          supportingOrg: payload.formSupportedData?.value,
          promotingOrgName: payload.promotingOrgName,
          promotingOrgs: payload.promotingOrg?.value,
          registrationUnder: payload.registrationUnderData?.value,
        };
      if (forms.form === 3)
        payload = {
          ...payload,
          noOfVulTransGender: payload.noOfTransGender,
        };
      if (forms.form === 5)
        payload = {
          ...payload,
          confirmAccNumber: payload.accNumber,
        };
      if (forms.form === 6)
        payload = payload.map((activ) => ({
          formId: localStorage.getItem('createAppformId'),
          activityName: activ.activityName,
          activityTimeLineVal: activ.activityTimeLineVal,
          activityTimeLine: activ.activityTimelineData.value,
          amtReq: activ.amtReq,
        }));
      dispatch({
        type:
          createApplication[
            `UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_${forms.form}`
          ],
        payload,
      });
      dispatch({
        type: common.UPDATE_APPLICATION_STAGES,
        payload: formsTillSubmitted.map((data) => data.form),
      });
    });
  } else toast(response.data.message, 'error');
  dispatch({
    type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING,
    payload: false,
  });
};
