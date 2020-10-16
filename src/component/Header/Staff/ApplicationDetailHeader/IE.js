import React from 'react';
import { formatDate } from 'helpers/momentHelpers'
import { formatToINR } from 'helpers'
import { Row, Col } from 'reactstrap';

const IE = ({ applicationDetail }) => {
    return (
        <>
            <Row className="list-unstyled custom-list inline">
                <Col md="6">
                    <label className="mr-3">Application Received</label>
                    <label>
                        <strong>{formatDate(applicationDetail?.appSubmitDate)}</strong>
                    </label>
                </Col>

                {/* <Col md="6">
                <label>Approved Amount</label>
                <label>
                    <strong>Rs {formatToINR(applicationDetail?.totalAmount)}</strong>
                </label>
            </Col> */}
            </Row>
            <Row className="list-unstyled custom-list inline pt-3">
                <Col md="7">
                    <label>Application Type</label>
                    <label>
                        <strong>Individual Enterprise</strong>
                    </label>
                </Col>
                <Col md="5">
                    <label className="mr-3">Required Amount</label>
                    <label>
                        <strong>Rs {formatToINR(applicationDetail?.totalAmount)}</strong>
                    </label>
                </Col>
            </Row>
        </>
    );
}

export default IE;