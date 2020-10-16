import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom';
import validate from "helpers/validation";
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import moment from "moment";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import MemebersForm from './MembersForm'

let initialState = {
    "formId": null,
    "activeInactiveTotal": null,
    "noOfMale": null,
    "noOfFemale": null,
    "noOfTransGender": null,
    "PwdnoOfMale": null,
    "PwdnoOfFemale": null,
    "PwdnoOfTransGender": null,
    "genderTotal": null,
    "PwdGendertotal": null,
    "noOfGen": null,
    "noOfSEBC": null,
    "noOfSC": null,
    "noOfST": null,
    "noOfCommunityOthers": null,
    "communityTotal": null,
    "noOfMinorityOthers": null,
    "minorityTotal": null,
    
}
export class MembersClass extends Component {
    state = {
        pgFormMembers: {
           ...initialState
        },
        errors: {},
        cancelToken: axios.CancelToken.source(),
        loading: false,
        init : true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                pgFormMembers: {
                    ...nextProps.pgFormMembers,
                },
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value, section) => {
        // console.log(name,value,"in MEMBERS");
        let { pgFormMembers, errors } = this.state
        pgFormMembers[name] = value
        errors[name] = undefined
        errors[section]=undefined
        this.setState({ pgFormMembers, errors }, () => this.handleCallBack(section, name, value))
    }

    handleCallBack = (section, name) => {
        let { pgFormMembers, errors } = this.state
        if(section === 'totalMembers'){
            pgFormMembers = {
                ...initialState,
                totalMembers : pgFormMembers.totalMembers
            }
            errors={
                totalMembers :errors.totalMembers
            }
            this.setState({
                pgFormMembers,
                errors
            })
        }
        else{
            let fieldGroups = {
                'activeInactiveTotal': ['noOfActive', 'noOfInActive'],
                "genderTotal": ["noOfMale", "noOfFemale", "noOfTransGender"],
                "PwdGendertotal": ["PwdnoOfMale", "PwdnoOfFemale", "PwdnoOfTransGender"],
                "communityTotal": ["noOfGen", "noOfSEBC", "noOfSC", "noOfST", "noOfCommunityOthers"],
                "minorityTotal": ["noOfMuslim", "noOfChristians", "noOfMinorityOthers"],
                "vulnerableTotal": ["noOfDiffAbled", "noOfWidow", "noOfDesitute", "noOfDeserted", "noOfTransGender", "noOfEiderly"],
                "shgTotal": ["noOfSHGMembers",'noOfNonSHGTotal', "noOfSHGTotal"]
            }
            let fields = fieldGroups[section]
            pgFormMembers[section] = fields.filter(data => pgFormMembers[data]).reduce((acc, value) => {
                return acc + parseInt(pgFormMembers[value])
            }, 0)
            this.setState({
                pgFormMembers
            })
        }

    }

    onSubmit = (e) => {
        e.preventDefault()
        let { pgFormMembers, cancelToken } = this.state
        const notValid = validate(pgFormMembers, inputValidations);
        console.log(notValid, "notValid")
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            this.props.history.push((stage + 1).toString())
            pgFormMembers['formId'] = localStorage.getItem('createAppformId')
            this.props.updateForm(
                { data: pgFormMembers, stage },
                cancelToken.token
            )

        }
    }
    render() {

        const { location,pgFormMembers } = this.props;
        let pathname = location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
        // console.log(pgFormMembers,"formMemeber123")
        return (
            <form className="container  theme-one-common mt-3 bg-white p-4" onSubmit={this.onSubmit}>
                <MemebersForm {...this.state} onChange={this.onChange}/>
                <Row className="producer-form-footer bg-white  border-top align-items-center">
                    <Col md="7" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button
                                        type="button" 
                                        outline 
                                        color="lighGrey-2 w-100 border-none mb-3" 
                                        className="fw-600"
                                    >
                                        Previous
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button 
                                    color="primary w-100 border-none mb-3" 
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
    return state.publicUser.application.newApp.producerGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersClass)

export { Members }


let inputValidations = {
    // totalMembers : {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^Total Members can't be blank"
    //     }
    // },
    // noOfActive: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of Active can't be blank"
    //     }
    // },
    // noOfInActive: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "No of Inactive can't be blank"
    //     }
    // },
    // activeInactiveTotal: {
    //     validateMembers : {
    //         shouldMatch : 'totalMembers',
    //         fields : ['noOfActive','noOfInActive']
    //     }
    // },
    noOfMale: {
        presence: {
            allowEmpty: false,
            message: "^No of male can't be blank"
        }
    },
    noOfFemale: {
        presence: {
            allowEmpty: false,
            message: "^No of female can't be blank"
        }
    },
    noOfTransGender: {
        presence: {
            allowEmpty: false,
            message: "^No of transgender can't be blank"
        }
    },
    genderTotal: {
        validateMembers : {
            shouldMatch : 'totalMembers',
            fields : ['noOfMale','noOfFemale','noOfTransGender']
        }
    },
    PwdGendertotal: {
        validateMembers : {
            shouldMatch : 'totalMembers',
            fields : ['PwdnoOfMale','PwdnoOfFemale','PwdnoOfTransGender']
        }
    },
    noOfGen: {
        presence: {
            allowEmpty: false,
            message: "^Gen can't be blank"
        }
    },
    noOfSEBC: {
        presence: {
            allowEmpty: false,
            message: "^SEBC can't be blank"
        }
    },
    noOfSC: {
        presence: {
            allowEmpty: false,
            message: "^SC can't be blank"
        }
    },
    noOfST: {
        presence: {
            allowEmpty: false,
            message: "^ST can't be blank"
        }
    },

    // noOfCommunityOthers: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^others can't be blank"
    //     }
    // },
    communityTotal: {
        validateMembers : {
            shouldMatch : 'totalMembers',
            fields : ['noOfGen','noOfSEBC','noOfSC','noOfST','noOfCommunityOthers']
        }
    },
    noOfMinorityOthers: {
        presence: {
            allowEmpty: false,
            message: "^No of minority can't be blank"
        }
    },
    minorityTotal: {
        validateIsLesserThan : {
            shouldLesserThan : 'totalMembers',
            fields : ['noOfMuslim','noOfChristians','noOfMinorityOthers']
        }
    },
    // noOfDiffAbled: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of differntly abled can't be blank"
    //     }
    // },
    // noOfWidow: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of widow can't be blank"
    //     }
    // },
    // noOfDesitute: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of Destitute can't be blank"
    //     }
    // },
    // noOfDeserted: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of deserted can't be blank"
    //     }
    // },
    // noOfEiderly: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of elderly can't be blank"
    //     }
    // },
    // vulnerableTotal: {
    //     validateIsLesserThan : {
    //         shouldLesserThan : 'totalMembers',
    //         fields : [
    //             'noOfDiffAbled',
    //             'noOfWidow',
    //             'noOfDesitute',
    //             'noOfDeserted',
    //             'noOfTransGender',
    //             'noOfEiderly'
    //         ]
    //     }
    // },
    // noOfSHGMembers: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of SHG can't be blank"
    //     }
    // },
    // noOfSHGTotal: {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of SHG total can't be blank"
    //     }
    // },
    // noOfNonSHGTotal : {
    //     presence: {
    //         allowEmpty: false,
    //         message: "^No of Non SHG total can't be blank"
    //     }
    // },
    // shgTotal: {
    //     validateMembers : {
    //         shouldMatch : 'totalMembers',
    //         fields : ['noOfSHGMembers','noOfNonSHGTotal','noOfSHGTotal']
    //     }
    // },
}