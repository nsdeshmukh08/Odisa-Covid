import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import download from 'assets/images/download.svg';
import app from 'assets/images/app.svg';
import { ACTIVITY_CATEGORY, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { PC_FORM_MASTER_STATUS } from 'helpers/variables'
import { formatDate, getFutureDate } from 'helpers/momentHelpers'
import { populateData } from 'helpers'

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

let tabs = [
    {
        label: 'Approve',
        value: 4
    },
    {
        label: 'Decline',
        value: 8
    }
]

const openInNewTab = (object, pathname) => {
    let upload = populateData(
        object,
        pathname,
        []
    )
    if (upload.length)
        window.open(upload[0].docUrl)
}

class PendingApproval extends Component {

    initialState = {
        errors: {},
        remarks: null
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
                { uploadingIndexes: [] }
            )
        )
    }

    onChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        })
    }

    onTabChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        }, this.reset)
    }

    getBtnColorBasedonTab = () => {
        const { applicationStatus } = this.state
        let color = "primary"
        if (applicationStatus === PC_FORM_MASTER_STATUS.DECLINED)
            color = "orange"
        return color
    }

    onSubmit = () => {
        const { applicationStatus } = this.state
        const { isActivityEsmf,
            activityCategory,
            dmpuVerifyDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decMom,
            signedAssesment,
            remarks, cancelToken } = this.props.applicationStatusDetail.pcApplicationPending

        let data = {
            isActivityEsmf,
            activityCategory,
            dmpuVerifyDate,
            isSmpuVerified,
            smpuApprovalLetter,
            decMom,
            signedAssesment,
            applicationStatus : this.state.applicationStatus,
            remarks : this.state.remarks
        }

        let validation = {
            ...inputValidations
        }
        if (applicationStatus === 4)
            validation['remarks'] = undefined
        if (applicationStatus === 6)
            validation['smpuApprovalLetter'] = undefined
        const notValid = validate(data, validation);
        if (notValid)
            this.setState({ errors: notValid })
        else {
            this.props.onApprove(data)
        }
    }

    render() {
        const {
            isActivityEsmf,
            activityCategory,
            remarks,
            errors,
            applicationStatus
        } = this.state

        let { pcApplicationPending } = this.props.applicationStatusDetail


        console.log(this.props, "asd123")

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
                    </Col>
                </Row>
                <Row className="assesment-tab mt-3">
                    <Col>
                        <div className="workflow p-0">
                            <div className="tracker-two">
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <li>
                                            <p>
                                                <span>Recommended & Pending by</span>
                                                <a>
                                                    {
                                                        formatDate(
                                                            populateData(
                                                                pcApplicationPending,
                                                                'approvedBy'
                                                            )
                                                        ) 
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Is Activity in Negative Category-ESMF</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            pcApplicationPending,
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
                                                                pcApplicationPending,
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
                                                <span>DMMU Verification Date</span>
                                                <a> 
                                                        {
                                                            formatDate(
                                                                populateData(
                                                                    pcApplicationPending,
                                                                    'dmpuVerifyDate',
                                                                    false
                                                                )
                                                            )
                                                        }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Is SMMU Verified</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            pcApplicationPending,
                                                            'isSmpuVerified',
                                                            false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <h2 className="mb-3 mt-4">Documents</h2>
                                        <li>
                                            <p
                                                className="cursor-pointer"
                                                onClick={
                                                    () => openInNewTab(pcApplicationPending, 'signedAssesment')
                                                }
                                            >
                                                <img src={app} className="mr-2" />
                                                <a>Signed Assessment Form</a>
                                                <img src={download} width="22px" className="ml-2"></img>
                                            </p>
                                        </li>
                                        <li>
                                            <p
                                                className="cursor-pointer"
                                                onClick={
                                                    () => openInNewTab(pcApplicationPending, 'decMom')
                                                }
                                            >
                                                <img src={app} className="mr-2" />
                                                <a>District Executive Committee Meeting Minutes</a>
                                                <img src={download} width="22px" className="ml-2"></img>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="cursor-pointer"
                                                onClick={
                                                    () => openInNewTab(pcApplicationPending, 'smpuApprovalLetter')
                                                }>
                                                <img src={app} className="mr-2" />
                                                <a>SMMU Approval Letter</a>
                                                <img src={download} width="22px" className="ml-2" />
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {
                        applicationStatus !== 4 ?

                            <Col md="12" className="mt-4 approve-tab">
                                <div className="score-textarea">
                                    <FormInput
                                        type="textarea"
                                        label="Remark"
                                        className="document-type"
                                        placeholder={`Type Reason for ${applicationStatus === 3
                                            ? "Pending"
                                            : "Decline"}`}
                                        value={remarks}
                                        name="remarks"
                                        onChange={this.onChange}
                                        error={errors['remarks']}
                                    />
                                </div>

                            </Col> : ''
                    }
                    <Col md="4" className="ml-auto mb-3">
                        <Button
                            color={this.getBtnColorBasedonTab()}
                            className="br-1 py-2 fw-600 w-100"
                            onClick={this.onSubmit}
                            disabled={this.props.isFetching || (activityCategory === 1 && applicationStatus != 8) || (isActivityEsmf === false && activityCategory == '')}
                        >
                            {
                                applicationStatus === 4
                                    ? 'Approve'
                                    : "Decline & Close"
                            }
                        </Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default PendingApproval

let inputValidations = {
    remarks: {
        presence: {
            allowEmpty: false,
            message: "^Remarks is required"
        }
    }
}
