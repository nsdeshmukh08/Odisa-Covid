import React, { Component, Fragment } from 'react'
import { ApplicationDetailHeader } from 'component/Header/Staff'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApplicationActions from "action/staff/manageApplication/symrApplication";
import _ from "lodash";
import Loaders from 'component/Loader'
import AssessmentCard from 'component/Cards/AssessmentCard'
import SYMRApprovalForm from 'component/forms/staff/application/openApplicationApproval/SYMR'
import { SYMRWorkFlow } from 'component/workflow'
import ArrowCollapse from 'component/Collapse/ArrowCollapse'
import SymrDetails from 'component/forms/staff/application/applicationDetails/symrDetails'
import ViewCard from 'component/Cards/ViewCard'
import { SYMR_DISBURSEMENT_TABS } from 'helpers/variables'
import { STAFF_ROLE_ID } from 'helpers/variables'
import profile from 'reducer/profile';

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

    getPcServiceDetail = () => {
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

    getPcCoverageDetail = () => {
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
        const { profile } = this.props
        const { applicationDetail, selectedApplicationStatus } = this.props.applications

        let pcServiceCalculated = this.getPcServiceDetail()
        let pcCoverageCalculated = this.getPcCoverageDetail()


        return (

            <div className="staffDetails assesment-card custom-scrollbar">
                <ApplicationDetailHeader 
                    type="SYMR" 
                    applicationDetail={selectedApplication} 
                    toggle={this.props.toggle} 
                />
                <div className="assesment-card-body bg-white">

                    {
                        isFetchingApplicationStatus ?
                            <Loaders className="d-flex justify-content-center py-4 bg-white" />
                            : <div>
                                {
                                    STAFF_ROLE_ID.CLF === profile.role ? 
                                    <Fragment>
                                            <AssessmentCard 
                                                className={`
                                                ${
                                                    (pcCoverageCalculated||pcServiceCalculated) 
                                                    ? 'light-theme '
                                                    :''}`
                                                } 
                                                type="symr"
                                                assessmentList={selectedApplicationStatus.symrAssessment}
                                                formId={selectedApplicationStatus.formId} 
                                            />
                                            {
                                            SYMR_DISBURSEMENT_TABS.includes(selectedApplicationStatus.status)
                                                    ?
                                                    <Fragment>
                                                        <SYMRWorkFlow
                                                            {...this.props}
                                                            selectedApplicationStatus={selectedApplicationStatus}
                                                        />
                                                    </Fragment>

                                                    : ''
                                            }
                                            <SYMRApprovalForm
                                                {...this.props}
                                                isAssessmentCalculated={!selectedApplicationStatus.symrAssessment?.length}
                                                isFetching={isFetchingUpdateOpenApplication}
                                                applicationStatusDetail={selectedApplicationStatus}
                                                applicationDetail={applicationDetail}
                                            />
                                    </Fragment> : ''
                                }
                                {
                                    STAFF_ROLE_ID.SMMU == profile.role ? 
                                    <div className="mt-3">

                                    <SYMRWorkFlow
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
                                <SymrDetails {...applicationDetail} />
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
        profile:state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ApplicationActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentDetails);