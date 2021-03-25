import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { url } from "../../globalVariables";
import Skeleton from "@material-ui/lab/Skeleton";
const ProfitsDialog = React.lazy(() => import("./ProfitsDialog"));

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  // window.setTimeout(()=> setLoading(false), 1000)
  const classes = useStyles();
  useEffect(() => {
    axios({
      method: "GET",
      url: url + "/sales/profits",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      <Suspense key={1} fallback={<div />}>
        <ProfitsDialog data={data} />
      </Suspense>
      <Title style={{ float: "left" }}>Profits</Title>
      <Typography component="p" variant="h4">
        {loading ? <Skeleton animation="wave" /> : "₹" + data.netProfit}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {loading ? (
          <Skeleton animation="wave" />
        ) : (
          "Total Expenses: ₹" + data.totalExpenses
        )}
        <br />
        {loading ? (
          <Skeleton animation="wave" />
        ) : (
          "Total Gst: ₹" + data.totalSellingGst
        )}
        <br />
        {loading ? (
          <Skeleton animation="wave" />
        ) : (
          "Total GST Return: ₹" + data.gstReturn
        )}
        <br />
        {loading ? (
          <Skeleton animation="wave" />
        ) : (
          "Total Goods Transportation Expense: ₹" + data.totalGoodsExpense
        )}
      </Typography>
    </div>
  );
}
