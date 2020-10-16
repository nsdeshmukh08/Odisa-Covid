import React, { PureComponent, Fragment } from 'react';
import { BarChart, Bar, Cell, XAxis } from 'recharts';
import { getPercentage } from 'helpers';
import { formatToINR } from 'helpers'

const COLORS = ['#4ABFF3', '#F7C137', '#67799F', '#D96A70', '#75CF96'];

const customLabel = (props) => {
  const { x, y, value, width, fill } = props
  let textX, textY;
  textX = x + width / 2
  textY = y
  return <text
    textAnchor="middle"
    x={textX}
    y={textY}
    dy={-10}
    fill={'grey'}
    fontSize={'16'}
    fontWeight={'500'}
    width={props.width}
  >
    {formatToINR(props.value)}
  </text>
}



export class BarChartCommunity extends PureComponent {

  renderXaxisLabel = (props, data) => {
    const { x, y, value, width, index } = props
    let textX, textY;
    textX = x
    textY = y
    return <Fragment>
      <text
        textAnchor="middle"
        x={textX}
        y={textY}
        dy={20}
        fill={'grey'}
        fontWeight={'500'}
        fontSize={'14'}
        width={props.width}
      >
        {data[index].name}
      </text>
      <text
        textAnchor="middle"
        x={textX}
        y={textY + 40}
        dy={16}
        fill={'grey'}
        width={props.width}
      >
        {data[index].number}%
        </text>
    </Fragment>

  }

  render() {
    const { statistics } = this.props;
    console.log(statistics)
    let data = [];
    if (statistics && statistics.totalCommunity) {
      Object.entries(statistics).map(([key, val], index) => {
        if (data[index] && key != "totalCommunity") {
          data[index].name = key
          data[index].pv = parseInt(val)
          data[index].number = getPercentage(val, statistics.totalCommunity)
        } else if (!data[index] && key != "totalCommunity") {
          data.push({
            name: key, pv: parseInt(val), number: parseInt(getPercentage(parseInt(val), statistics.totalCommunity))
          })
          if (key === "totalCommunity") {
            index = index === 0 ? 0 : - 1;
          }
        }
      })
    } else {
      data = []
    }

    return (
      <>
        <div className="text-center">
          <h3 className="mb-1 fw-600" >
            {formatToINR(statistics?.totalCommunity)}
            </h3>
          <p>Total</p>
        </div>
        <div className="community-bar d-flex justify-content-center m-auto">
          <BarChart
            width={620}
            height={200}
            data={data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 60,
            }}
          >
            
            <XAxis tick={(options) => this.renderXaxisLabel(options, data)} />
            <Bar dataKey="pv" fill="#212121" label={customLabel} radius={2} barSize={50}>
              {
                data.map((data, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Bar>


          </BarChart>
        </div>
      </>
    );
  }
}
