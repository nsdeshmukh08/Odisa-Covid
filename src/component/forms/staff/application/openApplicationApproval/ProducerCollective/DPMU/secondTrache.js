import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Card } from 'reactstrap';
import FormInput from "component/inputs/FormInput";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Uploadfile from 'component/inputs/Uploadfile'
import DatePicker from 'component/inputs/ReactDatetime'
import { ACTIVITY_CATEGORY, IS_TRUE } from 'helpers/variables'
import validate from "helpers/validation";
import { API, API_BOOK } from "service";
import toast from "helpers/Toast";
import axios from 'axios';

const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

class SecondTranche extends Component {

    initialState = {
        isDisbursment: null,
        disbursmentSubmitDate: null,
        disbursmentDate: null,
        disbursmentAmount: null,
        firstUcCertificate: [],
        smpuTrancheApproval: [],
        uploadingIndexes: [],
        errors: {},
        cancelToken: axios.CancelToken.source(),
    }

    state = {
        ...this.initialState
    }

    onChange = (name, value) => {
        let { errors } = this.state
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        })
    }

    onUpload = async (name, files) => {
        let { cancelToken, errors, uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(name)
            this.setState({ uploadingIndexes })
            errors[name] = undefined
            let newUploadArray = []
            let formData = new FormData()
            for (var i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }
            let requestPayload = {
                ...UPLOAD_DOC_API,
                data: formData,
                cancelToken: cancelToken.token
            }
            let response = await API(requestPayload);
            if (response.status === 200) {
                for (var i = 0; i < files.length; i++) {
                    newUploadArray.push({
                        ...this.defaultUploadObject,
                        docUrl: response.data.data[i]['url'],
                        docName: response.data.data[i]['originalname'],
                        docType: 1
                    })
                }
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== name)
            }else{
                uploadingIndexes.pop(name)
                toast(response.data.message, "error");
            }
            this.setState({
                [name]: [...newUploadArray],
                uploadingIndexes
            })
        } else {
            this.setState({ [name]: [], errors, uploadingIndexes })
        }
    }

    onSubmit = () => {

        const {
            isDisbursment,
            disbursmentSubmitDate,
            disbursmentDate,
            disbursmentAmount,
            firstUcCertificate,
            smpuTrancheApproval,
            errors
        } = this.state

        let data = {
            isDisbursment,
            disbursmentDate,
            disbursmentAmount,
            disbursmentSubmitDate,
            firstUcCertificate,
            smpuTrancheApproval
        }

        let validation = {
            ...inputValidations
        }
        const notValid = validate(data, validation);
        if (notValid)
            this.setState({ errors: notValid })
        else {
            this.props.onApprove(data)
        }
    }

    render() {
        const {
            isDisbursment,
            disbursmentSubmitDate,
            disbursmentDate,
            disbursmentAmount,
            firstUcCertificate,
            smpuTrancheApproval,
            uploadingIndexes,
            errors
        } = this.state

        return (
            <form>
                <Row className="approve-tab">
                    <Col className="score-tabs">
                        <div className="assesment-tab">
                            <Col md="10" className="p-0">
                                <Col md="6" className="p-0">
                                    <FormGroup>
                                        <DatePicker
                                            label="First Tranche UC Disbursement Date"
                                            name="disbursmentSubmitDate"
                                            onChange={this.onChange}
                                            value={disbursmentSubmitDate}
                                            error={errors['disbursmentSubmitDate']}
                                        />
                                    </FormGroup>
                                </Col>
                            </Col>
                            <Col md="10" className="p-0">
                                <Row>
                                    <Col xl="6" >
                                        <FormInput
                                            type="radio"
                                            label="Second Tranche Disbursement"
                                            options={IS_TRUE}
                                            name="isDisbursment"
                                            onChange={this.onChange}
                                            value={isDisbursment}
                                            error={errors['isDisbursment']}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <DatePicker
                                                label="DMMU Verification Date"
                                                name="disbursmentDate"
                                                onChange={this.onChange}
                                                value={disbursmentDate}
                                                error={errors['disbursmentDate']}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xl="6" >
                                        <FormInput
                                            type="number"
                                            label="Second Tranche Disbursement Amount"
                                            name="disbursmentAmount"
                                            onChange={this.onChange}
                                            value={disbursmentAmount}
                                            error={errors['disbursmentAmount']}
                                            max = {6}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <div className="document-choose">
                                <h2 className="mb-3">Required Documents</h2>
                                <Uploadfile
                                    label="First Tranche UC Certificate"
                                    name="firstUcCertificate"
                                    id="firstUcCertificate"
                                    onChange={this.onUpload}
                                    uploadedFileName={firstUcCertificate.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('firstUcCertificate')}
                                    error={errors['firstUcCertificate']}
                                />
                                <Uploadfile
                                    label="SMMU Approval Letter"
                                    name="smpuTrancheApproval"
                                    id="smpuTrancheApproval"
                                    onChange={this.onUpload}
                                    uploadedFileName={smpuTrancheApproval.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('smpuTrancheApproval')}
                                    error={errors['smpuTrancheApproval']}
                                />
                            </div>
                            <Row className="p-3 mb-3 d-flex align-items-center">
                                <Col className="p-0">
                                    <p className="m-0">Complete all above data before Submit Second Tranche</p>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        color={'primary'}
                                        className="fw-60 br-1 ml-auto"
                                        onClick={this.onSubmit}
                                    >
                                        Submit Second Tranche
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </form>
        );
    }
}

export default SecondTranche

let inputValidations = {
    "isDisbursment": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "disbursmentDate": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "disbursmentAmount": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        },
        numericality: {
            onlyInteger: true,
            lessThanOrEqualTo: 150000,
        }
    },
    "disbursmentSubmitDate": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "firstUcCertificate": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    },
    "smpuTrancheApproval": {
        presence: {
            allowEmpty: false,
            message: "^Field is mandatory"
        }
    }
}
