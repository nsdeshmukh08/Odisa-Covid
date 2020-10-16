import React,{ useEffect } from 'react';
import ProgressTab from 'component/Tabs/ProgressTab'
import * as EnterpriseGroupCollectiveForms from 'component/forms/applications/EnterpriseGroup'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'

let EnterPriseGroupTabs = [
    {
        label: 'Basic Details',
        activePathName: 1,
        component : 'BasicDetails'
    },
    {
        label: 'EG Details',
        activePathName: 2,
        component : 'Details'
    },
    {
        label: 'Members',
        activePathName: 3,
        component : 'Members'
    },
    {
        label: 'Amount Received',
        activePathName: 4,
        component : 'Amount'
    },
    {
        label: 'Bank Details',
        activePathName: 5,
        component : 'BankDetails'
    },
    {
        label: 'Proposal Activity',
        activePathName: 6,
        component : 'Activity'
    },
    {
        label: 'Upload Documents',
        activePathName: 7,
        component : 'Upload'
    }
]

const EnterpriseCollectiveFormFunc = ({ ...props }) => {

    useEffect(() => {
            props.history.replace('/application/enterpriseGroup/section/1')
    },[])

    let pathname=props.location.pathname
    let componentName = EnterPriseGroupTabs.find(data => pathname.includes(data.activePathName))?.component
    if(!componentName) return ''
    let Component = EnterpriseGroupCollectiveForms[componentName]
    return ( 
        <>
            <ProgressTab 
                tabs={EnterPriseGroupTabs}
                stagesCompleted={props.applicatonStagesCompletedList}
                { ...props }
            />
            <Component 
                key={pathname}
                totalTabs={EnterPriseGroupTabs.length}
                { ...props }
            />
        </>
     );
}

const mapStateToProps = (state) => {
    return state.common
}

const EnterpriseGroupForm = CreateApplicationHOC(connect(mapStateToProps,null)(EnterpriseCollectiveFormFunc))

export  { EnterpriseGroupForm }