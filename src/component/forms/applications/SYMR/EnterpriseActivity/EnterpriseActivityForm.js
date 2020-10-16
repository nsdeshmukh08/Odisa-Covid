import React, { useContext, Fragment } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import DatePicker from 'component/inputs/ReactDatetime'
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import ReactSelect from 'component/inputs/ReactSelect'
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'
import Uploadfile from 'component/inputs/Uploadfile'


const EnterpriseActivityForm = ({ enterpriseDetails = {}, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)
    
    let {  enterpriseTypeData = [],typesOfActivity = [], typesOfSector = [], typesOfCommodity = [] } = useSelector(state => state.common.symrMasterData)
     
    return (
        <Row className="amount">
            <Col xl="7" lg="8" sm="12">
                <h2 className="mb-3">{themeData.enterprise}</h2>
                <Row className="mb-3">
                    <Col lg="6" sm="12">
                        <FormInput
                            type="only-text"
                            label="Name of Enterprise"
                            name="enterpriseName"
                            onChange={onChange}
                            error={errors['enterpriseName']}
                            value={enterpriseDetails["enterpriseName"]}
                        /></Col>
                  
                </Row>

                <p className="small-size mt-3">Type of Enterprise</p>
                <Row className="member-shg mb-3">
                    <Col md="6">
                        <FormInput
                            type="radio"
                            options={[
                                {
                                  label: 'Nano',
                                  value: 1,
                                },
                                {
                                  label: 'Micro',
                                  value: 2,
                                },
                              ]}
                            name="enterpriseTypeList"
                            onChange={onChange}
                            error={errors['enterpriseTypeList']}
                            value={enterpriseDetails["enterpriseTypeList"]}
                        />
                    </Col>
                </Row>
                {/* {
                    enterpriseDetails['enterpriseTypeList'] ?
                    <Row className="mb-3">
                        <Col md="6" >
                          <FormInput
                                type="select"
                                name="enterpriseType"
                                value={enterpriseDetails["enterpriseType"]}
                                error={errors["enterpriseType"]}
                                onChange={onChange}
                                options={ [
                                        {
                                        label: 'Nano',
                                        value: 'Nano'
                                    },
                                    {
                                        label: 'Micro',
                                        value: 'Micro'
                                    }, 
                                ]}
                            />
                        </Col>                   
                    </Row>
                    : ''
                } */}
                <Row className="mb-3">
                    <Col md="6">
                        <ReactSelect
                            type="select"
                            label={'Activity'}
                            name="symrSectorTypes"
                            isMulti={true}
                            options={[
                                {
                                    label: 'Farm',
                                    value: 'Farm'
                                },
                                {
                                    label: 'Non farm',
                                    value: 'Non farm'
                                }, 
                            ]} //need to be included in master data
                            error={errors["symrSectorTypes"]}
                            value={enterpriseDetails["symrSectorTypes"]}
                            onChange={onChange}
                        />
                    </Col>
                    <Col md="6">
                        <ReactSelect
                            type="select"
                            label={'Type of Sector'}
                            name="symrActivityTypes"
                            isMulti={true}
                            options={[
                                {
                                    label: 'NGO', 
                                    value: 'NGO'
                                },
                                {
                                    label: 'Agriculture', 
                                    value: 'Agriculture'
                                },
                                {
                                    label: 'Horticulture', 
                                    value: 'Horticulture'
                                },
                                {
                                    label: 'Animal Husbandry', 
                                    value: 'Animal Husbandry'
                                },
                            ]} //need to be included in master data
                            error={errors["symrActivityTypes"]}
                            value={enterpriseDetails["symrActivityTypes"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    
                    <Col md="6">
                        <ReactSelect
                            type="select"
                            label={'Type of Commodities'}
                            name="symrCommodityTypes"
                            isMulti={true}
                            options={[
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
                            ]} //need to be included in master data
                            error={errors["symrCommodityTypes"]}
                            value={enterpriseDetails["symrCommodityTypes"]}
                            onChange={onChange}
                        />
                    </Col>
                </Row>

                <p className="small-size mt-3">
                    Whether Activity plan is ready
                </p>

                <Row className="mb-3">
                    <Col md="6">
                        <FormInput
                            type="radio"
                            options={IS_TRUE}
                            name="isActivityPlanReady"
                            onChange={onChange}
                            error={errors['isActivityPlanReady']}
                            value={enterpriseDetails["isActivityPlanReady"]}
                        />
                    </Col>
                </Row>
                {
                    enterpriseDetails['isActivityPlanReady'] ?
                    <Row>
                        <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                            <Uploadfile
                                label='Upload activity Plan'
                                id="symrUploadActivityPlan"
                                name="symrUploadActivityPlan"
                                isMult={true}
                                //Other attributes need to be inserted later here for upload functionality         
                            ></Uploadfile>
                        </Col>
                    </Row>
                : ''
                }
                {
                    enterpriseDetails['isActivityPlanReady'] ?
                    <Row className="mb-3">
                        <Col md="6" >
                            <FormGroup>
                                <DatePicker
                                    className="w-100"
                                    label="Tentative starting date of enterprise"
                                    name="dateFormation"
                                    value="" //To be updated later
                                    onChange={onChange}
                                    error={errors['dateFormation']}
                                />
                            </FormGroup>
                        </Col>                   
                    </Row>
                    : ''
                }
            </Col>
        </Row>
    );
}

export default EnterpriseActivityForm;