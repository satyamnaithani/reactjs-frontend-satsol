import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Fab from '@material-ui/core/Fab';
//Dialog dependencies
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {url} from '../../../globalVariables';
//Customer Form dependencies
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';



export default function StockItemCard(props) {

  const classes = useStyles();

  const [addItem, setAddItem] = useState("0")
  const [open, setOpen] = useState(false);
  const [customerNames, setCustomerNames] = useState("")
  const [customer, setCustomer] = useState("")
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true)
  const [invoiceDate, setInvoiceDate] = useState("")
  const [rate, setRate] = useState("")
  const [successOrderMessage, setSuccessOrderMessage] = useState("")

  const [quantity, setQuantity] = useState(props.itemData.data.quantity)

  function handleAddButtonChange() {
    let count = parseInt(addItem)
    if (quantity > 0) {
      count++;
      setAddItem(count)
      setQuantity(quantity - 1)
    }
  }
  function handleMinusButtonChange() {
    let count = parseInt(addItem)
    if (addItem > 0) {
      count--;
      setAddItem(count)
      setQuantity(quantity + 1)
    }
  }

  function handleDialogClick() {
    setOpen(true);
    fetchCustomerNames()
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  }

  function handleClose() {
    setOpen(false)
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function fetchCustomerNames() {
    axios(url + "/customers/all")
      .then(result => { setCustomerNames(result.data.items); console.log(result.data.items); setIsLoadingCustomer(false) })
      .catch(err => console.log(err))
  }
  async function handleFormSubmit() {
    await axios({
      method: 'post',
      url: url + '/orders',
      config: { headers: { 'Content-Type': 'application/json' } },
      data: {
        customer: customer,
        stockId: props.itemData.data._id,
        item: props.itemData.data.item,
        lotNo: props.itemData.data.lotNo,
        exp: props.itemData.data.exp,
        quantity: addItem,
        rate: rate,
        gst: props.itemData.data.gst,
        billDate: invoiceDate,
        uom: props.itemData.data.uom
      }
    })
      .then(response => {
        console.log(response)
        alert('Item Added for Invoice')
        setAddItem("0")
        setSuccessOrderMessage(response.data.message)
        setOpen(false)
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  return (
    <Grid item container xs={3}>
      <Card className={classes.root} key={props.index}>
        <CardHeader
          avatar={
            <Avatar aria-label="item" className={classes.avatar}>
              {props.itemData.data.item.toUpperCase().slice(0, 3)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.itemData.data.item}
          subheader={props.itemData.data.vendor}
        />


        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Purchase Rate: ₹</strong>{props.itemData.data.purchaseRate}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Quantity: </strong>{quantity}{' '}{props.itemData.data.uom}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Expiry: </strong>{props.itemData.data.exp}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>GST: </strong>{props.itemData.data.gst}{'%'}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Lot Number: </strong>{props.itemData.data.lotNo}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Bill Date: </strong>{props.itemData.data.billDate}</Typography>
          <Typography variant="body1" color="textSecondary" component="p"><strong>Check Out: </strong>{addItem}{' '}{props.itemData.data.uom}</Typography>
        </CardContent>
        <CardActions disableSpacing>

          <IconButton aria-label="add" className={classes.plus}>
            <Fab size='small' color="primary" className={classes.fab}>
              <AddIcon onClick={handleAddButtonChange} />
            </Fab>
          </IconButton>

          <IconButton aria-label="minus" className={classes.plus} >
            <Fab size='small' color="primary" className={classes.fab}>
              <RemoveIcon onClick={handleMinusButtonChange} />
            </Fab>
          </IconButton>
          <IconButton aria-label="check-out" className={classes.checkOut} >
            <LibraryAddIcon onClick={handleDialogClick} />


            {/* //Dialog Box Start */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            ><div  className={classes.dialog}>
              <DialogTitle id="alert-dialog-title">Confirm Product Details{successOrderMessage}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="body1" color="textPrimary" component="p"> Product Name: {' '} {props.itemData.data.item}</Typography>
                </DialogContentText>
                <Grid container className={classes.grid}>
                  <Grid xs='12' item>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="customer">Customer</InputLabel>
                      <Select
                        labelId="customer"
                        name="customer"
                        label="Customer"
                        id="customer"
                        value={customer}
                        onChange={e => setCustomer(e.target.value)}
                      >
                        {
                          isLoadingCustomer ? <MenuItem>Loading...</MenuItem> :
                            customerNames.map((CustomerName, index) => <MenuItem key={index} value={CustomerName.data.name}>{CustomerName.data.name}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs='12'>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>Purchase Rate: ₹</strong>{props.itemData.data.purchaseRate}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>Quantity: </strong>{quantity}{' '}{props.itemData.data.uom}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>Expiry: </strong>{props.itemData.data.exp}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>GST: </strong>{props.itemData.data.gst}{'%'}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>Lot Number: </strong>{props.itemData.data.lotNo}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p"><strong>Check Out: </strong>{addItem}{' '}{props.itemData.data.uom}</Typography>
                  </Grid>
                  <Grid xs='12'>
                    <TextField
                      id="invoice_date"
                      label="Invoice Date"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={invoiceDate}
                      onChange={e => setInvoiceDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs='3'><TextField
                    id="rate"
                    name="rate"
                    label="Selling Price"
                    fullWidth
                    autoComplete="rate"
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                  /></Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
          </Button>
                <Button onClick={handleFormSubmit} color="primary" autoFocus>
                  Confirm
          </Button>
              </DialogActions>
              </div>
            </Dialog>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>

  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 345,
    background: '#fff',
    borderRadius: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  plus: {
    transform: 'rotate(0deg)',
    margin: '2',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  checkOut: {
    transform: 'rotate(0deg)',
    margin: theme.spacing(0, 0, 0, 12),
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#6A5ACD',
   
  },
  grid: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 120
  },
  dialog: {
    backgroundColor: '#21D4FD',
    backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);',
    color: 'white'
  }
}));
