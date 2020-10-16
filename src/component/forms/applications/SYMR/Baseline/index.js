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
import BaselineForm from './Baseline'

class BaselineClass extends Component {

  state = {
    baseLineDetails: {
      "formId": undefined,
       monthlyAverageIncome:"",
       turnover:"",
      engagementHumanResources:"",
    },

    errors: {
      monthlyAverageIncome:"",
      turnover:"",
      engagementHumanResources:"",
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
        baseLineDetails: {
          ...nextProps.baseLineDetails,
        },
        init: false
      }
    return null
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { baseLineDetails, errors } = this.state
    baseLineDetails[name] = value
    errors[name] = undefined
    this.setState({ baseLineDetails, errors }, () => this.handleCallBack(name))
  }

  handleCallBack = (name) => {
    let { baseLineDetails } = this.state
    if (name === '')
      this.setState({
        baseLineDetails
      })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let { baseLineDetails, cancelToken } = this.state
    console.log(baseLineDetails)
    let validation = {
      ...inputValidations
    }
    const notValid = validate(baseLineDetails, validation);

    if (notValid) {
      this.setState({
        errors: notValid
      })
    } else {
      let pathname = this.props.location.pathname
      let stage = parseInt(pathname.toString().substr(pathname.length - 1))
      baseLineDetails['formId'] = localStorage.getItem('createAppformId')
      // this.props.history.push((currentSection + 1).toString())
      this.props.updateForm(
        { data: baseLineDetails, stage },
        cancelToken.token
      )
    }
  }

  render() {
    let pathname = this.props.location.pathname
    let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
    const { baseLineDetails, errors } = this.state
    return (
      <form className="container theme-one-common mt-3 bg-white p-4" onSubmit={this.onSubmit}>
        <BaselineForm {...this.state} onChange={this.onChange} />
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

const Baseline = connect(mapStateToProps, mapDispatchToProps)(BaselineClass)

export { Baseline }

let inputValidations = {

  monthlyAverageIncome: {
    presence: {
      allowEmpty: false,
      message: "^Monthly Average Income can't be blank"
    }
  },
  turnover: {
    presence: {
      allowEmpty: false,
      message: "^Turnover  (In Lakh) can't be blank"
    }
  },
  engagementHumanResources: {
    presence: {
      allowEmpty: false,
      message: "^Engagement Human Resources can't be blank"
    }
  },
}
