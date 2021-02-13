import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { url } from "../../globalVariables";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "right",
  },
  title: {
    textAlign: "center",
  },
  select: {
    width: 195,
    maxHeight: 200,
  },
}));

export default function AlertDialogSlide(props) {
  const classes = useStyles();
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
  const [totalCost, setTotalCost] = useState("");
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const [isLoadingVendor, setIsLoadingVendor] = useState(true);
  const [loading, setLoading] = useState(false);
  const [SuccessMessageDialog, setSucessMessageDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: "get",
        url: url + "/items/all_item",
        config: { headers: { "Content-Type": "application/json" } },
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        },
      })
        .then((result) => {
          setIsLoadingItem(false);
          setItemNames(result.data.items);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: "get",
        url: url + "/vendors/all_vendor",
        config: { headers: { "Content-Type": "application/json" } },
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        },
      })
        .then((result) => {
          setIsLoadingVendor(false);
          setVendorNames(result.data.items);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleItem = (e) => {
    setItem(e.target.value);
    itemFetchDetails(e.target.value);
  };

  const itemFetchDetails = (x) => {
    const url1 = url + "/items/" + x;

    axios({
      method: "get",
      url: url1,
      config: { headers: { "Content-Type": "application/json" } },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then(function (response) {
        setGst(response.data.item[0].gst);
        setUom(response.data.item[0].uom);
        setHsn(response.data.item[0].hsn);
        setItemCode(response.data.item[0].itemCode);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: url + "/stock",
      config: { headers: { "Content-Type": "application/json" } },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
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
        itemCode: itemCode,
        addedBy: JSON.parse(localStorage.getItem("token")).name,
      },
    })
      .then(function (response) {
        setLoading(false);
        setItem("");
        setVendor("");
        setLotNo("");
        setBillDate("");
        setBillNo("");
        setGst("");
        setExp("");
        setPurchaseRate("");
        setQuantity("");
        setReceiveDate("");
        setUom("");
        setRate("");
        setTotalCost("");
        setSucessMessageDialog(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        alert("Error adding item to Stock");
      });
  };
  const handleClose = () => {
    props.closeItemForm();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-slide-title">
          Stock Entry
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={6}>
                    <FormControl fullWidth>
                      <InputLabel id="item">Item</InputLabel>
                      <Select
                        labelId="item"
                        fullWidth
                        name="Item"
                        label="Item"
                        id="item"
                        variant="outlined"
                        value={item}
                        onChange={handleItem}
                      >
                        {" "}
                        {isLoadingItem ? (
                          <MenuItem>Loading...</MenuItem>
                        ) : (
                          itemNames.map((itemName, index) => (
                            <MenuItem key={index} value={itemName.name.name}>
                              {itemName.name.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      required
                      id="lot_no"
                      name="lot_no"
                      label="Lot no."
                      variant="outlined"
                      fullWidth
                      autoComplete="lot_no"
                      value={lotNo}
                      onChange={(e) => setLotNo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="bill_no"
                      name="bill_no"
                      label="Bill no."
                      variant="outlined"
                      fullWidth
                      autoComplete="bill_no"
                      value={billNo}
                      onChange={(e) => setBillNo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="exp"
                      name="Exp"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Exp"
                      variant="outlined"
                      fullWidth
                      autoComplete="exp"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      required
                      id="rate"
                      name="rate"
                      label="Rate"
                      variant="outlined"
                      fullWidth
                      autoComplete="rate"
                      value={rate}
                      onChange={(e) => {
                        setRate(e.target.value);
                        setPurchaseRate(
                          parseInt(e.target.value) +
                            (parseInt(e.target.value) * parseInt(gst)) / 100
                        );
                        if (!isNaN(parseInt(quantity) * parseInt(purchaseRate)))
                          setTotalCost(
                            parseInt(quantity) * parseInt(purchaseRate)
                          );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="GST%"
                      name="GST%"
                      label="GST%"
                      variant="outlined"
                      fullWidth
                      autoComplete="GST"
                      value={gst}
                      onChange={(e) => {
                        setGst(parseInt(e.target.value));
                        setPurchaseRate(
                          parseInt(rate) * (1 + parseInt(e.target.value) / 100)
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="purchaseRate"
                      name="Purchase Rate"
                      label="Purchase Rate"
                      variant="outlined"
                      fullWidth
                      autoComplete="purchaseRate"
                      value={purchaseRate}
                      onChange={(e) => {
                        setPurchaseRate(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <FormControl fullWidth>
                      <InputLabel id="vendor">Vendor</InputLabel>
                      <Select
                        labelId="vendor"
                        name="Vendor"
                        variant="outlined"
                        label="vendor"
                        fullWidth
                        id="vendor"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                      >
                        {isLoadingVendor ? (
                          <MenuItem>Loading...</MenuItem>
                        ) : (
                          vendorNames.map((VendorName, index) => (
                            <MenuItem key={index} value={VendorName.name.name}>
                              {VendorName.name.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="quantity"
                      name="quantity"
                      type="number"
                      label="quantity"
                      variant="outlined"
                      fullWidth
                      placeholder={uom}
                      autoComplete="quantity"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        if (
                          !isNaN(
                            parseInt(e.target.value) * parseInt(purchaseRate)
                          )
                        )
                          setTotalCost(
                            parseInt(e.target.value) * parseInt(purchaseRate)
                          );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="receive_date"
                      label="Receive Date"
                      variant="outlined"
                      type="date"
                      fullWidth
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={receiveDate}
                      onChange={(e) => setReceiveDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={6}>
                    <TextField
                      id="billDate"
                      name="billDate"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Bill Date"
                      fullWidth
                      autoComplete="billDate"
                      value={billDate}
                      onChange={(e) => setBillDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      color="primary"
                      className={classes.submit}
                    >
                      {loading ? (
                        <CircularProgress size="1.5rem" color="inherit" />
                      ) : (
                        "Add"
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleClose}
                      color="secondary"
                      className={classes.submit}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  Total Cost: {totalCost}
                </Grid>
              </form>
              <Snackbar
                open={SuccessMessageDialog}
                autoHideDuration={3000}
                onClose={() => setSucessMessageDialog(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={() => setSucessMessageDialog(false)}
                  severity="success"
                >
                  Stock Added
                </MuiAlert>
              </Snackbar>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
