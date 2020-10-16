import React from 'react';
import FormInput from 'component/inputs/FormInput';
import _ from "lodash";
import { Row, Col } from 'reactstrap';

const MembersForm = ({ egFormMembers, onChange, errors, ...rest }) => {
    return (
        <>
            <Col md="12" className="mb-2">
                <h2 className="title-two">Total Members in project Area</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total Members"
                            className="pt-3"
                            name="totalMembers"
                            value={egFormMembers['totalMembers']}
                            error={errors["totalMembers"]}
                            onChange={(...params) => onChange(...params, "totalMembers")}
                        />
                    </Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            className="pt-3"
                            label="No.of staff engaged apart from Members"
                            name="noOfStaffEngaged"
                            value={egFormMembers['noOfStaffEngaged']}
                            error={errors["noOfStaffEngaged"]}
                            onChange={(...params) => onChange(...params, "noOfStaffEngaged")}
                        />
                    </Col>
                </Row>

                <Col md="12" className="border-bottom d-none d-md-block mb-4"></Col>

                <h2 className="title-two">Active / Inactive</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Active Members"
                            name="noOfActive"
                            value={egFormMembers['noOfActive']}
                            error={errors["noOfActive"]}
                            onChange={(...params) => onChange(...params, "activeInactiveTotal")}
                        />
                    </Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Inactive Members"
                            name="noOfInActive"
                            value={egFormMembers['noOfInActive']}
                            error={errors["noOfInActive"]}
                            onChange={(...params) => onChange(...params, "activeInactiveTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="activeInactiveTotal"
                            value={egFormMembers['activeInactiveTotal']}
                            error={errors["activeInactiveTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
            <Col xl="12" sm="12" className="mb-2">
                <h2 className="title-two">Gender</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Male Membes"
                            name="noOfMale"
                            value={egFormMembers['noOfMale']}
                            error={errors["noOfMale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Women Members"
                            name="noOfFemale"
                            value={egFormMembers['noOfFemale']}
                            error={errors["noOfFemale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of transgenders"
                            name="noOfTransGender"
                            value={egFormMembers['noOfTransGender']}
                            error={errors["noOfTransGender"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="genderTotal"
                            value={egFormMembers['genderTotal']}
                            error={errors["genderTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
            <Col md='9' className="mb-2">
                <h2 className="title-two">Community</h2>
                <Row>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="BC"
                            name="noOfBC"
                            value={egFormMembers['noOfBC']}
                            error={errors["noOfBC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">

                        <FormInput
                            type="number"
                            label="MBC"
                            name="noOfMBC"
                            value={egFormMembers['noOfMBC']}
                            error={errors["noOfMBC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="SC"
                            name="noOfSC"
                            value={egFormMembers['noOfSC']}
                            error={errors["noOfSC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="ST"
                            name="noOfST"
                            value={egFormMembers['noOfST']}
                            error={errors["noOfST"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Others"
                            name="noOfCommunityOthers"
                            value={egFormMembers['noOfCommunityOthers']}
                            error={errors["noOfCommunityOthers"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Total"
                            name="communityTotal"
                            value={egFormMembers['communityTotal']}
                            error={errors["communityTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>

                </Row>
            </Col>

            <Col md="9" className="mb-2">
                <h2 className="title-two">Minority</h2>
                <Row>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Muslims"
                            name="noOfMuslim"
                            value={egFormMembers['noOfMuslim']}
                            error={errors["noOfMuslim"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Christians"
                            name="noOfChristians"
                            value={egFormMembers['noOfChristians']}
                            error={errors["noOfChristians"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Others"
                            name="noOfMinorityOthers"
                            value={egFormMembers['noOfMinorityOthers']}
                            error={errors["noOfMinorityOthers"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Total"
                            name="minorityTotal"
                            value={egFormMembers['minorityTotal']}
                            error={errors["minorityTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
            <Col md="12" className="mb-2">
                <h2 className="title-two">Vulnerable</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Differently Abled"
                            name="noOfDiffAbled"
                            value={egFormMembers['noOfDiffAbled']}
                            error={errors["noOfDiffAbled"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Widow"
                            name="noOfWidow"
                            value={egFormMembers['noOfWidow']}
                            error={errors["noOfWidow"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Destitute Women"
                            name="noOfDesitute"
                            value={egFormMembers['noOfDesitute']}
                            error={errors["noOfDesitute"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Deserted Women"
                            name="noOfDeserted"
                            value={egFormMembers['noOfDeserted']}
                            error={errors["noOfDeserted"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                </Row>
            </Col>
            <Col md="12" className="mb-2">
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Transgender"
                            name="noOfTransGender"
                            value={egFormMembers['noOfTransGender']}
                            disabled={true}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Elderly"
                            name="noOfEiderly"
                            value={egFormMembers['noOfEiderly']}
                            error={errors["noOfEiderly"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="vulnerableTotal"
                            value={egFormMembers['vulnerableTotal']}
                            error={errors["vulnerableTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
            <Col md="12" className="mb-2">
                <h2 className="title-two">SHG</h2>
                <Row>
                    <Col>
                        <FormInput
                            type="number"
                            label="No of SHG Members"
                            name="noOfSHGMembers"
                            value={egFormMembers['noOfSHGMembers']}
                            error={errors["noOfSHGMembers"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="No of SHG House Holds Members"
                            name="noOfSHGTotal"
                            value={egFormMembers['noOfSHGTotal']}
                            error={errors["noOfSHGTotal"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="No of Non SHG House Holds Members"
                            name="noOfNonSHGTotal"
                            value={egFormMembers['noOfNonSHGTotal']}
                            error={errors["noOfNonSHGTotal"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Total"
                            name="shgTotal"
                            value={egFormMembers['shgTotal']}
                            error={errors["shgTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
        </>

    )
}

export default MembersForm;