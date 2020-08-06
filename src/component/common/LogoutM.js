import React from 'react';
import { url } from '../../globalVariables';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { MenuItem } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
export default function LogoutM () {
    const [logout, setLogout] = React.useState(false);
    const [processingLogout, setProcessingLogout] = React.useState(false)
    const handleLogout = () => {
        setProcessingLogout(true)
        axios({
            method: 'POST',
            url: url + '/logout/blacklist',
            data: {
                token: JSON.parse(localStorage.getItem('token')).token
            }

        })
            .then(response => {
                if (response.status === 200) {
                    setLogout(true)
                    setProcessingLogout(false)
                }
            })
            .catch(error => {
                console.log(error)
                setProcessingLogout(false)
                alert(error)
            })
    }
    if (logout) {
        return <Redirect to='/' exact />
    }

    return (
        <MenuItem color="inherit" onClick={handleLogout}>{processingLogout?<CircularProgress size='1rem' color='inherit'/>:
        <>Logout<ExitToApp /></>
        }</MenuItem>
    )
}