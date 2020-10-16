import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as createApplicationActions from 'action/createApplication/IEapplication'

import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import validate from 'helpers/validation'
import { axios, API, API_BOOK } from 'service'
import toast from 'helpers/Toast'
import EnterpriseActivityForm from './EnterpriseActivityForm'
const { GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION
class EnterpriseActivityClass extends Component {
  state = {
    enterpriseDetails: {
      formId: undefined,
      enterpriseName: '',
      dateOfActivity: null,
      enterpriseType: '',
      ieSectorTypes: [],
      ieActivityTypes: [],
      ieCommodityTypes: [],
    },
    sectorList: [],
    commodityList: [],
    personList: [],
    yearsList: [],
    errors: {
      enterpriseName: '',
      ieSectorTypes: [],
      dateOfActivity: null,
      enterpriseType: '',
      enterpriseDetails: null,
      ieActivityTypes: [],
      ieCommodityTypes: [],

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
    loading: false,
    cancelToken: axios.CancelToken.source(),
    init: true,
  }
  componentDidMount() {
    const { basicDetails } = this.state;
    this.props.getIeMasterData();
    //Narayan
    //this.getiamasterDetails()
  }
  //Narayan
  // getiamasterDetails = async () => {
  //   const { cancelToken } = this.state
  //   this.setState({
  //     loading: true,
  //   })
  //   let requestPayload = {
  //     ...GET_SYMR_FORM_MASTER_DATA,
  //     cancelToken: cancelToken.token,
  //   }
  //   let response = await API(requestPayload)
  //   console.log('response', response)
  //   // if (response.status === 200) {
  //   //   let { communityData } = response.data.data;
  //   //   this.setState({
  //   //     communityData,
  //   //   });
  //   // } else toast(response.data.message, 'error');
  //   this.setState({ loading: false })
  // }

  componentWillUnmount() {
    const { cancelToken } = this.state
    cancelToken.cancel()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        enterpriseDetails: {
          ...nextProps.ieEnterprise,
        },
        init: false,
      }
    return null
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { enterpriseDetails, errors } = this.state
    enterpriseDetails[name] = value
    errors[name] = undefined
    this.setState({ enterpriseDetails, errors })
  }

  onSubmit = (e) => {
    e.preventDefault()

    let { enterpriseDetails, cancelToken } = this.state
    let validation = {
      ...inputValidations,
    }
    const notValid = validate(enterpriseDetails, validation)

    // if (notValid) {
    //   this.setState({
    //     errors: notValid,
    //   });
    // } else {
    let pathname = this.props.location.pathname
    let stage = parseInt(pathname.toString().substr(pathname.length - 1))
    enterpriseDetails['formId'] = localStorage.getItem('createAppformId')
    // this.props.history.push((currentSection + 1).toString());
    this.props.updateForm({ data: enterpriseDetails, stage }, cancelToken.token)
    // }
  }

  render() {
    let pathname = this.props.location.pathname
    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1),
    )
    const { loading } = this.state
    return (
      <form
        className="container theme-one-common mt-3 bg-white p-4"
        onSubmit={this.onSubmit}
      >
        <EnterpriseActivityForm {...this.state} onChange={this.onChange} />
        <Row className="producer-form-footer bg-white border-top align-items-center">
          <Col md="7" lg="6" className="update-draft">
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
                  disabled={loading}
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
  return state.publicUser.application.newApp.IE
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch)
}

const EnterpriseActivity = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterpriseActivityClass)

export { EnterpriseActivity }

let inputValidations = {
  enterpriseName: {
    presence: {
      allowEmpty: false,
      message: "^Enterprise Name can't be blank",
    },
  },

  dateOfActivity: {
    presence: {
      allowEmpty: false,
      message: "^Starting Date of the Activity can't be blank",
    },
  },

  enterpriseType: {
    presence: { allowEmpty: false, message: "^Enterprise type can't be blank" },
  },

  ieActivityTypes: {
    presence: {
      allowEmpty: false,
      message: "^Activity can't be blank",
    },
  },

  ieSectorTypes: {
    presence: {
      allowEmpty: false,
      message: "^Type of Sector can't be blank",
    },
  },

  ieCommodityTypes: {
    presence: {
      allowEmpty: false,
      message: "^Type of Commodities can't be blank",
    },
  },
}
