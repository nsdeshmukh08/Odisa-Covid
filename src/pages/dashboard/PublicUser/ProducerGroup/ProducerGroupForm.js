import React,{ useEffect } from 'react';
import ProgressTab from 'component/Tabs/ProgressTab'
import * as ProductiveCollectiveForms from 'component/forms/applications/ProductGroup'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'

let ProducerGroupTabs = [
    {
        label: 'Basic Details',
        activePathName: 1,
        component : 'BasicDetails'
    },
    {
        label: 'SHG Details',
        activePathName: 2,
        component : 'Details'
    },
    {
        label: 'Members',
        activePathName: 3,
        component : 'Members'
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
        label: 'Loss Inoccurred',
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
            props.history.replace('/application/producerGroup/section/1')
    },[])

    let pathname=props.location.pathname
    let componentName = ProducerGroupTabs.find(data => pathname.includes(data.activePathName))?.component
    if(!componentName) return ''
    let Component = ProductiveCollectiveForms[componentName]

    return ( 
        <>
            <ProgressTab 
                tabs={ProducerGroupTabs}
                stagesCompleted={props.applicatonStagesCompletedList}
                { ...props }
            />
            <Component 
                key={pathname}
                totalTabs={ProducerGroupTabs.length}
                { ...props }
            />
        </>
     );
}

const mapStateToProps = (state) => {
    return state.common
}

const ProducerGroupForm = CreateApplicationHOC(connect(mapStateToProps,null)(ProductiveCollectiveFormFunc))

export  { ProducerGroupForm }