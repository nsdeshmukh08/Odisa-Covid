import React from 'react';
import { Row, Col } from 'reactstrap';
import { formatDate,calculateAge } from 'helpers/momentHelpers'
import { formatToINR,populateData, history } from 'helpers'
import download from 'assets/images/download.svg'
import FormInput from 'component/inputs/FormInput';
import app from 'assets/images/app.svg'

const producerGroup = ({ basicDetails,pgDetails,pgFormBankDetails,pgFormMembers, pgFormProposedActivity = [], pgFormAmountRecevied = {},pgFormUploadDocument = [] }) => {

    // console.log(pgFormUploadDocument,"pgFormUploadDocument")
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
                            <Col md="4">
                                <p>Name of Promoting Agency</p>
                                <a>{basicDetails?.promotingAgency}</a>
                            </Col>
                            <Col md="4">
                                <p>Name of the Enterprise/ Activity</p>
                                <a>{basicDetails?.enterpriseActivity}</a>
                            </Col>
                            <Col md="4">
                                <p>Date Of Formation</p>
                                <a>{basicDetails?.dateOfFormation}</a>
                            </Col>
                            <Col md="4">
                                <p>Age Of EG/PG</p>
                                <a>{basicDetails?.ageOfEGPG} </a>
                            </Col>
                            <Col md="4">
                                <p>CLF</p>
                                <a>{basicDetails?.clfId} </a>
                            </Col>
                            <Col md="4">
                                <p>Name of the Enterprise / Producer Group</p>
                                <a>{basicDetails?.enterpriseAndProducerGroup}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Location</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>District</p>
                                <a>{basicDetails?.districtId?.label}</a>
                            </Col>
                            <Col>
                                <p>Block</p>
                                <a>{basicDetails?.blockId?.label}</a>
                            </Col>
                            <Col >
                                <p>Panchayath</p>
                                <a>{basicDetails?.panchayatId?.label}</a>
                            </Col>
                            <Col >
                                <p>Village</p>
                                <a>{basicDetails?.villageId?.label}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Contact & Address</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>Mobile Number</p>
                                <a>{basicDetails?.mobileNumber}</a>
                            </Col>
                            <Col>
                                <p>Address of Communication</p>
                                <a>{basicDetails?.AddressCommunication}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> SHG Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col md="6" className="mb-3">
                                    <p>SHG Member</p>
                                    <a>{pgDetails?.shgName}</a>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <p>SHG Household</p>
                                    <a>{pgDetails?.nrlmPortalShgCode}</a>
                                </Col>
                                <Col md="12" className="mb-3">
                                    <p>If No, Any Household member belonging to SHG</p>
                                    <a>{pgDetails?.shgMemberType}</a>
                                </Col>
                            </Row>
                        </div>
                        {/* <h3 className="ml-3 pt-4 mb-0"> All Members</h3>
                        <Row className="p-3">
                            <Col md="3">
                                <p>Total memebers</p>
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
                        </Row> */}
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
                        <h3 className="ml-3 pt-4 mb-0"> PWD</h3>
                        <Row className="p-3">
                            <Col md="3">
                                <p>No of Male</p>
                                <a>{pgFormMembers?.PwdnoOfMale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Female</p>
                                <a>{pgFormMembers?.PwdnoOfFemale}</a>
                            </Col>
                            <Col md="3">
                                <p>No of Transgender</p>
                                <a>{pgFormMembers?.PwdnoOfTransGender}</a>
                            </Col>
                            <Col md="3">
                                <p>Gender Total</p>
                                <a>{pgFormMembers?.PwdgenderTotal}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Socail Category</h3>
                        <Row className="p-3">
                            <Col md="3" className="mb-4">
                                <p>No of Gen</p>
                                <a>{pgFormMembers?.noOfGen}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of SEBC</p>
                                <a>{pgFormMembers?.noOfSEBC}</a>
                            </Col>
                            <Col md="3" className="mb-4">
                                <p>No of SC</p>
                                <a>{pgFormMembers?.noOfSC}</a>
                            </Col>
                            <Col  md="3" className="mb-4">
                                <p>ST</p>
                                <a>{pgFormMembers?.noOfST}</a>
                            </Col>
                            <Col md="3">
                                <p>Community Total</p>
                                <a>{pgFormMembers?.communityTotal}</a>
                            </Col>
                            <Col md="3">
                                <p>Minority</p>
                                <a>{pgFormMembers?.noOfMinorityOthers}</a>
                            </Col>
                        </Row>
                        {/* <h3 className="ml-3 pt-4 mb-0"> Minority</h3>
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
                            
                        </Row> */}
                        {/* <h3 className="ml-3 pt-4 mb-0"> Vulnerable</h3>
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
                        </Row> */}
                        <h3 className="ml-3 pt-4 mb-0"> SHG</h3>
                        <Row className="p-3">
                            <Col>
                                <p>No of SHG Members</p>
                                <a>{pgFormMembers?.noOfSHGMembers}</a>
                            </Col>
                            <Col>
                                <p>No of SHG House Hold Members</p>
                                <a>{pgFormMembers?.noOfSHGTotal}</a>
                            </Col>
                        </Row>
                        {/* <h3 className="ml-3 pt-4 mb-0"> Amount received</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="4" className="mb-3">
                                    <p>Amount received as a grant so far </p>
                                    <a>Rs : {pgFormAmountRecevied?.amtGrant}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Amount received as loan so far</p>
                                    <a>Rs : {pgFormAmountRecevied?.amtReceviedLoan}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Any amount received as Loan / Grant in last 6 Months</p>
                                    <a>{pgFormAmountRecevied?.isLoanGrant ? "Yes" : "No"}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Fund Provider Name</p>
                                    <a>{pgFormAmountRecevied?.fundProvider || "NA"}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Amount received</p>
                                    <a>{pgFormAmountRecevied?.amtRecevied ? "Rs :":""} {pgFormAmountRecevied?.amtRecevied || "NA"}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Special PG </p>
                                    <a>{pgFormAmountRecevied?.isSpecialEPO ? "Yes" : "No"}</a>
                                </Col>
                                {
                                    pgFormAmountRecevied ?.isSpecialEPO ? 
                                    <Col lg="4">
                                        <p>Please Specify </p>
                                        <a>{pgFormAmountRecevied ?.specifyEPO}</a>
                                    </Col> : ''
                                }
                                {
                                    pgFormAmountRecevied?.linkedTo ?
                                    <Col lg="3" className="mb-3">
                                        <p>Linked to</p>
                                        <a>{pgFormAmountRecevied?.linkedTo}</a>
                                    </Col> : ''
                                }
                                
                            </Row>
                        </div> */}
                        <h3 className="ml-3 pt-4 mb-0"> Bank Details</h3>
                        <div className="p-3 border-bottom">
                            <Row className="mb-3">
                                <Col lg="4" className="mb-3">
                                    <p>Account Number</p>
                                    <a>{pgFormBankDetails?.accNumber}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Account Name</p>
                                    <a>{pgFormBankDetails?.accName}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Bank</p>
                                    <a>{pgFormBankDetails?.bnkName}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Branch</p>
                                    <a>{pgFormBankDetails?.branchName}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>IFSC Code</p>
                                    <a>{pgFormBankDetails?.ifscCode}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Existing Loan and Repayment Status</p>
                                    <a>{pgFormBankDetails?.existingLoanRepaymentStatus}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Loss incurred due to COVID-19 (if any)</p>
                                    <a>{pgFormBankDetails?.lossIncurredtoCovid}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Proposed activity and fund requirement details</p>
                                    <a>{pgFormBankDetails?.activityFundRequirementDetails}</a>
                                </Col>
                                <Col lg="4" className="mb-3">
                                    <p>Remarks/Challenges faced during COVID 19</p>
                                    <a>{pgFormBankDetails?.remarks}</a>
                                </Col>
                            </Row>
                        </div>
                        {/* <Col lg="12" className="p-3">
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
                                        <a>{data?.activityTimelineData?.label}</a>
                                    </Col>
                                </Row>
                                ))
                            }

                            <Row className="mb-3" className="activity-shadow">
                                <Col lg="4">
                                    <a className="fw-700">Total Amount Required</a>
                                </Col>
                                <Col lg="6">
                                    <a className="fw-700">Rs {pgFormProposedActivity.filter(data => data.amtReq).reduce((acc, value) => {
                        return acc + parseInt(value.amtReq)
                    }, 0).toLocaleString('en-IN')}</a>
                                </Col>
                            </Row>
                        </Col> */}
                        <Col lg="8" className="view-document">
                            <h3 className="mb-3">Documents</h3>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.firstResolutionofPGEG[0]?.docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>First Resolution copy of PG/ EG</a>
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
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument.copyofBankPassbook[0]?.docUrl)}>
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Copy of bank passbook</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.businessPlan[0]?.docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Current/ new Business activity status report/ Business Plan</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.existingLoanRepay[0]?.docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Existing loan repayment status (if any)</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.applyingLoan[0]?.docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>Copy of resolution mentioning applying for loan</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="d-flex align-items-center  cursor-pointer" onClick={() => window.open(pgFormUploadDocument?.listofOfficeBearers[0]?.docUrl)} >
                                        <img src={app} alt="download" className="app mr-2"></img>
                                        <a>List of Office Bearers</a>
                                        <span className="ml-auto">  <img src={download} alt="download"></img></span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col lg="10">
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
                        </Col> */}    
                    </div>
                </div>
                
            </>
    );
}

export default producerGroup;