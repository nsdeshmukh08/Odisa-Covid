import React, { useEffect } from 'react'
import ProgressTab from 'component/Tabs/ProgressTab'
import * as ProductiveCollectiveForms from 'component/forms/applications/DiffabledVulnerable'
import CreateApplicationHOC from 'HOC/CreateApplication'
import { connect } from 'react-redux'
import * as iaActions from 'action/createApplication/IAapplication'
import { bindActionCreators } from 'redux'

let IACollectiveTab = [
  {
    label: 'Basic Details',
    activePathName: 1,
    component: 'BasicDetails',
  },
  {
    label: 'SHG Details',
    activePathName: 2,
    component: 'SHGDetails',
  },
  {
    label: 'Enterprise',
    activePathName: 3,
    component: 'EnterpriseActivity',
  },
  {
    label: 'Baseline Details',
    activePathName: 4,
    component: 'Baseline',
  },
  {
    label: 'Bank Details',
    activePathName: 5,
    component: 'BankDetails',
  },
  // {
  //     label: 'Proposal Activity',
  //     activePathName: 5,
  //     component : 'Activity'
  // },
  {
    label: 'Existing Loan',
    activePathName: 6,
    component: 'ExistingLoan',
  },
  {
    label: 'Loss Incrred',
    activePathName: 7,
    component: 'LossIncurred',
  },
  {
    label: 'Fund Requirement',
    activePathName: 8,
    component: 'FundRequirement',
  },

  {
    label: 'Upload Documents',
    activePathName: 9,
    component: 'Upload',
  },
]

const ProductiveCollectiveFormFunc = ({ ...props }) => {
  useEffect(() => {
    props.history.replace('/application/diffabledVulnerable/section/1')
    // props.getSYMRMasterData()
  }, [])

  let { stage } = props.match.params || {}
  let stepperDetails = IACollectiveTab.find(
    (data) => stage == data.activePathName,
  )
  if (!stepperDetails) return ''
  let Component = ProductiveCollectiveForms[stepperDetails.component]
  return (
    <>
      <ProgressTab
        tabs={IACollectiveTab}
        stagesCompleted={props.applicatonStagesCompletedList}
        {...props}
      />
      <Component key={stage} totalTabs={IACollectiveTab.length} {...props} />
    </>
  )
}

const mapStateToProps = (state) => {
  return state.common
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getIeMasterData: iaActions.getIeMasterData,
    },
    dispatch,
  )
}

const DiffabledVulnerableForm = CreateApplicationHOC(
  connect(mapStateToProps, mapDispatchToProps)(ProductiveCollectiveFormFunc),
)

export { DiffabledVulnerableForm }
