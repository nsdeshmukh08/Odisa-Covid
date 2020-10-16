import { loaders, createApplication, common } from 'service/actionType';
import { history } from 'helpers';
import { STAFF_ROLE_ID } from 'helpers/variables';
//Loaders

let ieForms = [
  {
    label: 'applicationDetails',
    form: 1,
  },
  {
    label: 'ieShgDetails',
    form: 2,
  },
  {
    label: 'ieEnterpriseDetails',
    form: 3,
  },
  {
    label: 'ieBaselineDetails',
    form: 4,
  },
  {
    label: 'ieBankDetails',
    form: 5,
  },

  {
    label: 'ieExistingLoan',
    form: 6,
  },
  {
    label: 'ieLossIncurredDetails',
    form: 7,
  },
  {
    label: 'ieFundRequirement',
    form: 8,
  },
  {
    label: 'ieUploadDocument',
    form: 9,
  },
];
// GENERATE_IA_FORM_ID_API,IA_FORM_FILL_API,GET_IA_FORM_API,SUBMIT_IA_FORM_API
// UPDATE_IA_MASTER_DATA
export const updateForm = (payload, cancelToken) => async (
  dispatch,
  getState,
  { API, API_BOOK, toast }
) => {
  // IE_FORM_FILL_API end point

  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true });
  let { IE_FORM_FILL_API } = API_BOOK.APPLICATION;
  let { data, stage } = { ...payload };
  if (stage === 3) {
    data['noOfVulTransGender'] = data.noOfTransGender;
  }
  let requestPayload = {
    ...IE_FORM_FILL_API,
    data:
      stage !== 3
        ? data
        : {
            ...data,
            // ieActivityTypes: data['ieActivityTypes'].map((data) => ({
            //   value: data.value,
            // })),
            // iaSectorTypes: data['iaSectorTypes'].map((data) => ({
            //   value: data.value,
            // })),
            // iaCommodityTypes: data['iaCommodityTypes'].map((data) => ({
            //   value: data.value,
            // })),
          },
    params: {
      stage,
    },
    cancelToken: cancelToken,
  };
  let response = await API(requestPayload);
  if (response.status === 200) {
  let stages = getState().common.applicatonStagesCompletedList;
  console.log(
    createApplication[`UPDATE_IE_FORM_STAGE_${stage}`],
    payload.data,
    'in actions '
  );
  dispatch({
    type: createApplication[`UPDATE_IE_FORM_STAGE_${stage}`],
    payload: payload.data,
  });
  stages.push(stage);
  dispatch({ type: common.UPDATE_APPLICATION_STAGES, payload: stages });
  if (stage < 9) history.push((parseInt(stage) + 1).toString());
  else history.push('/application/individualEnterprise/review');

  
  } else toast(response.data.message, 'error');
  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false });
};

export const getIeMasterData = (payload, cancelToken) => async (
  dispatch,
  getState,
  { API, API_BOOK, toast }
) => {
  // Narayan
  // dispatch({
  //   type: common.APPLICATION_FORM_RESET,
  // });

  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true });

  let { GET_IE_DETAILS_OPTIONS_API } = API_BOOK.APPLICATION;

  let requestPayload = {
    ...GET_IE_DETAILS_OPTIONS_API,
  };
  let response = await API(requestPayload);

  if (response.status === 200) {
    dispatch({
      type: common.UPDATE_IE_MASTER_DATA,
      payload: response.data.data,
    });
  } else toast(response.data.message, 'error');

  dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false });
};

// GENERATE_IA_FORM_ID_API,IA_FORM_FILL_API,GET_IA_FORM_API,SUBMIT_IA_FORM_API
//GET_IA_DETAILS_OPTIONS_API
export const getIeDraftForm = (cancelToken) => async (
  dispatch,
  getState,
  { API, API_BOOK, toast }
) => {
  dispatch({
    type: common.APPLICATION_FORM_RESET,
  });

  let { profile } = getState();

  dispatch({
    type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING,
    payload: true,
  });

  // master Data

  let { GET_IE_DETAILS_OPTIONS_API } = API_BOOK.APPLICATION;

  let masterPayload = {
    ...GET_IE_DETAILS_OPTIONS_API,
  };
  let masterRresponse = await API(masterPayload);

  if (masterRresponse.status === 200) {
    dispatch({
      type: common.UPDATE_IE_MASTER_DATA,
      payload: masterRresponse.data.data,
    });
  } else toast(masterRresponse.data.message, 'error');

  let { GET_IE_FORM_API } = API_BOOK.APPLICATION;

  let requestPayload = {
    ...GET_IE_FORM_API,
    params: {
      formId: localStorage.getItem('createAppformId'),
    },
    cancelToken: cancelToken,
  };

  let response = await API(requestPayload);

  if (response.status === 200) {
    let { data } = response.data;

    console.log(
      'data,00000000000000000000000000000000000000000000 draft api data',
      data
    );
    let formsTillSubmitted = ieForms.filter(
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
      // console.log("profile",profile,basicDetails)
      dispatch({
        type: createApplication[`UPDATE_IE_FORM_STAGE_1`],
        payload: basicDetails,
      });
    }
     formsTillSubmitted.map((forms) => {
      let payload = data[forms.label];
      if (forms.form === 1)
      {
       
        payload = {
          ...payload,
        };
        
      }
     if (forms.form === 2) {
       console.log("Payload====> 2",payload);
        payload = {
          ...payload,
          shgMemberType: payload?.shgMemberTypeData?.value,
          relationshipType: payload?.relationshipTypeData?.value,
        };
      }
       if (forms.form === 3) {
        // console.log(payload,"#################")
        payload = {
          ...payload,
          ieCommodityTypes: payload?.iaCommodityTypes?.map(
            (data) => data.iaCommodityTypesData
          ),
          ieSectorTypes: payload?.iaSectorTypes?.map(
            (data) => data.iaSectorTypesData
          ),
          ieActivityTypes: payload?.ieActivityTypes?.map(
            (data) => data.iaTypesData
          ),
          enterpriseType: payload?.enterpriseTypeData?.value,
        };
        //console.log("Form 3 Payload =======>", payload);
      }



      // if (forms.form === 3)
      //     payload = {
      //         ...payload,
      //         noOfVulTransGender: payload.noOfTransGender
      //     }
      // if (forms.form === 4) {
      //     payload = {
      //         ...payload
      //     }
      // }
      /*if (forms.form === 4)
        payload = {
          ...payload,
          confirmAccNumber: payload.accNumber,
        };

      // if (forms.form === 5)
      //   payload = payload.map((activ) => ({
      //     formId: localStorage.getItem('createAppformId'),
      //     activityName: activ?.activityName,
      //     activityTimeLineVal: activ?.activityTimeLineVal,
      //     activityTimeLine: activ?.activityTimelineData?.value,
      //     amtReq: activ?.amtReq,
      //   }));
      // console.log(payload)
      if (forms.form === 7) {
        console.log(payload, 'for 7 th stage');
        payload = {
          ...payload,
          uploadDocuments: payload.iaUploadDocument,
        };
      }
      // payload = payload.map(activ => (
      //     {
      //         formId: localStorage.getItem('createAppformId'),
      //         activityName: activ.activityName,
      //         activityTimeLineVal: activ.activityTimeLineVal,
      //         activityTimeLine: activ.activityTimelineData.value,
      //         amtReq: activ.amtReq
      //     }))
      */
      //console.log(`UPDATE_IE_FORM_STAGE_${forms.form}`, payload);
      dispatch({
        type: createApplication[`UPDATE_IE_FORM_STAGE_${forms.form}`],
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
