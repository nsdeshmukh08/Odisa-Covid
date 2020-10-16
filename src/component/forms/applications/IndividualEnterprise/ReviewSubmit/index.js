import React, { Component } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/IEapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import BasicDetailsForm from '../BasicDetails/BasicDetailForm';
import SHGForm from '../SHG/SHGForm';
import EnterpriseActivityForm from '../EnterpriseActivity/EnterpriseActivityForm';
import BankDetailsForm from '../BankDetails/BankDetailsForm';
import ActivityForm from '../Activity/ActivityForm';
import ExistingLoanForm from '../ExistingLoan/ExistingLoanForm';
import UploadForm from '../Upload/UploadForm';
import { calcAgeInYear } from 'helpers/momentHelpers';
import { STAFF_ROLE_ID } from 'helpers/variables';

const {
  UPLOAD_DOC_API,
  GET_SYMR_FORM_SUBMIT,
  GET_SYMR_FORM_MASTER_DATA,
} = API_BOOK.APPLICATION;

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

class ReviewSubmitClass extends Component {
  defaultActivityObject = {
    formId: localStorage.getItem('createAppformId'),
    loanSource: '',
    loanReceivedDate: '',
    loanAmount: '',
    interestRate: '',
    amountToBeRepaid: '',
    amountRepaid: '',
    balanceAmtToBeRepaid: '',
    reason: '',
  };

  state = {
    //BASIC
    basicDetails: {
      formId: null,
      name: null,
      fatherName: null,
      aadharNumber: null,
      dateOfBirth: null,
      age: null,
      gender: null,
      community: null,
      mobileNumber: null,
      address: null,
      isVulnerable: null,
      vulnerableType: null,
      isDifferentlyAbled: null,
      districtId: null,
      blockId: null,
      panchayatId: null,
      villageId: null,
      clfId: null,

      applicationCategory: null,
      sourceInfo: null,
      appSubmitDate: new Date(),
    },
    districtList: [],
    blockList: [],
    panchayatList: [],
    communityData: [],

    shgDetails: {
      formId: undefined,
      shgMemberType: 1,
      relationshipType: 1,
      shgName: '',
      eMathiCode: '',
    },

    skillAndEdpDetails: {
      isSkillTrained: true,
      trainingInstitute: '',
      skillTrainingScheme: '',
      courseName: '',
      courseCompletionYear: '',
      isCompletedEdpProgramme: 1,
      edpCompletedInstituteName: '',
      edpCompletedCourseName: '',
      edpScheme: '',
      isRegisteredEdpProgramme: 1,
      edpRegisteredInstituteName: '',
      edpRegisteredCourseName: '',
      registeredEdpScheme: '',
      otherEdpScheme: '',
      otherRegisteredEdpScheme: '',
      otherSkillTrainingScheme: '',
    },

    enterpriseDetails: {
      formId: undefined,
      enterpriseName: '',
      dateOfActivity: null,
      enterpriseType: '',
      ieSectorTypes: [],
      ieActivityTypes: [],
      ieCommodityTypes: [],
    },

    ieBankDetails: {
      formId: null,
      accNumber: null,
      confirmAccNumber: null,
      accName: null,
      bankName: null,
      branchName: null,
      ifscCode: null,
      isAccLinkAadhar: null,
    },

    symrProposedActivity: [],

    symrExistingLoan: {
      existingLoanList: [],
    },

    uploadDocuments: {
      formId: null,
      proofOfMigration: [],
      applicationLetter: [],
      bankPassBook: [],
      idProofPhoto: [],
      businessPlan: [],
      trainingCertificate: [],
      remarks: '',
    },

    typesOfSector: [],
    activityData: [],
    typesOfCommodity: [],
    typesOfPc: [],
    formedByData: [],
    registrationUnderData: [],
    uploadingIndexes: [],
    errors: {},
    loading: false,
    cancelToken: axios.CancelToken.source(),
    init: true,
    isSubmitting: false,
    stateDataUpdated: false,
  };

