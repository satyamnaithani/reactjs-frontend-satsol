import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import Title from './Title';
const data = [
  {
    subject: 'A', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'B', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'C', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'D', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'E', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'F', A: 65, B: 85, fullMark: 150,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

  render() {
    return (
      <>
      <Title>Expenses By Employees</Title>
      <RadarChart cx={125} cy={80} outerRadius={60} width={250} height={165} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
      </>
    );
  }
}
