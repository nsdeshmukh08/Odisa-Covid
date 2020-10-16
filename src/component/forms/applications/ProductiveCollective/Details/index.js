import React, { Component } from 'react';

import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerCollective';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { calculateAge } from 'helpers/momentHelpers'
import DetailsForm from './DetailsForm'

const { GET_PC_DETALS_OPTIONS_API, SECTOR_TYPES, COMMODITY_TYPES, GET_PRODUCER_GROUP_TYPES } = API_BOOK.APPLICATION;


export class DetailsFunc extends Component {
    state = {
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
        errors: {},
        cancelToken: axios.CancelToken.source(),
        init: true,
        typesOfSector: [],
        activityData: [],
        typesOfCommodity: [],
        typesOfPc: [],
        formedByData: [],
        registrationUnderData: [],
        promotingOrgData: [],
        init:true
    }

    componentDidMount() {
        const { pcDetails } = this.state
        this.getPCDetails()
        this.getProducerGroup()
        if(pcDetails.pcTypes.length)
            this.getSectorTypes()
        if(pcDetails.pcSectorTypes.length)
            this.getCommodityTypes()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                pcDetails: {
                    ...nextProps.pcDetails,
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { pcDetails, errors } = this.state
        pcDetails[name] = value
        errors[name] = undefined
        // console.log(pcDetails,"detad12")
        this.setState({ pcDetails, errors }, () => this.handleCallBack(name,value))
    }

    handleCallBack = (name,value) => {
        let { pcDetails,promotingOrgData,formedByData,registrationUnderData,errors } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value
        if(name === "pcTypes"){
            pcDetails['pcSectorTypes'] = []
            pcDetails['pcCommodityTypes'] = []
            this.setState({pcDetails},this.getSectorTypes)
        }else if(name === "pcSectorTypes"){
            pcDetails['pcCommodityTypes'] = []
            this.setState({pcDetails},this.getCommodityTypes)
        }else if(name === 'registrationUnder'){
            pcDetails['registrationNumber'] = ''
            errors['registrationNumber'] = null
            pcDetails['registerationNumberRegex'] = registrationUnderData.find(data => data.value === parseInt(value))?.regxType
        }
        else if(name === 'promotingOrgs'){
            pcDetails['promotingOrgName'] = ''
            errors['promotingOrgName'] = null
        }
        else if(name === 'supportingOrg'){
            pcDetails['supportingOrgName'] = ''
            errors['supportingOrgName'] = null
        }
        else if(parseInt(pcDetails.registrationUnder) !== registrationOthersVal && pcDetails.registrationUnderOthers){
            pcDetails['registrationUnderOthers'] =null

            
        }else if(parseInt(pcDetails.promotingOrgs) === promoOrgOtherVal){
            pcDetails['promotingOrgName'] =null
        }else if(parseInt(pcDetails.supportingOrg) === formedByOtherVal){
            pcDetails['supportingOrgName'] =null
        }
            this.setState({ pcDetails,errors })
    }
    
    //SERVICE

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
        if (response.status === 200) {
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

    onSubmit = (e) => {
        e.preventDefault()
        const { promotingOrgData,formedByData,registrationUnderData } = this.state
        let promoOrgOtherVal = promotingOrgData.find(data => data.showField === 0)?.value
        let formedByOtherVal = formedByData.find(data => data.showField === 0)?.value
        let registrationOthersVal = registrationUnderData.find(data => data.isOthers === 1)?.value

        let {
            pcDetails,
            cancelToken 
        } = this.state
        let validation = {
            ...inputValidations,
            ...(parseInt(pcDetails.promotingOrgs) === promoOrgOtherVal ? {
                promotingOrgName : undefined
            } :''),
            ...(parseInt(pcDetails.supportingOrg) === formedByOtherVal ? {
                supportingOrgName : undefined
            } :''),
            ...(!pcDetails.registrationUnder ? { registrationNumber : undefined } : ''),
            ...(
                    pcDetails.registrationUnder != registrationOthersVal ? { registrationUnderOthers : undefined } : ''
                )
        }
        const notValid = validate(pcDetails, validation);
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            pcDetails['formId'] = localStorage.getItem('createAppformId')
            this.props.updateForm(
                {
                    data: pcDetails, stage
                },
                cancelToken.token
            )
        }
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
                                    <Button 
                                        outline 
                                        color="lighGrey-2 w-100 border-none" 
                                        className="fw-600"
                                        type="button"
                                    >
                                        Previous
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button 
                                    color="primary w-100 border-none" 
                                    className="fw-600" 
                                    type="submit" 
                                    disabled={loading}
                                >
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
    return state.publicUser.application.newApp.producerCollective
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsFunc)

export { Details }

let inputValidations = {
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
    promotingOrgName: {
        presence: {
            allowEmpty: false,
            message: "^Promoting Organisation name can't be blank"
        }
    },
    registrationNumber: {
      
        validateWithRegex:'registerationNumberRegex'
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