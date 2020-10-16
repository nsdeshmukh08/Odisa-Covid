import React, { Component } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerCollective';
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
import { scrollTo } from 'helpers'

const { UPLOAD_DOC_API, SUBMIT_FORM_API, GET_PC_DETALS_OPTIONS_API,SECTOR_TYPES, COMMODITY_TYPES, GET_PRODUCER_GROUP_TYPES } = API_BOOK.APPLICATION;
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;


let pcFormMemberInitialState = {
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
        formId : localStorage.getItem('createAppformId'),
        "activityName": null,
        "activityTimeLine": undefined,
        "amtReq": undefined
    }
    
    state = {
        //BASIC
        basicDetails: {
            "formId": null,
            "mobileNumber": null,
            "name": null,
            "pcName": null,
            "pcAddress": null,
            "districtId": null,
            "blockId": null,
            "panchayatId": null
        },
        districtList: [],
        blockList: [],
        panchayatList: [],
        //DETAILS
        pcDetails: {
            formId: null,
            dateFormation: null,
            dateRegistration: null,
            registrationNumber: null,
            promotingOrgs: null,
            promotingOrgName: null,
            noOfPG: null,
            registerationNumberRegex : null,
            registrationUnderOthers:null,
            pcTypes: [],
            pcCommodityTypes: [],
            pcSectorTypes: [],
            registrationUnder: null,
            supportingOrg: null,
            supportingOrgName: null,
            relevantSupportOrg : null
        },
        typesOfSector: [],
        activityData: [],
        typesOfCommodity: [],
        typesOfSector:[],
        typesOfPc: [],
        formedByData: [],
        registrationUnderData: [],
        //MEMBERS
        pcFormMembers: {
            "formId": null,
            "totalMembers" : null,
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
        },
        //AMOUNT
        pcFormAmountRecevied: {
            "formId": undefined,
            "amtGrant": '',
            "amtReceviedLoan": '',
            "isLoanGrant": false,
            "fundProvider": null,
            "amtRecevied": '',
            "shareCapital": null,
            "isSpecialEPO": false,
            "specifyEPO": null
        },
        //BANK
        pcFormBankDetails: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber": null,
            "accName": null,
            "bnkName": null,
            "branchName": null,
            "ifscCode": null
        },
        //Activity
        pcFormProposedActivity: [
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
            "regCertificate": [],
            "auditStatement": [],
            "bankPassBook": [],
            "latestMomRes": [],
            "businessPlan": [],
            "remarks": null
        },
        uploadingIndexes: [],
        errors: {},
        loading: false,
        isSubmitting : false,
        cancelToken: axios.CancelToken.source(),
        init: true,
        formedByData:[],
        registrationUnderData:[],
        promotingOrgData:[],
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
        const { basicDetails,pcDetails } = this.state
        basicDetails['mobileNumber']=this.props.profile.mobileNumber
        this.setState({
            basicDetails
        },() => {
            this.getDistrict();
            this.getPCDetails()
            if (basicDetails.districtId)
                this.getBlock()
            if (basicDetails.blockId)
                this.getPanchayat()
                this.getProducerGroup()
            if(pcDetails.pcTypes.length)
                this.getSectorTypes()
            if(pcDetails.pcSectorTypes.length)
                this.getCommodityTypes()
        })

            
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                ...nextProps.producerCollective,
                uploadDocuments: nextProps.producerCollective.pcFormUploadDocument,
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
        let { pcFormMembers, errors } = this.state
        pcFormMembers[name] = value
        pcFormMembers['noOfVulTransGender'] = pcFormMembers['noOfTransGender']
        errors[name] = undefined
        errors[section] = undefined
        this.setState({ pcFormMembers, errors }, () => this.handleMembersCallBack(section, value))
    }

    handleMembersCallBack = (section) => {
        let { pcFormMembers } = this.state

        if (section === 'totalMembers') {
            let { pcFormMembers, errors } = this.state
            pcFormMembers = {
                ...pcFormMemberInitialState,
                totalMembers: pcFormMembers.totalMembers
            }
            errors = {
                totalMembers: errors.totalMembers
            }
            this.setState({
                pcFormMembers,
                errors
            })
        } else {
            let fieldGroups = {
                'activeInactiveTotal': ['noOfActive', 'noOfInActive'],
                "genderTotal": ["noOfMale", "noOfFemale", "noOfTransGender"],
                "communityTotal": ["noOfBC", "noOfMBC", "noOfSC", "noOfST", "noOfCommunityOthers"],
                "minorityTotal": ["noOfMuslim", "noOfChristians", "noOfMinorityOthers"],
                "vulnerableTotal": ["noOfDiffAbled", "noOfWidow", "noOfDesitute", "noOfDeserted", "noOfTransGender", "noOfEiderly"],
                "shgTotal": ["noOfSHGMembers", 'noOfNonSHGTotal', "noOfSHGTotal"]
            }
            let fields = fieldGroups[section]
            pcFormMembers[section] = fields.filter(data => pcFormMembers[data]).reduce((acc, value) => {
                return acc + parseInt(pcFormMembers[value])
            }, 0)
            if(section === 'genderTotal'){
                let fields = fieldGroups['vulnerableTotal']
                pcFormMembers['vulnerableTotal'] = fields.filter(data => pcFormMembers[data]).reduce((acc, value) => {
                    return acc + parseInt(pcFormMembers[value])
                }, 0)
            }
            this.setState({
                pcFormMembers
            })
        }
    }


    //OTHERS
    handleCallBack = (name,value) => {
        let { pcDetails,pcFormAmountRecevied,promotingOrgData,formedByData,registrationUnderData,errors } = this.state
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
        }
        if(name === "pcTypes"){
            pcDetails['pcSectorTypes'] = []
            pcDetails['pcCommodityTypes'] = []
            this.setState({pcDetails},this.getSectorTypes)
        }else if(name === "pcSectorTypes"){
            pcDetails['pcCommodityTypes'] = []
            this.setState({pcDetails},this.getCommodityTypes)
        }
        if(name === 'registrationUnder'){
            pcDetails['registrationNumber'] = ''
            errors['registrationNumber'] = null
            pcDetails['registerationNumberRegex'] = registrationUnderData.find(data => data.value === parseInt(value))?.regxType
        }
        
        if(name === 'promotingOrgs'){
            pcDetails['promotingOrgName'] = ''
            errors['promotingOrgName'] = null
        }
        
        if(name === 'supportingOrg'){
            pcDetails['supportingOrgName'] = ''
            errors['supportingOrgName'] = null
        }
        
        if(parseInt(pcDetails.registrationUnder) !== registrationOthersVal && pcDetails.registrationUnderOthers){
            pcDetails['registrationUnderOthers'] =null
        }
        if(parseInt(pcDetails.promotingOrgs) === promoOrgOtherVal){
            pcDetails['promotingOrgName'] =null
        }
        if(parseInt(pcDetails.supportingOrg) === formedByOtherVal){
            pcDetails['supportingOrgName'] =null
        }
        
        if(name === 'isSpecialEPO'){
            pcFormAmountRecevied['specifyEPO'] = null
        }
        
        if(name === 'isLoanGrant'){
            pcFormAmountRecevied['fundProvider'] = null
            pcFormAmountRecevied['amtRecevied'] = null
        }
        this.setState({ pcDetails,pcFormAmountRecevied,errors })
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
                typesOfPc: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

    getSectorTypes = async () => {
        const { cancelToken, pcDetails } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...SECTOR_TYPES,
            data: {
                "activityId": pcDetails && pcDetails.pcTypes && pcDetails.pcTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                typesOfSector: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

    getCommodityTypes = async () => {
        const { cancelToken, pcDetails } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...COMMODITY_TYPES,
            data: {
                "sectorId": pcDetails && pcDetails.pcSectorTypes && pcDetails.pcSectorTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                typesOfCommodity: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

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
                registrationUnderData,
                promotingOrgData
            } = response.data.data
            this.setState({
                formedByData,
                registrationUnderData,
                promotingOrgData
            });
        }
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    onAddOrRemoveActivity = (index = null) => {
        let { pcFormProposedActivity } = this.state
        if (index === null) {
            pcFormProposedActivity.push(Object.assign({}, this.defaultActivityObject))
        }
        else {
            pcFormProposedActivity = pcFormProposedActivity.filter((data, i) => index !== i)
        }
        this.setState({
            pcFormProposedActivity
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { errors, pcFormAmountRecevied, pcDetails,promotingOrgData,formedByData, registrationUnderData } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let scrollContainer = null
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        const isValid = inputValidation.every(({ formName, validation, exec }, i) => {
            let formData = this.state[formName]
            if (exec){
                let isValid=exec(formData)
                errors[formName] = !isValid ? ['Enter the proposal activity details!!'] : [] 
                if(errors[formName].length)
                    scrollContainer = formName
                return exec(formData)
            }
                
            validation = {
                ...validation,
                ...(parseInt(pcDetails.promotingOrgs) === promoOrgOtherVal ? {
                    promotingOrgName : undefined
                } :''),
                ...(parseInt(pcDetails.supportingOrg) === formedByOtherVal ? {
                    supportingOrgName : undefined
                } :''),
                ...(!pcDetails.registrationUnder ? { registrationNumber : undefined } : ''),
                ...(
                        pcDetails.registrationUnder != registrationOthersVal ? { registrationUnderOthers : undefined } : ''
                    ),
                ...(
                    !pcFormAmountRecevied.isSpecialEPO ? ({
                        specifyEPO: undefined
                    }) : ''
                ),
                ...(
                    !pcFormAmountRecevied.isLoanGrant ? ({
                        fundProvider: undefined,
                        amtRecevied: undefined
                    }) : ''
                )
            }
            let error = validate(formData, validation)
            if(error){
                scrollContainer = formName
                errors=error
            }
            return !error
        })
        if (!isValid) {
            let filteredErros = Object.keys(errors)
                                    .filter(data => errors[data] && errors[data].length)
                                    .map(error =>  ({ error: errors[error][0] }))
            let error = filteredErros[0].error
            toast(error, 'error')
            this.setState({
                errors
            }, () => {
                scrollTo(scrollContainer)
            })
        } else {
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
                    label: 'pcDetails',
                    includeFormId: true
                },
                {
                    label: 'pcFormMembers',
                    includeFormId: true
                },
                {
                    label: 'pcFormAmountRecevied',
                    includeFormId: true
                },
                {
                    label: 'pcFormBankDetails',
                    includeFormId: true
                },
                {
                    label: 'pcFormProposedActivity'
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
                ...SUBMIT_FORM_API,
                data: data,
                cancelToken: cancelToken.token,
            };
            // console.log(requestPayload)
            let response = await API(requestPayload);
            if (response.status >= 200 && response.status <= 300) {
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
        console.log(this.state.uploadDocuments,"state")
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
                                        color="lighGrey-2 w-100 border-primary " 
                                        className="fw-600"
                                        onClick={() => this.props.history.push('/user/dashboard')}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col >
                                    <Button disabled={isSubmitting}color="primary w-100 border-none" className="fw-600" type="submit">
                                        {isSubmitting ? 'Submitting...':'Submit'}
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
                        id="basicDetails"
                        onChange={(...params) => this.onChange(...params)('basicDetails')}
                    />
                    {/* DETAILS  */}
                    <DetailsForm
                        {...this.state}
                        id="pcDetails"
                        onChange={(...params) => this.onChange(...params)('pcDetails')}
                    />
                    {/* Memers  */}
                    <MembersForm
                        {...this.state}
                        id="pcFormMembers"
                        onChange={(...params) => this.membersFormChange(...params)}
                    />
                    {/* Amount  */}
                    <AmountForm
                        {...this.state}
                        id="pcFormAmountRecevied"
                        onChange={(...params) => this.onChange(...params)('pcFormAmountRecevied')}
                    />
                    {/* Bank Details  */}
                    <BankDetailsForm
                        {...this.state}
                        id="pcFormBankDetails"
                        onChange={(...params) => this.onChange(...params)('pcFormBankDetails')}
                    />
                    {/* Activity  */}
                    <ActivityForm
                        {...this.state}
                        id="pcFormProposedActivity"
                        onChange={(...params) => this.onChange(...params)('pcFormProposedActivity')}
                        onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                    />
                    {/* Upload  */}
                    <UploadForm
                        {...this.state}
                        id="uploadDocuments"
                        onChange={(...params) => this.onChange(...params)('uploadDocuments')}
                        onUpload={this.onUpload}
                    />
                </div>
            </form>
            </>
        )
    }
}

const mapStateToProps = ({publicUser,profile}) => {
    return {
        producerCollective: publicUser.application.newApp.producerCollective,
        profile
    }
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
            pcName: {
                presence: {
                    allowEmpty: false,
                    message: "^PC Name can't be blank"
                }
            },
            pcAddress: {
                presence: {
                    allowEmpty: false,
                    message: "^PC Address can't be blank"
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
        formName: 'pcDetails',
        validation: {
            dateFormation : {
                presence: {
                    allowEmpty: false,
                    message: "^Date of Formation can't be blank"
                }
            },
            relevantSupportOrg:{
                presence: {
                    allowEmpty: false,
                    message: "^Name of Relevant Support Org can't be blank"
                }  
            },
            promotingOrgs: {
                presence: {
                    allowEmpty: false,
                    message: "^Promoting Org can't be blank"
                }
            },
            registrationNumber: {
              
                validateWithRegex:'registerationNumberRegex'
            },
            promotingOrgName: {
                presence: {
                    allowEmpty: false,
                    message: "^Promoting Organisation name can't be blank"
                }
            },
            noOfPG: {
                presence: {
                    allowEmpty: false,
                    message: "^No of PG can't be blank"
                }
            },
            pcTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of PC can't be blank"
                }
            },
            pcCommodityTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of Commodity can't be blank"
                }
            },
            pcSectorTypes: {
                presence: {
                    allowEmpty: false,
                    message: "^Types of Sector can't be blank"
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
            }
        }
    },
    {
        formName: 'pcFormMembers',
        validation: {
            totalMembers : {
                presence: {
                    allowEmpty: false,
                    message: "^Total Members can't be blank"
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
                validateMembers : {
                    shouldMatch : 'totalMembers',
                    fields : ['noOfActive','noOfInActive']
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
                validateMembers : {
                    shouldMatch : 'totalMembers',
                    fields : ['noOfMale','noOfFemale','noOfTransGender']
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
                validateMembers : {
                    shouldMatch : 'totalMembers',
                    fields : ['noOfBC','noOfMBC','noOfSC','noOfST','noOfCommunityOthers']
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
                validateIsLesserThan : {
                    shouldLesserThan : 'totalMembers',
                    fields : ['noOfMuslim','noOfChristians','noOfMinorityOthers']
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
                    message: "^No of Destitute can't be blank"
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
            vulnerableTotal: {
                validateIsLesserThan : {
                    shouldLesserThan : 'totalMembers',
                    fields : [
                        'noOfDiffAbled',
                        'noOfWidow',
                        'noOfDesitute',
                        'noOfDeserted',
                        'noOfTransGender',
                        'noOfEiderly'
                    ]
                }
            },
            noOfSHGMembers: {
                presence: {
                    allowEmpty: false,
                    message: "^No of SHG can't be blank"
                }
            },
            noOfSHGTotal: {
                presence: {
                    allowEmpty: false,
                    message: "^No of SHG total can't be blank"
                }
            },
            noOfNonSHGTotal : {
                presence: {
                    allowEmpty: false,
                    message: "^No of Non SHG total can't be blank"
                }
            },
            shgTotal: {
                validateMembers : {
                    shouldMatch : 'totalMembers',
                    fields : ['noOfSHGMembers','noOfNonSHGTotal','noOfSHGTotal']
                }
            },
        }
    },
    {
        formName: 'pcFormAmountRecevied',
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
                    allowEmpty: false,
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
            "shareCapital": {
                presence: {
                    allowEmpty: false,
                    message: "^Share capital can't be blank"
                }
            },
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
        formName: 'pcFormBankDetails',
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
        formName: 'pcFormProposedActivity',
        exec: (pcFormProposedActivity) =>
        pcFormProposedActivity.length&&pcFormProposedActivity.every(data => (data.activityName && data.activityTimeLine && data.activityTimeLineVal && data.amtReq))
    },
    {
        formName: 'uploadDocuments',
        validation: {
            "regCertificate": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "auditStatement": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "bankPassBook": {
                presence: {
                    allowEmpty: false,
                    message: "^Document is mandatory"
                }
            },
            "latestMomRes": {
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