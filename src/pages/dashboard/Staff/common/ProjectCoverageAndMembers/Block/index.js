import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'reactstrap';
import Select from 'component/inputs/CustomSelect'
import close from 'assets/images/close.svg'

export default class CoverageDistrict extends Component {

    UndoSelectedData = (index,blockIndex) => {
        let { coverageDistrict,onChange } = this.props
        coverageDistrict[index]['coverageBlock'].splice(blockIndex,1)
        onChange("coverageDistrict",coverageDistrict[index]['coverageBlock'],index)
    }

    getBlockLabel = (index,value) => {
        const { blockList } = this.props
        return blockList[index].find(district => district.value === value).label
    }


    render() {
        const { blockList,coverageDistrict,onChange } = this.props
        return (
            <>
                {
                    coverageDistrict.map((district,index) => (
                        <Row className="border-top bg-white react-select-coverage">
                            <Col lg="3" className="border-right d-flex align-items-start p-4">
                                <div className="coverage-dropdown w-100">
                                    <label htmlFor="">{district.label}</label>
                                    <Select
                                        name="coverageBlock"
                                        label={"Blocks"}
                                        value={district.coverageBlock}
                                        onChange={(...params) => onChange(...params,index)}
                                        options={blockList[index]}
                                    />
                                </div>
                            </Col>
                            <Col lg="9" className="d-flex align-items-center coverage-body">
                                <Row>
                                    <ul className="coverage-list">
                                        <li className="d-flex flex-wrap">
                                            {
                                                district.coverageBlock&&district.coverageBlock.map(({label,value},blockIndex) => (
                                                    <div className="mr-3">
                                                        <a className="list">
                                                            {this.getBlockLabel(index,value)}
                                                            <span 
                                                                className="coverage-close" 
                                                                onClick={() => this.UndoSelectedData(index,blockIndex)}
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
                    ))
                }

            </>
        )
    }
}
