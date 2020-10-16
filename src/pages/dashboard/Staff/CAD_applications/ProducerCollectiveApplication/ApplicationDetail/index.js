import React, { Component, Fragment } from 'react'
import { ApplicationDetailHeader } from 'component/Header/Staff'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApplicationActions from "action/staff/manageApplication";
import _ from "lodash";
import Loaders from 'component/Loader'
import AssessmentCard from 'component/Cards/AssessmentCard'
import ProducerCollectiveApprovalForm from 'component/forms/staff/application/openApplicationApproval/ProducerCollective'
import { PCWorkFlow } from 'component/workflow'
import StartNowCard from 'component/Cards/DottedStartNowCard'
import ArrowCollapse from 'component/Collapse/ArrowCollapse'
import PCForm from 'component/forms/staff/application/applicationDetails/producerCollective'
import ViewCard from 'component/Cards/ViewCard'
import { STAFF_ROLE_ID } from 'helpers/variables'
import serviceArea from 'assets/images/serviceArea.svg'
import coverage from 'assets/images/coverage.svg'
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

        console.log(pcCoverageCalculated||pcServiceCalculated, "details")

        return (

            <div className="staffDetails assesment-card custom-scrollbar">
                <ApplicationDetailHeader applicationType = "Producer Collective" applicationDetail={selectedApplication} toggle={this.props.toggle} />
                <div className="assesment-card-body bg-white">

                    {
                        isFetchingApplicationStatus ?
                            <Loaders className="d-flex justify-content-center py-4 bg-white" />
                            : <div>
                                
                                {
                                    [STAFF_ROLE_ID.DMMU].includes(profile.role) ? 
                                    <Fragment>
                                    <AssessmentCard 
                                        className={`${(pcCoverageCalculated||pcServiceCalculated) ? 'light-theme ':''}`} 
                                        type="pc"
                                        assessmentList={selectedApplicationStatus.pcAssessment}
                                        formId={selectedApplicationStatus.formId} 
                                    />
                                {
                                    pcServiceCalculated ?
                                        <ViewCard
                                            name="PC Service area & Block Members"
                                            desc={`
                                                District - ${pcServiceCalculated.district}.  |    
                                                Block - ${pcServiceCalculated.block}    |    
                                                Total Members - ${pcServiceCalculated.totalMembers}`
                                            }
                                            link={`/add/PC-service/${selectedApplicationStatus.formId}`}
                                            Image={serviceArea}
                                        /> : ''
                                }

                                {
                                    pcCoverageCalculated ?
                                        <ViewCard
                                            name="Project Coverage Area & Members"
                                            desc={`
                                                District - ${pcCoverageCalculated.district}.  |    
                                                Block - ${pcCoverageCalculated.block}    |    
                                                Panchayat - ${pcCoverageCalculated.panchayat}`
                                            }
                                            link={`/add/PC-coverage/${selectedApplicationStatus.formId}`}
                                            Image={coverage}
                                        /> : ''
                                }
                                                                {
                                    [4, 5, 6, 7].includes(selectedApplicationStatus.status)
                                        ?
                                        <Fragment>
                                            <PCWorkFlow
                                                {...this.props}
                                                selectedApplicationStatus={selectedApplicationStatus}
                                            />
                                            {
                                                selectedApplicationStatus.status !== 7 ?
                                                    <Fragment>
                                                        {
                                                            !pcServiceCalculated ?
                                                                <StartNowCard
                                                                    name="PC Service area & Block Members"
                                                                    link={`/add/PC-service/${selectedApplicationStatus.formId}`}
                                                                /> : ''
                                                        }

                                                        {
                                                            !pcCoverageCalculated ?
                                                                <StartNowCard
                                                                    name="Project Coverage Area & Members"
                                                                    link={`/add/PC-coverage/${selectedApplicationStatus.formId}`}
                                                                /> : ''
                                                        }
                                                    </Fragment> : ''
                                            }

                                        </Fragment>

                                        : ''
                                }
                                </Fragment>
                                     : ''
                                }
                                {
                                   STAFF_ROLE_ID.SMMU == profile.role ? 
                                   <div className="mt-3">
                                   
                                   <PCWorkFlow
                                    {...this.props}
                                    selectedApplicationStatus={selectedApplicationStatus}
                                    />
                                    </div>
                                    :""
                                }

                                <ProducerCollectiveApprovalForm
                                    {...this.props}
                                    isAssessmentCalculated={!selectedApplicationStatus.pcAssessment?.length}
                                    isFetching={isFetchingUpdateOpenApplication}
                                    applicationStatusDetail={selectedApplicationStatus}
                                />
                            </div>
                    }

                </div>
                {
                    isFetchingApplicationDetail
                        ? <Loaders className="d-flex justify-content-center py-4 bg-white" />
                        : !isFetchingApplicationStatus
                            ? <ArrowCollapse name="Application Detail" applicationDetail={applicationDetail}>
                                <PCForm {...applicationDetail} />
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