import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer,
  Label
} from 'recharts';
import { moneyFormatBySymbol,moneyFormatBySymbolExact, downloadScreenshotOrPrint } from 'helpers'

const COLORS = ['#1477FB', '#62A25B', '#d055c6', '#b9b559', '#D06951', '#67BABE'];

export class StackedBarChart extends PureComponent {

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
              <h2>{moneyFormatBySymbolExact(graphData.totalAchieved)}</h2>
              <h6 className="text-lightGrey">
                Total
                  </h6>
            </div>
            <div className="text-center">
              <h2>
                {moneyFormatBySymbolExact(graphData.totalTarget)}
              </h2>
              <h6 className="text-lightGrey">
                Target
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
              top: 0, right: 100, bottom: 100, left: 100,
            }}
            padding={{
              left: 50,
              bottom: 50
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="label"
              tickCount={3}
              fontSize={14}
              dy={10}
              axisLine={false}
              label={<Label
                value={"Components"}
                position="bottom"
                dy={40}
                style={{ textAnchor: "middle" }}
              />}
              style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
            />
            <YAxis 
              tickCount={3} 
              tickFormatter={moneyFormatBySymbol} 
              dx={-10}
              axisLine={false}
              style={{ fill: 'rgba(0, 0, 0, 1)',fontSize: '.7rem' }}
            >
              <Label
                value={`Amount`}
                position="left"
                angle={-90}
                dx={-40}
                style={{ textAnchor: "middle", fontSize: '1rem' }}
              />
            </YAxis>
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
            <Bar dataKey="achieved" barSize={30} stackId="a" minPointSize={1} fill="#D055C6" radius={2} isAnimationActive={false}>
              {
                graphData?.data.map((data, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Bar>
            <Bar dataKey="target" minPointSize={1} stackId="a" fill="#DDDDDD" radius={[5, 5, 0, 0]} />
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
        <p className="heading">{`${label}`}</p>
        <ul className="chart-values list-unstyled">
          {
            payload?.[0]?.payload?.target !== undefined ?
              <li>
                <span>
                  <i className="fa fa-circle mr-1" style={{ color: '#DDDDDD' }}></i>
                        Target
                    </span>
                <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.target)}</span>
              </li> : ''
          }

          <li>
            <span><i className="fa fa-circle mr-1" style={{ color: COLORS[payload.length - 1] }}></i>Achieved</span>
            <span>{moneyFormatBySymbolExact(payload?.[0]?.payload?.achieved)}</span>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};