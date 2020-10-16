import React, { useContext } from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'

const DetailsForm = ({ pgDetails, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)


    let { relationshipTypeData } = useSelector(state => state.common.symrMasterData)

    return (
        <Row className="p-4 producer-detail row bg-white">
            <Col xl="8" lg="8" sm="12">
                <h2 className="title-two">{themeData.shgTitle}</h2>

                <p className="small-size mt-3">{themeData.memberType}</p>
                <Row >
                    <Col className="member-shg">
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'SHG Member',
                                    value: 1
                                },
                                {
                                    label: 'SHG Household',
                                    value: 2
                                }
                            ]}
                            name="isShgMember"
                            onChange={onChange}
                            error={errors['isShgMember']}
                            value={pgDetails["isShgMember"]}
                        />
                    </Col>
                </Row>

                {pgDetails["isShgMember"] == 2 &&
                    <Row>
                        <Col md="6">
                            <FormInput
                                type="select"
                                label={themeData.relationShipType}
                                name="relationshipType"
                                value={pgDetails["relationshipType"]}
                                error={errors["relationshipType"]}
                                onChange={onChange}
                                options={relationshipTypeData}
                            />
                        </Col>
                    </Row>}

                <Row>
                    <Col>
                        <FormInput
                            type="only-text"
                            label={themeData.shgName}
                            name="shgName"
                            onChange={onChange}
                            value={pgDetails["shgName"]}
                            error={errors["shgName"]}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            type="number"
                            label={'NRLM Portal SHG Code'}
                            name="nrlmPortalShgCode"
                            onChange={onChange}
                            value={pgDetails["nrlmPortalShgCode"]}
                            error={errors["nrlmPortalShgCode"]}
                        />
                    </Col>
                </Row>
                <p className="small-size mt-3">{themeData.shgIfAnyCode}</p>
                <Row >

                    <Col className="member-shg">
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={onChange}
                            error={errors['shgMemberType']}
                            value={pgDetails["shgMemberType"]}
                        />
                    </Col>
                </Row>



            </Col>
        </Row>
    );
}

export default DetailsForm;