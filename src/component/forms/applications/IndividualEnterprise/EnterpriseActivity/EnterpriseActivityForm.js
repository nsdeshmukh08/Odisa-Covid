import React, { useContext, Fragment } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import DatePicker from 'component/inputs/ReactDatetime'
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import ReactSelect from 'component/inputs/ReactSelect'
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'

const EnterpriseActivityForm = ({
  enterpriseDetails,
  errors,
  onChange,
  onSubmit,
  ...rest
}) => {
  let themeData = useContext(ThemeContext);
  
  let {
    typesOfSector = [],
    typesOfCommodity = [],
    activityData = [],
  } = useSelector((state) => state.common.ieMasterData);
  
  return (
    <Row className="amount">
      <Col xl="7" lg="8" sm="12">
        <h2 className="mb-3">{themeData.enterprise}</h2>
        <Row className="mb-3">
          <Col lg="6" sm="12">
            <FormInput
              type="only-text"
              label="Name of Enterprise"
              name="enterpriseName"
              onChange={onChange}
              error={errors['enterpriseName']}
              value={enterpriseDetails['enterpriseName']}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="6">
            <FormGroup>
              <DatePicker
                className="w-100"
                label="Starting Date of the Activity"
                name="dateOfActivity"
                value={enterpriseDetails['dateOfActivity']}
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
              value={enterpriseDetails['enterpriseType']}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="6">
            <ReactSelect
              type="select"
              label={'Activity'}
              name="ieActivityTypes"
              isMulti={true}
              options={activityData}
              error={errors['ieActivityTypes']}
              value={enterpriseDetails['ieActivityTypes']}
              onChange={onChange}
            />
          </Col>
          <Col md="6">
            <ReactSelect
              type="select"
              label={'Type of Sector'}
              name="ieSectorTypes"
              isMulti={true}
              options={typesOfSector}
              error={errors['ieSectorTypes']}
              value={enterpriseDetails['ieSectorTypes']}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="6">
            <ReactSelect
              type="select"
              label={'Type of Commodities'}
              name="ieCommodityTypes"
              isMulti={true}
              options={typesOfCommodity}
              error={errors['ieCommodityTypes']}
              value={enterpriseDetails['ieCommodityTypes']}
              onChange={onChange}
            />
          </Col>
        </Row>
         </Col>
        </Row>
    );
}

export default EnterpriseActivityForm;
