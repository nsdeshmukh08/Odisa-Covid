import React from 'react';
import { Row, Col } from 'reactstrap';
import { formatDate,calculateAge } from 'helpers/momentHelpers'
import { formatToINR,populateData } from 'helpers'
import download from 'assets/images/download.svg'
import FormInput from 'component/inputs/FormInput';
import app from 'assets/images/app.svg'
import { ThemeContext } from "helpers"

const getValueHelper = (data,field,key='label') =>{
    return data[field] ?data[field][key]:'-' 
}
const ArrayDisplayHelper = (data,field,key) =>{
    return data[field].map((v)=>(v[key] ?v[key].label:'-') ).join(',')       
}
const trueFalseConverter = (data) =>{
    return data ? 'Yes' : 'No'
}
const SymrDetails = ({ basicDetails,symrShgDetails,symrSkillTraining,symrEnterprise,symrBankDetails, symrProposedActivity, symrExistingLoan, symrUploadDocument }) => {
    // const SymrDetails = (props) => {

    // console.log(props,"props^^^^^^^^^")
    return (
        <ThemeContext.Consumer>
             {(themeData) => {
                 return(
                    <div className="container bg-white mt-3 view-main">
                    <Row className="border-bottom p-4" >
                        <Col className="p-0">
                            <h2 className="fw-700 m-0">All Details</h2>
                        </Col>
                    </Row>
                    <div className="application-detail">
                        <h3 className="ml-3 pt-4 mb-0"> Basic Details</h3>
                        <Row className="p-3">
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.mobileNumber}</p>
                                <a>{basicDetails?.mobileNumber}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.sourceOfInformation}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'sourceOfInfoData') }</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.nameOfYouth}</p>
                                <a>{basicDetails?.name}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.address}</p>
                                <a>{basicDetails?.address}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.fatherAndHusbandName}</p>
                                <a>{basicDetails?.fatherName}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.dob}</p>
                                <a>{basicDetails?.dateOfBirth}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.age}</p>
                                <a>{basicDetails?.age}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.gender}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'genderData')}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.religion}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'religionData')}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.community}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'communityData')}</a>
                            </Col>
                            <Col className="mb-3" md="4" className="mb-4">
                                <p>{themeData.educationQualification}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'educQualificationData')}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0"> Location</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.district}</p>
                                <a>{basicDetails?.district?.label}</a>
                            </Col>
                            <Col>
                                <p>{themeData.block}</p>
                                <a>{basicDetails?.block?.label}</a>
                            </Col>
                            <Col >
                                <p>{themeData.panchayat}</p>
                                <a>{basicDetails?.panchayat?.label}</a>
                            </Col>
                            <Col >
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">ID Proof</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.govtIDProofTypeForAddress}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'proofTypeData')}</a>
                            </Col>
                            <Col>
                                <p>{themeData.govtIDNumber}</p>
                                <a>{basicDetails?.govtIdNumber}</a>
                            </Col>
                            <Col >                                            
                            </Col>
                            <Col >
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">Migration Details</h3>
                        <Row className="p-3 border-bottom">
                            <Col md="4" className="mb-4">
                                <p>{themeData.natureOfMigration}</p>
                                <a>{basicDetails && getValueHelper(basicDetails,'natureOfMigrationData')}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.nameOfThePlaceReturnedFrom}</p>
                                <a>{basicDetails?.placeReturnFrom}</a>
                            </Col>
                            <Col >   
                                <p>{themeData.previousOccupationOfTheMigrationReturnee}</p>
                                <a>{basicDetails?.previousOccupation}</a>                                         
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.migrationWomenHeadedHouse}</p>
                                <a>{basicDetails && trueFalseConverter(basicDetails.isWomeHeaded)}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.applicantBelongToVulnerable}</p>
                                <a>{basicDetails && trueFalseConverter(basicDetails.isVulnerableCategory)}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.shgTitle}</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.memberType}</p>
                                <a>{symrShgDetails && getValueHelper(symrShgDetails,'shgMemberTypeData')}</a>
                            </Col>
                            <Col>
                                <p>{themeData.relationShipType}</p>
                                <a>{symrShgDetails && getValueHelper(symrShgDetails,'relationshipTypeData')}</a>
                            </Col>
                                
                            <Col >     
                                    <p>{themeData.shgName}</p>
                                <a>{symrShgDetails?.shgName}</a>                     
                            </Col>
                            <Col >
                                <p>{themeData.eMathiCode}</p>
                                <a>{symrShgDetails?.eMathiCode}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.skillTraining}</h3>
                        <Row className="p-3">
                            <Col>
                                <p>{themeData.whetherUnderGoneSkill}</p>
                                <a>{symrSkillTraining && trueFalseConverter(symrSkillTraining?.isSkillTrained)}</a>
                            </Col>
                            <Col>
                                <p>{themeData.trainingInstitute}</p>
                                <a>{symrSkillTraining?.trainingInstitute}</a>
                            </Col>
                                
                            <Col >     
                                    <p>{themeData.schemeName}</p>
                                <a>{symrSkillTraining && getValueHelper(symrSkillTraining,'skilltrainingData','label')}</a>                     
                            </Col>
                            <Col >
                                <p>{themeData.specifyOther}</p>
                                <a>{symrSkillTraining?.specifyOther}</a>
                            </Col>
                        </Row>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.NameofTheCourse}</p>
                                <a>{symrSkillTraining?.courseName}</a>
                            </Col>
                            <Col>
                                <p>{themeData.yearOfCourseCompletion}</p>
                                <a>{symrSkillTraining && getValueHelper(symrSkillTraining,'courseCompletionTypeData','label')   }</a>
                            </Col>
                                
                            <Col >        
                            </Col>
                            <Col >
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.enterpreneurDevelopment}</h3>
                        <Row className="p-3 ">
                            <Col>
                                <p>{themeData.completedAnyEDP}</p>
                                <a>{symrSkillTraining && trueFalseConverter(symrSkillTraining?.isCompletedEdpProgramme)}</a>
                            </Col>
                            <Col>
                                <p>{themeData.nameOfInstitute}</p>
                                <a>{symrSkillTraining?.edpCompletedInstituteName}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.schemeName}</p>
                                <a>{symrSkillTraining && getValueHelper(symrSkillTraining,'edpschemeData','label')}</a>        
                            </Col>
                            <Col >
                                <p>{themeData.NameofTheCourse}</p>
                                <a>{symrSkillTraining?.edpCompletedCourseName}</a>
                            </Col>
                        </Row>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.registerdAmyEDP}</p>
                                <a>{symrSkillTraining && trueFalseConverter(symrSkillTraining?.isRegisteredEdpProgramme)}</a>
                            </Col>
                            <Col>
                                <p>{themeData.nameOfInstitute}</p>
                                <a>{symrSkillTraining?.edpRegisteredInstituteName}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.schemeName}</p>
                                <a>{symrSkillTraining && getValueHelper(symrSkillTraining,'registeredEdpSchemeData','label')}</a>        
                            </Col>
                            <Col >
                                <p>{themeData.NameofTheCourse}</p>
                                <a>{symrSkillTraining?.edpRegisteredCourseName}</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.enterprise}</h3>
                        <Row className="p-3 ">
                            <Col>
                                <p>{themeData.enterpriseForWichGrant}</p>
                                <a>{symrEnterprise?.grantenterpriseName}</a>
                            </Col>
                            <Col>
                                <p>{themeData.typeOfEnterprise}</p>
                                <a>{symrEnterprise && getValueHelper(symrEnterprise,'enterpriseTypeData')}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.activityForWhichGrant}</p>
                                <a>{symrEnterprise?.grantActivityName}</a>        
                            </Col>
                            <Col >
                                <p>{themeData.typeOfActivity}</p>
                                <a>{symrEnterprise && ArrayDisplayHelper(symrEnterprise,'symrTypes','symrTypesData')}</a>
                            </Col>
                        </Row>
                        <Row className="p-3 ">
                            <Col>
                                <p>{themeData.activitySector}</p>
                                <a>{symrEnterprise && ArrayDisplayHelper(symrEnterprise,'symrSectorTypes','symrSectorTypesData')}</a>
                            </Col>
                            <Col>
                                <p>{themeData.TypeOfCommodity}</p>
                                <a>{symrEnterprise && ArrayDisplayHelper(symrEnterprise,'symrCommodityTypes','symrCommodityTypesData')}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.summaryOfEnterprise}</p>
                                <a>{symrEnterprise?.summary}</a>        
                            </Col>
                            <Col >
                                <p>{themeData.noOfPersonsExpected}</p>
                                <a>{symrEnterprise?.noOfPersons}</a>
                            </Col>
                        </Row>
                        <Row className="p-3 ">
                            <Col>
                                <p>{themeData.anyPriorExperience}</p>
                                <a>{symrEnterprise && trueFalseConverter(symrEnterprise?.isExperiencedEnterpreneur)}</a>
                            </Col>
                            <Col>
                                <p>{themeData.howManyYears}</p>
                                <a>{symrEnterprise?.enterpreneurExpYears}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.whetherEmployedInSimilar}</p>
                                <a>{symrEnterprise && trueFalseConverter(symrEnterprise?.isEmployedInActivity)}</a>        
                            </Col>
                            <Col >
                                <p>{themeData.howManyYears}</p>
                                <a>{symrEnterprise?.activityExpYears}</a>
                            </Col>
                        </Row>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.inWhatCapacity}</p>
                                <a>{symrEnterprise?.designation}</a>
                            </Col>
                            <Col>
                                <p>{themeData.whichLocation}</p>
                                <a>{symrEnterprise?.location}</a>
                            </Col> 
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.previousLoan}</h3>
                        <Row className="p-3 border-bottom">
                            <Col>
                                <p>{themeData.alreadyAppliedForNewBuisness}</p>
                                {/* <a>{symrEnterprise?.isLoanAppliedPreviously}</a> */}
                                <a>{symrEnterprise && trueFalseConverter(symrEnterprise?.isLoanAppliedPreviously)}</a>
                            </Col>
                            <Col>
                                <p>{themeData.schemeName}</p>
                                <a>{symrEnterprise?.schemeName}</a>
                            </Col>  
                            <Col >
                                <p>{themeData.amount}</p>
                                <a>{symrEnterprise?.schemeAmount}</a>        
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">Your Bank Details</h3>
                        <Row className="p-3 ">
                            <Col md="4" className="mb-4">
                                <p>{themeData.accountNumber}</p>
                                <a>{symrBankDetails?.accNumber}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.confirmAccountNumber}</p>
                                <a>{symrBankDetails?.accNumber}</a>
                            </Col>  
                            <Col md="4" className="mb-4">
                                <p>{themeData.accountName}</p>
                                <a>{symrBankDetails?.accName}</a>        
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.bank}</p>
                                <a>{symrBankDetails?.bnkName}</a>     
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.branch}</p>
                                <a>{symrBankDetails?.branchName}</a>
                            </Col>
                            <Col md="4" className="mb-4">
                                <p>{themeData.IFSCCode}</p>
                                <a>{symrBankDetails?.ifscCode}</a>
                            </Col>  
                            <Col md="4" className="mb-4"> 
                                <p>{themeData.isThisAccountLinkedWithAdhar}</p>
                                <a>{symrBankDetails && trueFalseConverter(symrBankDetails?.isAccLinkAadhar) }</a>
                            </Col>
                        </Row>
                        <h3 className="ml-3 pt-4 mb-0">{themeData.proposedActivityAndFund}</h3>
                        {symrProposedActivity?.map(({ activityName, activityTimelineData, activityTimeLineVal, amtReq }, index) => {
                            let length = symrProposedActivity.length;
                            return (
                                <Row  key={"activity_and_fund_" + index} className={`p-3 ${index === length - 1 && "border-bottom"}`}>
                                    <Col > 
                                        {index === 0 && <p>{themeData.activity}</p>}
                                        <a>{activityName}</a>
                                    </Col>
                                    <Col > 
                                        {index === 0 && <p>{themeData.timeline}</p>}
                                        <a>{activityTimeLineVal + " " + activityTimelineData}</a>
                                    </Col>
                                    <Col > 
                                        {index === 0 && <p>{themeData.amountRequired}</p>}
                                        <a>{amtReq}</a>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>
                            )
                        })}
    
                        <h3 className="ml-3 pt-4 mb-0">{themeData.existingLoan}</h3>
                        <Row className="p-3 ">
                            <Col>
                                <p>Is Existing Loan</p>
                                <a>{symrExistingLoan?.isExistingLoan ? 'Yes' : 'No'}</a>
                            </Col>
                        </Row>
                        {symrExistingLoan?.existingLoanList?.map(({
                            loanSource,
                            loanReceivedDate,
                            loanAmount,
                            interestRate,
                            amountToBeRepaid,
                            amountRepaid,
                            balanceAmtToBeRepaid,
                            reason
                        }, index) => {
                            let length = symrExistingLoan?.existingLoanList.length;
                            return (
                                <div key={"loan_source_" + index}>
                                    <Row className={`p-3 ${index === length - 1 && "border-bottom"}`}>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.loanSource}</p>}
                                            <a>{loanSource}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.dateOfLoanReceived}</p>}
                                            <a>{loanReceivedDate}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.loanAmount}</p>}
                                            <a>{loanAmount}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.interestRate}</p>}
                                            <a>{interestRate}</a>
                                        </Col>
                                    {/* </Row>
                                    <Row className="p-3 "> */}
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.amountToBeRepaid}</p>}
                                            <a>{amountToBeRepaid}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.amountRepaid}</p>}
                                            <a>{amountRepaid}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.balanceAmountToRepaid}</p>}
                                            <a>{balanceAmtToBeRepaid}</a>
                                        </Col>
                                        <Col md="4" className="mb-4">
                                            {index === 0 && <p>{themeData.reasonForTheDelay}</p>}
                                            <a>{reason}</a>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                        <div className="view-document col-lg-6 pt-3">
                            <h3 className="mb-3">Upload documents</h3>
                            {symrUploadDocument?.proofOfMigration?.map(({ docUrl, docName }) => {
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img src={download} onClick={() => window.open(docUrl)} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {symrUploadDocument?.applicationLetter?.map(({ docUrl, docName }) => {
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img src={download} onClick={() => window.open(docUrl)} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {symrUploadDocument?.bankPassBook?.map(({ docUrl, docName }) => {
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img src={download} onClick={() => window.open(docUrl)} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {symrUploadDocument?.idProofPhoto?.map(({ docUrl, docName }) => {
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img src={download} onClick={() => window.open(docUrl)} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {symrUploadDocument?.businessPlan?.map(({ docUrl, docName }) => {
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img src={download} onClick={() => window.open(docUrl)} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            {symrUploadDocument?.trainingCertificate.map(({ docUrl, docName }) => {
                                console.log( docUrl, docName,"myDatas")
                                return (
                                    <Row className="mb-3">
                                        <Col >
                                            <div className="d-flex align-items-center  cursor-pointer">
                                                <img src={app}  alt={docName} className="app mr-2"></img>
                                                <a>{docName}</a>
                                                <span className="ml-auto">  <img onClick={() => window.open(docUrl)} src={download} alt="download"></img></span>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                            
                        </div>
                        <Col lg="10">
                            <Row className="mt-4">
                                <Col className="view-textarea">
                                    <FormInput
                                        type="textarea"
                                        label={themeData.remarkChallangesFaced}
                                        name="remarks"
                                        value={symrUploadDocument?.remarks}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </div> 
                </div>
            
                 )
             }}
            </ThemeContext.Consumer>
    );
}

export default SymrDetails;