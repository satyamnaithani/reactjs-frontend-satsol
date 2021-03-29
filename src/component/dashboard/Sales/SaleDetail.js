import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import OpenIcon from '@material-ui/icons/Launch';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { url } from '../../../globalVariables';
import GetAppIcon from "@material-ui/icons/GetApp";
import { saveAs } from "file-saver";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TransactionTable from '../Expenses/TransactionTable';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaleDetail({data, pendingAmount}) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [mode, setMode] = useState();
    const [details, setDetails] = useState();
    const [pdfLoading, setPdfLoading] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDownloadPdf = (pdfData) => {
        setPdfLoading(true);
        const { orderData, challanNo, date, customer, invoiceNo, challanDate, modeOfPayment, orderNumber, dispatchThrough, destination, termsOfDelivery, interState, grandTotalInWords } = pdfData;
        const arr = orderData;
        let arrSize = arr.length;
        if (arr.length < 10) {
          for (var i = 0; i < 10 - arrSize; i++) {
            arr.push("");
          }
        }
        var dateFormat = date.split("T")[0].split("-");
        var dateString =
          dateFormat[2] + "-" + dateFormat[1] + "-" + dateFormat[0];
        if (challanDate !== null) {
          var challanDateFormat = challanDate.split("T")[0].split("-");
          var challanDateString = challanDateFormat[2] + "-" + challanDateFormat[1] +"-" + challanDateFormat[0];
        }
        const invoiceArr = [`${invoiceNo}`, `${challanDateString}`, `${modeOfPayment}`, `${orderNumber}`, `${dispatchThrough}`, `${destination}`, `${termsOfDelivery}`, `${interState}`, `${grandTotalInWords}`, `${dateString}`, `${challanNo}`];
        arr[10] = customer;
        let k = 0;
        for(let i = 11; i < 22; i++) {
            k++;
            arr[i] = invoiceArr[k];
        }
        console.log(arr);
        axios
        .post(url + "/pdf/create-pdf", arr)
        .then(() => axios.get(url + "/pdf/fetch-pdf", { responseType: "blob" }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, invoiceNo + ".pdf");
            setPdfLoading(false);
        })
        .catch((err) => {
            setPdfLoading(false);
            console.log(err);
            alert(err);
        });
    };
    const handleTransactionForm = (e) => {
        e.preventDefault();
        if(amount > pendingAmount) {
            alert('Please enter transaction amount less than or equal to pending amount');
            return;
        }
        let arr = data.transaction;
        const newTransaction = {
            amount: amount,
            date: date,
            mode: mode,
            details: details
        };
        arr.push(newTransaction);
        axios({
            method: 'PUT',
            url: url + '/sales/transaction/' + data._id,
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
            data: { transaction: arr }
          })
          .then(response => {
            if(response.data.message === 'success') {
              alert('Transaction updated!');
            }
            handleClose();
          })
          .catch(error => {console.log(error)
          alert(error)})
        console.log(arr);
    }
    return (
        <div>
            <IconButton size='small'><OpenIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} >
                <DialogTitle>{"Invoice Details - " + data.invoiceNo}<span style={{cursor: 'pointer', float: 'right'}}>{pdfLoading ? 'loading...' : <GetAppIcon onClick={() => handleDownloadPdf(data)} />}</span></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Customer Name: {data.customerName} <br/>
                        Date: {new Date(data.date).toLocaleDateString()} <br/>
                        Destination: {data.destination}<br/>
                        Dispatch Through: {data.dispatchThrough} <br/>
                        Grand Total: {data.grandTotal} <br/>
                        In Words: {data.grandTotalInWords} <br/>
                        Mode Of Payment: {data.modeOfPayment}<br/>
                        {/* Order Data: {data.orderData.map((item, index) => (<span key={index}>{++index}. {' '}{item.item}</span>))} <br/> */}
                        Total Gst: {data.totalGst}<br/>
                        Total Rate: {data.totalRate} <br/>
                    </DialogContentText>
                    <DialogContentText><TransactionTable data={data.transaction}/></DialogContentText>
                    { pendingAmount === 0 ? '' : 
                        <DialogContentText>
                            <form onSubmit={handleTransactionForm}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}><TextField placeholder={pendingAmount} required value={amount} label="Payment Amount" onChange={(e) => {setAmount(e.target.value)}} fullWidth variant="outlined" /></Grid>
                                    <Grid item xs={12}><TextField required label="Payment Date" value={date} variant="outlined" onChange={(e) => setDate(e.target.value)} fullWidth InputLabelProps={{shrink: true}} type="date"/></Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <InputLabel id="mode">Payment Mode</InputLabel>{' '}
                                        <Select required value={mode} onChange={(e) => setMode(e.target.value)} fullWidth variant="outlined" id="mode" label="Payment Mode">
                                            <MenuItem value={'Online'}>Online</MenuItem>
                                            <MenuItem value={'Cheque'}>Cheque</MenuItem>
                                            <MenuItem value={'Cash'}>Cash</MenuItem>
                                            <MenuItem value={'Others'}>Others</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required value={details} onChange={(e) => setDetails(e.target.value)} label="Payment Details" fullWidth rows={4} variant="outlined"/>
                                    </Grid>
                                </Grid>
                                <div style={{display: 'flex', justifyContent: 'space-around', padding: '5px'}}>
                                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                                    <Button type="submit" color="primary">Submit</Button>
                                </div>
                            </form>
                        </DialogContentText>
                    }
                </DialogContent>
            </Dialog>
        </div>
    );
}