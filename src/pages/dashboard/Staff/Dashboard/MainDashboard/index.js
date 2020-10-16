import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Progress
} from "reactstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    BarChartsLoan,
    BarchartShg,
    BarChartVulnerable,
    BarChartEnterprise,
    BarChartGender,
    BarChartCommodity,
    BarChartCommunity
} from 'component/charts/dashboard'
import money from 'assets/images/money.svg'
import Beneficiaries from 'assets/images/beneficiaries.svg'
import flag from 'assets/images/flag.svg'
import { axios, API, API_BOOK } from 'service'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as StaffActions from "action/staff/adminDashboard";
import toast from "helpers/Toast";
import { STAFF_ROLE_ID, COMPONENT_FILTER } from 'helpers/variables';
import { getPercentage,formatToINR,downloadScreenshotOrPrint,moneyFormatBySymbol } from 'helpers';
import {DashboardHeader} from 'component/Header/Staff';

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;

// const { GET_STATISTICS_API } = API_BOOK.APPLICATION;
class DashboardClass extends Component {
    state = {
        percentage: 0,
        Received: 0,
        Approved: 0,
        Rejected: 0,
        Pending: 0,
        cancelToken: axios.CancelToken.source(),
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
        panchayatId: [],
        loading: false,
        statistics: {
            "fund": {
                "target": 0,
                "totalDisbursmentAmount": 0
            },
            "loanSize": {
                "lowestAmount": 0,
                "averageAmount": "0.0000",
                "highestAmount": 0
            },
            "applicationCount": {
                "approvedApplication": 0,
                "pendingApplication": 0,
                "rejectedApplication": 0
            },
            "beneficiary": {
                "target": 0,
                "totalBeneficiaries": "0"
            },
            "gender": {
                "totalGender": 0,
                "totalMale": "2",
                "totalFemale": "0",
                "totalTransgender": "0"
            },
            "community": {
                "totalCommunity": 0,
                "totalBC": "0",
                "totalMBC": "0",
                "totalSC": "0",
                "totalST": "0",
                "totalCommunityOthers": "0"
            },
            "shg": {
                "totalSHG": 0,
                "totalSHGMember": "0",
                "totalSHGHouseholds": "0",
                "totalNonSHGHouseholds": "0"
            },
            "vulnerable": {
                "totalVulnerable": 0,
                "totalDifferentlyAbled": "0",
                "totalWidow": "0",
                "totalDestituteWomen": "0",
                "totalDesertedWomen": "0",
                "totalEiderly": "0",
                "totalVulnerableTransgender": "0"
            }
        }
    }
    componentDidMount() {
        const { role } = this.props.profile;
        if(role) {
            this.init();
        }
    }

