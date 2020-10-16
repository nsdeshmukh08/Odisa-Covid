import React, { Component, Fragment } from 'react'
import { ApplicationDetailHeader } from 'component/Header/Staff'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApplicationActions from "action/staff/manageApplication";
import _ from "lodash";
import Loaders from 'component/Loader'
import AssessmentCard from 'component/Cards/AssessmentCard'
import IEApprovalForm from 'component/forms/staff/application/openApplicationApproval/IndividualEnterprise'
import { IEWorkFlow } from 'component/workflow'
import StartNowCard from 'component/Cards/DottedStartNowCard'
import ArrowCollapse from 'component/Collapse/ArrowCollapse'
import IEDetails from 'component/forms/staff/application/applicationDetails/ieDetails'
import ViewCard from 'component/Cards/ViewCard'
import { STAFF_ROLE_ID } from 'helpers/variables'

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

        return (

            <div className="staffDetails assesment-card custom-scrollbar">
                <ApplicationDetailHeader type = "IE" applicationDetail={selectedApplication} toggle={this.props.toggle} />
                <div className="assesment-card-body bg-white">

                    {
                        isFetchingApplicationStatus ?
                            <Loaders className="d-flex justify-content-center py-4 bg-white" />
                            : <div>
                                
                                {
                                    [STAFF_ROLE_ID.GPLF].includes(profile.role) ? 
                                    <Fragment>
                                        <AssessmentCard 
                                            className="light-theme" 
                                            type="ie"
                                            assessmentList={selectedApplicationStatus.pcAssessment}
                                            formId={selectedApplicationStatus.formId} 
                                        />
                                    
                                        {
                                            // [4, 5, 6, 7].includes(selectedApplicationStatus.status)
                                            //     ?
                                                <Fragment>
                                                    <IEWorkFlow
                                                        {...this.props}
                                                        selectedApplicationStatus={selectedApplicationStatus}
                                                    />
                                                </Fragment>

                                                // : ''
                                        }
                                        <IEApprovalForm
                                            {...this.props}
                                            isAssessmentCalculated={!selectedApplicationStatus?.ieAssessment?.length}
                                            isFetching={isFetchingUpdateOpenApplication}
                                            applicationStatusDetail={selectedApplicationStatus}
                                            applicationDetail={applicationDetail}
                                        />
                                    </Fragment>
                                     : ''
                                }
                                {
                                    STAFF_ROLE_ID.SMMU == profile.role ? 
                                    <div className="mt-3">
                                    <IEWorkFlow
                                        {...this.props}
                                        selectedApplicationStatus={selectedApplicationStatus}
                                    />
                                    </div>
                                    :""
                                }

                                {/* <IEApprovalForm
                                    {...this.props}
                                    isAssessmentCalculated={!selectedApplicationStatus?.ieAssessment?.length}
                                    isFetching={isFetchingUpdateOpenApplication}
                                    applicationStatusDetail={selectedApplicationStatus}
                                    applicationDetail={applicationDetail}
                                /> */}
                            </div>
                    }

                </div>
                {
                    isFetchingApplicationDetail
                        ? <Loaders className="d-flex justify-content-center py-4 bg-white" />
                        : !isFetchingApplicationStatus
                            ? <ArrowCollapse name="Application Detail" applicationDetail={applicationDetail}>
                                <IEDetails {...applicationDetail} />
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
        profile : state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ApplicationActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentDetails);