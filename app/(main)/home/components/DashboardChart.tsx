import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {name:'Mon', value: 10},
  {name:'Tue', value: 20},
  {name:'Wed', value: 12},
  {name:'Thu', value: 30},
  {name:'Fri', value: 25}
];

export default function DashboardChart(): JSX.Element {
  return (
    <div style={{width:'100%', height:220}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
