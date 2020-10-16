import React,{ useEffect } from 'react';
import ProgressTab from 'component/Tabs/ProgressTab'
import * as ProductiveCollectiveForms from 'component/forms/applications/IndividualEnterprise'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'
import * as symrAction from "action/createApplication/symr"
import { bindActionCreators } from "redux"

let ProducerCollectiveTab = [
    {
        label: 'Basic Details',
        activePathName: 1,
        component : 'BasicDetails'
    },
    {
        label: 'SHG Details',
        activePathName: 2,
        component : 'SHGDetails'
    },
    {
        label: 'Enterprise',
        activePathName: 3,
        component : 'EnterpriseActivity'
    },
    {
        label: 'Baseline Details',
        activePathName: 4,
        component : 'Baseline'
    },
    {
        label: 'Bank Details',
        activePathName: 5,
        component : 'BankDetails'
    },
    {
        label: 'Existing Loan',
        activePathName: 6,
        component : 'ExistingLoan'
    },
    {
        label: 'Loss Incrred',
        activePathName: 7,
        component : 'LossIncurred'
    },
    {
        label: 'Fund Requirement',
        activePathName: 8,
        component : 'FundRequirement'
    },
    
    {
        label: 'Upload Documents',
        activePathName: 9,
        component : 'Upload'
    }
]

const ProductiveCollectiveFormFunc = ({ ...props }) => {

    useEffect(() => {
          
    },[])

    let { stage } = props.match.params || {}    
    let stepperDetails = ProducerCollectiveTab.find(data => stage==data.activePathName)
    if(!stepperDetails) return ''
    let Component = ProductiveCollectiveForms[stepperDetails.component]
    return ( 
        <>
            <ProgressTab 
                tabs={ProducerCollectiveTab}
                stagesCompleted={props.applicatonStagesCompletedList}
                { ...props }
            />
            <Component 
                key={stage}
                totalTabs={ProducerCollectiveTab.length}
                { ...props }
            />
        </>
     );
}

const mapStateToProps = (state) => {
    return state.common
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getSYMRMasterData:symrAction.getSYMRMasterData
    }, dispatch)
}

const IndividualEnterpriseForm = CreateApplicationHOC(connect(mapStateToProps,mapDispatchToProps)(ProductiveCollectiveFormFunc))

export { IndividualEnterpriseForm }