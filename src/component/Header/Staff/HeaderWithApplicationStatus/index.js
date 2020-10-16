import React from 'react';
import { toggleRootClassName } from 'helpers'
import { Row, Col } from "reactstrap";

const HeaderWithApplicationStatus = (props) => {
    let { showApproveAccess = true } = props;
    return (
        <Row noGutters>
            <Col md="12" className="d-flex justify-content-between px-3">
                <div className="d-flex align-items-center py-3">
                    <h3 className="text-darkGrey-1 d-flex align-items-center">
                        <i className="fa fa-bars mr-2 toggler d-none" aria-hidden="true" onClick={() => toggleRootClassName('open-sidebar')}></i>
                        <span>{props.name}</span>
                    </h3>
                    {showApproveAccess?<span className="text-primary ml-3">
                        <i className="icon-premium"></i>
                        &nbsp; Approve Access
                    </span>:""}
                </div>
                <ul className={`${props.isDetailMode ? "d-none" : ''} list-unstyled custom-header-list`}>
                    <li>
                        <i className="icon-doc"></i>
                        <div>
                            <p>Total Application</p>
                            <p>
                                <strong>{props.applicationCount?.totalApplication}</strong>
                            </p>
                        </div>
                    </li>
                    <li>
                        <i className="icon-tick" aria-hidden="true"></i>
                        <div>
                            <p>Approved Application</p>
                            <p>
                                <strong>{props.applicationCount?.approvedApplication}</strong>
                            </p>
                        </div>
                    </li>
                    <li>
                        <i class="icon-close" aria-hidden="true"></i>
                        <div>
                            <p>Rejected Application</p>
                            <p>
                                <strong>{props.applicationCount?.rejectedApplication}</strong>
                            </p>
                        </div>
                    </li>
                </ul>
            </Col>
        </Row>
    );
}

export {HeaderWithApplicationStatus};

HeaderWithApplicationStatus.defaultProps={
    name : '',
    applicationCount:{},
    isDetailMode : false
}