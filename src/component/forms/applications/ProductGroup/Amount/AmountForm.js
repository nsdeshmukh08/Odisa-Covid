import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { IS_TRUE } from 'helpers/variables'

const AmountForm = ({pgFormAmountRecevied,onChange,errors}) => {
    return (
        <Row className="amount">
            <Col xl="6" lg="8" sm="12">
                <h2 className="mb-2">Amount received</h2>
                <Row>
                    <Col>
                        <FormInput
                            type="number"
                            label="Amount received as a grant so far"
                            name="amtGrant"
                            onChange={onChange}
                            error={errors['amtGrant']}
                            value={pgFormAmountRecevied.amtGrant}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Amount received as loan so far"
                            onChange={onChange}
                            name="amtReceviedLoan"
                            error={errors['amtReceviedLoan']}
                            value={pgFormAmountRecevied.amtReceviedLoan}
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
                            value={pgFormAmountRecevied.isLoanGrant}
                        />
                    </Col>
                </Row>
                {
                    pgFormAmountRecevied.isLoanGrant ? 
                    <Row className="mb-3">
                        <Col>
                            <FormInput
                                type="only-text"
                                label="Fund Provider Name"
                                name="fundProvider"
                                onChange={onChange}
                                error={errors['fundProvider']}
                                value={pgFormAmountRecevied.fundProvider}
                            /></Col>
                        <Col>
                            <FormInput
                                type="number"
                                label="Amount received"
                                name="amtRecevied"
                                onChange={onChange}
                                error={errors['amtRecevied']}
                                value={pgFormAmountRecevied.amtRecevied}
                            /></Col>
                    </Row> : ''
                }
                
            </Col>

            <Col xl="12" className="border-top pb-5"> </Col>

            <Col xl="6" lg="8" sm="12">

                <Row className="pb-4">
                    <Col>
                        <h2 className="mb-2">Special PG</h2>
                        <p className="small-size mb-3">Special PG</p>
                        <FormInput
                            type="radio"
                            options={IS_TRUE}
                            name="isSpecialEPO"
                            onChange={onChange}
                            error={errors['isSpecialEPO']}
                            value={pgFormAmountRecevied.isSpecialEPO}
                        />
                    </Col>
                    {
                        pgFormAmountRecevied.isSpecialEPO ?
                            <Col className="mt-4">
                                <FormInput
                                    type="only-text"
                                    label="Pls Specify"
                                    name="specifyEPO"
                                    onChange={onChange}
                                    error={errors['specifyEPO']}
                                    value={pgFormAmountRecevied.specifyEPO}
                                />
                            </Col> : ''
                    }
                </Row>
            </Col>

            <Col xl="12" className="border-top pb-3"> </Col>

            <Col xl="6" lg="8" sm="12">

                <Row className="pb-4">
                    <Col xl='6' className="mt-0">
                        <h2 className="mb-2">Linked to</h2>
                        <FormInput
                            type="only-text"
                            label="Name of the producer collective linked to"
                            name="nameOfPc"
                            onChange={onChange}
                            error={errors['nameOfPc']}
                            value={pgFormAmountRecevied.nameOfPc}
                        />
                    </Col> 
                </Row>
            </Col>
        </Row>
    );
}

export default AmountForm;