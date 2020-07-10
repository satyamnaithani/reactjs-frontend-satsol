import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../globalVariables'
import CardM from '../common/CardM'


export default function Deposits() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios({
      method: 'GET',
  
      url: url + '/sales/recent',
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
  })
      .then(response => {
          setData(response.data[0])
          setLoading(false)
      })
      .catch(error => console.log(error))
  }, []);
  const date = data.date === undefined ?'':data.date.split('T')[0].split('-')[2]+'/'+data.date.split('T')[0].split('-')[1]+'/'+data.date.split('T')[0].split('-')[0]
  return (
    <React.Fragment>
        <CardM title='Recent Sale' content1={'₹'+data.grandTotal} content2={'on '+date} subheader={data.customerName} loading={loading}/>
    </React.Fragment>
  );
}
