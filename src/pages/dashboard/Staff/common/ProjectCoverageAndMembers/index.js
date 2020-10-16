import React, { Component } from 'react';
import Navbar from './CoverageNavbar'
import DistrictContainer from './District'
import BlockSection from './Block'
import Panchayat from './Panchayat'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import Loader from 'component/Loader'
import { Button, Row, Col, Input } from 'reactstrap';
import FormInput from 'component/inputs/FormInput'
const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;
const { GET_PC_COVERAGE_API, SUBMIT_PC_COVERAGE_API } = API_BOOK.APPLICATION

export class ProjectCoverageAndMembers extends Component {

    state = {
        loading: false,
        stage: 1,
        coverageDistrict: [],
        //options
        districtList: [],
        blockList: [],
        panchayatList: [],
        activeDistrictTab: 0,
        cancelToken: axios.CancelToken.source()
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        let formId = this.props.match.params.formId
        if (formId) {
            this.setState({
                formId
            }, async () => {
                await this.getDistrict()
                this.getProjectCoverageMembers()
            })
        }

    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    validatePanchayat = () => {
        const { coverageDistrict } = this.state
        let validateBlocks = coverageDistrict.every(data => data.coverageBlock.length)
        let validatePanchayat = coverageDistrict.every(data => data.coverageBlock.every(block => block.coverageBlockTotal > 0))
        return validateBlocks && validatePanchayat
    }

    //STAGE 1 OnChange

    handleStageChange = (e, data) => {
        const { coverageDistrict, stage } = this.state
        e.preventDefault()
        if (stage === 1) {
            if (coverageDistrict.length)
                this.onStageOneSubmit()
            else toast('Select district', 'error')
        }
        else if (stage === 2) {
            if (coverageDistrict.every(data => data.coverageBlock.length))
                this.onStageTwoSubmit()
            else toast('Select Block', 'error')
        } else {
            if (this.validatePanchayat())
                this.submitProjectCoverageMembers()
            else toast('Enter the required fields', 'error')
        }
    }

    //STAGE 2 Block select change

    handleBlockInputChange = (name, value, index) => {
        let { coverageDistrict } = this.state
        coverageDistrict[index][name] = value ? value : []
        coverageDistrict[index]['noOfBlock'] = value ? value.length : 0
        this.setState({ coverageDistrict }, () => this.handleBlockInputCallback(index))
    }

    handlePanchayatInputChange = (name, value, index) => {
        let { coverageDistrict, activeDistrictTab } = this.state
        coverageDistrict[activeDistrictTab]["coverageBlock"][index]['coveragePanchayat'] = value
            ? value
            : []
        coverageDistrict[activeDistrictTab]["coverageBlock"][index]['coverageBlockTotal'] = coverageDistrict
        [activeDistrictTab]["coverageBlock"][index]['coveragePanchayat']
            ? coverageDistrict[activeDistrictTab]["coverageBlock"][index]['coveragePanchayat'].length
            : 0
        this.setState({ coverageDistrict }, () => this.handlePanchayatInputCallback(index))
    }


    //STAGE 2 Block count change

    handlePanchayatNumberChange = (name, value, index, memberIndex) => {
        let { coverageDistrict, activeDistrictTab } = this.state
        coverageDistrict
        [activeDistrictTab]["coverageBlock"]
        [index]['coveragePanchayat']
        [memberIndex]["coveragePanchayatTotal"] = value
        this.setState({ coverageDistrict }, () => this.handlePanchayatInputCallback(index, memberIndex))
    }

    handleBlockInputCallback = (index) => {
        let { coverageDistrict } = this.state
        let members = coverageDistrict[index]["coverageBlock"]
        coverageDistrict[index]["districtTotalMembers"] = members.reduce((initalvalue, data) => parseInt(data.coverageBlockTotal ? data.coverageBlockTotal : 0) + initalvalue, 0)
        this.setState({
            coverageDistrict
        })
    }

    handlePanchayatInputCallback = (index) => {
        let { coverageDistrict, activeDistrictTab } = this.state
        let members = coverageDistrict[activeDistrictTab]["coverageBlock"][index]['coveragePanchayat']
        coverageDistrict[activeDistrictTab]["coverageBlock"][index]['coverageBlockTotal'] = members.reduce(
            (initalvalue, data) => parseInt(data.coveragePanchayatTotal ? data.coveragePanchayatTotal : 0) + initalvalue,
            0
        )
        this.setState({
            coverageDistrict
        })
    }

    //SUBMIT 

    onStageOneSubmit = async () => {
        const { coverageDistrict } = this.state
        this.setState({
            loading: true
        })
        let list = coverageDistrict.map(data => data.value)
        let blockList = await Promise.all(list.map(this.getBlock))
        this.setState({
            loading: false,
            stage: 2,
            blockList
        })
    }

    validateStageTwoFields = (area) => {
        const { coverageDistrict } = { ...this.state }

        return coverageDistrict.every(data =>
            (data.districtTotalBlock && parseInt(data.districtTotalBlock) > 0 &&
                data.districtTotalMember && parseInt(data.districtTotalMember) > 0) &&
            data.coverageDistrictBlock.every(newData => newData.areaBlockTotal)
        )

    }

    onStageTwoSubmit = async () => {
        this.getBlockListOptionBasedOnDistrictIndex()
    }

    getBlockListOptionBasedOnDistrictIndex = async () => {
        const { activeDistrictTab, coverageDistrict } = this.state
        this.setState({
            loading: true
        })
        let list = coverageDistrict[activeDistrictTab].coverageBlock.map(data => data.value)
        let panchayatList = await Promise.all(list.map(this.getPanchayat))
        this.setState({
            loading: false,
            stage: 3,
            panchayatList
        })
    }

    districtTabChange = (index) => {
        this.setState({
            activeDistrictTab: index
        }, this.getBlockListOptionBasedOnDistrictIndex)
    }

    getTotalPanchayatOnActiveTab = () => {
        const { coverageDistrict, activeDistrictTab } = this.state
        return coverageDistrict
        [activeDistrictTab]['coverageBlock'].reduce(
            (initalvalue, data) =>
                parseInt(
                    data.coveragePanchayat.length
                        ? data.coveragePanchayat.length
                        : 0
                ) + initalvalue
            , 0
        )
    }

    //services

    getDistrict = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            "isTNRTP": true
        };
        let requestPayload = {
            ...CORE_API.GET_DISTRICT_LIST_API,
            params: {
                isTNRPT: true
            },
            cancelToken: cancelToken.token,
            params
        };
        let response = await API(requestPayload);
        if (response.status === 200)
            this.setState({
                districtList: response.data.data.districtList.map(data => (
                    {
                        ...data,
                        districtTotalMembers: null,
                        noOfBlock: null,
                        coverageBlock: []
                    }))
            });
        else toast(response.data.message, "error");
        this.setState({ loading: false })
        return true
    };

    getBlock = async (districtId) => {
        const { cancelToken } = this.state;
        let params = {
            districtId,
            isTNRPT: true
        };
        let requestPayload = {
            ...CORE_API.GET_BLOCK_LIST_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        return response.data.data.blockList.map(data => (
            {
                ...data,
                coverageBlockTotal: null,
                coveragePanchayat: []
            }))
    };

    getPanchayat = async (blockId) => {
        const { cancelToken } = this.state;
        let params = {
            blockId,
            "isTNRTP": true
        };
        let requestPayload = {
            ...CORE_API.GET_PANCHAYAT_LIST_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        return response.data.data.panchayatList.map(data => (
            {
                ...data,
                coveragePanchayatTotal: null
            }))
    };

    getProjectCoverageMembers = async () => {
        const { cancelToken, districtList, formId } = this.state;
        this.setState({ loading: true })
        let params = {
            formId
        };
        let requestPayload = {
            ...GET_PC_COVERAGE_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200) {
            let list = response.data.data.coverageData.map(data => data.value)
            let blockList = await Promise.all(list.map(this.getBlock))
            let coverageDistrict = response.data.data.coverageData.map(data => ({
                ...data,
                label: districtList.find(district => district.value === data.value).label
            }))
            this.setState({ coverageDistrict, loading: false, blockList })
        }
    }

    submitProjectCoverageMembers = async () => {
        this.setState({
            loading: true
        })
        const { cancelToken, coverageDistrict, formId } = this.state;
        let data = {
            formId,
            coverageDistrict
        };
        let requestPayload = {
            ...SUBMIT_PC_COVERAGE_API,
            data,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200) {
            toast(response.data.message, "success");
            this.props.history.push('/staff/application/producer-collective')
        }
        else toast(response.data.message, "error");
        this.setState({
            loading: false
        })
    }

    render() {

        const {
            districtList,
            blockList,
            panchayatList,
            loading,
            stage,
            coverageDistrict,
            activeDistrictTab
        } = this.state

        console.log(this.state, "onChange")
        if (loading)
            return <Loader className="h-100" />

        return (
            <div>
                <Navbar />
                <div className="container">
                    <Row className="bg-white mt-2 p-3">
                        <Col>
                            <div className="d-flex">
                                <h2 className="mb-0">
                                    {stage === 1 ? "Project Coverage area Districts" : stage === 2 ? 'Project Coverage area Blocks' : stage === 3 ? "Project Coverage area Panchayat & Members" : " Project Coverage Area Member Type"}
                                </h2>
                                <span className="ml-auto dot-icon">
                                    <i className={`${stage === 1 ? 'active' : ''} fa fa-circle`} aria-hidden="true"></i>
                                    <i className={`${stage === 2 ? 'active' : ''} fa fa-circle`} aria-hidden="true"></i>
                                    <i className={`${stage === 3 ? 'active' : ''} fa fa-circle`} aria-hidden="true"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    {
                        stage === 1 && !loading
                            ? <DistrictContainer
                                districtList={districtList}
                                coverageDistrict={coverageDistrict}
                                onChange={this.onChange}
                            />
                            : ''
                    }
                    {
                        stage === 2 && !loading
                            ? <BlockSection
                                coverageDistrict={coverageDistrict}
                                districtList={districtList}
                                blockList={blockList}
                                onChange={this.handleBlockInputChange}
                            /> : ''
                    }

                    {
                        stage === 3 && !loading
                            ? <Panchayat
                                coverageDistrict={coverageDistrict}
                                districtList={districtList}
                                blockList={blockList}
                                panchayatList={panchayatList}
                                activeDistrictTab={activeDistrictTab}
                                onTabChange={this.districtTabChange}
                                handlePanchayatInputChange={this.handlePanchayatInputChange}
                                handlePanchayatNumberChange={this.handlePanchayatNumberChange}
                            /> : ''
                    }

                    {/* <Row className="coverage-icon-view bg-white border-top">
                        <Col></Col>
                    </Row> */}

                    <form onSubmit={(e) => this.handleStageChange(e)}>
                        <Row className="bg-white border-top align-items-center py-4">
                            <Col md="3">
                                {
                                    stage === 3 ?
                                        <div className="p-3">
                                            <FormInput
                                                type="number"
                                                value={this.getTotalPanchayatOnActiveTab()}
                                                disabled
                                                label={`Total Members`}
                                            />
                                        </div> : ''
                                }


                            </Col>
                            <Col lg="5" md="6" sm="12" className="ml-auto">
                                <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                                    <Col>
                                        <Button
                                            outline
                                            color="lighGrey-2 w-100 border-none"
                                            className="fw-600"
                                            disabled={stage < 2}
                                            onClick={() => this.onChange('stage', stage - 1)}
                                        >
                                            Previous
                                    </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            color="primary w-100 border-none "
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
                </div>
            </div>
        );
    }
}