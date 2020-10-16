import React from 'react';
import { formatDate } from 'helpers/momentHelpers'
import { formatToINR } from 'helpers'
import { Row, Col } from 'reactstrap';
import { PC_FORM_MASTER_STATUS } from 'helpers/variables'

let applicationNotApprovedStatus = [
    PC_FORM_MASTER_STATUS.OPEN_APPLICATION,
    PC_FORM_MASTER_STATUS.PENDING,
    PC_FORM_MASTER_STATUS.DECLINED
]
const ProducerCollective = ({ applicationDetail }) => {
    console.log(applicationDetail,"details")
    return (
        <Row className="list-unstyled custom-list inline">
            <Col md="6">
                <label className="mr-3">Application Received</label>
                <label>
                    <strong>{formatDate(applicationDetail?.appSubmitDate)}</strong>
                </label>
            </Col>
            {
                !applicationNotApprovedStatus.includes(applicationDetail?.status) ? (
                    <Col md="6">
                        <label className="mr-3">Application Approved</label>
                        <label>
                            <strong>{formatDate(applicationDetail?.pcApplicationStatus?.dmpuVerifyDate)}</strong>
                        </label>
                    </Col>
                ) : <Col md="6"></Col>
            }

            <Col md="6">
                <label>Application Type</label>
                <label>
                    <strong>Producer Collective</strong>
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

export default ProducerCollective;