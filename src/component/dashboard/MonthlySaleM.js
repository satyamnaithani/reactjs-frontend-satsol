import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../globalVariables'
import CardM from '../common/CardM'


export default function Deposits() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: 'GET',

            url: url + '/sales/monthly',
            headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
        })
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <React.Fragment>
            <CardM
                title='Monthly Sale'
                subheader={'Total: ₹' + data.total}
                content1={'Number Of Orders: ' + data.count}
                content2={'Total Amount: ₹' + data.rate}
                content3={'Total GST: ₹' + data.gst}
                content4={'Grand Total In Words: ' + data.grandTotalInWords}
                loading={loading} />
        </React.Fragment>
    );
}
