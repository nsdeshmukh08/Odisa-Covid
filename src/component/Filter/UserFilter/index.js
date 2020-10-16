import React from 'react';
import { ORDER,STATUS,STAFF_ROLES } from 'helpers/variables.js'
import {
    Row,
    Col,
    Button,
    Input,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
  } from "reactstrap";
import { history } from 'helpers'

const ORDER_BY_OPTION = [...ORDER]

const STATUS_OPTION = [...STATUS]

const STAFF_ROLE = [...STAFF_ROLES]

const UserFilter = (props) => {
    let {
        onSearch,
        search,
        status,
        onStatusChange,
        role,
        onRoleChange,
        onOrderChange,
        order,
        isDetailMode,
        createUserRedirect
    } = props
    // console.log(props,'onChange')
    return (
        <Row className="align-items-center no-gutters ">
            <Col lg={!isDetailMode ? "7" : ""} md="12">
                <Row className="no-gutters">
                    <Col lg="" md="12">
                        <div className="p-3 border-right pl-4">
                            <div className="search-input ">
                                <i className="icon-search"></i>
                                <Input
                                    type="text"
                                    placeholder="Search User ID, Email ID…"
                                    name="search"
                                    value={search}
                                    onChange={({ target }) => onSearch(target.value)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg="" className="d-none d-lg-block">
                        <div className="p-3 border-right d-flex align-items-center">
                            <div className="d-flex align-items-center mr-3">
                                <label className="mb-0 text-lighGrey-2">Status</label>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle
                                        color="default"
                                        className=" shadow-none p-2 d-flex align-items-end lh-normal  text-darkGrey-1 font-weight-bold"
                                    >
                                        {
                                            STATUS_OPTION.find(data => data.value === status)['label']
                                        }
                                        &nbsp;
                                        <i
                                            className="fa fa-caret-down text-primary"
                                            aria-hidden="true"
                                        ></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            STATUS_OPTION.map(data => (
                                                <DropdownItem onClick={() => onStatusChange(data.value)}>
                                                    {data.label}
                                                </DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="d-flex align-items-center">
                                <label className="mb-0 text-lighGrey-2">Role</label>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle
                                        color="default"
                                        className=" shadow-none p-2 d-flex align-items-end lh-normal  text-darkGrey-1 font-weight-bold"
                                    >
                                        {
                                            STAFF_ROLE.find(data => data.value === role)['label']
                                        }&nbsp;
                                        <i
                                            className="fa fa-caret-down text-primary"
                                            aria-hidden="true"
                                        ></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            STAFF_ROLE.map(data => (
                                                <DropdownItem onClick={() => onRoleChange(data.value)}>
                                                    {data.label}
                                                </DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col lg={!isDetailMode ? "5" : "auto"}>
                <div className="p-3 d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <label className="mb-0 text-lighGrey-2">
                            <i className="icon-sort-by mr-1 text-darkGrey-1"></i>
                            &nbsp;Sort By
                        </label>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle
                                color="default"
                                className=" shadow-none p-2 d-flex align-items-end lh-normal  text-darkGrey-1 font-weight-bold"
                            >
                                {
                                    ORDER_BY_OPTION.find(data => data.value === order)
                                    ?ORDER_BY_OPTION.find(data => data.value === order)['label'] : ''
                                }&nbsp;
                                <i
                                    className="fa fa-caret-down text-primary"
                                    aria-hidden="true"
                                ></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    ORDER_BY_OPTION.map(data => (
                                        <DropdownItem onClick={() => onOrderChange( data.value)}>
                                            {data.label}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    {!isDetailMode ? (
                        <div>
                            <Button
                                color="primary"
                                className="fw-300 br-1"
                                onClick={() => history.push(createUserRedirect)}
                            >
                                <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                  Create New User
                </Button>
                        </div>
                    ) : (
                            ""
                        )}
                </div>
            </Col>
        </Row>
    );
}

export default UserFilter;

UserFilter.defaultProps={
    onSearch : () => {},
    search : undefined,
    status : undefined,
    onStatusChange: () => {},
    role : undefined,
    onRoleChange: () => {},
    onOrderChange: () => {},
    order : undefined,
    isDetailMode:false,
    createUserRedirect : '/add/user'
}