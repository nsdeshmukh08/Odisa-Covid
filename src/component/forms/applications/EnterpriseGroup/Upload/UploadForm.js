import React from 'react';
import FormInput from 'component/inputs/FormInput';
import Uploadfile from 'component/inputs/Uploadfile'
import { Button, Row, Col } from 'reactstrap';

const UploadForm = ({ uploadDocuments,uploadingIndexes,errors,...rest }) => {
    console.log('uploadDocuments',uploadDocuments)
    return (
        <Row className="form-body mb-4 upload-form-main">
            <Col >
                <h2 className="title-two mb-4">Upload documents</h2>
                <Row>
                    <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                        <Uploadfile
                            label="Bank Passbook front page"
                            id="bankPassBook"
                            name="bankPassBook"
                            isMult={true}
                            uploadedFileName={uploadDocuments && uploadDocuments.bankPassBook && uploadDocuments.bankPassBook.map(data => data.docName).join(', ')}
                            isUploading={uploadingIndexes.includes('bankPassBook')}
                            onChange={rest.onUpload}
                            error={errors['bankPassBook']}
                            accept="image/png, image/jpeg, application/pdf,.xls, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ></Uploadfile>
                        <Uploadfile
                            label="Minutes of EG requesting fund"
                            id="minOfEGRefund"
                            name="minOfEGRefund"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('minOfEGRefund')}
                            uploadedFileName={uploadDocuments && uploadDocuments.minOfEGRefund && uploadDocuments.minOfEGRefund.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['minOfEGRefund']}
                            accept="image/png, image/jpeg, application/pdf,.xls, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ></Uploadfile>
                        <Uploadfile
                            label="Business Plan / Activity Plan"
                            id="businessPlan"
                            name="businessPlan"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('businessPlan')}
                            uploadedFileName={uploadDocuments && uploadDocuments.businessPlan && uploadDocuments.businessPlan.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['businessPlan']}
                            accept="image/png, image/jpeg, application/pdf,.xls, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ></Uploadfile>
                    </Col>
                    <Col className="textarea upload-custom" xs="12" lg="6" xl="6">
                        <FormInput
                            type="textarea"
                            label="Remarks / Challenges faced during COVID"
                            name="remarks"
                            onChange={rest.onChange}
                            value={uploadDocuments && uploadDocuments.remarks}
                            error={errors['remarks']}
                        /></Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UploadForm;