import React, { Component } from 'react';
import BasicApproval from './basicApproval'
import axios from 'axios'

class ProducerGroup extends Component {

    state = {
        cancelToken: axios.CancelToken.source()
    }

    onApprove = (data) => {
        const { cancelToken } = this.state;
        this.props.updateOpenApplicationStatus(data,cancelToken.token)
    }

    getFormBasedOnStatus = () => {
        let status = this.props.applicationStatusDetail.status 
        let component='';
        switch(status){
            case 2:
                component=BasicApproval
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

export default ProducerGroup