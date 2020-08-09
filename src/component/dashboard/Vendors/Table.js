import React, { lazy,Suspense } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {url} from '../../../globalVariables'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
const VendorForm = lazy(()=> import('../../common/VendorForm'))
  
const useStyles = makeStyles({
    delete: {
        '&:hover': {
            color: "#f00"
         }
      },
      edit: {
        '&:hover': {
            color: "blue",
         }
      }
  });
export default function TableComponent () {
    const classes = useStyles('');
    const [data,setData] = React.useState(['1','2','1','2','1','2','1','2','1','2']);
    const [loading,setLoading] = React.useState(true);
    const [customerFormOpen, setCustomerFormOpen] = React.useState(false);
    const [editData, setEditData] = React.useState();

    const [deleteConfirm, setDeleteConfirm] = React.useState(false);
    const [deleteInput, setDeleteInput] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    React.useEffect(()=> {
        axios({
            method: 'GET',
        
            url: url + '/vendors',
            headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
        })
            .then(response => {
                console.log(response.data.items)
                setData(response.data.items)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                alert(error)
                setLoading(false)
            })
    },[])

    const handleEdit = (data) => {
       setCustomerFormOpen(true)
       setEditData(data)
    }
    const handleDelete = (id) => {
      setDeleteDialogOpen(true)
    }

return(
    <>
    <Typography component="h2" variant="h4" color="primary" align='center' gutterBottom>
    Vendors
    </Typography>
<Table size="small">
  <TableHead>
    <TableRow>
      <TableCell>Code</TableCell>
      <TableCell>Hospital Name</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Drug License</TableCell>
      <TableCell>GSTIN</TableCell>
      <TableCell>Person</TableCell>
      <TableCell>Contact</TableCell>
      <TableCell>Edit/Delete</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
      {
          // loading?'Loading':
         data === ''|| null?'': data.map((row, index) => (
              
          <TableRow key={index}>
            <TableCell>{loading?<Skeleton width={50} animation="wave" />:row.data.code}</TableCell>
            <TableCell>{loading?<Skeleton width={150} animation="wave" />:row.data.name}</TableCell>
            <TableCell>{loading?<Skeleton width={200} animation="wave" />:row.data.address+', '+row.data.city+', '+row.data.state+' - '+row.data.zip}</TableCell>
            <TableCell>{loading?<Skeleton width={100} animation="wave" />:row.data.dl}</TableCell>
            <TableCell>{loading?<Skeleton width={150} animation="wave" />:row.data.gst}</TableCell>
            <TableCell>{loading?<Skeleton width={100} animation="wave" />:row.data.person}</TableCell>
            <TableCell>{loading?<Skeleton width={100} animation="wave" />:row.data.contact}</TableCell>
         <TableCell>
           {loading?
           <Skeleton width={50} animation="wave" />:
          
           <IconButton disableFocusRipple disableRipple disableTouchRipple style={{ backgroundColor: 'transparent' }} >
             <EditIcon onClick={()=>handleEdit(row.data)} className={classes.edit}/> <div>&nbsp;&nbsp;&nbsp;</div>
              <DeleteIcon onClick={()=>handleDelete(row.data._id)} className={classes.delete}/>
           </IconButton>

           }
           </TableCell>
          </TableRow>
        ))}
  </TableBody>

</Table>
<Suspense fallback={<div/>}>
<VendorForm open={customerFormOpen} edit={editData} closeItemForm={()=>setCustomerFormOpen(false)}/>
</Suspense>
{/* Delete Dialog */}
<Dialog
        open={deleteDialogOpen}
        keepMounted
        onClose={()=> setDeleteDialogOpen(false)}>
          <DialogTitle>
            Are you sure you want to delete the user?
          </DialogTitle>
          <DialogContent>
          <TextField
            required
            label="Type the below text in the box to confirm"
            margin='normal'
            variant='outlined'
            fullWidth
            value={deleteInput}
            onChange={e=> {
              setDeleteInput(e.target.value)
              if(e.target.value === 'I am confirming to delete'){
                setDeleteConfirm(true)
              }
              else{
                setDeleteConfirm(false)
              }
            }}
          />
          <br/>
          <strong><p align='center'>I am confirming to delete</p></strong>
          </DialogContent>
          <DialogActions>
          <Button onClick={()=> {
            setDeleteDialogOpen(false)
          }} color="primary">
            Cancel
          </Button>
          <Button
          disabled={!deleteConfirm}
           onClick={()=>{
            setDeleteDialogOpen(false)
          }} color="secondary">
            Delete
          </Button>
        </DialogActions>

    </Dialog>
</>
)
        }