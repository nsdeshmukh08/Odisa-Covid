import React from 'react'
import { Button, Container, Row,Col } from 'reactstrap';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom'

export const VerifyDetails = ({ history }) => {
    return (
        <SimpleCard heading="Please Verify Your Details" className="h-100 mt-5">
            <Container fluid>
                <form>
                    <Row className="border-bottom pb-3">
                        <Col md="6">
                            <FormInput type="select" label="Role" options={[]}/>
                        </Col>
                        <Col md="6">
                            <FormInput type="select" label="Designation" options={[]}/>
                        </Col>
                    </Row>
                    <Row className="border-bottom py-3">
                        <Col md="6">
                            <FormInput type="text" label="Login ID" />
                        </Col>
                        <Col md="6">
                            <FormInput type="text" label="Name" />
                        </Col>
                        <Col md="6">
                            <FormInput type="number" label="Mobile Number" />
                        </Col>
                        <Col md="6">
                            <FormInput type="email" label="Email ID" />
                        </Col>
                    </Row>
                    <Row className="border-bottomv pt-3">
                        <Col md="6">
                            <FormInput type="select" label="District" options={[]}/>
                        </Col>
                        <Col md="6">
                            <FormInput type="select" label="Block" options={[]}/>
                        </Col>
                        <Col md="6">
                            <FormInput type="select" label="GPLF" options={[]} />
                        </Col>
                    </Row>


                    <div className="mt-4">
                        <Link to="/staff/dashboard">
                            <Button color="primary w-77 m-auto" block className="mb-3 border-none fw-600 fs-18">Verify</Button>
                        </Link>
                    </div>
                </form>
            </Container>
        </SimpleCard>
    );
}