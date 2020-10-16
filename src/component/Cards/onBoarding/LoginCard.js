import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import LanguageToggler from 'component/LanguageToggler'
import { Fade } from 'reactstrap'

const LoginCard = ({ children, name, description = [], showLanguageToggler = false }) => {
    return (
        <Fade>
            <div className="user-login-overall d-flex align-items-center h-100vh mobile-height-auto">
                <Container>
                    <Row className="user-head m-0 no-gutters">
                        <Col lg="5" className="align-self-stretch  text-white text-capitalize">
                            <div className="asssit-content bg-primary h-100">
                                <h1 className="text-transform fw-600">{name}</h1>
                                {
                                    description.map(data => <p>{data}</p>)
                                }
                            </div>
                        </Col>
                        <Col lg="7" className="px-0 d-flex justify-content-center w-100 align-items-center position-relative">
                            {
                                showLanguageToggler && (
                                    <div className="switch-toggle-lang">
                                        <LanguageToggler />
                                    </div>
                                )
                            }
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fade>

    );
}

export default LoginCard;