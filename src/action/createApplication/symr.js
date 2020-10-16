import { loaders, createApplication,SYMRFORM } from 'service/actionType'
import { history } from 'helpers'
import {common} from 'service/actionType'
import { STAFF_ROLE_ID } from 'helpers/variables'
//Loaders

// let symrForm = ['basicDetails','symrShgDetails','symrSkillTraining','symrEnterprise','symrBankDetails','symrProposedActivity','symrExistingLoan','symrUploadDocument']
let symrForm = [
    {
        label : 'basicDetails',
        form : 1
    },
    {
        label : 'symrShgDetails',
        form : 2
    },
    {
        label : 'symrSkillTraining',
        form : 3
    },
    {
        label : 'symrEnterprise',
        form : 4
    },
    {
        label : 'symrBankDetails',
        form : 5
    },
    {
        label : 'symrProposedActivity',
        form : 6
    },
    {
        label : 'symrExistingLoan',
        form : 7
    },
    {
        label : 'symrUploadDocument',
        form : 8
    }
]
export const updateForm = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => 
{

        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true })

        // let { UPDATE_SYMR_FORM_DETAILS } = API_BOOK.APPLICATION

        let { data, stage } = {...payload}

        // stage = Number(stage)

        // let requestPayload = {
        //     ...UPDATE_SYMR_FORM_DETAILS,
        //     // data : { [symrForm[Number(stage-1)]]:data },
        //     data ,
        //     params: {
        //         stage
        //     },
        //     cancelToken: cancelToken
        // }
        // let response = await API(requestPayload)

        if (true) {

            let stages= getState().common.applicatonStagesCompletedList.slice(0)

            if(stage < 8 )
                history.push((stage + 1).toString())
            else history.push('/application/symr/review')

            dispatch({
                type: SYMRFORM[`UPDATE_SYMR_FORM_STAGE_${stage}`],
                payload: payload.data
            })
            stages.push(stage)
            dispatch({ type : common.UPDATE_APPLICATION_STAGES,payload:stages })

        } else
            //toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false })

}

export const getSYMRMasterData = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => 
    {

    dispatch({
        type : common.APPLICATION_FORM_RESET
    })


  

        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: true })

        let { GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION


        let requestPayload = {
            ...GET_SYMR_FORM_MASTER_DATA,
        }
        let response = await API(requestPayload)

        if (response.status === 200) {    

           
            dispatch({ type:common.UPDATE_SYMR_MASTER_DATA,payload:response.data.data })

        } else
            toast(response.data.message, 'error')

        dispatch({ type: loaders.IS_CREATE_APP_FETCHING, payload: false })

}

export const getSymrDraftForm = (cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => 
{
    let { profile } = getState()

    dispatch({
        type : common.APPLICATION_FORM_RESET
    })

    dispatch({ type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING, payload: true })

    let { GET_SYMR_FORM_DETAILS } = API_BOOK.APPLICATION

    let requestPayload = {
        ...GET_SYMR_FORM_DETAILS,
        params: {
            formId : localStorage.getItem('createAppformId')
        },
        cancelToken: cancelToken
    }
    let response = await API(requestPayload)

     const valueHelper = (key,payload,payloadKey,field='value') =>{

        return {
            [key]:payload ?payload[payloadKey]?.value :''
        } 

    }

// master Data

        let { GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION


        let masterPayload = {
            ...GET_SYMR_FORM_MASTER_DATA,
        }
        let masterRresponse = await API(masterPayload)

        if (masterRresponse.status === 200) {    
           
            dispatch({ type:common.UPDATE_SYMR_MASTER_DATA,payload:masterRresponse.data.data })

        } else
            toast(masterRresponse.data.message, 'error')


//master end
    
    if (response.status === 200) {
        let {data} = response.data
        
        let formsTillSubmitted = symrForm.filter(form => ((data[form.label] && !Array.isArray(data[form.label])) || (Array.isArray(data[form.label]) && data[form.label].length)))
        if (!formsTillSubmitted.find(data => data.form === 1) && parseInt(localStorage.getItem('role')) === STAFF_ROLE_ID.PUBLIC) {
            let basicDetails = {
                mobileNumber: profile.mobileNumber
            }
            dispatch({
                type: SYMRFORM[`UPDATE_SYMR_FORM_STAGE_1`],
                payload: basicDetails
            })
        }
        formsTillSubmitted.map((forms,index) => {
            let payload=data[forms.label]
            let stage = forms.form

            let isValidate = true 

            if(payload){

                if(forms == 'symrProposedActivity'){
                     isValidate = payload.length!=0 
                }else{
                    isValidate = true
                }



            }else{
                isValidate = false
            }

            if(isValidate){


                    if(stage === 1)
                payload={
                    ...payload,
                    districtId : payload.district?payload.district.value:'',
                    panchayatId: payload.panchayat?payload.panchayat.value:'',
                    blockId : payload.block?payload.block.value:'',
                    appSubmitDate : payload?.appSubmitDate,
                    ...valueHelper('community',payload,'communityData'),
                    ...valueHelper('gender',payload,'genderData'),
                    ...valueHelper('educationQualification',payload,'educQualificationData'),
                    ...valueHelper('natureOfMigration',payload,'natureOfMigrationData'),
                    ...valueHelper('proofType',payload,'proofTypeData'),
                    ...valueHelper('religion',payload,'religionData'),
                    ...valueHelper('sourceInfo',payload,'sourceOfInfoData'),
                }
            if(stage === 2)
                payload={
                    ...payload,
                    shgMemberType : payload.shgMemberTypeData?.value,
                    ...valueHelper('relationshipType',payload,'relationshipTypeData'),
                }

            if(stage === 3)
            payload={
                ...payload,
                    ...valueHelper('skillTrainingScheme',payload,'skilltrainingData'),               
                    ...valueHelper('edpScheme',payload,'edpschemeData'),               
                    ...valueHelper('registeredEdpScheme',payload,'registeredEdpSchemeData'),               
                    ...valueHelper('courseCompletionYear',payload,'courseCompletionTypeData'),           
               
            } 
          if(stage === 4)
            payload={
                ...payload,
                    ...valueHelper('activityExpYears',payload,'activityExpYearsData'),               
                    ...valueHelper('enterpreneurExpYears',payload,'enterpreneurExpYearsData'),               
                    ...valueHelper('enterpriseType',payload,'enterpriseTypeData'),   
                    symrTypes:(payload.symrTypes||[]).map(({symrTypesData })=>symrTypesData),
                    symrCommodityTypes:(payload.symrCommodityTypes||[]).map(({symrCommodityTypesData })=>symrCommodityTypesData),           
                    symrSectorTypes:(payload.symrSectorTypes||[]).map(({symrSectorTypesData })=>symrSectorTypesData), 
               
            }

            if(stage === 5)
                payload={
                    ...payload,
                    confirmAccNumber : payload.accNumber
                }
              
            if(stage === 6)
                payload=payload.map(activ => (
                    { 
                        formId : localStorage.getItem('createAppformId'),
                        activityName:activ.activityName,
                        activityTimeLineVal : activ.activityTimeLineVal,
                        activityTimeLine : activ.activityTimelineData.value,
                        amtReq : activ.amtReq
                    }))
            dispatch({
                type: SYMRFORM[`UPDATE_SYMR_FORM_STAGE_${stage}`],
                payload
            })
           

            }

            
        })

         dispatch({ type : common.UPDATE_APPLICATION_STAGES,payload:formsTillSubmitted.map(data => data.form) })

    } else
        toast(response.data.message, 'error')
    dispatch({ type: loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING, payload: false })

}