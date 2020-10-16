import React,{ Component } from 'react';
import AssessmentForm from 'component/forms/staff/application/ViewAssessment'
import _ from 'lodash'
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';
import Loader from 'component/Loader'
import { PCFieldList,SYMRFieldList, PgAssessmentFieldList,EgAssessmentFieldList, IeFieldList } from 'helpers/assessmentScoreHandler'
import { getPercentage } from 'helpers'

const { 
    START_ASSEMENT_AND_GET_OPTIONS_API,
    GET_ASSEMENT_DETAILS_API,
    SUBMIT_ASSESSMENT_API,
    SYMR_START_ASSESSMENT_API,
    SYMR_GET_ASSESSMENT_DETAIL_API,
    SYMR_SUBMIT_ASSESSMENT_API,
    GET_PG_ASSESSMENT_DETAILS_API,
    START_PG_ASSESSMENT_AND_GET_OPTIONS_API,
    SUBMIT_PG_ASSESSMENT_API,
    GET_EG_ASSESSMENT_DETAILS_API,
    START_EG_ASSESSMENT_AND_GET_OPTIONS_API,
    SUBMIT_EG_ASSESSMENT_API
} = API_BOOK.APPLICATION

let APIendpoints = {
    pc : {
        DETAIL_API : GET_ASSEMENT_DETAILS_API,
        GET_OPTION_API : START_ASSEMENT_AND_GET_OPTIONS_API,
        SUBMIT_API : SUBMIT_ASSESSMENT_API   
    },
    symr : {
        DETAIL_API : SYMR_GET_ASSESSMENT_DETAIL_API,
        GET_OPTION_API : SYMR_START_ASSESSMENT_API,
        SUBMIT_API : SYMR_SUBMIT_ASSESSMENT_API  
    },
    pg:{
        DETAIL_API : GET_PG_ASSESSMENT_DETAILS_API,
        GET_OPTION_API : START_PG_ASSESSMENT_AND_GET_OPTIONS_API,
        SUBMIT_API : SUBMIT_PG_ASSESSMENT_API,
    },
    eg:{
        DETAIL_API : GET_EG_ASSESSMENT_DETAILS_API,
        GET_OPTION_API : START_EG_ASSESSMENT_AND_GET_OPTIONS_API,
        SUBMIT_API : SUBMIT_EG_ASSESSMENT_API,
    },
    // ie:{
    //     DETAIL_API : SYMR_GET_ASSESSMENT_DETAIL_API,
    //     GET_OPTION_API : SYMR_START_ASSESSMENT_API,
    //     SUBMIT_API : SYMR_SUBMIT_ASSESSMENT_API  
    // }
}

let totalAssessmentForm = {
    pc : PCFieldList,
    symr : SYMRFieldList,
    pg : PgAssessmentFieldList,
    eg : EgAssessmentFieldList,
    ie : IeFieldList
}

export class Assessment extends Component {

    state = {
        isLoading : true,
        assessmentDetails : [],
        inputOptions : {},
        type:'',
        cancelToken : axios.CancelToken.source(),
        endpoint : {
            DETAIL_API : '',
            GET_OPTION_API : '',
            SUBMIT_API : ''
        }
    }

    defaultValue={
        "assessmentName": "",
        "assessmentValue": null,
        "assessmentScore": 0,
        assessmentTotalScore:null,
        "isSupportive": false,
        "reason": null,
        "documents": []
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        let {params} = this.props.match
        let endpoint = APIendpoints[params.type]
        let fieldList = totalAssessmentForm[params.type]
        if(params && endpoint && fieldList){
            this.setState({
                formId:params.formId,
                type : params.type,
                endpoint,
                fieldList
            },this.getAssessmentDetails) 
        }else{
            this.props.history.push('/staff/dashboard')
        }
    }

    handleRequest = (data) => async (res,rej)=> {
        let request = await API(data)
        if(request.status == 200)
            return res(request.data)
        else return rej()
    }

