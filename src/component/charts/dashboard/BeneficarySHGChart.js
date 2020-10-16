


import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label
} from 'recharts';
import { moneyFormatBySymbolK, formatToINR, downloadScreenshotOrPrint } from 'helpers'

let COLORS = ['#638ff2', '#fb6073', '#93bf8e']
let COLORSROWS = [
  {
    COLORS: ['#638ff2', '#fb6073'],
  },
  {
    COLORS: ['#93bf8e'],
  },
]

export class BeneficarySHGChart extends PureComponent {

  render() {
    const { graphData, locationType = 1 } = this.props
    let bars = ['SHG', 'SHGHH', 'NONSHGHH']
    let barRows = [
      {
        labelRows: ['SHG Members', 'SHG Households'],
      },
      {
        labelRows: ['Non-SHG Members'],
      },
    ]
    let totalData = [
      { label: 'Total', value: graphData ? graphData.total : '' },
      { label: 'SHG', value: graphData ? graphData.totalshg : '' },
      { label: 'SHG HH', value: graphData ? graphData.totalshghh : '' },
      { label: 'Non SHG HH', value: graphData ? graphData.totalnonshg : '' },
    ]
    return (
      <div>
        <div className="py-5 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div className="d-flex justify-content-lg-between align-items-center">
              <div>
                <h2 className="fw-600 mb-0">SHG Members, SHG HH & Non SHG members</h2>
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
            {totalData.map((list) => (
              <div className="text-center mr-5 pr-5">
                <h2>{formatToINR(list.value)}</h2>
                <h6 className="text-lightGrey">{list.label}</h6>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width={'100%'} height={400}>
          <BarChart
            width={'100%'}
            height={350}
            data={graphData?.data}
            layout="vertical"
            margin={{
              top: 0, right: 100, bottom: 100, left: 125,
            }}
            padding={{
              left: 50,
              bottom: 50
            }}
          >
            <XAxis
              tickFormatter={moneyFormatBySymbolK}
              type="number"
              dy={10}
              axisLine={false}
            >
              <Label
                value={'Total Numbers in Thousands'}
                position="bottom"
                dy={20}
                style={{ textAnchor: "middle", fontSize: '18px' }}
              />
            </XAxis>
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fill: '#000', fontSize: '14px', fontWeight: 600 }}
              dx={0}
              axisLine={false}
            >
              {/* <Label
                value={"Amount in Crores"}
                position="left"
                angle={-90}
                dx={-60}
                style={{ textAnchor: "middle", fontSize: '18px' }}
              /> */}
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} />
            {bars.map((barName, index) => <Bar
              fill={COLORS[index % COLORS.length]}
              dataKey={barName}
              maxBarSize={10}
              stackId="a"
              radius={15}
            />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
