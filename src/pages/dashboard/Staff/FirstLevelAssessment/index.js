import React,{ Component } from 'react';
import {
    Navbar,
    Container,
    NavbarBrand,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
  } from "reactstrap";
  import { ApplicationDetailHeader } from 'component/Header/Staff'
  import FormInput from 'component/inputs/FormInput'
  import Uploadfile from 'component/inputs/Uploadfile'

export class FirstLevelAssessment extends Component {

    state = {
        selectedApplication: {},
        supportDocument: false,
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
        error: {}

    }

    onChange = (e) => {
        let { value, name, checked, type } = e.target;
        console.log(value, name, type)
        this.setState(
          {
            [name]: !value ? value : checked,
            errors : {}
          },
          () => this.handleCallBack(name)
        );
      };

    onFileChange = (name, value) => {
        let { uploadDocuments, errors } = this.state
        uploadDocuments[name] = value
        errors[name] = undefined
        this.setState({ uploadDocuments, errors })
    }

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
    
    render() { 
        const { history } = this.props;
        const {
            selectedApplication,
            supportDocument,
            uploadDocuments,
            uploadingIndexes,
            errors
        } = this.state

        return(
            <div>
                <form onSubmit={this.createUser}>
        <Navbar className="main-navbar shadow-none p-2" color="white" light>
          <Container fluid>
            <NavbarBrand href="#">
              <div className="d-flex align-items-center">
                <div className="dummy-profile-image mr-3"></div>
                <span>CAP - ODISHA</span>
              </div>
            </NavbarBrand>
          </Container>
        </Navbar>
        <Container className="create-firstlevelassessment-container">
          <Card className="border-0 bg-white mb-3">
            <CardBody className="px-4 card-body py-3 ">
              <h1>First Level Assessment</h1>
              <ApplicationDetailHeader type="PG" staffRole={3} applicationDetail={selectedApplication} toggle={this.props.toggle} />
            </CardBody>
          </Card>
          <Card className="border-0 bg-white">
            <CardBody className="p-4 ">
              <Container fluid className="p-0 border-bottom">
                <Row>
                  <Col md="6">
                    <p className="light-grey-2">Assessment</p>
                    <Row>
                    <Col md="12">
                        <label>S/he herself is a SHG member or belongs to a SHG household</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="12">
                        <label>The SHG member/ her household own the Nano or Micro enterprise for which loan is applied</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="12">
                        <label>The age of enterprise is above 6 months</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="12">
                        <label>The applicant is not a SHG/ Bank loan defaulter (record of last one year to be verified except the COVID-19 pandemic period)</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="12">
                        <label>The Enterprise/ Activity is not coming under the Negative List as per guidelines</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="shgMemberType"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <p className="light-grey-2">Supportive Document</p>
                    <Row>
                    <Col md="6">
                        <label>Supportive Document</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="6">
                        {supportDocument == false ? <><label>Choose Document</label>
                        <Uploadfile
                            label=""
                            isMult={true}
                            onChange={this.onUpload}
                        ></Uploadfile></> : <FormInput
                            type="textarea"
                            label={'Comment'}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                        }
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <label>Supportive Document</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="6">
                        {supportDocument == false ? <><label>Choose Document</label>
                        <Uploadfile
                            label=""
                            onChange={this.onFileChange}
                        ></Uploadfile></> : <FormInput
                            type="textarea"
                            label={'Comment'}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                        }
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <label>Supportive Document</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="6">
                        {supportDocument == false ? <><label>Choose Document</label>
                        <Uploadfile
                            label=""
                            onChange={this.onFileChange}
                        ></Uploadfile></> : <FormInput
                            type="textarea"
                            label={'Comment'}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                        }
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <label>Supportive Document</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="6">
                        {supportDocument == false ? <><label>Choose Document</label>
                        <Uploadfile
                            label=""
                            onChange={this.onFileChange}
                        ></Uploadfile></> : <FormInput
                            type="textarea"
                            label={'Comment'}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                        }
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <label>Supportive Document</label>
                        <FormInput
                            type="radio"
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                    </Col>
                    <Col md="6">
                        {supportDocument == true ? <><label>Choose Document</label>
                        <Uploadfile
                            label=""
                            onChange={this.onFileChange}
                        ></Uploadfile></> : <FormInput
                            type="textarea"
                            label={'Comment'}
                            name="supportDocument"
                            onChange={this.onChange}
                            value={""}
                        />
                        }
                    </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            
              <Container fluid className="p-0">
                <Col md="3" className="align-self-end pt-4 ml-auto p-0">
                  <div className="d-flex align-items-end">
                    <Button
                      color="primary"
                      block
                      type="submit"
                      className="br-1 mb-2 mt-0"
                    >
                      Submit Assessment
                    </Button>
                  </div>
                </Col>
              </Container>
            </CardBody>
          </Card>
        </Container>
      </form>
            </div>
       )  
    }
}