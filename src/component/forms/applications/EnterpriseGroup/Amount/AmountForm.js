import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { IS_TRUE } from 'helpers/variables'

const AmountForm = ({egFormAmountRecevied ,onChange ,errors }) => {
    console.log(egFormAmountRecevied,"data")
    return (
        <Row className="amount">
            <Col xl="6" lg="8" sm="12">
                <h2 className="mb-2">Amount received</h2>
                {/* <Row>
                    <Col xl="6" lg="6" sm="12">
                        <FormInput
                            type="number"
                            label="Share Capital"
                            name="shareCapital"
                            onChange={onChange}
                            error={errors['shareCapital']}
                            value={egFormAmountRecevied.shareCapital}
                        />
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <FormInput
                            type="number"
                            label="Amount received as a grant so far"
                            name="amtGrant"
                            onChange={onChange}
                            error={errors['amtGrant']}
                            value={egFormAmountRecevied.amtGrant}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Amount received as loan so far"
                            onChange={onChange}
                            name="amtReceviedLoan"
                            error={errors['amtReceviedLoan']}
                            value={egFormAmountRecevied.amtReceviedLoan}
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
                            value={egFormAmountRecevied.isLoanGrant}
                        />
                    </Col>
                </Row>
                {
                    egFormAmountRecevied.isLoanGrant ? 
                <Row className="mb-3">
                    <Col>
                        <FormInput
                            type="only-text"
                            label="Fund Provider Name"
                            name="fundProvider"
                            onChange={onChange}
                            error={errors['fundProvider']}
                            value={egFormAmountRecevied.fundProvider}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Amount received"
                            name="amtRecevied"
                            onChange={onChange}
                            error={errors['amtRecevied']}
                            value={egFormAmountRecevied.amtRecevied}
                        /></Col>
                </Row>: ''
                }
            </Col>

            <Col xl="12" className="border-top pb-3"> </Col>

            <Col xl="6" lg="8" sm="12">

                <Row className="pb-4">
                    <Col md="12">

                    </Col>
                    <Col>
                        <h2 className="mb-2">Special EG</h2>
                        <p className="small-size mb-3">Special EG</p>
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
                            value={egFormAmountRecevied.isSpecialEPO}
                        />
                    </Col>
                    {
                        egFormAmountRecevied.isSpecialEPO ?
                            <Col className="mt-4">
                                <FormInput
                                    type="text"
                                    label="Pls Specify"
                                    name="specifyEPO"
                                    onChange={onChange}
                                    error={errors['specifyEPO']}
                                    value={egFormAmountRecevied.specifyEPO}
                                />
                            </Col> : ''
                    }
                </Row>
            </Col>
            
            {/* <Col xl="12" className="border-top pb-3"> </Col> */}
{/* 
            <Col xl="6" lg="8" sm="12">

                <Row className="pb-4">
                    <Col xl='6' className="mt-0">
                        <h2 className="mb-2">Linked to</h2>
                        <FormInput
                            type="text"
                            label="Name of the producer collective linked to"
                            name="nameOfPc"
                            onChange={onChange}
                            error={errors['nameOfPc']}
                            value={egFormAmountRecevied.nameOfPc}
                        />
                    </Col> 
                </Row>
            </Col> */}
        </Row>
    );
}

export default AmountForm;