import React, { Fragment } from 'react';
import download from 'assets/images/download.svg';
import app from 'assets/images/app.svg';
import { Row, Col, Card } from 'reactstrap';
import { populateData } from 'helpers'
import { formatDate } from 'helpers/momentHelpers'
import { ACTIVITY_CATEGORY } from 'helpers/variables'
import { formatToINR } from '../../helpers';
import { history } from 'helpers'

const openInNewTab = (object, pathname) => {
    let upload = populateData(
        object,
        pathname,
        []
    )
    if (upload.length)
        window.open(upload[0].docUrl)
}

// export const EG_FORM_MASTER_STATUS = {
//     DRAFT: 1,
//     BMPU_OPEN_APPLICATION: 2,
//     DMPU_OPEN_APPLICATION: 3,
//     AMOUNT_DISBURSMENT: 4,
//     SUBMIT_UC: 5,
//     APPROVED: 6,
//     PENDING: 7,
//     DECLINED: 8,
// };

export const EGWorkFlow = ({ selectedApplicationStatus = {} }) => {
    console.log("selectedapp",selectedApplicationStatus)
    return (
        <Fragment>
            <div className="workflow">
                <h3>Workflow Tracker</h3>
                <Row>
                    <Col className="pl-4">
                        <ul >
                            <li className="tracker-one">
                                <h3 >
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>Application Received on</span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'appRecievedDate'))}
                                    </span>
                                </h3>
                            </li>
                            <li className="tracker-two">
                                <h3>
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>BMMU Recommended </span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'egBmpuApplicationStatus.recommendedDate'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        {/* <h5 className="mb-4">Approval Details</h5> */}
                                        {/* <li>
                                            <p>
                                                <span>Approved by</span>
                                                <a>
                                                    {populateData(selectedApplicationStatus, 'pcApplicationStatus.approvedBy')}
                                                </a>
                                            </p>
                                        </li> */}
                                        <li>
                                            <p>
                                                <span>Is Activity in Negative Category-ESMF</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'egBmpuApplicationStatus.isActivityEsmf',
                                                            false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>ESMF activity Category</span>
                                                <a>
                                                    {
                                                        ACTIVITY_CATEGORY.filter(
                                                            data => data.value === populateData(
                                                                selectedApplicationStatus,
                                                                'egBmpuApplicationStatus.activityCategory',
                                                            )
                                                        )?.[0]?.label
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Block Level Assessment Date</span>
                                                <a>
                                                {formatDate(populateData(selectedApplicationStatus, 'egBmpuApplicationStatus.recommendedDate'))}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Approved Amount</span>
                                                <a>
                                                    {
                                                        formatToINR(
                                                            populateData(
                                                                selectedApplicationStatus,
                                                                'egBmpuApplicationStatus.approvedAmount'
                                                            )
                                                        )
                                                    }
                                
                                                </a>
                                            </p>
                                        </li>
                                                <Fragment>
                                                    <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                                    <li>
                                                        <p
                                                            className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'egBmpuApplicationStatus.signedAssesment')
                                                            }
                                                        >
                                                            <img src={app} className="mr-2" />
                                                            <a>Signed Assessment Form</a>
                                                            <img src={download} width="18px" className="ml-2"></img>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="cursor-pointer">
                                                            <img src={app} className="mr-2" />
                                                            <a>Block Level Executive Com</a>
                                                            <img src={download} width="18px" className="ml-2" />
                                                        </p>
                                                    </li>
                                                </Fragment>

                                    </ul>
                                </div>
                            </li>
                            {  
                                populateData(
                                    selectedApplicationStatus,
                                    'egDmpuApplicationStatus'
                                )
                                ?
                            <li className="tracker-three">
                                <h3>
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>Application Approved on </span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'egDmpuApplicationStatus.approvedDate'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <li>
                                            <p>
                                                <span>DMMU Received Date</span>
                                                <a>
                                                {formatDate(populateData(selectedApplicationStatus, 'egDmpuApplicationStatus.approvedDate'))}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>District Executive Committee Meeting Date</span>
                                                <a>
                                                
                                                {formatDate(populateData(selectedApplicationStatus, 'egDmpuApplicationStatus.decMeetingDate'))}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>SMMU Verified</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'egDmpuApplicationStatus.isSmpuVerified'
                                                            , false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                            <Fragment>
                                            <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                            <li>
                                                <p
                                                    className="cursor-pointer"
                                                    onClick={
                                                        () => openInNewTab(selectedApplicationStatus, 'egDmpuApplicationStatus.smpuApprovalLetter')
                                                    }
                                                >
                                                    <img src={app} className="mr-2" />
                                                    <a>SMMU Approval letter</a>
                                                    <img src={download} width="18px" className="ml-2"></img>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="cursor-pointer"
                                                    onClick={
                                                        () => openInNewTab(selectedApplicationStatus, 'egDmpuApplicationStatus.decmm')
                                                    }>
                                                    <img src={app} className="mr-2" />
                                                    <a>District Executive Com</a>
                                                    <img src={download} width="18px" className="ml-2" />
                                                </p>
                                            </li>
                                        </Fragment>

                                    </ul>
                                </div>
                            </li> 
                             : ""
                            }
                            {
                                populateData(
                                    selectedApplicationStatus,
                                    'amountDisbursment'
                                ) ? <li className="tracker-three">
                                <h3>
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>Amount Disbursed on </span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'amountDisbursment.disbursmentDate'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <li>
                                            <p>
                                                <span>Disbursed By</span>
                                                <a>
                                                {populateData(selectedApplicationStatus, 'amountDisbursment.disbursedBy')}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Amount Disbursed</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'amountDisbursment.isDisbursment',
                                                            false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Disbursement Date</span>
                                                <a>
                                                {formatDate(populateData(selectedApplicationStatus, 'amountDisbursment.disbursmentDate'))}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Amount Disbursed</span>
                                                <a>
                                                {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'amountDisbursment.disbursmentAmount'
                                                        ) 
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </li> : '' }
                            {
                                populateData(
                                    selectedApplicationStatus,
                                    'disbursmentUc'
                                ) ? <li className="tracker-three">
                                <h3>
                                    <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                    <span>UC Disbursed on </span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'disbursmentUc.disbursmentSubmitDate'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <li>
                                            <p>
                                                <span>Disbursed By</span>
                                                <a>
                                                    {populateData(selectedApplicationStatus, 'disbursmentUc.disbursedBy')}
                                                </a>
                                            </p>
                                        </li>
                                       
                                        <li>
                                            <p>
                                                <span>Disbursement Date</span>
                                                <a>
                                                {formatDate(populateData(selectedApplicationStatus, 'disbursmentUc.disbursmentSubmitDate'))}
                                                </a>
                                            </p>
                                        </li>
                                        <Fragment>
                                                    <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                                    <li>
                                                        <p
                                                            className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'disbursmentUc.firstUcCertificate')
                                                            }
                                                        >
                                                            <img src={app} className="mr-2" />
                                                            <a>UC Certificate</a>
                                                            <img src={download} width="18px" className="ml-2"></img>
                                                        </p>
                                                    </li>
                                        </Fragment>
                                    </ul>
                                </div>
                            </li> : '' }
                            <li className="mt-4">
                                {selectedApplicationStatus.status !== 8 ? <h3>
                                    {/* <span class={`${selectedApplicationStatus.egDmpuApplicationStatus ? "sucess" : 'pending'} custom-caret ml-2`}>
                                        <i class="icon-tick"></i>
                                    </span>
                                    {
                                        !selectedApplicationStatus.pgBmpuApplicationStatus
                                            ? "BMMU Recommended"  
                                            : !selectedApplicationStatus.egDmpuApplicationStatus
                                                ? "Application Approval"
                                                : "Amount Disbursement"
                                    } */}
                                    {
                                        !selectedApplicationStatus.egDmpuApplicationStatus 
                                        ?
                                            <><span class={`${selectedApplicationStatus.egDmpuApplicationStatus ? "sucess" : 'pending'} custom-caret ml-2`}>
                                            <i class="icon-tick"></i>
                                            </span>
                                            {
                                            "Application Approved"
                                            }</>
                                        :   !selectedApplicationStatus.amountDisbursment
                                            ?
                                                <><span class={`${selectedApplicationStatus.amountDisbursment ? "sucess" : 'pending'} custom-caret ml-2`}>
                                                <i class="icon-tick"></i>
                                                </span>
                                                {
                                                "Amount Disbursement"
                                                }</>
                                            :   !selectedApplicationStatus.disbursmentUc 
                                                ?  
                                                    <><span class={`${selectedApplicationStatus.disbursmentUc ? "sucess" : 'pending'} custom-caret ml-2`}>
                                                    <i class="icon-tick"></i>
                                                    </span>
                                                    {
                                                    "Submit UC Certificate"
                                                    }</>
                                                :
                                                <><span class={`${selectedApplicationStatus.disbursmentUc ? "sucess" : 'pending'} custom-caret ml-2`}>
                                                <i class="icon-tick"></i>
                                                </span>
                                                {
                                                "UC completed"
                                                }</>
                                    }
                                </h3>
                                : <h3> <span class={`pending custom-caret ml-2`}>
                                <i class="icon-tick"></i>
                                {/* </span>Rejected by {selectedApplicationStatus.egDmpuApplicationStatus? " DMMU":" BMMU"}</h3>} */}
                                </span>Rejected</h3>}

                            </li>
                        </ul>

                    </Col>
                </Row>
            </div>
            {
                selectedApplicationStatus.status === 6
                ? <div className="border-top p-4 d-flex align-items-center justify-content-between">
                        <h3 className="mb-0">Total Amount Disbursed</h3>
                            <span>Rs :&nbsp;
                            {
                                formatToINR(
                                    populateData(
                                        selectedApplicationStatus,
                                        'amountDisbursment.disbursmentAmount'
                                    )
                                )
                            }</span>
                    </div> : ''

            }
            
        </Fragment>

    );
}