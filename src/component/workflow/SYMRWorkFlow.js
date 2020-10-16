import React, { Fragment } from 'react';
import download from 'assets/images/download.svg';
import app from 'assets/images/app.svg';
import { Row, Col, Card } from 'reactstrap';
import { populateData } from 'helpers'
import { formatDate } from 'helpers/momentHelpers'
import { ACTIVITY_CATEGORY, SYMR_FORM_MASTER_STATUS } from 'helpers/variables'
import { formatToINR } from 'helpers';

const openInNewTab = (object, pathname) => {
    let upload = populateData(
        object,
        pathname,
        []
    )
    if (upload.length)
        window.open(upload[0].docUrl)
}

export const SYMRWorkFlow = ({ selectedApplicationStatus = {} }) => {
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
                                        {formatDate(populateData(selectedApplicationStatus, 'appRecievedDate'))}
                                    </span>
                                </h3>
                                <div className="workflow-list">
                                    <ul className="p-0">
                                        <h5 className="mb-4">Approval Details</h5>
                                        <li>
                                            <p>
                                                <span>Approved by</span>
                                                <a>
                                                    {populateData(selectedApplicationStatus, 'symrApplicationStatus.approvedBy')}
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
                                                            'symrApplicationStatus.isActivityEsmf',
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
                                                                'symrApplicationStatus.activityCategory',
                                                                {}
                                                            )
                                                        )?.label
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Evidence of reverse migration</span>
                                                <a>
                                                    {
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'symrApplicationStatus.isReverseMigrated',
                                                            false
                                                        ) ? 'Yes' : 'No'

                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Date of birth</span>
                                                <a>
                                                    {
                                                        formatDate(
                                                            populateData(
                                                                selectedApplicationStatus,
                                                                'symrApplicationStatus.dateOfBirth'
                                                            )
                                                        )
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Age</span>
                                                <a>
                                                    {

                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'symrApplicationStatus.age',
                                                            0
                                                        )

                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>CLF Assessment Date</span>
                                                <a>
                                                    {
                                                        formatDate(
                                                            populateData(
                                                                selectedApplicationStatus,
                                                                'symrApplicationStatus.CLFAssessmentDate'
                                                            )
                                                        )
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>Approved Loan Amount</span>
                                                <a>
                                                    Rs. {
                                                        formatToINR(
                                                            populateData(
                                                                selectedApplicationStatus,
                                                                'symrApplicationStatus.approvedLoanAmount',
                                                                0
                                                            )
                                                        )
                                                    }
                                                </a>
                                            </p>
                                        </li>
                                        {
                                            selectedApplicationStatus.symrApplicationStatus ?
                                                <Fragment>
                                                    <h5 className="mb-2 mt-3">Submitted Documents</h5>
                                                    <li>
                                                        <p
                                                            className="cursor-pointer"
                                                            onClick={
                                                                () => openInNewTab(selectedApplicationStatus, 'symrApplicationStatus.CLFCommitteeMom')
                                                            }
                                                        >
                                                            <img src={app} className="mr-2" />
                                                            <a>CLF Committee Meeting Minutes</a>
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
                                    'amountDisbursment'
                                ) ? <li className="mt-4 tracker-three">
                                        <h3>
                                            <span class="custom-caret sucess ml-2"><i class="icon-tick"></i></span>
                                            <span>Amount Disbursed on</span>
                                            <span className="ml-2">
                                                {
                                                    formatDate(
                                                        populateData(
                                                            selectedApplicationStatus,
                                                            'amountDisbursment.disbursmentDate'
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
                                                                    'amountDisbursment.disbursedBy'
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Amount Disbursement</span>
                                                        <a>
                                                            {
                                                                populateData(
                                                                    selectedApplicationStatus,
                                                                    'amountDisbursment.isDisbursment'
                                                                ) ? 'Yes' : 'No'
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Disbursement Date</span>
                                                        <a>
                                                            {
                                                                formatDate(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'amountDisbursment.disbursmentDate'
                                                                    )
                                                                )
                                                            }
                                                        </a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <span>Disbursement Amount</span>
                                                        <a>
                                                            Rs. {
                                                                formatToINR(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'amountDisbursment.disbursmentAmount'
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

                            <li className="mt-4">
                                <h3>
                                    <span class={`${selectedApplicationStatus.disbursmentUc ? "sucess" : 'pending'} custom-caret ml-2`}>
                                        <i class="icon-tick"></i>
                                    </span>
                                    {
                                        !selectedApplicationStatus.amountDisbursment
                                            ? "Amount Disbursement"
                                            : "UC Submit"
                                    }
                                </h3>
                                {
                                    selectedApplicationStatus.disbursmentUc ?
                                        <div className="workflow-list">
                                            <ul className="p-0">
                                                <h5 className={`${selectedApplicationStatus.disbursmentUc ? "text-primary" : ''}`}>Disbursement Details</h5>
                                                <li>
                                                    <p>
                                                        <span>UC Submitted Date</span>
                                                        <a>
                                                            {
                                                                formatDate(
                                                                    populateData(
                                                                        selectedApplicationStatus,
                                                                        'secondTrancheUc.disbursmentSubmitDate'
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
                                        </div> : ''
                                }

                            </li>
                        </ul>

                    </Col>
                </Row>
            </div>
            {
                selectedApplicationStatus.status === SYMR_FORM_MASTER_STATUS.APPROVED
                    ? <div className="border-top p-4 d-flex align-items-center justify-content-between">
                        <h3 className="mb-0">Total Amount Disbursed</h3>
                        <span>Rs : {formatToINR(populateData(
                            selectedApplicationStatus,
                            'amountDisbursment.disbursmentAmount'
                        ))}</span>
                    </div> : ''

            }

        </Fragment>

    );
}