import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as symr from 'action/createApplication/symr';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import EnterpriseActivityForm from './EnterpriseActivityForm'

class EnterpriseActivityClass extends Component {

  state = {
    enterpriseDetails: {
      "formId": undefined,
      "enterpriseName": "",
      "symrActivityTypes": [],
      "symrCommodityTypes": [],
      "symrSectorTypes": [],
      "isActivityPlanReady": "",
      "enterpriseTypeList":null,
      "symrUploadActivityPlan": "",
      "dateFormation": "",
    },
    activityTypeList: [],
    sectorList: [],
    commodityList: [],
    errors: {
      "enterpriseName": "",
      "enterpriseType": '',
      "grantActivityName": "",
      "symrActivityTypes": "",
      "symrCommodityTypes": [],
      "symrSectorTypes": [],
      "isActivityPlanReady": null,
      "enterpriseTypeList":null,
      "symrUploadActivityPlan": null,
      "dateFormation": null,
    },
    cancelToken: axios.CancelToken.source(),
    init: true
  }

  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("activieui", nextProps)
    if (prevState.init)
      return {
        enterpriseDetails: {
          ...nextProps.enterpriseDetails,
          isActivityPlanReady: nextProps.enterpriseDetails.isActivityPlanReady !== '' ? nextProps.enterpriseDetails.isActivityPlanReady : null,
        },
        init: false
      }
    return null
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { enterpriseDetails, errors } = this.state
    enterpriseDetails[name] = value
    errors[name] = undefined
    this.setState({ enterpriseDetails, errors }, () => this.handleCallBack(name))
  }

  handleCallBack = (name) => {
    let { enterpriseDetails } = this.state
    if (name === 'isActivityPlanReady' && !enterpriseDetails[name]) {
      enterpriseDetails['symrUploadActivityPlan'] = null
      enterpriseDetails['dateFormation'] = null
    }else if (name === 'enterpriseTypeList' && !enterpriseDetails[name]) {
      enterpriseDetails['enterpriseType'] = null
    }
    else if (name === '')
      this.setState({
        enterpriseDetails
      })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let { enterpriseDetails, cancelToken } = this.state
    console.log(enterpriseDetails)
    let validation = {
      ...inputValidations,
      ...(!enterpriseDetails['isActivityPlanReady'] ?
        {
          symrUploadActivityPlan: undefined,
          dateFormation: undefined
        } : ''),
        ...(!enterpriseDetails['enterpriseTypeList'] ?
        {
          enterpriseType: undefined,
        } : '')
    }
    const notValid = validate(enterpriseDetails, validation);

    if (notValid) {
      this.setState({
        errors: notValid
      })
    } else {
      let pathname = this.props.location.pathname
      let stage = parseInt(pathname.toString().substr(pathname.length - 1))
      enterpriseDetails['formId'] = localStorage.getItem('createAppformId')
      // this.props.history.push((currentSection + 1).toString())
      this.props.updateForm(
        { data: enterpriseDetails, stage },
        cancelToken.token
      )
    }
  }

  render() {
    let pathname = this.props.location.pathname
    let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
    const { enterpriseDetails, errors } = this.state
    return (
      <form className="container theme-one-common mt-3 bg-white p-4" onSubmit={this.onSubmit}>
        <EnterpriseActivityForm {...this.state} onChange={this.onChange} />
        <Row className="producer-form-footer bg-white border-top align-items-center">
          <Col md="7" className="update-draft">
            <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
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
    )
  }
}

const mapStateToProps = (state) => {
  return state.publicUser.application.newApp.symr
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(symr, dispatch);
};

const EnterpriseActivity = connect(mapStateToProps, mapDispatchToProps)(EnterpriseActivityClass)

export { EnterpriseActivity }

let inputValidations = {

  enterpriseName: {
    presence: {
      allowEmpty: false,
      message: "^Enterprise can't be blank"
    }
  },
  symrActivityTypes: {
    presence: { allowEmpty: false, message: "^Symr Activity can't be blank" }
  },
  symrCommodityTypes: {
    presence: { allowEmpty: false, message: "^Symr commodity can't be blank" }
  },
  symrSectorTypes: {
    presence: { allowEmpty: false, message: "^Symr sector can't be blank" }
  },
  isActivityPlanReady: {
    presence: { allowEmpty: false, message: "^Is Activity Plan can't be blank" }
  },
  enterpriseTypeList: {
    presence: { allowEmpty: false, message: "^Enterprise Type can't be blank" }
  },
  enterpriseType: {
    presence: { allowEmpty: false, message: "^Enterprise Type can't be blank" }
  },
  dateFormation: {
    presence: { allowEmpty: false, message: "^Enterprise Start Date can't be blank" }
  }
}
