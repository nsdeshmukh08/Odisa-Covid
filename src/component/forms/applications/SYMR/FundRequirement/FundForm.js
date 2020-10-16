import React, { useContext, Fragment } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import DatePicker from 'component/inputs/ReactDatetime'
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from "helpers"
import ReactSelect from 'component/inputs/ReactSelect'
import { useSelector } from "react-redux"
import { IS_TRUE } from 'helpers/variables'


const FundRequirementForm = ({ fundDetails = {}, errors, onChange, onSubmit, ...rest }) => {

    let themeData = useContext(ThemeContext)
    
    let {  typesOfSector = [], typesOfCommodity = [] } = useSelector(state => state.common.symrMasterData)

    return (
        <Row className="amount">
            <Col xl="7" lg="8" sm="12">
                <h2 className="mb-3">{themeData.proposeActivityFund}</h2>

                <Row>
                    <Col lg='6' className="mb-2 text-lightGrey">
                        {themeData.particulars}
                    </Col>
                    <Col lg="6" className="mb-2 text-lightGrey">
                        {themeData.amountRs}
                    </Col>
                    <Col lg="6" className="align-self-center text-grey text-grey">
                        {themeData.costOfBuisness}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="businessActivities"
                            onChange={onChange}
                            error={errors['businessActivities']}
                            value={fundDetails["businessActivities"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfMachine}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="machineries"
                            onChange={onChange}
                            error={errors['machineries']}
                            value={fundDetails["machineries"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfWork}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="workingCapital"
                            onChange={onChange}
                            error={errors['workingCapital']}
                            value={fundDetails["workingCapital"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfInput}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="purchaseServices"
                            onChange={onChange}
                            error={errors['purchaseServices']}
                            value={fundDetails["purchaseServices"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfMarket}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="marketLinkageSupport"
                            onChange={onChange}
                            error={errors['marketLinkageSupport']}
                            value={fundDetails["marketLinkageSupport"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfOrganozation}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="organizingAwarenessCamps"
                            onChange={onChange}
                            error={errors['organizingAwarenessCamps']}
                            value={fundDetails["organizingAwarenessCamps"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg="6" className="align-self-center text-grey">
                        {themeData.costOfInfra}
                    </Col>
                    <Col lg="6" className="no-padding-input">
                    <FormInput
                            type="number"
                            name="infrastucture"
                            onChange={onChange}
                            error={errors['infrastucture']}
                            value={fundDetails["infrastucture"]}
                            inputClassName="text-right"
                        />
                    </Col>
                    <Col lg='6' className="mb-2 text-lightGrey">
                        {themeData.costOther}
                    </Col>
                    
                </Row>
                <Row>
                <Col lg='6' className="mb-2 text-lightGrey">
                        Others
                </Col>
                </Row>
                <Row>
                        <Col lg="6"  className="align-self-center text-grey">
                            <FormInput
                                type="text"
                                name="otherName"
                                onChange={onChange}
                                error={errors['otherName']}
                                value={fundDetails["otherName"]}
                            />
                        </Col>
                        <Col lg="6" className="no-padding-input">
                        <FormInput
                                type="number"
                                name="otherCost"
                                onChange={onChange}
                                error={errors['otherCost']}
                                value={fundDetails["otherCost"]}
                                placeHolder="Others"
                                inputClassName="text-right"
                            />
                        </Col>
                </Row>
                <Row className="mt-4 mb-5">
                        <Col lg="12" className=" text-right align-self-center text-bold">
                            {`Total Fund Required ${fundDetails["totalCost"]}`}
                        </Col>
                        
                </Row>
            </Col>
        </Row>
    );
}

export default FundRequirementForm;