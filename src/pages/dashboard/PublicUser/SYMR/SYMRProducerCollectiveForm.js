import React,{ useEffect } from 'react';
import ProgressTab from 'component/Tabs/ProgressTab'
import * as ProductiveCollectiveForms from 'component/forms/applications/SYMR'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'
import * as symrAction from "action/createApplication/symr"
import { bindActionCreators } from "redux"

let ProducerCollectiveTab = [
    {
        label: 'Applicant Details',
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
        label: 'Skill & EDP',
        activePathName: 4,
        component : 'SkillAndEdp'
    },
    {
        label: 'Baseline Details',
        activePathName: 5,
        component : 'Baseline'
    },
    {
        label: 'Bank Details',
        activePathName: 6,
        component : 'BankDetails'
    },
    {
        label: 'Fund Requirement',
        activePathName: 7,
        component : 'FundRequirement'
    },
     {
        label: 'Existing Loan',
        activePathName: 8,
        component : 'ExistingLoan'
    },
    {
        label: 'Upload Documents',
        activePathName: 9,
        component : 'Upload'
    }
]

const ProductiveCollectiveFormFunc = ({ ...props }) => {

    useEffect(() => {
            props.history.replace('/application/symr/section/1')
            // props.getSYMRMasterData()
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

const SYMRProductiveCollectiveForm = CreateApplicationHOC(connect(mapStateToProps,mapDispatchToProps)(ProductiveCollectiveFormFunc))

export { SYMRProductiveCollectiveForm }