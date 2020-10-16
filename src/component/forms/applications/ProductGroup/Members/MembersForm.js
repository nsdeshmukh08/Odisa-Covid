import React from 'react';
import FormInput from 'component/inputs/FormInput';
import _ from "lodash";
import { Row, Col } from 'reactstrap';

const MembersForm = ({ pgFormMembers, onChange, errors, ...rest }) => {
    return (
        <>
            <Col md="12" className="mb-2">
                {/*<h2 className="title-two">Member Details</h2>
                 <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total Members"
                            name="totalMembers"
                            value={pgFormMembers['totalMembers']}
                            error={errors["totalMembers"]}
                            onChange={(...params) => onChange(...params, "totalMembers")}
                        />
                    </Col>
                </Row>

                <Col md="12" className="border-bottom d-none d-md-block mb-4"></Col> */}

            </Col>

            <Col md='9' className="mb-2">
                <h2 className="title-two">Social Category</h2>
                <Row>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Gen"
                            name="noOfGen"
                            value={pgFormMembers['noOfGen']}
                            error={errors["noOfGen"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">

                        <FormInput
                            type="number"
                            label="SEBC"
                            name="noOfSEBC"
                            value={pgFormMembers['noOfSEBC']}
                            error={errors["noOfSEBC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="SC"
                            name="noOfSC"
                            value={pgFormMembers['noOfSC']}
                            error={errors["noOfSC"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="ST"
                            name="noOfST"
                            value={pgFormMembers['noOfST']}
                            error={errors["noOfST"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Total"
                            name="communityTotal"
                            value={pgFormMembers['communityTotal']}
                            error={errors["communityTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                    <Col md="2">
                        <FormInput
                            type="number"
                            label="Minority"
                            name="noOfMinorityOthers"
                            value={pgFormMembers['noOfMinorityOthers']}
                            error={errors["noOfMinorityOthers"]}
                            onChange={(...params) => onChange(...params, "communityTotal")}
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
                            value={pgFormMembers['noOfMale']}
                            error={errors["noOfMale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Women Members"
                            name="noOfFemale"
                            value={pgFormMembers['noOfFemale']}
                            error={errors["noOfFemale"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of transgenders"
                            name="noOfTransGender"
                            value={pgFormMembers['noOfTransGender']}
                            error={errors["noOfTransGender"]}
                            onChange={(...params) => onChange(...params, "genderTotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="genderTotal"
                            value={pgFormMembers['genderTotal']}
                            error={errors["genderTotal"]}
                            onChange={onChange}
                            disabled
                        /></Col>
                </Row>
            </Col>

            <Col xl="12" sm="12" className="mb-2">
                <h2 className="title-two">PWD</h2>
                <Row>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Male Membes"
                            name="PwdnoOfMale"
                            value={pgFormMembers['PwdnoOfMale']}
                            error={errors["PwdnoOfMale"]}
                            onChange={(...params) => onChange(...params, "PwdGendertotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of Women Members"
                            name="PwdnoOfFemale"
                            value={pgFormMembers['PwdnoOfFemale']}
                            error={errors["PwdnoOfFemale"]}
                            onChange={(...params) => onChange(...params, "PwdGendertotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="No of transgenders"
                            name="PwdnoOfTransGender"
                            value={pgFormMembers['PwdnoOfTransGender']}
                            error={errors["PwdnoOfTransGender"]}
                            onChange={(...params) => onChange(...params, "PwdGendertotal")}
                        /></Col>
                    <Col md="3">
                        <FormInput
                            type="number"
                            label="Total"
                            name="PwdGendertotal"
                            value={pgFormMembers['PwdGendertotal']}
                            error={errors["PwdGendertotal"]}
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
                            label="Total SHG Memebers involved in EG/PG"
                            name="noOfSHGMembers"
                            value={pgFormMembers['noOfSHGMembers']}
                            error={errors["noOfSHGMembers"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        /></Col>
                    <Col>
                        <FormInput
                            type="number"
                            label="Total Memebers from SHG Household "
                            name="noOfSHGTotal"
                            value={pgFormMembers['noOfSHGTotal']}
                            error={errors["noOfSHGTotal"]}
                            onChange={(...params) => onChange(...params, "shgTotal")}
                        />
                    </Col>
                </Row>
            </Col>
        </>

    )
}

export default MembersForm;