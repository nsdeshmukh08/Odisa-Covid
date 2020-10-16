import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerCollective';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import BasicDetailsForm from './BasicDetailForm';

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

class BasicDetailsFunc extends Component {
  state = {
    basicDetails: {
      formId: undefined,
      mobileNumber: undefined,
      name: null,
      pcName: null,
      pcAddress: null,
      districtId: null,
      blockId: null,
      panchayatId: null,
      appSubmitDate: null,
    },
    districtList: [],
    blockList: [],
    panchayatList: [],
    errors: {
      formId: null,
      mobileNumber: null,
      name: null,
      pcName: null,
      pcAddress: null,
      districtId: null,
      blockId: null,
      panchayatId: null,
      district: null,
      block: null,
      panchayat: null,
    },
    loading: false,
    cancelToken: axios.CancelToken.source(),
    init: true,
  };

  //LIFECYCLE

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        basicDetails: {
          ...nextProps.basicDetails,
        },
        init: false,
      };
    return null;
  }

  init = () => {
    let { basicDetails } = this.state;
    if (basicDetails.districtId) this.getBlock();
    if (basicDetails.blockId) this.getPanchayat();
    this.getDistrict();
    this.setState({
      basicDetails,
    });
  };

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { basicDetails, errors } = this.state;
    basicDetails[name] = value;
    errors[name] = undefined;
    this.setState({ basicDetails, errors }, () => this.handleCallBack(name));
  };

  //OTHERS
  handleCallBack = (name) => {
    if (name === 'districtId') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        blockId: null,
        panchayatId: null,
      };
      this.setState(
        {
          basicDetails,
          panchayatList: [],
          blockList: [],
        },
        this.getBlock
      );
    } else if (name === 'blockId') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        panchayatId: null,
      };
      this.setState(
        {
          basicDetails,
          panchayatList: [],
        },
        this.getPanchayat
      );
    }
  };

  //services

  getDistrict = async () => {
    const { cancelToken, basicDetails } = this.state;
    this.setState({
      loading: true,
    });
    let requestPayload = {
      ...CORE_API.GET_DISTRICT_LIST_API,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        districtList: response.data.data.districtList,
      });
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

  getBlock = async () => {
    const { cancelToken, basicDetails, blockId } = this.state;
    this.setState({
      loading: true,
    });
    let params = {
      districtId: basicDetails.districtId,
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
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

  getPanchayat = async () => {
    const { cancelToken, basicDetails } = this.state;
    this.setState({
      loading: true,
    });
    let params = {
      blockId: basicDetails.blockId,
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
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { basicDetails, cancelToken } = this.state;
    const notValid = validate(basicDetails, inputValidations);
    // if (notValid) {
    //   this.setState({
    //     errors: notValid,
    //   });
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    basicDetails['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm({ data: basicDetails, stage }, cancelToken.token);
    // }
  };

  render() {
    let pathname = this.props.location.pathname;
    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1)
    );
    const { loading } = this.state;
    return (
      <form
        className="container theme-one-common mt-3"
        onSubmit={this.onSubmit}
      >
        <BasicDetailsForm {...this.state} onChange={this.onChange} />
        <Row className="producer-form-footer bg-white border-top align-items-center">
          <Col lg="6" md="6" sm="12" className="update-draft">
            <span class="custom-caret dark mr-2">
              <i class="icon-tick"></i>
            </span>
            <span className="update-draft">All Updates Saved as Draft</span>
          </Col>
          <Col lg="5" md="6" sm="12" className="ml-auto">
            <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
              <Col>
                <Link to={(currentSection - 1).toString()}>
                  <Button
                    type="button"
                    outline
                    disabled={!currentSection - 1 || loading}
                    color="lighGrey-2 w-100 border-none"
                    className="fw-600"
                  >
                    Previous
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  color="primary w-100 border-none"
                  className="fw-600"
                  type="submit"
                  disabled={loading}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.publicUser.application.newApp.producerCollective,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const BasicDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicDetailsFunc);

let inputValidations = {
  mobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^Mobile number can't be blank",
    },
  },
  name: {
    presence: {
      allowEmpty: 'true',
      message: "^Name can't be blank",
    },
  },
  pcName: {
    presence: {
      allowEmpty: false,
      message: "^PC Name can't be blank",
    },
  },
  pcAddress: {
    presence: {
      allowEmpty: false,
      message: "^PC Address can't be blank",
    },
  },
  districtId: {
    presence: {
      allowEmpty: false,
      message: "^District can't be blank",
    },
  },
  blockId: {
    presence: {
      allowEmpty: false,
      message: "^Block can't be blank",
    },
  },
  panchayatId: {
    presence: {
      allowEmpty: false,
      message: "^Panchayat can't be blank",
    },
  },
};

export { BasicDetails };
