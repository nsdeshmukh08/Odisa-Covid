import React,{ useState,useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import FormInput from "component/inputs/FormInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as StaffActions from "action/staff/adminDashboard";
import _ from 'lodash'
import moment from 'moment'
import validate from 'helpers/validation';
import toast from "helpers/Toast";
import { STAFF_ROLES } from 'helpers/variables'

const STAFF_ROLE = [...STAFF_ROLES];

const EditUserDetails = ({ showEditUser, isFetching, close,list,selectedStaffId,updateStaffDetails }) => {

  const [userName,setUserName] = useState('')
  const [emailId,setEmailId] = useState('')
  const [mobileNumber,setMobileNumber] = useState('')
  const [errors,setErrors] = useState({})

  let selectedStaff = list.find(data => data.staffId === selectedStaffId)
  useEffect(() => {
      let  staffDetails  = list.find(data => data.staffId === selectedStaffId)
      if(staffDetails){
        setUserName(staffDetails.userName)
        setMobileNumber(staffDetails.mobileNumber)
        setEmailId(staffDetails.emailId)
      }
  },[selectedStaffId,showEditUser])

  useEffect(() => {
    setErrors({})

},[emailId,mobileNumber])

  const updateStaff = (e) => {
    e.preventDefault()
    let validationData = {
      emailId,
      mobileNumber,
      staffId : selectedStaff.staffId
    }
    const notValid = validate(validationData, inputValidations);
    if(notValid)
    setErrors(notValid)
    else{
      if(emailId !== selectedStaff.emailId || mobileNumber !== selectedStaff.mobileNumber){
        let data = {
          ...(
            emailId !== selectedStaff.emailId ? ({
              emailId 
            }) : ''
          ),
          ...(
            mobileNumber !== selectedStaff.mobileNumber ? ({
              mobileNumber 
            }) : ''
          ),
          staffId : selectedStaff.staffId
        }
        updateStaffDetails(data)
      }else{
        toast('Kindly update the user details to proceed with editing','error')
      }

    }
  }

  return (
    <div className={`${showEditUser ? "staffDetails p-0" : "d-none"}`}>
      <div className="border-bottom">
        <header className="d-flex align-items-center justify-content-between py-3 px-4 border-bottom bg-primary text-white">
          <h3 className="mb-0 text-white">Editing</h3>
          {/* <i className="icon-close small cursor-pointer" onClick={() => this.toggle('showDetails')}></i> */}
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
        <div>
          <header className="d-flex align-items-center justify-content-between pt-3 pb-2 px-4">
            <h3 className="mb-0 text-grey">User Details</h3>
          </header>
          <ul className="user-details list-unstyled text-lighGrey-2 pt-4 px-4 mb-0 pb-0">
            <li>
              <p>Role </p>
              <span>{
                    STAFF_ROLE.find(data => data.value === selectedStaff?.role)?.label
                  }</span>
            </li>
            <li>
              <p>District </p>
              <span>{
                  selectedStaff?.address?.district?.districtName
                }</span>
            </li>
            <li>
              <p>Block </p>
              <span>{
                  selectedStaff?.address?.block?.blockName
                }</span>
            </li>
            <li>
              <p>GPLF </p>
              <span>{
                  selectedStaff?.address?.panchayat?.panchayatName
                }</span>
            </li>
          </ul>
          <form className="px-4" onSubmit={updateStaff}>
            <div className="w-50">
              <FormInput 
                type="text" 
                label="User ID"
                value={userName}
                disabled={true}
              />
            </div>
            <div className="w-50">
              <FormInput 
                type="email" 
                label="Official Email ID"
                value={emailId}
                error={errors['emailId']}
                onChange={(name,value) => setEmailId(value)}
              />
            </div>
            <div className="w-50">
              <FormInput 
                type="text" 
                label="Mobile number"
                maxLength="10"
                value={mobileNumber}
                error={errors['mobileNumber']}
                onChange={(name,value) => setMobileNumber(value)}
              />
            </div>
            <Container fluid className="p-0 mt-5">
              <Row>
                <Col>
                  <Button
                    color="primary"
                    outline
                    className="w-100"
                    onClick={() => close()}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="primary"
                    className="w-100"
                    type="submit"
                    disabled={isFetching}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </div>
    </div>
  );
};
const inputValidations = {
  emailId: {
      presence: {
          allowEmpty: false,
          message: "^Email id can't be blank"
      },
      email : true
  },
  mobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^Mobile Number can't be blank"
    },
    numericality: {
        onlyInteger: true,
        message: "^Provide a valid Mobile Number"
    },
    length: {
        minimum: 10,
        maximum: 10,
        message: "^Provide a valid Mobile Number"
    }
  }
};

const mapStateToProps = (state) => {
  return state.staff.staffList;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StaffActions, dispatch);
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(EditUserDetails);