  //LIFECYCLE

  componentDidMount() {
    const { basicDetails } = this.state;
    this.getsymrmasterDetails();
    this.getDistrict();
    if (basicDetails.districtId) this.getBlock();
    if (basicDetails.blockId) this.getPanchayat();
    if (basicDetails.panchayatId) this.getVillage();
    if (basicDetails.villageId) this.getCLF();
  }

  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  getsymrmasterDetails = async () => {
    const { cancelToken } = this.state;
    this.setState({
      loading: true,
    });
    let requestPayload = {
      ...GET_SYMR_FORM_MASTER_DATA,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    console.log('response', response);
    // if (response.status === 200) {
    //   let {
    //     religionData,
    //     communityData,
    //     educQualificationData,
    //     schemeData,
    //     proofTypeData,
    //   } = response.data.data;
    //   this.setState({
    //     religionData,
    //     proofTypeData,
    //     communityData,
    //     educQualificationData,
    //     schemeData,
    //   });
    // } else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        ...nextProps,
        init: false,
      };

    return null;
  }

  //HANDLE CHANGE
  onChange = (name, value, index = null) => (formName) => {
    let { errors } = this.state;
    console.log(name, value);
    let formData = this.state[formName];
    if (index !== null) {
      formData[index][name] = value;
      errors[name] = undefined;
    } else {
      formData[name] = value;
      errors[name] = undefined;
    }
    this.setState({ [formName]: formData, errors }, () =>
      this.handleCallBack(name, value)
    );
  };

  onExistingLoanChange = (name, value, index = undefined) => {
    let { symrExistingLoan } = this.state;
    if (index !== undefined)
      symrExistingLoan.existingLoanList[index][name] = value;
    else {
      symrExistingLoan['isExistingLoan'] = value;
      symrExistingLoan.existingLoanList = [];
    }
    this.setState({ symrExistingLoan }, () => this.handleCallBack(name, value));
  };

