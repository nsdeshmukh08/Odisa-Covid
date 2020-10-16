import React from 'react'
import { Container, Row, Col, Alert } from 'reactstrap';
import { Fade } from 'reactstrap'

const SimpleCard = ({ children, heading, successMessage = '', className, mobile }) => {
    return (
        <Fade>
            <div className={`${className} forgot-login-overall d-flex align-items-center h-100vh mobile-height-auto`}>
                <Container>
                    <Row className="m-0 justify-content-center">
                        <Col sm={5} className="p-0">
                            <div className="box-card-overall">
                                <div className="forgot-head-sec">
                                    <h3 className="m-0 text-white fw-600">CAP - ODISHA</h3>
                                </div>
                                {mobile ?
                                    <div className="verify-sucess">
                                        <span> <i class="icon-success mr-2"></i></span>
                                        <a></a>Mobile Number ( {mobile} ) Verified
                             </div>
                                    : ''
                                }

                                <Alert isOpen={successMessage} className="border-radius-0 d-flex align-items-center">
                                    <i class="icon-success mr-2"></i>
                                    <span>{successMessage}</span>
                                </Alert>
                                <div className="forgot-content">
                                    {
                                        heading && <h1 className="text-darkblack mb-4 text-darkGrey-2">{heading}</h1>
                                    }
                                    {
                                        children
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fade>

    );
}

export default SimpleCard;