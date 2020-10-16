import React, { Component } from 'react';
import BasicApproval from './basicApproval'
import FirstTranche from './FirstTranche'
import SecondTranche from './secondTrache'
import SecondUCApproval from './secondTrancheUc'
import PendingApproval from './PendingApproval'
import axios from 'axios'

class ProducerGroup extends Component {

    state = {
        cancelToken: axios.CancelToken.source()
    }

    onApprove = (data) => {
        const { cancelToken } = this.state
        // console.log(data,"___________________***********")
        this.props.updateDmpuOpenApplicationStatus(data,cancelToken.token)
    }
    
    getFormBasedOnStatus = () => {
        let status = this.props.applicationStatusDetail.status 
        let component='';
        switch(status){
            case 3:
                component=BasicApproval
                break;
            case 4:
                component=FirstTranche
                break;
            case 5:
                component=SecondTranche
                break;
            case 7:
                component=PendingApproval
                break;
        }
        return component
    }

    render() { 
        let { applicationStatusDetail} = this.props
        let ApprovalComponent = this.getFormBasedOnStatus()
        if(!ApprovalComponent) return ''
        return ( 
            <ApprovalComponent applicationStatusDetail={applicationStatusDetail} {...this.props} onApprove={this.onApprove}/>
         );
    }
}

export default ProducerGroup