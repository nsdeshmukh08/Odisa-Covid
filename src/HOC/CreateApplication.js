import React, { Component, Fragment } from 'react';
import Loader from 'component/Loader'
import { connect } from 'react-redux';
import { getDraftForm } from 'action/createApplication/producerCollective';
import { getPgDraftForm } from 'action/createApplication/producerGroup';
import { getSymrDraftForm } from "action/createApplication/symr"
import { getEGDraftForm } from "action/createApplication/enterpriseGroup"
import { getIaDraftForm } from "action/createApplication/IAapplication";
import { getIeDraftForm } from "action/createApplication/IEapplication";

import { bindActionCreators } from 'redux'
import _ from "lodash";
import { axios, API, API_BOOK } from "service";
import { getApplicationType } from "helpers"

function CreateApplicationFunc(WrappedComponent) {
    // And return a new anonymous component
    return connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

        state = {
            cancelToken: axios.CancelToken.source()
        }

        componentDidMount() {
             this.getApplicationDetails()
        }

        getApplicationDetails = async () => {
            const { cancelToken } = this.state
            switch (getApplicationType()) {
                case 'symr':
                    this.props.getSymrDraftForm(cancelToken.token)
                    break;
                case 'productiveCollective':
                    this.props.getDraftForm(cancelToken.token)
                    break;
                case 'producerGroup':
                    this.props.getPgDraftForm(cancelToken.token)
                    break;
                case 'enterpriseGroup':
                    this.props.getEGDraftForm(cancelToken.token)
                    break;
                case 'diffabledVulnerable':
                    this.props.getIaDraftForm(cancelToken.token)
                    break;
                case 'individualEnterprise':
                    this.props.getIeDraftForm(cancelToken.token)
                    break;   
                //  default:
                //       this.props.history.push('/user/Dashboard')
            }
        }

        render() {
            const { isLoading } = this.state
            const { isApplicationFetchingDraftDetails } = this.props.loaders
            return (
                <Fragment>
                    {
                        isApplicationFetchingDraftDetails ?
                            <div className="application-main-container">
                                <Loader />
                            </div> : <WrappedComponent {...this.props} />
                    }
                    {/* <WrappedComponent {...this.props} /> */}
                </Fragment>

            )
        }
    })
}

const mapStateToProps = (state) => {
    return ({
        loaders: state.loaders,
        publicUser: state.publicUser
    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDraftForm,
        getPgDraftForm,
        getSymrDraftForm,
        getEGDraftForm,
        getIaDraftForm,
        getIeDraftForm
    }, dispatch);
};

export default CreateApplicationFunc;
