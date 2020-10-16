import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { IS_TRUE } from 'helpers/variables'

const AmountForm = ({ pcFormAmountRecevied, onChange, errors,...rest }) => {
    return (
        <div id={rest.id}>
            <Row className="amount  p-4">
                <Col xl="6" lg="8" sm="12">
                    <h2 className="mb-2">Amount received</h2>
                    <Row>
                        <Col xl="6" lg="6" sm="12">
                            <FormInput
                                type="number"
                                label="Share Capital"
                                name="shareCapital"
                                onChange={onChange}
                                error={errors['shareCapital']}
                                value={pcFormAmountRecevied.shareCapital}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormInput
                                type="number"
                                label="Amount received as a grant so far"
                                name="amtGrant"
                                onChange={onChange}
                                error={errors['amtGrant']}
                                value={pcFormAmountRecevied.amtGrant}
                            /></Col>
                        <Col>
                            <FormInput
                                type="number"
                                label="Amount received as loan so far"
                                onChange={onChange}
                                name="amtReceviedLoan"
                                error={errors['amtReceviedLoan']}
                                value={pcFormAmountRecevied.amtReceviedLoan}
                            /></Col>
                    </Row>
                    <p className="small-size">Any amount received as Loan / Grant in last 6 Months</p>
                    <Row >
                        <Col>
                            <FormInput
                                type="radio"
                                options={IS_TRUE}
                                name="isLoanGrant"
                                onChange={onChange}
                                error={errors['isLoanGrant']}
                                value={pcFormAmountRecevied.isLoanGrant}
                            />
                        </Col>
                    </Row>
                    {
                        pcFormAmountRecevied.isLoanGrant ?
                            <Row className="mb-3">
                                <Col>
                                    <FormInput
                                        type="only-text"
                                        label="Fund Provider Name"
                                        name="fundProvider"
                                        onChange={onChange}
                                        error={errors['fundProvider']}
                                        value={pcFormAmountRecevied.fundProvider}
                                    />
                                </Col>
                                <Col>
                                    <FormInput
                                        type="number"
                                        label="Amount received"
                                        name="amtRecevied"
                                        onChange={onChange}
                                        error={errors['amtRecevied']}
                                        value={pcFormAmountRecevied.amtRecevied}
                                    /></Col>
                            </Row> : ''
                    }

                </Col>

                <Col xl="12" className="border-top pb-3"> </Col>

                <Col xl="6" lg="8" sm="12">

                    <Row className="pb-4">
                        <Col>
                            <h2 className="mb-4">Special FPO</h2>
                            <p className="small-size mb-3">Special FPO</p>
                            <FormInput
                                type="radio"
                                options={[{
                                    label: 'Yes',
                                    value: true
                                }, {
                                    label: 'No',
                                    value: false
                                }]}
                                name="isSpecialEPO"
                                onChange={onChange}
                                error={errors['isSpecialEPO']}
                                value={pcFormAmountRecevied.isSpecialEPO}
                            />
                        </Col>
                        {
                            pcFormAmountRecevied.isSpecialEPO ?
                                <Col className="mt-4">
                                    <FormInput
                                        type="text"
                                        label="Pls Specify"
                                        name="specifyEPO"
                                        onChange={onChange}
                                        error={errors['specifyEPO']}
                                        value={pcFormAmountRecevied.specifyEPO}
                                    />
                                </Col> : ''
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AmountForm;