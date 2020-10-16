import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import download from 'assets/images/download.svg';
import app from 'assets/images/app.svg';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { axios,API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { connect } from 'react-redux';
import { formatDate, getFutureDate } from 'helpers/momentHelpers'
import { populateData } from 'helpers'



const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;
const openInNewTab = (object, pathname) => {
    let upload = populateData(
        object,
        pathname,
        []
    )
    if (upload.length)
        window.open(upload[0].docUrl)
}

let tabs = [
    {
        label : 'Approve',
        value : 4
    },
    {
        label : 'Recommended & Pending',
        value : 7
    },
    {
        label : 'Decline',
        value : 8
    }
]

class BasicApprovalForm extends Component {

    initialState = {
        // isActivityEsmf: false,
        // activityCategory: ACTIVITY_CATEGORY[2].value,
        decMeetingDate: null,
        isSmpuVerified: true,
        smpuApprovalLetter: [],
        decmm: [],
        // signedAssesment: [],
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
        })
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
    //     // if(name === 'isActivityEsmf' && value)
    //     //     this.setState({
    //     //         activityCategory : 1
    //     //     })
    // }

    getBtnColorBasedonTab = () => {
        const { applicationStatus } = this.state
        let color="primary"
        if(applicationStatus === 7)
            color="yellow"
        if(applicationStatus === 8)
            color="orange"
        return color
    }

    onSubmit = () => {

        const { 
            // isActivityEsmf,
            // activityCategory,
            decMeetingDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decmm,
            // signedAssesment,
            applicationStatus,
            remarks,cancelToken } = this.state

        let data = {
            // isActivityEsmf,
            // activityCategory,
            decMeetingDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decmm,
            // signedAssesment,
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
            // console.log("approved")
            this.props.onApprove(data)
        }
    }

    render() {
        const {
            // isActivityEsmf,
            // activityCategory,
            decMeetingDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decmm,
            // signedAssesment,
            applicationStatus,
            uploadingIndexes,
            remarks,
            errors
        } = this.state;
        let { pgBmpuApplicationStatus } = this.props;
        let { recommendedDate } = pgBmpuApplicationStatus;

        return (
            <form>
                <Row>
                    <Col className="px-4">
                        <div className="px-3 workflow">
                        
                            <div className="tracker-two">
                                <h2>
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>BMMU Submitted Details </span>
                                </h2>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <li>
                                            <p>
                                                <span>Is Activity in Negative Category-ESMF</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            pgBmpuApplicationStatus,
                                                            'isActivityEsmf',
                                                            false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>ESMF activity Category</span>
                                                <a>
                                                    {
                                                        ACTIVITY_CATEGORY.find(
                                                            data => data.value === populateData(
                                                                pgBmpuApplicationStatus,
                                                                'activityCategory',
                                                                {}
                                                            ),
                                                            
                                                        )?.label
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Approved Amount</span>
                                                <a><span>Rs </span> 
                                                    {
                                                        populateData(
                                                            pgBmpuApplicationStatus,
                                                            'approvedAmount'
                                                        )
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                       
                                        <h2 className="mb-3 mt-3">Documents</h2>
                                        <li>
                                            <p
                                                className="cursor-pointer"
                                                onClick={
                                                    () => openInNewTab(pgBmpuApplicationStatus, 'signedAssesment')
                                                }
                                            >
                                                <img src={app} className="mr-2" />
                                                <a>Signed Assessment Form</a>
                                                <img src={download} width="18px" className="ml-2"></img>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="cursor-pointer"
                                                onClick={
                                                    () => openInNewTab(pgBmpuApplicationStatus, 'blockLevelForm')
                                                }>
                                                <img src={app} className="mr-2" />
                                                <a>Block Level Executive Com</a>
                                                <img src={download} width="18px" className="ml-2" />
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
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
                            <div>
                                <Col xl="6" className="p-0">
                                    <p>DMMU Received Date <strong className="pl-2"> {formatDate(recommendedDate)} </strong></p>
                                </Col>
                            </div>
                            <div>
                                <Col xl="6" className="p-0">
                                    <FormGroup>
                                        <DatePicker
                                            label="District Executive Committee Meeting Date"
                                            name="decMeetingDate"
                                            onChange={this.onChange}
                                            value={decMeetingDate}
                                            error={errors['decMeetingDate']}
                                            isValidDate = {( currentDate ) => {
                                                return getFutureDate(currentDate,recommendedDate)
                                            }}
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
                                    name="decmm"
                                    id="decmm"
                                    onChange={this.onUpload}
                                    uploadedFileName={decmm.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('decmm')}
                                    error={errors['decmm']}
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
                                            placeholder={applicationStatus === 7 ? "Type Reason for Recommend / Pending" : "Type Reason for Decline"}
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
                                    <p className="m-0">Complete all above data before {applicationStatus === 4 ? " Approve": applicationStatus === 7 ? " Submit" : " Decline"}</p>
                                </Col>
                                <Col md="auto">
                                    <Button 
                                        color={this.getBtnColorBasedonTab()} 
                                        className="fw-60 br-1 px-5 ml-auto"
                                        onClick={this.onSubmit}
                                        disabled={this.props.isFetching || !isSmpuVerified}
                                        // disabled={this.props.isFetching }
                                    >
                                        {
                                            applicationStatus === 4 
                                                ? 'Approve' 
                                                :  applicationStatus === 7 
                                                    ? "Recommend & Pending" 
                                                    : "Decline"
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
const mapStateToProps = (state) =>{
    // return {...state.staff.applications.selectedApplicationStatus, ...state}
    return state.staff.applications.selectedApplicationStatus
}
const BasicApproval = connect(mapStateToProps,null)(BasicApprovalForm);
export default BasicApproval

let inputValidations = {
    "decmm": {
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
    "decMeetingDate" : {
        presence: {
            allowEmpty: false,
            message: "^Date is mandatory"
        }
    },
    remarks : {
        presence: {
            allowEmpty: false,
            message: "^Remarks is required"
        }
    }
}
