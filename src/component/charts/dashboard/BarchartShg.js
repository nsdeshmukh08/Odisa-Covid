import React, { PureComponent } from 'react';
import { formatToINR } from 'helpers';
export class BarchartShg extends PureComponent {

  render() {
    const { statistics } = this.props;

    return (
      <div className="flex-grow-1 d-flex flex-column">
        <div className="text-center pt-4">
          <h3 className="mb-1 fw-600" >{formatToINR(statistics?.totalSHG)}</h3>
          <p>Total</p>
        </div>
        <div className="d-flex justify-content-center flex-grow-1 pt-3">
          <div className="shg-chart-container">
            <div className="custom-piechart piechart-1 text-white d-flex flex-column align-items-center justify-content-center">
              <small>SHG</small>
              <p className="text-white mb-0 small">
                {formatToINR(statistics?.SHG)}
              </p>
            </div>
            <div className="custom-piechart piechart-2 text-white d-flex flex-column align-items-center justify-content-center">
              <small>
                SHG
                Households
              </small>
              <p className="text-white mb-0 small">
                {formatToINR(statistics?.SHGHouseholds)}
              </p>
            </div>
            <div className="custom-piechart piechart-3 text-white d-flex flex-column align-items-center justify-content-center">
              <small>
                Non-SHG
                Households
              </small>
              <p className="text-white mb-0 small">{formatToINR(statistics?.NonSHGHouseholds)}</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}



// import React, { PureComponent } from 'react';
// import {
//   PieChart, Pie, Sector, Cell,
// } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (

//   );
// };

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

//   render() {
//     return (
//       <PieChart width={400} height={400}>
//         <Pie
//           data={data}
//           cx={200}
//           cy={200}
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={80}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {
//             data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
//           }
//         </Pie>
//       </PieChart>
//     );
//   }
// }
