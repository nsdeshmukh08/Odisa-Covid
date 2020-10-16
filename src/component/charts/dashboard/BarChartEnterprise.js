import React, { Component } from 'react'
import Chart from 'react-apexcharts'

import {
    Container,
    Row,
    Col,
} from "reactstrap";
import { getPercentage } from 'helpers';

export class BarChartEnterprise extends Component {


    render() {
        const { statistics, type } = this.props;

        let chartData = {
            series: [92, 56, 10],
            options: {
                chart: {
                    height: 250,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '22px',
                            },
                            value: {
                                fontSize: '16px',
                            },
                            total: {
                                show: true,
                                formatter: function (w) {
                                    return 24, 559
                                },
                                label: 'Total ',
                            }
                        }
                    }
                },
                labels: ['Nano', 'Micro', 'Small'],
            },

            data: []
        }
        let total = 0

        if (statistics) {
            if (type === "enterpriseCount") {
                total = statistics.reduce((sum, { enterpriseCount }) => sum + enterpriseCount, 0);
                chartData.options.plotOptions.radialBar.dataLabels.total = {
                    show: true, formatter: function (w) {
                        return 24, total
                    },
                    label: 'Total'
                }
            } else if (type === "activityCount") {
                total = statistics.reduce((sum, { activityCount }) => sum + activityCount, 0)
                chartData.options.plotOptions.radialBar.dataLabels.total = {
                    show: true, formatter: function (w) {
                        return 24, total
                    },
                    label: ' Total'
                }
            } else if (type === "sectorCount") {
                total = statistics.reduce((sum, { sectorCount }) => sum + sectorCount, 0)
                chartData.options.plotOptions.radialBar.dataLabels.total = {
                    show: true, formatter: function (w) {
                        return 24, total
                    },
                    label: ' Total '
                }
            }
            chartData.series = [];
            Object.entries(statistics).map(([key, val], index) => {
                // console.log(key,val,total,"data")
                chartData.series.push(getPercentage(val[type], total))
                if (chartData.data[key]) {
                    chartData.data[key].name = val.label
                    chartData.data[key].value = val[type]
                    chartData.data[key].total = `${getPercentage(val[type], total)} %`
                } else {
                    chartData.data.push({
                        name: val.label, 
                        value: val[type], 
                        total: `${getPercentage(val[type], total)} %`
                    })
                }
                // console.log(chartData.data[key],total,"chartDat")
            })
        }
        return (

            <div className="enterprise-chart">
                <Row className="w-100">
                    <Col lg="6">
                        <div>
                            <Chart className="d-flex justify-content-center" 
                            options={chartData.options} 
                            series={chartData.series} type="radialBar"
                            height="200"
                            />
                        </div>
                    </Col>

                    <Col lg="3">
                        <div className="enterprise-name-list">
                            <ul className="p-0">
                                <li>
                                    {chartData.data.map((entry, index) => (
                                        <span key={index}>
                                            <p>{entry.name}</p>
                                            <h6>{entry.value}</h6>
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col lg="3">
                        <div className="enterprise-price ">
                            {chartData.data.map((entry, index) => (
                                <h4>{entry.total}</h4>
                            ))}
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

