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
import FundRequirementForm from './FundForm'

class FundRequirementClass extends Component {

  state = {
    fundDetails: {
      formId: undefined,
      businessActivities : 0,
      machineries : 0,
      workingCapital: 0,
      purchaseServices : 0,
      marketLinkageSupport : 0,
      organizingAwarenessCamps : 0,
      infrastucture:0,
      otherCost : 0,
      otherName : "",
      totalCost: 0
    },
    errors: {
      businessActivities : null,
      machineries : null,
      workingCapital:null,
      purchaseServices : null,
      marketLinkageSupport: null,
      organizingAwarenessCamps : null,
      infrastucture: null,
      otherCost: null,
      otherName : null,
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
        fundDetails: {
          ...nextProps.fundDetails
        },
        init: false
      }
    return null
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { fundDetails, errors } = this.state

    fundDetails[name] = value
    console.log(typeof fundDetails[name]);
    let x;
    if(name !== "formId" && name !== "otherName" && name !== "totalCost"){
      fundDetails["totalCost"] = 0;
      for (x in fundDetails) {
        if (x !== "formId" && x !== "otherName" && x !== "totalCost"){
          fundDetails["totalCost"] = Number(fundDetails["totalCost"]) + Number(fundDetails[x])
        }
      }
    }
    errors[name] = undefined
    this.setState({ fundDetails, errors }, () => this.handleCallBack(name))
  }

  handleCallBack = (name) => {
    let { fundDetails } = this.state
    if (name === '')
    {
      this.setState({
        fundDetails
      })
    }
}

  onSubmit = (e) => {
    e.preventDefault()
    let { fundDetails, cancelToken } = this.state
    console.log(fundDetails)
    let validation = {
      ...inputValidations
    }
    const notValid = validate(fundDetails, validation);

    if (notValid) {
      this.setState({
        errors: notValid
      })
    } else {
      let pathname = this.props.location.pathname
      let stage = parseInt(pathname.toString().substr(pathname.length - 1))
      fundDetails['formId'] = localStorage.getItem('createAppformId')
      // this.props.history.push((currentSection + 1).toString())
      this.props.updateForm(
        { data: fundDetails, stage },
        cancelToken.token
      )
    }
  }

  render() {
    let pathname = this.props.location.pathname
    let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
    const { fundDetails, errors } = this.state
    return (
      <form className="container theme-one-common mt-3 bg-white p-4" onSubmit={this.onSubmit}>
        <FundRequirementForm {...this.state} onChange={this.onChange} />
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

const FundRequirement = connect(mapStateToProps, mapDispatchToProps)(FundRequirementClass)

export { FundRequirement }


let inputValidations = {

  businessActivities: {
    presence: { allowEmpty: false, message: "^Cost of Business Activities can't be blank" }
  },
  machineries: {
    presence: { allowEmpty: false, message: "^Cost of Machineries can't be blank" }
  },
  workingCapital: {
    presence: { allowEmpty: false, message: "^Cost of Working Capital can't be blank" }
  },
  purchaseServices: {
    presence: { allowEmpty: false, message: "^Cost of Input Purchase / Services can't be blank" }
  },
  marketLinkageSupport: {
    presence: { allowEmpty: false, message: "^Cost of Market Linkage can't be blank" }
  },
  organizingAwarenessCamps: {
    presence: { allowEmpty: false, message: "^Cost of organizing Awareness Camps can't be blank" }
  },
  infrastucture: {
    presence:
      { allowEmpty: false, message: "^Cost of Infrastructure can't be blank" }
  },
  otherCost: {
    presence: { allowEmpty: false, message: "^Other Cost can't be blank" }
  },
  otherName: {
    presence: { allowEmpty: false, message: "^Others can't be blank" }
  }
}
