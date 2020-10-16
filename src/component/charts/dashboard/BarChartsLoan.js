import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis } from 'recharts';
import { formatToINR } from 'helpers'

const COLORS = ['#c2defb', '#0077FB', '#67acf8'];

const customLabel = (props) => {
    const { x,y,value,width,fill } = props
    let textX,textY;
    textX = x + width / 2
    textY = y
    console.log(props,"propas")
return <text
        textAnchor="middle"
        x={textX}
        y={textY}
        dy={-10}
        fill={props.index === 1 ? props.fill : 'grey'}
        fontSize={props.index === 1 ? 20 : 16}
        fontWeight={props.index === 1 ? 700 : 500}
        width={props.width}
        >
            {formatToINR(props.value)}
        </text>
}
export class BarChartsLoan extends PureComponent {

    render() {
        const { loanSize } = this.props;
        let data = [
        ];
        if (loanSize) {
            Object.entries(loanSize).map(([key, val], index) => {
                data.push({ name: key, uv: parseInt(val) })
            })
        } else {
            data = [
                { name: 'Lowest', uv: 25000 },
                { name: 'Average', uv: 50000 },
                { name: 'Highest', uv: 75000 }
            ]
        }

        return (
            <div className="m-auto d-flex justify-content-center">
                <BarChart
                    width={450}
                    height={150}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" stroke="grey" />
                    <Bar dataKey="uv" fill="grey" radius={3} barSize={80} label={customLabel} isAnimationActive={false} >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </div>
        );
    }
}
