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
import { moneyFormatBySymbol,moneyFormatBySymbolExact, formatToINR } from 'helpers'

let COLORS = ['#5B9BD5', '#62A25B', '#F7C137']

export class BarChartHasBackground extends PureComponent {

  render() {
    const { graphData, locationType } = this.props

    let bars = graphData.graphList.length
      ? graphData.graphList[0].masterList.map(data => data.label)
      : []
    let newData = graphData?.graphList.map(data => ({
      name: data.labelShort,
      label: data.label,
      bars: data.masterList.map(data => data.label),
      ...data.masterList.reduce((acc, cur) => ({ ...acc, [cur.label]: cur.count }), {})
    }))

    let total = graphData.masterData.reduce((initial, { masterCount }) => initial + masterCount, 0)

    return (
      <div>
        <div className="pb-5 pt-4 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div>
              <h2 className="fw-600 mb-0">Enterprise</h2>
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
                  <h2>{moneyFormatBySymbolExact(data.masterCount)}</h2>
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
            className="container-fluid p-0">
          <BarChart
            width={500}
            height={300}
            data={newData}
            margin={{
              top: 0, right: 65, bottom: 90, left: 90,
          }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: '.7rem', fontWeight: 600 }} 
              axisLine={false} 
              dy={10}
            >
              <Label
                value={locationType === 1 ? 'Districts' : 'Blocks'}
                position="bottom"
                dy={30}
                hide={true} scale="point"
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </XAxis>
            <YAxis tickCount={3} 
              tickFormatter={formatToINR}
              dx={-10}
              tick={{ fontSize: '.7rem', fontWeight: 600 }} axisLine={false} >
              <Label
                value={`Count`}
                position="left"
                angle={-90}
                dx={-30}
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip bars={bars} />} />
            {
              bars.map((barName, index) => <Bar dataKey={barName} minPointSize={5} maxBarSize={15} fill={COLORS[index % COLORS.length]} background={{ fill: '#F5F5F5' }} />)
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
