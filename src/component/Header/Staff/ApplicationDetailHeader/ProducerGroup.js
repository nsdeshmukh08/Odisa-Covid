import React from 'react';
import { formatDate } from 'helpers/momentHelpers'
import { formatToINR } from 'helpers'
import { Row, Col } from 'reactstrap';
import { STAFF_ROLE_ID } from 'helpers/variables'

const ProducerGroup = ({ applicationDetail, staffRole }) => {
    return (
        <Row className="list-unstyled custom-list inline">
            <Col md="6">
                <label>Application Received</label>
                <label>
                    <strong>{formatDate(applicationDetail?.appSubmitDate)}</strong>
                </label>
            </Col>
            {
                staffRole === STAFF_ROLE_ID.BMMU ?
                    <>
                        {
                            applicationDetail?.pgBmpuApplicationStatus ? (
                                <Col md="6">
                                    <label>BMMU Received</label>
                                    <label>
                                        <strong>{formatDate(applicationDetail?.pgBmpuApplicationStatus?.recommendedDate)}</strong>
                                    </label>
                                </Col>
                            ) : ''
                        }
                        {
                            applicationDetail?.pgDmpuApplicationStatus ? (
                                <Col md="6">
                                    <label>DMMU Approved</label>
                                    <label>
                                        <strong>{formatDate(applicationDetail?.pgDmpuApplicationStatus?.approvedDate)}</strong>
                                    </label>
                                </Col>
                            ) : ''
                        }
                    </> : ''
            }
            {
                (staffRole !== STAFF_ROLE_ID.BMMU && applicationDetail?.pgDmpuApplicationStatus) ?
                    <Col md="6">
                        <label>Application Approved</label>
                        <label>
                            <strong>{formatDate(applicationDetail?.pgDmpuApplicationStatus?.approvedDate)}</strong>
                        </label>
                    </Col> : ''
            }
            <Col md="6">
                <label>Application Type</label>
                <label>
                    <strong>Producer Group</strong>
                </label>
            </Col>
            <Col md="6">
                <label>Required Amount</label>
                <label>
                    <strong>Rs {formatToINR(applicationDetail?.totalAmount)}</strong>
                </label>
            </Col>
        </Row>
    );
}

export default ProducerGroup;