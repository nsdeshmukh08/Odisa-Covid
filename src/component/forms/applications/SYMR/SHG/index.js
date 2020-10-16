import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as symr from 'action/createApplication/symr';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import SHGForm from './SHGForm'

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

class SHGDetailsClass extends Component {

    state = {
        shgDetails: {
            "formId": localStorage.getItem('createAppformId'),
            "isShgMember": null,
            "shgName": null,
            "nrlmPortalShgCode": null,
            "isHouseHoldMember": null,
            //"shgMemberType": null,
            "relationshipNrlmPortalShgCode": null,
            "relationshipType": null,
            //"eMathiCode": null
        },
        relationshipTypeList: [],
        errors: {
            "formId": undefined,
            "isShgMember": null,
            "shgName": null,
            //"eMathiCode": null,
            "relationshipType": null,
            "isHouseHoldMember": null,
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
                shgDetails: {
                    ...nextProps.shgDetails
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { shgDetails, errors } = this.state
        shgDetails[name] = value
        errors[name] = undefined

        this.setState({ shgDetails, errors },() => this.handleCallBack(name, value))
    }
    handleCallBack = (name,value) => {
        let {errors, shgDetails} = this.state
        if(name === "isShgMember" && value == 1){
            shgDetails["shgName"] = null
            errors['shgName'] = undefined
        }else if(name === "isHouseHoldMember" && value == 1){
            shgDetails["relationshipType"] = null
            errors['relationshipType'] = undefined
        } 
        this.setState({errors,shgDetails})
    }
    onSubmit = (e) => {
        e.preventDefault()
        let { shgDetails, cancelToken } = this.state
        let validation = {
            ...inputValidations,
            ...(
                shgDetails.isHouseHoldMember != 1 ? { relationshipType : 0 } : ''
                ), 
            ...(
                    shgDetails.isShgMember != 1 ? { shgName : 0 } : ''
               ),
        }
       
        const notValid = validate(shgDetails, validation);
        console.log("800",notValid)
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            shgDetails['formId'] = localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                { data: shgDetails, stage },
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
            <form className="container theme-one-common mt-3" onSubmit={this.onSubmit}>
                <SHGForm {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                <Row className="producer-form-footer bg-white border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button 
                                        outline 
                                        color="lighGrey-2 w-100 border-none br-1" 
                                        className="fw-600"
                                        type="button"
                                    >
                                        Previous
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button 
                                    color="primary w-100 border-none " 
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
        );
    }
}

const mapStateToProps = (state) => {
    return state.publicUser.application.newApp.symr
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(symr, dispatch);
};

const SHGDetails = connect(mapStateToProps, mapDispatchToProps)(SHGDetailsClass)


let inputValidations = {
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
    /* eMathiCode: {
        presence: {
            allowEmpty: false,
            message: "^e-mathi Code can't be blank"
        }
    }, */
}

export { SHGDetails }