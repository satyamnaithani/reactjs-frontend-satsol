import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../globalVariables'
import { useTheme } from '@material-ui/core/styles';
import { LineChart,Tooltip, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Skeleton from '@material-ui/lab/Skeleton';


export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios({
        method: 'GET',
  
        url: url + '/sales/sales-chart-previous-month',
        headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
    })
        .then(response => {
            setData(response.data.sale)
            setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.log(error)})
  }, []);
  return (
    
    <React.Fragment>
      <Title>Last Month Sale</Title>
      {loading?<Skeleton variant="rect" width={880} height={500} animation="wave" />:
       <ResponsiveContainer>
         <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} ></XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (₹)
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>}
    </React.Fragment>
  );
}
