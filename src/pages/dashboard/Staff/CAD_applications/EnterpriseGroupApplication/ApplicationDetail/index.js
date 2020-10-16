import React, { Component, Fragment } from 'react'
import {ApplicationDetailHeader} from 'component/Header/Staff'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApplicationActions from "action/staff/manageApplication/enterpriseAppplication";
import _ from "lodash";
import Loaders from 'component/Loader'
import AssessmentCard from 'component/Cards/AssessmentCard'
import EnterpriseApplicationApprovalForm from 'component/forms/staff/application/openApplicationApproval/EnterpriseApplication'
import { EGWorkFlow } from 'component/workflow'
import StartNowCard from 'component/Cards/DottedStartNowCard'
import ArrowCollapse from 'component/Collapse/ArrowCollapse'
import EGForm from 'component/forms/staff/application/applicationDetails/enterpriseGroup'
import ViewCard from 'component/Cards/ViewCard'
import { STAFF_ROLE_ID,EG_FORM_MASTER_STATUS } from "helpers/variables"

class AssessmentDetails extends Component {
    state = {
        selectedApplicationId: null,
        selectedApplication: {},
        pcCoverageCalcualted: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.applications.selectedApplicationId !== prevState.selectedApplicationId)
            return {
                selectedApplication: nextProps.applications.list.find(data => data.formId === nextProps.applications.selectedApplicationId)
            }

        return null
    }

    getegServiceDetail = () => {
        const { selectedApplicationStatus } = this.props.applications
        let calculated;
        if (selectedApplicationStatus.pcAreaMember?.length) {
            calculated = selectedApplicationStatus.pcAreaMember.reduce((acc, value) => {
                acc.block += value.districtTotalBlock
                acc.totalMembers += value.districtTotalMember
                return acc
            }, {
                district: 0,
                block: 0,
                totalMembers: 0
            })
            calculated.district = selectedApplicationStatus.pcAreaMember.length
        }
        return calculated
    }

    getegCoverageDetail = () => {
        const { selectedApplicationStatus } = this.props.applications
        let calculated;
        if (selectedApplicationStatus.pcCoverageArea?.length) {
            calculated = selectedApplicationStatus.pcCoverageArea.reduce((acc, value) => {
                acc.block += value.noOfBlock
                acc.panchayat += value.coverageBlock.reduce((acc, val) => acc + val.coverageBlockTotal, 0)
                return acc
            }, {
                district: 0,
                block: 0,
                panchayat: 0
            })
            calculated.district = selectedApplicationStatus.pcCoverageArea.length
        }
        return calculated
    }

    render() {
        const {
            selectedApplication
        } = this.state
        const {
            isFetchingApplicationStatus,
            isFetchingApplicationDetail,
            isFetchingUpdateOpenApplication
        } = this.props.loaders

        const { role } = this.props.profile
        console.log('propsdata',this.props)
       const { applicationDetail, selectedApplicationStatus } = this.props.applications
       let {
        DRAFT,
        BMPU_OPEN_APPLICATION,
        DMPU_OPEN_APPLICATION,
        AMOUNT_DISBURSMENT,
        SUBMIT_UC,
        APPROVED,
        PENDING,
        DECLINED
    } = EG_FORM_MASTER_STATUS;
       let showWorkFlowForStatus = role === 3 ? [
           DRAFT, 
           AMOUNT_DISBURSMENT, 
           SUBMIT_UC, 
           APPROVED,
        //    DECLINED
        ] : 
        [
            DRAFT, 
            DMPU_OPEN_APPLICATION, 
            AMOUNT_DISBURSMENT, 
            SUBMIT_UC, 
            APPROVED, 
            // PENDING,
            // DECLINED
        ];
        return (

            <div className="staffDetails assesment-card custom-scrollbar">
                <ApplicationDetailHeader applicationDetail={selectedApplication} toggle={this.props.toggle} type="EG"/>
                <div className="assesment-card-body bg-white">

                    {
                        isFetchingApplicationStatus ?
                            <Loaders className="d-flex justify-content-center py-4 bg-white" />
                            : <div>
                                {
                                    [STAFF_ROLE_ID.BMMU, STAFF_ROLE_ID.DMMU].includes(role) ?
                                        <Fragment>
                                            <AssessmentCard

                                                type="eg"
                                                assessmentList={selectedApplicationStatus.egAssessment}
                                                formId={selectedApplicationStatus.formId}
                                            />
                                            {
                                                showWorkFlowForStatus.includes(selectedApplicationStatus.status)
                                                    ?
                                                    <Fragment>
                                                        <EGWorkFlow
                                                            {...this.props}
                                                            selectedApplicationStatus={selectedApplicationStatus}
                                                        />
                                                    </Fragment>

                                                    : ''
                                            }
                                            <EnterpriseApplicationApprovalForm
                                                {...this.props}
                                                isAssessmentCalculated={!selectedApplicationStatus.egAssessment?.length}
                                                isFetching={isFetchingUpdateOpenApplication}
                                                applicationStatusDetail={selectedApplicationStatus}
                                            />
                                        </Fragment> : ''
                                }{
                                    STAFF_ROLE_ID.SMMU == role ?
                                    <div className="mt-3">
                                        <EGWorkFlow
                                            {...this.props}
                                            selectedApplicationStatus={selectedApplicationStatus}
                                        />
                                    </div>
                                    :""
                                }
                            </div>
                    }

                </div>
                {
                    isFetchingApplicationDetail
                        ? <Loaders className="d-flex justify-content-center py-4 bg-white" />
                        : !isFetchingApplicationStatus
                            ? <ArrowCollapse name="Application Detail" applicationDetail={applicationDetail}>
                                <EGForm {...applicationDetail} />
                            </ArrowCollapse> : ''
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        applications: state.staff.applications,
        loaders: state.loaders,
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ApplicationActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentDetails);