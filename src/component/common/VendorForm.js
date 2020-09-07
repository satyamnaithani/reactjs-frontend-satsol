import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { url } from "../../globalVariables";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
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
}));

export default function CustomerDialog(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [gst, setGst] = useState("");
  const [dl, setDl] = useState("");
  const [contact, setContact] = useState("");
  const [person, setPerson] = useState("");
  const [SuccessMessageDialog, setSucessMessageDialog] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios({
      method: edit ? "patch" : "post",
      url: edit ? url + "/vendors/" + props.edit._id : url + "/vendors/",
      config: { headers: { "Content-Type": "application/json" } },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
      data: {
        name: name,
        address: address,
        city: city,
        state: state,
        zip: zip,
        gst: gst,
        dl: dl,
        contact: contact,
        person: person,
        addedBy: JSON.parse(localStorage.getItem("token")).name,
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setName("");
        setAddress("");
        setCity("");
        setContact("");
        setDl("");
        setPerson("");
        setZip("");
        setState("");
        setGst("");
        setSucessMessageDialog(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        alert("Error adding Customer");
      });
  };

  const handleClose = () => {
    props.closeItemForm();
  };
  React.useEffect(() => {
    if (props.edit !== undefined) {
      console.log(props.edit);
      const {
        name,
        address,
        city,
        contact,
        dl,
        zip,
        state,
        gst,
        person,
      } = props.edit;
      setName(name);
      setAddress(address);
      setCity(city);
      setContact(contact);
      setDl(dl);
      setPerson(person);
      setZip(zip);
      setState(state);
      setGst(gst);
      setEdit(true);
    }
  }, [props.edit]);
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
          {edit ? "Vendor Update" : "Vendor Registration"}
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="nameVendor"
                      name="name"
                      label="Customer Name"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="Cname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="addressVendor"
                      name="address"
                      label="Address line "
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="billing address-line"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      required
                      id="cityVendor"
                      name="city"
                      label="City"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      required
                      id="stateVendor"
                      name="state"
                      margin="normal"
                      variant="outlined"
                      label="State"
                      fullWidth
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      required
                      id="zipVendor"
                      name="zip"
                      label="Zip Code"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="billing postal-code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      required
                      id="gstVendor"
                      name="gst"
                      label="GSTIN"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="GST"
                      value={gst}
                      onChange={(e) => setGst(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      id="dlVendor"
                      name="dl"
                      label="Drug License"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="dl"
                      value={dl}
                      onChange={(e) => setDl(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={4}>
                    <TextField
                      id="phoneVendor"
                      name="phone"
                      label="Contact No."
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="personVendor"
                      name="person"
                      label="Contact Person"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete="person"
                      value={person}
                      onChange={(e) => setPerson(e.target.value)}
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
                      ) : edit ? (
                        "UPDATE"
                      ) : (
                        "ADD"
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
                  onClose={() => {
                    if (edit) {
                      props.closeItemForm();
                    }
                    setSucessMessageDialog(false);
                  }}
                  severity="success"
                >
                  {edit ? "Vendor Updated" : "Vendor Added"}
                </MuiAlert>
              </Snackbar>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CustomerDialog.propTypes = {
  open: PropTypes.bool,
  closeItemForm: PropTypes.func,
  edit: PropTypes.any,
};
