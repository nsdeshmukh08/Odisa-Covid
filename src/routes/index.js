import React, { Component, Suspense } from 'react';
import { Route, Router, Redirect } from "react-router-dom";

import Routers from "./routes"
import * as Layout from "../layout";
import * as Pages from "../pages"
import { history, ThemeContext } from "../helpers"
import { languages } from 'languages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
class RoutesClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderRoute: false,
            pathname: null,
            loading: true,
            languageSelected: 'ENGLISH'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.languageSelected !== prevState.languageSelected)
            return {
                languageSelected: nextProps.languageSelected
            }
        return null
    }

    render() {

        const { languageSelected } = this.state

        return (
            <Suspense fallback="asdasd">
                <ThemeContext.Provider value={languages[languageSelected]}>
                    <Router history={history} >

                        {Routers.map(({ component, redirect, path, exact = false, auth = true, childrens = [] }) => {

                            if (childrens.length > 0) {
                                //console.log("childrens=======>", childrens);
                                return (
                                    <Route
                                        path={path}
                                        exact={exact}
                                        key={path}
                                        render={(props) => {

                                            if (redirect) {
                                                if (props.location.pathname === path) {
                                                    props.history.push(redirect)
                                                }
                                            }

                                            if (auth) {
                                                console.log(props.location.pathname)
                                                if (props.location.pathname === "/staff/dashboard" && !localStorage.getItem('token')) {
                                                    return props.history.push(redirect)
                                                }
                                            }

                                            const LayoutComponent = Layout[component]

                                            return (

                                                <LayoutComponent {...props} >

                                                    {childrens.map(({ component: ChildrenComponent, path: childrenPath, exact = false, auth = true }) => {

                                                        return <Route
                                                            path={path + childrenPath}
                                                            exact={exact}
                                                            key={path + childrenPath}
                                                            render={(props) => {
                                                                
                                                                let PageComponent = Pages[ChildrenComponent]

                                                                return <PageComponent {...props} />
                                                            }}

                                                        />

                                                    })}
                                                </LayoutComponent>
                                            )

                                        }}

                                    />
                                )


                            }

                            return <Route
                                path={path}
                                exact={exact}
                                key={component || 2322}
                                render={(props) => {
                                    if (component) {
                                        let PageComponent = Pages[component]
                                        return <PageComponent />
                                    }
                                    if (redirect) {
                                        return <Redirect to={redirect} />
                                    }
                                    return <div></div>
                                }}

                            />

                        })}
                    </Router>
                </ThemeContext.Provider>
            </Suspense>


        );

    }

}


const mapStateToProps = (state) => {
    return state.theme
}

export default connect(mapStateToProps, null)(RoutesClass)