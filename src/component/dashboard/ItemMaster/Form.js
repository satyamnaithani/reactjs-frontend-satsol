import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import {url} from '../../../globalVariables';



export default function AddressForm() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");
  const [uom, setUom] = useState("");
  const [itemCode, setItemCode] = useState("");


  const handleSubmit = (evt) => {
    setCategory("");
    setName("");
    setHsn("");
    setGst("")
    setUom("");
    setItemCode("");
    evt.preventDefault();
    axios({
      method: 'post',
      url: url+'/items',
      config: { headers: { 'Content-Type': 'application/json' } },
      data: {
        catogory: category,
        name: name,
        hsn: hsn,
        gst: gst,
        uom: uom,
        itemCode: itemCode
      }
    })
    .then(function (response) {
      console.log(response);
      alert('Registered Item')
    })
    .catch(function (error) {
      console.log(error);
      alert('Error Adding Item')
    });

}
  
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.heading}>
        Item Registration
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <FormControl className={classes.formControl}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          name="category"
          label="Category"
          id="select-category"
          value={category}
          onChange={e=> setCategory(e.target.value)} 
        >
          <MenuItem value={"Medical Equipment"}>Medical Equipment</MenuItem>
          <MenuItem value={"Spears"}>Spears</MenuItem>
          <MenuItem value={"Consumables"}>Consumables</MenuItem>
          <MenuItem value={"Office Durables"}>Office Durables</MenuItem>
          <MenuItem value={"Office Consumables"}>Office Consumables</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="itemCode"
            name="itemCode"
            label="Item Code"
            fullWidth
            autoComplete="ItemCode"
            value={itemCode}
            onChange={e=> setItemCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Item Name"
            fullWidth
            autoComplete="Iname"
            value={name}
            onChange={e=> setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="hsn"
            name="hsn"
            label="HSN Code"
            fullWidth
            autoComplete="HSN"
            value={hsn}
            onChange={e=> setHsn(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="GST%"
            name="GST%"
            label="GST%"
            fullWidth
            autoComplete="GST"
            value={gst}
            onChange={e=> setGst(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
        <InputLabel id="uom">UOM</InputLabel>
        <Select
          labelId="uom"
          name="UOM"
          label="UOM"
          id="uom"
          value={uom}
          onChange={e=> setUom(e.target.value)} 
        >
          <MenuItem value={"Kg"}>Kg</MenuItem>
          <MenuItem value={"L"}>Litre</MenuItem>
          <MenuItem value={"Piece"}>Pieces</MenuItem>
          <MenuItem value={"No."}>No.</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        
      </Grid>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ADD
          </Button>
      </form>
   </div>
  );
}




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#F0F8FF',
    borderRadius: '15%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
  },
  heading: {
    marginTop: theme.spacing(6)
  }
}));