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
const ItemForm = lazy(()=> import('../../common/ItemForm'))
  
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
      },
      table: {
        minWidth: '80vw'
      }
  });
export default function TableComponent () {
    const classes = useStyles('');
    const [data,setData] = React.useState(['1','2','1','2','1','2','1','2','1','2']);
    const [loading,setLoading] = React.useState(true);
    const [formOpen, setFormOpen] = React.useState(false);
    const [editData, setEditData] = React.useState();

    const [deleteConfirm, setDeleteConfirm] = React.useState(false);
    const [deleteInput, setDeleteInput] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    React.useEffect(()=> {
        axios({
            method: 'GET',
        
            url: url + '/items/all_item',
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
      console.log(data)
       setFormOpen(true)
       setEditData(data)
    }
    const handleDelete = (id) => {
      setDeleteDialogOpen(true)
    }

return(
    <>
    <Typography component="h2" variant="h4" color="primary" align='center' gutterBottom>
    Item Master
    </Typography>
<Table className={classes.table} size='small'>
  <TableHead>
    <TableRow>
      <TableCell>Code</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Catogory</TableCell>
      <TableCell>GST%</TableCell>
      <TableCell>HSN Code</TableCell>
      <TableCell>UOM</TableCell>
      <TableCell>Edit/Delete</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
      {
          // loading?'Loading':
         data === undefined || null?'': data.map((row, index) => (
           
          <TableRow key={index}>
            <TableCell>{loading?<Skeleton width={50} animation="wave" />:row.name.itemCode}</TableCell>
            <TableCell>{loading?<Skeleton width={150} animation="wave" />:row.name.name}</TableCell>
            <TableCell>{loading?<Skeleton width={200} animation="wave" />:row.name.catogory}</TableCell>
            <TableCell>{loading?<Skeleton width={100} animation="wave" />:row.name.gst}</TableCell>
            <TableCell>{loading?<Skeleton width={150} animation="wave" />:row.name.hsn}</TableCell>
            <TableCell>{loading?<Skeleton width={100} animation="wave" />:row.name.uom}</TableCell>
         <TableCell>
           {loading?
           <Skeleton width={50} animation="wave" />:
          
           <IconButton disableFocusRipple disableRipple disableTouchRipple style={{ backgroundColor: 'transparent' }} >
             <EditIcon onClick={()=>handleEdit(row.name)} className={classes.edit}/> <div>&nbsp;&nbsp;&nbsp;</div>
              <DeleteIcon onClick={()=>handleDelete(row.data._id)} className={classes.delete}/>
           </IconButton>

           }
           </TableCell>
          </TableRow>
        ))}
  </TableBody>

</Table>
<Suspense>
<ItemForm open={formOpen} edit={editData} closeItemForm={()=>setFormOpen(false)}/>
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