import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { history } from 'helpers'
const ViewCard = (props) => {
    return (
        <div className="px-4 mb-3">
            <Container fluid className="">
                <Row className="align-items-center score-progress light-theme">
                    <div className="pr-3">
                        <img src={props.Image} style={{
                            width: '71px',
                            borderRadius: '50%'
                        }} />

                    </div>
                    <Col md="7" className="pl-0">
                        <h4 className="mb-0">{props.name}</h4>
                        <small className="text-lighGrey-2">
                            {props.desc}
                        </small>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => history.push(`${props.link}`)} outline color="primary" className="fw-500 btn btn-outline-primary btn-overlay border-primary br-1 px-3 mb-0" >
                            View
                            </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewCard;