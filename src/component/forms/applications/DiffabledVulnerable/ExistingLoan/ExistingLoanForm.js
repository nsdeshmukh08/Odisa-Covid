import React, { useContext, Fragment } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { ThemeContext } from 'helpers'
import { Link } from 'react-router-dom'
import FormInput from 'component/inputs/FormInput'
import Close from 'assets/images/close.svg'
import DatePicker from 'component/inputs/ReactDatetime'
import { IS_TRUE } from 'helpers/variables'

const ExistingLoanForm = ({ iaExistingLoan, errors, ...props }) => {
  // console.log(iaExistingLoan, 'iaExistingLoan------------------------')
  let themeData = useContext(ThemeContext)

  let onChange = props.onChange

  return (
    <div className="p-4">
      <Row className="mb-4 py-3">
        <Col md="12">
          <h2 className="darkGrey-2 title-two mb-3">Existing Loan</h2>
        </Col>
        <Col md="12">
          <FormInput
            type="radio"
            label={themeData.doYouHaveAnyExisting}
            name="isExistingLoan"
            options={IS_TRUE}
            onChange={onChange}
            value={iaExistingLoan.isExistingLoan}
          />
        </Col>
      </Row>
      {iaExistingLoan.isExistingLoan === true ? (
        <Row className="form-body activity-form-main">
          <Col xl="12" lg="12" sm="12" className="p-0 pr-4">
            <div className="activity-list">
              <Row className="activity-gray heading-container no-gutters">
                <Col> {themeData.loanSource}</Col>
                <Col md="2"> {themeData.dateOfLoanReceived}</Col>
                <Col>{themeData.loanAmount}</Col>
                <Col>{themeData.interestRate}</Col>
                <Col>{themeData.amountToBeExistingRepaid}</Col>
                <Col>{themeData.amountExistingRepaid}</Col>
                <Col>{themeData.balanceAmountToRepaid}</Col>
                <Col>{themeData.reasonForTheDelay}</Col>
              </Row>
              {iaExistingLoan.existingLoanList.map((data, index) => (
                <Row className="custom-select-head no-gutters">
                  <Col className="remove-label">
                    <FormInput
                      type="text"
                      placeholder=""
                      name="loanSource"
                      value={data.loanSource}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col md="2" className="remove-label">
                    <DatePicker
                      label={themeData.dob}
                      name="loanReceivedDate"
                      value={data['loanReceivedDate']}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>

                  <Col className="remove-label">
                    <FormInput
                      type="number"
                      label="Activity"
                      name="loanAmount"
                      value={data.loanAmount}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col className="remove-label">
                    <FormInput
                      type="decimal"
                      label="Activity"
                      name="interestRate"
                      value={data.interestRate}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col className="remove-label">
                    <FormInput
                      type="number"
                      label="Activity"
                      name="amountToBeRepaid"
                      value={data.amountToBeRepaid}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col className="remove-label">
                    <FormInput
                      type="number"
                      label="Activity"
                      name="amountRepaid"
                      value={data.amountRepaid}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col className="remove-label">
                    <FormInput
                      type="number"
                      label="Activity"
                      // disabled={true}
                      name="balanceAmtToBeRepaid"
                      value={data.balanceAmtToBeRepaid}
                      // onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  <Col className="remove-label last-input">
                    <FormInput
                      type="text"
                      label="Activity"
                      name="reason"
                      value={data.reason}
                      onChange={(...params) => props.onChange(...params, index)}
                    />
                  </Col>
                  {iaExistingLoan.existingLoanList.length > 1 ? (
                    <img
                      className="filter-out-img"
                      src={Close}
                      alt="Close"
                      onClick={() => props.onAddOrRemoveActivity(index)}
                    ></img>
                  ) : (
                    <img
                      className="filter-out-img"
                      src={Close}
                      alt="Close"
                      onClick={() => props.onAddOrRemoveActivity(index)}
                    ></img>
                  )}
                </Row>
              ))}
              <Row className="text-right">
                <Col>
                  {' '}
                  <Button
                    color="link"
                    onClick={() => props.onAddOrRemoveActivity()}
                  >
                    + {themeData.addLoan}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  )
}

export default ExistingLoanForm
