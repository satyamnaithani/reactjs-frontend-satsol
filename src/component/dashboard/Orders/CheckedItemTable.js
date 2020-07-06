import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function CustomizedTables(props) {
  
  const { gst, sellingRate, checkout, uom, itemCode, _id, item} = props.item
  let {exp} = props.item
  var totalAmount = (sellingRate + sellingRate * (gst / 100))
  if(exp !== null){
   exp = exp.split('T')[0].split('-')[2]+'-'+exp.split('T')[0].split('-')[1]+'-'+exp.split('T')[0].split('-')[0]
  }
  var grandTotal = parseFloat(totalAmount* checkout).toFixed(2) 
  return (
    <StyledTableRow key={_id}>
      <StyledTableCell align="left">{itemCode}</StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {item}
      </StyledTableCell>
      <StyledTableCell align="right">{checkout} {' '} {uom}</StyledTableCell>
      <StyledTableCell align="right">{exp}</StyledTableCell>
      <StyledTableCell align="right">{sellingRate}</StyledTableCell>
      <StyledTableCell align="right">{gst}</StyledTableCell>
      <StyledTableCell align="right">{grandTotal}</StyledTableCell>
    </StyledTableRow>
  );
}
