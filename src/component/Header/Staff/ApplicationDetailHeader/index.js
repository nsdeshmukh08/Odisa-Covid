import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import ProducerCollectiveHeader from './ProducerCollective'
import SYMRHeader from './SYMR'
import IEHeader from './IE'
import ProducerGroup from "./ProducerGroup";
import EnterpriseGroup from './enterpriseGroup'

const getApplicationHeaderBaseonApp = {
    pc: ProducerCollectiveHeader,
    SYMR: SYMRHeader,
    PG: ProducerGroup,
    EG: EnterpriseGroup,
    IE: IEHeader,
    get: function (appId) {
        return this[appId] ? this[appId] : ''
    }
}

const ApplicationDetailHeaderFunc = ({ applicationDetail, selectedApplicationStatus, toggle, staffRole, type = 'pc' }) => {

    let Header = getApplicationHeaderBaseonApp.get(type)

    return (
        <div className="assesment-card-head border-bottom bg-white">
            <Row className="py-3 d-flex align-items-center">
                <Col >
                    <h3 className="fw-700 m-0">APP ID : {applicationDetail?.formId}</h3></Col>
                <Col>
                    <div className="d-flex justify-content-end">
                        <i class="icon-close" onClick={toggle}></i>
                    </div>
                </Col>
            </Row>
            <Header applicationDetail={selectedApplicationStatus} staffRole={staffRole} />
        </div>
    );
}

const mapStateToProps = ({ profile, staff }) => {
    return { profile, selectedApplicationStatus: staff.applications.selectedApplicationStatus }
}

const ApplicationDetailHeader = connect(mapStateToProps)(ApplicationDetailHeaderFunc)

export { ApplicationDetailHeader }