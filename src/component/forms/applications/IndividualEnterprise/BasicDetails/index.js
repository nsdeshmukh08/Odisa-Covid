import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/IEapplication';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service';
import toast from 'helpers/Toast';
import BasicDetailsForm from './BasicDetailForm';
import basicDetails from 'reducer/publicUser/application/new/IA/basicDetails';
import { calcAgeInYear } from 'helpers/momentHelpers';
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;
const { GET_SYMR_FORM_MASTER_DATA, UPLOAD_DOC_API } = API_BOOK.APPLICATION;

class BasicDetailsFunc extends Component {
  state = {
    uploadingIndexes : [],
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
      appSubmitDate: new Date(),
      differentlyAbledCertificate:[],
    },
    //proofTypeData: [],
    districtList: [],
    blockList: [],
    panchayatList: [],
    //religionData: [],
    communityData: [],
    //appSubmitDate: new Date(),

    errors: {
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
    },
    loading: false,
    cancelToken: axios.CancelToken.source(),
    init: true,
  };

  //LIFECYCLE

  componentDidMount() {
    const { basicDetails } = this.state;
    //Narayan
    //this.getiemasterDetails();
    this.props.getIeMasterData();
    this.getDistrict();
    if (basicDetails.districtId) this.getBlock();
    if (basicDetails.blockId) this.getPanchayat();
    if (basicDetails.panchayatId) this.getVillage();
    if (basicDetails.villageId) this.getCLF();
  }
  getiamasterDetails = async () => {
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
    //   let { communityData } = response.data.data;
    //   this.setState({
    //     communityData,
    //   });
    // } else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };
  handleCallBack;
  componentWillUnmount() {
    const { cancelToken } = this.state;
    cancelToken.cancel();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.init)
      return {
        basicDetails: {
          ...nextProps.basicDetails,
        },
        init: false,
      };
    return null;
  }

  //HANDLE CHANGE
  onChange = (name, value) => {
    let { basicDetails, errors } = this.state;
    basicDetails[name] = value;
    errors[name] = undefined;
    this.setState({ basicDetails, errors }, () =>
      this.handleCallBack(name, value)
    );
  };

  onUpload = async (name, files) => {
    let { cancelToken, basicDetails, errors, uploadingIndexes } = this.state;
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
        basicDetails[name] = newUploadArray;
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
        basicDetails,
        errors,
        uploadingIndexes,
      });
    } else {
      basicDetails[name] = [];
      this.setState({ basicDetails });
    }
  };

  //OTHERS
  handleCallBack = (name, value) => {
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
      let { basicDetails } = this.state;
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
      let { basicDetails, errors } = this.state;
      errors['age'] = null;
      basicDetails = {
        ...basicDetails,
        age: calcAgeInYear(basicDetails.dateOfBirth, true),
      };
      this.setState({ basicDetails, errors });
    } else if (name === 'isDifferentlyAbled') {
      let { basicDetails } = this.state;
      basicDetails = {
        ...basicDetails,
        uploadCertificate: null,
      };
    }
  };

  //services

  getDistrict = async () => {
    const { cancelToken } = this.state;
    this.setState({
      loading: true,
    });
    let requestPayload = {
      ...CORE_API.GET_DISTRICT_LIST_API,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
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
    if (response.status === 200)
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
    if (response.status === 200)
      this.setState({
        panchayatList: response.data.data.panchayatList,
      });
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };
  getVillage = async () => {
    const { cancelToken, basicDetails } = this.state;
    this.setState({
      loading: true,
    });
    let params = {
      panchayatId: basicDetails.panchayatId,
    };
    let requestPayload = {
      ...CORE_API.GET_VILLAGE_LIST_API,
      params,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        villageList: response.data.data.villageList,
      });
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

  getCLF = async () => {
    const { cancelToken, basicDetails } = this.state;
    this.setState({
      loading: true,
    });
    let params = {
      villageId: basicDetails.villageId,
    };
    let requestPayload = {
      ...CORE_API.GET_CLF_LIST_API,
      params,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200)
      this.setState({
        clfList: response.data.data.clfList,
      });
    else toast(response.data.message, 'error');
    this.setState({ loading: false });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { basicDetails, cancelToken } = this.state;
    let validation = {
      ...inputValidations,
      // ...(basicDetails.community != selectedCommunity
      //   ? { otherCommunity: undefined }
      //   : ''),
    };
    const notValid = validate(basicDetails, validation);

    // if (notValid) {
    //   this.setState({
    //     errors: notValid,
    //   });
    // } else {
    let pathname = this.props.location.pathname;
    let { stage = '' } = this.props.match.params;

    basicDetails['formId'] = localStorage.getItem('createAppformId');
    //this.props.history.push((currentSection + 1).toString());
    this.props.updateForm({ data: basicDetails, stage }, cancelToken.token);
   //}
  };

  render() {
    let pathname = this.props.location.pathname;

    let currentSection = parseInt(
      pathname.toString().substr(pathname.length - 1)
    );

    const { loading } = this.state;

    return (
      <form
        className="container theme-one-common mt-3"
        onSubmit={this.onSubmit}
      >
        <BasicDetailsForm {...this.state} onChange={this.onChange} onUpload={this.onUpload}/>
        <Row className="producer-form-footer bg-white border-top align-items-center">
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
                    disabled={!currentSection - 1 || loading}
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
    ...state.publicUser.application.newApp.IE,
    ...state.common.iaMasterData,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(createApplicationActions, dispatch);
};

const BasicDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicDetailsFunc);

let inputValidations = {
  mobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^Mobile number can't be blank",
    },
  },
  // otherCommunity: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Others can't be blank",
  //   },
  // },
  // otherReligion: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Others can't be blank",
  //   },
  // },
  // otherEduQualification: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Others can't be blank",
  //   },
  // },
  // applicationCategory: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Application Category can't be blank",
  //   },
  // },
  // vprcName: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^VPRC Name can't be blank",
  //   },
  // },
  name: {
    presence: {
      allowEmpty: false,
      message: "^Name can't be blank",
    },
  },
  // sourceInfo: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Source of Information can't be blank",
  //   },
  // },
  fatherName: {
    presence: {
      allowEmpty: false,
      message: "^Father's / Husband's name can't be blank",
    },
  },
  aadharNumber: {
    presence: {
      allowEmpty: false,
      message: "^Aadhaar number can't be blank",
    },
  },
  vulnerableType: {
    presence: {
      allowEmpty: false,
      message: "^Vulnerable type can't be blank",
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
  // religion: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Religion can't be blank",
  //   },
  // },
  community: {
    presence: {
      allowEmpty: false,
      message: "^Community can't be blank",
    },
  },
  // educationQualification: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Education Qualification can't be blank",
  //   },
  // },
  // proofType: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Govt ID Proof Type for address can't be blank",
  //   },
  // },
  // natureOfMigration: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Nature Of Migration can't be blank",
  //   },
  // },
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
    numericality: {
      onlyInteger: true,
    },
    validateAgeFromGender: 'gender',
  },
  // isWomeHeaded: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Is women headed can't be blank",
  //   },
  // },
  isVulnerable: {
    presence: {
      allowEmpty: false,
      message: "^Is vulnerable category can't be blank",
    },
  },
  // govtIdNumber: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Govt ID Number can't be blank",
  //   },
  //   validateGovtProof: 'proofTypeData',
  // },
  // placeReturnFrom: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Name of the place returned from can't be blank",
  //   },
  // },
  // previousOccupation: {
  //   presence: {
  //     allowEmpty: false,
  //     message: "^Previous Occupation can't be blank",
  //   },
  // },
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
  villageId: {
    presence: {
      allowEmpty: false,
      message: "^Village can't be blank",
    },
  },
  clfId: {
    presence: {
      allowEmpty: false,
      message: "^CLF can't be blank",
    },
  },

  isDifferentlyAbled: {
    presence: {
      allowEmpty: false,
      message: "^Is differently abled can't be blank",
    },
  },
};

export { BasicDetails };
