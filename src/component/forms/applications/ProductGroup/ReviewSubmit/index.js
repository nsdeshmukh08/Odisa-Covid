import React, { Component } from 'react';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import BasicDetailsForm from '../BasicDetails/BasicDetailForm'
import DetailsForm from '../Details/DetailsForm'
import MembersForm from '../Members/MembersForm'
import BankDetailsForm from '../BankDetails/BankDetailsForm'
import AmountForm from '../Amount/AmountForm'
import ActivityForm from '../Activity/ActivityForm'
import ExistingLoanForm from "../ExistingLoan/ExistingLoanForm"
import FundRequirementForm from './../FundRequirement/FundForm';
import LossForm from '../LossIncurred/LossForm';
import BaselineForm from '../Baseline/Baseline';
import UploadForm from '../Upload/UploadForm'
import { history } from 'helpers'
import { STAFF_ROLE_ID } from 'helpers/variables'
import { ConfirmationModal } from "component/Model"
const { UPLOAD_DOC_API, SUBMIT_FORM_API, GET_PC_DETALS_OPTIONS_API, SUBMIT_PG_FORM_API,GET_PRODUCER_GROUP_TYPES, SECTOR_TYPES, COMMODITY_TYPES } = API_BOOK.APPLICATION;
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;


let pgFormMemberInitialState = {
    "formId": null,
    "noOfMale": null,
    "noOfFemale": null,
    "noOfTransGender": null,
    "PwdnoOfMale": null,
    "PwdnoOfFemale": null,
    "PwdnoOfTransGender": null,
    "genderTotal": null,
    "noOfGen": null,
    "noOfSEBC": null,
    "noOfSC": null,
    "noOfST": null,
    "noOfCommunityOthers": null,
    "communityTotal": null,
    "noOfMinorityOthers": null,
    "minorityTotal": null,
}

class ReviewSubmitClass extends Component {

    defaultActivityObject = {
        formId : localStorage.getItem('createAppformId'),
        "activityName": null,
        "activityTimeLine": undefined,
        "activityTimeLineVal": undefined,
        "amtReq": undefined
    }

    state = {
        //BASIC
        basicDetails: {
            "formId": undefined,
            "districtId": null,
            "blockId": null,
            "panchayatId": null,
            "clfId": null,
            "villageId": null,
            "enterpriseAndProducerGroup": null,
            "AddressCommunication": null,
            "mobileNumber": null,
            "dateOfFormation": null,
            "ageOfEGPG": null,
            "promotingAgency": null,
            "enterpriseActivity": null
        },
        districtList: [],
        blockList: [],
        panchayatList: [],
        //DETAILS
        shgDetails: {                
            "formId": localStorage.getItem('createAppformId'),
            "isShgMember": null,
            "relationshipType": null,
            "shgName": null,
            "shgMemberType": null,
            "nrlmPortalShgCode": null
        },
        typesOfSector: [],
        activityData: [],
        typesOfCommodity: [],
        producerTypes:[],
        sectorTypes:[],
        commodityTypes: [],
        typesOfPg: [],
        formedByData: [],
        promotingOrgData: [],
        registrationUnderData: [],

        iaBaseLineDetails: {
            formId: undefined,
            monthlyAvgIncome: null,
            turnover: null,
            engagementOfHR: null,
        },
        //MEMBERS
        pgFormMembers: {
            "formId": null,
            "activeInactiveTotal": null,
            "noOfMale": null,
            "noOfFemale": null,
            "noOfTransGender": null,
            "PwdnoOfMale": null,
            "PwdnoOfFemale": null,
            "PwdnoOfTransGender": null,
            "genderTotal": null,
            "PwdGendertotal": null,
            "noOfGen": null,
            "noOfSEBC": null,
            "noOfSC": null,
            "noOfST": null,
            "noOfCommunityOthers": null,
            "communityTotal": null,
            "noOfMinorityOthers": null,
            "minorityTotal": null,
        },
        //AMOUNT
        // pgFormAmountRecevied: {
        //     "formId": undefined,
        //     "amtGrant": '',
        //     "amtReceviedLoan": '',
        //     "isLoanGrant": false,
        //     "fundProvider": false,
        //     "amtRecevied": '',
        //     "isSpecialEPO": false,
        //     "specifyEPO": null,
        //     "nameOfPc":null
        // },
        //BANK
        pgFormBankDetails: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber" : null,
            "accName": null,
            "bnkName": null,
            "branchName": null,
            "ifscCode": null,
            "noOfLastTransaction": null,
            "existingLoanRepaymentStatus": null,
            "lossIncurredtoCovid": null,
            "activityFundRequirementDetails": null, 
            "remarks": null
        },
        //Activity
        // pgFormProposedActivity: [
        //     {
        //         formId: localStorage.getItem('createAppformId'),
        //         "activityName": null,
        //         "activityTimeLine": undefined,
        //         // "activityTimeLineVal": undefined,
        //         "amtReq": undefined
        //     }
        // ],

