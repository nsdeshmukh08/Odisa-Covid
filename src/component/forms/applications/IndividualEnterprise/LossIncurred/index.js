import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/IEapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import LossForm from './LossForm';
// import symrProposedActivity from 'reducer/publicUser/application/new/producerCollective/pcFormProposedActivity';

class LossClass extends Component {
  defaultActivityObject = {
    //Narayan
    //formId: localStorage.getItem('createAppformId'),
    lossTypeId: null,
    //typeOfLoss: null,
    amount: null,
  };

  state = {
    ieLossIncurred: {
      formId: null,
      isLossIncurred: null,
      lossIncurredList: [],
    },
    init: true,
    cancelToken: axios.CancelToken.source(),
  };

  componentDidMount() {
    this.initialize();
    this.props.getIeMasterData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        ieLossIncurred: nextProps.ieLossIncurredDetails,
        init: false,
      };
    return null;
  }

  getInteger = (value) => isNaN(parseFloat(value)) ? value : parseFloat(value);

  // //HANDLE CHANGE
  onChange = (name, value, index = undefined) => {
    let { ieLossIncurred } = this.state;

    const keyObj={
      "amount": true,
    };

    if (index !== undefined)
      ieLossIncurred.lossIncurredList[index][name] = keyObj[name] ?  this.getInteger(value) : value;
    else {
      ieLossIncurred[name] = value;
      ieLossIncurred.lossIncurredList = [];
    }
    this.setState({ ieLossIncurred });
  };

  //INITIALIZE

  initialize = () => {
    let { ieLossIncurred } = this.state;
    if (ieLossIncurred.lossIncurredList.length === 0) {
      ieLossIncurred.lossIncurredList.push({ ...this.defaultActivityObject });
      this.setState({ ieLossIncurred });
    }
  };

  onAddOrRemoveActivity = (index = null) => {
    let { ieLossIncurred } = this.state;
    if (index === null) {
      ieLossIncurred.lossIncurredList.push(
        Object.assign({}, this.defaultActivityObject)
      );
    } else {
      ieLossIncurred.lossIncurredList = ieLossIncurred.lossIncurredList.filter(
        (data, i) => index !== i
      );
    }
    this.setState({
      ieLossIncurred,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { ieLossIncurred, cancelToken } = this.state;
    let isValid;
    // if(ieLossIncurred.lossIncurredList === true){
    // console.log(ieLossIncurred.lossIncurredList)
    isValid =
      ieLossIncurred.lossIncurredList.length &&
      ieLossIncurred.lossIncurredList.every((data) => {
        return Object.keys(data).every((k) => !!data[k]);
      });

    // }
    // if (!isValid) {
    //   toast('Enter the details', 'error');
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    ieLossIncurred['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm({ data: ieLossIncurred, stage }, cancelToken.token);
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
  return state.publicUser.application.newApp.IE;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const LossIncurred = connect(mapStateToProps, mapDispatchToProps)(LossClass);

export { LossIncurred };
