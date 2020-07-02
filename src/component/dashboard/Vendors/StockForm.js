import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from 'axios'
import {url} from '../../../globalVariables'



export default function AddressForm() {
    const [vendor, setVendor] = useState("");
    const [item, setItem] = useState("");
    const [purchaseRate, setPurchaseRate] = useState("");
    const [billDate, setBillDate] = useState("");
    const [rate, setRate] = useState("");
    const [gst, setGst] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    const [exp, setExp] = useState("");
    const [quantity, setQuantity] = useState("");
    const [lotNo, setLotNo] = useState("");
    const [billNo, setBillNo] = useState("");
    const [itemNames, setItemNames] = useState([]);
    const [vendorNames, setVendorNames] = useState([]);
    const [uom, setUom] = useState("");
    const [hsn, setHsn] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [totalCost, setTotalCost] = useState("")
    const [isLoadingItem, setIsLoadingItem] = useState(true)
    const [isLoadingVendor, setIsLoadingVendor] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: 'get',
                url: url+'/items/all_item',
                config: { headers: { 'Content-Type': 'application/json' } },
            })
                .then(result => {
                    setIsLoadingItem(false)
                    setItemNames(result.data.items)
                })
                .catch(err => console.log(err))
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: 'get',
                url: url + '/vendors/all_vendor',
                config: { headers: { 'Content-Type': 'application/json' } },
            })
                .then(result => {
                    setIsLoadingVendor(false)
                    setVendorNames(result.data.items)
                })
                .catch(err => console.log(err))
        };
        fetchData();
    }, []);

    const handleItem = e => {
        setItem(e.target.value)
        itemFetchDetails(e.target.value);

    }

    const itemFetchDetails = (x) => {
        const url1 = url + "/items/" + x

        axios({
            method: 'get',
            url: url1,
            config: { headers: { 'Content-Type': 'application/json' } },
        })
            .then(function (response) {
                setGst(response.data.item[0].gst)
                setUom(response.data.item[0].uom)
                setHsn(response.data.item[0].hsn)
                setItemCode(response.data.item[0].itemCode)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setItem("");
        setVendor("");
        setLotNo("")
        setBillDate("");
        setBillNo("")
        setGst("")
        setExp("")
        setPurchaseRate("")
        setQuantity("");
        setReceiveDate("");
        setUom("");
        setRate("");
        setTotalCost("")
        axios({
            method: 'post',
            url: url + '/stock',
            config: { headers: { 'Content-Type': 'application/json' } },
            data: {
                item: item,
                lotNo: lotNo,
                billNo: billNo,
                exp: exp,
                vendor: vendor,
                quantity: quantity,
                rate: rate,
                gst: gst,
                purchaseRate: purchaseRate,
                receiveDate: receiveDate,
                billDate: billDate,
                uom: uom,
                hsn: hsn,
                itemCode: itemCode
            }
        })
            .then(function (response) {
                console.log(response);
                alert('Item Added to Stock')
            })
            .catch(function (error) {
                console.log(error);
                alert('Error adding item to Stock')
            });

    }

    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Typography variant="h6" gutterBottom className={classes.heading}>
                Stock Entry
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="item">Item</InputLabel>
                            <Select
                                labelId="item"
                                name="Item"
                                label="Item"
                                id="item"
                                value={item}
                                onChange={handleItem}
                            > {
                                    isLoadingItem ? <MenuItem>Loading...</MenuItem>
                                        :
                                        itemNames.map((itemName, index) => <MenuItem key={index} value={itemName.name.name}>{itemName.name.name}</MenuItem>)
                                }

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="lot_no"
                            name="lot_no"
                            label="Lot no."
                            fullWidth
                            autoComplete="lot_no"
                            value={lotNo}
                            onChange={e => setLotNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="bill_no"
                            name="bill_no"
                            label="Bill no."
                            fullWidth
                            autoComplete="bill_no"
                            value={billNo}
                            onChange={e => setBillNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="exp"
                            name="Exp"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Exp"
                            fullWidth
                            autoComplete="exp"
                            value={exp}
                            onChange={e => setExp(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            required
                            id="rate"
                            name="rate"
                            label="Rate"
                            fullWidth
                            autoComplete="rate"
                            value={rate}
                            onChange={e => {
                                setRate(e.target.value)
                                setPurchaseRate(parseInt(e.target.value) + ((parseInt(e.target.value) * parseInt(gst)) / 100))
                                if (!isNaN(parseInt(quantity) * parseInt(purchaseRate)))
                                    setTotalCost(parseInt(quantity) * parseInt(purchaseRate))
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="GST%"
                            name="GST%"
                            label="GST%"
                            fullWidth
                            autoComplete="GST"
                            value={gst}
                            onChange={e => {
                                setGst(e.target.value)
                                setPurchaseRate(parseInt(rate) * (1 + parseInt(e.target.value) / 100))
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="purchaseRate"
                            name="Purchase Rate"
                            label="Purchase Rate"
                            fullWidth
                            autoComplete="purchaseRate"
                            value={purchaseRate}
                            onChange={e => {
                                setPurchaseRate(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="vendor">Vendor</InputLabel>
                            <Select
                                labelId="vendor"
                                name="Vendor"
                                label="vendor"
                                id="vendor"
                                value={vendor}
                                onChange={e => setVendor(e.target.value)}
                            >
                                {
                                    isLoadingVendor ? <MenuItem>Loading...</MenuItem> :
                                        vendorNames.map((VendorName, index) => <MenuItem key={index} value={VendorName.name.name}>{VendorName.name.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="quantity"
                            name="quantity"
                            type="number"
                            label="quantity"
                            fullWidth
                            autoComplete="quantity"
                            value={quantity}
                            onChange={e => {
                                setQuantity(e.target.value)
                                if (!isNaN(parseInt(e.target.value) * parseInt(purchaseRate)))
                                    setTotalCost(parseInt(e.target.value) * parseInt(purchaseRate))
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="uom"
                            name="uom"
                            label="Uom"
                            fullWidth
                            disabled
                            autoComplete="uom"
                            value={uom}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            disabled
                            id="totalCost"
                            name="Total Cost"
                            label="Total Cost"
                            fullWidth
                            autoComplete="totalCost"
                            value={totalCost}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            id="receive_date"
                            label="Receive Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={receiveDate}
                            onChange={e => setReceiveDate(e.target.value)}
                        />

                    </Grid>



                    <Grid item xs={4}>
                        <TextField
                            id="billDate"
                            name="billDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Bill Date"
                            fullWidth
                            autoComplete="billDate"
                            value={billDate}
                            onChange={e => setBillDate(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    ADD
          </Button>
            </form>
        </div>
    );
}




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        borderRadius: '10%',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    heading: {
        marginTop: theme.spacing(6),
    }
}));