          iaExistingLoan: {
            formId: localStorage.getItem('createAppformId'),
            isExistingLoan: null,
            existingLoanList: [],
          },

          iaLossIncurred: {
            formId: null,
            isLossIncurred: null,
            lossIncurredList: [],
          },
      
          iaProposedActivity: {
            formId: undefined,
            formId: null,
            bussinessActivities: null,
            machineries: null,
            workingCapital: null,
            purchaseServices: null,
            marketLinkageSupport: null,
            organizingAwarenessCamps: null,
            infrastructure: null,
            otherCost: null,
          },

        //Upload
        "uploadDocuments": {
            "formId": null,
            "firstResolutionofPGEG": [],
            "copyofBankPassbook": [],
            "listofOfficeBearers": [],
            "existingLoanRepay": [],
            "businessPlan": [],
            "applyingLoan": [],
        },
        uploadingIndexes: [],
        errors: {},
        loading: false,
        isSubmitting : false,
        formedByData:[],
        registrationUnderData:[],
        cancelToken: axios.CancelToken.source(),
        init: true,
        showModel : false,
    }

    toggle = () => {
        this.setState({
            ...this.state,
            showModel: !this.state.showModel
        })
    };

    modelAccepted = () =>{
        console.log("acceptted")

        this.setState({
            ...this.state,
            showModel: !this.state.showModel
        },()=>this.SubmitApplication())
    }

    //LIFECYCLE

    componentDidMount() {
        const { basicDetails } = this.state
        this.getDistrict();
        this.getPGDetails();
        this.getProducerGroup();
        if (basicDetails.districtId)
            this.getBlock()
        if (basicDetails.blockId)
            this.getPanchayat()
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                ...nextProps,
                uploadDocuments: nextProps.pgFormUploadDocument,
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value, index = null) => (formName) => {
        let { errors } = this.state
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
            () => this.handleCallBack(name,value)
        )
    }

    //HANDLE CHANGE
    membersFormChange = (name, value, section) => {
        let { pgFormMembers, errors } = this.state
        pgFormMembers[name] = value
        pgFormMembers['noOfVulTransGender'] = pgFormMembers['noOfTransGender']
        errors[name] = undefined
        errors[section] = undefined
        this.setState({ pgFormMembers, errors }, () => this.handleMembersCallBack(section, value))
    }

    handleMembersCallBack = (section) => {
        let { pgFormMembers } = this.state

        if (section === 'totalMembers') {
            let { pgFormMembers, errors } = this.state
            pgFormMembers = {
                ...pgFormMemberInitialState,
                totalMembers: pgFormMembers.totalMembers
            }
            errors = {
                totalMembers: errors.totalMembers
            }
            this.setState({
                pgFormMembers,
                errors
            })
        } else {
            let fieldGroups = {
                'activeInactiveTotal': ['noOfActive', 'noOfInActive'],
                "genderTotal": ["noOfMale", "noOfFemale", "noOfTransGender"],
                "PwdGendertotal": ["PwdnoOfMale", "PwdnoOfFemale", "PwdnoOfTransGender"],
                "communityTotal": ["noOfGen", "noOfSEBC", "noOfSC", "noOfST", "noOfCommunityOthers"],
                "minorityTotal": ["noOfMuslim", "noOfChristians", "noOfMinorityOthers"],
                "vulnerableTotal": ["noOfDiffAbled", "noOfWidow", "noOfDesitute", "noOfDeserted", "noOfTransGender", "noOfEiderly"],
                "shgTotal": ["noOfSHGMembers",'noOfNonSHGTotal', "noOfSHGTotal"]
            }
            let fields = fieldGroups[section]
            pgFormMembers[section] = fields.filter(data => pgFormMembers[data]).reduce((acc, value) => {
                return acc + parseInt(pgFormMembers[value])
            }, 0)
            this.setState({
                pgFormMembers
            })
        }
    }


    //OTHERS
    handleCallBack = (name,value) => {
        let { pgDetails,pgFormAmountRecevied,promotingOrgData,registrationUnderData,formedByData,errors } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.isOthers === 1)?.value
        let formedByOtherVal = formedByData.find(data => data.isOthers === 1)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value;

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
            let { basicDetails } = this.state
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
        }
        if(name === "pgTypes"){
            pgDetails['pgSectorTypes'] = []
            pgDetails['pgCommodityTypes'] = []
            this.setState({pgDetails},this.getSectorTypes)
            }
            if(name === "pgTypes"){
                pgDetails['pgSectorTypes'] = []
                pgDetails['pgCommodityTypes'] = []
                this.setState({pgDetails},this.getSectorTypes)
            }else if(name === "pgSectorTypes"){
                pgDetails['pgCommodityTypes'] = []
                this.setState({pgDetails},this.getCommodityTypes)
            }if(name === 'registrationUnder'){
                pgDetails['registrationNumber'] = ''
                errors['registrationNumber'] = null
                pgDetails['registerationNumberRegex'] = registrationUnderData.find(data => data.value === parseInt(value))?.regxType
            }
            if(name === 'promotingOrgs'){
                pgDetails['promotingOrgName'] = ''
                errors['promotingOrgName'] = null
            }
            if(name === 'supportingOrg'){
                pgDetails['supportingOrgName'] = ''
                errors['supportingOrgName'] = null
            }
            if(parseInt(pgDetails.registrationUnder) !== registrationOthersVal && pgDetails.registrationUnderOthers){
                pgDetails['registrationUnderOthers'] =null
    
            }if(parseInt(pgDetails.promotingOrgs) === promoOrgOtherVal){
                pgDetails['promotingOrgName'] =null
            }if(parseInt(pgDetails.supportingOrg) === formedByOtherVal){
                pgDetails['supportingOrgName'] =null
            }
            if(name === 'isSpecialEPO'){
                pgFormAmountRecevied['specifyEPO'] = null
            }
            if(name === 'isLoanGrant'){
                pgFormAmountRecevied['fundProvider'] = null
                pgFormAmountRecevied['amtRecevied'] = null
            }
        this.setState({ pgDetails,pgFormAmountRecevied })
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
            }else{
                uploadingIndexes.pop(name)
                // this.setState({uploadingIndexes})
                toast(response.data.message, "error");
            }
            this.setState({ loading: false, uploadDocuments, errors, uploadingIndexes })
        } else {
            uploadDocuments[name] = []
            this.setState({ uploadDocuments })
        }
    }

    getPGDetails = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...GET_PC_DETALS_OPTIONS_API,
            cancelToken: cancelToken.token,
        }
        let response = await API(requestPayload);
        if (response.status >= 200 && response.status < 300) {
            let {
                formedByData,
                promotingOrgData,
                registrationUnderData,
                typesOfPc,
                typesOfCommodity,
                typesOfSector,
                activityData
            } = response.data.data
            this.setState({
                formedByData,
                promotingOrgData,
                registrationUnderData,
                typesOfPc,
                typesOfCommodity,
                typesOfSector,
                activityData
            });
        }
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };
    getProducerGroup = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...GET_PRODUCER_GROUP_TYPES,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                producerTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

    getSectorTypes = async () => {
        const { cancelToken, pgDetails } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...SECTOR_TYPES,
            data: {
                "activityId": pgDetails && pgDetails.pgTypes && pgDetails.pgTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                sectorTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }
    getCommodityTypes = async () => {
        const { cancelToken, pgDetails } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...COMMODITY_TYPES,
            data: {
                "sectorId": pgDetails && pgDetails.pgSectorTypes && pgDetails.pgSectorTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                commodityTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

    onAddOrRemoveActivity = (index = null) => {
        let { pgFormProposedActivity } = this.state
        if (index === null) {
            pgFormProposedActivity.push(Object.assign({}, this.defaultActivityObject))
        }
        else {
            pgFormProposedActivity = pgFormProposedActivity.filter((data, i) => index !== i)
        }
        this.setState({
            pgFormProposedActivity
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { errors, pgFormAmountRecevied,pgFormProposedActivity, pgDetails,promotingOrgData,formedByData,registrationUnderData } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        const isValid = inputValidation.every(({ formName, validation, exec }, i) => {
            let formData = this.state[formName]
            if (exec){
                let isValid=exec(formData)
                errors[formName] = !isValid ? ['Enter the proposal activity details!!'] : [] 
                return exec(formData)
            }
            validation = {
                ...validation,
                    ...(parseInt(pgDetails.promotingOrgs) === promoOrgOtherVal ? {
                        promotingOrgName : undefined
                    } :''),
                    ...(parseInt(pgDetails.supportingOrg) === formedByOtherVal ? {
                        supportingOrgName : undefined
                    } :''),
                    ...(!pgDetails.registrationUnder ? { registrationNumber : undefined } : ''),
                    ...(
                            pgDetails.registrationUnder != registrationOthersVal ? { registrationUnderOthers : undefined } : ''
                        ),
                ...(
                    pgFormAmountRecevied.isSpecialEPO === false ? {
                        specifyEPO: undefined
                    } : ''
                ),
                ...(
                    pgFormAmountRecevied.isLoanGrant === false ? {
                        fundProvider: undefined,
                        amtRecevied : undefined
                    } : ''
                )
            }
            let error = validate(formData, validation)
            if(error)
                errors={
                    ...error
                }
            return !error
        })
        console.log(errors,"erros")
        if (!isValid) {
            let filteredErros = Object.keys(errors)
                                    .filter(data => errors[data] && errors[data].length)
                                    .map(error =>  ({ error: errors[error][0] }))
            let error = filteredErros[0].error
            toast(error, 'error')
            this.setState({
                errors
            })
        } else {
            this.setState({
                showModel: true,
            })
        }
    }

    SubmitApplication = async () =>{
        console.log("api calling")

            let pgForms = [
                {
                    label: 'basicDetails',
                    includeFormId: true
                },
                {
                    label: 'pgDetails',
                    includeFormId: true
                },
                {
                    label: 'pgFormMembers',
                    includeFormId: true
                },
                // {
                //     label: 'pgFormAmountRecevied',
                //     includeFormId: true
                // },
                {
                    label: 'pgFormBankDetails',
                    includeFormId: true
                },
                {

                    keyName: 'symrProposedActivity',
                    label: 'symrProposedActivity'

                },
                {
                    keyName: 'iaExistingLoan',
                    includeFormId: true,
                    label: 'iaExistingLoan',
                },
                {
                    label: 'uploadDocuments',
                    includeFormId: true
                }
            ]
            const { cancelToken } = this.state;
            let data = {}

            pgForms.forEach(form => {
                data[form.label] = this.state[form.keyName ? form.keyName : form.label]

                if (form.includeFormId)
                    data[form.label]['formId'] = localStorage.getItem('createAppformId')
            })
            this.setState({
                isSubmitting: true
            })

            let requestPayload = {
                ...SUBMIT_PG_FORM_API,
                data: data,
                cancelToken: cancelToken.token,
            };
            console.log(requestPayload,"requestPayload")

            let response = await API(requestPayload);
            if (true) {
                toast('Successfully application created', 'success')
                if(STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role')))
                    this.props.history.replace('/staff/dashboard')
                else this.props.history.replace('/user/dashboard')
            } else {
                toast('Error!!', 'error')
            }
            this.setState({ isSubmitting:false })
    }

    render() {
        const { isSubmitting } = this.state
        return (
            <>
                <ConfirmationModal ID = { localStorage.getItem('createAppformId')} isOpen={this.state.showModel} toggle={this.toggle} successBtn = {this.modelAccepted}  />
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
                                        type="button"
                                        outline 
                                        color="lighGrey-2 w-100 border-primary" 
                                        className="fw-600"
                                        onClick={() => this.props.history.replace('/user/dashboard')}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col >
                                    <Button 
                                        color="primary w-100 border-none" 
                                        className="fw-600" 
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting...":'Submit'}
                                        
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
                    {/* BASIC DETAILS  */}
                    <BasicDetailsForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) => this.onChange(...params)('basicDetails')}
                    />
                    {/* DETAILS  */}
                    <DetailsForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) => this.onChange(...params)('shgDetails')}
                    />
                    {/* Memers  */}
                    <MembersForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) => this.membersFormChange(...params)}
                    />
                    <BaselineForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) =>
                        this.onChange(...params)('iaBaseLineDetails')
                        }
                    />
                    <BankDetailsForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) => this.onChange(...params)('pgFormBankDetails')}
                    />
                    {/* Activity  */}
                    {/* <ActivityForm
                        {...this.state}
                        onSubmit={this.onSubmit}
                        onChange={(...params) => this.onChange(...params)('pgFormProposedActivity')}
                        onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                    /> */}
                    {/* Upload  */}

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

                    <LossForm
                                {...this.state}
                                onSubmit={this.onSubmit}
                                onChange={(...params) =>
                                this.onChange(...params)('iaLossIncurredDetails')
                                }
                                onAddOrRemoveActivity={this.onAddOrRemoveActivityLoss}
                            />

                    <FundRequirementForm
                                {...this.state}
                                onSubmit={this.onSubmit}
                                onChange={(...params) =>
                                this.onChange(...params)('iaProposedActivity')
                                }
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
    return state.publicUser.application.newApp.producerGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
}

