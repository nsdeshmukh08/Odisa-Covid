import React, { useContext } from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import { useSelector } from "react-redux"
import { IS_TRUE_Bool } from 'helpers/variables'

const SHGForm = ({ shgDetails, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)

    let { relationshipTypeData } = useSelector(state => state.common.symrMasterData)

    return (
        <Row className="p-4 producer-detail row bg-white">
            <Col xl="8" lg="8" sm="12">
                <h2 className="title-two">{themeData.shgTitle}</h2>

                <p className="small-size mt-3">
                    {themeData.isShgMember}
                </p>
                <Row >
                    <Col className="member-shg" md="6">
                        <FormInput
                            type="radio"
                            options={IS_TRUE_Bool}
                            name="isShgMember"
                            onChange={onChange}
                            error={errors['isShgMember']}
                            value={shgDetails["isShgMember"]}
                        />
                    </Col>
                </Row>

                {shgDetails["isShgMember"] === 1 &&
                    <Row>
                        <Col md="6">
                            <FormInput
                                type="only-text"
                                label={themeData.shgName}
                                name="shgName"
                                value={shgDetails["shgName"]}
                                error={errors["shgName"]}
                                onChange={onChange}
                            />
                        </Col>
                        <Col>
                        <FormInput
                            type="number"
                            label={themeData.nrlmPortalShgCode}
                            name="nrlmPortalShgCode"
                            onChange={onChange}
                            value={shgDetails["nrlmPortalShgCode"]}
                            //error={errors["nrlmPortalShgCode"]}
                        />
                    </Col>
                    </Row>}
                
                <p className="small-size mt-3">
                    {themeData.isHouseHoldMember}
                </p>
                <Row >
                    <Col className="member-shg">
                        <FormInput
                            type="radio"
                            options={IS_TRUE_Bool}
                            name="isHouseHoldMember"
                            onChange={onChange}
                            error={errors['isHouseHoldMember']}
                            value={shgDetails["isHouseHoldMember"]}
                        />
                    </Col>
                </Row>
                {shgDetails["isHouseHoldMember"] === 1 &&
                    <Row>
                        <Col md="6">
                            <FormInput
                                type="select"
                                label={themeData.relationShipType}
                                name="relationshipType"
                                value={shgDetails["relationshipType"]}
                                error={errors["relationshipType"]}
                                onChange={onChange}
                                options={relationshipTypeData}
                                disabled={shgDetails["isHouseHoldMember"] === 0}
                            />
                        </Col>
                        <Col>
                            <FormInput
                                type="only-text"
                                label={themeData.relationshipNrlmPortalShgCode}
                                name="relationshipNrlmPortalShgCode"
                                onChange={onChange}
                                value={shgDetails["relationshipNrlmPortalShgCode"]}
                                //error={errors["relationshipNrlmPortalShgCode"]}
                                disabled={shgDetails["isHouseHoldMember"] === 0}
                            />
                        </Col>
                    </Row>
                }
            </Col>
        </Row>
    );
}

export default SHGForm;