import React from 'react';
import FormInput from 'component/inputs/FormInput';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import _ from "lodash";
import { calculateAge } from 'helpers/momentHelpers'
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';

const DetailsForm = ({ egDetails, onChange, errors, ...rest }) => {

    let registrationOthersVal = rest.registrationUnderData.find(data => data.isOthers === 1)?.value
    let promoOrgOtherVal = rest.promotingOrgData.find(data => data.showField === 0)?.value
    let formedByOtherVal = rest.formedByData.find(data => data.showField === 0)?.value

    return (
        <Row className="p-4 producer-detail">
            <Col lg="12" md="12" xl="10" >
                <h2 className="darkGrey-2 title-two mb-3">Enterprise & Activity</h2>
                <Row>
                    <Col md="4" >
                        <FormGroup>
                            <DatePicker
                                className="w-100"
                                label="Date of Formation"
                                name="dateFormation"
                                value={egDetails.dateFormation}
                                onChange={onChange}
                                error={errors['dateFormation']}
                            />
                        </FormGroup>
                    </Col>
                    {
                        egDetails.dateRegistration ?
                            <Col className="d-flex align-items-center">
                                <span class="update-draft">Age of Activity <b>&nbsp;{calculateAge(egDetails.dateFormation)}</b></span>
                            </Col> : ''
                    }
                </Row>
                <Row>
                    <Col md="4">
                        <DatePicker
                            className="w-100"
                            label="Date of Registration"
                            name="dateRegistration"
                            isOptional={true}
                            value={egDetails.dateRegistration}
                            onChange={onChange}
                            error={errors['dateRegistration']}
                        />
                    </Col>
                    {
                        egDetails.dateRegistration ?
                            <Col className="d-flex align-items-center">
                                <span class="update-draft">Age of Activity <b>&nbsp;{calculateAge(egDetails.dateRegistration)}</b></span>
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
                            isOptional={true}
                            value={egDetails.registrationUnder}
                            onChange={onChange}
                            error={errors['registrationUnder']}
                            options={rest.registrationUnderData}
                        />
                    </Col>
                    {
                        parseInt(egDetails.registrationUnder) === registrationOthersVal ?
                            <Col md="4">
                                <FormInput
                                    type="text"
                                    label="Pls Specify Registration Others"
                                    name="registrationUnderOthers"
                                    isOptional={true}
                                    error={errors['registrationUnderOthers']}
                                    value={egDetails.registrationUnderOthers}
                                    onChange={onChange}
                                />
                            </Col>
                            : ''
                    }
                    <Col md="4">
                        <FormInput
                            type="no-special-character"
                            label="Registration Number"
                            name="registrationNumber"
                            isOptional={true}
                            value={egDetails.registrationNumber}
                            onChange={onChange}
                            error={errors['registrationNumber']}
                        />
                    </Col>
                </Row>
                <Row>

                    <Col md="4">
                        <FormInput
                            type="select"
                            label="Promoting Organization"
                            name="promotingOrgs"
                            value={egDetails.promotingOrgs}
                            onChange={onChange}
                            error={errors['promotingOrgs']}
                            options={rest.promotingOrgData}
                        />
                    </Col>
                    {(egDetails.promotingOrgs !== null && parseInt(egDetails.promotingOrgs) !== promoOrgOtherVal) ?
                        <Col md="4">
                            <FormInput
                                type="only-text"
                                optionalLabel
                                label="Name of the Promoting Organization"
                                name="promotingOrgName"
                                value={egDetails.promotingOrgName}
                                onChange={onChange}
                                error={errors['promotingOrgName']}
                            />
                        </Col>
                        : ""
                    }
                    <Col md="4">
                        <FormInput
                            type="only-text"
                            label="Name of the relevant supporting organization"
                            name="relevantSupportOrg"
                            value={egDetails.relevantSupportOrg}
                            onChange={onChange}
                            error={errors['relevantSupportOrg']}
                            options={rest.relevantSupportOrg}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormInput
                            type="select"
                            label="Supported By"
                            options={rest.formedByData}
                            name="supportingOrg"
                            error={errors['supportingOrg']}
                            value={egDetails.supportingOrg}
                            onChange={onChange}
                        />
                    </Col>
                    {
                        egDetails.supportingOrg !== null && parseInt(egDetails.supportingOrg) !== formedByOtherVal ?
                            <Col md="4">
                                <FormInput
                                    type="text"
                                    label="Name of the Supporting Organization"
                                    name="supportingOrgName"
                                    error={errors['supportingOrgName']}
                                    value={egDetails.supportingOrgName}
                                    onChange={onChange}
                                />
                            </Col>
                            : ''
                    }
                </Row>
                <Row>
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            type="select"
                            label="Type of EnterPrise Group"
                            name="egTypes"
                            isMulti={true}
                            options={rest.producerTypes}
                            error={errors['egTypes']}
                            value={egDetails.egTypes}
                            onChange={onChange}
                        />
                    </Col>
                    {
                        egDetails.egTypes&&egDetails.egTypes.length ? 
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            label="Type of Sector"
                            name="egSectorTypes"
                            isMulti={true}
                            options={rest.sectorTypes}
                            error={errors['egSectorTypes']}
                            value={egDetails.egSectorTypes}
                            onChange={onChange}

                        />
                        </Col> : ''
                    }
                     {
                        egDetails.egSectorTypes&&egDetails.egSectorTypes.length ? 
                    <Col md="4" className="custom-reselect">
                        <ReactSelect
                            type="select"
                            label="Type of Commodities "
                            name="egCommodityTypes"
                            isMulti={true}
                            options={rest.commodityTypes}
                            error={errors['egCommodityTypes']}
                            value={egDetails.egCommodityTypes}
                            onChange={onChange}
                        />
                    </Col>: ''
                    }
                </Row>
                {
                    egDetails.egCommodityTypes?.length ? 
                    <span className="update-draft">
                        {`EG Involved in ${egDetails.egCommodityTypes?.length ===1 ?'Single' : 'Multiple'} Commodities`}   
                    </span> : ''
                }
                
            </Col>
        </Row>
    );
}

export default DetailsForm;