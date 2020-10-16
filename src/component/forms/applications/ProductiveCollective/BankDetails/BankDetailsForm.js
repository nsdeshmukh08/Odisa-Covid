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
const BankDetailsForm = ({ pcFormBankDetails, errors, onChange,...rest }) => {
    return (
        <div id={rest.id}>
            <Row className="p-4 form-height producer-bank-form">
                <Col xl="8" lg="12" sm="12">
                    <h2 className="title-two">Your Bank Details</h2>
                    <Row>   
                        <Col>
                            <FormInput
                                type="number"
                                label="Account Number"
                                name="accNumber"
                                value={pcFormBankDetails['accNumber']}
                                error={errors["accNumber"]}
                                onChange={onChange}
                            /></Col>
                        <Col>
                            <FormInput
                                type="number"
                                label="Confirm Account Number"
                                name="confirmAccNumber"
                                value={pcFormBankDetails['confirmAccNumber']}
                                error={errors["confirmAccNumber"]}
                                onChange={onChange}
                            /></Col>
                        <Col>
                            <FormInput
                                type="only-text"
                                label="Account Name "
                                name="accName"
                                value={pcFormBankDetails['accName']}
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
                                value={pcFormBankDetails['bnkName']}
                                error={errors["bnkName"]}
                                onChange={onChange}
                            /></Col>
                        <Col>
                            <FormInput
                                type="only-text"
                                label="Branch"
                                name="branchName"
                                value={pcFormBankDetails['branchName']}
                                error={errors["branchName"]}
                                onChange={onChange}
                            /></Col>
                        <Col>
                            <FormInput
                                type="no-special-character"
                                label="IFSC Code"
                                name="ifscCode"
                                value={pcFormBankDetails['ifscCode']}
                                error={errors["ifscCode"]}
                                onChange={onChange}
                            /></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BankDetailsForm;