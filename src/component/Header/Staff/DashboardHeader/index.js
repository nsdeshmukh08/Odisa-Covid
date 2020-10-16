import React from 'react';
import {COMPONENT_FILTER } from 'helpers/variables';
import moment from 'moment'
import Select from 'component/inputs/CustomMultiSelect'
import {
    Row,
    Col
} from "reactstrap";
export const DashboardHeader = ({...rest}) => {
    console.log(rest)
    let headerName = rest.location.pathname.split('/')?.[3] ? rest.location.pathname.split('/')[3] : 'Dashboard'
    return (
        <Row className="align-items-center ">
                    <Col md="4">
                        <h1 className="text-darkGrey-2 fw-600 text-capitalize">
                            {
                                headerName
                            }
                        </h1>
                        <p className="small">{moment().format("dddd, MMMM Do YYYY")}</p>
                    </Col>
                    
                    <Col className="d-flex justify-content-end">
                        
                        <Row md="12" className="w-100 d-flex">
                            {/* <Col className="d-flex justify-content-end">
                                <div className="coverage-dropdown w-50">
                                    <Select
                                        name={rest.filtername}
                                        // placeholder={rest.filtername}
                                        options={rest.filteroption}
                                        value={rest.filterValue}
                                        onChange={rest.onChange}
                                    />
                                </div> 
                            </Col>*/}
                            <Col className="d-flex justify-content-end custom-reselect">
                            <Select
                                name={rest.filtername}
                                options={rest.filteroption}
                                value={rest.filterValue}
                                onChange={rest.onChange}
                            />
                            <Select
                                name="All Components"
                                options={COMPONENT_FILTER}
                                value={rest.formtype}
                                onChange={rest.onChange}
                            />
                               
                            </Col> 
                        
                    </Row>
                    </Col>
                </Row>
    )
}
