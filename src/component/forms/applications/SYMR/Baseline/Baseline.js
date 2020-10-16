import React, { useContext, Fragment } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import DatePicker from 'component/inputs/ReactDatetime'
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import ReactSelect from 'component/inputs/ReactSelect'
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'


const BaselineForm = ({ baseLineDetails = {}, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)
    

    return (
        <Row className="amount">
            <Col xl="7" lg="8" sm="12">
                <h2 className="mb-3">{themeData.incomeDetailsTitle}</h2>
                <Row className="mb-3">
                    <Col lg="6" sm="12">
                        <FormInput
                            type="number"
                            label={themeData.monthlyIncome}
                            name="monthlyAverageIncome"
                            onChange={onChange}
                            error={errors['monthlyAverageIncome']}
                            value={baseLineDetails["monthlyAverageIncome"]}
                        /></Col>
                  
                </Row>
                <Row className="mb-3">
                    <Col lg="6" sm="12">
                        <FormInput
                            type="number"
                            label={themeData.turnOver}
                            name="turnover"
                            onChange={onChange}
                            error={errors['turnover']}
                            value={baseLineDetails["turnover"]}
                        /></Col>
                  
                </Row>
                <Row className="mb-3">
                    <Col lg="6" sm="12">
                        <FormInput
                            type="number"
                            label={themeData.engagementHuman}
                            name="engagementHumanResources"
                            onChange={onChange}
                            error={errors['engagementHumanResources']}
                            value={baseLineDetails["engagementHumanResources"]}
                        /></Col>
                  
                </Row>
             
            </Col>
        </Row>
    );
}

export default BaselineForm;