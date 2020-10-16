import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'reactstrap';
import Select from 'component/inputs/CustomSelect'
import close from 'assets/images/close.svg'

export default class CoverageDistrict extends Component {

    UndoSelectedData = (index) => {
        let { coverageDistrict,onChange } = this.props
        coverageDistrict.splice(index,1)
        onChange("coverageDistrict",coverageDistrict)
    }

    render() {
        const { districtList,coverageDistrict,onChange } = this.props
        return (
            <>
                <Row className="border-top bg-white react-select-coverage">
                    <Col lg="3" className="border-right d-flex align-items-start p-4">
                        <div className="coverage-dropdown w-100">
                            <label>Choose Districts</label>
                            <Select
                                label="Districts"
                                name="coverageDistrict"
                                value={coverageDistrict}
                                onChange={onChange}
                                options={districtList}
                            />
                        </div>
                    </Col>
                    <Col lg="9" className="d-flex align-items-center coverage-body">
                        <Row>
                            <ul className="coverage-list">
                                <li className="d-flex flex-wrap">
                                    {
                                        coverageDistrict&&coverageDistrict.map(({label},index) => (
                                            <div className="mr-3">
                                                <a className="list">
                                                    {label}
                                                    <span 
                                                        className="coverage-close" 
                                                        onClick={() => this.UndoSelectedData(index)}
                                                    >
                                                        <img src={close}></img>
                                                    </span>
                                                </a>
                                            </div>
                                        ))
                                    }
                                </li>
                            </ul>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}
