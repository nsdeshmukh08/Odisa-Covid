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
const BankDetailsForm = ({ pgFormBankDetails,errors,onChange }) => {

    const typeofLoss = [
        {
            label: 'Loss of Job', value: 'Loss of Job'
        },
        {
            label: 'Less opportunity of Daily wage', value: 'Less opportunity of Daily wage'
        },
        {
            label: 'Closure of Petty Business', value: 'Closure of Petty Business'
        },
        {
            label: 'Death of single earning person/ any family member', value: 'Death of single earning person/ any family member'
        },
        {
            label: 'Health problem due to suffered in COVID-19/ any chronic diseases', value: 'Health problem due to suffered in COVID-19/ any chronic diseases'
        },
        {
            label: 'Social Stigma due to suffering by COVID-19', value: 'Social Stigma due to suffering by COVID-19'
        },
        {
            label: 'Other', value: 'Other'
        },
    ]

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
                            value={pgFormBankDetails['accNumber']}
                            error={errors["accNumber"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Confirm Account Number"
                            name="confirmAccNumber"
                            value={pgFormBankDetails['confirmAccNumber']}
                            error={errors["confirmAccNumber"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Account Name "
                            name="accName"
                            value={pgFormBankDetails['accName']}
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
                            value={pgFormBankDetails['bnkName']}
                            error={errors["bnkName"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Branch"
                            name="branchName"
                            value={pgFormBankDetails['branchName']}
                            error={errors["branchName"]}
                            onChange={onChange}
                        /></Col>
                    <Col>
                        <FormInput
                            type="no-special-character"
                            label="IFSC Code "
                            name="ifscCode"
                            value={pgFormBankDetails['ifscCode']}
                            error={errors["ifscCode"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
                {/* <Row>
                    <Col xl="4">
                        <FormInput
                            type="text"
                            label="Existing Loan and Repayment Status"
                            name="existingLoanRepaymentStatus"
                            value={pgFormBankDetails['existingLoanRepaymentStatus']}
                            error={errors["existingLoanRepaymentStatus"]}
                            onChange={onChange}
                        />
                    </Col>
                    <Col xl="4">
                        <FormInput
                        type="select"
                        label="Loss incurred due to COVID-19 (if any)"
                        name="lossIncurredtoCovid"
                        value={pgFormBankDetails[""]}
                        error={errors["lossIncurredtoCovid"]}
                        onChange={onChange}
                        options={typeofLoss}
                        />
                    </Col>
                    <Col xl="4">
                        <FormInput
                            type="text"
                            label="Proposed activity and fund requirement details"
                            name="activityFundRequirementDetails"
                            value={pgFormBankDetails['activityFundRequirementDetails']}
                            error={errors["activityFundRequirementDetails"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <FormInput
                            type="text"
                            label="Remarks/Challenges faced during COVID 19"
                            name="remarks"
                            value={pgFormBankDetails['remarks']}
                            error={errors["remarks"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BankDetailsForm;