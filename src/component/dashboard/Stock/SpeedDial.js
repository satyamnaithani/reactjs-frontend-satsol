import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

import RegisterIcon from '@material-ui/icons/Create';

import ItemForm from '../../common/ItemForm'
import VendorForm from '../../common/VendorForm'
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
  { icon: <FileCopyIcon />, name: 'Stock Entry', function: 'stockEntry' },
  { icon: <RegisterIcon />, name: 'Vendor Entry', function: 'vendorEntry' },
  { icon:  <RegisterIcon />, name: 'Customer Entry', function: 'customerEntry' },
  { icon:  <RegisterIcon />, name: 'Item Entry', function: 'itemEntry' },
];


export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [funcType, setFuncType] = React.useState('');
  const [hidden] = React.useState(false);
  const [itemFormOpen, setItemFormOpen] = React.useState(false);
  const [vendorFormOpen, setVendorFormOpen] = React.useState(false);

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFunction = (value) => {
    //setOpen(false);
    setFuncType(value)
    if(value === 'itemEntry'){
      setItemFormOpen(true)
    }
    if(value === 'vendorEntry'){
      setVendorFormOpen(true)
    }
  };
  console.log(funcType)
  
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
            onClick={() => handleFunction(action.function)}
          />
        ))}
      </SpeedDial>
      <ItemForm open={itemFormOpen} closeItemForm={()=>setItemFormOpen(false)}/>
      <VendorForm open={vendorFormOpen} closeItemForm={()=>setVendorFormOpen(false)}/>
    </React.Fragment>
  );
}