import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer,
  Label
} from 'recharts';
import { moneyFormatBySymbol, moneyFormatBySymbolExact, downloadScreenshotOrPrint, formatToINR } from 'helpers'

const COLORS = ['#62a25b', '#f5474d', '#f5c032'];

let tempData = [
    {
      "value": 1,
      "label": "Erode",
      "code": "2910",
      "labelTamil": "ஈரோடு",
      "labelShort": "EROD",
      "labelLong": "Erode (EROD)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    },
    {
      "value": 2,
      "label": "The Nilgiris",
      "code": "2912",
      "labelTamil": "நீலகிரி",
      "labelShort": "NILS",
      "labelLong": "The Nilgiris (NILS)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    },
    {
      "value": 3,
      "label": "Madurai",
      "code": "2920",
      "labelTamil": "மதுரை",
      "labelShort": "MADU",
      "labelLong": "Madurai (MADU)",
      "approvedApplication": 7,
      "rejectedApplication": 1,
      "pendingApplication": 1
    },
    {
      "value": 4,
      "label": "Kanchipuram",
      "code": "2901",
      "labelTamil": "காஞ்சிபுரம்",
      "labelShort": "KANC",
      "labelLong": "Kanchipuram (KANC)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    },
    {
      "value": 5,
      "label": "Chengalpattu",
      "code": "2929",
      "labelTamil": "செங்கல்பட்டு",
      "labelShort": "CHEG",
      "labelLong": "Chengalpattu (CHEG)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    },
    {
      "value": 6,
      "label": "Virudhunagar",
      "code": "2924",
      "labelTamil": "விருதுநகர்",
      "labelShort": "VIRU",
      "labelLong": "Virudhunagar (VIRU)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    },
    {
      "value": 7,
      "label": "Tiruvarur",
      "code": "2915",
      "labelTamil": "திருவாரூர்",
      "labelShort": "TIRV",
      "labelLong": "Tiruvarur (TIRV)",
      "approvedApplication": 0,
      "rejectedApplication": 0,
      "pendingApplication": 0
    }
  ]

export class BarChartWithMultipleBars extends PureComponent {

  render() {
    const { graphData, locationType = 1 } = this.props
    return (
      <div>
        <div className="py-5 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div>
              <h2 className="fw-600 mb-0">Component-wise</h2>
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
            <div className="text-center mr-5 pr-5">
              <h2>{formatToINR(graphData.total)}</h2>
              <h6 className="text-lightGrey">
                Received
                  </h6>
            </div>
            <div className="text-center mr-5 pr-5">
              <h2>{formatToINR(graphData.totalapprovedApplication)}</h2>
              <h6 className="text-lightGrey">
                Total Approved
                  </h6>
            </div>
            <div className="text-center mr-5 pr-5">
              <h2>{formatToINR(graphData.totalpendingApplication)}</h2>
              <h6 className="text-lightGrey">
                Total Pending
              </h6>
            </div>
            <div className="text-center">
              <h2>{formatToINR(graphData.totalrejectedApplication)}</h2>
              <h6 className="text-lightGrey">
                Total Rejected
              </h6>
            </div>
          </div>
        </div>
        <ResponsiveContainer width={'100%'} height={400}>
          <BarChart
            width={'100%'}
            height={450}
            barGap={10}
            // data={graphData?.data}
            data={tempData}
            margin={{
              top: 0, right: 65, bottom: 90, left: 90,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="label"
              tickCount={3}
              fontSize={14}
              dy={10}
              axisLine={false}
              style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
              label={<Label
                value={'Components'}
                position="bottom"
                dy={30}
                style={{ textAnchor: "middle" }}
              />}

            />
            <YAxis 
              tickCount={3} 
              tickFormatter={moneyFormatBySymbol} 
              dx={-10}
              axisLine={false}
              style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
            >
              <Label
                value={`Count`}
                position="left"
                angle={-90}
                dx={-30}
                style={{ textAnchor: "middle", fill: 'rgba(0, 0, 0, 1)', fontSize: '1rem' }}
              />
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
            <Bar 
                dataKey="approvedApplication" 
                label={{position:'top',fontSize: '.7rem',fill:'grey'}} 
                barSize={15} 
                minPointSize={1} 
                fill="#62a25b" 
                radius={2}
                isAnimationActive={false} 
            />
            <Bar 
                dataKey="rejectedApplication" 
                label={{position:'top',fontSize: '.7rem',fill:'grey'}} 
                barSize={15} 
                minPointSize={1} 
                fill="#f5474d" 
                radius={2}
                isAnimationActive={false} 
            />
            <Bar 
                dataKey="pendingApplication" 
                label={{position:'top',fontSize: '.7rem',fill:'grey'}} 
                barSize={15} 
                minPointSize={1} 
                fill="#f5c032" 
                radius={2}
                isAnimationActive={false} 
            />
          </BarChart>
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
          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: '#62a25b' }}></i>Approved</span>
            <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.approvedApplication)}</span>
          </li>
          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: '#f5474d' }}></i>Rejected</span>
            <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.rejectedApplication)}</span>
          </li>
          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: '#f5c032' }}></i>Recommended/Pending</span>
            <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.pendingApplication)}</span>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};