import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'reactstrap';
import Select from 'component/inputs/CustomSelect'
import FormInput from 'component/inputs/FormInput'
import close from 'assets/images/close.svg'

export default class CoverageBlock extends Component {

    renderSelectedValues = (values,index) => {
        const { blockList } = this.props
        return values.map(data => (
            {
                ...data,
                label : blockList[index].find(block => block.value === data.value).label
            }
        ))
    }

    renderSelectedDistrictValues = (value) => {
        const { districtList } = this.props
        return districtList.find(district => district.value === value).label
    }

    calculateTotalMembers = () => {
        const { areaMembers } = this.props
        return areaMembers.reduce(
            (initalvalue,data) => 
                parseInt(
                    data.districtTotalMember 
                    ? data.districtTotalMember 
                    : 0
                ) + initalvalue
                ,0
        )
    }

    render() {
        const { areaMembers,blockList,districtList } = this.props
        return (
            <>
                {
                    areaMembers.map((data,index) => (
                        <Row className="border-top bg-white react-select-coverage">
                            <Col lg="3" className="border-right react-select-coverage p-4">
                                <div className="coverage-dropdown w-100">
                                    <label>{this.renderSelectedDistrictValues(data.value)}</label>
                                    <Select
                                        name="areaMembersBlock"
                                        label="Blocks"
                                        value={this.renderSelectedValues(data.areaMembersBlock,index)}
                                        onChange={(...params) => this.props.onChange(...params,"areaMembersBlock",index)}
                                        options={blockList[index]}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" className="p-4 border-right count-value">
                                <div>
                                    <h5 className="fw-800">Specify Member Count</h5>
                                    <Row>
                                    {
                                        data.areaMembersBlock.map((myData,memberIndex) => (
                                            <Col md="4">
                                                <FormInput
                                                    type="number"
                                                    name="areaBlockTotal"
                                                    onChange={(...params) => this.props.onTotalBlockMemberChange(...params,"areaBlockTotal",index,memberIndex)}
                                                    label={blockList[index].find(block => block.value === myData.value).label}
                                                    value={myData.areaBlockTotal}
                                                    maxLength={10}
                                                />
                                            </Col>
                                        ))
                                    }
                                    </Row>
                                    
                                </div>
                            </Col>
                            <Col lg="3" className="p-4 d-flex align-items-end">
                                <Row>
                                    <Col>
                                        <FormInput
                                            type="text"
                                            value={data.districtTotalMember}
                                            disabled
                                            label={`${this.renderSelectedDistrictValues(data.value)} Total Members`}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ))
                }
                <Row className="border-top bg-white react-select-coverage">
                        <Col lg="3" className=" ml-auto border-right d-flex align-items-start p-4">
                            <FormInput
                                type="text"
                                value={this.calculateTotalMembers()}
                                disabled
                                label={`Total Members`}
                            />
                        </Col>
                </Row>
            </>
        )
    }
}
