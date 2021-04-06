import React from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { url } from "../../../globalVariables";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import DateSelector from "./DateSeletor";
import SalesRow from './SalesRow';
const headerAuth = "Bearer " + JSON.parse(localStorage.getItem("token")).token;

const tableHeading = ['View', 'Invoice No.', 'Date', 'Customer Name', 'Item / Checkout Quantity', 'Grand Total', 'Pending Amount', 'Payment Status'];
export default class Sales extends React.Component {
  fetchSale(page, rowsPerPage) {
    axios({
      method: "GET",
      url: url + "/sales/" + page + "/" + rowsPerPage,
      headers: {Authorization: headerAuth},
    })
    .then((response) =>
      this.setState({
        data: response.data.sales,
        isLoading: false,
        open: false,
        totalSalesCount: response.data.count,
      })
    )
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }
  componentDidMount() {
    this.fetchSale(this.state.page, this.state.rowsPerPage);
  }
  handleReset() {
    this.setState({ isLoading: true, paginationVisible: true });
    this.fetchSale(0, 10);
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      page: 0,
      rowsPerPage: 10,
      totalSalesCount: 0,
      paginationVisible: true
    };
    this.handleReset = this.handleReset.bind(this);
  }
  dateSelector = (startDate, endDate) => {
    this.setState({ isLoading: true, paginationVisible: false });
    axios({
      method: "GET",
      url: url + "/sales/date/" + startDate + "/" + endDate,
      headers: {Authorization: headerAuth},
    })
      .then((response) =>
        this.setState({
          data: response.data,
          isLoading: false,
          open: false,
          totalSalesCount: response.data.length,
        })
      )
      .catch((error) => console.log(error));
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage, isLoading: true });
    axios({
      method: "GET",
      url:
        url +
        "/sales/" +
        newPage * this.state.rowsPerPage +
        "/" +
        this.state.rowsPerPage,
      headers: {Authorization: headerAuth},
    })
      .then((response) =>
        this.setState({
          data: response.data.sales,
          isLoading: false,
          open: false,
          totalSalesCount: response.data.count,
        })
      )
      .catch((error) => console.log(error));
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
      isLoading: true,
    });
    axios({
      method: "GET",
      url: url + "/sales/" + this.state.page + "/" + event.target.value,
      headers: {Authorization: headerAuth},
    })
      .then((response) =>
        this.setState({
          data: response.data.sales,
          isLoading: false,
          open: false,
          totalSalesCount: response.data.count,
        })
      )
      .catch((error) => console.log(error));
  };
  render() {
    const {isLoading, data, paginationVisible, totalSalesCount, page, rowsPerPage} = this.state;
    return (
      <>
        <Typography component="h2" variant="h4" color="primary" align="center" gutterBottom>Sales</Typography>
        <br />
        <DateSelector dateSelector={this.dateSelector} handleReset={this.handleReset}/>
        <br />
        <br />
        <Table size="small">
          <TableHead>
            <TableRow>{tableHeading.map((row, index) => (<TableCell align='center' key={index} children={row}/>))}</TableRow>
          </TableHead>
          <TableBody>{data.map((row, index) => (<SalesRow row={row} key={index} isLoading={isLoading}/>))}</TableBody>
        </Table>
        {paginationVisible ? <TablePagination component="div" count={totalSalesCount} page={page} onChangePage={this.handleChangePage} rowsPerPage={rowsPerPage} onChangeRowsPerPage={this.handleChangeRowsPerPage} style={{ backgroundColor: "#ebfeff" }}/> : ''}
      </>
    );
  }
}