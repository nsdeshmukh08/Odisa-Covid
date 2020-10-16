import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer,
    Label
} from 'recharts'
import { formatToINR, moneyFormatBySymbolExact } from 'helpers'

export class CustomShapeBarChart extends PureComponent {

    render() {
        const { graphData, locationType } = this.props

        let bars = graphData.graphList.length
            ? graphData.graphList[0].masterList.map(data => data.label)
            : []
        let newData = graphData?.graphList.map(data => ({
            name: data.labelShort,
            label:data.label,
            bars: data.masterList.map(data => data.label),
            ...data.masterList.reduce((acc, cur) => ({ ...acc, [cur.label]: cur.count }), {})
        }))

        let total = graphData.masterData.reduce((initial, { activityCount }) => initial + activityCount, 0)

        return (
            <div>
                <div className="pb-5 pt-4 px-4">
                    <div className="d-flex justify-content-lg-between align-items-center">
                        <div>
                            <h2 className="fw-600 mb-0">Activity</h2>
                            <ul className="list-unstyled list-inline custom-chart-legend m-0">
                                {
                                    bars.map((data, index) => (
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
                                    ))
                                }

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
                        <div className="text-center mr-5 pr-3">
                            <h2>
                                {moneyFormatBySymbolExact(total)}
                            </h2>
                            <h6 className="text-lightGrey">
                                Total
                            </h6>
                        </div>
                        {
                            graphData.masterData.map(data => (
                                <div className="text-center mr-5 pr-3">
                                    <h2>{moneyFormatBySymbolExact(data.activityCount)}</h2>
                                    <h6 className="text-lightGrey">
                                        {data.label}
                                    </h6>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ResponsiveContainer width={locationType === 2 ? '60%':'100%'} 
            height={400} 
            className="container-fluid">
                    <BarChart
                        width={500}
                        height={300}
                        data={newData}
                        margin={{
                            top: 0, right: 100, bottom: 100, left: 100,
                        }}
                    >
                        <XAxis 
                            dataKey="name" 
                            dy={10}
                            tick={{ fontSize: '.7rem', fontWeight: 600 }}
                            axisLine={false}
                        >
                            <Label
                                value={locationType === 1 ? 'Districts' : 'Blocks'}
                                position="bottom"
                                dy={40}
                                style={{ textAnchor: "middle", fontSize: '1rem' }}
                            />
                        </XAxis>
                        <YAxis 
                            tick={false} 
                            dx={-10}
                            axisLine={false}
                            tickFormatter={formatToINR}
                            tick={{ fontSize: '.7rem', fontWeight: 600 }}
                        >
                            <Label
                                value={`Amount`}
                                position="left"
                                angle={-90}
                                dx={-40}
                                style={{ textAnchor: "middle", fontSize: '1rem' }}
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip bars={bars}/>} cursor={{ fill: 'transparent' }}/>
                        {
                            bars.map((barName, index) => <Bar dataKey={barName} minPointSize={5} stackId="a" maxBarSize={20} shape={<TriangleBar />} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </BarChart>
                </ResponsiveContainer>
                
            </div>
        );
    }
}

const CustomTooltip = ({ active, payload, label, bars }) => {
    let myData = payload?.[0]?.payload
    // let bars =payload?.[0]?.payload?.bars ? payload?.[0]?.payload?.bars : []
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="heading">{`${myData?.label}`}</p>
                <ul className="chart-values list-unstyled">
                    {
                        bars.map((data, index) =>
                            <li>
                                <span>
                                    <i className="fa fa-circle mr-1" style={{ color: COLORS[index % COLORS.length] }}></i>
                                    {data}
                                </span>
                                <span>{moneyFormatBySymbolExact(myData[data])}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }

    return null;
};


const COLORS = ['#638FF2', '#67E1EB'];;

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
