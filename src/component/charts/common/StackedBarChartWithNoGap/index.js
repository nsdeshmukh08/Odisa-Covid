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

let data = [
  {
    "value": 115,
    "label": "Nagapattinam",
    "code": "2914001",
    "labelTamil": "நாகப்பட்டினம்",
    "total": 0,
    "masterList": [
      {
        "label": "Nano",
        "value": 1,
        "count": 0
      },
      {
        "label": "Micro",
        "value": 2,
        "count": 0
      },
      {
        "label": "Small",
        "value": 3,
        "count": 0
      }
    ]
  },
  {
    "value": 116,
    "label": "Sembanarkoil",
    "code": "2914009",
    "labelTamil": "செம்பனார் கோயில்",
    "total": 0,
    "masterList": [
      {
        "label": "Nano",
        "value": 1,
        "count": 10
      },
      {
        "label": "Micro",
        "value": 2,
        "count": 10
      },
      {
        "label": "Small",
        "value": 3,
        "count": 20
      }
    ]
  },
  {
    "value": 117,
    "label": "Sirkali",
    "code": "2914010",
    "labelTamil": "சீர்காழி",
    "total": 0,
    "masterList": [
      {
        "label": "Nano",
        "value": 1,
        "count": 20
      },
      {
        "label": "Micro",
        "value": 2,
        "count": 10
      },
      {
        "label": "Small",
        "value": 3,
        "count": 0
      }
    ]
  },
  {
    "value": 118,
    "label": "Thalainayar",
    "code": "2914005",
    "labelTamil": "தலைஞாயிறு",
    "total": 0,
    "masterList": [
      {
        "label": "Nano",
        "value": 1,
        "count": 10
      },
      {
        "label": "Micro",
        "value": 2,
        "count": 0
      },
      {
        "label": "Small",
        "value": 3,
        "count": 20
      }
    ]
  }
]

let COLORS = ['#19B050', '#d96a71', '#022060']

export class StackedBarChartWithNoGap extends PureComponent {

  render() {
    const { graphData, locationType } = this.props

    let bars = graphData.graphList.length
      ? graphData.graphList[0].masterList.map(data => data.label)
      : []
    let newData = graphData?.graphList.map(data => ({
      name: data.label,
      bars: data.masterList.map(data => data.label),
      ...data.masterList.reduce((acc, cur) => ({ ...acc, [cur.label]: cur.count }), {})
    }))

    console.log(newData,"list123")

    let total = graphData.masterData.reduce((initial, { commodityCount }) => initial + commodityCount, 0)

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
              graphData.masterData.map(data => (
                <div className="text-center mr-5 pr-3">
                  <h2>{formatToINR(data.commodityCount)}</h2>
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
            barGap={0}
            barCategoryGap={0}
            margin={{
              top: 0, right: 100, bottom: 100, left: 100,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: '14px', fontWeight: 600 }} axisLine={false} domain={['dataMin', 'dataMax']}>
              <Label
                value={locationType === 1 ? 'Districts' : 'Blocks'}
                position="bottom"
                dy={40}
                hide={true} scale="point"
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </XAxis>
            <YAxis tick={{ fontSize: '14px', fontWeight: 600 }} axisLine={false} >
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
              bars.map((barName, index) => <Bar dataKey={barName} barSize={10} minPointSize={5} fill={COLORS[index % COLORS.length]} />)
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
