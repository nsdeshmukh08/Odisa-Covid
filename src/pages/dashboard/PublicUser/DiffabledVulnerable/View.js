import React, { Component, useContext , Fragment} from 'react'
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
import { ThemeContext } from "helpers"

class diffabledView extends Component {

    state = {
        basicDetails: {
            formId: 1,
            mobileNumber: "8428229990",
            sourceInfo: 1,
            name: "eshwar",
            fatherName: "eee",
            address: "eshwar",
            gender: 1,
            religion: 2,
            community: 1,
            educationQualification: 1,
            proofType: 3,
            natureOfMigration: 4,
            dateOfBirth: "2020-07-22",
            age: 34,
            govtIdNumber: 234234,
            placeReturnFrom: "chennai",
            previousOccupation: "worker",
            isWomeHeaded: true,
            isVulnerableCategory: true,
            districtId: 1,
            blockId: 1,
            panchayatId: 1,
        },
        symrShgDetails: {
            "formId":1,
            "shgMemberType": 1,
            "relationshipType":1,
            "shgName": "eshwar",
            "eMathiCode": "34242erwer"
        },
        symrSkillTraining: {
            "formId":1,
            "isSkillTrained": true,
            "trainingInstitute":"jee",
            "skillTrainingScheme": 2,
            "courseName": "python",
            "courseCompletionYear": 1,
            "isCompletedEdpProgramme": true,
            "edpCompletedInstituteName": "doodle",
            "edpCompletedCourseName": "java",
            "edpScheme": 2,
            "isRegisteredEdpProgramme": true,
            "edpRegisteredInstituteName": "doodle202",
            "edpRegisteredCourseName": "js",
            "registeredEdpScheme": 2,
            "specifyOther":"ejroijro"
        },
        symrEnterprise: {
            "formId":1,
            "grantenterpriseName": "enerprise",
            "enterpriseType":3,
            "grantActivityName": "eshwr",
            "symrTypes": [
                    {
                    "value": 1
                    },
                    {
                        "value": 2
                    }
            ],
            "symrCommodityTypes": [
                        {
                        "value": 1
                        },
                        {
                            "value": 2
                        }
                    ],
            "symrSectorTypes": [
                {
                "value": 1
                },
                {
                "value": 2
                }
            ],
            "summary": "doodle",
            "noOfPersons": 1,
            "isExperiencedEnterpreneur": true,
            "enterpreneurExpYears": 2,
            "isEmployedInActivity": true,
            "activityExpYears": 2,
            "designation": "velaikaran",
            "location":"chennai",
            "isLoanAppliedPreviously": true,
            "schemeAmount": 33000,
            "schemeName": "aadi ooffr"
        },
        symrBankDetails: {
            "formId":1,
            "accNumber": "123456",
            "accName": "ASdad",
            "bnkName": "Asdasd",
            "branchName": "asdad",
            "ifscCode": "Asdas",
            "isAccLinkAadhar":1
        },
        symrProposedActivity: [
            {
                "formId":1,
                  "activityTimelineData": {"label" : "Days", "value": '1'},
                  "activityName": "21313",
                  "activityTimeLine": 1,
                  "activityTimeLineVal": 1,
                  "amtReq": 1212
              },
              {
                "formId":20,
                "activityTimelineData": {"label" : "Days", "value": '1'},
                  "activityName": "11111",
                  "activityTimeLine": 2,
                  "activityTimeLineVal": 23,
                  "amtReq": 1212
              }
        ],
        symrExistingLoan: {
            "isExistingLoan": true,
            "formId":1,
            "existingLoanList":[
                {
                    "loanSource": "wrwr",
                    "loanReceivedDate": 33,
                    "loanAmount": 1000,
                    "interestRate": 12.12,
                    "amountToBeRepaid": 1212,
                    "amountRepaid": 1212,
                    "balanceAmtToBeRepaid": 1212,
                    "reason": "covid "
                },
                {
                    "loanSource": "lkfelf",
                    "loanReceivedDate": 33,
                    "loanAmount": 1000,
                    "interestRate": 12.12,
                    "amountToBeRepaid": 1212,
                    "amountRepaid": 1212,
                    "balanceAmtToBeRepaid": 1212,
                    "reason": "erwrwf "
                }
            ]
        },
        uploadDocuments: {
            "formId":1,
            "proofOfMigration": [],
            "applicationLetter": [],
            "bankPassBook": [],
            "idProofPhoto": [],
            "businessPlan": [],
            "trainingCertificate": [],
            "remarks": "sdsdf"
        },
       
        cancelToken: axios.CancelToken.source(),
        status: null,
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
          ...API_BOOK.APPLICATION.GET_SYMR_FORM_DETAILS,
          params: {
            formId : params.formId
        },
          cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if(response.status === 200)
            this.setState({
                ...response.data.data,
                uploadDocuments: response.data.data.symrUploadDocument
            })
        else
            toast(response.data.message,'error')

        this.setState({
            isLoading : false
        })

    }

