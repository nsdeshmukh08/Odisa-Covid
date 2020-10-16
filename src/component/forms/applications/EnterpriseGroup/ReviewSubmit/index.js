import React, { Component } from 'react';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/enterpriseGroup';
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
import UploadForm from '../Upload/UploadForm'
import { STAFF_ROLE_ID } from 'helpers/variables'
import { ConfirmationModal } from "component/Model"


const { UPLOAD_DOC_API, SUBMIT_EG_FORM_API, GET_PC_DETALS_OPTIONS_API, SECTOR_TYPES, COMMODITY_TYPES, GET_PRODUCER_GROUP_TYPES } = API_BOOK.APPLICATION;
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;


let egFormMemberInitialState = {
    "formId": null,
    "totalMembers": null,
    "noOfActive": null,
    "noOfInActive": null,
    "activeInactiveTotal": null,
    "noOfMale": null,
    "noOfFemale": null,
    "noOfTransGender": null,
    "genderTotal": null,
    "noOfBC": null,
    "noOfMBC": null,
    "noOfSC": null,
    "noOfST": null,
    "noOfCommunityOthers": null,
    "communityTotal": null,
    "noOfMuslim": null,
    "noOfChristians": null,
    "noOfMinorityOthers": null,
    "minorityTotal": null,
    "noOfDiffAbled": null,
    "noOfWidow": null,
    "noOfDesitute": null,
    "noOfDeserted": null,
    "noOfVulTransGender": null,
    "noOfEiderly": null,
    "vulnerableTotal": null,
    "noOfSHGMembers": null,
    "noOfSHGTotal": null,
    "shgTotal": null
}

class ReviewSubmitClass extends Component {

    defaultActivityObject = {
        formId: localStorage.getItem('createAppformId'),
        "activityName": null,
        "activityTimeLine": undefined,
        "activityTimeLineVal": undefined,
        "amtReq": undefined
    }

