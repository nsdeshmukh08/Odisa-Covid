import React, { useContext, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import DatePicker from 'component/inputs/ReactDatetime'
import { ThemeContext } from "helpers"
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'

const SkillAndEdpForm = ({ skillAndEdpDetails, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)
    let {courseCompletionYearData = [], trainingDurationData = [] } = useSelector(
        state => state.common.symrMasterData
    )
    //let selectedScheme = rest.schemeData.find(data => data.isOthers === true)?.value 

    return (
        <div>
            <Row className="p-4 producer-detail row bg-white">
                <Col xl="8" lg="8" sm="12">
                    <h2 className="darkGrey-2 title-two">{themeData.skillTraining}</h2>
                            <Fragment>
                                <Row>
                                    <Col md="6">
                                        <FormInput
                                            type="only-text"
                                            label='Name of the Skill training obtained'
                                            name="skillTrainingName"
                                            value={skillAndEdpDetails['skillTrainingName']}
                                            onChange={onChange}
                                            error={errors['skillTrainingName']}
                                        /> 
                                    </Col>
                                    <Col  md="6">
                                        <FormInput
                                            type="only-text"
                                            label='Name of the institution / agency where skill training attended'
                                            name="trainingInstitute"
                                            onChange={onChange}
                                            value={skillAndEdpDetails['trainingInstitute']}
                                            error={errors["trainingInstitute"]}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormInput
                                            type="only-text"
                                            label='Name of the Scheme under which skill training attended:'
                                            name="skillTrainingScheme"
                                            value={skillAndEdpDetails["skillTrainingScheme"]}
                                            error={errors["skillTrainingScheme"]}
                                            onChange={onChange}
                                        />
                                    </Col> 
                                </Row>
                                    <Row>
                                    <Col md="6">
                                        <FormInput
                                            type="select"
                                            label='Training duration'
                                            name="trainingDuration"
                                            value={skillAndEdpDetails["trainingDuration"]}
                                            error={errors["trainingDuration"]}
                                            onChange={onChange}
                                            options={[
                                                {
                                                label: '1',
                                                value: '1'
                                            },
                                            {
                                                label: '2',
                                                value: '2'
                                            }, 
                                            {
                                                label: '3',
                                                value: '3'
                                            }, 
                                            {
                                                label: '4',
                                                value: '4'
                                            }, 
                                            {
                                                label: '5',
                                                value: '5'
                                            }, 
                                           ]}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormInput
                                            type="select"
                                            label={themeData.yearOfCourseCompletion}
                                            name="courseCompletionYear"
                                            value={skillAndEdpDetails["courseCompletionYear"]}
                                            error={errors["courseCompletionYear"]}
                                            onChange={onChange}
                                            options={[
                                                {
                                                    label: '2016',
                                                    value: '1'
                                                },
                                                {
                                                    label: '2017',
                                                    value: '2'
                                                }, 
                                                {
                                                    label: '2018',
                                                    value: '3'
                                                }, 
                                                {
                                                    label: '2019',
                                                    value: '4'
                                                }, 
                                                {
                                                    label: '2020',
                                                    value: '5'
                                                },
                                            ]}
                                        />

                                    </Col>
                                </Row>
                            </Fragment>

                    <h2 className="darkGrey-2 title-two mt-3">{themeData.enterpreneurDevelopment}</h2>

                    <p className="small-size mt-3">{themeData.registerdAmyEDP}</p>
                    <Row >
                        <Col md="6">
                            <FormInput
                                type="radio"
                                options={IS_TRUE}
                                name="isRegisteredEdpProgramme"
                                onChange={onChange}
                                error={errors['isRegisteredEdpProgramme']}
                                value={skillAndEdpDetails["isRegisteredEdpProgramme"]}
                            />
                        </Col>
                    </Row>

                    {
                        skillAndEdpDetails.isRegisteredEdpProgramme === true ? 
                        <Row>
                            <Col md="6">
                                <FormInput
                                    type="only-text"
                                    label='Name of Institute'
                                    name="edpRegisteredInstituteName"
                                    onChange={onChange}
                                    value={skillAndEdpDetails["edpRegisteredInstituteName"]}
                                    error={errors["edpRegisteredInstituteName"]}
                                />
                            </Col>
                            <Col md="6">
                                <FormInput
                                    type="only-text"
                                    label='Topic'
                                    name="edpRegisteredTopic"
                                    onChange={onChange}
                                    value={skillAndEdpDetails["edpRegisteredCTopic"]}
                                    error={errors["edpRegisteredCTopic"]}
                                />
                            </Col>
                        </Row>: ''
                    }
                    {
                        skillAndEdpDetails.isRegisteredEdpProgramme === true ? 
                        <Row>
                            <Col md="6">
                                <FormInput
                                    type="only-text"
                                    label={themeData.schemeName}
                                    name="registeredEdpScheme"
                                    value={skillAndEdpDetails["registeredEdpScheme"]}
                                    error={errors["registeredEdpScheme"]}
                                    onChange={onChange}
                                />
                                {/* <span className="dotted schema"></span> */}
                            </Col>
                        </Row> : ''
                    }

                <p className="small-size mt-3">Any prior experience as Entreprenuer</p>
                <Row >
                    <Col md="6">
                        <FormInput
                            type="radio"
                            options={IS_TRUE}
                            name="isExperiencedEnterpreneur"
                            onChange={onChange}
                            error={errors['isExperiencedEnterpreneur']}
                            value={skillAndEdpDetails["isExperiencedEnterpreneur"]}
                        />
                    </Col>
                </Row>
                {
                    skillAndEdpDetails.isExperiencedEnterpreneur ? 
                    <Row>
                        <Col md="6">
                            <FormInput
                                type="only-text"
                                label='Type of enterprise/activity engaged with'
                                name="enterpriseType"
                                onChange={onChange}
                                value={skillAndEdpDetails["enterpriseType"]}
                                error={errors["enterpriseType"]}
                            /></Col>
                        <Col md="6">
                            <FormInput
                                type="only-text"
                                label='Duration of engagement in years , Months'
                                name="enterpreneurExpYears"
                                value={skillAndEdpDetails["enterpreneurExpYears"]}
                                error={errors["enterpreneurExpYears"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Row> : ''
                }
                {
                    skillAndEdpDetails.isExperiencedEnterpreneur ? 
                    <Row>
                        <Col md="6">
                            <FormInput
                                    type="only-text"
                                    label='In What capacity/ position'
                                    name="designation"
                                    value={skillAndEdpDetails.designation}
                                    onChange={onChange}
                                    error={errors['designation']}
                                /> 
                        </Col>
                        <Col md="6">
                            <FormInput
                                type="only-text"
                                label='Location'
                                name="location"
                                onChange={onChange}
                                value={skillAndEdpDetails["location"]}
                                error={errors["location"]}
                            />
                        </Col>
                    </Row> : ''
                }
                </Col>
            </Row>
        </div>

    );
}

export default SkillAndEdpForm;