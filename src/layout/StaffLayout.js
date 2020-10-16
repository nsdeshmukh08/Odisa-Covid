import React, { Component } from 'react'
import StaffSidebar from 'component/Sidebar/StaffSidebar'
import { Container,Row,Col } from 'reactstrap'
import Loader from 'component/Loader'
import * as ProfileActions from 'action/profile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { history } from 'helpers'

let roleBasedLinks = {
    1 : ['profile','dashboard','userManagement','logout'],
    'default' : ['profile','dashboard','application','logout'],
    3 : ['profile','dashboard','application','logout'],
    getLink : function(roleId) {
        if(this[roleId])
            return this[roleId]
        else return this['default']
    }
}

class StaffLayoutClass extends Component {

    state = {
        showDetails: false,
        showEdit: false,
        cancelToken : axios.CancelToken.source(),
        links : []
    }

    componentDidMount() {
        const { cancelToken } = this.state
        this.props.updateAdminProfile(cancelToken.token)
    }

    componentWillUnmount() {
        const { cancelToken } = this.state
        cancelToken.cancel()
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.showStaffDetails !== prevState.showDetails)
            return {
                showDetails : nextProps.showStaffDetails
            }
        return null
    }

    getTogglerClassName = (role) => {
        let togglerName=''
        if(role === 1) togglerName='show-details' 
        else togglerName='show-details-md'
        return togglerName
    }

    render() {

        const { showDetails } = this.state

        let { children,loaders,profile } = this.props
        let isHomeSidebar;       // /staff/home
        if(history.location.pathname === "/staff/home" || history.location.pathname === "/staff" || history.location.pathname === "/staff/underConstruction"){
            // console.log(history.location.pathname,"history");
            isHomeSidebar = true;
        }else{
            isHomeSidebar = false;
        }

        if(loaders.isFetchingProfileDetails)
            return <Loader className="h-100"/>

        return (
            <Container fluid className={`p-0 h-100vh staff-dashboard-container ${showDetails ? this.getTogglerClassName(profile.role) : ''}`}>
                <Row className="h-100 m-0 flex-nowrap"noGutters>
                    <StaffSidebar {...this.props} isHomeSidebar={isHomeSidebar}/>
                    { children }
                </Row>
            </Container>
        )
    }
}

let mapStateToProps = ({profile,loaders,staff}) => {
    return {
        profile,
        loaders,
        ...staff.staffList
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ProfileActions,dispatch)
}

let StaffLayout = connect(mapStateToProps,mapDispatchToProps)(StaffLayoutClass)

export { StaffLayout }
