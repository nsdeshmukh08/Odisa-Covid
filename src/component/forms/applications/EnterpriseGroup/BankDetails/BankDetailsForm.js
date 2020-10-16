import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerCollective';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
const BankDetailsForm = ({ egFormBankDetails ,errors ,onChange }) => {
    return (
        <Row className="p-4 form-height producer-bank-form">
            <Col xl="8" lg="12" sm="12">
                <h2 className="title-two">Your Bank Details</h2>
                <Row>
                    <Col>
                        <FormInput
                            type="number"
                            label="Account Number"
                            name="accNumber"
                            value={egFormBankDetails['accNumber']}
                            error={errors["accNumber"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Confirm Account Number"
                            name="confirmAccNumber"
                            value={egFormBankDetails['confirmAccNumber']}
                            error={errors["confirmAccNumber"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Account Name"
                            name="accName"
                            value={egFormBankDetails['accName']}
                            error={errors["accName"]}
                            onChange={onChange}
                        /></Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Bank"
                            name="bnkName"
                            value={egFormBankDetails['bnkName']}
                            error={errors["bnkName"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Branch"
                            name="branchName"
                            value={egFormBankDetails['branchName']}
                            error={errors["branchName"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="no-special-character"
                            label="IFSC Code"
                            name="ifscCode"
                            value={egFormBankDetails['ifscCode']}
                            error={errors["ifscCode"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xl="4">
                        <FormInput
                            type="number"
                            label="No. Of Transactions in last 6 Months"
                            name="noOfLastTransaction"
                            value={egFormBankDetails['noOfLastTransaction']}
                            error={errors["noOfLastTransaction"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BankDetailsForm;