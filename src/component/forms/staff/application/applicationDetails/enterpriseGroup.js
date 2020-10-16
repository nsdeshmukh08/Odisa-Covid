import React,{ Fragment } from 'react';
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

const enterpriseGroup = ({ 
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
    firstTranche,
    ...rest
}) => {
    console.log( rest,"myData123")
    return (
        <>
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
                            <a>{basicDetails?.egName}</a>
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
                            <Col md="4" className="mb-4">
                                <p>Date of Formation</p>
                                <a>{egDetails?.dateFormation ? formatDate(egDetails?.dateFormation) : ''}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Age of Activity</p>
                                <a>{calculateAge(egDetails?.dateFormation)}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Date of Registration</p>
                                <a>{egDetails?.dateRegistration ? formatDate(egDetails?.dateRegistration) : ''}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Age of Activity</p>
                                <a>{calculateAge(egDetails?.dateRegistration)}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Registration Under </p>
                                <a>{egDetails?.registrationUnderData?.label}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Registration Under Others</p>
                                <a>{egDetails?.registrationUnderOthers}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Registration Number</p>
                                <a>{egDetails?.registrationNumber}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Promoting Organization </p>
                                <a>{egDetails?.promotingOrg?.label}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Supported By </p>
                                <a>{egDetails?.formSupportedData?.label}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Supported By Others</p>
                                <a>{egDetails?.othersName}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Type of Producer Collective</p>
                                <a>{egDetails?.egTypes?.map(data => data.egTypesData.label).join(', ')}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Type of Sector </p>
                                <a>{egDetails?.egSectorTypes?.map(data => data.egSectorTypesData.label).join(', ')}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Type of Commodities </p>
                                <a>{egDetails?.egCommodityTypes?.map(data => data.egCommodityTypesData.label).join(', ')}</a>
                            </Col>
                            <Col auto>
    <p>EG Involved in  {egDetails?.egCommodityTypes?.length > 1 ? 'Multiple' : 'Single'} Commodities </p>
                            </Col>
                        </Row>
                        <Row>  
                            
                        </Row>
                    </div>
                    <h3 className="ml-3 pt-4 mb-0"> All Members</h3>
                    <Row className="p-3">
                        <Col md="3">
                            <p>Total memebers</p>
                            <a>{egFormMembers?.totalMembers}</a>
                        </Col>
                        <Col md="3">
                            <p>Active Members</p>
                            <a>{egFormMembers?.noOfActive}</a>
                        </Col>
                        <Col md="3">
                            <p>Inactive Members</p>
                            <a>{egFormMembers?.noOfInActive}</a>
                        </Col>
                        <Col>
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
                        <Col md="3" className="mb-4">
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
                            <Col md="4" className="mb-4">
                                <p>Amount received as a grant so far </p>
                                <a>Rs : {egFormAmountRecevied?.amtGrant}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Amount received as loan so far</p>
                                <a>Rs : {egFormAmountRecevied?.amtReceviedLoan}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Any amount received as Loan / Grant in last 6 Months</p>
                                <a>{egFormAmountRecevied?.isLoanGrant ? "Yes" : "No"}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Fund Provider Name</p>
                                <a>{egFormAmountRecevied?.fundProvider || "NA"}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Amount received</p>
                                <a>{egFormAmountRecevied?.amtRecevied || "NA"}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>Special FPO </p>
                                <a>{egFormAmountRecevied?.isSpecialEPO ? "Yes" : "No"}</a>
                            </Col>
                            {
                                egFormAmountRecevied?.isSpecialEPO ?
                                    <Col md="4" className="mb-4">
                                        <p>Please Specify </p>
                                        <a>{egFormAmountRecevied?.specifyEPO}</a>
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
                                <p>Account Name</p>
                                <a>{egFormBankDetails?.accName}</a>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg="3">
                                <p>Bank</p>
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
                    <Col lg="12" className="p-3">
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
                            egFormProposedActivity&&egFormProposedActivity.map(data => (
                                <Row className="mb-3">
                                    <Col>
                                        <a>{data?.activityName}</a>
                                    </Col>
                                    <Col>
                                        <a>Rs : {data?.amtReq}</a>
                                    </Col>
                                    <Col>
                                        <a>{data?.activityTimelineData.label}</a>
                                    </Col>
                                </Row>
                            ))
                        }

                        <Row className="mb-3" className="activity-shadow">
                            <Col lg="4">
                                <a className="fw-700">Total Amount Required</a>
                            </Col>
                            <Col lg="4">
                                <a className="fw-700">Rs {egFormProposedActivity&&egFormProposedActivity.filter(data => data.amtReq).reduce((acc, value) => {
                                    return acc + parseInt(value.amtReq)
                                }, 0).toLocaleString('en-IN')}</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="8" className="view-document">
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
                                    <img src={app} alt="download" className="app mr-2"></img>
                                    <a>Minutes of EG requesting fund </a>
                                    <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col >
                                <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(egFormUploadDocument?.businessPlan[0].docUrl)}>
                                    <img src={app} alt="download" className="app mr-2"></img>
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

export default enterpriseGroup;