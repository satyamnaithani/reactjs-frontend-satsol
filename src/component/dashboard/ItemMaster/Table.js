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
import IconButton from '@material-ui/core/IconButton'
import Skeleton from '@material-ui/lab/Skeleton';
const ItemForm = lazy(()=> import('../../common/ItemForm'))
  
const useStyles = makeStyles({
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

return(
    <>
      <Typography component="h2" variant="h4" color="primary" align='center' gutterBottom>Item Master</Typography>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Catogory</TableCell>
            <TableCell>GST%</TableCell>
            <TableCell>HSN Code</TableCell>
            <TableCell>UOM</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
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
</>
)
}