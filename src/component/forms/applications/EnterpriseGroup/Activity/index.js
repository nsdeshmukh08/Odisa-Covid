import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/enterpriseGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import ActivityForm from './ActivityForm';
// import egFormProposedActivity from 'reducer/publicUser/application/new/enterpriseGroup/egFormProposedActivity';

class ActivityClass extends Component {

    defaultActivityObject = {
        formId : localStorage.getItem('createAppformId'),
        "activityName": null,
        "activityTimeLine": undefined,
        "activityTimeLineVal": undefined,
        "amtReq": undefined
    }

    state = {
        egFormProposedActivity: [],
        init : true,
        cancelToken: axios.CancelToken.source(),
    }

    componentDidMount() {
        this.initialize()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps.egFormProposedActivity, "asdasd")
        if (prevState.init)
            return {
                egFormProposedActivity: nextProps.egFormProposedActivity,
                init: false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value,index) => {
        let { egFormProposedActivity } = this.state
        egFormProposedActivity[index][name] = value
        this.setState({ egFormProposedActivity })
    }

    //INITIALIZE

    initialize = () => {
        let { egFormProposedActivity } = this.state
        if(egFormProposedActivity && egFormProposedActivity.length === 0){
            egFormProposedActivity.push({...this.defaultActivityObject})
            this.setState({ egFormProposedActivity })
        }
    }

    onAddOrRemoveActivity = (index = null) => {
        let { egFormProposedActivity } = this.state
        if (index === null) {
            egFormProposedActivity.push(Object.assign({}, this.defaultActivityObject))
        }
        else {
            egFormProposedActivity = egFormProposedActivity.filter((data, i) => index !== i)
        }
        this.setState({
            egFormProposedActivity
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { egFormProposedActivity,cancelToken } = this.state
        const isValid = egFormProposedActivity.every(data => data.activityName && data.activityTimeLine && data.activityTimeLineVal && data.amtReq)
        if (!isValid) {
            toast('Enter the details','error')
        } else if(Object.keys(egFormProposedActivity).length <= 0) {
            toast('Enter at least one activity','error')
        }else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            egFormProposedActivity['formId']=localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                {data:egFormProposedActivity,stage},
                cancelToken.token
            )
        }
    }

    render() {
        const { location } = this.props;
        let pathname = location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1));
        return (
            <form className="container theme-one-common  mt-3 bg-white" onSubmit={this.onSubmit}>
                <ActivityForm 
                    {...this.state} 
                    onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                    onChange={this.onChange}
                />
                <Row className="producer-form-footer bg-white p-4 border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button outline color="lighGrey-2 w-100 border-none" className="fw-600">Previous</Button>
                                </Link>
                            </Col>
                            <Col>
                                    <Button color="primary w-100 border-none" className="fw-600" type="submit">
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
    return state.publicUser.application.newApp.enterpriseGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Activity = connect(mapStateToProps, mapDispatchToProps)(ActivityClass)

export { Activity }