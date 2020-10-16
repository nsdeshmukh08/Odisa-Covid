import React, { useContext } from 'react';
import FormInput from 'component/inputs/FormInput';
import Uploadfile from 'component/inputs/Uploadfile'
import { Button, Row, Col } from 'reactstrap';
import { ThemeContext } from "helpers"
import CustomCheckbox from 'component/inputs/Checkbox';


const UploadForm = ({ uploadDocuments, uploadingIndexes, errors, ...rest }) => {

    let themeData = useContext(ThemeContext)

    console.log(uploadDocuments, uploadDocuments.idProof);

    return (
        <Row className="form-body mb-4 upload-form-main">
            <Col >
                <h2 className="title-two mb-4">Upload documents</h2>
                <Row>
                    <Col xs="12" lg="6" xl="6" className="pr-lg-5">
                        <Uploadfile
                            label={themeData.idProof}
                            id="idProof"
                            name="idProof"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('idProof')}
                            uploadedFileName={uploadDocuments && uploadDocuments.idProof && uploadDocuments.idProof.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['idProof']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.addressProof}
                            id="addressProof"
                            name="addressProof"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('addressProof')}
                            uploadedFileName={uploadDocuments && uploadDocuments.addressProof && uploadDocuments.addressProof.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['addressProof']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.bankPassBook}
                            id="bankPassBook"
                            name="bankPassBook"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('bankPassBook')}
                            uploadedFileName={uploadDocuments && uploadDocuments.bankPassBook && uploadDocuments.bankPassBook.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['bankPassBook']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.buisnessPlanActivityReport}
                            id="businessPlan"
                            name="businessPlan"
                            isMult={true}
                            uploadedFileName={uploadDocuments && uploadDocuments.businessPlan && uploadDocuments.businessPlan.map(data => data.docName).join(', ')}
                            isUploading={uploadingIndexes.includes('businessPlan')}
                            onChange={rest.onUpload}
                            error={errors['businessPlan']}
                        ></Uploadfile>
                        
                        <Uploadfile
                            label={themeData.differentlyAbledCertificate}
                            id="differentlyAbledCertificate"
                            name="differentlyAbledCertificate"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('differentlyAbledCertificate')}
                            uploadedFileName={uploadDocuments&& uploadDocuments.differentlyAbledCertificate && uploadDocuments.differentlyAbledCertificate.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['differentlyAbledCertificate']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.existingLoanRepayment}
                            id="existingLoanRepay"
                            name="existingLoanRepay"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('existingLoanRepay')}
                            uploadedFileName={uploadDocuments && uploadDocuments.existingLoanRepay && uploadDocuments.existingLoanRepay.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['existingLoanRepay']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.PhotocopyofSHGResolution}
                            id="photoCopy"
                            name="photoCopy"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('photoCopy')}
                            uploadedFileName={uploadDocuments && uploadDocuments.photoCopy && uploadDocuments.photoCopy.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['photoCopy']}
                        ></Uploadfile>
                        <Uploadfile
                            label={themeData.proofOfMigration}
                            id="proofOfMigration"
                            name="proofOfMigration"
                            isMult={true}
                            isUploading={uploadingIndexes.includes('proofOfMigration')}
                            uploadedFileName={uploadDocuments && uploadDocuments.proofOfMigration && uploadDocuments.proofOfMigration.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['proofOfMigration']}
                        ></Uploadfile>
                        <Uploadfile
                            label={'Certificate of Skill Development Training'}
                            id="trainingCertificate"
                            name="trainingCertificate"
                            isMult={true}
                            isOptional={true}
                            isUploading={uploadingIndexes.includes('trainingCertificate')}
                            uploadedFileName={uploadDocuments && uploadDocuments.trainingCertificate && uploadDocuments.trainingCertificate.map(data => data.docName).join(', ')}
                            onChange={rest.onUpload}
                            error={errors['trainingCertificate']}
                        ></Uploadfile>
                        
                    </Col>
                <Col className="textarea-upload" xs="12" lg="6" xl="6">
                   <Row>
                        <Col xs="12" lg="12" xl="12">
                        <FormInput
                            type="textarea"
                            label={themeData.remarkChallangesFaced}
                            name="remarks"
                            onChange={rest.onChange}
                            value={uploadDocuments.remarks}
                            error={errors['remarks']}
                        />
                        </Col>
                            <h2 className="form-group px-3" xs="12" lg="6" xl="6"><label>Declartion</label></h2>
                            <Col xs="12" lg="12" xl="12" className="checkbox-main px-5">
                                <CustomCheckbox 
                                checked="false" 
                                name="isDeclaration"
                                onChange={rest.onChange}
                                >
                                </CustomCheckbox>
                                <span className="ml-2 small-size mt-3">
                                    {themeData.formDeclaration} 
                                </span>
                            </Col>
                        </Row>
                  </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UploadForm;