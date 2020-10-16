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

export const PCWorkFlow = ({ selectedApplicationStatus = {} }) => {
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
                                    <span>Application Approved on</span>
                                    <span className="ml-2">
                                        {formatDate(populateData(selectedApplicationStatus, 'pcApplicationStatus.approvedOn'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <h5 className="mb-4">Approval Details</h5>
                                        <li>
                                            <p>
                                                <span>Approved by</span>
                                                <a>
                                                    {populateData(selectedApplicationStatus, 'pcApplicationStatus.approvedBy')}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Is Activity in Negative Category-ESMF</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'pcApplicationStatus.isActivityEsmf',
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
                                                        ACTIVITY_CATEGORY.find(
                                                            data => data.value === populateData(
                                                                selectedApplicationStatus,
                                                                'pcApplicationStatus.activityCategory'
                                                            ),
                                                            {}
                                                        )?.label
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>DMMU Verification Date</span>
                                                <a>
                                                    {
                                                        formatDate(
                                                            populateData(
                                                                selectedApplicationStatus,
                                                                'pcApplicationStatus.dmpuVerifyDate'
                                                            )
                                                        )
                                                    }
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
                                                            'pcApplicationStatus.isSmpuVerified'
                                                            , false
                                                        ) ? 'Yes' : 'No'
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        {
                                            selectedApplicationStatus.pcApplicationStatus ?
                                                <Fragment>
                                                    <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                                    <li>
                                                        <p
                                                            className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'pcApplicationStatus.signedAssesment')
                                                            }
                                                        >
                                                            <img src={app} className="mr-2" />
                                                            <a>Signed Assessment Form</a>
                                                            <img src={download} width="18px" className="ml-2"></img>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'pcApplicationStatus.decMom')
                                                            }>
                                                            <img src={app} className="mr-2" />
                                                            <a>District Executive Comm</a>
                                                            <img src={download} width="18px" className="ml-2" />
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'pcApplicationStatus.smpuApprovalLetter')
                                                            }>
                                                            <img src={app} className="mr-2"></img>
                                                            <a>SMMU Approval letter</a>
                                                            <img src={download} width="18px" className="ml-2"></img>
                                                        </p>
                                                    </li>
                                                </Fragment>
                                                : ''
                                        }

                                    </ul>
                                </div>
                            </li>
                            {
                                populateData(
                                    selectedApplicationStatus,
                                    'firstTranche'
                                ) ? <li className="mt-4 tracker-three">
                                        <h3>
                                            <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                            <span>First Tranche Disbursed on</span>
                                            <span className="ml-2">
                                                {
                                                    formatDate(
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'firstTranche.disbursmentDate'
                                                        )
                                                    )
                                                }
                                            </span>
                                        </h3>
                                        <div className="workflow-list">
                                            <ul className="p-0">
                                                <h5>Disbursement Details</h5>
                                                <li>
                                                    <p>
                                                        <span>Disbursed by</span>
                                                        <a>
                                                            {
                                                                populateData(
                                                                    selectedApplicationStatus,
                                                                    'firstTranche.disbursedBy'
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>First Tranche Disbursement</span>
                                                        <a>
                                                            {
                                                                populateData(
                                                                    selectedApplicationStatus,
                                                                    'firstTranche.isDisbursment'
                                                                ) ? 'Yes' : 'No'
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>First Tranche Disbursement Date</span>
                                                        <a>
                                                            {
                                                                formatDate(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'firstTranche.disbursmentDate'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>First Tranche Disbursement Amount</span>
                                                        <a>
                                                            Rs. {
                                                                formatToINR(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'firstTranche.disbursmentAmount'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </li> : ''
                            }

                            {
                                populateData(
                                    selectedApplicationStatus,
                                    'secondTranche'
                                ) ? <li className="mt-4 tracker-three">
                                        <h3>
                                            <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                            <span>Second Tranche Disbursed on</span>
                                            <span className="ml-2">
                                                {
                                                    formatDate(
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'secondTranche.disbursmentDate'
                                                        )
                                                    )
                                                }
                                            </span>
                                        </h3>
                                        <div className="workflow-list">
                                            <ul className="p-0">
                                                <h5>Disbursement Details</h5>
                                                <li>
                                                    <p>
                                                        <span>Disbursed by</span>
                                                        <a>
                                                            {
                                                                populateData(
                                                                    selectedApplicationStatus,
                                                                    'secondTranche.disbursedBy'
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>First Tranche Disbursement Date</span>
                                                        <a>
                                                            {
                                                                formatDate(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'firstTranche.disbursmentDate'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Second Tranche Disbursement</span>
                                                        <a>
                                                            {
                                                                populateData(
                                                                    selectedApplicationStatus,
                                                                    'secondTranche.isDisbursment'
                                                                ) ? 'Yes' : 'No'
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Second Tranche Disbursement Date</span>
                                                        <a>
                                                            {
                                                                formatDate(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'secondTranche.disbursmentDate'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Second Tranche Disbursement Amount</span>
                                                        <a>
                                                            Rs. {
                                                                formatToINR(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'secondTranche.disbursmentAmount'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                {
                                                    selectedApplicationStatus.secondTranche ?
                                                        <Fragment>
                                                            <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                                            <li>
                                                                <p
                                                                    className="cursor-pointer"
                                                                    onClick={
                                                                        () => openInNewTab(selectedApplicationStatus, 'secondTranche.firstUcCertificate')
                                                                    }
                                                                >
                                                                    <img src={app} className="mr-2" />
                                                                    <a>1st Tranche UC Certificate</a>
                                                                    <img src={download} width="18px" className="ml-2"></img>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p className="cursor-pointer"
                                                                    onClick={
                                                                        () => openInNewTab(selectedApplicationStatus, 'secondTranche.smpuTrancheApproval')
                                                                    }>
                                                                    <img src={app} className="mr-2" />
                                                                    <a>SMMU Approval Certificate</a>
                                                                    <img src={download} width="18px" className="ml-2" />
                                                                </p>
                                                            </li>
                                                        </Fragment>
                                                        : ''
                                                }
                                            </ul>
                                        </div>
                                    </li> : ''
                            }
                            <li className="mt-4">
                                <h3>
                                    <span class={`${selectedApplicationStatus.secondTrancheUc ? "sucess" : 'pending'} custom-caret ml-2`}>
                                        <i class="icon-tick"></i>
                                    </span>
                                    {
                                        !selectedApplicationStatus.firstTranche
                                            ? "First Tranche Disbursement"
                                            : !selectedApplicationStatus.secondTranche
                                                ? "Second Tranche Disbursement"
                                                : !selectedApplicationStatus.secondTrancheUc ?
                                                    "Second Tranche UC Submitted" :
                                                    "Second Tranche UC Submitted on"
                                    }
                                    <span className="ml-2">
                                        {
                                            populateData(
                                                selectedApplicationStatus,
                                                'secondTrancheUc.disbursmentSubmitDate'
                                            ) !== undefined && populateData(
                                                selectedApplicationStatus,
                                                'secondTrancheUc.disbursmentSubmitDate'
                                            ) !== null ?
                                                formatDate(
                                                    populateData(
                                                        selectedApplicationStatus,
                                                        'secondTrancheUc.disbursmentSubmitDate'
                                                    )
                                                )
                                                : ''
                                        }
                                    </span>
                                </h3>
                                {
                                    selectedApplicationStatus.secondTrancheUc ?
                                        <div className="workflow-list">
                                            <ul className="p-0">
                                                <h5 className={`${selectedApplicationStatus.secondTrancheUc ? "text-primary" : ''}`}>Disbursement Details</h5>
                                                <li>
                                                    <p>
                                                        <span>Second Tranche UC Submitted Date</span>
                                                        <a>
                                                            {
                                                                formatDate(populateData(
                                                                    selectedApplicationStatus,
                                                                    'secondTrancheUc.disbursmentSubmitDate'
                                                                ))
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
                                                                () => openInNewTab(selectedApplicationStatus, 'secondTrancheUc.secondTrancheApproval')
                                                            }
                                                        >
                                                            <img src={app} className="mr-2" />
                                                            <a>2nd Tranche UC Certificate</a>
                                                            <img src={download} width="18px" className="ml-2"></img>
                                                        </p>
                                                    </li>
                                                </Fragment>

                                            </ul>
                                        </div> : ''
                                }

                            </li>
                        </ul>

                    </Col>
                </Row>
            </div>
            {
                selectedApplicationStatus.status === 7
                    ? <div className="border-top p-4 d-flex align-items-center justify-content-between">
                        <h3 className="mb-0">Total Amount Disbursed</h3>
                        <span>Rs : {formatToINR(selectedApplicationStatus?.firstTranche?.disbursmentAmount + selectedApplicationStatus?.secondTranche?.disbursmentAmount)}</span>
                    </div> : ''

            }

        </Fragment>

    );
}