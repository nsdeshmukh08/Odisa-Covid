import React, { Component,Fragment } from 'react'
import { Row, Col } from 'reactstrap';
import moment from "moment";
import download from 'assets/images/download.svg'
import app from 'assets/images/app.svg'
import FormInput from 'component/inputs/FormInput';
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { formatDate,calculateAge } from 'helpers/momentHelpers'
import Loader from 'component/Loader'

class View extends Component {

    state = {
        basicDetails: {},
        egDetails: {},
        egFormMembers: {},
        egFormAmountRecevied: {},
        egFormBankDetails: {},
        egFormProposedActivity: [],
        egFormUploadDocument:[],
        cancelToken: axios.CancelToken.source(),
        isLoading : false
    }

    componentDidMount() {
        this.getApplicationDetail()
    }

    getApplicationDetail = async() => {
        const { cancelToken } = this.state;
        const { params } = this.props.match
        this.setState({
            isLoading : true
        })
        let requestPayload = {
          ...API_BOOK.APPLICATION.GET_EG_FORM_API,
          params: {
            formId : params?.formId
        },
          cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if(response.status === 200)
            this.setState({
                ...response.data.data
            })
        else
            toast(response.data.message,'error')

        this.setState({
            isLoading : false
        })

    }

    render() {
        const {
            basicDetails,
            egDetails,
            egFormMembers,
            egFormAmountRecevied,
            egFormBankDetails,
            egFormProposedActivity,
            egFormUploadDocument,
            formId,
            isLoading,
            status,
            amountDisbursment,
            firstTranche
        } = this.state
        if(isLoading)
            return <Loader className="h-100"/>
        return (
            <>
                <div className="container bg-white mt-3 application-status">
                    <Row>
                        <Col className="p-4 border-right">
                            <h2 className="title-two mb-2 primary">Application Details</h2>
                            <ul className="p-0 m-0 details">
                                <li><a className="darkGrey-1">Application ID</a> <span>{ formId }</span></li>
                                <li><a className=" darkGrey-1">Application Date</a>
                                    <span>{moment().format('DD / MM / YYYY')}</span>
                                </li>
                            </ul>
                        </Col>
                        <Col className="p-4 ml-3">
                            <h2 className="title-two mb-3">Status Tracker</h2>
                            <ul className=" m-0 tracker pl-4">
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Submitted</p>
                                    <a>Application Submitted on : {moment().format('DD / MM / YYYY')}</a>
                                </li>
                                {(status === 2) && <li className="pending">
                                    <span class="custom-caret submit-icon mr-2"></span>
                                    <p>Pending for department verification</p>
                                </li>}
                                {(status === 4 || status === 5) &&
                                <Fragment>
                                {/* <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Approved</p>
                                    <a>Application Approved on : {moment().format('DD / MM / YYYY')}</a>
                                </li> */}
                                <li className="pending">
                                <span class="custom-caret submit-icon mr-2"></span>
                                <p>Loan Amount Disbursed</p></li>
                                </Fragment>}
                                {(status === 6) &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Approved</p>
                                    <a>Application Approved on : {moment().format('DD / MM / YYYY')}</a>
                                </li>
                                <li className="">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Loan Amount Disbursed</p>
                                    <a>Amount Disbursed on : {moment(amountDisbursment?.disbursmentDate).format('DD / MM / YYYY')}</a><br />
                                    <a>Disbursed Amount : {amountDisbursment?.disbursmentAmount}</a><br />
                                    <a>Bank : {egFormBankDetails?.bnkName}</a><br />
                                    <a>Account Number : {egFormBankDetails?.accNumber && `*********** ${egFormBankDetails.accNumber.substr(egFormBankDetails.accNumber + 4)}`}</a><br />
                                </li>
                                </Fragment>}
                            </ul>
                        </Col>
                    </Row>
                </div>

                <div className="container bg-white mt-3 view-main">
                    <Row className="border-bottom p-4" >
                        <Col className="p-0">
                            <h2 className="fw-700 m-0">All Details</h2></Col>
                    </Row>
                    <div className="application-detail">
                        <h3 className="ml-3 pt-4 mb-0"> Basic Details</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>Name</p>
                                <a>{basicDetails?.name}</a>
                            </Col>
                            <Col>
                                <p>Mobile Number</p>
                                <a>{basicDetails?.mobileNumber}</a>
                            </Col>
                            <Col>
                                <p>EG Name</p>
                                <a>{basicDetails?.name}</a>
                            </Col>
                            <Col xl="5">
                                <p>Application Type</p>
                                <a>EG</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Location</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>District</p>
                                <a>{basicDetails?.district?.label}</a>
                            </Col>
                            <Col>
                                <p>Block</p>
                                <a>{basicDetails?.block?.label}</a>
                            </Col>
                            <Col >
                                <p>Panchayath</p>
                                <a>{basicDetails?.panchayat?.label}</a>
                            </Col>
                            <Col >
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Enterprise Group Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col>
                                    <p>Date of Formation</p>
                                    <a>{egDetails?.dateFormation ? formatDate(egDetails?.dateFormation ) : ''}</a>
                                </Col>
                                <Col>
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(egDetails.dateFormation)}</a>
                                </Col>
                                <Col >
                                    <p>Date of Registration</p>
                                    <a>{egDetails?.dateRegistration ? formatDate(egDetails?.dateRegistration ) : ''}</a>
                                </Col>
                                <Col >
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(egDetails.dateRegistration)}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="mb-3">
                                    <p>Registration Under </p>
                                    <a>{egDetails?.registrationUnderData?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Registration Number</p>
                                    <a>{egDetails?.registrationNumber}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Promoting Organization</p>
                                    <a>{egDetails?.promotingOrg?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Promoting Organization</p>
                                    <a>{egDetails?.promotingOrgName}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Relevant Supporting Organization</p>
                                    <a>{egDetails?.relevantSupportOrg}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Formed / Supported by</p>
                                    <a>{egDetails?.formSupportedData?.label}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <p>Supported By </p>
                                    <a>{egDetails?.formSupportedData?.label}</a>
                                </Col>
                                <Col>
                                    <p>Supported By Others</p>
                                    <a>{egDetails?.othersName !== null ? egDetails?.othersName : '-'}</a>
                                </Col>
                                <Col >
                                    <p>Type of Producer Collective</p>
                                    <a>{egDetails?.egTypes?.map(data => data.egTypesData.label).join(', ')}</a>
                                </Col>
                                <Col >
                                    <p>Type of Sector </p>
                                    <a>{egDetails?.egSectorTypes?.map(data => data.egSectorTypesData.label).join(', ')}</a>
                                </Col>
                            </Row>
                            <Row >
                                <Col lg="3">
                                    <p>Type of Commodities </p>
                                    <a>{egDetails?.egCommodityTypes?.map(data => data.egCommodityTypesData.label).join(', ')}</a>
                                </Col>
                                <Col auto>
                                    <p>EG Involved in  Single / multiple  Commodities </p>
                                    <a>{egDetails?.egCommodityTypes?.length > 1 ? "Multiple" : "Single"}</a>
                                </Col>
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> All Members</h3>
                        <Row className="p-3">
                            <Col md="12">
                                <p>Total memebers</p>
                                <a>{egFormMembers?.totalMembers}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Active / Inactive</h3>
                        <Row className="p-3">
                            <Col md="4">
                                <p>No of Male</p>
                                <a>{egFormMembers?.noOfActive}</a>
                            </Col>
                            <Col md="4">
                                <p>No of Female</p>
                                <a>{egFormMembers?.noOfInActive}</a>
                            </Col>
                            <Col md="4">
                                <p> Active / Inactive  Total</p>
                                <a>{egFormMembers?.activeInactiveTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Gender</h3>
                        <Row className="p-3">
                            <Col md="3">
                                <p>No of Male</p>
                                <a>{egFormMembers?.noOfMale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Female</p>
                                <a>{egFormMembers?.noOfFemale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Transgender</p>
                                <a>{egFormMembers?.noOfTransGender}</a>
                            </Col>
                            <Col md="3">
                                <p>Gender Total</p>
                                <a>{egFormMembers?.genderTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Community</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of BC</p>
                                <a>{egFormMembers?.noOfBC}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of ST</p>
                                <a>{egFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of MBC</p>
                                <a>{egFormMembers?.noOfST}</a>
                            </Col>
                            <Col  md="3" className="mb-4">
                                <p>Others</p>
                                <a>{egFormMembers?.noOfCommunityOthers}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>SC</p>
                                <a>{egFormMembers?.noOfSC}</a>
                            </Col>
                            <Col md="3">
                                <p>Community Total</p>
                                <a>{egFormMembers?.communityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Minority</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of Muslims</p>
                                <a>{egFormMembers?.noOfMuslim}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Christian</p>
                                <a>{egFormMembers?.noOfChristians}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Others</p>
                                <a>{egFormMembers?.noOfMinorityOthers}</a>
                            </Col>
                            <Col md="3">
                                <p>Minority Total</p>
                                <a>{egFormMembers?.minorityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Vulnerable</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of Differently abled</p>
                                <a>{egFormMembers?.noOfDiffAbled}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of window</p>
                                <a>{egFormMembers?.noOfWidow}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Destitute Women</p>
                                <a>{egFormMembers?.noOfDesitute}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Deserted Women</p>
                                <a>{egFormMembers?.noOfDeserted}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Transgender</p>
                                <a>{egFormMembers?.noOfVulTransGender}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Elderly</p>
                                <a>{egFormMembers?.noOfEiderly}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>Vulnerable Total</p>
                                <a>{egFormMembers?.vulnerableTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Other Category</h3>
                        <Row className="p-3">
                            <Col>
                                <p>No of SHG Members</p>
                                <a>{egFormMembers?.noOfSHGMembers}</a>
                            </Col>
                            <Col>
                                <p>No of SHG House Holds Members</p>
                                <a>{egFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col>
                                <p>No of Non SHG House Holds Members</p>
                                <a>{egFormMembers?.noOfNonSHGTotal}</a>
                            </Col>
                            <Col>
                                <p>SHG Total</p>
                                <a>{egFormMembers?.shgTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Amount received</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Amount received as a grant so far </p>
                                    <a>Rs : {egFormAmountRecevied?.amtGrant}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Amount received as loan so far</p>
                                    <a>Rs : {egFormAmountRecevied?.amtReceviedLoan}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Any amount received as Loan / Grant in last 6 Months</p>
                                    <a>{egFormAmountRecevied?.isLoanGrant ? "Yes" : "No"}</a>
                                </Col>
                                {egFormAmountRecevied?.isLoanGrant && <>
                                <Col lg="3">
                                    <p>Fund Provider Name</p>
                                    <a>{egFormAmountRecevied?.fundProvider || "NA"}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Amount received</p>
                                    <a>{egFormAmountRecevied?.amtRecevied || "NA"}</a>
                                </Col></> }
                            </Row>
                            <Row >
                                <Col lg="3">
                                    <p>Special FPO </p>
                                    <a>{egFormAmountRecevied?.isSpecialEPO ? "True" : "False"}</a>
                                </Col>
                                {
                                    egFormAmountRecevied ?.isSpecialEPO ? 
                                    <Col lg="3">
                                        <p>Please Specify </p>
                                        <a>{egFormAmountRecevied ?.specifyEPO}</a>
                                    </Col> : ''
                                }
                                
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> Bank Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Account Number</p>
                                    <a>{egFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Confirm Account Number</p>
                                    <a>{egFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Account Name</p>
                                    <a>{egFormBankDetails?.accName}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Bank Name</p>
                                    <a>{egFormBankDetails?.bnkName}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Branch</p>
                                    <a>{egFormBankDetails?.branchName}</a>
                                </Col>
                                <Col lg="3">
                                    <p>IFSC Code</p>
                                    <a>{egFormBankDetails?.ifscCode}</a>
                                </Col>
                            </Row>
                        </div>

                        <Col lg="8" className="p-3">
                            <h3 className=" mb-3">Proposed Activity and fund requirement details</h3>
                            <Row className="mb-3" className="activity-shadow">
                                <Col>
                                    <p>Activity</p>
                                </Col>
                                <Col>
                                    <p>Amount Required ( Rs )</p>
                                </Col>
                                <Col>
                                    <p>Timeline</p>
                                </Col>
                            </Row>
                            {
                                egFormProposedActivity.map(data => (
                                <Row className="mb-3">
                                    <Col>
                                <a>{data?.activityName}</a>
                                    </Col>
                                    <Col>
                                        <a>Rs : {data?.amtReq}</a>
                                    </Col>
                                    <Col>
                                        <a>{data?.activityTimeLineVal + '  ' + data?.activityTimelineData.label}</a>
                                    </Col>
                                </Row>
                                ))
                            }

                            <Row className="mb-3" className="activity-shadow">
                                <Col lg="4">
                                    <a className="fw-700">Total Amount Required</a>
                                </Col>
                                <Col lg="4">
                                    <a className="fw-700">Rs {egFormProposedActivity.filter(data => data.amtReq).reduce((acc, value) => {
                        return acc + parseInt(value.amtReq)
                    }, 0).toLocaleString('en-IN')}</a>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="4" className="view-document">
                            <h3 className="mb-3">Documents</h3>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(egFormUploadDocument?.bankPassBook[0].docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Bank Passbook Frontpage</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(egFormUploadDocument?.minOfEGRefund[0].docUrl)}>
                                        <img src={app}  alt="download" className="app mr-2"></img>
                                        <a>Minutes of EG requesting fund </a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(egFormUploadDocument?.businessPlan[0].docUrl)}>
                                        <img src={app}  alt="download" className="app mr-2"></img>
                                        <a>Business Plan or Activity Plan</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="6">
                            <Row className="mt-4">
                                <Col className="view-textarea">
                                    <FormInput
                                        type="textarea"
                                        label="Remarks / Challanges faced during COVID"
                                        name="remarks"
                                        value={egFormUploadDocument?.remarks}
                                        readOnly={true}
                                    /></Col>
                            </Row>
                        </Col>
                    </div>
                </div>
            </>
        )
    }
}

export { View }