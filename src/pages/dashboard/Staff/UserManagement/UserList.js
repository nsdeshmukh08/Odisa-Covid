import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Input,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Table from "component/Table";
import Pagination from "component/Pagination";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as StaffActions from "action/staff/adminDashboard";
import { axios } from "service";
import _ from 'lodash'
import { STAFF_ROLES,ORDER,STATUS } from 'helpers/variables.js'
import { AdminUserListTable } from 'helpers/tableDataMapper'
import { toggleRootClassName } from 'helpers'
import UserFilter from 'component/Filter/UserFilter'

let ROLE = [7,2,3,4,5,6]

const STAFF_ROLE = STAFF_ROLES.filter(data => ROLE.includes(data.value))

  const ORDER_BY_OPTION = [...ORDER]

  const STATUS_OPTION = [...STATUS]

const userList = {...AdminUserListTable}


class UserManagement extends Component {
  state = {
    search: "",
    list: [],
    page: 1,
    total_pages : 1,
    role : 7,
    sortBy : 1,
    status : 1,
    limit : 10,
    cancelToken: axios.CancelToken.source(),
  };

  componentDidMount() {
    this.getStaffList()
}
  static getDerivedStateFromProps(nextProps, prevState) {
    const { staffList } = nextProps;
    if (_.cloneDeep(staffList.list) !== _.cloneDeep(prevState.list))
      return { 
          list: staffList.list,
          total_pages : staffList.pagination.total_pages
        };
    return null;
  }

  //EVENTS
  onSelect = (name,value) => {
      this.setState({
          [name] : value,
          page : 1
      }, this.getStaffList)
  }

  nextpage= (page) => {
    this.setState({page}, this.getStaffList)
 }

  onChange=(name,value) => {
      this.setState({
          [name] : value,
          page : 1
      }, this.getStaffList)
  }

  getStaffDetails = (data) => {
      this.props.getStaffDetails(data)
      if(!this.props.isDetailMode)
      this.props.toggle()
  }

  //SERVICE

  getStaffList = () => {
    const { cancelToken,status,role,sortBy,search,page,limit } = this.state;
    let data = {
      page,
      status,
      role,
      sortBy,
      filterData:search,
      limit
    }
    if(this.props.isDetailMode)
      this.props.toggle()
    this.props.updateStaffList(data, cancelToken.token);
  }

  render() {
    const { history, isDetailMode,page,isFetching } = this.props;
    const { list,total_pages,status,role,sortBy,search } = this.state;
    userList.rows = [...list];
    return (
      <Container fluid>
        <Row className="mb-4">
          <Col md="12">
            <h3 className="text-darkGrey-1 d-flex align-items-center">
              <i className="fa fa-bars mr-2 toggler d-none" aria-hidden="true" onClick={() => toggleRootClassName('open-sidebar')}></i>
              <span>User Management</span>
            </h3>
          </Col>
          <Col className="text-right">
            {isDetailMode ? (
              <div>
                <Button
                  color="primary"
                  className="fw-300 br-1"
                  onClick={() => history.push("/add/user")}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                  Create New User
                </Button>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>

        <Card className="bg-white border-0 py-2 my-4">
          <UserFilter
            isDetailMode={isDetailMode}
            search={search}
            order={sortBy}
            status={status}
            search={search}
            role={role}
            onSearch={(value) => this.onChange('search',value)}
            onStatusChange={(value) => this.onChange('status',value)}
            onRoleChange={(value) => this.onChange('role',value)}
            onOrderChange={(value) => this.onChange('sortBy',value)}
          />
        </Card>
        <Card className="bg-white border-0 p-1 pl-3">
          <div className="mt-4 user-list-table  custom-scrollbar">
            <Table
              activeRow={{
                status: "Active",
              }}
              isLoading={isFetching}
              data={userList}
              className="theme-light-grey"
              onClick={this.getStaffDetails}
            />
          </div>
          <div className="pt-3">
            <Pagination 
                pageCount={total_pages} 
                page={page}
                onPageChange={this.nextpage}
            />
          </div>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state.staff;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StaffActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
