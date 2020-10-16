import React, { useContext } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import FormInput from 'component/inputs/FormInput';
import Close from 'assets/images/close.svg';
import { ThemeContext } from 'helpers';
import { useSelector } from 'react-redux';

const ActivityTable = (props) => {
  let { typeOFLoss } = useSelector(
    (state) => state.common.ieMasterData
  );
  let themeData = useContext(ThemeContext);
  return (
    <div className="activity-list height-auto">
      <Row className="activity-gray">
        <Col> {themeData.typeOfLoss}</Col>
        <Col className="text-right"> {themeData.valueAmount}</Col>
      </Row>
      {props.data.map((data, index) => (
        <Row className="custom-select-head">
          <Col className="remove-label">
          <FormInput
              type="select"
              placeholder={`${themeData.nameOfActivity} ${index + 1}`}
              name="lossTypeId"
              value={data.lossTypeId}
              onChange={(...params) => {
                props.onChange(...params, index);
              }}
              options={typeOFLoss}
            />
          </Col>
          <Col className="remove-label  last-input">
            <FormInput
              type="number"
              label="Activity"
              name="amount"
              inputClassName="text-right"
              value={data.amount}
              onChange={(...params) => props.onChange(...params, index)}
            />
          </Col>
          {props.data.length > 1 ? (
            <img
              className="filter-out-img"
              src={Close}
              alt="Close"
              onClick={() => props.onAddOrRemoveActivity(index)}
            ></img>
          ) : (
            <img
              className="filter-out-img"
              src={Close}
              alt="Close"
              onClick={() => props.onAddOrRemoveActivity(index)}
            ></img>
          )}
        </Row>
      ))}
      <Row className="text-right">
        <Col>
          {' '}
          <Button color="link" onClick={() => props.onAddOrRemoveActivity()}>
            + {themeData.addLossActivity}
          </Button>
        </Col>
      </Row>
      <Row className="acivity-head total mt-3">
        <Col md="8">
          <p className="fw-700"> {themeData.lossTotalValue}</p>
        </Col>
        <Col md="4">
          <p className="fw-700">
            Rs{' '}
            {props.data
              .filter((data) => data.amount)
              .reduce((acc, value) => {
                return acc + parseInt(value.amount);
              }, 0)
              .toLocaleString('en-IN')}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityTable;
