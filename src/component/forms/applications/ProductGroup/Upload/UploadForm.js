import React from 'react';
import Uploadfile from 'component/inputs/Uploadfile'
import { Row, Col } from 'reactstrap';

const UploadForm = ({ uploadDocuments,uploadingIndexes,errors,...rest }) => {
    return (
        <Row className="form-body mb-4 upload-form-main">
            <Col >
                <h2 className="title-two mb-4">Upload documents</h2>
                <Row>
                    <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                        <Uploadfile
                            label="First Resolution copy of PG/ EG"
                            id="firstResolutionofPGEG"
                            name="firstResolutionofPGEG"
                            isMult={true}
                            uploadedFileName={uploadDocuments && uploadDocuments.firstResolutionofPGEG && uploadDocuments.firstResolutionofPGEG.map(data => data.docName).join(', ')}
                            isUploading={uploadingIndexes.includes('firstResolutionofPGEG')}
                            onChange={rest.onUpload}
                            error={errors['firstResolutionofPGEG']}
                        ></Uploadfile>
                        <Uploadfile
                            label="Copy of bank passbook"
                            id="copyofBankPassbook"
                            name="copyofBankPassbook"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('copyofBankPassbook')}
                            uploadedFileName={uploadDocuments && uploadDocuments.copyofBankPassbook && uploadDocuments.copyofBankPassbook.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['copyofBankPassbook']}
                        ></Uploadfile>
                        <Uploadfile
                            label="Current/ new Business activity status report/ Business Plan"
                            id="businessPlan"
                            name="businessPlan"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('businessPlan')}
                            uploadedFileName={uploadDocuments && uploadDocuments.businessPlan && uploadDocuments.businessPlan.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['businessPlan']}
                        ></Uploadfile>
                        <Uploadfile
                            label="Existing loan repayment status (if any)"
                            id="existingLoanRepay"
                            name="existingLoanRepay"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('existingLoanRepay')}
                            uploadedFileName={uploadDocuments && uploadDocuments.existingLoanRepay && uploadDocuments.existingLoanRepay.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['existingLoanRepay']}
                        ></Uploadfile>
                        <Uploadfile
                            label="Copy of resolution mentioning applying for loan"
                            id="applyingLoan"
                            name="applyingLoan"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('applyingLoan')}
                            uploadedFileName={uploadDocuments && uploadDocuments.applyingLoan && uploadDocuments.applyingLoan.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['applyingLoan']}
                        ></Uploadfile>
                        <Uploadfile
                            label="List of Office Bearers"
                            id="listofOfficeBearers"
                            name="listofOfficeBearers"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('listofOfficeBearers')}
                            uploadedFileName={uploadDocuments && uploadDocuments.listofOfficeBearers && uploadDocuments.listofOfficeBearers.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['listofOfficeBearers']}
                        ></Uploadfile>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UploadForm;