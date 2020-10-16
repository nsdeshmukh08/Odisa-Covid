import React from 'react';
import download from 'assets/images/download.svg';
import { history } from 'helpers'
import { Row,Col,Button } from 'reactstrap'

const DottedStartNowCard = (props) => {
    return ( 
        <div className="p-4">
        <div className="container-fluid">
            <Row className="coverage-area flex-nowrap">
                <div className="coverage-profile">
                    <img src={download}></img>
                </div>
                <Col xl="6" >
                    <h4 className="mb-0">{props.name}</h4>
                </Col>
                <Col xl="4" className="d-flex justify-content-end pr-0">
                    <Button 
                        outline 
                        color="primary  w-100 border-primary" 
                        className="fw-600" 
                        onClick={() => history.push(props.link)}
                    >
                        Start Now
                    </Button>
                </Col>
            </Row>
        </div>
        </div>

     );
}
 
export default DottedStartNowCard;