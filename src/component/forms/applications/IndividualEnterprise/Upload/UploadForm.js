import React, { useContext } from 'react';
import FormInput from 'component/inputs/FormInput';
import Uploadfile from 'component/inputs/Uploadfile';
import { Button, Row, Col } from 'reactstrap';
import { ThemeContext } from 'helpers';
import CustomCheckbox from 'component/inputs/Checkbox';

const UploadForm = ({ uploadDocuments, uploadingIndexes, errors, ...rest }) => {
  let themeData = useContext(ThemeContext);
 // return <h1>Upload Form</h1>
  return (
    <Row className="form-body mb-4 upload-form-main">
      <Col>
        <h2 className="title-two    mb-4">Upload documents</h2>
        <Row>
          <Col xs="12" lg="6" xl="6" className="pr-lg-5">
            <Uploadfile
              label={themeData.photoIdProof}
              id="idProof"
              name="idProof"
              isMult={true}
              isUploading={uploadingIndexes.includes('idProof')}
              uploadedFileName={uploadDocuments.idProof
                .map((data) => data.docName)
                .join(', ')}
              onChange={rest.onUpload}
              error={errors['idProof']}
            ></Uploadfile>

            <Uploadfile
              label={themeData.govtIDProofTypeForAddress}
              id="addressProof"
              name="addressProof"
              isMult={true}
              isUploading={uploadingIndexes.includes('addressProof')}
              uploadedFileName={uploadDocuments.addressProof
                .map((data) => data.docName)
                .join(', ')}
              onChange={rest.onUpload}
              error={errors['addressProof']}
            ></Uploadfile>

            <Uploadfile
              label={themeData.bankPassBook}
              id="bankPassBook"
              name="bankPassBook"
              isMult={true}
              isUploading={uploadingIndexes.includes('bankPassBook')}
              uploadedFileName={uploadDocuments.bankPassBook
                .map((data) => data.docName)
                .join(', ')}
              onChange={rest.onUpload}
              error={errors['bankPassBook']}
            ></Uploadfile>

            <Uploadfile
              label={themeData.buisnessPlanActivity}
              id="businessPlan"
              name="businessPlan"
              isMult={true}
              uploadedFileName={uploadDocuments.businessPlan
                .map((data) => data.docName)
                .join(', ')}
              isUploading={uploadingIndexes.includes('businessPlan')}
              onChange={rest.onUpload}
              error={errors['businessPlan']}
              ></Uploadfile>

              <Uploadfile
              label={themeData.existingLoanRepayment}
              id="existingLoanRepay"
              name="existingLoanRepay"
              isMult={true}
              uploadedFileName={uploadDocuments.existingLoanRepay
              .map((data) => data.docName)
              .join(', ')}
              isUploading={uploadingIndexes.includes('existingLoanRepay')}
              onChange={rest.onUpload}
              error={errors['existingLoanRepay']}
              ></Uploadfile>

              <Uploadfile
              label={themeData.disabilityCertificate}
              id="differentlyAbledCertificate"
              name="differentlyAbledCertificate"
              isMult={true}
              uploadedFileName={uploadDocuments.differentlyAbledCertificate
              .map((data) => data.docName)
              .join(', ')}
              isUploading={uploadingIndexes.includes(
              'differentlyAbledCertificate',
              )}
              onChange={rest.onUpload}
              error={errors['differentlyAbledCertificate']}
            ></Uploadfile>
            
            <Uploadfile
              label={themeData.photoCopy}
              id="photoCopy"
              name="photoCopy"
              isMult={true}
              uploadedFileName={uploadDocuments.photoCopy
                .map((data) => data.docName)
                .join(', ')}
              isUploading={uploadingIndexes.includes('photoCopy')}
              onChange={rest.onUpload}
              error={errors['photoCopy']}
            ></Uploadfile>
          </Col>

          <Col className="textarea upload-custom" xs="12" lg="6" xl="6">
            {/* Narayan <FormInput
              type="textarea"
              label={themeData.lossIcurredDue}
              name="remarks"
              onChange={rest.onChange}
              value={uploadDocuments.remarks}
              error={errors['remarks']}
            /> */}
            <FormInput
              type="textarea"
              label={themeData.remarkChallangesFaced}
              name="remarks"
              onChange={rest.onChange}
              value={uploadDocuments.remarks}
              error={errors['remarks']}
            />
          </Col>
          <Col className="upload-custom" xs="12" lg="6" xl="6">
            <CustomCheckbox
              checked="false"
              name="isDeclaration"
              onChange={rest.onChange}
            ></CustomCheckbox>
            <span className="small-size mt-3">
              {
                'I hereby declare that the above furnished details are true to the best of my knowledge and request you to the sanction the loan to carry out my enterprise activity.'
              }
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UploadForm;
