import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import { url } from '../../../globalVariables';
import  CircularProgress  from '@material-ui/core/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = useState(false);
    const [expense, setExpense] = useState('')
    const [loading, setLoading] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setLoading(true);
        axios({
            method: 'PATCH',
      
            url: url + '/sales/'+ props.id,
            data: {
                expense: parseFloat(expense)
            },
            headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
          })
            .then(response => {
                setLoading(false);
                setOpen(false)
                console.log(response)
                props.updateExpenses(props.id, parseFloat(expense))
            })
            .catch(error => {
                setLoading(false)
                alert(error)
                console.log(error)})
        
    };

    return (
        <div>
            <IconButton size='small'><AddIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add Expense"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Invoice No: {' '}{props.invoiceNo}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                        Total Sale:  {'₹' + props.totalSale}
                    </DialogContentText>
                    <TextField
                        id={props.id}
                        type='number'
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        style={{ width: '240px' }}
                        label="Expense"
                        variant="outlined"
                        value={expense}
                        onChange={(e) => { setExpense(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>{loading?<CircularProgress size='2.5rem' color='inherit'/>:
                    <Button onClick={handleSubmit} color="primary">
                        Confirm
          </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
