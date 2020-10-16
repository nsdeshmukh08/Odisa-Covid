import React from 'react'
import { Button, Row, Col, Input } from 'reactstrap';
import app from 'assets/images/app.svg'

export default function CoverageNavbar() {
    return (
        <div className="container-fluid bg-white sticky-navbar">
            <Row className="coverage-nav">
                <Col lg="2" className="p-3">
                    <div className="coverage-sideview d-flex">
                        <div class="d-flex nav-circle mr-2">
                            <span class="img-circle"></span></div>
                        <div class="nav-view-content">
                            <h4 class="fw-800 mb-0 text-darkGrey">CAP - ODISHA</h4>
                            <small>Madurai - DMMU</small>
                        </div>
                    </div>
                </Col>
                <Col lg="8" className="text-center d-flex align-items-center justify-content-center">
                    <h1 className="mb-0 fw-600">Project Coverage Area & Members</h1>
                </Col>
                <Col lg="2" className="border-left d-flex align-items-center ">
                    <div className="d-flex">
                        <div class="d-flex align-items-center mr-2 p-2">
                            <span ><img src={app}></img></span></div>
                        <div >
                            <small>Created by</small>
                            <h4 class="fw-800 mb-0 text-darkGrey">MDUAP32</h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
