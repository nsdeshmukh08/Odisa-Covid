import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
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
import SkillAndEdpForm from './SkillAndEdp'

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;
const { GET_SYMR_FORM_MASTER_DATA } = API_BOOK.APPLICATION;

class SkillAndEdpClass extends Component {

    state = {
        skillAndEdpDetails: {
            "skillTrainingName": null,
            "trainingInstitute": null,
            "skillTrainingScheme": null,
            "courseName": null,
            "trainingDuration": null,
            "courseCompletionYear": null,
            "isCompletedEdpProgramme": null,
            "edpCompletedInstituteName": null,
            "edpCompletedCourseName": null,
            "edpScheme": null,
            "isExperiencedEnterpreneur": null,
            "enterpriseType": '',
            "location": "",
            "enterpreneurExpYears": '',
            "designation": "",
            "isRegisteredEdpProgramme": null,
            "edpRegisteredTopic" : null,
            "edpRegisteredInstituteName": null,
            "edpRegisteredCourseName": null,
            "registeredEdpScheme": null,
            otherEdpScheme: null,
            otherRegisteredEdpScheme: null,
            otherSkillTrainingScheme: null
        },
        schemeData: [],
        yearsList: [],
        errors: {
            "formId": null,
            skillTrainingName: null,
            isRegisteredEdpProgramme: null,
            trainingInstitute: null,
            skillTrainingScheme: null,
            trainingDuration: null,
            courseName: null,
            edpRegisteredTopic : null,
            edpScheme: null,
            edpRegisteredInstituteName: null,
            edpRegisteredCourseName: null,
            registeredEdpScheme: null,
            isExperiencedEnterpreneur: null,
            enterpriseType: null,
            location: null,
            enterpreneurExpYears: null,
            designation: null
        },
        loading: false,
        cancelToken: axios.CancelToken.source(),
        init: true
    }
    componentDidMount() {
        this.getsymrmasterDetails()
    }
    componentWillUnmount() {
        const { cancelToken } = this.state;
        cancelToken.cancel();
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
                schemeData
            } = response.data.data
            this.setState({
                schemeData
            });
        }
        else toast(response.data.message, "error");
        this.setState({ loading: false })
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                skillAndEdpDetails: {
                    ...nextProps.skillAndEdpDetails
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { skillAndEdpDetails, errors } = this.state
        skillAndEdpDetails[name] = value
        errors[name] = undefined
        this.setState({ skillAndEdpDetails, errors, name }, () => this.handleCallBack(name))
    }

    handleCallBack = (name) => {
        let { skillAndEdpDetails } = this.state
        if (name === 'isExperiencedEnterpreneur' && !skillAndEdpDetails['isExperiencedEnterpreneur']) {
            skillAndEdpDetails['enterpriseType'] = null
            skillAndEdpDetails['location'] = null
            skillAndEdpDetails['enterpreneurExpYears'] = null
            skillAndEdpDetails['designation'] = null
        } else if (name === 'isRegisteredEdpProgramme' && !skillAndEdpDetails['isRegisteredEdpProgramme']) {
            skillAndEdpDetails['edpRegisteredInstituteName'] = null
            skillAndEdpDetails['registeredEdpScheme'] = null
            skillAndEdpDetails['edpRegisteredTopic'] = null
        }
        this.setState({ skillAndEdpDetails })
    }

    //services
    getDistrict = async () => {
        const { cancelToken, skillAndEdpDetails } = this.state;
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

    onSubmit = (e) => {
        e.preventDefault()
        let { skillAndEdpDetails, cancelToken,schemeData } = this.state
        let selectedScheme = schemeData.find(data => data.isOthers === true)?.value
        let validation = {
            ...inputValidations,
            /* ...(!skillAndEdpDetails['isSkillTrained'] ? {
                trainingInstitute: undefined,
                skillTrainingScheme: undefined,
                specifyOther: undefined,
                courseName: undefined,
                courseCompletionYear: undefined
            } : ''), */
            /* ...(!skillAndEdpDetails['isCompletedEdpProgramme'] ? {
                edpCompletedInstituteName: undefined,
                edpScheme: undefined,
                edpCompletedCourseName: undefined
            } : ''), */
            ...(!skillAndEdpDetails['isRegisteredEdpProgramme'] ? {
                edpRegisteredInstituteName: undefined,
                registeredEdpScheme: undefined,
                edpRegisteredTopic: undefined
            } : ''),
            ...(!skillAndEdpDetails['isExperiencedEnterpreneur'] ? {
                enterpriseType: undefined,
                location: undefined,
                enterpreneurExpYears: undefined,
                designation: undefined
            } : ''),
            /* ...(
                skillAndEdpDetails.skillTrainingScheme != selectedScheme ? { otherSkillTrainingScheme : undefined } : ''
                ), */
        }
        const notValid = validate(skillAndEdpDetails, validation);
        console.log(notValid, "notValid")
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            skillAndEdpDetails['formId'] = localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                { data: skillAndEdpDetails, stage },
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
                <SkillAndEdpForm {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                <Row className="producer-form-footer bg-white border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
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
                                    color="primary w-100 border-none " 
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
        ...state.common.symrMasterData
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(symr, dispatch);
};

const SkillAndEdp = connect(mapStateToProps, mapDispatchToProps)(SkillAndEdpClass)


let inputValidations = {

    trainingDuration: {
        presence: { allowEmpty: false, message: "^Training duration can't be blank" }
    },
    courseCompletionYear : {
        presence: { allowEmpty: false, message: "^Year of Completion can't be blank" }
    },
    skillTrainingName: {
        presence: { allowEmpty: false, message: "^Name of Skill Training can't be blank" }
    },
    trainingInstitute: {
        presence: { allowEmpty: false, message: "^Training institution /agency can't be blank" }
    },
    skillTrainingScheme: {
        presence: { allowEmpty: false, message: "^Scheme name can't be blank" }
    },
    isRegisteredEdpProgramme: {
        presence: { allowEmpty: false, message: "^Registered any Edp program can't be blank" }
    },
    edpRegisteredInstituteName: {
        presence: { allowEmpty: false, message: "^Institution name can't be blank" }
    },
    registeredEdpScheme: {
        presence: { allowEmpty: false, message: "^Scheme name can't be blank" }
    },
    edpRegisteredTopic : {
        presence: { allowEmpty: false, message: "^Topic can't be blank" }
    },
    isExperiencedEnterpreneur : {
        presence: { allowEmpty: false, message: "^Is experiended as entreprenuer can't be blank" }
    },
    enterpriseType : {
        presence: { allowEmpty: false, message: "^Enterprise type can't be blank" }
    },
    location : {
        presence: { allowEmpty: false, message: "^Location can't be blank" }
    },
    enterpreneurExpYears : {
        presence: { allowEmpty: false, message: "^Duration of experience can't be blank" }
    },
    designation : {
        presence: { allowEmpty: false, message: "^Designation can't be blank" }
    },

}

export { SkillAndEdp }