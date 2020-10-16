import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApp from 'action/createApplication/IAapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import ExistingLoanForm from './ExistingLoanForm';
import pcFormProposedActivity from 'reducer/publicUser/application/new/producerCollective/pcFormProposedActivity';

class ExistingLoanClass extends Component {
  defaultActivityObject = {
    formId: localStorage.getItem('createAppformId'),
    loanSource: null,
    loanReceivedDate: null,
    loanAmount: null,
    interestRate: null,
    amountToBeRepaid: null,
    amountRepaid: null,
    balanceAmtToBeRepaid: null,
    reason: null,
  };

  state = {
    iaExistingLoan: {
      formId: localStorage.getItem('createAppformId'),
      isExistingLoan: null,
      existingLoanList: [],
    },
    init: true,
    cancelToken: axios.CancelToken.source(),
  };

  componentDidMount() {
    this.initialize();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        iaExistingLoan: { ...nextProps.iaExistingLoan },
        init: false,
      };
    return null;
  }

  //HANDLE CHANGE
  onChange = (name, value, index = undefined) => {
    // console.log(name, value, "index",index)
    let { iaExistingLoan } = this.state;
    if (index !== undefined)
      iaExistingLoan.existingLoanList[index][name] = value;
    else {
      iaExistingLoan[name] = value;
      iaExistingLoan.existingLoanList = [];
    }
    this.setState({ iaExistingLoan }, () => this.handlecallback(name, value));
  };

  //INITIALIZE
  handlecallback = (name, value) => {
    let { iaExistingLoan } = this.state;
    iaExistingLoan.existingLoanList &&
      iaExistingLoan.existingLoanList.map((data) => {
        if (
          parseInt(data.amountToBeRepaid) > 0 &&
          parseInt(data.amountRepaid) > 0
        ) {
          let balance =
            parseInt(data.amountToBeRepaid) - parseInt(data.amountRepaid);
          data.balanceAmtToBeRepaid = balance.toString();
        }
      });

    this.setState({
      iaExistingLoan,
    });
  };

  initialize = () => {
    let { iaExistingLoan } = this.state;
    if (iaExistingLoan.existingLoanList.length === 0) {
      iaExistingLoan.existingLoanList.push({ ...this.defaultActivityObject });
      this.setState({ iaExistingLoan });
    }
  };

  onAddOrRemoveActivity = (index = null) => {
    let { iaExistingLoan } = this.state;
    if (index === null) {
      iaExistingLoan.existingLoanList.push(
        Object.assign({}, this.defaultActivityObject)
      );
    } else {
      iaExistingLoan.existingLoanList = iaExistingLoan.existingLoanList.filter(
        (data, i) => index !== i
      );
    }
    this.setState({
      iaExistingLoan,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { iaExistingLoan, cancelToken } = this.state;
    let isValid;
    // if(iaExistingLoan.isExistingLoan === true){
    // console.log(iaExistingLoan.existingLoanList)
    isValid =
      iaExistingLoan.existingLoanList.length &&
      iaExistingLoan.existingLoanList.every((data) => {
        return Object.keys(data).every((k) => !!data[k]);
      });
    // }
    // if (!isValid) {
    //   toast('Enter the details', 'error');
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    iaExistingLoan['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm({ data: iaExistingLoan, stage }, cancelToken.token);
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
        <ExistingLoanForm
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
  return bindActionCreators(createApp, dispatch);
};

const ExistingLoan = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExistingLoanClass);

export { ExistingLoan };
