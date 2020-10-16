import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/enterpriseGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import AmountForm from './AmountForm'

class AmountClass extends Component {

    state = {
        egFormAmountRecevied: {
            "formId": undefined,
            "amtGrant": '',
            "amtReceviedLoan": '',
            "isLoanGrant": null,
            "fundProvider": null,
            "amtRecevied": '',
            // "shareCapital": null,
            "isSpecialEPO": null,
            "specifyEPO": null,
            "nameOfPc":null
        },
        errors: {
            "amtGrant": undefined,
            "amtReceviedLoan": undefined,
            "isLoanGrant": false,
            "fundProvider": null,
            "amtRecevied": undefined,
            // "shareCapital": undefined,
            "isSpecialEPO": null,
            "specifyEPO": null,
            "nameOfPc":null
        },
        cancelToken: axios.CancelToken.source(),
        init : true
    }

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }

    static getDerivedStateFromProps(nextProps,prevState ) {
        // console.log(nextProps,"asdasd")
        if (prevState.init)
            return {
                egFormAmountRecevied: {
                    ...nextProps.egFormAmountRecevied
                },
                init : false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { egFormAmountRecevied, errors } = this.state
        egFormAmountRecevied[name] = value
        errors[name] = undefined
        if(name === 'isSpecialEPO'){
            egFormAmountRecevied['specifyEPO'] = null
        }
        if(name === 'isLoanGrant'){
            egFormAmountRecevied['fundProvider'] = null
            egFormAmountRecevied['amtRecevied'] = null
        }
        this.setState({ egFormAmountRecevied, errors })
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        let { egFormAmountRecevied, cancelToken } = this.state
        let validation = {
            ...inputValidations,
            ...(
                !egFormAmountRecevied.isSpecialEPO ? ({
                    specifyEPO: undefined
                }) : ''
            ),
            ...(
                !egFormAmountRecevied.isLoanGrant ? ({
                    fundProvider: undefined,
                    amtRecevied : undefined
                }) : ''
            )
        }
        const notValid = validate(egFormAmountRecevied, validation);
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            egFormAmountRecevied['formId'] = localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                { data: egFormAmountRecevied, stage },
                cancelToken.token
            )
        }
    }

    render() {
        let pathname = this.props.location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
        const { egFormAmountRecevied, errors } = this.state
        return (
            <form className="container theme-one-common mt-3 bg-white p-4" onSubmit={this.onSubmit}>
                <AmountForm {...this.state} onChange={this.onChange} />
                <Row className="producer-form-footer bg-white border-top align-items-center">
                    <Col md="7" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button outline color="lighGrey-2 w-100 border-none br-1" className="fw-600">Previous</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button color="primary w-100 border-none br-1" className="fw-600" type="submit">
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

const Amount = connect(mapStateToProps, mapDispatchToProps)(AmountClass)

export { Amount }

let inputValidations = {
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
