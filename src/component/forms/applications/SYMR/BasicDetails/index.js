import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/symr';
import { bindActionCreators } from 'redux'
//import _ from "lodash";
//import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import BasicDetailsForm from './BasicDetailForm'
//import basicDetails from 'reducer/publicUser/application/new/producerCollective/basicDetails';
import { calcAgeInYear } from 'helpers/momentHelpers'
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;
const { GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION;

class BasicDetailsFunc extends Component {

    state = {
        basicDetails: {
            "formId": undefined,
            "mobileNumber": null,
            "name": "",
            "fatherName": "",
            "address": null,
            "gender": null,
            "community": null,
            dateOfBirth: null,
            age: null,
            aadharNumber: null,
            isVulnerable: null,
            isVulnerableType: null,
            isDifferentlyAbled: null,
            applicationCategory:null,
            uploadCertificate: null,
            districtId: null,
            blockId: null,
            panchayatId: null,
            villageId: null,
            clfId: null,
            educationQualification: null,
            natureOfMigration: null,
            placeReturnFrom: null,
            durationOfMigration: null,
        },
        districtList: [],
        blockList: [],
        panchayatList: [],
        villageList: [],
        clfList: [],
        communityData: [],
        vulnerableTypeData:[],
        errors: {
            "formId": null,
            "mobileNumber": null,
            "name": null,
            "fatherName": null,
            "address": null,
            "gender": null,
            "community": null,
            dateOfBirth: null,
            age: null,
            aadharNumber: "",
            isVulnerable: null,
            isVulnerableType: null,
            isDifferentlyAbled: null,
            uploadCertificate: null,
            applicationCategory:null,
            districtId: null,
            blockId: null,
            panchayatId: null,
            villageId: null,
            clfId: null,
            educationQualification: null,
            natureOfMigration: null,
            placeReturnFrom: null,
            durationOfMigration: null
        },
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init: true
    }

    //LIFECYCLE

    componentDidMount() {

        const { basicDetails } = this.state
        this.getsymrmasterDetails()
        this.getDistrict();
        if (basicDetails.districtId)
            this.getBlock()
        if (basicDetails.blockId)
            this.getPanchayat()
        // if(basicDetails.panchayatId)
        //     this.getVillage()
        // if(basicDetails.villageId)
        //     this.getCLF()

    }
    getsymrmasterDetails = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...GET_SYMR_FORM_MASTER_DATA,
            cancelToken: cancelToken.token,
        }
        let response = await API(requestPayload);
        console.log("response",response)
        if (response.status === 200) {
            let {
                communityData,
                vulnerableTypeData
            } = response.data.data
            this.setState({
                communityData,
                vulnerableTypeData
            });
        }
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps.basicDetails, 'ddsdsds')
        if (prevState.init)
            return {
                basicDetails: {
                    ...nextProps.basicDetails
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { basicDetails, errors } = this.state
        basicDetails[name] = value
        errors[name] = undefined
        this.setState({ basicDetails, errors }, () => this.handleCallBack(name,value))
    }

    //OTHERS
    handleCallBack = (name, value) => {
        if (name === "districtId") {
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                blockId: null,
                panchayatId: null,
                villageId: null,
                clfId: null

            }
            this.setState(
                {
                    basicDetails,
                    panchayatList: [],
                    blockList: [],
                    villageList: [],
                    clfList: []
                },
                this.getBlock
            );
        }
        else if (name === "blockId") {
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                panchayatId: null,
                villageId: null,
                clfId: null
            }
            this.setState(
                {
                    basicDetails,
                    panchayatList: [],
                    villageList: [],
                    clfList: []
                },
                this.getPanchayat
            );
        }else if(name === 'panchayatId'){
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                villageId: null,
                clfId: null
            }
            this.setState(
                {
                    basicDetails,
                    villageList: [],
                    clfList: []
                },
                //this.getVillage
            );
        } else if(name === 'villageId'){
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                clfId: null
            }
            this.setState(
                {
                    basicDetails,
                    clfList: []
                },
                //this.getCLF
            );
        } else if (name === 'dateOfBirth') {
            let { basicDetails,errors } = this.state
            errors['age']=null
            basicDetails = {
                ...basicDetails,
                age: calcAgeInYear(basicDetails.dateOfBirth, true)
            }
            this.setState({ basicDetails,errors })
        } else if(name === 'isDifferentlyAbled'){
            let { basicDetails } = this.state
            basicDetails = {
                ...basicDetails,
                uploadCertificate: null
            } 
        }
    };

    //services
    getDistrict = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let requestPayload = {
            ...CORE_API.GET_DISTRICT_LIST_API,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                districtList: response.data.data.districtList
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    getBlock = async () => {
        const { cancelToken, basicDetails } = this.state;
        this.setState({
            loading: true
        })
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
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    getPanchayat = async () => {
        const { cancelToken, basicDetails } = this.state;
        this.setState({
            loading: true
        })
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
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };

    // getVillage = async () => {
    //     const { cancelToken, basicDetails } = this.state;
    //     this.setState({
    //         loading: true
    //     })
    //     let params = {
    //         panchayatId: basicDetails.panchayatId,
    //     };
    //     let requestPayload = {
    //         ...CORE_API.GET_VILLAGE_LIST_API,
    //         params,
    //         cancelToken: cancelToken.token,
    //     };
    //     let response = await API(requestPayload);
    //     if (response.status === 200)
    //         this.setState({
    //             villageList: response.data.data.villageList,
    //         });
    //     else toast(response.data.message, "error");
    //     this.setState({ loading: false })
    // };

    // getCLF = async () => {
    //     const { cancelToken, basicDetails } = this.state;
    //     this.setState({
    //         loading: true
    //     })
    //     let params = {
    //         villageId: basicDetails.villageId,
    //     };
    //     let requestPayload = {
    //         ...CORE_API.GET_CLF_LIST_API,
    //         params,
    //         cancelToken: cancelToken.token,
    //     };
    //     let response = await API(requestPayload);
    //     if (response.status === 200)
    //         this.setState({
    //             clfList: response.data.data.clfList,
    //         });
    //     else toast(response.data.message, "error");
    //     this.setState({ loading: false })
    // };

    onSubmit = (e) => {
        
        e.preventDefault()

        let { basicDetails, cancelToken } = this.state
        let validation = {
            ...inputValidations,
            ...(
                basicDetails?.applicationCategory != 1 ? { vulnerableType: undefined } : ''
            ),
        }
        const notValid = validate(basicDetails, validation);
        console.log('notValid', notValid)
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            this.props.history.push((stage + 1).toString())
            basicDetails['formId'] = localStorage.getItem('createAppformId')
            this.props.updateForm(
                { data: basicDetails, stage },
                cancelToken.token
            )
        }
    }

    render() {
        let pathname = this.props.location.pathname

        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))

        const { loading } = this.state

        return (
            <form className="container theme-one-common mt-3" onSubmit={this.onSubmit}>
                <BasicDetailsForm {...this.state} onChange={this.onChange} />
                <Row className="producer-form-footer bg-white border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()} >
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
        ...state.publicUser.application.newApp.symr,
        ...state.common.symrMasterData,
        profile: state.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const BasicDetails = connect(mapStateToProps, mapDispatchToProps)(BasicDetailsFunc)


let inputValidations = {
    // mobileNumber: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Mobile number can't be blank"
    //     }
    // },
    /* otherCommunity: {
        presence: {
            allowEmpty: false,
            message: "^Others can't be blank"
        }
    }, */
    name: {
        presence: {
            allowEmpty: false,
            message: "^Name can't be blank"
        }
    },
    aadharNumber: {
        presence: {
            allowEmpty: false,
            message: "^Aadhar can't be blank"
        }
    },
    applicationCategory: {
       presence: {
           allowEmpty: false,
           message: "^Is vulnerable category can't be blank"
       }
    },
    fatherName: {
        presence: {
            allowEmpty: false,
            message: "^Father's / Husband's name can't be blank"
        }
    },
    address: {
        presence: {
            allowEmpty: false,
            message: "^Address can't be blank"
        }
    },
    gender: {
        presence: {
            allowEmpty: false,
            message: "^Gender can't be blank"
        }
    },
    community: {
        presence: {
            allowEmpty: false,
            message: "^Community can't be blank"
        }
    },

    dateOfBirth: {
        presence: {
            allowEmpty: false,
            message: "^Date Of Birth can't be blank"
        }
    },
    age: {
        presence: {
            allowEmpty: false,
            message: "^Age can't be blank"
        },
        numericality: {
            onlyInteger: true
        },
        validateAgeFromGender: "gender"
    },
    // isVulnerable : {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Is vulnerable can't be blank"
    //     }
    // },
    // isVulnerableType:{
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Is vulnerable category can't be blank"
    //     }
    // },
    isDifferentlyAbled: {
        presence: {
            allowEmpty: false,
            message: "^Is differently abled can't be blank"
        }
    },
    districtId: {
        presence: {
            allowEmpty: false,
            message: "^District can't be blank"
        }
    },
    blockId: {
        presence: {
            allowEmpty: false,
            message: "^Block can't be blank"
        }
    },
    panchayatId: {
        presence: {
            allowEmpty: false,
            message: "^Panchayat can't be blank"
        }
    },
    // villageId: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Village can't be blank"
    //     }
    // },
    // clfId: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^CLF can't be blank"
    //     }
    // },
    educationQualification: {
        presence: {
            allowEmpty: false,
            message: "^Educational Qualification can't be blank"
        }
    },
    natureOfMigration: {
        presence: {
            allowEmpty: false,
            message: "^Nature of Migration can't be blank"
        }
    },
    placeReturnFrom: {
        presence: {
            allowEmpty: false,
            message: "^Place of migration can't be blank"
        }
    },
    durationOfMigration: {
        presence: {
            allowEmpty: false,
            message: "^Duration of migration can't be blank"
        }
    }
}
 
export { BasicDetails }