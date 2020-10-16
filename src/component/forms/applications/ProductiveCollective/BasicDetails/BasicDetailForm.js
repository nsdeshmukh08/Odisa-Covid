import React from 'react';
import { Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import ReactDateTime from 'component/inputs/ReactDatetime'
import { STAFF_ROLE_ID } from 'helpers/variables'

const BasicDetailsForm = ({ basicDetails, errors, onChange, onSubmit, ...rest }) => {

    let role = localStorage.getItem('role') ? parseInt(localStorage.getItem('role')) : STAFF_ROLE_ID.PUBLIC

    return (
        <div id={rest.id}>
            <Row className="producer-detail row bg-white p-4">
                <Col className="border-right pr-4" lg="6">
                    <h2 className="darkGrey-2 title-two">Basic Details</h2>
                    <Row>
                        {
                            role !== STAFF_ROLE_ID.PUBLIC ?
                            <Col md="6">
                                <ReactDateTime
                                    type="number"
                                    className="w-100"
                                    label="Application Received Date"
                                    name="appSubmitDate"
                                    onChange={onChange}
                                    value={basicDetails['appSubmitDate']}
                                    error={errors["appSubmitDate"]}
                                    disabled={true}
                                />
                            </Col> : ''
                        }
                    </Row>
                    <Row>
                        <Col>
                            <FormInput
                                type="number"
                                label={`
                                    ${
                                        role !== STAFF_ROLE_ID.PUBLIC ?
                                        'Applicant':''
                                    } Mobile Number`
                                }
                                name="mobileNumber"
                                onChange={onChange}
                                value={basicDetails['mobileNumber']}
                                error={errors["mobileNumber"]}
                                maxLength="10"
                                disabled={role === STAFF_ROLE_ID.PUBLIC}
                            />
                        </Col>
                        <Col>
                            <FormInput
                                type="only-text"
                                label={`
                                    ${
                                        role !== STAFF_ROLE_ID.PUBLIC ?
                                        'Applicant':''
                                    } Name`
                                }
                                name="name"
                                onChange={onChange}
                                value={basicDetails["name"]}
                                error={errors["name"]}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormInput
                                type="only-text"
                                label="Producer Collective Name"
                                name="pcName"
                                onChange={onChange}
                                value={basicDetails["pcName"]}
                                error={errors["pcName"]}
                            /></Col>
                        <Col>
                            <FormInput
                                type="textarea"
                                label="Producer Collective Address"
                                name="pcAddress"
                                onChange={onChange}
                                value={basicDetails["pcAddress"]}
                                error={errors["pcAddress"]}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className="pl-4">
                    <h2 className="title-two">Location</h2>
                    <Row>
                        <Col md="6" lg="6">
                            <FormInput
                                type="select"
                                label="District"
                                name="districtId"
                                value={basicDetails["districtId"]}
                                error={errors["districtId"]}
                                onChange={onChange}
                                options={rest.districtList}
                            /></Col>
                        {
                            basicDetails.districtId ?
                                <Col>
                                    <FormInput
                                        type="select"
                                        label="Block"
                                        onChange={onChange}
                                        options={rest.blockList}
                                        name="blockId"
                                        value={basicDetails["blockId"]}
                                        error={errors["blockId"]}
                                    />
                                </Col>
                                : ''
                        }
                    </Row>
                    <Row>
                        {
                            basicDetails.blockId ?
                                <Col lg="6" md="6">
                                    <FormInput
                                        type="select"
                                        label="Panchayat"
                                        onChange={onChange}
                                        options={rest.panchayatList}
                                        name="panchayatId"
                                        value={basicDetails["panchayatId"]}
                                        error={errors["panchayatId"]}
                                    />
                                </Col>
                                : ''
                        }

                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default BasicDetailsForm;