    getValueHelper = (data,field,key='label') =>{
            return data[field] ?data[field][key]:'-' 
    }

    trueFalseConverter = (data) =>{
        return data ? 'Yes' : 'No'
    }

    ArrayDisplayHelper = (data,field,key) =>{
        return data[field].map((v)=>(v[key] ?v[key].label:'-') ).join(',')       
    }

    render() {
        const {
            basicDetails,
            symrShgDetails,
            symrSkillTraining,
            symrEnterprise,
            symrBankDetails,
            symrProposedActivity,
            symrExistingLoan,
            uploadDocuments,
            formId,
            isLoading,
            status,
            disbursmentUc
        } = this.state
        console.log(this.state)
        if(isLoading)
            return <Loader className="h-100"/>
        return (
            <ThemeContext.Consumer>
                {(themeData) => {
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
                                            {(status === 2 || status === 3) && <li className="pending">
                                                <span class="custom-caret submit-icon mr-2"></span>
                                                <p>Pending for department verification</p>
                                            </li>}
                                            {(status === 4 || status === 5) &&
                                                <Fragment>
                                                    <li className="mb-4 submit">
                                                        <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                                        <p className="mb-0">Application Approved</p>
                                                        <a>Application Approved on : {moment().format('DD / MM / YYYY')}</a>
                                                    </li><li className="pending">
                                                        <span class="custom-caret submit-icon mr-2"></span>
                                                        <p>Loan amount Disbursement</p></li>
                                                </Fragment>}
                                            {status === 6 &&
                                                <Fragment>
                                                    <li className="mb-4 submit">
                                                        <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                                        <p className="mb-0">Application Approved</p>
                                                        <a>Application Approved on : {moment().format('DD / MM / YYYY')}</a>
                                                    </li>
                                                    <li className="">
                                                        <span class="custom-caret submit-icon mr-2"><i class="icon-tick"></i></span>
                                                        <p className="mb-0">Loan Amount Disbursed</p>
                                                        <a>Amount Disbursed on : {moment(disbursmentUc?.disbursmentSubmitDate).format('DD / MM / YYYY')}</a><br />
                                                        {/* <a>Disbursed Amount : {firstTranche?.disbursmentAmount}</a><br /> */}
                                                        <a>Bank : {symrBankDetails?.bnkName}</a><br />
                                                        <a>Account Number : {symrBankDetails?.accNumber && `********* ${symrBankDetails?.accNumber.substr(symrBankDetails?.accNumber?.length - 4)}`}</a><br />
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
                                    <Row className="p-3 ">
                                        <Col>
                                            <p>{themeData.mobileNumber}</p>
                                            <a>{basicDetails?.mobileNumber}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.sourceOfInformation}</p>
                                            <a>{this.getValueHelper(basicDetails,'sourceOfInfoData') }</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.nameOfYouth}</p>
                                            <a>{basicDetails?.name}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.address}</p>
                                            <a>{basicDetails?.address}</a>
                                        </Col>
                                    </Row>
                                    <Row className="p-3">
                                        <Col>
                                            <p>{themeData.fatherAndHusbandName}</p>
                                            <a>{basicDetails?.fatherName}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.dob}</p>
                                            <a>{basicDetails?.dateOfBirth}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.age}</p>
                                            <a>{basicDetails?.age}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.gender}</p>
                                            <a>{this.getValueHelper(basicDetails,'genderData')}</a>
                                        </Col>
                                    </Row>
                                    <Row className="p-3">
                                        <Col>
                                            <p>{themeData.religion}</p>
                                            <a>{this.getValueHelper(basicDetails,'religionData')}</a>
                                        </Col>
                                        <Col>
                                            <p>other Religion</p>
                                            <a>{basicDetails?.otherReligion !== null ? basicDetails.otherReligion : '-'}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.community}</p>
                                            <a>{this.getValueHelper(basicDetails,'communityData')}</a>
                                        </Col>
                                        <Col>
                                            <p>Other Community </p>
                                            <a>{basicDetails?.otherCommunity !== null ? basicDetails.otherCommunity : '-'}</a>
                                        </Col>
                                    </Row>
                                    <Row  className="p-3 border-bottom">
                                         <Col md="3" >
                                            <p>{themeData.educationQualification}</p>
                                            <a>{this.getValueHelper(basicDetails,'educQualificationData')}</a>
                                        </Col>
                                        <Col md="3">
                                            <p>Other Education Qualification</p>
                                            <a>{basicDetails?.otherEduQualification !== null ? basicDetails.otherEduQualification : '-'}</a>
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
                                            <a>{this.getValueHelper(basicDetails,'proofTypeData')}</a>
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
                                        <Col>
                                            <p>{themeData.natureOfMigration}</p>
                                            <a>{this.getValueHelper(basicDetails,'natureOfMigrationData')}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.nameOfThePlaceReturnedFrom}</p>
                                            <a>{basicDetails?.placeReturnFrom}</a>
                                        </Col>
                                        <Col >   
                                            <p>{themeData.previousOccupationOfTheMigrationReturnee}</p>
                                            <a>{basicDetails?.previousOccupation}</a>                                         
                                        </Col>
                                    </Row>
                                    <h3 className="ml-3 pt-4 mb-0">Migration Details</h3>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.migrationWomenHeadedHouse}</p>
                                            <a>{this.trueFalseConverter(basicDetails.isWomeHeaded)}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.applicantBelongToVulnerable}</p>
                                            <a>{this.trueFalseConverter(basicDetails.isVulnerableCategory)}</a>
                                        </Col>
                                    </Row>
                                    <h3 className="ml-3 pt-4 mb-0">{themeData.shgTitle}</h3>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.memberType}</p>
                                            <a>{this.getValueHelper(symrShgDetails,'shgMemberTypeData')}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.relationShipType}</p>
                                            <a>{this.getValueHelper(symrShgDetails,'relationshipTypeData')}</a>
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
                                            <a>{this.trueFalseConverter(symrSkillTraining.isSkillTrained)}</a>
                                        </Col>
                                        {symrSkillTraining.isSkillTrained && <>
                                        <Col>
                                            <p>{themeData.trainingInstitute}</p>
                                            <a>{symrSkillTraining?.trainingInstitute}</a>
                                        </Col>
                                            
                                        <Col >     
                                             <p>{themeData.schemeName}</p>
                                            <a>{this.getValueHelper(symrSkillTraining,'skilltrainingData','label')}</a>                     
                                        </Col>
                                        <Col >
                                            <p>Others Skill Training</p>
                                            <a>{symrSkillTraining?.otherSkillTrainingScheme !== null ? symrSkillTraining?.otherSkillTrainingScheme  : '-'}</a>
                                        </Col></>}
                                    </Row>
                                    {symrSkillTraining.isSkillTrained && <>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.NameofTheCourse}</p>
                                            <a>{symrSkillTraining?.courseName}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.yearOfCourseCompletion}</p>
                                            <a>{this.getValueHelper(symrSkillTraining,'courseCompletionTypeData','label')   }</a>
                                        </Col>
                                            
                                        <Col >        
                                    </Col>
                                    </Row></>}
                                    <h3 className="ml-3 pt-4 mb-0">{themeData.enterpreneurDevelopment}</h3>
                                    <Row className="p-3 ">
                                        <Col>
                                            <p>{themeData.completedAnyEDP}</p>
                                            <a>{this.trueFalseConverter(symrSkillTraining.isCompletedEdpProgramme)}</a>
                                        </Col>
                                        {symrSkillTraining.isCompletedEdpProgramme && <>
                                        <Col>
                                            <p>{themeData.nameOfInstitute}</p>
                                            <a>{symrSkillTraining.edpCompletedInstituteName}</a>
                                        </Col>  
                                        <Col >
                                            <p>{themeData.schemeName}</p>
                                            <a>{this.getValueHelper(symrSkillTraining,'edpschemeData','label')}</a>        
                                        </Col>
                                        <Col >
                                            <p>Others Schemas Name</p>
                                            <a>{symrSkillTraining?.otherEdpScheme !== null ? symrSkillTraining?.otherEdpScheme : '-'}</a>
                                        </Col>
                                        <Col >
                                            <p>{themeData.NameofTheCourse}</p>
                                            <a>{symrSkillTraining?.edpCompletedCourseName}</a>
                                        </Col> </>}
                                    </Row>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.registerdAmyEDP}</p>
                                            <a>{this.trueFalseConverter(symrSkillTraining?.isRegisteredEdpProgramme)}</a>
                                        </Col>
                                        {symrSkillTraining?.isRegisteredEdpProgramme && <>
                                        <Col>
                                            <p>Name of the institution</p>
                                            <a>{symrSkillTraining?.edpRegisteredInstituteName}</a>
                                        </Col>  
                                        <Col >
                                            <p>{themeData.schemeName}</p>
                                            <a>{this.getValueHelper(symrSkillTraining,'registeredEdpSchemeData','label')}</a>        
                                        </Col>
                                        <Col >
                                            <p>Others Schemas Name</p>
                                            <a>{symrSkillTraining?.otherRegisteredEdpScheme !== null ? symrSkillTraining?.otherRegisteredEdpScheme : '-'}</a>
                                        </Col>
                                        <Col >
                                            <p>{themeData.NameofTheCourse}</p>
                                            <a>{symrSkillTraining?.edpRegisteredCourseName}</a>
                                        </Col> </>
                                        }   
                                    </Row>
                                    <h3 className="ml-3 pt-4 mb-0">{themeData.enterprise}</h3>
                                    <Row className="p-3 ">
                                        <Col>
                                            <p>{themeData.enterpriseForWichGrant}</p>
                                            <a>{symrEnterprise?.grantenterpriseName}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.typeOfEnterprise}</p>
                                            <a>{this.getValueHelper(symrEnterprise,'enterpriseTypeData')}</a>
                                        </Col>  
                                        <Col >
                                            <p>{themeData.activityForWhichGrant}</p>
                                            <a>{symrEnterprise?.grantActivityName}</a>        
                                        </Col>
                                        <Col >
                                            <p>{themeData.typeOfActivity}</p>
                                            <a>{this.ArrayDisplayHelper(symrEnterprise,'symrTypes','symrTypesData')}</a>
                                        </Col>
                                    </Row>
                                    <Row className="p-3 ">
                                        <Col>
                                            <p>{themeData.activitySector}</p>
                                            <a>{this.ArrayDisplayHelper(symrEnterprise,'symrSectorTypes','symrSectorTypesData')}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.TypeOfCommodity}</p>
                                            <a>{this.ArrayDisplayHelper(symrEnterprise,'symrCommodityTypes','symrCommodityTypesData')}</a>
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
                                            <a>{ this.trueFalseConverter(symrEnterprise.isExperiencedEnterpreneur)}</a>
                                        </Col>
                                        { symrEnterprise.isExperiencedEnterpreneur && 
                                        <Col>
                                            <p>{themeData.howManyYears}</p>
                                            <a>{symrEnterprise?.enterpreneurExpYears}</a>
                                        </Col>  
                                        }
                                        <Col >
                                            <p>{themeData.whetherEmployedInSimilar}</p>
                                            <a>{this.trueFalseConverter(symrEnterprise.isEmployedInActivity)}</a>        
                                        </Col>
                                        {symrEnterprise.isEmployedInActivity && 
                                        <Col >
                                            <p>{themeData.howManyYears}</p>
                                            <a>{symrEnterprise?.activityExpYears}</a>
                                        </Col>
                                        }
                                    </Row>
                                    {symrEnterprise.isEmployedInActivity && 
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
                                    }
                                    <h3 className="ml-3 pt-4 mb-0">{themeData.previousLoan}</h3>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.alreadyAppliedForNewBuisness}</p>
                                            <a>{this.trueFalseConverter(symrEnterprise?.isLoanAppliedPreviously)}</a>
                                        </Col>
                                        {symrEnterprise?.isLoanAppliedPreviously && <>
                                        <Col>
                                            <p>{themeData.schemeName}</p>
                                            <a>{symrEnterprise?.schemeName}</a>
                                        </Col>  
                                        <Col >
                                            <p>{themeData.amount}</p>
                                            <a>{symrEnterprise?.schemeAmount}</a>        
                                        </Col> </> }
                                    </Row>
                                    <h3 className="ml-3 pt-4 mb-0">Your Bank Details</h3>
                                    <Row className="p-3 ">
                                        <Col>
                                            <p>{themeData.accountNumber}</p>
                                            <a>{symrBankDetails?.accNumber}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.confirmAccountNumber}</p>
                                            <a>{symrBankDetails?.accNumber}</a>
                                        </Col>  
                                        <Col >
                                            <p>{themeData.accountName}</p>
                                            <a>{symrBankDetails?.accName}</a>        
                                        </Col>
                                        <Col >
                                            <p>{themeData.bank}</p>
                                            <a>{symrBankDetails?.bnkName}</a>     
                                        </Col>
                                    </Row>
                                    <Row className="p-3 border-bottom">
                                        <Col>
                                            <p>{themeData.branch}</p>
                                            <a>{symrBankDetails?.branchName}</a>
                                        </Col>
                                        <Col>
                                            <p>{themeData.IFSCCode}</p>
                                            <a>{symrBankDetails?.ifscCode}</a>
                                        </Col>  
                                        <Col > 
                                            <p>{themeData.isThisAccountLinkedWithAdhar}</p>
                                            <a>{this.trueFalseConverter(symrBankDetails.isAccLinkAadhar) }</a>
                                        </Col>
                                        <Col >
                                        </Col>
                                    </Row>
                                    <h3 className="ml-3 pt-4 mb-0">{themeData.proposedActivityAndFund}</h3>
                                    {symrProposedActivity?.map(({ activityName,activityTimelineData, activityTimeLineVal, amtReq }, index) => {
                                        let length = symrProposedActivity.length;
                                        return (
                                            <Row  key={"activity_and_fund_" + index} className={`p-3 ${index === length - 1 && "border-bottom"}`}>
                                                <Col > 
                                                    {index === 0 && <p>{themeData.activity}</p>}
                                                    <a>{activityName}</a>
                                                </Col>
                                                <Col > 
                                                    {index === 0 && <p>{themeData.timeline}</p>}
                                                    <a>{activityTimeLineVal + " " + activityTimelineData?.label}</a>
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
                                            <p>Existing Loan</p>
                                            <a>{symrExistingLoan?.isExistingLoan.toString()}</a>
                                        </Col>
                                        <Col>
                                        </Col>  
                                        <Col >
                                        </Col>
                                        <Col >
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
                                                    <Col>
                                                        {index === 0 && <p>{themeData.loanSource}</p>}
                                                        <a>{loanSource}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.dateOfLoanReceived}</p>}
                                                        <a>{loanReceivedDate}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.loanAmount}</p>}
                                                        <a>{loanAmount}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.interestRate}</p>}
                                                        <a>{interestRate}</a>
                                                    </Col>
                                                {/* </Row>
                                                <Row className="p-3 "> */}
                                                    <Col>
                                                        {index === 0 && <p>{themeData.amountToBeRepaid}</p>}
                                                        <a>{amountToBeRepaid}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.amountRepaid}</p>}
                                                        <a>{amountRepaid}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.balanceAmountToRepaid}</p>}
                                                        <a>{balanceAmtToBeRepaid}</a>
                                                    </Col>
                                                    <Col>
                                                        {index === 0 && <p>{themeData.reasonForTheDelay}</p>}
                                                        <a>{reason}</a>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })}
                                    <div className="view-document col-lg-4 pt-3">
                                        <h3 className="mb-3">Upload documents</h3>
                                        {uploadDocuments?.proofOfMigration?.map(({ docUrl, docName }) => {
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
                                        {uploadDocuments?.applicationLetter?.map(({ docUrl, docName }) => {
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
                                        {uploadDocuments?.bankPassBook?.map(({ docUrl, docName }) => {
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
                                        {uploadDocuments?.idProofPhoto?.map(({ docUrl, docName }) => {
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
                                        {uploadDocuments?.businessPlan?.map(({ docUrl, docName }) => {
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
                                        {uploadDocuments?.trainingCertificate.map(({ docUrl, docName }) => {
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
                                    <Col lg="6">
                                        <Row className="mt-4">
                                            <Col className="view-textarea">
                                                <FormInput
                                                    type="textarea"
                                                    label={themeData.remarkChallangesFaced}
                                                    name="remarks"
                                                    value={uploadDocuments?.remarks}
                                                    readOnly={true}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    

                                </div> 
                            </div>
                        </>
                    )
                }}
            </ThemeContext.Consumer>
        )
    }
}

export { diffabledView }