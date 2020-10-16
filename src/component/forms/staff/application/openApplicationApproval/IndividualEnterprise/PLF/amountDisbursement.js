import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import DatePicker from 'component/inputs/ReactDatetime'
import {  IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import axios from 'axios';

class AmountDisbursment extends Component {

    initialState = {
        isDisbursment: null,
        disbursmentDate: null,
        disbursmentAmount: null,
        firstTrancheSubmitDate: null,
        errors: {},
        cancelToken: axios.CancelToken.source(),
    }

    state = {
        ...this.initialState
    }

    onChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        })
    }

    onSubmit = () => {

        const {
            isDisbursment,
            disbursmentSubmitDate,
            disbursmentDate,
            disbursmentAmount,
            firstUcCertificate,
            smpuTrancheApproval,
            errors
        } = this.state

        let data = {
            isDisbursment,
            disbursmentDate,
            disbursmentAmount,
            disbursmentSubmitDate,
            firstUcCertificate,
            smpuTrancheApproval
        }

        let validation = {
            ...inputValidations
        }
        const notValid = validate(data, validation);
        if (notValid)
            this.setState({ errors: notValid })
        else {
            console.log("amount disbsed")
            // this.props.onApprove(data)
        }
    }

    render() {
        const {
            isDisbursment,
            disbursmentDate,
            disbursmentAmount,
            errors
        } = this.state

        return (
            <form>
                <Row className="approve-tab">
                    <Col className="score-tabs">
                        <div className="assesment-tab">
                            <Col md="10" className="p-0">
                                <Row>
                                    <Col xl="6" >
                                        <FormInput
                                            type="radio"
                                            label="Amount Disbursement"
                                            options={IS_TRUE}
                                            name="isDisbursment"
                                            onChange={this.onChange}
                                            value={isDisbursment}
                                            error={errors['isDisbursment']}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="6" md="6" sm="6">
                                        <FormGroup>
                                            <DatePicker
                                                label="Disbursement Date"
                                                name="disbursmentDate"
                                                onChange={this.onChange}
                                                value={disbursmentDate}
                                                error={errors['disbursmentDate']}
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
                                            max = { 6 }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Row className="p-3 mb-3 d-flex align-items-center">
                                <Col className="p-0">
                                    <p className="m-0">Complete all above data before Submit</p>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        color={'primary'}
                                        className="fw-60 br-1 ml-auto px-5"
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

export default AmountDisbursment

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
