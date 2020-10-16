import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import Uploadfile from 'component/inputs/Uploadfile';
import { connect } from 'react-redux';

import * as createApplicationActions from 'action/createApplication/IAapplication';

import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import UploadForm from './UploadForm';

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

export class UploadClass extends Component {
  defaultUploadObject = {
    docUrl: null,
    docName: null,
    docType: null,
    formId: localStorage.getItem('createAppformId'),
  };

  state = {
    uploadDocuments: {
      formId: null,
      idProof: [],
      addressProof: [],
      bankPassBook: [],
      businessPlan: [],
      existingLoanRepay: [],
      differentlyAbledCertificate: [],
      photoCopy: [],
      remarks: null,
      isDeclaration: null,
      proofOfMigration: [],
      applicationLetter: [],
      bankPassBook: [],
      idProofPhoto: [],
      businessPlan: [],
      trainingCertificate: [],
      remarks: '',
    },
    uploadingIndexes: [],
    errors: {
      idProof: null,
      addressProof: null,
      bankPassBook: null,
      businessPlan: null,
      existingLoanRepay: null,
      differentlyAbledCertificate: null,
      photoCopy: null,
      remarks: null,
      isDeclaration: null,
      proofOfMigration: null,
      applicationLetter: null,
      bankPassBook: null,
      idProofPhoto: null,
      businessPlan: null,
      trainingCertificate: null,
      remarks: null,
    },
    loading: false,
    cancelToken: axios.CancelToken.source(),
    init: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('+++upload', nextProps);
    if (prevState.init)
      return {
        uploadDocuments: {
          ...nextProps.uploadDocuments,
        },
        init: false,
      };
    return null;
  }

  // HANDLE INPUT CHANGE

  onUpload = async (name, files) => {
    let { cancelToken, uploadDocuments, errors, uploadingIndexes } = this.state;
    if (files.length) {
      uploadingIndexes.push(name);
      this.setState({ uploadingIndexes });
      errors[name] = undefined;
      let newUploadArray = [];
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      this.setState({
        loading: true,
      });
      let requestPayload = {
        ...UPLOAD_DOC_API,
        data: formData,
        cancelToken: cancelToken.token,
      };
      let response = await API(requestPayload);
      if (response.status === 200) {
        for (var i = 0; i < files.length; i++) {
          newUploadArray.push({
            ...this.defaultUploadObject,
            docUrl: response.data.data[i]['url'],
            docName: response.data.data[i]['originalname'],
            docType: 1,
          });
        }
        uploadDocuments[name] = newUploadArray;
        uploadingIndexes = this.state.uploadingIndexes.filter(
          (data) => data !== name
        );
      } else {
        uploadingIndexes.pop(name);
        // this.setState({uploadingIndexes})
        toast(response.data.message, 'error');
      }
      this.setState({
        loading: false,
        uploadDocuments,
        errors,
        uploadingIndexes,
      });
    } else {
      uploadDocuments[name] = [];
      this.setState({ uploadDocuments });
    }
  };

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { uploadDocuments, errors } = this.state;
    uploadDocuments[name] = value;
    errors[name] = undefined;
    this.setState({ uploadDocuments, errors });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { uploadDocuments, cancelToken } = this.state;
    let validation = {
      ...inputValidations,
    };
    const notValid = validate(uploadDocuments, validation);
    // if (notValid) {
    //   this.setState({
    //     errors: notValid,
    //   });
    // } else {
    let pathname = this.props.location.pathname;
    let stage = parseInt(pathname.toString().substr(pathname.length - 1));
    uploadDocuments['formId'] = localStorage.getItem('createAppformId');
    // this.props.history.push((currentSection + 1).toString())
    this.props.updateForm({ data: uploadDocuments, stage }, cancelToken.token);
    // }
  };

  render() {
    const { location } = this.props;
    const { loading } = this.state;
    let pathname = location.pathname;
    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1)
    );
    return (
      <form
        className="container theme-one-common  mt-3 bg-white p-4"
        onSubmit={this.onSubmit}
      >
        <UploadForm
          {...this.state}
          onChange={this.onChange}
          onUpload={this.onUpload}
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
                    disabled={loading}
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
    ...state.publicUser.application.newApp.IA,
    ...state.common.iaMasterData,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const Upload = connect(mapStateToProps, mapDispatchToProps)(UploadClass);

export { Upload };

let inputValidations = {
  idProof: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  addressProof: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  bankPassBook: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  businessPlan: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  existingLoanRepay: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  photoCopy: {
    presence: { allowEmpty: false, message: "^Document can't be blank" },
  },
  remarks: {
    presence: { allowEmpty: false, message: "can't be blank" },
  },

  isDeclaration: {
    presence: { allowEmpty: false, message: "can't be blank" },
  },
};
