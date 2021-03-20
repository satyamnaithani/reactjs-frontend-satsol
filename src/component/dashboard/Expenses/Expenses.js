import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Header";
import Drawer from "../Drawer";
import { useStyles } from "../useStyles";
import Grid from "@material-ui/core/Grid";
import PaymentTable from './PaymentTable';


export default function Customers() {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ minHeight: "100vh" }}
    >
      <CssBaseline />
      <Header />
      <Drawer />
        <Grid item xs={12}>
          <PaymentTable title="Vendor"/>
        </Grid>
        {/* <Grid item xs={5}><PaymentTable title="Customer"/></Grid> */}
    </div>
  );
}