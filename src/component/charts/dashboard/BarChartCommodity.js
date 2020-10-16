import React, { PureComponent, Fragment } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Cell} from 'recharts';
import { getPercentage,formatToINR } from 'helpers';

const COLORS = ['#638FF2', '#67E1EB', '#ED7D31', '#F7C137', '#F5474D', '#62A25B'];

const customLabel = (props) => {
    const { x, y, value, width,height, offset } = props
    // console.log(props,"prop123")
    let textX, textY;
    textX = x + width + 20
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

export class BarChartCommodity extends PureComponent {

    render() {
        const { statistics } = this.props;
        let total;
        let data = [
        ];
        if (statistics && statistics.length) {
            total = statistics.reduce((sum, { commodityCount }) => sum + commodityCount, 0);
            Object.entries(statistics).map(([key, val], index) => {
                data.push({
                    name: val.label, 
                    pv: val.commodityCount, 
                    number: `${getPercentage(val.commodityCount, total)}`
                })
            })
        } else {
            data = []
        }

        return (
            <>
                <div className="text-center mt-3 mb-3">
                    <h3 className="mb-1 fw-600" >{total}</h3>
                    <p>Total</p>
                </div>
                {
                  data.length ? 
                  <div className="vulnerable-bar-chart commodity flex-grow-1">
                        <ComposedChart
                            layout="vertical"
                            width={400}
                            height={500}
                            data={data}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <XAxis type="number" fill="#fff" />
                            <YAxis tick={(options) => renderVulnerableData(options, data)} type="category" fill="#3C3C3C" />
                            <Bar dataKey="pv" barSize={15} label={customLabel} radius={2}  >
                                {
                                    data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))
                                }
                            </Bar>
                            <Line dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                </div> : <div className="d-flex justify-content-center align-items-center flex-grow-1">
                        <p className="m-0">No Graph Data</p>
                </div>
                }
                
            </>
        );
    }
}
