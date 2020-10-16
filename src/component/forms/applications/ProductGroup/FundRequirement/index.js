import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApp from 'action/createApplication/IAapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import FundRequirementForm from './FundForm';

class FundRequirementClass extends Component {
  state = {
    iaProposedActivity: {
      formId: undefined,
      formId: null,
      bussinessActivities: null,
      machineries: null,
      workingCapital: null,
      purchaseServices: null,
      marketLinkageSupport: null,
      organizingAwarenessCamps: null,
      infrastructure: null,
      otherCost: null,

      // enterpriseName: '',
      // enterpriseType: '',
      // grantActivityName: '',
      // symrTypes: [],
      // symrCommodityTypes: [],
      // symrSectorTypes: [],
      // summary: '',
      // noOfPersons: 1,
      // isExperiencedEnterpreneur: true,
      // enterpreneurExpYears: '',
      // isEmployedInActivity: true,
      // activityExpYears: '',
      // designation: '',
      // location: '',
      // isLoanAppliedPreviously: true,
      // schemeAmount: '',
      // schemeName: '',
      // dateFormation: null,
    },
    // enterpriseTypeList: [],
    // activityTypeList: [],
    // sectorList: [],
    // commodityList: [],
    // personList: [],
    // yearsList: [],
    errors: {
      formId: undefined,
      formId: null,
      bussinessActivities: null,
      machineries: null,
      workingCapital: null,
      purchaseServices: null,
      marketLinkageSupport: null,
      organizingAwarenessCamps: null,
      infrastructure: null,
      otherCost: null,

      // enterpriseName: '',
      // enterpriseType: '',
      // grantActivityName: '',
      // symrTypes: '',
      // symrCommodityTypes: [],
      // symrSectorTypes: [],
      // summary: '',
      // noOfPersons: 1,
      // isExperiencedEnterpreneur: null,
      // enterpreneurExpYears: '',
      // isEmployedInActivity: null,
      // activityExpYears: '',
      // designation: '',
      // location: '',
      // isLoanAppliedPreviously: null,
      // schemeAmount: '',
      // schemeName: '',
      // dateFormation: null,
    },
    cancelToken: axios.CancelToken.source(),
    init: true,
  };

  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('activieui', nextProps);
    if (prevState.init)
      return {
        iaProposedActivity: {
          ...nextProps.iaProposedActivity,
        },
        init: false,
      };
    return null;
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { iaProposedActivity, errors } = this.state;
    iaProposedActivity[name] = value;
    errors[name] = undefined;
    this.setState({ iaProposedActivity, errors });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { iaProposedActivity, cancelToken } = this.state;
    console.log(iaProposedActivity);
    let validation = {
      ...inputValidations,
      ...(!iaProposedActivity['isExperiencedEnterpreneur']
        ? {
            enterpreneurExpYears: undefined,
          }
        : ''),
      ...(!iaProposedActivity['isEmployedInActivity']
        ? {
            activityExpYears: undefined,
            designation: undefined,
            location: undefined,
          }
        : ''),
      ...(!iaProposedActivity['isLoanAppliedPreviously']
        ? {
            schemeName: undefined,
            schemeAmount: undefined,
          }
        : ''),
    };
    const notValid = validate(iaProposedActivity, validation);

    // if (notValid) {
    //   this.setState({
    //     errors: notValid,
    //   });
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    iaProposedActivity['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm(
      { data: iaProposedActivity, stage },
      cancelToken.token
    );
    // }
  };

  render() {
    let pathname = this.props.location.pathname;
    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1)
    );
    const { iaProposedActivity, errors } = this.state;
    return (
      <form
        className="container theme-one-common mt-3 bg-white p-4"
        onSubmit={this.onSubmit}
      >
        <FundRequirementForm {...this.state} onChange={this.onChange} />
        <Row className="producer-form-footer bg-white border-top align-items-center">
          <Col md="7" className="update-draft">
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
                    outline
                    color="lighGrey-2 w-100 border-none br-1"
                    className="fw-600"
                    type="button"
                  >
                    Previous
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  color="primary w-100 border-none br-1"
                  className="fw-600"
                  type="submit"
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
  return state.publicUser.application.newApp.symr;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApp, dispatch);
};

const FundRequirement = connect(
  mapStateToProps,
  mapDispatchToProps
)(FundRequirementClass);

export { FundRequirement };

let inputValidations = {
  enterpriseName: {
    presence: {
      allowEmpty: false,
      message: "^Enterprise can't be blank",
    },
  },
  enterpriseType: {
    presence: { allowEmpty: false, message: "^Enterprise type can't be blank" },
  },
  dateFormation: {
    presence: { allowEmpty: false, message: "^Date type can't be blank" },
  },
  grantActivityName: {
    presence: { allowEmpty: false, message: "^Grant type can't be blank" },
  },
  symrTypes: {
    presence: { allowEmpty: false, message: "^Symr type can't be blank" },
  },
  symrCommodityTypes: {
    presence: { allowEmpty: false, message: "^Symr commodity can't be blank" },
  },
  symrSectorTypes: {
    presence: { allowEmpty: false, message: "^Symr sector can't be blank" },
  },
  summary: {
    presence: { allowEmpty: false, message: "^Summary can't be blank" },
  },
  noOfPersons: {
    presence: { allowEmpty: false, message: "^No of persons can't be blank" },
  },
  isExperiencedEnterpreneur: {
    presence: {
      allowEmpty: false,
      message: "^Is experience enterpreneur can't be blank",
    },
  },
  enterpreneurExpYears: {
    presence: {
      allowEmpty: false,
      message: "^Enterpreneur exp years can't be blank",
    },
  },
  isEmployedInActivity: {
    presence: {
      allowEmpty: false,
      message: "^Is employee activity can't be blank",
    },
  },
  activityExpYears: {
    presence: { allowEmpty: false, message: "^Activity exp can't be blank" },
  },
  designation: {
    presence: { allowEmpty: false, message: "^Designation can't be blank" },
  },
  location: {
    presence: { allowEmpty: false, message: "^Location can't be blank" },
  },
  isLoanAppliedPreviously: {
    presence: {
      allowEmpty: false,
      message: "^Is Loan applied previously can't be blank",
    },
  },
  schemeAmount: {
    presence: { allowEmpty: false, message: "^Scheme amount can't be blank" },
  },
  schemeName: {
    presence: { allowEmpty: false, message: "^Scheme name can't be blank" },
  },
};
