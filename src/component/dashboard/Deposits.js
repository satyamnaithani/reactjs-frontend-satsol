import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Sale</Title>
      <Typography component="p" variant="h4">
      ₹32,560.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2020 <br/> to Xyz Hospital
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Total Sale
        </Link>
      </div>
    </React.Fragment>
  );
}
