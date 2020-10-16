import React, { useContext, Fragment } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import DatePicker from 'component/inputs/ReactDatetime';
import FormInput from 'component/inputs/FormInput';
import { ThemeContext } from 'helpers';
import ReactSelect from 'component/inputs/ReactSelect';
import { useSelector } from 'react-redux';
import { IS_TRUE } from 'helpers/variables';

const EnterpriseActivityForm = ({
  iaEnterprise,
  errors,
  onChange,
  onSubmit,
  ...rest
}) => {
  let themeData = useContext(ThemeContext);

  let {
    typesOfSector = [],
    typesOfCommodity = [],
    typesOfActivity = [],
  } = useSelector((state) => state.common.iaMasterData);

  return (
    <Row className="amount">
      <Col xl="7" lg="8" sm="12">
        <h2 className="mb-3">{themeData.enterprise}</h2>
        <Row className="mb-3">
          <Col lg="6" sm="12">
            <FormInput
              type="only-text"
              label={themeData.ENTERPRISE_NAME}
              name="enterpriseName"
              onChange={onChange}
              error={errors['enterpriseName']}
              value={iaEnterprise['enterpriseName']}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="6">
            <FormGroup>
              <DatePicker
                className="w-100"
                label={themeData.dateOfActivity}
                name="dateOfActivity"
                value={iaEnterprise['dateOfActivity']}
                onChange={onChange}
                error={errors['dateOfActivity']}
              />
            </FormGroup>
          </Col>
        </Row>

        <p className="small-size mt-3">Type of Enterprise</p>
        <Row>
          <Col className="member-shg">
            <FormInput
              type="radio"
              options={[
                {
                  label: 'Nano',
                  value: 1,
                },
                {
                  label: 'Micro',
                  value: 2,
                },
              ]}
              name="enterpriseType"
              onChange={onChange}
              error={errors['enterpriseType']}
              value={iaEnterprise['enterpriseType']}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="6">
            <ReactSelect
              type="select"
              label={themeData.activity}
              name="ieActivityTypes"
              isMulti={true}
              options={typesOfActivity}
              error={errors['ieActivityTypes']}
              value={iaEnterprise['ieActivityTypes']}
              onChange={onChange}
            />
          </Col>
          <Col md="6">
            <ReactSelect
              type="select"
              label={themeData.typeOfSector}
              name="ieSectorTypes"
              isMulti={true}
              options={typesOfSector}
              error={errors['ieSectorTypes']}
              value={iaEnterprise['ieSectorTypes']}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="6">
            <ReactSelect
              type="select"
              label={themeData.TypeOfCommodity}
              name="ieCommodityTypes"
              isMulti={true}
              options={typesOfCommodity}
              error={errors['ieCommodityTypes']}
              value={iaEnterprise['ieCommodityTypes']}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EnterpriseActivityForm;
