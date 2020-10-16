import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY,PG_FORM_MASTER_STATUS, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { axios,API, API_BOOK } from "service";
import toast from "helpers/Toast";

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

let tabs = [
    {
        label: 'Recommend',
        value: PG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION
    },
    {
        label: 'Reject',
        value: PG_FORM_MASTER_STATUS.DECLINED
    }
]

class BasicApproval extends Component {

    initialState = {
        isActivityEsmf: false,
        activityCategory: ACTIVITY_CATEGORY[2].value,
        approvedAmount: null,
        signedAssesment: [],
        blockLevelForm: [],
        uploadingIndexes : [],
        errors : {},
        remarks : null
    }

    state = {
        ...this.initialState,
        applicationStatus: 3,
        cancelToken: axios.CancelToken.source()
    }

    reset = () => {
        this.setState(
            Object.assign(
                {},
                this.initialState,
                { uploadingIndexes:[] }
            )
        )
    }

    onChange = (name, value) => {
        let { errors } = this.state
        errors[name]=undefined
        this.setState({
            [name]: value,
            errors
        },() => this.handleCallBack(name,value))
    }

    onTabChange = (name, value) => {
        let { errors } = this.state
        errors[name]=undefined
        this.setState({
            [name]: value,
            errors
        },this.reset)
    }

    // getFilteredCategoryStatus = () => {
    //     const { isActivityEsmf } = this.state
    //     return ACTIVITY_CATEGORY.map(data => ({...data,disabled:(isActivityEsmf && data.value !== 1)}))
    // }
    getFilteredCategoryStatus = () => {
        const { isActivityEsmf } = this.state
        // console.log(isActivityEsmf, ACTIVITY_CATEGORY)
        if(isActivityEsmf){
            return ACTIVITY_CATEGORY.map(data => ({ ...data, disabled: (isActivityEsmf && data.value !== 1) }))
        } else return ACTIVITY_CATEGORY.map(data => ({ ...data, disabled: data.value == 1 }))
    }

