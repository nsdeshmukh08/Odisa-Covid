import React, { Component } from 'react'
import { PublicUserNavbar } from 'component/Navbar'
import Loader from 'component/Loader'
import * as ProfileActions from 'action/profile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

class UserLayoutClass extends Component {

    state = {
        cancelToken : axios.CancelToken.source()
    }

    componentDidMount() {
        const { cancelToken } = this.state
        this.props.updateProfile(cancelToken.token)
    }

    render() {


        let { children,loaders } = this.props

        if(loaders.isFetchingProfileDetails)
            return <Loader className="h-100"/>

        return (
            <>  
                <PublicUserNavbar {...this.props}/>
                { children }
            </>
        )
    }
}

let mapStateToProps = ({profile,loaders}) => {
    return {profile,loaders}
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ProfileActions,dispatch)
}

let UserLayout = connect(mapStateToProps,mapDispatchToProps)(UserLayoutClass)

export { UserLayout }