  //OTHERS
  handleCallBack = (name, value) => {
    let {
      pcDetails,
      enterpriseDetails,
      symrExistingLoan,
      basicDetails,
      errors,
      skillAndEdpDetails,
    } = this.state;

    if (name === 'districtId') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        blockId: null,
        panchayatId: null,
        villageId: null,
        clfId: null,
      };
      this.setState(
        {
          basicDetails,
          panchayatList: [],
          blockList: [],
          villageList: [],
          clfList: [],
        },
        this.getBlock
      );
    } else if (name === 'blockId') {
      basicDetails = {
        ...basicDetails,
        panchayatId: null,
        villageId: null,
        clfId: null,
      };
      this.setState(
        {
          basicDetails,
          panchayatList: [],
          villageList: [],
          clfList: [],
        },
        this.getPanchayat
      );
    } else if (name === 'panchayatId') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        villageId: null,
        clfId: null,
      };
      this.setState(
        {
          basicDetails,
          villageList: [],
          clfList: [],
        },
        this.getVillage
      );
    } else if (name === 'villageId') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        clfId: null,
      };
      this.setState(
        {
          basicDetails,
          clfList: [],
        },
        this.getCLF
      );
    } else if (name === 'dateOfBirth') {
      errors['age'] = null;
      basicDetails = {
        ...basicDetails,
        age: calcAgeInYear(basicDetails.dateOfBirth, true),
      };
    } else if (
      name === 'isExperiencedEnterpreneur' &&
      !enterpriseDetails[name]
    ) {
      enterpriseDetails['enterpreneurExpYears'] = null;
    } else if (name === 'isEmployedInActivity' && !enterpriseDetails[name]) {
      enterpriseDetails['activityExpYears'] = null;
      enterpriseDetails['designation'] = null;
      enterpriseDetails['location'] = null;
    } else if (name === 'isLoanAppliedPreviously' && !enterpriseDetails[name]) {
      enterpriseDetails['schemeName'] = null;
      enterpriseDetails['schemeAmount'] = null;
    } else if (
      name === 'isExistingLoan' &&
      !symrExistingLoan['isExistingLoan']
    ) {
      symrExistingLoan.existingLoanList = [];
    } else if (
      name === 'isSkillTrained' &&
      !skillAndEdpDetails['isSkillTrained']
    ) {
      skillAndEdpDetails['trainingInstitute'] = null;
      skillAndEdpDetails['skillTrainingScheme'] = null;
      skillAndEdpDetails['courseName'] = null;
      skillAndEdpDetails['courseCompletionYear'] = null;
    } else if (
      name === 'isCompletedEdpProgramme' &&
      !skillAndEdpDetails['isCompletedEdpProgramme']
    ) {
      skillAndEdpDetails['edpCompletedInstituteName'] = null;
      skillAndEdpDetails['edpScheme'] = null;
      skillAndEdpDetails['edpCompletedCourseName'] = null;
    } else if (
      name === 'isRegisteredEdpProgramme' &&
      !skillAndEdpDetails['isRegisteredEdpProgramme']
    ) {
      skillAndEdpDetails['edpRegisteredInstituteName'] = null;
      skillAndEdpDetails['registeredEdpScheme'] = null;
      skillAndEdpDetails['edpRegisteredCourseName'] = null;
    } else if (name === 'proofType') {
      let { basicDetails, proofTypeData } = this.state;
      let selectedProof =
        proofTypeData &&
        proofTypeData.find((data) => data.value === parseInt(value));
      console.log(selectedProof, proofTypeData);
      basicDetails['proofTypeData'] = selectedProof;
      basicDetails['govtIdNumber'] = '';
      this.setState({
        basicDetails,
      });
    }
    symrExistingLoan.existingLoanList &&
      symrExistingLoan.existingLoanList.map((data) => {
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
      symrExistingLoan,
      enterpriseDetails,
      basicDetails,
      errors,
      pcDetails,
    });
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
    if (response.status >= 200 && response.status < 300)
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
    if (response.status >= 200 && response.status < 300)
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
    if (response.status >= 200 && response.status < 300)
      this.setState({
        panchayatList: response.data.data.panchayatList,
      });
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

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
      if (response.status >= 200 && response.status < 300) {
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

  onAddOrRemoveExistingLoan = (index = null, formName) => {
    let { symrExistingLoan } = this.state;
    if (index === null) {
      symrExistingLoan.existingLoanList.push({ ...this.defaultActivityObject });
    } else {
      symrExistingLoan.existingLoanList = symrExistingLoan.existingLoanList.filter(
        (data, i) => index !== i
      );
    }
    this.setState({
      symrExistingLoan,
    });
  };
  onAddOrRemoveActivity = (index = null, formName) => {
    let { symrProposedActivity } = this.state;
    if (index === null) {
      symrProposedActivity.push(
        Object.assign(
          {},
          {
            formId: localStorage.getItem('createAppformId'),
            activityName: null,
            activityTimeLine: undefined,
            activityTimeLineVal: undefined,
            amtReq: undefined,
          }
        )
      );
    } else {
      symrProposedActivity = symrProposedActivity.filter(
        (data, i) => index !== i
      );
    }
    this.setState({
      symrProposedActivity,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let {
      errors,
      enterpriseDetails,
      shgDetails,
      basicDetails,
      skillAndEdpDetails,
      religionData,
      communityData,
      educQualificationData,
      schemeData,
    } = this.state;
    // let selectedReligion = religionData.find((data) => data.isOthers === true)
    //   ?.value;
    // let selectedCommunity = communityData.find((data) => data.isOthers === true)
    //   ?.value;
    // let selectedEdc = educQualificationData.find(
    //   (data) => data.isOthers === true
    // )?.value;
    // let selectedScheme = schemeData.find((data) => data.isOthers === true)
    //   ?.value;

    const isValid = inputValidation.every(
      ({ formName, validation, exec, ...rest }, i) => {
        let formData = this.state[formName];

        if (exec) {
          let isValid = exec(formData);
          errors[formName] = !isValid ? [rest.error] : [];
          return exec(formData);
        }

        validation = {
          ...validation,
          ...(!enterpriseDetails['isExperiencedEnterpreneur']
            ? {
                enterpreneurExpYears: undefined,
              }
            : ''),
          ...(!enterpriseDetails['isEmployedInActivity']
            ? {
                activityExpYears: undefined,
                designation: undefined,
                location: undefined,
              }
            : ''),
          ...(!enterpriseDetails['isLoanAppliedPreviously']
            ? {
                schemeName: undefined,
                schemeAmount: undefined,
              }
            : ''),
          ...(!skillAndEdpDetails['isSkillTrained']
            ? {
                trainingInstitute: undefined,
                skillTrainingScheme: undefined,
                courseName: undefined,
                courseCompletionYear: undefined,
              }
            : ''),
          ...(!skillAndEdpDetails['isCompletedEdpProgramme']
            ? {
                edpCompletedInstituteName: undefined,
                edpScheme: undefined,
                edpCompletedCourseName: undefined,
              }
            : ''),
          ...(!skillAndEdpDetails['isRegisteredEdpProgramme']
            ? {
                edpRegisteredInstituteName: undefined,
                registeredEdpScheme: undefined,
                edpRegisteredCourseName: undefined,
              }
            : ''),
          //   ...(basicDetails.educationQualification != selectedEdc
          //     ? { otherEduQualification: undefined }
          //     : ''),
          //   ...(basicDetails.religion != selectedReligion
          //     ? { otherReligion: undefined }
          //     : ''),
          //   ...(basicDetails.community != selectedCommunity
          //     ? { otherCommunity: undefined }
          //     : ''),
          //   ...(skillAndEdpDetails.skillTrainingScheme != selectedScheme
          //     ? { otherSkillTrainingScheme: undefined }
          //     : ''),
          //   ...(skillAndEdpDetails.edpScheme != selectedScheme
          //     ? { otherEdpScheme: undefined }
          //     : ''),
          //   ...(skillAndEdpDetails.registeredEdpScheme != selectedScheme
          //     ? { otherRegisteredEdpScheme: undefined }
          //     : ''),
          ...(shgDetails.shgMemberType != 2
            ? { relationshipType: undefined }
            : ''),
        };
        console.log('499', formData);
        let error = validate(formData, validation);
        if (error)
          errors = {
            ...errors,
            ...error,
          };
        return !error;
      }
    );

    if (!isValid) {
      console.log(errors, 'errors');
      let filteredErros = Object.keys(errors)
        .filter((data) => errors[data] && errors[data].length)
        .map((error) => ({ error: errors[error][0] }));
      let error = filteredErros[0].error;
      toast(error, 'error');
      this.setState({
        errors,
      });
    } else {
      let pcForms = [
        {
          keyName: 'basicDetails',
          includeFormId: true,
          label: 'basicDetails',
        },
        {
          keyName: 'shgDetails',
          includeFormId: true,
          label: 'symrShgDetails',
        },
        {
          keyName: 'skillAndEdpDetails',
          includeFormId: true,
          label: 'symrSkillTraining',
        },
        {
          keyName: 'enterpriseDetails',
          includeFormId: true,
          label: 'symrEnterprise',
        },
        {
          keyName: 'ieBankDetails',
          includeFormId: true,
          label: 'ieBankDetails',
        },
        {
          keyName: 'symrProposedActivity',
          label: 'symrProposedActivity',
        },
        {
          keyName: 'symrExistingLoan',
          includeFormId: true,
          label: 'symrExistingLoan',
        },
        {
          keyName: 'uploadDocuments',
          includeFormId: true,
          label: 'uploadDocuments',
        },
      ];
      const { cancelToken } = this.state;

      let data = {};

      pcForms.forEach((form) => {
        data[form.label] = this.state[form.keyName ? form.keyName : form.label];
        if (form.includeFormId)
          data[form.label]['formId'] = localStorage.getItem('createAppformId');
      });
      this.setState({
        isSubmitting: true,
      });
      let requestPayload = {
        ...GET_SYMR_FORM_SUBMIT,
        data: data,
        cancelToken: cancelToken.token,
      };
      console.log('requ', requestPayload);
      let response = await API(requestPayload);

      if (response.status >= 200 && response.status <= 300) {
        this.props.history.push('/user/dashboard');
        if (STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role')))
          this.props.history.replace('/staff/dashboard');
        else this.props.history.replace('/user/dashboard');
      } else {
        toast('Error!!', 'error');
      }
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="container bg-white mt-3 review-main">
          <Row className="p-4 review-head">
            <h1 className="m-0 fw-500">Review & SubmitTED</h1>
          </Row>
          <Row className="p-3 align-items-center border-top review-head">
            <Col lg="6" md="6" sm="12" className="update-draft">
              <span class="custom-caret dark mr-2">
                <i class="icon-tick"></i>
              </span>
              <span className="lighGrey-2">All Updates Saved as Draft</span>
            </Col>
            <Col lg="5" md="6" sm="12" className="ml-auto">
              <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                <Col>
                  <Button
                    onClick={() => this.props.history.push('/user/dashboard')}
                    outline
                    type="button"
                    color="lighGrey-2 w-100 border-primary "
                    className="fw-600"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={isSubmitting}
                    color="primary w-100 border-none"
                    className="fw-600"
                    type="submit"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="container theme-one-common bg-white mt-3">
          <Row className="p-4 border-bottom ">
            <h1 className="mb-0">All Details</h1>
          </Row>

          <BasicDetailsForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) => this.onChange(...params)('basicDetails')}
          />

          <SHGForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) => this.onChange(...params)('shgDetails')}
          />

          <EnterpriseActivityForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) =>
              this.onChange(...params)('enterpriseDetails')
            }
          />

          <BankDetailsForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) =>
              this.onChange(...params)('ieBankDetails')
            }
          />

          <ActivityForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) =>
              this.onChange(...params)('symrProposedActivity')
            }
            onAddOrRemoveActivity={this.onAddOrRemoveActivity}
          />

          <ExistingLoanForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) => this.onExistingLoanChange(...params)}
            onAddOrRemoveActivity={this.onAddOrRemoveExistingLoan}
          />

          <UploadForm
            {...this.state}
            onSubmit={this.onSubmit}
            onChange={(...params) =>
              this.onChange(...params)('uploadDocuments')
            }
            onUpload={this.onUpload}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log("Props=>>>>", state.publicUser.application.newApp.IE);
  return state.publicUser.application.newApp.IE;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const IAReviewSubmit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewSubmitClass);