    onUpload = async (name, files) => {
        let { cancelToken,errors,uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(name)
            this.setState({uploadingIndexes})
            errors[name] = undefined
            let newUploadArray=[]
            let formData = new FormData()
            for (var i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }
            let requestPayload = {
                ...UPLOAD_DOC_API,
                data: formData,
                cancelToken: cancelToken.token
            }
            let response = await API(requestPayload);
            if (response.status === 200){
                for (var i = 0; i < files.length; i++) {
                    newUploadArray.push({
                        ...this.defaultUploadObject, 
                        docUrl : response.data.data[i]['url'],
                        docName : response.data.data[i]['originalname'],
                        docType : 1
                    })
                }
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== name)
            }else{
                uploadingIndexes.pop(name)
                toast(response.data.message, "error");
            }
            this.setState({
                [name] : [...newUploadArray],
                uploadingIndexes
            })
        }else{
            this.setState({ [name] : [],errors,uploadingIndexes })
        }
    }

    handleCallBack = (name, value) => {
        let {isActivityEsmf} = this.state
        // console.log(name, value)
        if (name === 'isActivityEsmf'){
            this.setState({
                activityCategory: value ? 1 : 2
            })
        }
    }

    // handleCallBack = (name,value) => {
    //     if(name === 'isActivityEsmf' && value)
    //         this.setState({
    //             activityCategory : 1
    //         })
    // }

    getBtnColorBasedonTab = () => {
        const { applicationStatus } = this.state
        let color="primary"
        if(applicationStatus === 3)
            color="yellow"
        if(applicationStatus === 8)
            color="orange"
        return color
    }

    onSubmit = () => {

        const { isActivityEsmf,
            activityCategory,
            // dmpuVerifyDate,
            approvedAmount,
            // isSmpuVerified,
            signedAssesment,
            blockLevelForm,
            applicationStatus,
            remarks,cancelToken } = this.state
            // console.log(this.props.isAssessmentCalculated,"asdasd")
            if(!this.props.isAssessmentCalculated){
                let data = {
                    isActivityEsmf,
                    activityCategory,
                    // dmpuVerifyDate,
                    approvedAmount,
                    // isSmpuVerified,
                    blockLevelForm,
                    signedAssesment,
                    applicationStatus,
                    remarks
                }
        
                let validation = {
                    ...inputValidations
                }
                if(applicationStatus === 3)
                    validation['remarks'] = undefined
                if(applicationStatus === 8)
                    validation['approvedAmount'] = undefined
                const notValid = validate(data, validation);
                if(notValid){
                    this.setState({errors : notValid})
                }else{
                    this.props.onApprove(data)
                }
            }else{
                toast('Assessment score need to be calculated proceeding forward with approval','error')
            }
    }

    render() {
        const {
            isActivityEsmf,
            activityCategory,
            approvedAmount,
            // dmpuVerifyDate,
            // isSmpuVerified,
            signedAssesment,
            blockLevelForm,
            applicationStatus,
            uploadingIndexes,
            remarks,
            errors
        } = this.state

        return (
            <form>
                <Row className="approve-tab">
                    <Col className="score-tabs">
                        <Nav tabs className="custom-tab-theme-1">
                            {
                                tabs.map(data => (
                                    <NavItem>
                                        <NavLink
                                        className={`${data.value === applicationStatus ? "active" : ""}`}
                                        onClick={() => this.onTabChange('applicationStatus',data.value)}
                                        >
                                                {data.label}
                                        </NavLink>
                                    </NavItem>
                                ))
                            }
                        </Nav>
                        <div className="assesment-tab">
                            <FormInput
                                type="radio"
                                label="Is Activity in Negative Category-ESMF"
                                options={IS_TRUE}
                                name="isActivityEsmf"
                                onChange={this.onChange}
                                value={isActivityEsmf}
                            />
                            <div>
                                <FormInput
                                    type="radio"
                                    label="ESMF activity Category"
                                    name="activityCategory"
                                    options={this.getFilteredCategoryStatus()}
                                    onChange={this.onChange}
                                    value={activityCategory}
                                />
                            </div>
                            <div>
                                {
                                    applicationStatus === 3 ? 
                                    <Col xl="5" md="5" lg="5" className="p-0">
                                        <FormGroup>
                                            <FormInput
                                                type="number"
                                                label="Approved Amount"
                                                name="approvedAmount"
                                                onChange={this.onChange}
                                                value={approvedAmount}
                                                error={errors["approvedAmount"]}
                                                max = {6}
                                                // maxLength="10"
                                            />
                                        </FormGroup>
                                    </Col>:""
                                }
                               
                            </div>
                            <div className="document-choose">
                                <h2 className="mb-3">Required Documents</h2>
                                <Uploadfile
                                    label="Signed Assessment Form"
                                    name="signedAssesment"
                                    id="signedAssesment"
                                    isOptional={applicationStatus === 6}
                                    onChange={this.onUpload}
                                    uploadedFileName={signedAssesment.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('signedAssesment')}
                                    error={errors['signedAssesment']}
                                />
                                <Uploadfile
                                    label="Block Level Executive Committee Meeting Minutes"
                                    name="blockLevelForm"
                                    id="blockLevelForm"
                                    onChange={this.onUpload}
                                    uploadedFileName={blockLevelForm.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('blockLevelForm')}
                                    error={errors['blockLevelForm']}
                                />
                            </div>
                            {
                                applicationStatus === 8 ? 
                                <Row className="score-textarea">
                                    <Col>
                                        <FormInput
                                            type="textarea"
                                            label="Remark"
                                            className="document-type"
                                            placeholder="Type Reason for Rejection"
                                            value={remarks}
                                            name="remarks"
                                            onChange={this.onChange}
                                            error={errors['remarks']}
                                        />
                                    </Col>
                                </Row> : ''
                            }
                            
                            <Row className="p-3 mb-3 d-flex align-items-center">
                                <Col className="p-0">
                                    <p className="m-0">Complete all above data before {applicationStatus === 8 ? " Reject":" Submit"} </p>
                                </Col>
                                <Col md="auto">
                                    <Button 
                                        color={this.getBtnColorBasedonTab()} 
                                        className="fw-60 br-1 px-5 ml-auto"
                                        onClick={this.onSubmit}
                                        // disabled={this.props.isFetching || activityCategory === 1}
                                        disabled={this.props.isFetching || (activityCategory === 1 && applicationStatus != 8 ) || (isActivityEsmf === false && activityCategory == '')}
                                    >
                                        {
                                            applicationStatus === 3 
                                                ? "Recommend" 
                                                : "Reject"
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default BasicApproval

let inputValidations = {
    "blockLevelForm": {
        presence: {
            allowEmpty: false,
            message: "^Document is mandatory"
        }
    },
    "signedAssesment": {
        presence: {
            allowEmpty: false,
            message: "^Document is mandatory"
        }
    },
    "approvedAmount": {
        presence: {
            allowEmpty: false,
            message: "^Approved Amount can't be blank"
        },
        numericality: {
            onlyInteger: true,
            lessThanOrEqualTo: 150000,
        }
    },
    "remarks" : {
        presence: {
            allowEmpty: false,
            message: "^Remarks is required"
        }
    }
}
