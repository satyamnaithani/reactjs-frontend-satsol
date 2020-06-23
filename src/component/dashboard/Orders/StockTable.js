import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
//import TableSkeleton from '../../common/TableSkeleton';
import { url } from '../../../globalVariables'
//import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
//Dialog
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DialogContentText from '@material-ui/core/DialogContentText';
import StockRow from './StockRow'
import CircularProgress from '@material-ui/core/CircularProgress';
import { saveAs } from 'file-saver';

import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import Snackbar from '@material-ui/core/Snackbar';

export default class Orders extends React.Component {
    componentDidMount() {
        axios({
            method: 'GET',

            url: url + '/stock'
        })
            .then(response => {
                this.setState({ data: response.data.items, isLoading: false, open: false })
                const data = response.data.items
                const leftArr = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        leftArr.push(data[key])
                    }
                }
            })
            .catch(error => console.log(error))
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            checkedItem: [],
            dialogOpen: false,
            customer: '',
            customerName: '',
            isLoadingCustomer: true,
            isTransactingOrder: false,
            isPdfLoading: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }


    handleCheckChange = (event) => {
        const data = JSON.parse(event.target.value)
        if (event.target.checked) {

            let arr = this.state.checkedItem
            arr.push(data)
            this.setState({ checkedItem: arr })
        } else {
            let arr = this.state.checkedItem
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                if (obj._id === data._id) {
                    arr.splice(i, 1)
                    this.setState({ checkedItem: arr })
                }
            }
        }
        console.log(this.state.checkedItem)
    }
    render() {
        console.log(this.state.customerName)

        return (
            <React.Fragment>
                <Typography align='center' component="h2" variant="h6" color="primary" gutterBottom>
                    Available Stock
                    <div style={{ float: "right", marginRight: '20px', marginTop: '8px' }}>
                        {
                            this.state.checkedItem.length === 0 ?
                                <IconButton disabled aria-label="download">
                                    <Tooltip title="Generate and Download Invoice" aria-label="Download Invoice">
                                        <GetAppIcon fontSize='large' />
                                    </Tooltip>
                                </IconButton>
                                :
                                <IconButton color='primary' aria-label="download">
                                    <Tooltip title="Generate and Download Invoice" aria-label="Download Invoice">
                                        <GetAppIcon fontSize='large' onClick={this.createAndDownloadPdf} />
                                    </Tooltip>
                                    {/* Dialog Start */}
                                    <Dialog
                                        open={this.state.dialogOpen}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    ><div>

                                            <DialogTitle id="alert-dialog-title">Invoice Item</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <Typography variant="body1" color="textPrimary" component="p">Items</Typography>
                                                </DialogContentText>
                                                <Grid container>

                                                    <Grid xs='auto' item>
                                                        <FormControl>
                                                            <InputLabel id="customer">Customer</InputLabel>
                                                            <Select
                                                                labelId="customer"
                                                                name="customer"
                                                                label="Customer"
                                                                id="customer"
                                                                value={this.state.customerName}
                                                                placeholder='Customer'
                                                                style={{ minWidth: 120 }}
                                                                onChange={e => this.setState({ customerName: e.target.value })}
                                                            >
                                                                {
                                                                    this.state.isLoadingCustomer ? <MenuItem>Loading...</MenuItem> :
                                                                        this.state.customer.map((CustomerName, index) => <MenuItem key={index} value={CustomerName.data}>{CustomerName.data.name}</MenuItem>)
                                                                }

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid xs='auto' item>
                                                        {
                                                            this.state.checkedItem.map((item, index) => (<Typography key={index} variant="body1" color="textSecondary" component="p">{item.item}   {item.checkout}</Typography>))
                                                        }

                                                    </Grid>
                                                </Grid>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleClose} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.handleFormSubmit} color="primary" autoFocus>
                                                    {this.state.isTransactingOrder ? <CircularProgress color="inherit" />
                                                        :
                                                        <p>Confirm</p>
                                                    }
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                    {/* Dialog Closed */}
                                </IconButton>
                        }
                    </div>

                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>GST%</TableCell>
                            <TableCell>Product Amount</TableCell>
                            <TableCell>Lot Exp.</TableCell>
                            <TableCell>UOM</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Checkout</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.isLoading ?
                                // <TableSkeleton />
                                <TableRow><TableCell>Loading...</TableCell></TableRow>
                                :
                                this.state.data.map((row, index) => (<StockRow handleCheckChange={this.handleCheckChange} key={index} data={row} />))
                        }
                    </TableBody>
                </Table>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.isPdfLoading}
                    //autoHideDuration={6000}
                    //onClose={handleClose}
                    message="Pdf Processing..." />
            </React.Fragment>
        );

    }

    createAndDownloadPdf = () => {
        this.setState({ dialogOpen: true })
        this.fetchCustomerNames()
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    };

    handleClose = () => {
        this.setState({ dialogOpen: false })
        this.setState({ isTransactingOrder: false })
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    async handleFormSubmit() {
        this.setState({ isTransactingOrder: true })
        await axios({
            method: 'post',
            url: url + '/sales',
            config: { headers: { 'Content-Type': 'application/json' } },
            data: {
                customer: this.state.customerName,
                orderData: this.state.checkedItem,
            }
        })
            .then(response => {
                console.log(response)
                if (response.data.message === 'Created Product Successfully!') {

                    this.setState({ isTransactingOrder: false })

                    this.setState({ isPdfLoading: true })
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);

                    const arr = response.data.createdProduct.orderData
                    const customer = response.data.createdProduct.customer
                    let arrSize = arr.length

                    if (arr.length < 10) {
                        for (var i = 0; i < 10 - arrSize; i++) {
                            arr.push('')
                        }
                    }
                    arr[10] = customer.name
                    arr[11] = customer.address
                    arr[12]= customer.city
                    arr[13] = customer.zip
                    arr[14] = customer.state
                    arr[15] = customer.gst
                    console.log(arr)

                    axios.post(url + '/pdf/create-pdf', arr)
                        .then(() => axios.get(url + '/pdf/fetch-pdf', { responseType: 'blob' }))
                        .then((res) => {
                            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                            saveAs(pdfBlob, 'satyam.pdf');
                            this.setState({ isPdfLoading: false })
                            this.setState({ dialogOpen: false })
                        })
                        .catch(err => console.log(err))

                }
                else {
                    alert('Error!')
                }
            })
            .catch(function (error) {
                console.log(error);
                //this.setState({ isTransactingOrder: false })
                alert('Error')
            });
    }
    fetchCustomerNames = () => {
        axios(url + "/customers/all")
            .then(result => { this.setState({ customer: result.data.items, isLoadingCustomer: false }) })
            .catch(err => console.log(err))
    }

}
