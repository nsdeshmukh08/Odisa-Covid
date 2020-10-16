import React, { Component, Fragment } from 'react'
import { ApplicationDetailHeader } from 'component/Header/Staff'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApplicationActions from "action/staff/manageApplication/pgApplications";
import _ from "lodash";
import Loaders from 'component/Loader'
import AssessmentCard from 'component/Cards/AssessmentCard'
import AssessmentStepper from 'component/Cards/AssessmentStepper'
import ProducerGroup from 'component/forms/staff/application/openApplicationApproval/ProducerGroup'
// import ProducerGroup from 'component/forms/staff/application/openApplicationApproval/ProducerGroup/DMMU'
import { PGWorkFlow } from 'component/workflow'
import StartNowCard from 'component/Cards/DottedStartNowCard'
import ArrowCollapse from 'component/Collapse/ArrowCollapse'
import PGForm from 'component/forms/staff/application/applicationDetails/producerGroup'
import ViewCard from 'component/Cards/ViewCard'
import { PG_FORM_MASTER_STATUS,STAFF_ROLE_ID } from "helpers/variables"

class AssessmentDetails extends Component {
    state = {
        selectedApplicationId: null,
        selectedApplication: {},
        pcCoverageCalcualted: {}
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.applications.selectedApplicationId !== prevState.selectedApplicationId)
    //         return {
    //             selectedApplication: nextProps.applications.list.find(data => data.formId === nextProps.applications.selectedApplicationId)
    //         }

    //     return null
    // }

    // getPgServiceDetail = () => {
    //     const { selectedApplicationStatus } = this.props.applications
    //     let calculated;
    //     if (selectedApplicationStatus.pcAreaMember?.length) {
    //         calculated = selectedApplicationStatus.pcAreaMember.reduce((acc, value) => {
    //             acc.block += value.districtTotalBlock
    //             acc.totalMembers += value.districtTotalMember
    //             return acc
    //         }, {
    //             district: 0,
    //             block: 0,
    //             totalMembers: 0
    //         })
    //         calculated.district = selectedApplicationStatus.pcAreaMember.length
    //     }
    //     return calculated
    // }

    // getPgCoverageDetail = () => {
    //     const { selectedApplicationStatus } = this.props.applications
    //     let calculated;
    //     if (selectedApplicationStatus.pcCoverageArea?.length) {
    //         calculated = selectedApplicationStatus.pcCoverageArea.reduce((acc, value) => {
    //             acc.block += value.noOfBlock
    //             acc.panchayat += value.coverageBlock.reduce((acc, val) => acc + val.coverageBlockTotal, 0)
    //             return acc
    //         }, {
    //             district: 0,
    //             block: 0,
    //             panchayat: 0
    //         })
    //         calculated.district = selectedApplicationStatus.pcCoverageArea.length
    //     }
    //     return calculated
    // }

    render() {
        const {
            selectedApplication
        } = this.state
        const {
            isFetchingApplicationStatus,
            isFetchingApplicationDetail,
            isFetchingUpdateOpenApplication
        } = this.props.loaders

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
        } = PG_FORM_MASTER_STATUS;

        const { role } = this.props.profile

        let showWorkFlowForStatus = role === 3 ? [
            DRAFT, 
            AMOUNT_DISBURSMENT, 
            SUBMIT_UC, 
            APPROVED,
            // DECLINED
        ] : [
            DRAFT, 
            DMPU_OPEN_APPLICATION, 
            AMOUNT_DISBURSMENT, 
            SUBMIT_UC, 
            APPROVED, 
            PENDING,
            DECLINED
        ];
        return (

            <div className="staffDetails assesment-card custom-scrollbar">
                <ApplicationDetailHeader type="PG" staffRole={role} applicationDetail={selectedApplication} toggle={this.props.toggle} />
                <div className="assesment-card-body bg-theme">
                    {
                        isFetchingApplicationStatus ?
                            // <Loaders className="d-flex justify-content-center py-4 bg-white" /> 
                            ""
                            : <div>
                                {
                                    [STAFF_ROLE_ID.BMMU, STAFF_ROLE_ID.DMMU].includes(role) ?
                                        <Fragment>
                                            <AssessmentCard
                                                
                                                type="pg"
                                                assessmentList={selectedApplicationStatus?.pgAssessment}
                                                formId={selectedApplicationStatus?.formId}
                                            />
                                            {
                                                showWorkFlowForStatus.includes(selectedApplicationStatus?.status)
                                                    ?
                                                    <Fragment>
                                                        <PGWorkFlow
                                                            {...this.props}
                                                            selectedApplicationStatus={selectedApplicationStatus}
                                                        />
                                                    </Fragment>

                                                    : ''
                                            }
                                                <ProducerGroup
                                                    {...this.props}
                                                    isAssessmentCalculated={!selectedApplicationStatus?.pgAssessment?.length}
                                                    isFetching={isFetchingUpdateOpenApplication}
                                                    applicationStatusDetail={selectedApplicationStatus}
                                                />
                                        </Fragment> : ''
                                }
                                {
                                    STAFF_ROLE_ID.SMMU == role ? 
                                    <div className="mt-3">
                                    
                                    <PGWorkFlow
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
                        ? 
                        // <Loaders className="d-flex justify-content-center py-4 bg-white" />
                        ""
                        : !isFetchingApplicationStatus
                            ? <ArrowCollapse name="Application Detail" applicationDetail={applicationDetail}>
                                <PGForm {...applicationDetail} />
                            </ArrowCollapse> : ''
                }
                        {/* <div className="asset-level">
                        <div className="d-flex align-items-center  cursor-pointer">
                            <img src={app} alt="download" className="app mr-2"></img>
                            <div>
                            <p className="title-text">First level Assessment</p>
                            <p className="subtitle-text">Not yet started</p>
                            </div>
                            <div className="btn-asset ml-auto" onClick={() => history.push(`/add/assessment/pg/1`)}>
                            <span className="white"> Start Assessment</span>
                            </div>
                        </div>
                        </div> */}
                        <div className="assesment-card-body bg-theme">
                        <AssessmentCard
                            type="pg"
                            assessmentList={selectedApplicationStatus?.pgAssessment}
                            formId={3}
                        />
                        <AssessmentStepper
                            percentage={50}
                            titleOne="ME105 - CLF to ME106 - GPLF"
                            dateOne="28 Jun 2020"
                            commentOne="All document verified"
                            linkOne={`View Details`}
                            titleTwo="ME105 - CLF"
                            dateTwo="28 Jun 2020"
                            linkTwo={`View Details`}
                            titleThree="Application"
                            dateThree="28 Jun 2020"
                        />
                        </div>
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