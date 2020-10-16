import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/IAapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import LossForm from './LossForm';
// import symrProposedActivity from 'reducer/publicUser/application/new/producerCollective/pcFormProposedActivity';

class LossClass extends Component {
  defaultActivityObject = {
    formId: localStorage.getItem('createAppformId'),
    lossTypeId: null,
    typeOfLoss: null,
    amount: null,
  };

  state = {
    iaLossIncurredDetails: {
      formId: null,
      isLossIncurred: null,
      lossIncurredList: [],
    },
    init: true,
    cancelToken: axios.CancelToken.source(),
  };

  componentDidMount() {
    this.initialize();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('+++', nextProps);

    if (prevState.init)
      return {
        iaLossIncurredDetails: nextProps.iaLossIncurredDetails,
        init: false,
      };
    return null;
  }

  // //HANDLE CHANGE
  onChange = (name, value, index = undefined) => {
    let { iaLossIncurredDetails } = this.state;

    if (index !== undefined)
      iaLossIncurredDetails.lossIncurredList[index][name] = value;
    else {
      iaLossIncurredDetails[name] = value;
      iaLossIncurredDetails.lossIncurredList = [];
    }
    this.setState({ iaLossIncurredDetails });
  };

  //INITIALIZE

  initialize = () => {
    let { iaLossIncurredDetails } = this.state;
    if (iaLossIncurredDetails.lossIncurredList.length === 0) {
      iaLossIncurredDetails.lossIncurredList.push({
        ...this.defaultActivityObject,
      });
      this.setState({ iaLossIncurredDetails });
    }
  };

  onAddOrRemoveActivity = (index = null) => {
    let { iaLossIncurredDetails } = this.state;
    if (index === null) {
      iaLossIncurredDetails.lossIncurredList.push(
        Object.assign({}, this.defaultActivityObject)
      );
    } else {
      iaLossIncurredDetails.lossIncurredList = iaLossIncurredDetails.lossIncurredList.filter(
        (data, i) => index !== i
      );
    }
    this.setState({
      iaLossIncurredDetails,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { iaLossIncurredDetails, cancelToken } = this.state;
    let isValid;
    // if(iaLossIncurredDetails.lossIncurredList === true){
    // console.log(iaLossIncurredDetails.lossIncurredList)
    isValid =
      iaLossIncurredDetails.lossIncurredList.length &&
      iaLossIncurredDetails.lossIncurredList.every((data) => {
        return Object.keys(data).every((k) => !!data[k]);
      });

    // }
    // if (!isValid) {
    //   toast('Enter the details', 'error');
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    iaLossIncurredDetails['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm(
      { data: iaLossIncurredDetails, stage },
      cancelToken.token
    );
    // }
  };

  render() {
    const { location } = this.props;
    let pathname = location.pathname;
    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1)
    );
    return (
      <form
        className="container theme-one-common  mt-3 bg-white"
        onSubmit={this.onSubmit}
      >
        <LossForm
          {...this.state}
          onAddOrRemoveActivity={this.onAddOrRemoveActivity}
          onChange={this.onChange}
        />
        <Row className="producer-form-footer bg-white p-4 border-top align-items-center">
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
                    outline
                    color="lighGrey-2 w-100 border-none"
                    className="fw-600"
                    type="button"
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
  return state.publicUser.application.newApp.IA;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const LossIncurred = connect(mapStateToProps, mapDispatchToProps)(LossClass);

export { LossIncurred };
