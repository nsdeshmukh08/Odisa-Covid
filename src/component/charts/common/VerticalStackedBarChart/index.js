import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { moneyFormatBySymbol, formatToINR } from 'helpers'

let COLORS = ['#8C54FC', '#62A25B', '#F7C137']

export class VerticalStackedBarChart extends PureComponent {

  render() {
    const { graphData, locationType } = this.props
    console.log(graphData,"graphData")
    let bars = graphData.graphList.length
      ? graphData.graphList[0].masterList.map(data => data.label)
      : []
    let newData = graphData?.graphList.map(data => ({
      name: data.label,
      bars: data.masterList.map(data => data.label),
      ...data.masterList.reduce((acc, cur) => ({ ...acc, [cur.label]: cur.count }), {})
    }))

    let total = graphData.masterData.reduce((initial, { sectorCount }) => initial + sectorCount, 0)

    return (
      <div>
        <div className="pb-5 pt-4 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div>
              <h2 className="fw-600 mb-0">Sector</h2>
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
                {formatToINR(total)}
              </h2>
              <h6 className="text-lightGrey">
                Total
              </h6>
            </div>
            {
              graphData.masterData.map(data => (
                <div className="text-center mr-5 pr-3">
                  <h2>{formatToINR(data.sectorCount)}</h2>
                  <h6 className="text-lightGrey">
                    {data.label}
                  </h6>
                </div>
              ))
            }
          </div>
        </div>
        <ResponsiveContainer width={locationType === 2 ? '60%':'100%'}  height={800} className="p-0 container-fluid">
          <BarChart
            width={'100%'}
            height={800}
            data={newData}
            layout="vertical"
            
            margin={{
              top: 0, right: 100, bottom: 100, left: 100,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" horizontal={false} />
            <XAxis 
              tick={{ fontSize: '.7rem', fontWeight: 600 }}
              type="number" tickFormatter={moneyFormatBySymbol} 
              domain={['dataMin', 'dataMax']} 
              axisLine={false}
            >

            </XAxis>
            <YAxis 
              tick={{ fontSize: '.7rem', fontWeight: 600 }}
              type="category" 
              dataKey="name" 
              style={{ fontSize:'14px' }} 
              axisLine={false}
            >
              <Label
                  value={`Amount`}
                  position="left"
                  angle={-90}
                  dx={-40}
                  style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip bars={bars} />} />
            <ReferenceLine y={0} stroke="#000" />
            {
              bars.map((barName, index) => <Bar
                dataKey={barName}
                maxBarSize={7}
                stackId="a"
                fill={COLORS[index]}
                radius={50}
              />)
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
        <p className="heading">{`${label}`}</p>
        <ul className="chart-values list-unstyled">
          {
            bars.map((data, index) =>
              <li>
                <span>
                  <i className="fa fa-circle mr-1" style={{ color: COLORS[index % COLORS.length] }}></i>
                  {data}
                </span>
                <span>{moneyFormatBySymbol(myData[data])}</span>
              </li>
            )
          }
        </ul>
      </div>
    );
  }

  return null;
};