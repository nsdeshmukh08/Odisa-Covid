import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class UserLogin extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        // console.log(this.props)
        return (
            <>
                <div className="container">
                    <div className=" title-h5 pb-4 text-center font-weight-bold">User Login</div>
                    <div className="d-flex justify-content-center w-50 m-auto background-color-#f7694b">
                        <form className="pt-2" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="input-group">
                                    <input placeholder="UserName" type="email"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input placeholder="Password" type="password"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <Link to="/user/dashboard"> <button className="bg-white border-radius-oval fs-18 mr-3">Login</button></Link>
                                    <Link to="/staff/dashboard"> <button className="bg-white border-radius-oval fs-18">Staff Login</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
