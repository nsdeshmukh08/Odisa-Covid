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

class ComponentsBeneficiaryCharts extends Component {

    state = {
        pageCount: 30,
        page: 1,
        locationType: 1,
        formTypes: []
    }

    componentDidMount() {
        this.getGraphData() //GET GRAPH DATA
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            locationType: 1,
            formTypes: nextProps.formTypes,
            tabNumber: nextProps.tabNumber
        }
    }

    componentDidUpdate(prevProps) {
        if (
            (
                !_.isEqual(prevProps.formTypes, this.props.formTypes)
            )
        ) {
            this.getGraphData() //CALL API BASED ON CONDITION
        }
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
        const { formTypes, tabNumber } = this.state
        const { pageCount, page } = this.state
        let data = {
            payload: {
                blockId: [],
                districtId: [],
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
                            <ChartTable data={tableData} onClick={this.onTableDataClick} />
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

export default ComponentsBeneficiaryCharts;