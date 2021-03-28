import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import OpenIcon from '@material-ui/icons/Launch';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { url } from '../../../globalVariables';
import  CircularProgress  from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaleDetail({data}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setLoading(true);
        alert("hello");
        setLoading(false);
    };
    console.log(data);
    return (
        <div>
            <IconButton size='small'><OpenIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} >
                <DialogTitle>{"Invoice Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Customer Name: {data.customerName} <br/>
                        Date: {data.date} <br/>
                        Destination: {data.destination}<br/>
                        Dispatch Through: {data.dispatchThrough} <br/>
                        Grand Total: {data.grandTotal} <br/>
                        In Words: {data.grandTotalInWords} <br/>
                        Invoice Number: {data.invoiceNo} <br/>
                        Mode Of Payment: {data.modeOfPayment}<br/>
                        Order Data: {data.orderData.map((data, index) => (<span key={index}>{++index}. {' '}{data.item}</span>))} <br/>
                        Total Gst: {data.totalGst}<br/>
                        Total Rate: {data.totalRate} <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
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
