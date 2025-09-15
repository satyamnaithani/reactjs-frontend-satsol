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
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");
  const [uom, setUom] = useState("");
  const [SuccessMessageDialog, setSucessMessageDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: edit ? "patch" : "post",
      url: edit ? url + "/items/" + props.edit._id : url + "/items",
      config: { headers: { "Content-Type": "application/json" } },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
      data: {
        catogory: category,
        name: name,
        hsn: hsn,
        gst: gst,
        uom: uom,
        addedBy: JSON.parse(localStorage.getItem("token")).name,
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setCategory("");
        setName("");
        setHsn("");
        setGst("");
        setUom("");
        setSucessMessageDialog(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        alert(error);
      });
  };

  const handleClose = () => {
    props.closeItemForm();
  };
  React.useEffect(() => {
    if (props.edit !== undefined) {
      const { name, catogory, hsn, gst, uom } = props.edit;
      setCategory(catogory);
      setName(name);
      setHsn(hsn);
      setGst(gst);
      setUom(uom);
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
          {edit ? "Item Update" : "Item Entry"}
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12}>
                    <FormControl margin="normal" variant="outlined" fullWidth>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        required
                        labelId="category"
                        disabled={edit}
                        name="category"
                        fullWidth
                        label="Category"
                        id="select-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value={"Medical Equipment"}>
                          Medical Equipment
                        </MenuItem>
                        <MenuItem value={"Spares"}>Spares</MenuItem>
                        <MenuItem value={"Consumables"}>Consumables</MenuItem>
                        <MenuItem value={"Service"}>Service</MenuItem>
                        <MenuItem value={"Office Durables"}>
                          Office Durables
                        </MenuItem>
                        <MenuItem value={"Transportation"}>
                          Transportation
                        </MenuItem>
                        <MenuItem value={"Office Consumables"}>
                          Office Consumables
                        </MenuItem>
                          <MenuItem value={"Laboratory Goods"}>
                          Laboratory Goods
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      required
                      id="itemName"
                      name="name"
                      variant="outlined"
                      label="Item Name"
                      margin="normal"
                      fullWidth
                      autoComplete="Iname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      required
                      id="hsn"
                      name="hsn"
                      variant="outlined"
                      margin="normal"
                      label="HSN Code"
                      fullWidth
                      autoComplete="HSN"
                      value={hsn}
                      onChange={(e) => setHsn(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <FormControl margin="normal" variant="outlined" fullWidth>
                      <InputLabel id="gst">GST%</InputLabel>
                      <Select
                        labelId="gst"
                        name="gst"
                        fullWidth
                        required
                        label="Gst"
                        id="select-gst"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={28}>28</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <FormControl margin="normal" variant="outlined" fullWidth>
                      <InputLabel id="uom">UOM</InputLabel>
                      <Select
                        labelId="uom"
                        name="UOM"
                        label="UOM"
                        required
                        id="uom"
                        value={uom}
                        onChange={(e) => setUom(e.target.value)}
                      >
                        <MenuItem value={"Kg"}>Kg</MenuItem>
                        <MenuItem value={"L"}>Litre</MenuItem>
                        <MenuItem value={"Piece"}>Pieces</MenuItem>
                        <MenuItem value={"No."}>No.</MenuItem>
                      </Select>
                    </FormControl>
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
                onClose={() => {
                  setSucessMessageDialog(false);
                  if (edit) {
                    props.closeItemForm();
                  }
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={() => setSucessMessageDialog(false)}
                  severity="success"
                >
                  {edit ? "Item Updated" : "Item Added"}
                </MuiAlert>
              </Snackbar>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
