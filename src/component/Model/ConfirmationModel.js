import React from "react";
import { Button, Row, Col, Modal, ModalBody, ModalFooter,ModalHeader } from 'reactstrap';


const ConfirmationModal = ({isOpen, toggle, successBtn,ID = "", ...rest}) =>{
    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                <h2 className="fw-800">Submit Confirmation</h2>
            </ModalHeader>
            <ModalBody className="py-3 px-4" >
            <h3 className=" d-flex justify-content-center align-items-center">
                Are you sure to submit the application ID<strong>&nbsp;{ID}</strong> ?
            </h3>
            </ModalBody>
            <ModalFooter>
            <Row className="w-100 d-flex justify-content-end align-items-center px-5 ">
                <Col>
                    <Button 
                        color="primary w-100 border-none" 
                        className="fw-600"
                        type="button"
                        onClick={successBtn}
                    >
                        Yes
                    </Button>
                </Col>
                <Col>
                    <Button 
                        type="button"
                        outline 
                        color="lighGrey-2 w-100 border-primary" 
                        className="fw-600"
                        onClick={toggle}
                    >
                        No
                    </Button>
                </Col>
            </Row>
            </ModalFooter>
        </Modal>
    )
}

export {ConfirmationModal};
