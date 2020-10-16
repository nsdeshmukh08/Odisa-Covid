import React, { PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer
} from 'recharts'
import { Link } from 'react-router-dom'
import { moneyFormatBySymbol,moneyFormatBySymbolExact } from 'helpers'

export class ComposedBarChart extends PureComponent {
    render() {
        const { graphData, locationType = 1 } = this.props
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
                            <h2>{moneyFormatBySymbolExact(graphData.totalAchieved)}</h2>
                            <h6 className="text-lightGrey">
                                Total Achieved
                            </h6>
                        </div>
                        <div className="text-center">
                            <h2>
                                {moneyFormatBySymbolExact(graphData.totalTarget)}
                            </h2>
                            <h6 className="text-lightGrey">
                                Total Target
                            </h6>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width={locationType === 2 ? '60%' : '100%'}
                    height={400}
                    className="container-fluid p-0">
                    <ComposedChart
                        width={'auto'}
                        height={450}
                        data={graphData?.data}
                        margin={{
                            top: 0, right: 65, bottom: 90, left: 90,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis
                            style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
                            dataKey="labelShort"
                            dy={10}
                            axisLine={false}
                        >
                            <Label
                                value={locationType === 1 ? 'Districts' : 'Blocks'}
                                position="bottom"
                                dy={30}
                                style={{ textAnchor: "middle", fontSize: '1rem' }}
                            />

                        </XAxis>
                        <YAxis
                            style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
                            tickFormatter={moneyFormatBySymbol}
                            dx={-10}
                            axisLine={false}
                        >
                            <Label
                                value={`Amount`}
                                position="left"
                                angle={-90}
                                dx={-30}
                                style={{ textAnchor: "middle", fontSize: '1rem' }}
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="achieved" barSize={15} fill="#72C18F" />
                        <Line isAnimationActive={false} type="monotone" dataKey="target" strokeWidth={2} stroke="#F4497E" dot={{ r: 4, fill: "#F4497E" }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}


const CustomTooltip = ({ active, payload, label }) => {

    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="heading">{`${payload?.[0]?.payload?.label}`}</p>
                <ul className="chart-values list-unstyled">
                    {
                        payload?.[0]?.payload?.target !== undefined ? 
                        <li>
                            <span>
                                <i className="fa fa-circle mr-1" style={{ color: '#F4497E' }}></i>
                            Target
                            </span>
                            <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.target)}</span>
                        </li> : ''
                    }
                    
                    <li>
                        <span><i className="fa fa-circle mr-1" style={{ color: '#72C18F' }}></i>Achieved</span>
                        <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.achieved)}</span>
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};