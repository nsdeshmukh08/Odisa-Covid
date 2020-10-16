import React from 'react';
import FormInput from 'component/inputs/FormInput';
import DatePicker from 'component/inputs/ReactDatetime'
import ReactSelect from 'component/inputs/ReactSelect'
import _ from "lodash";
import { calculateAge } from 'helpers/momentHelpers'
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';

const DetailsForm = ({ pcDetails, onChange, errors, ...rest }) => {

    let registrationOthersVal = rest.registrationUnderData.find(data => data.isOthers === 1)?.value
    let promoOrgOtherVal = rest.promotingOrgData.find(data => data.showField === 0)?.value
    let formedByOtherVal = rest.formedByData.find(data => data.showField === 0)?.value

    return (
        <div id={rest.id}>
            <Row className="p-4 producer-detail">
                <Col lg="12" md="12" xl="10" >
                    <h2 className="darkGrey-2 title-two mb-3">Producer Collective Details</h2>
                    <Row>
                        <Col md="4" >
                            <FormGroup>
                                <DatePicker
                                    className="w-100"
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
                                className="w-100"
                                label="Date of Registration"
                                name="dateRegistration"
                                isOptional={true}
                                value={pcDetails.dateRegistration}
                                onChange={onChange}
                                error={errors['dateRegistration']}
                            />
                        </Col>
                        {
                            pcDetails.dateRegistration ?
                                <Col className="d-flex align-items-center">
                                    <span class="update-draft">Age of Activity <b>&nbsp;{calculateAge(pcDetails.dateRegistration)}</b></span>
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
                                value={pcDetails.registrationUnder}
                                onChange={onChange}
                                error={errors['registrationUnder']}
                                options={rest.registrationUnderData}
                            />
                        </Col>
                        {
                            parseInt(pcDetails.registrationUnder) === registrationOthersVal ?
                                <Col md="4">
                                    <FormInput
                                        type="only-text"
                                        label="Pls Specify Registration Others"
                                        name="registrationUnderOthers"
                                        isOptional={true}
                                        error={errors['registrationUnderOthers']}
                                        value={pcDetails.registrationUnderOthers}
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
                                value={pcDetails.registrationNumber}
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
                                value={pcDetails.promotingOrgs}
                                onChange={onChange}
                                error={errors['promotingOrgs']}
                                options={rest.promotingOrgData}
                            />
                        </Col>
                        {(pcDetails.promotingOrgs !== null && parseInt(pcDetails.promotingOrgs) !== promoOrgOtherVal) ?
                            <Col md="4">
                                <FormInput
                                    type="only-text"
                                    optionalLabel
                                    label="Name of the Promoting Organization"
                                    name="promotingOrgName"
                                    value={pcDetails.promotingOrgName}
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
                                value={pcDetails.relevantSupportOrg}
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
                                value={pcDetails.supportingOrg}
                                onChange={onChange}
                            />
                        </Col>
                        {
                            pcDetails.supportingOrg !== null && parseInt(pcDetails.supportingOrg) !== formedByOtherVal ?
                                <Col md="4">
                                    <FormInput
                                        type="only-text"
                                        label="Name of the Supporting Organization"
                                        name="supportingOrgName"
                                        error={errors['supportingOrgName']}
                                        value={pcDetails.supportingOrgName}
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
                        {
                            rest.typesOfSector && rest.typesOfSector.length ?
                                <Col md="4" className="custom-reselect">
                                    <ReactSelect
                                        label="Type of Sector"
                                        name="pcSectorTypes"
                                        isMulti={true}
                                        options={rest.typesOfSector}
                                        error={errors['pcSectorTypes']}
                                        value={pcDetails.pcSectorTypes}
                                        onChange={onChange}

                                    /></Col> : ''
                        }

                        {
                            rest.typesOfCommodity && rest.typesOfCommodity.length ?

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
                                </Col> : ''
                        }
                    </Row>
                    {
                        pcDetails.pcCommodityTypes?.length ?
                            <span className="update-draft">
                                {`PC Involved in ${pcDetails.pcCommodityTypes?.length === 1 ? 'Single' : 'Multiple'} Commodities`}
                            </span> : ''
                    }
                </Col>
            </Row>
        </div>
    );
}

export default DetailsForm;