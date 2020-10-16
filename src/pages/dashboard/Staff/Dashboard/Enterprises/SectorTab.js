import React, { Fragment, Component } from 'react';
import { ChartTable } from 'component/Table'
import ChartFilter from 'component/Filter/ChartFilter'
import { VerticalStackedBarChart } from 'component/charts/common'
import {
    Row,
    Col
} from "reactstrap";
import _ from 'lodash'
import { STAFF_ROLE_ID } from 'helpers/variables';
import { chartWithLocationType } from 'helpers/tableDataMapper'
import Pagination from 'component/Pagination/ChartPagination'

class Sector extends Component {

    state = {
        pageCount: 30,
        page: 1,
        districtId: [],
        blockId: [],
        formTypes: [],
        panchayatId: [],
        locationType: null,
        search: null
    }

    // LIFECYCLE

    componentDidMount() {
        this.init()
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        //COMPARING AND CHANGING THE FILTERED LOCATION

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
                formTypes: _.cloneDeep(nextProps.formTypes),
                page: 1
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
                selectedBlock: nextProps.selectedBlock,
                page: 1
            }
        }
        return null
    }

    componentDidUpdate(prevProps) {

        //COMPARING AND GET GRAPH API

        if (
            (
                !_.isEqual(prevProps.districtId, this.props.districtId) ||
                !_.isEqual(prevProps.blockId, this.props.blockId) ||
                !_.isEqual(prevProps.panchayatId, this.props.panchayatId) ||
                !_.isEqual(prevProps.formTypes, this.props.formTypes) ||
                !_.isEqual(prevProps.locationType, this.props.locationType)
            )
        ) {
            this.getGraphData()
        }
    }

    //INIT

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

    //SERVICES

    getGraphData = () => {

        const { tabNumber } = this.props

        const {
            pageCount,
            page,
            locationType,
            blockId,
            districtId,
            panchayatId,
            selectedDistrict,
            selectedBlock,
            selectedPanchayat,
            formTypes
        } = this.state

        let data = {
            payload: {
                blockId: selectedBlock ? [selectedBlock] : blockId,
                districtId: selectedDistrict ? [selectedDistrict] : districtId,
                panchayatId: panchayatId ? panchayatId : [],
                formTypes: formTypes,
                locationType: locationType,
                "limit": parseInt(pageCount),
                "page": page
            },
            tabNumber
        }

        this.props.getChartData(data)
    }

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

    //FILTERING THE DATA

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

    render() {

        const { pageCount, page, locationType, search } = this.state

        const { data, loaders } = this.props

        const { pagination } = data.meta

        let chartListData = {
            ...chartWithLocationType[
            locationType === 3
                ? 'panchayat'
                : locationType === 2
                    ? 'block'
                    : 'district'

            ]
        }

        let dynamicRow = [
            ...chartListData.columns,
            ...this.getFilteredTableData().length ? this.getFilteredTableData()[0].masterList.map(data => ({
                header: data.label,
                Cell: ({ masterList }) => masterList.find(cellValue => cellValue.label === data.label).count
            })) : []

        ]
        chartListData.columns = dynamicRow

        chartListData.rows = this.getFilteredTableData()

        console.log(this.getFilteredTableData(),"myData123")

        return (
            <Fragment>
                {
                    locationType <= 2 //CHECKING WHETHER IT IS NOT PANCHAYAT VIEW
                        ? <div className="bg-white position-relative">
                            <VerticalStackedBarChart graphData={data.graphData} locationType={locationType} />
                            {
                                loaders.isFetchingChartData ?
                                    <div className="absolute-loader-container">
                                        <div className="spinner-border text-primary"></div>
                                    </div> : ''
                            }

                        </div>
                        : ''
                }
                <div className="position-relative">
                    <ChartFilter
                        search={search}
                        onSearch={(value) => this.handleSearchChange(value)}
                    />
                    <Row className="no-gutters bg-white mb-3">
                        <Col md="12" className="position-relative">
                            <ChartTable
                                data={chartListData}
                                onClick={this.onTableDataClick}
                            />
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

export default Sector;