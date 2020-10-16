import React, { Component } from 'react';
import BasicApproval from './basicApproval'
import FirstTranche from './FirstTranche'
import SecondTranche from './secondTrache'
import SecondUCApproval from './secondTrancheUc'
import PendingApproval from './PendingApproval'
import axios from 'axios'

class DMMU_APPROVAL extends Component {

    state = {
        cancelToken: axios.CancelToken.source()
    }

    onApprove = (data) => {
        const { cancelToken } = this.state
        this.props.updateOpenApplicationStatus(data,cancelToken.token)
    }

    getFormBasedOnStatus = () => {
        let status = this.props.applicationStatusDetail.status 
        let component='';
        switch(status){
            case 2:
                component=BasicApproval
                break;
            case 3:
                component=PendingApproval
                break;
            case 4:
                component=FirstTranche
                break;
            case 5:
                component=SecondTranche
                break;
            case 6:
                component=SecondUCApproval
                break;
        }
        return component
    }

    render() { 
        let ApprovalComponent = this.getFormBasedOnStatus()
        if(!ApprovalComponent) return ''
        return ( 
            <ApprovalComponent onApprove={this.onApprove} {...this.props}/>
         );
    }
}

export default DMMU_APPROVAL
