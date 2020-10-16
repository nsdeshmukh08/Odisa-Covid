import React, { Component } from 'react';
import BasicApproval from './basicApproval'
import AmountDisbursement from './AmountDisbursement'
import SubmitUC from './submitUC'
import PendingApproval from './PendingApproval'
import axios from 'axios'

class ProducerGroup extends Component {

    state = {
        cancelToken: axios.CancelToken.source()
    }

    onApprove = (data) => {
        const { cancelToken } = this.state
        this.props.updateDMMUOpenApplicationStatus(data,cancelToken.token)
    }

    onAmountDisbursement = (data) =>{
        const { cancelToken } = this.state
        // console.log(data,this.props,"----------------")
        this.props.updatePgAmountDisbursment(data,cancelToken.token)
    }

    onUcDisbursement = (data) =>{
        const { cancelToken } = this.state
        // console.log(data,this.props,"----------------")
        this.props.updatePgUcDisbursment(data,cancelToken.token)
    }

    getFormBasedOnStatus = () => {
        let status = this.props.applicationStatusDetail.status 
        // console.log(status,"status in DMMU forms INDEX(__________",this.props)
        // status = 4;
        let component='';
        switch(status){
            case 3:
                component=BasicApproval
                break;
            case 4:
                component=AmountDisbursement
                break;
            case 7:
                component=PendingApproval
                break;
            case 5:
                component = SubmitUC;
                break;
        }
        return component
    }

    render() {
        let ApprovalComponent = this.getFormBasedOnStatus()
        if(!ApprovalComponent) return ''
        return ( 
            <ApprovalComponent 
                {...this.props.applications} 
                {...this.props}
                onAmountDisbursement={this.onAmountDisbursement}
                onUcDisbursement= {this.onUcDisbursement} 
                onApprove={this.onApprove}
            />
         );
    }
}

export default ProducerGroup