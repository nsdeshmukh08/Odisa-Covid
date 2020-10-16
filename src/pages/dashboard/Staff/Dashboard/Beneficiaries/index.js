import React, { Component, Fragment } from 'react';
import Tabs from 'component/Tabs/BasicTab'
import DashboardChartHoc from 'HOC/StaffChartDashboard'
import ComponentsBeneficiaryCharts from './ComponentsBeneficiaryCharts'
import BenificiaryTargetAndAchieved from './BenificiaryTargetAndAchieved'
import BenificaryCommunity from "./BenificaryCommunity"
import BenificaryVulnerable from "./BenificaryVulnerable";
import BeneficaryGender from "./BeneficaryGender";
import BeneficarySHG from "./BeneficarySHG"
import { STAFF_ROLE_ID } from 'helpers/variables';
import LocationBreadCrumbs from 'component/BreadCrumbs/LocationBreadCrumbs'
import _ from 'lodash'

let tabs = [
  {
    label: 'Target vs Achieved',
    value: 1
  },
  {
    label: 'Gender',
    value: 2
  },
  {
    label: 'Community',
    value: 3
  },
  {
    label: 'Vulnerable',
    value: 4
  },
  {
    label: 'SHG',
    value: 5
  },
  {
    label: 'Component',
    value: 6
  },
]



class BeneficiariesClass extends Component {

  state = {
    locationType: null,
    selectedDistrict: null,
    selectedBlock: null,
    selectedDistrictName: null,
    selectedBlockName: null,
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

  shouldComponentUpdate(prevProps) {
    if (
      (
        !_.isEqual(prevProps.districtId, this.state.districtId) ||
        !_.isEqual(prevProps.blockId, this.state.blockId) ||
        !_.isEqual(prevProps.formTypes, this.state.formTypes)
      )
    ) {
      const { match, profile } = this.props
      const { selectedDistrict, selectedDistrictName } = this.state
      let tabNumber = this.getActiveTab()
      if (STAFF_ROLE_ID.SMMU === parseInt(profile.role))
        this.props.history.push(match.path.replace(':tabNumber', tabNumber))
    }
    return true
  }

  init = () => {
    let { search } = this.props.location
    this.getQueryDetails(search)
    this.listenQueryChange()
  }

  getQueryDetails = (search = '') => {
    let queryString = search
    let { role, address } = this.props.profile
    if (queryString || (parseInt(role) === STAFF_ROLE_ID.DMMU || parseInt(role) === STAFF_ROLE_ID.BMMU)) {
      let data = new URLSearchParams(queryString)
      let selectedDistrict = parseInt(role) === (STAFF_ROLE_ID.DMMU || parseInt(role) === STAFF_ROLE_ID.BMMU) ? address.district.value : parseInt(data.get('district'));
      let selectedBlock = parseInt(role) === STAFF_ROLE_ID.BMMU ? address.block.value : parseInt(data.get('block'));
      let selectedPanchayat = parseInt(data.get('panchayat'));
      let selectedDistrictName = parseInt(role) === STAFF_ROLE_ID.DMMU ? address.district.label : data.get('districtName');
      let selectedBlockName = (parseInt(role) === STAFF_ROLE_ID.BMMU) ? address.block.label : data.get('blockName');
      console.log(selectedDistrict, "asdasd")
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
        selectedBlock: null,
        selectedPanchayat: null,
        selectedDistrictName: null,
        selectedBlockName: null
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

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    }, this.getFundsData)
  }

  getFundsData = () => {
    const { formTypes, blockId, panchayatId } = this.props;
    const { pageCount } = this.state
    let tabNumber = this.getActiveTab()
    let data = {
      payload: {
        blockId: Array.isArray(blockId) ? blockId.map(data => data.value) : [blockId],
        // districtId: Array.isArray(districtId) ? districtId.map(data => data.value) : [districtId],
        districtId: [],
        panchayatId: Array.isArray(panchayatId) ? panchayatId.map(data => data.value) : [panchayatId],
        formTypes,
        locationType: 1,
        "limit": parseInt(pageCount),
        "page": 1
      },
      tabNumber
    }
    console.log(data, "myData123")
    this.props.getBeneficiaryCharts(data)
  }



  render() {

    const { charts: { Benificiary } } = this.props

    const { locationType, selectedDistrictName, selectedBlockName } = this.state

    const { districtList, blockList, panchayatList, profile, match } = this.props

    return (
      <div>
        <LocationBreadCrumbs {...this.state} {...this.props} tabNumber={this.getActiveTab()} />
        <div className="">
          <Tabs
            className="custom-tab-theme-2 mb-0"
            tabs={tabs}
            activeTab={this.getActiveTab()}
            onChange={(name, value) => this.props.history.push(`/staff/dashboard/Beneficiaries/chartSection/${value}`)}
          />
          {
            this.getActiveTab() === 1 ?
              <BenificiaryTargetAndAchieved
                data={Benificiary?.TargetAndAchieved}
                getChartData={this.props.getBeneficiaryCharts}
                tabNumber={this.getActiveTab()}
                {...this.props}
                {...this.state}
              /> :
              this.getActiveTab() === 2 ?
                <BeneficaryGender
                  data={Benificiary?.gender}
                  getChartData={this.props.getBeneficiaryCharts}
                  tabNumber={this.getActiveTab()}
                  {...this.props}
                  {...this.state}
                />

                : this.getActiveTab() === 3 ?
                  <BenificaryCommunity
                    data={Benificiary?.community}
                    getChartData={this.props.getBeneficiaryCharts}
                    tabNumber={this.getActiveTab()}
                    {...this.props}
                    {...this.state}
                  />
                  : this.getActiveTab() === 4 ?
                    <BenificaryVulnerable
                      data={Benificiary?.vulnerable}
                      getChartData={this.props.getBeneficiaryCharts}
                      tabNumber={this.getActiveTab()}
                      {...this.props}
                      {...this.state}
                    />
                    : this.getActiveTab() === 5 ?
                      <BeneficarySHG
                        data={Benificiary?.SHG}
                        getChartData={this.props.getBeneficiaryCharts}
                        tabNumber={this.getActiveTab()}
                        {...this.props}
                        {...this.state}
                      />
                      :
                      <ComponentsBeneficiaryCharts
                        data={Benificiary?.components}
                        getChartData={this.props.getBeneficiaryCharts}
                        tabNumber={this.getActiveTab()}
                        {...this.props}
                        {...this.state}
                      />
          }

        </div>
      </div>
    );
  }
}

export const Beneficiaries = DashboardChartHoc(BeneficiariesClass)
