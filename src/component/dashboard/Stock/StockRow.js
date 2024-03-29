import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
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
        const { item, vendor, lotNo, rate, gst, purchaseRate, uom, initialQuantity, _id } = this.props.data.data;
        let {exp} = this.props.data.data;
        this.props.data.data['checkout'] = parseInt(this.state.checkout)
        this.props.data.data['sellingRate'] = parseFloat(this.state.sellingRate)
        if (exp !== null) {
            var date = exp.split('T')[0].split('-')
            exp = date[2] + '-' + date[1] + '-' + date[0].split('20')[1]
        }
        return (
            <TableRow selected={this.state.rowSelected}>
                <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"CheckOut Details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{item}</DialogContentText>
                        <form onSubmit={this.handleDialog}>
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
                        <DialogActions>
                         <Button onClick={this.handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" autoFocus>
                            Done
                        </Button>
                    </DialogActions>
                       
                        </form>
                    </DialogContent> 
                </Dialog>
                <TableCell>
                    {this.state.rowSelected ? <IconButton onClick={() => {
                        this.setState({
                            rowSelected: false,
                            quantity: this.state.quantity + parseInt(this.state.checkout),
                            checkout: '',
                            sellingRate: '',
                            inputErrorQuantity: false,
                            inputErrorPrice: false
                        })
                        this.props.handleUnCheckChange(this.props.data.data)
                    }}><RemoveCircleIcon/></IconButton> :
                        <IconButton onClick={() => { this.setState({ dialogOpen: true }) }}><AddCircleIcon/></IconButton>}
                </TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{vendor}</TableCell>
                <TableCell>{rate}</TableCell>
                <TableCell>{gst}</TableCell>
                <TableCell>{purchaseRate == null ? '' : purchaseRate.toFixed(2)}</TableCell>
                <TableCell>{lotNo}</TableCell>
                <TableCell>{this.state.quantity}{'/'}{initialQuantity}{' '}<br />{this.state.checkout}{''}</TableCell>
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
    handleDialog = (e) => {
        e.preventDefault()
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