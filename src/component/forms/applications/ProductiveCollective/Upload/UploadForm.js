import React from 'react';
import FormInput from 'component/inputs/FormInput';
import Uploadfile from 'component/inputs/Uploadfile'
import { Button, Row, Col } from 'reactstrap';

const UploadForm = ({ uploadDocuments, uploadingIndexes, errors, ...rest }) => {
    return (
        <div id={rest.id}>
            <Row className="form-body mb-4 upload-form-main p-4">
                <Col >
                    <h2 className="title-two mb-4">Upload documents</h2>
                    <Row>
                        <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                            <Uploadfile
                                label="Registration Certificate"
                                id="regCer"
                                name="regCertificate"
                                isMult={true}
                                uploadedFileName={uploadDocuments.regCertificate.map(data => data.docName).join(', ')}
                                isUploading={uploadingIndexes.includes('regCertificate')}
                                onChange={rest.onUpload}
                                error={errors['regCertificate']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            ></Uploadfile>
                            <Uploadfile
                                label="2 Years Audit Statement"
                                id="auditStatement"
                                name="auditStatement"
                                isMult={true}
                                isUploading={uploadingIndexes.includes('auditStatement')}
                                uploadedFileName={uploadDocuments.auditStatement.map(data => data.docName).join(', ')}
                                onChange={rest.onUpload}
                                error={errors['auditStatement']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            ></Uploadfile>
                            <Uploadfile
                                label="Bank Passbook Frontpage"
                                id="bankPassBook"
                                name="bankPassBook"
                                isMult={true}
                                isUploading={uploadingIndexes.includes('bankPassBook')}
                                uploadedFileName={uploadDocuments.bankPassBook.map(data => data.docName).join(', ')}
                                onChange={rest.onUpload}
                                error={errors['bankPassBook']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            ></Uploadfile>
                            <Uploadfile
                                label="Latest Minutes of meeting / Resolution"
                                id="latestMomRes"
                                name="latestMomRes"
                                isMult={true}
                                isUploading={uploadingIndexes.includes('latestMomRes')}
                                uploadedFileName={uploadDocuments.latestMomRes.map(data => data.docName).join(', ')}
                                onChange={rest.onUpload}
                                error={errors['latestMomRes']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            ></Uploadfile>
                            <Uploadfile
                                label="Business Plan or Activity Plan"
                                id="businessPlan"
                                name="businessPlan"
                                isMult={true}
                                isUploading={uploadingIndexes.includes('businessPlan')}
                                uploadedFileName={uploadDocuments.businessPlan.map(data => data.docName).join(', ')}
                                onChange={rest.onUpload}
                                error={errors['businessPlan']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            ></Uploadfile>
                        </Col>
                        <Col className="textarea upload-custom" xs="12" lg="6" xl="6">
                            <FormInput
                                type="textarea"
                                label="Remarks / Challanges faced during COVID"
                                name="remarks"
                                onChange={rest.onChange}
                                value={uploadDocuments.remarks}
                                error={errors['remarks']}
                                accept="image/png, image/jpeg, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                size={5242880}
                            /></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default UploadForm;