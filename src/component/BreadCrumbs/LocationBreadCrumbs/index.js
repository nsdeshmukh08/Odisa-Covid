import React,{ Fragment } from 'react';
import { STAFF_ROLE_ID } from 'helpers/variables';
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

const LocationBreadCrumbs = (props) => {
    const getBreadCrumbLinks  = (type = 1) => {
        let { 
            selectedDistrict, 
            selectedBlock,
            selectedDistrictName,
            selectedBlockName,
            match,
            profile,
            tabNumber 
        } = props
        
        if(STAFF_ROLE_ID.SMMU === parseInt(profile.role)){
          if (type === 0)
          return `${match.path.replace(':tabNumber',tabNumber)}`
          if (type === 1)
            return `${match.path.replace(':tabNumber',tabNumber)}?district=${selectedDistrict}&districtName=${selectedDistrictName}`
          if (type === 2)
            return `${match.path.replace(':tabNumber',tabNumber)}?district=${selectedDistrict}&districtName=${selectedDistrictName}&block=${selectedBlock}&blockName${selectedBlockName}`
        }
        else if(STAFF_ROLE_ID.DMMU === parseInt(profile.role)){
          if (type === 0)
          return `${match.path.replace(':tabNumber',tabNumber)}`
        }
      }
    return (
        <div className="custom-breadcrumbs">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/staff/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                {
                    STAFF_ROLE_ID.SMMU === props.profile.role ?
                        <Fragment>

                            <BreadcrumbItem active>
                                <Link
                                    to={getBreadCrumbLinks(0)}
                                    className={`${props.locationType < 2 ? "pointer-event-none text-black" : ""}`}
                                >
                                    All District
                                </Link>
                            </BreadcrumbItem>
                            {
                                props.selectedDistrictName && props.locationType <= 3 ?
                                    <BreadcrumbItem active>
                                        <Link
                                            to={getBreadCrumbLinks(1)}
                                            className={`${props.locationType < 3 ? "pointer-event-none text-black" : ""}`}
                                        >
                                            {props.selectedDistrictName}
                                        </Link>
                                    </BreadcrumbItem> : ''
                            }
                            {
                                props.selectedBlockName && props.locationType <= 3 ?
                                    <BreadcrumbItem>
                                        <Link
                                            to={getBreadCrumbLinks(2)}
                                            className={`pointer-event-none text-black`}
                                        >
                                            {props.selectedBlockName}
                                        </Link>
                                    </BreadcrumbItem> : ''
                            }
                        </Fragment>
                        : ''
                }
                {
                    STAFF_ROLE_ID.DMMU === props.profile.role ?
                        <Fragment>
                            <BreadcrumbItem active>
                                <Link
                                    to={getBreadCrumbLinks(0)}
                                    className={`${props.locationType < 3 ? "pointer-event-none text-black" : ""}`}
                                >
                                    All Block
                                </Link>
                            </BreadcrumbItem>
                            {
                                props.selectedBlockName && props.locationType === 3 ?
                                    <BreadcrumbItem>
                                        <Link
                                            to={"#"}
                                            className={`pointer-event-none text-black`}
                                        >
                                            {props.selectedBlockName}
                                        </Link>
                                    </BreadcrumbItem> : ''
                            }
                        </Fragment>
                        : ''
                }
                {
                    STAFF_ROLE_ID.BMMU === props.profile.role ?
                        <Fragment>
                            <BreadcrumbItem active>
                                <Link
                                    to={getBreadCrumbLinks(0)}
                                    className={"pointer-event-none text-black"}
                                >
                                    All Panchayat
                                </Link>
                            </BreadcrumbItem>
                        </Fragment>
                        : ''
                }
            </Breadcrumb>
        </div>
    );
}

export default LocationBreadCrumbs;