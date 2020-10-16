import React, { Component, Fragment } from 'react'
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
import { formatToINR } from 'helpers'
class View extends Component {

    state = {
        basicDetails: {},
        pcDetails: {},
        pcFormAmountReceived: {},
        pcFormBankDetails: {},
        pcFormMembers: {},
        pcFormProposedActivity: [],
        pcFormAmountRecevied: {},
        pcFormUploadDocument:[],
        cancelToken: axios.CancelToken.source(),
        isLoading : false,
        status: null,
        appSubmitDate: undefined,
        firstTranche: null,
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
          ...API_BOOK.APPLICATION.GET_PC_FORM_API,
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
            pcDetails,
            pcFormMembers,
            pcFormAmountRecevied,
            pcFormBankDetails,
            pcFormProposedActivity,
            pcFormUploadDocument,
            formId,
            isLoading,
            status,
            appSubmitDate,
            firstTranche,
            secondTranche,
            pcApplicationStatus
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
                                {(status === 2 || status === 3 || status === 8)&& 
                                <li className="pending">
                                    <span class="custom-caret submit-icon mr-2"></span>
                                    <p>Pending for department verification</p>
                                </li>}
                                {(status === 4 || status === 5 || status === 6) &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Approved</p>
                                    <a>Application Approved on : {moment(pcApplicationStatus?.dmpuVerifyDate).format('DD / MM / YYYY')}</a>
                                </li><li className="pending">
                                <span class="custom-caret submit-icon mr-2"></span>
                                <p>Loan Amount Disbursed</p></li>
                                </Fragment>}
                                {status === 7 &&
                                <Fragment>
                                <li className="mb-4 submit">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Application Approved</p>
                                    <a>Application Approved on : {moment(pcApplicationStatus?.dmpuVerifyDate).format('DD / MM / YYYY')}</a>
                                </li>
                                <li className="">
                                    <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                    <p className="mb-0">Loan Amount Disbursed</p>
                                    <a>Amount Disbursed on : {moment(firstTranche?.disbursmentDate).format('DD / MM / YYYY')}</a><br />
                                    <a>Disbursed Amount : Rs. {formatToINR(firstTranche?.disbursmentAmount + secondTranche?.disbursmentAmount)}</a><br />
                                    <a>Bank : {pcFormBankDetails?.bnkName}</a><br />
                                    <a>Account Number : {pcFormBankDetails?.accNumber && `*********** ${pcFormBankDetails.accNumber.substr(pcFormBankDetails?.accNumber?.length - 4)}`}</a><br />
                                </li>
                                </Fragment>}
                            </ul>
                        </Col>
                    </Row>
                </div>

                <div className="container bg-white mt-3 view-main">
                    <Row className="border-bottom p-4" >
                        <Col className="p-0">
                            <h2 className="fw-700 m-0">All Details</h2>
                        </Col>
                    </Row>
                    <div className="application-detail">
                        <h3 className="ml-3 pt-4 mb-0"> Basic Details</h3>
                        <Row className="p-3 border-bottom">
                            <Col className="mb-3">
                                <p>Name</p>
                                <a>{basicDetails?.name}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>Mobile Number</p>
                                <a>{basicDetails?.mobileNumber}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>PC Name</p>
                                <a>{basicDetails?.pcName}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>Application Type</p>
                                <a>PC</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Location</h3>
                        <Row className="p-3 border-bottom">
                            <Col className="mb-3">
                                <p>District</p>
                                <a>{basicDetails?.district?.label}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>Block</p>
                                <a>{basicDetails?.block?.label}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>Panchayath</p>
                                <a>{basicDetails?.panchayat?.label}</a>
                            </Col>
                            <Col >
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Producer Collective Details</h3>
                        <div className="p-3 border-bottom">
                            <Row >
                                <Col className="mb-3">
                                    <p>Date of Formation</p>
                                    <a>{pcDetails?.dateFormation ? formatDate(pcDetails?.dateFormation ) : ''}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(pcDetails.dateFormation)}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Date of Registration</p>
                                    <a>{pcDetails?.dateRegistration ? formatDate(pcDetails?.dateRegistration ) : ''}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Age of Activity</p>
                                    <a>{calculateAge(pcDetails.dateRegistration)}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="mb-3">
                                    <p>Registration Under </p>
                                    <a>{pcDetails?.registrationUnderData?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Registration Number</p>
                                    <a>{pcDetails?.registrationNumber}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Promoting Organization</p>
                                    <a>{pcDetails?.promotingOrg?.label}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Promoting Organization</p>
                                    <a>{pcDetails?.promotingOrgName}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Name of Relevant Supporting Organization</p>
                                    <a>{pcDetails?.relevantSupportOrg}</a>
                                </Col>
                                <Col md="3" className="mb-3">
                                    <p>Formed / Supported by</p>
                                    <a>{pcDetails?.formSupportedData?.label}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col className="mb-3">
                                    <p>No of PG in PC</p>
                                    <a>{pcDetails?.noOfPG}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Type of Producer Collective</p>
                                    <a>{pcDetails?.pcTypes?.map(data => data.pcTypesData.label).join(', ')}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Type of Sector </p>
                                    <a>{pcDetails?.pcSectorTypes?.map(data => data.pcSectorTypesData.label).join(', ')}</a>
                                </Col>
                                <Col className="mb-3">
                                    <p>Type of Commodities </p>
                                    <a>{pcDetails?.pcCommodityTypes?.map(data => data.pcCommodityTypesData.label).join(', ')}</a>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md="12">
                                    <p>PC Involved in {pcDetails?.pcCommodityTypes?.length === 1 ? "Single" : "multiple" }   Commodities </p>
                                </Col>
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> All Members</h3>
                        <Row className="p-3">
                            <Col md="12" className="mb-3">
                                <p>Total memebers</p>
                                <a>{pcFormMembers?.totalMembers}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Gender</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-3">
                                <p>No of Male</p>
                                <a>{pcFormMembers?.noOfMale}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Female</p>
                                <a>{pcFormMembers?.noOfFemale}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Transgender</p>
                                <a>{pcFormMembers?.noOfTransGender}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>Gender Total</p>
                                <a>{pcFormMembers?.genderTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Community</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-3">
                                <p>No of BC</p>
                                <a>{pcFormMembers?.noOfBC}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of ST</p>
                                <a>{pcFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of MBC</p>
                                <a>{pcFormMembers?.noOfST}</a>
                            </Col>
                            <Col  md="3" className="mb-3">
                                <p>Others</p>
                                <a>{pcFormMembers?.noOfCommunityOthers}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>SC</p>
                                <a>{pcFormMembers?.noOfSC}</a>
                            </Col>
                            <Col md="3">
                                <p>Community Total</p>
                                <a>{pcFormMembers?.communityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Minority</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-3">
                                <p>No of Muslims</p>
                                <a>{pcFormMembers?.noOfMuslim}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Christian</p>
                                <a>{pcFormMembers?.noOfChristians}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Others</p>
                                <a>{pcFormMembers?.noOfMinorityOthers}</a>
                            </Col>
                            <Col md="3">
                                <p>Minority Total</p>
                                <a>{pcFormMembers?.minorityTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Vulnerable</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-3">
                                <p>No of Differently abled</p>
                                <a>{pcFormMembers?.noOfDiffAbled}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of window</p>
                                <a>{pcFormMembers?.noOfWidow}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Destitute Women</p>
                                <a>{pcFormMembers?.noOfDesitute}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Deserted Women</p>
                                <a>{pcFormMembers?.noOfDeserted}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Transgender</p>
                                <a>{pcFormMembers?.noOfVulTransGender}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>No of Elderly</p>
                                <a>{pcFormMembers?.noOfEiderly}</a>
                            </Col>
                            <Col md="3" className="mb-3">
                                <p>Vulnerable Total</p>
                                <a>{pcFormMembers?.vulnerableTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Other Category</h3>
                        <Row className="p-3">
                            <Col className="mb-3">
                                <p>No of SHG Members</p>
                                <a>{pcFormMembers?.noOfSHGMembers}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>No of SHG House Holds Members</p>
                                <a>{pcFormMembers?.noOfSHGTotal}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>No of Non SHG House Holds Members</p>
                                <a>{pcFormMembers?.noOfNonSHGTotal}</a>
                            </Col>
                            <Col className="mb-3">
                                <p>SHG Total</p>
                                <a>{pcFormMembers?.shgTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Amount received</h3>
                        <div className="p-3 border-bottom">
                            <Row>
                                <Col lg="3" className="mb-3">
                                    <p>Amount received as a grant so far </p>
                                    <a>Rs : {pcFormAmountRecevied?.amtGrant}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>Amount received as loan so far</p>
                                    <a>Rs : {pcFormAmountRecevied?.amtReceviedLoan}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3" className="mb-3">
                                    <p>Any amount received as Loan / Grant in last 6 Months</p>
                                    <a>{pcFormAmountRecevied?.isLoanGrant ? "Yes" : "No"}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>Fund Provider Name</p>
                                    <a>{pcFormAmountRecevied?.fundProvider || "NA"}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>Amount received</p>
                                    <a>Rs : {pcFormAmountRecevied?.amtRecevied || "NA"}</a>
                                </Col>
                            </Row>
                            <Row >
                                <Col lg="3" className="mb-3">
                                    <p>Special FPO </p>
                                    <a>{pcFormAmountRecevied?.isSpecialEPO ? "Yes" : "No"}</a>
                                </Col>
                                {
                                    pcFormAmountRecevied ?.isSpecialEPO ? 
                                    <Col lg="3" className="mb-3">
                                        <p>Please Specify </p>
                                        <a>{pcFormAmountRecevied ?.specifyEPO}</a>
                                    </Col> : ''
                                }
                                
                            </Row>
                        </div>
                        <h3 className="ml-3 pt-4 mb-0"> Bank Details</h3>
                        <div className="p-3 border-bottom">
                            <Row>
                                <Col lg="3" className="mb-3">
                                    <p>Account Number</p>
                                    <a>{pcFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>Account Name</p>
                                    <a>{pcFormBankDetails?.accName}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3" className="mb-3">
                                    <p>Bank</p>
                                    <a>{pcFormBankDetails?.bnkName}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>Branch</p>
                                    <a>{pcFormBankDetails?.branchName}</a>
                                </Col>
                                <Col lg="3" className="mb-3">
                                    <p>IFSC Code</p>
                                    <a>{pcFormBankDetails?.ifscCode}</a>
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
                                pcFormProposedActivity.map(data => (
                                <Row className="mb-3">
                                    <Col>
                                <a>{data?.activityName}</a>
                                    </Col>
                                    <Col>
                                        <a>Rs : {formatToINR(data?.amtReq)}</a>
                                    </Col>
                                    <Col>
                                <a>{formatToINR(data?.activityTimeLineVal)} &nbsp;{ data?.activityTimelineData.label }</a>
                                    </Col>
                                </Row>
                                ))
                            }

                            <Row className="activity-shadow">
                                <Col lg="4" className="mb-3">
                                    <a className="fw-700">Total Amount Required</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <a className="fw-700">Rs {pcFormProposedActivity.filter(data => data.amtReq).reduce((acc, value) => {
                        return acc + parseInt(value.amtReq)
                    }, 0).toLocaleString('en-IN')}</a>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="4" className="view-document">
                            <h3 className="mb-3">Documents</h3>
                            <Row>
                                <Col className="mb-3">
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pcFormUploadDocument?.regCertificate[0].docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Registration Certificate</a>
                                        <span className="ml-auto">  
                                            <img 
                                                  src={download} 
                                                alt="download">
                                            </img>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-3">
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pcFormUploadDocument.auditStatement[0].docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>2 Years Audit Statement</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-3">
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pcFormUploadDocument?.bankPassBook[0].docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Bank Passbook Frontpage</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-3">
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pcFormUploadDocument?.latestMomRes[0].docUrl)}>
                                        <img src={app}  alt="download" className="app mr-2"></img>
                                        <a>Latest Minutes of meeting / Resolution </a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-3">
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pcFormUploadDocument?.businessPlan[0].docUrl)}>
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
                                        value={pcFormUploadDocument?.remarks}
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