    renderRow = (data) => { //INITAL score calc
        const { fieldList } = this.state
        return fieldList.map(row => {
            let initalValue = {...this.defaultValue} 
            if(row.initialKeyName)
                initalValue['assessmentValue'] = data[row.initialKeyName] //VALUE
                initalValue['assessmentName'] = row.fieldKeyName
                initalValue['assessmentTotalScore'] = row.scoreField.max
                initalValue['assessmentScore'] = data[row.initialKeyName] ? this.getDefaultScoreValue(row.scoreCalc,data[row.initialKeyName]) : null
            return initalValue
        })
    }

    

    getDefaultScoreValue = (scoreCalc,value) => {
        let { type,rangeValidation,scoreType } = scoreCalc
        let score=0
        if(!value){
            if(type === 'range')
                score= rangeValidation.sort((a,b) => a.score-b.score )[0]?.score
            else
                score= scoreType.sort((a,b) => a.score-b.score )[0]?.score
        }else{
            if(type === 'range'){
                score = rangeValidation.find(({range}) => 
                    parseInt(value) >= range.min && 
                    (parseInt(value) < range.max || !range.max)
                )?.score
            }
            if(type === 'select'){
                let value = parseInt(value)
                score = scoreType.find(data => data.value == value)?.score
            }
    }
        return score
    }

    getAssessmentDetails = async () => {
        const { cancelToken,formId,endpoint } = this.state;
        let apis=[endpoint.GET_OPTION_API,endpoint.DETAIL_API]
        apis=apis.map(data => ({
            ...data,
            params : {
                formId
            },
            cancelToken:cancelToken.token
        }))
        let response = await Promise.all(
            apis.map(
                data => new Promise(this.handleRequest(data))
            )
        )
        let inputOptions = response[0].data
        let assessmentDetails = response[1].data
        let prefillableData = {}
        if(response[0]?.data){
            let members = response[0].data.membersData.members
            prefillableData = {
                ...members,
                noOfActiveMembersInPecent : getPercentage(members.noOfActive,members.activeInactiveTotal),
                membersInShgAndShgHouseHoldInPercent : getPercentage(members.noOfSHGMembers+members.noOfNonSHGTotal,members.totalMembers),
                noOfFemaleInPercent : getPercentage(members.noOfFemale,members.genderTotal)
            }
        }

        //INITAL Data rendering and score calc
        console.log(assessmentDetails,inputOptions,"detailasdasd")
        if(!assessmentDetails.length)
            assessmentDetails=await this.renderRow(prefillableData) 
        this.setState({
            inputOptions,
            assessmentDetails,
            isLoading : false
        })
    }

    redirectToApplicationPage = () => {
        const { type } = this.state
        const { history } = this.props;
        switch(type){
            case 'pc':
                history.replace('/staff/application/producer-collective')
            break;
            case 'pg':
                history.replace('/staff/application/producer-group')
            break;
            case 'symr':
                history.replace('/staff/application/SYMR')
            break;
            case 'eg':
                history.replace('/staff/application/enterpriseGroup')
            break;
            case 'ie':
                history.replace('/staff/application/individualEnterprise')
            break;
            default:
                history.goBack()
            break;   
        }
    }

    submitAssessment = async (assessments) => {
        this.setState({isLoading:true})
        const { formId,endpoint,cancelToken } = this.state
        let data = {
            formId,
            assessments
        }
        let requestData = {
            ...endpoint.SUBMIT_API,
            data,
            cancelToken:cancelToken.token
        }
        let response = await API(requestData)
        if (response.status === 200){
            toast(response.data.message, "success");
            this.setState({
                assessmentDetails : assessments
            },this.redirectToApplicationPage)
        }
        else {
            toast(response.data.message, "error");
            this.setState({isLoading:false})
        }
        
    }

    render() { 
        const { isLoading,inputOptions,assessmentDetails,fieldList } = this.state
        if(isLoading)
            return <Loader className="h-100" />
        return ( 
            <AssessmentForm 
                assessmentDetails={assessmentDetails}
                inputOptions={inputOptions}
                onSubmit={this.submitAssessment}
                AssessmentRow={fieldList}
                {...this.props}
            />
            
         );
    }
}