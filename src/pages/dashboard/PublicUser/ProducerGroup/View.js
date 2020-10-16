import React, { Component, Fragment } from 'react'
import { Row, Col } from 'reactstrap';
import moment from "moment";
import download from 'assets/images/download.svg'
import app from 'assets/images/app.svg'
import FormInput from 'component/inputs/FormInput';
import { formatToINR } from 'helpers'
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { formatDate,calculateAge } from 'helpers/momentHelpers'
import Loader from 'component/Loader';
import { PG_FORM_MASTER_STATUS } from "helpers/variables";

class PgView extends Component {

    state = {
        basicDetails: {},
        pgDetails: {},
        pgFormAmountReceived: {},
        pgFormBankDetails: {},
        pgFormMembers: {},
        pgFormProposedActivity: [],
        pgFormAmountRecevied: {},
        pgFormUploadDocument:[],
        cancelToken: axios.CancelToken.source(),
        isLoading : false,
        status: null,
        appSubmitDate: undefined,
        amountDisbursment: null
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
          ...API_BOOK.APPLICATION.GET_PG_FORM_API,
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
        let {
            basicDetails,
            pgDetails,
            pgFormMembers,
            pgFormAmountRecevied,
            pgFormBankDetails,
            pgFormProposedActivity,
            pgFormUploadDocument,
            formId,
            isLoading,
            status,
            appSubmitDate,
            amountDisbursment,
            pgBmpuApplicationStatus,
            pgDmpuApplicationStatus
        } = this.state;
        let {
            DRAFT,
            BMPU_OPEN_APPLICATION,
            DMPU_OPEN_APPLICATION,
            AMOUNT_DISBURSMENT,
            SUBMIT_UC,
            APPROVED,
            PENDING,
            DECLINED,
        } = PG_FORM_MASTER_STATUS;

        let BMMU_

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
                                    <span>{moment(appSubmitDate).format('DD / MM / YYYY')}</span>
                                </li>
                            </ul>
                        </Col>
                        <Col className="p-4 ml-3">
                            <h2 className="title-two mb-3">Status Tracker</h2>
                            <ul className=" m-0 tracker pl-4">
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Submitted</p>
                                    <a>Application Submitted on : {moment(appSubmitDate).format('DD / MM / YYYY')}</a>
                                </li>
                                {(status === BMPU_OPEN_APPLICATION) && <li className="pending">
                                    <span class="custom-caret submit-icon mr-2"></span>
                                    <p>Pending for BMMU verification</p>
                                </li>}
                                {(status === DMPU_OPEN_APPLICATION) &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">BMMU Application Approved</p>
                                    <a>Application Approved on : {moment(pgBmpuApplicationStatus?.recommendedDate).format('DD / MM / YYYY')}</a>
                                </li>
                                <li className="pending">
                                <span class="custom-caret submit-icon mr-2"></span>
                                <p>Pending for DMMU verification</p></li>
                                </Fragment>}
                                {(status === AMOUNT_DISBURSMENT) &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">DMMU Application Approved</p>
                                    <a>Application Approved on : {moment(pgDmpuApplicationStatus?.approvedDate).format('DD / MM / YYYY')}</a>
                                </li>
                                <li className="pending">
                                <span class="custom-caret submit-icon mr-2"></span>
                                <p>Pending for Amount Disbursment</p></li>
                                </Fragment>}
                                {(status === APPROVED || status === SUBMIT_UC) &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Approved</p>
                                    <a>Application Approved on : {moment(pgDmpuApplicationStatus?.approvedDate).format('DD / MM / YYYY')}</a>
                                </li>
                                <li className="">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Loan amount Disbursed</p>
                                    <a>Amount Disbursed on : {moment(amountDisbursment?.disbursmentDate).format('DD / MM / YYYY')}</a><br />
                                    <a>Disbursed Amount : {amountDisbursment?.disbursmentAmount}</a><br />
                                    <a>Bank : {pgFormBankDetails?.bnkName}</a><br />
                                    <a>Account Number : {pgFormBankDetails?.accNumber && `*********** ${pgFormBankDetails.accNumber.substr(pgFormBankDetails.accNumber - 3)}`}</a><br />
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
                                <p>PG Name</p>
                                <a>{basicDetails?.pgName}</a>
                            </Col>
                            <Col>
                                <p>Application Type</p>
                                <a>PG</a>
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
                        <h3 className="ml-3 pt-4 mb-0"> Producer Group Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col>
                                    <p>Date of Formation</p>
                                    <a>{pgDetails?.dateFormation ? formatDate(pgDetails?.dateFormation ) : ''}</a>
                                </Col>
                                <Col>
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(pgDetails.dateFormation)}</a>
                                </Col>
                                <Col >
                                    <p>Date of Registration</p>
                                    <a>{pgDetails?.dateRegistration ? formatDate(pgDetails?.dateRegistration ) : ''}</a>
                                </Col>
                                <Col >
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(pgDetails.dateRegistration)}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="mb-3">
                                    <p>Registration Under </p>
                                    <a>{pgDetails?.registrationUnderData?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Registration Number</p>
                                    <a>{pgDetails?.registrationNumber}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Promoting Organization</p>
                                    <a>{pgDetails?.promotingOrg?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Promoting Organization</p>
                                    <a>{pgDetails?.promotingOrgName}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Relevant Supporting Organization</p>
                                    <a>{pgDetails?.relevantSupportOrg}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Formed / Supported by</p>
                                    <a>{pgDetails?.formSupportedData?.label}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col >
                                    <p>Type of Producer Group</p>
                                    <a>{pgDetails?.pgTypes?.map(data => data.pgTypesData.label).join(', ')}</a>
                                </Col>
                                <Col >
                                    <p>Type of Sector </p>
                                    <a>{pgDetails?.pgSectorTypes?.map(data => data.pgSectorTypesData.label).join(', ')}</a>
                                </Col>
                                <Col >
                                    <p>Type of Commodities </p>
                                    <a>{pgDetails?.pgCommodityTypes?.map(data => data.pgCommodityTypesData.label).join(', ')}</a>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md="12">
                                    <p>PG Involved in  {pgDetails?.pgCommodityTypes?.length == 1 ? "Single" : "Multiple"}  Commodities </p>
                                </Col>
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> All Members</h3>
                        <Row className="p-3">
                            <Col md="3">
                                <p>Total Members</p>
                                <a>{pgFormMembers?.totalMembers}</a>
                            </Col>
                            <Col md="3">
                                <p>Active Members</p>
                                <a>{pgFormMembers?.noOfActive}</a>
                            </Col>
                            <Col md="3">
                                <p>Inactive Members</p>
                                <a>{pgFormMembers?.noOfInActive}</a>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Gender</h3>
                        <Row className="p-3">
                            <Col md="3">
                                <p>No of Male</p>
                                <a>{pgFormMembers?.noOfMale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Female</p>
                                <a>{pgFormMembers?.noOfFemale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Transgender</p>
                                <a>{pgFormMembers?.noOfTransGender}</a>
                            </Col>
                            <Col md="3">
                                <p>Gender Total</p>
                                <a>{pgFormMembers?.genderTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Community</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of BC</p>
                                <a>{pgFormMembers?.noOfBC}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of ST</p>
                                <a>{pgFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of MBC</p>
                                <a>{pgFormMembers?.noOfST}</a>
                            </Col>
                            <Col  md="3" className="mb-4">
                                <p>Others</p>
                                <a>{pgFormMembers?.noOfCommunityOthers}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>SC</p>
                                <a>{pgFormMembers?.noOfSC}</a>
                            </Col>
                            <Col md="3">
                                <p>Community Total</p>
                                <a>{pgFormMembers?.communityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Minority</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of Muslims</p>
                                <a>{pgFormMembers?.noOfMuslim}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Christian</p>
                                <a>{pgFormMembers?.noOfChristians}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Others</p>
                                <a>{pgFormMembers?.noOfMinorityOthers}</a>
                            </Col>
                            <Col md="3">
                                <p>Minority Total</p>
                                <a>{pgFormMembers?.minorityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Vulnerable</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of Differently abled</p>
                                <a>{pgFormMembers?.noOfDiffAbled}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of window</p>
                                <a>{pgFormMembers?.noOfWidow}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Destitute Women</p>
                                <a>{pgFormMembers?.noOfDesitute}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Deserted Women</p>
                                <a>{pgFormMembers?.noOfDeserted}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Transgender</p>
                                <a>{pgFormMembers?.noOfVulTransGender}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of Elderly</p>
                                <a>{pgFormMembers?.noOfEiderly}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>Vulnerable Total</p>
                                <a>{pgFormMembers?.vulnerableTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Other Category</h3>
                        <Row className="p-3">
                            <Col>
                                <p>No of SHG Members</p>
                                <a>{pgFormMembers?.noOfSHGMembers}</a>
                            </Col>
                            <Col>
                                <p>No of SHG House Hold Members</p>
                                <a>{pgFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col>
                                <p>No of Non SHG House Hold Members</p>
                                <a>{pgFormMembers?.noOfNonSHGTotal}</a>
                            </Col>
                            <Col>
                                <p>SHG Total</p>
                                <a>{pgFormMembers?.shgTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Amount received</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Amount received as a grant so far </p>
                                    <a>Rs : {pgFormAmountRecevied?.amtGrant}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Amount received as loan so far</p>
                                    <a>Rs : {pgFormAmountRecevied?.amtReceviedLoan}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Any amount received as Loan / Grant in last 6 Months</p>
                                    <a>{pgFormAmountRecevied?.isLoanGrant ? "Yes" : "No"}</a>
                                </Col>
                                {pgFormAmountRecevied?.isLoanGrant && <>
                                <Col lg="3">
                                    <p>Fund Provider Name</p>
                                    <a>{pgFormAmountRecevied?.fundProvider || "NA"}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Amount received</p>
                                    <a>Rs : {pgFormAmountRecevied?.amtRecevied || "NA"}</a>
                                </Col> </> }
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Special PG </p>
                                    <a>{pgFormAmountRecevied?.isSpecialEPO ? "Yes" : "No"}</a>
                                </Col>
                                {
                                    pgFormAmountRecevied ?.isSpecialEPO ? 
                                    <Col lg="3">
                                        <p>Please Specify </p>
                                        <a>{pgFormAmountRecevied ?.specifyEPO}</a>
                                    </Col> : ''
                                }
                                
                            </Row>
                            <Row >
                            <Col lg="3" className="mb-3">
                                    <p>Linked to</p>
                                    <a>{pgFormAmountRecevied?.linkedTo || "linked to name"}</a>
                                </Col>
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> Bank Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Account Number</p>
                                    <a>{pgFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Confirm Account Number</p>
                                    <a>{pgFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Account Name</p>
                                    <a>{pgFormBankDetails?.accName}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>Bank</p>
                                    <a>{pgFormBankDetails?.bnkName}</a>
                                </Col>
                                <Col lg="3">
                                    <p>Branch</p>
                                    <a>{pgFormBankDetails?.branchName}</a>
                                </Col>
                                <Col lg="3">
                                    <p>IFSC Code</p>
                                    <a>{pgFormBankDetails?.ifscCode}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg="3">
                                    <p>No. Of Transactions in last 6 Months</p>
                                    <a>{pgFormBankDetails?.noOfLastTransaction}</a>
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
                                pgFormProposedActivity.map(data => (
                                <Row className="mb-3">
                                    <Col>
                                <a>{data?.activityName}</a>
                                    </Col>
                                    <Col>
                                        <a>Rs : {formatToINR(data?.amtReq)}</a>
                                    </Col>
                                    <Col>
                                        <a>{formatToINR(data?.activityTimeLineVal) + '  ' + data?.activityTimelineData?.label}</a>
                                    </Col>
                                </Row>
                                ))
                            }

                            <Row className="mb-3" className="activity-shadow">
                                <Col lg="4">
                                    <a className="fw-700">Total Amount Required</a>
                                </Col>
                                <Col lg="4">
                                    <a className="fw-700">Rs {pgFormProposedActivity.filter(data => data.amtReq).reduce((acc, value) => {
                        return acc + parseInt(value.amtReq)
                    }, 0).toLocaleString('en-IN')}</a>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="4" className="view-document">
                            <h3 className="mb-3">Documents</h3>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.bankPassBook[0]?.docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Bank Passbook front page</a>
                                        <span className="ml-auto">  
                                            <img 
                                                  src={download} 
                                                alt="download">
                                            </img>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument.minOfPGRefund[0]?.docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Minutes of PG requesting fund</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.businessPlan[0]?.docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Business Plan / Activity Plan</a>
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
                                        value={pgFormUploadDocument?.remarks}
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

export { PgView }