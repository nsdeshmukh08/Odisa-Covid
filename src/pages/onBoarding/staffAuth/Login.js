import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col,UncontrolledAlert } from 'reactstrap';
import { Button } from 'reactstrap';
import Logo from 'assets/images/logo.png';
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from 'helpers'
import LoginCard from 'component/Cards/onBoarding/LoginCard'
import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';
import { connect } from 'react-redux'
import { common } from 'service/actionType'

const DEFAULT_COUNTRY_CODE='91'
const { SESSION_API } = API_BOOK.ADMIN_MANAGEMENT

let initialState = {
    userName : '',
    password : '',
    errors : {},
    loading : false,
}

class LoginClass extends Component {
    state = {
        ...initialState,
        cancelToken : axios.CancelToken.source(),
    }

    componentWillUnmount(){
        console.log('soasdas')
    }

    //HANDLE CHANGE
    handleChange = (name,value) => {
        this.setState( (state) => ({
            [name] : value,
            errors : {
                ...state.errors,
                [name] : undefined
            }
        }))
    }

    reset = () => {
        this.setState(
            {...initialState}
        )
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const { userName,password,cancelToken } = this.state
        let data = {
            userName,
            password
        }
        const notValid = validate(data, inputValidations);
        if(notValid){
            this.setState({
                errors : {
                    ...notValid
                }
            })
        }else{
            this.setState({
                loading : true
            })
            let requestPayload = {
                ...SESSION_API.STAFF_LOGIN_API,
                data,
                cancelToken:cancelToken.token
            }
            let response = await API(requestPayload)
            if(response.status === 200){
                this.props.dispatch({ type:common.RESET_STAFF_DETAILS })
                localStorage.setItem('role',response.data.data.role )
                let pathname = ``
                if(response.data.data.role ===1) {
                    pathname = `/staff/userManagement`
                } else {
                    pathname = `/staff/home`
                }
                localStorage.setItem('token',response.data.data.token)
                if(response.data.data.isNewUser)
                    pathname = 'passwordReset'
                this.props.history.push({
                    pathname,
                    state : {
                        ...response.data.data,
                        userName
                    }
                })
            }else{
                toast(response.data.message,'error')
                this.reset()
            }
        }
    }

    render() { 

        const { 
            userName,
            password,
            errors,
            loading 
        } = this.state

        const { history } = this.props

        let theme = this.context;
        
        return ( 
            <LoginCard
                name="COVID-19 assistance package"
                description={theme.LOGIN_DESCRIPTION}
                showLanguageToggler={true}
            >
            <form className="login-form" onSubmit={this.onSubmit}>
                <Col xs-12 className="p-0 user-logo text-center pb-3" >
                    <span className="logo-img">
                        <img src={Logo} alt="logo"></img>
                        <h3 className="text-darkgray">CAP - ODISHA</h3>
                    </span>
                </Col>
                {
                    new URLSearchParams(history.location.search).get('message') ?
                        <UncontrolledAlert toggle={() => history.replace('login')}className=" d-flex align-items-center">
                            <i class="icon-success mr-2"></i>
                            <small>{new URLSearchParams(history.location.search).get('message')}</small>
                        </UncontrolledAlert >
                        : ''
                }
                <div>
                    <FormInput 
                        type="text"
                        label="User ID"
                        name="userName"
                        error={errors['userName']}
                        value={userName}
                        onChange={this.handleChange}
                    />
                    <FormInput 
                        type="password" 
                        label="Password"
                        name="password"
                        error={errors['password']}
                        value={password}
                        onChange={this.handleChange}
                    />
                </div>
                <Col xs-12 className="p-0 text-right mb-4 mt-4" >
                    <NavLink to="forgotUserId" className="mr-3">Forgot User ID ? </NavLink>
                    <NavLink to="forgotPassword">Forgot Password ? </NavLink>
                </Col>
                <Row className="links-container">
                    <Col md="12">
                        <Button 
                            color="primary w-100 border-none" 
                            className="fw-600"
                            type="submit"
                            disabled={loading}
                        >
                            Login
                        </Button>
                    </Col>
                </Row>
            </form>
        </LoginCard>
         );
    }
}

LoginClass.contextType = ThemeContext;

export const Login = connect(null,null)(LoginClass)

const inputValidations = {
    userName: {
        presence: {
            allowEmpty: false,
            message: "^User Id can't be blank"
        }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Password can't be blank"
      },
      validateStaffPassword : true
    }
  };
