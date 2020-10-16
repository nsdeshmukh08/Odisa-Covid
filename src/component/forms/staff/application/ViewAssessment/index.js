import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import InputRow from './InputRow'
import _ from 'lodash'
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { connect } from "react-redux"
import { STAFF_ROLE_ID } from "helpers/variables"
const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

class AssessmentView extends Component {

    state = {
        inputOptions : {
            linkageMaster : []
        },
        assessmentDetails : [],
        init : false,
        uploadingIndexes :[],
        cancelToken : axios.CancelToken.source()
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(!prevState.init)
            return {
                assessmentDetails : [...nextProps.assessmentDetails],
                inputOptions : nextProps.inputOptions,
                init:true
            }
        return null
    }

    onChange = (name,value,scoreCall,index) => {
        // console.log("on assessment field change", name, value,scoreCall,index)
        let { assessmentDetails } = this.state
        const { AssessmentRow } = this.props
        assessmentDetails[index]={
            ...assessmentDetails[index],
            [name] : value,
            ...(
                name === 'isSupportive' 
                    ? ({ documents : [] }) 
                    : ''
            )
        }
        this.setState(
            {assessmentDetails},
            () => {
                if(scoreCall && !AssessmentRow[index].initialKeyName)
                this.handleCallBack(scoreCall,index)
            }
        )
    }

