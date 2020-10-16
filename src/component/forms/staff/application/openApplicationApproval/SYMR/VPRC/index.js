import React, { Component } from 'react';
import { SYMR_FORM_MASTER_STATUS } from 'helpers/variables'
import BasicApproval from './basicApproval'
import AmountDisbursement from './amountDisbursement'
import UCSubmit from './ucSubmit'
import PendingApproval from './PendingApproval'
import axios from 'axios'
import { components } from 'react-select';

class DPMU_APPROVAL extends Component {

    state = {
        cancelToken: axios.CancelToken.source()
    }

    onApprove = (data) => {
        const { cancelToken } = this.state
        this.props.updateOpenApplicationStatus(data, cancelToken.token)
    }

    getFormBasedOnStatus = () => {
        let status = this.props.applicationStatusDetail.status
        let component = '';
        switch (status) {
            case SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION:
                component = BasicApproval
                break;
            case SYMR_FORM_MASTER_STATUS.PENDING:
                component = PendingApproval
                break;
            case SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT:
                component = AmountDisbursement
                break;
            case SYMR_FORM_MASTER_STATUS.SUBMIT_UC:
                component = UCSubmit
                break;
        }
        return component
    }

    render() {

        let ApprovalComponent = this.getFormBasedOnStatus()
        const { status } = this.props.applicationStatusDetail
        if (!ApprovalComponent) return ''
        return (
            <ApprovalComponent onApprove={this.onApprove} status={status} {...this.props} applicationDetail={this.props.applicationDetail}/>
        );
    }
}

export default DPMU_APPROVAL