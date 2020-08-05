import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ItemForm from '../common/ItemForm'
import VendorForm from '../common/VendorForm'
import CustomerForm from '../common/CustomerForm'
import StockForm from '../common/StockForm'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemFormOpen, setItemFormOpen] = React.useState(false);
  const [vendorFormOpen, setVendorFormOpen] = React.useState(false);
  const [customerFormOpen, setCustomerFormOpen] = React.useState(false);
  const [stockFormOpen, setStockFormOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color='inherit'>
        Register
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        //keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=> {
          setStockFormOpen(true)
          setAnchorEl(null);
        }}>Stock Entry</MenuItem>
        <MenuItem onClick={()=> {
          setItemFormOpen(true)
          setAnchorEl(null);
        }}>Item Registration</MenuItem>
        <MenuItem onClick={()=> {
          setVendorFormOpen(true)
          setAnchorEl(null);
        }}>Vendor Registration</MenuItem>
        <MenuItem onClick={()=> {
          setCustomerFormOpen(true)
          setAnchorEl(null);
        }}>Customer Registration</MenuItem>
      </Menu>
     
      <ItemForm open={itemFormOpen} closeItemForm={()=>setItemFormOpen(false)}/>
      <VendorForm open={vendorFormOpen} closeItemForm={()=>setVendorFormOpen(false)}/>
      <CustomerForm open={customerFormOpen} closeItemForm={()=>setCustomerFormOpen(false)}/>
      <StockForm open={stockFormOpen} closeItemForm={()=>setStockFormOpen(false)}/>
    </div>
  );
}
