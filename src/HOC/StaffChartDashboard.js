import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import _ from "lodash";
import { axios, API, API_BOOK } from "service";
import { DashboardHeader } from 'component/Header/Staff';
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import toast from "helpers/Toast";
import { STAFF_ROLE_ID } from 'helpers/variables';
import { getFundsCharts } from 'action/staff/charts/funds'
import Loader from 'component/Loader'
import { getEnterpriseCharts } from 'action/staff/charts/enterprise'
import { getBeneficiaryCharts } from 'action/staff/charts/beneficiary'
import { getApplicationsCharts } from 'action/staff/charts/applications'

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

function StaffChartDashboard(WrappedComponent) {

    return connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

        state = {
            cancelToken: axios.CancelToken.source(),
            loading: true,
            districtList: [],
            blockList: [],
            panchayatList: [],
            district: [],
            block: [],
            panchayat: [],
            formType: [],
            filterName: null,
            filterOptions: null,
            districtId: [],
            blockId: [],
            panchayatId: []
        }

        componentDidMount() {
            const { role } = this.props.profile;
            if (role) {
                this.init();
            }
        }

        init = () => {
            const { role, address } = this.props.profile;
            if (role === STAFF_ROLE_ID.SMMU) {
                let { search } = this.props.location
                if (search)
                    this.getQueryDetails(search)
                else this.getDistrict()
                this.listenQueryChange()
            } else if (role === STAFF_ROLE_ID.DMMU) {
                let districtId = address?.district?.value
                let { search } = this.props.location
                if (search) {
                    this.getQueryDetails(search)
                } else {
                    this.setState({
                        districtId
                    }, this.getBlock)
                }
                this.listenQueryChange()



            } else {
                let blockId = address?.block?.value
                this.setState({
                    blockId
                }, this.getPanchayat)
            }
        }

        listenQueryChange = () => {
            this.props.history.listen((location) => this.getQueryDetails(location.search));
        }

        // HANDLE CHANGE
        onChange = (name, value) => {
            if (name === "All Districts") {
                this.setState(
                    {
                        districtId: value
                    }
                );
            }
            else if (name === "All Blocks") {
                this.setState({
                    blockId: value
                }
                )
            }
            else if (name === "All Panchayat") {
                this.setState(
                    {
                        panchayatId: value
                    }
                );
            }
            else if (name === "All Components") {
                this.setState(
                    {
                        formType: value
                    }
                );
            }
        }

        getQueryDetails = (search = '') => {
            let queryString = search
            let { role, address } = this.props.profile
            if (queryString && (parseInt(role) === STAFF_ROLE_ID.SMMU || parseInt(role) === STAFF_ROLE_ID.DMMU)) {
                let data = new URLSearchParams(queryString)
                let selectedDistrict = parseInt(data.get('district'))
                let selectedBlock = parseInt(data.get('block'))
                if (selectedBlock)
                    this.getPanchayat(selectedBlock)
                else if (!selectedBlock) {
                    this.setState({
                        panchayatList: [],
                        panchayatId: []
                    })
                }
                if (selectedDistrict) {
                    this.getBlock(selectedDistrict)
                }
                else if (!selectedDistrict) {
                    this.setState({
                        blockList: [],
                        blockId: []
                    })
                }
            } else {
                this.setState({
                    districtList: [],
                    blockList: [],
                    panchayatList: [],
                    panchayatId: [],
                    blockId: []
                }, () => {
                    if ((parseInt(role) === STAFF_ROLE_ID.SMMU)) {
                        this.getDistrict()
                    } else if (parseInt(role) === STAFF_ROLE_ID.DMMU) {
                        this.getBlock()
                    }
                })
            }
        }

        //services
        getDistrict = async () => {
            const { cancelToken } = this.state;
            this.setState({
                loading: true
            })
            let requestPayload = {
                ...CORE_API.GET_DISTRICT_LIST_API,
                cancelToken: cancelToken.token,
            };
            let response = await API(requestPayload);
            if (response.status === 200)
                this.setState({
                    districtList: response.data.data.districtList
                });
            else toast(response.data.message, "error");
            this.setState({ loading: false })
        };

        getBlock = async (blockId) => {
            const { cancelToken } = this.state;
            this.setState({
                loading: true
            })
            let params = {
                districtId: blockId ? blockId : this.props.profile?.address?.district?.value
            };
            let requestPayload = {
                ...CORE_API.GET_BLOCK_LIST_API,
                params,
                cancelToken: cancelToken.token,
            };
            let response = await API(requestPayload);
            if (response.status === 200) {
                this.setState({
                    blockList: response.data.data.blockList,
                });
            }
            this.setState({ loading: false })
        };

        getPanchayat = async (panchayatId) => {
            const { cancelToken } = this.state;
            this.setState({
                loading: true
            })
            let params = {
                blockId: panchayatId ? panchayatId : this.props.profile?.address?.block?.value
            };
            let requestPayload = {
                ...CORE_API.GET_PANCHAYAT_LIST_API,
                params,
                cancelToken: cancelToken.token,
            };
            let response = await API(requestPayload);
            if (response.status === 200)
                this.setState({
                    panchayatList: response.data.data.panchayatList,
                });
            else toast(response.data.message, "error");
            this.setState({ loading: false })
        };

        render() {
            const { role } = this.props.profile;
            const {
                formType,
                districtList,
                blockList,
                panchayatList,
                districtId,
                blockId,
                panchayatId,
                loading
            } = this.state;

            const filterName =
                panchayatList.length
                    ? "All Panchayat"
                    : blockList.length ? "All Blocks" : role === 2 && !blockList.length ? "All Districts" : "All Blocks"

            const filterOption = panchayatList.length
                ? panchayatList
                : blockList.length
                    ? blockList
                    : role === 2 && !blockList.length ? districtList : blockList

            let filtervalue = filterName === "All Blocks"
                ? blockId
                : (filterName === "All Districts"
                    ? districtId : panchayatId)
            if (loading)
                return <div className="d-flex align-items-center justify-content-center w-100">
                    <Loader />
                </div>

            return (
                <Container fluid className="mt-4 dashboard-main custom-scrollbar">
                    <DashboardHeader
                        onChange={this.onChange}
                        filtername={filterName}
                        filterValue={filtervalue}
                        filteroption={filterOption}
                        formtype={formType}
                        {...this.props}
                    />
                    <Row className="my-3 package-assist">
                        <Col>
                            <div className="text-center bg-gainsboro br-2 p-4">
                                <h3
                                    className="fw-800 mb-3 text-darkGrey-1"
                                >
                                    COVID-19 Assistance Package
                                </h3>
                                <div className="mb-2">
                                    {filtervalue && filtervalue.length === 0 ? <Button color="lighGrey-2 h6" >{filterName}</Button> :
                                        filtervalue && filtervalue.map(block =>
                                            <Button color="lighGrey-2 mr-3 h6" >{block.label}</Button>
                                        )}
                                </div>
                                <div>
                                    {formType && formType.length === 0 ? <Button color="lighGrey-2 h6" >All Components</Button> :
                                        formType && formType.map(block =>
                                            <Button color="lighGrey-2 mr-3 h6">{block.label}</Button>
                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <WrappedComponent
                        {...this.props}
                        blockId={Array.isArray(blockId) ? blockId.map(data => data.value) : [blockId]}
                        districtId={Array.isArray(districtId) ? districtId.map(data => data.value) : [districtId]}
                        panchayatId={Array.isArray(panchayatId) ? panchayatId.map(data => data.value) : [panchayatId]}
                        formTypes={formType.map(data => data.value)}
                        districtList={districtList}
                        blockList={blockList}
                        panchayatList={panchayatList}
                    />
                </Container>

            )
        }
    })
}

const mapStateToProps = (state) => {
    return ({
        loaders: state.loaders,
        charts: state.staff.charts,
        profile: state.profile
    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getFundsCharts,
        getEnterpriseCharts,
        getBeneficiaryCharts,
        getApplicationsCharts
    }, dispatch);
};

export default StaffChartDashboard;