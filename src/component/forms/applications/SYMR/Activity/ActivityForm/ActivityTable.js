import React,{useContext} from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import FormInput from 'component/inputs/FormInput';
import Close from 'assets/images/close.svg'
import  { ThemeContext } from "helpers"
import { useSelector } from 'react-redux'

const ActivityTable = (props) => {

    let { symrMasterData } = useSelector( state => state.common)
        let themeData  = useContext(ThemeContext)

    return (
        <div className="activity-list">
            <Row className="activity-gray">
                <Col> {themeData.activity}</Col>
                <Col> {themeData.timeline}</Col>
                <Col md="2" className="p-0"></Col>
                <Col>{themeData.amountRequired}</Col>
            </Row>
            {
                props.data.map((data, index) => (
                    <Row className="custom-select-head">
                        <Col className="remove-label">
                            <FormInput
                                type="only-text"
                                placeholder={`${themeData.nameOfActivity} ${index + 1}`}
                                name="activityName"
                                value={data.activityName}
                                onChange={(...params) => props.onChange(...params, index)}
                            />
                        </Col>

                        <Col className="active-select position-relative remove-label">
                            <FormInput
                                type="number"
                                name="activityTimeLineVal"
                                value={data.activityTimeLineVal}
                                onChange={(...params) => props.onChange(...params, index)}
                            />
                        </Col>
                        <Col md="2" className="p-0  active-select position-relative remove-label">
                        <FormInput
                                type="select"
                                options={symrMasterData.activityData}
                                name="activityTimeLine"
                                value={data.activityTimeLine}
                                onChange={(...params) => props.onChange(...params, index)}
                            />
                        </Col>
                        <Col className="remove-label  last-input">
                            <FormInput
                                type="number"
                                label="Activity"
                                name="amtReq"
                                value={data.amtReq}
                                onChange={(...params) => props.onChange(...params, index)}
                            />
                        </Col>
                        {
                            props.data.length > 1
                                ? <img className="filter-out-img" src={Close} alt="Close" onClick={() => props.onAddOrRemoveActivity(index)}></img>
                                : <img className="filter-out-img" src={Close} alt="Close" onClick={() => props.onAddOrRemoveActivity(index)}></img>
                        }

                    </Row>
                ))
            }
            <Row className="text-right">
                <Col> <Button color="link" onClick={() => props.onAddOrRemoveActivity()}>+ {themeData.addActivity}</Button></Col>
            </Row>
            <Row className="acivity-head total mt-3">
                <Col md="8"><p className="fw-700"> {themeData.totalAmmountRequired}</p></Col>
                <Col md="4"><p className="fw-700">Rs {
                    props.data.filter(data => data.amtReq).reduce((acc, value) => {
                        return acc + parseInt(value.amtReq)
                    }, 0).toLocaleString('en-IN')
                }</p></Col>
            </Row>
        </div>
    );
}

export default ActivityTable;