    init = () => {
        const { cancelToken, formType, blockId, districtId, panchayatId } = this.state;
        const { role } = this.props.profile;
        const payload = {
            "district": districtId,
            "block": blockId,
            "panchayat": panchayatId,
            "formType": formType,
            "climit": 10,
            "slimit": 3
        }
        this.getStatisticsDetails(payload, cancelToken.token);

        if (role === STAFF_ROLE_ID.SMMU) {
            this.getDistrict();
        } else if (role === STAFF_ROLE_ID.DMMU) {
            this.getBlock()
            this.setState({
                districtId: this.props.profile?.address?.district?.value
            })
        } else {
            this.getPanchayat()
            this.setState({
                blockId: this.props.profile?.address?.block?.blockId
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statistics != prevState.statistics)
            return {
                statistics: {
                    ...nextProps.statistics
                }
            }
        return null
    }
    getStatisticsDetails = (payload, cancelToken) => {
        this.props.getStatisticsDetails(payload, cancelToken);
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

    getBlock = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            districtId: this.props.profile?.address?.district?.value
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

    getPanchayat = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            blockId: this.props.profile?.address?.block?.value
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
    // HANDLE CHANGE
    onChange = (name, value) => {
        if (name === "All Districts") {
            this.setState(
                {
                    districtId: value
                },
                this.handleCallBack
            );
        } 
        else if (name === "All Blocks" ) {
            this.setState({
               blockId: value
            }, this.handleCallBack
        )
        }
        else if (name === "All Panchayat") {
            this.setState(
                {
                    panchayatId: value
                },
                this.handleCallBack
            );
        } 
        else if (name === "All Components") {
            this.setState(
                {
                    formType: value
                },
                this.handleCallBack
            );
        }
    }

    handleCallBack = () => {
        const { cancelToken, formType, districtId, blockId, panchayatId } = this.state;
        console.log(blockId, formType)
        this.getStatisticsDetails({
            "district": Array.isArray(districtId) ? districtId.map(block => { return block.value}) : [],
            "block":  Array.isArray(blockId) ? blockId.map(block => { return block.value}) : [],
            "panchayat":  Array.isArray(panchayatId) ? panchayatId.map(block => { return block.value}) : [],
            "formType":  Array.isArray(formType) ? formType.map(block => { return block.value}) : [],
            "climit": 10,
            "slimit": 3
        }, cancelToken.token)
    }

    render() {

        const { role } = this.props.profile;
        const { formType,percentage, Received, Approved, Rejected, Pending, statistics, districtList, blockList, panchayatList, districtId, blockId, panchayatId } = this.state;
        const filterName = role === 2 ? "All Districts" : (role === 3 ? "All Blocks" : "All Panchayat");
        const filterOption = role === 2 ? districtList : (role === 3 ? blockList : panchayatList);
        const filetValue = role === 2 ? districtList[districtId] && districtList[districtId].label : (role === 3 ? blockList[blockId] && blockList[blockId].label : panchayatList[panchayatId] && panchayatList[panchayatId].label);
        const compFilter = COMPONENT_FILTER.map(data => data.label);
        let applicationCount = statistics.applicationCount ? (statistics.applicationCount.approvedApplication + statistics.applicationCount.pendingApplication + statistics.applicationCount.rejectedApplication) : 0;
        let filtervalue = filterName === "All Blocks" ? blockId : (filterName === "All Districts" ? districtId : panchayatId)
        return (
            <Container fluid className="mt-4 dashboard-main custom-scrollbar">
                <DashboardHeader 
                    onChange={this.onChange}
                    filtername= {filterName}
                    filterValue= {filtervalue}
                    filteroption={filterOption}
                    formtype={formType}
                    {...this.props}
                />
                <Row className="my-3 package-assist">
                    <Col>
                        <div className="text-center bg-gainsboro br-2 p-4">
                            <h3 className="fw-800 mb-3 text-darkGrey-1">COVID-19 Assistance Package</h3>
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

                <Row className="my-3 assist-common-head">
                    <Col className="d-flex align-items-center"><h2 className="fw-700 mb-0">Fund</h2></Col>
                    <Col >
                        <div className="icons-views">
                            <span className="download-view mr-2" >
                                <i className="fa fa-print border-right-dark" onClick={() => downloadScreenshotOrPrint(true)}></i>
                                <i class="fa fa-download" onClick={() => downloadScreenshotOrPrint()}></i>
                            </span>
                            <a><i className="fa fa-arrow-right" onClick={ () => this.props.history.push('/staff/dashboard/Funds/chartSection/1') }></i></a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" >
                        <div className="target bg-white p-4 target-vs-achieve">
                            <h3>Target vs Achieved</h3>
                            <div className="d-flex align-item-start mt-5">
                                <span className="mr-2 money"><img src={money} alt="money"></img></span>
                                <div>
                                    <h1 className="mb-1 fw-700">&#8377; {formatToINR(statistics?.fund?.totalDisbursmentAmount)}</h1>
                                    <p className="mb-1 small"> Amount of fund disbursed so far</p>
                                </div>
                                <p className="ml-auto">&#8377; {moneyFormatBySymbol(statistics?.fund?.target)}</p>
                            </div>
                            <div className="progress-achieve">
                                <Progress value={getPercentage(statistics.fund && statistics.fund.totalDisbursmentAmount, statistics.fund && statistics.fund.target)}>
                                    {getPercentage(statistics.fund && statistics.fund.totalDisbursmentAmount, statistics.fund && statistics.fund.target)} %</Progress>
                                <span><img src={flag} alt="flag"></img></span>
                            </div>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="loan bg-white p-3">
                            <h4>Loan Size</h4>
                            <BarChartsLoan loanSize={statistics.loanSize}></BarChartsLoan>
                        </div>
                    </Col>
                </Row>

                <Row className="my-3 assist-common-head">
                    <Col className="d-flex align-items-center"><h2 className="fw-700 mb-0">Applications</h2></Col>
                    <Col >
                        <div className="icons-views">
                            <span className="download-view mr-2" >
                                <i className="fa fa-print border-right-dark" onClick={() => downloadScreenshotOrPrint(true)}></i>
                                <i class="fa fa-download" onClick={() => downloadScreenshotOrPrint()}></i>
                            </span>
                            <a onClick={ () => this.props.history.push('/staff/dashboard/applications/chartSection/1') }><i className="fa fa-arrow-right"></i></a>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <div className="bg-white p-3 approval-ratio">
                            <h3 className="mb-4">Approval Ratio</h3>
                            <Row className="pb-3">
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="approval-progress ">
                                                <span className="mr-3">
                                                    <CircularProgressbar strokeWidth={10} value={getPercentage(statistics.applicationCount && statistics.applicationCount.totalApplicationReceived, applicationCount)} text={getPercentage(statistics.applicationCount && statistics.applicationCount.approvedApplication, applicationCount)} text={`${getPercentage(statistics.applicationCount && statistics.applicationCount.totalApplicationReceived, applicationCount)}%`}
                                                        styles={{
                                                            path: {
                                                                // Path color
                                                                stroke: `#7DB3F4`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the circle behind the path, i.e. the "total progress"
                                                              trail: {
                                                                // Trail color
                                                                stroke: `rgba(125, 179, 244, .1`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                                // Rotate the trail
                                                                transform: 'rotate(0.25turn)',
                                                                transformOrigin: 'center center',
                                                              },
                                                              // Customize the text
                                                              text: {
                                                                // Text color
                                                                fill: '#000',
                                                                // Text size
                                                                fontSize: '16px',
                                                                fontWeight:'700'
                                                              },
                                                        }} />
                                                </span>
                                                <div className="received">
                                                    {statistics.applicationCount ?
                                                        <h4 className="mb-0">
                                                            {statistics.applicationCount.totalApplicationReceived}
                                                        </h4>
                                                        :
                                                        ""
                                                    }
                                                    <p>Total Received</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="approval-progress">
                                                <span className="mr-3">
                                                    <CircularProgressbar strokeWidth={10} value={getPercentage(statistics.applicationCount && statistics.applicationCount.approvedApplication, applicationCount)} text={`${getPercentage(statistics.applicationCount && statistics.applicationCount.approvedApplication, applicationCount)}%`}
                                                        styles={{
                                                            path: {
                                                                // Path color
                                                                stroke: `#62A25B`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the circle behind the path, i.e. the "total progress"
                                                              trail: {
                                                                // Trail color
                                                                stroke: `rgba(98, 162, 91,.1)`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                                // Rotate the trail
                                                                transform: 'rotate(0.25turn)',
                                                                transformOrigin: 'center center',
                                                              },
                                                              // Customize the text
                                                              text: {
                                                                // Text color
                                                                fill: 'rgb(98, 162, 91)',
                                                                // Text size
                                                                fontSize: '16px',
                                                                fontWeight:'700'
                                                              },
                                                        }}
                                                    />
                                                </span>
                                                <div className="">
                                                    {statistics.applicationCount ?
                                                        <h4 className="mb-0">
                                                            {statistics.applicationCount.approvedApplication}
                                                        </h4>
                                                        :
                                                        ""
                                                    }
                                                    <p>Approved</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="approval-progress">
                                                <span className="mr-3">
                                                    <CircularProgressbar strokeWidth={10} value={getPercentage(statistics.applicationCount && statistics.applicationCount.rejectedApplication, applicationCount)} text={`${getPercentage(statistics.applicationCount && statistics.applicationCount.rejectedApplication, applicationCount)}%`}
                                                        styles={{
                                                            path: {
                                                                // Path color
                                                                stroke: `#F5474D`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the circle behind the path, i.e. the "total progress"
                                                              trail: {
                                                                // Trail color
                                                                stroke: `rgba(245, 71, 77,.1)`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the text
                                                              text: {
                                                                // Text color
                                                                fill: '#F5474D',
                                                                // Text size
                                                                fontSize: '16px',
                                                                fontWeight:'700'
                                                              },
                                                        }} />
                                                </span>
                                                <div className="">
                                                    <h4 className="mb-0"> {statistics.applicationCount && statistics.applicationCount.rejectedApplication}</h4>
                                                    <p>Rejected</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="approval-progress ">
                                                <span className="mr-3">
                                                    <CircularProgressbar strokeWidth={10} value={getPercentage(statistics.applicationCount && statistics.applicationCount.pendingApplication, applicationCount)} text={`${getPercentage(statistics.applicationCount && statistics.applicationCount.pendingApplication, applicationCount)}%`}
                                                        styles={{
                                                            path: {
                                                                // Path color
                                                                stroke: `#F5C032`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the circle behind the path, i.e. the "total progress"
                                                              trail: {
                                                                // Trail color
                                                                stroke: `rgba(245, 192, 50,.1)`,
                                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                strokeLinecap: 'butt',
                                                              },
                                                              // Customize the text
                                                              text: {
                                                                // Text color
                                                                fill: '#F5C032',
                                                                // Text size
                                                                fontSize: '16px',
                                                                fontWeight:'700'
                                                              },
                                                        }} />
                                                </span>
                                                <div className="pending">
                                                    <h4 className="mb-0">{statistics.applicationCount && statistics.applicationCount.pendingApplication || 0}</h4>
                                                    <h6>Recommended/Pending</h6>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className="my-3 assist-common-head ">
                    <Col className="d-flex align-items-center"><h2 className="fw-700 mb-0">Beneficiaries</h2></Col>
                    <Col >
                        <div className="icons-views">
                            <span className="download-view mr-2" >
                                <i className="fa fa-print border-right-dark" onClick={() => downloadScreenshotOrPrint(true)}></i>
                                <i class="fa fa-download" onClick={() => downloadScreenshotOrPrint()}></i>
                            </span>
                            <a ><i className="fa fa-arrow-right" onClick={ () => this.props.history.push('/staff/dashboard/beneficiaries/chartSection/1') }></i></a>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col >
                        <div className="target bg-white p-4 target-vs-achieve">
                            <h3>Target vs Achieved</h3>
                            <div className="d-flex align-item-start mt-5">
                                <span className="mr-2 money"><img src={Beneficiaries} alt="Beneficiaries"></img></span>
                                <div>
                                    <h1 className="mb-1 fw-700">
                                        {formatToINR(statistics?.beneficiary?.totalBeneficiaries)}</h1>
                                    <p className="mb-1 small">No.of beneficiaries given so far</p>
                                </div>
                                <p className="ml-auto">&#8377; {moneyFormatBySymbol(statistics?.beneficiary?.target)}</p>
                            </div>
                            <div className="progress-achieve">
                                <Progress value={
                                    getPercentage(
                                        statistics.beneficiary && 
                                        statistics.beneficiary.totalBeneficiaries, 
                                        statistics.beneficiary && statistics.beneficiary.target
                                    )} 
                                    className="w-100">
                                        {
                                        getPercentage(
                                            statistics.beneficiary && 
                                            statistics.beneficiary.totalBeneficiaries, 
                                            statistics.beneficiary && 
                                            statistics.beneficiary.target
                                        )
                                    }
                                    %
                                </Progress>
                                <span><img src={flag} alt="flag"></img></span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Row >
                            <Col lg="4 pr-0">
                                <div className="bg-white p-3">
                                    <h3>Gender</h3>
                                    <BarChartGender
                                        statistics={statistics && statistics}
                                    >
                                    </BarChartGender>
                                </div>
                            </Col >
                            <Col lg="8">
                                <div className="bg-white p-3">
                                    <h3>Community</h3>
                                    <BarChartCommunity
                                        statistics={statistics && statistics.community}
                                    >
                                    </BarChartCommunity>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Row  className="h-100">
                            <Col lg="4 pr-0 h-100">
                                <div className="bg-white p-3 h-100 d-flex flex-column">
                                    <h4>SHG</h4>
                                    <BarchartShg statistics={statistics && statistics.shg}></BarchartShg>
                                </div>
                            </Col >
                            <Col>
                                <div className="bg-white p-3">
                                    <h4>Vulnerable</h4>
                                    <BarChartVulnerable statistics={statistics && statistics.vulnerable}></BarChartVulnerable>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="my-3 assist-common-head">
                    <Col className="d-flex align-items-center"><h2 className="fw-700 mb-0">Enterprise</h2></Col>
                    <Col >
                        <div className="icons-views">
                            <span className="download-view mr-2" >
                                <i className="fa fa-print border-right-dark" onClick={() => downloadScreenshotOrPrint(true)}></i>
                                <i class="fa fa-download" onClick={() => downloadScreenshotOrPrint()}></i>
                            </span>
                            <a onClick={() => this.props.history.push('/staff/dashboard/enterprises/chartSection/1')}><i className="fa fa-arrow-right"></i></a>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col lg="4 pr-0">
                        <Col lg="pr-0">
                            <div className="bg-white p-3">
                                <h4 >Enterprise</h4>
                                <BarChartEnterprise type="enterpriseCount" statistics={statistics && statistics.enterprise}></BarChartEnterprise>
                            </div>

                        </Col>
                        <Col lg="pr-0 mt-3">
                            <div className="bg-white p-3">
                                <h4 >Activity</h4>
                                <BarChartEnterprise type="activityCount" statistics={statistics && statistics.activitys}></BarChartEnterprise>
                            </div></Col>
                        <Col lg="pr-0 mt-3">
                            <div className="bg-white p-3">
                                <h4 >Sector</h4>
                                <BarChartEnterprise type="sectorCount" statistics={statistics && statistics.sectors}></BarChartEnterprise>
                            </div></Col>
                    </Col>
                    <Col className="bg-white ml-3 mr-3 py-3 d-flex flex-column">
                            <h4>Top 10 Commodity</h4>
                            <BarChartCommodity statistics={statistics && statistics.commodity}></BarChartCommodity>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.staff.statistics,
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(StaffActions, dispatch);
};

const MainDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardClass)

export { MainDashboard }
