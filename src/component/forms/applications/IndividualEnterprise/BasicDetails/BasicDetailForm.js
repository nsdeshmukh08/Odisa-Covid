import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import DatePicker from 'component/inputs/ReactDatetime';
import { ThemeContext } from 'helpers';
import { useSelector } from 'react-redux';
import { IS_TRUE } from 'helpers/variables';
import ReactDateTime from 'component/inputs/ReactDatetime';
import { STAFF_ROLE_ID } from 'helpers/variables';
import { calcAgeInYear } from 'helpers/momentHelpers';
import Uploadfile from 'component/inputs/Uploadfile';

const BasicDetailsForm = ({
  basicDetails,
  uploadingIndexes,
  errors,
  onChange,
  onSubmit,
  ...rest
}) => {
  let themeData = useContext(ThemeContext);
  let role = localStorage.getItem('role')
    ? parseInt(localStorage.getItem('role'))
    : STAFF_ROLE_ID.PUBLIC;

  let {
    vulnerableTypeData = []
    // genderData = [],
    // natureOfMigrationData = [],
  } = useSelector((state) => state.common.ieMasterData);

  let selectedCommunity = rest.communityData.find(
    (data) => data.isOthers === true
  )?.value;
  return (
    <div>
      <Row className="p-4 producer-detail row bg-white">
        <Col lg="12">
          <Row>
            <Col lg="3">
              <label>Basic</label>
            </Col>
            <Col lg="9">
              <Row>
                {role !== STAFF_ROLE_ID.PUBLIC ? (
                  <Col md="6">
                    <ReactDateTime
                      type="number"
                      className="w-100"
                      label="Application Received Date"
                      name="appSubmitDate"
                      onChange={onChange}
                      value={basicDetails['appSubmitDate']}
                      error={errors['appSubmitDate']}
                      disabled={true}
                    />
                  </Col>
                ) : (
                  ''
                )}
              </Row>

              <Row>
                <Col>
                  <FormInput
                    type="only-text"
                    label={`
                                    ${
                                      role !== STAFF_ROLE_ID.PUBLIC
                                        ? 'Applicant'
                                        : ''
                                    } Name`}
                    name="name"
                    onChange={onChange}
                    value={basicDetails['name']}
                    error={errors['name']}
                  />
                </Col>
                <Col>
                  <FormInput
                    type="only-text"
                    label={themeData.fatherAndHusbandName}
                    name="fatherName"
                    onChange={onChange}
                    value={basicDetails['fatherName']}
                    error={errors['fatherName']}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <FormInput
                    type="number"
                    label={'Aadhaar Number'}
                    name="aadharNumber"
                    onChange={onChange}
                    value={basicDetails['aadharNumber']}
                    error={errors['aadharNumber']}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <DatePicker
                    label={themeData.dob}
                    name="dateOfBirth"
                    value={basicDetails['dateOfBirth']}
                    onChange={onChange}
                    error={errors['dateOfBirth']}
                    className="w-100"
                  />
                </Col>
                <Col>
                  <FormInput
                    type="number"
                    label={themeData.age}
                    name="age"
                    value={calcAgeInYear(basicDetails['dateOfBirth'], true)}
                    error={errors['age']}
                    onChange={onChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <FormInput
                    type="radio"
                    options={[
                      {
                        label: 'Male',
                        value: 1,
                      },
                      {
                        label: 'Female',
                        value: 2,
                      },
                      {
                        label: 'Transgender',
                        value: 3,
                      },
                    ]}
                    label={themeData.gender}
                    onChange={onChange}
                    name="gender"
                    value={basicDetails['gender']}
                    error={errors['gender']}
                  />
                </Col>
                <Col lg="12">
                  <FormInput
                    type="radio"
                    options={[
                      {
                        label: 'SC',
                        value: 1,
                      },
                      {
                        label: 'ST',
                        value: 2,
                      },
                      {
                        label: 'SEBC',
                        value: 3,
                      },
                      {
                        label: 'GEN',
                        value: 4,
                      },
                    ]}
                    label={themeData.community}
                    onChange={onChange}
                    value={basicDetails['community']}
                    error={errors['community']}
                    name="community"
                  />
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

          <Row>
            <Col lg="3">
              <label>Contact & Address</label>
            </Col>
            <Col lg="9">
              <Row>
                <Col md="6">
                  <FormInput
                    type="number"
                    label={`${
                      role !== STAFF_ROLE_ID.PUBLIC ? 'Applicant' : ''
                    } Mobile Number`}
                    name="mobileNumber"
                    onChange={onChange}
                    value={basicDetails['mobileNumber']}
                    error={errors['mobileNumber']}
                    maxLength="10"
                    disabled={role === STAFF_ROLE_ID.PUBLIC}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormInput
                    type="textarea"
                    label={themeData.address}
                    name="address"
                    onChange={onChange}
                    value={basicDetails['address']}
                    error={errors['address']}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col lg="3">
              <label>Vulnerability/Differently Abled</label>
            </Col>
            <Col lg="9">
              <Row>
                <Col>
                  <FormInput
                    type="radio"
                    options={[
                      {
                        label: 'Yes',
                        value: true,
                      },
                      {
                        label: 'No',
                        value: false,
                      },
                    ]}
                    label={'Vulnerable'}
                    name="isVulnerable"
                    onChange={onChange}
                    error={errors['isVulnerable']}
                    value={basicDetails['isVulnerable']}
                  />
                </Col>
              </Row>
              {basicDetails['isVulnerable'] ? (
                <Row>
                  <Col lg="4">
                    <FormInput
                      type="select"
                      label={'If Vulnerable'}
                      name="vulnerableType"
                      value={basicDetails['vulnerableType']}
                      error={errors['vulnerableType']}
                      onChange={onChange}
                      options={vulnerableTypeData}
                    />
                  </Col>
                </Row>
              ) : (
                ''
              )}
              <Row>
                <Col>
                  <FormInput
                    type="radio"
                    options={[
                      {
                        label: 'Yes',
                        value: true,
                      },
                      {
                        label: 'No',
                        value: false,
                      },
                    ]}
                    label={'Differently Abled'}
                    name="isDifferentlyAbled"
                    onChange={onChange}
                    error={errors['isDifferentlyAbled']}
                    value={basicDetails['isDifferentlyAbled']}
                  />
                </Col>
              </Row>
              {basicDetails['isDifferentlyAbled'] ? (
                
                <Row>
                  <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                  <Uploadfile
                    label={themeData.disabilityCertificate}
                    id="differentlyAbledCertificate"
                    name="differentlyAbledCertificate"
                    isMult={true}
                    uploadedFileName={basicDetails.differentlyAbledCertificate
                    .map((data) => data.docName)
                    .join(', ')}
                    isUploading={uploadingIndexes.includes(
                    'differentlyAbledCertificate',
                    )}
                    onChange={rest.onUpload}
                    error={errors['differentlyAbledCertificate']}
                  ></Uploadfile>
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <label>Location</label>
            </Col>
            <Col lg="9">
              <Row>
                <Col md="6" lg="6">
                  <FormInput
                    type="select"
                    label="District"
                    name="districtId"
                    value={basicDetails['districtId']}
                    error={errors['districtId']}
                    onChange={onChange}
                    options={rest.districtList}
                  />
                </Col>
                {basicDetails.districtId ? (
                  <Col>
                    <FormInput
                      type="select"
                      label="Block"
                      onChange={onChange}
                      options={rest.blockList}
                      name="blockId"
                      value={basicDetails['blockId']}
                      error={errors['blockId']}
                    />
                  </Col>
                ) : (
                  ''
                )}
              </Row>
              <Row>
                {basicDetails.blockId ? (
                  <Col lg="6" md="6">
                    <FormInput
                      type="select"
                      label="Panchayat"
                      onChange={onChange}
                      options={rest.panchayatList}
                      name="panchayatId"
                      value={basicDetails['panchayatId']}
                      error={errors['panchayatId']}
                    />
                  </Col>
                ) : (
                  ''
                )}
              </Row>
              <Row>
                {basicDetails.panchayatId ? (
                  <Col lg="6" md="6">
                    <FormInput
                      type="select"
                      label="Village"
                      onChange={onChange}
                      options={rest.villageList}
                      name="villageId"
                      value={basicDetails['villageId']}
                      error={errors['villageId']}
                    />
                  </Col>
                ) : (
                  ''
                )}
              </Row>
              <Row>
                {basicDetails.villageId ? (
                  <Col lg="6" md="6">
                    <FormInput
                      type="select"
                      label="CLF"
                      onChange={onChange}
                      options={rest.clfList}
                      name="clfId"
                      value={basicDetails['clfId']}
                      error={errors['clfId']}
                    />
                  </Col>
                ) : (
                  ''
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BasicDetailsForm;
