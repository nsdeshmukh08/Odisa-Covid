import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY, IS_TRUE, IE_FORM_MASTER_STATUS } from 'helpers/variables'
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { calcAgeInYear } from 'helpers/momentHelpers'
const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

// export const IE_FORM_MASTER_STATUS = {
        //     DRAFT: 1,
        //     OPEN_APPLICATION: 2,
        //     PENDING: 3,
        //     AMOUNT_DISBURSMENT: 4,
        //     SUBMIT_UC: 5,
        //     APPROVED: 6,
        //     DECLINED: 7
        // };

let tabs = [
    {
        label: 'Approve',
        value: IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT
    },
    {
        label: 'Recommended & Pending',
        value: IE_FORM_MASTER_STATUS.PENDING
    },
    {
        label: 'Decline',
        value: IE_FORM_MASTER_STATUS.DECLINED
    }
]

class BasicApproval extends Component {

    initialState = {
        isActivityEsmf: false,
        activityCategory: ACTIVITY_CATEGORY[2].value,
        // isReverseMigrated: false,
        // dateOfBirth: null,
        age: null,
        GPLFAssessmentDate: null,
        approvedLoanAmount: null,
        GPLFCommitteeMom: [],
        remarks: null,
        uploadingIndexes: [],
        errors: {}
    }

    state = {
        ...this.initialState,
        applicationStatus: IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
        cancelToken: axios.CancelToken.source()
    }

    reset = () => {
        this.setState(
            Object.assign(
                {},
                this.initialState,
                { uploadingIndexes: [] }
            )
        )
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps?.applicationDetail?.basicDetails?.dateOfBirth !== prevState.dateOfBirth)
            return {
                dateOfBirth: nextProps?.applicationDetail?.basicDetails?.dateOfBirth
            }

