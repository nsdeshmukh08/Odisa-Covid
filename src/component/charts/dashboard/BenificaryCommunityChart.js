/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import { moneyFormatBySymbolK, formatToINR, downloadScreenshotOrPrint } from 'helpers'

let COLORS = ['#4abff3', '#f7c137', '#67799f', '#F4497E', '#72C18F']

let COLORSROWS = [
    {
        COLORS: ['#4abff3', '#f7c137', '#67799f']
    },
    {
        COLORS: ['#F4497E', '#72C18F']
    },
]
export class BenificaryCommunityChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

    render() {
        const { graphData, locationType = 1 } = this.props
        let bars = ['BC', 'MBC', 'SC', 'ST', 'OTHERS']
        let barRows = [
            {
                labelRows: ['BC', 'MBC', 'SC'],
            },
            {
                labelRows: ['ST', 'OTHERS'],
            },
        ]
        let totalDatas = [
            { label: 'Total', value: graphData ? graphData.total : '' },
            { label: 'BC', value: graphData ? graphData.totalbc : '' },
            { label: 'MBC', value: graphData ? graphData.totalmbc : '' },
            { label: 'SC', value: graphData ? graphData.totalsc : '' },
            { label: 'ST', value: graphData ? graphData.totalst : '' },
            { label: 'Others', value: graphData ? graphData.totalothers : '' },
        ]
        return (
            <div>
                <div className="py-5 px-4">
                    <div className="d-flex justify-content-lg-between align-items-center">
                        <div>
                            <h2 className="fw-600">Community</h2>
                            {barRows.map((list, rowIndex) => (
                                <ul className="list-unstyled list-inline custom-chart-legend m-0">
                                    {list.labelRows.map((data, index) => (
                                        <li className="list-inline-item">
                                            <span
                                                className="legend-color"
                                                style={{
                                                    '--background-color': COLORSROWS[rowIndex].COLORS[index % COLORS.length]
                                                }}
                                            >
                                            </span>
                                            <label>{data}</label>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                        <div className="d-inline-flex">
                            <div className="px-3">
                                <i className="icon-printer cursor-pointer"
                                    onClick={() => downloadScreenshotOrPrint(true)}
                                ></i>
                            </div>
                            <div className="px-3">
                                <i className="icon-download cursor-pointer"
                                    onClick={() => downloadScreenshotOrPrint()}
                                ></i>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex align-items-center justify-content-center pb-3">
                        {totalDatas.map((list) => (
                            <div className="text-center mr-5 pr-2">
                                <h2>{formatToINR(list.value)}</h2>
                                <h6 className="text-lightGrey">{list.label}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width={'100%'} height={400}>
                    <LineChart
                        width={'100%'}
                        height={400}
                        data={graphData?.data}
                        margin={{
                            top: 0, right: 100, bottom: 100, left: 75,
                        }}
                        padding={{
                            left: 50,
                            bottom: 50
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#000', fontSize: '14px', fontWeight: 600 }}
                            dy={10}
                            axisLine={false}
                        >
                            <Label
                                value={locationType === 1 ? 'Districts' : 'Blocks'}
                                position="bottom"
                                dy={20}
                                style={{ textAnchor: "middle", fontSize: '18px' }}
                            />
                        </XAxis>
                        <YAxis
                            tickFormatter={moneyFormatBySymbolK}
                            tick={{ fill: '#000', fontSize: '14px', fontWeight: 600 }}
                            dx={0}
                            axisLine={false}
                        >
                            {/* <Label
                                value={"Amount in Crores"}
                                position="left"
                                angle={-90}
                                dx={-20}
                                style={{ textAnchor: "middle", fontSize: '18px' }}
                            /> */}
                        </YAxis>

                        {bars.map((barName, index) => <Line
                            stroke={COLORS[index % COLORS.length]}
                            type="monotone"
                            dataKey={barName}
                        />)}
                        <Tooltip cursor={{ fill: 'transparent' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
