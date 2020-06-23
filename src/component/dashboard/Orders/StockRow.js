import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
class StockRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            checkedItem: [],
            quantity: '',
            checkboxDisabled: true
        }     
    }
    render() {
        const {item, vendor, rate, gst, purchaseRate, exp, uom, quantity, initialQuantity, _id} = this.props.data.data;
        this.props.data.data['checkout'] = parseInt(this.state.quantity)
        return (
            <TableRow>
                <TableCell><Checkbox value={JSON.stringify(this.props.data.data)} disabled={this.state.checkboxDisabled} onChange={this.props.handleCheckChange} />
                </TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{vendor}</TableCell>
                <TableCell>{rate}</TableCell>
                <TableCell>{gst}</TableCell>
                <TableCell>{purchaseRate}</TableCell>
                <TableCell>{exp}</TableCell>
                <TableCell>{uom}</TableCell>
                <TableCell>{quantity}{'/'}{initialQuantity}</TableCell>
                <TableCell>
                    <TextField
                        id={_id}
                        type='number'
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="start">{uom}</InputAdornment>,
                        }}
                        label="Quantity"
                        variant="outlined"
                        value={this.state.quantity}
                        onChange={this.handleQuantityChange}
                    />
                </TableCell>
            </TableRow>
        );
    }
    handleQuantityChange = (event) => {
        this.setState({quantity: event.target.value}, () => { 
            if(!(this.state.quantity === 0 || this.state.quantity === '')){
                this.setState({checkboxDisabled: false})
            } else {
                this.setState({checkboxDisabled: true})
            }
        })
       
        
    }
    
}

export default StockRow;