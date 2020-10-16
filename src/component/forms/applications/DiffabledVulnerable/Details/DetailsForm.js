import React from 'react';
import FormInput from 'component/inputs/FormInput';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import _ from "lodash";
import { calculateAge } from 'helpers/momentHelpers'
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';

const DetailsForm = ({ pcDetails, onChange, errors, ...rest }) => {
    return (
        <Row className="p-4 producer-detail">
            <Col lg="12" md="12" xl="10" >
                <h2 className="darkGrey-2 title-two mb-3">Producer Collective Details</h2>
                <Row>
                    <Col md="4" >
                        <FormGroup>
                            <DatePicker
                                label="Date of Formation"
                                name="dateFormation"
                                value={pcDetails.dateFormation}
                                onChange={onChange}
                                error={errors['dateFormation']}
                            />
                        </FormGroup>
                    </Col>
                    {
                        pcDetails.dateRegistration ?
                            <Col className="d-flex align-items-center">
                                <span class="update-draft">Age of Activity <b>&nbsp;{calculateAge(pcDetails.dateFormation)}</b></span>
                            </Col> : ''
                    }
                </Row>
                <Row>
                    <Col md="4">
                        <DatePicker
                            label="Date of Registeration"
                            name="dateRegistration"
                            value={pcDetails.dateRegistration}
                            onChange={onChange}
                            error={errors['dateRegistration']}
                        />
                    </Col>
                    {
                        pcDetails.dateRegistration ?
                            <Col className="d-flex align-items-center">
                                <span class="update-draft">Age of Activity <b>{calculateAge(pcDetails.dateRegistration)}</b></span>
                            </Col>
                            : ''
                    }
                </Row>
                <Row>
                    <Col md="4">
                        <FormInput
                            type="select"
                            label="Registration Under"
                            name="registrationUnder"
                            value={pcDetails.registrationUnder}
                            onChange={onChange}
                            error={errors['registrationUnder']}
                            options={rest.registrationUnderData}
                        /></Col>
                    <Col md="4">
                        <FormInput
                            type="number"
                            label="Registration Number"
                            name="registrationNumber"
                            value={pcDetails.registrationNumber}
                            onChange={onChange}
                            error={errors['registrationNumber']}
                        />
                    </Col>
                </Row>
                <Row>

                    <Col md="4">
                        <FormInput
                            type="text"
                            label="Name of the Promoting Organization"
                            name="promotingOrgName"
                            value={pcDetails.promotingOrgName}
                            onChange={onChange}
                            error={errors['promotingOrgName']}
                        />
                    </Col>
                    <Col md="4">
                        <FormInput
                            type="select"
                            label="Formed/ Supported by"
                            options={rest.formedByData}
                            name="formSupportedBy"
                            error={errors['formSupportedBy']}
                            value={pcDetails.formSupportedBy}
                            onChange={onChange}
                        />
                    </Col>
                    {
                        parseInt(pcDetails.formSupportedBy) === 4 ?
                            <Col md="4">
                                <FormInput
                                    type="only-text"
                                    label="Pls Specify Others"
                                    name="othersName"
                                    error={errors['othersName']}
                                    value={pcDetails.othersName}
                                    onChange={onChange}
                                />
                            </Col>
                            : ''
                    }

                </Row>
                <Row>
                    <Col md="4">
                        <FormInput
                            type="number"
                            label="No of PG in PC "
                            name="noOfPG"
                            error={errors['noOfPG']}
                            value={pcDetails.noOfPG}
                            onChange={onChange}
                        />
                    </Col>
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            type="select"
                            label="Type of Producer Collective"
                            name="pcTypes"
                            isMulti={true}
                            options={rest.typesOfPc}
                            error={errors['pcTypes']}
                            value={pcDetails.pcTypes}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            label="Type of Sector"
                            name="pcSectorTypes"
                            isMulti={true}
                            options={rest.typesOfSector}
                            error={errors['pcSectorTypes']}
                            value={pcDetails.pcSectorTypes}
                            onChange={onChange}

                        /></Col>
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            type="select"
                            label="Type of Commodities "
                            name="pcCommodityTypes"
                            isMulti={true}
                            options={rest.typesOfCommodity}
                            error={errors['pcCommodityTypes']}
                            value={pcDetails.pcCommodityTypes}
                            onChange={onChange}


                        />
                    </Col>
                </Row>
                <span className="update-draft">PC Involved in Single / multiple  Commodities</span>
            </Col>
        </Row>
    );
}

export default DetailsForm;