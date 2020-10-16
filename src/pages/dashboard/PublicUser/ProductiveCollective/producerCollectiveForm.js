import React,{ useEffect } from 'react';
import ProgressTab from 'component/Tabs/ProgressTab'
import * as ProductiveCollectiveForms from 'component/forms/applications/ProductiveCollective'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'

let ProducerCollectiveTab = [
    {
        label: 'Basic Details',
        activePathName: 1,
        component : 'BasicDetails'
    },
    {
        label: 'Producer Collective Details',
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

const ProductiveCollectiveFormFunc = ({ ...props }) => {

    useEffect(() => {
            props.history.replace('/application/productiveCollective/section/1')
    },[])

    let pathname=props.location.pathname
    let componentName = ProducerCollectiveTab.find(data => pathname.includes(data.activePathName))?.component
    if(!componentName) return ''
    let Component = ProductiveCollectiveForms[componentName]

    return ( 
        <>
            <ProgressTab 
                tabs={ProducerCollectiveTab}
                stagesCompleted={props.applicatonStagesCompletedList}
                { ...props }
            />
            <Component 
                key={pathname}
                totalTabs={ProducerCollectiveTab.length}
                { ...props }
            />
        </>
     );
}

const mapStateToProps = (state) => {
    return state.common
}

const ProductiveCollectiveForm = CreateApplicationHOC(connect(mapStateToProps,null)(ProductiveCollectiveFormFunc))

export { ProductiveCollectiveForm }