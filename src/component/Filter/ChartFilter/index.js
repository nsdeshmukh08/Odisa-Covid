import React from 'react';
import {
    Row,
    Col,
    Input
} from "reactstrap";

import { downloadScreenshotOrPrint } from 'helpers'

const ChartFilter = (props) => {
    return (
        <Row className="align-items-center no-gutters bg-white my-2 ">
            <Col md="12" className="pr-5 pl-4">
                <Row className="no-gutters">
                    <Col>
                        <div className="py-3">
                            <div className={props.hideSearch ? 'visibility-hidden search-input' : 'search-input'}>
                                <i className="icon-search"></i>
                                <Input
                                    type="text"
                                    placeholder="Search by name..."
                                    name="search"

                                    value={props.search}
                                    onChange={({ target }) => props.onSearch(target.value)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="auto" className="align-self-center d-flex align-items-center">
                        <div className="px-3">
                            <i className="icon-printer cursor-pointer"
                                onClick={() => downloadScreenshotOrPrint(true)}
                            ></i>
                        </div>
                        <div className="px-3">
                            <i className="icon-download cursor-pointer"
                                onClick={() => downloadScreenshotOrPrint()}
                            ></i>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ChartFilter;