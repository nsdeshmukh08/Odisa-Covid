import React, { Component } from 'react';

import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerGroup';
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
        pgDetails: {
            "formId": localStorage.getItem('createAppformId'),
            "isShgMember": null,
            "relationshipType": null,
            "shgName": null,
            "shgMemberType": null,
            "nrlmPortalShgCode": null
        },
        relationshipTypeList: [],
        errors: {
            "formId": undefined,
            "isShgMember": null,
            "relationshipType": null,
            "shgName": null,
            "shgMemberType": null,
            "nrlmPortalShgCode": null
        },
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init: true
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                pgDetails: {
                    ...nextProps.pgDetails
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { pgDetails, errors } = this.state
        pgDetails[name] = value
        errors[name] = undefined

        this.setState({ pgDetails, errors },() => this.handleCallBack(name, value))
    }
    handleCallBack = (name,value) => {
        let {errors, pgDetails} = this.state
        if(name === "shgMemberType" && value == 1){
            pgDetails["relationshipType"] = null
            errors['relationshipType'] = undefined
        } 
        this.setState({errors,pgDetails})
    }
    onSubmit = (e) => {
        e.preventDefault()
        let { pgDetails, cancelToken } = this.state
        let validation = {
            ...inputValidations,
            ...(
                pgDetails.shgMemberType != 2 ? { relationshipType : 0 } : ''
                ),
        }
        const notValid = validate(pgDetails, validation);
        console.log("80",pgDetails)
        console.log("notValid",notValid)
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            this.props.history.push((stage + 1).toString())
            pgDetails['formId'] = localStorage.getItem('createAppformId')
            this.props.updateForm(
                { data: pgDetails, stage },
                cancelToken.token
            )
        }
    }

    render() {
        let pathname = this.props.location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
        const { loading } = this.state
        console.log(this.state)
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
                                        type="button" 
                                        color="lighGrey-2 w-100 border-none" 
                                        className="fw-600"
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
    return state.publicUser.application.newApp.producerGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsFunc)

export { Details }

let inputValidations = {
    relationshipType: {
        presence: {
            allowEmpty: false,
            message: "^Relationship Type can't be blank"
        }
    },
    isShgMember: {
        presence: {
            allowEmpty: false,
            message: "^Member Type can't be blank"
        }
    },
    shgName: {
        presence: {
            allowEmpty: "true",
            message: "^SHG Name can't be blank"
        }
    },
    shgMemberType: {
        presence: {
            allowEmpty: "true",
            message: "^SHG member type can't be blank"
        }
    },
    nrlmPortalShgCode: {
        presence: {
            allowEmpty: false,
            message: "^NRLM Portal SHG Code can't be blank"
        }
    },
}