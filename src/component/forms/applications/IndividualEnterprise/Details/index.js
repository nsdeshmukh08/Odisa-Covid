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

const { GET_PC_DETALS_OPTIONS_API } = API_BOOK.APPLICATION;


export class DetailsFunc extends Component {
    state = {
        pcDetails: {                
            formId: null,
            dateFormation: null,
            dateRegistration: null,
            registrationNumber: null,
            promotingOrgName: null,
            othersName: null,
            noOfPG: null,
            pcTypes: [],
            pcCommodityTypes: [],
            pcSectorTypes: [],
            registrationUnder: null,
            formSupportedBy: null
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
        init:true
    }

    componentDidMount() {
        this.getPCDetails()
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
        this.setState({ pcDetails, errors }, this.handleCallBack)
    }

    handleCallBack = (name,value) => {
        let { pcDetails } = this.state
        if(parseInt(pcDetails.formSupportedBy) !== 4 && pcDetails.othersName)
            pcDetails['othersName'] =null
            this.setState({ pcDetails })
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
                typesOfPc,
                typesOfCommodity,
                typesOfSector,
                activityData
            } = response.data.data
            this.setState({
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
            pcDetails,
            cancelToken 
        } = this.state
        let validation = {
            ...inputValidations,
            ...(
                    pcDetails.formSupportedBy != 4 ? { othersName : undefined } : ''
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

    render() {
        // console.log(this.state.pcDetails.pcCommodityTypes,"asasda")
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
    return state.publicUser.application.newApp.producerCollective
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
    dateRegistration: {
        presence: {
            allowEmpty: false,
            message: "^Date Registration can't be blank"
        }
    },
    registrationNumber: {
        presence: {
            allowEmpty: false,
            message: "^Registration number can't be blank"
        }
    },
    promotingOrgName: {
        presence: {
            allowEmpty: false,
            message: "^Organization name can't be blank"
        }
    },
    othersName: {
        presence: {
            allowEmpty: false,
            message: "^Others can't be blank"
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
    registrationUnder: {
        presence: {
            allowEmpty: false,
            message: "^Registration Number can't be blank"
        }
    },
    formSupportedBy: {
        presence: {
            allowEmpty: false,
            message: "^Form Supported By can't be blank"
        }
    }
}