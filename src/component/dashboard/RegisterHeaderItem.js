import React, {lazy, Suspense } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Typography from '@material-ui/core/Typography';

const ExpenseForm = lazy(()=> import('../common/ExpenseForm'))
const ItemForm = lazy(()=> import('../common/ItemForm'))
const VendorForm = lazy(()=> import('../common/VendorForm'))
const CustomerForm = lazy(()=> import('../common/CustomerForm'))
const StockForm = lazy(()=> import('../common/StockForm'))
const Logout = lazy(()=>import('../common/LogoutM'))

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemFormOpen, setItemFormOpen] = React.useState(false);
  const [vendorFormOpen, setVendorFormOpen] = React.useState(false);
  const [customerFormOpen, setCustomerFormOpen] = React.useState(false);
  const [stockFormOpen, setStockFormOpen] = React.useState(false);
  const [expenseFormOpen, setExpenseFormOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color='inherit'
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        //keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography style={{paddingLeft:'15px'}}><strong>{JSON.parse(localStorage.getItem('token')).name}</strong></Typography>
        <MenuItem onClick={()=> {
          setExpenseFormOpen(true)
          setAnchorEl(null);
        }}>Add Personal Expense</MenuItem>
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
        <Suspense fallback={<div/>}>
        <Logout/>
        </Suspense>
        
      </Menu>
      <Suspense fallback={<div/>}>
      <ItemForm open={itemFormOpen} closeItemForm={()=>setItemFormOpen(false)}/>
      <VendorForm open={vendorFormOpen} closeItemForm={()=>setVendorFormOpen(false)}/>
      <CustomerForm open={customerFormOpen} closeItemForm={()=>setCustomerFormOpen(false)}/>
      <StockForm open={stockFormOpen} closeItemForm={()=>setStockFormOpen(false)}/>
      <ExpenseForm  open={expenseFormOpen} closeItemForm={()=>setExpenseFormOpen(false)}/>
      </Suspense>
    </div>
  );
}
