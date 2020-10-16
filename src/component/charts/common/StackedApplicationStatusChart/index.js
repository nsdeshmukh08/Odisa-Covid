import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer,
  Label
} from 'recharts';
import { moneyFormatBySymbol, moneyFormatBySymbolExact, downloadScreenshotOrPrint } from 'helpers'

const COLORS = ['#62a25b', '#f5474d', '#f5c032'];

export class StackedApplicationStatusChart extends PureComponent {

  render() {
    const { graphData, locationType = 1 } = this.props
    return (
      <div>
        <div className="py-5 px-4">
          <div className="d-flex justify-content-lg-between align-items-center">
            <div>
              <h2 className="fw-600 mb-0">Application Status</h2>
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
              <h2>{moneyFormatBySymbolExact(graphData.total)}</h2>
              <h6 className="text-lightGrey">
                Received
                  </h6>
            </div>
            <div className="text-center mr-5 pr-5">
              <h2>{moneyFormatBySymbolExact(graphData.totalapprovedApplication)}</h2>
              <h6 className="text-lightGrey">
                Total Approved
                  </h6>
            </div>
            <div className="text-center mr-5 pr-5">
              <h2>{moneyFormatBySymbolExact(graphData.totalrejectedApplication)}</h2>
              <h6 className="text-lightGrey">
                Rejected
              </h6>
            </div>
            <div className="text-center">
              <h2>{moneyFormatBySymbolExact(graphData.totalpendingApplication)}</h2>
              <h6 className="text-lightGrey">
                Recommended/Pending
              </h6>
            </div>
          </div>
        </div>
        <ResponsiveContainer width={'100%'} height={400}>
          <BarChart
            width={'100%'}
            height={450}
            data={graphData?.data}
            margin={{
              top: 0, right: 65, bottom: 90, left: 90,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="labelShort"
              tickCount={3}
              fontSize={14}
              dy={10}
              axisLine={false}
              style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
              label={<Label
                value={locationType === 1 ? 'Districts' : 'Blocks'}
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
            <Bar dataKey="approvedApplication" barSize={10} stackId="a" minPointSize={1} fill="#62a25b" isAnimationActive={false} />
            <Bar dataKey="rejectedApplication" barSize={10} stackId="a" minPointSize={1} fill="#f5474d" isAnimationActive={false} />
            <Bar dataKey="pendingApplication" barSize={10} stackId="a" minPointSize={1} fill="#f5c032" isAnimationActive={false} />
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
            <span>{moneyFormatBySymbol(payload?.[0]?.payload?.approvedApplication)}</span>
          </li>
          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: '#f5474d' }}></i>Rejected</span>
            <span>{moneyFormatBySymbol(payload?.[0]?.payload?.rejectedApplication)}</span>
          </li>
          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: '#f5c032' }}></i>Recommended/Pending</span>
            <span>{moneyFormatBySymbol(payload?.[0]?.payload?.pendingApplication)}</span>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};