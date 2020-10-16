import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import ActivityTable from './ActivityTable';
import { ThemeContext } from 'helpers';
const ActivityForm = ({ symrProposedActivity, ...rest }) => {
  let themeData = useContext(ThemeContext);

  return (
    <Row className="form-body p-4 activity-form-main">
      <Col xl="7" lg="12" sm="12">
        <h2 className="title-two mb-4 mt-3">
          {themeData.proposedActivityAndFund}
        </h2>
        <ActivityTable
          onAddOrRemoveActivity={rest.onAddOrRemoveActivity}
          data={symrProposedActivity}
          onChange={rest.onChange}
        />
      </Col>
    </Row>
  );
};

export default ActivityForm;
