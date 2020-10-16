import React, { Component } from 'react'
import { Button, Row, Col, Input, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import Select from 'component/inputs/CustomSelect'
import FormInput from 'component/inputs/FormInput'
const options = [
    { value: 'District Name 1', label: 'District Name 1' },
    { value: 'District Name 1', label: 'District Name 1' },
    { value: 'District Name 1', label: 'District Name 1' }
]

export default class CoveragePanchayat extends Component {

    calculateTotalMembers = (index) => {
        const { coverageDistrict, activeDistrictTab } = this.props
        return coverageDistrict
        [activeDistrictTab]['coverageBlock'].reduce(
            (initalvalue, data) =>
                parseInt(
                    data.coverageBlockTotal
                        ? data.coverageBlockTotal
                        : 0
                ) + initalvalue
            , 0
        )
    }

    validatePanchayatByIndex = (index) => {
        const { coverageDistrict } = this.props
        let validateBlocks = coverageDistrict[index].coverageBlock.length > 0
        let validatePanchayat = coverageDistrict[index].coverageBlock.every(
            block => block.coveragePanchayat.length&&block.coveragePanchayat
            .every(panchayat => parseInt(panchayat.coveragePanchayatTotal) > 0 ))
        return validateBlocks&&validatePanchayat
    }

    getBlockLabel = (value) => {
        const { blockList,activeDistrictTab } = this.props
        return blockList[activeDistrictTab]?.find(data => data.value === value)?.label
    }

    getPanchayatLabel = (index,value) => {
        const { panchayatList } = this.props
        return panchayatList[index]?.find(district => district.value === value)?.label
    }


    render() {

        const {
            districtList,
            panchayatList,
            coverageDistrict,
            handlePanchayatInputChange,
            onTabChange,
            activeDistrictTab,blockList,
            handlePanchayatNumberChange
        } = this.props

        console.log(blockList,"blockList")

        let currentActiveBlock = coverageDistrict[activeDistrictTab]
        return (
            <div className="coverage-panchayart-main">
                <Row className="border-bottom">
                    <div className="coverage-tabs">
                        <Nav tabs>
                            {
                                coverageDistrict.map((data, index) => (
                                    <NavItem
                                        className={`${activeDistrictTab === index ? "active" : ""}`}
                                        onClick={() => onTabChange(index)}
                                    >
                                        <span className="mr-2 check">
                                            <i className={`${this.validatePanchayatByIndex(index) ? "icon-tick":"icon-close text-danger"}`}></i>
                                        </span>
                                        {data.label}
                                    </NavItem>
                                ))
                            }
                        </Nav>
                    </div>
                </Row>
                {
                    currentActiveBlock.coverageBlock.map((block, i) => (

                        <Row className="border-top bg-white react-select-coverage">
                            <Col lg="3" className="border-right react-select-coverage p-4">
                                <div className="coverage-dropdown w-100">
                                    <label htmlFor="">{this.getBlockLabel(block.value)}</label>
                                    <Select
                                        label={"Panchayat"}
                                        name="coveragePanchayat"
                                        value={block.coveragePanchayat}
                                        onChange={(...params) => handlePanchayatInputChange(...params, i)}
                                        options={panchayatList[i]}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" className="p-4 border-right count-value">
                                <div>
                                    <h5>Specify Member Count</h5>
                                    <Row>
                                        {
                                            block.coveragePanchayat.map((panchayat, j) => (
                                                <Col md="4">
                                                    <FormInput
                                                        type="number"
                                                        maxLength={10}
                                                        name="coveragePanchayatTotal"
                                                        label={this.getPanchayatLabel(i,panchayat.value)}
                                                        onChange={(...params) => handlePanchayatNumberChange(...params, i, j)}
                                                        value={panchayat.coveragePanchayatTotal}
                                                    />
                                                </Col>
                                            ))
                                        }

                                    </Row>
                                </div>
                            </Col>
                            <Col lg="3" className=" ml-auto border-right d-flex align-items-start p-4">
                                <FormInput
                                    type="number"
                                    value={block.coverageBlockTotal}
                                    disabled
                                    label={`Total Members`}
                                />
                            </Col>
                        </Row>
                    )
                    )
                }
                <Row className="border-top bg-white react-select-coverage">
                    <Col lg="3" className=" ml-auto border-right d-flex align-items-start p-4">
                        <FormInput
                            type="text"
                            value={this.calculateTotalMembers()}
                            disabled
                            label={`${currentActiveBlock.label} Total Members`}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
