import React from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
  } from "reactstrap";
import { ORDER } from 'helpers/variables.js'

const ApplicationFilter = (props) => {
    const { onCreateApplicationBtnClick,isDetailMode,onOrderSelect,onSearch,search,order,disableCreateApp } = props
    return (
        <Row className="align-items-center no-gutters border-bottom">

            {/* APPLICATION SEARCH */}

            <Col>
                <Row className="no-gutters">
                    <Col>
                        <div className="p-3 border-right pl-4">
                            <div className="search-input ">
                                <i className="icon-search"></i>
                                <Input
                                    type="text"
                                    placeholder="Search Application No, Name..."
                                    name="search"
                                    value={search}
                                    onChange={({ target }) => onSearch(target.value)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>

            {/* APPLICATION FILTER */}

            <Col md="auto" className="d-none d-lg-block">
                <div className="pr-4 p-3 d-flex align-items-center justify-content-between border-right ">
                    <div className="d-flex align-items-center">
                        <label className="mb-0 text-darkGrey-1 mr-2 small">
                            <i className="icon-sort-by  "></i>
                        </label>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle
                                color="default"
                                size="sm"
                                className=" shadow-none br-2 text-primary"
                            >
                                {
                                    ORDER.find(data => data.value === order) ? ORDER.find(data => data.value === order)['label'] : ''
                                }&nbsp;
                                <i
                                    className="fa fa-caret-down text-primary"
                                    aria-hidden="true"
                                ></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    ORDER.map(data => (
                                        <DropdownItem onClick={() => onOrderSelect(data.value)}>
                                            {data.label}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>

                </div>
            </Col>
            {/* CREATE NEW APPLICATION */}
            <Col md="auto" className="d-none d-lg-block">
                <div>
                    <Button
                        color="primary"
                        size="md"
                        className={`fw-500 mx-3 btn-overlay`}
                        outline
                        onClick={onCreateApplicationBtnClick}
                        disabled = {disableCreateApp}
                    >
                        <i className="icon-plus small" aria-hidden="true"></i>
                        {!isDetailMode ? <span className="ml-2">Create New Application</span> : ""}
                    </Button>
                </div>
            </Col>
        </Row>
     );
}

export default ApplicationFilter;

ApplicationFilter.defaultProps = {
    onCreateApplicationBtnClick : () => {},
    onOrderSelect : () => {},
    onSearch : () => {},
    isDetailMode : false,
    order : null
}