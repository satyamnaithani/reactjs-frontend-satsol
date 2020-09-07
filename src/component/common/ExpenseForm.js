import React, { useState } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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

export default function AlertDialogSlide(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [SuccessMessageDialog, setSucessMessageDialog] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: url + "/expense",
      config: { headers: { "Content-Type": "application/json" } },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
      data: {
        type: type,
        amount: amount,
        description: description,
        addedBy: JSON.parse(localStorage.getItem("token")).name,
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setAmount("");
        setDescription("");
        setType("");
        setSucessMessageDialog(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        alert("Error adding Expense");
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
          Add Personal Expense
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <FormControl
                      className={classes.formControl}
                      fullWidth
                      required
                    >
                      <InputLabel id="type">{"   "} Type</InputLabel>
                      <Select
                        labelId="type"
                        name="Type"
                        label="Type"
                        variant="outlined"
                        required
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value={"Transportation"}>
                          Transportation
                        </MenuItem>
                        <MenuItem value={"Utility"}>Utility</MenuItem>
                        <MenuItem value={"Consumables"}>Consumables</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      autoComplete="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      id="description"
                      name="Description"
                      label="Description"
                      fullWidth
                      variant="outlined"
                      autoComplete="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                  Expense Added
                </MuiAlert>
              </Snackbar>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
