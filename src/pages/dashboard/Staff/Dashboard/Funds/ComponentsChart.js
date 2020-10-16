import React, { Fragment, Component } from 'react';
import { ChartTable } from 'component/Table'
import ChartFilter from 'component/Filter/ChartFilter'
import { StackedBarChart } from 'component/charts/common'
import {
    Row,
    Col
} from "reactstrap";
import _ from 'lodash'
import { fund_components } from 'helpers/tableDataMapper'

class ComponentsCharts extends Component {

    state = {
        pageCount: 30,
        page: 1,
        locationType: 1,
        formTypes: [],
        districtId :[],
        blockId : [],
        panchayatId : [],
        selectedDistrict : null,
        selectedBlock : null
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

    //HANDLE PAGE NUMBER CHANGE

    handlePageChange = (value) => {
        this.setState({
            page: value
        }, this.getGraphData)
    }

    //HANDLE PAGE COUNT CHANGE

    handlePageCount = (pageCount) => {
        this.setState({
            pageCount,
            page: 1
        }, this.getGraphData)
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

    //HANDLE TABLE VALUE CLICK

    onTableDataClick = (data, index) => {
        this.getGraphData([index+1])
    }

    render() {
        const { pageCount, page } = this.state
        const { data, loaders } = this.props
        let tableData = fund_components
        tableData.rows = data?.forms
        return (
            <Fragment>
                <div className="bg-white position-relative">
                    <StackedBarChart
                        key={pageCount}
                        graphData={data.graphData}
                    />
                    {
                        loaders.isFetchingChartData ?
                            <div className="absolute-loader-container">
                                <div className="spinner-border text-primary"></div>
                            </div> : ''
                    }
                </div>
                <div className="div position-relative">
                    <ChartFilter
                        pageCount={pageCount}
                        hideSearch={true}
                    />
                    <Row className="no-gutters bg-white mb-3">
                        <Col md="12">
                            <ChartTable data={tableData} />
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

export default ComponentsCharts;