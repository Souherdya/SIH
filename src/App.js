import React, { PureComponent } from 'react';
import { LineChart, Rectangle,Line,Bar,BarChart, Area,AreaChart,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default class Example extends PureComponent {
  render() {
    return (
      <div style={{height:"100vh",width:"100vw",backgroundColor:"rgba(5, 21, 48,1)"}}>
      <div style={{ width: '100%', height: 350 , textAlign:"center" }}>
        <h1>Graphs</h1>

        <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
         <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="red" stopOpacity={1}/>
                <stop offset="60%" stopColor="red" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="red" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="AquaX" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="aqua" stopOpacity={1}/>
                <stop offset="60%" stopColor="aqua" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="aqua" stopOpacity={0}/>
              </linearGradient>
            </defs>
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="url(#colorUv)" />
        </AreaChart>
        </ResponsiveContainer>
        <div style={{height:300 ,width:"40%",position:"absolute",bottom:"-10px",right:"100px"}}>
        <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 50,
            left: 30,
            bottom: 5,
          }}
          
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 10 }} />
          <Line type="monotone" dataKey="uv" stroke="red" />
        </LineChart>
        </ResponsiveContainer>
        </div>
        <div style={{height:300 ,width:"40%"}}>
        <ResponsiveContainer>
        <BarChart

          data={data}
          margin={{
            top: 5,
            right: 50,
            left: 30,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="url(#AquaX)" activeBar={<Rectangle fill="grey" />} />

        </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
      </div>
    );
  }
}
