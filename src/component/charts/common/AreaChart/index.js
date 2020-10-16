import React, { PureComponent } from 'react';
import {
    AreaChart as Chart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
    Label
} from 'recharts';
import { curveCardinal } from 'd3-shape';

const data = [
    { name: 'CHN', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'MDRI', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'SLM', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'BGLR', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'KKR', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'LKN', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'BNG', uv: 3490, pv: 4300, amt: 2100 },
];

const cardinal = curveCardinal.tension(0.2);

export class AreaChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xujpnxxp/';

    render() {
        return (
            <div>
                <div className="py-4 px-4">
                    <div className="d-flex justify-content-lg-between align-items-center">
                        <div>
                            <h2 className="fw-600">Target vs Achieved</h2>
                            <ul className="list-unstyled list-inline custom-chart-legend m-0">
                                <li className="list-inline-item">
                                    <span
                                        className="legend-color"
                                        style={{
                                            '--background-color': '#72C18F'
                                        }}
                                    >
                                    </span>
                                    <label>
                                        Achieved
                                    </label>
                                </li>
                                <li className="list-inline-item">
                                    <span
                                        className="legend-color"
                                        style={{
                                            '--background-color': '#F4497E'
                                        }}
                                    >
                                    </span>
                                    <label>
                                        Target
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="d-inline-flex">
                            <div className="px-3">
                                <i className="icon-download cursor-pointer"></i>
                            </div>
                            <div className="px-3">
                                <i className="icon-printer cursor-pointer"></i>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex align-items-center justify-content-center py-4">
                        <div className="text-center mr-5 pr-5">
                            <h2>252C</h2>
                            <h6 className="text-lightGrey">
                                Total
                            </h6>
                        </div>
                        <div className="text-center">
                            <h2>300C</h2>
                            <h6 className="text-lightGrey">
                                Target
                            </h6>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width={'100%'} height={400}>
                    <Chart
                        width={'100%'}
                        height={400}
                        data={data}
                        margin={{
                            top: 0, right: 65, bottom: 65, left: 65,
                        }}
                        padding={{
                            left: 50,
                            bottom: 50
                        }}
                    >
                        {/* <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#FC54E9" stopOpacity={1} />
                        <stop offset="99%" stopColor="#FC54E9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#1FC1D4" stopOpacity={} />
                        <stop offset="99%" stopColor="#1FC1D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#F7C137" stopOpacity={1} />
                        <stop offset="99%" stopColor="#F7C137" stopOpacity={0} />
                    </linearGradient>
                </defs> */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name">
                            <Label
                                value={"District"}
                                position="bottom"
                                dy={20}
                                style={{ textAnchor: "middle" }}
                            />

                        </XAxis>
                        <YAxis >
                            <Label
                                value={"Amount in Crores"}
                                position="left"
                                angle={-90}
                                dx={-20}
                                style={{ textAnchor: "middle" }}
                            />
                        </YAxis>
                        <Tooltip />
                        <Area type='monotone' dataKey='amt' stackId="1" stroke='#FC54E9' fill='#ffc658' />
                        <Area type='monotone' dataKey='pv' stackId="1" stroke='#1FC1D4' fill='#1FC1D4' />
                        <Area type='monotone' dataKey='uv' stackId="1" stroke='#FC54E9' fill='#FC54E9' />
                    </Chart>
                </ResponsiveContainer>
            </div>

        );
    }
}
