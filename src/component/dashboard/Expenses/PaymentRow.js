import React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default function PaymentTable({data}) {
  return (
    <TableRow key={row.name}>
        <TableCell component="th" scope="row">
            {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">{row.lauda}</TableCell>
    </TableRow>
  );
}