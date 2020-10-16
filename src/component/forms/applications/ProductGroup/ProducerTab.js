import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Checkbox from 'component/inputs/Checkbox'

const ProducerTab = () => {
    return (
        <>
            <Container className="producer-tab-main">
                <Row className="producer-tab-head">
                    <ul className="mt-2 producer-tab-list mb-0">
                        <li>
                            <Checkbox checked></Checkbox>
                            <a>Basic Details</a>
                        </li>
                        <li>
                            <Checkbox ></Checkbox>
                            <a>Producer Collective Details</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Amount Received</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Bank Details</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Proposed Activity and EFSM</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Upload</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Upload</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Upload</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Upload</a>
                        </li>
                        <li>
                            <Checkbox></Checkbox>
                            <a>Upload</a>
                        </li>

                        <div className="back-to-app">
                            <Button className="bg-white border-none link">Back To Application</Button>
                        </div>
                    </ul>

                </Row>
            </Container>
        </>
    )
}
export default ProducerTab