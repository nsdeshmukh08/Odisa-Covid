import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Label
} from 'recharts';
import { formatToINR, downloadScreenshotOrPrint } from 'helpers'

let COLORS = ['#fc54e9', '#1fc1d4', '#f7c137']

export class BeneficaryGenderChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c1rLyqj1/';

    render() {
        const { graphData, locationType = 1 } = this.props
        let bars = ['Women', 'Men', 'Transgender']
        let barsData = ['female', 'male', 'transGender']
        let totalDatas = [
            { label: 'Total', value: graphData ? graphData.totalmembers : '' },
            { label: 'Women', value: graphData ? graphData.totalfemale : '' },
            { label: 'Men', value: graphData ? graphData.totalmale : '' },
            { label: 'Transgender', value: graphData ? graphData.totaltransgender : '' },
        ]
        return (
            <div>
                <div className="py-5 px-4">
                    <div className="d-flex justify-content-lg-between align-items-center">
                        <div className="d-flex justify-content-lg-between align-items-center">
                            <div>
                                <h2 className="fw-600 mb-0">Gender</h2>

                                <ul className="list-unstyled list-inline custom-chart-legend m-0">
                                    {bars.map((data, index) => (
                                        <li className="list-inline-item">
                                            <span
                                                className="legend-color"
                                                style={{
                                                    '--background-color': COLORS[index % COLORS.length]
                                                }}
                                            >
                                            </span>
                                            <label>
                                                {data}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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

                    <div className="d-flex align-items-center justify-content-center py-4">
                        {totalDatas.map((list) => (
                            <div className="text-center mr-5 pr-2">
                                <h2>{formatToINR(list.value)}</h2>
                                <h6 className="text-lightGrey">{list.label}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width={'100%'} height={400}>
                    <AreaChart
                        width={'100%'}
                        height={400}
                        data={graphData?.data}
                        margin={{
                            top: 0, right: 100, bottom: 100, left: 65,
                        }}
                    >
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
                                style={{ textAnchor: "middle", fontSize: '16px' }}
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fill: '#000', fontSize: '14px', fontWeight: 600 }}
                            dx={0}
                            axisLine={false}
                        />
                        <Tooltip />
                        {barsData.map((barName, index) => <Area
                            stackId="1"
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                            type="monotone"
                            dataKey={barName}
                        />)}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