export { IAReviewSubmit };

let inputValidation = [
  {
    formName: 'basicDetails',
    validation: {
      mobileNumber: {
        presence: {
          allowEmpty: false,
          message: "^Mobile number can't be blank",
        },
      },
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name can't be blank",
        },
      },
      sourceInfo: {
        presence: {
          allowEmpty: false,
          message: "^Source of Information can't be blank",
        },
      },
      fatherName: {
        presence: {
          allowEmpty: false,
          message: "^Father's / Husband's name can't be blank",
        },
      },
      address: {
        presence: {
          allowEmpty: false,
          message: "^Address can't be blank",
        },
      },
      gender: {
        presence: {
          allowEmpty: false,
          message: "^Gender can't be blank",
        },
      },
      religion: {
        presence: {
          allowEmpty: false,
          message: "^Religion can't be blank",
        },
      },
      community: {
        presence: {
          allowEmpty: false,
          message: "^Community can't be blank",
        },
      },
      educationQualification: {
        presence: {
          allowEmpty: false,
          message: "^Education Qualification can't be blank",
        },
      },
      otherCommunity: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
      otherReligion: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
      otherEduQualification: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
      proofType: {
        presence: {
          allowEmpty: false,
          message: "^Govt ID Proof Type for address can't be blank",
        },
      },
      natureOfMigration: {
        presence: {
          allowEmpty: false,
          message: "^Nature Of Migration can't be blank",
        },
      },
      dateOfBirth: {
        presence: {
          allowEmpty: false,
          message: "^Date Of Birth can't be blank",
        },
      },
      age: {
        presence: {
          allowEmpty: false,
          message: "^Age can't be blank",
        },
      },
      govtIdNumber: {
        presence: {
          allowEmpty: false,
          message: "^Govt ID Number can't be blank",
        },
        validateGovtProof: 'proofTypeData',
      },
      placeReturnFrom: {
        presence: {
          allowEmpty: false,
          message: "^Name of the place returned from can't be blank",
        },
      },
      previousOccupation: {
        presence: {
          allowEmpty: false,
          message: "^Previous Occupation can't be blank",
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
    },
  },
  {
    formName: 'shgDetails',
    validation: {
      relationshipType: {
        presence: {
          allowEmpty: false,
          message: "^Relationship Type can't be blank",
        },
      },
      shgName: {
        presence: {
          allowEmpty: 'true',
          message: "^SHG Name can't be blank",
        },
      },
      eMathiCode: {
        presence: {
          allowEmpty: false,
          message: "^e-mathi Code can't be blank",
        },
      },
    },
  },
  {
    formName: 'skillAndEdpDetails',
    validation: {
      isSkillTrained: {
        presence: {
          allowEmpty: false,
          message: "^Skill And Edp can't be blank",
        },
      },
      trainingInstitute: {
        presence: {
          allowEmpty: false,
          message: "^Training Institute can't be blank",
        },
      },
      skillTrainingScheme: {
        presence: {
          allowEmpty: false,
          message: "^Skill Training Scheme can't be blank",
        },
      },
      courseName: {
        presence: {
          allowEmpty: false,
          message: "^Course aame can't be blank",
        },
      },
      courseCompletionYear: {
        presence: {
          allowEmpty: false,
          message: "^Year of course completion can't be blank",
        },
      },
      isCompletedEdpProgramme: {
        presence: {
          allowEmpty: false,
          message: "^IS course completed can't be blank",
        },
      },
      edpCompletedInstituteName: {
        presence: {
          allowEmpty: false,
          message: "^Institute name can't be blank",
        },
      },
      edpCompletedCourseName: {
        presence: {
          allowEmpty: false,
          message: "^Course name can't be blank",
        },
      },
      edpScheme: {
        presence: {
          allowEmpty: false,
          message: "^Field can't be blank",
        },
      },
      isRegisteredEdpProgramme: {
        presence: {
          allowEmpty: false,
          message: "^Is Registered can't be blank",
        },
      },
      edpRegisteredInstituteName: {
        presence: {
          allowEmpty: false,
          message: "^Institute Name can't be blank",
        },
      },
      edpRegisteredCourseName: {
        presence: {
          allowEmpty: false,
          message: "^Course Name can't be blank",
        },
      },
      registeredEdpScheme: {
        presence: {
          allowEmpty: false,
          message: "^Scheme can't be blank",
        },
      },
      // specifyOther: {
      //     presence: {
      //         allowEmpty: false,
      //         message: "^Others can't be blank"
      //     }
      // },
      otherEdpScheme: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
      otherRegisteredEdpScheme: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
      otherSkillTrainingScheme: {
        presence: {
          allowEmpty: false,
          message: "^Others can't be blank",
        },
      },
    },
  },
  {
    formName: 'enterpriseDetails',
    validation: {
      grantenterpriseName: {
        presence: {
          allowEmpty: false,
          message: "^Enterprise name can't be blank",
        },
      },
      enterpriseType: {
        presence: {
          allowEmpty: false,
          message: "^Enterprise type can't be blank",
        },
      },
      grantActivityName: {
        presence: {
          allowEmpty: false,
          message: "^Activity name can't be blank",
        },
      },
      symrTypes: {
        presence: { allowEmpty: false, message: "^Types can't be blank" },
      },
      symrCommodityTypes: {
        presence: { allowEmpty: false, message: "^Commodity't be blank" },
      },
      symrSectorTypes: {
        presence: {
          allowEmpty: false,
          message: "^Sector Types can't be blank",
        },
      },
      summary: {
        presence: { allowEmpty: false, message: "^Summary can't be blank" },
      },
      noOfPersons: {
        presence: {
          allowEmpty: false,
          message: "^No of persons can't be blank",
        },
      },
      isExperiencedEnterpreneur: {
        presence: {
          allowEmpty: false,
          message: "^Is Experienced can't be blank",
        },
      },
      enterpreneurExpYears: {
        presence: {
          allowEmpty: false,
          message: "^Enterpreneur can't be blank",
        },
      },
      isEmployedInActivity: {
        presence: {
          allowEmpty: false,
          message: "^Is Employed Activity can't be blank",
        },
      },
      activityExpYears: {
        presence: { allowEmpty: false, message: "^Experience can't be blank" },
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
        presence: {
          allowEmpty: false,
          message: "^Scheme amount can't be blank",
        },
      },
      schemeName: {
        presence: { allowEmpty: false, message: "^Scheme name can't be blank" },
      },
    },
  },
  {
    formName: 'ieBankDetails',
    validation: {
      accNumber: {
        presence: {
          allowEmpty: false,
          message: "^Acc Number can't be blank",
        },
      },
      confirmAccNumber: {
        presence: {
          allowEmpty: false,
          message: "^Confirm Acc number can't be blank",
        },
        validateConfirmAccountNumber: 'accNumber',
      },
      accName: {
        presence: {
          allowEmpty: false,
          message: "^Account name can't be blank",
        },
      },
      bankName: {
        presence: {
          allowEmpty: false,
          message: "^Bank name can't be blank",
        },
      },
      branchName: {
        presence: {
          allowEmpty: false,
          message: "^Branch Name can't be blank",
        },
      },
      ifscCode: {
        presence: {
          allowEmpty: false,
          message: "^IFSC Code can't be blank",
        },
        format: {
          pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
          message: '^Enter valid IFSC code',
        },
      },
    },
  },
  {
    formName: 'symrProposedActivity',
    error: 'Enter activity details!!',
    exec: (symrProposedActivity) =>
      symrProposedActivity.length &&
      symrProposedActivity.every(
        (data) =>
          data.activityName &&
          data.activityTimeLine &&
          data.activityTimeLineVal &&
          data.amtReq
      ),
  },
  {
    formName: 'symrExistingLoan',
    error: 'Enter existing loan details!!',
    exec: ({ existingLoanList, isExistingLoan }) => {
      if (!isExistingLoan) return true;
      return (
        existingLoanList.length &&
        existingLoanList.every((data) => {
          return Object.keys(data).every(
            (k) => data[k] !== undefined && data[k] !== null
          );
        })
      );
    },
  },
  {
    formName: 'uploadDocuments',
    validation: {
      proofOfMigration: {
        presence: { allowEmpty: false, message: "^Document can't be blank" },
      },
      applicationLetter: {
        presence: { allowEmpty: false, message: "^Document can't be blank" },
      },
      bankPassBook: {
        presence: { allowEmpty: false, message: "^Document can't be blank" },
      },
      idProofPhoto: {
        presence: { allowEmpty: false, message: "^Document can't be blank" },
      },
      businessPlan: {
        presence: { allowEmpty: false, message: "^Document can't be blank" },
      },
      remarks: {
        presence: { allowEmpty: false, message: "^Remarks can't be blank" },
      },
    },
  },
];
