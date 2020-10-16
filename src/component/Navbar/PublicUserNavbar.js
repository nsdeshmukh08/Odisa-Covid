import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toast from "helpers/Toast";

import {
    Container,
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'


const PublicUserNavbarClass = ({ mobileNumber, history, heading={} }) => {

    const onSubmit = () => {
        toast('Logout successful')
        history.replace('/auth/user/login')
    }


    return (
        <Navbar className="main-navbar" color="white" light>
            <Container fluid>
                <NavbarBrand href="#">CAP - ODISHA</NavbarBrand>
                <h2 className="text-center heading mb-0 d-none d-md-block fw-600 text-darkGrey-2">
                    {heading.label}
                    &nbsp;
                    <span className="h3 mb-0 fw-500">
                        {`${heading.tamilLabel ? "/ "+heading.tamilLabel : ''}`}
                    </span>
                </h2>
                <Nav>
                    <UncontrolledDropdown nav inNavbar className="d-flex align-items-center pr-3">
                        <span className="text-black fw-900 h5 mb-0">+91 {mobileNumber} &nbsp;&nbsp;</span>
                        <DropdownToggle nav className="p-0">
                            <span className="custom-caret">
                                <i class="fa fa-angle-down"></i>
                            </span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={onSubmit}>
                                Logout
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return state.profile
}

const PublicUserNavbar = connect(mapStateToProps, null)(PublicUserNavbarClass)

export { PublicUserNavbar }