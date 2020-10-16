import React from 'react';
import FormInput from 'component/inputs/FormInput';
import _ from "lodash";
import { Row, Col } from 'reactstrap';

const MembersForm = ({ pcFormMembers, onChange, errors, ...rest }) => {
    return (
        <Row id={rest.id} className="p-4">
            <Col md="12" className="mb-2">
                <h2 className="title-two">Total Members in project Area</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total Members"
                            name="totalMembers"
                            value={pcFormMembers['totalMembers']}
                            error={errors["totalMembers"]}
                            onChange={(...params) => onChange(...params, "totalMembers")}
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
                            value={pcFormMembers['noOfActive']}
                            error={errors["noOfActive"]}
                            onChange={(...params) => onChange(...params, "activeInactiveTotal")}
                        />
                    </Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Inactive Members"
                            name="noOfInActive"
                            value={pcFormMembers['noOfInActive']}
                            error={errors["noOfInActive"]}
                            onChange={(...params) => onChange(...params, "activeInactiveTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="activeInactiveTotal"
                            value={pcFormMembers['activeInactiveTotal']}
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
                            value={pcFormMembers['noOfMale']}
                            error={errors["noOfMale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Women Members"
                            name="noOfFemale"
                            value={pcFormMembers['noOfFemale']}
                            error={errors["noOfFemale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of transgenders"
                            name="noOfTransGender"
                            value={pcFormMembers['noOfTransGender']}
                            error={errors["noOfTransGender"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="genderTotal"
                            value={pcFormMembers['genderTotal']}
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
                            value={pcFormMembers['noOfBC']}
                            error={errors["noOfBC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">

                        <FormInput
                            type="number"
                            label="MBC"
                            name="noOfMBC"
                            value={pcFormMembers['noOfMBC']}
                            error={errors["noOfMBC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="SC"
                            name="noOfSC"
                            value={pcFormMembers['noOfSC']}
                            error={errors["noOfSC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="ST"
                            name="noOfST"
                            value={pcFormMembers['noOfST']}
                            error={errors["noOfST"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Others"
                            name="noOfCommunityOthers"
                            value={pcFormMembers['noOfCommunityOthers']}
                            error={errors["noOfCommunityOthers"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Total"
                            name="communityTotal"
                            value={pcFormMembers['communityTotal']}
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
                            value={pcFormMembers['noOfMuslim']}
                            error={errors["noOfMuslim"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Christians"
                            name="noOfChristians"
                            value={pcFormMembers['noOfChristians']}
                            error={errors["noOfChristians"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Others"
                            name="noOfMinorityOthers"
                            value={pcFormMembers['noOfMinorityOthers']}
                            error={errors["noOfMinorityOthers"]}
                            onChange={(...params) => onChange(...params, "minorityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Total"
                            name="minorityTotal"
                            value={pcFormMembers['minorityTotal']}
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
                            value={pcFormMembers['noOfDiffAbled']}
                            error={errors["noOfDiffAbled"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Widow"
                            name="noOfWidow"
                            value={pcFormMembers['noOfWidow']}
                            error={errors["noOfWidow"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Destitute Women"
                            name="noOfDesitute"
                            value={pcFormMembers['noOfDesitute']}
                            error={errors["noOfDesitute"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Deserted Women"
                            name="noOfDeserted"
                            value={pcFormMembers['noOfDeserted']}
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
                            value={pcFormMembers['noOfTransGender']}
                            // error={errors["noOfTransGender"]}
                            disabled = {true}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Elderly"
                            name="noOfEiderly"
                            value={pcFormMembers['noOfEiderly']}
                            error={errors["noOfEiderly"]}
                            onChange={(...params) => onChange(...params, "vulnerableTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="vulnerableTotal"
                            value={pcFormMembers['vulnerableTotal']}
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
                            value={pcFormMembers['noOfSHGMembers']}
                            error={errors["noOfSHGMembers"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="No of SHG House Holds Members"
                            name="noOfSHGTotal"
                            value={pcFormMembers['noOfSHGTotal']}
                            error={errors["noOfSHGTotal"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="No of Non SHG House Holds Members"
                            name="noOfNonSHGTotal"
                            value={pcFormMembers['noOfNonSHGTotal']}
                            error={errors["noOfNonSHGTotal"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        />
                    </Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Total"
                            name="shgTotal"
                            value={pcFormMembers['shgTotal']}
                            error={errors["shgTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>
        </Row>

    )
}

export default MembersForm;