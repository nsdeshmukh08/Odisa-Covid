import React, { PureComponent, Fragment } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Cell } from 'recharts';
import { getPercentage,formatToINR } from 'helpers';

const COLORS = ['#638FF2', '#67E1EB', '#ED7D31', '#F7C137', '#F5474D', '#62A25B'];

const customLabel = (props) => {
  const { x, y, value, width,height, offset } = props
  console.log(props,"prop123")
  let textX, textY;
  textX = x + width + formatToINR(props.value).toString().length + 30
  textY = y + (height + offset + 3) / 2
  return <text
    textAnchor="middle"
    x={textX}
    y={textY}
    fill={'grey'}
    width={props.width}
  >
    {formatToINR(props.value)}
  </text>
}

const renderVulnerableData = (props,data) => {
  const { x, y, value, width,height, offset,index } = props
  let textX, textY;
  textX = x - 40
  textY = y
  return <Fragment>
    <text
      textAnchor="middle"
      x={textX}
      y={textY}
      fill={'black'}
      fontSize={20}
      fontWeight={600}
      width={props.width}
    >
      {`${data[index].number}%`}
    </text>
    <text
      textAnchor="middle"
      x={textX - 100}
      y={textY}
      fill={'grey'}
      fontSize={15}
      width={props.width}
    >
      {data[index].name}
    </text>
  </Fragment>

}
export class BarChartVulnerable extends PureComponent {

  render() {
    const { statistics } = this.props;

    let data = [];

    if (statistics && statistics.totalVulnerable) {
      Object.entries(statistics).map(([key, val], index) => {
        if (key == "Differentlyabled") {
          key = "Differently abled"
        }
        if (key != "totalVulnerable") {
          data.push({
            name: key, pv: parseInt(val), number: parseInt(getPercentage(val, statistics.totalVulnerable))
          })
          if (key === "totalVulnerable") {
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
          <h3 className="mb-1 fw-600" >{formatToINR(statistics?.totalVulnerable)}</h3>
          <p>Total</p>
        </div>
        <div className="vulnerable-bar-chart">
          <div className="pt-2">
            <ComposedChart
              layout="vertical"
              width={420}
              height={350}
              data={data}
              margin={{
                top: 20, right: 20, bottom: 20, left: 80,
              }}
            >
              <XAxis type="number" fill="#fff" />
              <YAxis tick={(options) => renderVulnerableData(options, data)} type="category" fill="#3C3C3C" />
              <Bar dataKey="pv" barSize={28} label={customLabel} radius={2} barGap={100} >
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))
                }
              </Bar>
              <Line dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </div>
        </div>
      </>
    );
  }
}
