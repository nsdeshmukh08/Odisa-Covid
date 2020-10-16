import React, { Fragment, Component } from 'react';
import { ChartTable } from 'component/Table'
import ChartFilter from 'component/Filter/ChartFilter'
import { StackedApplicationStatusChart } from 'component/charts/common'
import {
    Row,
    Col
} from "reactstrap";
import _ from 'lodash'
import { application_charts_status } from 'helpers/tableDataMapper'
import Pagination from 'component/Pagination/ChartPagination'
import { STAFF_ROLE_ID } from 'helpers/variables';

class ApplicationStatus extends Component {

    state = {
        pageCount: 30,
        page: 1,
        locationType: 1,
        formTypes: [],
        districtId: [],
        blockId: [],
        panchayatId: [],
        selectedDistrict: null,
        selectedBlock: null
    }

    componentDidMount() {
        this.init() //GET GRAPH DATA
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //COMPARING AND CHANGING THE FILTERED LOCATION

        if (
            !_.isEqual(prevState.districtId, nextProps.districtId) ||
            !_.isEqual(prevState.blockId, nextProps.blockId) ||
            !_.isEqual(prevState.formTypes, nextProps.formTypes)

        ) {
            return {
                districtId: _.cloneDeep(nextProps.districtId),
                blockId: _.cloneDeep(nextProps.blockId),
                formTypes: _.cloneDeep(nextProps.formTypes)
            }
        }

        //COMPARING AND CHANGING THE SELECTED LOCATIONS

        if (
            !_.isEqual(prevState.locationType, nextProps.locationType) ||
            !_.isEqual(prevState.selectedDistrict, nextProps.selectedDistrict) ||
            !_.isEqual(prevState.selectedBlock, nextProps.selectedBlock)
        ) {
            return {
                locationType: nextProps.locationType,
                selectedDistrict: nextProps.selectedDistrict,
                selectedBlock: nextProps.selectedBlock
            }
        }
        return null
    }

    componentDidUpdate(prevProps) {
        if (
            (
                !_.isEqual(prevProps.districtId, this.props.districtId) ||
                !_.isEqual(prevProps.blockId, this.props.blockId) ||
                !_.isEqual(prevProps.formTypes, this.props.formTypes) ||
                !_.isEqual(prevProps.locationType, this.props.locationType)
            )
        ) {
            this.getGraphData() //CALL API BASED ON CONDITION
        }
    }

    init = () => {
        this.setState({
            locationType: this.props.locationType //SET LOCATION TYPE
        }, () => {
            this.getGraphData() //API CALL
        })
    }

    //HANDLE PAGE NUMBER CHANGES

    handlePageChange = (value) => {
        this.setState({
            page: value
        }, this.getGraphData)
    }

    //HANDLE PAGE COUNT CHANGES

    handlePageCount = (pageCount) => {
        this.setState({
            pageCount,
            page: 1
        }, this.getGraphData)
    }

    //HANDLE SEARCH

    handleSearchChange = (search) => {
        this.setState({
            search
        })
    }

    getGraphData = (formType) => {

        const { tabNumber } = this.props

        const {
            formTypes,
            selectedBlock,
            blockId,
            selectedDistrict,
            districtId,
            pageCount,
            page
        } = this.state

        let data = {
            payload: {
                blockId: selectedBlock ? [selectedBlock] : blockId,
                districtId: selectedDistrict ? [selectedDistrict] : districtId,
                panchayatId: [],
                formTypes: formType ? formType : formTypes,
                locationType: 1,
                "limit": parseInt(pageCount),
                "page": page
            },
            tabNumber
        }

        this.setState({
            selectedChartIndexes: []
        }, () => this.props.getChartData(data))

    }

    getFilteredTableData = () => {
        let { data } = this.props
        let { search } = this.state
        let tableData = data.location
        let filteredData = tableData.filter(data =>
            data.label
                .toLowerCase()
                .includes(search?.toLowerCase())
            || !search
        )
        return filteredData
    }

    //HANDLE TABLE VALUE CLICK

    onTableDataClick = (tableData, index) => {

        const {
            match,
            data,
            selectedDistrictName,
            selectedDistrict,
            locationType,
            tabNumber,
            profile
        } = this.props

        let { label, value } = data.location[index]

        console.log(label, value, "valu123")

        //CHECKING THE PERSONA TYPE BASED ON THAT HANDLING REDIRECTION

        if (STAFF_ROLE_ID.SMMU === parseInt(profile.role)) {
            switch (locationType) {
                case 1:
                    this.props.history.push(`${match.path.replace(':tabNumber', tabNumber)}?district=${value}&districtName=${label}`)
                    break;
                case 2:
                    this.props.history.push(`${match.path.replace(':tabNumber', tabNumber)}?district=${selectedDistrict}&districtName=${selectedDistrictName}&block=${value}&blockName=${label}`)
                    break;
            }
        }
        else if (STAFF_ROLE_ID.DMMU === parseInt(profile.role)) {
            switch (locationType) {
                case 2:
                    this.props.history.push(`${match.path.replace(':tabNumber', tabNumber)}?block=${value}&blockName=${label}`)
                    break;
            }
        }
    }

    render() {

        const { pageCount, locationType, search } = this.state

        const { data, loaders } = this.props

        const { pagination } = data.meta

        let tableData = application_charts_status[
            locationType === 3
                ? 'panchayat'
                : locationType === 2
                    ? 'block'
                    : 'district'
        ]

        tableData.rows = this.getFilteredTableData()

        return (
            <Fragment>
                {
                    locationType <= 2 //CHECKING WHETHER IT IS NOT PANCHAYAT VIEW

                        ? <div className="bg-white position-relative">
                            <StackedApplicationStatusChart
                                key={pageCount}
                                graphData={data.graphData}
                            />
                            {
                                loaders.isFetchingChartData ?
                                    <div className="absolute-loader-container">
                                        <div className="spinner-border text-primary"></div>
                                    </div> : ''
                            }
                        </div> : ''
                }
                <div className="div position-relative">
                    <ChartFilter
                        search={search}
                        onSearch={(value) => this.handleSearchChange(value)}
                    />
                    <Row className="no-gutters bg-white mb-3">
                        <Col md="12">
                            <ChartTable data={tableData} onClick={this.onTableDataClick} />
                            <Pagination
                                pagination={pagination}
                                handlePageCount={this.handlePageCount}
                                handlePageChange={this.handlePageChange}
                            />
                        </Col>
                    </Row>
                    {
                        loaders.isFetchingChartData ?
                            <div className="absolute-loader-container">
                            </div> : ''
                    }
                </div>

            </Fragment>
        );
    }
}

export default ApplicationStatus;