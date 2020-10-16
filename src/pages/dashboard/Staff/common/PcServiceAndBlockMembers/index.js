import React, { Component } from 'react';
import Navbar from './CoverageNavbar'
import DistrictContainer from './District'
import BlockSection from './Block'
import _ from "lodash";
import moment from "moment";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import Loader from 'component/Loader'
import { Button, Row, Col, Input } from 'reactstrap';

const { CORE_API } = API_BOOK.ADMIN_MANAGEMENT;
const { GET_PC_SERVICE_API,SUBMIT_PC_SERVICE_API }=API_BOOK.APPLICATION

export class PcServiceAndBlockMembers extends Component {

    state = {
        loading: false,
        stage: 1,
        areaMembers: [],
        //options
        districtList: [],
        blockList:[],
        formId: null,
        cancelToken: axios.CancelToken.source(),
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        let formId = this.props.match.params.formId
        if(formId){
            this.setState({
                formId
            },async () => {
                await this.getDistrict()
                this.getServiceAndMembers() 
            })
        }else this.props.history.goBack()
    }

    onChange = (name,value) => {
        this.setState({
            [name] : value
        })
    }

    //STAGE 1 OnChange

    handleStageChange = (e,data) => {
        const { areaMembers,stage } = this.state
        e.preventDefault()
        if (stage === 1){
            if(areaMembers.length)
                this.onStageOneSubmit(areaMembers)
            else toast('Select district','error')
        }else{
           this.onStageTwoSubmit() 
        }   
    }

    //STAGE 2 Block select change

    handleBlockInputChange = (name,value,objectName,index)=> {
        let { areaMembers } = this.state

        areaMembers[index][objectName]=value ? value : []
        areaMembers[index]['districtTotalBlock']=value ? value.length : 0
        this.setState({areaMembers},() => this.handleBlockInputCallback(index))
    }

    //STAGE 2 Block count change

    handleBlockNumberChange = (name,value,objectName,index,memberIndex) => {
        let { areaMembers } = this.state
        areaMembers[index]["areaMembersBlock"][memberIndex][name]=value
        this.setState({areaMembers},() => this.handleBlockInputCallback(index))
    }

    handleBlockInputCallback = (index) => {
        let { areaMembers } = this.state
        let members=areaMembers[index]["areaMembersBlock"]
        areaMembers[index]["districtTotalMember"] = members.reduce((initalvalue,data) => parseInt(data.areaBlockTotal ? data.areaBlockTotal : 0)+initalvalue,0)
        this.setState({
            areaMembers
        })
    }

    //SUBMIT 

    onStageOneSubmit = async () => {
        let { areaMembers } = this.state
            this.setState({
                loading : true
            })
            let list = areaMembers.map(data => data.value)
            let blockList = await Promise.all(list.map(this.getBlock))
            this.setState({
                areaMembers,
                loading : false,
                stage : 2,
                blockList
            })
        }

    validateStageTwoFields = (area) => {
        const { areaMembers } = {...this.state}

        return areaMembers.every(data => 
            (data.districtTotalBlock && parseInt(data.districtTotalBlock) > 0 && 
            data.districtTotalMember&& parseInt(data.districtTotalMember) > 0) &&
            data.areaMembersBlock.every(newData => newData.areaBlockTotal)
            )
            
    }

    onStageTwoSubmit = async () => {
        let isValid= this.validateStageTwoFields()
        if(!isValid)
        toast('Enter the details!!','error')
        else this.submitServiceAndMembers()
    }

    //services

    getDistrict = async () => {
        const { cancelToken } = this.state;
        this.setState({
            loading: true
        })
        let params = {
            "isTNRTP":true
        };
        let requestPayload = {
            ...CORE_API.GET_DISTRICT_LIST_API,
            params:{
                isTNRPT : true
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
                        districtTotalBlock : null,
                        districtTotalMember : null,
                        areaMembersBlock:[]
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
            isTNRPT : true
        };
        let requestPayload = {
            ...CORE_API.GET_BLOCK_LIST_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        return response.data.data.blockList
    };

    getServiceAndMembers = async () => {
        const { cancelToken,districtList,formId } = this.state;
        this.setState({loading:true})
        let params = {
            formId
        };
        let requestPayload = {
            ...GET_PC_SERVICE_API,
            params,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200){
            let list = response.data.data.map(data => data.value)
            let blockList = await Promise.all(list.map(this.getBlock))
            let areaMembers = response.data.data.map(data => ({
                ...data,
                label : districtList.find(district => district.value  === data.value).label
            }))
            this.setState({areaMembers,loading:false,blockList})
        }
    }

    submitServiceAndMembers = async () => {
        this.setState({loading:true})
        const { cancelToken,areaMembers,formId } = this.state;
        let data = {
            formId,
            areaMembers
        };
        let requestPayload = {
            ...SUBMIT_PC_SERVICE_API,
            data,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200){
            toast(response.data.message, "success");
            this.props.history.push('/staff/application/producer-collective')
        }   
        else toast(response.data.message, "error");
        this.setState({loading:false})
    }

    render() {
        const { districtList,blockList, loading, stage, selectedDistricts,areaMembers } = this.state
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
                                    {stage === 1 ? "PC Service area Member Districts":'PC Service area Blocks & Members' }
                                </h2>
                                <span className="ml-auto dot-icon">
                                    <i className={`${stage ===1 ? 'active' : ''} fa fa-circle`} aria-hidden="true"></i>
                                    <i className={`${stage ===2 ? 'active' : ''} fa fa-circle`} aria-hidden="true"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    
                    {
                        stage === 1
                            ? <DistrictContainer
                                districtList={districtList}
                                areaMembers={areaMembers}
                                onChange={this.onChange}
                            />
                            : ''
                    }
                    {
                        stage === 2
                            ? <BlockSection 
                                areaMembers={areaMembers}
                                districtList={districtList}
                                blockList={blockList}
                                onTotalBlockMemberChange={this.handleBlockNumberChange}
                                onChange={this.handleBlockInputChange}
                            /> : ''
                    }

                    <Row className="coverage-icon-view bg-white border-top">
                        <Col></Col>
                    </Row>

                    <form onSubmit={(e) => this.handleStageChange(e)}>
                        <Row className="bg-white border-top align-items-center py-4">
                            <Col></Col>
                            <Col lg="5" md="6" sm="12" className="ml-auto">
                                <Row className="w-100 d-flex justify-content-end align-items-center m-0 ">
                                    <Col>
                                        <Button
                                            outline
                                            color="lighGrey-2 w-100 border-none"
                                            className="fw-600"
                                            disabled={stage < 2}
                                            onClick={() => this.onChange('stage',stage-1)}
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
                                            {stage === 2 ? "Submit" : "Next"}
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