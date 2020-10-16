import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { getFutureDate } from 'helpers/momentHelpers'

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

class AmountDisbursement extends Component {

    initialState = {
        isDisbursment : null,
        disbursmentDate : null,
        disbursmentAmount : null,
        errors:{}
    }

    state = {
        ...this.initialState,
        // applicationStatus: 5,    
    }
    
    onChange = (name, value) => {
        let { errors } = this.state
        errors[name]=undefined
        this.setState({
            [name]: value,
            errors
        })
    }

    onSubmit = () => {

        const { isDisbursment,
            disbursmentDate,
            disbursmentAmount,
            errors } = this.state

        let data = {
            isDisbursment,
            disbursmentDate,
            disbursmentAmount
        }

        let validation = {
            ...inputValidations
        }
        const notValid = validate(data, validation);
        if(notValid)
            this.setState({errors : notValid})
        else{
            // console.log("approved Disbursement Amount",this.props)
            this.props.onAmountDisbursement(data)
        }
    }

    render() {
        const {
            isDisbursment,
            disbursmentDate,
            disbursmentAmount,
            errors
        } = this.state

        let approvedDate = this.props.selectedApplicationStatus?.pgDmpuApplicationStatus?.approvedDate;

        return (
            <form>
                <Row className="approve-tab">
                    <Col className="score-tabs">
                        <div className="assesment-tab">
                            <FormInput
                                type="radio"
                                label="Amount Disbursement"
                                options={IS_TRUE}
                                name="isDisbursment"
                                onChange={this.onChange}
                                value={isDisbursment}
                                error={errors['isDisbursment']}
                            />
                            <Col md="11" className="p-0">
                                <Row>
                                    <Col xl="6" md="6" sm="6">
                                            <FormGroup>
                                                <DatePicker
                                                    label="Disbursement Date"
                                                    name="disbursmentDate"
                                                    onChange={this.onChange}
                                                    value={disbursmentDate}
                                                    error={errors['disbursmentDate']}
                                                    isValidDate = {( currentDate ) => {
                                                        return getFutureDate(currentDate,approvedDate)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    <Col xl="6" md="6" sm="6">
                                        <FormInput
                                            type="number"
                                            label="Disbursement Amount"
                                            name="disbursmentAmount"
                                            onChange={this.onChange}
                                            value={disbursmentAmount}
                                            error={errors['disbursmentAmount']}
                                            max = {6}
                                        />
                                    </Col>
                                </Row>
                            </Col>


                            
                            <Row className="p-3 mb-3 d-flex align-items-center">
                                <Col className="p-0">
                                    <p className="m-0">Complete all above data before Approve</p>
                                </Col>
                                <Col md="auto">
                                    <Button 
                                        color={'primary'} 
                                        className="fw-60 br-1 px-5 ml-auto"
                                        onClick={this.onSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default AmountDisbursement

let inputValidations = {
    "isDisbursment": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "disbursmentDate": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "disbursmentAmount": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        },
        numericality: {
            onlyInteger: true,
            lessThanOrEqualTo: 150000,
        }
    }
}
