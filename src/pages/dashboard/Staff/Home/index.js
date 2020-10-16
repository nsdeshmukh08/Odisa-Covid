import React, { Component } from 'react'
import {
    Container,
} from "reactstrap";
import banner from "assets/images/Banner-Image.png"
import rightArrow from "assets/images/right-arrow.svg"
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        
    }

    onClick = ({name}) => {
        // console.log(name,"-----------------")
        let role = parseInt(localStorage.getItem('role'))
        if(role === 5 || role === 6)
            this.props.history.push("/staff/application/SYMR")
        else
        this.props.history.push("/staff/dashboard")
    }

    onClickUnder = () => {
        this.props.history.push("/staff/underConstruction")
    }

    render() {
        return (
            <Container fluid className="mt-4 home-main custom-scrollbar ">
                <div className="main-section">
                    <h1 className="mb-3">Welcome to TNRTP</h1>
                    <div>
                        <img className="bannerImage" src={banner} alt="banner" ></img>
                    </div>
                </div>
                <div className="menu-section pb-4 mt-4">
                    <h1 className="mb-3">Menu</h1>
                    <div class="row m-0">
                        <div class="col-md-3 p-0">
                            <div class="menu-box" onClick={this.onClick}>
                                <div class="menu-box-img bg1">
                                    CAP
                                </div>
                                <p class="menu-box-content">
                                    COVID-19 Assistance Package
                                </p>
                                <a href="" class="menu-box-link clr1">
                                    Launch 
                                    <i class="ml-3 fa arrow fa-chevron-right small"></i>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 p-0">
                            <div class="menu-box" onClick={this.onClickUnder}>
                                <div class="menu-box-img bg2">
                                    GRM
                                </div>
                                <p class="menu-box-content">
                                    Grievance Redressal Management
                                </p>
                                <a href="" class="menu-box-link clr2">
                                    Coming Soon.. 
                                    {/* <i class="ml-3 fa arrow fa-chevron-right small"></i> */}
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 p-0">
                            <div class="menu-box" onClick={this.onClickUnder}>
                                <div class="menu-box-img bg3">
                                    KMC
                                </div>
                                <p class="menu-box-content">
                                Knowledge Management & Communication
                                </p>
                                <a href="" class="menu-box-link clr2">
                                    Coming Soon.. 
                                    {/* <i class="ml-3 fa arrow fa-chevron-right small"></i> */}
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 p-0">
                            <div class="menu-box" onClick={this.onClickUnder}>
                                <div class="menu-box-img bg4">
                                E
                                </div>
                                <p class="menu-box-content">
                                e-Learning
                                </p>
                                <a href="" class="menu-box-link clr2">
                                    Coming Soon.. 
                                    {/* <i class="ml-3 fa arrow fa-chevron-right small"></i> */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        )
    }
}

export { Home }
