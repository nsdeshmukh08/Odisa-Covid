import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
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
import BankDetailsForm from './BankDetailsForm'

export class BankDetailsClass extends Component {
    state = {
        symrBankDetails: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber" : null,
            "accName": "",
            "bnkName": "",
            "branchName": "",
            "ifscCode": "",
        },
        errors: {
            "formId": null,
            "accNumber": null,
            "confirmAccNumber" : null,
            "accName": null,
            "bnkName": null,
            "branchName": null,
            "ifscCode": null,
        },
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init : true
    }

    static getDerivedStateFromProps(nextProps,prevState ) {
        if (prevState.init)
            return {
                symrBankDetails: {
                    ...nextProps.symrBankDetails
                },
                init : false
            }
        return null
    }


    //HANDLE CHANGE
    onChange = (name, value) => {
        let { symrBankDetails, errors } = this.state
        symrBankDetails[name] = value
        errors[name] = undefined
        this.setState({ symrBankDetails, errors })
    }
    onSubmit = (e) => {
        e.preventDefault()
        let { symrBankDetails,cancelToken } = this.state
        const notValid = validate(symrBankDetails, inputValidations);
        console.log(notValid,"notValidnotValid")
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            symrBankDetails['formId']=localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                {data:symrBankDetails,stage},
                cancelToken.token
            )
        }
    }

    render() {
        const { location } = this.props;
        let pathname = location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1));
    

        const { errors, symrBankDetails ,loading} = this.state

        return (
            <form className="container theme-one-common mt-3 bg-white" onSubmit={this.onSubmit}>
                <BankDetailsForm {...this.state} onChange={this.onChange} />
                <Row className="producer-form-footer bg-white p-4 border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="6" md="6" sm="12">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button 
                                        outline color="lighGrey-2 w-100 border-none mb-3" 
                                        className="fw-600"
                                        type="button"
                                    >
                                        Previous
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                {/* <Link to={(currentSection + 1).toString()}> */}
                                    <Button 
                                        color="primary w-100 border-none mb-3" 
                                        className="fw-600" 
                                        type="submit" 
                                        disabled={loading} 
                                    >
                                        Next
                                </Button>
                                {/* </Link> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return state.publicUser.application.newApp.symr
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(symr, dispatch);
};

const BankDetails = connect(mapStateToProps, mapDispatchToProps)(BankDetailsClass)

export { BankDetails }

let inputValidations = {
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
        },
        
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