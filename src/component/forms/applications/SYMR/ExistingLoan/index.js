import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as symr from 'action/createApplication/symr';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import ExistingLoanForm from './ExistingLoanForm';
import pcFormProposedActivity from 'reducer/publicUser/application/new/producerCollective/pcFormProposedActivity';

class ExistingLoanClass extends Component {

    defaultActivityObject = {
        formId : localStorage.getItem('createAppformId'),      
         "loanSource":null, 
        "loanReceivedDate":null, 
        "loanAmount":null,
        "interestRate":null,
        "amountToBeRepaid":null,
        "amountRepaid":null,
        "balanceAmtToBeRepaid":null,
        "reason":null 
        
    }

    state = {
        symrExistingLoan: {
            isExistingLoan:false,
            existingLoanList:[]
        },
        init : true,
        cancelToken: axios.CancelToken.source(),
    }

    componentDidMount() {
        this.initialize()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.init)
            return {
                symrExistingLoan: {...nextProps.symrExistingLoan},
                init : false
            }
        return null
    }

    //HANDLE CHANGE
    onChange = (name, value,index=undefined) => {
        console.log(name, value)
        let { symrExistingLoan } = this.state
        if(index !== undefined)
            symrExistingLoan.existingLoanList[index][name] = value
        else {
            symrExistingLoan[name]=value
            symrExistingLoan.existingLoanList=[]
        }
        this.setState({ symrExistingLoan }, () => this.handlecallback(name, value))
    }

    //INITIALIZE
    handlecallback = (name, value) => {
        let {symrExistingLoan} = this.state
        symrExistingLoan.existingLoanList  && symrExistingLoan.existingLoanList.map(data => {
            if(parseInt(data.amountToBeRepaid) > 0 && parseInt(data.amountRepaid) > 0){
               let balance = parseInt(data.amountToBeRepaid) - parseInt(data.amountRepaid) 
               data.balanceAmtToBeRepaid = balance.toString()
            }
        })
        
        this.setState({
            symrExistingLoan
        })
    }
    initialize = () => {
        let { symrExistingLoan } = this.state
        if(symrExistingLoan.existingLoanList.length === 0){
            symrExistingLoan.existingLoanList.push({...this.defaultActivityObject})
            this.setState({ symrExistingLoan })
        }
    }

    onAddOrRemoveActivity = (index = null) => {
        let { symrExistingLoan } = this.state
        if (index === null) {
            symrExistingLoan.existingLoanList.push(Object.assign({}, this.defaultActivityObject))
        }
        else {
            symrExistingLoan.existingLoanList = symrExistingLoan.existingLoanList.filter((data, i) => index !== i)
        }
        this.setState({
            symrExistingLoan
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { symrExistingLoan,cancelToken } = this.state
        let isValid=true
        if(symrExistingLoan.isExistingLoan === true){
            console.log(symrExistingLoan.existingLoanList)
            isValid = symrExistingLoan.existingLoanList.length&&symrExistingLoan.existingLoanList.every(data => {
                return Object.keys(data).every((k)=>!!data[k])

           })
        }
        if (!isValid) {
            toast('Enter the details','error')
        } else {
            let pathname = this.props.location.pathname
            let stage = parseInt(pathname.toString().substr(pathname.length - 1))
            symrExistingLoan['formId']=localStorage.getItem('createAppformId')
            // this.props.history.push((currentSection + 1).toString())
            this.props.updateForm(
                {data:symrExistingLoan,stage},
                cancelToken.token
            )
        }
    }

    render() {
        const { location } = this.props;
        let pathname = location.pathname
        let currentSection = parseInt(pathname.toString().substr(pathname.length - 1));
        return (
            <form className="container theme-one-common  mt-3 bg-white" onSubmit={this.onSubmit}>
                <ExistingLoanForm 
                    {...this.state} 
                    onAddOrRemoveActivity={this.onAddOrRemoveActivity}
                    onChange={this.onChange}
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
                                    <Button 
                                        outline 
                                        color="lighGrey-2 w-100 border-none" 
                                        className="fw-600"
                                        type="button"
                                    >
                                        Previous
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                            <Button 
                                color="primary w-100 border-none" 
                                className="fw-600" 
                                type="submit"
                            >
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
    return state.publicUser.application.newApp.symr
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(symr, dispatch);
};

const ExistingLoan = connect(mapStateToProps, mapDispatchToProps)(ExistingLoanClass)

export { ExistingLoan }