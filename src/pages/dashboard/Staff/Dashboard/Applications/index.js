import React, { Component, Fragment } from 'react';
import Tabs from 'component/Tabs/BasicTab'
import DashboardChartHoc from 'HOC/StaffChartDashboard'
import ApplicationStatus from './ApplicationStatus'
import ComponentTab from './Component'
import { STAFF_ROLE_ID } from 'helpers/variables';
import LocationBreadCrumbs from 'component/BreadCrumbs/LocationBreadCrumbs'
import _ from 'lodash'

let tabs = [
  {
    label: 'Application Status',
    value: 1
  },
  {
    label: 'Component',
    value: 2
  }
]



class ApplicationsClass extends Component {

  state = {
    locationType: null,
    selectedDistrict: null,
    selectedBlock: null,
    selectedDistrictName : null,
    selectedBlockName : null,
    districtId: [],
    blockId: [],
    panchayatId: [],
    formTypes: [],
    selectedChartIndexes: []
  }

  componentDidMount() {
    this.init()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !_.isEqual(prevState.districtId, nextProps.districtId) ||
      !_.isEqual(prevState.blockId, nextProps.blockId) ||
      !_.isEqual(prevState.panchayatId, nextProps.panchayatId) ||
      !_.isEqual(prevState.formTypes, nextProps.formTypes)

    ) {
      return {
        districtId: _.cloneDeep(nextProps.districtId),
        blockId: _.cloneDeep(nextProps.blockId),
        panchayatId: _.cloneDeep(nextProps.panchayatId),
        formTypes: _.cloneDeep(nextProps.formTypes)
      }
    }
    return null
  }

  init = () => {
    let { search } = this.props.location
    this.getQueryDetails(search)
    this.listenQueryChange()
  }

  getQueryDetails = (search = '') => {
    let queryString = search
    let { role,address } = this.props.profile
    if (queryString || (parseInt(role) === STAFF_ROLE_ID.DMMU || parseInt(role) === STAFF_ROLE_ID.BMMU)) {
      let data = new URLSearchParams(queryString)
      let selectedDistrict = parseInt(role) === (STAFF_ROLE_ID.DMMU || parseInt(role) === STAFF_ROLE_ID.BMMU) ? address.district.value : parseInt(data.get('district'));
      let selectedBlock = parseInt(role) === STAFF_ROLE_ID.BMMU ? address.block.value : parseInt(data.get('block'));
      let selectedPanchayat = parseInt(data.get('panchayat'));
      let selectedDistrictName = parseInt(role) === STAFF_ROLE_ID.DMMU ? address.district.label : data.get('districtName');
      let selectedBlockName = (parseInt(role) === STAFF_ROLE_ID.BMMU) ? address.block.label : data.get('blockName');
      console.log(selectedDistrict,"asdasd")
      this.setState({
        selectedDistrict,
        selectedBlock,
        selectedPanchayat,
        selectedDistrictName,
        selectedBlockName,
        locationType: selectedBlock > -1
          ? 3
          : selectedDistrict > -1
            ? 2
            : 1
      })
    } else {
      this.setState({
        locationType: 1,
        selectedDistrict: null,
        selectedBlock : null,
        selectedPanchayat : null,
        selectedDistrictName:null,
        selectedBlockName:null
      })
    }
  }

  listenQueryChange = () => {
    this.props.history.listen((location) => this.getQueryDetails(location.search));
  }

  getActiveTab = () => {
    const { match } = this.props
    let activeTab = match.params ? match.params.tabNumber : 1
    return parseInt(activeTab)
  }



  render() {

    const { charts: { applications } } = this.props

    console.log(applications,"application123")

    return (
      <div>
        <LocationBreadCrumbs {...this.state} {...this.props} tabNumber={this.getActiveTab()}  />
        <div className="">
          <Tabs
            className="custom-tab-theme-2 mb-0"
            tabs={tabs}
            activeTab={this.getActiveTab()}
            onChange={
                (name, value) => this.props.history.push(`/staff/dashboard/applications/chartSection/${value}`)
            }
          />
          {
            this.getActiveTab() === 1 ?
              <ApplicationStatus
                data={applications?.applicationStatus}
                getChartData={this.props.getApplicationsCharts}
                tabNumber={this.getActiveTab()}
                {...this.props}
                {...this.state}
              /> :
              ''
          }
                    {
            this.getActiveTab() === 2 ?
              <ComponentTab
                data={applications?.components}
                getChartData={this.props.getApplicationsCharts}
                tabNumber={this.getActiveTab()}
                {...this.props}
                {...this.state}
              /> :
              ''
          }

        </div>
      </div>
    );
  }
}

export const Applications = DashboardChartHoc(ApplicationsClass)