    state = {
        //BASIC
        basicDetails: {
            "formId": null,
            "mobileNumber": null,
            "name": null,
            "egName": null,
            "egAddress": null,
            "districtId": null,
            "blockId": null,
            "panchayatId": null,
        },
        districtList: [],
        blockList: [],
        panchayatList: [],
        //DETAILS
        egDetails: {
            formId: null,
            dateFormation: null,
            dateRegistration: null,
            registrationNumber: null,
            registerationNumberRegex: null,
            promotingOrgs: null,
            promotingOrgName: null,
            registrationUnderOthers: null,
            supportingOrg: null,
            supportingOrgName: null,
            relevantSupportOrg: null,
            registrationUnder: null,
            egTypes: [],
            egCommodityTypes: [],
            egSectorTypes: [],
        },
        typesOfSector: [],
        activityData: [],
        typesOfCommodity: [],
        typesOfPc: [],
        formedByData: [],
        registrationUnderData: [],
        //MEMBERS
        egFormMembers: {
            "formId": null,
            "noOfActive": null,
            "noOfInActive": null,
            "activeInactiveTotal": null,
            "noOfMale": null,
            "noOfFemale": null,
            "noOfTransGender": null,
            "genderTotal": null,
            "noOfBC": null,
            "noOfMBC": null,
            "noOfSC": null,
            "noOfST": null,
            "noOfCommunityOthers": null,
            "communityTotal": null,
            "noOfMuslim": null,
            "noOfChristians": null,
            "noOfMinorityOthers": null,
            "minorityTotal": null,
            "noOfDiffAbled": null,
            "noOfWidow": null,
            "noOfDesitute": null,
            "noOfDeserted": null,
            "noOfVulTransGender": null,
            "noOfEiderly": null,
            "vulnerableTotal": null,
            "noOfSHGMembers": null,
            "noOfSHGTotal": null,
            'noOfNonSHGTotal': null,
            "shgTotal": null
        },
        //AMOUNT
        egFormAmountRecevied: {
            "formId": undefined,
            "amtGrant": '',
            "amtReceviedLoan": '',
            "isLoanGrant": false,
            "fundProvider": null,
            "amtRecevied": '',
            "isSpecialEPO": null,
            "specifyEPO": null
        },
        //BANK
        egFormBankDetails: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber": null,
            "accName": null,
            "bnkName": null,
            "branchName": null,
            "ifscCode": null
        },
        //Activity
        egFormProposedActivity: [
            {
                formId: localStorage.getItem('createAppformId'),
                "activityName": null,
                "activityTimeLine": undefined,
                "activityTimeLineVal": undefined,
                "amtReq": undefined
            }
        ],
        //Upload
        "uploadDocuments": {
            "formId": null,
            "bankPassBook": [],
            "minOfEGRefund": [],
            "businessPlan": [],
            "remarks": null
        },
        uploadingIndexes: [],
        formedByData: [],
        promotingOrgData: [],
        registrationUnderData: [],
        typesOfPc: [],
        typesOfCommodity: [],
        typesOfSector: [],
        activityData: [],
        errors: {},
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init: true,
        issubmitting:false,
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
        const { basicDetails, egDetails } = this.state
        this.getDistrict();
        this.getProducerGroup()
        this.getPCDetails()
        if (basicDetails.districtId)
            this.getBlock()
        if (basicDetails.blockId)
            this.getPanchayat()
        if (egDetails.egTypes.length)
            this.getSectorTypes()
        if (egDetails.egSectorTypes.length)
            this.getCommodityTypes()
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps, "propasd")
        if (prevState.init)
            return {
                ...nextProps,
                uploadDocuments: nextProps.egFormUploadDocument,
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
        let { egFormMembers, errors } = this.state
        egFormMembers[name] = value
        egFormMembers['noOfVulTransGender'] = egFormMembers['noOfTransGender']
        errors[name] = undefined
        errors[section] = undefined
        this.setState({ egFormMembers, errors }, () => this.handleMembersCallBack(section, value))
    }

    handleMembersCallBack = (section) => {
        let { egFormMembers } = this.state

        if (section === 'totalMembers' || section === 'noOfStaffEngaged') {
            let { egFormMembers, errors } = this.state
            egFormMembers = {
                ...egFormMemberInitialState,
                totalMembers: egFormMembers.totalMembers,
                noOfStaffEngaged: egFormMembers.noOfStaffEngaged
            }
            errors = {
                totalMembers: errors.totalMembers,
                noOfStaffEngaged: errors.noOfStaffEngaged
            }
            this.setState({
                egFormMembers,
                errors
            })
        }
        else {
            let fieldGroups = {
                'activeInactiveTotal': ['noOfActive', 'noOfInActive'],
                "genderTotal": ["noOfMale", "noOfFemale", "noOfTransGender"],
                "communityTotal": ["noOfBC", "noOfMBC", "noOfSC", "noOfST", "noOfCommunityOthers"],
                "minorityTotal": ["noOfMuslim", "noOfChristians", "noOfMinorityOthers"],
                "vulnerableTotal": ["noOfDiffAbled", "noOfWidow", "noOfDesitute", "noOfDeserted", "noOfTransGender", "noOfEiderly"],
                "shgTotal": ["noOfSHGMembers", 'noOfNonSHGTotal', "noOfSHGTotal"]
            }
            let fields = fieldGroups[section]
            egFormMembers[section] = fields.filter(data => egFormMembers[data]).reduce((acc, value) => {
                return acc + parseInt(egFormMembers[value])
            }, 0)
            this.setState({
                egFormMembers
            })
        }
    }




    //OTHERS
    handleCallBack = (name,value) => {
        let { egDetails, egFormAmountRecevied, promotingOrgData, formedByData, registrationUnderData, errors } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
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
        }else
        if (name === "egTypes") {
            egDetails['egSectorTypes'] = []
            egDetails['egCommodityTypes'] = []
            this.setState({ egDetails }, this.getSectorTypes)
        } else if (name === "egSectorTypes") {
            egDetails['egCommodityTypes'] = []
            this.setState({ egDetails }, this.getCommodityTypes)
        }else
        if (name === "egTypes") {
            
            egDetails['egSectorTypes'] = []
            egDetails['egCommodityTypes'] = []
            this.setState({ egDetails }, this.getSectorTypes)
        } if (name === "egSectorTypes") {
            egDetails['egCommodityTypes'] = []
            this.setState({ egDetails }, this.getCommodityTypes)
        } if (name === 'registrationUnder') {
            egDetails['registrationNumber'] = ''
            errors['registrationNumber'] = null
            egDetails['registerationNumberRegex'] = registrationUnderData.find(data => data.value === parseInt(value))?.regxType
        }
        if (name === 'promotingOrgs') {
            egDetails['promotingOrgName'] = ''
            errors['promotingOrgName'] = null
        }
        if (name === 'supportingOrg') {
            egDetails['supportingOrgName'] = ''
            errors['supportingOrgName'] = null
        }
        if (parseInt(egDetails.registrationUnder) !== registrationOthersVal && egDetails.registrationUnderOthers) {
            egDetails['registrationUnderOthers'] = null
        } if (parseInt(egDetails.promotingOrgs) === promoOrgOtherVal) {
            egDetails['promotingOrgName'] = null
        } if (parseInt(egDetails.supportingOrg) === formedByOtherVal) {
            egDetails['supportingOrgName'] = null
        }
        if (name === 'isSpecialEPO') {
            egFormAmountRecevied['specifyEPO'] = ''
            errors['specifyEPO'] = ''
        }
        if (name === 'isLoanGrant') {
            egFormAmountRecevied['fundProvider'] = ''
            egFormAmountRecevied['amtRecevied'] = ''
            errors['fundProvider'] = ''
            errors['amtRecevied'] = ''
        }
        console.log(name,"changes")
        this.setState({ egDetails, egFormAmountRecevied, errors })
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

    getPCDetails = async () => {
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
            loading: true
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
        this.setState({ loading: false })
    }

    getSectorTypes = async () => {
        const { cancelToken, egDetails } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...SECTOR_TYPES,
            data: {
                "activityId": egDetails && egDetails.egTypes && egDetails.egTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                sectorTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    }
    getCommodityTypes = async () => {
        const { cancelToken, egDetails } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...COMMODITY_TYPES,
            data: {
                "sectorId": egDetails && egDetails.egSectorTypes && egDetails.egSectorTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                commodityTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    }
    onAddOrRemoveActivity = (index = null) => {
        let { egFormProposedActivity } = this.state
        if (index === null) {
            egFormProposedActivity.push(Object.assign({}, this.defaultActivityObject))
        }
        else {
            egFormProposedActivity = egFormProposedActivity.filter((data, i) => index !== i)
        }
        this.setState({
            egFormProposedActivity
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { errors, egFormAmountRecevied, egDetails, promotingOrgData, formedByData, registrationUnderData } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        const isValid = inputValidation.every(({ formName, validation, exec }, i) => {
            console.log(egFormAmountRecevied,"values")
            let formData = this.state[formName]
            if (exec) {
                let isValid = exec(formData)
                errors[formName] = !isValid ? ['Enter the proposal activity details!!'] : []
                return exec(formData)
            }
            validation = {
                ...validation,
                ...(
                    !egFormAmountRecevied.isSpecialEPO ? {
                        specifyEPO: undefined
                    } : ''
                ),
                ...(parseInt(egDetails.promotingOrgs) === promoOrgOtherVal ? {
                    promotingOrgName: undefined
                } : ''),
                ...(parseInt(egDetails.supportingOrg) === formedByOtherVal ? {
                    supportingOrgName: undefined
                } : ''),
                ...(!egDetails.registrationUnder ? { registrationNumber: undefined } : ''),
                ...(
                    egDetails.registrationUnder != registrationOthersVal ? { registrationUnderOthers: undefined } : ''
                ),
                ...(
                    !egFormAmountRecevied.isLoanGrant ? {
                        fundProvider: undefined,
                        amtRecevied : undefined
                    } : ''
                ),

            }
            console.log(validation,"validation")
            let error = validate(formData, validation)
            if (error)
                errors = {
                    ...error
                }
            return !error
        })
        console.log(errors,"erros")
        if (!isValid) {
            let filteredErros = Object.keys(errors)
                .filter(data => errors[data] && errors[data].length)
                .map(error => ({ error: errors[error][0] }))
            let error = filteredErros[0].error
            toast(error, 'error')
            this.setState({
                errors
            })
        } else {
            // console.log('else')
            console.log("validation true and callling model")
            this.setState({
                ...this.state,
                showModel: true,
            })
        }
    }
    SubmitApplication = async () =>{
        console.log("api calling")

            let pcForms = [
                {
                    label: 'basicDetails',
                    includeFormId: true
                },
                {
                    label: 'egDetails',
                    includeFormId: true
                },
                {
                    label: 'egFormMembers',
                    includeFormId: true
                },
                {
                    label: 'egFormAmountRecevied',
                    includeFormId: true
                },
                {
                    label: 'egFormBankDetails',
                    includeFormId: true
                },
                {
                    label: 'egFormProposedActivity'
                },
                {
                    label: 'uploadDocuments',
                    includeFormId: true
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
                ...SUBMIT_EG_FORM_API,
                data: data,
                cancelToken: cancelToken.token,
            };
            // console.log(requestPayload,'requestPayloaddd')
            let response = await API(requestPayload);
            if (response.status >= 200 && response.status <= 300) {
                toast('Successfully application created', 'success')
                if (STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role')))
                    this.props.history.replace('/staff/dashboard')
                else this.props.history.replace('/user/dashboard')
            } else {
                toast('Error!!', 'error')
            }
            this.setState({ isSubmitting:false })
    }

    render() {
        let { isSubmitting } = this.state
        // console.log(this.state, "staasdas")
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
                                    <Button outline color="lighGrey-2 w-100 border-primary " className="fw-600"
                                        onClick={() => this.props.history.push('/user/dashboard')}
                                    >Cancel</Button>
                                </Col>
                                <Col >
                                    <Button
                                        color="primary w-100 border-none"
                                        className="fw-600"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ?
                                            "Submiting"
                                            :
                                            "submit"
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
                    {/* BASIC DETAILS  */}
                    <BasicDetailsForm
                        {...this.state}
                        onChange={(...params) => this.onChange(...params)('basicDetails')}
                    />
                    {/* DETAILS  */}
                    <DetailsForm
                        {...this.state}
                        onChange={(...params) => this.onChange(...params)('egDetails')}
                    />
                    {/* Memers  */}
                    <MembersForm
                        {...this.state}
                        onChange={(...params) => this.membersFormChange(...params)}
                    />
                    {/* Amount  */}
                    <AmountForm
                        {...this.state}
                        onChange={(...params) => this.onChange(...params)('egFormAmountRecevied')}
                    />
                    {/* Bank Details  */}
                    <BankDetailsForm
                        {...this.state}
                        onChange={(...params) => this.onChange(...params)('egFormBankDetails')}
                    />
                    {/* Activity  */}
                    <ActivityForm
                        {...this.state}
                        onChange={(...params) => this.onChange(...params)('egFormProposedActivity')}
                        onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                    />
                    {/* Upload  */}
                    <UploadForm
                        {...this.state}
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
    return state.publicUser.application.newApp.enterpriseGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
}

const ReviewSubmit = connect(mapStateToProps, mapDispatchToProps)(ReviewSubmitClass)

export { ReviewSubmit };

let inputValidation = [
    {
        formName: 'basicDetails',
        validation: {
            mobileNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Mobile number can't be blank"
                }
            },
            name: {
                presence: {
                    allowEmpty: false,
                    message: "^Name can't be blank"
                }
            },
            egName: {
                presence: {
                    allowEmpty: false,
                    message: "^EG Name can't be blank"
                }
            },
            egAddress: {
                presence: {
                    allowEmpty: false,
                    message: "^EG Address can't be blank"
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
            }
        }
    },
    {
        formName: 'egDetails',
        validation: {
            dateFormation: {
                presence: {
                    allowEmpty: false,
                    message: "^Date Formation can't be blank"
                }
            },
            egTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of PC can't be blank"
                }
            },
            egCommodityTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of Commodity can't be blank"
                }
            },
            egSectorTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of Sector can't be blank"
                }
            },
            registrationNumber: {
                validateWithRegex: 'registerationNumberRegex'
            },
            promotingOrgs: {
                presence: {
                    allowEmpty: false,
                    message: "^Promoting Org can't be blank"
                }
            },
            promotingOrgName: {
                presence: {
                    allowEmpty: false,
                    message: "^Promoting Organisation name can't be blank"
                }
            },
            supportingOrg: {
                presence: {
                    allowEmpty: false,
                    message: "^Form Supported By can't be blank"
                }
            },
            supportingOrgName: {
                presence: {
                    allowEmpty: false,
                    message: "^Form Supported by Name can't be blank"
                }
            },
            relevantSupportOrg: {
                presence: {
                    allowEmpty: false,
                    message: "^Name of Relevant Support Org can't be blank"
                }
            }
        }
    },
    {
        formName: 'egFormMembers',
        validation: {
            totalMembers: {
                presence: {
                    allowEmpty: false,
                    message: "^Total Members can't be blank"
                }
            },
            noOfStaffEngaged: {
                presence: {
                    allowEmpty: false,
                    message: "^staff engaged Members can't be blank"
                }
            },
            noOfActive: {
                presence: {
                    allowEmpty: false,
                    message: "^No of Active can't be blank"
                }
            },
            noOfInActive: {
                presence: {
                    allowEmpty: false,
                    message: "No of Inactive can't be blank"
                }
            },
            activeInactiveTotal: {
                validateMembers: {
                    shouldMatch: 'totalMembers',
                    fields: ['noOfActive', 'noOfInActive']
                }
            },
            noOfMale: {
                presence: {
                    allowEmpty: false,
                    message: "^No of male can't be blank"
                }
            },
            noOfFemale: {
                presence: {
                    allowEmpty: false,
                    message: "^No of female can't be blank"
                }
            },
            noOfTransGender: {
                presence: {
                    allowEmpty: false,
                    message: "^No of transgender can't be blank"
                }
            },
            genderTotal: {
                validateMembers: {
                    shouldMatch: 'totalMembers',
                    fields: ['noOfMale', 'noOfFemale', 'noOfTransGender']
                }
            },
            noOfBC: {
                presence: {
                    allowEmpty: false,
                    message: "^BC can't be blank"
                }
            },
            noOfMBC: {
                presence: {
                    allowEmpty: false,
                    message: "^MBC can't be blank"
                }
            },
            noOfSC: {
                presence: {
                    allowEmpty: false,
                    message: "^SC can't be blank"
                }
            },
            noOfST: {
                presence: {
                    allowEmpty: false,
                    message: "^ST can't be blank"
                }
            },

            noOfCommunityOthers: {
                presence: {
                    allowEmpty: false,
                    message: "^others can't be blank"
                }
            },
            communityTotal: {
                validateMembers: {
                    shouldMatch: 'totalMembers',
                    fields: ['noOfBC', 'noOfMBC', 'noOfSC', 'noOfST', 'noOfCommunityOthers']
                }
            },
            noOfMuslim: {
                presence: {
                    allowEmpty: false,
                    message: "^No of muslim can't be blank"
                }
            },
            noOfChristians: {
                presence: {
                    allowEmpty: false,
                    message: "^No of christian can't be blank"
                }
            },
            noOfMinorityOthers: {
                presence: {
                    allowEmpty: false,
                    message: "^No of minority can't be blank"
                }
            },
            minorityTotal: {
                validateIsLesserThan: {
                    shouldLesserThan: 'totalMembers',
                    fields: ['noOfMuslim', 'noOfChristians', 'noOfMinorityOthers']
                }
            },
            noOfDiffAbled: {
                presence: {
                    allowEmpty: false,
                    message: "^No of differntly abled can't be blank"
                }
            },
            noOfWidow: {
                presence: {
                    allowEmpty: false,
                    message: "^No of widow can't be blank"
                }
            },
            noOfDesitute: {
                presence: {
                    allowEmpty: false,
                    message: "^No of D can't be blank"
                }
            },
            noOfDeserted: {
                presence: {
                    allowEmpty: false,
                    message: "^No of deserted can't be blank"
                }
            },
            noOfEiderly: {
                presence: {
                    allowEmpty: false,
                    message: "^No of elderly can't be blank"
                }
            },
            noOfSHGMembers: {
                presence: {
                    allowEmpty: false,
                    message: "^No of SHG can't be blank"
                }
            },
            vulnerableTotal: {
                validateIsLesserThan: {
                    shouldLesserThan: 'totalMembers',
                    fields: [
                        'noOfDiffAbled',
                        'noOfWidow',
                        'noOfDesitute',
                        'noOfDeserted',
                        'noOfTransGender',
                        'noOfEiderly'
                    ]
                }
            },
            noOfSHGTotal: {
                presence: {
                    allowEmpty: false,
                    message: "^No of SHG total can't be blank"
                }
            },
            noOfNonSHGTotal: {
                presence: {
                    allowEmpty: false,
                    message: "^No of Non SHG total can't be blank"
                }
            },
            shgTotal: {
                validateMembers: {
                    shouldMatch: 'totalMembers',
                    fields: ['noOfSHGMembers', 'noOfNonSHGTotal', 'noOfSHGTotal']
                }
            },
        }
    },
    {
        formName: 'egFormAmountRecevied',
        validation: {
            "amtGrant": {
                presence: {
                    allowEmpty: false,
                    message: "^Amount grant can't be blank"
                }
            },
            "amtReceviedLoan": {
                presence: {
                    allowEmpty: false,
                    message: "^Loan received can't be blank"
                }
            },
            "isLoanGrant": {
                presence: {
                    allowEmpty: true,
                    message: "^Is loan grant can't be blank"
                }
            },
            "fundProvider": {
                presence: {
                    allowEmpty: false,
                    message: "^Fund provider name can't be blank"
                }
            },
            "amtRecevied": {
                presence: {
                    allowEmpty: false,
                    message: "^Amount Received can't be blank"
                }
            },
            // "nameOfPc": {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Name of PC can't be blank"
            //     }
            // },
            "isSpecialEPO": {
                presence: {
                    allowEmpty: false,
                    message: "^Is special EPO can't be blank"
                }
            },
            'specifyEPO': {
                presence: {
                    allowEmpty: false,
                    message: "^Special EPO can't be blank"
                }
            }
        }
    },
    {
        formName: 'egFormBankDetails',
        validation: {
            accNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Acc Number can't be blank"
                }
            },
            confirmAccNumber : {
                presence: {
                    allowEmpty: false,
                    message: "^Confirm Acc number can't be blank"
                },
                validateConfirmAccountNumber : 'accNumber'
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
            noOfLastTransaction: {
                presence: {
                    allowEmpty: false,
                    message: "^No of transactions in last six months can't be blank"
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
            }
        }
    },
    {
        formName: 'egFormProposedActivity',
        exec: (egFormProposedActivity) =>
            egFormProposedActivity?.length && egFormProposedActivity.every(data => data.activityName && data.activityTimeLine && data.activityTimeLineVal && data.amtReq)
    },
    {
        formName: 'uploadDocuments',
        validation: {
            "bankPassBook": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "minOfEGRefund": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "businessPlan": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "remarks": {
                presence: {
                    allowEmpty: false,
                    message: "^Remarks can't be blank"
                }
            }
        }
    }
]