        return null
    }
    onChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        }, () => this.handleCallBack(name, value))
    }

    onTabChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        }, this.reset)
    }

    getFilteredCategoryStatus = () => {
        const { isActivityEsmf } = this.state
        if(isActivityEsmf){
            return ACTIVITY_CATEGORY.map(data => ({ ...data, disabled: (isActivityEsmf && data.value !== 1) }))
        } else return ACTIVITY_CATEGORY.map(data => ({ ...data, disabled: data.value == 1 }))
    }

    onUpload = async (name, files) => {
        let { cancelToken, errors, uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(name)
            this.setState({ uploadingIndexes })
            errors[name] = undefined
            let newUploadArray = []
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
            if (response.status === 200) {
                for (var i = 0; i < files.length; i++) {
                    newUploadArray.push({
                        ...this.defaultUploadObject,
                        docUrl: response.data.data[i]['url'],
                        docName: response.data.data[i]['originalname'],
                        docType: 1
                    })
                }
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== name)
            }else{
                uploadingIndexes.pop(name)
                toast(response.data.message, "error");
            }
            this.setState({
                [name]: [...newUploadArray],
                uploadingIndexes
            })
        } else {
            this.setState({ [name]: [], errors, uploadingIndexes })
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

    getBtnColorBasedonTab = () => {
        const { applicationStatus } = this.state
        let color = "primary"
        if (applicationStatus === IE_FORM_MASTER_STATUS.PENDING)
            color = "yellow"
        if (applicationStatus === IE_FORM_MASTER_STATUS.DECLINED)
            color = "orange"
        return color
    }

    onSubmit = () => {

        const { isActivityEsmf,
            activityCategory,
            // isReverseMigrated,
            // dateOfBirth,
            GPLFAssessmentDate,
            GPLFCommitteeMom,
            applicationStatus,
            approvedLoanAmount,
            remarks, cancelToken 
        } = this.state
            // if(!this.props.isAssessmentCalculated){
                let data = {
                    isActivityEsmf,
                    activityCategory,
                    // isReverseMigrated,
                    // dateOfBirth,
                    GPLFAssessmentDate,
                    GPLFCommitteeMom,
                    applicationStatus,
                    approvedLoanAmount,
                    remarks,
                }
        
                // data.age = calcAgeInYear(data.dateOfBirth, true)
        
                let validation = {
                    ...inputValidations
                }
        
                if (applicationStatus === IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT)
                    validation['remarks'] = undefined
                if (applicationStatus === IE_FORM_MASTER_STATUS.DECLINED)
                    validation['approvedLoanAmount'] = undefined
        
                const notValid = validate(data, validation);
        
                if (notValid){
                    // console.log(notValid)
                    this.setState({ errors: notValid })
                }else{
                    // this.props.onApprove(data)
                    console.log("approved")
                }
            // }else{
            //     toast('Assessment score need to be calculated proceeding forward with approval','error')
            // }

    }

    render() {
        const {
            isActivityEsmf,
            activityCategory,
            // isReverseMigrated,
            // dateOfBirth,
            GPLFAssessmentDate,
            GPLFCommitteeMom,
            applicationStatus,
            remarks,
            errors,
            approvedLoanAmount,
            uploadingIndexes
        } = this.state

        const { status } = this.props

        tabs = IE_FORM_MASTER_STATUS.PENDING === status 
            ? tabs.filter(data => data.value !== IE_FORM_MASTER_STATUS.PENDING)
            : tabs
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
                                            onClick={() => this.onTabChange('applicationStatus', data.value)}
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
                            {/* <div>
                                <FormInput
                                    type="radio"
                                    label="Evidence of reverse migration"
                                    name="isReverseMigrated"
                                    options={IS_TRUE}
                                    onChange={this.onChange}
                                    value={isReverseMigrated}
                                />
                            </div> */}
                            {/* <div>
                                <Col className="p-0">
                                    <FormGroup className="d-flex">
                                        <DatePicker
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            onChange={this.onChange}
                                            value={dateOfBirth}
                                            error={errors['dateOfBirth']}
                                            showAge={true}
                                        />
                                    </FormGroup>

                                </Col>
                            </div> */}
                            <div className="d-flex">
                                <Col xl="6" md="6" sm="6">
                                    <FormGroup className="d-flex">
                                        <DatePicker
                                            label="GPLF Assessment Date"
                                            name="GPLFAssessmentDate"
                                            onChange={this.onChange}
                                            value={GPLFAssessmentDate}
                                            error={errors['GPLFAssessmentDate']}
                                        />
                                    </FormGroup>
                                </Col>
                                {
                                applicationStatus !== IE_FORM_MASTER_STATUS.DECLINED 
                                ? <Col xl="6" md="6" sm="6" >
                                        <FormInput
                                        type="number"
                                            label="Approved Loan Amount"
                                            name="approvedLoanAmount"
                                            onChange={this.onChange}
                                            value={approvedLoanAmount}
                                            error={errors['approvedLoanAmount']}
                                            max = { 6 }
                                        />
                                </Col>:""}
                            </div>
                            <div className="document-choose">
                                <h2 className="mb-3">Required Documents</h2>
                                <Uploadfile
                                    label="GPLF Committee Meeting Minutes"
                                    name="GPLFCommitteeMom"
                                    id="GPLFCommitteeMom"
                                    onChange={this.onUpload}
                                    uploadedFileName={GPLFCommitteeMom.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('GPLFCommitteeMom')}
                                    error={errors['GPLFCommitteeMom']}
                                />
                            </div>
                            {
                                applicationStatus !== IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT 
                                ? <Row className="score-textarea">
                                    <Col>
                                        <FormInput
                                            type="textarea"
                                            label="Remark"
                                            className="document-type"
                                            placeholder= { applicationStatus === IE_FORM_MASTER_STATUS.PENDING ?"Type Reason for Pending": "Type Reason for Decline"}
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
                                    <p className="m-0">Complete all above data before{applicationStatus === IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT? " Approve" : applicationStatus === IE_FORM_MASTER_STATUS.PENDING?" Submit": " Decline"}</p>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        color={this.getBtnColorBasedonTab()}
                                        className="fw-60 br-1 px-5 ml-auto"
                                        onClick={this.onSubmit}
                                        disabled={this.props.isFetching || (activityCategory === 1 && applicationStatus != 7 ) || (isActivityEsmf === false && activityCategory == '')}
                                    >
                                        {
                                            applicationStatus === IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT
                                                ? 'Approve'
                                                : applicationStatus === IE_FORM_MASTER_STATUS.PENDING
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
    approvedLoanAmount : {
        presence: {
            allowEmpty: false,
            message: "^Approved Loan Amount"
        },
        numericality: {
            onlyInteger: true,
            lessThanOrEqualTo: 150000,
        }
    },
    isActivityEsmf: {
        presence: {
            allowEmpty: false,
            message: "^Is Negative Activity is mandatory"
        }
    },
    activityCategory: {
        presence: {
            allowEmpty: false,
            message: "^Activity category is mandatory"
        }
    },
    // isReverseMigrated: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Is reversed migration is mandatory"
    //     }
    // },
    // dateOfBirth: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Date of birth is mandatory"
    //     }
    // },
    // age: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Age is mandatory"
    //     }
    // },
    GPLFAssessmentDate: {
        presence: {
            allowEmpty: false,
            message: "^Assessment Date is mandatory"
        }
    },
    GPLFCommitteeMom: {
        presence: {
            allowEmpty: false,
            message: "^Document is mandatory"
        }
    },
    remarks: {
        presence: {
            allowEmpty: false,
            message: "^Remarks is required"
        }
    }
}
