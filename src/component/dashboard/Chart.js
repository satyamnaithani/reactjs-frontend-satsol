import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer 
} from 'recharts';
//import { useTheme } from '@material-ui/core/styles';
import Title from './Title';

// Generate Sales Data
const data = [
    {
      name: 'Hospital A', LastMonth: 4000, ThisMonth: 2400, amt: 2400,
    },
    {
      name: 'Hospital B', LastMonth: 3000, ThisMonth: 1398, amt: 2210,
    },
    {
      name: 'Hospital C', LastMonth: 2000, ThisMonth: 9800, amt: 2290,
    },
    {
      name: 'Hospital D', LastMonth: 2780, ThisMonth: 3908, amt: 2000,
    },
    {
      name: 'Hospital E', LastMonth: 1890, ThisMonth: 4800, amt: 2181,
    },
    {
      name: 'Hospital F', LastMonth: 2390, ThisMonth: 3800, amt: 2500,
    },
    {
      name: 'Hospital G', LastMonth: 3490, ThisMonth: 4300, amt: 2100,
    },
  ];
  
export default function Chart() {
 // const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Overview</Title>
      <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="LastMonth" fill="#8884d8" />
        <Bar dataKey="ThisMonth" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}