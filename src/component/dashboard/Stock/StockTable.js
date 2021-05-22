import React from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { url } from "../../../globalVariables";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//Dialog
import CheckedItemTable from "./CheckedItemTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DialogContentText from "@material-ui/core/DialogContentText";
import StockRow from "./StockRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { saveAs } from "file-saver";

import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TableSkeleton from "../../common/TableSkeleton";
import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";

export default class Orders extends React.Component {
  componentDidMount() {
    axios({
      method: "GET",
      url: url + "/stock",
      headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).token} })
      .then((response) => {
        this.setState({ data: response.data.items, isLoading: false, open: false });
        const data = response.data.items;
        const leftArr = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            leftArr.push(data[key]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      checkedItem: [],
      dialogOpen: false,
      customer: "",
      customerName: "",
      isLoadingCustomer: true,
      isTransactingOrder: false,
      isPdfLoading: false,
      date: "",
      challanNo: "",
      challanDate: "",
      orderNo: "",
      orderDate: "",
      ewbNo: "",
      ewbDate: "",
      dispatchDocNo: "",
      dispatchDocDate: "",
      dispatchThrough: "Surface Transport",
      destination: "",
      termsOfDelivery: "Door",
      interState: false,
      productAddedDialog: false,
      createdProduct: {},
      updatedData: [],
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleUnCheckChange = (value) => {
    let arr = this.state.checkedItem;
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      if (obj._id === value._id) {
        arr.splice(i, 1);
        this.setState({ checkedItem: arr });
      }
    }
  };
  handleCheckChange = (value) => {
    const data = value;
    let arr = this.state.checkedItem;
    arr.push(data);
    this.setState({ checkedItem: arr });
  };
  render() {
    const checkoutTableHeading = [
      { name: 'Item Code', align: 'center' }, 
      { name: 'Product Name', align: 'center' },
      { name: 'Checkout Quantity', align: 'center' },
      { name: 'Exp', align: 'center' },
      { name: 'Amount', align: 'center' },
      { name: 'Gst%', align: 'center' },
      { name: 'Lot No.', align: 'center' },
      { name: 'HSN', align: 'center' },
      { name: 'Total Amount', align: 'right' }
    ];
    return (
      <React.Fragment>
        <Typography component="h2" variant="h4" color="primary" align="center" gutterBottom>Available Stock</Typography>
        <Dialog open={this.state.dialogOpen} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth="lg">
          <div>
            <DialogTitle>Invoice Item</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid xs="6" item>
                  <FormControl>
                    <InputLabel id="customer">Customer</InputLabel>
                    <Select
                      labelId="customer"
                      name="customer"
                      label="Customer"
                      id="customer"
                      value={this.state.customerName}
                      placeholder="Customer"
                      style={{ minWidth: 120 }}
                      onChange={(e) =>
                        this.setState({
                          customerName: e.target.value,
                          destination: e.target.value.city,
                        })
                      }
                    >
                      {this.state.isLoadingCustomer ? (
                        <MenuItem>Loading...</MenuItem>
                      ) : (
                        this.state.customer.map((CustomerName, index) => (
                          <MenuItem key={index} value={CustomerName.data}>
                            {CustomerName.data.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs="6">
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.date}
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="challan_no"
                    name="challan_no"
                    label="Challan no."
                    fullWidth
                    autoComplete="challan_no"
                    style={{ maxWidth: 240 }}
                    value={this.state.challanNo}
                    onChange={(e) =>
                      this.setState({ challanNo: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs="6">
                  <TextField
                    id="challan_date"
                    label="Challan Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ maxWidth: 240 }}
                    value={this.state.challanDate}
                    onChange={(e) =>
                      this.setState({ challanDate: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="order_no"
                    name="order_no"
                    label="Order no."
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="order_no"
                    value={this.state.orderNo}
                    onChange={(e) => this.setState({ orderNo: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="order_date"
                    name="order_date"
                    label="Order Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="order_no"
                    value={this.state.orderDate}
                    onChange={(e) => this.setState({ orderDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="ewb_no"
                    name="ewb_no"
                    label="Ewb No."
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="ewb_no"
                    value={this.state.ewbNo}
                    onChange={(e) => this.setState({ ewbNo: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="ewb_date"
                    name="ewb_date"
                    label="Ewb Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="ewb_date"
                    value={this.state.ewbDate}
                    onChange={(e) => this.setState({ ewbDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="dispatchDocNo"
                    name="dispatchDocNo"
                    label="Dispatch Doc No."
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="dispatchDocNo"
                    value={this.state.dispatchDocNo}
                    onChange={(e) => this.setState({ dispatchDocNo: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="dispatchDocDate"
                    name="dispatchDocDate"
                    label="Dispatch Doc Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="dispatchDocDate"
                    value={this.state.dispatchDocDate}
                    onChange={(e) => this.setState({ dispatchDocDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="destination"
                    name="destination"
                    label="Destination"
                    fullWidth
                    style={{ maxWidth: 240 }}
                    autoComplete="destination"
                    value={this.state.destination}
                    onChange={(e) =>
                      this.setState({ destination: e.target.value })
                    }
                  />
                </Grid>
                <Grid xs="6" item>
                  <FormControl>
                    <InputLabel id="dispatchThrough">
                      Dispatch Through
                    </InputLabel>
                    <Select
                      labelId="dispatch_through"
                      name="dispatch_through"
                      label="Dispatch Through"
                      id="dispatch_through"
                      value={this.state.dispatchThrough}
                      placeholder="Dispatch Through"
                      style={{ minWidth: 240 }}
                      onChange={(e) =>
                        this.setState({ dispatchThrough: e.target.value })
                      }
                    >
                      <MenuItem value="Surface Transport">Surface Transport</MenuItem>
                      <MenuItem value="By Hand">By Hand</MenuItem>
                      <MenuItem value="By Air">By Air</MenuItem>
                      <MenuItem value="By Water">By Ship</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs="6" item>
                  <FormControl>
                    <InputLabel id="Terms of Delivery">
                      Terms of Delivery
                    </InputLabel>
                    <Select
                      labelId="terms_of_delivery"
                      name="terms_of_delivery"
                      label="Terms of dlvry."
                      id="terms_of_delivery"
                      value={this.state.termsOfDelivery}
                      placeholder="Terms of dlvry."
                      style={{ minWidth: 240 }}
                      onChange={(e) =>
                        this.setState({ termsOfDelivery: e.target.value })
                      }
                    >
                      <MenuItem value="Door">Door</MenuItem>
                      <MenuItem value="Railway Station">
                        Railway Station
                      </MenuItem>
                      <MenuItem value="Courrier Center">
                        Courrier Center
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs="6" item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.interState}
                        onChange={(e) =>
                          this.setState({ interState: e.target.checked })
                        }
                        name="interState"
                        color="primary"
                      />
                    }
                    label="Inter State"
                  />
                </Grid>
                <Grid xs="12" item>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead style={{ backgroundColor: "black" }}>
                        <TableRow>{checkoutTableHeading.map((item, index) => (<TableCell style={{ color: "white" }} align={item.align}>{item.name}</TableCell>))}</TableRow>
                      </TableHead>
                      <TableBody>{this.state.checkedItem.map((item, index) => (<CheckedItemTable key={index} item={item} />))}</TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">Cancel</Button>
              <Button onClick={this.handleFormSubmit} color="primary" autoFocus>
                {this.state.isTransactingOrder ? <CircularProgress color="inherit" /> 
                : <p>Confirm</p>}
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Table size="small" style={{ minWidth: "80vw" }}>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Purchase Rate</TableCell>
              <TableCell>GST%</TableCell>
              <TableCell>Product Amount</TableCell>
              <TableCell>Lot No.</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.isLoading ? <TableSkeleton /> 
              : 
              this.state.data.map((row, index) => <StockRow handleCheckChange={this.handleCheckChange} handleUnCheckChange={this.handleUnCheckChange} key={index} data={row}/>)
            }
          </TableBody>
        </Table>
        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "left" }} open={this.state.isPdfLoading} message="Pdf Processing..."/>
        <Dialog open={this.state.productAddedDialog} onClose={ () => this.setState({ productAddedDialog: false }) }>
          <DialogTitle>{"Stock Released!"}</DialogTitle>
          <DialogContent><DialogContentText>Do you want to download Invoice?</DialogContentText></DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ productAddedDialog: false, data: this.state.updatedData }) } color="primary">No</Button>
            <Button onClick={this.handlePdfDownload} color="primary" autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
        <Tooltip title={ this.state.checkedItem.length === 0 ? "Select atleast one item to continue" : "Add Further details" }>
          <div>
            <Fab color="primary" aria-label="add" disabled={this.state.checkedItem.length === 0 ? true : false} onClick={this.createAndDownloadPdf} style={{ margin: 0, top: "auto", right: "40%", bottom: 20, left: "auto", position: "fixed" }}>
              <AddIcon />
            </Fab>
          </div>
        </Tooltip>
      </React.Fragment>
    );
  }
  createAndDownloadPdf = () => {
    this.setState({ dialogOpen: true });
    this.fetchCustomerNames();
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };

  handleClose = () => {
    this.setState({ dialogOpen: false, isTransactingOrder: false });
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  updateItemData = () => {
    let arr = this.state.data.splice(0);
    let updatedData = arr.filter((value, index) => {
      if (value.data.checkout === 0 || isNaN(value.data.checkout)) {
        arr[index].data.checkout = 0;
      } else if (value.data.checkout > 0) {
        arr[index].data.quantity =
          arr[index].data.quantity - arr[index].data.checkout;
        arr[index].data.checkout = 0;
      }
      return arr;
    });
    this.setState({ updatedData: updatedData });
  };

  async handleFormSubmit() {
    const { dispatchThrough, modeOfPayment, destination, termsOfDelivery, customerName, date, checkedItem, orderNo, orderDate, ewbNo, ewbDate, dispatchDocNo, dispatchDocDate, challanDate, challanNo, interState } = this.state;
    if (customerName === "" || destination === "" || date === "" || checkedItem === [] || dispatchThrough === "" || modeOfPayment === "" || termsOfDelivery === "") {
      alert("Please Enter the details first!");
    } else {
      this.setState({ isTransactingOrder: true });
      await axios({
        method: "post",
        url: url + "/sales",
        config: { headers: { "Content-Type": "application/json" }},
        headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).token },
        data: {
          customer: customerName,
          orderData: checkedItem,
          date: date,
          challanNo: challanNo,
          challanDate: challanDate,
          orderNumber: orderNo,
          orderDate: orderDate,
          ewbNo: ewbNo,
          ewbDate: ewbDate,
          dispatchDocNo: dispatchDocNo,
          dispatchDocDate: dispatchDocDate,
          dispatchThrough: dispatchThrough,
          destination: destination,
          termsOfDelivery: termsOfDelivery,
          interState: interState,
          addedBy: JSON.parse(localStorage.getItem("token")).name,
        },
      })
        .then((response) => {
          if (response.data.message === "Created Product Successfully!") {
            this.setState({
              isTransactingOrder: false,
              checkedItem: [],
              productAddedDialog: true,
              createdProduct: response.data.createdProduct,
              dialogOpen: false,
              date: "",
              challanNo: "",
              challanDate: "",
              modeOfPayment: "Against Delivery",
              orderNo: "",
              dispatchThrough: "Surface Transport",
              destination: "",
              termsOfDelivery: "Door",
              interState: false,
              customerName: "",
            });
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
            this.updateItemData();
          } else {
            alert("Error!");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("Error");
        });
    }
  }
  handlePdfDownload = () => {
    this.setState({ data: this.state.updatedData, isPdfLoading: true, productAddedDialog: false });
    axios
      .post(url + "/pdf/create-pdf", this.state.createdProduct)
      .then(() => axios.get(url + "/pdf/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, this.state.createdProduct.invoiceNo + ".pdf");
        this.setState({ isPdfLoading: false, productAddedDialog: false });
      })
      .catch((err) => console.log(err));
  };
  fetchCustomerNames = () => {
    axios({ method: "get", url: url + "/customers/all", headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).token } })
    .then((result) => this.setState({customer: result.data.items, isLoadingCustomer: false }))
    .catch((err) => console.log(err));
  };
}