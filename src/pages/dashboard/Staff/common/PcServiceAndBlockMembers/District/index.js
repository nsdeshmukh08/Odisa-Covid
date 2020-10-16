import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'reactstrap';
import Select from 'component/inputs/CustomSelect'
import close from 'assets/images/close.svg'
const options = [
    { value: 'District Name 1', label: 'District Name 1' },
    { value: 'District Name 1', label: 'District Name 1' },
    { value: 'District Name 1', label: 'District Name 1' }
]
export default class CoverageDistrict extends Component {

    UndoSelectedData = (index) => {
        let { areaMembers,onChange } = this.props
        areaMembers.splice(index,1)
        onChange("areaMembers",areaMembers)
    }
    

    render() {
        const { districtList,areaMembers,onChange } = this.props
        return (
            <>
                <Row className="border-top bg-white react-select-coverage">
                    <Col lg="3" className="border-right d-flex align-items-start p-4">
                        <div className="coverage-dropdown w-100">
                            <label>Choose Districts</label>
                            <Select
                                closeMenuOnSelect={false}
                                name="areaMembers"
                                label="Districts"
                                value={areaMembers}
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
                                        areaMembers&&areaMembers.map(({label},index) => (
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
