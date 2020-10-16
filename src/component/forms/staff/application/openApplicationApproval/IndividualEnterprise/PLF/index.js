import React, { Component } from 'react';
import { SYMR_FORM_MASTER_STATUS } from 'helpers/variables'
import BasicApproval from './basicApproval'
import AmountDisbursment from './amountDisbursement'
import UCSubmit from './ucSubmit'

import axios from 'axios'
import { components } from 'react-select';

class IE_APPROVAL extends Component {

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
        // export const IE_FORM_MASTER_STATUS = {
        //     DRAFT: 1,
        //     OPEN_APPLICATION: 2,
        //     PENDING: 3,
        //     AMOUNT_DISBURSMENT: 4,
        //     SUBMIT_UC: 5,
        //     APPROVED: 6,
        //     DECLINED: 7
        // };
        status = 2;
        switch (status) {
            case SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION:
            // case SYMR_FORM_MASTER_STATUS.PENDING:
                component = BasicApproval
                break;
            case SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT:
                component = AmountDisbursment
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

export default IE_APPROVAL