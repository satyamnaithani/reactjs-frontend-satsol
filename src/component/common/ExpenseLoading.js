import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Skeleton from '@material-ui/lab/Skeleton';

// Generate Order Data
function createData(billNo) {
    return { billNo };
}

const rows = [
    createData(0),
    createData(1),
    createData(2),
    createData(3),
    createData(4),
    createData(5),
    createData(3),
];


export default function Orders() {

    return (
        <React.Fragment>

                    {rows.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton animation="wave" /></TableCell>
                            <TableCell><Skeleton animation="wave" /></TableCell>
                            <TableCell><Skeleton animation="wave" /></TableCell>
                        </TableRow>
                    ))}
             
        </React.Fragment>
    );
}
