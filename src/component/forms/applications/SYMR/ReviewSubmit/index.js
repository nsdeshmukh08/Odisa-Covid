import React, { Component } from 'react';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/symr';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import BasicDetailsForm from "../BasicDetails/BasicDetailForm"
import SHGForm from "../SHG/SHGForm"
import SkillAndEdpForm from "../SkillAndEDP/SkillAndEdp"
import EnterpriseActivityForm from "../EnterpriseActivity/EnterpriseActivityForm"
import BankDetailsForm from '../BankDetails/BankDetailsForm'
import ActivityForm from '../Activity/ActivityForm'
import ExistingLoanForm from "../ExistingLoan/ExistingLoanForm"
import UploadForm from '../Upload/UploadForm'
import { calcAgeInYear } from 'helpers/momentHelpers'
import { STAFF_ROLE_ID } from 'helpers/variables'
import { ConfirmationModal } from "component/Model"

const { UPLOAD_DOC_API, GET_SYMR_FORM_SUBMIT, GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION;

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;


class ReviewSubmitClass extends Component {

    defaultActivityObject = {
        formId: localStorage.getItem('createAppformId'),
        "loanSource": null,
        "loanReceivedDate": null,
        "loanAmount": null,
        "interestRate": null,
        "amountToBeRepaid": null,
        "amountRepaid": null,
        "balanceAmtToBeRepaid": null,
        "reason": null

    }

    state = {
        //BASIC
        basicDetails: {
            "formId": undefined,
            "mobileNumber": null,
            "name": "",
            "fatherName": "",
            "address": null,
            "gender": null,
            "community": null,
            dateOfBirth: null,
            age: null,
            aadharNumber: null,
            isVulnerable: null,
            isVulnerableType: null,
            isDifferentlyAbled: null,
            applicationCategory: null,
            uploadCertificate: null,
            districtId: null,
            blockId: null,
            panchayatId: null,
            villageId: null,
            clfId: null,
            educationQualification: null,
            natureOfMigration: null,
            placeReturnFrom: null,
            durationOfMigration: null,
        },

        districtList: [],
        blockList: [],
        panchayatList: [],
        proofTypeData: [],
        religionData: [],
        communityData: [],
        educQualificationData: [],
        schemeData: [],
        shgDetails: {
            "formId": undefined,
            "isShgMember": null,
            "shgName": null,
            "nrlmPortalShgCode": null,
            "isHouseHoldMember": null,
            "relationshipNrlmPortalShgCode": null,
            "relationshipType": null,
        },

        enterpriseDetails: {
            "formId": undefined,
            "enterpriseName": "",
            "symrActivityTypes": [],
            "symrCommodityTypes": [],
            "symrSectorTypes": [],
            "isActivityPlanReady": "",
            "enterpriseTypeList": null,
            "symrUploadActivityPlan": "",
            "dateFormation": "",
        },

        skillAndEdpDetails: {
            "isSkillTrained": null,
            "trainingInstitute": null,
            "skillTrainingScheme": null,
            "courseName": null,
            "courseCompletionYear": null,
            "isCompletedEdpProgramme": null,
            "edpCompletedInstituteName": null,
            "edpCompletedCourseName": null,
            "edpScheme": null,
            "isRegisteredEdpProgramme": null,
            "edpRegisteredInstituteName": null,
            "edpRegisteredCourseName": null,
            "registeredEdpScheme": null,
            'otherEdpScheme': null,
            'otherRegisteredEdpScheme': null,
            'otherSkillTrainingScheme': null
        },
        baseLineDetails: {
            "formId": undefined,
            monthlyAverageIncome: "",
            turnover: "",
            engagementHumanResources: "",
        },
        symrBankDetails: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber": null,
            "accName": "",
            "bnkName": "",
            "branchName": "",
            "ifscCode": "",
        },
        fundDetails: {
            formId: undefined,
            businessActivities: 0,
            machineries: 0,
            workingCapital: 0,
            purchaseServices: 0,
            marketLinkageSupport: 0,
            organizingAwarenessCamps: 0,
            infrastucture: 0,
            otherCost: 0,
            otherName: "",
            totalCost: 0
        },

        symrProposedActivity: [],

        symrExistingLoan: {
            existingLoanList: []
        },

        "uploadDocuments": {
            "formId": null,
            "idProof": [],
            "addressProof": [],
            "bankPassBook": [],
            "businessPlan": [],
            "existingLoanRepay": [],
            "differentlyAbledCertificate": [],
            "photoCopy": [],
            "proofOfMigration": [],
            "remarks": "",
            "trainingCertificate": [],
        },

        typesOfSector: [],
        activityData: [],
        typesOfCommodity: [],
        typesOfPc: [],
        formedByData: [],
        registrationUnderData: [],
        uploadingIndexes: [],
        errors: {},
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init: true,
        isSubmitting: false,
        stateDataUpdated: false,
        showModel: false,
    }

    toggle = () => {
        this.setState({
            ...this.state,
            showModel: !this.state.showModel
        })
    };

    modelAccepted = () => {
        console.log("acceptted")

        this.setState({
            ...this.state,
            showModel: !this.state.showModel
        }, () => this.SubmitApplication())
    }

    //LIFECYCLE

    componentDidMount() {
        const { basicDetails } = this.state
        this.getsymrmasterDetails()
        this.getDistrict();
        if (basicDetails.districtId)
            this.getBlock()
        if (basicDetails.blockId)
            this.getPanchayat()
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    getsymrmasterDetails = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...GET_SYMR_FORM_MASTER_DATA,
            cancelToken: cancelToken.token,
        }
        let response = await API(requestPayload);
        console.log("response", response)
        if (response.status === 200) {
            let {
                religionData,
                communityData,
                educQualificationData,
                schemeData,
                proofTypeData
            } = response.data.data
            this.setState({
                religionData,
                proofTypeData,
                communityData,
                educQualificationData,
                schemeData
            });
        }
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("181", nextProps)
        if (prevState.init)
            return {
                ...nextProps,
                init: false
            }

        return null
    }

    //HANDLE CHANGE
    onChange = (name, value, index = null) => (formName) => {
        let { errors } = this.state
        console.log(name, value)
        let formData = this.state[formName]
        if (index !== null) {
            formData[index][name] = value
            errors[name] = undefined
        } else {
            formData[name] = value
            errors[name] = undefined
        }
        this.setState(
            { [formName]: formData, errors },
            () => this.handleCallBack(name, value)
        )
    }

    onExistingLoanChange = (name, value, index = undefined) => {
        let { symrExistingLoan } = this.state
        if (index !== undefined)
            symrExistingLoan.existingLoanList[index][name] = value
        else {
            symrExistingLoan['isExistingLoan'] = value
            symrExistingLoan.existingLoanList = []
        }
        this.setState({ symrExistingLoan }, () => this.handleCallBack(name, value))
    }


    //OTHERS
    handleCallBack = (name, value) => {

        let { pcDetails, enterpriseDetails, symrExistingLoan, basicDetails, errors, skillAndEdpDetails } = this.state

        if (name === "districtId") {
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                blockId: null,
                panchayatId: null,

            }
            this.setState(
                {
                    basicDetails,
                    panchayatList: [],
                    blockList: [],
                },
                this.getBlock
            );
        }
        else if (name === "blockId") {

            basicDetails = {
                ...basicDetails,
                panchayatId: null,

            }
            this.setState(
                {
                    basicDetails,
                    panchayatList: [],
                },
                this.getPanchayat
            );
        } if (name === 'dateOfBirth') {
            errors['age'] = null
            basicDetails = {
                ...basicDetails,
                age: calcAgeInYear(basicDetails.dateOfBirth, true)
            }
        }
        if (name === 'isExperiencedEnterpreneur') {
            enterpriseDetails['enterpreneurExpYears'] = ''
        }
        if (name === 'isEmployedInActivity') {
            enterpriseDetails['activityExpYears'] = ''
            enterpriseDetails['designation'] = ''
            enterpriseDetails['location'] = ''
        } if (name === 'isLoanAppliedPreviously') {
            enterpriseDetails['schemeName'] = ''
            enterpriseDetails['schemeAmount'] = ''
        } if (name === 'isExistingLoan') {
            symrExistingLoan.existingLoanList = []
        } if (name === 'isSkillTrained') {
            skillAndEdpDetails['trainingInstitute'] = ''
            skillAndEdpDetails['skillTrainingScheme'] = ''
            skillAndEdpDetails['courseName'] = ''
            skillAndEdpDetails['courseCompletionYear'] = ''
        } if (name === 'isCompletedEdpProgramme') {
            skillAndEdpDetails['edpCompletedInstituteName'] = ''
            skillAndEdpDetails['edpScheme'] = ''
            skillAndEdpDetails['edpCompletedCourseName'] = ''
        } if (name === 'isRegisteredEdpProgramme') {
            skillAndEdpDetails['edpRegisteredInstituteName'] = ''
            skillAndEdpDetails['registeredEdpScheme'] = ''
            skillAndEdpDetails['edpRegisteredCourseName'] = ''
        } if (name === "proofType") {
            let { basicDetails, proofTypeData } = this.state
            let selectedProof = proofTypeData && proofTypeData.find(data => data.value === parseInt(value))
            console.log(selectedProof, proofTypeData)
            basicDetails['proofTypeData'] = selectedProof
            basicDetails["govtIdNumber"] = ''
            this.setState({
                basicDetails
            })
        }
        symrExistingLoan.existingLoanList && symrExistingLoan.existingLoanList.map(data => {
            if (parseInt(data.amountToBeRepaid) > 0 && parseInt(data.amountRepaid) > 0) {
                let balance = parseInt(data.amountToBeRepaid) - parseInt(data.amountRepaid)
                data.balanceAmtToBeRepaid = balance.toString()
            }
        })
        this.setState({
            symrExistingLoan,
            enterpriseDetails,
            basicDetails,
            errors,
            pcDetails,
            skillAndEdpDetails
        })
    };

    //services
    getDistrict = async () => {
        const { cancelToken, basicDetails } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...CORE_API.GET_DISTRICT_LIST_API,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status >= 200 && response.status < 300)
            this.setState({
                districtList: response.data.data.districtList
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    getBlock = async () => {
        const { cancelToken, basicDetails, blockId } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            districtId: basicDetails.districtId,
        };
        let requestPayload = {
            ...CORE_API.GET_BLOCK_LIST_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status >= 200 && response.status < 300)
            this.setState({
                blockList: response.data.data.blockList
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    getPanchayat = async () => {
        const { cancelToken, basicDetails } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            blockId: basicDetails.blockId,
        };
        let requestPayload = {
            ...CORE_API.GET_PANCHAYAT_LIST_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status >= 200 && response.status < 300)
            this.setState({
                panchayatList: response.data.data.panchayatList
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    onUpload = async (name, files) => {
        let { cancelToken, uploadDocuments, errors, uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(name)
            this.setState({ uploadingIndexes })
            errors[name] = undefined
            let newUploadArray = []
            let formData = new FormData()
            for (var i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }
            this.setState({
                loading: true
            })
            let requestPayload = {
                ...UPLOAD_DOC_API,
                data: formData,
                cancelToken: cancelToken.token
            };
            let response = await API(requestPayload);
            if (response.status >= 200 && response.status < 300) {

                for (var i = 0; i < files.length; i++) {
                    newUploadArray.push({
                        ...this.defaultUploadObject,
                        docUrl: response.data.data[i]['url'],
                        docName: response.data.data[i]['originalname'],
                        docType: 1
                    })
                }
                uploadDocuments[name] = newUploadArray
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== name)
            } else {
                uploadingIndexes.pop(name)
                toast(response.data.message, "error");
            }
            this.setState({ loading: false, uploadDocuments, errors, uploadingIndexes })
        } else {
            uploadDocuments[name] = []
            this.setState({ uploadDocuments })
        }
    }


    onAddOrRemoveExistingLoan = (index = null, formName) => {
        let { symrExistingLoan } = this.state
        if (index === null) {
            symrExistingLoan.existingLoanList.push({ ...this.defaultActivityObject })
        }
        else {
            symrExistingLoan.existingLoanList = symrExistingLoan.existingLoanList.filter((data, i) => index !== i)
        }
        this.setState({
            symrExistingLoan
        })
    }
    onAddOrRemoveActivity = (index = null, formName) => {
        let { symrProposedActivity } = this.state
        if (index === null) {
            symrProposedActivity.push(Object.assign({}, {
                formId: localStorage.getItem('createAppformId'),
                "activityName": null,
                "activityTimeLine": undefined,
                "activityTimeLineVal": undefined,
                "amtReq": undefined
            }))
        }
        else {
            symrProposedActivity = symrProposedActivity.filter((data, i) => index !== i)
        }
        this.setState({
            symrProposedActivity
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { errors, enterpriseDetails, shgDetails, basicDetails, skillAndEdpDetails, religionData, communityData, educQualificationData, schemeData } = this.state
        let selectedReligion = religionData.find(data => data.isOthers === true)?.value
        let selectedCommunity = communityData.find(data => data.isOthers === true)?.value
        let selectedEdc = educQualificationData.find(data => data.isOthers === true)?.value
        let selectedScheme = schemeData.find(data => data.isOthers === true)?.value

        const isValid = inputValidation.every(({ formName, validation, exec, ...rest }, i) => {
            let formData = this.state[formName]

            if (exec) {
                let valid = exec(formData)
                errors[formName] = !valid ? [rest.error] : []
                return exec(formData)
            }

            validation = {
                ...validation,
                ...(!enterpriseDetails['isExperiencedEnterpreneur'] ?
                    {
                        enterpreneurExpYears: undefined
                    } : null),
                ...(!enterpriseDetails['isEmployedInActivity'] ?
                    {
                        activityExpYears: undefined,
                        designation: undefined,
                        location: undefined
                    } : null),
                ...(!enterpriseDetails['isLoanAppliedPreviously'] ?
                    {
                        schemeName: undefined,
                        schemeAmount: undefined
                    } : null),
                ...(!skillAndEdpDetails['isSkillTrained'] ? {
                    trainingInstitute: undefined,
                    skillTrainingScheme: undefined,
                    courseName: undefined,
                    courseCompletionYear: undefined,

                } : null),
                ...(!skillAndEdpDetails['isCompletedEdpProgramme'] ? {
                    edpCompletedInstituteName: undefined,
                    edpScheme: undefined,
                    edpCompletedCourseName: undefined,

                } : null),
                ...(!skillAndEdpDetails['isRegisteredEdpProgramme'] ? {
                    edpRegisteredInstituteName: undefined,
                    registeredEdpScheme: undefined,
                    edpRegisteredCourseName: undefined,
                } : null),
                ...(
                    basicDetails.educationQualification != selectedEdc ? { otherEduQualification: undefined } : null
                ),
                ...(
                    basicDetails.religion != selectedReligion ? { otherReligion: undefined } : null
                ),
                ...(
                    basicDetails.community != selectedCommunity ? { otherCommunity: undefined } : null
                ),
                ...(
                    skillAndEdpDetails.skillTrainingScheme != selectedScheme ? { otherSkillTrainingScheme: undefined } : null
                ),
                ...(
                    skillAndEdpDetails.edpScheme != selectedScheme ? { otherEdpScheme: undefined } : null
                ),
                ...(
                    skillAndEdpDetails.registeredEdpScheme != selectedScheme ? { otherRegisteredEdpScheme: undefined } : null
                ),
                ...(
                    shgDetails.shgMemberType != 2 ? { relationshipType: undefined } : null
                )
            }
            console.log("499", formData)
            let error = validate(formData, validation)
            if (error)
                errors = {
                    ...error
                }
            return !error
        })



        if (!isValid) {
            console.log(errors, "errors")
            let filteredErros = Object.keys(errors)
                .filter(data => errors[data] && errors[data].length)
                .map(error => ({ error: errors[error][0] }))
            let error = filteredErros[0].error
            toast(error, 'error')
            this.setState({
                errors
            })
        } else {
            console.log("validation true and callling model")

            this.setState({
                ...this.state,
                showModel: true,
            })
        }
    }

    SubmitApplication = async () => {
        console.log("api calling")

        let pcForms = [
            {
                keyName: 'basicDetails',
                includeFormId: true,
                label: 'Applicant Details'
            },
            {

                keyName: 'shgDetails',
                includeFormId: true,
                label: 'symrShgDetails'

            },
            {

                keyName: 'enterpriseDetails',
                includeFormId: true,
                label: 'symrEnterprise'

            },
            {

                keyName: 'skillAndEdpDetails',
                includeFormId: true,
                label: 'symrSkillTraining'

            },
            {

                keyName: 'baseLineDetails',
                includeFormId: true,
                label: 'BaselineDetails'

            },
            {

                keyName: 'symrBankDetails',
                includeFormId: true,
                label: 'symrBankDetails'

            },
            {

                keyName: 'fundDetails',
                includeFormId: true,
                label: 'FundRequirement'

            },
            {

                keyName: 'symrExistingLoan',
                includeFormId: true,
                label: 'symrExistingLoan'

            },
            {

                keyName: 'uploadDocuments',
                includeFormId: true,
                label: 'uploadDocuments'

            }
        ]
        const { cancelToken } = this.state;

        let data = {}

        pcForms.forEach(form => {
            data[form.label] = this.state[form.keyName ? form.keyName : form.label]
            if (form.includeFormId)
                data[form.label]['formId'] = localStorage.getItem('createAppformId')
        })
        this.setState({
            isSubmitting: true
        })
        let requestPayload = {
            ...GET_SYMR_FORM_SUBMIT,
            data: data,
            cancelToken: cancelToken.token,
        };
        console.log("requ", requestPayload)
        let response = await API(requestPayload)

        if (response.status >= 200 && response.status <= 300) {
            this.props.history.push('/user/dashboard')
            if (STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role')))
                this.props.history.replace('/staff/dashboard')
            else this.props.history.replace('/user/dashboard')
        } else {
            toast('Error!!', 'error')
        }
        this.setState({ isSubmitting: false })


    }

    render() {

        const { isSubmitting } = this.state

        return (
            <>
                <ConfirmationModal ID={localStorage.getItem('createAppformId')} isOpen={this.state.showModel} toggle={this.toggle} successBtn={this.modelAccepted} />
                <form onSubmit={this.onSubmit}>
                    <div className="container bg-white mt-3 review-main">
                        <Row className="p-4 review-head" >
                            <h1 className="m-0 fw-500">Review & Submit</h1>
                        </Row>
                        <Row className="p-3 align-items-center border-top review-head">
                            <Col lg="6" md="6" sm="12" className="update-draft">
                                <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                                <span className="lighGrey-2">All Updates Saved as Draft</span>
                            </Col>
                            <Col lg="5" md="6" sm="12" className="ml-auto">
                                <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                                    <Col >
                                        <Button
                                            onClick={() => this.props.history.push('/user/dashboard')}
                                            outline
                                            type="button"
                                            color="lighGrey-2 w-100 border-primary "
                                            className="fw-600">
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col >
                                        <Button disabled={isSubmitting} color="primary w-100 border-none" className="fw-600" type="submit">
                                            {
                                                isSubmitting ? 'Submitting...' : 'Submit'
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="container theme-one-common bg-white mt-3">
                        <Row className="p-4 border-bottom ">
                            <h1 className="mb-0">All Details</h1>
                        </Row>

                        <BasicDetailsForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('basicDetails')}
                        />

                        <SHGForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('shgDetails')}
                        />

                        <SkillAndEdpForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('skillAndEdpDetails')}
                        />

                        <EnterpriseActivityForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('enterpriseDetails')}
                        />

                        <BankDetailsForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('symrBankDetails')}
                        />

                        <ActivityForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('symrProposedActivity')}
                            onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                        />

                        <ExistingLoanForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onExistingLoanChange(...params)}
                            onAddOrRemoveActivity={this.onAddOrRemoveExistingLoan}
                        />

                        <UploadForm
                            {...this.state}
                            onSubmit={this.onSubmit}
                            onChange={(...params) => this.onChange(...params)('uploadDocuments')}
                            onUpload={this.onUpload}
                        />

                    </div>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state.publicUser.application.newApp.symr
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
}

const SYMRReviewSubmit = connect(mapStateToProps, mapDispatchToProps)(ReviewSubmitClass)

export { SYMRReviewSubmit };

let inputValidation = [
    {
        formName: 'basicDetails',
        validation: {
            // mobileNumber: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Mobile number can't be blank"
            //     }
            // },
            /* otherCommunity: {
                presence: {
                    allowEmpty: false,
                    message: "^Others can't be blank"
                }
            }, */
            name: {
                presence: {
                    allowEmpty: false,
                    message: "^Name can't be blank"
                }
            },
            aadharNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Aadhar can't be blank"
                }
            },
            applicationCategory: {
                presence: {
                    allowEmpty: false,
                    message: "^Is vulnerable category can't be blank"
                }
            },
            fatherName: {
                presence: {
                    allowEmpty: false,
                    message: "^Father's / Husband's name can't be blank"
                }
            },
            address: {
                presence: {
                    allowEmpty: false,
                    message: "^Address can't be blank"
                }
            },
            gender: {
                presence: {
                    allowEmpty: false,
                    message: "^Gender can't be blank"
                }
            },
            community: {
                presence: {
                    allowEmpty: false,
                    message: "^Community can't be blank"
                }
            },

            dateOfBirth: {
                presence: {
                    allowEmpty: false,
                    message: "^Date Of Birth can't be blank"
                }
            },
            age: {
                presence: {
                    allowEmpty: false,
                    message: "^Age can't be blank"
                },
                numericality: {
                    onlyInteger: true
                },
                validateAgeFromGender: "gender"
            },
            // isVulnerable : {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Is vulnerable can't be blank"
            //     }
            // },
            // isVulnerableType:{
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Is vulnerable category can't be blank"
            //     }
            // },
            isDifferentlyAbled: {
                presence: {
                    allowEmpty: false,
                    message: "^Is differently abled can't be blank"
                }
            },
            districtId: {
                presence: {
                    allowEmpty: false,
                    message: "^District can't be blank"
                }
            },
            blockId: {
                presence: {
                    allowEmpty: false,
                    message: "^Block can't be blank"
                }
            },
            panchayatId: {
                presence: {
                    allowEmpty: false,
                    message: "^Panchayat can't be blank"
                }
            },
            // villageId: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Village can't be blank"
            //     }
            // },
            // clfId: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^CLF can't be blank"
            //     }
            // },
            educationQualification: {
                presence: {
                    allowEmpty: false,
                    message: "^Educational Qualification can't be blank"
                }
            },
            natureOfMigration: {
                presence: {
                    allowEmpty: false,
                    message: "^Nature of Migration can't be blank"
                }
            },
            placeReturnFrom: {
                presence: {
                    allowEmpty: false,
                    message: "^Place of migration can't be blank"
                }
            },
            durationOfMigration: {
                presence: {
                    allowEmpty: false,
                    message: "^Duration of migration can't be blank"
                }
            }
        }
    },
    {
        formName: 'shgDetails',
        validation: {
            relationshipType: {
                presence: {
                    allowEmpty: false,
                    message: "^Relationship Type can't be blank"
                }
            },
            shgName: {
                presence: {
                    allowEmpty: "true",
                    message: "^SHG Name can't be blank"
                }
            },
            isShgMember: {
                presence: {
                    allowEmpty: "true",
                    message: "^Is SHG member can't be blank"
                }
            },
            isHouseHoldMember: {
                presence: {
                    allowEmpty: "true",
                    message: "^Is House Hold Member can't be blank"
                }
            },
        }
    },
    {
        formName: 'skillAndEdpDetails',
        validation: {
            trainingDuration: {
                presence: { allowEmpty: false, message: "^Training duration can't be blank" }
            },
            courseCompletionYear: {
                presence: { allowEmpty: false, message: "^Year of Completion can't be blank" }
            },
            skillTrainingName: {
                presence: { allowEmpty: false, message: "^Name of Skill Training can't be blank" }
            },
            trainingInstitute: {
                presence: { allowEmpty: false, message: "^Training institution /agency can't be blank" }
            },
            skillTrainingScheme: {
                presence: { allowEmpty: false, message: "^Scheme name can't be blank" }
            },
            isRegisteredEdpProgramme: {
                presence: { allowEmpty: false, message: "^Registered any Edp program can't be blank" }
            },
            edpRegisteredInstituteName: {
                presence: { allowEmpty: false, message: "^Institution name can't be blank" }
            },
            registeredEdpScheme: {
                presence: { allowEmpty: false, message: "^Scheme name can't be blank" }
            },
            edpRegisteredTopic: {
                presence: { allowEmpty: false, message: "^Topic can't be blank" }
            },
            isExperiencedEnterpreneur: {
                presence: { allowEmpty: false, message: "^Is experiended as entreprenuer can't be blank" }
            },
            enterpriseType: {
                presence: { allowEmpty: false, message: "^Enterprise type can't be blank" }
            },
            location: {
                presence: { allowEmpty: false, message: "^Location can't be blank" }
            },
            enterpreneurExpYears: {
                presence: { allowEmpty: false, message: "^Duration of experience can't be blank" }
            },
            designation: {
                presence: { allowEmpty: false, message: "^Designation can't be blank" }
            },
        }
    },
    {
        formName: 'baseLineDetails',
        validation: {
            monthlyAverageIncome: {
                presence: {
                  allowEmpty: false,
                  message: "^Monthly Average Income can't be blank"
                }
              },
              turnover: {
                presence: {
                  allowEmpty: false,
                  message: "^Turnover  (In Lakh) can't be blank"
                }
              },
              engagementHumanResources: {
                presence: {
                  allowEmpty: false,
                  message: "^Engagement Human Resources can't be blank"
                }
              },
        }
    },
    {
        formName: 'enterpriseDetails',
        validation: {
            enterpriseName: {
                presence: {
                    allowEmpty: false,
                    message: "^Enterprise can't be blank"
                }
            },
            symrActivityTypes: {
                presence: { allowEmpty: false, message: "^Symr Activity can't be blank" }
            },
            symrCommodityTypes: {
                presence: { allowEmpty: false, message: "^Symr commodity can't be blank" }
            },
            symrSectorTypes: {
                presence: { allowEmpty: false, message: "^Symr sector can't be blank" }
            },
            isActivityPlanReady: {
                presence: { allowEmpty: false, message: "^Is Activity Plan can't be blank" }
            },
            enterpriseTypeList: {
                presence: { allowEmpty: false, message: "^Enterprise Type can't be blank" }
            },
            enterpriseType: {
                presence: { allowEmpty: false, message: "^Enterprise Type can't be blank" }
            },
            dateFormation: {
                presence: { allowEmpty: false, message: "^Enterprise Start Date can't be blank" }
            }
        }
    },
    {
        formName: 'symrBankDetails',
        validation: {
            accNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Acc Number can't be blank"
                }
            },
            confirmAccNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Confirm Acc number can't be blank"
                },
                validateConfirmAccountNumber: 'accNumber'
            },
            accName: {
                presence: {
                    allowEmpty: false,
                    message: "^Account name can't be blank"
                }
            },
            bnkName: {
                presence: {
                    allowEmpty: false,
                    message: "^Bank name can't be blank"
                }
            },
            branchName: {
                presence: {
                    allowEmpty: false,
                    message: "^Branch Name can't be blank"
                }
            },
            ifscCode: {
                presence: {
                    allowEmpty: false,
                    message: "^IFSC Code can't be blank"
                },
                format: {
                    pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: '^Enter valid IFSC code'
                },
            },
        }
    },
    {
        formName: 'fundDetails',
        validation: {
            businessActivities: {
                presence: { allowEmpty: false, message: "^Cost of Business Activities can't be blank" }
              },
              machineries: {
                presence: { allowEmpty: false, message: "^Cost of Machineries can't be blank" }
              },
              workingCapital: {
                presence: { allowEmpty: false, message: "^Cost of Working Capital can't be blank" }
              },
              purchaseServices: {
                presence: { allowEmpty: false, message: "^Cost of Input Purchase / Services can't be blank" }
              },
              marketLinkageSupport: {
                presence: { allowEmpty: false, message: "^Cost of Market Linkage can't be blank" }
              },
              organizingAwarenessCamps: {
                presence: { allowEmpty: false, message: "^Cost of organizing Awareness Camps can't be blank" }
              },
              infrastucture: {
                presence:
                  { allowEmpty: false, message: "^Cost of Infrastructure can't be blank" }
              },
              otherCost: {
                presence: { allowEmpty: false, message: "^Other Cost can't be blank" }
              },
              otherName: {
                presence: { allowEmpty: false, message: "^Others can't be blank" }
              }
        }
    },
    {
        formName: 'symrExistingLoan',
        error: 'Enter existing loan details!!',
        exec: ({ existingLoanList, isExistingLoan }) => {
            if (!isExistingLoan) return true
            return existingLoanList.length && existingLoanList.every(data => {
                return Object.keys(data).every((k) => data[k] !== undefined && data[k] !== null)
            })
        }
    },
    {
        formName: 'uploadDocuments',
        validation: {
            proofOfMigration: {
                presence: { allowEmpty: false, message: "^Document can't be blank" }
            },
            bankPassBook: {
                presence: { allowEmpty: false, message: "^Document can't be blank" }
            },
            idProof: {
                presence: { allowEmpty: false, message: "^Document can't be blank" }
            },
            businessPlan: {
                presence: { allowEmpty: false, message: "^Document can't be blank" }
            },
            remarks: {
                presence: { allowEmpty: false, message: "^Remarks can't be blank" }
            }
        }
    }
]