import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import SalesTable from "./SalesTable";

class OrderList extends Component {
  render() {
    return (
      <Box color="text.primary" mt={10} ml={3} mr={3} mb={5}>
        <Paper style={{minHeight: "90vh",overflowX: "hidden",overflowY: "hidden"}}>
          <SalesTable />
        </Paper>
      </Box>
    );
  }
}

export default OrderList;
