import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../globalVariables";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Skeleton from "@material-ui/lab/Skeleton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  // depositContext: {
  //   flex: 1,
  // },
  formControl: {
    minWidth: 100,
    textDecoration: "none",
    padding: 0,
    margin: 0,
    float: "right",
  },
});
export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState("");
  const [period, setPeriod] = useState("Last Month Sale");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const fetchLastMonthSale = () => {
    axios({
      method: "GET",

      url: url + "/sales/sales-chart-previous-month",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then((response) => {
        setData(response.data.sale);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    fetchLastMonthSale();
  }, []);

  const fetchSale = (x) => {
    setLoading(true);
    var type = null;
    switch (x) {
      case "Last Month Sale":
        fetchLastMonthSale();
        break;
      case "Quarterly Sale":
        type = "quarterly";
        break;
      case "Half Yearly Sale":
        type = "halfyearly";
        break;
      case "Anual Sale":
        type = "anually";
        break;
      default:
        break;
    }
    if (type !== null) {
      axios({
        method: "GET",

        url: url + "/sales/sales-history-chart/" + type + "/j",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        },
      })
        .then((response) => {
          setData(response.data.sale);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
          console.log(error);
        });
    }
  };
  return (
    <React.Fragment>
      <Title>
        {period}
        <FormControl className={classes.formControl}>
          <InputLabel id="period">{period}</InputLabel>
          <Select
            labelId="period"
            name="Period"
            label="period"
            id="period"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              fetchSale(e.target.value);
            }}
          >
            <MenuItem value={"Last Month Sale"}>Last Month Sale</MenuItem>
            <MenuItem value={"Quarterly Sale"}>Quarterly Sale</MenuItem>
            <MenuItem value={"Half Yearly Sale"}>Half Yearly Sale</MenuItem>
            <MenuItem value={"Anual Sale"}>Anual Sale</MenuItem>
          </Select>
        </FormControl>
      </Title>
      {loading ? (
        <Skeleton variant="rect" width={880} height={500} animation="wave" />
      ) : (
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary}></XAxis>
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                }}
              >
                Sales (₹)
              </Label>
            </YAxis>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </React.Fragment>
  );
}
