import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ThemeContext } from "helpers"
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'
import ReactDateTime from 'component/inputs/ReactDatetime'
import { STAFF_ROLE_ID } from 'helpers/variables'
import { calcAgeInYear } from 'helpers/momentHelpers'

const BasicDetailsForm = ({ uploadDocuments, uploadingIndexes, basicDetails, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)

    let role = localStorage.getItem('role') ? parseInt(localStorage.getItem('role')) : STAFF_ROLE_ID.PUBLIC

    let { sourceOfInfoData = [], genderData = [],
        natureOfMigrationData = []
    } = useSelector(state => state.common.symrMasterData)
    // let selectedReligion = rest.religionData.find(data => data.isOthers === true)?.value
    // let selectedCommunity = rest.communityData.find(data => data.isOthers === true)?.value

    const promotingAgencyList = [
        {
            label: 'NGO', value: 'NGO'
        },
        {
            label: 'Agriculture', value: 'Agriculture'
        },
        {
            label: 'Horticulture', value: 'Horticulture'
        },
        {
            label: 'Animal Husbandry', value: 'Animal Husbandry'
        },
        {
            label: 'Forestry', value: 'Forestry'
        },
        {
            label: 'Animal Husbandry', value: 'Animal Husbandry'
        },
        {
            label: 'Fisheries', value: 'Fisheries'
        },
        {
            label: 'Sericulture', value: 'Sericulture'
        },
        {
            label: 'NABARD', value: 'NABARD'
        },
        {
            label: 'Other', value: 'Other'
        },
    ]

    return (
        <div >
            <Row className="p-4 producer-detail row bg-white">

                <Col lg="12">

                    <Row>
                        <Col lg="12">
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
                                <Col lg="3">
                                <label>Basic Details</label>
                                </Col>
                                <Col lg="9">
                                <Row>
                                <Col lg="6">
                                    <FormInput
                                    type="select"
                                    label="Name of Promoting Agency"
                                    name="promotingAgency"
                                    value={basicDetails["promotingAgency"]}
                                    error={errors["promotingAgency"]}
                                    onChange={onChange}
                                    options={promotingAgencyList}
                                    />
                                </Col>
                                <Col lg="6">
                                    <FormInput
                                        type="text"
                                        label={'Name of the Enterprise/ Activity'}
                                        name="enterpriseActivity"
                                        onChange={onChange}
                                        value={basicDetails["enterpriseActivity"]}
                                        error={errors["enterpriseActivity"]}
                                    />
                                </Col>
                                <Col lg="6">
                                    <DatePicker
                                        label={'Date of Formation'}
                                        name="dateOfFormation"
                                        value={basicDetails["dateOfFormation"]}
                                        onChange={onChange}
                                        error={errors['dateOfFormation']}
                                        className="w-100"
                                    />
                                </Col>
                                <Col lg="6">
                                    <FormInput
                                        type="number"
                                        label={'Age of EG/PG'}
                                        name="ageOfEGPG"
                                        value={basicDetails["ageOfEGPG"]}
                                        error={errors["ageOfEGPG"]}
                                        onChange={onChange}
                                    />
                                </Col>
                                <Col lg="6">
                                    <FormInput
                                    type="select"
                                    label="CLF"
                                    name="clfId"
                                    value={basicDetails["clfId"]}
                                    error={errors["clfId"]}
                                    onChange={onChange}
                                    options={promotingAgencyList}
                                    />
                                </Col>
                                <Col lg="6">
                                    <FormInput
                                        type="only-text"
                                        label={'Name of the Enterprise / Producer Group'}
                                        name="enterpriseAndProducerGroup"
                                        onChange={onChange}
                                        value={basicDetails["enterpriseAndProducerGroup"]}
                                        error={errors["enterpriseAndProducerGroup"]}
                                    />
                                </Col>
                                </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                <label>Location</label>
                                </Col>
                                <Col lg="9">
                                    <Row>
                                    <Col lg="6">
                                    <FormInput
                                    type="select"
                                    label="District"
                                    name="districtId"
                                    value={basicDetails["districtId"]}
                                    error={errors["districtId"]}
                                    onChange={onChange}
                                    options={promotingAgencyList}
                                    />
                                    </Col>
                                    <Col lg="6">
                                        <FormInput
                                        type="select"
                                        label="Block"
                                        name="blockId"
                                        value={basicDetails["blockId"]}
                                        error={errors["blockId"]}
                                        onChange={onChange}
                                        options={promotingAgencyList}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <FormInput
                                        type="select"
                                        label="Panchayat"
                                        name="panchayatId"
                                        value={basicDetails["panchayatId"]}
                                        error={errors["panchayatId"]}
                                        onChange={onChange}
                                        options={promotingAgencyList}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <FormInput
                                        type="select"
                                        label="Village"
                                        name="villageId"
                                        value={basicDetails["villageId"]}
                                        error={errors["villageId"]}
                                        onChange={onChange}
                                        options={promotingAgencyList}
                                        />
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                <label>Contact & Address</label>
                                </Col>
                                <Col lg="9">
                                <Row>
                                <Col lg="6">
                                    <FormInput
                                        type="number"
                                        label={'Mobile Number'}
                                        name="mobileNumber"
                                        value={basicDetails["mobileNumber"]}
                                        error={errors["mobileNumber"]}
                                        onChange={onChange}
                                    />
                                </Col>
                                <Col lg="6">
                                    <FormInput
                                        type="textarea"
                                        label={'Address for communication'}
                                        name="AddressCommunication"
                                        onChange={onChange}
                                        value={basicDetails["AddressCommunication"]}
                                        error={errors["AddressCommunication"]}
                                    />
                                </Col>
                                </Row>
                                </Col>
                            </Row>


                            {/* <Row>
                                <Col>
                                    <FormInput
                                        type="select"
                                        label={themeData.religion}
                                        name="religion"
                                        value={basicDetails["religion"]}
                                        error={errors["religion"]}
                                        onChange={onChange}
                                        options={rest.religionData}
                                    />
                                </Col>
                                {
                                    parseInt(basicDetails.religion) === selectedReligion ?
                                        <Col md="4">
                                            <FormInput
                                                type="only-text"
                                                label="Pls Specify Others"
                                                name="otherReligion"
                                                value={basicDetails.otherReligion}
                                                onChange={onChange}
                                                error={errors['otherReligion']}
                                            />
                                        </Col>
                                        : ""
                                }
                                <Col>
                                    <FormInput
                                        type="select"
                                        label={themeData.gender}
                                        name="gender"
                                        value={basicDetails["gender"]}
                                        error={errors["gender"]}
                                        onChange={onChange}
                                        options={genderData}
                                    />
                                </Col>


                            </Row>

                            <Row>
                                <Col md="6">
                                    <FormInput
                                        type="select"
                                        label={themeData.community}
                                        name="community"
                                        value={basicDetails["community"]}
                                        error={errors["community"]}
                                        onChange={onChange}
                                        options={rest.communityData}
                                    />
                                </Col>
                                {
                                    parseInt(basicDetails.community) === selectedCommunity ?
                                        <Col md="4">
                                            <FormInput
                                                type="only-text"
                                                label="Pls Specify Others"
                                                name="otherCommunity"
                                                value={basicDetails.otherCommunity}
                                                onChange={onChange}
                                                error={errors['otherCommunity']}
                                            />
                                        </Col>
                                        : ""
                                }
                            </Row> */}
                        </Col>
                    </Row>

                </Col>


            </Row>
        </div>

    );
}

export default BasicDetailsForm;