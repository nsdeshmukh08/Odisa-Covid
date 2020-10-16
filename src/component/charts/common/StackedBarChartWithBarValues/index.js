import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer
} from 'recharts';
import { moneyFormatBySymbol, formatToINR } from 'helpers'

let COLORS = ['#5B9BD5', '#ED7D31', '#F7C137']

export class StackedBarChartWithBarValues extends PureComponent {

  render() {
    const { graphData, locationType } = this.props

    let bars = graphData.masterList.length
      ? graphData.data[0].masterList.map(data => data.label)
      : []
    let newData = graphData?.data.map(data => ({
      name: data.label,
      bars: data.masterList.map(data => data.label),
      ...data.masterList.reduce((acc, cur) => ({ ...acc, [cur.label]: cur.count }), {})
    }))

    let total = graphData.masterList.reduce((initial, { masterCount }) => initial + masterCount, 0)

    return (
      <div>
        <div className="pb-5 pt-4 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div>
              <h2 className="fw-600 mb-0">Commodity</h2>
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
              graphData.masterList.map(data => (
                <div className="text-center mr-5 pr-3">
                  <h2>{formatToINR(data.masterCount)}</h2>
                  <h6 className="text-lightGrey">
                    {data.label}
                  </h6>
                </div>
              ))
            }
          </div>
        </div>
        <ResponsiveContainer 
            width={locationType === 2 ? '60%':'100%'} 
            height={400} 
            className="container-fluid"
        >
          <BarChart
            width={500}
            height={300}
            data={newData}
            margin={{
              top: 0, right: 100, bottom: 100, left: 100,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: '14px', fontWeight: 600 }} axisLine={false} >
              <Label
                value={locationType === 1 ? 'Districts' : 'Blocks'}
                position="bottom"
                dy={40}
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </XAxis>
            <YAxis dx={-40} tickFormatter={formatToINR} tick={{ fontSize: '14px', fontWeight: 600 }} axisLine={false} >
              {/* <Label
                value={`Amount in ${locationType === 1 ? 'Crores' : 'Lakhs'}`}
                position="left"
                angle={-90}
                dx={-40}
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              /> */}
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip bars={bars} />} />
            {
              bars.map((barName, index) => <Bar 
              dataKey={barName} 
              barSize={15} 
              minPointSize={5}
              fill={COLORS[index % COLORS.length]}
              radius={2} 
              isAnimationActive={false} 
              label={{ position:'top' }}
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
