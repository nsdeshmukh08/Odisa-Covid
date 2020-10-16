import React from 'react';
import { Row, Col } from 'reactstrap';
import ActivityTable from './ActivityTable';

const ActivityForm = ({ pcFormProposedActivity, ...rest }) => {
    return (
        <div id={rest.id}>
            <Row className="form-body p-4 activity-form-main">
                <Col xl="7" lg="12" sm="12">
                    <h2 className="title-two mb-4">Proposed Activity and fund requirement details</h2>
                    <ActivityTable
                        onAddOrRemoveActivity={rest.onAddOrRemoveActivity}
                        data={pcFormProposedActivity}
                        onChange={rest.onChange}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ActivityForm;