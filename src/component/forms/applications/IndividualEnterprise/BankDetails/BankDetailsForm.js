import React, { useContext } from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { ThemeContext } from 'helpers';
import { IS_TRUE } from 'helpers/variables';

const BankDetailsForm = ({ ieBankDetails, errors, onChange }) => {
  let themeData = useContext(ThemeContext);
  //return <h1> BAnk Details Form</h1>
  return (
    <Row className="p-4 form-height producer-bank-form">
      <Col xl="8" lg="12" sm="12">
        <h2 className="title-two">Your Bank Details</h2>
        <Row>
          <Col lg="6">
            <FormInput
              type="number"
              label={themeData.accountNumber}
              name="accNumber"
              value={ieBankDetails['accNumber']}
              error={errors['accNumber']}
              onChange={onChange}
            />
          </Col>
          <Col>
            <FormInput
              type="number"
              label={themeData.confirmAccountNumber}
              name="confirmAccNumber"
              value={ieBankDetails['confirmAccNumber']}
              error={errors['confirmAccNumber']}
              onChange={onChange}
            />
          </Col>
          <Col lg="6">
            <FormInput
              type="only-text"
              label={themeData.accountName}
              name="accName"
              value={ieBankDetails['accName']}
              error={errors['accName']}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <FormInput
              type="only-text"
              label={themeData.bank}
              name="bankName"
              value={ieBankDetails['bankName']}
              error={errors['bankName']}
              onChange={onChange}
            />
          </Col>
          <Col>
            <FormInput
              type="only-text"
              label={themeData.branch}
              name="branchName"
              value={ieBankDetails['branchName']}
              error={errors['branchName']}
              onChange={onChange}
            />
          </Col>
          <Col lg="6">
            <FormInput
              type="text"
              label={themeData.IFSCCode}
              name="ifscCode"
              value={ieBankDetails['ifscCode']}
              error={errors['ifscCode']}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BankDetailsForm;
