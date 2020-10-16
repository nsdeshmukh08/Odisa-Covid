import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import Logo from 'assets/images/logo.png';
import FormInput from 'component/inputs/FormInput'
import { ThemeContext } from 'helpers'
import LoginCard from 'component/Cards/onBoarding/LoginCard'
import validate from 'helpers/validation';
import { axios, API, API_BOOK } from 'service'
import toast from 'helpers/Toast';

// const DEFAULT_COUNTRY_CODE = '91'
const { SESSION_API } = API_BOOK.USER_MANAGEMENT

let initialState = {
    mobile: '',
    password: '',
    errors: {},
    // countryCode: DEFAULT_COUNTRY_CODE,
    loading: false,
}

export class Login extends Component {
    state = {
        ...initialState,
        cancelToken: axios.CancelToken.source(),
    }

    //HANDLE CHANGE
    handleChange = (name, value) => {
        this.setState((state) => ({
            [name]: value,
            errors: {
                ...state.errors,
                [name]: undefined
            }
        }))
    }

    reset = () => {
        this.setState(
            { ...initialState }
        )
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const { mobile, password, countryCode, cancelToken } = this.state
        let data = {
            mobile,
            password
        }

        const notValid = validate(data, inputValidations);
        if (notValid) {
            this.setState({
                errors: {
                    ...notValid
                }
            })
        } else {
            this.setState({
                loading: true
            })
            // data['mobile'] = countryCode + data['mobile']
            data['mobile'] = data['mobile']
            let requestPayload = {
                ...SESSION_API.LOGIN,
                data,
                cancelToken: cancelToken.token
            }
            let response = await API(requestPayload)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.data.token)
                localStorage.setItem('role',response.data.data.role)
                this.props.history.push({
                    pathname: '/user/dashboard',
                    state: {
                        mobile: data.mobile
                    }
                })
            } else {
                toast(response.data.message, 'error')
                this.reset()
            }
        }
    }


    render() {

        const {
            mobile,
            password,
            errors,
            loading
        } = this.state

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
                    <div>
                        <FormInput
                            type="mobile"
                            label={theme.MOBILE_NUMBER}
                            name="mobile"
                            onCountryCodeChange={
                                (value) => this.handleChange(
                                    'countryCode',
                                    value
                                )
                            }
                            error={errors['mobile']}
                            value={mobile}
                            onChange={this.handleChange}
                            // maxLength={10}
                        />
                        <FormInput
                            type="password"
                            label={theme.PASSWORD}
                            name="password"
                            maxLength={6}
                            error={errors['password']}
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Col xs-12 className="p-0 text-right mb-4 mt-4" >
                        <NavLink
                            to="forgotPassword"
                            className="text-darkblue fs-18">
                            {theme.FORGOT_PASSWORD} ?
                        </NavLink>
                    </Col>
                    <Row className="links-container">
                        <Col md="6">
                            <Link to="register">
                                <Button
                                    outline
                                    color="primary w-100 border-none"
                                    className="text-darkblue fw-600"
                                    disabled={loading}
                                    type="button"
                                >
                                    {theme.CREATE_ACCOUNT}
                                </Button>
                            </Link>
                        </Col>
                        <Col md="6">
                            <Button
                                color="primary w-100 border-none"
                                className="fw-600"
                                type="submit"
                                disabled={loading}
                            >
                                {theme.LOGIN}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </LoginCard>
        );
    }
}

Login.contextType = ThemeContext;

const inputValidations = {
    mobile: {
        presence: {
            allowEmpty: false,
            message: "^Mobile Number can't be blank"
        },
        numericality: {
            onlyInteger: true,
            message: "^Provide a valid Mobile Number"
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Provide a valid Mobile Number"
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password can't be blank"
        },
        validatePassword: true
    }
};
