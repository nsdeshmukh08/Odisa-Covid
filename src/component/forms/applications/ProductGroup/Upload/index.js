import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as createApplicationActions from 'action/createApplication/producerGroup';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import UploadForm from './UploadForm'


// const { UPLOAD_DOC_API } = API_BOOK.APPLICATION;

export class UploadClass extends Component {

    defaultUploadObject = { "docUrl": null, "docName": null, "docType": null, "formId": localStorage.getItem('createAppformId') }

    state = {
        "uploadDocuments": {
            "formId": null,
            "firstResolutionofPGEG": [],
            "copyofBankPassbook": [],
            "listofOfficeBearers": [],
            "existingLoanRepay": [],
            "businessPlan": [],
            "applyingLoan": [],
        },
        uploadingIndexes : [],
        errors: {},
        loading : false,
        cancelToken: axios.CancelToken.source(),
        init : true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                uploadDocuments: {
                    ...nextProps.pgFormUploadDocument,
                },
                init: false
            }
        return null
    }

    // HANDLE INPUT CHANGE

    onUpload = async (name, files) => {
        let { cancelToken,uploadDocuments,errors,uploadingIndexes } = this.state;
        if (files.length) {
            uploadingIndexes.push(name)
            this.setState({uploadingIndexes})
            errors[name] = undefined
            let newUploadArray=[]
            let formData = new FormData()
            for (var i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }
            this.setState({
                loading: true
            })
            // let requestPayload = {
            //     ...UPLOAD_DOC_API,
            //     data: formData,
            //     cancelToken: cancelToken.token
            // };
            // let response = await API(requestPayload);
            if (true){
                for (var i = 0; i < files.length; i++) {
                    // console.log(files, "files")
                    // console.log(files[0]['url'], "files")
                    newUploadArray.push({
                        ...this.defaultUploadObject, 
                        docUrl : files[i]['url'],
                        docName : files[i]['name'],
                        docType : 1
                    })
                }
                uploadDocuments[name]=newUploadArray
                console.log(newUploadArray, "fdsaf")
                uploadingIndexes = this.state.uploadingIndexes.filter(data => data !== name)
            }else{
                uploadingIndexes.pop(name)
                // toast(response.data.message, "error");
            }
            this.setState({ loading: false,uploadDocuments,errors,uploadingIndexes })
        }else{
            uploadDocuments[name]=[]
            this.setState({ uploadDocuments })
        }
    }

    //HANDLE CHANGE
    onChange = (name, value) => {
        let { uploadDocuments, errors } = this.state
        uploadDocuments[name] = value
        errors[name] = undefined
        this.setState({ uploadDocuments, errors })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { uploadDocuments, cancelToken } = this.state
        let validation = {
            ...inputValidations
        }
        const notValid = validate(uploadDocuments, validation);
        console.log(notValid, "notValid")
        if (notValid) {
            this.setState({
                errors: notValid
            })
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            uploadDocuments['formId'] = localStorage.getItem('createAppformId')
            this.props.history.push((stage + 1).toString())
            this.props.updateForm(
                { data: uploadDocuments, stage },
                cancelToken.token
            )
        }
    }

    render() {
        const { location } = this.props;
        const { loading } = this.state
        let pathname = location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1))
        return (
            <form className="container theme-one-common  mt-3 bg-white p-4" onSubmit={this.onSubmit}>
                <UploadForm 
                    {...this.state}
                    onChange={this.onChange}
                    onUpload={this.onUpload}
                />
                <Row className="producer-form-footer bg-white p-4 border-top align-items-center">
                    <Col lg="6" md="6" sm="12" className="update-draft">
                        <span class="custom-caret dark mr-2"><i class="icon-tick"></i></span>
                        <span className="update-draft">All Updates Saved as Draft</span>
                    </Col>
                    <Col lg="5" md="6" sm="12" className="ml-auto">
                        <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                            <Col>
                                <Link to={(currentSection - 1).toString()}>
                                    <Button outline color="lighGrey-2 w-100 border-none" className="fw-600"  disabled={loading}>Previous</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button color="primary w-100 border-none" className="fw-600" type="submit" disabled={loading}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return state.publicUser.application.newApp.producerGroup
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(createApplicationActions, dispatch);
};

const Upload = connect(mapStateToProps, mapDispatchToProps)(UploadClass)

export { Upload }

let inputValidations = {
    "firstResolutionofPGEG": {
        presence: {
            allowEmpty: true,
            message: "^Document is mandatory"
        }
    },
    "copyofBankPassbook": {
        presence: {
            allowEmpty: true,
            message: "^Document is mandatory"
        }
    },
    "businessPlan": {
        presence: {
            allowEmpty: true,
            message: "^Document is mandatory"
        }
    },
    "listofOfficeBearers": {
        presence: {
            allowEmpty: true,
            message: "^Document can't be blank"
        }
    },
    "existingLoanRepay": {
        presence: {
            allowEmpty: true,
            message: "^Document can't be blank"
        }
    },
    "applyingLoan": {
        presence: {
            allowEmpty: true,
            message: "^Document can't be blank"
        }
    }
}