const ReviewSubmit = connect(mapStateToProps, mapDispatchToProps)(ReviewSubmitClass)

export { ReviewSubmit };

let inputValidation = [
    // {
    //     formName: 'basicDetails',
    //     validation: {
    //         mobileNumber: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Mobile number can't be blank"
    //             }
    //         },
    //         enterpriseAndProducerGroup: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Enterprise And ProducerGroup Name can't be blank"
    //             },
    //             // format: {
    //             //     pattern: "[a-z]+",
    //             //     flags: "i",
    //             //     message: "can only contain alphabets"
    //             // }
    //         },
    //         AddressCommunication: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Address Communication can't be blank"
    //             }
    //         },
    //         districtId: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^District can't be blank"
    //             }
    //         },
    //         clfId: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^CLF can't be blank"
    //             }
    //         },
    //         villageId: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Village can't be blank"
    //             }
    //         },
    //         blockId: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Block can't be blank"
    //             }
    //         },
    //         panchayatId: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Panchayat can't be blank"
    //             }
    //         },
    //         dateOfFormation: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Date of Formation can't be blank"
    //             }
    //         },
    //         ageOfEGPG: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Age of EG/PG can't be blank"
    //             }
    //         },
    //         promotingAgency: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Promoting Agency can't be blank"
    //             }
    //         },
    //         enterpriseActivity: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Enterprise Activity can't be blank"
    //             }
    //         },
    //     }
    // },
    // {
    //     formName: 'pgDetails',
    //     validation: {
    //         // relationshipType: {
    //         //     presence: {
    //         //         allowEmpty: true,
    //         //         message: "^Relationship Type can't be blank"
    //         //     }
    //         // },
    //         isShgMember: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Member Type can't be blank"
    //             }
    //         },
    //         shgName: {
    //             presence: {
    //                 allowEmpty: "true",
    //                 message: "^SHG Name can't be blank"
    //             }
    //         },
    //         shgMemberType: {
    //             presence: {
    //                 allowEmpty: "true",
    //                 message: "^SHG member type can't be blank"
    //             }
    //         },
    //         nrlmPortalShgCode: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^NRLM Portal SHG Code can't be blank"
    //             }
    //         },
    //     }
    // },
    // {
    //     formName: 'pgFormMembers',
    //     validation: {
    //         noOfMale: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^No of male can't be blank"
    //             }
    //         },
    //         noOfFemale: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^No of female can't be blank"
    //             }
    //         },
    //         noOfTransGender: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^No of transgender can't be blank"
    //             }
    //         },
    //         genderTotal: {
    //             validateMembers : {
    //                 shouldMatch : 'totalMembers',
    //                 fields : ['noOfMale','noOfFemale','noOfTransGender']
    //             }
    //         },
    //         PwdGendertotal: {
    //             validateMembers : {
    //                 shouldMatch : 'totalMembers',
    //                 fields : ['PwdnoOfMale','PwdnoOfFemale','PwdnoOfTransGender']
    //             }
    //         },
    //         noOfGen: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Gen can't be blank"
    //             }
    //         },
    //         noOfSEBC: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^SEBC can't be blank"
    //             }
    //         },
    //         noOfSC: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^SC can't be blank"
    //             }
    //         },
    //         noOfST: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^ST can't be blank"
    //             }
    //         },
    //         communityTotal: {
    //             validateMembers : {
    //                 shouldMatch : 'totalMembers',
    //                 fields : ['noOfGen','noOfSEBC','noOfSC','noOfST','noOfCommunityOthers']
    //             }
    //         },
    //         noOfMinorityOthers: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^No of minority can't be blank"
    //             }
    //         },
    //         minorityTotal: {
    //             validateIsLesserThan : {
    //                 shouldLesserThan : 'totalMembers',
    //                 fields : ['noOfMuslim','noOfChristians','noOfMinorityOthers']
    //             }
    //         },
    //     }
    // },
    // // {
    // //     formName: 'pgFormAmountRecevied',
    // //     validation: {
    // //         "amtGrant": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Amount grant can't be blank"
    // //             }
    // //         },
    // //         "amtReceviedLoan": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Loan received can't be blank"
    // //             }
    // //         },
    // //         "isLoanGrant": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Is loan grant can't be blank"
    // //             }
    // //         },
    // //         "fundProvider": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Fund provider name can't be blank"
    // //             }
    // //         },
    // //         "amtRecevied": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Amount Received can't be blank"
    // //             }
    // //         },
    // //         "isSpecialEPO": {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Is special EPO can't be blank"
    // //             }
    // //         },
    // //         'specifyEPO': {
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^Special EPO can't be blank"
    // //             }
    // //         },
    // //         "nameOfPc":{
    // //             presence: {
    // //                 allowEmpty: false,
    // //                 message: "^nameOfPc can't be blank"
    // //             }
    // //         }
    // //     }
    // // },
    // {
    //     formName: 'pgFormBankDetails',
    //     validation: {
    //         accNumber: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Acc Number can't be blank"
    //             }
    //         },
    //         confirmAccNumber : {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Confirm Acc number can't be blank"
    //             },
    //             validateConfirmAccountNumber : 'accNumber'
    //         },
    //         accName: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Account name can't be blank"
    //             },
    //             // format: {
    //             //     pattern: "[a-z]+",
    //             //     flags: "i",
    //             //     message: "can only contain alphabets"
    //             // }
    //         },
    //         bnkName: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Bank name can't be blank"
    //             },
    //             // format: {
    //             //     pattern: "[a-z]+",
    //             //     flags: "i",
    //             //     message: "can only contain alphabets"
    //             // }
    //         },
    //         branchName: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Branch Name can't be blank"
    //             },
    //             // format: {
    //             //     pattern: "[a-z]+",
    //             //     flags: "i",
    //             //     message: "can only contain alphabets"
    //             // }
    //         },
    //         // noOfLastTransaction: {
    //         //     presence: {
    //         //         allowEmpty: false,
    //         //         message: "^No of transactions in last six months can't be blank"
    //         //     },
    //         //     format: {
    //         //         pattern: "[0-9]+",
    //         //         flags: "i",
    //         //         message: "can only contain numbers"
    //         //     }
    //         // },
    //         ifscCode: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^IFSC Code can't be blank"
    //             },
    //             format: {
    //               pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    //               message: '^Enter valid IFSC code'
    //             },
    //         },
    //         // existingLoanRepaymentStatus: {
    //         //     presence: {
    //         //         allowEmpty: false,
    //         //         message: "^Existing Loan Repayment Status can't be blank"
    //         //     }
    //         // },
    //         // lossIncurredtoCovid: {
    //         //     presence: {
    //         //         allowEmpty: false,
    //         //         message: "^Loss Incurred to Covid can't be blank"
    //         //     }
    //         // },
    //         // activityFundRequirementDetails: {
    //         //     presence: {
    //         //         allowEmpty: false,
    //         //         message: "^Activity Fund Requirement Details can't be blank"
    //         //     }
    //         // },
    //         remarks: {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^remarks can't be blank"
    //             }
    //         }
    //     }
    // },
    // // {
    // //     formName: 'pgFormProposedActivity',
    // //     exec: (pgFormProposedActivity) =>
    // //             pgFormProposedActivity.length&&pgFormProposedActivity.every(data => data.activityName && data.activityTimeLine && data.activityTimeLineVal && data.amtReq)
    // // },
    // {
    //     formName: 'uploadDocuments',
    //     validation: {
    //         "firstResolutionofPGEG": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document is mandatory"
    //             }
    //         },
    //         "copyofBankPassbook": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document is mandatory"
    //             }
    //         },
    //         "businessPlan": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document is mandatory"
    //             }
    //         },
    //         "listofOfficeBearers": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document can't be blank"
    //             }
    //         },
    //         "existingLoanRepay": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document can't be blank"
    //             }
    //         },
    //         "applyingLoan": {
    //             presence: {
    //                 allowEmpty: false,
    //                 message: "^Document can't be blank"
    //             }
    //         }
    //     }
    // }
]