import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { axios,API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { PC_FORM_MASTER_STATUS } from 'helpers/variables'

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

let tabs = [
    {
        label : 'Approve',
        value : 4
    },
    {
        label : 'Recommended & Pending',
        value : 3
    },
    {
        label : 'Decline',
        value : 8
    }
]

class BasicApproval extends Component {

    initialState = {
        isActivityEsmf: false,
        activityCategory: ACTIVITY_CATEGORY[2].value,
        dmpuVerifyDate: null,
        isSmpuVerified: true,
        smpuApprovalLetter: [],
        decMom: [],
        signedAssesment: [],
        uploadingIndexes : [],
        errors : {},
        remarks : null
    }

    state = {
        ...this.initialState,
        applicationStatus: 4,
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
        console.log(isActivityEsmf, ACTIVITY_CATEGORY)
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

    // handleCallBack = (name,value) => {
    //     if(name === 'isActivityEsmf' && value)
    //         this.setState({
    //             activityCategory : 1
    //         })
    // }

    handleCallBack = (name, value) => {
        let {isActivityEsmf} = this.state
        console.log(name, value)
        if (name === 'isActivityEsmf'){
            let activityCategory = value ? 1 : 2
            this.setState({
                activityCategory
            })
        }
    }

    getBtnColorBasedonTab = () => {
        const { applicationStatus } = this.state
        let color="primary"
        if(applicationStatus === PC_FORM_MASTER_STATUS.PENDING)
            color="yellow"
        if(applicationStatus === PC_FORM_MASTER_STATUS.DECLINED)
            color="orange"
        return color
    }

    onSubmit = () => {

        if(!this.props.isAssessmentCalculated){
            const { isActivityEsmf,
                activityCategory,
                dmpuVerifyDate,
                isSmpuVerified,
                smpuApprovalLetter,
                decMom,
                signedAssesment,
                applicationStatus,
                remarks,cancelToken } = this.state
    
            let data = {
                isActivityEsmf,
                activityCategory,
                dmpuVerifyDate,
                isSmpuVerified,
                smpuApprovalLetter,
                decMom,
                signedAssesment,
                applicationStatus,
                remarks
            }
    
            let validation = {
                ...inputValidations
            }
            if(applicationStatus === 4)
                validation['remarks'] = undefined
            if(applicationStatus === 6)
                validation['smpuApprovalLetter'] = undefined
            const notValid = validate(data, validation);
            if(notValid)
                this.setState({errors : notValid})
            else{
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
            dmpuVerifyDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decMom,
            signedAssesment,
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
                                <Col xl="6" className="p-0">
                                    <FormGroup>
                                        <DatePicker
                                            label="DMMU Verification Date"
                                            name="dmpuVerifyDate"
                                            onChange={this.onChange}
                                            value={dmpuVerifyDate}
                                            error={errors['dmpuVerifyDate']}
                                        />
                                    </FormGroup>
                                </Col>
                            </div>
                            <div>
                                <FormInput
                                    type="radio"
                                    label="SMMU Verified"
                                    options={IS_TRUE}
                                    name="isSmpuVerified"
                                    onChange={this.onChange}
                                    value={isSmpuVerified}
                                />
                            </div>
                            <div className="document-choose">
                                <h2 className="mb-3">Required Documents</h2>
                                <Uploadfile
                                    label="SMMU Approval letter"
                                    name="smpuApprovalLetter"
                                    id="smpuApprovalLetter"
                                    isOptional={applicationStatus === 6}
                                    onChange={this.onUpload}
                                    uploadedFileName={smpuApprovalLetter.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('smpuApprovalLetter')}
                                    error={errors['smpuApprovalLetter']}
                                />
                                <Uploadfile
                                    label="District Executive Committee Meeting Minutes"
                                    name="decMom"
                                    id="decMom"
                                    onChange={this.onUpload}
                                    uploadedFileName={decMom.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('decMom')}
                                    error={errors['decMom']}
                                />
                                <Uploadfile
                                    label="Signed Assessment Form"
                                    name="signedAssesment"
                                    id="signedAssesment"
                                    uploadedFileName={signedAssesment.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('signedAssesment')}
                                    onChange={this.onUpload}
                                    error={errors['signedAssesment']}
                                />
                            </div>
                            {
                                applicationStatus !== 4 ? 
                                <Row className="score-textarea">
                                    <Col>
                                        <FormInput
                                            type="textarea"
                                            label="Remark"
                                            className="document-type"
                                            placeholder={`Type Reason for ${ applicationStatus === 3 
                                                    ? "Pending" 
                                                    : "Decline"}`}
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
                                    <p className="m-0">Complete all above data before {applicationStatus == 4 ? " Approve":applicationStatus == 3 ? " Submit": " Decline" }</p>
                                </Col>
                                <Col md="auto" className="p-0">
                                    <Button 
                                        color={this.getBtnColorBasedonTab()} 
                                        className="fw-60 br-1 px-5 ml-auto"
                                        onClick={this.onSubmit}
                                        // disabled={this.props.isFetching || activityCategory === 1 }
                                        disabled={ !isSmpuVerified || this.props.isFetching || (activityCategory === 1 && applicationStatus != 8 ) || (isActivityEsmf === false && activityCategory == '')}
                                    >
                                        {
                                            applicationStatus === 4  
                                                ? 'Approve' 
                                                :  applicationStatus === 3 
                                                    ? "Recommend & Pending" 
                                                    : "Decline & Close"
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
    "decMom": {
        presence: {
            allowEmpty: false,
            message: "^Document is mandatory"
        }
    },
    "smpuApprovalLetter": {
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
    "dmpuVerifyDate" : {
        presence: {
            allowEmpty: false,
            message: "^Document is mandatory"
        }
    },
    remarks : {
        presence: {
            allowEmpty: false,
            message: "^Remarks is required"
        }
    }
}
