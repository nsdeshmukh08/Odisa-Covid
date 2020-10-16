import React, { Component } from 'react';
import { Col } from 'reactstrap';
import UserList from './UserList'
import UserDetails from './UserDetails'
import EditUserDetails from './EditUserDetails'
import { axios } from 'service'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as StaffActions from 'action/staff/adminDashboard';

class UserManagementClass extends Component {

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
                <Col auto className="my-4 user-list">
                    <UserList 
                        toggle={() => this.props.toggleStaffDetails()} 
                        isDetailMode={ showDetails } {...this.props}
                    />
                </Col>
                <UserDetails 
                    showDetails={showDetails} 
                    toggleEditUser={() => this.toggle('showEdit')}
                    close={() => this.toggle('showDetails')}
                    
                />
                <EditUserDetails
                    showEditUser={showEdit}
                    toggle={() => this.toggle('showDetails')}
                    close={() => this.toggle('showEdit')}
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

const UserManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementClass)

export {UserManagement}