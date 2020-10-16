import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as StaffActions from "action/staff/adminDashboard";
import _ from 'lodash'
import moment from 'moment'
import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';

const { SESSION_API } = API_BOOK.ADMIN_MANAGEMENT
const STAFF_ROLE = [
  {
    label: "All",
    value: 7,
  },
  {
    label: "SMMU",
    value: 2,
  },
  {
    label: "DMMU",
    value: 3,
  },
  {
    label: "BMMU",
    value: 4,
  },
  {
    label: "GPLF",
    value: 5,
  },
  {
    label: "CLF",
    value: 6,
  },
  {
    label : "Administrator",
    value : 1
  },
  {
    label : "User",
    value : 0
  }
];

const UserDetails = ({ toggleStaffDetails,isFetching,toggleEditUser, close,list,selectedStaffId,ActivateOrDeactivateStaff }) => {

  const [showResetPassword, toggleResetPassword] = useState(false);

  let selectedStaff = list.find(data => data.staffId === selectedStaffId)

  const SendResetPasswordLink = async (e) => {
    let staff = list.find(data => data.staffId === selectedStaffId)
    e.preventDefault()
    let data = { userName : staff.userName }
    let requestPayload = {
      ...SESSION_API.STAFF_FORGOT_PASSWORD,
      params:data,
      // cancelToken:cancelToken.token
  }
  let response = await API(requestPayload)
  if(response.status === 200){
    toast(response.data.message,'success')
  }else{
      toast(response.data.message,'error')
  }
  toggleResetPassword(!showResetPassword)

}

  return (
    <div className={`staffDetails p-0`}>
      <div >
        <header className="d-flex align-items-center justify-content-between py-3 px-4 border-bottom">
          <h3 className="mb-0 text-grey">Details</h3>
          <i
            className="icon-close small cursor-pointer"
            onClick={() => toggleStaffDetails()}
          ></i>
        </header>
      </div>
      <div className="details-container custom-scrollbar">
        <div className="border-bottom">
          <ul className="list-unstyled text-lighGrey-2 pl-3 py-3 pr-1 user-created-details mb-0">
            <li>
              <p>
                <span className="mr-3">State</span>{" "}
                <strong className="text-darkGrey-1">
                  {
                    selectedStaff?.isActive ? "Active" : 'Inactive'
                  }
                </strong>
                <span className="px-3 d-inline-block">|</span>
                <span className="mr-3">Role</span>
                <strong className="text-darkGrey-1">
                  {
                    STAFF_ROLE.find(data => data.value === selectedStaff?.role)?.label
                  }
                </strong>
              </p>
            </li>
            <li>
              <p>Created by</p>
              <span>
                <strong className="text-darkGrey-1">
                {
                    selectedStaff?.createdBy?.userName
                  }
                </strong>
                , {
                    STAFF_ROLE.find(data => data.value === selectedStaff?.createdBy?.role)?.label
                  }
              </span>
            </li>
            <li>
              <p>Date Created </p>
              <span className="text-darkGrey-1">
                  {
                    moment(new Date(selectedStaff?.createdAt)).format("DD / MM / YYYY")
                  }
              </span>
            </li>
          </ul>
        </div>
        <div className="border-bottom">
          <header className="d-flex align-items-center justify-content-between pt-3 pb-2 px-4">
            <h3 className="mb-0 text-grey">User Details</h3>
            <Button
              color="primary"
              size="sm"
              outline
              onClick={() => toggleEditUser()}
              disabled={isFetching}
            >
              Edit Profile
            </Button>
          </header>
          <ul className="user-details list-unstyled text-lighGrey-2 pt-4 px-4 mb-0 pb-0">
            <li>
              <p>User ID</p>
              <span>
                {
                  selectedStaff?.userName
                }
              </span>
            </li>
            <li>
              <p>Email ID </p>
              <span>
                {
                  selectedStaff?.emailId
                }
              </span>
            </li>
            <li>
              <p>Mobile Number</p>
              <span>
                {
                  selectedStaff?.mobileNumber
                }
              </span>
            </li>
            <li>
              <p>Role </p>
              <span>
                {
                  STAFF_ROLE.find(data => data.value === selectedStaff?.role)?.label
                }
              </span>
            </li>
            <li>
              <p>District </p>
              <span>
                {
                  selectedStaff?.address?.district?.districtName || "-"
                }
              </span>
            </li>
            <li>
              <p>Block </p>
              <span>
                {
                  selectedStaff?.address?.block?.blockName || "-"
                }
              </span>
            </li>
            <li>
              <p>GPLF </p>
              <span>
                {
                  selectedStaff?.address?.panchayat?.panchayatName || "-"
                }
              </span>
            </li>
          </ul>
        </div>
        {!showResetPassword ? (
          <Container fluid className="p-3">
            <Row>
              <Col>
                <Button
                  color="primary"
                  outline
                  className="w-100"
                  disabled={isFetching}
                  onClick={() => toggleResetPassword(!showResetPassword)}
                >
                  Reset Password
                </Button>
              </Col>
              <Col>
                <Button 
                  color="primary" 
                  outline 
                  className="w-100" 
                  onClick={ActivateOrDeactivateStaff}
                  disabled={isFetching}
                >
                  { selectedStaff?.isActive ? "Deactivate" : "Activate" } Account
                </Button>
              </Col>
            </Row>
          </Container>
        ) : (
          <div className="p-3">
            <div className="edit-forgot p-4 mt-3">
              <h3 className="text-darkGrey">Reset Password</h3>
              <h6 className="text-darkGrey py-2">
              Temporary Password will be sent to Email ID
              </h6>
              <h6 className="text-darkGrey fw-700">
              {
                  selectedStaff.emailId
                }
              </h6>
              <Row className="mt-3 reset-color">
                <Col>
                  <Button
                    color="default"
                    className=" shadow-none text-danger w-100 text-center font-weight-bold"
                    onClick={() => toggleResetPassword(!showResetPassword)}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="primary w-100 "
                    className="fw-600"
                    type="submit"
                    onClick={SendResetPasswordLink}
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.staff.staffList;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StaffActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
