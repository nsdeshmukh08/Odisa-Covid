import { loaders, createPgApplication } from 'service/actionType'
import { history } from 'helpers'
import { common } from 'service/actionType'
import { STAFF_ROLE_ID } from 'helpers/variables'
//Loaders

let pgForms = [
    {
        label: 'basicDetails',
        form: 1
    },
    {
        label: 'pgDetails',
        form: 2
    },
    {
        label: 'pgFormMembers',
        form: 3
    },
    {
        label: 'iaBaseLineDetails',
        form: 4,
      },
    {
        label: 'pgFormBankDetails',
        form: 5
    },
    {
        label: 'iaExistingLoan',
        form: 6,
      },
      {
        label: 'iaLossIncurred',
        form: 7,
      },
      {
        label: 'iaProposedActivity',
        form: 8,
      },
    {
        label: 'pgFormUploadDocument',
        form: 9
    }
]

export const updateForm = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true })
        // let { PG_FORM_FILL_API } = API_BOOK.APPLICATION
        let { data, stage } = { ...payload }
        // if(stage === 3){
        //     data["noOfVulTransGender"] = data.noOfTransGender;
        // }
        // let requestPayload = {
        //     ...PG_FORM_FILL_API,
        //     data: stage !== 2 ? data : {
        //         ...data,
        //         'pgSectorTypes': data['pgSectorTypes'].map(data => ({ value: data.value })),
        //         'pgCommodityTypes': data['pgCommodityTypes'].map(data => ({ value: data.value })),
        //         'pgTypes': data['pgTypes'].map(data => ({ value: data.value }))
        //     },
        //     params: {
        //         stage
        //     },
        //     cancelToken: cancelToken
        // }
        // console.log(requestPayload,"requasd123")
        // let response = await API(requestPayload)
        if (true) {
            let stages = getState().common.applicatonStagesCompletedList
            if (stage < 9)
                history.push((stage + 1).toString())
            else history.push('/application/producerGroup/review')
            dispatch({
                type: createPgApplication[`UPDATE_PRODUCER_GROUP_FORM_STAGE_${stage}`],
                payload: payload.data
            })
            stages.push(stage)
            dispatch({ type: common.UPDATE_APPLICATION_STAGES, payload: stages })
        } else
            // toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false })

    }

export const getPgDraftForm = (cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        dispatch({
            type: common.APPLICATION_FORM_RESET
        })

        let { profile } = getState()

        dispatch({ type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING, payload: true })

        // master Data

        let { GET_PC_DETALS_OPTIONS_API } = API_BOOK.APPLICATION


        let masterPayload = {
            ...GET_PC_DETALS_OPTIONS_API,
        }
        let masterRresponse = await API(masterPayload)

        if (masterRresponse.status === 200) {

            dispatch({ type: common.UPDATE_PC_MASTER_DATA, payload: masterRresponse.data.data })

        } else
            toast(masterRresponse.data.message, 'error')

        let { GET_PG_FORM_API } = API_BOOK.APPLICATION
        let requestPayload = {
            ...GET_PG_FORM_API,
            params: {
                formId: localStorage.getItem('createAppformId')
            },
            cancelToken: cancelToken
        }


        let response = await API(requestPayload)
        // console.log('egform', response, pgForms)
        if (response.status === 200) {
            let { data } = response.data

            let formsTillSubmitted = pgForms.filter(form => ((data[form.label] && !Array.isArray(data[form.label])) || (Array.isArray(data[form.label]) && data[form.label].length)))
            if (!formsTillSubmitted.find(data => data.form === 1) && parseInt(localStorage.getItem('role')) === STAFF_ROLE_ID.PUBLIC) {
                let basicDetails = {
                    mobileNumber: profile.mobileNumber
                }
                dispatch({
                    type: createPgApplication[`UPDATE_PRODUCER_GROUP_FORM_STAGE_1`],
                    payload: basicDetails
                })
            }

            if (formsTillSubmitted.length) {
                formsTillSubmitted.map(forms => {

                    let payload = data[forms.label]

                    if (forms.form === 1)
                        payload = {
                            ...payload,
                            districtId: payload?.district?.value,
                            panchayatId: payload?.panchayat?.value,
                            blockId: payload?.block?.value
                        }

                    if (forms.form === 2)
                        payload = {
                            ...payload,
                            pgCommodityTypes: payload.pgCommodityTypes.map(data => data.pgCommodityTypesData),
                            pgSectorTypes: payload.pgSectorTypes.map(data => data.pgSectorTypesData),
                            pgTypes: payload.pgTypes.map(data => data.pgTypesData),
                            supportingOrgName: payload.supportingOrgName,
                            supportingOrg : payload.formSupportedData?.value,
                            promotingOrgName: payload.promotingOrgName,
                            promotingOrgs: payload.promotingOrg?.value,
                            registrationUnder: payload?.registrationUnderData?.value
                        }
                        if(forms.form === 3)
                        payload = {
                            ...payload,
                            noOfVulTransGender : payload.noOfTransGender
                        }
                    if (forms.form === 4) {
                        payload = {
                            ...payload,
                            // nameOfPc: "dummy PC"
                        }
                    }
                    if (forms.form === 5)
                        payload = {
                            ...payload,
                            confirmAccNumber: payload.accNumber
                        }
                    if (forms.form === 6)
                        payload = payload.map(activ => (
                            {
                                formId: localStorage.getItem('createAppformId'),
                                activityName: activ?.activityName,
                                activityTimeLineVal: activ?.activityTimeLineVal,
                                activityTimeLine: activ?.activityTimelineData?.value,
                                amtReq: activ?.amtReq
                            }))
                    dispatch({
                        type: createPgApplication[`UPDATE_PRODUCER_GROUP_FORM_STAGE_${forms.form}`],
                        payload
                    })
                    dispatch({ type: common.UPDATE_APPLICATION_STAGES, payload: formsTillSubmitted.map(data => data.form) })
                })
            } else {
                dispatch({
                    type: createPgApplication["RESET"]
                })
                dispatch({
                    type: common.RESET
                })
            }



        } else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING, payload: false })

    }