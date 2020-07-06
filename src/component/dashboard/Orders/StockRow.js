import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
//import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
//import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class StockRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            checkedItem: [],
            checkout: '',
            checkboxDisabled: true,
            dialogOpen: false,
            sellingRate: '',
            inputErrorQuantity: false,
            inputErrorPrice: false,
            rowSelected: false,
            quantity: this.props.data.data.quantity,
            costPrice: this.props.data.data.rate,
            expDate: []
        }

    }


    render() {
        let { item, vendor, rate, gst, purchaseRate, exp, uom, initialQuantity, _id } = this.props.data.data;
        this.props.data.data['checkout'] = parseInt(this.state.checkout)
        this.props.data.data['sellingRate'] = parseFloat(this.state.sellingRate)
        if (exp !== null) {
            var date = exp.split('T')[0].split('-')
            exp = date[2] + '-' + date[1] + '-' + date[0].split('20')[1]
        }
        return (
            <TableRow selected={this.state.rowSelected}>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"CheckOut Details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Hello World!
          </DialogContentText>
                        <TextField
                            id={_id}
                            type='number'
                            style={{ width: '240px' }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="start">{this.state.quantity + uom}</InputAdornment>,
                            }}
                            label="Quantity"
                            variant="outlined"
                            value={this.state.checkout}
                            onChange={this.handleQuantityChange}
                            required
                            error={this.state.inputErrorQuantity}
                        /><br /><br />
                        <TextField
                            id={_id}
                            type='number'
                            style={{ width: '240px' }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="start">{'₹' + rate.toString()}</InputAdornment>,
                            }}
                            label="Selling Price"
                            variant="outlined"
                            value={this.state.sellingRate}
                            onChange={this.handleRateChange}
                            error={this.state.inputErrorPrice}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
          </Button>
                        <Button onClick={this.handleDialog} color="primary" autoFocus>
                            Done
          </Button>
                    </DialogActions>
                </Dialog>
                <TableCell>
                    {this.state.rowSelected ? <Button onClick={() => {
                        this.setState({
                            rowSelected: false,
                            quantity: this.state.quantity + parseInt(this.state.checkout),
                            checkout: '',
                            sellingRate: '',
                            inputErrorQuantity: false,
                            inputErrorPrice: false
                        })
                        this.props.handleUnCheckChange(this.props.data.data)
                    }}>-</Button> :
                        <Button onClick={() => { this.setState({ dialogOpen: true }) }}>+</Button>}
                </TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{vendor}</TableCell>
                <TableCell>{rate}</TableCell>
                <TableCell>{gst}</TableCell>
                <TableCell>{purchaseRate}</TableCell>
                <TableCell>{exp}</TableCell>
                <TableCell>{uom}</TableCell>
                <TableCell>{this.state.quantity}{'/'}{initialQuantity}{' '}<br />{this.state.checkout}</TableCell>
            </TableRow>
        );
    }
    handleDialogClose = () => {
        this.setState({ dialogOpen: false })
    }
    handleQuantityChange = (event) => {
        this.setState({ checkout: event.target.value })
        if (this.state.quantity < parseInt(event.target.value) || event.target.value === '0') {
            this.setState({ inputErrorQuantity: true })

        } else {
            this.setState({ inputErrorQuantity: false })
        }
    }
    handleRateChange = (event) => {
        this.setState({ sellingRate: event.target.value })
        if (event.target.value < this.state.costPrice) {
            this.setState({ inputErrorPrice: true })
        } else {
            this.setState({ inputErrorPrice: false })
        }
    }
    handleDialog = () => {
        if (this.state.inputErrorQuantity) {
            alert('Quantity Not Available')
        } else {
            this.setState({
                dialogOpen: false,
                rowSelected: true,
                quantity: this.state.quantity - this.state.checkout
            })
            this.props.handleCheckChange(this.props.data.data)
        }

    }

}

export default StockRow;