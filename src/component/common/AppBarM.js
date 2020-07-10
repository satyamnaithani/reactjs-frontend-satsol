import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { url } from '../../globalVariables';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
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
                //console.log(response.status) 
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
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Satvik Solutions
          </Typography>
                    <Button color="inherit" onClick={handleLogout}>{processingLogout?<CircularProgress size='1rem' color='inherit'/>:'Logout'}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
