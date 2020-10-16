import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ApplicationMangement from './ApplicationManagement'
import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as StaffActions from 'action/staff/adminDashboard';
import ApplicationDetail from './ApplicationDetail'

class SYMRApplicationClass extends Component {

    state = {
        showDetails: false,
        showEdit: false,
        cancelToken : axios.CancelToken.source()
    }

    componentWillUnmount() {
        const { cancelToken } = this.state
        cancelToken.cancel()
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.showStaffDetails !== prevState.showDetails)
            return {
                showDetails : nextProps.showStaffDetails,
                showEdit : false
            }
        return null
    }

    //UTILS

    toggle = (name) => {
        this.setState((state) => ({
            [name]: !state[name]
        }))
    }

    render() {

        const { showDetails, showEdit } = this.state

        return (
            <>
                <Col auto className="user-list bg-white">
                    <div className="mx-1">
                        <ApplicationMangement 
                            toggle={() => this.props.toggleStaffDetails()} 
                            isDetailMode={ showDetails } {...this.props}
                        />
                    </div>
                </Col>
                <ApplicationDetail
                    showDetails={showDetails}
                    toggle={() => this.props.toggleStaffDetails()} 
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state.staff.staffList
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(StaffActions,dispatch)
}

const SYMRApplication = connect(
    mapStateToProps,
    mapDispatchToProps
)(SYMRApplicationClass)

export {SYMRApplication}