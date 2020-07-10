import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../../globalVariables'
import CardM from '../../common/CardM'
import Loader from '../../common/Loader'


export default function Deposits() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: 'GET',

            url: url + '/stock',
            headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
        })
            .then(response => {
                setData(response.data.items)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, []);
    console.log(data)
    //const date = data.date === undefined ?'':data.date.split('T')[0].split('-')[2]+'/'+data.date.split('T')[0].split('-')[1]+'/'+data.date.split('T')[0].split('-')[0]
    return (
        <React.Fragment>
            {
                loading ? <Loader/> : data.map((value, index) => {
                    return (
                        <CardM
                            key={index}
                            subheader={value.data.item}
                            content1={'GST: ' + value.data.gst+'%'}
                            content2={'Quantity: '+ value.data.quantity+'/'+ value.data.initialQuantity}
                            loading={loading}
                            actionButton='add' />
                    )
                })
            }
        </React.Fragment>
    );
}
