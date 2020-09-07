import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { url } from "../../globalVariables";
import ExpenseLoading from "../common/ExpenseLoading";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
  dialog: {
    height: 500,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fetch, setFetch] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState("");

  if (fetch) {
    setFetch(false);
    axios({
      method: "GET",

      url: url + "/expense/total_details/" + props.user,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setFetch(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
    setFetch(true);
    setLoading(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        size="small"
        style={{ float: "right", transform: "translate(2px, 0px)" }}
        onClick={handleClickOpen}
      >
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={"lg"}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Expenses Details"}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText id="alert-dialog-slide-description">
            {props.user}
            <br /> {" Total Expenses: ₹" + props.grandTotal}
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading || data === undefined ? (
                  <ExpenseLoading />
                ) : (
                  data.map((row, index) => (
                    <StyledTableRow key={row.index}>
                      <StyledTableCell component="th" scope="row">
                        {row.type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ₹{row.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.date.split("T")[0].split("-")[2] +
                          "-" +
                          row.date.split("T")[0].split("-")[1] +
                          "-" +
                          row.date.split("T")[0].split("-")[0]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
