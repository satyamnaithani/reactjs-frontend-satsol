import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

import RegisterIcon from '@material-ui/icons/Create';
const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Stock Entry' },
  { icon: <RegisterIcon />, name: 'Vendor Entry' },
  { icon:  <RegisterIcon />, name: 'Customer Entry' },
  { icon:  <RegisterIcon />, name: 'Item Entry' },
];

export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment className={classes.root}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
}