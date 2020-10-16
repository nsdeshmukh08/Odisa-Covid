import React, { Component } from 'react'
import { PublicUserNavbar } from 'component/Navbar'
import Loader from 'component/Loader'
import * as ProfileActions from 'action/profile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { getApplicationType } from "helpers/index.js"
class UserLayoutClass extends Component {

    state = {
        cancelToken : axios.CancelToken.source(),
        headerDetails:[
            {
            applicationType:'productiveCollective',
            label:'Producer Collective',
            tamilLabel : 'தயாரிப்பாளர் கூட்டு'
            },
            {
                applicationType:'symr',
                label:'Skilled Youth Migrant Returnee',
                tamilLabel : 'திறமையான இளைஞர் குடியேறியவர்'
            },
            {
                applicationType:'producerGroup',
                label:'Producer Group',
                tamilLabel : 'தயாரிப்பாளர் குழு'
            },
            {
                applicationType : 'enterpriseGroup',
                label : 'Enterprise Group',
                tamilLabel : 'நிறுவன குழு'
            },
            {
                applicationType : 'individualEnterpriseGroup',
                label : 'Individual Enterprise Group',
                tamilLabel : 'நிறுவன குழு'
            },
            {
                applicationType : 'diffabledVulnerable',
                label : 'Diff Abled & Vulnerable',
                tamilLabel : 'நிறுவன குழு'
            }
        ]
    }

    componentDidMount() {
        const { cancelToken } = this.state
        this.props.updateProfile(cancelToken.token)
    }

    getTitle = () =>{

        let { headerDetails } = this.state

        let title = (headerDetails.find(({applicationType})=>applicationType==getApplicationType()) || { label:'' })
        return title

    }

    render() {


        let { children,loaders } = this.props
        // console.log(children,"children")
        if(loaders.isFetchingProfileDetails)
            return <Loader className="h-100"/>

        return (
            <>  
                <PublicUserNavbar heading={this.getTitle()} {...this.props}/>
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

let UserApplicationLayout = connect(mapStateToProps,mapDispatchToProps)(UserLayoutClass)

export { UserApplicationLayout }
