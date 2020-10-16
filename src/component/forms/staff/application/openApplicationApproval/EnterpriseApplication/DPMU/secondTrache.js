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
        disbursmentSubmitDate:null,
        firstUcCertificate: [],
        uploadingIndexes: [],
        errors: {},
        cancelToken: axios.CancelToken.source(),
    }

    state = {
        ...this.initialState
    }

    onChange = (name, value) => {
        let { errors } = this.state
        // console.log(name,":",value,"&&&&&&&&&&&&7")

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
            disbursmentSubmitDate,
            firstUcCertificate,
            errors
        } = this.state

        let data = {
            disbursmentSubmitDate,
            firstUcCertificate,
            applicationStatus: 5,
        }

        let validation = {
            ...inputValidations
        }
        console.log(data)
        const notValid = validate(data, validation);
        console.log(notValid)
        if (notValid)
            this.setState({ errors: notValid })
        else {
            this.props.onApprove(data)
        }
    }

    render() {
        const {
            disbursmentSubmitDate,
            firstUcCertificate,
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
                                            label="UC Disbursement Date"
                                            name="disbursmentSubmitDate"
                                            onChange={this.onChange}
                                            value={disbursmentSubmitDate}
                                            error={errors['disbursmentSubmitDate']}
                                        />
                                    </FormGroup>
                                </Col>
                            </Col>
                            <div className="document-choose">
                                <h2 className="mb-3">Required Documents</h2>
                                <Uploadfile
                                    label="UC Certificate"
                                    name="firstUcCertificate"
                                    id="firstUcCertificate"
                                    onChange={this.onUpload}
                                    uploadedFileName={firstUcCertificate.map(data => data.docName).join(', ')}
                                    isUploading={uploadingIndexes.includes('firstUcCertificate')}
                                    error={errors['firstUcCertificate']}
                                />
                            </div>
                            <Row className="p-3 mb-3 d-flex align-items-center">
                                <Col className="p-0">
                                    <p className="m-0">Complete all above data before Approve</p>
                                </Col>
                                <Col md="auto">
                                    <Button
                                        color={'primary'}
                                        className="fw-60 br-1 ml-auto"
                                        onClick={this.onSubmit}
                                    >
                                        Submit & Close
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
    }
}
