import React, { Component } from 'react';

import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/enterpriseGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { calculateAge } from 'helpers/momentHelpers'
import DetailsForm from './DetailsForm'

const { GET_PC_DETALS_OPTIONS_API,SECTOR_TYPES, COMMODITY_TYPES, GET_PRODUCER_GROUP_TYPES } = API_BOOK.APPLICATION;


export class DetailsFunc extends Component {
    state = {
        egDetails: {                
            formId: null,
            dateFormation: null,
            dateRegistration: null,
            registrationNumber: null,
            registerationNumberRegex : null,
            promotingOrgs: null,
            promotingOrgName: null,
            registrationUnderOthers:null,
            supportingOrg: null,
            supportingOrgName: null,
            relevantSupportOrg : null,
            registrationUnder: null,
            egTypes: [],
            egCommodityTypes: [],
            egSectorTypes: [],
        },
        errors: {},
        cancelToken: axios.CancelToken.source(),
        init: true,
        typesOfSector: [],
        producerTypes:[],
        sectorTypes:[],
        commodityTypes: [],
        activityData: [],
        typesOfCommodity: [],
        typesOfPc: [],
        promotingOrgData: [],
        formedByData: [],
        registrationUnderData: [],
        init:true
    }

    componentDidMount() {
        let { egDetails } = this.state;
        this.getegDetails()
        this.getProducerGroup() 
        if(egDetails.egTypes.length)
        this.getSectorTypes()
        if(egDetails.egSectorTypes.length)
            this.getCommodityTypes()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                egDetails: {
                    ...nextProps.egDetails,
                },
                init: false
            }
        return null
    }
    
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
        // console.log('iscalled', response)
        if (response.status === 200)
            this.setState({
                producerTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }
 
    getSectorTypes = async () => {
        const { cancelToken, egDetails } = this.state;
        this.setState({
            loading : true
        })
        let requestPayload = {
            ...SECTOR_TYPES,
            data: {
                "activityId": egDetails && egDetails.egTypes && egDetails.egTypes.map(res => res.value)
            },
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        // console.log('iscallled1', response)
        if (response.status === 200)
            this.setState({
                sectorTypes: response.data.data
            });
        else toast(response.data.message, "error");
        this.setState({ loading:false })
    }

    getCommodityTypes = async () => {
        const { cancelToken, egDetails } = this.state;
        this.setState({
            loading : true
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
        this.setState({ loading:false })
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { egDetails, errors } = this.state
        egDetails[name] = value
        errors[name] = undefined
        this.setState({ egDetails, errors }, () => this.handleCallBack(name,value))
    }

    handleCallBack = (name,value) => {
        let { egDetails,promotingOrgData,formedByData,registrationUnderData,errors } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        if(name === "egTypes"){
            egDetails['egSectorTypes'] = []
            egDetails['egCommodityTypes'] = []
            this.setState({egDetails},this.getSectorTypes)
        }else if(name === "egSectorTypes"){
            egDetails['egCommodityTypes'] = []
            this.setState({egDetails},this.getCommodityTypes)
        }else if(name === 'registrationUnder'){
            egDetails['registrationNumber'] = ''
            errors['registrationNumber'] = null
            egDetails['registerationNumberRegex'] = registrationUnderData.find(data => data.value === parseInt(value))?.regxType
        }
        else if(name === 'promotingOrgs'){
            egDetails['promotingOrgName'] = ''
            errors['promotingOrgName'] = null
        }
        else if(name === 'supportingOrg'){
            egDetails['supportingOrgName'] = ''
            errors['supportingOrgName'] = null
        }
        else if(parseInt(egDetails.registrationUnder) !== registrationOthersVal && egDetails.registrationUnderOthers){
            egDetails['registrationUnderOthers'] =null

        }else if(parseInt(egDetails.promotingOrgs) === promoOrgOtherVal){
            egDetails['promotingOrgName'] =null
        }else if(parseInt(egDetails.supportingOrg) === formedByOtherVal){
            egDetails['supportingOrgName'] =null
        }
            this.setState({ egDetails,errors })
    }

    //SERVICE

    getegDetails = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...GET_PC_DETALS_OPTIONS_API,
            cancelToken: cancelToken.token,
        }
        let response = await API(requestPayload);
        if (response.status === 200) {
            let {
                promotingOrgData,
                formedByData,
                registrationUnderData,
                typesOfPc,
                typesOfCommodity,
                typesOfSector,
                activityData
            } = response.data.data
            this.setState({
                promotingOrgData,
                formedByData,
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

    onSubmit = (e) => {
        e.preventDefault()
        let {
            egDetails,
            promotingOrgData,
            registrationUnderData,
            formedByData,
            cancelToken 
        } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        let validation = {
            ...inputValidations,
            ...(parseInt(egDetails.promotingOrgs) === promoOrgOtherVal ? {
                promotingOrgName : undefined
            } :''),
            ...(parseInt(egDetails.supportingOrg) === formedByOtherVal ? {
                supportingOrgName : undefined
            } :''),
            ...(!egDetails.registrationUnder ? { registrationNumber : undefined } : ''),
            ...(
                    egDetails.registrationUnder != registrationOthersVal ? { registrationUnderOthers : undefined } : ''
                )
        }
        const notValid = validate(egDetails, validation);
        console.log(notValid,"notVakud")
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            egDetails['formId'] = localStorage.getItem('createAppformId')
            this.props.updateForm(
                {
                    data: egDetails, stage
                },
                cancelToken.token
            )
        }
    }

    render() {
        let pathname = this.props.location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
        const {
            loading,
        } = this.state
        return (
            <form className="container theme-one-common mt-3 bg-white" onSubmit={this.onSubmit}>
                <DetailsForm {...this.state} onSubmit={this.onSubmit} onChange={this.onChange}/>
                <Row className="producer-form-footer bg-white p-4 border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()} disabled={loading}>
                                    <Button outline color="lighGrey-2 w-100 border-none" className="fw-600">Previous</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button color="primary w-100 border-none" className="fw-600" type="submit" disabled={loading}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        )
    }
}
const mapStateToProps = (state) => {
    return state.publicUser.application.newApp.enterpriseGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsFunc)

export { Details }

let inputValidations = {
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
        validateWithRegex:'registerationNumberRegex'
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
    relevantSupportOrg:{
        presence: {
            allowEmpty: false,
            message: "^Name of Relevant Support Org can't be blank"
        }  
    }
}