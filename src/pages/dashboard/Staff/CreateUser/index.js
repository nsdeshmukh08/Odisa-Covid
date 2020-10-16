import React, { Fragment, Component } from "react";
import {
  Navbar,
  Container,
  NavbarBrand,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from "reactstrap";
import FormInput from "component/inputs/FormInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as StaffActions from "action/staff/adminDashboard";
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

const STAFF_ROLE = [
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
];

class CreateUserClass extends Component {
  state = {
    role: null,
    district: null,
    block: null,
    panchayat: null,
    userName: null,
    emailId: null,
    mobileNumber: '',
    //options
    districtList: [],
    blockList: [],
    panchayatList: [],
    errors:{},
    cancelToken: axios.CancelToken.source(),
  }

  //LIFECYCLE

  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  componentDidMount() {
    this.getDistrict();
  }

  //EVENTS
  onChange = (name, value) => {
    this.setState(
      {
        [name]: value,
        errors : {}
      },
      () => this.handleCallBack(name)
    );
  };

  //OTHERS
  handleCallBack = (name) => {
    if (name === "district")
      this.setState(
        {
          block: null,
          panchayat: null,
          panchayatList: [],
          blockList: [],
        },
        this.getBlock
      );
    else if (name === "block")
      this.setState(
        {
          panchayat: null,
          panchayatList: [],
        },
        this.getPanchayat
      );
  };

  //SERVICES

  getDistrict = async () => {
    const { cancelToken } = this.state;
    let requestPayload = {
      ...CORE_API.GET_DISTRICT_LIST_API,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        districtList: response.data.data.districtList,
      });
    else toast(response.data.message, "error");
  };

  getBlock = async () => {
    const { cancelToken, district } = this.state;
    let params = {
      districtId: district,
    };
    let requestPayload = {
      ...CORE_API.GET_BLOCK_LIST_API,
      params,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        blockList: response.data.data.blockList,
      });
    else toast(response.data.message, "error");
  };

  getPanchayat = async () => {
    const { cancelToken, block } = this.state;
    let params = {
      blockId: block,
    };
    let requestPayload = {
      ...CORE_API.GET_PANCHAYAT_LIST_API,
      params,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        panchayatList: response.data.data.panchayatList,
      });
    else toast(response.data.message, "error");
  };

  createUser = async(e) => {
      e.preventDefault()
    const { 
        cancelToken, 
        district,
        role,
        block,
        panchayat,
        userName,
        mobileNumber,
        emailId
    } = this.state;
    let data = {
        userName,
        role,
        createdBy: 1,
        mobileNumber,
        emailId,
        district,
        block,
        panchayat
    };
  const validation = {
    ...inputValidations,
    ...(
      role == 2 ? { district: undefined,panchayat: undefined, block: undefined } : ''
    ),
    ...(
      role == 3 ? { panchayat: undefined, block: undefined } : ''
    ),
    ...(
      role == 4 ? { panchayat: undefined } : ''
    ),
  }
    if(role == 2){
      data.district = null;
      data.panchayat = null;
      data.block = null;
    }else if(role == 3){
      data.panchayat = null;
      data.block = null
    }else if(role == 4){
      data.panchayat = null
    }
    const notValid = validate(data, validation);

    if(notValid){
        this.setState({
            errors : notValid
        })
    }else{
        let requestPayload = {
            ...CORE_API.CREATE_STAFF_API,
            data,
            cancelToken: cancelToken.token,
          };
          let response = await API(requestPayload);
          if (response.status === 200){
              this.props.history.push('/staff/userManagement')
            toast(response.data.message, "success");
          }
 
          else toast(response.data.message, "error");
    }

  };

  render() {
    const { history } = this.props;
    const {
      districtList,
      blockList,
      panchayatList,
      role,
      district,
      block,
      panchayat,
      userName,
      emailId,
      mobileNumber,
      errors
    } = this.state;
    return (
      <form onSubmit={this.createUser}>
        <Navbar className="main-navbar shadow-none p-2" color="white" light>
          <Container fluid>
            <NavbarBrand href="#">
              <div className="d-flex align-items-center">
                <div className="dummy-profile-image mr-3"></div>
                <span>CAP - ODISHA</span>
              </div>
            </NavbarBrand>
          </Container>
        </Navbar>
        <Container className="create-user-container">
          <Card className="border-0 bg-white mb-3">
            <CardHeader className="bg-white border-bottom h3 p-4 text-grey d-flex align-items-center">
              <i
                class="fa fa-chevron-left p-2 arrow-back mr-2"
                onClick={() => history.goBack()}
              ></i>
              <span className="fw-700">Create New User</span>
            </CardHeader>
            <CardBody className="px-4 card-body py-3 ">
              <ul className="list-unstyled custom-list">
                <li>
                  <label>Date Created</label>
                  <label>
                    <strong>20 / 04 / 2020</strong>
                  </label>
                </li>
                <li>
                  <label>Created By</label>
                  <label>
                    <strong>Madhivanan Rajendran, </strong>
                    Administrator
                  </label>
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card className="border-0 bg-white">
            <CardBody className="p-4 ">
              <Container fluid className="p-0 border-bottom">
                <Row>
                  <Col md="6">
                    <FormInput
                      type="select"
                      label="Role"
                      name="role"
                      value={role}
                      onChange={this.onChange}
                      error={errors['role']}
                      options={STAFF_ROLE}
                    />
                  </Col>
                </Row>
              </Container>
              {role != 2 ? <Container fluid className="p-0 border-bottom pt-4">
                <h3 className="text-darkGrey mb-3">Location</h3>
                <Row>
                  <Col md="6">
                    <FormInput
                      type="select"
                      label="District"
                      name="district"
                      onChange={this.onChange}
                      options={districtList}
                      error={errors['district']}
                    />
                  </Col>
                  {blockList.length && role !=  3 ? (
                    <Col md="6">
                      <FormInput
                        type="select"
                        label="Block"
                        name="block"
                        onChange={this.onChange}
                        options={blockList}
                        error={errors['block']}
                      />
                    </Col>
                  ) : (
                    ""
                  )}

                  {panchayatList.length && role !=  3 &&  role != 4 ? (
                    <Col md="6">
                      <FormInput
                        type="select"
                        label="GPLF"
                        name="panchayat"
                        error={errors['panchayat']}
                        onChange={this.onChange}
                        options={panchayatList}
                      />
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </Container>:""}
              <Container fluid className="p-0 border-bottom pt-4">
                <h3 className="text-darkGrey">ID Details</h3>
                <Row>
                  <Col md="6">
                    <FormInput
                      type="text"
                      label="User ID"
                      name="userName"
                      error={errors['userName']}
                      value={userName}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md="6">
                    <FormInput
                      type="email"
                      label="Official Email ID"
                      name="emailId"
                      error={errors['emailId']}
                      value={emailId}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md="6">
                    <FormInput
                      type="mobile"
                      label="Mobile Number"
                      name="mobileNumber"
                      maxLength="10"
                      error={errors['mobileNumber']}
                      value={mobileNumber}
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
              </Container>
              <Container fluid className="p-0">
                <Col md="11" className="align-self-end pt-4 ml-auto p-0">
                  <div className="d-flex align-items-center">
                    <Button
                      color="orange"
                      outline
                      block
                      className="br-1 mr-2 mb-2 mt-0"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      block
                      type="submit"
                      className="br-1 mb-2 mt-0"
                    >
                      Create
                    </Button>
                  </div>
                </Col>
              </Container>
            </CardBody>
          </Card>
        </Container>
      </form>
    );
  }
}

const inputValidations = {
    emailId: {
        presence: {
            allowEmpty: false,
            message: "^Email id can't be blank"
        },
        email : true
    },
    userName: {
      presence: {
        allowEmpty: false,
        message: "^User Id can't be blank"
      }
    },
    role : {
        presence: {
            allowEmpty: false,
            message: "^Role can't be blank"
          }
    },
    district : {
        presence: {
            allowEmpty: false,
            message: "^District can't be blank"
          }
    },
    block : {
        presence: {
            allowEmpty: false,
            message: "^Block can't be blank"
          }
    },
    panchayat : {
        presence: {
            allowEmpty: false,
            message: "^Panchayat can't be blank"
          }
    },
    mobileNumber : {
        presence: {
            allowEmpty: false,
            message: "^Mobile number can't be blank"
          }
    }
  };

const mapStateToProps = (state) => {
  return state.staff.staffList;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StaffActions, dispatch);
};

const CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserClass);

export { CreateUser };
