import React, { Component, Fragment } from "react";
import { PgBPMUHeaderWithStatus } from 'component/Header/Staff'
import ApplicationFilter from 'component/Filter/ApplicationFilter'
import { Container,Row, Col } from "reactstrap";
import Table from "component/Table";
import Pagination from "component/Pagination";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as listApplicationActions from "action/staff/manageApplication/pgApplications";
import _ from "lodash";
import { axios, API, API_BOOK } from "service";
import BasicTab from 'component/Tabs/BasicTab'
import { PG_BMPU_APPLICATION_TABS, PG_DMPU_APPLICATION_TABS,STAFF_ROLE_ID } from 'helpers/variables'
import { ORDER } from 'helpers/variables.js'
import { PgStaffBMMU, PgStaffDMMU } from 'helpers/tableDataMapper'
// import { PG_DMPU_APPLICATION_TABS } from 'helpers/variables'

const { GENERATE_PG_FORM_ID_API } = API_BOOK.APPLICATION;

class UserManagement extends Component {
    state = {
        search: "",
        list: [],
        applicationCount: {},
        selectedApplicationId:null,
        page: 1,
        total_pages: 1,
        role: 7,
        sortBy: ORDER[1].value,
        status: [2],
        limit: 10,
        cancelToken: axios.CancelToken.source(),
    };

    //LIFECYCLE

    componentDidMount() {
        this.init()
    }
    
    componentDidMount() {
        this.props.toggle();

    }

    init = () => {
        let { status } = this.state
        const { profile } = this.props
        if(STAFF_ROLE_ID.BMMU === profile.role)
        status = PG_BMPU_APPLICATION_TABS[0].value
        else 
        status = PG_DMPU_APPLICATION_TABS[0].value
        this.setState({
            status
        },this.getApplicationList)
    }
    
    generateFormId = async (name) => {
        const { cancelToken } = this.state
        let requestPayload = {
            ...GENERATE_PG_FORM_ID_API,
            cancelToken: cancelToken.token,
        };
        console.log("producer group click on ceate appplication btn",requestPayload,GENERATE_PG_FORM_ID_API)
        let response = await API(requestPayload);
        if (response.status === 200) {
            localStorage.setItem('createAppformId', response.data.data.formId)
            this.props.history.push("/application/producerGroup")
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { applications } = nextProps;
        if (_.cloneDeep(applications.list) !== _.cloneDeep(prevState.list))
            return {
                list: applications.list,
                total_pages: applications.pagination.total_pages,
                applicationCount: applications.applicationCount,
                selectedApplicationId : applications.selectedApplicationId
            };
        return null;
    }

    //EVENTS
    onSelect = (name, value) => {
        // console.log("$$$$$$$$$$$$",name,value)
        this.setState(
            {
                [name]: value,
                page: 1,
            },
            this.getApplicationList
        );
    }

    nextpage = (page) => {
        this.setState({ page }, this.getApplicationList);
    };

    onChange = (name, value) => {
        console.log("name",name,"value",value)
        this.setState(
            {
                [name]: value,
                page: 1,
            },
            this.getApplicationList
        );
    };

    getApplicationDetails = (data) => {
        // console.log(data,"on row colun click")
        this.props.getApplicationDetails(data);
        if (!this.props.isDetailMode) this.props.toggle();
    };

    //SERVICE

    getApplicationList = () => {
        const {
            cancelToken,
            status,
            sortBy,
            search,
            page,
            limit,
        } = this.state;
        const { address } = this.props.profile
        let data = {
            page,
            status,
            sortBy,
            search,
            limit,
            // districtId: address.district.value,
            // blockId: address.block.value,
            // panchayatId: address.panchayat.value,
        };
        if (this.props.isDetailMode) this.props.toggle();
        // console.log("_____-",this.props,"data",data);
        this.props.getPgApplicationList(data, cancelToken.token);
    };

    generateFormId = async (name) => {
        const { cancelToken } = this.state
        let requestPayload = {
            ...GENERATE_PG_FORM_ID_API,
            cancelToken: cancelToken.token,
        };
        let response = await API(requestPayload);
        if (response.status === 200) {
            localStorage.setItem('createAppformId', response.data.data.formId)
            this.props.history.push('/application/producerGroup')
        }
    }


    render() {

        const {  isDetailMode, page,loaders,profile } = this.props;

        const { list, status, sortBy, search, applicationCount,total_pages,selectedApplicationId } = this.state;

        let BMMUTableData = !isDetailMode ? PgStaffBMMU.full : PgStaffBMMU.short;
        let DMMUTableData = !isDetailMode ? PgStaffDMMU.full : PgStaffDMMU.short;
        let tableData = STAFF_ROLE_ID.BMMU === profile.role ? BMMUTableData : DMMUTableData;

        let disableCreateApp = this.props.profile.role === 4 ? false : true;

        tableData.rows = list;

        let SelectedApplicationIndex = list.findIndex(data => data.formId === selectedApplicationId)

        let tabs = STAFF_ROLE_ID.BMMU === profile.role ? PG_BMPU_APPLICATION_TABS : PG_DMPU_APPLICATION_TABS

        // let showApproveAccess = status.sort().every((value,index)=> value === closedApplicationStatus.sort()[index]);
        let showApproveAccess;
        let SMPU =  this.props.profile.role == 2 ? true : false;
        if(SMPU)
            showApproveAccess = false;

        return (
            <Container fluid className="p-0">
                <PgBPMUHeaderWithStatus
                    name="Producer Group"
                    applicationCount={applicationCount}
                    isDetailMode={isDetailMode}
                    showApproveAccess = {showApproveAccess}
                />
                <Row noGutters>
                    <Col md="12">
                        <BasicTab
                            tabs={tabs}
                            name="status"
                            onChange={this.onChange}
                            activeTab={status}
                        />
                    </Col>
                </Row>
                <ApplicationFilter
                    onSearch={(value) => this.onChange('search', value)}
                    search={search}
                    order={sortBy}
                    disableCreateApp = {disableCreateApp}
                    onOrderSelect={(value) => this.onSelect('sortBy', value)}
                    isDetailMode={isDetailMode}
                    onCreateApplicationBtnClick={this.generateFormId}
                    
                />
                <Row noGutters>
                    <Col md="12" className="px-3">
                        <Table
                            data={tableData}
                            activeRow={SelectedApplicationIndex}
                            onClick={this.getApplicationDetails}
                            isLoading={loaders.isFetchingApplicationList}
                            className="theme-light-grey with-dot"
                        />
                        <div className="pt-3">
                            <Pagination 
                                pageCount={total_pages} 
                                page={page}
                                onPageChange={this.nextpage}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = ({ staff, profile,loaders }) => {
    return {
        applications: staff.applications,
        profile,
        loaders
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(listApplicationActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
