import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { formatToINR, downloadScreenshotOrPrint } from 'helpers'

let COLORS = ['#8aabf5', '#67e1eb', '#f9082b', '#ed7d31', 'f7c33d', '#72C18F']
let COLORSROWS = [
  {
    COLORS: ['#8aabf5', '#67e1eb', '#f9082b'],
  },
  {
    COLORS: ['#ed7d31', 'f7c33d', '#72C18F'],
  },
]
export class BeneficiaryVulnerableChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

  render() {
    const { graphData, locationType = 1 } = this.props
    let bars = ['differentlyAbled', 'widow', 'destitued', 'desserted', 'elderly', 'transGender']
    let barRows = [
      {
        labelRows: ['Differently abled', 'Widow', 'Destitued'],
      },
      {
        labelRows: ['Desserted', 'Elderly', "Transgender"],
      },
    ]
    let totalDatas = [
      { label: 'Total', value: graphData ? graphData.total : '' },
      { label: 'Differently abled', value: graphData ? graphData.totaldifferentlyAbled : '' },
      { label: 'Widow', value: graphData ? graphData.totalwidow : '' },
      { label: 'Destitued', value: graphData ? graphData.totaldestitued : '' },
      { label: 'Desserted', value: graphData ? graphData.totaldesserted : '' },
      { label: 'Elderly', value: graphData ? graphData.totalelderly : '' },
      { label: 'Transgender', value: graphData ? graphData.totaltransGender : '' },
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
                      <label>
                        {data}
                      </label>
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

          <div className="d-flex align-items-center justify-content-center py-3">
            {totalDatas.map((list) => (
              <div className="text-center mr-5 pr-2">
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
            margin={{
              top: 0, right: 100, bottom: 100, left: 75,
            }}
            padding={{
              left: 50,
              bottom: 50
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
                style={{ textAnchor: "middle", fontSize: '18px' }}
              />
            </XAxis>
            <YAxis
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
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <Tooltip />

            {bars.map((barName, index) => <Bar
              fill={COLORS[index % COLORS.length]}
              type="monotone"
              dataKey={barName}
              maxBarSize={20}
              stackId="a"
            />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