    onUpload = async (name, files,index) => {
        let { cancelToken, assessmentDetails, uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(`documents-${index}`)
            this.setState({ uploadingIndexes })
            let newUploadArray = []
            let formData = new FormData()
            for (var i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }
            this.setState({
                loading: true
            })
            let requestPayload = {
                ...UPLOAD_DOC_API,
                data: formData,
                cancelToken: cancelToken.token
            };
            let response = await API(requestPayload);
            if (response.status >= 200 && response.status < 300) {

                for (var i = 0; i < files.length; i++) {
                    newUploadArray.push({
                        ...this.defaultUploadObject,
                        docUrl: response.data.data[i]['url'],
                        docName: response.data.data[i]['originalname'],
                        docType: 1
                    })
                }
                assessmentDetails[index]={
                    ...assessmentDetails[index],
                    [name] : newUploadArray
                }
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== `documents-${index}`)
                console.log(assessmentDetails,index,newUploadArray,"detailasd")
            }else{
                uploadingIndexes.pop(name)
                toast(response.data.message, "error");
            }
            this.setState({ loading: false, assessmentDetails, uploadingIndexes })
        } else {
            assessmentDetails[index][name] = []
            this.setState({ assessmentDetails })
        }
    }

    handleCallBack = (scoreCall,index) => {
        let { assessmentDetails } = this.state
        let { type,rangeValidation,scoreType } = scoreCall
        if(type === 'range'){
            let newAssessmentDetails = {...assessmentDetails[index]}
            let assessmentScore = rangeValidation.filter(({range}) => 
                parseInt(newAssessmentDetails.assessmentValue) >= range.min && 
                (parseInt(newAssessmentDetails.assessmentValue) < range.max || !range.max)
            )
            if(assessmentScore)
                assessmentScore=assessmentScore[assessmentScore.length - 1]
            assessmentDetails[index]={
                ...assessmentDetails[index],
                assessmentScore : assessmentScore ? assessmentScore.score : 0
            }
            this.setState({assessmentDetails})
        }
        if(type === 'select'){
            let value = parseInt(assessmentDetails[index].assessmentValue)
            let scoreCalculated = scoreType.filter(data => data.value == value)
            if(scoreCalculated)
            scoreCalculated=scoreCalculated[scoreCalculated.length - 1]
            assessmentDetails[index]={
                ...assessmentDetails[index],
                assessmentScore : scoreCalculated ? scoreCalculated.score : 0
            }
            this.setState({assessmentDetails})
        }
    }

    validateField = (rowData) => {
        let isValid = (
            rowData.assessmentValue !== null &&
            (
                (rowData.isSupportive && rowData.documents.length) || 
                (!rowData.isSupportive && rowData.reason)
            )
        )
        return isValid ? true : false
    }

    calcFieldCompleted = () => {
        const { assessmentDetails } = this.state
        let fields=assessmentDetails.filter(this.validateField).length
        return `${fields} / ${assessmentDetails.length}` 
    }

    // getAssessmentTotalScore = () => {
    //     const { assessmentDetails } = this.state
    //     let maxScore = this.getAssementMaxScore()
    //     let totalScore = assessmentDetails.reduce((initalvalue,data) => parseInt(data.assessmentScore ? data.assessmentScore : 0)+initalvalue,0)
    //     return totalScore
    // }

    getAssessmentTotalScorePercent = () => {
        const { assessmentDetails } = this.state
        let maxScore = this.getAssementMaxScore()
        let totalScore = assessmentDetails.reduce((initalvalue,data) => parseInt(data.assessmentScore ? data.assessmentScore : 0)+initalvalue,0)
        return parseInt((totalScore/maxScore) * 100)
    }

    
    // getAssementMaxScore = () => {
    //     const { AssessmentRow } = this.props
    //     let MaxScore = AssessmentRow.reduce((initalvalue,data) => data.scoreField.max+initalvalue,0)
    //     return MaxScore
    // }

    calcAssessmentCompleted = () => {
        let maxScore = this.getAssementMaxScore()
        let totalScore = this.getAssessmentTotalScore()
        return `${totalScore} / ${maxScore}` 
    }

    onSubmit=(e) => {
        e.preventDefault()
        const { assessmentDetails } = this.state
        let isValid = assessmentDetails.every(this.validateField)
        if(!isValid)
            toast('Please enter the details','error')
        else this.props.onSubmit(assessmentDetails)
    }

    render() {
        const { inputOptions,assessmentDetails,uploadingIndexes } = this.state
        const { AssessmentRow,role } = this.props;
        let applicationType = this.props.match?.params?.type;
        let disableAssessment = (role == STAFF_ROLE_ID.DMMU) && ((applicationType == "pg") || (applicationType == "eg")) ? true : false ;
        return (
            < >
                <form className="assesment-main" onSubmit={this.onSubmit}>
                    <header className="header">
                        <div className="container-fluid bg-white p-3 text-center header-nav">
                            <Row>
                                <Col><h1 className="fw-600">Application Assessment</h1></Col>
                            </Row>
                        </div>
                        <div className="container header-score">
                            <Row className="border-bottom bg-white p-3">
                                <Col className="d-flex align-items-center m-0">
                                    <h5 className="fw-700 m-0">APP ID : {this.props.match.params.formId}</h5>
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <a className="mb-0">All Updates Saved
                                    <span class="custom-caret assesment ml-2">  <i class="icon-tick"></i></span></a>  </div>
                                </Col>
                            </Row>
                            <Row className="bg-white p-4 border-bottom">
                                <Col lg="6" md="6" sm="12" >
                                    <Row>
                                        <Col xl="2" lg="2" md="2" sm="2" xs="2" className="p-0">
                                            <CircularProgressbarWithChildren value={this.getAssessmentTotalScorePercent()}>
                                                <div className="progress-status">
                                                    <strong>{this.getAssessmentTotalScorePercent()}</strong>
                                                    <p>Scores</p>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        </Col>
                                        <Col className="status-list">
                                            <ul className="p-0 m-0 details">
                                                <li>
                                                    <a className="darkGrey-1">Assessment Score </a>
                                                    <span>
                                                        {this.calcAssessmentCompleted()}
                                                    </span></li>
                                                <li>
                                                    <a className=" darkGrey-1">
                                                        Fields Completed
                                                    </a>
                                                    <span>
                                                        {this.calcFieldCompleted()}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6" md="6" sm="12">
                                    <Row className="mt-5 justify-content-end">
                                        <Col xl="5">
                                            <Button
                                                outline
                                                block
                                                color="primary"
                                                type="button"
                                                onClick={() => this.props.history.goBack()}
                                                className="fw-600"
                                            >
                                                Exit
                                            </Button>
                                        </Col>
                                        <Col xl="5">
                                            <Button
                                                block
                                                color="primary"
                                                className="fw-600"
                                                type="submit"
                                                disabled = {disableAssessment}
                                            >
                                                Submit
                                        </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </header>
                    <div className="container mt-3 bg-white">
                        <div className="m-3">
                            <Row className="p-3">
                                <Col lg="4" >
                                    <a className="ml-3">Assessment</a>
                                </Col>
                                <Col lg="2">
                                    <a>Score</a>
                                </Col>
                                <Col xl="6">
                                    <a>Supportive Document</a>
                                </Col>
                            </Row>
                            {
                                AssessmentRow.map((data,key) => 
                                    <InputRow 
                                        key={key} 
                                        index={key}
                                        data={data}
                                        options={inputOptions}
                                        rowData={assessmentDetails[key]} 
                                        onChange={(...params)=> this.onChange(...params,key)}
                                        onUpload={(...params)=> this.onUpload(...params,key)}
                                        uploadingIndexes={uploadingIndexes}
                                    />
                                )
                            }
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

// export default AssessmentView;

const mapStateToProps = (state) => {
    return state.profile;
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(StaffActions, dispatch);
// };

export default connect(mapStateToProps, null)(AssessmentView);